var $U = {
    get: function( id, filter ) {
        var value = uki( '#' + id ).value();
        return filter ? filter.call( null, value ) : value;
    },
    set: function( id, value ) {
        uki( '#' + id ).value( value );
        return this;
    }
};