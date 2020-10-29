const { Publisher } = require('../../../../models');


const getAllPublishers = async (req, res)=>{

    try {
        const publishers = await Publisher.findAll({});
        res.json(publishers);

    } catch (error) {
        res.status(500).send()      
    }
}

const getOnePublisher = async (req, res)=> {

    try {
       const publisher = await Publisher.findByPk(req.params.id);
       res.json(publisher);

   } catch (error) {
        res.status(500).send()
   }
}

const addPublisher = async (req, res)=>{

    try {
        const publisher = await Publisher.create({ publisherName: req.body.publisherName })
        res.send(publisher)

    } catch (error) {
        res.status(400).send() 
    }
}

const patchPublisher = async (req, res)=>{

    try {
        const result = await Publisher.update({ publisherName: req.body.publisherName },     
        { 
            where: { id: req.params.id },

        })
        
        res.send(req.body)

    } catch (error) {
        res.status(400).send()        
    }
}

const deletePublisher = async (req, res)=>{

    try {
        await Publisher.destroy(     
        { 
            where: { id: req.params.id },

        })
        
        res.send()

    } catch (error) {
        res.status(400).send()        
    }
}



module.exports = {
    getAllPublishers,
    addPublisher,
    patchPublisher,
    getOnePublisher,
    deletePublisher
}