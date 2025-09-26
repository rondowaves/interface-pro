// Script pour générer le hash du mot de passe
const CryptoJS = require('crypto-js');

function hashPassword(password, salt) {
  const saltToUse = salt || CryptoJS.lib.WordArray.random(128/8).toString();
  const hash = CryptoJS.PBKDF2(password, saltToUse, {
    keySize: 256/32,
    iterations: 10000
  }).toString();
  return `${saltToUse}:${hash}`;
}

// Générer le hash pour interfacepro2024
const password = 'interfacepro2024';
const hashedPassword = hashPassword(password);

console.log('Mot de passe:', password);
console.log('Hash généré:', hashedPassword);
