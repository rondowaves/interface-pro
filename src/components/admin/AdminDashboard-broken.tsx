'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuthSimple';
import { useProducts } from '@/hooks/useProducts';
import ProductsManager from './ProductsManager';
import StatsOverview from './StatsOverview';
import SecurityMonitor from './SecurityMonitor';
import { 
  HomeIcon, 
  CubeIcon, 
  ChartBarIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

type TabType = 'overview' | 'products' | 'stats' | 'security';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { getStats } = useProducts();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const stats = getStats();

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  const navigation = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: HomeIcon },
    { id: 'products', name: 'Gestion Produits', icon: CubeIcon },
    { id: 'stats', name: 'Statistiques', icon: ChartBarIcon },
    { id: 'security', name: 'Sécurité', icon: ShieldCheckIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Interface Pro</h1>
              <p className="text-gray-600 mt-1">Gérez facilement vos produits et suivez vos statistiques</p>
            </div>
            
            {/* Statistiques principales */}
            <StatsOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Actions rapides */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions rapides</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
                  >
                    <CubeIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 text-sm">Produits</p>
                    <p className="text-xs text-gray-600">Gérer</p>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('stats')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
                  >
                    <ChartBarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 text-sm">Stats</p>
                    <p className="text-xs text-gray-600">Analyser</p>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-center"
                  >
                    <ShieldCheckIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900 text-sm">Sécurité</p>
                    <p className="text-xs text-gray-600">Monitor</p>
                  </button>
                  
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
                  >
                    <div className="w-8 h-8 mx-auto mb-2 text-2xl">🌐</div>
                    <p className="font-medium text-gray-900 text-sm">Site</p>
                    <p className="text-xs text-gray-600">Voir</p>
                  </a>
                </div>
              </div>
              
              {/* Surveillance sécurité compacte */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 flex items-center">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Sécurité
                  </h3>
                  <button
                    onClick={() => setActiveTab('security')}
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    Détails →
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-center">
                    <p className="text-xs text-green-800">
                      <strong>✅ Excellent</strong>
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-sm font-bold text-gray-900">0</div>
                      <div className="text-xs text-gray-600">Échecs</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-sm font-bold text-gray-900">1</div>
                      <div className="text-xs text-gray-600">Sessions</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-sm font-bold text-green-600">●</div>
                      <div className="text-xs text-gray-600">Active</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Informations Interface Pro */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">📍 Interface Pro</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Localisation :</span>
                    <span className="font-medium">B3-3 MFOUNDI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">WhatsApp :</span>
                    <span className="font-medium">673 010 098</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email :</span>
                    <span className="font-medium">interfacepro40@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Téléphone :</span>
                    <span className="font-medium">698 597 466</span>
                  </div>
                </div>
                
                {/* Raccourcis compacts */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-4 gap-2">
                    <a
                      href="https://wa.me/237673010098"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-50 hover:bg-green-100 p-2 rounded text-center transition-colors"
                    >
                      <div className="text-sm">📱</div>
                      <div className="text-xs text-gray-600">WA</div>
                    </a>
                    <a
                      href="mailto:interfacepro40@gmail.com"
                      className="bg-blue-50 hover:bg-blue-100 p-2 rounded text-center transition-colors"
                    >
                      <div className="text-sm">📧</div>
                      <div className="text-xs text-gray-600">Mail</div>
                    </a>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="bg-purple-50 hover:bg-purple-100 p-2 rounded text-center transition-colors"
                    >
                      <div className="text-sm">➕</div>
                      <div className="text-xs text-gray-600">Add</div>
                    </button>
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-50 hover:bg-orange-100 p-2 rounded text-center transition-colors"
                    >
                      <div className="text-sm">🌐</div>
                      <div className="text-xs text-gray-600">Site</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
              {/* Informations Interface Pro */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Informations Interface Pro</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Localisation :</span>
                      <span className="font-medium">B3-3, Espace MFOUNDI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">WhatsApp :</span>
                      <span className="font-medium">673 010 098</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email :</span>
                      <span className="font-medium">interfacepro40@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone :</span>
                      <span className="font-medium">698 597 466</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Raccourcis rapides */}
              <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-lg shadow p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">🚀 Raccourcis Interface Pro</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/237673010098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors text-center"
                  >
                    <div className="text-xl mb-1">📱</div>
                    <div className="text-xs font-medium">WhatsApp</div>
                  </a>
                  <a
                    href="mailto:interfacepro40@gmail.com"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors text-center"
                  >
                    <div className="text-xl mb-1">📧</div>
                    <div className="text-xs font-medium">Email</div>
                  </a>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors text-center"
                  >
                    <div className="text-xl mb-1">➕</div>
                    <div className="text-xs font-medium">Ajouter</div>
                  </button>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors text-center"
                  >
                    <div className="text-xl mb-1">🌐</div>
                    <div className="text-xs font-medium">Site</div>
                  </a>
                </div>
                
                {/* Status Interface Pro */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-75">B3-3 MFOUNDI</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ En ligne
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'products':
        return <ProductsManager />;
      case 'stats':
        return <StatsOverview detailed />;
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Surveillance Sécurité</h1>
              <p className="text-gray-600 mt-2">Monitoring et protection de votre interface admin</p>
            </div>
            <SecurityMonitor />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {stats.total} produits • {stats.inStock} en stock
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
