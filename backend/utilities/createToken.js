import jwt from 'jsonwebtoken';
function createToken(id) {
    return (  
        token = jwt.sign({ id }, process.env.JWT_SECRET ,{
      expiresIn: process.env.JWT_EXPIRY,
    })
    )
}

export default createToken;