 
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema (
  {
    username: { 
    type: String, 
    required: true, 
    unique:true, 
    lowercase: true, 
    trim: true,
    minlength: 1,
    maxlength: 30
},
password: {
  type: String, 
  required: true, 
  minlength: 6, 
  maxlength: 15, 

}, 
email: {
   type: String, 
    required: true, 
    unique:true, 
    lowercase: true, 
    trim: true,
}
  },
  {
  Timestamps : true
  }

 
)


export const User = mongoose.model("User", userSchema); 