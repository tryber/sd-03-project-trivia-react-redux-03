import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, timeOut } from '../actions/actionsCreators';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 30,
      timerStarted: false,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentWillUnmount() {
    clearInterval(this.handleTimer());
  }

  handleTimer() {
    this.setState({ seconds: 30 });
    return setInterval(() => {
      const { seconds, timerStarted } = this.state;
      const { questionAnswered, startTimer, endTimer } = this.props;
      if (seconds > 0 && questionAnswered === false) {
        return this.setState((state) => ({
          seconds: state.seconds - 1,
          timerStarted: !state.timerStarted,
        }));
      }
      if (seconds === 0 && questionAnswered === false) {
        endTimer();
        return clearInterval(this.handleTimer());
      }
      if (questionAnswered === true && timerStarted === true) {
        clearInterval(this.handleTimer());
        startTimer(seconds);
        return this.setState({ timerStarted: false });
      }
      return clearInterval(this.handleTimer());
    }, 1000);
  }

  render() {
    const { seconds } = this.state;
    return (
      <section>
        <h5>
          {`Tempo Restante: 
          ${seconds}
          `}
        </h5>
      </section>
    );
  }
}

Timer.propTypes = {
  questionAnswered: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  endTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionAnswered: state.gameInfo.answered,
});

const mapDispatchToProps = (dispatch) => ({
  startTimer: (seconds) => dispatch(setTimer(seconds)),
  endTimer: () => dispatch(timeOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
