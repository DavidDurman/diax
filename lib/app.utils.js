/**
 * Get number value.
 */
var $VN = function(id){
    return parseInt(uki('#' + id).value());
};
/**
 * Get/set string value.
 */
var $VS = function(id, value){
    if (value !== undefined){
	uki('#' + id).value(value);
	return value;
    }
    return uki('#' + id).value();
};

