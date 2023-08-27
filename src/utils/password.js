import bcrypt from 'bcryptjs';
import BadRequestError from '../errors/bad-request.js';

export const hashPassword = async (password) => {
     const hashedPassword = await bcrypt.hash(password, 10);
     return hashedPassword;
};

export const comparePassword = async (password, hash) => {
     const isPasswordValid = await bcrypt.compare(password, hash);
     return isPasswordValid;
};



export const validatePasswordString = (password) => {
     const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
   
     if (!password.match(regex)) {
       throw new BadRequestError(
         'Password must contain a capital letter, number, special character & greater than 8 digits.',
       );
     }
   }