'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

const expectedH1 = 'Tour of Tours';
const expectedTitle = `${expectedH1}`;
const targetTour = { id: 15, name: 'Magneta' };
const targetTourHomeIndex = 3;
const nameSuffix = 'X';
const newTourName = targetTour.name + nameSuffix;

class Tour {
  id: number;
  name: string;

  // Factory methods

  // Tour from string formatted as '<id> <name>'.
  static fromString(s: string): Tour {
    return {
      id: +s.substr(0, s.indexOf(' ')),
      name: s.substr(s.indexOf(' ') + 1),
    };
  }

  // Tour from tour list <li> element.
  static async fromLi(li: ElementFinder): Promise<Tour> {
      let stringsFromA = await li.all(by.css('a')).getText();
      let strings = stringsFromA[0].split(' ');
      return { id: +strings[0], name: strings[1] };
  }

  // Tour id and name from the given detail element.
  static async fromDetail(detail: ElementFinder): Promise<Tour> {
    // Get tour id from the first <div>
    let _id = await detail.all(by.css('div')).first().getText();
    // Get name from the h2
    let _name = await detail.element(by.css('h2')).getText();
    return {
        id: +_id.substr(_id.indexOf(' ') + 1),
        name: _name.substr(0, _name.lastIndexOf(' '))
    };
  }
}

