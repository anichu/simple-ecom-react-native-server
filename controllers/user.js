const User = require("../models/user");

// /api/user/ method/post/
exports.registerUser = async (req, res) => {
	const { username, email, password, status, role, image } = req.body;

	try {
		const existUser = await User.findOne({ email });
		if (existUser) {
			return res.status(401).send({
				message: "User already exist",
			});
		}

		const user = await User.create({
			username,
			email,
			password,
			status,
			role,
			image,
		});

		if (user) {
			return res.status(201).json({
				_id: user._id,
				name: user.username,
				email: user.email,
				image: user?.image,
				role: user?.role,
				status: user?.status,
			});
		} else {
			res.status(400);
			return res.send({
				message: "User not found",
			});
		}
	} catch (error) {
		res.send({
			message: error.message,
		});
	}
};

exports.authUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).send({
				message: "User not Found",
			});
		}
		const match = await user.matchPassword(password);
		if (user && match) {
			return res.json({
				_id: user._id,
				name: user.username,
				email: user.email,
				image: user?.image,
				role: user?.role,
				status: user?.status,
			});
		} else {
			res.status(401).send({
				message: "Invalid email or password",
			});
		}
	} catch (err) {
		res.status(403).send({
			message: err.message,
		});
	}
};

exports.users = async (req, res) => {
	try {
		const users = await User.find({})
			.sort({ createdAt: -1 })
			.select("-password");
		res.send(users);
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
};
