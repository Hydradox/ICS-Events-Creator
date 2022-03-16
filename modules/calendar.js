// Import modules
const moment = require('moment');
const ics = require('ics');


class Calendar {
    constructor(name = 'Evento sin nombre', desc = 'Evento sin descripción', loc = '') {
        this.name = name;
        this.desc = desc;
        this.loc = loc;
        this.dates = [];
    }

    getTitle() { return this.name; }
    getDesc() { return this.desc; }
    getPath() { return this.path; }


    setDates(newDates) {
        for(let i = 0; i < newDates.length; i++) {
            let date = moment(newDates[i]);

            this.dates.push({
                start: [parseInt(date.format('Y')), parseInt(date.format('M')), parseInt(date.format('D')), 10, 0],
                duration: { hours: 2 },

                title: this.name,
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