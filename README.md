### Movies Web Scraper/Swagger Creator
***

This script scrapes some movies' information from IMDB, and the trailer URL from YouTube. The user selects the movies by passing them as command line arguments.

Then the script scrapes the data, formats the results, and creates a minimal Swagger file, filling the 'components: examples' section with the data scraped.

I created this project, because I needed some mock data for a personal frontend project. 


### Example
***
Download or clone the project, and install the dependencies. Then in the project directory, run the program with this command format:

```
node index.js --movies={'underworld','interstellar','the martian'} --swaggerExampleSections={'HighestRated','Popular'}
```

This will create the Swagger file (swagger.json) in the same directory.
