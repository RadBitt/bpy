const Query = {
	async invoices(parent, args, ctx, info) {
		const invoices = await ctx.db.query.invoices();
		return invoices
	}
};

module.exports = Query;
