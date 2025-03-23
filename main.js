/**
 * Point d'entrée principal pour le chatbot LYNX
 * Intègre tous les modules et initialise le chatbot
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  console.log("Initialisation du chatbot LYNX...");
  
  // Vérifier que tous les modules nécessaires sont chargés
  try {
    // Vérifier la présence des modules requis
    if (typeof DATA === 'undefined') {
      throw new Error("Module data-model.js non chargé");
    }
    
    if (typeof processUserMessage === 'undefined') {
      throw new Error("Module engine.js non chargé");
    }
    
    if (typeof enrichirReponseAvecReferencesJuridiques === 'undefined') {
      throw new Error("Module enrichissement-juridique.js non chargé");
    }
    
    if (typeof trouverArticlesJuridiques === 'undefined') {
      throw new Error("Module references-juridiques.js non chargé");
    }
    
    if (typeof CONFIG === 'undefined') {
      console.warn("Module config.js non chargé, utilisation des paramètres par défaut");
    }
    
    console.log("Tous les modules requis sont chargés");
    
    // Initialiser le chatbot (cette fonction est définie dans chat-lynx.js)
    // Le code d'initialisation spécifique est déjà présent dans chat-lynx.js
    console.log("Chatbot LYNX initialisé avec succès");
    
  } catch (error) {
    console.error("Erreur lors de l'initialisation du chatbot:", error);
    // Afficher un message d'erreur à l'utilisateur
    alert("Le chatbot n'a pas pu être initialisé correctement. Veuillez rafraîchir la page.");
  }
});

// Exposer des fonctions d'API publiques pour interaction externe
window.LYNX = {
  // Ouvrir la fenêtre de chat
  open: function() {
    const chatWindow = document.getElementById('simple-chat-window');
    if (chatWindow) {
      chatWindow.style.display = 'flex';
    }
  },
  
  // Fermer la fenêtre de chat
  close: function() {
    const chatWindow = document.getElementById('simple-chat-window');
    if (chatWindow) {
      chatWindow.style.display = 'none';
    }
  },
  
  // Envoyer un message programmatiquement
  sendMessage: function(message) {
    const chatInput = document.getElementById('simple-chat-input');
    const chatSend = document.getElementById('simple-chat-send');
    
    if (chatInput && chatSend) {
      chatInput.value = message;
      
      // Simuler un clic sur le bouton d'envoi
      const event = new Event('click');
      chatSend.dispatchEvent(event);
    }
  },
  
  // Réinitialiser la conversation
  resetConversation: function() {
    const chatMessages = document.getElementById('simple-chat-messages');
    
    if (chatMessages) {
      // Vider la zone de messages sauf le message d'accueil
      chatMessages.innerHTML = '';
      
      // Ajouter le message d'accueil
      const welcomeDiv = document.createElement('div');
      welcomeDiv.className = 'bot-message';
      welcomeDiv.innerHTML = CONFIG?.messagesDefaut?.accueil || 
        "Bonjour ! Je peux vous informer sur les activités autorisées ou interdites dans les différentes aires protégées du Parc naturel régional du Massif des Bauges.";
      
      chatMessages.appendChild(welcomeDiv);
    }
  },
  
  // Vérifier si le chatbot est chargé et fonctionnel
  isReady: function() {
    return typeof DATA !== 'undefined' && 
           typeof processUserMessage !== 'undefined' && 
           typeof enrichirReponseAvecReferencesJuridiques !== 'undefined';
  }
};

// Exporter pour utilisation par d'autres modules si nécessaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LYNX: window.LYNX
  };
}
