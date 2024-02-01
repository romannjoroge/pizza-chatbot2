import { serverUrl } from "./constants"
import axios from "axios";

// Send a chat to the server and return the response
export async function sendChat(chat) {
    try {
        const response = await axios.post(`${serverUrl}/chat`, {prompt: chat});
        return await response.data.response
    } catch(err) {
        console.log(err);
        throw "Could Not Send Chat"
    }
}