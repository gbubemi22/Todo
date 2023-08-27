import jwt  from 'jsonwebtoken'
import { StatusCodes }  from 'http-status-codes'
import  constant  from '../constant/index.js'
import UnauthorizedError from '../errors/unauthorized.js'



export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    try {
      jwt.verify(token, process.env.JWT_SECRET, ( err, decoded)=> {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid token' });
        }  else {
          req.user = decoded;
        }
      });
      
      next();
    } catch (error) {
      next(new UnauthorizedError("Invalid token"));
    }
  } else {
    next(new UnauthorizedError("Token not provided"));
  }
};



export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.accountType === constant.ACCOUNT_TYPES.ADMIN || req.user.id === req.params.id) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
    }
  });
};



export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.accountType === constant.ACCOUNT_TYPES.ADMIN) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not allowed to perform this action!");
    }
  });
};







export default {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  
};


