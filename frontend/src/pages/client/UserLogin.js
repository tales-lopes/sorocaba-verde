import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import Login from '../../components/Login';
import './styles/UserLogin.css';
import '../../styles/global.css'
import UserNav from '../../components/UserNav';
import ReactLoading from 'react-loading';


class UserLogin extends Component{
    constructor(){
        super()
        this.state = {
            isLogged: false,
            isLoading: true,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
        .then((res) =>{
          if(res.data.code === 1){
            this.setState({
              isLogged: true,
              isLoading:false
            })
          } else{
            this.setState({
              isLogged: false,
              isLoading: false
            })
          }
        })
    }

    render(){
        if(this.state.isLoading === false && this.state.isLogged === false){
            return(
                <div>
                    <Route path='/' component={UserNav} />
                    <div className="page-background" id="user-login">
                        <div className="page-container">
                            <div className="page-content" id="user-login-content">
                                <h2>Bem vindo ao Portal de Gestão de Aborização de Sorocaba,</h2>
                                <h5>Aqui você poderá requisitar cortes, podas e substituições de árvores, além de acompanhar o progresso de arborização da cidade de Sorocaba.</h5>
                                <br/>
                                <h5>#SorocabaVerde</h5>
                            </div>
                            <Route path='/' component={Login} />
                        </div>
                    </div>
                </div>
            )
        } 
        else if(this.state.isLoading === false && this.state.isLogged === true) return (<Redirect to="/user"/>)
        else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default UserLogin;