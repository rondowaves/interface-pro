'use client';

export default function TrustSection() {
  const stats = [
    {
      number: '500+',
      label: 'Clients Satisfaits',
      description: 'Entreprises et particuliers nous font confiance'
    },
    {
      number: '5+',
      label: 'Années d\'Expérience',
      description: 'Au service de la communauté de Yaoundé'
    },
    {
      number: '1000+',
      label: 'Produits Vendus',
      description: 'Équipements informatiques de qualité'
    },
    {
      number: '24h',
      label: 'Support Réactif',
      description: 'Réponse rapide à vos demandes'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Ngono',
      role: 'Directrice PME',
      content: 'Interface Pro nous a équipés complètement. Service impeccable et produits de qualité !',
      rating: 5
    },
    {
      name: 'Jean-Paul Mbida',
      role: 'Étudiant',
      content: 'Excellent conseil pour mon ordinateur portable. Prix compétitif et livraison rapide.',
      rating: 5
    },
    {
      name: 'Société CAMTECH',
      role: 'Entreprise',
      content: 'Partenaire de confiance pour tous nos besoins informatiques. Très professionnel.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistiques */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interface Pro en chiffres
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            La confiance de nos clients fait notre réputation
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Ce que disent nos clients
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Étoiles */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>

                {/* Contenu */}
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>

                {/* Auteur */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications et garanties */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Nos Garanties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold">Produits Authentiques</div>
              <div className="text-blue-100 text-sm">Garantie constructeur officielle</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold">Paiement Sécurisé</div>
              <div className="text-blue-100 text-sm">Transactions protégées</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📍</div>
              <div className="font-semibold">Boutique Physique</div>
              <div className="text-blue-100 text-sm">B3-3 MFOUNDI, Yaoundé</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
