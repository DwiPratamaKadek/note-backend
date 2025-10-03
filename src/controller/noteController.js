// const NoteModel = require("../model/noteModel");

// const noteController = {
//   getAllNote: async (req, res) => {
//     try {
//       const note = await NoteModel.getAll();
//       res.status(200).json(note);
//     } catch (error) {
//       console.error("Error getting all note:", error);
//       res.status(500).json({ message: "Error getting all note" });
//     }
//   },



// module.exports = noteController;

const { note, tag, priority, user  } = require("../models") 


const noteController = {
  
  getAllNote: async (req,res) => {
    try { 
      const data = await note.findAll({
        include : [
          { model: user },
          { model: priority },
          { model: tag }
        ]
      });
      if( user === 0 ) {
        return res.status(404).json({ message: "note not found" });
      }
      res.json(data)
    }catch(error) {
        console.log("Error getting all note:", error)
        res.status(500).json({ message : "error getting all note" })

    }
  },  

  getNotebyId: async (req, res) => {
    const { id } = req.params
    try {
      const data = await note.findByPk(id)
      if(!data) return res.status(404).json({message : "Note Not Found"}) 
    }catch{
      console.log("Error getting note by id :", error)
      res.status(500).json({ message : "error getting note by id" })
    }
  },

  getNotebyUser: async (req, res) => {
    try {
      console.log("user yang login", req.user)
      const userNote = await note.findAll({
        where: { id_user : req.user.id_user}
      })
      res.status(200).json({message : "neh note lo", userNote})
    }catch(error) {
      console.log("error ni bang", error)
      res.status(500).json({message : "lo tau gak ni internal error", error})
    }
  },

  createNote: async (req, res) => {
    const { title, content, deadline, id_priority } = req.body
    try {
      const newdata = await note.create({
        title, 
        content, 
        deadline, 
        id_user: req.user.id_user, 
        id_priority
      })
      res.status(200).json({message : "Note successfully created", newdata})
    }catch(error) {
      console.log("Error create note:", error)
      res.status(500).json({ message : "error create note" })
    }
  },

  updateNote : async (req, res) => {
    const { id } = req.params
    const { title, content, deadline, id_user, id_priority } = req.body
    try{
      const [affactedRows] = await note.update(
        { title, content, deadline, id_user, id_priority }, //data baru
        { where: {id_note: id} }
      )
      if ( affactedRows === 0 ){
        return res.status(404).json({message : "Note not found"})
      }
      res.status(200).json({message : "Note successfully update"})
    }catch(error){
      console.log("Error update note:", error)
      res.status(500).json({ message : "error update note" })
    }
  },

  deleteNote : async (req, res) => {
    const { id } = req.params
    try{
      const affactedRow = await note.destroy({where : {id_note:id}})
      if(affactedRow === 0 ) {
        return res.status(404).json({message : "Note is not found"})
      }
      res.status(200).json({message : "Note successfully delete"})
    }catch(error){
      console.log("Error delete  note:", error)
      res.status(500).json({ message : "error delete note" })
    }
  }
}
module.exports = noteController