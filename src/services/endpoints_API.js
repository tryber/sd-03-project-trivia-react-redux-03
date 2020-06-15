// Obtendo token da API Trivia
export const getTriviaToken = async () => {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(TOKEN_URL);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

// Obtendo categorias da API Trivia
export const getTriviaCategories = async () => {
  const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
  const response = await fetch(CATEGORIES_URL);
  const json = await response.json();
  const data = await await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

// Obtendo questões da API Trivia
export const getTriviaQuestions = async (
  token,
  categoryID,
  difficulty,
  type,
) => {
  const QUESTIONS_URL = `https://opentdb.com/api.php?amount=5&category=${categoryID}&difficulty=${difficulty}&type=${type}&token=${token}`;
  const response = await fetch(QUESTIONS_URL);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};
