import mongoose, {isValidObjectId} from "mongoose";
import { User } from "../models/user.model.js";
import {Subscription} from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Playlist } from "../models/playlist.model.js";
import { Video } from "../models/video.model.js"


const createPlaylist = asyncHandler(async(req, res) => {
    const {name, description } = req.body
    const ownerId = req.user._id
   
    if(!name) {
        throw new ApiError(400, "Playlist Name is required")
    }
    
    const existingPlaylist = await Playlist.findOne({name, owner: ownerId});
    if(existingPlaylist) {
        throw new ApiError(400, " A Playlist with this name already exists for this user")
    }

    const newPlaylist = new Playlist({name, description, owner: ownerId})
    
    await newPlaylist.save()

    res.json(new ApiResponse(201, "Playlist Created", newPlaylist ))
    
    // create Playlist

})

const getUserPlaylists = asyncHandler(async(req, res) => {
    const {userId} = req.params
   
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Inavlid user ID")
    }

    const user = await User.findById(userId)
    if(!user){
        throw new ApiError(404, "User not found")
    }

    const userPlaylist = await Playlist.find({owner : userId})

    if(userPlaylist.length === 0) {
        return res.json(new ApiResponse(200, "No Playlist found for the user", []))
    }

    res.json( new ApiResponse(200, userPlaylist, "User Playlists showing successfully"))

})

const getPlaylistById = asyncHandler(async(req, res) => {
    const {playlistId} = req.params;

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Inavlid Playlist ID")
    }

    const playlist = await Playlist.findById(playlistId);

    if(!playlist){
        throw new ApiError(404, "Playlist Doesnot exists")
    }

    res.json(new ApiResponse(200, playlist, "Playlist found"  ))
    
})

const addVideoToPlaylist = asyncHandler(async(req, res) => {
    const {playlistId, videoId} = req.params;
    
    const idsToValidate = [playlistId, videoId];

    for(const id of idsToValidate) {
        if(!isValidObjectId(id)){
            throw new ApiError(400, `Invalid ID: ${id}`)
        }
    }

   const playlist =  await Playlist.findById(playlistId)
   if(!playlist){
    throw new ApiError(404, "Playlist does not exists")
   }

   await Playlist.findByIdAndUpdate(playlistId, {
    $push: { videos: videoId}
   })


   const updatedPlaylist = await Playlist.findById(playlistId).populate("vidoes")

   res.json(new ApiResponse(200, updatedPlaylist, "Video added to the playlist"))

})



const removeVideoFromPlaylist = asyncHandler(async(req, res) => {
    const {playlistId, videoId} = req.params
    // remove video from playlist
})

const deletePlaylist = asyncHandler(async(req, res) => {
    const {playlistId} = req.params
    // delete playlist
})

const updatePlaylist = asyncHandler(async(req, res) =>{
    const {playlistId} = req.params
    const {name, description} = req.body
    // update playlist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}

