'use client';

import { useProducts } from '@/hooks/useProducts';
import { 
  CubeIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  StarIcon,
  TagIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface StatsOverviewProps {
  detailed?: boolean;
}

export default function StatsOverview({ detailed = false }: StatsOverviewProps) {
  const { products, getStats, getCategories, getProductsByCategory } = useProducts();
  const stats = getStats();
  const categories = getCategories();

  const statCards = [
    {
      title: 'Total Produits',
      value: stats.total,
      icon: CubeIcon,
      color: 'blue',
      description: 'Nombre total de produits dans le catalogue'
    },
    {
      title: 'En Stock',
      value: stats.inStock,
      icon: CheckCircleIcon,
      color: 'green',
      description: 'Produits disponibles à la vente'
    },
    {
      title: 'Rupture de Stock',
      value: stats.outOfStock,
      icon: XCircleIcon,
      color: 'red',
      description: 'Produits temporairement indisponibles'
    },
    {
      title: 'Produits Vedettes',
      value: stats.featured,
      icon: StarIcon,
      color: 'yellow',
      description: 'Produits mis en avant sur le site'
    },
    {
      title: 'Catégories',
      value: stats.categories,
      icon: TagIcon,
      color: 'purple',
      description: 'Nombre de catégories différentes'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-4">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`p-4 rounded-lg border-2 ${getColorClasses(stat.color)} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-75">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-6 h-6 ${getIconColorClasses(stat.color)}`} />
              </div>
              {detailed && (
                <p className="text-xs mt-2 opacity-75">{stat.description}</p>
              )}
            </div>
          );
        })}
      </div>

      {detailed && (
        <>
          {/* Répartition par catégorie */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Répartition par catégorie
            </h3>
            <div className="space-y-4">
              {categories.map(category => {
                const categoryProducts = getProductsByCategory(category);
                const percentage = stats.total > 0 ? (categoryProducts.length / stats.total) * 100 : 0;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {category.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">
                        {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Produits récents */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Derniers produits ajoutés
            </h3>
            <div className="space-y-3">
              {products
                .slice(-5)
                .reverse()
                .map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600 capitalize">{product.category.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {product.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⭐
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Alertes et recommandations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Alertes et recommandations
            </h3>
            <div className="space-y-3">
              {stats.outOfStock > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Attention :</strong> {stats.outOfStock} produit{stats.outOfStock > 1 ? 's sont' : ' est'} en rupture de stock.
                  </p>
                </div>
              )}
              
              {stats.featured === 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Conseil :</strong> Aucun produit n'est marqué comme "vedette". Mettez en avant vos meilleurs produits !
                  </p>
                </div>
              )}
              
              {stats.total < 10 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>📈 Suggestion :</strong> Votre catalogue contient moins de 10 produits. Ajoutez plus de produits pour attirer plus de clients.
                  </p>
                </div>
              )}

              {stats.outOfStock === 0 && stats.featured > 0 && stats.total >= 10 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>✅ Excellent :</strong> Votre catalogue est bien organisé ! Tous les produits sont en stock et vous avez des produits vedettes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
