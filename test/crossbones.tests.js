module('FilterableCollection', {
    setup: function() {
        // setup for FilterableCollection
        this.filterableCollection = new Crossbones.FilterableCollection([{
            "id": 1,
            "name": "fwee",
            "hobbies": [
            "cats",
            "design",
            "photography"
            ]
        },{
            "id": 2,
            "name": "fwi",
            "hobbies": [
            "cats",
            "design",
            "twitterz"
            ]
        },{
            "id": 3,
            "name": "fwo",
            "hobbies": [
            "cats",
            "design",
            "heckling"
            ]
        },{
            "id": 4,
            "name": "fwum",
            "hobbies": [
            "cats",
            "design",
            "music"
            ]
        }]);
    },
    teardown: function() {
        //teardown for FilterableCollection
        this.filterableCollection.removeAllFilters();
        this.filterableCollection = null;
    }
});

test('Filterable Collection should instantiate', 1, function() {
    ok(this.filterableCollection);
});

test('Add filter should add a filter', 1, function() {
    this.filterableCollection.addFilter({
            "id": "bangathon",
            "args": [],
            "filterFunction": "bangathon"
        });
    equal( this.filterableCollection.filters.length, 1, "Filters length should reflect the addition of a filter" );
});

test('Replace filter should replace a filter', 1, function() {
    this.filterableCollection.replaceFilter({
            "id": "bangathon",
            "args": [],
            "filterFunction": "howdy"
        });
    equal( this.filterableCollection.filters.get('bangathon').get('filterFunction'), 'howdy', "Filters function should reflect the replacement of a filter" );
});

test('Remove filter should remove a filter', 1, function() {
    this.filterableCollection.addFilter({
            "id": "bangathon",
            "args": [],
            "filterFunction": "bangathon"
        });
    this.filterableCollection.removeFilter("bangathon");
    equal( this.filterableCollection.filters.length, 0, "Filters length should reflect the removal of a filter" );
});

test('Remove all filters should remove all filters', 1, function() {
    this.filterableCollection.addFilter({
            "id": "bangathon",
            "args": [],
            "filterFunction": "bangathon"
        });
    this.filterableCollection.addFilter({
            "id": "dweeb",
            "args": [],
            "filterFunction": "dweeb"
        });
    this.filterableCollection.addFilter({
            "id": "doozy",
            "args": [],
            "filterFunction": "doozy"
        });
    this.filterableCollection.removeAllFilters();
    equal( this.filterableCollection.filters.length, 0, "Filters length should reflect the addition of a filter" );
});

test('propertyByValueFilterFunction should return expected data', 1, function() {
       var data = this.filterableCollection.addFilter({
            "id": "getDumb",
            "args": ["name", "fwee"],
            "filterFunction": "propertyByValueFilterFunction"
        });
       deepEqual( data, [{
            "id": 1,
            "name": "fwee",
            "hobbies": [
            "cats",
            "design",
            "photography"
            ]
        }], "Filtered data should match expected results" );
});

test('arrayByNameFilterFunction should return expected data', 1, function() {
       var data = this.filterableCollection.addFilter({
            "id": "getDumb",
            "args": ["hobbies", "twitterz"],
            "filterFunction": "arrayByNameFilterFunction"
        });
       deepEqual( data, [{
            "id": 2,
            "name": "fwi",
            "hobbies": [
            "cats",
            "design",
            "twitterz"
            ]
        }], "Filtered data should match expected results" );
});

test('stringInPropertyFilterFunction should return expected data', 1, function() {
       var data = this.filterableCollection.addFilter({
            "id": "getDumb",
            "args": ["name", "um"],
            "filterFunction": "stringInPropertyFilterFunction"
        });
       deepEqual( data, [{
            "id": 4,
            "name": "fwum",
            "hobbies": [
            "cats",
            "design",
            "music"
            ]
        }], "Filtered data should match expected results" );
});




