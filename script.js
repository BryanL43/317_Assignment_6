//DOMContentLoaded to prevent error on unloaded content
document.addEventListener("DOMContentLoaded", function() {

    //Create textarea
    const textarea = document.createElement("textarea");
    document.getElementById("root").appendChild(textarea);

    //Create submit button
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";

    //Submit button handler
    button.addEventListener("click", function() {
        let unsortedFreq = {};

        let text = textarea.value;
        text = text.split(/\s+/);

        for (let i = 0; i < text.length; i++) {
            let word = text[i];
            if (!unsortedFreq.hasOwnProperty(word)) {
                unsortedFreq[word] = 1;
            } else {
                unsortedFreq[word]++;
            }
        }

        console.log("Unsorted frequency object:");
        console.log(unsortedFreq);

        let sortedFreqArray = Object.entries(unsortedFreq).sort((a, b) => b[1] - a[1]);

        let sortedFreq = {};
        for (const [key, value] of sortedFreqArray) {
            sortedFreq[key] = value;
        }

        console.log("Sorted frequency object:");
        console.log(sortedFreq);

        let returnString = "The 5 most frequent words are:\n";
        
        for (let i = 0; i < Math.min(sortedFreqArray.length, 5); i++) {
            const [key, value] = sortedFreqArray[i];
            returnString += key + ": " + value;

            //Some fancy comma stuff
            if (i < Math.min(sortedFreqArray.length, 5) - 1) {
                returnString += ", ";
            }
        }

        textarea.value = returnString;
    })

    document.getElementById("root").appendChild(button);
})