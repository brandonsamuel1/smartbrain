require('dotenv').config();
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '36b92d48bd9e4d8cb09d9a6cf10991b7'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to get API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall 
}