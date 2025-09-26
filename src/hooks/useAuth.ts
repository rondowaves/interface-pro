'use client';

import { useState, useEffect } from 'react';
import { 
  saveSecureSession, 
  getSecureSession, 
  clearSecureSession,
  generateSessionId,
  recordLoginAttempt,
  isUserBlocked,
  hashPassword,
  verifyPassword
} from '@/utils/security';

// Identifiants admin sécurisés (en production, utiliser une base de données)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Mot de passe haché avec salt (interfacepro2024)
  passwordHash: '98de8d2dc7433b97cb5e39b522c62f5f:3e727c4ad6c514c230a2ae430be566413853d6cc4bcad3d2e09d5994fdfbe724'
};

interface AuthResult {
  success: boolean;
  message: string;
  blocked?: boolean;
  remainingTime?: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState<any>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const session = getSecureSession();
      if (session && session.username === ADMIN_CREDENTIALS.username) {
        setIsAuthenticated(true);
        setSessionInfo({
          username: session.username,
          loginTime: session.loginTime,
          sessionId: session.sessionId
        });
      } else {
        setIsAuthenticated(false);
        setSessionInfo(null);
      }
    } catch (error) {
      console.error('Erreur de vérification d\'authentification:', error);
      setIsAuthenticated(false);
      setSessionInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (username: string, password: string): AuthResult => {
    try {
      // Vérifier si l'utilisateur est bloqué
      const blockStatus = isUserBlocked();
      if (blockStatus.blocked) {
        return {
          success: false,
          message: `Trop de tentatives échouées. Réessayez dans ${blockStatus.remainingTime} minute(s).`,
          blocked: true,
          remainingTime: blockStatus.remainingTime
        };
      }

      // Vérifier les identifiants
      if (username !== ADMIN_CREDENTIALS.username) {
        recordLoginAttempt(false);
        return { success: false, message: 'Nom d\'utilisateur incorrect' };
      }

      // Vérifier le mot de passe haché
      if (!verifyPassword(password, ADMIN_CREDENTIALS.passwordHash)) {
        recordLoginAttempt(false);
        return { success: false, message: 'Mot de passe incorrect' };
      }

      // Connexion réussie
      const sessionData = {
        username,
        loginTime: Date.now(),
        lastActivity: Date.now(),
        sessionId: generateSessionId(),
        ipAddress: 'localhost' // En production, récupérer la vraie IP
      };

      saveSecureSession(sessionData);
      setIsAuthenticated(true);
      setSessionInfo({
        username: sessionData.username,
        loginTime: sessionData.loginTime,
        sessionId: sessionData.sessionId
      });

      recordLoginAttempt(true);
      
      return { success: true, message: 'Connexion réussie' };

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      recordLoginAttempt(false);
      return { success: false, message: 'Erreur système lors de la connexion' };
    }
  };

  const logout = () => {
    try {
      clearSecureSession();
      setIsAuthenticated(false);
      setSessionInfo(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const refreshSession = () => {
    checkAuthStatus();
  };

  const getSessionDuration = (): number => {
    if (sessionInfo && sessionInfo.loginTime) {
      return Math.floor((Date.now() - sessionInfo.loginTime) / 1000 / 60); // en minutes
    }
    return 0;
  };

  return {
    isAuthenticated,
    loading,
    sessionInfo,
    login,
    logout,
    refreshSession,
    getSessionDuration
  };
}
