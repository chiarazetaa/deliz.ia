const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@cluster0.n8sxzxw.mongodb.net/deliz_ia?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        return client.db('deliz_ia');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

// Export the connected database instance directly
module.exports = { database: connectDB };