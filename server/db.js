const {AsyncDatabase } = require("promised-sqlite3");

const users = [];

const getUser = async function(username, password) {

    console.log('getUser:', `${username}, ${password}`);

    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    return db.get(query).then((data) => {
        console.log('getUser:', data);
        db.close();
        return data ?? null;
    }).catch((error) => {
        db.close();
        console.log('Error getUser:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
}



const getDocs = async function(req, res) {
    // const token = req.headers['x-bsm-token'];
    
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `SELECT * FROM documents`;

    return db.all(query).then((data) => {
        console.log('getDocs:', data);
        db.close();
        return res.status(200).json({data: data});
    }).catch((error) => {
        db.close();
        console.log('Error getDocs:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
    
    
    
}

const postDoc = async function(req, res) {
    
    const body = req.body;

    if (!body) {
        return res.status(400).send({'status': 'error', 'message': 'Payload is required'});
    }

    console.log(body);

    const created_date = (new Date()).toISOString();

    console.log('created_date', created_date);
        
    const db = await AsyncDatabase.open('./server/db.sqlite');
    const query = `INSERT INTO requests (created_date, type, name, gender, date, time, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return db.run(query, [created_date, body.type, body.name, body.gender, body.date, body.time, body.price]).then((data) => {
        console.log('postDoc:', data);
        db.close();

        if (data) {
            return res.status(200).json({'status': 'ok', 'message': 'You document request has been recorded.', 'data': data});
        } else {
            return res.status(400).json({'status': 'error', 'message': 'Cannot created request', 'data': data});
        }
    }).catch((error) => {
        db.close();
        console.log('Error postDoc:', error);
        return res.status(500).json({status: 'error', message: error.toString()});
    });
    
    
    
}



module.exports = {users, getUser, getDocs, postDoc};