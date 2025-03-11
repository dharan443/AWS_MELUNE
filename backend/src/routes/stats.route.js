import {Router} from "express";

const router = Router();

router.get("/", (req,res) => {
    res.send("Stats Router get route")
})

export default router;