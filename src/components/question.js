import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  generateOptions(type) {
    const { correct_answer, incorrect_answers } = this.props.question
    if (type === 'multiple') {
      const shuffleOptions = [
        { id: 0, text: correct_answer, is_correct: true },
        { id: 1, text: incorrect_answers[0], is_correct: false },
        { id: 2, text: incorrect_answers[1], is_correct: false },
        { id: 3, text: incorrect_answers[2], is_correct: false },
      ]
      shuffleOptions.sort((a, b) => a - b);
      return (
        shuffleOptions.map((opt) => {
          if (opt.is_correct)
             return (<button data-testid="correct-answer">{opt.text}</button>)
             return (<button data-testid="wrong-answer-">{opt.text}</button>)
          }
        )
      )
    } else { return (
      <ul>
        <button>{correct_answer}</button>
        <button>{incorrect_answers}</button>
      </ul>
      );
    }  
  }

  render() {
    const { category, type, question } = this.props.question;
    return (
      <div className="question">
        <h3 data-testid="question-category">{category}</h3>
        <h2 data-testid="question-text">{question}</h2>
        {this.generateOptions(type)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // boolquestion: state.dualChoice.question,
  // multquestion: state.multipleChoice.question,
  }
);

export default connect(mapStateToProps)(Question);
