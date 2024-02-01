/* eslint-disable no-unused-vars */
import { useState } from "react";
import { sendChat } from "./sendchat";
import { AiOutlineSend } from "react-icons/ai";
function Chat() {
    const [messages, setMessages] = useState([

    ]);
    const [userinput, setUserinput] = useState("");
    async function onSendChat(userinput) {
        const newMessage = [...messages, {
            sender: true,
            message: userinput
        }]
        setMessages(newMessage);

        const botResponse = await sendChat(userinput);// Check to correct the function call
        setUserinput("");
        console.log(messages)
        setMessages([...newMessage, {
            sender: false,
            message: botResponse
        }]);

    }

    return (
        <div className="relative pt-16 bg-slate-400">
            <div className="flex justify-between min-w-full items-center py-4 bg-violet-500 fixed top-0 left-0 right-0 mb-20">
                <img src="../images/pizza.png" className="w-12 h-12 ml-10" alt="some pizza text" />
                <h2 className="text-white text-lg m-auto">Pizzabot</h2>
            </div>
            <div className="mx-auto max-w-lg mt-2 bg-[url('../images/periperi.png')]  bg-blend-multiply
          bg-slate-600 px-5 bg-current min-h-screen ">
                {messages.map((message, index) => (
                    // <div key={index} className="flex flex-row">
                    //     {message.sender ? <div style={{display: 'inline-block'}} className="text-wrap max-w-80 text-left items-end py-2 px-4 rounded-lg border-2 border-indigo-500 text-blue-500">Sender {message.message}</div> 
                    //     :
                    //      <div style={{display: 'inline-block'}} className="text-wrap max-w-80 bg-purple-500 text-left py-2 px-4 rounded-lg border-2 text-white items-start">Receiver {message.message}</div>}
                    // </div>
                    <div key={index} className="mb-3">
                        {message.sender ? <div className=" text-right w-fit ml-auto mt-3 py-2 px-4 rounded-lg border-2 border-white text-white">{message.message}</div>
                            :
                            <div className="  text-left max-w-80 bg-purple-500 py-2 px-4 rounded-lg border-2 text-white"> {message.message}</div>}
                    </div>
                ))}
            </div>
            <div className=" flex justify-center items-center mt-4 fixed bottom-0 left-[520px] mb-5">
                <label className="">
                    <input type="text" placeholder="Type message" className="bg-slate-300 border-solid border-black rounded-md text-violet-600 w-80 py-2 pl-2" value={userinput} onChange={(e) => setUserinput(e.target.value)} />
                </label>
                <div className="ml-2" >
                    <AiOutlineSend className=" text-lg text-white" onClick={async () => await onSendChat(userinput)} />
                </div>
            </div>
        </div>);
}

export default Chat;

