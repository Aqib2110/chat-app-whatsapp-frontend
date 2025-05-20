import { useState, useEffect, useRef, memo } from 'react';
const Chat3 = ({ sender, token, contact }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const [messag, setMessag] = useState([{}]);
  const [loading, setloading] = useState(true);
const [fet, setfet] = useState(true)
  useEffect(() => {
    if (!contact._id) return;
   if(fet)
    {
      setloading(true);
     fetch("https://chat-app-whatsapp-backend.vercel.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ receiveid: contact._id, senderid: sender }),
    })
      .then(res => res.json())
      .then(data => {setMessag(data.messages || [])})
      .catch(console.log);
      setfet(false);
            setloading(false);
   }    
  }, [contact._id, sender, token,fet]);
    useEffect(() => {
    if (!contact._id) return;
    let intervalid:any;
 intervalid = setInterval(() => {
    fetch("https://chat-app-whatsapp-backend.vercel.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ receiveid: contact._id, senderid: sender }),
    })
      .then(res => res.json())
      .then(data => {setMessag(data.messages || [])})
      .catch(console.log);
 }, 10000);
 return ()=>{
  clearInterval(intervalid);
 }
  }, [contact._id]);
 console.log(messag);
  const sendMessage = async (inputRef:any) => {
    const message = inputRef.current?.value || "";
    if (!message) return;
    try {
     
      await fetch("https://chat-app-whatsapp-backend.vercel.app/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: sender,
          receiverId: contact._id,
          content: message,
        }),
      });

      inputRef.current.value = '';  
      setfet(true);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };


  return (
    <>
      {/* Desktop View */}
      <div className=' hidden md:block bg-black h-full'>
        <div className='flex justify-between px-3 h-[5vh] items-center border-b text-white'>
          <p className=''>{contact.username}</p>
          <h1 className='text-green-500 text-2xl'><a href='/'>WhatsApp</a></h1>
        </div>
        <div className='h-[85vh]  flex flex-col overflow-auto text-white'>
          {messag.length === 0 ?(
            <div className='flex mt-55 self-center'>No Messages</div>
          ) : (
            
            messag.map((msg: any) => (
              <div key={msg._id + Math.random()} className='text-white m-2' style={{ display: 'flex', justifyContent: msg.senderId === sender ? "end" : "start" }}>
                {msg.content}
              </div>
            ))
          )}
        </div>
        <div className='flex  h-[10vh] justify-center items-center text-white mb-0 gap-5'>
          <input type="text" ref={inputRef} className='bg-white ml-1 w-[77%] px-2 h-[90%] text-black' placeholder='Message...' />
          <button onClick={() => sendMessage(inputRef)} className='bg-white text-black h-[90%] w-[20%]'>send</button>
        </div>
      </div>

      {/* Mobile View */}
   <div className=' w-[100vw] md:hidden bg-black h-[100vh]'>
         <div className='flex justify-between w-[100%] bg-black fixed px-1 h-[5vh] items-center border-b text-white'>
          <p className=''>{contact.username}</p>
          <h1 className='text-green-500 text-2xl'><a href='/'>WhatsApp</a></h1>
        </div>
         <div className='flex justify-between w-[100%]  px-1 h-[5vh] items-center border-b text-white'>
        
        </div>
        <div className='h-[90vh] border flex flex-col overflow-auto text-white'>
          
          { loading ? (
  <div className="flex items-center justify-center h-full text-gray-300 text-lg">
    Loading...
  </div>
) : messag.length === 0 ? (
            <div className='flex mt-55 self-center'>No Messages</div>
          ) : (
          
            messag.map((msg: any) => (
              <div key={msg._id + Math.random()} className='text-white m-2' style={{ display: 'flex', justifyContent: msg.senderId === sender ? "end" : "start" }}>
                {msg.content}
              </div>
            ))
          )}
        </div>
          {/* <div className='flex justify-center  w-[100%] items-center  h-[5vh] text-white mb-0 gap-5'>
         
        </div> */}
        <div className='flex justify-center border bottom-0  fixed w-[100%] items-center  h-[5vh] text-white mb-0 gap-5'>
          <input type="text" ref={inputRef1} className='bg-white ml-1 w-[77%] px-2 h-[90%]  text-black' placeholder='Message...' />
          <button onClick={() => sendMessage(inputRef1)} className='bg-white text-black h-[90%] py-1 w-[20%]'>send</button>
        </div>
      </div>
    </>
  );
};

export default memo(Chat3);







