import React from 'react';
import PropTypes from 'prop-types';
import shuffleQuestions from '../services/shuffleQuestions';
import '../styles/TriviaCard.css';
import Timer from './Timer';

const answers = ({
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswers,
}) => [
  ...Object.values({ correctAnswer }),
  ...Object.values({ ...incorrectAnswers }),
];

const findCorrectAnswer = (array, { correct_answer: correctAnswer }) => array
  .find((item) => item === correctAnswer);

const TriviaCard = ({
  data, disabled, onCorrect, onWrong,
}) => {
  const randomTriviaAnswers = shuffleQuestions(answers(data));
  return (
    <section className="trivia-card">
      <p data-testid="question-category" className="trivia-data">
        Categoria:
        {data.category}
      </p>
      <p className="trivia-data">
        Tipo:
        {data.type}
      </p>
      <p className="trivia-data">
        Nível:
        {data.difficulty}
      </p>
      <p data-testid="question-text" className="trivia-question">
        {data.question}
      </p>
      {randomTriviaAnswers
        .map((answer, index) => (answer === findCorrectAnswer(randomTriviaAnswers, data) ? (
          <button
            type="button"
            data-testid="correct-answer"
            key={answer}
            onClick={onCorrect}
            disabled={disabled}
            className={
              disabled ? 'trivia-button correct-answer' : 'trivia-button'
            }
          >
            {answer}
          </button>
        ) : (
          <button
            type="button"
            data-testid={`wrong-answer-${index}`}
            key={answer}
            onClick={onWrong}
            disabled={disabled}
            className={
              disabled ? 'trivia-button incorrect-answer' : 'trivia-button'
            }
          >
            {answer}
          </button>
        )))}
      <Timer />
    </section>
  );
};

TriviaCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onCorrect: PropTypes.func.isRequired,
  onWrong: PropTypes.func.isRequired,
};

export default TriviaCard;
