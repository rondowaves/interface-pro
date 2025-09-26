'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuthSimple';

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export default function SecurityWrapper({ children }: SecurityWrapperProps) {
  const { isAuthenticated, refreshSession } = useAuth();
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    // Vérifications de sécurité au chargement
    performSecurityChecks();
    
    // Actualiser la session toutes les 30 secondes
    const sessionInterval = setInterval(() => {
      refreshSession();
    }, 30000);

    // Vérifier l'activité utilisateur (détection d'inactivité)
    let inactivityTimer: NodeJS.Timeout;
    
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (isAuthenticated) {
          alert('Session expirée pour inactivité. Vous allez être déconnecté.');
          window.location.reload();
        }
      }, 30 * 60 * 1000); // 30 minutes d'inactivité
    };

    // Événements d'activité utilisateur
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    resetInactivityTimer();

    return () => {
      clearInterval(sessionInterval);
      clearTimeout(inactivityTimer);
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true);
      });
    };
  }, [isAuthenticated, refreshSession]);

  const performSecurityChecks = () => {
    try {
      // Vérifier si on est en mode développement
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      // Vérifier l'intégrité de la session
      if (isAuthenticated) {
        // Vérifications supplémentaires en production
        if (!isDevelopment) {
          // Vérifier le protocole HTTPS (en production)
          if (window.location.protocol !== 'https:') {
            console.warn('⚠️ Connexion non sécurisée détectée');
          }
        }
        
        // Vérifier la validité du localStorage
        try {
          const testKey = 'security-test';
          localStorage.setItem(testKey, 'test');
          localStorage.removeItem(testKey);
        } catch (error) {
          console.error('Erreur localStorage:', error);
          alert('Erreur de stockage local. Veuillez vider le cache de votre navigateur.');
          return;
        }
      }
      
      setIsSecure(true);
    } catch (error) {
      console.error('Erreur lors des vérifications de sécurité:', error);
      setIsSecure(false);
    }
  };

  // Protection contre l'inspection des éléments (basique)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Désactiver F12, Ctrl+Shift+I, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        console.warn('🔒 Outils de développement désactivés pour la sécurité');
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Seulement en production
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Protection contre les tentatives de manipulation de la console
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Masquer les informations sensibles dans la console
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;

      console.log = (...args) => {
        // Filtrer les informations sensibles
        const filteredArgs = args.map(arg => {
          if (typeof arg === 'string' && (arg.includes('password') || arg.includes('token'))) {
            return '[DONNÉES SENSIBLES MASQUÉES]';
          }
          return arg;
        });
        originalLog.apply(console, filteredArgs);
      };

      console.warn = (...args) => originalWarn.apply(console, args);
      console.error = (...args) => originalError.apply(console, args);
    }
  }, []);

  if (!isSecure) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérifications de sécurité en cours...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
