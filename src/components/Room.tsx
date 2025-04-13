import React from 'react'
import { useNavigate } from 'react-router-dom'

const Room = (props:any) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const input2Ref = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
    const handleCreate = ()=>{
const code = Math.floor(Math.random() * 9000 + 1000).toString();
inputRef.current!.value = code;
    }
    const handleJoin = ()=>{
const code = inputRef.current?.value;
const name = input2Ref.current?.value;
if(!code || !name) return;
props.setmessage({
  code:code,
  name: name
});
  navigate('/');
    }
  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '10px', color: '#333' }}>Chat App</h1>
      <p style={{ marginBottom: '20px', color: '#555' }}>Join the Room</p>
    
      <button 
        onClick={handleCreate}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
        Create New Room
      </button>
    
      <div style={{ marginBottom: '15px' }}>
        <input 
          ref={input2Ref}
          type="text" 
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
      </div>
    
      <div style={{ marginBottom: '20px' }}>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Enter room code"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
      </div>
    
      <button 
        onClick={handleJoin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
        Join
      </button>
    
      {props.message && (
        <p style={{ marginTop: '20px', color: 'red' }}>{props.message}</p>
      )}
    </div>
    
  )
}

export default Room
