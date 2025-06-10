import express from 'express';
import { getMatchedIngredientsFromDB } from '../controllers/recipeController.js';

const router = express.Router();

router.post('/ingredients-from-meal', getMatchedIngredientsFromDB);

export default router;
