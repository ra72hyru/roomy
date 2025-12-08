import express from 'express';
import db, {type User} from './database.ts';
import cors from 'cors';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const app = express();

app.use(express.json());
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}));

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
        res.status(200).json({user: user});
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

//----------------------------------------------------- Users -----------------------------------------------------

//get all the users
app.get('/users', (req, res) => {
    const sql: string = `
        SELECT *
        FROM users;
    `;

    try {
        const users = db.prepare(sql).all();   
        res.status(200).json({users: users});
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
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

//----------------------------------------------------- Rooms -----------------------------------------------------

//get all the rooms
app.get('/rooms', (req, res) => {
    const sql: string = `
        SELECT *
        FROM rooms;
    `;

    try {
        const rooms = db.prepare(sql).all();   
        res.status(200).json({rooms: rooms});
        console.log('Sent all the rooms');
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
        console.log('Sent no rooms :/');
    }
});

//handle adding a room, sends back the id of the created room upon success
app.post('/add-room', (req, res) => {
    const sql: string = `
        INSERT INTO rooms (name, capacity, location)
        VALUES (?, ?, ?);
    `;

    const { name, capacity, location } = req.body;

    const result = db.prepare(sql).run([name, capacity, location]);
    if (result.changes > 0) {
        const id: number = Number(result.lastInsertRowid);
        console.log(`Added room with id ${id}`);

        res.status(201).json({message: 'Room added successfully', id: id});
    } else {
        res.status(500).json({message: 'Failed to add room'});
        console.log(`Failed adding room`);
    }
});

//handle editing a room
app.put('/edit-room', (req, res) => {
    const { id, name, capacity, location } = req.body;
    //TODO: check if variables exist

    const sql: string = `
        UPDATE rooms 
        SET name = ?, capacity = ?, location = ?
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run([name, capacity, location, id]);

    if (result.changes > 0) {
        res.status(200).json({message: 'Room successfully edited'});
    } else {
        res.status(404).json({message: 'Room not found'});
    }
});

//handle deleting a room
app.delete('/delete-room/:id', (req, res) => {
    const sql: string = `
        DELETE FROM rooms
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run(req.params.id);

    if (result.changes > 0) 
        res.status(200).json({message: 'Room deleted'});
    else {
        res.status(404).json({message: 'Room not found'});
        console.log(`Could not delete room with id ${req.params.id}`);
    }
});

//----------------------------------------------------- Bookings -----------------------------------------------------

//get all bookings
app.get('/bookings', (req, res) => {
    const sql: string = `
        SELECT *
        FROM bookings;
    `;

    try {
        const bookings = db.prepare(sql).all();
        res.status(200).json({bookings: bookings});
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
});

//get all bookings for a specific user
app.get('/bookings/:user_id', (req, res) => {
    const sql: string = `
        SELECT *
        FROM bookings
        WHERE user_id = ?
        ORDER BY start_time ASC, end_time ASC;
    `;

    try {
        const bookings = db.prepare(sql).all(req.params.user_id);
        //console.log(bookings);
        res.status(200).json({bookings: bookings});
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
});

//get all bookings for a specific room
app.get('/bookings/rooms/:room_id', (req, res) => {
    const sql: string = `
        SELECT b.id, b.user_id, first_name, last_name, room_id, start_time, end_time
        FROM bookings b LEFT JOIN users u ON b.user_id = u.id
        WHERE room_id = ?
        ORDER BY start_time ASC, end_time ASC;
    `;

    try {
        const bookings = db.prepare(sql).all(req.params.room_id);
        console.log('bookings: ', bookings);
        res.status(200).json({bookings: bookings});
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
        console.log('failed to fetch bookings for room');
    }
});

//add a booking
app.post('/bookings/add', (req, res) => {
    //console.log(req.body);
    const sql: string = `
        INSERT INTO bookings (user_id, room_id, start_time, end_time)
        VALUES (?, ?, ?, ?);
    `;

    const { user_id, room_id, start_time, end_time } = req.body;

    const result = db.prepare(sql).run([user_id, room_id, start_time, end_time]);
    if (result.changes > 0) {
        const id: number = Number(result.lastInsertRowid);
        console.log(`Added booking with id ${id}`);

        res.status(201).json({message: 'Booking added successfully', id: id});
    } else {
        res.status(500).json({message: 'Failed to add booking'});
    }
});

//edit a booking
app.patch('/bookings/:id', (req, res) => {
    const { room_id, start_time, end_time } = req.body;
    //TODO: check if variables exist

    const sql: string = `
        UPDATE bookings 
        SET room_id = ?, start_time = ?, end_time = ?
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run([room_id, start_time, end_time, req.params.id]);

    if (result.changes > 0) {
        res.status(200).json({message: 'Booking successfully edited'});
    } else {
        res.status(404).json({message: 'Booking not found'});
    }
});

//delete a booking
app.delete('/bookings/:id', (req, res) => {
    const sql: string = `
        DELETE FROM bookings
        WHERE id = ?;
    `;
    const result = db.prepare(sql).run(req.params.id);

    if (result.changes > 0) 
        res.status(200).json({message: 'Booking deleted'});
    else
        res.status(404).json({message: 'Booking not found'});
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});