var app = {
    version: "0.0.1",
    about: "Diax - Diagram Builder v0.0.1, author: David Durman, 2010",
    root: document.getElementById("app"),
    currentModule: "uml",
    init: function(){

        // Create arrow list.
        Joint.paper("arrows-list-diagram", 200, 100);
        var arrows = [ "arrow", "aggregationArrow", "generalizationArrow" ],
            i = 0, len = arrows.length, arrow,
            joint, handler, opt = { interactive: false };

        for ( ; i < len; i++ ) {
            arrow = arrows[ i ];
	    joint = Joint.dia.Joint( { x: 10, y: 15 + i*25 }, { x: 180, y: 25 + i*25 },
                                     Joint.Mixin({}, opt, Joint.dia.uml[ arrow ]) );
            handler = controller[ "uml-" +  arrow.toLowerCase() + "-btn" ].click;
            joint.endCap().click( handler );
            joint.connection().click( handler );
            joint.startCap().click( handler );
        }

        // Create UML elements list.
        Joint.paper("uml-list-diagram", 300, 100);
        var element;

        element = Joint.dia.uml.State.create( {
            label: 'State',
            rect: { x: 10, y: 15, width: 100, height: 70 },
            attrs: {
                fill: '#94EAFF'
            },
            actions: {
                entry: "entry()",
                exit: "exit()",
                inner: [ "Event", "action()" ]
            }
        } ).draggable( false );
        element.wrapper.click( function() {
            umlListDiagram.hide();
            UMLStateEditor.view.show();
        } );

        element = Joint.dia.uml.StartState.create( {
            position: { x: 150, y: 30 }
        } ).draggable( false );
        element.wrapper.click( controller[ "uml-startstate-btn" ].click );

        element = Joint.dia.uml.EndState.create( {
            position: { x: 200, y: 30 }
        } ).draggable( false );
        element.wrapper.click( controller[ "uml-endstate-btn" ].click );


        // needs to be drawn into shown diagram, this is a hack.
        // Hide the diagram right after!
        arrowsListDiagram.hide();
        umlListDiagram.hide();


	Joint.paper("diagram", 800, 600);
    },
    console: {
	help: "Commands:\n\t"
	    + "help: Print this help.\n\t"
	    + "clear: Clear current diagram.\n\t"
	    + "save: Stringify current diagram.\n\t"
	    + "about: Show about string.\n\t"
	    + "version: Show version information.\n\t"
	    + "[JSON]: Load diagram as JSON string.\n\n"

	    + "Key shortcuts:\n\t"
	    + "Ctrl-c: Gain focus.\n\t"
	    + "Ctrl-x: Clear console."

	    + "Tips:\n\tGradients: In console, you can specify gradients instead of just plain colors.\n\t\t"
	    + "Syntax: Linear gradient: ‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›\n\t\t"
	    + "Radial gradient: r[(‹fx›, ‹fy›)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›\n\t\t"
	    + "Example: 90-#fff-#000  ...  90° gradient from white to black\n\t\t"
	    + "0-#fff-#f00:20-#000 ... 0° gradient from white via red (at 20%) to black\n\t\t"
	    + "r#fff-#000 ... gradient from white to black\n\t\t"
	    + "r(0.25, 0.75)#fff-#000 ... gradient from white to black with focus point at 0.25, 0.75",
	parse: function(cmd){
	    var colonIdx = cmd.indexOf(":");
	    if (colonIdx === -1) colonIdx = cmd.length;
	    var baseCmds = cmd.substring(0, colonIdx).split(" ");
	    var args = cmd.substring(colonIdx + 2).split(",");
	    return {
		base: baseCmds,
		args: args
	    };
	},
        exe: function(obj){
            var element;

            console.log("Executing: ", obj);
            switch (obj.cmd){
            case "new":
                if (obj.object == "joint"){
		    Joint.dia.Joint(obj.from,
                                    obj.to,
                                    Joint.dia[obj.module][obj.type]
                                   ).registerForever(Joint.dia.registeredElements());
                } else {
                    element = Joint.dia[obj.module][obj.object].create(obj.properties);
                    element.wrapper.click( function () {
                        UMLStateEditor.view.show();
                    } );
                }
                break;
            case "clear":
                Joint.resetPaper();
                break;
            case "save":
		var json = Joint.dia.stringify(Joint.paper());
		console.log(json);
		$U.set("console", json);
		break;
	    case "about":
		$U.set("console", app.about);
		break;
	    case "version":
		$U.set("console", app.version);
		break;
	    case "help":
		$U.set("console", app.console.help);
		break;
            case "toggle-ghosting":
                var registeredElements = Joint.dia.registeredElements();
	        for (var i = 0, l = registeredElements.length; i < l; i++)
		    registeredElements[i].toggleGhosting();
                break;
            case "open":
		try {
		    Joint.dia.parse(obj.json);	// load diagram as JSON string
		} catch (x) {
		    console.log("Unexpected JSON format: " + obj.json);
		}
		break;
            default:
                break;  // conveniecne
            }
        }
    }
};


