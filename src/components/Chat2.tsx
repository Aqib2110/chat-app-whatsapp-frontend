import { useState,useEffect,useRef } from 'react'
function Chat2(props:any) {
const [socket, setsocket] = useState<any>(null);
const inputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  console.log("connected");
  console.log(props.contact);
  if(!props.contact.email) return;
const ws = new WebSocket("ws://localhost:8080");
setsocket(ws);
ws.onopen = ()=>{
ws.send(JSON.stringify({
    type: "join",
    payload:{
  senderId:props.sender,
  receiverId:props.contact._id
    }
   }))
}
ws.onmessage = (event:MessageEvent)=>{
 const data = JSON.parse(event.data);
  console.log(data);
 //@ts-ignore
props.setmessages(previos=>[...previos,{content:data.message,senderId:data.senderId}])
}
return ()=>{
  ws.close();
  console.log(props.contact.username,"closed");
}
}, [props.contact])
const sendMessage = ()=>{
  const message = inputRef.current?.value;
  if(!message) return;
  if (socket) {
   socket.send(JSON.stringify({
    type: "chat",
    payload:{
      message: message,
      senderId:props.sender,
      receiverId:props.contact._id
    }
   }));
   //@ts-ignore
    inputRef.current.value = '';
  }
}

console.log(props.messages);
return (
  
<>
 <div className='border hidden md:block bg-black h-[100%] '>
      <div className='flex h-[5vh] items-center gap-25 border-b text-white'>
         <p className='w-[290px]'>{props.contact.username}</p>

 <h1 className='text-green-500  text-[25px] '>WhatsApp</h1>
 </div>
 <div className='h-[86vh]  flex flex-col overflow-auto text-white'>
{props.messages.length == 0 ? <div className='flex mt-55 self-center justify-center'>No Messages</div> : props?.messages.map((msg:any)=>{
  return <div className='text-white' key={msg._id + Math.random()}>
    <div style={{
      display:"flex",
      justifyContent:msg.senderId == props.sender ? "end" : "start",
    }} className='text-white m-2'>{msg.content}</div>
  </div>
})}
 </div>
 <div className='flex   text-white mb-0 gap-5'>
  <input type="text" ref={inputRef} className='bg-white ml-1  w-[77%] px-2 h-[50px] text-black' placeholder='Message...'/>
  <button onClick={sendMessage} className='bg-white text-black cursor-pointer  h-[50px] w-[20%]'>send</button>
 </div>
   </div>



   <div className='border w-[100vw] block md:hidden bg-black h-[100vh] '>
      <div className='flex h-[5vh] items-center gap-25 border-b text-white'>
         <p className='w-[290px]'>{props.contact.username}</p>
 <h1 className='text-green-500  text-[25px] '>WhatsApp</h1>
 </div>
 <div className='h-[86vh] flex flex-col overflow-auto text-white'>
{props.messages.length == 0 ? <div className='flex mt-55 self-center justify-center'>No Messages</div> : props?.messages.map((msg:any)=>{
  return <div className='text-white' key={msg._id + Math.random()}>
    <div style={{
      display:"flex",
      justifyContent:msg.senderId == props.sender ? "end" : "start",
    }} className='text-white m-2'>{msg.content}</div>
  </div>
})}
 </div>
 <div className='flex   text-white mb-0 gap-5'>
  <input type="text" ref={inputRef} className='bg-white ml-1  w-[77%] px-2 h-[50px] text-black' placeholder='Message...'/>
  <button onClick={sendMessage} className='bg-white text-black cursor-pointer  h-[50px] w-[20%]'>send</button>
 </div>
   </div>

  </>
)
}
export default Chat2