describe('Tutorial part 6', () => {

  beforeAll(() => browser.get(''));

  function getPageElts() {
    let navElts = element.all(by.css('app-root nav a'));

    return {
      navElts: navElts,

      appHomeHref: navElts.get(0),
      appHome: element(by.css('app-root app-home')),
      topTours: element.all(by.css('app-root app-home > div h4')),

      appToursHref: navElts.get(1),
      appTours: element(by.css('app-root app-tours')),
      allTours: element.all(by.css('app-root app-tours li')),
      selectedTourSubview: element(by.css('app-root app-tours > div:last-child')),

      tourDetail: element(by.css('app-root app-tour-detail > div')),

      searchBox: element(by.css('#search-box')),
      searchResults: element.all(by.css('.search-result li'))
    };
  }

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it(`has h1 '${expectedH1}'`, () => {
        expectHeading(1, expectedH1);
    });

    const expectedViewNames = ['Home', 'Tours'];
    it(`has views ${expectedViewNames}`, () => {
      let viewNames = getPageElts().navElts.map((el: ElementFinder) => el.getText());
      expect(viewNames).toEqual(expectedViewNames);
    });

    it('has home as the active view', () => {
      let page = getPageElts();
      expect(page.appHome.isPresent()).toBeTruthy();
    });

  });

  describe('Home tests', () => {

    beforeAll(() => browser.get(''));

    it('has top tours', () => {
      let page = getPageElts();
      expect(page.topTours.count()).toEqual(4);
    });

    it(`selects and routes to ${targetTour.name} details`,
        //homeSelectTargetTour
        );

    it(`updates tour name (${newTourName}) in details view`, updateTourNameInDetailView);

    it(`cancels and shows ${targetTour.name} in Tour`, () => {
      element(by.buttonText('go back')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetTourElt = getPageElts().topTours.get(targetTourHomeIndex);
      expect(targetTourElt.getText()).toEqual(targetTour.name);
    });

    it(`selects and routes to ${targetTour.name} details`,
        //homeSelectTargetTour
        );

    it(`updates tour name (${newTourName}) in details view`, updateTourNameInDetailView);

    it(`saves and shows ${newTourName} in Tour`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

      let targetTourElt = getPageElts().topTours.get(targetTourHomeIndex);
      expect(targetTourElt.getText()).toEqual(newTourName);
    });

  });

  describe('Tours tests', () => {

    beforeAll(() => browser.get(''));

    it('can switch to `Tours view', () => {
      getPageElts().appToursHref.click();
      let page = getPageElts();
      expect(page.appTours.isPresent()).toBeTruthy();
      expect(page.allTours.count()).toEqual(10, 'number of tours');
    });

    it('can route to tour details', async () => {
      getTourLiEltById(targetTour.id).click();

      let page = getPageElts();
      expect(page.tourDetail.isPresent()).toBeTruthy('shows tour detail');
      let tour = await Tour.fromDetail(page.tourDetail);
      expect(tour.id).toEqual(targetTour.id);
      expect(tour.name).toEqual(targetTour.name.toUpperCase());
    });

    it(`updates tour name (${newTourName}) in details view`, updateTourNameInDetailView);

    it(`shows ${newTourName} in Tours list`, () => {
      element(by.buttonText('save')).click();
      browser.waitForAngular();
      let expectedText = `${targetTour.id} ${newTourName}`;
      expect(getTourAEltById(targetTour.id).getText()).toEqual(expectedText);
    });

    it(`deletes ${newTourName} from Tours list`, async () => {
      const toursBefore = await toTourArray(getPageElts().allTours);
      const li = getTourLiEltById(targetTour.id);
      li.element(by.buttonText('x')).click();

      const page = getPageElts();
      expect(page.appTours.isPresent()).toBeTruthy();
      expect(page.allTours.count()).toEqual(9, 'number of tours');
      const toursAfter = await toTourArray(page.allTours);
      // console.log(await Tour.fromLi(page.allTours[0]));
      const expectedTours =  toursBefore.filter(h => h.name !== newTourName);
      expect(toursAfter).toEqual(expectedTours);
      // expect(page.selectedTourSubview.isPresent()).toBeFalsy();
    });

    it(`adds back ${targetTour.name}`, async () => {
      const newTourName = 'Alice';
      const toursBefore = await toTourArray(getPageElts().allTours);
      const numTours = toursBefore.length;

      element(by.css('input')).sendKeys(newTourName);
      element(by.buttonText('add')).click();

      let page = getPageElts();
      let toursAfter = await toTourArray(page.allTours);
      expect(toursAfter.length).toEqual(numTours + 1, 'number of tours');

      expect(toursAfter.slice(0, numTours)).toEqual(toursBefore, 'Old tours are still there');

      const maxId = toursBefore[toursBefore.length - 1].id;
      expect(toursAfter[numTours]).toEqual({id: maxId + 1, name: newTourName});
    });

    it('displays correctly styled buttons', async () => {
      element.all(by.buttonText('x')).then(buttons => {
        for (const button of buttons) {
          // Inherited styles from styles.css
          expect(button.getCssValue('font-family')).toBe('Arial');
          expect(button.getCssValue('border')).toContain('none');
          expect(button.getCssValue('padding')).toBe('5px 10px');
          expect(button.getCssValue('border-radius')).toBe('4px');
          // Styles defined in tours.component.css
          expect(button.getCssValue('left')).toBe('194px');
          expect(button.getCssValue('top')).toBe('-32px');
        }
      });

      const addButton = element(by.buttonText('add'));
      // Inherited styles from styles.css
      expect(addButton.getCssValue('font-family')).toBe('Arial');
      expect(addButton.getCssValue('border')).toContain('none');
      expect(addButton.getCssValue('padding')).toBe('5px 10px');
      expect(addButton.getCssValue('border-radius')).toBe('4px');
    });

  });

  describe('Progressive tour search', () => {

    beforeAll(() => browser.get(''));

    it(`searches for 'Ma'`, async () => {
      getPageElts().searchBox.sendKeys('Ma');
      browser.sleep(1000);

      expect(getPageElts().searchResults.count()).toBe(4);
    });

    it(`continues search with 'g'`, async () => {
      getPageElts().searchBox.sendKeys('g');
      browser.sleep(1000);
      expect(getPageElts().searchResults.count()).toBe(2);
    });

    it(`continues search with 'e' and gets ${targetTour.name}`, async () => {
      getPageElts().searchBox.sendKeys('n');
      browser.sleep(1000);
      let page = getPageElts();
      expect(page.searchResults.count()).toBe(1);
      let tour = page.searchResults.get(0);
      expect(tour.getText()).toEqual(targetTour.name);
    });

    it(`navigates to ${targetTour.name} details view`, async () => {
      let tour = getPageElts().searchResults.get(0);
      expect(tour.getText()).toEqual(targetTour.name);
      tour.click();

      let page = getPageElts();
      expect(page.tourDetail.isPresent()).toBeTruthy('shows tour detail');
      let tour2 = await Tour.fromDetail(page.tourDetail);
      expect(tour2.id).toEqual(targetTour.id);
      expect(tour2.name).toEqual(targetTour.name.toUpperCase());
    });
  });

  async function homeSelectTargetTour() {
    let targetTourElt = getPageElts().topTours.get(targetTourHomeIndex);
    expect(targetTourElt.getText()).toEqual(targetTour.name);
    targetTourElt.click();
    browser.waitForAngular(); // seems necessary to gets tests to pass for toh-pt6

    let page = getPageElts();
    expect(page.tourDetail.isPresent()).toBeTruthy('shows tour detail');
    let tour = await Tour.fromDetail(page.tourDetail);
    expect(tour.id).toEqual(targetTour.id);
    expect(tour.name).toEqual(targetTour.name.toUpperCase());
  }

  async function updateTourNameInDetailView() {
    // Assumes that the current view is the tour details view.
    addToTourName(nameSuffix);

    let page = getPageElts();
    let tour = await Tour.fromDetail(page.tourDetail);
    expect(tour.id).toEqual(targetTour.id);
    expect(tour.name).toEqual(newTourName.toUpperCase());
  }

});

function addToTourName(text: string): promise.Promise<void> {
  let input = element(by.css('input'));
  return input.sendKeys(text);
}

function expectHeading(hLevel: number, expectedText: string): void {
    let hTag = `h${hLevel}`;
    let hText = element(by.css(hTag)).getText();
    expect(hText).toEqual(expectedText, hTag);
};

function getTourAEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('..'));
}

function getTourLiEltById(id: number): ElementFinder {
  let spanForId = element(by.cssContainingText('li span.badge', id.toString()));
  return spanForId.element(by.xpath('../..'));
}

async function toTourArray(allTours: ElementArrayFinder): Promise<Tour[]> {
  let promisedTours = await allTours.map(Tour.fromLi);
  // The cast is necessary to get around issuing with the signature of Promise.all()
  return <Promise<any>> Promise.all(promisedTours);
}
