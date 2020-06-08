import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Start from './pages/Start';
import Settings from './pages/Settings';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
       <Router>
         <Switch>
           <Route exact path="/" component={Start} />
           <Route path="/settings" component={Settings} />
         </Switch>
       </Router>
      </div>
    );
  }
}

export default App;
