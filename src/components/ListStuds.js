import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
//import studStore from '../stores/StudStore';
class ListStuds extends Component {
	constructor(){
		super();
		this.state = {
			studList: [],
			csrf_token: sessionStorage.getItem('csrf_token')
		};
	}
	logout(){
		sessionStorage.clear();
		this.setState({csrf_token: ''});
	}
	componentDidMount(){
		fetch("http://localhost/drupal8/api/article")
		.then(result => {
			return result.json();
			})
		.then(data => {
			console.log( data);
			let movies = data.map((movie) => {

				return(
					<div key={movie.nid}>
					<h2>{movie.title}</h2>
					<p>{movie.body}</p>
					</div>
					)
			})
			this.setState({studList: movies});
		});

	}
  render() {
		if(this.state.csrf_token == ''){
			return <Redirect to="/" />
		}
  	//console.log(this.state.studList);
    return (
      <div className="App">
			<button onClick={this.logout.bind(this)}> Logout</button>
       <h1> {this.state.studList} </h1>
      </div>
    );
  }
}

export default ListStuds;
