import React, { Component } from 'react';
import './App.css';
import ListStuds from './components/ListStuds';
import Login from './components/Login';
import {BrowserRouter as Router,
Route,Redirect} from 'react-router-dom';

// Private Route
const PrivateRoute  = ({component: Component,  ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => sessionStorage.getItem("csrf_token") != null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}
class App extends Component {
	constructor(){
		super();
		this.state = {
			authenticated : true
		};
	}
  render() {
    return (
      <div className="App">
				<Router>
					<div>
						<Route exact path="/" component={Login} />
						<PrivateRoute path="/list-user" component={ListStuds}  />
					</div>
				</Router>
        {this.props.children}

      </div>
    );
  }
}

export default App;
