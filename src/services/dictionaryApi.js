const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function getWordData(word) {
  // 1. Agar so'z kiritilmagan bo'lsa yoki faqat bo'sh joy bo'lsa, to'xtatish
  if (!word || word.trim() === "") {
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/${word}`);

    if (!response.ok) {
      // 2. API o'zi qaytargan xatolik tafsilotlarini olish
      const errorData = await response.json();
      throw new Error(errorData.title || "Word not found");
    }

    const data = await response.json();
    return data[0];

  } catch (error) {
    // Xatolikni konsolga aniqroq chiqarish
    console.error("Lug'at API xatoligi:", error.message);
    return null; 
  }
}