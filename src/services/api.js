const urlToken = 'https://opentdb.com/api_token.php?command=request';

export async function tokenPlayer() {
  return fetch(urlToken)
    .then((response) => response.json())
    .then((resJson) => resJson.token);
}
