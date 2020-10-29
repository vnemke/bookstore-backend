const { Author } = require('../../../../models');


const getAllAuthors = async (req, res)=> {

    try {
        const authors = await Author.findAll({});
        res.json(authors);

    } catch (error) {
        res.status(500).send()
    }
}

const getOneAuthor = async (req, res)=> {

    try {
       const author = await Author.findByPk(req.params.id);
       res.json(author);

   } catch (error) {
        res.status(500).send()
   }
}

const addAuthor = async (req, res)=>{
    try {
        const author = await Author.create({ authorName: req.body.authorName })
        res.send(author)

    } catch (error) {
        res.status(400).send() 
    }
 
}

const patchAuthor = async (req, res)=>{

    try {
        const result = await Author.update({ authorName: req.body.authorName },     
        { 
            where: { id: req.params.id },

        })
        
        res.send(result)

    } catch (error) {
        res.status(400).send()        
    }
}

const deleteAuthor = async (req, res)=>{

    try {
        const author = await Author.destroy(     
        { 
            where: { id: req.params.id },

        })
        
        res.send()

    } catch (error) {
        res.status(400).send()        
    }
}

module.exports = {
    getAllAuthors,
    addAuthor,
    patchAuthor,
    getOneAuthor,
    deleteAuthor
}