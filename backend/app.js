import Express from "express";
const app = Express();
import { chatWithAI } from "./ai_functions/prompt_gemini.js";
import { chats, parkMembers } from "./constants.js";
import { groupChat, pizzaShopChat } from "./chat.js";
import cors from 'cors';
import confirmDetailsFromGemini from "./ai_functions/getDataFromChat.js";
import saveRecordsInDatabase from "./database/saveOrder.js";

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

// Creating route for getting someones response
// app.post("/chat/:character", async (req, res) => {
//     const prompt = req.body.prompt;
//     const character = req.params.character;

//     // Check if the provided character exists
//     if (!parkMembers.includes(character)) {
//         return res.status(404).json({error: "Character Does Not Exist"});
//     }


//     // Use a different chat based on the characther
//     try {
//         const response = await chatWithAI(chats[character], prompt);
//         return res.json({response});
//     } catch(err) {
//         return res.status(500).json({error: "Internal Server Error"})
//     }
// })

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

// This route deals with the group chat
app.post("/group", async(req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await chatWithAI(groupChat, prompt);

        let cleanedResponse = response.replace("json", "");
        cleanedResponse = cleanedResponse.replace("```", "");
        cleanedResponse = cleanedResponse.replace("```", "");
        const formattedResponse = JSON.parse(cleanedResponse);
        return res.json(formattedResponse);
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: "Internal Server Error"})
    }
})


// Configuring the API server to listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})