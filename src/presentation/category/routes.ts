import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMidelware } from '../midelwares/auth.midleware';


export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();
    const controller=new CategoryController();
    
    // Definir las rutas
    router.get('/', controller.getCategories );
    router.post('/', [AuthMidelware.validateJWT],controller.createCategory );



    return router;
  }


}

