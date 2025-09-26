import Link from "next/link";

const categories = [
  {
    name: "Ordinateurs & Accessoires",
    description: "PC portables, ordinateurs de bureau, écrans, claviers, souris",
    icon: "💻",
    href: "/categories/ordinateurs",
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Imprimantes & Scanners",
    description: "Imprimantes laser/jet d'encre, multifonctions, scanners",
    icon: "🖨️",
    href: "/categories/imprimantes",
    color: "bg-red-100 text-red-600"
  },
  {
    name: "Consommables",
    description: "Cartouches d'encre, toners, papiers spéciaux",
    icon: "🖋️",
    href: "/categories/consommables",
    color: "bg-green-100 text-green-600"
  },
  {
    name: "Réseaux & Périphériques",
    description: "Routeurs, disques durs externes, clés USB, câbles, casques, webcams",
    icon: "🌐",
    href: "/categories/reseaux",
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "Promotions & Offres",
    description: "Bons plans, démarques et packs spéciaux",
    icon: "🎯",
    href: "/promotions",
    color: "bg-orange-100 text-orange-600"
  },
  {
    name: "Services & Assistance",
    description: "Installation, maintenance, garanties, conseils d'achat",
    icon: "🔧",
    href: "/services",
    color: "bg-indigo-100 text-indigo-600"
  }
];

export default function ProductCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Catégories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits et services informatiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group block p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.color} mb-4`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
