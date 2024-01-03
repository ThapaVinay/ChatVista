import { Router } from "express";
import {
  addImageMessage,
  addAudioMessage,
  addMessage,
  getMessages,
  getInitialContactsWithMessages,
} from "../controllers/MessageController.js";
import multer from "multer";

const router = new Router();

const storage = multer.memoryStorage();

const uploadAudio = multer({ storage: storage });
const uploadImage = multer({ storage: storage });

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", uploadAudio.single("audio"), addAudioMessage);
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages);

export default router;
