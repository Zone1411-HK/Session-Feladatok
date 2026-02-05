const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/mentes', async (request, response) => {
    try {
        const { adat } = request.body;
        request.session.adat = adat;
        console.log(adat);
        response.status(200).json({ success: 'Siker' });
    } catch (error) {
        console.log(error);
    }
});

router.get('/lekerd', async (request, response) => {
    if (!request.session.adat) {
        response.status(500).json({
            success: false
        });
    } else {
        console.log(request.session.adat);
        response.status(200).json({
            success: true,
            adat: request.session.adat
        });
    }
});

router.post('/visits', async (request, response) => {
    try {
        if (request.session.visits) {
            request.session.visits = request.session.visits + 1;
        } else {
            request.session.visits = 1;
        }
        response.status(200).json({
            success: 'Siker',
            visits: request.session.visits
        });
        //console.log(request.session.visits);
    } catch (error) {
        console.error(error);
    }
});

router.get('/visits', async (request, response) => {
    try {
        if (!request.session.visits) {
            response.status(200).json({
                success: 'Sikertelen'
            });
        } else {
            response.status(200).json({
                success: 'Siker',
                visits: request.session.visits
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/color', async (request, response) => {
    try {
        const { color } = request.body;
        request.session.color = color;
        response.status(200).json({
            success: 'Siker',
            color: color
        });
    } catch (error) {
        response.status(500).json({
            success: 'Sikertelen'
        });
    }
});

router.get('/color', async (request, response) => {
    try {
        const color = request.session.color;
        request.session.color = color;
        console.log(request.session.color);
        response.status(200).json({
            success: 'Siker',
            color: color
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            success: 'Sikertelen'
        });
    }
});

router.post('/kedvenc/mentes', async (request, response) => {
    try {
        const { gyumolcsok } = request.body;

        request.session.adat = gyumolcsok;
        console.log(request.session.adat);
        response.status(200).json({
            success: 'Siker',
            adat: request.session.adat
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/kedvenc/lekeres', async (request, response) => {
    try {
        if (!request.session.adat) {
            response.status(200).json({
                success: 'Siker',
                adat: 'HAHAHAH NINCS KEDVENC GYÜMÖLCSÖD XDDDDDD'
            });
        } else {
            response.status(200).json({
                success: 'Siker',
                adat: request.session.adat
            });
        }
    } catch (error) {
        console.error(error);
    }
});
router.post('/kedvenc/torles', async (request, response) => {
    try {
        if (!request.session.adat) {
            response.status(200).json({
                success: 'NINCS MIT KITÖRÖLNI HE',
                adat: 'HAHAHAH NINCS KEDVENC GYÜMÖLCSÖD XDDDDDD'
            });
        } else {
            request.session.destroy((error) => {
                if (error) {
                    response.status(500).send('GATYA');
                } else {
                    response.status(200).json({
                        success: 'Siker'
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});
module.exports = router;
