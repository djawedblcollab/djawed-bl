# Guide de Démarrage Rapide

Ce guide vous aide à démarrer rapidement avec le système d'outreach automatisé.

## ⚡ Démarrage en 3 Minutes

### Étape 1: Ajouter vos prospects (1 minute)

Ouvrez `outreach/prospects.json` et ajoutez vos entreprises cibles:

```json
[
  {
    "id": 1,
    "company": "Nom de l'entreprise",
    "email": "contact@entreprise.com",
    "industry": "Marketing",
    "contacted": false,
    "notes": "Trouvé sur LinkedIn - besoin de vidéos Instagram"
  }
]
```

### Étape 2: Test du système (1 minute)

```bash
# Voir comment ça marche sans rien envoyer
npm run outreach:test
```

### Étape 3: Envoi (optionnel)

**Option A - Simulation (pour débuter):**
```bash
# Marque les prospects comme contactés dans la base
# mais n'envoie pas vraiment d'emails
npm run outreach:send
```

**Option B - Envoi réel d'emails:**
1. Installez les dépendances: `npm install`
2. Configurez vos identifiants dans `.env`
3. Lancez: `npm run outreach:email`

## 📝 Personnaliser le Message

Éditez `outreach/email-template.txt` pour changer le message.
Utilisez `{{company}}` pour insérer le nom de l'entreprise.

## 🎯 Conseils Rapides

### Où trouver des prospects ?

1. **LinkedIn** - Recherchez des entreprises dans votre niche
2. **Google Maps** - Cherchez "agence marketing [ville]"
3. **Réseaux sociaux** - Identifiez des marques actives
4. **Annuaires professionnels** - Pages Jaunes, Kompass

### Quelles entreprises cibler ?

✅ **Bonnes cibles:**
- Agences marketing sans vidéaste en interne
- E-commerce en croissance
- Créateurs de contenu établis
- Startups tech en levée de fonds
- Marques de mode/beauté

❌ **À éviter:**
- Très grandes entreprises (processus trop longs)
- Entreprises qui ont déjà un département vidéo
- Secteurs peu adaptés à la vidéo

### Comment augmenter le taux de réponse ?

1. **Personnalisez** - Mentionnez un projet spécifique
2. **Soyez bref** - 5-7 lignes maximum
3. **Apportez de la valeur** - Proposez une idée de vidéo
4. **Incluez des exemples** - Lien vers votre portfolio
5. **Facilitez la réponse** - Question simple à la fin

### Exemple de personnalisation:

Au lieu de:
> "Bonjour {{company}}"

Essayez:
> "Bonjour {{company}},
> 
> J'ai vu vos posts Instagram et j'ai remarqué que vous utilisez principalement des photos. Avez-vous déjà pensé à des vidéos courtes pour multiplier votre engagement ?"

## 🚨 Règles Importantes

1. **Maximum 10-20 emails/jour** - Ne spammez pas
2. **Respectez le RGPD** - Contactez seulement des entreprises pertinentes
3. **Incluez un opt-out** - "Répondez STOP pour ne plus recevoir d'emails"
4. **Faites un suivi** - Relancez après 1-2 semaines, pas avant
5. **Soyez professionnel** - Répondez rapidement et poliment

## 📊 Suivi des Résultats

Le fichier `prospects.json` est automatiquement mis à jour avec:
- Date de contact
- Statut (contacté ou non)

Pour voir qui a été contacté:
```bash
cat outreach/prospects.json | grep "contacted.*true"
```

## 🎓 Prochaines Étapes

Une fois à l'aise avec le système:

1. **Testez différents messages** - A/B testing
2. **Segmentez vos prospects** - Par industrie, taille, etc.
3. **Automatisez les suivis** - Créez un script pour les relances
4. **Mesurez les résultats** - Taux d'ouverture, de réponse, de conversion

## ❓ FAQ

**Q: Combien de temps avant la première réponse ?**
R: Généralement 2-5 jours. Certains répondent en 24h, d'autres après 2 semaines.

**Q: Quel est un bon taux de réponse ?**
R: 5-10% est très bon pour un cold email. 2-3% est normal.

**Q: Que faire si je reçois des plaintes ?**
R: Présentez vos excuses, retirez immédiatement le contact, et révisez votre ciblage.

**Q: Puis-je envoyer à plusieurs personnes de la même entreprise ?**
R: Non, une seule personne par entreprise pour éviter de paraître spam.

**Q: Faut-il un domaine professionnel ?**
R: C'est mieux (augmente la crédibilité) mais Gmail fonctionne pour débuter.

## 📞 Besoin d'aide ?

Consultez le [README complet](README.md) ou contactez:
- Email: djawedblcontact@gmail.com
- Instagram: @flemor.xx
