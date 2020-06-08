import React from 'react';
import Header from '../components/header';

class Feedback extends React.Component {
  constructor(props) {
    this.state = {
      score: 0,
    };
  }
  render() {
    return (
      <div>
        {<Header />}
        
      </div>
    )
  }
}