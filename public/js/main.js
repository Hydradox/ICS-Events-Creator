// UI Elements
let daySelector = $('#day-list li');
let main = $('main');

// Init vars
let ts = moment();
const monthCount = 12;
const dayEq = 86400000;




// Set default params
$('#daysBetweenEvents').val(1);
$('#startDate').val(moment().format('YYYY-MM-DD'));
$('#endDate').val(moment().add(1, 'Y').format('YYYY-MM-DD'));













/**
 * GENERAR
 * CALENDARIO
 */
/* Generar calendario */
drawCalendar();
function drawCalendar() {
    main.html('');

    for(let i = 0; i < monthCount; i++) {
        main.append(getMonth(ts));
    }
}

/* Constructores de UI */
// Contruir mes
function getMonth(date) {
    date.startOf('month');

    // Init vars
    let dayOfWeek = getNumInWeek(date);
    let weeks = weeksOfMonth(date);
    let startMonth = date.format('MM');

    let month = $('<table class="month"></table>');
    let body = $('<tbody></tbody>');

    let tr;
    let td;


    // Append month name and thead
    month.append(`<caption>${ translateMonth(date.format('MMM')) }</caption>`)
    month.append(`<thead><tr><th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th></tr></thead>`);


    // Semanas - Filas de tabla
    for(let i = 0; i < weeks; i++) {
        tr = $('<tr></tr>');

        if(i == 0) {
            date.subtract(dayOfWeek - 1, 'd');
        }

        // Días - Celdas de tabla
        for(let j = 0; j < 7; j++) {
            if(startMonth != date.format('MM')) {
                td = $('<td><div></div></td>');
            } else {
                td = $('<td><div data-date="' + date.format('YYYY-MM-DD') + '" data-day="' + (j + 1) + '">' + date.format('D') + '</div></td>');
            }

            date.add(1, 'd');
            tr.append(td);
        }
        body.append(tr);
    }
    month.append(body)

    return month;
}








/**
 * MARCAR
 * FECHAS
 */
markDates();
function markDates() {
    let diasSeleccion = $('#day-list li.active');


    // Reset marks
    $('.month tbody tr td div.selected').removeClass('selected');


    for(let i = 0; i < diasSeleccion.length; i++) {
        $('.month tbody tr td div[data-day="' + $(diasSeleccion[i]).data('day') + '"]').addClass('selected')
    }
}












/**
 * EVENT
 * LISTENERS
 */
/* Day selector listener */
daySelector.on('click', function(e) {
    $(e.target).toggleClass('active');
    markDates();
});

let shifting = false;
$(document).on('keyup keydown', function(e){shifting = e.shiftKey} );


$('.month tbody tr td div').on('click', function(e) {
    
    if(shifting) {
        $(e.target).toggleClass('unselectable');
    } else {
        $(e.target).toggleClass('selected');
    }
})


















function getNumInWeek(date) {
    switch(date.clone().format('ddd')) {
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


function weeksOfMonth(date) {
    let weeks = 1;
    let day = getNumInWeek(date.clone().startOf('month'));
    let days = parseInt(date.clone().endOf('month').format('D'));


    for(let i = 0; i < days; i++) {

        if(day == 7) {
            day = 1;
        } else {
            if(day == 1 && i != 0) {
                weeks++;
            }
            day++;
        }
    }

    return weeks;
}


function translateMonth(month) {
    switch(month) {
        case 'Jan': return 'Enero';
        case 'Feb': return 'Febrero';
        case 'Mar': return 'Marzo';
        case 'Apr': return 'Abril';
        case 'May': return 'Mayo';
        case 'Jun': return 'Junio';
        case 'Jul': return 'Julio';
        case 'Aug': return 'Agosto';
        case 'Sep': return 'Septiembre';
        case 'Oct': return 'Octubre';
        case 'Nov': return 'Noviembre';
        case 'Dec': return 'Diciembre';
    }
}