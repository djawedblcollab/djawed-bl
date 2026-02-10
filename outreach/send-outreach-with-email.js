#!/usr/bin/env node

/**
 * Example: Automated Business Outreach with Real Email Integration
 * 
 * This is a more advanced version that shows how to integrate with real email services.
 * IMPORTANT: This requires npm packages to be installed first.
 * 
 * Installation:
 *   npm install nodemailer dotenv
 * 
 * Configuration:
 *   Create a .env file with:
 *     EMAIL_USER=your-email@gmail.com
 *     EMAIL_PASS=your-app-password
 *     EMAIL_SERVICE=gmail
 * 
 * Usage: 
 *   node send-outreach-with-email.js [--dry-run] [--limit N]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitIndex = args.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) || 5 : 5;

console.log('='.repeat(60));
console.log('📧 Système d\'Outreach Automatisé avec Email - Djawed BL');
console.log('='.repeat(60));
console.log();

// Check for dependencies
let nodemailer, dotenv;
try {
  nodemailer = require('nodemailer');
  dotenv = require('dotenv');
  dotenv.config();
} catch (err) {
  console.error('❌ Erreur: Dépendances manquantes!');
  console.error('   Installez les packages requis:');
  console.error('   npm install nodemailer dotenv\n');
  if (!isDryRun) {
    process.exit(1);
  }
  console.log('⚠️  Mode --dry-run: Continuons sans les dépendances\n');
}

// Load prospects
const prospectsPath = path.join(__dirname, 'prospects.json');
const templatePath = path.join(__dirname, 'email-template.txt');

if (!fs.existsSync(prospectsPath)) {
  console.error('❌ Erreur: Le fichier prospects.json n\'existe pas!');
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error('❌ Erreur: Le fichier email-template.txt n\'existe pas!');
  process.exit(1);
}

const prospects = JSON.parse(fs.readFileSync(prospectsPath, 'utf8'));
const emailTemplate = fs.readFileSync(templatePath, 'utf8');

// Filter non-contacted prospects
const toContact = prospects.filter(p => !p.contacted).slice(0, limit);

if (toContact.length === 0) {
  console.log('✅ Tous les prospects ont déjà été contactés!');
  process.exit(0);
}

// Configure email transporter
let transporter = null;
async function setupEmailTransporter() {
  if (!isDryRun && nodemailer) {
    const emailConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };

    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.error('❌ Erreur: Configuration email manquante!');
      console.error('   Créez un fichier .env avec:');
      console.error('   EMAIL_USER=votre-email@gmail.com');
      console.error('   EMAIL_PASS=votre-mot-de-passe-app');
      console.error('   EMAIL_SERVICE=gmail\n');
      process.exit(1);
    }

    transporter = nodemailer.createTransport(emailConfig);
    
    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ Connexion au serveur email réussie!\n');
    } catch (err) {
      console.error('❌ Erreur de connexion au serveur email:', err.message);
      process.exit(1);
    }
  }
}

async function main() {
  await setupEmailTransporter();

  console.log(`📊 Statistiques:`);
  console.log(`   Total prospects: ${prospects.length}`);
  console.log(`   Non contactés: ${prospects.filter(p => !p.contacted).length}`);
  console.log(`   À contacter maintenant: ${toContact.length}`);
  console.log();

  if (isDryRun) {
    console.log('🔍 MODE TEST (--dry-run): Aucun email ne sera envoyé\n');
  }

  // Process each prospect
  for (let i = 0; i < toContact.length; i++) {
    const prospect = toContact[i];
    console.log(`\n[${i + 1}/${toContact.length}] ${prospect.company}`);
    console.log(`   Email: ${prospect.email}`);
    console.log(`   Industrie: ${prospect.industry}`);
    
    // Generate personalized email
    const emailBody = emailTemplate.replace(/{{company}}/g, prospect.company);
    
    console.log('\n   📝 Message généré:');
    console.log('   ' + '-'.repeat(50));
    console.log(emailBody.split('\n').map(line => '   ' + line).join('\n'));
    console.log('   ' + '-'.repeat(50));
    
    if (!isDryRun && transporter) {
      try {
        // Send real email
        await transporter.sendMail({
          from: `"Djawed BL - Montage Vidéo" <${process.env.EMAIL_USER}>`,
          to: prospect.email,
          subject: 'Services de Montage Vidéo Professionnel',
          text: emailBody,
          html: emailBody.replace(/\n/g, '<br>')
        });
        
        console.log('\n   ✉️  Email envoyé avec succès!');
        prospect.contacted = true;
        prospect.contactedDate = new Date().toISOString();
        
        // Wait between emails to avoid spam detection
        if (i < toContact.length - 1) {
          console.log('   ⏱️  Attente de 3 secondes...');
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (err) {
        console.error(`\n   ❌ Erreur d'envoi: ${err.message}`);
        prospect.error = err.message;
      }
    } else {
      console.log('\n   ⚠️  Email NON envoyé (mode test)');
    }
  }

  // Save updated prospects list
  if (!isDryRun) {
    fs.writeFileSync(prospectsPath, JSON.stringify(prospects, null, 2));
    console.log('\n\n✅ Fichier prospects.json mis à jour!');
  }

  console.log('\n' + '='.repeat(60));
  console.log('📬 Résumé:');
  console.log(`   Prospects traités: ${toContact.length}`);
  if (!isDryRun) {
    const sent = toContact.filter(p => p.contacted).length;
    const failed = toContact.filter(p => p.error).length;
    console.log(`   Emails envoyés: ${sent}`);
    if (failed > 0) {
      console.log(`   Échecs: ${failed}`);
    }
  } else {
    console.log(`   Mode: TEST`);
  }
  console.log('='.repeat(60));
  console.log();
}

// Run the main process
main().catch(err => {
  console.error('\n❌ Erreur fatale:', err);
  process.exit(1);
});
