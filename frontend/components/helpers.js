import moment from 'moment';

export default function getMDR(year, month) {

    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = moment([year, month]);

    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month');

    // just for demonstration:
    console.log(startDate.toDate());
    console.log(endDate.toDate());

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate.date(), end: endDate.date() };
}