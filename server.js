const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'talha',
            email: 'talha@awol.com',
            password: bcrypt.hashSync("awoltech"),
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'ajanth',
            email: 'ajanth@awol.com',
            password: bcrypt.hashSync("ajanthtech"),
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    const {email, password} = req.body
    let found = false;

    for (user of database.users) {
        if(bcrypt.compareSync(password, user.password) && user.email === email){
            res.send(user);
            found = true;
        }
    }

    if(!found){
        res.status(400).json('The username and password combination is not valid');
    }
})

app.post('/signup', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        database.users.push({
            id: '125',
            name: name,
            email: email,
            password: hash,
            entries: 0,
            joined: new Date()
        })
        res.send(database.users)
    });
})

app.get('/profile/:userId', (req, res) => {
    const {userId} = req.params;
    for (user of database.users){
        if (user.id === userId){
            return res.json(user);
        }
    }
    res.status(400).json("User Not Found");
})

app.put('/image', (req, res) => {
    const {id} = req.body
    for (user of database.users){
        if (user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
    }
    res.status(400).json("User Not Found");
})

app.listen(3001, () => {
    console.log('server is running on port 3001');
})