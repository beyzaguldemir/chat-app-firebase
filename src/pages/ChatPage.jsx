import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc ,collection,onSnapshot,serverTimestamp,query,where,orderBy} from 'firebase/firestore'
import Message from '../components/Message'

console.log(auth)
const ChatPage = ({room,setRoom}) => {
  const [messages,setMessages]=useState()
  const lastMsg=useRef()
  // form gönderilince
    const handleSubmit=async (e)=>{
        e.preventDefault()

        // mesajın eklenileceginin kolleksiyonun referansını al
        const messagesCol=collection(db,"messages")
        // sorgu ayarlarını yap
        
        // kolleksiyona eleman ekle
        await addDoc(messagesCol,{
          room,
          text:e.target[0].value,
          author:{
            id:auth.currentUser.uid,
            name:auth.currentUser.displayName,
            photo:auth.currentUser.photoURL,
          },
          createdAt:serverTimestamp(),
        })

        // son mesaja kaydır

        lastMsg.current.scrollIntoView({behavior:"smooth"})
        // formu sıfırla
        e.target.reset()
    }
    console.log(lastMsg)
    // mevcut odada gönderilen mesajlarını anlık olarak al

    useEffect(()=>{
      // abone olunacak kolleksiyonun referansını al
      const messagesCol=collection(db,"messages")
      //onSnapshot ile anlık olarak kolleksiyondaki değişimleri izler koleksiyon her değistiğinde verdiğimiz fonk ile kolleksiyondaki güncel belgeleri al
      const q=query(messagesCol,where("room","==",room),orderBy("createdAt","asc"))
      onSnapshot(q,messagesCol,(snapshot)=>{
        let tempMsg=[]
        // dokümanların içerisindeki veriye eriş ve içerisindeki elemanlara aktar
        snapshot.docs.forEach((doc)=>tempMsg.push(doc.data()))
        // state i güncelle
        setMessages(tempMsg);
      })
    },[])
  return (
    <div className='chat-page'>
    <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={()=>setRoom(null)}>Farklı Oda</button>
    </header>
    <main>
      {!messages ? (<p>Sohbete İlk Mesajı Gönderin</p>) : (messages.map((data,i)=><Message data={data} key={i}/>))}
    

    <div ref={lastMsg}/>

    </main>
    <form onSubmit={handleSubmit}>
        <input placeholder='mesajınızı yazınız...' type="text" required />
        <button>Gönder</button>
    </form>
    </div>
  )
}

export default ChatPage