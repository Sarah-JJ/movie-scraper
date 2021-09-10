fs = require('fs');

const createSwaggerFile = (movies, swaggerExampleSections) => {

    let examples = createExamples(movies, swaggerExampleSections);

    let swaggerJson = {
        openApi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Movies API"
        },
        paths: {},
        components: {
            examples: examples
        }
    };

    fs.writeFile('swagger.json', JSON.stringify(swaggerJson),  (err) => {
        if (err) return console.log(err);
    });
}

const createExamples = (movies, swaggerExampleSections) => {

    let example = {
        value: {
            status: true,
            value: {
                totalCount: movies.length,
                data: movies
            }
        }
    }

    let examples = {};

    swaggerExampleSections.forEach((sectionTitle) => {
        examples[sectionTitle] = example;
    });

    return examples;
}

module.exports = {createSwaggerFile}
