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
        //Remove all punctuations, split by whitespace, and lowercase all word for comparison test
        text = text.replace(/[^\w\s]|_/g, "").split(/\s+/).map(word => word.toLowerCase());

        for (let i = 0; i < text.length; i++) {
            let word = text[i];
            if (/^\s*$/.test(word)) {
                //Delete table if word is only whitespace
                let tableToRemove = document.getElementById("root").getElementsByTagName("table")[0];

                if (tableToRemove) {
                    tableToRemove.parentNode.removeChild(tableToRemove);
                }
                return;
            }

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

        //Remove existing table for update
        let tableToRemove = document.getElementById("root").getElementsByTagName("table")[0];

        if (tableToRemove) {
            tableToRemove.parentNode.removeChild(tableToRemove);
        }

        //Add frequency table
        const table = document.createElement("table");
        document.getElementById("root").appendChild(table);

        const thead = document.createElement("thead");
        table.appendChild(thead);

        const thead_tr = document.createElement("tr");
        thead.appendChild(thead_tr);

        const thead_th_1 = document.createElement("th");
        thead_th_1.textContent = "word_name";
        thead_tr.appendChild(thead_th_1);

        const thead_th_2 = document.createElement("th");
        thead_th_2.textContent = "word_frequency";
        thead_tr.appendChild(thead_th_2);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        for (let i = 0; i < Math.min(sortedFreqArray.length, 5); i++) {
            const [key, value] = sortedFreqArray[i];
            
            //Create row contents
            const tbody_tr = document.createElement("tr");
            tbody.appendChild(tbody_tr);

            const word = document.createElement("td");
            word.textContent = key;
            tbody_tr.append(word);
            
            const word_freq = document.createElement("td");
            word_freq.textContent = value;
            tbody_tr.append(word_freq);

        }
    })

    document.getElementById("root").appendChild(button);
})