# Natural English IDs

This is a package that lets you generate natural probably-unique IDs using english words.

It allows you to specify word delimiters, capitalizations, and custom words.

A unique feature is the option to turn on memory, which will ensure that a generator will never generate two of the same ID. It achieves this using a [Bloom Filter](https://llimllib.github.io/bloomfilter-tutorial/).

## Installation

`npm i natural-english-ids`

## Usage

Create a new ID Generator using:
```js
const gen = new NEIGenerator(options)
```


Options takes a few parameters:
```js
const options = {
    length: 3,
    delimiter: "-",
    capitalization: "title",
    customwords: ["dog", "abba"],
    onlycustom: false,
    nomemory: false
}
```

`length` should be an integer specifying the number of words in the generated id. Defaults to 3.

`delimiter` can be any string, and is what separates the words in the generated word. Defaults to "-".

`capitalization` can be either "lower", "upper", or "title", which are all lowercase, all uppercase, and title case respectively. Defaults to lower.

`customwords` is a list of strings that you would like to include in the generated word list. Defaults to the empty list.

`onlycustom` should be set to true if you would like to only use custom words and no others. Defaults to false.

`nomemory` toggles the use of an internal Bloom Filter to ensure nonduplicity of generated IDs. Defaults to false.


Generate using:
```js
const nei = gen.generate()
```


### Bloom Filter Hyperparameters

This package uses [this](https://www.npmjs.com/package/bloomfilter) implementation of a bloom filter with 32 * 256 bits and 16 hash functions by default. I don't see a real need to change these parameters but, in the future, I may let these parameters be tweaked.


## Issues

I would love to support parts of speech, but I just need this working right now.

I would also like to clean the current word list (the original was borrowed from the [xkcd password generator](https://xkpasswd.net/s/)). I've removed words that could be included in problematic word combinations, but it would be nice to do a deeper clean or choose a better word list.

It'd be nice if the bloom filter could clear after it has 10 rejections in a row; that way we can protect against an overfull filter.

## Contributing

Feel free to make pull requests and contribute to this project! A list of potential contributions can be found in the Issues tab. 
