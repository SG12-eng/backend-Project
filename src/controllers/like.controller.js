import mongoose, {isValidObjectId} from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;

    if(!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid Video ID")
    }

    const userId = req.user._id;
    const Videolike = await Like.findOne({userId, videoId});

    if(Videolike) {
        await Videolike.remove();
        res.json(new ApiResponse(200, "Video like removed"));
    }else{
        await Like.create({userId, videoId});
        res.json(new ApiResponse(201, "Video Liked"))
    }
})

const toggleCommentLike = asyncHandler(async(req, res) => {
    const {commentId} = req.params;

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid Comment ID")
    }

    const userId = req.user._id;
    const commentLike = await Comment.findOne({userId, commentId});

    if(commentLike) {
        await commentLike.remove();
        res.json(new ApiResponse(200, "comment like removed"))
    } else {
        await Like.create({userId, commentId});
        res.json(new ApiResponse(201, "comment Liked"))
    }  
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet ID")
    }

    const userId = req.user._id;

    const tweetLike = await Like.findOne({userId, videoId});

    if(tweetLike) {
        await tweetLike.remove();
        res.json(new ApiResponse(200, "tweet like removed"));
    } else {
        await Like.create({userId, tweetId});
        res.json(new ApiResponse(201, "Tweet Liked"))
    }

})

const getLikedVideos = asyncHandler( async (req, res) => {
  
    const userId = req.user._id;

    const likes = await Like.find({ likedBy: userId, video: { $exists : true }});

    const videoIds = likes.map(like => like.video);

    res.json(new ApiResponse(200, videoIds))

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}