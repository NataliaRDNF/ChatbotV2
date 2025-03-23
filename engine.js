/**
 * Moteur de traitement des questions pour le chatbot LYNX
 * Contient les fonctions principales pour la compréhension et la réponse aux questions
 */

/**
 * Fonction principale qui traite un message utilisateur et renvoie une réponse adaptée
 * @param {string} message - Le message de l'utilisateur
 * @return {string} La réponse du chatbot
 */
function processUserMessage(message) {
  // Normaliser le message pour le traitement
  const messageLower = message.toLowerCase();
  const normalizedMessage = normalizeText(message);
  const normalizedLower = normalizedMessage.toLowerCase();
  
  try {
    // 1. Détecter le contexte du message (question, négation, etc.)
    const context = detectContext(messageLower);
    
    // 2. Détecter les aires protégées mentionnées dans le message
    const airesDetectees = detecterAires(messageLower, normalizedLower);
    
    // 3. Détecter les thématiques mentionnées dans le message
    let thematiqueDetectees = detecterThematiques(messageLower, normalizedLower);
    
    // 4. Corriger les confusions potentielles (notamment entre "chiens" et "ENS")
    thematiqueDetectees = corrigerConfusionThematiques(thematiqueDetectees, messageLower);
    
    // 5. Détecter si la question combine plusieurs thématiques
    const thematiquesCombinees = detecterThematiquesCombinees(message);
    
    // 6. Essayer les différentes stratégies de réponse dans l'ordre de priorité
    
    // 6.1 Questions combinant plusieurs thématiques
    if (thematiquesCombinees.length > 1) {
      const reponseCombinee = traiterQuestionCombinee(messageLower, thematiquesCombinees);
      if (reponseCombinee) return reponseCombinee;
    }
    
    // 6.2 Questions spécifiques sur les chiens (problème fréquent)
    const dogResponse = handleDogQuestions(messageLower);
    if (dogResponse) return dogResponse;
    
    // 6.3 Questions sur le VTT et les sentiers (autre problème fréquent)
    const vttResponse = handleVTTQuestions(messageLower);
    if (vttResponse) return vttResponse;
    
    // 6.4 Questions de définition
    const definitionResponse = handleDefinitionQuestions(messageLower);
    if (definitionResponse) return definitionResponse;
    
    // 6.5 Questions sur la réglementation générale d'une aire
    const reglementationResponse = handleRegulationQuestions(messageLower, airesDetectees);
    if (reglementationResponse) return reglementationResponse;
    
    // 6.6 Questions sur les zones interdites pour une thématique
    const zoneResponse = handleZoneInterditeQuestions(messageLower, normalizedLower);
    if (zoneResponse) return zoneResponse;
    
    // 6.7 Questions sur les raisons d'une interdiction
    const raisonResponse = handleReasonQuestions(messageLower, thematiqueDetectees);
    if (raisonResponse) return raisonResponse;
    
    // 6.8 Questions spécifiques à une aire et une thématique
    if (airesDetectees.length > 0 && thematiqueDetectees.length > 0) {
      const specificResponse = getAireThematiqueResponse(airesDetectees, thematiqueDetectees);
      if (specificResponse) return specificResponse;
    }
    
    // 6.9 Questions générales sur une thématique
    if (thematiqueDetectees.length > 0) {
      const thematiqueResponse = getThematiqueResponse(thematiqueDetectees);
      if (thematiqueResponse) return thematiqueResponse;
    }
    
    // 6.10 Questions générales sur une aire protégée
    if (airesDetectees.length > 0) {
      const aireResponse = getAireResponse(airesDetectees);
      if (aireResponse) return aireResponse;
    }
    
    // 7. Si aucune réponse n'a été trouvée, suggérer des questions
    if (message.trim().endsWith("?") || 
        messageLower.includes("est-ce que") || 
        messageLower.includes("peut-on") || 
        messageLower.includes("puis-je")) {
      return DATA.defaut.non_trouve;
    }
    
    // Réponse par défaut
    return DATA.defaut.general;
    
  } catch (error) {
    console.error("Erreur lors du traitement du message:", error);
    return "Désolé, une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer ultérieurement.";
  }
}

/**
 * Détecte le contexte d'une question (négative ou interrogative)
 * @param {string} message - Le message à analyser
 * @return {Object} Objet contenant les indicateurs de contexte
 */
