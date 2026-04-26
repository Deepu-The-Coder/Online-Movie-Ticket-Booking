import express from 'express'
import { addShow, getNowPlayingMovies, getShow, getShows } from '../controllers/showController.js';
import { protectAdmin } from '../middleware/auth.js';

const showRouter = express.Router();

//protectAdmin
showRouter.get('/now_playing',protectAdmin,  getNowPlayingMovies)
showRouter.post('/add',protectAdmin, addShow)
showRouter.get('/all', getShows)
showRouter.get('/:movie_id',  getShow)


export default showRouter