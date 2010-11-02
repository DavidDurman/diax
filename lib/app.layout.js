// Toolbars.
var tools = {
    fsa: {
	view: 'Toolbar', id: "fsa-toolbar", rect: '0 25 1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { text: 'State', id: 'fsa-state-btn' },
            { text: 'Start state', id: 'fsa-startstate-btn' },
            { text: 'End state', id: 'fsa-endstate-btn' },
            { text: 'Arrow', id: 'fsa-arrow-btn' }
        ]},
    uml: {
	view: 'Toolbar', id: "uml-toolbar", rect: '0 25 1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { text: 'State', id: 'uml-state-btn' },
            { text: 'Start state', id: 'uml-startstate-btn' },
            { text: 'End state', id: 'uml-endstate-btn' },
            { text: 'Arrow', id: 'uml-arrow-btn' },
            { text: 'Aggregation', id: 'uml-aggregationarrow-btn' },
            { text: 'Generalization', id: 'uml-generalizationarrow-btn' }
        ]},
    devs: {
	view: 'Toolbar', id: "devs-toolbar", rect: '0 25 1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { text: 'Model', id: 'devs-model-btn' },
            { text: 'Arrow', id: 'devs-arrow-btn' }
        ]},
    pn: {
	view: 'Toolbar', id: "pn-toolbar", rect: '0 25 1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
            { text: 'Event', id: 'pn-event-btn' },
            { text: 'Place', id: 'pn-place-btn' },
            { text: 'Arrow', id: 'pn-arrow-btn' }
        ]}
};

// Forms.
var forms = {
    uml: {
	view: 'Box', rect: '20 100 200 600', anchors: 'left top', childViews: [

	    { view: 'Label', rect: '0 0 50 24', html: 'Arrow from (x,y)', selectable: false },
	    { view: 'TextField', id: 'uml-arrowfromx-input', rect: '90 0 30 24', value: '100' },
	    { view: 'TextField', id: 'uml-arrowfromy-input', rect: '125 0 30 24', value: '100' },
	    { view: 'Label', rect: '0 26 50 24', html: 'Arrow to (x,y)', selectable: false },
	    { view: 'TextField', id: 'uml-arrowtox-input', rect: '90 26 30 24', value: '200' },
	    { view: 'TextField', id: 'uml-arrowtoy-input', rect: '125 26 30 24', value: '200' },

	    { view: 'Label', rect: '0 52 50 24', html: 'Rect (x,y,w,h)', selectable: false },
	    { view: 'TextField', id: 'uml-rectx-input', rect: '90 52 30 24', value: '100' },
	    { view: 'TextField', id: 'uml-recty-input', rect: '125 52 30 24', value: '100' },
	    { view: 'TextField', id: 'uml-rectw-input', rect: '160 52 30 24', value: '120' },
	    { view: 'TextField', id: 'uml-recth-input', rect: '195 52 30 24', value: '80' },

	    { view: 'Label', rect: '0 78 50 24', html: 'Position (x,y)', selectable: false },
	    { view: 'TextField', id: 'uml-posx-input', rect: '90 78 30 24', value: '200' },
	    { view: 'TextField', id: 'uml-posy-input', rect: '125 78 30 24', value: '200' },

	    { view: 'Label', rect: '0 104 50 24', html: 'Radius', selectable: false },
	    { view: 'TextField', id: 'uml-radius-input', rect: '90 104 30 24', value: '10' },

	    { view: 'Label', rect: '0 130 50 24', html: 'Label', selectable: false },
	    { view: 'TextField', id: 'uml-label-input', rect: '90 130 135 24', value: 'UML State' },

	    { view: 'Label', rect: '0 156 50 24', html: 'Color', selectable: false },
	    { view: 'ColorPicker', id: 'uml-color-input', rect: '90 156 135 24', value: 'FFFFFF' }
	]
    }
};

// Main.
uki([
	{ view: 'Toolbar', id: 'menu', rect: '1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
	      { text: 'File' },
	      { text: 'Edit' },
	      { text: 'View' },
	      { text: 'Help' }
	  ]},
	tools.uml,
	{
	    view: "HSplitPane", rect: "0 50 1000 600", anchors: "left top right bottom",
	    handlePosition: 300, leftMin: 250, rightMin: 640,
	    leftChildViews: [
		{ view: "Label", rect: "10 10 100 30", anchors: "left top", text: "Joint Diagram Builder" },
		{ view: "Button", id: "diagram-selector-btn", rect: "10 60 150 24", anchors: "left top", text: "UML" },
		forms.uml,
		{ view: "Label", rect: "10 290 100 24", anchors: "left top", text: "Console (write 'help' and press Enter for help.)" },
		{ view: 'MultilineTextField', id: 'console', rect: '10 316 280 120', value: ''},
		{ view: 'MultilineTextField', id: 'console-history', rect: '10 446 280 70', value: ''}
	    ],
	    rightChildViews: { view: "Box", id: "diagram", rect: "700 600", background: "#EEE", anchors: "left top"}
	}
    ]).attachTo(window, "1000 600");


// Popups.
uki({ view: 'Popup', rect: '0 0 100 72', anchors: 'left top', relativeTo: uki('#menu Button')[0], id: 'file-menu', childViews: [
	  { view: 'Button', rect: '0 0 100 24', id: 'menu-open-btn',  anchors: 'left top', text: 'Open'},
	  { view: 'Button', rect: '0 24 100 24', id: 'menu-save-btn', anchors: 'left top', text: 'Save'},
	  { view: 'Button', rect: '0 48 100 24', id: 'menu-clear-btn', anchors: 'left top', text: 'Clear diagram'}
      ]}).attachTo(window).hide();
uki({ view: 'Popup', rect: '0 0 100 24', anchors: 'left top', relativeTo: uki('#menu Button')[1], id: 'edit-menu', childViews: [
	  { view: 'Button', rect: '0 0 100 24', id: 'menu-toggleghosting-btn', anchors: 'left top', text: 'Toggle ghosting'}
      ]}).attachTo(window).hide();
uki({ view: 'Popup', rect: '0 0 100 48', anchors: 'left top', relativeTo: uki('#menu Button')[3], id: 'help-menu', childViews: [
	  { view: 'Button', rect: '0 0 100 24', id: 'menu-about-btn', anchors: 'left top', text: 'About'},
	  { view: 'Button', rect: '0 24 100 24', id: 'menu-help-btn', anchors: 'left top', text: 'Help'}
      ]}).attachTo(window).hide();

