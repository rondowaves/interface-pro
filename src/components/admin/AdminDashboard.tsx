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
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';

type TabType = 'overview' | 'products' | 'stats' | 'security';

export default function AdminDashboard() {
  const { logout, sessionInfo } = useAuth();
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
    { 
      id: 'overview', 
      name: 'Vue d\'ensemble', 
      icon: HomeIcon,
      description: 'Tableau de bord principal'
    },
    { 
      id: 'products', 
      name: 'Gestion Produits', 
      icon: CubeIcon,
      description: 'Ajouter, modifier, supprimer'
    },
    { 
      id: 'stats', 
      name: 'Statistiques', 
      icon: ChartBarIcon,
      description: 'Analyses et rapports'
    },
    { 
      id: 'security', 
      name: 'Sécurité', 
      icon: ShieldCheckIcon,
      description: 'Monitoring et protection'
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            {/* En-tête compact */}
            <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Interface Pro Admin</h1>
                  <p className="text-blue-100 mt-1 text-sm">B3-3, Espace commercial le MFOUNDI - Yaoundé</p>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <div className="text-xl font-bold">{stats.total}</div>
                    <div className="text-xs text-blue-100">Produits</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques compactes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CubeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Total Produits</p>
                    <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <div className="w-5 h-5 text-green-600 font-bold flex items-center justify-center text-sm">✓</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">En Stock</p>
                    <p className="text-xl font-bold text-gray-900">{stats.inStock}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <div className="w-5 h-5 text-yellow-600 font-bold flex items-center justify-center text-sm">★</div>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Vedettes</p>
                    <p className="text-xl font-bold text-gray-900">{stats.featured}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ChartBarIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Catégories</p>
                    <p className="text-xl font-bold text-gray-900">{stats.categories}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions Rapides</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="w-full flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                  >
                    <CubeIcon className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-900">Gérer les Produits</p>
                      <p className="text-sm text-gray-600">Ajouter, modifier ou supprimer des produits</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('stats')}
                    className="w-full flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
                  >
                    <ChartBarIcon className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-900">Voir les Statistiques</p>
                      <p className="text-sm text-gray-600">Analyser les données de votre catalogue</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Contact Interface Pro</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">WhatsApp</span>
                    <a 
                      href="https://wa.me/237673010098" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      673 010 098
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Téléphone</span>
                    <span className="text-sm font-medium text-gray-900">698 597 466</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Email</span>
                    <a 
                      href="mailto:interfacepro40@gmail.com"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      interfacepro40@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-600" />
                  État de la Sécurité
                </h3>
                <button
                  onClick={() => setActiveTab('security')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Voir détails →
                </button>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium">Système sécurisé - Aucune menace détectée</span>
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar backdrop mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - fixe sur desktop, overlay sur mobile */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo et titre */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-red-600">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">IP</span>
            </div>
            <div className="ml-3 text-white">
              <div className="text-lg font-bold">Interface Pro</div>
              <div className="text-xs text-blue-100">Administration</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Informations utilisateur */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">Administrateur</div>
              <div className="text-xs text-gray-600">Interface Pro Admin</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Session active • {stats.total} produits gérés
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <div className="text-left">
                    <div className={isActive ? 'text-white' : 'text-gray-900'}>{item.name}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
        
        {/* Pied de sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-xs font-medium text-blue-900">Interface Pro</div>
            <div className="text-xs text-blue-700">B3-3, Espace MFOUNDI</div>
            <div className="text-xs text-blue-600 mt-1">Yaoundé, Cameroun</div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50 rounded-xl transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main content - à droite de la sidebar */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar - commence tout en haut */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="ml-2 lg:ml-0">
                <h2 className="text-lg font-semibold text-gray-900">
                  {navigation.find(item => item.id === activeTab)?.name}
                </h2>
                <p className="text-xs text-gray-600">
                  {navigation.find(item => item.id === activeTab)?.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{stats.total} produits • {stats.inStock} en stock</span>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
              >
                Voir le site
              </a>
            </div>
          </div>
        </div>

        {/* Page content - flex-1 pour occuper l'espace restant */}
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
