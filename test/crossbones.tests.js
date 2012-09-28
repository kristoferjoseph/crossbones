module('FilterableCollection', {
    setup: function() {
        // setup for FilterableCollection
        this.filterableCollection = new Crossbones.FilterableCollection();
    },
    teardown: function() {
        //teardown for FilterableCollection
        this.filterableCollection = null;
    }
});

test('Filterable Collection should instantiate', 1, function() {
    ok(this.filterableCollection);
});