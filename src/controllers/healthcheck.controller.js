import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const healthcheck = asyncHandler(async(req, res)=>{
    // build a healthcheck response that simply returns the Ok status as json with a message

})

export {
    healthcheck
}
