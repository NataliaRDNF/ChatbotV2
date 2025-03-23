/**
 * Module de références juridiques pour le chatbot LYNX
 * Contient les fonctions pour enrichir les réponses avec des références légales
 */

/**
 * Recherche d'articles juridiques pertinents par rapport au message utilisateur
 * @param {string} message - Le message utilisateur
 * @return {Object|null} Information juridique trouvée ou null
 */
function trouverArticlesJuridiques(message) {
  const messageLower = message.toLowerCase();
  
  // Vérifier si la question semble juridique
  const estJuridique = DATA.references.termesJuridiques.some(terme => messageLower.includes(terme));
  
  // Si la question ne semble pas juridique, ne pas ajouter de référence
  if (!estJuridique && !messageLower.includes("code")) {
    return null;
  }
  
  // Mots-clés par thématique
  const motsClePourTheme = {
    "chiens": ["chien", "canin", "animal", "promener", "laisse", "toutou"],
    "feu": ["feu", "barbecue", "allumer", "flamme", "brûler", "fumer", "cigarette", "réchaud"],
    "dechets": ["déchet", "ordure", "jeter", "abandonner", "poubelle", "pollution", "propre"],
    "sentiers": ["sentier", "chemin", "piste", "trace", "hors", "sortir", "itinéraire"],
    "vehicules": ["véhicule", "voiture", "moto", "quad", "motorisé", "circulation", "rouler"],
    "bois": ["bois", "branche", "ramasser", "couper", "prélever", "cueillir", "forêt"],
    "bivouac": ["bivouac", "camping", "tente", "dormir", "camper", "nuit"],
    "cueillette": ["cueillette", "cueillir", "ramasser", "prélever", "plante", "fleur", "champignon"],
    "chasse": ["chasse", "chasser", "gibier", "chasseur", "fusil", "tir"],
    "baignade": ["baignade", "nager", "baigner", "lac", "rivière", "eau"],
    "especes": ["espèce", "protégée", "protection", "préserver", "faune", "flore", "biodiversité"],
    "sanctions": ["amende", "sanction", "punition", "infraction", "peine", "interdit", "illégal"]
  };
  
  // Articles juridiques par thématique
  const articlesJuridiques = {
    "chiens": [
      {
        "reference": "Article R429-4 du Code de l'Environnement",
        "resume": "Le préfet peut, dans l'arrêté annuel d'ouverture de la chasse, réglementer ou interdire l'emploi de chiens."
      }
    ],
    "feu": [
      {
        "reference": "Article L163-3 du Code Forestier",
        "resume": "Le fait de provoquer volontairement un incendie dans les bois et forêts est réprimé dans les conditions prévues par le code pénal."
      }
    ],
    "dechets": [
      {
        "reference": "Article L541-2 du Code de l'Environnement",
        "resume": "Toute personne qui produit ou détient des déchets est tenue d'en assurer l'élimination dans des conditions propres à éviter les effets néfastes sur l'environnement."
      }
    ],
    "sentiers": [
      {
        "reference": "Article L361-1 du Code de l'Environnement",
        "resume": "Les itinéraires de randonnée sont inclus dans les plans départementaux et peuvent faire l'objet de conventions pour leur entretien et leur préservation."
      }
    ],
    "vehicules": [
      {
        "reference": "Article L362-1 du Code de l'Environnement",
        "resume": "La circulation des véhicules à moteur est interdite en dehors des voies classées dans le domaine public routier, des chemins ruraux et des voies privées ouvertes à la circulation publique des véhicules à moteur."
      }
    ],
    "bois": [
      {
        "reference": "Article L163-7 du Code Forestier",
        "resume": "Le fait, sans l'autorisation du propriétaire, de prélever des productions ou des végétaux est puni de l'amende prévue pour les contraventions de 4e classe."
      }
    ],
    "bivouac": [
      {
        "reference": "Article L365-1 du Code de l'Environnement",
        "resume": "La circulation et le stationnement des personnes peuvent être réglementés sur les espaces protégés par arrêté motivé."
      }
    ],
    "cueillette": [
      {
        "reference": "Article L411-1 du Code de l'Environnement",
        "resume": "Sont interdits la destruction, la coupe, la mutilation, l'arrachage, la cueillette ou l'enlèvement des espèces végétales protégées, de leurs fructifications ou de toute autre forme prise par ces espèces au cours de leur cycle biologique."
      }
    ],
    "chasse": [
      {
        "reference": "Article L422-1 du Code de l'Environnement",
        "resume": "Nul n'a la faculté de chasser sur la propriété d'autrui sans le consentement du propriétaire ou de ses ayants droit."
      }
    ],
    "baignade": [
      {
        "reference": "Article L2213-23 du Code Général des Collectivités Territoriales",
        "resume": "Le maire exerce la police des baignades et des activités nautiques pratiquées à partir du rivage avec des engins de plage et des engins non immatriculés."
      }
    ],
    "especes": [
      {
        "reference": "Article L415-3 du Code de l'Environnement",
        "resume": "Est puni d'un an d'emprisonnement et de 15 000