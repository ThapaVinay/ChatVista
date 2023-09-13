
import { Router } from "express";
import { addImageMessage, addAudioMessage, addMessage, getMessages } from "../controllers/MessageController.js";
import multer from "multer";

const router = new Router();

const uploadAudio = multer({dest: "uploads/recordings"});
const uploadImage = multer({dest:"uploads/images"});

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage );
router.post("/add-audio-message", uploadAudio.single("audio"), addAudioMessage );

export default router;