import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileBuffer) => {
  try {
    const blob = new Blob([fileBuffer], { type: "image/png" });
    const formData = new FormData();
    formData.append("file", blob, "file.png");
    formData.append("upload_preset", "Chat-vista");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.secure_url;
    } else {
      throw new Error(data.error.message || "Failed to upload to Cloudinary");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Upload to Cloudinary failed");
  }
};

const uploadAudioToCloudinary = async (audioBuffer) => {
  try {
    const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const formData = new FormData();
    formData.append("file", blob, "audio.mp3");
    formData.append("upload_preset", "Chat-vista");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.secure_url;
    } else {
      throw new Error(
        data.error.message || "Failed to upload audio to Cloudinary"
      );
    }
  } catch (error) {
    console.error("Error uploading audio to Cloudinary:", error);
    throw new Error("Upload to Cloudinary failed");
  }
};

export { uploadToCloudinary, uploadAudioToCloudinary };
