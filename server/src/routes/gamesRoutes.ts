import { Router } from 'express';
import { gamesController } from '../controllers/gamesController';

class GamesRoute {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', gamesController.list);
        this.router.get('/:id', gamesController.get);
        this.router.post('/', gamesController.create);
        this.router.delete('/:id', gamesController.delete);
        this.router.put('/:id', gamesController.update);
    }
}

const gamesRoutes = new GamesRoute();
export default gamesRoutes.router;