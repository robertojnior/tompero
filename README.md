# Node With Tompero

# [![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/robertojnior/node-with-tompero/blob/master/LICENSE)

## About

Node with tompero, it's an API around [Recipe Puppy](http://www.recipepuppy.com/about/api/) and [Giphy](https://developers.giphy.com/docs/), where you send the ingredients and get a list of delicious recipes in return.

## Setup

In order to run the project, you need to install [Docker](https://www.docker.com/) and clone this repository to your local machine:

```shell
git clone git@github.com:robertojnior/node-with-tompero.git
cd node-with-tompero
cp .env.example .env
```

Now you have to fill in the environment variables in the ```.env``` file:

- **RECIPE_PUPPY_BASE_URL**: it's the Recipe Puppy API base URL, by the time of this document was written, was/is http://www.recipepuppy.com/api.

- **GIPHY_BASE_URL**: it's the Giphy API base URL, by the time of this document was written, was/is https://api.giphy.com/v1/gifs/search.

- **GIPHY_API_KEY**: this have to filled with your Giphy API Key, you can get one [here](https://developers.giphy.com/docs/sdk).

- **GIPHY_GIF_FALLBACK_URL**: it's a GIF URL that will be shown when the Giphy API is unavailable, to represent the recipes sought.

## Usage

Enter the project directory and run:

```shell
docker build -t node-with-tompero .
docker run -p 3000:3000 -d node-with-tompero
```

And visit [localhost:3000/recipes](localhost:3000/recipes), in your browser.

With the application running, to get the recipes you must inform the ingredients this way:

```shell
http://localhost:3000/recipes?i=ingredient1,ingredient2
```

For example:

```shell
http://localhost:3000/recipes?i=burguer,tomato,cheddar
```

To research, you must provide one to three ingredients at most.

## Tests

To run the tests, you will need to have the [node](https://nodejs.org/en/download/) installed in your local machine. After installed, enter the project fold and execute:

```shell
cp .env.example .env.test
```

Fill the `.env.test` variables with random values of your choice.

And run:

```shell
npm install
npm run tests
```

## License

[MIT](./LICENSE).