function detectContext(message) {
  const negations = ["pas", "interdit", "non", "ne", "aucun", "jamais"];
  const questions = ["?", "peux-tu", "puis-je", "ai-je le droit", "est-ce que", "dois-je", "est-il", "peut-on"];
  
  let isNegative = negations.some(word => message.includes(word));
  let isQuestion = questions.some(word => message.includes(word)) || message.includes("?");
  
  return {
    isNegative,
    isQuestion
  };
}

/**
 * Normalise le texte pour faciliter la recherche
 * @param {string} text - Le texte à normaliser
 * @return {string} Le texte normalisé
 */
function normalizeText(text) {
  if (!text) return "";
  
  // Convertir en minuscules
  let normalized = text.toLowerCase();
  
  // Remplacer les accents
  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Corrections courantes
  const corrections = {
    "pecher": "peche",
    "pêcher": "peche",
    "peche": "peche",
    "pêche": "peche",
    "chien": "chien",
    "chiens": "chien",
    "toutou": "chien",
    "toutous": "chien",
    "canin": "chien",
    "canins": "chien",
    "flamme": "feu",
    "flammes": "feu",
    "barbecue": "feu",
    "barbecues": "feu",
    "trace": "sentier",
    "traces": "sentier",
    "bivouac": "bivouac",
    "bivouaquer": "bivouac",
    "feu": "feu",
    "feux": "feu",
    "sentier": "sentier",
    "sentiers": "sentier",
    "chemin": "sentier",
    "chemins": "sentier",
    "ordure": "dechet",
    "ordures": "dechet",
    "dechet": "dechet",
    "dechets": "dechet",
    "déchets": "dechet",
    "ordure": "dechet",
    "poubelle": "dechet",
    "naviguer": "navigation",
    "bateau": "navigation",
    "canoe": "navigation",
    "kayak": "navigation"
  };
  
  // Appliquer les corrections pour les mots exacts
  const words = normalized.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    if (corrections[words[i]]) {
      words[i] = corrections[words[i]];
    }
  }
  
  return words.join(" ");
}

/**
 * Détecte les aires protégées mentionnées dans le message
 * @param {string} messageLower - Le message en minuscules
 * @param {string} normalizedLower - Le message normalisé en minuscules
 * @return {Array} Liste des identifiants d'aires protégées détectées
 */
function detecterAires(messageLower, normalizedLower) {
  const aires = [];
  
  // Détection précise de RNCFS qui est souvent mentionnée
  if (messageLower.includes("rncfs") ||
      messageLower.includes("réserve nationale de chasse") ||
      messageLower.includes("reserve nationale de chasse")) {
    aires.push("rncfs");
  }
  
  // Détection précise de la Réserve du Bout du Lac, souvent mentionnée
  if (messageLower.includes("bout du lac") ||
      (messageLower.includes("réserve naturelle") && messageLower.includes("lac"))) {
    aires.push("rnn_bout_lac");
  }
  
  // Parcourir toutes les aires protégées
  for (const [aire, motsCles] of Object.entries(DATA.airesProtegees)) {
    // Si l'aire n'est pas déjà détectée
    if (!aires.includes(aire)) {
      for (const motCle of motsCles) {
        if (messageLower.includes(motCle) || normalizedLower.includes(motCle)) {
          aires.push(aire);
          break;
        }
      }
    }
  }
  
  // Si aucune aire n'est détectée, on ajoute "general" par défaut
  if (aires.length === 0) {
    aires.push("general");
  }
  
  return aires;
}

/**
 * Détecte les thématiques mentionnées dans le message
 * @param {string} messageLower - Le message en minuscules
 * @param {string} normalizedLower - Le message normalisé en minuscules
 * @return {Array} Liste des identifiants de thématiques détectées
 */
