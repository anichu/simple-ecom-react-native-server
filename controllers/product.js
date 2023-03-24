const Product = require("../models/product");

// /api/product/ method/post/
exports.createProduct = async (req, res) => {
	const { name, price, image } = req.body;

	try {
		const product = await Product.create({
			name,
			price,
			image,
		});
		res.status(201).send(product);
	} catch (error) {
		res.send({
			message: error.message,
		});
	}
};
exports.products = async (req, res) => {
	try {
		const products = await Product.find({}).sort({ createdAt: -1 });

		res.send(products);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
