import jwt from 'jsonwebtoken';
function createToken(data) {
 
      return( jwt.sign(data, process.env.JWT_SECRET ,{
      expiresIn: process.env.JWT_EXPIRY,
        })
     )
    
}

export default createToken;