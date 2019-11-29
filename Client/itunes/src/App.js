import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import  ItunesDataPage  from "./Components/itunes-data/itunes-data";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ItunesFullData from "./Components/itune-full-data/itune-full-data";

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <ItunesDataPage/>
      // </div>

      <Router>
      <div>
        <Switch>
          <Route path="/CurrentPage/:id" render={(matchProps) => <ItunesFullData {...matchProps}{...this.props} handleMatch={this.handleMatch}/>}>
            {/* <ItunesFullData /> */}
          </Route>
          <Route path="/">
            <ItunesDataPage />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;

function CurrentPage() {
  return <h2>About</h2>;
}