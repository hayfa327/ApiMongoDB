 
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

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

//  before saving any password we need to hash it 
userSchema.pre("save" , async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  next(); 
});

//compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema); 