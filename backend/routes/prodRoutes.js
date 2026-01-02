const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload.js");

router.get("/testProd", (req, res) => {
    res.send("Prod Working");
});



const {
    getAllProd,
    getProdById,
    createProd,
    updateProd,
    deleteProd,
} = require("../controllers/prodControllers.js");

router.get('/', getAllProd);
router.get('/:id', getProdById);
router.post('/', upload.single("image"), createProd);
router.put('/:id', upload.single("image"), updateProd);
router.delete('/:id', deleteProd);
module.exports = router;
