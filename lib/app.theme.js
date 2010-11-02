(function(){
    uki.theme.appDefault = uki.extend({}, uki.theme.Base, {
    styles: {
	base: function(){
	    return "font-family:Arial,Helvetica,sans-serif;";
	},
	"button": function() {
	    return "color:#333;text-align:center;";
	},
	"label": function() {
	    return "color:red;text-align:center;";
	}
    }
    });

//    uki.theme.register(uki.theme, appDefault);
})();
