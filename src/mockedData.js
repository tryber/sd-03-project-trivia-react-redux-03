const mockedData = {
  response_code: 0,
  results: [
    {
      category: 'Geography',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which city is the capital of the United States of America?',
      correct_answer: 'Washington D.C',
      incorrect_answers: ['Seattle', 'Albany', 'Los Angeles'],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'hard',
      question:
        'What was the name of the hero in the 80s animated video game &#039;Dragon&#039;s Lair&#039;?',
      correct_answer: 'Dirk the Daring',
      incorrect_answers: ['Arthur', 'Sir Toby Belch', 'Guy of Gisbourne'],
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What does the &quot;MP&quot; stand for in MP3?',
      correct_answer: 'Moving Picture',
      incorrect_answers: ['Music Player', 'Multi Pass', 'Micro Point'],
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'hard',
      question: 'What is the British term for a 64th note?',
      correct_answer: 'Hemidemisemiquaver',
      incorrect_answers: [
        'Semihemidemisemiquaver',
        'Semiquaver',
        'Demisemiquaver',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'In &quot;PAYDAY 2&quot;, what weapon has the highest base weapon damage on a per-shot basis?',
      correct_answer: 'HRL-7',
      incorrect_answers: [
        'Heavy Crossbow',
        'Thanatos .50 cal',
        'Broomstick Pistol',
      ],
    },
  ],
};

export default mockedData;
