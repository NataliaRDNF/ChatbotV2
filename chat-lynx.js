/**
 * Chatbot LYNX pour les aires protégées du PNR du Massif des Bauges
 * Script principal
 */

document.addEventListener('DOMContentLoaded', function() {
  // Génération d'un jeton de sécurité pour la requête
  const securityToken = generateRandomToken();
  
  // Vérification pour éviter les doublons
  const existingChatbot = document.getElementById('simple-chat-btn');
  if (existingChatbot && existingChatbot.getAttribute('data-initialized') === 'true') {
    console.log('Le chatbot est déjà installé sur cette page');
    return;
  }
  
  // Éléments du DOM
  const chatBtn = document.getElementById('simple-chat-btn');
  if (chatBtn) chatBtn.setAttribute('data-initialized', 'true');
  const chatWindow = document.getElementById('simple-chat-window');
  const chatClose = document.getElementById('simple-chat-close');
  const chatInput = document.getElementById('simple-chat-input');
  const chatSend = document.getElementById('simple-chat-send');
  const chatMessages = document.getElementById('simple-chat-messages');
  
  // Protection contre les attaques par force brute
  const rateLimiter = {
    attempts: 0,
    lastAttempt: Date.now(),
    maxAttempts: 20,
    resetTime: 60000, // 1 minute en millisecondes
    check: function() {
      const now = Date.now();
      // Réinitialiser le compteur après resetTime
      if (now - this.lastAttempt > this.resetTime) {
        this.attempts = 0;
      }
      this.lastAttempt = now;
      this.attempts++;
      // Vérifier si le nombre max de tentatives est atteint
      return this.attempts <= this.maxAttempts;
    }
  };

  // ===== FONCTIONS UTILITAIRES =====
  
  function generateRandomToken() {
    // Génération d'un jeton aléatoire pour la protection CSRF
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  function sanitizeHTML(str) {
    // Sécurisation contre les injections XSS
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  function toggleChat() {
    if (chatWindow.style.display === 'flex') {
      chatWindow.style.display = 'none';
    } else {
      chatWindow.style.display = 'flex';
    }
  }

  function closeChat() {
    chatWindow.style.display = 'none';
  }

  function addUserMessage(message) {
    const maxLength = 500;
    if (message.length > maxLength) {
      message = message.substring(0, maxLength) + "... [Message tronqué]";
    }
    const div = document.createElement('div');
    div.className = 'user-message';
    div.textContent = message; // Utilise textContent pour éviter les injections XSS
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(message) {
    const div = document.createElement('div');
    div.className = 'bot-message';
    div.innerHTML = ''; // initialisation vide
    chatMessages.appendChild(div);
    
    // Remise en place des balises autorisées
    const allowedTags = ['a', 'br', 'strong', 'em', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'div'];
    const allowedAttributes = {
      'a': ['href', 'target', 'rel'],
      'div': ['class']
    };
    
    // Sanitize initial du message
    const template = document.createElement('template');
    template.innerHTML = message;
    const cleanHTML = sanitizeContent(template.content.cloneNode(true), allowedTags, allowedAttributes);
    
    // Extraction texte pour animation
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(cleanHTML.cloneNode(true));
    const textContent = tempDiv.textContent || "";
    let i = 0;
    
    // Fonction d'animation sécurisée
    function typeText() {
      if (i < textContent.length) {
        div.textContent += textContent.charAt(i);
        i++;
        // Utiliser scrollTop pour un défilement plus contrôlé
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(typeText, 20);
      } else {
        // insertion HTML sécurisé après animation texte
        div.innerHTML = '';
        div.appendChild(cleanHTML);
        
        // sécurisation finale des liens
        const links = div.querySelectorAll('a');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          } else {
            link.removeAttribute('href'); // supprimer les liens non sécurisés
          }
        });
        
        // Un dernier scroll pour s'assurer que tout le message est visible
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
    
    setTimeout(typeText, 300); // délai avant démarrage animation
  }

  function sanitizeContent(content, allowedTags, allowedAttributes) {
    const fragment = document.createDocumentFragment();
    Array.from(content.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Conserver les nœuds texte tels quels
        fragment.appendChild(node.cloneNode());
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.nodeName.toLowerCase();
        if (allowedTags.includes(tagName)) {
          const cleanNode = document.createElement(tagName);
          // Ajouter uniquement les attributs autorisés
          if (allowedAttributes[tagName]) {
            Array.from(node.attributes).forEach(attr => {
              if (allowedAttributes[tagName].includes(attr.name)) {
                cleanNode.setAttribute(attr.name, attr.value);
                // Sécurisation des liens
                if (tagName === 'a' && attr.name === 'href') {
                  const href = attr.value;
                  // Vérification stricte des liens : doivent être valides et sûrs
                  if (!(href.startsWith('http://') ||
                      href.startsWith('https://') ||
                      href.startsWith('/') ||
                      href.startsWith('#'))) {
                    cleanNode.removeAttribute('href');
                  } else {
                    // Ajout de sécurité supplémentaire
                    cleanNode.setAttribute('target', '_blank');
                    cleanNode.setAttribute('rel', 'noopener noreferrer');
                  }
                }
              }
            });
          }
          // Nettoyer récursivement les enfants
          const cleanChildren = sanitizeContent(node, allowedTags, allowedAttributes);
          cleanNode.appendChild(cleanChildren);
          fragment.appendChild(cleanNode);
        } else {
          // Si la balise n'est pas autorisée, récupérer seulement le texte
          fragment.appendChild(document.createTextNode(node.textContent));
        }
      }
    });
    return fragment;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      typingDiv.appendChild(dot);
    }
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // ===== FONCTION PRINCIPALE DE GESTION DES MESSAGES =====
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Vérification du limiteur de débit
    if (!rateLimiter.check()) {
      addBotMessage("Vous avez effectué trop de requêtes. Veuillez patienter quelques instants avant de réessayer.");
      return;
    }
    
    // Valider la taille du message (prévention d'attaques DoS)
    if (message.length > 500) {
      addBotMessage("Votre message est trop long. Veuillez le raccourcir (500 caractères maximum).");
      return;
    }
    
    // Ajouter le message de l'utilisateur à la conversation
    addUserMessage(message);
    chatInput.value = '';
    
    // Effet de chargement
    showTypingIndicator();
    
    // Simuler un délai de traitement
    setTimeout(() => {
      removeTypingIndicator();
      
      try {
        // Trouver une réponse pertinente en utilisant le moteur de traitement
        let reponse = processUserMessage(message);
        
        // Enrichir la réponse avec des références juridiques si pertinent
        if (typeof enrichirReponseAvecReferencesJuridiques === 'function') {
          reponse = enrichirReponseAvecReferencesJuridiques(message, reponse);
        }
        
        // Si pas de réponse spécifique, utiliser une réponse par défaut
        if (!reponse || reponse.includes("Je n'ai pas compris") || reponse.includes("Je n'ai pas d'information")) {
          reponse = "Je n'ai pas d'information spécifique sur ce sujet. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc via leur formulaire de contact.";
        }
        
        // Ajouter la réponse à la conversation
        addBotMessage(reponse);
      } catch (error) {
        console.error("Erreur lors du traitement du message:", error);
        addBotMessage("Désolé, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ultérieurement.");
      }
    }, 1000);
  }

  // ===== ATTACHER LES ÉVÉNEMENTS =====
  
  try {
    if (chatBtn) chatBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleChat();
    });
    
    if (chatClose) chatClose.addEventListener('click', function(e) {
      e.preventDefault();
      closeChat();
    });
    
    if (chatSend) chatSend.addEventListener('click', function(e) {
      e.preventDefault();
      sendMessage();
    });
    
    if (chatInput) {
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });
      
      // Protection contre les injections XSS via le champ de saisie
      chatInput.addEventListener('input', function(e) {
        // Limiter la longueur pour éviter les attaques DoS
        if (this.value.length > 500) {
          this.value = this.value.substring(0, 500);
        }
        
        // Empêcher les caractères potentiellement dangereux
        this.value = this.value.replace(/<[^>]*>/g, '');
      });
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du chatbot:', error);
  }

  // Ajout d'un event listener pour la fermeture de la page
  window.addEventListener('beforeunload', function() {
    // Nettoyage des données sensibles
    if (chatInput) chatInput.value = '';
    // Réinitialisation des tentatives pour le limiteur de débit
    rateLimiter.attempts = 0;
  });
});