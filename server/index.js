const express = require('express');

const app = express();
const port = 5000;

const user = require('./user.json');

const cors = require('cors');
app.use(cors());


app.use(express.json());

app.get('/', (req, res) => {
    res.json(user);
}); 

app.post('/user', (req, res) => {
    console.log(req.body); 
    const name = req.body.name;
    const id = req.body.id;
    if (!name || !id) {
        return res.status(400).json({ error: 'Name and ID are required' });
    }
    res.json({ message: `Name: ${name}, ID: ${id}` });
});

app.post('/adduser', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    if (!id || !name) {
        return res.status(400).json({ error: 'ID and Name are required' });
    }
    user.push({ id, name });
    res.json({message: 'User added successfully', user: { id, name } });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});