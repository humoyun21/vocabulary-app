export async function translateToUzbek(text) {

  try {

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=en|uz`
    );

    const data = await response.json();

    return data.responseData.translatedText;

  } catch (error) {

    console.log(error);

    return "Tarjima topilmadi";
  }
}