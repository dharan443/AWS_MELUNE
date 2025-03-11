import { Router } from "express";
import { getAllAIMessages } from "../controller/ai.controller.js";
// import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/chat/:userId", getAllAIMessages);

export default router;