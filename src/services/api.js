const urlToken = 'https://opentdb.com/api_token.php?command=request';
const urlTrivia = 'https://opentdb.com/api.php?amount=5';

export async function tokenPlayer() {
  return fetch(urlToken)
    .then((response) => response.json())
    .then((resJson) => resJson.token);
}

export async function triviaAPI() {
  return fetch(urlTrivia)
    .then((response) => response.json())
    .then((respJSON) => respJSON.results);
}
