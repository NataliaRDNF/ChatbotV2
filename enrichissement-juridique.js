/**
 * Module d'enrichissement des réponses avec des références juridiques
 * Complète le traitement des questions avec des fondements légaux pertinents
 */

/**
 * Enrichit une réponse avec des références juridiques si pertinent
 * @param {string} message - Le message utilisateur
 * @param {string} reponse - La réponse calculée par le système
 * @return {string} La réponse enrichie avec des références juridiques
 */
function enrichirReponseAvecReferencesJuridiques(message, reponse) {
  // S'assurer que l'objet DATA existe
  if (typeof DATA === 'undefined' || !DATA.references || !articlesJuridiques) {
    return reponse;
  }
  
  // Détection des thématiques
  const thematiquesCombinees = detecterThematiquesCombinees(message);
  
  // Si plusieurs thématiques détectées, chercher des articles pour chacune
  let referencesJuridiques = [];
  
  if (thematiquesCombinees.length > 1) {
    for (const theme of thematiquesCombinees) {
      const infoJuridique = chercherArticlesTheme(message, theme);
      if (infoJuridique && infoJuridique.articles && infoJuridique.articles.length > 0) {
        referencesJuridiques.push(infoJuridique.articles[0]);
      }
    }
    
    // Limiter à maximum 2 références
    referencesJuridiques = referencesJuridiques.slice(0, 2);
    
    if (referencesJuridiques.length > 0) {
      let referenceHTML = `
        <div class="reference-juridique">
          <p><strong>Bases légales :</strong></p>
      `;
      
      for (const article of referencesJuridiques) {
        referenceHTML += `<p>- ${article.reference} : ${article.resume}</p>`;
      }
      
      referenceHTML += `</div>`;
      return reponse + referenceHTML;
    }
  }
  
  // Si pas de thématiques combinées ou pas de références trouvées, utiliser la méthode standard
  const infoJuridique = trouverArticlesJuridiques(message);
  
  if (!infoJuridique || !infoJuridique.articles || infoJuridique.articles.length === 0) {
    return reponse;
  }
  
  const article = infoJuridique.articles[0];
  
  // Vérifier si la question concerne une aire protégée
  const messageLower = message.toLowerCase();
  const airesProtegees = [
    "rncfs", "reserve nationale", "réserve nationale", "reserve naturelle", "réserve naturelle",
    "bout du lac", "marais de giez", "tourbière des creusates", "marais de l'enfer", 
    "appb", "arrêté de biotope", "zone protégée", "espace protégé"
  ];
  
  const concerneAireProtegee = airesProtegees.some(aire => messageLower.includes(aire));
  
  // Adapter la présentation selon que la question concerne une aire protégée ou non
  let referenceHTML = '';
  
  if (concerneAireProtegee) {
    // Pour les aires protégées, intégrer la référence de manière plus discrète
    referenceHTML = `
      <div class="reference-juridique aire-protegee">
        <p>Cette réglementation s'appuie sur <strong>${article.reference}</strong>, qui précise : "${article.resume}"</p>
      </div>
    `;
  } else {
    // Pour les questions générales, format standard avec plus de mise en évidence
    referenceHTML = `
      <div class="reference-juridique">
        <p><strong>Base légale :</strong> ${article.reference}</p>
        <p>${article.resume}</p>
      </div>
    `;
  }
  
  // Éviter d'ajouter une référence si la réponse inclut déjà l'information juridique
  if (reponse.toLowerCase().includes(article.reference.toLowerCase()) || 
      reponse.toLowerCase().includes(article.resume.substring(0, 50).toLowerCase())) {
    return reponse;
  }
  
  return reponse + referenceHTML;
}

/**
 * Fonction auxiliaire pour chercher des articles par thème
 * @param {string} message - Le message utilisateur
 * @param {string} theme - La thématique recherchée
 * @return {Object|null} Information juridique ou null
 */
function chercherArticlesTheme(message, theme) {
  if (!articlesJuridiques || !articlesJuridiques[theme]) {
    return null;
  }
  
  return {
    theme: theme,
    articles: articlesJuridiques[theme]
  };
}

// Exporter les fonctions pour les utiliser dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    enrichirReponseAvecReferencesJuridiques,
    chercherArticlesTheme
  };
}