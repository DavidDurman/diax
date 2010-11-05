var GradientEditor = {
    value: '',
    previewElement: null,

    view: uki({ view: 'Popup', rect: '0 0 300 220', anchors: 'left top', relativeTo: uki('#uml-list'), id: 'gradient-editor', hideOnClick: false, childViews: [
        { view: 'Label', rect: '100 2 40 24', anchors: 'left top', text: 'Gradient Editor', style: { color: 'gray', 'font-weight': 'bolder', 'text-decoration': 'underline' } },

        { view: "Box", id: "gradient-preview", rect: "250 52 30 82", background: "white", anchors: "left top"},

        { view: 'Label', rect: '10 52 80 24', anchors: 'left top', text: 'Start color: '},
        { view: 'ColorPicker', id: 'gradient-start-color', rect: '100 52 135 24', value: 'FFFFFF' },

        { view: 'Label', rect: '10 80 80 24', anchors: 'left top', text: 'Via color: '},
        { view: 'ColorPicker', id: 'gradient-via-color', rect: '100 80 135 24', value: 'FFFFFF' },

        { view: 'Label', rect: '10 110 80 24', anchors: 'left top', text: 'End color: '},
        { view: 'ColorPicker', id: 'gradient-end-color', rect: '100 110 135 24', value: 'FFFFFF' },

        { view: 'Label', rect: '10 140 80 24', anchors: 'left top', text: 'Angle: '},
        { view: 'TextField', rect: '100 140 20 24', id: 'gradient-angle', anchors: 'left top', value: '90'},
        { view: 'Slider', id: 'gradient-angle-slider', rect: '130 140 135 24', min: 0, max: 90, value: 90, keyStep: 1 },

        { view: 'Button', rect: '10 190 100 24', id: 'gradient-cancel-btn', anchors: 'left top', text: 'Cancel'},
        { view: 'Button', rect: '190 190 100 24', id: 'gradient-done-btn', anchors: 'left top', text: 'Done'}
    ]}),

    bind: function () {
        uki("#gradient-editor ColorPicker").change( function(e){
            var value = GradientEditor.getValue();
            GradientEditor.previewElement.attr( { fill: value } );
        } );
        uki("#gradient-angle-slider").change( function(e){
            GradientEditor.controller[this.id()].change(e);
        });
        uki("#gradient-editor Button").bind("click", function(e){
            GradientEditor.controller[this.id()].click(e);
        });
    },

    getValue: function () {
        this.value = parseInt($U.get('#gradient-angle')) + '-#' + $U.get('#gradient-start-color') + '-#' + $U.get('#gradient-via-color') + '-#' + $U.get('#gradient-end-color');
        return this.value;
    },

    controller: {
        "gradient-angle-slider": {
            change: function ( e ) {
                uki( '#gradient-angle' ).value( e.value );
                var value = GradientEditor.getValue();
                GradientEditor.previewElement.attr( { fill: value } );
            }
        },
        "gradient-cancel-btn": {
            click: function() {
                GradientEditor.view.hide();
            }
        },
        "gradient-done-btn": {
            click: function () {
                if (GradientEditor.doneCallback) {
                    GradientEditor.doneCallback();
                }
                GradientEditor.view.hide();
            }
        }
    }
};

var UMLStateEditor = {
    label: '',
    entry: '',
    exit: '',
    inner: [],

    view: uki({ view: 'Popup', rect: '0 0 300 400', anchors: 'left top', relativeTo: uki('#uml-list'), id: 'uml-state-editor', hideOnClick: false, childViews: [
        { view: 'Label', rect: '100 2 40 24', anchors: 'left top', text: 'UML State Editor', style: { color: 'gray', 'font-weight': 'bolder', 'text-decoration': 'underline' } },

        { view: 'Label', rect: '10 52 40 24', anchors: 'left top', text: 'Label: '},
        { view: 'TextField', rect: '100 52 180 24', id: 'uml-state-label', anchors: 'left top', value: 'State'},

        { view: 'Label', rect: '10 80 40 24', anchors: 'left top', text: 'Entry action: '},
        { view: 'TextField', rect: '100 80 180 24', id: 'uml-state-entry', anchors: 'left top', value: ''},

        { view: 'Label', rect: '10 110 80 24', anchors: 'left top', text: 'Exit action: '},
        { view: 'TextField', rect: '100 110 180 24', id: 'uml-state-exit', anchors: 'left top', value: ''},

        { view: 'Label', rect: '10 150 80 24', anchors: 'left top', text: 'Inner actions: '},
        { view: 'TextField', rect: '100 150 180 24', id: 'uml-state-inner-item', anchors: 'left top', value: ''},
        { view: 'Button', rect: '10 180 60 24', anchors: 'left top', id: 'uml-state-inner-add-btn', text: 'add +'},
        { view: 'Button', rect: '10 210 60 24', anchors: 'left top', id: 'uml-state-inner-remove-btn', text: 'remove -'},
        { view: 'ScrollPane', rect: '90 180 200 90', anchors: 'left top', childViews: [
            { view: 'List', rect: '0 0 200 90', anchors: 'left top rigth', minSize: '0 90', data: [], id: 'uml-state-inner' }
        ]},

        { view: 'Label', rect: '10 300 80 24', anchors: 'left top', text: 'Fill color: '},
        { view: 'ColorPicker', id: 'uml-state-color', rect: '100 300 135 24', value: 'FFFFFF' },
        { view: 'Button', rect: '100 335 137 24', id: 'uml-state-gradient-btn', anchors: 'left top', text: 'Gradient editor'},

        { view: 'Button', rect: '10 370 100 24', id: 'uml-state-cancel-btn', anchors: 'left top', text: 'Cancel'},
        { view: 'Button', rect: '190 370 100 24', id: 'uml-state-done-btn', anchors: 'left top', text: 'Done'}
    ]}),

    bind: function () {
        uki("#uml-state-editor Button").bind("click", function(e){
            UMLStateEditor.controller[this.id()].click(e);
        });
    },

    controller: {
        "uml-state-gradient-btn": {
            click: function() {
                GradientEditor.doneCallback = function() {
                    var value = GradientEditor.getValue();
                    console.log( value );
                    $U.set( 'uml-state-color', value );
                };
                GradientEditor.view.show();
            }
        },
        "uml-state-cancel-btn": {
            click: function() {
                UMLStateEditor.view.hide();
            }
        },
        "uml-state-done-btn": {
            click: function() {
                UMLStateEditor.label = $U.get("uml-state-label");
                UMLStateEditor.entry = $U.get("uml-state-entry");
                UMLStateEditor.exit = $U.get("uml-state-exit");
                var colorString = $U.get("uml-state-color");
                UMLStateEditor.color = ((colorString.indexOf("-") === -1) ? "#" : "") + colorString;
                controller[ "uml-state-btn" ].click();
                UMLStateEditor.view.hide();
            }
        },
        "uml-state-inner-add-btn": {
            click: function() {
                uki( '#uml-state-inner' ).addRow( 0, $U.get('uml-state-inner-item') );
            }
        },
        "uml-state-inner-remove-btn": {
            click: function() {
                uki( '#uml-state-inner' ).removeRow( uki( '#uml-state-inner' ).selectedIndex() );
            }
        }
    }
};