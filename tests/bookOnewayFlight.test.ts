//@ts-check
import {test, expect} from "@playwright/test";
import { BookFlightPage } from "../pages/book-flight-page";
import { CabinExperience } from "../constants/cabinExperiences";
import { TripType } from "../constants/tripTypes";
import {Airport} from "../constants/airportCodes";
import { SearchResultsPage } from "../pages/search-results-page";

test('Book first class one-way delta flight seven days in the future', async({page}) => {
    await page.goto(`/flight-search/book-a-flight`);

    const bookFlightPage = new BookFlightPage(page);
    await page.waitForLoadState('networkidle');
    await page.screenshot({path: 'screenshots/bookFlightPageScreenshot.png'});
    await bookFlightPage.submitFlightInfo(Airport.Portland, Airport.Seattle, TripType.OneWay, CabinExperience.First, 7);
    const searchResultsPage = new SearchResultsPage(page);
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({path: 'screenshots/searchResultsPageScreenshot.png'});
    await searchResultsPage.selectFirstFlightResult();
    expect(page.getByTitle('Trip Summary', {exact:false})).toBeTruthy;
    await (page.getByRole('heading', { name: 'Trip Summary'})).isVisible();
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({path: 'screenshots/tripSummaryPageScreenshot.png'});
    
});