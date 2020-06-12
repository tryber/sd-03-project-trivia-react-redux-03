import React from 'react';
/* import { connect } from 'react-redux';
import PropTypes from 'prop-types'; */
import { triviaAPI } from '../services/api';
import Loading from './Loading';
import Feedback from '../pages/Feedback'
import { connect } from 'react-redux';
import { scoreReducer } from '../actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      score: 0,
      isLoading: true,
      questions: [],
      remainingTime: 30,
      finishedQuestion: false,
    };
  }

  componentDidMount() {
    triviaAPI().then((questions) => {
      this.setState({
        currentQuestion: 1,
        questions,
      });
    });
  }

  decremenTime(time) {
    this.setState({remainingTime: time - 1});
  }

  selectCorrectAnswer(level) {
    const { remainingTime } = this.state;
    const { addScore } = this.props;
    alert('Certa a resposta');
    this.setState({ finishedQuestion: true });
    switch (level) {
      case 'easy':
        addScore(1*remainingTime);
        break;
      case 'medium':
        addScore(2*remainingTime);
        break;
      case 'hard':
        addScore(3*remainingTime);
        break;
      default:
        break;
    }
  }

  selectWrongAnswer(timedOut) {
    timedOut ? alert('Aaaaaaaahhhh não dá mais não, o seu tempo acabou') :
    alert('Que pena... você errou!');
    this.setState({finishedQuestion: true});
  }

  generateOptions(type, correct, wrong, diff_level) {
    if (type === 'multiple') {
      const answers = [
        { id: 0, text: correct, is_correct: true },
        { id: 1, text: wrong[0], is_correct: false },
        { id: 2, text: wrong[1], is_correct: false },
        { id: 3, text: wrong[2], is_correct: false },
      ];
      answers.sort((a, b) => 0.5 - Math.random());
      return (
        answers.map((answer, index) => {
          if (answer.is_correct) {
            return (
              <button
                key={answer.id}
                data-testid="correct-answer"
                disabled={this.state.finishedQuestion}
                onClick={() => this.selectCorrectAnswer(diff_level)}
              >
                {answer.text}
              </button>
            )
          }
          return (
            <button
              key={answer.id}
              data-testid={`wrong-answer-${index}`}
              disabled={this.state.finishedQuestion}
              onClick={() => this.selectWrongAnswer(false)}
            >
              {answer.text}
            </button>)
        }
        )
      )
    } else {
      return (
        <ul>
          <button onClick={() => this.selectCorrectAnswer()}>{correct}</button>
          <button onClick={() => this.selectWrongAnswer(false)}>{wrong}</button>
        </ul>
      );
    }
  }

  displayQuestion() {
    const { currentQuestion, questions } = this.state;
    const {
      type,
      category,
      difficulty,
      correct_answer,
      incorrect_answers,
      question } = questions[currentQuestion];
    return (
      <div>
        <h3 data-testid="question-category">Categoria: {category}</h3>
        <h3 data-testid="question-text">
          Questão {currentQuestion}: {question}
        </h3>
        { this.generateOptions(
          type, correct_answer, incorrect_answers, difficulty
          )
        }
      </div>
    );
  }

  render() {
    const { currentQuestion, remainingTime } = this.state;
    switch (currentQuestion) {
      case 0:
        return <Loading />;
      case 5:
        return (<div>{<Feedback />}</div>);
      default:
        return (
          <div>
            {this.displayQuestion()}
            <p>Tempo restante: {remainingTime}</p>
            <button
              className="btn-next"
              data-testid="btn-next"
              onClick={() => this.setState({
                currentQuestion: currentQuestion + 1,
                finishedQuestion: false
              })}
            >Próxima</button>
          </div>
        );
    }
  }
}

// setTimeout(() => {
//   this.decremenTime(remainingTime);
// }, 1000);

const mapDispatchToProps = (dispatch) => ({
  addScore: (event) => dispatch(scoreReducer(event)),
});

export default connect(null, mapDispatchToProps)(Questions);
