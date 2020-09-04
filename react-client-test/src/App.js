import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{

   componentDidMount() {
    console.log('GrandChild did mount.');

  }

  fetchTest() {
    console.log("FETCH")
    fetch("http://localhost:3001/")
    .then(res => res.json())
    .then(response => console.log(response))
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <button onClick={this.fetchTest}>deqefqw</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
