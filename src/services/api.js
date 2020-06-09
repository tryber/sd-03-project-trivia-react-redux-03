const urlToken = 'https://opentdb.com/api_token.php?command=request';

async function tokenPlayer() {
  return fetch(urlToken)
    .then((response) => response.json())
    .then((resJson) => resJson.token);
}

export default tokenPlayer;
