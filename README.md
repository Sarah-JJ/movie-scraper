### Movies Web Scraper/Swagger Creator
***

This script scrapes some movies' information from IMDB. The user selects the movies by passing them as command line arguments.

Then the script formats the results, and creates a minimal Swagger file, filling the 'components: examples' section with the movies scraped.

I created this project, because I need some mock data for a personal frontend project. 


### Example
***
Download or clone the project, then in the project directory, type the following command:

```
node index.js --movies={'underworld','interstellar','the martian'} --swaggerExampleSections={'HighestRated','Popular'}
```

This will create the Swagger file (swagger.json) in the same directory.
