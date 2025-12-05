import express from 'express';
import db, {type User} from './database.ts';
import cors from 'cors';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const app = express();

app.use(express.json());
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));

//get all the users
app.get('/users', (req, res) => {
    const sql: string = `
        SELECT *
        FROM users
    `;

    const users = db.prepare(sql).all();

    res.status(200).json({users: users});
});

//handle login from the login page
app.post('/login', (req, res) => {
    const sql: string = `
        SELECT *
        FROM users
        WHERE username = ? AND password = ?;
    `;

    const username: string = req.body.username as string;
    const password: string = req.body.password as string;

    const user: User | unknown = db.prepare(sql).get([username, password]);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

//handle adding a user, sends back the id of the created user upon success
app.post('/add-user', (req, res) => {
    const sql: string = `
        INSERT INTO users (first_name, last_name, email, is_admin, username, password)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const { first_name, last_name, email, is_admin, username, password } = req.body;

    const result = db.prepare(sql).run([first_name, last_name, email, Number(is_admin), username, password]);
    if (result.changes > 0) {
        const id: number = Number(result.lastInsertRowid);
        console.log(`Added user with id ${id}`);

        res.status(201).json({message: 'User added successfully', id: id});
    } else {
        res.status(500).json({message: 'Failed to add user'});
    }
});

//handle editing a user
app.put('/edit-user', (req, res) => {
    const { id, first_name, last_name, email, is_admin } = req.body;
    //TODO: check if variables exist

    const sql: string = `
        UPDATE users 
        SET first_name = ?, last_name = ?, email = ?, is_admin = ?, username = ?, password = ?
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run([first_name, last_name, email, Number(is_admin), first_name, last_name, id]);

    if (result.changes > 0) {
        res.status(200).json({message: 'User successfully edited'});
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

//handle deleting a user
app.delete('/delete-user', (req, res) => {
    const {id} = req.body;

    const sql: string = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run(id);

    if (result.changes > 0) 
        res.status(200).json({message: 'User deleted'});
    else
        res.status(404).json({message: 'User not found'});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});