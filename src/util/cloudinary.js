import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        //upload the file in clodinary
        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // file has uploaded on cloudinary
        console.log(
            "File has been uploaded on cloudinary : ",
            uploadResponse.url
        );

        return uploadResponse;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temp files as the upload process got failed
        return null;
    }
};

export { uploadOnCloudinary };
