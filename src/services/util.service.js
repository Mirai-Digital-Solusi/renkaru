const myDate = new Date();
myDate.setDate(myDate.getDate() - 2);

let dateFrom = myDate.toJSON().slice(0, 10);
let dateTo = new Date().toJSON().slice(0, 10);

const UtilService = {
    dateFrom,
    dateTo,
}

export default UtilService;