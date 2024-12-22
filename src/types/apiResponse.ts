import { Message } from "@/models/User";

export default interface apiResponse{
    success : boolean,
    message : string,
    isAcceptingMessage?:boolean,
    messages?:Message[]

}