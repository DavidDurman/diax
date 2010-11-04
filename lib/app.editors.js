var UMLStateEditor = {
    label: '',
    entry: '',
    exit: '',
    inner: [],

    view: uki({ view: 'Popup', rect: '0 0 300 280', anchors: 'left top', relativeTo: uki('#uml-list'), id: 'uml-state-editor', childViews: [
        { view: 'Label', rect: '10 2 40 24', anchors: 'left top', text: 'Label: '},
        { view: 'TextField', rect: '100 2 180 24', id: 'uml-state-label', anchors: 'left top', value: 'State'},

        { view: 'Label', rect: '10 30 40 24', anchors: 'left top', text: 'Entry action: '},
        { view: 'TextField', rect: '100 30 180 24', id: 'uml-state-entry', anchors: 'left top', value: ''},

        { view: 'Label', rect: '10 60 80 24', anchors: 'left top', text: 'Exit action: '},
        { view: 'TextField', rect: '100 60 180 24', id: 'uml-state-exit', anchors: 'left top', value: ''},

        { view: 'Label', rect: '10 100 80 24', anchors: 'left top', text: 'Inner actions: '},
        { view: 'TextField', rect: '100 100 180 24', id: 'uml-state-inner-item', anchors: 'left top', value: ''},
        { view: 'Button', rect: '10 130 60 24', anchors: 'left top', id: 'uml-state-inner-add-btn', text: 'add +'},
        { view: 'Button', rect: '10 160 60 24', anchors: 'left top', id: 'uml-state-inner-remove-btn', text: 'remove -'},
        { view: 'ScrollPane', rect: '90 130 200 90', anchors: 'left top', childViews: [
            { view: 'List', rect: '0 0 200 90', anchors: 'left top rigth', minSize: '0 90', data: [], id: 'uml-state-inner' }
        ]},

        { view: 'Button', rect: '10 250 100 24', id: 'uml-state-done-btn', anchors: 'left top', text: 'Done'}
    ]}),

    bind: function () {
        uki("#uml-state-editor Button").bind("click", function(e){
            UMLStateEditor.controller[this.id()].click(e);
        });
    },

    controller: {
        "uml-state-done-btn": {
            click: function() {
                UMLStateEditor.label = $U.get("uml-state-label");
                UMLStateEditor.entry = $U.get("uml-state-entry");
                UMLStateEditor.exit = $U.get("uml-state-exit");
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