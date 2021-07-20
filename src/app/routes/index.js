const express = require('express');
const router = express.Router();
const Ctr = require('../controllers')
const Mid = require('../midleware')

// #swagger.start
router.post('/', Mid.urlCreator, Ctr.create)
router.get('/', Ctr.urlList)
router.get('/:urlId', Ctr.url)
router.put('/:urlId', Ctr.updateUrl)
router.delete('/:urlId', Ctr.deleteUrl)
router.get('/detail/:urlId', Ctr.detailOfUrl)
router.put('/custom/:urlId', Mid.customUrl, Ctr.customUrl)




router.param("urlId", Ctr.urlById)
module.exports = router;