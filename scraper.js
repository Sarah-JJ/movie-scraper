const {HOST_NAME} = require("./constants");
const {Builder, By, until} = require('selenium-webdriver');


async function getMovies(titles) {

    let driver = await getDriver();

    let movies = [];

    for (let title of titles)
        movies.push(await getMovie(title, driver))

    await quitDriver(driver);

    return movies;
}

async function getMovie(title, driver) {

    let uriEncodedTitle = encodeURIComponent(title);

    let link = await getMovieLink(uriEncodedTitle, driver);
    let movie = await getMovieDetails(link, driver);

    movie.overview = await getMovieOverview(link, driver);

    movie.trailerUrl = await getMovieTrailerLink(title, driver);

    return movie;
}

async function getMovieLink(titleQueryString, driver) {

    await driver.get(`https://${HOST_NAME.IMDB}/find?q=${titleQueryString}`);
    await driver.wait(until.elementLocated(By.css('.findResult.odd')), 10000);
    let url = await driver.findElement(By.css('.findResult.odd .result_text a')).getAttribute('href');
    url = url.split('?')[0];

    return url;
}

async function getMovieDetails(link, driver) {

    let movie = {
    };

    await driver.get(link);
    await driver.wait(until.elementLocated(By.css('h1.TitleHeader__TitleText-sc-1wu6n3d-0')), 10000);

    movie.id = link.split('/')[4];
    movie.title = await driver.findElement(By.css('h1.TitleHeader__TitleText-sc-1wu6n3d-0')).getText();

    let detailsList = driver.findElement(By.css('.dxizHm'));
    let items = await detailsList.findElements(By.css('li'));

    movie.releaseDate = await items[0].getText();
    movie.ageRating = await items[1].getText();
    movie.runtime = await items[2].getText();

    let genresElements = await driver.findElements(By.css('.GenresAndPlot__GenreChip-cum89p-3'));

    movie.genres = [];

    for (let e of genresElements) {
        movie.genres.push(await e.getText());
    }

    movie.rating = parseFloat(await driver.findElement(By.css('.iTLWoV')).getText());
    movie.rateCount = parseInt(await driver.findElement(By.css('.jkCVKJ')).getText());

    let starsList = driver.findElement(By.css('li.ipc-metadata-list__item.ipc-metadata-list-item--link div.ipc-metadata-list-item__content-container ul.ipc-inline-list'));
    let starsListItems = await starsList.findElements(By.css('li a'));

    movie.stars = [];

    for (let e of starsListItems) {
        movie.stars.push(await e.getText());
    }

    let posterSrcset = await driver.findElement(By.css('.ipc-poster__poster-image.ipc-media__img img')).getAttribute('srcset');
    const posterUrlRegex = /.*?190w,.*?285w,\s(.*?)380w/;
    let posterUrl = posterSrcset.match(posterUrlRegex)[1].trim();

    movie.posterUrl = posterUrl;

    return movie;
}

async function getMovieOverview(link, driver) {

    await driver.get(link + 'plotsummary');
    await driver.wait(until.elementLocated(By.css('#plot-summaries-content')), 10000);

    let summariesList = driver.findElement(By.css('#plot-summaries-content'));
    let secondSummary = await summariesList.findElement(By.css('li:nth-child(2) p'));

    return await secondSummary.getText();
}

async function getMovieTrailerLink(uriEncodedTitle, driver) {
    let url;

    await driver.get('https://' + HOST_NAME.YOUTUBE + `results?search_query=${uriEncodedTitle}`);
    await driver.wait(until.elementLocated(By.css('#video-title')), 10000);
    url = await driver.findElement(By.id('video-title')).getAttribute('href');

    return url;
}

async function getDriver() {
    let builder = await new Builder().forBrowser('firefox').build();
    return builder;
}

async function quitDriver(driver) {
    await driver.quit();
}

module.exports = {getMovies};
