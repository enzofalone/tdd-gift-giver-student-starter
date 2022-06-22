const { BadRequestError } = require("../utils/errors");

class GiftExchange {
    static pairs(names) {
        let unpairedNames = names;
        let pairedNames = [];

        if ((names.length % 2) === 0) {
            let numPairs = names.length / 2;
            for (let i = 0; i < numPairs; i++) {
                //initialize tuple
                let tuple = [];
                //run for loop for each pair
                for (let j = 0; j < 2; j++) {
                    // pick index to pair
                    let index = Math.floor((Math.random() * names.length));
                    //add name to tuple before removing from unpaired names
                    tuple.push(unpairedNames[index]);
                    unpairedNames.splice(index, 1); //remove it so Math.random does
                }
                pairedNames.push(tuple);
            }
            //return paired list
            return pairedNames

        }  else {
            throw new BadRequestError('Pairings can\'t have a uneven number of users') // Express will catch this on its own.
        }
    }

    static traditional(names) {
        let unpairedNames = names;
        let pairedNames = [];

        if ((names.length % 2) === 0) {
            let areAllPaired = false; // sentinel

            let last;
            let first;

            while (!areAllPaired) {
                let name1, name2;

                //if there is no last name(first iteration) check for two names
                if (!last) {
                    //get two random names and splice them from the array
                    let index1 = Math.floor((Math.random() * names.length));
                    name1 = unpairedNames[index1];
                    unpairedNames.splice(index1, 1);

                    first = name1;

                    let index2 = Math.floor((Math.random() * names.length));
                    name2 = unpairedNames[index2];
                    unpairedNames.splice(index2, 1);

                    last = name2;
                } else {
                    //second name to be picked
                    let index2;

                    // last name from the previous iteration will be the first name
                    name1 = last;

                    if (unpairedNames.length !== 0) {
                        index2 = Math.floor((Math.random() * names.length));
                        name2 = unpairedNames[index2];
                    } else {
                        name2 = first;
                        areAllPaired = true;
                    }

                    unpairedNames.splice(index2, 1);
                    // set last name to be the same 
                    last = name2;
                }

                pairedNames.push(`${name1} is giving a gift to ${name2}`);
            }
            //return paired list
            return pairedNames;

        } else {
            throw new BadRequestError('Pairings can\'t have a uneven number of users')
        }
    }
}
module.exports = GiftExchange;