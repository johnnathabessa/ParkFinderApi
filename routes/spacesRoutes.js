import express from "express";
import SpacesRepository from "../repositories/spacesRepository.js";
import SpacesController from "../controller/spacesController.js";

const router = express.Router();

router.get("/", SpacesController.getSpaces);
router.post("/", SpacesController.createSpace);
router.delete("/:id",SpacesController.deleteSpace);
router.put("/:id", SpacesController.updateSpace);
router.get("/:id", SpacesController.getSpacesById);

router.get('/:id/get-price', (req,res)=>{})
router.post('/:id/entry', (req,res)=>{})
router.post('/:id/exit', (req,res)=>{})


export default router;