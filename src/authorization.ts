import {Request, Response, NextFunction} from 'express'
const authorize = (req: Request, res: Response, next: NextFunction) => {
    const expectedToken = "Bearer VALID_AUTH_TOKEN";
    const token = req.headers['authorization'];
    
    if(token == expectedToken){
        return next()        
    }
    return res.status(403).json({ error: "invalid token"});        
}
  
export default authorize;