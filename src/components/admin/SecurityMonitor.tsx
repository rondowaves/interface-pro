'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthSimple';
import { getLoginAttempts } from '@/utils/security';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function SecurityMonitor() {
  const { sessionInfo, getSessionDuration } = useAuth();
  const [loginAttempts, setLoginAttempts] = useState<any[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadLoginAttempts();
    
    // Actualiser toutes les minutes
    const interval = setInterval(loadLoginAttempts, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadLoginAttempts = () => {
    const attempts = getLoginAttempts();
    setLoginAttempts(attempts);
  };

  const getRecentFailures = () => {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    return loginAttempts.filter(attempt => 
      !attempt.success && attempt.timestamp > oneHourAgo
    );
  };

  const getSuccessfulLogins = () => {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    return loginAttempts.filter(attempt => 
      attempt.success && attempt.timestamp > oneDayAgo
    );
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSecurityLevel = () => {
    const recentFailures = getRecentFailures();
    if (recentFailures.length === 0) return 'excellent';
    if (recentFailures.length <= 2) return 'good';
    if (recentFailures.length <= 5) return 'warning';
    return 'danger';
  };

  const securityLevel = getSecurityLevel();
  const recentFailures = getRecentFailures();
  const successfulLogins = getSuccessfulLogins();

  const securityColors = {
    excellent: 'text-green-600 bg-green-100 border-green-200',
    good: 'text-blue-600 bg-blue-100 border-blue-200',
    warning: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    danger: 'text-red-600 bg-red-100 border-red-200'
  };

  const securityMessages = {
    excellent: '🛡️ Sécurité excellente - Aucune tentative suspecte',
    good: '✅ Sécurité bonne - Activité normale',
    warning: '⚠️ Attention - Quelques tentatives échouées détectées',
    danger: '🚨 Alerte - Nombreuses tentatives d\'intrusion détectées'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          Surveillance Sécurité
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
        >
          <EyeIcon className="w-4 h-4 mr-1" />
          {showDetails ? 'Masquer' : 'Détails'}
        </button>
      </div>

      {/* Niveau de sécurité */}
      <div className={`p-4 rounded-lg border-2 mb-4 ${securityColors[securityLevel]}`}>
        <p className="font-medium">{securityMessages[securityLevel]}</p>
      </div>

      {/* Informations de session */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <ClockIcon className="w-4 h-4 mr-1" />
            Session active
          </div>
          <p className="font-medium text-gray-900">
            {getSessionDuration()} minutes
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
            Échecs (1h)
          </div>
          <p className="font-medium text-gray-900">
            {recentFailures.length}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <ShieldCheckIcon className="w-4 h-4 mr-1" />
            Connexions (24h)
          </div>
          <p className="font-medium text-gray-900">
            {successfulLogins.length}
          </p>
        </div>
      </div>

      {/* Détails de sécurité */}
      {showDetails && (
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Session actuelle</h4>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <strong>Utilisateur :</strong> {sessionInfo?.username}
                </div>
                <div>
                  <strong>ID Session :</strong> {sessionInfo?.sessionId?.substring(0, 8)}...
                </div>
                <div>
                  <strong>Connexion :</strong> {sessionInfo?.loginTime ? formatTimestamp(sessionInfo.loginTime) : 'N/A'}
                </div>
                <div>
                  <strong>IP :</strong> localhost (développement)
                </div>
              </div>
            </div>
          </div>

          {recentFailures.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3 text-red-600">
                Tentatives échouées récentes
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recentFailures.slice(0, 10).map((attempt, index) => (
                  <div key={index} className="bg-red-50 p-2 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-red-700">
                        Échec de connexion
                      </span>
                      <span className="text-red-600 text-xs">
                        {formatTimestamp(attempt.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Connexions réussies (24h)
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {successfulLogins.slice(0, 5).map((attempt, index) => (
                <div key={index} className="bg-green-50 p-2 rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">
                      Connexion réussie
                    </span>
                    <span className="text-green-600 text-xs">
                      {formatTimestamp(attempt.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conseils de sécurité */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Conseils de sécurité Interface Pro</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Changez régulièrement votre mot de passe admin</li>
              <li>• Déconnectez-vous toujours après utilisation</li>
              <li>• N'accédez à l'admin que depuis des appareils sécurisés</li>
              <li>• Surveillez les tentatives de connexion suspectes</li>
              <li>• En cas d'activité anormale, changez immédiatement le mot de passe</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
