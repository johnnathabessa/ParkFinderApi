import SpacesRepository from "../repositories/spacesRepository.js";

const SpacesController ={
    async getSpaces(req, res) {
        const spaces = await SpacesRepository.getSpaces();
        res.send(spaces);
    },
    async getSpacesById(req, res) {
        const id = req.params.id;
        const space = await SpacesRepository.getSpaceById(id);
        res.send(space);
    },
    async createSpace(req, res) {
        const space = req.body;
        const newSpace = await SpacesRepository.createSpace(space);
        res.send(newSpace);
    },
    async updateSpace(req, res) {
        const id = req.params.id;
        const space = req.body;
        const updatedSpace = await SpacesRepository.updateSpace(id, space);
        res.send(updatedSpace);
    },
    async deleteSpace(req, res) {
        const id = req.params.id;
        const deletedSpace = await SpacesRepository.deleteSpace(id);
        res.send(deletedSpace);
    }
}

export default SpacesController;