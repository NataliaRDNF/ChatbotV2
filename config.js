/**
 * Configuration globale du chatbot LYNX
 * Définit les paramètres et options générales du chatbot
 */

const CONFIG = {
  // Version du chatbot
  version: "1.0.0",
  
  // Configuration de l'interface
  ui: {
    // Délai en ms avant que la réponse du chatbot commence à s'afficher
    delaiReponse: 1000,
    
    // Vitesse d'animation du texte (en ms par caractère)
    vitesseAnimation: 20,
    
    // Nombre maximum de caractères pour un message utilisateur
    longueurMaxMessage: 500,
    
    // Nombre maximum de tentatives autorisées dans une fenêtre de temps
    maxTentatives: 20,
    
    // Temps en ms pour réinitialiser le compteur de tentatives
    tempsReinitialisation: 60000
  },
  
  // Configuration de la sécurité
  securite: {
    // Liste des balises HTML autorisées dans les réponses du chatbot
    balisesAutorisees: ['a', 'br', 'strong', 'em', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'div'],
    
    // Attributs autorisés pour chaque balise
    attributsAutorises: {
      'a': ['href', 'target', 'rel'],
      'div': ['class']
    },
    
    // Limite de taille pour les messages utilisateur (prévention DoS)
    limiteTailleMessage: 500
  },
  
  // Configuration des URLs externes fiables
  urlsSecurisees: {
    // URLs des sites officiels pouvant être référencés
    siteOfficielPNR: "https://parcdesbauges.com",
    cartoPatous: "https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection",
    randoBauges: "https://rando.parcdesbauges.com/"
  },
  
  // Messages par défaut
  messagesDefaut: {
    accueil: "Bonjour ! Je peux vous informer sur les activités autorisées ou interdites dans les différentes aires protégées du Parc naturel régional du Massif des Bauges.\n\nPar exemple : \"Le bivouac est-il autorisé dans la RNCFS ?\" \"Quelles sont les zones interdites aux chiens ?\" ou \"Donne la réglementation dans la Tourbière des Creusates\"",
    erreur: "Désolé, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ultérieurement.",
    rateLimite: "Vous avez effectué trop de requêtes. Veuillez patienter quelques instants avant de réessayer.",
    messageTropLong: "Votre message est trop long. Veuillez le raccourcir (500 caractères maximum)."
  }
};

// Exporter la configuration pour utilisation par d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}