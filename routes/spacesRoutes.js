import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    //Pagar Vagas
    res.send('GET /spaces');
    
})

router.post("/", (req, res) => {
    //Adicionar Vaga
    res.send('Post /spaces')
})
router.delete("/:id", (req, res) => {
    //Remover Vaga
    res.send('Delete /spaces/:id')
})

export default router;