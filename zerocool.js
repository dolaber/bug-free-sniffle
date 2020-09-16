// Create an array
// fill it with a value
// then map the index to the output
// log out all values
new Array(100).fill(null).map((val, index) => {
    let output = '';
    ++index;
    if (index % 3 == 0) {
        output += 'Zero';
    }
    if (index % 5 == 0) {
        output += 'Cool';
    }
    if (output === '') {
        output += index;
    }
    return output;
}).forEach((val) => { console.log(val) });