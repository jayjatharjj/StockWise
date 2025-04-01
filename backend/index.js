const Express = require("express");
const Mongoclient = require("mongodb").MongoClient;
const cors = require('cors');

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://jayjatharjj:jayj12345@cluster0.lraqrdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "stockwisedb";
let database;

console.log("Starting server...");

app.listen(5073, async (err) => {
    if (err) {
        console.error("Failed to start server:", err);
        return;
    }

    console.log("Server is running on port 5073");

    try {
        const client = await Mongoclient.connect(CONNECTION_STRING);
        database = client.db(DATABASE_NAME);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
});

app.use(Express.json());

app.post('/api/products', async (req, res) => {
    try {
        const products = req.body;
        const replace = req.query.replace === 'true';
        const collection = database.collection('products');

        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Expected array of products' });
        }

        let result;
        if (replace) {
            const deleteResult = await collection.deleteMany({});
            result = await collection.insertMany(products);
            res.status(201).json({
                message: `Replaced ${deleteResult.deletedCount} products with ${result.insertedCount} new ones`,
                deletedCount: deleteResult.deletedCount,
                insertedCount: result.insertedCount
            });
        } else {
            result = await collection.insertMany(products);
            res.status(201).json({
                message: `${result.insertedCount} products created successfully`,
                insertedIds: result.insertedIds
            });
        }

    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({ error: 'Failed to create products' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const collection = database.collection('products');
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

const { ObjectId } = require('mongodb');

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No update data provided' });
        }

        const collection = database.collection('products');
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            message: 'Product updated successfully',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});