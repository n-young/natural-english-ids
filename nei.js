(function (exports) {
    // External packages.
    const { wordlist } = require("./wordlist.json")
    const { BloomFilter } = require('bloomfilter')
    const CAPITALIZATION_OPTIONS = ["lower", "upper", "title"]

    // Generator Class.
    class NEIGenerator {
        constructor(options) {
            // Extract defaults
            const defaultoptions = {
                length: 3,
                delimiter: "-",
                capitalization: "lower",
                customwords: [],
                onlycustom: false,
                nomemory: false
            }
            options = {...defaultoptions, ...options}

            // Set length.
            this.length = options.length

            // Set delimiter.
            this.delimiter = options.delimiter

            // Set capitalization option.
            if (!CAPITALIZATION_OPTIONS.includes(options.capitalization)) {
                return Error("ERROR: Bad capitalization option.")
            }
            this.capitalization = options.capitalization

            // Set custom words.
            if (options.onlycustom) {
                this.wordlist = options.customwords
            } else {
                this.wordlist = wordlist.concat(options.customwords)
            }

            // Set memory
            if (!options.nomemory) {
                this.memory = new BloomFilter(32 * 256, 16)
            }
        }

        // Generate an ID.
        generate() {
            // Get each word first.
            const choices = []
            for (let i = 0; i < this.length; i++) {

                // Choose a word from the wordlist.
                let index = Math.floor(Math.random() * this.wordlist.length)
                let newword = this.wordlist[index]

                // Capitalize it.
                switch (this.capitalization) {
                    case "lower":
                        newword = newword.toLowerCase()
                        break
                    case "upper":
                        newword = newword.toUpperCase()
                        break
                    case "title":
                        newword = newword.charAt(0).toUpperCase() + newword.substr(1).toLowerCase()
                        break
                    default:
                        return Error("ERROR: Bad capitalization option")
                }

                // Add to list.
                choices.push(newword)
            }

            // Join the words with the delimiter.
            const ret = choices.join(this.delimiter)

            // Test with bloom filter if necessary.
            if (!this.nomemory && this.memory.test(ret)) {
                return this.generate()
            } else {
                this.memory.add(ret)
                return ret
            }
        }
    }

    // Actually export the generator.
    exports.NEIGenerator = NEIGenerator
})(typeof exports !== "undefined" ? exports : this);

