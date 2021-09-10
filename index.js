const argv = require('minimist')(process.argv.slice(2));
const {getMovies} = require('./scraper');
const {createSwaggerFile} = require('./swagger');
const {CLI_OPTIONS} =require('./constants');

createSwagger();

function createSwagger() {
    let movieTitles = parseMovieTitles(argv);
    let swaggerExampleSections = parseSwaggerExampleSections(argv);

    getMovies(movieTitles).then(movies => {
        createSwaggerFile(movies, swaggerExampleSections);
    });
}

function parseMovieTitles() {
    let movieTitleArgs = argv[CLI_OPTIONS.MOVIES];
    return typeof movieTitleArgs === 'object' ? movieTitleArgs : [movieTitleArgs];
}

function parseSwaggerExampleSections() {
    let swaggerExampleSectionArgs = argv[CLI_OPTIONS.SWAGGER_SECTIONS];
    return typeof swaggerExampleSectionArgs === 'object' ? swaggerExampleSectionArgs : [swaggerExampleSectionArgs];
}

