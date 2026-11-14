# Configuración de GitHub Pages

Este proyecto está configurado para deployarse automáticamente a GitHub Pages cuando realices un push a la rama `main`.

## Deployment Automático

El workflow de GitHub Actions (`.github/workflows/deploy.yml`) ejecuta automáticamente:

1. **Checkout** - Descarga el código
2. **Setup Node.js** - Instala Node.js 20
3. **Instalar dependencias** - Ejecuta `npm ci`
4. **Ejecutar tests** - Valida el código con `npm test`
5. **Build de producción** - Genera la versión optimizada con `npm run build`
6. **Deploy a GitHub Pages** - Publica automáticamente en `https://kbsg01.github.io/PFY2202_Exp2_S4_Karla_Santib--ez/`

El deployment ocurre **automáticamente** cuando haces push a `main`. El flujo puedes verlo en la pestaña **Actions** del repositorio.

## Deployment Manual (Alternativa)

Si prefieres hacer deploy manualmente:

```bash
npm run deploy
```

Este comando:
- Ejecuta `npm run build` para generar la versión de producción
- Ejecuta `gh-pages -d dist` para publicar en la rama `gh-pages`

Requiere estar autenticado con GitHub CLI:
```bash
gh auth login
```

## Verificar el Deployment

1. Ve a https://github.com/kbsg01/PFY2202_Exp2_S4_Karla_Santib--ez/settings/pages
2. Verifica que **Source** esté configurado en `Deploy from a branch` con rama `gh-pages`
3. La URL de publicación debe ser: `https://kbsg01.github.io/PFY2202_Exp2_S4_Karla_Santib--ez/`

## Troubleshooting

- **Build fallido:** Revisa los logs en la pestaña Actions
- **Tests fallando:** Ejecuta `npm test` localmente
- **Assets no se cargan:** Verifica que `base` en `vite.config.js` sea `/PFY2202_Exp2_S4_Karla_Santib--ez/`
