import saveRecordsInDatabase from "../database/saveOrder.js";
import { chatWithAI } from "./prompt_gemini.js";

/*
I want to be able to ask Gemini about the state of the order i.e whether or not the user has confirmed the 
order. If so I want it to send me the size, toppings and flavour of the pizza
*/
export default async function confirmDetailsFromGemini(chat) {
    try {
        const prompt = `
        I am the admin. If the user has confirmed their order I want you to return only
        a JSON object containing the size, topping, flavour of the pizza and where to deliver to. The JSON will
        be in the following format:
        {
            "confirmed": true,
            "size": [user-picked-size],
            "topping": [user-picked-topping],
            "flavour": [user-picked-flavor],
            "address": [address-to-deliver-to]
        }
        If the user has not yet confirmed these details return the JSON object:
        {
            "confirmed": false
        }
        When talking to the customer do not reference chats from me to the customer. Return only the JSON and nothing else
        `;

        const response = await chatWithAI(chat, prompt);

        const beginRegex = /^.*{/;
        const endRegex = /&}.*/
        let cleanedResponse = response.replace(beginRegex, "{");
        cleanedResponse = response.replace(endRegex, "}")

        console.log(cleanedResponse);

        const json = JSON.parse(cleanedResponse);
        console.log(json);

        // If the order is confirmed save to database
        if (json["confirmed"] === true) {
            const size = json["size"] ?? "small";
            const topping = json['topping'] ?? "peperoni";
            const flavor = json['flavour'] ?? "Nyama Feast";
            const address = json['address'] ?? "Nairobi";

            await saveRecordsInDatabase(size, flavor, topping, address);
        }

        console.log(response);
    } catch(err) {
        console.log(err);
        throw "Could Not Confirm Details";
    }
}