import { useState,useEffect,useRef } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Room from './components/Room'
import Chat from './components/Chat'
function App() {

const [message, setmessage] = useState<any>('');
return (
  <>
   <Toaster position="bottom-center" reverseOrder={false} />
  <BrowserRouter>
  <Routes>
<Route path='/join' element={<Room setmessage={setmessage}/>} />
<Route path='/' element={<Chat message={message}/>} />
  </Routes>
  </BrowserRouter>
  </>
)
}
export default App
