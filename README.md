# Distrib-launcher

Ce dépôt peut fonctionner de 2 façons :

- **Local**: serveur HTTP Node.js pour test rapide
- **GitHub**: publication statique automatique via GitHub Pages

## Lancer en local

Prérequis: Node.js 18+

```bash
npm start
```

Le serveur écoute sur `http://localhost:8080`.
Healthcheck: `http://localhost:8080/healthz`

## Publication sur GitHub Pages

Le workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publie automatiquement sur GitHub Pages à chaque push sur `main`.

Contenu publié:

- `distribution.json`
- `meta/`
- `modpacks/`
- `repo/`
- `schemas/`
- `servers/`

Le build statique est généré par:

```bash
npm run build:pages
```

Sortie générée dans `public/` puis déployée par GitHub Actions.
