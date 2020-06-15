import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToScore, disabledReducer } from '../actions';
import { triviaAPI } from '../services/api';
import Loading from './Loading';
import Feedback from '../pages/Feedback';
import '../App.css';

function arrayRandom(array, maxRandom) {
  let max = maxRandom;
  let indexRandom = Math.floor(Math.random() * max);
  const arrayLength = array.length;
  let newArray = [];
  for (let i = 0; i < arrayLength; i += 1) {
    newArray = [...newArray, array[indexRandom]];
    array.splice(indexRandom, 1);
    max -= 1;
    indexRandom = Math.floor(Math.random() * max);
  }
  return newArray;
}

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: true,
      arrayAnswers: [],
      enableTimer: true,
      remainingTime: 30,
      currentQuestion: 0,
      disableButtons: false,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
      goToNextBtnClass: 'hideButton',
    };
  }

  componentDidMount() {
    let arrayAnswers = [];
    let arrayItem = [];
    triviaAPI().then((questions) => {
      questions.forEach((item) => {
        arrayItem = [item.correct_answer, ...item.incorrect_answers];
        arrayAnswers = [...arrayAnswers, arrayRandom(arrayItem, arrayItem.length)];
      });
      this.setState({
        isLoading: false,
        questions,
        arrayAnswers,
      });
    });
  }

  onClickNext() {
    const { currentQuestion } = this.state;
    const { disableButtons } = this.props;
    disableButtons(false);
    this.setState({
      currentQuestion: currentQuestion + 1,
      styleCorrectAnswer: {},
      styleIncorrectAnswer: {},
      remainingTime: 30,
      goToNextBtnClass: 'hideButton',
      enableTimer: true,
    });
  }

  /* selectCorrectAnswer(level) {
    const { disableButtons } = this.props;
    disableButtons(true);
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
      enableTimer: false,
    });
    const { remainingTime } = this.state;
    const { addScore } = this.props;
    const playerLocal = JSON.parse(localStorage.getItem('player'));
    console.log(playerLocal);
    let player;
    if (level === 'easy') {
      addScore(1 * remainingTime);
      player = {
        ...playerLocal,
        assertions: playerLocal.assertions + 1,
        score: playerLocal.score + (1 * remainingTime)
      }
      localStorage.setItem('player', JSON.stringify(player))
      } else if (level === 'medium') {
      addScore(2 * remainingTime);
      player = {
        ...playerLocal,
        assertions: playerLocal.assertions + 1,
        score: playerLocal.score + (2 * remainingTime)
      }
      localStorage.setItem('player', JSON.stringify(player))
    } else if (level === 'hard') {
      addScore(3 * remainingTime);
      player = {
        ...playerLocal,
        assertions: playerLocal.assertions + 1,
        score: playerLocal.score + (3 * remainingTime)
      }
      localStorage.setItem('player', JSON.stringify(player))
    }
  } */

  selectWrongAnswer() {
    this.setState({
      styleCorrectAnswer: { border: '3px solid rgb(6, 240, 15)' },
      styleIncorrectAnswer: { border: '3px solid rgb(255, 0, 0)' },
    });
    this.setState({
      goToNextBtnClass: 'displayButton',
      disableButtons: true,
      enableTimer: false,
    });
  }

  buttonCorrect(answer, diffLevel) {
    const { styleCorrectAnswer } = this.state;
    const { disabledTrueFalse } = this.props;
    return (
      <p>
        <button
          key={answer}
          data-testid="correct-answer"
          onClick={() => this.selectCorrectAnswer(diffLevel)}
          style={styleCorrectAnswer}
          disabled={disabledTrueFalse}
        >{answer}
        </button>
      </p>
    );
  }

  buttonIncorrect(answer, index) {
    const { styleIncorrectAnswer } = this.state;
    const { disabledTrueFalse } = this.props;
    return (
      <p>
        <button
          key={answer}
          data-testid={`wrong-answer-${index}`}
          onClick={() => this.selectWrongAnswer(false)}
          style={styleIncorrectAnswer}
          disabled={disabledTrueFalse}
        >{answer}
        </button>
      </p>
    );
  }

  booleanButtons(diffLevel, correctAnswer, incorrectAnswers) {
    const { styleCorrectAnswer, styleIncorrectAnswer } = this.state;
    const { disabledTrueFalse } = this.props;
    return (
      <ul>
        <p>
          <button
            onClick={() => this.selectCorrectAnswer(diffLevel)}
            style={styleCorrectAnswer}
            data-testid="correct-answer"
            disabled={disabledTrueFalse}
          >
            {correctAnswer}
          </button>
        </p>
        <p>
          <button
            onClick={() => this.selectWrongAnswer()}
            style={styleIncorrectAnswer}
            data-testid="wrong-answer-0"
            disabled={disabledTrueFalse}
          >
            {incorrectAnswers}
          </button>
        </p>
      </ul>
    );
  }

  generateOptions(type, correctAnswer, incorrectAnswers, diffLevel) {
    const { arrayAnswers, currentQuestion } = this.state;
    if (type === 'multiple') {
      return (
        arrayAnswers[currentQuestion].map((answer, index) => {
          if (answer === correctAnswer) {
            return this.buttonCorrect(answer, diffLevel, index);
          }
          return this.buttonIncorrect(answer, index);
        }));
    } return this.booleanButtons(diffLevel, correctAnswer, incorrectAnswers);
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
      <div className="question">
        <h3 data-testid="question-category">Categoria: {category}</h3>
        <h3 data-testid="question-text">
          Questão {currentQuestion + 1}: {question}
        </h3>
        {this.generateOptions(type, correct_answer, incorrect_answers, difficulty)}
      </div>
    );
  }

  elapseTime() {
    const { remainingTime, enableTimer } = this.state;
    const { disableButtons } = this.props;
    if (remainingTime > 0 && enableTimer) {
      setTimeout(() => {
        this.setState({ remainingTime: this.state.remainingTime - 1 });
      }, 1000);
    }
    if (remainingTime === 0 && enableTimer) {
      disableButtons(true);
    }
    return (
      <p>Tempo restante: {remainingTime}</p>
    );
  }

  render() {
    const { currentQuestion, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    } else if (currentQuestion === 5) {
      return (<div>{<Feedback />}</div>);
    } return (
      <div className="gameScreen">
        {this.displayQuestion()}
        {this.elapseTime()}
        <button
          data-testid="btn-next"
          onClick={() => this.onClickNext()}
        >Próxima</button>
      </div>
    );
  }
}

Questions.propTypes = {
  /* addScore: PropTypes.func.isRequired, */
  disableButtons: PropTypes.func.isRequired,
  disabledTrueFalse: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  /*  addScore: (event) => dispatch(addToScore(event)), */
  disableButtons: (value) => dispatch(disabledReducer(value)),
});

const mapStateToProps = (state) => ({
  disabledTrueFalse: state.disbledReducer.disabled,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
