// Script to generate correct password hashes
const bcrypt = require('bcryptjs');

const generateHashes = async () => {
  const passwords = {
    admin123: await bcrypt.hash('admin123', 12),
    student123: await bcrypt.hash('student123', 12),
    parent123: await bcrypt.hash('parent123', 12),
    teacher123: await bcrypt.hash('teacher123', 12)
  };
  
  console.log('Password Hashes:');
  console.log('admin123:', passwords.admin123);
  console.log('student123:', passwords.student123);
  console.log('parent123:', passwords.parent123);
  console.log('teacher123:', passwords.teacher123);
};

generateHashes();