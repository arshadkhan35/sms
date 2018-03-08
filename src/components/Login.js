import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import studStore from '../stores/StudStore';
class Login extends Component {
  constructor(){
  	super();
  	this.state = {
  		user: [],
  	csrf_token: '',
  	logout_token: '',
    username: '',
    password: '',
  	};
  }
// handle user name
handleUsername(e){
  this.setState({username: e.target.value});
}
handlePassword(e){
  this.setState({password: e.target.value});
}
  	login(e){
      e.preventDefault();

  		fetch('http://localhost/drupal8/user/login?_format=json', {
  		  method: 'post',
  		  headers: {
  		    'Accept': 'application/json, text/plain, */*',
  		    'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify({name: this.state.username,pass: this.state.password})
  		}).then(result => {
  			return result.json();
  		}).then(data=> {
  			this.setState({user:data.current_user,csrf_token: data.csrf_token,logout_token: data.logout_token});
        sessionStorage.setItem("csrf_token", this.state.csrf_token);
  			console.log(this.state.user);
  		});
  	}
  render() {
    if(this.state.csrf_token){
			return <Redirect to="list-user" />
		}
  	//console.log(this.state.studList);
    return (
      <div className="Login">
        <form>
        <div className="form-group">
          <input type="text" name="username" className="form-control" placeholder="username" onChange= {this.handleUsername.bind(this)} value={this.state.username}/>
          </div>
          <div className="form-group">
          <input type="password" name="password" className="form-control" placeholder="password" onChange= {this.handlePassword.bind(this)} value={this.state.password}/>
          </div>
          <div className="form-group">
          <button className="btn btn-primary"  className="form-control" onClick={this.login.bind(this)}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
