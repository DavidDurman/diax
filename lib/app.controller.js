var c = app.console;

var controller = {
    "uml-state-btn": {
	click: function(){
            var innerData = uki( '#uml-state-inner' ).data(),
                i = 0, len = innerData.length, inner = [], item, longest = 0;
            for (; i < len; i++) {
                item = innerData[ i ];
                if ( item.length > longest ) {
                    longest = item.length;
                }
                inner = inner.concat( item.split('/') );
            }

            var element = c.exe({
                cmd: "new",
                module: "uml",
                object: "State",
                properties: {
                    label: UMLStateEditor.label || 'State',
                    rect: { x: 50, y: 50, width: 100 + longest*2, height: 70 + len*12 },
                    attrs: {
                        fill: UMLStateEditor.color
                    },
                    actions: {
                        entry: UMLStateEditor.entry || "entry()",
                        exit: UMLStateEditor.exit || "exit()",
                        inner: inner
                    }
                }});
            element.wrapper.click( function () {
                UMLStateEditor.load(element.properties);
                UMLStateEditor.view.show();
            } );
        }
    },
    "uml-startstate-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "StartState",
                properties: {
                    position: { x: 100, y: 100 },
                    radius: 10
                }});
        }
    },
    "uml-endstate-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "EndState",
                properties: {
                    position: { x: 100, y: 100 },
                    radius: 10
                }});
        }
    },
    "uml-arrow-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "joint",
                type: "arrow",
                from: { x: 100, y: 100 },
                to: { x: 200, y: 200 }
            });
        }
    },
    "uml-aggregationarrow-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "joint",
                type: "aggregationArrow",
                from: { x: 100, y: 100 },
                to: { x: 200, y: 200 }
            });
        }
    },
    "uml-generalizationarrow-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "joint",
                type: "generalizationArrow",
                from: { x: 100, y: 100 },
                to: { x: 200, y: 200 }
            });
        }
    },
    "menu-clear-btn": {
	click: function(){ c.exe({ cmd: "clear" }); }
    },
    "menu-save-btn": {
	click: function(){ c.exe({ cmd: "save"}); }
    },
    "menu-open-btn": {
	click: function(){ c.exe({ cmd: "open", json: $U.get("console") }); }
    },
    "menu-toggleghosting-btn": {
	click: function(){ c.exe({ cmd: "toggle-ghosting" }); }
    },
    "menu-about-btn": {
	click: function(){ c.exe({ cmd: "about" }); }
    },
    "menu-help-btn": {
	click: function(){ c.exe({ cmd: "help" }); }
    },
    "console": {
	keydown: function(e){
            if (e.keyCode == 13)
                c.exe({ cmd: "open", json: $VS("console") });
        }
    }
};

/**
 * Bindings.
 */

GradientEditor.bind();
UMLStateEditor.bind();

uki("#uml-toolbar [text]").bind("click", function(e){
    controller[this.id()].click(e);
});
uki("#file-menu Button").bind("click", function(e){
    controller[this.id()].click(e);
});
uki("#edit-menu Button").bind("click", function(e){
    controller[this.id()].click(e);
});
uki("#help-menu Button").bind("click", function(e){
    controller[this.id()].click(e);
});
uki("#console").bind("keydown", function(e){
    controller[this.id()].keydown(e);
});

// Menu. (Toggle Popups.)
uki("#menu Button").bind("click", function(){
    var button = this;
    uki("Popup").grep(function(e){
        return e.relativeTo() == button;
    }).toggle();
});

// @todo It doesn't work!
uki("document").bind("keydown", function(e){
    if (e.keyCode == 67/*c*/ && e.metaKey == e.ctrlKey)
	uki("#console").focus();
});

// @todo Use a cross-browser solution.
document.addEventListener("keydown", function(e){
    if (e.ctrlKey){
	switch (e.keyCode){
	    case 67: // c
		uki("#console").focus();
	        break;
	    case 88: // x
		$VS("console", "");
	        break;
	    default:
	        break;
	}
    }
}, false);
