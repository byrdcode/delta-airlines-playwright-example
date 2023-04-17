//@ts-check
import { Page, Locator, expect } from "@playwright/test";

export class SearchResultsPage{
    readonly page: Page;
    readonly firstFlightResult: Locator;
    readonly continueButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.firstFlightResult = page.locator('(//app-grid-flight-result-container//app-grid-fare-cell/div/div)');
        this.continueButton = page.getByTestId('idp-refundable-modal_body--button-0');
    }

    async selectFirstFlightResult(){
        await this.page.waitForLoadState('networkidle');
        await this.firstFlightResult.first().click();
        await this.continueButton.click();
    }
}