const Mutations = {
	async createUser(parent, args, ctx, info) {
		const user = await ctx.db.mutation.createUser({
			data: {
				...args
			}
		}, info);
		return user;
	},
	async createInvoice(parent, args, ctx, info) {
		const invoice = await ctx.db.mutation.createInvoice({
			data: {
				...args
			}
		}, info);
		return invoice;
	},
	async createQuote(parent, args, ctx, info) {
		const quote = await ctx.db.mutation.createQuote({
			data: {
				...args
			}
		}, info);
		return quote;
	},
	async createVessel(parent, args, ctx, info) {
		const vessel = await ctx.db.mutation.createVessel({
			data: {
				...args
			}
		}, info);
		return vessel;
	},
	async createCourse(parent, args, ctx, info) {
		const course = await ctx.db.mutation.createCourse({
			data: {
				...args
			}
		}, info);
		return course;
	}
};

module.exports = Mutations;
