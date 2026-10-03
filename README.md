# Mon-site

Un site vitrine personnel, simple et responsive, en HTML, CSS et JavaScript (sans dépendance).

## Contenu

- **Accueil** : présentation et boutons d'action
- **À propos** : courte biographie et qualités
- **Services** : ce que vous proposez
- **Projets** : une galerie de réalisations
- **Contact** : formulaire avec validation

Fonctionnalités : thème clair/sombre (mémorisé), menu mobile, animations au défilement,
respect de `prefers-reduced-motion`.

## Voir le site en local

Ouvrez simplement `index.html` dans votre navigateur, ou lancez un petit serveur :

```bash
python3 -m http.server 8000
```

puis rendez-vous sur <http://localhost:8000>.

## Mettre le site en ligne (GitHub Pages)

1. Sur GitHub, ouvrez **Settings → Pages**.
2. Dans **Source**, choisissez la branche à publier et le dossier `/ (root)`.
3. Le site sera disponible à l'adresse `https://<votre-utilisateur>.github.io/Mon-site/`.

## Personnaliser

- Les textes se trouvent dans `index.html`.
- Les couleurs sont définies en haut de `style.css` (variables `--primary`, `--accent`, etc.).
- Le formulaire de contact n'envoie rien pour l'instant : pour recevoir les messages,
  branchez-le à un service comme [Formspree](https://formspree.io).
