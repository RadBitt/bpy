const Query = {
	async invoices(parent, args, ctx, info) {
		const invoices = await ctx.db.query.invoices();
		return invoices
	},
	async vessels(parent, args, ctx, info) {
		const vessels = await ctx.db.query.vessels();
		return vessels
	}
};

module.exports = Query;
