import { Router } from 'express';
import { AuthMidelware } from '../midelwares/auth.midleware';
import { ProductController } from './controller';

export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    //const productService=new ProductService();
    const controller=new ProductController();
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', [AuthMidelware.validateJWT],controller.createProduct );



    return router;
  }


}

