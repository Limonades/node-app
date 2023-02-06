import PostModel from	'../../models/Post.js'

const getPost = async (req, res) => {
	try {
		const postsId = req.params.id;

		PostModel.findOneAndUpdate({
			_id: postsId,
		}, {
			$inc: { viewCount: 1},
		}, {
			returnDocument: 'after',
		}, (err, doc) => {
			if (err) {
				console.log(err);

				return res.status(500).json({
					message: "Failed to get post."
				})
			}

			if (!doc) {
				return res.status(404).json({
					message: "Post not found."
				})
			}

			res.json(doc);
		})
	} catch(err) {
		console.log(err);

		res.status(500).json({
			message: "Failed to get posts."
		})
	}
}

export default getPost;
