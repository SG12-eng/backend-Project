import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page:  parseInt(page, 10),
    limit: parseInt(limit, 10),
  }

  const aggregate = Comment.aggregate([
    { $match : {video: mongoose.Types.ObjectId(videoId)}},
    { $sort: {createdAt: -1}},
  ])

  const comments = await Comment.aggregatePaginate(aggregate, options);

  res.json(new ApiResponse(200, "Comments retrieved", comments))

});

const addComment = asyncHandler(async (req, res) => {
    //add a comment to a video
    const {videoId} = req.params;

    const {content, ownerId } = req.body;

    const addComment = new Comment({content, video: videoId, owner: ownerId});

    await addComment.save();

    res.json(new ApiResponse(201, addComment, "Comment added"))

})

const updateComment = asyncHandler(async(req, res) => {
    // update a comment
    const {commentId} = req.params;

    const {content} = req.body;

    const comment = await Comment.findById(commentId);
    if(!comment) {
      throw new ApiError(404, "comment not found")
    }

    comment.content  = content;
    await content.save();

    res.json(new ApiResponse(200, comment, "Comment Updated"))

})

const deleteComment = asyncHandler(async(req, res) => {
  const {commentId} = req.params;
  const {content} = req.body;

  const comment = await Comment.findBy
  if(!comment) {
    throw new ApiError(404, "comment not found")
  }

  comment.content = content;
  await content.remove()

  res.json(new ApiResponse(200, "Comment deleted"))
  
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}