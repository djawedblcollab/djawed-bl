# Où sont mes clients? - Guide d'utilisation

## 🎯 Répondre à la question: "Où sont mes clients?"

Ce guide vous montre comment visualiser et suivre vos prospects/clients rapidement.

## 📊 Option 1: Dashboard Visuel (Recommandé)

### Ouvrir le dashboard

```bash
# Méthode 1: Directement dans le navigateur
open outreach/client-dashboard.html

# Méthode 2: Avec un serveur local
cd outreach
python3 -m http.server 8080
# Puis ouvrir: http://localhost:8080/client-dashboard.html
```

### Fonctionnalités du dashboard

✅ **Statistiques en temps réel**
- Total de prospects
- Nombre de contactés vs en attente
- Répartition par secteur d'activité

✅ **Graphiques interactifs**
- Visualisation par industrie
- Pourcentages et barres de progression

✅ **Recherche et filtres**
- Rechercher par nom, email, secteur ou notes
- Filtrer: Tous / Contactés / En attente

✅ **Export CSV**
- Télécharger vos données pour Excel/Google Sheets
- Format: Entreprise, Email, Secteur, Statut, Date, Notes

## 💻 Option 2: Ligne de Commande

### Commandes rapides

```bash
# Voir tous vos clients
npm run clients

# Affichage:
# ╔════════════════════════════════════════════════════════════════╗
# ║           📋 OÙ SONT MES CLIENTS? - Liste des Prospects       ║
# ╚════════════════════════════════════════════════════════════════╝
# 
# 📊 STATISTIQUES GLOBALES
# ────────────────────────────────────────────────────────────────
# Total de prospects     : 3
# ✅ Contactés           : 0 (0%)
# ⏳ En attente          : 3 (100%)
# 
# [Liste détaillée...]
```

### Filtres disponibles

```bash
# Uniquement les clients contactés
npm run clients:contacted

# Uniquement ceux en attente
npm run clients:pending

# Statistiques uniquement (rapide)
npm run clients:stats
```

## 📈 Cas d'utilisation

### 1. Check quotidien rapide

```bash
npm run clients:stats
```
Voir rapidement combien de prospects vous avez et leur statut.

### 2. Préparer des relances

```bash
npm run clients:contacted
```
Voir qui a déjà été contacté et quand, pour planifier des suivis.

### 3. Planifier la prospection

```bash
npm run clients:pending
```
Voir qui n'a pas encore été contacté.

### 4. Rapport pour réunion

1. Ouvrir le dashboard: `open outreach/client-dashboard.html`
2. Cliquer sur "📥 Exporter en CSV"
3. Utiliser le fichier dans votre présentation

## 🔍 Recherche avancée (Dashboard)

Dans le dashboard, vous pouvez chercher par:
- **Nom d'entreprise**: "Tech Company"
- **Email**: "contact@"
- **Secteur**: "Marketing"
- **Notes**: "vidéo" ou "social media"

## 📊 Comprendre les statistiques

### Par secteur d'activité

Le dashboard vous montre:
- Combien de prospects par industrie
- Pourcentage de chaque secteur
- Taux de contact par secteur

**Utilité**: Identifier quels secteurs sont les plus prometteurs ou nécessitent plus de prospection.

### Taux de contact

```
✅ Contactés: X (Y%)
⏳ En attente: X (Y%)
```

**Objectif**: Viser 100% de contacts, puis suivre le taux de réponse.

## 💡 Conseils pratiques

### 1. Routine quotidienne
```bash
# Chaque matin
npm run clients:stats
# Voir votre progression
```

### 2. Avant l'outreach
```bash
# Voir qui contacter
npm run clients:pending
# Puis lancer
npm run outreach:email
```

### 3. Reporting hebdomadaire
```bash
# Ouvrir le dashboard
open outreach/client-dashboard.html
# Exporter en CSV
# Analyser dans Excel
```

### 4. Suivi après campagne
```bash
# Voir tous les contactés
npm run clients:contacted
# Vérifier les dates de contact
# Planifier les relances
```

## 🎨 Interface utilisateur

### Codes couleurs

- **🟡 Jaune**: Prospect en attente (à contacter)
- **🟢 Vert**: Prospect contacté
- **🔵 Bleu**: En-têtes et navigation

### Badges de statut

- `⏳ En attente` - Pas encore contacté
- `✅ Contacté le DD/MM/YYYY` - Déjà contacté avec la date

## 📱 Accès mobile

Le dashboard est responsive et fonctionne sur mobile/tablette:
1. Héberger le fichier sur GitHub Pages ou un serveur web
2. Accéder depuis n'importe quel appareil
3. Même fonctionnalité que sur desktop

## ❓ FAQ

**Q: Les données sont-elles à jour?**
R: Le dashboard lit le fichier `prospects.json`. Après avoir envoyé des emails avec `npm run outreach:email`, les données sont automatiquement mises à jour.

**Q: Comment ajouter des prospects?**
R: Deux méthodes:
1. Éditer `prospects.json` manuellement
2. Utiliser `prospect-manager.html` (interface de gestion)

**Q: Le CSV inclut-il toutes les données?**
R: Oui, l'export CSV inclut: entreprise, email, secteur, statut, date de contact, et notes.

**Q: Puis-je personnaliser le dashboard?**
R: Oui! Le fichier `client-dashboard.html` est entièrement personnalisable (couleurs, layout, etc.).

## 🚀 Intégration dans votre workflow

### Workflow recommandé

1. **Matin**: `npm run clients:stats` → Check rapide
2. **Prospection**: `npm run clients:pending` → Voir qui contacter
3. **Outreach**: `npm run outreach:email` → Envoyer les emails
4. **Soir**: Dashboard → Visualiser la progression
5. **Fin de semaine**: Export CSV → Rapport hebdomadaire

## 📞 Support

Pour toute question:
- Email: djawedblcontact@gmail.com
- Instagram: @flemor.xx
- Twitter: @BlDjawed11176

---

**Dernière mise à jour**: Février 2026
**Version**: 1.0
