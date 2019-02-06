const { forwardTo } = require('prisma-binding');

const Query = {
	users: forwardTo('db'),
	user: forwardTo('db'),
	invoices: forwardTo('db'),
	invoice: forwardTo('db'),
	quote: forwardTo('db'),
	quotes: forwardTo('db'),
	vessels: forwardTo('db'),
	vessel: forwardTo('db'),
	courses: forwardTo('db'),
	course: forwardTo('db'),
};

module.exports = Query;