function detecterThematiques(messageLower, normalizedLower) {
  const themes = [];
  
  // Pré-traitement du message pour gérer les apostrophes
  const messageWithoutApostrophes = messageLower.replace(/[']/g, " ");
  const normalizedWithoutApostrophes = normalizedLower.replace(/[']/g, " ");
  
 for (const [theme, motsCles] of Object.entries(DATA.thematiques)) {
    for (const motCle of motsCles) {
      // Vérification standard
      if (messageLower.includes(motCle) || normalizedLower.includes(motCle) ||
          // Vérifications supplémentaires pour les expressions avec apostrophes
          messageWithoutApostrophes.includes(motCle) || normalizedWithoutApostrophes.includes(motCle)) {
        // Éviter les doublons
        if (!themes.includes(theme)) {
          themes.push(theme);
        }
        break;
      }
    }
  }
  
  return themes;
}

/**
 * Corrige les confusions potentielles entre thématiques (comme chiens/ENS)
 * @param {Array} thematiqueDetectees - Liste des thématiques détectées
 * @param {string} message - Le message original de l'utilisateur
 * @return {Array} Liste corrigée des thématiques
 */
function corrigerConfusionThematiques(thematiqueDetectees, message) {
  const messageLower = message.toLowerCase();
  
  // Cas spécifique: confusion chiens/ENS
  if (thematiqueDetectees.includes("ens")) {
    // Si le message contient explicitement "chien" mais pas "espace naturel sensible"
    if ((messageLower.includes("chien") || 
         messageLower.includes("chiens") || 
         messageLower.includes("toutou") || 
         messageLower.includes("canin")) && 
        !messageLower.includes("espace naturel sensible") &&
        !messageLower.includes("ens ")) {
        
      // Remplacer ENS par chiens dans les thématiques
      const index = thematiqueDetectees.indexOf("ens");
      if (index > -1) {
        thematiqueDetectees.splice(index, 1);
      }
      
      // Ajouter chiens s'il n'est pas déjà présent
      if (!thematiqueDetectees.includes("chiens")) {
        thematiqueDetectees.push("chiens");
      }
    }
  }
  
  return thematiqueDetectees;
}

/**
 * Détecte les thématiques combinées dans un message
 * @param {string} message - Le message à analyser
 * @return {Array} Liste des thématiques détectées
 */
function detecterThematiquesCombinees(message) {
  const messageLower = message.toLowerCase();
  
  // Structurer les thématiques avec leurs mots-clés principaux (version simplifiée)
  const thematiquesSimplifiees = {
    "feu": ["feu", "feux", "allumer", "flamme", "brûler", "barbecue", "réchaud"],
    "bivouac": ["bivouac", "camper", "camping", "tente", "dormir", "nuit"],
    "chiens": ["chien", "chiens", "toutou", "canin", "laisse", "promener"],
    "sentiers": ["sentier", "chemin", "piste", "trace", "itinéraire", "hors-piste"],
    "vehicules": ["véhicule", "moto", "quad", "voiture", "circuler", "motorisé"],
    "cueillette": ["cueillir", "ramasser", "cueillette", "plante", "fleur", "champignon"],
    "vtt": ["vtt", "vélo", "cycliste", "mountain bike", "vélo tout terrain"],
    "bruit": ["bruit", "son", "musique", "sonore", "enceinte"],
    "drones": ["drone", "survol", "voler", "aérien"],
    "parapente": ["parapente", "deltaplane", "vol libre"],
    "ski": ["ski", "raquettes", "neige", "hiver"],
    "dechets": ["déchet", "ordure", "poubelle", "jeter"]
  };
  
  // Détection des thématiques présentes
  const thematiquesTrouvees = [];
  
  for (const [theme, motsCles] of Object.entries(thematiquesSimplifiees)) {
    if (motsCles.some(mot => messageLower.includes(mot))) {
      thematiquesTrouvees.push(theme);
    }
  }
  
  return thematiquesTrouvees;
}

/**
 * Traite les questions combinant plusieurs thématiques
 * @param {string} message - Le message utilisateur
 * @param {Array} thematiques - Liste des thématiques détectées
 * @return {string|null} Réponse ou null si pas de correspondance
 */
function traiterQuestionCombinee(message, thematiques) {
  // Si une seule thématique, utiliser le traitement standard
  if (thematiques.length <= 1) {
    return null;
  }
  
  // Chercher une correspondance directe dans la base de données
  for (const [id, data] of Object.entries(DATA.combinaisons)) {
    // Vérifier si les thèmes correspondent exactement ou sont un sous-ensemble
    const themesCorrespondent = thematiques.every(theme => data.themes.includes(theme)) && 
                               data.themes.every(theme => thematiques.includes(theme));
    
    if (themesCorrespondent) {
      return data.reponse;
    }
  }
  
  // Rechercher des combinaisons partielles (au moins 2 thèmes en commun)
  for (const [id, data] of Object.entries(DATA.combinaisons)) {
    let themesCommuns = 0;
    for (const theme of thematiques) {
      if (data.themes.includes(theme)) {
        themesCommuns++;
      }
    }
    
    if (themesCommuns >= 2) {
      return data.reponse;
    }
  }
  
  return null; // Aucune combinaison spécifique trouvée
}

/**
 * Gère les questions spécifiques sur les chiens
 * @param {string} message - Le message utilisateur
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleDogQuestions(message) {
  if ((message.includes("chien") || message.includes("toutou")) &&
      (message.includes("parc") || message.includes("pnr") || 
       message.includes("règle") || message.includes("réglementation") ||
       message.includes("massif des bauges") || message.includes("régulation") ||
       message.includes("autorisation") || message.includes("interdit") ||
       message.includes("autorisé"))) {
    
    return "Réglementation concernant les chiens dans le Parc naturel régional du Massif des Bauges :\n\n" +
           "1. Obligation générale :\n" +
           "   - Dans tous les espaces naturels du Parc, les chiens doivent être tenus en laisse\n" +
           "   - Entre le 15 avril et le 30 juin (période de reproduction de la faune), cette obligation est renforcée par arrêté préfectoral\n\n" +
           "2. Zones d'interdiction totale :\n" +
           "   - Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) : chiens totalement interdits\n" +
           "   - Réserve Naturelle Nationale du Bout du Lac d'Annecy : chiens totalement interdits\n" +
           "   - Certains alpages en période estivale (par arrêtés municipaux)\n\n" +
           "3. Dans les alpages :\n" +
           "   - Présence fortement déconseillée dans les secteurs avec des chiens de protection (patous)\n" +
           "   - Certaines communes interdisent totalement les chiens sur leurs alpages en été\n" +
           "   - Consultez la carte des alpages avec patous : <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a>\n\n" +
           "4. Itinéraires recommandés :\n" +
           "   - Consultez <a href='https://rando.parcdesbauges.com/' target='_blank' rel='noopener noreferrer'>Rando Bauges</a> pour trouver des itinéraires adaptés aux chiens\n\n" +
           "Le non-respect de ces règles peut entraîner une amende pouvant aller jusqu'à 750€.";
  }
  
  if ((message.includes("chien") || message.includes("toutou")) &&
      (message.includes("alpage") || message.includes("montagne") || 
       message.includes("estive") || message.includes("pâturage") ||
       message.includes("troupeau") || message.includes("patou"))) {
    
    return "Concernant les chiens dans les alpages du Massif des Bauges :\n\n" +
           "1. Réglementation stricte :\n" +
           "   - Les chiens doivent toujours être tenus en laisse dans les alpages\n" +
           "   - Certaines communes prennent des arrêtés municipaux interdisant totalement les chiens domestiques sur les alpages pendant la saison estivale\n" +
           "   - Vérifiez les arrêtés municipaux en vigueur avant votre randonnée\n\n" +
           "2. Présence de chiens de protection (patous) :\n" +
           "   - Il est fortement déconseillé de monter avec son chien dans les secteurs où se trouvent des patous\n" +
           "   - Les patous considèrent les chiens domestiques comme une menace pour le troupeau\n" +
           "   - Des conflits graves peuvent survenir même si votre chien est en laisse\n\n" +
           "3. Carte des alpages avec patous :\n" +
           "   - Consultez <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a> pour identifier les zones à éviter\n\n" +
           "4. Alternatives :\n" +
           "   - Privilégiez les itinéraires de moyenne montagne sans troupeaux\n" +
           "   - Consultez <a href='https://rando.parcdesbauges.com/' target='_blank' rel='noopener noreferrer'>Rando Bauges</a> pour trouver des balades adaptées avec votre chien\n\n" +
           "Pour la sécurité de tous (votre chien, les troupeaux et les autres randonneurs), respectez scrupuleusement ces consignes.";
  }
  
  return null;
}

/**
 * Gère les questions spécifiques sur le VTT
 * @param {string} message - Le message utilisateur
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleVTTQuestions(message) {
  if ((message.includes("vtt") || message.includes("vélo") || message.includes("velo")) &&
      (message.includes("sentier") || message.includes("chemin") ||
       message.includes("parcours") || message.includes("itinéraire") ||
       message.includes("autoriser"))) {
    
    return "La pratique du VTT n'est pas autorisée sur tous les sentiers du Massif des Bauges. Voici les règles à respecter :\n\n" +
           "• Le VTT est autorisé uniquement sur les sentiers balisés pour cette pratique\n" +
           "• Il est interdit de circuler dans les APPB, réserves biologiques intégrales, zones sensibles\n" +
           "• Merci de respecter les réglementations locales affichées aux entrées des sentiers\n" +
           "• Renseignez-vous auprès du Parc ou de l'ONF pour connaître les parcours autorisés\n\n" +
           "Zones où le VTT est strictement interdit :\n" +
           "- Réserve Nationale de Chasse et de Faune Sauvage (RNCFS)\n" +
           "- Réserve Naturelle Nationale du Bout du lac d'Annecy\n" +
           "- Tourbière des Creusates et autres zones humides protégées";
  }
  
  return null;
}

/**
 * Traite les questions de définition (qu'est-ce qu'...)
 * @param {string} message - Le message utilisateur
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleDefinitionQuestions(message) {
  // Vérifier si c'est une question de définition
  const isDefinitionQuestion = DATA.typesQuestions.definition.some(pattern => message.includes(pattern));
  
  if (!isDefinitionQuestion) return null;
  
  // Chercher l'objet de la définition
  if (message.includes("appb") ||
      message.includes("arrêté préfectoral") ||
      message.includes("protection de biotope") ||
      message.includes("arrêté de biotope")) {
    return DATA.definitions.appb;
  }
  
  if (message.includes("rncfs") ||
      message.includes("réserve nationale de chasse") ||
      message.includes("reserve nationale de chasse") ||
      message.includes("réserve de chasse")) {
    return DATA.definitions.rncfs;
  }
  
  if (message.includes("réserve naturelle") ||
      message.includes("reserve naturelle") ||
      message.includes("rnn")) {
    return DATA.definitions.reserve_naturelle;
  }
  
  if (message.includes("réserve biologique") ||
      message.includes("reserve biologique") ||
      message.includes("rb ") ||
      message.includes("réserve bio")) {
    return DATA.definitions.rb;
  }
  
  if (message.includes("natura 2000") ||
      message.includes("natura2000") ||
      message.includes("site natura")) {
    return DATA.definitions.natura2000;
  }
  
  if (message.includes("znieff") ||
      message.includes("zone naturelle d'intérêt") ||
      message.includes("zone d'intérêt écologique")) {
    return DATA.definitions.znieff;
  }
  
  if (message.includes("ens") ||
      message.includes("espace naturel sensible") ||
      message.includes("espaces naturels")) {
    return DATA.definitions.ens;
  }
  
  if (message.includes("pnr") ||
      message.includes("parc naturel régional") ||
      message.includes("parc régional")) {
    return DATA.definitions.pnr;
  }
  
  return null;
}

/**
 * Traite les questions sur la réglementation générale d'une aire
 * @param {string} message - Le message utilisateur
 * @param {Array} airesDetectees - Aires protégées détectées
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleRegulationQuestions(message, airesDetectees) {
  // Mots-clés indiquant une demande de réglementation générale
  const reglementationPatterns = DATA.typesQuestions.reglementation;
  
  const isRegulationQuestion = reglementationPatterns.some(pattern => message.includes(pattern)) ||
                               message.includes("réglementation") ||
                               message.includes("règlement") ||
                               message.includes("règles") ||
                               (message.includes("quelles sont") && message.includes("autorisé")) ||
                               (message.includes("quelles sont") && message.includes("interdit"));
  
  if (isRegulationQuestion && airesDetectees.length > 0) {
    for (const aire of airesDetectees) {
      if (aire !== "general") {
        if (DATA.airesReponses[aire] && DATA.airesReponses[aire].general_info) {
          return DATA.airesReponses[aire].general_info;
        }
      }
    }
  }
  
  return null;
}

/**
 * Traite les questions sur les zones interdites pour une thématique
 * @param {string} message - Le message utilisateur
 * @param {string} normalizedMessage - Le message normalisé
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleZoneInterditeQuestions(message, normalizedMessage) {
  // Détecter si c'est une question sur les zones interdites
  const isZoneQuestion = DATA.typesQuestions.zonage.some(pattern => 
    message.includes(pattern) || normalizedMessage.includes(pattern)
  );
  
  if (isZoneQuestion) {
    // Chercher la thématique concernée
    for (const [theme, motsCles] of Object.entries(DATA.thematiques)) {
      for (const motCle of motsCles) {
        if (message.includes(motCle) || normalizedMessage.includes(motCle)) {
          // Construction d'une réponse sur les zones interdites pour cette thématique
          // Cette fonction devrait être implémentée pour fournir une synthèse
          switch (theme) {
            case "chiens":
              return "Zones où les chiens sont interdits dans le Massif des Bauges :\n\n" +
                  "- Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) - totalement interdits\n" +
                  "- Réserve Naturelle Nationale du Bout du lac d'Annecy - interdits même en laisse\n" +
                  "- Les Roselières du lac d'Annecy (APPB) - totalement interdits, même en laisse\n" +
                  "- Certaines communes interdisent les chiens sur leurs alpages en période estivale\n\n" +
                  "Dans les autres zones, les chiens doivent généralement être tenus en laisse, notamment entre le 15 avril et le 30 juin (période de reproduction).";
            case "bivouac":
              return "Zones où le bivouac est interdit dans le Massif des Bauges :\n\n" +
                  "- Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) - totalement interdit\n" +
                  "- Réserve Naturelle Nationale du Bout du lac d'Annecy - interdit\n" +
                  "- Les Réserves Biologiques (Haut-Chéran et Combe d'Ire) - interdit\n" +
                  "- Tous les Arrêtés de Protection de Biotope (Marais de Giez, Tourbière des Creusates, etc.) - interdit\n" +
                  "- Lac de la Thuile et commune des Déserts (arrêtés municipaux) - interdit\n\n" +
                  "Le bivouac est autorisé dans des zones spécifiques au Semnoz et au Margériaz (place à Baban).";
            case "feu":
              return "Les feux sont interdits dans quasiment toutes les zones protégées du Parc :\n\n" +
                  "- Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) : interdits sauf dans des espaces aménagés\n" +
                  "- Réserve Naturelle Nationale du Bout du lac d'Annecy : totalement interdits, y compris fumer\n" +
                  "- Toutes les Réserves Biologiques et les APPB : généralement interdits\n\n" +
                  "De manière générale, tous les feux sont interdits en forêt et à moins de 200m de celle-ci dans l'ensemble du Parc. Cela inclut feux de camps, barbecues, réchauds et cigarettes.";
            // Ajoutez d'autres thématiques au besoin
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Traite les questions sur les raisons des interdictions
 * @param {string} message - Le message utilisateur
 * @param {Array} thematiqueDetectees - Thématiques détectées
 * @return {string|null} Réponse ou null si pas applicable
 */
function handleReasonQuestions(message, thematiqueDetectees) {
  // Vérifier si c'est une question sur les raisons
  const isReasonQuestion = DATA.typesQuestions.raisonInterdiction.some(pattern => message.includes(pattern));
  
  if (isReasonQuestion && thematiqueDetectees.length > 0) {
    for (const thematique of thematiqueDetectees) {
      if (DATA.explications[thematique]) {
        return DATA.explications[thematique];
      }
    }
  }
  
  return null;
}

/**
 * Obtient une réponse spécifique pour une aire et une thématique
 * @param {Array} airesDetectees - Aires protégées détectées
 * @param {Array} thematiqueDetectees - Thématiques détectées
 * @return {string|null} Réponse ou null si pas trouvé
 */
function getAireThematiqueResponse(airesDetectees, thematiqueDetectees) {
  for (const aire of airesDetectees) {
    if (aire === "general") continue;
    
    for (const thematique of thematiqueDetectees) {
      if (DATA.airesReponses[aire] && DATA.airesReponses[aire][thematique]) {
        return DATA.airesReponses[aire][thematique];
      }
    }
  }
  
  return null;
}

/**
 * Obtient une réponse générale pour une thématique
 * @param {Array} thematiqueDetectees - Thématiques détectées
 * @return {string|null} Réponse ou null si pas trouvé
 */
function getThematiqueResponse(thematiqueDetectees) {
  for (const thematique of thematiqueDetectees) {
    if (DATA.general[thematique]) {
      return DATA.general[thematique];
    }
  }
  
  return null;
}

/**
 * Obtient une réponse générale pour une aire protégée
 * @param {Array} airesDetectees - Aires protégées détectées
 * @return {string|null} Réponse ou null si pas trouvé
 */
function getAireResponse(airesDetectees) {
  for (const aire of airesDetectees) {
    if (aire !== "general" && DATA.airesReponses[aire] && DATA.airesReponses[aire].general_info) {
      return DATA.airesReponses[aire].general_info;
    }
  }
  
  return null;
}

// Exporter les fonctions pour les utiliser dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processUserMessage,
    detectContext,
    normalizeText,
    detecterAires,
    detecterThematiques,
    corrigerConfusionThematiques,
    detecterThematiquesCombinees,
    traiterQuestionCombinee,
    handleDogQuestions,
    handleVTTQuestions,
    handleDefinitionQuestions,
    handleRegulationQuestions,
    handleZoneInterditeQuestions,
    handleReasonQuestions,
    getAireThematiqueResponse,
    getThematiqueResponse,
    getAireResponse
  };
}