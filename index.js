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

const hsClient = axios.create({
    baseURL: 'https://api.hubspot.com/',
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${ process.env.HS_API_KEY }`,
        'Content-Type': 'application/json',
    },
});

// app.get('/', () => {
// });

app.get('/update-cobj', async (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
        error: req.query.error || false,
    });
});

app.post('/update-cobj', async (req, res) => {
    try {
        const resp = await hsClient.post(
            `crm/v3/objects/${ process.env.CUSTOM_OBJECT_ID }`,
            {
                properties: {
                    name: req.body.name,
                    age: req.body.age,
                    breed: req.body.breed,
                    gender: req.body.gender,
                }
            },
        );
        const data = resp.data;
    
        if (data?.id) {
            res.redirect('/');
        } else {
            throw new Error('Something went wrong');
        }
    }
    catch (e) {
        console.error(e);
        res.redirect(`/update-cobj?error=${ encodeURIComponent(e.response?.data?.message || e.message || 'Something went wrong') }`);
    }
});

// * Localhost
const port = process?.env?.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${ port }`));