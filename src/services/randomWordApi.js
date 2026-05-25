export async function getRandomWord() {

  try {

    const response = await fetch(
      "https://random-word-api.herokuapp.com/word"
    );

    const data = await response.json();

    return data[0];

  } catch (error) {

    console.log(error);

    return null;
  }
}