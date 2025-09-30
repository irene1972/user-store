//import jwt from "jsonwebtoken";
var jwt = require('jsonwebtoken');

export class JwtAdapter{

    static async generateToken(payload:any,duration:string='2h'){

        return new Promise((resolve)=>{
            jwt.sign(payload,"SEED",{expiresIn:duration},(err:Error,token:string)=>{
                if(err) return resolve(null);
                resolve(token);
            });
        });
    }

    static validateToken(token:string){

        return;
    }

}