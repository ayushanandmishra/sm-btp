// import File from "../Models/File.js";
// import Person from "../Models/Person.js";
// import {
//   S3Client,
//   GetObjectCommand,
//   DeleteObjectCommand
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



 const Resource=require("../models/File.js");
 const { S3Client,
    GetObjectCommand,
    DeleteObjectCommand} = require("@aws-sdk/client-s3");

const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

 const getFile = async (req, res) => {

  const bucketName = process.env.BUCKET_NAME;
  const bucketRegion = process.env.BUCKET_REGION;
  const access_key = process.env.ACCESS_KEY;
  const secret_access_key = process.env.SECRET_ACCESS_KEY;

  const {subject,type}=req.params;
  console.log(type);
//   const user=await Person.findById(userId);


  const s3 = new S3Client({
    credentials: {
      accessKeyId: access_key,
      secretAccessKey: secret_access_key,
    },
    region: bucketRegion,
  });

  try {
    // const files = await File.find({});

    // const userFilesIds = user.userfilesId;
    const files = await Resource.find({ ResourceSubject: subject,ResourceType:type });
    console.log(files);
    const filesWithUrls = await Promise.all(files.map(async (file) => {
        const getObjectParams = {
          Bucket: bucketName,
          Key: file.ResourceName,
        };
  
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  
        // Create a new object with the additional fileurl property
        return {
          ...file.toObject(), // Convert Mongoose document to plain JavaScript object
          fileurl: url,
        };
      }));
    
    res.status(201).json(filesWithUrls);
  } catch (err) {
    console.log({ error_message: err.message });
  }
};

module.exports=getFile;

// export const deleteFile=async(req,res)=>{

//     const bucketName = process.env.BUCKET_NAME;
//     const bucketRegion = process.env.BUCKET_REGION;
//     const access_key = process.env.ACCESS_KEY;
//     const secret_access_key = process.env.SECRET_ACCESS_KEY;
  
//     const s3 = new S3Client({
//       credentials: {
//         accessKeyId: access_key,
//         secretAccessKey: secret_access_key,
//       },
//       region: bucketRegion,
//     });
    
//     try
//     {
//         const id = req.params.id;
//         const userId=req.params.userId;
//         const file=await File.findById(id);

//         if(!file)
//         {
//             res.status(404).send("File Not Found");
//             return;
//         }

//         if(file.fileOwnerId!=userId)
//         {
//           return res.status(401).send('YOU CANNOT DELETE A FILE YOU DONT OWN')
//         }

//         const sharedWithIds = file.sharedWithIds || [];

//         const personsToUpdate = await Person.find({ _id: { $in: sharedWithIds } });
       
//         for (const person of personsToUpdate) {

  
//           const updatedSharedFilesIds = person.sharedFilesIds.filter(fileId => fileId != id);
          
        
//           // Update the Person document
//           await Person.findByIdAndUpdate(person._id, {
//             $set: { sharedFilesIds: updatedSharedFilesIds },
//           });
//         }

//         await Person.findByIdAndUpdate(file.fileOwnerId, {
//           $pull: { userfilesId: id },
//         });

        

//         const params={
//             Bucket:bucketName,
//             Key:file.fileName
//         }

//         const command = new DeleteObjectCommand(params)
//         await s3.send(command);
//         await File.deleteOne({_id:id});
//         res.status(200).json({ message: 'File deleted successfully' });
//     }
//     catch(err)
//     {
//         console.log({message:err.message})
//     }

// }


