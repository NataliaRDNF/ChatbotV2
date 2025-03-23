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
    "circulation_motorisee": ["véhicule", "voiture", "moto", "quad", "motorisé", "circulation", "rouler"],
    "bois_ramassage": ["bois", "branche", "ramasser", "couper", "prélever", "cueillir", "forêt"],
    "bivouac": ["bivouac", "camping", "tente", "dormir", "camper", "nuit"],
    "cueillette": ["cueillette", "cueillir", "ramasser", "prélever", "plante", "fleur", "champignon"],
    "chasse": ["chasse", "chasser", "gibier", "chasseur", "fusil", "tir"],
    "eau_baignade": ["baignade", "nager", "baigner", "lac", "rivière", "eau"],
    "especes_protegees": ["espèce", "protégée", "protection", "préserver", "faune", "flore", "biodiversité"],
    "sanctions": ["amende", "sanction", "punition", "infraction", "peine", "interdit", "illégal"]
  };
  
  // Vérifier chaque thématique
  for (const [theme, motsClefs] of Object.entries(motsClePourTheme)) {
    if (motsClefs.some(mot => messageLower.includes(mot))) {
      if (articlesJuridiques[theme]) {
        return {
          theme: theme,
          articles: articlesJuridiques[theme]
        };
      }
    }
  }
  
  return null;
}

