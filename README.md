# සිඟාලෝවාද සූත්‍රය – දිශා හයේ යුතුකම්

A small bilingual (සිංහල / English) website about the **Sigālovāda Sutta** (Dīgha Nikāya 31), the Buddha's advice to the young householder Sigāla on the duties (යුතුකම්) we owe the six directions.

## Pages

| Page | Content |
|---|---|
| `index.html` | The story, the six-direction compass, and the verse |
| `parents.html` | East: parents and children |
| `teachers.html` | South: teachers and students |
| `spouse.html` | West: husband and wife |
| `friends.html` | North: friends |
| `workers.html` | Below: employers and workers |
| `religious.html` | Above: monks and lay people |
| `teachings.html` | Defilements, agati, six ways wealth is wasted, false and true friends, how to divide wealth |
| `quiz.html` | "Whose duty is this?" quiz |

All the text is in [`assets/data.js`](assets/data.js). To fix a translation, edit it there.

## Run locally

Open `index.html` in a browser. No build step is needed.

## Publish on GitHub Pages

```sh
git init
git add .
git commit -m "Sigalovada Sutta site"
git branch -M main
git remote add origin https://github.com/<your-username>/sigalovada-yuthukam.git
git push -u origin main
```

Then on GitHub go to **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
The site will be live at `https://<your-username>.github.io/sigalovada-yuthukam/`.
