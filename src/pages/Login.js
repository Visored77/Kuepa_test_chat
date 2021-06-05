import React, { Component} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Cookies from 'universal-cookie'
import logo from '../images/logo.png';
const baseUrl="http://localhost:3000/users";

const cookies = new Cookies();
class Login extends Component{

    state={
        form:{
            email:'',
            password: ''
        }
    }
    

    handleChange= async e=>{
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }

    });
    //console.log(this.state.form);
    }

    iniciarSesion=async ()=>{
        await axios.get(baseUrl)
        //console.log (response.data);
        .then(response=>{
         let Auth=false;
         let id=0;
          for(const[index, value] of response.data.entries()){
            if (value.email===this.state.form.email){
               if(response.data[index].password===this.state.form.password){
               Auth=true;
               id=index}
               break;
            }
          }
          if (Auth){
              console.log("Existe")
              console.log(response.data[id])
              var user =response.data[id];
              cookies.set('id', user.id, {path: "/"});
              cookies.set('name', user.name, {path: "/"});
              cookies.set('email', user.email, {path: "/"});
              alert(`Bienvenido ${user.name}`)
              window.location.href="./menu";
          }
          else{
            alert("El usuaripo o la contraseña no son correctos")
          }
         
          //console.log(this.state.form.email)
       
        })
        .catch(error=>{
            console.log(error);
        })
        }
    
    componentDidMount(){
        if(cookies.get('name')){
           window.location.href="/menu"; 
        }
    }
    
    render(){
        return(
            
            <div className="App">
                
            <header className="App-header"></header>
           
                <div className="containerPrincipal">
                   <img  src={logo} className="App-logo" alt="Canvas Logo" width="100%" height="auto"/> 
                    <div className="containerSecundario">
                        <div className="form-group">
                        <label> Usuario:</label>
                        <br/>
                        <input 
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <label>Contraseña</label>
                        <br/>

                        <input 
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <button className="btn btn-primary" onClick={()=>this.iniciarSesion()}>Iniciar Sesion</button>

                
                        </div>
                    </div>

                </div>
            <header className="App-header"></header>
            </div>
        )
    }
}
export default Login;