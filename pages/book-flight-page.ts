//@ts-check
import { Page, Locator, expect } from "@playwright/test";


export class BookFlightPage{
    readonly page: Page;
    readonly fromAirportSelect: Locator;
    readonly toAirportSelect: Locator;
    readonly tripTypeDropDown: Locator;
    readonly tripTypeSelection: Locator;
    readonly oneWayDropDownSelection: Locator;
    readonly departureDateSelect: Locator;
    readonly orignSearchInput: Locator;
    readonly airportCodeLink: Locator;
    readonly datePicker: Locator;
    readonly datePickerDoneButton: Locator;
    readonly datePickerClearButton: Locator;
    readonly passengersDropDown: Locator;
    readonly shopWithMilesCheckbox: Locator;
    readonly refundableFaresCheckbox: Locator;
    readonly flexibleDatesCheckbox: Locator;
    readonly includeNearbyAirports: Locator;
    readonly bestFaresForDropdown: Locator;
    readonly bestFaresForSelection: Locator;
    readonly meetingCodeTextbox: Locator;
    readonly submitButton: Locator;
    readonly ecreditsLink: Locator;

    constructor(page:Page){
        this.page = page;
        this.fromAirportSelect = page.getByTestId('fromAirportName');
        this.toAirportSelect = page.getByTestId('toAirportName');
        this.orignSearchInput = page.getByTestId('search_input');
        this.airportCodeLink = page.getByRole('link', { name: 'PDX Portland, OR' })
        this.datePicker = page.getByTestId('input_departureDate_1');
        this.datePickerDoneButton = page.getByRole('button', { name: 'done' })
        this.datePickerClearButton = page.getByRole('button', { name: 'clear' });
        this.tripTypeDropDown = page.getByTestId('selectTripType-val');
        this.tripTypeSelection = page.getByTestId('selectTripType');
        this.shopWithMilesCheckbox = page.getByText('Shop with Miles', { exact: true });
        this.refundableFaresCheckbox = page.getByText('Refundable Fares', { exact: true });
        this.flexibleDatesCheckbox = page.getByText('My dates are flexible');
        this.includeNearbyAirports = page.getByText('Include Nearby Airports');
        this.bestFaresForDropdown = page.getByTestId('faresFor-val');
        this.bestFaresForSelection = page.getByTestId('faresFor');
        this.meetingCodeTextbox = page.getByTestId('meetingCode');
        this.submitButton = page.getByTestId('btnSubmit');
        this.ecreditsLink = page.getByTestId('ecredits');

    }

    async submitFlightInfo(fromAirport: {code: string, linkname: string}, toAirport: {code: string, linkname: string}, tripType: string, cabinExperience: string, daysInFuture=0){
        await this.fromAirportSelect.click();
        await this.orignSearchInput.type(fromAirport.code);
        await this.selectAirportCodeLink(fromAirport.linkname);
        await this.toAirportSelect.click();
        await this.orignSearchInput.type(toAirport.code);
        await this.selectAirportCodeLink(toAirport.linkname);
        await this.tripTypeDropDown.click();
        await this.tripTypeSelection.selectOption({value: tripType}, {force:true});
        await this.datePicker.click();
        await this.selectDate(new Date(), daysInFuture);
        await this.bestFaresForDropdown.click();
        await this.bestFaresForSelection.selectOption({value: cabinExperience}, {force: true});
        
        await this.submitButton.click();
        // await this.page.waitForLoadState('networkidle');
        

    }

    async selectAirportCodeLink(airportLinkname : string ){
        await this.page.getByRole('link', { name: `${airportLinkname}` }).click();
    }

    async selectDate(bookingDate: Date, daysInFuture: number){
        const date = require('date-and-time');
        const newBookingDate = date.addDays(bookingDate, daysInFuture)
        const pattern = date.compile('DD MMMM YYYY, dddd');

        await this.page.getByRole('link', { name: `${date.format(newBookingDate, pattern)}`}).click();
    }

}
