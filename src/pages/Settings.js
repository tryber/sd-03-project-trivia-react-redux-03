import React from 'react';
import { connect } from 'react-redux';
import { generatedURL } from '../actions';
import { Link } from 'react-router-dom';


class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'any',
      trivia_difficulty: 'any',
      trivia_type: 'any',
    };
  }

  generateURL() {
    const { category, trivia_difficulty, trivia_type } = this.state;
    const URL = `https://opentdb.com/api.php?amount=5${category !== 'any' ? `&category=${category}` : ''}${trivia_difficulty !== 'any' ? `&difficulty=${trivia_difficulty}` : ''}${trivia_type !== 'any' ? `&type=${trivia_type}` : ''}`;
    this.props.dispatch2Fetch(URL);
  }

  renderCategoriesList() {
    return (
      <select
        name="category"
        value={this.state.category}
        onChange={(e) => this.setState({ category: e.target.value })}>
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science 'n' Nature</option>
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

  render() {
    return (
      <fieldset className="settings">
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="trivia_category">Selecione a categoria: </label>
        {this.renderCategoriesList()}
        <label htmlFor="trivia_difficulty">Select Difficulty: </label>
        <select
          name="trivia_difficulty"
          value={this.state.trivia_difficulty}
          onChange={(e) => this.setState({ trivia_difficulty: e.target.value })}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
		    </select>
        <label htmlFor="trivia_type">Select Type: </label>
        <select
          name="trivia_type"
          value={this.state.trivia_type}
          onChange={(e) => this.setState({ trivia_type: e.target.value })}>
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        <Link to='/'>
          <button onClick={() => this.generateURL()}>Salvar.</button>
        </Link>
      </fieldset>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch2Fetch: (url) => dispatch(generatedURL(url)),
});

export default connect (null, mapDispatchToProps)(Settings);
