import { useNavigate } from 'react-router-dom';
import Chat3 from './Chat3';
import { useEffect, useState, useRef, useMemo } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const input1 = useRef(null);
  const [close, setClose] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState({ username: "", _id: "", email: "" });
  const [contactSelect, setContactSelect] = useState('');
  const token = useMemo(() => localStorage.getItem("token"), []);
  const sender = useMemo(() => localStorage.getItem("id"), []);

  useEffect(() => {
    if (!token || !sender) navigate("/signin");
  }, [navigate, token, sender]);

  useEffect(() => {
    try {
        fetch("https://chat-app-whatsapp-backend.vercel.app/mycontacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ receiverId: sender })
    })
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .catch(err=>console.log(err));
    } catch (error) {
      console.log(error)
    }
  
  }, [token, sender]);

  const timerRef = useRef<any>(null);
  const handleChange = (val: any) => {
    if(val === '') {
      setClose(false);
      return;
    }
    else if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setClose(true);
      fetch("https://chat-app-whatsapp-backend.vercel.app/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user: val }),
      })
        .then(res => res.json())
        .then(datas => setData(datas.user || []))
        .catch(console.log);
    }, 500);
  };

  const handleContactClick = (user: any) => {
    setContact(user);
    setContactSelect(user.email);
  };

  const handleClick = (user: any) => {
    //@ts-ignore
    setUsers(prev => [...prev, user]);
    setClose(false);
  };

  const handleContactClickMobile = (user: any) => {
    setContact(user);
    setContactSelect(user.email);
    setOpen(true);
  };

  const memoizedContact = useMemo(() => contact, [contact]);
return (
 <>
      {!open ? (
        <div className='h-[100vh] md:hidden w-[100vw] flex'>
          <div className='w-[100vw] text-white bg-black border-r h-[100vh]'>
            <div className='h-[50px]'>
              <input onChange={(e) => handleChange(e.target.value)} type="text" ref={input1} className='rounded-md w-full p-3' placeholder='search contact...' />
            </div>
            <p className='m-2'>Your Contacts</p>
            <div>
              {users?.map((user: any) => {
                if (user._id === sender) return null;
                return (
                  <div key={user._id} className={`cursor-pointer my-3 px-3 py-2 w-full text-white border ${contactSelect === user.email ? 'border-green-500' : 'border-white'}`}>
                    <p onClick={() => handleContactClickMobile(user)}>{user.username}</p>
                  </div>
                );
              })}
            </div>
            {close && (
              <div className='h-[70vh] w-[80%]  top-[10%] left-[10%] border  flex flex-col  gap-3 absolute bg-white'>
                {data.length > 0 ? data.map((user: any) => (
                  <div key={user._id} className='border m-2 justify-between flex text-black'>
                    <h1>{user.username}</h1>
                    <button onClick={() => handleClick(user)} className='border px-3 cursor-pointer'>add</button>
                  </div>
                )) : <div className='text-black'>No contact found</div>}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='w-[100vw] block md:hidden h-[100vh]'>
          <Chat3 sender={sender} token={token} contact={memoizedContact} />
        </div>
      )}

      <div className='h-[100vh] justify-between hidden md:flex w-[100vw]'>
        <div className='w-[40vw] text-white bg-black border-r h-full'>
          <div className='h-[50px]'>
            <input onChange={(e) => handleChange(e.target.value)} type="text" ref={input1} className='rounded-md w-full p-3' placeholder='search contact...' />
          </div>
          <p className='m-2'>Your Contacts</p>
          <div>
            {users?.map((user: any) => {
              if (user._id === sender) return null;
              return (
                <div key={user._id} className={`cursor-pointer my-3 px-3 py-2 w-full text-white border ${contactSelect === user.email ? 'border-green-500' : 'border-white'}`}>
                  <p onClick={() => handleContactClick(user)}>{user.username}</p>
                </div>
              );
            })}
          </div>
          {close && (
            <div className='h-[70vh] w-[30vw] border flex flex-col gap-3 absolute bg-white top-13 left-7'>
              {data.length > 0 ? data.map((user: any) => (
                <div key={user._id} className='border m-2 justify-between flex text-black'>
                  <h1>{user.username}</h1>
                  <button onClick={() => handleClick(user)} className='border px-3 cursor-pointer'>add</button>
                </div>
              )) : <div className='text-black'>No contact found</div>}
            </div>
          )}
        </div>

        <div className='w-[60vw]'>
          <Chat3 sender={sender} token={token} contact={memoizedContact} />
        </div>
      </div>
    </>
  );
};

export default Home;

