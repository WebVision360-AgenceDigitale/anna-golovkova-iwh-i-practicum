require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.HS_API_KEY) {
    throw new Error('HS_API_KEY environment variable should be set');
}

if (!process.env.CUSTOM_OBJECT_ID) {
    throw new Error('CUSTOM_OBJECT_ID environment variable should be set');
}

// app.get('/', () => {
// });

app.get('/update-cobj', async (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
    });
});

// app.post('/update-cobj', () => {
// });

// * Localhost
const port = process?.env?.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${ port }`));