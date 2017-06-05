/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        var feedList;

        beforeEach(function() {
            feedList = allFeeds;
        });
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(feedList).toBeDefined();
            expect(feedList.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have no empty url', function() {
            feedList.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            })
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have no empty name', function() {
            feedList.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            })
        });
    });


    describe('The Menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('menu element is hidden by default', function() {
            // Check if has default class 'menu-hidden', if so means toggle menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('toggle menu changes visibility', function() {
            var menuIcon = $('.menu-icon-link');
            // Click menuIcon first time should open the menu
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Click menuIcon again should close the menu
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed function is called
         * and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            /* Raise the default test timeout (5000) */
            //window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0, function() {
                done();
            });
        });
        it('has at least one entry', function(done) {
            expect(initComlete).toBe(true);
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
        
    });

    describe('New Feed Selection', function() {
        var oldEntries, oldTitle;
        
        beforeEach(function(done) {
            loadFeed(1, function() {
                
                oldEntries = $('.feed .entry-link');
                oldTitle = $('.header-title')[0].innerText;
                loadFeed(0, function() {
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('the content actually changes', function(done) {
            // Check the first artical link is changed
            expect($('.feed .entry-link')[0].href != oldEntries[0].href).toBe(true);

            // Check the title on nav-bar is changed
            expect($('.header-title')[0].innerText != oldTitle).toBe(true);
            done();
        });
    });

}());
