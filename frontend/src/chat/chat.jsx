/* eslint-disable no-unused-vars */
import { useState } from "react";
import { sendChat } from "./sendchat";
import { AiOutlineSend } from "react-icons/ai";
function Chat() {
    const [messages, setMessages] = useState([
        {
            sender: true,
            message: "Hello sdgdf sfgsdfg sfggs sdfgsg s sfgsd"
        },
        {
            sender: false,
            message: "Hi"
        },
        {
            sender: true,
            message: "How are you?"
        },
        {
            sender: false,
            message: "I'm good"
        },
        {
            sender: true,
            message: "That's good"
        },
        {
            sender: false,
            message: "Yeah"
        },
        {
            sender: true,
            message: "What are you doing?"
        },
        {
            sender: false,
            message: "Nothing much"
        },
        {
            sender: true,
            message: "Same"
        },
        {
            sender: false,
            message: "Yeah"
        },
        {
            sender: true,
            message: "I'm going to go now"
        },
        {
            sender: false,
            message: "Ok"
        },
        {
            sender: true,
            message: "Bye"
        },
        {
            sender: false,
            message: "Bye"
        },
    ]);
    const [userinput, setUserinput] = useState("");
    function onSendChat(userinput) {
        setMessages([...messages, {
            sender: true,
            message: userinput
        }]);
        const botResponse = sendChat(userinput);// Check to correct the function call
        setUserinput("");
        setMessages([...messages, {
            sender: false,
            message: botResponse
        }]);

    }

    return (
    <div className="">
        <div className="flex justify-between max-w-full items-center py-4 bg-violet-500">
            <img src="../images/pizza.png" className="w-12 h-12 ml-10" alt="some pizza text" />
            <h2 className="text-white text-lg m-auto">Pizzabot</h2>
        </div>
        <div className="mx-auto max-w-lg mt-2">
            {messages.map((message, index) => (
                // <div key={index} className="flex flex-row">
                //     {message.sender ? <div style={{display: 'inline-block'}} className="text-wrap max-w-80 text-left items-end py-2 px-4 rounded-lg border-2 border-indigo-500 text-blue-500">Sender {message.message}</div> 
                //     :
                //      <div style={{display: 'inline-block'}} className="text-wrap max-w-80 bg-purple-500 text-left py-2 px-4 rounded-lg border-2 text-white items-start">Receiver {message.message}</div>}
                // </div>
                <div key={index} className="mb-5">
                    {message.sender ? <div className="text-wrap  w-fit max-w-40 py-2 px-4 rounded-lg border-2 border-indigo-500 text-blue-500">Sender {message.message}</div>
                        :
                        <div className="text-wrap w-fit m-auto bg-purple-500 py-2 px-4 rounded-lg border-2 text-white">Receiver {message.message}</div>}
                </div>
            ))}
        </div>
        <div className="relative  ">
            <label className="">
                <input type="text" placeholder="Type message" className="bg-slate-300 border-solid border-black rounded-sm text-violet-600 w-48 py-2 pl-2" value={userinput} onChange={(e) => setUserinput(e.target.value)} />
            </label>
            <div className="absolute right-2 top-2">
                <AiOutlineSend className="relative text-violet-500" />
            </div>
        </div>
    </div>);
}

export default Chat;

