// UI Elements
let daySelector = $('#day-list li');
let main = $('main');

// Init vars
let ts = moment();
const monthCount = 12;
const dayEq = 86400000;



/* Day selector listener */
daySelector.on('click', function(e) {
    $(e.target).toggleClass('active');
});






/* Generar calendario */
drawCalendar();
function drawCalendar() {
    main.html('');

    for(let i = 0; i < 12; i++) {
        main.append(getMonth(ts));
        ts.add(1, 'M')
    }
}



/* Constructores de UI */
// Contruir mes
function getMonth(monthDate) {
    let dayOfWeek = getNumInWeek(monthDate.startOf('month'));
    let weeks = countWeeksOfMonth(monthDate);

    let month = $('<table class="month"></table>');
    let body = $('<tboby></tboby>');

    let tr;
    let td;


    // Append month name and thead
    month.append(`<caption>${ monthDate.format('MMMM') }</caption>`)
    month.append(`<thead><tr><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr></thead>`);


    // 
    for(let i = 0; i < weeks; i++) {
        tr = $('<tr></tr>');

        for(let j = 0; j < 7 && dayOfWeek <= 7; j++) {
            td = $('<td></td>');



            monthDate.add(1, 'D');
            dayOfWeek = getNumInWeek(monthDate);

            tr.append(td);
        }
        body.append(tr);
    }
    

    return month;
}








function getNumInWeek(date) {
    console.log('Starts with', date.format('ddd'))
    switch(date.format('ddd')) {
        case 'Mon': return 1;
        case 'Tue': return 2;
        case 'Wed': return 3;
        case 'Thu': return 4;
        case 'Fri': return 5;
        case 'Sat': return 6;
        case 'Sun': return 7;
        default: return 0;
    }
}


function countWeeksOfMonth(date) {
    let weeks = 1;
    let day = getNumInWeek(date.startOf('month'));
    let days = parseInt(date.endOf('month').format('D'));


    for(let i = 0; i < days; i++) {
        console.log('Day::', day)

        if(day == 7) {
            day = 1;
        } else {
            if(day == 1) {
                weeks++;
            }
            day++;
        }
    }

    return weeks;
}