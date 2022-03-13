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
const icsTitle = chalk.bold.bgPurple;


class Calendar {
    constructor(title = 'Evento sin nombre', desc = 'Evento sin descripción', loc = '') {
        this.title = title;
        this.desc = desc;
        this.loc = loc;
        this.path = join(process.cwd(), '/ics/', v4() + '.ics');
    }

    getTitle() { return this.title; }
    getDesc() { return this.desc; }
    getPath() { return this.path; }


    setDates(dates) {
        let events = [];

        console.log('Sumando fechas...');

        for(let i = 0; i < dates.length; i++) {
            let date = moment(dates[i]);

            events.push({
                start: [parseInt(date.format('Y')), parseInt(date.format('M')), parseInt(date.format('D')), 10, 0],
                duration: { hours: 2 },

                title: this.title,
                description: this.desc,
                location: this.loc
            });
        }

        console.log('Archivo creado');


        const { error, value } = ics.createEvents(events);

        appendFileSync(this.path, value, (writeErr) => {
            console.log('ERR::', writeErr)
        });
    }
}

export default Calendar;