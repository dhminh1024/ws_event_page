function generateRandomLetter(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}
function shuffleArray<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
        throw new Error("Input must be an array");
    }
    
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    
    return array;
}

export function generateArrayWithRandomLetters(letter: string, length: number): string[] {
    if (length <= 0) {
        throw new Error("Length must be a positive number");
    }

    const result: string[] = Array.from(Array(length-1).keys()).reduce<string[]>((prev) => {
        let rand_letter;
        do {
            rand_letter = generateRandomLetter();
        } while (rand_letter === letter || prev.includes(rand_letter));
        prev.push(rand_letter);
        return prev;
    },[]); 
    // console.log(result)
    result.push(letter);
    return shuffleArray(result);
}

export function nl2br(str: string, is_xhtml: boolean = true) {
    const breakTag =
      is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      '$1' + breakTag + '$2',
    );
  }
  