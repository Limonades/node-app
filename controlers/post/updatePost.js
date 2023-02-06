import PostModel from	'../../models/Post.js'

const updatePost = async (req, res) => {
	try {
		const postsId = req.params.id;

		await PostModel.updateOne({
			_id: postsId,
		}, {
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId,
		})

		res.json({
			success: true
		});
	} catch(err) {
		console.log(err);

		res.status(500).json({
			message: "Failed to update post."
		})
	}
}

export default updatePost;
