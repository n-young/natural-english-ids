const { NEIGenerator } = require("./nei")

const options = {
    length: 4,
    delimiter: "-",
    capitalization: "lower",
    // customwords: ["dog", "abba"],
    // onlycustom: true
    nomemory: false
}
const gen = new NEIGenerator(options)
console.log(gen)
console.log(gen.generate())