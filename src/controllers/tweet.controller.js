import mongoose, {isValidObjectId} from "mongoose";
import { User } from "../models/user.model.js";
import {Tweet} from "../models/tweet.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async(req, res) => {
    const {content} = req.body
    const owner = req.user._id

    const user = await User.findById(owner);
    if(!user){
        throw new ApiError(404, "Owner not found")
    }
    
    const tweet = new Tweet({content, owner});
    await tweet.save()

    res.json(new ApiResponse(201, tweet,  "Tweet created"))

})

const getUserTweets = asyncHandler(async(req, res) =>{
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found")
    }

    const tweets = await Tweet.find({ owner : userId });

    res.json(new ApiResponse(200, tweets, "User tweets"))
})

const updateTweet = asyncHandler(async(req, res)=> {
    const { tweetId } = req.params;
    const {content} = req.body;
    const userId = req.user_id;
    
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid  Tweet Id")
    }

    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
        throw new ApiError(404, "Tweet not found")
    }

    // check if tweet belongs to the current user
    if(tweet.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You donot have permission to update this tweet")
    }

    // update tweet content
    tweet.content = content;
    await tweet.save()

    res.json(new ApiResponse(200, tweet , "Tweet Updated"))
})

const deleteTweet = asyncHandler(async(req, res) => {
    const { tweetId } = req.params;
    
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet Id");
    }

    const tweet = await Tweet.findById(tweetId);
    if(!tweet){
        throw new ApiError(404, "Tweet not found")
    }

    await tweet.remove();
    res.json(new ApiResponse(200, "Tweet deleted"))

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}