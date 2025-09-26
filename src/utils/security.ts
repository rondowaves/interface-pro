// Utilitaires de sécurité pour Interface Pro Admin
import CryptoJS from 'crypto-js';

// Clé de chiffrement spécifique à Interface Pro (à changer en production)
const ENCRYPTION_KEY = 'InterfacePro2024_SecureKey_B3MFOUNDI';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 heures en millisecondes

// Interface pour les données de session
interface SessionData {
  username: string;
  loginTime: number;
  lastActivity: number;
  sessionId: string;
  ipAddress?: string;
}

// Interface pour les tentatives de connexion
interface LoginAttempt {
  timestamp: number;
  success: boolean;
  ipAddress?: string;
}

/**
 * Chiffre une chaîne de caractères
 */
export function encryptData(data: string): string {
  try {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  } catch (error) {
    console.error('Erreur de chiffrement:', error);
    return '';
  }
}

/**
 * Déchiffre une chaîne de caractères
 */
export function decryptData(encryptedData: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Erreur de déchiffrement:', error);
    return '';
  }
}

/**
 * Génère un ID de session unique
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return CryptoJS.SHA256(timestamp + random + ENCRYPTION_KEY).toString();
}

/**
 * Hache un mot de passe avec salt
 */
export function hashPassword(password: string, salt?: string): string {
  const saltToUse = salt || CryptoJS.lib.WordArray.random(128/8).toString();
  const hash = CryptoJS.PBKDF2(password, saltToUse, {
    keySize: 256/32,
    iterations: 10000
  }).toString();
  return `${saltToUse}:${hash}`;
}

/**
 * Vérifie un mot de passe haché
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  try {
    const [salt, hash] = hashedPassword.split(':');
    const testHash = CryptoJS.PBKDF2(password, salt, {
      keySize: 256/32,
      iterations: 10000
    }).toString();
    return testHash === hash;
  } catch (error) {
    console.error('Erreur de vérification du mot de passe:', error);
    return false;
  }
}

/**
 * Sauvegarde une session chiffrée
 */
export function saveSecureSession(sessionData: SessionData): void {
  try {
    const encryptedSession = encryptData(JSON.stringify(sessionData));
    localStorage.setItem('interface-pro-admin-session', encryptedSession);
    
    // Sauvegarder aussi l'heure d'expiration
    const expirationTime = Date.now() + SESSION_DURATION;
    localStorage.setItem('interface-pro-session-expiry', expirationTime.toString());
  } catch (error) {
    console.error('Erreur de sauvegarde de session:', error);
  }
}

/**
 * Récupère une session déchiffrée
 */
export function getSecureSession(): SessionData | null {
  try {
    const encryptedSession = localStorage.getItem('interface-pro-admin-session');
    const expiryTime = localStorage.getItem('interface-pro-session-expiry');
    
    if (!encryptedSession || !expiryTime) {
      return null;
    }

    // Vérifier l'expiration
    if (Date.now() > parseInt(expiryTime)) {
      clearSecureSession();
      return null;
    }

    const decryptedData = decryptData(encryptedSession);
    if (!decryptedData) {
      return null;
    }

    const sessionData: SessionData = JSON.parse(decryptedData);
    
    // Vérifier la validité de la session
    if (Date.now() - sessionData.lastActivity > SESSION_DURATION) {
      clearSecureSession();
      return null;
    }

    // Mettre à jour l'activité
    sessionData.lastActivity = Date.now();
    saveSecureSession(sessionData);

    return sessionData;
  } catch (error) {
    console.error('Erreur de récupération de session:', error);
    clearSecureSession();
    return null;
  }
}

/**
 * Supprime la session sécurisée
 */
export function clearSecureSession(): void {
  localStorage.removeItem('interface-pro-admin-session');
  localStorage.removeItem('interface-pro-session-expiry');
  localStorage.removeItem('interface-pro-login-attempts');
}

/**
 * Enregistre une tentative de connexion
 */
export function recordLoginAttempt(success: boolean): void {
  try {
    const attempts = getLoginAttempts();
    const newAttempt: LoginAttempt = {
      timestamp: Date.now(),
      success,
      ipAddress: 'localhost' // En production, récupérer la vraie IP
    };
    
    attempts.push(newAttempt);
    
    // Garder seulement les 50 dernières tentatives
    const recentAttempts = attempts.slice(-50);
    
    const encryptedAttempts = encryptData(JSON.stringify(recentAttempts));
    localStorage.setItem('interface-pro-login-attempts', encryptedAttempts);
  } catch (error) {
    console.error('Erreur d\'enregistrement de tentative:', error);
  }
}

/**
 * Récupère les tentatives de connexion
 */
export function getLoginAttempts(): LoginAttempt[] {
  try {
    const encryptedAttempts = localStorage.getItem('interface-pro-login-attempts');
    if (!encryptedAttempts) {
      return [];
    }
    
    const decryptedData = decryptData(encryptedAttempts);
    return decryptedData ? JSON.parse(decryptedData) : [];
  } catch (error) {
    console.error('Erreur de récupération des tentatives:', error);
    return [];
  }
}

/**
 * Vérifie si l'utilisateur est bloqué (protection brute force)
 */
export function isUserBlocked(): { blocked: boolean; remainingTime?: number } {
  const attempts = getLoginAttempts();
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);
  
  // Compter les échecs des 5 dernières minutes
  const recentFailures = attempts.filter(attempt => 
    !attempt.success && attempt.timestamp > fiveMinutesAgo
  );
  
  if (recentFailures.length >= 5) {
    const lastFailure = Math.max(...recentFailures.map(a => a.timestamp));
    const blockEndTime = lastFailure + (15 * 60 * 1000); // Bloqué 15 minutes
    
    if (now < blockEndTime) {
      return {
        blocked: true,
        remainingTime: Math.ceil((blockEndTime - now) / 1000 / 60) // minutes restantes
      };
    }
  }
  
  return { blocked: false };
}

/**
 * Valide la force d'un mot de passe
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score += 1;
  else feedback.push('Au moins 8 caractères requis');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Au moins une minuscule requise');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Au moins une majuscule requise');
  
  if (/\d/.test(password)) score += 1;
  else feedback.push('Au moins un chiffre requis');
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Au moins un caractère spécial requis');
  
  return {
    valid: score >= 4,
    score,
    feedback
  };
}

/**
 * Génère un token CSRF
 */
export function generateCSRFToken(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}

/**
 * Valide un token CSRF
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = sessionStorage.getItem('csrf-token');
  return storedToken === token;
}
