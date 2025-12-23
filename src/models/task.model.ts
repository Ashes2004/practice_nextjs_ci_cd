import mongoose , {Schema , models} from "mongoose";
 const taskSchema  = new Schema({
    taskName : {type:String , required : true},
    isCompleted: {type : Boolean , default:false}
} , {timestamps : true})


export const UserModel = models.Task || mongoose.model('Task' , taskSchema );
