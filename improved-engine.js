/**
 * Version améliorée du moteur de traitement pour le chatbot LYNX
 * Améliore la précision des réponses et la compréhension contextuelle
 */

/**
 * Fonction principale qui traite un message utilisateur et renvoie une réponse améliorée
 * @param {string} message - Le message de l'utilisateur
 * @return {string} La réponse du chatbot
 */
function processUserMessageAmélioré(message) {
  try {
    // Normaliser le message pour le traitement
    const messageLower = message.toLowerCase();
    
    // Extraire la question réelle (avant le point d'interrogation)
    let questionPrincipale = message;
    if (message.includes('?')) {
      const parties = message.split('?');
      questionPrincipale = parties[0] + '?';
    }
    
    // 1. Identifier le type de question (est-ce une question fermée, ouverte, etc.)
    const typeQuestion = identifierTypeQuestion(questionPrincipale);
    
    // 2. Détecter les aires protégées mentionnées dans le message
    const airesDetectees = detecterAires(messageLower);
    
    // 3. Détecter les thématiques mentionnées dans le message
    const thematiqueDetectees = detecterThematiques(messageLower);
    
    // 4. Vérifier si la question porte sur une autorisation/interdiction
    const concerne = {
      autorisation: verifierSiAutorisationQuestion(messageLower),
      explication: verifierSiExplicationQuestion(messageLower),
      information: verifierSiInformationQuestion(messageLower),
      periode: verifierSiPeriodeQuestion(messageLower),
      lieu: verifierSiLieuQuestion(messageLower)
    };
    
    // 5. Générer une réponse en fonction du type de question et du contexte
    switch (typeQuestion) {
      case 'FERMEE_AUTORISATION':
        return repondreQuestionFermeeAutorisation(messageLower, airesDetectees, thematiqueDetectees);
      case 'OUVERTE_POURQUOI':
        return repondreQuestionPourquoi(messageLower, thematiqueDetectees);
      case 'OUVERTE_LISTE_LIEUX':
        return repondreQuestionListeLieux(messageLower, thematiqueDetectees);
      case 'DEFINITION':
        return repondreQuestionDefinition(messageLower);
      case 'INFORMATION_GENERALE':
        return repondreQuestionInformationGenerale(messageLower, airesDetectees, thematiqueDetectees);
      default:
        // Si aucun type spécifique identifié, essayer une approche générique
        return genererReponseGenerique(messageLower, airesDetectees, thematiqueDetectees, concerne);
    }
  } catch (error) {
    console.error("Erreur lors du traitement du message:", error);
    return "Désolé, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ultérieurement ou reformuler votre question.";
  }
}

/**
 * Identifie le type de question posée
 * @param {string} question - La question posée par l'utilisateur
 * @return {string} Le type de question identifié
 */
function identifierTypeQuestion(question) {
  const questionLower = question.toLowerCase();
  
  // Questions fermées d'autorisation
  if (questionLower.includes("est-ce que") || 
      questionLower.includes("est ce que") ||
      questionLower.includes("puis-je") ||
      questionLower.includes("peut-on") ||
      questionLower.includes("est-il autorisé") ||
      questionLower.includes("est-il permis") ||
      questionLower.includes("est-il interdit") ||
      questionLower.includes("a-t-on le droit")) {
    
    if (questionLower.includes("autorisé") || 
        questionLower.includes("permis") || 
        questionLower.includes("interdit") || 
        questionLower.includes("droit")) {
      return "FERMEE_AUTORISATION";
    }
  }
  
  // Questions ouvertes "pourquoi"
  if (questionLower.includes("pourquoi") || 
      questionLower.includes("pour quelle raison") || 
      questionLower.includes("comment se fait-il") ||
      questionLower.includes("pour quel motif")) {
    return "OUVERTE_POURQUOI";
  }
  
  // Questions de demande de liste de lieux
  if ((questionLower.includes("où") || 
      questionLower.includes("quels endroits") || 
      questionLower.includes("quelles zones") ||
      questionLower.includes("quels lieux")) && 
      (questionLower.includes("interdit") || 
       questionLower.includes("autorisé") || 
       questionLower.includes("permis"))) {
    return "OUVERTE_LISTE_LIEUX";
  }
  
  // Questions de définition
  if (questionLower.includes("qu'est-ce qu") || 
      questionLower.includes("qu'est ce qu") || 
      questionLower.includes("c'est quoi") ||
      questionLower.includes("que signifie") ||
      questionLower.includes("définition de")) {
    return "DEFINITION";
  }
  
  // Questions d'information générale
  return "INFORMATION_GENERALE";
}

