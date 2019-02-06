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
		const { user, vessel } = ctx.request.body.variables;
		const invoice = await ctx.db.mutation.createInvoice({
			data: {
				user: {
					connect: {
						id: user
					},
				},
				vessel: {
					connect: {
						id: vessel
					},
				},
				...args
			}
		}, info);
		console.log(invoice);
		return invoice;
	},
	async createQuote(parent, args, ctx, info) {
		const { vessel } = ctx.request.body.variables;
		const quote = await ctx.db.mutation.createQuote({
			data: {
				vessel: {
					connect: {
						id: vessel
					},
				},
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
