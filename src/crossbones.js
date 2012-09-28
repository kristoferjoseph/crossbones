/*global  _: false, Backbone: false, exports: false*/

(function(global) {
    'use strict';

    var Crossbones;
    if (typeof exports !== 'undefined') {
        Crossbones = exports;
    } else {
        Crossbones = global.Crossbones = {};
    }

    var FilterableCollection = Crossbones.FilterableCollection = Backbone.Collection.extend({
        /**
         * Filter function for filtering an array by a supplied value
         */
        arrayByNameFilterFunction: function (accessor, name) {
            return function (val) {
                var property = val.get(accessor);
                for (var i = 0; i < property.length; i++) {
                    if (property[i] === name) {
                        return true;
                    }
                }
                return false;
            };
        },
        /**
         * Filter function for property in model
         */
        propertyByValueFilterFunction: function (prop, val) {
            return function(model) {
                return model.get(prop) === val;
            };
        },
        /**
         * Filter function for sub string in property
         */
        stringInPropertyFilterFunction: function (prop, str) {
            return function (model) {
                var lowerCaseProp = model.get(prop).toLowerCase();
                return lowerCaseProp.indexOf(str.toLowerCase()) !== -1;
            };
        },
        /**
         * Adds a filter function to the filters collection to be applied later
         */
        addFilter: function (obj) {
            this.filters.add(obj);
            return this.applyFilters();
        },
        /**
         * Removes a filter function from the filters collection
         */
        removeFilter: function(id) {
            this.filters.remove(this.filters.get(id));
            return this.applyFilters();
        },
        /**
         * Replaces a filter function in the filters collection
         */
        replaceFilter: function(obj) {
            var model = this.filters.get(obj.id);
            if (model) {
                this.removeFilter(model);
            }
            return this.addFilter(obj);
        },
        /**
         * Removes all filter functions from the filters collection
         */
        removeAllFilters: function() {
            this.filters.reset();
        },
        /**
         * Applies all the existing filters to the data set and returns the results
         */
        applyFilters: function() {
            var self = this,
                results = [],
                tempCollection = this.tempCollection.reset(self.toJSON());

            self.filters.each(function(filterModel) {
                var filterFunction = self[filterModel.get('filterFunction')],
                    args = filterModel.get('args') || [];
                if (filterFunction) {
                    tempCollection.reset(tempCollection.filter(filterFunction.apply(self, args)), {
                        'silent': true
                    });
                }
            });

            return tempCollection.toJSON();
        },
        /**
         *   Destroys all the objects created by FilterableCollection
         */
        destroy: function() {
            this.removeAllFilters();
            this.tempCollection.reset();
            this.filters = null;
            this.tempCollection = null;
        }
    });

})(this);