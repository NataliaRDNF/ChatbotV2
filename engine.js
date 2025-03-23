/**
 * Version améliorée du moteur de traitement pour le chatbot LYNX
 * Améliore la hiérarchisation des réponses et le raisonnement contextuel
 */

/**
 * Fonction principale qui traite un message utilisateur et renvoie une réponse améliorée
 * @param {string} message - Le message de l'utilisateur
 * @return {string} La réponse du chatbot
 */
function processUserMessageAmélioré(message) {
  // Normaliser le message pour le traitement
  const messageLower = message.toLowerCase();
  const normalizedMessage = normalizeText(message);
  const normalizedLower = normalizedMessage.toLowerCase();
  
  try {
    // 1. Détecter le contexte du message
    const context = detectContext(messageLower);
    
    // 2. Détecter les aires protégées mentionnées dans le message
    const airesDetectees = detecterAires(messageLower, normalizedLower);
    
    // 3. Détecter les thématiques mentionnées dans le message
    let thematiqueDetectees = detecterThematiques(messageLower, normalizedLower);
    
    // 4. Corriger les confusions potentielles
    thematiqueDetectees = corrigerConfusionThematiques(thematiqueDetectees, messageLower);
    
    // 5. Détecter si la question combine plusieurs thématiques
    const thematiquesCombinees = detecterThematiquesCombinees(message);
    
    // Nouvelle approche: analyser la question pour hiérarchiser les informations
    const analyseQuestion = analyserPrioriteThematiques(message, thematiqueDetectees);
    
    // Si nous avons une combinaison de thématiques nécessitant une réponse structurée
    if (analyseQuestion.thematiquesHierarchisees.length > 1) {
      return genererReponseStructuree(analyseQuestion, airesDetectees);
    }
    
    // 6. Continuer avec la logique existante mais améliorée
    
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
 * Analyse la question pour hiérarchiser les thématiques selon leur priorité
 * @param {string} message - Le message utilisateur
 * @param {Array} thematiques - Les thématiques détectées
 * @return {Object} Objet contenant l'analyse
 */
function analyserPrioriteThematiques(message, thematiques) {
  const messageLower = message.toLowerCase();
  const thematiquesHierarchisees = [];
  const securiteImportante = false;
  const risqueIdentifie = [];
  
  // Définir les priorités des thématiques
  const priorites = {
    "feu": 1,            // Priorité la plus haute (sécurité, risque incendie)
    "bivouac": 2,        // Important (réglementation légale)
    "vehicules": 3,      // Important (impact environnemental)
    "chiens": 3,         // Important (impact faune)
    "sentiers": 4,       // Moyen (dérangement, érosion)
    "bois_ramassage": 5, // Faible (propriété)
    "cueillette": 5,     // Faible (impact limité)
    "dechets": 4,        // Moyen (pollution)
    "drones": 3,         // Important (dérangement)
    "bruit": 4,          // Moyen (dérangement)
    "especes_protegees": 2 // Important (protection légale forte)
  };
  
  // Mots clés indiquant un risque de sécurité
  const motsCleRisque = {
    "feu": ["feu", "flamme", "brûler", "incendie", "allumer"],
    "bivouac": ["nuit", "dormir", "camper", "seul"],
    "vehicules": ["rapide", "vitesse", "circulation"]
  };
  
  // Vérifier les risques de sécurité
  for (const [theme, mots] of Object.entries(motsCleRisque)) {
    if (thematiques.includes(theme) && mots.some(mot => messageLower.includes(mot))) {
      risqueIdentifie.push(theme);
    }
  }
  
  // Trier les thématiques par priorité
  const thematiquesTriees = [...thematiques].sort((a, b) => {
    const prioriteA = priorites[a] || 10; // Valeur par défaut si non définie
    const prioriteB = priorites[b] || 10;
    return prioriteA - prioriteB;
  });
  
  // Détecter les connexions logiques
  const connexions = detecterConnexionsLogiques(message, thematiquesTriees);
  
  return {
    thematiquesHierarchisees: thematiquesTriees,
    securiteImportante: risqueIdentifie.length > 0,
    risqueIdentifie: risqueIdentifie,
    connexions: connexions,
    messageOriginal: message
  };
}

/**
 * Détecte les connexions logiques entre thématiques dans le message
 * @param {string} message - Le message utilisateur
 * @param {Array} thematiques - Les thématiques triées par priorité
 * @return {Array} Tableau des connexions détectées
 */
function detecterConnexionsLogiques(message, thematiques) {
  const messageLower = message.toLowerCase();
  const connexions = [];
  
  // Relations spécifiques entre thématiques
  const relationsConnues = [
    { themes: ["feu", "bois_ramassage"], relation: "utilisation", 
      motsCles: ["pour", "afin de", "faire un feu", "allumer"] },
    { themes: ["bivouac", "feu"], relation: "activité", 
      motsCles: ["pendant", "quand", "lors de", "pendant que"] },
    { themes: ["chiens", "sentiers"], relation: "activité", 
      motsCles: ["promener", "balade", "promenade", "randonnée"] }
  ];
  
  // Détecter les relations
  for (const relation of relationsConnues) {
    if (relation.themes.every(theme => thematiques.includes(theme))) {
      if (relation.motsCles.some(mot => messageLower.includes(mot))) {
        connexions.push({
          type: relation.relation,
          themes: relation.themes,
          primaire: relation.themes[0],
          secondaire: relation.themes[1]
        });
      }
    }
  }
  
  return connexions;
}

/**
 * Génère une réponse structurée basée sur l'analyse de la question
 * @param {Object} analyse - L'analyse de la question
 * @param {Array} airesDetectees - Les aires protégées détectées
 * @return {string} Réponse structurée
 */
function genererReponseStructuree(analyse, airesDetectees) {
  // Cas spécial: question sur le bois pour faire un feu en bivouac
  if (analyse.thematiquesHierarchisees.includes("feu") && 
      analyse.thematiquesHierarchisees.includes("bivouac") && 
      analyse.thematiquesHierarchisees.includes("bois_ramassage")) {
      
    // Vérifier si nous sommes dans une aire spécifique
    let aireSpecifique = airesDetectees.find(aire => aire !== "general");
    let infoAireSpecifique = "";
    
    if (aireSpecifique && DATA.airesReponses[aireSpecifique]) {
      if (DATA.airesReponses[aireSpecifique].feu) {
        infoAireSpecifique = `\nÀ noter que dans la zone ${aireSpecifique.toUpperCase()}: ${DATA.airesReponses[aireSpecifique].feu}`;
      }
    }
    
    return `Votre question touche à plusieurs règles importantes sur le Massif des Bauges :

1. **Concernant les feux** (priorité sécurité) : Tous les feux sont strictement interdits en forêt et à moins de 200m de celle-ci, quelle que soit la saison. Cette interdiction s'applique aux feux de camp, barbecues, réchauds et même aux cigarettes. Le risque d'incendie est la préoccupation principale.

2. **Concernant le bivouac** : Pour bivouaquer légalement, vous devez obligatoirement demander l'autorisation au propriétaire du terrain (qu'il soit privé ou public). Le bivouac est soumis à "l'art du bivouac" : tente montée au coucher du soleil, démontée au lever, et sans laisser de traces.

3. **Concernant le ramassage de bois** : Le ramassage de bois (même mort) est considéré comme du vol car en forêt, vous êtes toujours sur la propriété de quelqu'un. De plus, le bois mort joue un rôle écologique essentiel pour la biodiversité du sol forestier.${infoAireSpecifique}

Des aires de bivouac aménagées existent au Semnoz et au Margériaz (place à Baban) où vous pourrez séjourner dans le respect de la réglementation.`;
  }
  
  // Cas spécial: question sur promener son chien hors des sentiers
  if (analyse.thematiquesHierarchisees.includes("chiens") && 
      analyse.thematiquesHierarchisees.includes("sentiers")) {
      
    return `Concernant les chiens et les sentiers dans le Massif des Bauges :

1. **Obligation générale** : Les chiens doivent toujours être tenus en laisse dans les espaces naturels, en particulier entre le 15 avril et le 30 juin (période de reproduction de la faune).

2. **Impact hors sentiers** : La présence d'un chien, même tenu en laisse, accentue considérablement l'impact du dérangement sur la faune sauvage lorsqu'on sort des sentiers balisés. Les chiens sont perçus comme des prédateurs et leur odeur continue de stresser les animaux sauvages même après leur passage.

3. **Zones d'interdiction** : Certaines zones du Parc interdisent totalement les chiens, comme la Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) ou la Réserve Naturelle du Bout du Lac.

4. **Recommandation** : Pour limiter votre impact sur l'environnement, restez sur les sentiers balisés avec votre chien en laisse. Consultez les itinéraires adaptés sur <a href='https://rando.parcdesbauges.com/' target='_blank' rel='noopener noreferrer'>Rando Bauges</a>.`;
  }
  
  // Réponse générique pour les autres combinaisons
  let reponse = `Votre question aborde plusieurs aspects importants :\n\n`;
  
  // Ajouter chaque thématique par ordre de priorité
  analyse.thematiquesHierarchisees.forEach((theme, index) => {
    if (DATA.general[theme]) {
      // Prendre juste la première phrase pour chaque thème
      let reponseTheme = DATA.general[theme];
      let premiereParagraphe = reponseTheme.split("\n\n")[0];
      
      reponse += `${index+1}. **${theme.charAt(0).toUpperCase() + theme.slice(1).replace("_", " ")}** : ${premiereParagraphe}\n\n`;
    }
  });
  
  // Ajouter une conclusion
  reponse += `Pour des informations plus détaillées sur chacun de ces sujets, n'hésitez pas à me poser une question spécifique.`;
  
  return reponse;
}

// Exporter les fonctions pour les utiliser dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processUserMessageAmélioré,
    analyserPrioriteThematiques,
    detecterConnexionsLogiques,
    genererReponseStructuree
  };
}
