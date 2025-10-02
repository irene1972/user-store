import path from 'path';
import { UploadedFile } from "express-fileupload";
import fs from 'fs';

export class FileUploadService{

    constructor(){}

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
            
            const fileExtension=file.mimetype.split('/').at(1);
            const destination=path.resolve(__dirname,'../../../',folder);
            //console.log(destination);
            this.checkFolder(destination);

            file.mv(destination+`/mi-imagen.${fileExtension}`);

        } catch (error) {
            console.log(error);
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