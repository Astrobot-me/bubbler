import mongoose from "mongoose";


type connectionObject = {
    isConnected?: number
} ;

const connection : connectionObject = {}

export default async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log(`@Already Connected to Database`);
        return 
    }

    try {
        const dbCon = await mongoose.connect(process.env.MONGO_URI || "",{}) 
        connection.isConnected = dbCon.connections[0].readyState
        console.log(`Database is Connected :: Edge Time :: ${connection.isConnected}`);

         
    } catch (error) {
        console.log(`Error Occured during Database Connection ${error}`);
        process.exit(1)
        
    }
}   