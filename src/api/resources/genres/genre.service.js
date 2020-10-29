const { Genre } = require('../../../../models');


const getAllGenres = async (req, res)=>{

     try {
        const genres = await Genre.findAll({});
        res.json(genres);

    } catch (error) {
          
    }
}

const getOneGenre = async (req, res)=> {

    try {
       const genre = await Genre.findByPk(req.params.id);
       res.json(genre);

   } catch (error) {
         res.status(500).send()
   }
}

const addGenre = async (req, res)=>{

    try {
        const genre = await Genre.create({ genreName: req.body.genreName })
        res.send(genre)

    } catch (error) {
        res.status(400).send() 
    }
}

const patchGenre = async (req, res)=> {

    try {
        const result = await Genre.update({ genreName: req.body.genreName },     
        { 
            where: { id: req.params.id },
            
        })
       
        res.send(result)

    } catch (error) {
        res.status(400).send()        
    }
}

const deleteGenre = async (req, res)=> {

    try {
        await Genre.destroy(     
        { 
            where: { id: req.params.id },

        })
        
        res.send()

    } catch (error) {
        res.status(400).send()        
    }
}

module.exports = {
    getAllGenres,
    addGenre,
    patchGenre,
    getOneGenre,
    deleteGenre
}