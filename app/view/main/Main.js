/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('KirwanHighPBS.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: [
    'Ext.toolbar.TextItem',
    'Ext.view.View',
    'Ext.ux.DataView.Animated'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'label',
        text: 'Positive Behaviour Support - Merit system',
        padding: 10,
        height: 40
    },
        {
            region: 'west',
            xtype: 'panel',
            title: 'Classes',
            width: 250,
            split: true,
            collapsible: true,
            items: [{
                xtype: 'gridpanel',
                header: false,
                hideHeaders: true,
                columns: [
                    { text: 'Class', dataIndex: 'ClassID', flex: 1 }
                ],
                store: 'Classes',
                listeners: {
                    cellclick: function (gridView, htmlElement, columnIndex, dataRecord) {
                        var stuStore = Ext.getStore('Students');
                        stuStore.getProxy().setExtraParam('id', dataRecord.data.ClassID);
                        stuStore.load();
                    }
                }
            }]
        },
        {
            region: 'center',
            xtype: 'gridpanel',
            title: 'Students',
            store: 'Students',
            columns: [
                    {
                        text: 'Photo', dataIndex: 'PhotoPath', renderer: function (value) {
                            return Ext.String.format(
                                '<img src="{0}" width="60" height="71"/>',
                                value
                            );
                        },
                    },
                    {
                        text: 'Name', dataIndex: 'Preferred_Last_Name', renderer: function (value, p, model) {
                            return Ext.String.format(
                                '{0}, {1}',
                                value,
                                model.get('Preferred_First_Name')
                            );
                        }, flex: 1
                    },
                    {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        items: [{
                            iconCls:'add-icon',
                            tooltip: 'Add Merit',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Msg.alert('Add Merit', 'To ' + rec.get('EQID'));
                            }
                        }]
                    }
            ]
        }]
});
