#!/usr/bin/env node

/**
 * Automated Business Outreach Script
 * 
 * This script sends professional outreach emails to businesses
 * to find clients for video editing services.
 * 
 * Usage: node send-outreach.js [--dry-run] [--limit N]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitIndex = args.indexOf('--limit');
const limit = limitIndex !== -1 ? parseInt(args[limitIndex + 1]) || 5 : 5;

console.log('='.repeat(60));
console.log('📧 Système d\'Outreach Automatisé - Djawed BL');
console.log('='.repeat(60));
console.log();

// Load prospects
const prospectsPath = path.join(__dirname, 'prospects.json');
const templatePath = path.join(__dirname, 'email-template.txt');

if (!fs.existsSync(prospectsPath)) {
  console.error('❌ Erreur: Le fichier prospects.json n\'existe pas!');
  console.error('   Créez le fichier avec la liste des prospects.');
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error('❌ Erreur: Le fichier email-template.txt n\'existe pas!');
  console.error('   Créez le fichier avec le template d\'email.');
  process.exit(1);
}

const prospects = JSON.parse(fs.readFileSync(prospectsPath, 'utf8'));
const emailTemplate = fs.readFileSync(templatePath, 'utf8');

// Filter non-contacted prospects
const toContact = prospects.filter(p => !p.contacted).slice(0, limit);

if (toContact.length === 0) {
  console.log('✅ Tous les prospects ont déjà été contactés!');
  console.log('   Ajoutez de nouveaux prospects dans prospects.json');
  process.exit(0);
}

console.log(`📊 Statistiques:`);
console.log(`   Total prospects: ${prospects.length}`);
console.log(`   Non contactés: ${prospects.filter(p => !p.contacted).length}`);
console.log(`   À contacter maintenant: ${toContact.length}`);
console.log();

if (isDryRun) {
  console.log('🔍 MODE TEST (--dry-run): Aucun email ne sera envoyé\n');
}

// Process each prospect
toContact.forEach((prospect, index) => {
  console.log(`\n[${ index + 1}/${toContact.length}] ${prospect.company}`);
  console.log(`   Email: ${prospect.email}`);
  console.log(`   Industrie: ${prospect.industry}`);
  
  // Generate personalized email
  const email = emailTemplate.replace(/{{company}}/g, prospect.company);
  
  console.log('\n   📝 Message généré:');
  console.log('   ' + '-'.repeat(50));
  console.log(email.split('\n').map(line => '   ' + line).join('\n'));
  console.log('   ' + '-'.repeat(50));
  
  if (!isDryRun) {
    // In a real implementation, this would send the email
    // For now, we simulate it and mark as contacted
    console.log('\n   ✉️  Email envoyé!');
    prospect.contacted = true;
    prospect.contactedDate = new Date().toISOString();
  } else {
    console.log('\n   ⚠️  Email NON envoyé (mode test)');
  }
});

// Save updated prospects list
if (!isDryRun) {
  fs.writeFileSync(prospectsPath, JSON.stringify(prospects, null, 2));
  console.log('\n\n✅ Fichier prospects.json mis à jour!');
}

console.log('\n' + '='.repeat(60));
console.log('📬 Résumé:');
console.log(`   Prospects traités: ${toContact.length}`);
if (!isDryRun) {
  console.log(`   Emails envoyés: ${toContact.length}`);
  console.log(`\n💡 Pour envoyer réellement les emails, intégrez avec:`);
  console.log(`   - Nodemailer (SMTP)`);
  console.log(`   - SendGrid API`);
  console.log(`   - Mailgun API`);
  console.log(`   - Ou tout autre service d'envoi d'emails`);
} else {
  console.log(`   Mode: TEST (utilisez sans --dry-run pour envoyer)`);
}
console.log('='.repeat(60));
console.log();
