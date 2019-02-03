const Query = {
	async users(parent, args, ctx, info) {
		const users = await ctx.db.query.users();
		return users
	},
	async invoices(parent, args, ctx, info) {
		const invoices = await ctx.db.query.invoices();
		return invoices
	},
	async quotes(parent, args, ctx, info) {
		const quotes = await ctx.db.query.quotes();
		return quotes
	},
	async vessels(parent, args, ctx, info) {
		const vessels = await ctx.db.query.vessels();
		return vessels
	},
	async courses(parent, args, ctx, info) {
		const courses = await ctx.db.query.courses();
		return courses
	},
};

module.exports = Query;
