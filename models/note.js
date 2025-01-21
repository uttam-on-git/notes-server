import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to...", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error to connecting to MongoDB ", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model("Note", noteSchema);

export default Note;
