# Système d'Outreach Automatisé

Ce système permet d'envoyer des messages automatiques à des entreprises pour trouver des clients pour les services de montage vidéo.

## 📁 Structure

```
outreach/
├── prospects.json                # Base de données des prospects
├── email-template.txt            # Template d'email personnalisable
├── send-outreach.js              # Script d'envoi (simulation)
├── send-outreach-with-email.js   # Script avec vrai envoi d'emails
├── show-clients.js               # Visualisation CLI des clients
├── client-dashboard.html         # Dashboard "Où sont mes clients?"
├── prospect-manager.html         # Gestion des prospects
├── CLIENT_GUIDE.md               # Guide de suivi des clients
├── .env.example                  # Exemple de configuration email
└── README.md                     # Ce fichier
```

## 📋 Où sont mes clients?

**Nouveau!** Visualisez rapidement vos prospects et leur statut.

### Commandes rapides

```bash
npm run clients              # Voir tous les clients
npm run clients:contacted    # Uniquement les contactés
npm run clients:pending      # Uniquement en attente
npm run clients:stats        # Statistiques rapides
```

### Dashboard visuel

```bash
open client-dashboard.html   # Interface graphique complète
```

**Fonctionnalités:**
- 📊 Statistiques en temps réel
- 📈 Graphiques par secteur
- 🔍 Recherche et filtres
- 📥 Export CSV

👉 **[Guide complet de suivi des clients](CLIENT_GUIDE.md)**

## 🚀 Utilisation

### 1. Ajouter des prospects

Éditez le fichier `prospects.json` pour ajouter vos prospects:

```json
[
  {
    "id": 1,
    "company": "Nom de l'entreprise",
    "email": "contact@entreprise.com",
    "industry": "Secteur d'activité",
    "contacted": false,
    "notes": "Notes sur le prospect"
  }
]
```

### 2. Personnaliser le message

Modifiez `email-template.txt` selon vos besoins. Utilisez `{{company}}` pour personnaliser avec le nom de l'entreprise.

### 3. Lancer l'outreach

**Option A: Mode Simulation (sans envoi réel)**

```bash
# Mode test (affiche les emails sans les envoyer)
node send-outreach.js --dry-run

# Simulation avec mise à jour de la base (marque comme contacté)
node send-outreach.js --limit 5
```

**Option B: Envoi Réel d'Emails**

1. Installez les dépendances:
```bash
npm install
```

2. Configurez vos identifiants email:
```bash
cp .env.example .env
# Éditez .env avec vos informations
```

3. Lancez l'envoi:
```bash
# Mode test
node send-outreach-with-email.js --dry-run

# Envoi réel
node send-outreach-with-email.js --limit 5
```

## 🔧 Options

- `--dry-run` : Mode test, affiche les emails sans les envoyer
- `--limit N` : Limite le nombre de prospects à contacter (défaut: 5)

## 📧 Intégration Email

Deux options sont disponibles pour l'envoi d'emails:

### 🎯 Option Recommandée: Script Intégré avec Nodemailer

Le fichier `send-outreach-with-email.js` inclut déjà l'intégration email.

**Configuration:**

1. Copiez le fichier d'exemple:
```bash
cp .env.example .env
```

2. Éditez `.env` avec vos informations:
```
EMAIL_SERVICE=gmail
EMAIL_USER=djawedblcontact@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
```

**Important pour Gmail:**
- Activez la validation en 2 étapes
- Créez un "mot de passe d'application": https://myaccount.google.com/apppasswords
- N'utilisez JAMAIS votre mot de passe Gmail normal

3. Installez les dépendances:
```bash
npm install
```

4. Testez:
```bash
npm run outreach:email:test
```

5. Envoyez:
```bash
npm run outreach:email
```

### 🔧 Option Alternative: Autres Services Email

Pour envoyer réellement des emails, vous pouvez intégrer d'autres services.

### Option 1: Nodemailer (SMTP)

```bash
npm install nodemailer
```

Ajoutez dans `send-outreach.js`:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votre-email@gmail.com',
    pass: 'votre-mot-de-passe-app'
  }
});

// Dans la boucle:
await transporter.sendMail({
  from: 'djawedblcontact@gmail.com',
  to: prospect.email,
  subject: 'Services de Montage Vidéo Professionnel',
  text: email
});
```

### SendGrid (Alternative)

```bash
npm install @sendgrid/mail
```

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('VOTRE_API_KEY');

await sgMail.send({
  to: prospect.email,
  from: 'djawedblcontact@gmail.com',
  subject: 'Services de Montage Vidéo Professionnel',
  text: email
});
```

### Mailgun (Alternative)

```bash
npm install mailgun-js
```

```javascript
const mailgun = require('mailgun-js')({
  apiKey: 'VOTRE_API_KEY',
  domain: 'VOTRE_DOMAINE'
});

await mailgun.messages().send({
  from: 'djawedblcontact@gmail.com',
  to: prospect.email,
  subject: 'Services de Montage Vidéo Professionnel',
  text: email
});
```

## ⚠️ Important

1. **Respectez la législation**: Assurez-vous de respecter le RGPD et les lois anti-spam
2. **Obtenez le consentement**: Idéalement, contactez seulement des entreprises qui ont accepté d'être contactées
3. **Incluez un opt-out**: Permettez aux destinataires de se désabonner
4. **Ne spammez pas**: Limitez le nombre d'emails envoyés par jour
5. **Personnalisez**: Les messages personnalisés ont un meilleur taux de réponse

## 📊 Suivi

Le script met automatiquement à jour `prospects.json` avec:
- `contacted: true` pour les prospects contactés
- `contactedDate` : Date de contact

## 💡 Conseils

1. Recherchez des entreprises qui ont besoin de services vidéo:
   - Agences marketing
   - E-commerce
   - Créateurs de contenu
   - Entreprises tech
   - Marques de mode

2. Personnalisez vos messages:
   - Mentionnez un projet spécifique de l'entreprise
   - Expliquez comment vous pouvez les aider
   - Soyez concis et professionnel

3. Faites un suivi:
   - Attendez 1-2 semaines avant un rappel
   - Soyez courtois et respectueux
   - Acceptez les refus avec professionnalisme

## 📞 Support

Pour toute question, contactez:
- Email: djawedblcontact@gmail.com
- Instagram: @flemor.xx
- Twitter: @BlDjawed11176
