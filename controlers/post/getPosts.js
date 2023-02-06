import PostModel from	'../../models/Post.js'

const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec();

		res.json(posts);
	} catch(err) {
		console.log(err);

		res.status(500).json({
			message: "Failed to get posts."
		})
	}
}

export default getPosts;
