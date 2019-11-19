import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import SearchResults from './Components/SearchResults/SearchResults';
import Plugin from './Components/Plugin/Plugin';

class App extends React.Component {
  render(){
    return (
      <div className="App">

        {/* <Search></Search> */}

        {/* <Plugin></Plugin> */}

        <Header></Header>

        <SearchResults></SearchResults>

        

        


        


      </div>
    );
  }
}

export default App;
