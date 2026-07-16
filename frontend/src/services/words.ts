import wordsJSON from "../assets/words/words.json";

function loadWords(listLength: number): Record<string, string> {
    // Create the adjacency list of type Record<string, Record<number, string[]>>
    //  - The list is indexed using the name of initial word, which returns a record
    //  - This record represents all words adjacent to the word used to access it
    //  - This record is indexed using integers representing the indices of the word's characters
    //  - For example, a four-letter word returns a record with four keys: 0, 1, 2, and 3
    //  - Indexing the inner record by an integer yields the words adjacent to the first word and differ in the character corresponding to the integer index
    //  - For example, adjacencyList["test"][0] might yield ["pest", "west", "fest"]
    //  - Additionally, adjacencyList["wish"][1] might yeild ["wash"]
    const wordsDictionary: Record<string, string> = wordsJSON;
    const charactersPerWord: number = Object.keys(wordsDictionary)[0].length;
    const wordsList: [string, string][] = Object.entries(wordsJSON)
    const numWords: number = wordsList.length;
    let adjacencyList: Record<string, Record<number, string[]>> = {};
    for (const [word] of wordsList) {
        adjacencyList[word] = {};
        for (let i: number = 0; i < charactersPerWord; i++) {
            adjacencyList[word][i] = [];
        }
    }
    for (let i: number = 0; i < numWords; i++) {
        const word1: string = wordsList[i][0];
        for (let j: number = i + 1; j < numWords; j++) {
            const word2: string = wordsList[j][0];
            const diffCharacterIndex: number = getAdjacentDifferenceIndex(word1, word2);
            if (diffCharacterIndex >= 0) {
                adjacencyList[word1][diffCharacterIndex].push(word2);
                adjacencyList[word2][diffCharacterIndex].push(word1);
            }
        }
    }

    // Generate the word ladder of type [string, string][] from the adjacency list
    //  - The list is of size listLength
    //  - The first string is the word and the second string is its definition
    const maxRetries: number = 100;
    let currentTry: number = 0;
    let wordLadder: [string, string][] = [];
    let ladderWords: Set<string> = new Set<string>();
    while (currentTry < maxRetries) {

        // Get the starting word for the ladder by selecting a random word in the list
        wordLadder = [];
        ladderWords = new Set<string>();
        let currentIndex: number = getRandomInt(0, Object.keys(adjacencyList).length - 1);
        let currentWord: string = Object.keys(adjacencyList)[currentIndex];
        let currentDefinition: string = wordsDictionary[currentWord];
        let previousDifferentCharacterIndex: number = -1;
        wordLadder.push([currentWord, currentDefinition]);
        ladderWords.add(currentWord);

        // Fill the rest of the ladder
        for (let i: number = 0; i < listLength - 1; i++) {
            let adjacentWords: [string, number][] = [];
            for (let j: number = 0; j < charactersPerWord; j++) {
                if (j !== previousDifferentCharacterIndex) {
                    let numAdjacentWords: number = adjacencyList[currentWord][j].length;
                    for (let k = 0; k < numAdjacentWords; k++) {
                        const adjacentWord: string = adjacencyList[currentWord][j][k];
                        if (!ladderWords.has(adjacentWord)) {
                            adjacentWords.push([adjacentWord, j]);
                        }
                    }
                }
            }

            // If there are no adjacent words to the current word, start over
            if (adjacentWords.length === 0) {
                break;
            }
            const randomIndex: number = getRandomInt(0, adjacentWords.length - 1);
            currentWord = adjacentWords[randomIndex][0];
            currentDefinition = wordsDictionary[currentWord];
            previousDifferentCharacterIndex = adjacentWords[randomIndex][1];
            wordLadder.push([currentWord, currentDefinition]);
            ladderWords.add(currentWord);
        }
        if (wordLadder.length === listLength) {
            break;
        }
        console.log("Word Ladder generation reached a stalemate. Trying again...");
        currentTry += 1;
    }
    return Object.fromEntries(wordLadder);
}

function getAdjacentDifferenceIndex(word1: string, word2: string): number {
    const noIndex: number = -1;
    const wordLength = word1.length;
    if (wordLength !== word2.length) {
        return noIndex;
    }
    let diffCharacterIndex: number = noIndex;
    for (let i = 0; i < wordLength; i++) {
        if (word1[i] !== word2[i]) {
            if (diffCharacterIndex !== noIndex) {
                return noIndex;
            }
            diffCharacterIndex = i;
        }
    }
    return diffCharacterIndex;
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default loadWords;