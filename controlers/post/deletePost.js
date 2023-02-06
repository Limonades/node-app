import PostModel from	'../../models/Post.js'

const deletePost = async (req, res) => {
	try {
		const postsId = req.params.id;

		PostModel.findOneAndDelete({
			_id: postsId,
		}, (err, doc) => {
			if (err) {
				console.log(err);

				return res.status(500).json({
					message: "Failed to delete post."
				})
			}

			if (!doc) {
				return res.status(404).json({
					message: "Post not found."
				})
			}

			res.json({
				success: true
			});
		})
	} catch(err) {
		console.log(err);

		res.status(500).json({
			message: "Failed to get posts."
		})
	}
}

export default deletePost;
