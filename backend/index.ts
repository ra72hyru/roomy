import express from 'express';
import db, {User} from './database';
import cors from 'cors';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const app = express();

app.use(express.json());
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE']}));

app.post('/login', (req, res) => {
    const sql: string = `
        SELECT *
        FROM users
        WHERE username = ? AND password = ?;
    `;

    const username: string = req.query.username as string;
    const password: string = req.query.password as string;

    const user: User | unknown = db.prepare(sql).get([username, password]);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});