// Recrée la variable articlesJuridiques basée sur les données disponibles dans articles_juridiques.js
const articlesJuridiques = {
  "chiens": [
    {
      "reference": "Article R429-4 du Code de l'Environnement",
      "resume": "Le préfet peut, dans l'arrêté annuel d'ouverture de la chasse, réglementer ou interdire l'emploi de chiens."
    },
    {
      "reference": "Article L429-39 du Code de l'Environnement",
      "resume": "Le fusil, l'attirail de chasse et les chiens que le coupable avait avec lui au moment du délit défini à l'article L. 429-34 sont confisqués, ainsi que les lacets, pièges et autres engins, qu'ils appartiennent ou non au condamné."
    }
  ],
  "feu": [
    {
      "reference": "Article L175-10 du Code Forestier",
      "resume": "L'autorité administrative compétente de l'Etat est habilitée à réglementer l'utilisation du feu à usage agricole ou pastoral."
    },
    {
      "reference": "Article L163-3 du Code Forestier",
      "resume": "Le fait de provoquer volontairement un incendie dans les bois et forêts est réprimé dans les conditions prévues par le code pénal."
    },
    {
      "reference": "Article L131-2 du Code Forestier",
      "resume": "Lorsqu'une décharge présente un danger d'incendie pour les bois et forêts, le maire prend toutes mesures utiles pour faire cesser ce danger."
    }
  ],
  "dechets": [
    {
      "reference": "Article L218-46 du Code de l'Environnement",
      "resume": "Dans tous les cas, les droits des tiers à l'égard des auteurs de pollution sont et demeurent réservés."
    },
    {
      "reference": "Article L218-63 du Code de l'Environnement",
      "resume": "Dans tous les cas, les droits des tiers à l'égard des auteurs de pollution sont et demeurent réservés."
    },
    {
      "reference": "Article R543-60 du Code de l'Environnement",
      "resume": "Le contrat mentionné aux 2° et 3° du II de l'article R. 543-58 mentionne, notamment, la nature et les quantités des déchets d'emballage pris en charge."
    }
  ],
  "sentiers": [
    {
      "reference": "Article L214-11 du Code de l'Environnement",
      "resume": "Les conditions dans lesquelles l'épandage des effluents agricoles peut être autorisé sont fixées par décret."
    },
    {
      "reference": "Article R214-105 du Code de l'Environnement",
      "resume": "La circulation sur les cours d'eau s'effectue dans les conditions fixées par les règlements de police prévus par les articles L. 4241-1 et L. 4241-2 du code des transports."
    },
    {
      "reference": "Article R261-7 du Code Forestier",
      "resume": "Le fait de ne pas débarder les bois par les chemins désignés par les clauses de la vente résultant des dispositions de l'article R. 213-24 est puni de l'amende prévue pour les contraventions de la 5e classe."
    }
  ],
  "circulation_motorisee": [
    {
      "reference": "Article L214-11 du Code de l'Environnement",
      "resume": "Les conditions dans lesquelles l'épandage des effluents agricoles peut être autorisé sont fixées par décret."
    },
    {
      "reference": "Article R362-5 du Code de l'Environnement", 
      "resume": "Lorsque le tribunal prononce l'immobilisation du véhicule en application de l'article L. 362-8, les articles R. 131-5 à R. 131-11 du code pénal sont applicables."
    },
    {
      "reference": "Article L224-5 du Code de l'Environnement",
      "resume": "Les règles relatives à la consommation énergétique et aux émissions polluantes des véhicules automobiles sont fixées aux articles L. 311-1 et L. 318-1 du code de la route."
    }
  ],
  "bois_ramassage": [
    {
      "reference": "Article L222-4 du Code Forestier",
      "resume": "L'Office national des forêts est dirigé par un directeur général nommé par décret."
    },
    {
      "reference": "Article L273-1 du Code Forestier",
      "resume": "Les bois et forêts du domaine de l'Etat situés à la Martinique sont imprescriptibles."
    },
    {
      "reference": "Article L111-1 du Code Forestier",
      "resume": "Le présent code est applicable aux bois et forêts indépendamment de leur régime de propriété."
    }
  ],
  "bivouac": [
    {
      "reference": "Article L162-1 du Code Forestier",
      "resume": "Les peines encourues sont doublées lorsque les infractions sont commises la nuit."
    },
    {
      "reference": "Article L437-19 du Code de l'Environnement",
      "resume": "Les peines peuvent être doublées lorsque les délits sont commis la nuit."
    },
    {
      "reference": "Article L175-10 du Code Forestier",
      "resume": "L'autorité administrative compétente de l'Etat est habilitée à réglementer l'utilisation du feu à usage agricole ou pastoral."
    }
  ],
  "cueillette": [
    {
      "reference": "Article R174-5 du Code Forestier",
      "resume": "Les dispositions des articles R. 174-2 et R. 174-3 s'appliquent à l'enlèvement des plantes éricacées semi-arborescentes et aux formations ligneuses secondaires."
    },
    {
      "reference": "Article R143-8 du Code Forestier",
      "resume": "L'autorisation de fouilles vaut autorisation de coupe des plantes aréneuses ainsi que des arbres épars qui sont situés sur le terrain faisant l'objet des travaux de fouilles."
    },
    {
      "reference": "Article R436-82 du Code de l'Environnement",
      "resume": "Les dispositions des articles R. 436-6 à R. 436-79 ne sont pas applicables à la pêche dans la section de la Bidassoa et de la baie du Figuier formant frontière avec l'Espagne."
    }
  ],
  "chasse": [
    {
      "reference": "Article L514-19 du Code de l'Environnement",
      "resume": "Les autorisations et enregistrements sont accordées sous réserve des droits des tiers."
    },
    {
      "reference": "Article L712-4 du Code de l'Environnement",
      "resume": "La mise hors service d'une installation autorisée est elle-même soumise à autorisation."
    },
    {
      "reference": "Article L420-2 du Code de l'Environnement",
      "resume": "Le Gouvernement exerce la surveillance et la police de la chasse dans l'intérêt général."
    }
  ],
  "eau_baignade": [
    {
      "reference": "Article R322-32 du Code de l'Environnement",
      "resume": "Chaque conseil de rivage élit son président, son vice-président et son bureau."
    },
    {
      "reference": "Article L654-4 du Code de l'Environnement",
      "resume": "La date du 30 juin 1984 figurant à l'article L. 431-7 est remplacée par la date du 1er janvier 1994."
    },
    {
      "reference": "Article L557-44 du Code de l'Environnement",
      "resume": "L'organisme habilité met en place une procédure de recours à l'encontre de ses décisions pour ses clients."
    }
  ],
  "especes_protegees": [
    {
      "reference": "Article L131-13 du Code de l'Environnement",
      "resume": "L'Office français de la biodiversité est dirigé par un directeur général, nommé par décret."
    },
    {
      "reference": "Article L131-8 du Code de l'Environnement",
      "resume": "Il est créé un établissement public de l'Etat dénommé: 'Office français de la biodiversité'."
    },
    {
      "reference": "Article L423-9 du Code de l'Environnement",
      "resume": "Le permis de chasser est délivré à titre permanent par le directeur général de l'Office français de la biodiversité."
    }
  ],
  "sanctions": [
    {
      "reference": "Article L218-59 du Code de l'Environnement",
      "resume": "L'incinération en mer est interdite."
    },
    {
      "reference": "Article R581-52-2 du Code de l'Environnement",
      "resume": "La publicité lumineuse est interdite."
    },
    {
      "reference": "Article R543-24 du Code de l'Environnement",
      "resume": "Il est interdit de remplir des appareils avec des PCB."
    }
  ]
};

// Exporter les fonctions pour les utiliser dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    trouverArticlesJuridiques,
    articlesJuridiques
  };
}
