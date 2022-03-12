/**
 * @module ics.js
 */


// Import modules
import { appendFileSync } from 'fs'
import { join } from 'path';

import moment from 'moment';
import ics from 'ics';
import { v4 } from 'uuid';
import chalk from 'chalk';

// Init const Chalk
const icsTitle = chalk.bold.blue;
const icsSubtitle = chalk.bold.bgBlue;


// Init package variables



class Calendar {
    constructor(title = 'Evento sin nombre', desc = 'Evento sin descripción') {
        this.cal = ics;
        this.title = title;
        this.desc = desc;
        this.path = join(process.cwd(), '/ics/', v4() + '.ics');
    }

    getTitle() { return this.title; }
    getDesc() { return this.desc; }
    getPath() { return this.path; }


    setDates(dates) {
        for(let i = 0; i < dates.length; i++) {
            let date = moment(dates[i]);

            this.cal.createEvent({
                start: [parseInt(date.format('Y')), parseInt(date.format('M')), parseInt(date.format('D')), 1, 0],
                duration: { hours: 22 },

                title: this.title,
                description: this.desc
            },
            (err, val) => {
                appendFileSync(this.path, val, (writeErr) => {
                    console.log('ERR::', writeErr)
                });
            });
        }
    }
}

export default Calendar;