import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Interface Pro
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Votre partenaire informatique de confiance
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-80 max-w-3xl mx-auto">
            Ordinateurs, imprimantes, consommables et accessoires informatiques. 
            Installation, maintenance et conseils d'experts au cœur de Yaoundé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/produits"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Voir nos produits
            </Link>
            <a
              href="https://wa.me/237673010098"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Nous contacter
            </a>
          </div>

          {/* Location info */}
          <div className="mt-12 text-center">
            <p className="text-lg opacity-90">
              📍 Espace commercial le MFOUNDI - Boutique B3-3
            </p>
            <p className="text-base opacity-80 mt-2">
              Entre le marché central et face Hilton
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
