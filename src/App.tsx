// import { useState,useEffect,useRef } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './App.css'
// import Room from './components/Room'
// import Chat from './components/Chat'
import Signup from './components/Signup'
import Signin from './components/Signin'

import Home from './components/Home';
function App() {

return (
  <>
   <Toaster position="bottom-center" reverseOrder={false} />
  <BrowserRouter>
  <Routes>
<Route path='/signup' element={<Signup />} />
<Route path='/signin' element={<Signin />} />
<Route path='/' element={<Home />} />
  </Routes>
  </BrowserRouter>
  </>
)
}
export default App


// const [message, setmessage] = useState<any>('');
{/* <Route path='/join' element={<Room setmessage={setmessage}/>} /> */}
{/* <Route path='/' element={<Home message={message}/>} /> */}
