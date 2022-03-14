// Import modules
const moment = require('moment');
const ics = require('ics');


class Calendar {
    constructor(title = 'Evento sin nombre', desc = 'Evento sin descripción', loc = '') {
        this.title = title;
        this.desc = desc;
        this.loc = loc;
        this.dates = [];
    }

    getTitle() { return this.title; }
    getDesc() { return this.desc; }
    getPath() { return this.path; }


    setDates(newDates) {
        for(let i = 0; i < newDates.length; i++) {
            let date = moment(newDates[i]);

            this.dates.push({
                start: [parseInt(date.format('Y')), parseInt(date.format('M')), parseInt(date.format('D')), 10, 0],
                duration: { hours: 2 },

                title: this.title,
                description: this.desc,
                location: this.loc
            });
        }
    }


    getICS() {
        const { error, value } = ics.createEvents(this.dates);
        return value;
    }
}

module.exports = Calendar;