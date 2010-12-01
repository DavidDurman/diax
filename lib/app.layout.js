// Main.
uki([
    { view: 'Toolbar', id: 'menu', rect: '1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [
	{ text: 'File' },
	{ text: 'Edit' },
	{ text: 'View' },
	{ text: 'Arrows' },
	{ text: 'UML' },
	{ text: 'Help' }]
    },
    { view: 'Toolbar', id: "uml-toolbar", rect: '0 24 1000 24', anchors: 'left top right', background: 'theme(panel)', buttons: [] },
    { view: "Box", id: "diagram", rect: "0 48 800 600", background: "#EEE", anchors: "left top"},
    { view: 'MultilineTextField', id: 'console', rect: '0 648 800 50', value: '', anchors: "left top"}
]).attachTo(app.root, "1000 600");


// Popups.

uki({ view: 'Popup', rect: '0 0 100 72', anchors: 'left top', relativeTo: uki('#menu Button')[0], id: 'file-menu', childViews: [
    { view: 'Button', rect: '0 0 100 24', id: 'menu-open-btn',  anchors: 'left top', text: 'Open'},
    { view: 'Button', rect: '0 24 100 24', id: 'menu-save-btn', anchors: 'left top', text: 'Save'},
    { view: 'Button', rect: '0 48 100 24', id: 'menu-clear-btn', anchors: 'left top', text: 'Clear diagram'}
]}).attachTo(app.root).hide();

uki({ view: 'Popup', rect: '0 0 120 24', anchors: 'left top', relativeTo: uki('#menu Button')[1], id: 'edit-menu', childViews: [
    { view: 'Button', rect: '0 0 120 24', id: 'menu-toggleghosting-btn', anchors: 'left top', text: 'Toggle ghosting'},
    { view: 'Button', rect: '0 24 120 24', id: 'menu-showtoolboxes-btn', anchors: 'left top', text: 'Show toolboxes'},
    { view: 'Button', rect: '0 48 120 24', id: 'menu-hidetoolboxes-btn', anchors: 'left top', text: 'Hide toolboxes'}
]}).attachTo(app.root).hide();

uki({ view: 'Popup', rect: '0 0 100 48', anchors: 'left top', relativeTo: uki('#menu Button')[5], id: 'help-menu', childViews: [
    { view: 'Button', rect: '0 0 100 24', id: 'menu-about-btn', anchors: 'left top', text: 'About'},
    { view: 'Button', rect: '0 24 100 24', id: 'menu-help-btn', anchors: 'left top', text: 'Help'}
]}).attachTo(app.root).hide();

UMLStateEditor.view.attachTo(app.root);
UMLStateEditor.view.hide();

GradientEditor.view.attachTo(app.root);
GradientEditor.view.hide();



// Diagram popups.

var arrowsListDiagram = uki({ view: 'Popup', rect: '0 0 200 100', anchors: 'left top', relativeTo: uki('#menu Button')[3], id: 'arrows-list', childViews: [
    { view: "Box", id: "arrows-list-diagram", rect: "0 0 200 100", background: "#EEE", anchors: "left top"}
]}).attachTo(app.root);

var umlListDiagram = uki({ view: 'Popup', rect: '0 0 300 100', anchors: 'left top', relativeTo: uki('#menu Button')[4], id: 'uml-list', childViews: [
    { view: "Box", id: "uml-list-diagram", rect: "0 0 300 100", background: "#EEE", anchors: "left top"}
]}).attachTo(app.root);


