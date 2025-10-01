import mongoose from "mongoose";

export class Validatos{

    static isMongoID(id:string){
        return mongoose.isValidObjectId(id);
    }

}