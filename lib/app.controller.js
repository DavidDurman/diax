var c = app.console;

var controller = {
    "uml-state-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "State",
                properties: {
                    label: $VS('uml-label-input'),
                    rect: { x: $VS('uml-rectx-input'), y: $VS('uml-recty-input'), width: $VS('uml-rectw-input'), height: $VS('uml-recth-input') },
                    attrs: {
                        fill: "#" + $VS('uml-color-input')
                    }
                }});
        }
    },
    "uml-startstate-btn": {
	click: function(){
            c.exe({
                cmd: "new",
                module: "uml",
                object: "StartState",
                properties: {
                    position: { x: $VS('uml-posx-input'), y: $VS('uml-posy-input') },
                    radius: $VS('uml-radius-input')
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
                    position: { x: $VS('uml-posx-input'), y: $VS('uml-posy-input') },
                    radius: $VS('uml-radius-input')
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
                from: { x: $VS('uml-arrowfromx-input'), y: $VS('uml-arrowfromy-input') },
                to: { x: $VS('uml-arrowtox-input'), y: $VS('uml-arrowtoy-input') }
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
                from: { x: $VS('uml-arrowfromx-input'), y: $VS('uml-arrowfromy-input') },
                to: { x: $VS('uml-arrowtox-input'), y: $VS('uml-arrowtoy-input') }
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
                from: { x: $VS('uml-arrowfromx-input'), y: $VS('uml-arrowfromy-input') },
                to: { x: $VS('uml-arrowtox-input'), y: $VS('uml-arrowtoy-input') }
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
	click: function(){ c.exe({ cmd: "open", json: $VS("console") }); }
    },
    "menu-toggleghosting-btn": {
	click: function(){ c.exe({ cmd: "toggle-ghosting" }); }
    },
    "menu-about-btn": {
	click: function(){ c.exe({ cmd: "about" }); }
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
