/**
 * Modèle de données centralisé pour le chatbot LYNX
 * Contient toutes les informations sur les aires protégées et les thématiques
 */

// Base de données centralisée des réponses et informations
const DATA = {
  // ===== THÉMATIQUES =====
  // Mots-clés associés à chaque thématique pour la détection
  thematiques: {
    "chiens": [
      "chien", "chiens", "toutou", "canin", "animal de compagnie", "promener", "laisse", 
      "dog", "clebs", "hund", "chiot", "compagnon"
    ],
    "bivouac": [
      "bivouac", "bivouaquer", "dormir", "camper", "camping", "tente", "nuit", 
      "belle étoile", "van", "campement", "dormir dehors"
    ],
    "feu": [
      "feu", "feux", "barbecue", "réchaud", "camping gaz", "brasero", "cigarette", "fumer",
      "faire du feu", "allumer", "brûler", "incendie", "flamme", "faire un feu", "permis de faire",
      "grillades", "feu de camp", "braises"
    ],
    "sentiers": [
      "sentier", "chemin", "trace", "balisé", "balisage", "hors sentier", "hors-sentier", 
      "sortir des sentiers", "itinéraire", "parcours", "piste", "randonnée", "rando"
    ],
    "bruit": [
      "bruit", "son", "musique", "sonore", "enceinte", "lumière", "lumineux", "éclairage", 
      "lampe", "radio", "nuisance sonore", "haut-parleur", "sono"
    ],
    "vehicules": [
      "vehicule", "voiture", "moto", "quad", "circulation", "motorisé", "4x4", "stationnement", 
      "route", "automobile", "auto", "engin", "motorisation"
    ],
    "drones": [
      "drone", "survol", "voler", "aérien", "aéromodélisme", "modélisme", "télécommandé", 
      "filmer d'en haut", "prise de vue aérienne"
    ],
    "parapente": [
      "parapente", "deltaplane", "vol libre", "voler", "aile", "voile", "décoller", "décollage",
      "aile volante", "planeur", "pilote"
    ],
    "cueillette": [
      "cueillette", "cueillir", "ramasser", "plante", "fleur", "végétal", "myrtilles", 
      "framboises", "champignon", "prélever", "récolter", "collecte"
    ],
    "derangement": [
      "dérangement", "déranger", "perturber", "faune", "stress", "animaux sauvages", 
      "perturbation", "effrayer", "troubler", "quiétude"
    ],
    "chasse": [
      "chasse", "chasser", "chasseur", "gibier", "tir", "fusil", "prélèvement", 
      "battue", "permis de chasser", "saison de chasse"
    ],
    "peche": [
      "pêche", "pêcher", "pêcheur", "poisson", "ligne", "appât", "canne", 
      "hameçon", "rivière", "lac", "piscicole"
    ],
    "baignade": [
      "baignade", "baigner", "nager", "natation", "lac", "baignade", "plage", "rivière", 
      "se rafraîchir", "trempette", "eau"
    ],
    "vtt": [
      "vtt", "vélo", "cycliste", "mountain bike", "vélo tout terrain", "vélo de montagne",
      "pédaler", "cyclisme", "rouler", "bicyclette", "mountain biking"
    ],
    "escalade": [
      "escalade", "grimper", "voie", "falaise", "paroi", "rocher", "grimpeur", 
      "varappe", "alpinisme", "cordée", "mousqueton"
    ],
    "ski": [
      "ski", "ski de randonnée", "ski de rando", "raquettes", "snowboard", "neige", 
      "glisse", "poudreuse", "hiver", "station"
    ],
    "bois": [
      "bois", "branche", "ramasser", "prendre", "couper", "récupérer", "récupération", 
      "bois mort", "branches mortes", "souche", "tronc", "sciage"
    ],
    "fossiles": [
      "fossile", "pierre", "caillou", "rocher", "géologique", "toucher", "ramasser", 
      "prendre", "déplacer", "minéral", "roche"
    ],
    "dechets": [
      "déchet", "ordure", "poubelle", "pollution", "jeter", "abandonner", "laisser", 
      "biodégradable", "emballage", "papier", "nettoyer"
    ]
  },
  
  // ===== AIRES PROTÉGÉES =====
  // Mots-clés associés à chaque aire protégée pour la détection
  airesProtegees: {
    "rncfs": [
      "rncfs", "reserve nationale", "réserve nationale", "reserve de chasse", 
      "réserve de chasse", "faune sauvage", "hautes bauges"
    ],
    "rnn_bout_lac": [
      "bout du lac", "bout-du-lac", "réserve naturelle", "reserve naturelle", 
      "rnn", "bout du lac d'annecy", "doussard"
    ],
    "marais_giez": [
      "marais de giez", "giez", "appb giez", "marais giez", "zone humide giez"
    ],
    "tourbiere_creusates": [
      "tourbiere", "tourbière", "creusates", "tourbière des creusates", 
      "saint-françois-de-sales", "saint françois"
    ],
    "marais_enfer": [
      "marais de l'enfer", "marais enfer", "saint-jorioz", "saint jorioz", "enfer"
    ],
    "roselieres_annecy": [
      "roselieres", "roselières", "lac d'annecy", "lac annecy", "roselières du lac"
    ],
    "bialle_bassins_mollard": [
      "bialle", "bassins mollard", "bialle et bassins", "mollard"
    ],
    "source_chateau": [
      "source du château", "source chateau", "chateau"
    ],
    "rb_haut_cheran": [
      "rb haut chéran", "haut chéran", "haut cheran", "réserve biologique haut", 
      "cheran", "chéran"
    ],
    "rb_combe_ire": [
      "rb combe d'ire", "combe d'ire", "combe ire", "réserve biologique combe", 
      "combe", "ire"
    ],
    "natura2000": [
      "natura 2000", "natura", "zps", "zsc", "réseau natura", "zone natura", 
      "directive oiseaux", "directive habitats"
    ],
    "znieff": [
      "znieff", "zone naturelle d'intérêt", "zone naturelle interet", "inventaire", 
      "zone d'intérêt écologique"
    ],
    "ens": [
      "ens", "espace naturel sensible", "espaces naturels", "espace sensible"
    ],
    "semnoz": [
      "semnoz", "massif du semnoz", "montagne du semnoz"
    ],
    "margeriaz": [
      "margeriaz", "aillon", "margériaz", "station de margériaz"
    ],
    "general": [
      "parc", "pnr", "massif des bauges", "bauges", "parc naturel régional", 
      "parc des bauges", "parc naturel"
    ]
  },
  
  // ===== TYPES DE QUESTIONS =====
  // Patterns pour détecter les différents types de questions
  typesQuestions: {
    definition: [
      "c'est quoi", "qu'est-ce qu", "qu'est ce qu", "définition", "que signifie", 
      "cela veut dire", "ça veut dire", "signification", "définir", "expliquer", 
      "pourriez-vous définir", "pouvez-vous expliquer", "que veut dire", "sens"
    ],
    reglementation: [
      "réglementation", "règle", "autorisation", "interdit", "autorisé", "permis", 
      "droit de", "obligation", "autorise", "peut-on", "puis-je", "ai-je le droit", 
      "est-il permis", "est-ce possible", "est-ce autorisé", "est-ce interdit", 
      "est-ce permis"
    ],
    zonage: [
      "où est interdit", "où est-il interdit", "où est ce interdit", "où est-ce interdit",
      "quelles zones interdites", "quels endroits interdits", "quels lieux interdits",
      "où ne pas", "zones interdites", "endroits interdits", "lieux interdits",
      "où est-ce que c'est interdit", "quelles zones", "quels espaces",
      "où ne peut-on pas", "où ne peut on pas", "dans quelles zones",
      "quelles sont les zones", "quels sont les espaces"
    ],
    raisonInterdiction: [
      "pourquoi", "raison", "pour quelle raison", "à cause de", "pour quel motif", 
      "en raison de", "justification", "explication", "fondement", "motif"
    ],
    periodes: [
      "quand", "quelle période", "quel moment", "quelle saison", "quels mois", 
      "date", "calendrier", "périodique", "saisonnier", "temporaire", "à quel moment"
    ],
    sanctions: [
      "amende", "sanction", "pénalité", "risque", "punition", "que risque-t-on", 
      "verbalisation", "contravention", "infraction", "encourir"
    ]
  },
  
  // ===== CONFIGURATIONS POUR LES RÉPONSES =====
  // Configuration pour l'ajout des références juridiques
  references: {
    // La liste des termes juridiques qui indiquent qu'une question pourrait nécessiter une référence légale
    termesJuridiques: [
      "loi", "légal", "interdit", "autorisé", "droit", "règlement", "réglementation", 
      "permis", "autorisé", "sanction", "amende", "code", "législation", "juridique", 
      "article", "texte", "légalement", "illégal"
    ]
  },
  
  // ===== RÉPONSES AUX QUESTIONS DE DÉFINITION =====
  definitions: {
    "appb": "Un Arrêté Préfectoral de Protection de Biotope (APPB) est une mesure réglementaire prise par le préfet pour protéger un habitat naturel abritant une ou plusieurs espèces animales et/ou végétales protégées. Il s'applique à un territoire précis et fixe des mesures spécifiques pour préserver les biotopes nécessaires à la survie de ces espèces. Dans le Parc naturel régional du Massif des Bauges, il existe 6 APPB : le Marais de Giez, la Tourbière des Creusates, le Marais de l'Enfer, les Roselières du lac d'Annecy, la Bialle et les Bassins Mollard, et la Source du Château.",
    
    "reserve_naturelle": "Une Réserve Naturelle est un espace protégé terrestre ou marin dont la conservation de la faune, de la flore, du sol, des eaux, des gisements de minéraux et de fossiles et, en général, du milieu naturel présente une importance particulière. Dans le Massif des Bauges, la Réserve Naturelle Nationale du Bout du Lac d'Annecy (créée en 1974) protège 84 hectares de zones humides sur la commune de Doussard, avec une réglementation stricte interdisant notamment la chasse, la cueillette, les feux et la présence de chiens.",
    
    "rncfs": "La Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) des Bauges est un espace protégé de 5 200 hectares créé en 1913, situé à l'Est du massif des Bauges entre la Savoie et la Haute-Savoie. Co-gérée par l'ONF, l'OFB et le PNR des Bauges, elle permet de protéger les espèces menacées, de mener des études scientifiques et d'informer le public. La chasse y est totalement interdite, ainsi que les chiens, le bivouac, et la circulation motorisée (sauf dérogations spécifiques).",
    
    "rb": "Une Réserve Biologique est un espace protégé en forêt publique (domaniale ou communale) gérée par l'Office National des Forêts. Il en existe deux types : les Réserves Biologiques Dirigées (RBD) où une gestion conservatoire active est pratiquée, et les Réserves Biologiques Intégrales (RBI) laissées en libre évolution naturelle. Dans le Massif des Bauges, on trouve la Réserve Biologique du Haut-Chéran et la Réserve Biologique de la Combe d'Ire.",
    
    "natura2000": "Natura 2000 est un réseau européen de sites naturels identifiés pour la rareté ou la fragilité des espèces et des habitats qu'ils abritent. Il comprend deux types de zones : les Zones de Protection Spéciale (ZPS) pour les oiseaux et les Zones Spéciales de Conservation (ZSC) pour les habitats et autres espèces. Dans le Massif des Bauges, ce réseau vise à concilier préservation de la biodiversité et activités humaines dans une logique de développement durable.",
    
    "znieff": "Une ZNIEFF (Zone Naturelle d'Intérêt Écologique, Faunistique et Floristique) est un espace naturel inventorié en raison de son caractère remarquable. Il existe deux types de ZNIEFF : le type 1 (secteurs de grand intérêt biologique ou écologique) et le type 2 (grands ensembles naturels riches). Contrairement aux autres statuts, les ZNIEFF sont des outils de connaissance et non de protection réglementaire, mais elles servent souvent de base pour la création d'espaces protégés.",
    
    "ens": "Les Espaces Naturels Sensibles (ENS) sont des sites identifiés et gérés par les départements pour protéger des milieux naturels et les ouvrir au public. Ils permettent aux collectivités d'acquérir des terrains menacés et d'y mener une politique de préservation et de valorisation. Dans le Massif des Bauges, plusieurs ENS ont été créés, comme le Massif du Semnoz ou les Gorges du Chéran, pour concilier protection de la biodiversité et sensibilisation du public.",
    
    "pnr": "Un Parc Naturel Régional (PNR) est un territoire rural habité reconnu pour sa forte valeur patrimoniale et paysagère, qui s'organise autour d'un projet concerté de développement durable. Créé en 1995, le PNR du Massif des Bauges couvre 64 communes sur deux départements (Savoie et Haute-Savoie) et vise à préserver et valoriser le patrimoine naturel et culturel tout en favorisant un développement économique respectueux de l'environnement. Contrairement aux réserves naturelles, un PNR n'impose pas d'interdictions spécifiques mais propose une charte que les communes s'engagent à respecter."
  },
  
  // ===== RÉPONSES GÉNÉRALES PAR THÉMATIQUE =====
  // Réponses pour les questions générales (non spécifiques à une aire protégée)
  general: {
    "propriete": "La nature n'appartient pas à tout le monde. Il y a toujours un propriétaire, privé ou public. On peut en profiter, mais toujours dans le respect des règles, des espaces, de la faune et de la flore. Rappelez-vous que toute activité que vous pratiquez dans la nature se déroule chez quelqu'un, qu'il s'agisse d'un propriétaire privé ou d'une collectivité.",
    
    "foret_appartient": "Dans les Bauges, 60% des forêts appartiennent à des propriétaires privés, et 40% à des collectivités publiques (communes, départements, ou l'État pour les forêts domaniales). En France, 75% des forêts sont privées, et 25% sont publiques. La forêt privée est très morcelée : la surface moyenne est de 1,5 ha par propriétaire, en plusieurs parcelles.",
    
    "foret_difference": "Forêts publiques : un accès autorisé mais encadré. Les forêts publiques font partie du domaine privé des collectivités ou de l'État mais sont souvent rendues accessibles au public. Toutefois, certaines activités sont interdites et des fermetures temporaires peuvent être mises en place. Forêts privées : un accès interdit sans autorisation du propriétaire. Depuis 2023, pénétrer dans une forêt privée clairement signalée constitue une infraction pénale sanctionnée par une amende de 135 euros.",
    
    "sentiers": "Sortir des sentiers perturbe la faune, dégrade et peut détruire la flore, fragilise les sols, compromettant l'équilibre des écosystèmes et favorisant l'érosion. Sortir des sentiers balisés est complètement interdit à proximité des zones de recherche dans la RNCFS et dans certains espaces naturels protégés.",
    
    "parking": "Les parkings de départ de randonnée, régulièrement saturés, engendrent des nuisances pour les riverains, les professionnels de la forêt, les alpagistes et l'accès aux secours. Vous pouvez être verbalisé si vous n'êtes pas garé à un emplacement autorisé. Garez-vous uniquement dans les espaces dédiés, sans obstruer les voies d'accès pour les secours et les véhicules de travail. Si le parking est complet, choisissez un autre point de départ ou des horaires moins fréquentés.",
    
    "sport_nuit": "Le dérangement lumineux dans les espaces naturels perturbe les cycles biologiques de la faune. Dans certains espaces naturels protégés, les appareils lumineux sont interdits afin d'éviter le dérangement nocturne. Dans le Massif des Bauges, c'est le cas de la Réserve naturelle du Bout du Lac et de la RNCFS. En dehors de ces cas particuliers, évitez de pratiquer la nuit avec une frontale : le dérangement de la faune est encore plus important à ces horaires.",
    
    "chiens": "Les chiens doivent toujours être tenus en laisse dans les espaces naturels, en particulier entre le 15 avril et le 30 juin (période de reproduction de la faune). Leur présence perturbe la faune sauvage, les troupeaux, et peut causer des dégâts aux écosystèmes. Des arrêtés municipaux spécifiques peuvent interdire totalement les chiens dans certains secteurs, notamment sur les alpages en période estivale. Consultez la réglementation locale avant de partir en randonnée avec votre chien. En cas de non-respect, vous encourez une amende pouvant aller jusqu'à 750 euros. Pour trouver des itinéraires adaptés, consultez <a href='https://rando.parcdesbauges.com/' target='_blank' rel='noopener noreferrer'>Rando Bauges</a>.",
    
    "chien_zones": "Certaines zones du Parc sont totalement interdites aux chiens, même en laisse. C'est le cas pour la Réserve Nationale de Chasse et de Faune Sauvage des Hautes Bauges (RNCFS). Certaines communes prennent des arrêtés municipaux interdisant l'accès aux chiens domestiques même tenus en laisse sur les alpages pendant la saison estivale. Il est fortement déconseillé de monter avec son chien dans les secteurs où se trouvent des chiens de protection des troupeaux (patous). Consultez la carte des alpages avec patous sur <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a>.",
    
    "chien_randos": "Vous pouvez trouver des randonnées accessibles avec votre chien sur le site <a href='https://rando.parcdesbauges.com/' target='_blank' rel='noopener noreferrer'>Rando Bauges</a>. Attention cependant à vérifier les arrêtés municipaux en vigueur qui peuvent limiter l'accès. Évitez absolument les secteurs où des chiens de protection des troupeaux (patous) sont présents, consultez la carte sur <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a>.",
    
    "bivouac": "Rappel important : dans la nature, vous êtes toujours chez quelqu'un, qu'il s'agisse d'un propriétaire privé ou public. Pour bivouaquer dans de bonnes conditions, vous devez suivre ces règles essentielles :\n\n1. Demander systématiquement l'autorisation au propriétaire du terrain\n2. Respecter \"l'art du bivouac\" :\n   - Monter la tente au coucher du soleil\n   - La démonter au lever du jour\n   - Rester discret (pas de bruit, pas de feu)\n   - Ne laisser absolument aucune trace de votre passage\n\nCertaines communes peuvent prendre des arrêtés municipaux interdisant totalement le bivouac sur leur territoire (comme au lac de la Thuile ou sur la commune des Déserts). Renseignez-vous toujours auprès des mairies locales avant de prévoir un bivouac. Des aires spécifiques de bivouac sont aménagées au Semnoz et au Margériaz (place à Baban).",
    
    "feux": "Tous les feux sont interdits en forêt et à moins de 200m de celle-ci. C'est également interdit dans la majorité des espaces naturels du massif par arrêté préfectoral ou municipal ou par disposition réglementaire saisonnière. Cela inclut feux de camps, barbecue, réchaud, et cigarette.",
    
    "champignons": "La cueillette des champignons est autorisée en forêt domaniale (appartenant à l'État) si elle reste dans le cadre d'une consommation familiale et si les prélèvements n'excèdent pas 5 litres par personne et par jour. Dans les forêts privées, la cueillette est autorisée uniquement avec l'accord du propriétaire. En cas de contrôle, si le prélèvement de plus de 5L est constaté, les sanctions vont de 135€ d'amende à 45 000€ et 3 ans d'emprisonnement pour les cas graves.",
    
    "bois": "En forêt, vous êtes toujours chez quelqu'un, que ce soit en forêt publique ou privée. Prendre du bois (vivant ou mort) est considéré comme du vol, c'est donc un délit. Le bois mort est un réservoir de biodiversité essentiel à la fertilité du sol de la forêt.",
    
    "fossiles": "Dans le Parc naturel régional du Massif des Bauges, bien qu'aucune réglementation spécifique n'interdise de ramasser des fossiles ou de déplacer des pierres pour construire des cairns, il est fortement conseillé de laisser les éléments naturels à leur place. Les fossiles font partie du patrimoine géologique du parc.",
    
    "musique": "Écouter de la musique dans les espaces naturels du Massif des Bauges, même à faible volume, est fortement déconseillé en raison des nuisances qu'elle cause à la faune locale. Tout instrument sonore est même complètement interdit dans la réserve naturelle nationale du Bout du Lac d'Annecy. Des communes ont également interdit ces dispositifs par arrêtés municipaux, c'est le cas par exemple au Semnoz.",
    
    "hiver_sentiers": "En hiver, les sentiers disparaissent sous la neige et la première trace laissée est souvent suivie par les autres. Pour limiter l'impact sur la faune, il est essentiel de rester sur les traces existantes et d'éviter de se disperser. Mais attention, certaines traces peuvent traverser des zones sensibles, comme les forêts et les combes où la faune se réfugie. Ces zones doivent être contournées pour ne pas perturber les animaux en période critique.",
    
    "itineraires_appli": "Non, tous les itinéraires proposés sur Strava, Komoot, Visorando et autres applications ne sont pas forcément autorisés. Ces tracés sont souvent partagés par des utilisateurs qui ne connaissent ni la réglementation ni les enjeux de protection de la nature. Certains itinéraires peuvent traverser des zones interdites ou sensibles où le passage dérange la faune. Vérifiez la réglementation sur Rando Bauges ou consultez les sites des gestionnaires d'espaces naturels.",
    
    "pnr_geoparc": "Un Parc Naturel Régional (PNR) est un label français pour des territoires ruraux habités, valorisant un patrimoine naturel, culturel et paysager fragile, avec un projet de développement durable. Un Géoparc mondial UNESCO est un label international pour des territoires avec un patrimoine géologique exceptionnel. Le PNR du massif des Bauges possède les deux labels.",
    
    "pnr_reserve": "Un Parc Naturel Régional (PNR) cherche un équilibre entre conservation et développement durable dans un territoire vaste et habité. Une réserve naturelle protège strictement un espace fragile et priorise la conservation de la biodiversité dans un territoire plus restreint.",
    
    "parapente": "Le parapente dans les Bauges doit se pratiquer dans le respect des activités locales et de la faune. Pour le décollage et l'atterrissage, utilisez uniquement les zones officielles, ne traversez pas les propriétés privées sans autorisation, ne vous posez pas dans des prés d'herbe haute non fauchée. Repliez votre matériel en bordure des parcelles ou en bord de route. Garez-vous correctement sans bloquer les accès. Refermez les barrières après passage dans les pâturages. Pour protéger les rapaces rupestres, des \"bulles de quiétude\" entourent leurs sites de nidification en période de reproduction. Avant de voler, renseignez-vous auprès des clubs locaux sur la réglementation en vigueur. Certaines communes interdisent le vol sur leur territoire, comme à Puygros.",
    
    "periodes_faune": "La faune locale est particulièrement vulnérable lors de la reproduction, de la mise bas et de l'hivernage. Du 15 avril au 30 juin : période de reproduction et de naissance des jeunes. De décembre à mars : période d'hivernage où les animaux économisent leur énergie. Pour protéger la faune durant ces périodes sensibles, un arrêté impose la tenue en laisse des chiens entre le 15 avril et le 30 juin.",
    
    "chamois_stress": "Les animaux sauvages perçoivent l'humain comme un prédateur potentiel. Si un animal sauvage vous fixe, il évalue un danger, ce n'est pas de la curiosité. Des études scientifiques réalisées dans le massif des Bauges confirment que le chamois est extrêmement stressé par les activités humaines. Mieux vaut garder vos distances pour ne pas le déranger et le stresser davantage.",
    
    "patou": "Les chiens de protection des troupeaux (patous) sont formés pour défendre les troupeaux contre les prédateurs. Lorsque vous croisez un patou :\n\n- Restez calme et immobile\n- Laissez le chien vous identifier\n- Ne le fixez pas dans les yeux\n- Ne le menacez pas avec un bâton ou autre objet\n- Évitez de traverser le troupeau\n- Ne cherchez pas à le caresser ou le nourrir\n\nIl est fortement déconseillé, voire interdit par arrêté municipal dans certaines zones, de venir avec votre propre chien dans un alpage avec patous. Consultez la carte des alpages où des chiens de protection sont présents sur <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a>.",
    
    "manifestation": "L'organisation d'une manifestation sportive dans le Parc nécessite différentes démarches selon le type d'événement. Pour les manifestations sans chronométrage sur une seule commune, une autorisation municipale suffit. Pour celles traversant plusieurs communes, une déclaration est obligatoire auprès de la préfecture. Pour plus de détails, consultez le Guide des Manifestations Sportives du Parc du Massif des Bauges.",
    
    "escalade": "L'escalade peut interagir avec d'autres activités du territoire et avoir un impact sur la biodiversité. Certaines falaises abritent des espèces protégées (Aigle royal, Faucon pèlerin) et des restrictions temporaires peuvent être mises en place. L'ouverture de nouvelles voies d'escalade nécessite une concertation avec les acteurs locaux et diverses autorisations.",
    
    "derangement_seuil": "Le dérangement de la faune sauvage est soumis à des « effets de seuil » : au-delà d'une certaine fréquence ou intensité de perturbation, les animaux ne peuvent plus s'adapter et subissent des conséquences graves. Par exemple, un chamois dérangé occasionnellement peut modifier temporairement son comportement sans impact majeur. Mais s'il est dérangé plusieurs fois par jour, il peut abandonner son territoire optimal, réduire son alimentation et voir sa condition physique se dégrader rapidement. Ce phénomène est particulièrement critique en hiver ou pendant les périodes de reproduction, où chaque dépense énergétique supplémentaire peut être fatale.",
    
    "chien_sentiers": "La présence d'un chien, même tenu en laisse, accentue considérablement l'impact du dérangement sur la faune sauvage lorsqu'on sort des sentiers balisés. Les chiens sont perçus comme des prédateurs par la faune et leur odeur, même après leur passage, continue de stresser les animaux sauvages. Un chien qui s'éloigne du sentier, même brièvement, peut déranger une zone beaucoup plus large et provoquer des réactions de fuite ou d'abandon de nids chez certaines espèces. C'est pourquoi il est essentiel de maintenir votre chien en laisse sur les sentiers.",
    
    "appb": "Le Parc naturel régional du Massif des Bauges comprend 5 Arrêtés Préfectoraux de Protection de Biotope (APPB) : \n\n1. Le Marais de Giez\n2. La Tourbière des Creusates\n3. Le Marais de l'Enfer\n4. Les Roselières du lac d'Annecy\n5. La Bialle et les Bassins Mollard\n\nChacun de ces espaces protégés dispose d'une réglementation spécifique adaptée à la préservation de ses écosystèmes particuliers.",
    
    "vtt": "La pratique du VTT n'est pas autorisée sur tous les sentiers du Massif des Bauges. Voici les règles à respecter :\n\n- Le VTT est autorisé uniquement sur les sentiers balisés pour cette pratique\n- Il est interdit de circuler dans les APPB, réserves biologiques intégrales, zones sensibles\n- Merci de respecter les réglementations locales affichées aux entrées des sentiers\n- Renseignez-vous auprès du Parc ou de l'ONF pour connaître les parcours autorisés",
    
    "dechets": "Dans tous les espaces naturels du Massif des Bauges, y compris les zones protégées, il est interdit d'abandonner des déchets, même biodégradables. Ces derniers peuvent prendre du temps à se décomposer, attirer des animaux non désirés, introduire des espèces invasives par les graines, et perturber l'équilibre des écosystèmes. La règle à suivre est simple : tout ce que vous apportez, vous le remportez."
  },
  
  // ===== RÉPONSES SPÉCIFIQUES PAR AIRE PROTÉGÉE =====
  // Réponses spécifiques pour chaque aire protégée, organisées par thématique
  airesReponses: {
    "rncfs": {
      "general_info": "La Réserve Nationale de Chasse et de Faune Sauvage des Bauges est un espace protégé de 5 200 hectares créé en 1913. C'est également un site Natura 2000. Principales réglementations :\n\n- Chiens : totalement interdits (sauf chiens de service)\n- Bivouac et camping : interdits, sauf urgence vitale\n- Sentiers : obligation de rester sur les sentiers balisés dans les zones de recherche\n- Bruit/lumière : appareils sonores et lumineux interdits\n- Véhicules : circulation motorisée interdite (sauf dérogations)\n- Drones : survol interdit à moins de 300 m du sol (sauf missions de service public)\n- Cueillette : réglementée\n- Feux : interdits (sauf espaces aménagés)\n- Chasse : totalement interdite\n\nLa réserve dispose de trois hébergements accessibles : la Cabane de Bonverdan, la maison forestière de l'Abbaye, et le refuge de Courtarse.",
      
      "bivouac": "Non, le bivouac est interdit dans la RNCFS (Réserve Nationale de Chasse et de Faune Sauvage). Le camping est également interdit, même avec un van aménagé. Les seules exceptions dans la réserve sont trois hébergements accessibles : la Cabane de Bonverdan (gratuite et rustique), la maison forestière de l'Abbaye (gratuite et rustique), et le refuge de Courtarse (payant et très confortable).",
      
      "chiens": "Les chiens sont interdits dans la RNCFS des Bauges, sauf chiens de service (bergers, secours, chiens-guides). Cette interdiction vise à protéger la faune sauvage contre la prédation directe sur petits mammifères, reptiles, amphibiens et oiseaux.",
      
      "camping": "Le camping est interdit dans la RNCFS des Bauges, même avec un van aménagé, sauf en cas d'urgence vitale. Cette interdiction vise à préserver les milieux naturels.",
      
      "sentiers": "Dans la RNCFS, il est interdit de sortir des sentiers balisés dans les 3 zones de recherche. Cette règle vise à protéger les zones de recherche et à préserver la quiétude de la faune.",
      
      "bruit": "Dans la RNCFS, il est interdit d'utiliser des appareils sonores et lumineux, sauf pour la protection des activités pastorales et par exemple pour le comptage des cervidés (avec autorisation préfectorale). Cela vise à limiter le dérangement de la faune.",
      
      "vehicules": "Dans la RNCFS, la circulation motorisée est interdite, sauf pour services publics, gestionnaires, secours, et usages agricoles/pastoraux (sous autorisation). Les vélos et véhicules non motorisés sont interdits, sauf sur sentiers autorisés.",
      
      "drones": "Dans la RNCFS, le survol aérien est interdit à moins de 300 m du sol, sauf pour missions de service public. Certaines pratiques aériennes sportives sont autorisées dans des zones spécifiques.",
      
      "cueillette": "Dans la RNCFS, la cueillette est réglementée pour protéger les espèces.",
      
      "feux": "Dans la RNCFS, les feux sont interdits, sauf dans des espaces aménagés, pour protéger contre les incendies.",
      
      "chasse": "Dans la RNCFS, la chasse est totalement interdite. Une dérogation est possible pour des prélèvements scientifiques (chamois, mouflon, chevreuil, cerf, sanglier) sous autorisation préfectorale.",
      
      "derangement": "Dans la RNCFS, le dérangement intentionnel de la faune est interdit.",
      
      "prises_vues": "Dans la RNCFS, les prises de vue et enregistrements sonores sont interdits à des fins commerciales sans autorisation spéciale.",
      
      "recherche": "Dans la RNCFS, il est interdit de sortir des sentiers balisés dans les 3 zones de recherche."
    },
    
    "rnn_bout_lac": {
      "general_info": "La Réserve Naturelle Nationale du Bout du lac d'Annecy, créée en 1974, couvre 84 hectares sur la commune de Doussard. Elle vise à protéger des zones humides, marais et prairies. Principales réglementations :\n\n- Chiens : totalement interdits, même tenus en laisse\n- Bivouac et camping : interdits sauf personnel autorisé\n- Sentiers : accès parfois limité temporairement\n- Bruit : appareils sonores interdits\n- Véhicules : circulation interdite sauf nécessité de sauvetage ou police\n- Drones : survol interdit à moins de 200 mètres\n- Cueillette : interdiction de couper, arracher ou planter des végétaux\n- Feux : interdits, y compris fumer\n- Travaux : strictement encadrés\n- Déchets : dépôts interdits\n- Faune : interdiction de capturer, ou déranger les animaux\n- Chasse : totalement interdite",
      
      "chiens": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, les chiens sont interdits, même tenus en laisse, pour la protection de la faune nichant au sol, éviter le dérangement des animaux sauvages, et éviter la dégradation des habitats par leurs déjections.",
      
      "bivouac": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, le camping, le bivouac et toute forme d'hébergement sont interdits sauf pour le personnel de gardiennage et scientifiques autorisés, pour la protection du site.",
      
      "sentiers": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, la circulation des personnes peut être temporairement interdite sur certaines parties pour la protection en période de nidification et en cas de risque d'incendie.",
      
      "bruit": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, il est interdit de troubler le calme et la tranquillité des lieux en faisant fonctionner un appareil radio ou tout autre instrument sonore, pour préserver la quiétude.",
      
      "vehicules": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, la circulation des véhicules à moteur est interdite, sauf nécessité absolue de sauvetage ou de police, pour la protection du site.",
      
      "drones": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, le survol est interdit à une hauteur inférieure à 200 mètres, sauf nécessité absolue de sauvetage ou de police, pour limiter le dérangement de la faune sauvage.",
      
      "cueillette": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, la flore est protégée : il est interdit de couper, arracher ou planter des végétaux sans autorisation.",
      
      "feux": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, porter ou allumer du feu et fumer est interdit pour limiter le risque d'incendie, protéger la flore et limiter le dérangement de la faune.",
      
      "activites": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, les travaux et aménagements sont strictement encadrés, avec interdiction des exploitations industrielles et commerciales.",
      
      "dechets": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, il est interdit de jeter des déchets.",
      
      "prelevements": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, il est interdit de capturer, tuer, transporter ou vendre des animaux sauvages.",
      
      "chasse": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, la chasse est totalement interdite, y compris le tir depuis l'extérieur.",
      
      "acces": "Dans la Réserve Naturelle Nationale du Bout du lac d'Annecy, l'accès du public est réglementé, et peut être interdit temporairement en période sensible (nidification, risque d'incendie)."
    },
    
    "marais_giez": {
      "general_info": "L'Arrêté Préfectoral de Protection de Biotope du Marais de Giez couvre 136 hectares sur les communes de Giez, Doussard et Faverges. Créé le 8 août 1990, il vise à préserver des milieux de vie nécessaires à l'alimentation, la reproduction et la survie d'espèces protégées. Principales réglementations :\n\n- Chiens : doivent être tenus en laisse\n- Bivouac et camping : interdits\n- Véhicules à moteur : interdits (sauf pour l'exploitation des fonds ruraux)\n- Cueillette : destruction, arrachage ou enlèvement de tous végétaux interdits\n- Déchets : dépôt d'ordures et de matériaux polluants interdit\n- Travaux : modification de l'état des lieux (drainage, comblement, constructions) interdite\n- Chasse et pêche : continuent à s'exercer selon la réglementation en vigueur\n- Agriculture : les activités agricoles, forestières et pastorales s'exercent selon les usages en vigueur",
      
      "bivouac": "Non, le bivouac est interdit au marais de Giez. Selon la réglementation du marais de Giez, Doussard et Faverges : \"les activités sportives et touristiques nécessitant un aménagement, le bivouac et le camping\" sont interdites.",
      
      "camping": "Non, le camping est interdit au marais de Giez. Selon la réglementation du marais de Giez, Doussard et Faverges : \"les activités sportives et touristiques nécessitant un aménagement, le bivouac et le camping\" sont interdites.",
      
      "peche": "Oui, la pêche est autorisée dans le marais de Giez selon la réglementation en vigueur. Selon la réglementation : \"La chasse et la pêche continuent à s'exercer selon la réglementation en vigueur.\"",
      
      "chasse": "Oui, la chasse est autorisée dans le marais de Giez selon la réglementation en vigueur. Selon la réglementation : \"La chasse et la pêche continuent à s'exercer selon la réglementation en vigueur.\"",
      
      "vehicule": "Non, la circulation de véhicules à moteur est interdite dans le marais de Giez, à l'exception de ceux servant à l'exploitation des fonds ruraux (agricole, forestière et cynégétique).",
      
      "chiens": "Dans le marais de Giez, les chiens doivent être tenus en laisse.",
      
      "sentiers": "Dans le marais de Giez, il n'y a pas de spécification particulière concernant les sentiers, mais il est toujours recommandé de rester sur les chemins balisés.",
      
      "bruit": "Dans le marais de Giez, il n'y a pas de spécification particulière concernant le bruit.",
      
      "cueillette": "Dans le marais de Giez, la destruction, l'arrachage ou l'enlèvement de tous végétaux est interdit pour protéger la flore.",
      
      "drainage": "Dans le marais de Giez, tous travaux susceptibles de modifier l'état ou l'aspect des lieux (drainage, comblement, constructions diverses, extractions de la tourbe et de tous matériaux) sont interdits.",
      
      "agriculture": "Dans le marais de Giez, les activités agricoles, forestières et pastorales s'exercent selon les usages en vigueur.",
      
      "dechets": "Dans le marais de Giez, le dépôt d'ordures, de matériaux ou de résidus pouvant nuire à la qualité des eaux, de l'air, de la terre est interdit."
    },
   "tourbiere_creusates": {
      "general_info": "La Tourbière des Creusates, située sur la commune de Saint-François-de-Sales, est protégée par un arrêté préfectoral de protection de biotope qui couvre 19,50 hectares. Cette zone humide abrite des plantes rares comme le Rossolis à feuilles rondes, la Scheuchzérie des marais et la Swertie vivace. Principales réglementations :\n\n- Chiens : autorisés uniquement tenus en laisse\n- Bivouac et camping : totalement interdits\n- Randonnée : autorisée uniquement sur les sentiers balisés\n- Bruit et lumière : nuisances interdites\n- Véhicules motorisés : interdits sauf exceptions\n- Drones : interdits sauf autorisation préfectorale\n- Cueillette : protection totale des végétaux (sauf champignons pour propriétaires)\n- Feux : totalement interdits\n- Sports : interdits hors période d'enneigement sauf randonnée\n- Activités commerciales : interdites sauf ski, raquette et sorties éducatives",
      
      "chiens": "Dans la Tourbière des Creusates, les chiens doivent obligatoirement être tenus en laisse. Exceptions : les chiens de travail (surveillance des troupeaux, chiens d'assistance pour personnes handicapées/aveugles, chiens de chasse pendant la période autorisée) peuvent être détachés uniquement dans le cadre de leur mission spécifique.",
      
      "bivouac": "Dans la Tourbière des Creusates, le camping, bivouac, vans sont interdits sous toute forme pour préserver les sols tourbeux fragiles, protéger contre le piétinement de la flore rare et éviter la pollution des milieux humides.",
      
      "sentiers": "Dans la Tourbière des Creusates, la randonnée est autorisée uniquement sur les sentiers balisés pour protéger les sols fragiles et la végétation sensible, préserver les zones de reproduction des espèces et éviter la fragmentation des habitats.",
      
      "bruit": "Dans la Tourbière des Creusates, les nuisances sonores et lumineuses sont interdites pour respecter les cycles jour/nuit des espèces, protéger les oiseaux et insectes nocturnes et préserver la quiétude des lieux.",
      
      "vehicules": "Dans la Tourbière des Creusates, la circulation motorisée est interdite sauf exceptions (gestion, ski de fond, recherche, services) pour protéger les sols fragiles contre l'érosion, éviter les ornières qui drainent les zones humides et limiter les nuisances sonores pour la faune.",
      
      "drones": "Dans la Tourbière des Creusates, les drones et modélisme de loisir sont interdits sauf autorisation préfectorale, parapente hors période enneigée, pour protéger les espèces en période sensible et préserver la tranquillité du site.",
      
      "cueillette": "Dans la Tourbière des Creusates, il y a une protection totale des végétaux sauf champignons pour propriétaires et études scientifiques, pour préserver les plantes rares de tourbière, protéger les espèces végétales protégées et maintenir les écosystèmes sensibles.",
      
      "feux": "Dans la Tourbière des Creusates, il y a une interdiction totale du feu sous toutes ses formes pour prévenir les incendies en milieu sensible, protéger la végétation rare et préserver les sols tourbeux.",
      
      "activites": "Dans la Tourbière des Creusates, la circulation est interdite aux chevaux, VTT, trottinettes et autres engins de loisir. Les activités commerciales sont interdites sauf ski, raquette et sorties éducatives. La randonnée est autorisée uniquement sur sentiers balisés.",
      
      "sports": "Dans la Tourbière des Creusates, les sports sont interdits hors période d'enneigement sauf randonnée.",
      
      "jardins": "Dans la Tourbière des Creusates, les potagers sont autorisés à 10m des chalets (compost/fumier permis)."
    },
    
    "marais_enfer": {
      "general_info": "Le Marais de l'Enfer sur la commune de Saint-Jorioz est une mosaïque de milieux humides tourbeux protégée par arrêté préfectoral. Il héberge des plantes rares dont le Liparis de Loesel et la Gentiane pneumonanthe, ainsi qu'une faune remarquable comprenant diverses fauvettes aquatiques et le Castor d'Europe. Principales réglementations :\n\n- Chiens : interdits s'ils ne sont pas tenus en laisse\n- Bivouac et camping : interdits\n- Sentiers : obligation de rester sur les sentiers balisés\n- Bruit : utilisation d'appareils sonores interdite\n- Véhicules : circulation interdite (motorisés ou non)\n- Cueillette : interdite\n- Feux : interdits\n- Baignade : interdite dans le périmètre protégé\n- Activités de plage : interdites (y compris pose de serviette)\n- Déchets : dépôts interdits\n- Travaux : interdits s'ils modifient l'environnement",
      
      "chiens": "Au Marais de l'Enfer, les chiens non tenus en laisse sont interdits pour la protection de la faune et le respect de la quiétude des lieux.",
      
      "bivouac": "Au Marais de l'Enfer, camper sous une tente ou dans tout autre abri est interdit pour la protection des milieux.",
      
      "sentiers": "Au Marais de l'Enfer, il faut rester sur les sentiers balisés pour la protection des milieux.",
      
      "bruit": "Au Marais de l'Enfer, l'utilisation de transistors, magnétophones et autres engins bruyants est interdite pour le respect de la quiétude des lieux.",
      
      "vehicules": "Au Marais de l'Enfer, la pénétration sur le site avec des véhicules à moteur ou non est interdite pour la protection du site.",
      
      "cueillette": "Au Marais de l'Enfer, la cueillette est interdite et le prélèvement de toute plante pour la protection de la flore.",
      
      "feux": "Au Marais de l'Enfer, les feux sont interdits pour la protection du site.",
      
      "baignade": "Au Marais de l'Enfer, la baignade est interdite à l'intérieur du périmètre protégé par des pieux, pour respecter la quiétude de la faune vivant dans les roselières.",
      
      "activites": "Au Marais de l'Enfer, les activités de plage sont interdites (y compris pose de serviette), les activités équestres sont interdites ainsi que les manifestations sportives et de loisirs.",
      
      "chasse": "Au Marais de l'Enfer, la chasse est réglementée.",
      
      "dechets": "Au Marais de l'Enfer, il est interdit de jeter ou déverser des déchets, produits chimiques, hydrocarbures.",
      
      "prelevements": "Au Marais de l'Enfer, la destruction ou introduction d'espèces animales et végétales est interdite.",
      
      "travaux": "Au Marais de l'Enfer, les travaux publics ou privés modifiant l'environnement (drainage, extraction de tourbe) sont interdits."
    },
    
    "roselieres_annecy": {
      "general_info": "Les Roselières du lac d'Annecy à Saint-Jorioz sont des zones humides lacustres dominées par le roseau commun. Elles servent d'épurateurs naturels, abritent des oiseaux protégés comme la Rousserolle turdoïde et constituent des frayères pour de nombreux poissons. Principales réglementations :\n\n- Chiens : totalement interdits, même tenus en laisse\n- Bivouac et camping : interdits\n- Accès : interdit à l'intérieur du périmètre (sauf accès aux pontons autorisés)\n- Bruit et lumière : nuisances interdites\n- Véhicules et navigation : interdits sauf dérogations spécifiques\n- Drones : survol interdit\n- Cueillette : interdite\n- Feux : interdits\n- Baignade : interdite\n- Déchets : dépôts interdits\n- Travaux : interdits sauf travaux de gestion autorisés",
      
      "chiens": "Dans les Roselières du lac d'Annecy, les chiens sont interdits même tenus en laisse pour la protection de la faune, des zones de nidification et la préservation de la quiétude.",
      
      "bivouac": "Dans les Roselières du lac d'Annecy, le camping, bivouac et toute forme d'hébergement sont interdits pour la protection des milieux.",
      
      "sentiers": "Dans les Roselières du lac d'Annecy, tout accès est interdit à l'intérieur du périmètre sauf accès aux pontons et mouillages autorisés (AOT) pour la protection des roselières et la préservation des habitats.",
      
      "bruit": "Dans les Roselières du lac d'Annecy, toute nuisance sonore ou lumineuse est interdite pour le respect de la quiétude des lieux.",
      
      "vehicules": "Dans les Roselières du lac d'Annecy, tout accès par quelque moyen que ce soit est interdit, y compris navigation, sauf dérogations spécifiques, pour la protection du site.",
      
      "drones": "Dans les Roselières du lac d'Annecy, le survol est interdit pour préserver la tranquillité de la faune.",
      
      "cueillette": "Dans les Roselières du lac d'Annecy, il est interdit de détruire, arracher ou cueillir toute végétation pour la protection des macrophytes et des roselières.",
      
      "feux": "Dans les Roselières du lac d'Annecy, tout feu est interdit pour la protection du milieu naturel.",
      
      "navigation": "Dans les Roselières du lac d'Annecy, la navigation est interdite dans les roselières sauf accès aux pontons autorisés à vitesse < 5km/h.",
      
      "baignade": "Dans les Roselières du lac d'Annecy, la baignade est interdite dans le périmètre protégé.",
      
      "dechets": "Dans les Roselières du lac d'Annecy, les dépôts de déchets, produits chimiques, matériaux sont interdits.",
      
      "agriculture": "Dans les Roselières du lac d'Annecy, la destruction ou altération de la végétation par piétinement, coupe, désherbage ou fauchage est interdite.",
      
      "chasse": "Dans les Roselières du lac d'Annecy, la chasse continue à s'exercer selon la réglementation en vigueur.",
      
      "travaux": "Dans les Roselières du lac d'Annecy, les travaux portant atteinte aux milieux naturels (remblaiement, extraction de matériaux, construction) sont interdits sauf travaux de gestion autorisés."
    },
    
    "bialle_bassins_mollard": {
      "general_info": "L'Arrêté Préfectoral de Protection de Biotope de la Bialle et des Bassins Mollard couvre 353 hectares sur les communes d'Aiton, Chamousset, Châteauneuf, Fréterive, Grésy-sur-Isère et Saint-Pierre-d'Albigny. Créé en 1993, il vise à préserver des zones humides et cours d'eau. Principales réglementations :\n\n- Chiens : interdits sauf chiens de police, de sauvetage et de chasse pendant la période d'ouverture\n- Bivouac et camping : interdits\n- Sentiers : obligation de rester sur les sentiers balisés en zone de recherche\n- Bruit : appareils sonores et lumineux interdits\n- Véhicules : interdits en dehors des chemins ouverts à la circulation (avec exceptions)\n- Cueillette : interdite\n- Feux : interdits sauf autorisations\n- Activités commerciales : interdites si nuisibles à la faune et la flore\n- Déchets : dépôts interdits\n- Drainage : opérations interdites\n- Navigation : interdite sur la rivière de la Bialle",
      
      "chiens": "Dans la zone de la Bialle et des Bassins Mollard, les chiens sont interdits sauf chiens de police, de sauvetage et de chasse pendant la période d'ouverture pour la protection de la faune.",
      
      "bivouac": "Dans la zone de la Bialle et des Bassins Mollard, le camping et bivouac sont interdits pour la protection des milieux.",
      
      "sentiers": "Dans la zone de la Bialle et des Bassins Mollard, en zone de recherche, seuls les sentiers balisés sont autorisés pour la protection des zones sensibles.",
      
      "bruit": "Dans la zone de la Bialle et des Bassins Mollard, les appareils sonores et lumineux sont interdits. Il est interdit de troubler ou déranger les animaux par des cris ou des bruits, des objets, des projectiles ou de toute autre manière, sauf lors des travaux agricoles ou forestiers autorisés.",
      
      "vehicules": "Dans la zone de la Bialle et des Bassins Mollard, les véhicules sont interdits en dehors des chemins ouverts à la circulation. Exceptions : opérations de démoustication, entretien et aménagement autorisés, surveillance, sauvetage et police, exploitation agricole, pastorale ou forestière.",
      
      "cueillette": "Dans la zone de la Bialle et des Bassins Mollard, la cueillette est interdite pour la préservation d'écosystèmes fragiles et rares.",
      
      "feux": "Dans la zone de la Bialle et des Bassins Mollard, les feux sont interdits sauf autorisations. L'incinération de végétaux et de rémanents forestiers est interdite, sauf autorisation préfectorale après avis du comité de gestion.",
      
      "activites": "Dans la zone de la Bialle et des Bassins Mollard, les activités commerciales, industrielles, minières, et des travaux publics ou privés nuisant à la faune et la flore sont interdites.",
      
      "dechets": "Dans la zone de la Bialle et des Bassins Mollard, il est interdit de déposer des déchets, rejeter des produits chimiques, nettoyer des véhicules au bord de l'eau.",
      
      "drainage": "Dans la zone de la Bialle et des Bassins Mollard, toutes opérations de drainage sont interdites.",
      
      "chasse": "Dans la zone de la Bialle et des Bassins Mollard, la chasse continue à s'exercer selon la réglementation en vigueur.",
      
      "peche": "Dans la zone de la Bialle et des Bassins Mollard, la pêche continue à s'exercer selon la réglementation en vigueur.",
      
      "navigation": "Dans la zone de la Bialle et des Bassins Mollard, la navigation est interdite sur la rivière de la Bialle."
    },
    
    "source_chateau": {
      "general_info": "L'Arrêté Préfectoral de Protection de Biotope de la Source du Château vise à protéger ce milieu unique. Principales réglementations :\n\n- Chiens : doivent être tenus en laisse\n- Bivouac : déconseillé\n- Sentiers : rester sur les sentiers balisés\n- Bruit et lumière : limiter les nuisances\n- Véhicules : circulation et stationnement interdits (sauf exceptions)\n- Drones : usage déconseillé\n- Cueillette : déconseillée\n- Feux : déconseillés\n- Activités commerciales : interdites si nuisibles à la faune et la flore\n- Déchets : dépôts interdits\n- Drainage : opérations interdites\n- Navigation : interdite sur la rivière de la Bialle",
      
      "chiens": "À la Source du Château, les chiens doivent être tenus en laisse.",
      
      "bivouac": "À la Source du Château, le bivouac est déconseillé.",
      
      "sentiers": "À la Source du Château, il est recommandé de rester sur les sentiers balisés uniquement.",
      
      "bruit": "À la Source du Château, il est recommandé de limiter les nuisances sonores et lumineuses.",
      
      "vehicules": "À la Source du Château, il y a une interdiction de circulation et de stationnement de tous véhicules à moteur ou non dans le périmètre protégé, sauf exceptions : véhicules d'entretien et d'aménagement autorisés, véhicules de surveillance, sauvetage, police, engins nécessaires aux activités agricoles, pastorales ou forestières.",
      
      "drones": "À la Source du Château, l'utilisation de drones est déconseillée.",
      
      "cueillette": "À la Source du Château, la cueillette est déconseillée.",
      
      "feux": "À la Source du Château, les feux sont déconseillés.",
      
      "activites": "À la Source du Château, les activités commerciales, industrielles, minières, et des travaux publics ou privés nuisant à la faune et la flore sont interdites.",
      
      "dechets": "À la Source du Château, il est interdit de déposer des déchets, rejeter des produits chimiques, nettoyer des véhicules au bord de l'eau.",
      
      "drainage": "À la Source du Château, toutes opérations de drainage sont interdites.",
      
      "chasse": "À la Source du Château, la chasse continue à s'exercer selon la réglementation en vigueur.",
      
      "peche": "À la Source du Château, la pêche continue à s'exercer selon la réglementation en vigueur.",
      
      "navigation": "À la Source du Château, la navigation est interdite sur la rivière de la Bialle."
    },
    
    "rb_haut_cheran": {
      "general_info": "La Réserve Biologique du Haut-Chéran couvre près de 540 hectares, divisée en réserve biologique dirigée (373 ha, avec gestion active) et réserve biologique intégrale (167 ha, en évolution naturelle). Elle protège des habitats naturels représentatifs des Alpes du Nord ainsi que des espèces rares. Principales réglementations :\n\n- Chiens : interdits\n- Bivouac : interdit\n- Sentiers : obligation de rester sur les sentiers balisés\n- Véhicules : interdits\n- Drones : interdits\n- Cueillette : réglementée\n- Feux : interdits\n- Accès : autorisé pour le suivi scientifique\n- Interventions humaines : toute intervention modifiant l'environnement est proscrite",
      
      "chiens": "Dans la Réserve Biologique du Haut-Chéran, les chiens sont interdits.",
      
      "bivouac": "Dans la Réserve Biologique du Haut-Chéran, le bivouac est interdit.",
      
      "sentiers": "Dans la Réserve Biologique du Haut-Chéran, il faut rester sur les sentiers balisés uniquement.",
      
      "vehicules": "Dans la Réserve Biologique du Haut-Chéran, les véhicules sont interdits.",
      
      "drones": "Dans la Réserve Biologique du Haut-Chéran, les drones sont interdits.",
      
      "cueillette": "Dans la Réserve Biologique du Haut-Chéran, la cueillette est réglementée.",
      
      "feux": "Dans la Réserve Biologique du Haut-Chéran, les feux sont interdits.",
      
      "recherche": "Dans la Réserve Biologique du Haut-Chéran, l'accès est autorisé pour le suivi scientifique des écosystèmes forestiers.",
      
      "prelevements": "Dans la Réserve Biologique du Haut-Chéran, toute intervention directe de l'homme susceptible de modifier la composition ou la structure des habitats naturels est proscrite."
    },
    
    "rb_combe_ire": {
      "general_info": "La Réserve Biologique Mixte de la Combe d'Ire, créée en 1998, couvre 181 hectares et combine une réserve biologique intégrale (115 ha) et une réserve biologique dirigée (65 ha). Principales réglementations :\n\n- Chiens : interdits\n- Bivouac : interdit\n- Sentiers : obligation de rester sur les sentiers balisés\n- Bruit et lumière : nuisances interdites\n- Véhicules : interdits\n- Drones : interdits\n- Cueillette : interdite\n- Feux : interdits\n- Accès : limité pour suivis scientifiques\n- Déchets : obligation de remporter tous ses déchets",
      
      "chiens": "Dans la Réserve Biologique de la Combe d'Ire, les chiens sont interdits.",
      
      "bivouac": "Dans la Réserve Biologique de la Combe d'Ire, le bivouac est interdit.",
      
      "sentiers": "Dans la Réserve Biologique de la Combe d'Ire, il faut rester sur les sentiers balisés uniquement.",
      
      "bruit": "Dans la Réserve Biologique de la Combe d'Ire, les nuisances sonores et lumineuses sont interdites.",
      
      "vehicules": "Dans la Réserve Biologique de la Combe d'Ire, les véhicules sont interdits.",
      
      "drones": "Dans la Réserve Biologique de la Combe d'Ire, les drones sont interdits.",
      
      "cueillette": "Dans la Réserve Biologique de la Combe d'Ire, la cueillette est interdite.",
      
      "feux": "Dans la Réserve Biologique de la Combe d'Ire, les feux sont interdits.",
      
      "acces": "Dans la Réserve Biologique de la Combe d'Ire, l'accès est limité pour suivis scientifiques.",
      
      "dechets": "Dans la Réserve Biologique de la Combe d'Ire, il est demandé de remporter tous ses déchets."
    },
    
    "natura2000": {
      "general_info": "Le réseau Natura 2000 dans le Massif des Bauges comprend plusieurs sites destinés à préserver la biodiversité tout en tenant compte des exigences économiques et sociales. Les Zones de Protection Spéciale (ZPS) incluent la Partie orientale du Massif des Bauges et le Mont Colombier pour les oiseaux. Les Zones Spéciales de Conservation (ZSC) couvrent les mêmes secteurs pour les habitats et autres espèces. Réglementation spécifique :\n\n- Évaluation des incidences obligatoire pour certaines activités\n- Pas d'interdiction générale, mais un encadrement des activités susceptibles d'avoir un impact significatif\n- Manifestations sportives soumises à autorisation\n- Conservation des habitats naturels et des espèces prioritaire\n- Approche concertée privilégiant les contrats volontaires",
      
      "information": "Le réseau Natura 2000 est une initiative européenne visant à préserver la biodiversité en identifiant et en protégeant des sites naturels d'importance écologique. En France, ce réseau comprend des Zones de Protection Spéciale (ZPS) pour les oiseaux et des Zones Spéciales de Conservation (ZSC) pour les habitats et les espèces.",
      
      "zps": "Les Zones de Protection Spéciale (ZPS) dans les Bauges comprennent : la Partie orientale du Massif des Bauges (ZPS FR8212005) et le Mont Colombier (ZPS FR8212015).",
      
      "zsc": "Les Zones Spéciales de Conservation (ZSC) dans les Bauges comprennent : le Mont Colombier (ZSC FR8202004) et la Partie orientale du Massif des Bauges (ZSC FR8202002).",
      
      "activites": "La réglementation dans les zones Natura 2000 vise à concilier activités humaines et protection de la biodiversité. Certaines activités comme les manifestations sportives, les activités agricoles ou forestières ayant un impact significatif, et les activités de loisirs dans des zones sensibles peuvent être interdites ou limitées. Toute activité ou projet susceptible de nuire aux habitats ou espèces protégés doit faire l'objet d'une évaluation."
    },
    
    "znieff": {
      "general_info": "Les Zones Naturelles d'Intérêt Écologique, Faunistique et Floristique (ZNIEFF) constituent un inventaire scientifique sans valeur réglementaire directe. Le Massif des Bauges comprend de nombreuses ZNIEFF de type 1 (espaces homogènes écologiquement) et de type 2 (grands ensembles naturels). Ces zones servent de référence pour les politiques de protection de la nature et les documents d'urbanisme. Aucune réglementation spécifique n'est attachée au statut de ZNIEFF, mais ces zones méritent une attention particulière lors des projets d'aménagement.",
      
      "information": "Une ZNIEFF (Zone Naturelle d'Intérêt Écologique, Faunistique et Floristique) est un espace naturel identifié pour son intérêt écologique exceptionnel. En France, ces zones sont classées en deux types : ZNIEFF de type 1 (espaces homogènes écologiquement, abritant des espèces ou des habitats rares ou menacés) et ZNIEFF de type 2 (grands ensembles naturels riches et peu modifiés).",
      
      "bauges": "Le Massif des Bauges comprend de nombreuses ZNIEFF. Elles permettent d'identifier et d'étudier les milieux les plus remarquables du massif, avant d'envisager des mesures de conservation. Les ZNIEFF jouent un rôle essentiel en complétant les dispositifs de protection comme Natura 2000, en servant de base de connaissance pour guider les politiques environnementales locales et nationales."
    },
    
    "ens": {
      "general_info": "Les Espaces Naturels Sensibles (ENS) dans le Massif des Bauges, comme le Massif du Semnoz et les Gorges du Chéran, sont gérés par les départements de Savoie et Haute-Savoie. Leur objectif est de préserver des sites remarquables tout en les rendant accessibles au public. Principales caractéristiques :\n\n- Accès généralement autorisé mais pouvant être régulé\n- Sentiers aménagés pour la découverte\n- Panneaux d'information sur la biodiversité\n- Actions de préservation et de restauration des milieux\n- Activités éducatives proposées\n- Réglementation variable selon les sites (se référer à la signalétique sur place)",
      
      "information": "Les Espaces Naturels Sensibles (ENS) sont des sites remarquables pour leur patrimoine naturel, qu'il soit écologique, géologique ou paysager. Institués par les départements français, leur objectif principal est de préserver la qualité des sites, des paysages, des milieux naturels et des champs naturels d'expansion des crues. Cette politique permet aux départements d'acquérir ou de gérer des terrains afin de les protéger et, lorsque cela est compatible avec la conservation, de les ouvrir au public pour sensibiliser à la richesse naturelle locale.",
      
      "bauges": "Dans le Parc Naturel Régional du Massif des Bauges, plusieurs sites bénéficient de la désignation ENS en raison de leur biodiversité exceptionnelle et de leur intérêt écologique. Parmi ces sites, on trouve notamment le Massif du Semnoz et les Gorges du Chéran. La gestion de ces ENS vise à concilier la préservation des écosystèmes avec les activités humaines, en mettant en place des plans de gestion adaptés et en sensibilisant le public aux enjeux environnementaux."
    },
    
    "semnoz": {
      "general_info": "Le Semnoz est un massif forestier géré notamment comme Espace Naturel Sensible. Il accueille de nombreuses activités de plein air. Points spécifiques concernant sa réglementation :\n\n- Bivouac : autorisé dans 3 zones spécifiques (près du parking du « Courant d'Ere », au pied du Crêt de l'Aigle, et en lisière de forêt versant Bauges)\n- Dispositifs sonores : interdits par arrêté municipal\n- Feux : interdits en dehors des espaces aménagés\n- Activités hivernales : encadrées pour limiter l'impact sur la faune",
      
      "bivouac": "Au Semnoz, il y a 3 zones de bivouac autorisées : de part et d'autre du parking du « Courant d'Ere », sur le plateau, au pied du Crêt de l'Aigle, et en lisière de forêt, versant Bauges.",
      
      "musique": "Au Semnoz, les dispositifs sonores sont interdits par arrêté municipal."
    },
    
    "margeriaz": {
      "general_info": "Le Margériaz est une zone de montagne qui accueille une station de ski et des espaces naturels. Points spécifiques concernant sa réglementation :\n\n- Bivouac : une aire dédiée existe appelée « la place à Baban »\n- Ski nocturne : interdit à Aillon-Margériaz 1400 en dehors des heures d'ouverture (9h-17h), un arrêté municipal interdit l'accès aux pistes\n- Circulation : réglementée pendant les périodes d'enneigement pour permettre le travail des dameuses\n- Zones sensibles pour le Tétras-lyre : à éviter en hiver",
      
      "bivouac": "Au Margériaz, il y a une aire de bivouac appelée « la place à Baban ».",
      
      "ski_nuit": "Ne pratiquez pas le ski de randonnée à Aillon-Margériaz 1400 la nuit. Au dérangement de la faune s'ajoute une problématique liée à la sécurité. Les dameuses doivent pouvoir travailler. Un arrêté municipal interdit l'accès aux pistes en dehors des horaires d'ouverture (9H – 17H). La verbalisation est possible."
    }
  },
  
  // ===== RÉPONSES POUR LES COMBINAISONS DE THÉMATIQUES =====
  // Réponses spécifiques pour les questions combinant plusieurs thématiques
  combinaisons: {
    "feu_bivouac": {
      "themes": ["feu", "bivouac"],
      "reponse": "Non, il est strictement interdit de faire du feu en forêt et à moins de 200 mètres de celle-ci, y compris lors d'un bivouac. Cette interdiction concerne tous les types de feux : feux de camp, barbecues, réchauds et même cigarettes. Pour le bivouac, vous devez respecter \"l'art du bivouac\" (montage au coucher du soleil, démontage au lever du jour) et demander l'autorisation au propriétaire du terrain, qu'il soit privé ou public."
    },
    
    "chien_sentier": {
      "themes": ["chiens", "sentiers"],
      "reponse": "Les chiens doivent toujours être tenus en laisse sur les sentiers dans les espaces naturels du Massif des Bauges, particulièrement entre le 15 avril et le 30 juin (période de reproduction de la faune). Sortir des sentiers avec un chien, même tenu en laisse, accentue considérablement l'impact du dérangement sur la faune sauvage. Dans certaines zones comme la RNCFS ou la Réserve Naturelle du Bout du Lac d'Annecy, les chiens sont totalement interdits, même tenus en laisse."
    },
    
    "circulation_sentier": {
      "themes": ["vehicules", "sentiers"],
      "reponse": "La circulation des véhicules motorisés (voitures, motos, quads) est strictement interdite sur les sentiers et en dehors des voies ouvertes à la circulation publique dans le Massif des Bauges. Cette interdiction vise à protéger les milieux naturels, limiter l'érosion des sols et préserver la quiétude de la faune."
    },
    
    "bivouac_chien": {
      "themes": ["bivouac", "chiens"],
      "reponse": "Lors d'un bivouac dans le Massif des Bauges, votre chien doit toujours être tenu en laisse. Dans certaines zones comme la RNCFS, les chiens sont totalement interdits, même pour le bivouac. Pour bivouaquer, vous devez demander l'autorisation au propriétaire du terrain et respecter 'l'art du bivouac' (montage au coucher du soleil, démontage au lever). Évitez absolument les alpages avec des chiens de protection (patous) pour votre sécurité et celle de votre animal."
    },
    
    "vtt_sentier": {
      "themes": ["vtt", "sentiers"],
      "reponse": "La pratique du VTT n'est pas autorisée sur tous les sentiers du Massif des Bauges. Le VTT est autorisé uniquement sur les sentiers balisés pour cette pratique. Il est interdit de circuler dans les APPB, réserves biologiques intégrales, zones sensibles. Merci de respecter les réglementations locales affichées aux entrées des sentiers. Renseignez-vous auprès du Parc ou de l'ONF pour connaître les parcours autorisés."
    },
    
    "feu_foret": {
      "themes": ["feu", "bois"],
      "reponse": "Tous les feux sont strictement interdits en forêt et à moins de 200m de celle-ci dans le Massif des Bauges. Cette interdiction concerne feux de camp, barbecues, réchauds et cigarettes. Il est également interdit de ramasser du bois, qu'il soit mort ou vivant, dans les forêts (privées ou publiques) sans autorisation du propriétaire. Le bois mort joue un rôle écologique essentiel dans les écosystèmes forestiers."
    },
    
    "drone_reserve": {
      "themes": ["drones", "rncfs"],
      "reponse": "Dans la Réserve Nationale de Chasse et de Faune Sauvage (RNCFS) des Bauges, le survol aérien est interdit à moins de 300 mètres du sol, sauf pour missions de service public. Les drones de loisir sont donc totalement interdits dans cette zone. Cette interdiction vise à limiter le dérangement de la faune sauvage, particulièrement sensible aux perturbations aériennes."
    },
    
    "ski_nuit": {
      "themes": ["ski", "bruit"],
      "reponse": "Le ski nocturne (notamment avec frontale) est fortement déconseillé dans le Massif des Bauges, et même interdit dans certaines zones. En plus de perturber la faune qui a besoin de quiétude, notamment en période hivernale critique, les nuisances lumineuses perturbent les cycles biologiques des animaux. À Aillon-Margériaz 1400, un arrêté municipal interdit d'ailleurs l'accès aux pistes en dehors des horaires d'ouverture (9h-17h)."
    },
    
    "chien_alpage": {
      "themes": ["chiens", "patou"],
      "reponse": "Il est fortement déconseillé, voire interdit par arrêté municipal dans certaines zones, de venir avec votre chien dans un alpage avec des chiens de protection des troupeaux (patous). Les patous considèrent les chiens domestiques comme une menace pour le troupeau et des conflits graves peuvent survenir, même si votre chien est tenu en laisse. Consultez la carte des alpages où des chiens de protection sont présents sur <a href='https://carto.parcdesbauges.com/lizmap/index.php/view/map?repository=conciliation&project=chien_protection' target='_blank' rel='noopener noreferrer'>Carto patous</a> avant votre randonnée."
    },
    
    "dechets_nature": {
      "themes": ["dechets", "sentiers"],
      "reponse": "Dans tous les espaces naturels du Massif des Bauges, il est formellement interdit d'abandonner des déchets, même biodégradables. Ces derniers peuvent prendre du temps à se décomposer, attirer des animaux non désirés, introduire des espèces invasives par les graines, et perturber l'équilibre des écosystèmes. La règle à suivre est simple : tout ce que vous apportez, vous le remportez. Cette règle s'applique aussi bien sur les sentiers que hors des sentiers. En cas de non-respect, vous encourez une amende."
    }
  },
  
  // ===== TEXTES EXPLICATIFS POUR JUSTIFIER LES RÉGLEMENTATIONS =====
  // Explications des raisons derrière les interdictions et restrictions
  explications: {
    "chiens": "La présence de chiens, même tenus en laisse, pose plusieurs problèmes dans les espaces naturels sensibles :\n\n1. Perturbation de la faune sauvage :\n   - Les chiens sont perçus comme des prédateurs par la faune sauvage\n   - Leur odeur et leurs aboiements provoquent stress et fuite chez les animaux\n   - Ce stress peut être fatal pendant l'hivernage (dépenses énergétiques) ou la reproduction\n\n2. Risques de prédation directe :\n   - Poursuite et capture de petits mammifères, reptiles ou oiseaux\n   - Destruction de nids au sol et dérangement des couvées\n\n3. Transmission de maladies :\n   - Risque de contamination entre faune domestique et sauvage\n   - Certaines maladies peuvent être transmises par les déjections\n\n4. Impact sur les troupeaux et alpages :\n   - Stress des animaux d'élevage\n   - Conflits potentiels avec les chiens de protection (patous)",
    
    "sentiers": "Sortir des sentiers balisés dans le Massif des Bauges peut avoir des conséquences importantes sur l'environnement et la gestion des espaces naturels :\n\n1. Atteinte à la biodiversité :\n   - Piétinement de la végétation sensible et destruction d'espèces protégées\n   - Dérangement de la faune sauvage dans ses zones de repos et de reproduction\n\n2. Érosion des sols :\n   - Fragilisation des sols, particulièrement en zones pentues\n   - Création de chemins informels favorisant l'érosion et le ruissellement\n\n3. Dispersion des espèces invasives :\n   - Transport involontaire de graines et d'organismes nuisibles\n   - Risque de déséquilibre des écosystèmes au détriment des espèces locales",
    
    "feu": "Les feux sont interdits en forêt et à proximité pour plusieurs raisons essentielles :\n\n1. Risque d'incendie :\n   - Les feux peuvent rapidement échapper au contrôle, surtout par temps sec ou venteux\n   - Un incendie peut détruire des centaines d'hectares et mettre en danger vies humaines et habitations\n\n2. Impact écologique :\n   - Un incendie même limité détruit faune et flore locale, parfois irrémédiablement\n   - Les cendres peuvent polluer cours d'eau et sols\n\n3. Dégradation des habitats :\n   - Même un petit feu élimine la couche d'humus et micro-organismes essentiels\n   - Le feu altère les sols et peut compromettre la régénération naturelle",
    
    "bivouac": "Le bivouac est réglementé ou interdit dans certaines zones pour préserver les milieux naturels :\n\n1. Protection des zones sensibles :\n   - Certains milieux comme les zones humides ou tourbières sont particulièrement fragiles\n   - Le piétinement répété peut détruire la végétation et tasser les sols\n\n2. Gestion de la fréquentation :\n   - Concentrer le bivouac sur des aires dédiées permet de limiter l'impact global\n   - Évite la multiplication des traces de passage et de feu\n\n3. Protection contre les déchets et pollutions :\n   - Diminue les risques d'abandon de déchets ou d'installations sanitaires inappropriées\n   - Protège la qualité de l'eau à proximité des zones sensibles",
    
    "drones": "Les drones sont interdits ou réglementés dans de nombreux espaces naturels pour ces raisons :\n\n1. Dérangement de la faune :\n   - Les rapaces peuvent percevoir les drones comme des menaces et abandonner leurs nids\n   - Le bruit et le mouvement inhabituels provoquent stress et fuite chez les animaux\n\n2. Respect de la quiétude des lieux :\n   - La présence de drones altère l'expérience de nature sauvage recherchée par les visiteurs\n   - Le bruit peut perturber la tranquillité attendue dans les espaces naturels\n\n3. Protection de la vie privée :\n   - Risque de survol et d'images non consenties des personnes et propriétés privées",
    
    "cueillette": "La cueillette est interdite ou réglementée pour préserver les écosystèmes :\n\n1. Protection des espèces rares ou menacées :\n   - Certaines plantes peuvent être en danger d'extinction locale ou régionale\n   - La cueillette excessive peut compromettre la reproduction et la survie des espèces\n\n2. Préservation des équilibres écologiques :\n   - Chaque plante joue un rôle dans l'écosystème (nourriture, abri pour la faune)\n   - Le prélèvement massif peut déséquilibrer les communautés végétales\n\n3. Respect du droit de propriété :\n   - En forêt publique ou privée, les végétaux appartiennent au propriétaire du terrain",
    
    "bruit": "Les nuisances sonores sont limitées dans les espaces naturels pour plusieurs raisons :\n\n1. Protection de la faune :\n   - De nombreux animaux utilisent les sons pour communiquer, se reproduire, ou détecter les dangers\n   - Le bruit peut masquer ces signaux et perturber les comportements vitaux\n   - Certaines espèces peuvent abandonner leurs territoires face au bruit persistant\n\n2. Respect de la quiétude des lieux :\n   - Les espaces naturels sont recherchés pour leur calme et leur éloignement des bruits de la civilisation\n   - Les nuisances sonores détériorent cette qualité pour tous les usagers",
    
    "vehicules": "Les véhicules motorisés sont interdits hors des routes ouvertes à la circulation pour ces raisons :\n\n1. Protection des milieux naturels :\n   - Les engins motorisés causent une érosion accélérée des sols\n   - Leur passage détruit la végétation et perturbe les habitats\n   - Les ornières peuvent modifier l'écoulement des eaux et dégrader les zones humides\n\n2. Limitation du dérangement de la faune :\n   - Le bruit des moteurs provoque stress et fuite chez les animaux\n   - La vitesse des véhicules peut entraîner des collisions avec la faune\n\n3. Préservation de la tranquillité :\n   - Maintien de la qualité de l'expérience pour tous les usagers de la nature",
    
    "vtt": "L'usage du VTT est réglementé pour protéger les espaces naturels :\n\n1. Limitation de l'érosion :\n   - Les pneus créent des sillons qui concentrent l'eau et accentuent l'érosion\n   - Les freinages et dérapages peuvent détériorer durablement les sentiers\n\n2. Cohabitation avec les autres usagers :\n   - Les différences de vitesse peuvent créer des conflits ou accidents avec les randonneurs\n   - Une réglementation claire permet de définir les priorités et comportements adaptés\n\n3. Protection de certains milieux sensibles :\n   - Certains écosystèmes fragiles ne peuvent supporter le passage répété de VTT",
    
    "derangement": "Le dérangement de la faune sauvage est soumis à des « effets de seuil » : au-delà d'une certaine fréquence ou intensité de perturbation, les animaux ne peuvent plus s'adapter et subissent des conséquences graves :\n\n1. Impact énergétique critique :\n   - Chaque fuite consomme des réserves précieuses, surtout en hiver\n   - Un animal dérangé plusieurs fois réduit son alimentation et s'affaiblit\n\n2. Abandon des territoires optimaux :\n   - Les animaux peuvent quitter leurs zones d'habitat idéales pour des secteurs moins favorables\n   - Conséquence : moins de nourriture, plus d'exposition aux prédateurs\n\n3. Échec de reproduction :\n   - Abandon des nids ou des jeunes suite aux dérangements répétés\n   - Stress chronique affectant la physiologie et les capacités reproductives"
  },
  
  // ===== RÉPONSES PAR DÉFAUT =====
  // Réponses génériques lorsqu'aucune information spécifique n'est trouvée
  defaut: {
    // Réponse par défaut pour les questions générales
    "general": "Je suis là pour vous informer sur les activités autorisées ou interdites dans les différentes aires protégées du Parc naturel régional du Massif des Bauges. Vous pouvez me poser des questions comme :\n\n- Le bivouac est-il autorisé dans la RNCFS ?\n- Peut-on pêcher dans le marais de Giez ?\n- Les chiens sont-ils autorisés dans la Réserve Naturelle du Bout du Lac ?\n- C'est quoi un APPB ?\n- Quelles sont les règles à la Tourbière des Creusates ?\n- Puis-je faire du feu dans le massif des Bauges ?\n- Pourquoi doit-on tenir son chien en laisse ?\n- Quelles sont les périodes sensibles pour la faune ?",
    
    // Réponse pour les questions dont on n'a pas d'information
    "non_trouve": "Je n'ai pas d'information spécifique sur ce sujet. Pour des renseignements plus précis, je vous invite à consulter le site officiel du Parc naturel régional du Massif des Bauges (https://parcdesbauges.com) ou à contacter directement l'équipe du Parc via leur formulaire de contact.",
    
    // Suggestions pour des questions sur une aire protégée
    "suggestion_aire": "Vous pouvez me poser des questions sur les activités autorisées ou interdites dans cette zone, comme le bivouac, les chiens, la cueillette, les feux, etc.",
    
    // Suggestions pour des questions sur une thématique
    "suggestion_thematique": "Vous pouvez me demander si cette activité est autorisée dans des zones spécifiques du Parc, comme la RNCFS, la Réserve Naturelle du Bout du Lac, ou d'autres espaces protégés."
  }
};

// Exporter le modèle de données pour utilisation par d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DATA;
}