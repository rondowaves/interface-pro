'use client';

export default function ServicesSection() {
  const services = [
    {
      icon: '🛠️',
      title: 'Installation & Maintenance',
      description: 'Installation professionnelle et maintenance de vos équipements informatiques',
      features: ['Installation sur site', 'Maintenance préventive', 'Support technique', 'Garantie service']
    },
    {
      icon: '💡',
      title: 'Conseil d\'Expert',
      description: 'Conseils personnalisés pour choisir les meilleurs équipements selon vos besoins',
      features: ['Analyse des besoins', 'Recommandations', 'Devis gratuit', 'Suivi personnalisé']
    },
    {
      icon: '🚚',
      title: 'Livraison Rapide',
      description: 'Livraison rapide dans tout Yaoundé ou retrait en boutique B3-3 MFOUNDI',
      features: ['Livraison Yaoundé', 'Retrait boutique', 'Livraison express', 'Suivi commande']
    },
    {
      icon: '🔒',
      title: 'Garantie Qualité',
      description: 'Produits authentiques avec garantie constructeur et service après-vente',
      features: ['Produits authentiques', 'Garantie constructeur', 'SAV disponible', 'Échange possible']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Interface Pro ?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Depuis notre boutique B3-3 MFOUNDI, nous vous offrons une expérience complète 
            avec des services professionnels et un accompagnement personnalisé.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group hover:-translate-y-2"
            >
              {/* Icône */}
              <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Titre */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 text-center">
                {service.description}
              </p>

              {/* Fonctionnalités */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt à équiper votre entreprise ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour un devis gratuit et personnalisé. 
              Notre équipe d'experts vous accompagne dans tous vos projets informatiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/237673010098?text=Bonjour, je souhaite un devis pour mes besoins informatiques"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <span className="mr-2">📱</span>
                Devis WhatsApp
              </a>
              <a
                href="tel:698597466"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <span className="mr-2">📞</span>
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
