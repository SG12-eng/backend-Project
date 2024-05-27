import mongoose, {isValidObjectId} from "mongoose";
import { Video } from "../models/video.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async(req, res)=>{
    const {page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    // get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async(req, res)=>{
    const {title, description} = req.body
    // get video, upload to Cloudinary, create video
})

const getVideoById = asyncHandler(async(req, res)=> {
    const { VideoId } = req.params
    // get Video by id
})

const updateVideo = asyncHandler(async(req, res) => { 
    const {VideoId} = req.params
})

const deleteVideo = asyncHandler(async(req, res) => {
    const {VideoId} = req.params
})

const togglePublishStatus = asyncHandler(async(req, res) =>{
    const {VideoId} = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}


