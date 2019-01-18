const Mutations = {
	async createInvoice(parent, args, ctx, info) {
		const invoice = await ctx.db.mutation.createInvoice({
			data: {
				...args
			}
		}, info);
		return invoice;
	},
	async createVessel(parent, args, ctx, info) {
		const vessel = await ctx.db.mutation.createVessel({
			data: {
				...args
			}
		}, info);
		return vessel;
	}
};

module.exports = Mutations;
