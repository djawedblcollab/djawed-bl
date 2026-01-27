# Djawed BL - Portfolio & Système d'Outreach

Portfolio professionnel de Djawed BL, monteur vidéo et motion designer, avec système d'outreach automatisé pour trouver des clients.

## 📁 Structure du Projet

```
djawed-bl/
├── portfolio site/             # Site portfolio (HTML/CSS/JS)
│   └── index.html             # Portfolio avec vidéos et projets
├── outreach/                  # Système d'outreach automatisé
│   ├── prospects.json         # Base de données des prospects
│   ├── email-template.txt     # Template d'email personnalisable
│   ├── send-outreach.js       # Script d'envoi (simulation)
│   ├── send-outreach-with-email.js  # Script avec envoi réel
│   ├── prospect-manager.html  # Interface web de gestion
│   ├── .env.example          # Exemple de configuration
│   ├── QUICK_START.md        # Guide de démarrage rapide
│   └── README.md             # Documentation complète
├── package.json              # Configuration Node.js
├── .gitignore               # Protection des données sensibles
└── README.md                # Ce fichier
```

## 🎬 Portfolio

Le site portfolio présente :
- Montage vidéo YouTube
- Création de contenus courts (TikTok/Reels)
- Motion design et animations
- Services et tarifs
- Projets réalisés
- Contact direct

**Voir le portfolio**: [https://djawedblcollab.github.io/djawed-bl/portfolio%20site/](https://djawedblcollab.github.io/djawed-bl/portfolio%20site/)

## 📧 Système d'Outreach Automatisé

### Qu'est-ce que c'est ?

Un système permettant d'envoyer automatiquement des messages professionnels à des entreprises pour trouver de nouveaux clients pour les services de montage vidéo.

### Démarrage Rapide

**Option 1 - Interface Web (Recommandé pour débuter):**
```bash
# Ouvrir l'interface de gestion
open outreach/prospect-manager.html
```

**Option 2 - Ligne de commande:**
```bash
# 1. Mode test (voir les emails sans les envoyer)
npm run outreach:test

# 2. Envoyer aux 5 premiers prospects
npm run outreach:send

# 3. Options personnalisées
node outreach/send-outreach.js --dry-run --limit 3
```

### Configuration

1. **Ajouter des prospects**: Éditez `outreach/prospects.json`
2. **Personnaliser le message**: Modifiez `outreach/email-template.txt`
3. **Lancer le script**: Utilisez les commandes npm ou node

### Documentation Complète

Consultez [outreach/README.md](outreach/README.md) pour :
- Instructions détaillées
- Intégration avec services d'email (Nodemailer, SendGrid, Mailgun)
- Conseils pour un outreach efficace
- Respect du RGPD et bonnes pratiques

## 🚀 Utilisation

### Portfolio Web

Ouvrez simplement `portfolio site/index.html` dans votre navigateur.

### Système d'Outreach

```bash
# Installation (si nécessaire pour l'envoi d'emails)
npm install

# Test sans envoi
npm run outreach:test

# Envoi réel (après configuration du service d'email)
npm run outreach:send
```

## 📊 Services Proposés

- **Montage YouTube**: À partir de 20€/minute
- **TikTok/Reels**: À partir de 30€
- **Motion Design**: À partir de 150€

## 📞 Contact

- **Email**: djawedblcontact@gmail.com
- **Instagram**: [@flemor.xx](https://www.instagram.com/flemor.xx/)
- **Twitter**: [@BlDjawed11176](https://x.com/BlDjawed11176)

## ⚠️ Important

Le système d'outreach doit être utilisé de manière responsable :
- Respectez le RGPD et les lois anti-spam
- Contactez uniquement des entreprises pertinentes
- Personnalisez vos messages
- Ne spammez pas

## 💡 Conseils

Pour maximiser vos chances de succès :
1. Recherchez des entreprises qui ont réellement besoin de services vidéo
2. Personnalisez chaque message
3. Soyez professionnel et concis
4. Faites un suivi poli après 1-2 semaines
5. Acceptez les refus avec professionnalisme

## 🔧 Développement

Pour contribuer ou modifier le projet :

```bash
git clone https://github.com/djawedblcollab/djawed-bl.git
cd djawed-bl
# Modifiez les fichiers selon vos besoins
```

## 📄 Licence

MIT License - Libre d'utilisation et de modification

---

**© 2025 Djawed BL - Monteur Vidéo · Motion Designer**
