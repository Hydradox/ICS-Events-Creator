/* Submit data */
async function submitData(data) {
    const res = await window.calendarAPI.createCalendar(data)
    createDownload(res);
}