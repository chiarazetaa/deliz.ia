const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { database } = require('./db');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.static("../frontend"));

// parse requests of content-type - application/json
app.use(express.json());
app.use(databaseMiddleware);

app.listen(port, () => {
    console.log('Server is running at http://localhost:' + port);
});

async function databaseMiddleware(req, res, next) {
    try {
        if (!req.db) {
            req.db = await database();
        }
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).send({ error: 'Database connection failed' });
    }
}

// get items list
app.get('/api/items', async function (req: any, res: any) {
    try {
        let items = await req.db.collection('items').find({}).toArray();
        res.send(items);
    } catch (err) {
        res.send({ error: 'Failed to fetch items' });
    }
});

// get item by id
app.get('/api/items/:id', async function (req: any, res: any) {
    try {
        let item = await req.db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
        res.send({ item: item });
    } catch (err) {
        res.send({ error: 'Failed to fetch the item' });
    }
});

// create a new item
app.post('/api/items', async function (req: any, res: any) {
    try {
        let newItem = req.body;
        newItem._id = new ObjectId();
        await req.db.collection('items').insertOne(newItem);
        let items = await req.db.collection('items').find({}).toArray();
        res.send(items);
    } catch (err) {
        res.send({ error: 'Failed to create the item' });
    }
});

// delete item by id
app.delete('/api/items/:id', async function (req: any, res: any) {
    try {
        await req.db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
        let items = await req.db.collection('items').find({}).toArray();
        res.send(items);
    } catch (err) {
        res.send({ error: 'Failed to delete the item' });
    }
});

// update an item
app.put('/api/items/:id', async function (req: any, res: any) {
    try {
        let updatedItem = req.body;
        delete updatedItem._id;
        await req.db.collection('items').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedItem });
        let items = await req.db.collection('items').find({}).toArray();
        res.send(items);
    } catch (err) {
        res.send({ error: 'Failed to update the item' });
    }
});
