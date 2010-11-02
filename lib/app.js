var app = {
    version: "0.0.1",
    about: "Joint Diagram Builder v0.0.1, author: David Durman, 2010",
    currentModule: "uml",
    init: function(){
	Joint.paper("diagram", 700, 600);
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
            console.log("Executing: ", obj);
            switch (obj.cmd){
            case "new":
                if (obj.object == "joint"){
		    Joint.dia.Joint(obj.from,
                                    obj.to,
                                    Joint.dia[obj.module][obj.type]
                                   ).registerForever(Joint.dia.registeredElements());
                } else {
                    Joint.dia[obj.module][obj.object].create(obj.properties);
                }
                break;
            case "clear":
                Joint.resetPaper();
                break;
            case "save":
		var json = Joint.dia.stringify(Joint.paper());
		console.log(json);
		$VS("console", json);
		break;
	    case "about":
		$VS("console", app.about);
		break;
	    case "version":
		$VS("console", app.version);
		break;
	    case "help":
		$VS("console", app.console.help);
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


