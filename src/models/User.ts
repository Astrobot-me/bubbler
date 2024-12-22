import mongoose ,{Schema,Document} from "mongoose";


export interface Message extends Document{
    content:string,
    timestamp:Date

}


const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String,
        required: true,

    },
    timestamp:{
        type :Date,
        required : true,
        default:Date.now()
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    isVerifed:boolean,
    verifyCodeExpiry:Date,
    isAcceptingMessages:boolean,
    messages : Message[]

}

const userSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username already Taken"],
        trim:true,
        min:[4,"Username must be 4 Charaters long"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email Already exists"],
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,"Input Correct Email "]
    },
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    verifyCode:{
        type:String,
        required:[true,"verification Code is required"],

    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verification Expiry Date is required"],
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    isVerifed:{
        type:Boolean,
        default:false

    },
    messages : [MessageSchema],
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",userSchema)

export default UserModel;