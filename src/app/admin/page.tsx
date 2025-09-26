'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthSimple';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SecurityWrapper from '@/components/admin/SecurityWrapper';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AdminPage() {
  const { isAuthenticated, loading, login, sessionInfo } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsBlocked(false);

    // Délai de sécurité pour éviter les attaques par timing
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(username, password);
    
    if (!result.success) {
      setError(result.message);
      
      if (result.blocked) {
        setIsBlocked(true);
        setBlockTime(result.remainingTime || 0);
      }
    } else {
      // Réinitialiser le formulaire en cas de succès
      setUsername('');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <SecurityWrapper>
        <AdminDashboard />
      </SecurityWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              IP
            </span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Administration Interface Pro
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Connectez-vous pour gérer vos produits
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom d'utilisateur"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mot de passe"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className={`mt-4 p-3 border rounded ${
                isBlocked 
                  ? 'bg-orange-100 border-orange-400 text-orange-700'
                  : 'bg-red-100 border-red-400 text-red-700'
              }`}>
                <div className="flex items-center">
                  {isBlocked && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{error}</span>
                </div>
                {isBlocked && blockTime > 0 && (
                  <div className="mt-2 text-sm">
                    <p>🔒 Compte temporairement verrouillé pour votre sécurité.</p>
                    <p>⏱️ Temps restant : {blockTime} minute(s)</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
