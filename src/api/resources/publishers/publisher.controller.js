const router = require('express').Router();
const publisherService = require('./publisher.service');



router.get('/', publisherService.getAllPublishers)

router.post('/', publisherService.addPublisher)

router.put('/:id', publisherService.patchPublisher)

router.get('/:id',publisherService.getOnePublisher)

router.delete('/:id', publisherService.deletePublisher)
 


module.exports = router;