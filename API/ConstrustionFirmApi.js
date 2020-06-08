const router = require('express').Router();
const { Material } = require('../models/Material');
router.post('/add', (req, res) => {
    const materialData = {
        materialCode: req.body.materialCode,
        materialName: req.body.materialUnitPrice,
        materialStockLevel: req.body.materialStockLevel
    }
    console.log(materialData)
    Material.findOne({ materialCode: materialData.materialCode }).then(result => {
        if (result) {
            return res.json({ message: `${materialCode} error` })
        }
        Material.create(materialData).then(newRecord => {
                return res.json(newRecord);
            })
            .catch(error => {
                return res.json({ message: `Error : ${error.message}` })
            })
    })
});

router.put('/update/:materialCode', (req, res) => {
    res.send("Material")

});

router.delete('/delete/:materialCode', (req, res) => {
    res.send("Material")
});

module.exports = router;