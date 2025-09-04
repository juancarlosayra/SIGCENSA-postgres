import express from 'express';
import { pool } from '../config/db.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Getting users');
})

export default router;