/**
 * Vérifie si la question porte sur une autorisation
 * @param {string} message - Le message en minuscules
 * @return {boolean} Vrai si la question concerne une autorisation
 */
function verifierSiAutorisationQuestion(message) {
  return message.includes("autorisé") || 
         message.includes("permis") || 
         message.includes("interdit") || 
         message.includes("droit de") ||
         message.includes("peut-on") ||
         message.includes("puis-je") ||
         message.includes("a-t-on le droit") ||
         message.includes("est-ce légal");
}

/**
 * Vérifie si la question demande une explication
 * @param {string} message - Le message en minuscules
 * @return {boolean} Vrai si la question demande une explication
 */
function verifierSiExplicationQuestion(message) {
  return message.includes("pourquoi") || 
         message.includes("pour quelle raison") || 
         message.includes("comment se fait-il") ||
         message.includes("explication") ||
         message.includes("expliquer");
}

/**
 * Vérifie si la question demande des informations générales
 * @param {string} message - Le message en minuscules
 * @return {boolean} Vrai si la question demande des informations
 */
function verifierSiInformationQuestion(message) {
  return message.includes("qu'est-ce que") || 
         message.includes("c'est quoi") || 
         message.includes("parle-moi de") ||
         message.includes("information") ||
         message.includes("quelles sont");
}

/**
 * Vérifie si la question porte sur une période spécifique
 * @param {string} message - Le message en minuscules
 * @return {boolean} Vrai si la question concerne une période
 */
function verifierSiPeriodeQuestion(message) {
  return message.includes("quand") || 
         message.includes("période") || 
         message.includes("saison") ||
         message.includes("mois") ||
         message.includes("horaire") ||
         message.includes("moment");
}

/**
 * Vérifie si la question porte sur un lieu spécifique
 * @param {string} message - Le message en minuscules
 * @return {boolean} Vrai si la question concerne un lieu
 */
function verifierSiLieuQuestion(message) {
  return message.includes("où") || 
         message.includes("endroit") || 
         message.includes("zone") ||
         message.includes("lieu") ||
         message.includes("quel parc") ||
         message.includes("quelle réserve");
}

/**
 * Répond à une question fermée sur une autorisation/interdiction
 * @param {string} message - Le message en minuscules
 * @param {Array} aires - Les aires protégées détectées
 * @param {Array} thematiques - Les thématiques détectées
 * @return {string} La réponse à la question
 */
