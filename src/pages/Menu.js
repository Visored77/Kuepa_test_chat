import React, { Component} from 'react';
import Cookies from 'universal-cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import Chat from '../components/chat';
import '../css/Login.css';
import logo from '../images/logo.png';
const cookies = new Cookies();
class Menu extends Component{
    cerrarSesion=()=>{
        cookies.remove('id',{path: "/"});
        cookies.remove('email',{path: "/"});
        cookies.remove('name',{path: "/"});
        window.location.href= "/";
    }
    componentDidMount(){
        if (!cookies.get('name')){
           window.location.href=("/");
        }
    }
    render(){
        console.log(cookies.get('id'))
        console.log(cookies.get('email'))
        console.log(cookies.get('name'))
        

        return(
            <>
            <div style={{ width:"100%", height:"100%"}}>
               <header className="App-headermenu">
                
                <div style={{ height:"100%",width:"80%", float:"left"}} >
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/AVdLjceIn8M?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style={{height:"100%",width:"19%", float:"left"}} >
                    <img  src={logo} className="App-logo2" alt="Canvas Logo" width="70%" height="auto" /> 
                    
                    <h5>Usuario: {cookies.get('name')}</h5>
                    <button className="btn btn-primary" onClick={()=>this.cerrarSesion()}> Cerrar Sesion</button>
                    <Chat nombre ={cookies.get('name')}/>
                </div>
                </header>
            </div>   
            
            </>
        )
    }
}

export default Menu;