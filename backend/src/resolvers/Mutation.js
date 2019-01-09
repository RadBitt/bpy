const Mutations = {
	async createInvoice(parent, args, ctx, info) {
		const invoice = await ctx.db.mutation.createInvoice({
			data: {
				...args
			}
		}, info);
		return invoice;
	}
	// createDog(parent, args, ctx, info) {
	// 	global.dogs = global.dogs || [];

	// 	const newDog = {name: args.name};
	// 	global.dogs.push(newDog);
	// 	return newDog;
	// }
};

module.exports = Mutations;
