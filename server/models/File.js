
const mongoose=require("mongoose");

const ResourceSchema=mongoose.Schema(
    {
        ResourceName:String,
        ResourceType:String,
        ResourceOwner:String,
        ResourceOwnerId:String,
        ResourceOwnerEmail:String,
        ResourceSubject:String,
        ResourceSize:Number,
    }
)

const Resource=mongoose.model("Resource",ResourceSchema);
module.exports=Resource;