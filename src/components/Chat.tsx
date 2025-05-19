import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Chat(props:any) {
const [socket, setsocket] = useState<any>(null);
const [message, setmessage] = useState<any>(()=>{
  const data = localStorage.getItem('message');
  if(data){
    return JSON.parse(data);
  }
  return [];
});
const inputRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const input2 = useRef<any>('');
const input3 = useRef<any>('');
// const [join, setjoin] = useState<any>(0);
useEffect(() => {
  if(!props.message && !localStorage.getItem('roomCode'))
  {
navigate('/join');
  return;
  }
 const ws = new WebSocket('ws://localhost:8080');
  input2.current = props.message.code ? props.message : JSON.parse(localStorage.getItem('roomCode') || '{}');
  input3.current = input2.current.name;
 if(props.message.code){
  localStorage.setItem('roomCode', JSON.stringify(props.message));
 }
 console.log('message', input2.current);
 ws.onopen = ()=>{
    ws.send(JSON.stringify({
      type: "join",
      roomCode: input2.current.code,
      name: input3.current
    }));
 }
 ws.onmessage = (event: MessageEvent)=>{
  const data = JSON.parse(event.data);
  console.log(data);
  if(data.type == "join" && data.isSentByMe)
  {
    return;
  }
  else if(data.type == "join"){
toast.success(`${data.name} has joined the room`);
 //@ts-ignore
// setjoin(join=>join+1);
return;
  }
  else if(data.type == "leave"){
     //@ts-ignore
    // setjoin(join=>join-1);
    toast(<div style={{
      color:'red',
      fontWeight:'bold',
    }}>
{data.name} has left the room
    </div>);
    return;
      }
    //@ts-ignore
   setmessage(arr=>[...arr, { text: data.message,isSentByMe:data.isSentByMe,name: data.name }]);
 }
setsocket(ws);
}, [])
useEffect(() => {
  if(message.length === 0) return;
 localStorage.setItem('message', JSON.stringify(message));
}, [message])
const sendMessage = ()=>{
  const message = inputRef.current?.value;
  if(!message) return;
  if (socket) {
   socket.send(JSON.stringify({
    type: "message",
    message: message,
    roomCode: input2.current.code,
    isSentByMe:true,
    name:input3.current
   }));
   //@ts-ignore
    inputRef.current.value = '';
  }
}
const handleClear = ()=>{
  localStorage.removeItem('message');
  setmessage([]);
}
const handleLeave = ()=>{
  localStorage.removeItem('message');
  localStorage.removeItem('roomCode');
  setmessage([]);
  socket.send(JSON.stringify({
    type: "leave",
    roomCode: input2.current.code,
    name: input3.current
  }));
  socket.close();
  navigate('/join');
}
return (
  <>
   <center >
   <p  style={{
      position:'fixed',
      top:'10px',
      left:'10px',
      borderRadius:'10px',
      padding:'5px',
      backgroundColor:'red',
      color:'white',
      cursor:'pointer',
      zIndex:'10'
    }} onClick={handleLeave}>leave room</p>
   <h1 style={{
    width: '100%',
        position: 'fixed',
        top: '0',
        padding:'10px',
        zIndex:'1',
        fontWeight: 'bold',
        fontSize: '40px',
       fontFamily: 'sans-serif',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}>Chat App</h1>
{/* <p style={{
  color:'green',
  position:'fixed',
}}>Room Joined : {join}</p> */}
     <p  style={{
      position:'fixed',
      top:'10px',
      right:'10px',
      borderRadius:'10px',
      padding:'5px',
      backgroundColor:'blue',
      color:'white',
      cursor:'pointer',
      zIndex:'10'
    }} onClick={handleClear}>clear chat</p>

    </center> 
    <div style={{
      width: '100%',
      padding:"10px",
      display: 'flex',
      gap: '10px',
      position: 'fixed',
      bottom: '0',
    }}>
    <input style={{
      border: '1px solid black',
      boxSizing: 'border-box',
      width:'90%',
      padding: '10px',
      borderRadius: '10px',
    }} type="text" ref={inputRef} placeholder='Message...' />
    <button style={{
      width: '10%',
      border:'none',
      borderRadius: '10px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      backgroundColor: 'green',
    }} onClick={sendMessage}>send</button>
    </div>
  <div style={{
    width:'100%',
    marginTop:'65px',
    height:'80vh',
    overflow:'auto',
   msOverflowStyle: 'none', 
  }} className='chat'>
  {message.map((msg: any) => {
  return (
    <div key={Math.random()} style={{
      padding: '10px',
      margin: '10px',
      backgroundColor: `${msg?.isSentByMe ? 'green' : 'gray'}`,
      display: 'flex',
      justifySelf:`${msg?.isSentByMe ? 'end' : 'start'}`,
      borderRadius: '10px',
      width: 'fit-content',
      position: 'relative',
    }}>
      {msg.text}
<p style={{
  color: 'white',
  fontWeight: 'bold',
 justifySelf:'end',
 display:msg.isSentByMe ? 'none' : 'block',
 position:'absolute',
 bottom: '0',
 right: '3px',
 fontSize: '11px',
  }}>{msg.name}</p>
    </div>
  )
})}
  </div>

  </>
)
}
export default Chat



























// import { useState,useEffect,useRef } from 'react'
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// function Chat2(props:any) {
// const [socket, setsocket] = useState<any>(null);
// const [members, setmembers] = useState<number>(0);
// const [message, setmessage] = useState<any>(()=>{
//   const data = localStorage.getItem('message');
//   if(data){
//     return JSON.parse(data);
//   }
//   return [];
// });
// const inputRef = useRef<HTMLInputElement>(null);
// const navigate = useNavigate();
// const input2 = useRef<any>('');
// const input3 = useRef<any>('');
// // const [join, setjoin] = useState<any>(0);
// useEffect(() => {
// //   if(!props.message && !localStorage.getItem('roomCode'))
// //   {
// // navigate('/join');
// //   return;
// //   }
//  const ws = new WebSocket('ws://localhost:8080');
// //   input2.current = props?.message.code ? props.message : JSON.parse(localStorage.getItem('roomCode') || '{}');
// //   input3.current = input2.current.name;
// //  if(props.message.code){
// //   localStorage.setItem('roomCode', JSON.stringify(props.message));
// //  }
//  console.log('message', input2.current);
//  ws.onopen = ()=>{
//     ws.send(JSON.stringify({
//       type: "join",
//     payload:{
//       roomId: input2.current.code ,
//       name: input3.current ,
//     }
//     }));
//  }
//  ws.onmessage = (event: MessageEvent)=>{
//   const data = JSON.parse(event.data);
//   setmembers(data.members);
//   console.log(data,"data");
//   if(data.type == "join" && data.isSentByMe)
//   {
//     return;
//   }
//   else if(data.type == "join"  && !data.isSentByMe)
//   {
//     console.log("Aqib");
// toast.success(`${data.name} has joined the room`);
//  //@ts-ignore
// // setjoin(join=>join+1);
// return;
//   }
//   else if(data.type == "leave"){
//      //@ts-ignore
//     // setjoin(join=>join-1);
//     toast(<div style={{
//       color:'red',
//       fontWeight:'bold',
//     }}>
// {data.name} has left the room
//     </div>);
//     return;
//       }
//     //@ts-ignore
//    setmessage(arr=>[...arr, { text: data.message,isSentByMe:data.isSentByMe,name: data.name }]);
//  }
// setsocket(ws);
// // return ()=>{
// //   ws.close();
// //   console.log('socket closed');
// // }
// }, [])
// useEffect(() => {
//   if(message.length === 0) return;
//  localStorage.setItem('message', JSON.stringify(message));
// }, [message])
// const sendMessage = ()=>{
//   const message = inputRef.current?.value;
//   if(!message) return;
//   if (socket) {
//    socket.send(JSON.stringify({
//     type: "chat",
//     payload:{
//       message: message,
//       roomId: input2.current.code,
//       isSentByMe:true,
//       name:input3.current
//     }
//    }));
//    //@ts-ignore
//     inputRef.current.value = '';
//   }
// }
// const handleClear = ()=>{
//   localStorage.removeItem('message');
//   setmessage([]);
// }
// const handleLeave = ()=>{
//   localStorage.removeItem('message');
//   localStorage.removeItem('roomCode');
//   setmessage([]);
//   socket.send(JSON.stringify({
//     type: "leave",
//     roomId: input2.current.code,
//     name: input3.current
//   }));
//   socket.close();
//   navigate('/join');
// }
// return (
//   <div className='border h-[100vh]' style={{
//     position:"relative"
//   }}>
//   <div className='border' style={{
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       width:"100%",
//       height:"60px"
//   }}>
//  <p  style={{
//       position:'absolute',
//       top:'10px',
//       left:'10px',
//       borderRadius:'10px',
//       padding:'5px',
//       backgroundColor:'red',
//       color:'white',
//       cursor:'pointer',
//       zIndex:'10'
//     }} onClick={handleLeave}>leave room</p>
//    <h1 className='flex justify-center' style={{
//     width: '100%',
//         fontWeight: 'bold',
//         fontSize: '40px',
//        fontFamily: 'sans-serif',
//     }}>Chat App</h1>
// {/* <p style={{
//   color:'green',
//   position:'fixed',
// }}>Room Members : {members}</p> */}
//      <p  style={{
//       position:'absolute',
//       top:'10px',
//       right:'10px',
//       borderRadius:'10px',
//       padding:'5px',
//       backgroundColor:'blue',
//       color:'white',
//       cursor:'pointer',
//       zIndex:'10'
//     }} onClick={handleClear}>clear chat</p>
//   </div>
  

  
  
//   <div style={{
//     width:'100%',
//     // marginTop:'65px',
//     height:'80vh',
//     overflow:'auto',
//    msOverflowStyle: 'none', 
//    paddingTop:'10px',
//   }} className='chat border'>
//   {message.map((msg: any) => {
//   return (
//     <div key={Math.random()} style={{
//       padding: '10px',
//       margin: '10px',
//       backgroundColor: `${msg?.isSentByMe ? 'green' : 'gray'}`,
//       display: 'flex',
//       justifySelf:`${msg?.isSentByMe ? 'end' : 'start'}`,
//       borderRadius: '10px',
//       width: 'fit-content',
//       position: 'relative',
//       color:'white'
//     }}>
//       {msg.text}
// <p style={{
//   color: 'white',
//   fontWeight: 'bold',
//  justifySelf:'end',
//  display:msg.isSentByMe ? 'none' : 'block',
//  position:'absolute',
//  bottom: '0',
//  right: '3px',
//  fontSize: '11px',
//   }}>{msg.name}</p>
//     </div>
//   )
// })}
//   </div>
//   <div style={{
//       width: '100%',
//       padding:"10px",
//       display: 'flex',
//       gap: '10px',
//       position: 'fixed',
//       bottom: '0',
//     }}>
//     <input style={{
//       border: '1px solid black',
//       boxSizing: 'border-box',
//       width:'90%',
//       padding: '10px',
//       borderRadius: '10px',
//     }} type="text" ref={inputRef} placeholder='Message...' />
//     <button style={{
//       width: '10%',
//       border:'none',
//       borderRadius: '10px',
//       boxSizing: 'border-box',
//       cursor: 'pointer',
//       backgroundColor: 'green',
//     }} onClick={sendMessage}>send</button>
//     </div>
//   </div>
// )
// }
// export default Chat2

