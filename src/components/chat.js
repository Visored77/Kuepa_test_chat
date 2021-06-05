import React, {useState, useEffect, useRef} from 'react';
import Socket from './Socket'
import '../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const Chat= ({nombre}) => {
    const [mensaje, setMensaje]= useState("");
    const [mensajes, setmensajes]= useState([]);

    useEffect(()=> {
        Socket.emit('conectado', nombre)
    }, [nombre]);
    
    useEffect(()=> {
        Socket.on('mensajes',mensaje=> {
            setmensajes([...mensajes, mensaje])
        })
        return() => {Socket.off()}
    },[mensajes])


    const divRef=useRef(null);
    useEffect(()=> {
        divRef.current.scrollIntoView({behavior: 'smooth'})
    })

    const submit = (e)=>{
        e.preventDefault();
        Socket.emit('mensaje', nombre, mensaje )
        setMensaje("");
    }
    return (
        <div>
            <div className="chat">
                {mensajes.map((e, i)=> <div  key={i}> <div><b>{e.nombre}:</b></div><div>{e.mensaje}</div> </div>)}
                <div ref={divRef}></div>
            </div>
            <div className="chat-w">
            <form onSubmit={submit}>
                <div >
                <label htmlFor=""> <h5>Escriba su mensaje</h5> </label>
                </div>
                <div>
                <textarea name="" id="" cols="40" rows="2" value={mensaje} onChange={e => setMensaje(e.target.value)}>
                </textarea>
                </div>
                <button className="btn btn-primary" >Enviar</button>
                
            </form>

            </div>
        </div>
       
    )
}
export default Chat