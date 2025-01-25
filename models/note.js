import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5,
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returedObject) => {
        returedObject.id = returedObject._id.toString(),
        delete returedObject._id,
        delete returedObject.__v
    }
})
const Note = mongoose.model('Note', noteSchema)

export default Note