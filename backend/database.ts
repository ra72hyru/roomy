import Database from 'better-sqlite3';

const db = new Database('roomy.db');

//Create table for rooms
db.exec(`
    CREATE TABLE IF NOT EXISTS rooms 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        location TEXT
    )    
`);

//Create table for users
db.exec(`
    CREATE TABLE IF NOT EXISTS users 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE,
        is_admin BOOLEAN DEFAULT 0,
        username TEXT UNIQUE,
        password TEXT
    )    
`);

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    is_admin: boolean;
    username: string;
    password: string;
}

interface UserCount {
    count: number;
}

//Add default admin
const userCount = db.prepare(`
    SELECT COUNT(*) AS count  
    FROM users;
`).get() as UserCount;

if (Number(userCount.count) === 0) {
    db.prepare(`
        INSERT INTO users (first_name, last_name, is_admin, username, password)
        VALUES ('default', 'admin', 1, 'admin', 'password');
    `).run();
}


//Create table for bookings
db.exec(`
    CREATE TABLE IF NOT EXISTS bookings
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        room_id INTEGER NOT NULL REFERENCES rooms(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL
    ) 
`);

export default db;