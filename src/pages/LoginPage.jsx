import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import {auth,provider} from "../firebase"
const LoginPage = ({setIsAuth}) => {
    // butona tıklanınca
    const handleClick=()=>{
        // google ile giriş yap
        signInWithPopup(auth,provider)
        // basarılı olursa: 
        .then((res)=>{
            //yetkiyi true 'ya çek
            setIsAuth(true)
            // locale token kaydet
            localStorage.setItem("token",res.user.refreshToken)
        })

        //basarısız olursa:
        .catch((err)=>console.log(err))
    }
  return (
    <div className='container'>
        <div className='login'>
            <h1>Chat Odası</h1>
            <p>Devam etmek için giriş yap</p>
            <button onClick={handleClick}>
                <img src="google.webp" alt="" />
                <span>Google ile Gir</span>
            </button>
        </div>
    </div>
  )
}

export default LoginPage