const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WishModel = require('./Models/Wish');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wishlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/wishes', (req, res) => {
    WishModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'Failed to fetch wishes' }));
});

app.put('/wish/update/:id', (req, res) => {
    const { id } = req.params;
    WishModel.findByIdAndUpdate(id, { fulfilled: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'Failed to update wish' }));
});

app.delete('/wish/delete/:id', (req, res) => {
    const { id } = req.params;
    WishModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'Failed to delete wish' }));
});

app.post('/wish/add', (req, res) => {
    const { wish } = req.body;
    WishModel.create({ wish })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: 'Failed to add wish' }));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
