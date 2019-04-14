const crypto = require('crypto')

const cryptService = {
  cipher: (password) => {
    const algorithm = 'aes-192-cbc';
    
    const key = crypto.scryptSync(process.env.SECRET, 'salt', 24);
    
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return encrypted
  }
}

module.exports = cryptService