import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import RoomPage from "./pages/RoomPage"
import ChatPage from "./pages/ChatPage"

function App() {
  const [isAuth,setIsAuth]=useState(localStorage.getItem("token"))
  const [room,setRoom]=useState(null)
  console.log(room)
  // kullanıcını yetkisi yoksa login
  if(!isAuth){
    return <LoginPage setIsAuth={setIsAuth}/>
  }
  // Kullanıcının yetkisi varsa oda secme
  return (
   <div className="container">
    {room ? <ChatPage room={room} setRoom={setRoom}/> : (<RoomPage setRoom={setRoom} setIsAuth={setIsAuth}/>)}
    
   </div>
  )
}

export default App
