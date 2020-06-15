import md5 from 'crypto-js/md5';

// Função que cria um hash padrão md5, a partir do email fornecido por um usuário.
const hashedMail = (email) => md5(email).toString().toLowerCase().trim();

export default hashedMail;
