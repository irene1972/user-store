import fs from 'fs';
import path from 'path';
import { Response, Request } from 'express';

export class ImageController {

  // DI
  constructor() {}

  getImage = ( req: Request, res: Response ) => {

    const {type='',img=''}=req.params;
    const imagePath=path.resolve(__dirname,`../../../uploads/${type}/${img}`);

    if(!fs.existsSync(imagePath))
        return res.status(400).send('Image not found');

    res.sendFile(imagePath);
    //console.log(req.params);
    //res.json('getImage');

  };



}