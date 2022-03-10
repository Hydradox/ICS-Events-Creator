// UI Elements
let daySelector = $('#day-list li');
let main = $('main');

// Init vars
let ts = new Date();



/* Day selector listener */
daySelector.on('click', function(e) {
    $(e.target).toggleClass('active');
});






/* Generar calendario */


















/* Constructores de UI */
// Contruir mes
function getMonth() {
    let uiMonth;


    uiMonth =
    `<div class="month>"

    </div>`


    return uiMonth;
}