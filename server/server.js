require("dotenv").config();
const express = require("express");
const app = express();
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer=require("multer");
const Resource=require("./models/File.js")
const getFile=require("./controllers/getFileController.js");

const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static("public"));


app.use("/", require("./routes/root"));

app.get("/test", (req, res) => {
  res.json({ message: "Hello from the test route!" });
});


//AWS STUFF


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const access_key = process.env.ACCESS_KEY;
const secret_access_key = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_access_key
  },
  region: bucketRegion
})

const random = Date.now();
app.post("/api/posts", upload.array('images', 20), async (req, res) => {

  try {
    const uploadedFiles = req.files;

    for (const uploadedFile of uploadedFiles) {
      const buffer = uploadedFile.buffer;
      // const typeInfo = await fileTypeFromBuffer(buffer);

      const resource = new Resource({
        ResourceName: `${uploadedFile.originalname.split('.')[0]}_${random}.${uploadedFile.originalname.split('.')[1]}`,
        ResourceType: req.body.type,
        ResourceOwner: req.body.username,
        ResourceOwnerId: req.body.id,
        ResourceOwnerEmail: req.body.email || "",
        ResourceSize: uploadedFile.size,
        ResourceSubject:req.body.subject
      });

      const savedFile = await resource.save();

      // await Person.findOneAndUpdate(
      //   { _id: req.body.id },
      //   { $push: { userfilesId: savedFile._id } },
      //   { new: true }
      // );

      const params = {
        Bucket: bucketName,
        Key: `${uploadedFile.originalname.split('.')[0]}_${random}.${uploadedFile.originalname.split('.')[1]}`,
        Body: uploadedFile.buffer,
        ContentType: uploadedFile.mimetype
      };
      const uploadCommand = new PutObjectCommand(params);
      

      await s3.send(uploadCommand);

      console.log(`File ${uploadedFile.originalname} uploaded successfully.`);
    }

    res.send({});
  }
  catch (err) {
    console.log("error :" + err.message);
  }
});

app.get("/getFile/:subject/:type",getFile);
//END

app.use("/auth", require("./routes/authRoutes"));
app.use("/paper", require("./routes/paperRoutes"));
app.use("/notes", require("./routes/notesRoutes"));
app.use("/internal", require("./routes/internalRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/time_schedule", require("./routes/timeScheduleRoutes"));
app.use("/staff", require("./routes/staffRoutes"));
app.use("/student", require("./routes/studentRoutes"));


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found", details: "No paths found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

mongoose.connection.on("uncaughtException", function (err) {
  console.log(err);
});
