import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { generatedURL } from '../actions';


class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'any',
      triviaDifficulty: 'any',
      triviaType: 'any',
    };
  }

  generateURL() {
    const { category, triviaDifficulty, triviaType } = this.state;
    const URL = `https://opentdb.com/api.php?amount=5${category !== 'any' ? `&category=${category}` : ''}${triviaDifficulty !== 'any' ? `&difficulty=${triviaDifficulty}` : ''}${triviaType !== 'any' ? `&type=${triviaType}` : ''}`;
    this.props.dispatch2Fetch(URL);
  }

  renderCategoriesList() {
    return (
      <select name="category" value={this.state.category} onChange={(e) => this.setState({ category: e.target.value })}>
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
    );
  }

  renderDifficultiesList() {
    return (
      <select
      name="triviaDifficulty"
      value={this.state.triviaDifficulty}
      onChange={(e) => this.setState({ triviaDifficulty: e.target.value })}
    >
      <option value="any">Any Difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    );
  }

  render() {
    return (
      <fieldset className="settings">
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="trivia_category">Selecione a categoria: </label>
        {this.renderCategoriesList()}
        <label htmlFor="triviaDifficulty">Select Difficulty: </label>
        {this.renderDifficultiesList()}
        <label htmlFor="triviaType">Select Type: </label>
        <select
          name="triviaType"
          value={this.state.triviaType}
          onChange={(e) => this.setState({ triviaType: e.target.value })}
        >
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        <Link to="/">
          <button onClick={() => this.generateURL()}>Salvar.</button>
        </Link>
      </fieldset>
    );
  }
}

Settings.propTypes = {
  dispatch2Fetch: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  dispatch2Fetch: (url) => dispatch(generatedURL(url)),
});

export default connect(null, mapDispatchToProps)(Settings);
