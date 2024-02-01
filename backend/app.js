import Express from "express";
const app = Express();
import { chatWithAI } from "./ai_functions/prompt_gemini.js";
import { chats } from "./constants.js";
import cors from 'cors';
import confirmDetailsFromGemini from "./ai_functions/getDataFromChat.js";
// Add middleware for parsing request body
app.use(Express.urlencoded({ extended: false }))
app.use(Express.json())
app.use(cors({
    credentials: true,
    origin: '*'
}));

// Creating a test route to see if server is reachable
app.get("/test", (req, res) => {
    res.send("I am reachable!");
})

// Send users input to this endpoint
app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await chatWithAI(chats.pizzaShopChat, prompt);
        const data = await confirmDetailsFromGemini(chats.pizzaShopChat);
        return res.json({response});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Something Went Wrong"});
    }
})

// Configuring the API server to listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})