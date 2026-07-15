import wordsJSON from "../assets/words/words.json";

function loadWords(): Record<string, string> {
    let words: Record<string, string> = Object.fromEntries(
      Object.entries(wordsJSON).slice(0, 10),
    );
    return words;
}

export default loadWords;