import bcrypt from 'bcryptjs';

const hashedPassword = '$2b$10$mFuprlq2266tgbDFBH5Q..ZDRYelpsVrSNDdcDeKXSiB/6qxgn6N.';
const plainPassword = 'secret123';

const match = await bcrypt.compare(plainPassword, hashedPassword);
console.log("Passwords match?", match);
