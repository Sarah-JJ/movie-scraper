const argv = require('minimist')(process.argv.slice(2));
const {getMovies} = require('./scraper');
const {createSwaggerFile} = require('./swagger');
const {CLI_OPTIONS} =require('./constants');

createSwagger();

function createSwagger() {
    let movieTitles = getArgAsArray(argv, CLI_OPTIONS.MOVIES);
    let swaggerExampleSections = getArgAsArray(argv, CLI_OPTIONS.SWAGGER_SECTIONS);

    getMovies(movieTitles).then(movies => {
        createSwaggerFile(movies, swaggerExampleSections);
    });
}

function getArgAsArray(argv, argName) {
    let arg = argv[argName];
    return typeof arg === 'object' ? arg : [arg];
}