function repondreQuestionFermeeAutorisation(message, aires, thematiques) {
  // Si aucune aire n'est spécifiée, chercher dans les thématiques
  if (aires.length === 0) {
    return repondreAutorisationSansAire(message, thematiques);
  }
  
  const aire = aires[0]; // Prendre la première aire détectée
  
  // Si aucune thématique n'est détectée
  if (thematiques.length === 0) {
    // Retourner des informations générales sur l'aire
    if (DATA.airesReponses[aire] && DATA.airesReponses[aire].general_info) {
      return DATA.airesReponses[aire].general_info;
    }
    return "Je n'ai pas bien compris quelle activité vous intéresse dans cette zone. Pouvez-vous préciser votre question ?";
  }
  
  const thematique = thematiques[0]; // Prendre la première thématique détectée
  
  // Vérifier spécifiquement pour la question sur le bivouac dans la RNCFS
  if (thematique === "bivouac" && aire === "rncfs") {
    return "Non, le bivouac est interdit dans la RNCFS (Réserve Nationale de Chasse et de Faune Sauvage). Le camping est également interdit, même avec un van aménagé. Les seules exceptions dans la réserve sont trois hébergements accessibles : la Cabane de Bonverdan (gratuite et rustique), la maison forestière de l'Abbaye (gratuite et rustique), et le refuge de Courtarse (payant et très confortable).";
  }
  
  // Vérifier s'il existe une réponse spécifique pour cette aire et cette thématique
  if (DATA.airesReponses[aire] && DATA.airesReponses[aire][thematique]) {
    return DATA.airesReponses[aire][thematique];
  }
  
  // Si pas de réponse spécifique, retourner une réponse générique
  return "Je n'ai pas d'information spécifique sur cette activité dans cette zone. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Répond à une question d'autorisation sans aire spécifiée
 * @param {string} message - Le message en minuscules
 * @param {Array} thematiques - Les thématiques détectées
 * @return {string} La réponse à la question
 */
function repondreAutorisationSansAire(message, thematiques) {
  if (thematiques.length === 0) {
    return "Je n'ai pas bien compris quelle activité vous intéresse. Pouvez-vous préciser votre question ?";
  }
  
  const thematique = thematiques[0]; // Prendre la première thématique détectée
  
  // Vérifier spécifiquement pour la question sur les randonnées nocturnes
  if ((thematique === "sentiers" || message.includes("randonn")) && message.includes("nuit") || message.includes("nocturne")) {
    return "Les randonnées nocturnes ne sont pas interdites dans toutes les zones du Massif des Bauges, mais elles sont déconseillées et certains espaces les interdisent spécifiquement. Dans la Réserve Nationale de Chasse et de Faune Sauvage (RNCFS), les appareils lumineux sont interdits. Dans d'autres zones comme la Réserve naturelle du Bout du Lac, il est interdit de troubler la tranquillité des lieux la nuit. D'autres sites peuvent avoir des restrictions spécifiques. Le dérangement nocturne a un impact particulièrement fort sur la faune sauvage, c'est pourquoi il est fortement déconseillé de pratiquer des activités de nuit dans les espaces naturels sensibles.";
  }
  
  // Réponse pour les autres thématiques
  if (DATA.general[thematique]) {
    return DATA.general[thematique];
  }
  
  return "Je n'ai pas d'information spécifique sur cette activité. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Répond à une question sur les raisons d'une interdiction
 * @param {string} message - Le message en minuscules
 * @param {Array} thematiques - Les thématiques détectées
 * @return {string} La réponse à la question
 */
function repondreQuestionPourquoi(message, thematiques) {
  if (thematiques.length === 0) {
    return "Je n'ai pas bien compris sur quelle règle ou interdiction porte votre question. Pouvez-vous préciser ?";
  }
  
  const thematique = thematiques[0]; // Prendre la première thématique détectée
  
  // Chercher une explication pour cette thématique
  if (DATA.explications[thematique]) {
    return DATA.explications[thematique];
  }
  
  return "Je n'ai pas d'explication spécifique pour cette règle. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Répond à une question demandant une liste de lieux
 * @param {string} message - Le message en minuscules
 * @param {Array} thematiques - Les thématiques détectées
 * @return {string} La réponse à la question
 */
function repondreQuestionListeLieux(message, thematiques) {
  if (thematiques.length === 0) {
    return "Je n'ai pas bien compris quelle activité vous intéresse. Pouvez-vous préciser votre question ?";
  }
  
  const thematique = thematiques[0]; // Prendre la première thématique détectée
  
  // Question spécifique sur les chiens
  if (thematique === "chiens" && message.includes("interdit")) {
    return "Les zones où les chiens sont totalement interdits dans le Massif des Bauges sont :\n\n" +
           "1. La Réserve Nationale de Chasse et de Faune Sauvage des Hautes Bauges (RNCFS)\n" +
           "2. La Réserve Naturelle Nationale du Bout du lac d'Annecy\n" +
           "3. Les Roselières du lac d'Annecy\n" +
           "4. La Réserve Biologique du Haut-Chéran\n" +
           "5. La Réserve Biologique de la Combe d'Ire\n\n" +
           "De plus, certaines communes prennent des arrêtés municipaux interdisant temporairement l'accès aux chiens sur les alpages pendant la saison estivale. Il est fortement déconseillé de monter avec son chien dans les secteurs où se trouvent des chiens de protection des troupeaux (patous).";
  }
  
  // Question spécifique sur le bivouac
  if (thematique === "bivouac" && message.includes("autoris")) {
    return "Les zones où le bivouac est expressément autorisé dans le Massif des Bauges sont :\n\n" +
           "1. Au Semnoz : 3 zones spécifiques (près du parking du « Courant d'Ere », au pied du Crêt de l'Aigle, et en lisière de forêt versant Bauges)\n" +
           "2. Au Margériaz : une aire dédiée appelée « la place à Baban »\n\n" +
           "Dans les autres zones, le bivouac n'est pas automatiquement autorisé. Il faut systématiquement demander l'autorisation au propriétaire du terrain et respecter \"l'art du bivouac\" (montage au coucher du soleil, démontage au lever du jour). Certaines zones l'interdisent complètement, comme la RNCFS, la Réserve Naturelle du Bout du Lac, et toutes les autres réserves et zones protégées.";
  }
  
  // Réponse générique
  return "Je n'ai pas de liste spécifique des lieux où cette activité est autorisée ou interdite. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Répond à une question de définition
 * @param {string} message - Le message en minuscules
 * @return {string} La réponse à la question
 */
function repondreQuestionDefinition(message) {
  // Détecter le terme à définir
  const termes = [
    {nom: "appb", mots: ["appb", "arrêté de protection de biotope", "protection de biotope"]},
    {nom: "reserve_naturelle", mots: ["réserve naturelle", "reserve naturelle", "rnn"]},
    {nom: "rncfs", mots: ["rncfs", "réserve nationale de chasse", "reserve nationale de chasse"]},
    {nom: "rb", mots: ["réserve biologique", "reserve biologique", "rb"]},
    {nom: "natura2000", mots: ["natura 2000", "natura2000"]},
    {nom: "znieff", mots: ["znieff", "zone naturelle d'intérêt", "zone naturelle d'interet"]},
    {nom: "ens", mots: ["ens", "espace naturel sensible"]},
    {nom: "pnr", mots: ["pnr", "parc naturel régional", "parc naturel regional"]}
  ];
  
  for (const terme of termes) {
    if (terme.mots.some(mot => message.includes(mot))) {
      if (DATA.definitions[terme.nom]) {
        return DATA.definitions[terme.nom];
      }
    }
  }
  
  return "Je n'ai pas de définition pour ce terme. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Répond à une question d'information générale
 * @param {string} message - Le message en minuscules
 * @param {Array} aires - Les aires protégées détectées
 * @param {Array} thematiques - Les thématiques détectées
 * @return {string} La réponse à la question
 */
function repondreQuestionInformationGenerale(message, aires, thematiques) {
  // Si une aire est spécifiée
  if (aires.length > 0) {
    const aire = aires[0];
    if (DATA.airesReponses[aire] && DATA.airesReponses[aire].general_info) {
      return DATA.airesReponses[aire].general_info;
    }
  }
  
  // Si une thématique est spécifiée
  if (thematiques.length > 0) {
    const thematique = thematiques[0];
    if (DATA.general[thematique]) {
      return DATA.general[thematique];
    }
  }
  
  return "Je n'ai pas d'information spécifique sur ce sujet. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc.";
}

/**
 * Génère une réponse générique en dernier recours
 * @param {string} message - Le message en minuscules
 * @param {Array} aires - Les aires protégées détectées
 * @param {Array} thematiques - Les thématiques détectées
 * @param {Object} concerne - Les types de questions détectés
 * @return {string} La réponse générique
 */
function genererReponseGenerique(message, aires, thematiques, concerne) {
  // Si aucune aire ni thématique n'a été détectée
  if (aires.length === 0 && thematiques.length === 0) {
    return DATA.defaut.general;
  }
  
  // Si une aire est spécifiée mais pas de thématique
  if (aires.length > 0 && thematiques.length === 0) {
    const aire = aires[0];
    if (DATA.airesReponses[aire] && DATA.airesReponses[aire].general_info) {
      return DATA.airesReponses[aire].general_info;
    }
  }
  
  // Si une thématique est spécifiée mais pas d'aire
  if (thematiques.length > 0 && aires.length === 0) {
    const thematique = thematiques[0];
    if (DATA.general[thematique]) {
      return DATA.general[thematique];
    }
  }
  
  // Si une aire et une thématique sont spécifiées
  if (aires.length > 0 && thematiques.length > 0) {
    const aire = aires[0];
    const thematique = thematiques[0];
    
    if (DATA.airesReponses[aire] && DATA.airesReponses[aire][thematique]) {
      return DATA.airesReponses[aire][thematique];
    }
  }
  
  return DATA.defaut.non_trouve;
}

// Exporter les fonctions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processUserMessageAmélioré,
    identifierTypeQuestion,
    verifierSiAutorisationQuestion,
    verifierSiExplicationQuestion,
    verifierSiInformationQuestion,
    verifierSiPeriodeQuestion,
    verifierSiLieuQuestion,
    repondreQuestionFermeeAutorisation,
    repondreAutorisationSansAire,
    repondreQuestionPourquoi,
    repondreQuestionListeLieux,
    repondreQuestionDefinition,
    repondreQuestionInformationGenerale,
    genererReponseGenerique
  };
}