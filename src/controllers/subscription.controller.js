import mongoose, {isValidObjectId} from "mongoose";
import { User } from "../models/user.model.js";
import {Subscription} from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const  toggleSubscription = asyncHandler( async(req, res) => {
    const {channelId} = req.params
    // toggle subscription
    const subscriberId = req.user._id;

    if(!isValidObjectId(channelId)) {
        throw new ApiError(400, "Inavlid Channel Id")
    }

    const channel = await User.findById(channelId);
    if(!channel) {
        throw new ApiError(404, "channel not found")
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId, subscriber: subscriberId
    })

    if(existingSubscription) {
        await Subscription.deleteOne({_id: existingSubscription._id})
    } else{
        const newSubscription = new Subscription({ channel: channelId, subscriber: subscriberId});
        await newSubscription.save();
        return res.json(new ApiResponse(201, "Subscribed successfully"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async(req, res) => {
    const {channelId} = req.params;

    if(!isValidObjectId(channelId)) {
        throw new ApiError(400, "invalid Channel id")
    }

   const channel = await User.findById(channelId)
   if(!channel){
    throw new ApiError(404, "Channel doesnot exist")
   }

   const subscriberList =  await Subscription.find({channel: channelId}).populate("subscriber", "fullname")

   const subscribers = subscriberList.map(subscription => subscription.subscriber)

   res.json(new ApiResponse(200, subscribers , "Total subscribers"))

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler( async(req, res) => {
    const { subscriberId } = req.params;

    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400, "Inavlid subscriber Id")
    }

    const subscriber = await User.findById(subscriberId);
    if(!subscriber) {
        throw new ApiError(404, "subscriber not found")
    }

    const channels = await Subscription.find({subscriber : subscriberId}).populate("channel","username")

    const channelsSubscribed = channels.map(subscription => subscription.channel);

    res.json(new ApiResponse(200, "Subscribed Channels", channelsSubscribed))

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}



