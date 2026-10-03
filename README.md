# Shan Kebab — site web (maquette)

Proposition de site vitrine pour **Shan Kebab**, 1 Rue Lucien Dubois, 24200 Sarlat-la-Canéda.
Site statique en HTML, CSS et JavaScript, sans dépendance ni serveur.

## Contenu

- **Accueil** : accroche, note Google (4,8/5, 261 avis) et badge « Ouvert / Fermé » calculé en direct à l'heure de Paris
- **La carte** : sandwichs, assiettes, tacos, burgers, barquettes, menu kids, boissons, suppléments
- **Horaires** : le jour en cours est mis en évidence
- **Avis** : lien vers la fiche Google pour lire ou laisser un avis
- **Accès** : adresse, plan Google Maps, bouton itinéraire
- Sur mobile : barre fixe « Appeler / Itinéraire » toujours visible
- Référencement local : balises meta et données structurées `Restaurant` (schema.org)

## À valider avec le restaurant avant la mise en ligne

- **Les prix** ont été relevés sur une photo de la carte affichée au comptoir : à vérifier un par un.
- **Les textes** d'accroche (« viande à la broche », « salle accueillante »…) sont à confirmer.
- **Les photos** : le site n'utilise aucune image tierce. Ajoutez de vraies photos du restaurant
  et des plats, prises par vous ou fournies par le gérant (pas celles des avis Google).
- **Les mentions légales** (obligatoires en France) : nom de l'exploitant, SIRET, hébergeur.
- **L'accord du gérant** pour publier un site à son nom.

## Voir le site en local

```bash
python3 -m http.server 8000
```

puis ouvrez <http://localhost:8000>.

## Mise en ligne

Gratuitement avec GitHub Pages (**Settings → Pages**), Netlify ou Vercel. Un nom de domaine
(ex. `shan-kebab-sarlat.fr`, environ 10 €/an) peut ensuite y être relié.

## Modifier

- Textes et prix : `index.html` (section `#carte`)
- Horaires : `index.html` (section `#horaires`) **et** l'objet `HOURS` dans `script.js`
- Couleurs : variables en haut de `style.css`
