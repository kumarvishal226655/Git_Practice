import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    roll:{
        type:String,
        enum:["admin", "user",],
        default: "user"
    },
},
{timestamps:true}

);

// Hassing password before saving 

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return;

 
  this.password = await bcrypt.hash(this.password, 10);
  
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User",userSchema);