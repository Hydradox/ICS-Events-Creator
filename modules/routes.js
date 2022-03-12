// Import modules
import Calendar from './ics.js';

import { join } from 'path';
import { unlinkSync } from 'fs';

import multer from 'multer';

const upload = multer();


export default function(app) {

    app.post('/api/data', upload.none(), (req, res) => {
        let cal = new Calendar(req.body.evName, req.body.evDes, req.body.evLoc);
        cal.setDates(JSON.parse(req.body.dates))

        res.download(cal.getPath(), function(err) {
            if(err) throw err;
            return unlinkSync(cal.getPath());
        });
    });


    app.get('*', (req, res) => {
        res.sendFile(join(app.get('public'), '/index.html'));
    })
}