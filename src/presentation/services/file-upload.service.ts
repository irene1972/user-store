import path from 'path';
import fs from 'fs';
import { Uuid } from '../../config';
import { UploadedFile } from "express-fileupload";
import { CustomError } from '../../domain';

export class FileUploadService{

    constructor(
        private readonly uuid=Uuid.v4
    ){}

    //para confirmar que existe el folder del path que le pasemos
    private checkFolder(folderPath:string){
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }
    }

    async uploadSingle(
        file:UploadedFile,
        folder:string='uploads',
        validExtensions:string[]=['png','jpg','jpeg','gif']
    ){
        try {
            
            const fileExtension=file.mimetype.split('/').at(1) ?? '';

            //validamos la extensión a subir
            if(!validExtensions.includes(fileExtension)) 
                    throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones: ${validExtensions}`);

            const destination=path.resolve(__dirname,'../../../',folder);
            //console.log(destination);
            this.checkFolder(destination);

            const fileName=`${this.uuid()}.${fileExtension}`;

            file.mv(`${destination}/${fileName}`);

            return {fileName};

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public uploadMultiple(
        file:UploadedFile[],
        folder:string='uploads',
        validExtensions:string[]=['png','jpg','jpeg','gif']
    ){
        throw new Error('Not implemented');
    }


}