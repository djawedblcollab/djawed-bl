#!/usr/bin/env node

/**
 * Client List Viewer - "Où sont mes clients?"
 * 
 * Quick CLI tool to view your prospects/clients status
 * 
 * Usage: 
 *   node show-clients.js              # Show all clients
 *   node show-clients.js --contacted  # Show only contacted
 *   node show-clients.js --pending    # Show only pending
 *   node show-clients.js --stats      # Show statistics only
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const showContacted = args.includes('--contacted');
const showPending = args.includes('--pending');
const showStats = args.includes('--stats');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║           📋 OÙ SONT MES CLIENTS? - Liste des Prospects       ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log();

// Load prospects
const prospectsPath = path.join(__dirname, 'prospects.json');

if (!fs.existsSync(prospectsPath)) {
  console.error('❌ Erreur: Le fichier prospects.json n\'existe pas!');
  console.error('   Chemin: ' + prospectsPath);
  process.exit(1);
}

let prospects = [];
try {
  prospects = JSON.parse(fs.readFileSync(prospectsPath, 'utf8'));
} catch (err) {
  console.error('❌ Erreur de lecture du fichier prospects.json:', err.message);
  process.exit(1);
}

// Calculate statistics
const total = prospects.length;
const contacted = prospects.filter(p => p.contacted).length;
const pending = prospects.filter(p => !p.contacted).length;

// Group by industry
const byIndustry = {};
prospects.forEach(p => {
  const industry = p.industry || 'Non spécifié';
  if (!byIndustry[industry]) {
    byIndustry[industry] = { total: 0, contacted: 0, pending: 0 };
  }
  byIndustry[industry].total++;
  if (p.contacted) {
    byIndustry[industry].contacted++;
  } else {
    byIndustry[industry].pending++;
  }
});

// Display statistics
console.log('📊 STATISTIQUES GLOBALES');
console.log('─'.repeat(64));
console.log(`Total de prospects     : ${total}`);
console.log(`✅ Contactés           : ${contacted} (${total > 0 ? Math.round(contacted/total*100) : 0}%)`);
console.log(`⏳ En attente          : ${pending} (${total > 0 ? Math.round(pending/total*100) : 0}%)`);
console.log();

// Show by industry
console.log('📈 PAR SECTEUR D\'ACTIVITÉ');
console.log('─'.repeat(64));
Object.keys(byIndustry).sort().forEach(industry => {
  const stats = byIndustry[industry];
  console.log(`${industry.padEnd(25)} │ Total: ${stats.total}  │ ✅ ${stats.contacted}  │ ⏳ ${stats.pending}`);
});
console.log();

// If only stats requested, exit here
if (showStats) {
  process.exit(0);
}

// Filter prospects based on arguments
let filteredProspects = prospects;
if (showContacted) {
  filteredProspects = prospects.filter(p => p.contacted);
} else if (showPending) {
  filteredProspects = prospects.filter(p => !p.contacted);
}

// Display detailed list
console.log('📋 LISTE DÉTAILLÉE DES PROSPECTS');
console.log('─'.repeat(64));

if (filteredProspects.length === 0) {
  console.log('Aucun prospect trouvé avec ces critères.');
  console.log();
  process.exit(0);
}

filteredProspects.forEach((prospect, index) => {
  const status = prospect.contacted ? '✅ Contacté' : '⏳ En attente';
  const dateInfo = prospect.contactedDate 
    ? `le ${new Date(prospect.contactedDate).toLocaleDateString('fr-FR')}` 
    : '';
  
  console.log();
  console.log(`[${index + 1}] ${prospect.company}`);
  console.log(`    Statut      : ${status} ${dateInfo}`);
  console.log(`    Email       : ${prospect.email}`);
  console.log(`    Secteur     : ${prospect.industry || 'Non spécifié'}`);
  if (prospect.notes) {
    console.log(`    Notes       : ${prospect.notes}`);
  }
});

console.log();
console.log('─'.repeat(64));
console.log(`Affichage de ${filteredProspects.length} prospect(s) sur ${total} total`);
console.log();

// Show usage tips
console.log('💡 ASTUCES:');
console.log('   npm run clients              → Voir tous les clients');
console.log('   npm run clients:contacted    → Voir uniquement les contactés');
console.log('   npm run clients:pending      → Voir uniquement en attente');
console.log('   npm run clients:stats        → Voir les statistiques');
console.log();
