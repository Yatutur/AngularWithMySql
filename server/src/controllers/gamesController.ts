import { Request, Response } from 'express';
import pool from '../database';

class GamesController {
    public async list (req: Request, res: Response): Promise<void>{
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    };

    public async get (req: Request, res: Response): Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id=?', [id]);
        if(games.length > 0){
            return res.json(games[0]);
        }
        res.status(404).json({text: "The game doesn't exists"});
        res.json(games);
    };

    public async create (req: Request, res: Response): Promise<void>{
        await pool.query('INSERT INTO games SET ?', [req.body]);
        res.json({text: 'Saved game'});
    }

    public async delete (req: Request, res: Response):Promise<void>{
        await pool.query('DELETE FROM games WHERE id=?', [req.params.id]);
        res.json({text: 'Game deleted'});
    }
    
    public async update (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE games SET ? WHERE id=?', [req.body, id]);
        res.json({text: 'Game ' + req.params.id + ' updated'});
    }
}

export const gamesController = new GamesController();