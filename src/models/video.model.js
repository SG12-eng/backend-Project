import mongoose, {Schema, mongo} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const videoSchema = new Schema(
{
    videoFile: {
        type: String, //cloudnary 
        required: true,
    }, 
    thumbnail : {
        type: String, //cloudnary 
        required: true,
    },
    title : {
        type: String, 
        required: true,
    },
    description : {
        type: String, 
        required: true,
    },
    time : {
        type: Number, //cloudnary 
        required: true,
    }, 
    views:{
        type: Number,
        deafult: 0
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)