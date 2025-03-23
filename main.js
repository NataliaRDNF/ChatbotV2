/**
 * Mise à jour du fichier main.js pour intégrer le traitement amélioré des messages
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  console.log("Initialisation du chatbot LYNX avec moteur amélioré...");
  
  // Vérifier que tous les modules nécessaires sont chargés
  try {
    // Vérifier la présence des modules requis
    if (typeof DATA === 'undefined') {
      throw new Error("Module data-model.js non chargé");
    }
    
    if (typeof processUserMessage === 'undefined') {
      throw new Error("Module engine.js non chargé");
    }
    
    if (typeof processUserMessageAmélioré === 'undefined') {
      console.warn("Module improved-engine.js non chargé, utilisation du moteur standard");
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
    
    // Remplacer la fonction de traitement dans chat-lynx.js
    if (typeof processUserMessageAmélioré !== 'undefined') {
      // Sauvegarder l'ancienne fonction pour compatibilité
      window.processUserMessageOriginal = processUserMessage;
      
      // Remplacer par la version améliorée
      window.processUserMessage = function(message) {
        try {
          // Utiliser le moteur amélioré
          const reponse = processUserMessageAmélioré(message);
          
          // Enrichir avec des références juridiques si applicable
          if (typeof enrichirReponseAvecReferencesJuridiques === 'function') {
            return enrichirReponseAvecReferencesJuridiques(message, reponse);
          } else {
            return reponse;
          }
        } catch (error) {
          console.error("Erreur lors du traitement amélioré, retour à la version standard:", error);
          // Fallback sur l'ancienne version si erreur
          return window.processUserMessageOriginal(message);
        }
      };
      
      console.log("Moteur de traitement des messages amélioré activé");
    }
    
    console.log("Chatbot LYNX initialisé avec succès");
    
  } catch (error) {
    console.error("Erreur lors de l'initialisation du chatbot:", error);
    // Afficher un message d'erreur à l'utilisateur
    alert("Le chatbot n'a pas pu être initialisé correctement. Veuillez rafraîchir la page.");
  }
});

// Mise à jour de l'API publique
if (window.LYNX) {
  // Ajouter de nouvelles fonctionnalités
  window.LYNX.toggleAmelioredEngine = function(active) {
    if (active) {
      if (typeof processUserMessageAmélioré !== 'undefined') {
        window.processUserMessage = function(message) {
          const reponse = processUserMessageAmélioré(message);
          if (typeof enrichirReponseAvecReferencesJuridiques === 'function') {
            return enrichirReponseAvecReferencesJuridiques(message, reponse);
          } else {
            return reponse;
          }
        };
        console.log("Moteur amélioré activé");
        return true;
      } else {
        console.warn("Moteur amélioré non disponible");
        return false;
      }
    } else {
      if (typeof window.processUserMessageOriginal !== 'undefined') {
        window.processUserMessage = window.processUserMessageOriginal;
        console.log("Moteur standard restauré");
        return true;
      } else {
        console.warn("Impossible de restaurer le moteur standard");
        return false;
      }
    }
  };
  
  // Ajouter l'indication du moteur utilisé
  window.LYNX.getEngineStatus = function() {
    return {
      isAmelioredActive: typeof processUserMessageAmélioré !== 'undefined' && 
                          window.processUserMessage.toString() !== window.processUserMessageOriginal?.toString(),
      isOriginalAvailable: typeof window.processUserMessageOriginal !== 'undefined'
    };
  };
}
