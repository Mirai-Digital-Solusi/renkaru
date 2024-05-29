const myDate = new Date();
myDate.setDate(myDate.getDate() - 2);

let dateFrom = new Date(myDate.getTime() + myDate.getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 16);
let dateTo = new Date(myDate.getTime() + myDate.getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 16);

const UtilService = {
    dateFrom,
    dateTo,
}

export default UtilService;