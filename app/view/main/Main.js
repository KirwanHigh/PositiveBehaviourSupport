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
        text: 'Positive Behaviour Support Merit system',
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
            tbar: [{
                xtype: 'combo',
                store: 'StudentSearch',
                fieldLabel: 'Search',
                minChars: 2,
                typeAhead: false,
                hideTrigger: true,
                anchor: '100%',
                flex: 1,
                listeners: {
                    select: function( combo, records, eOpts )
                    {
                        var stu = records[0].data;
                        var message = 'Add merit to ' + stu.First_Name + ' ' + stu.Last_Name;
                        Ext.MessageBox.confirm('PBS - Merit system', message, function (btn, text) {
                            if (btn == 'yes') {
                                load.show();
                                var path = 'https://eqnoq2146006.noq.eq.edu.au/InSchool/api/Student/AddMerit';
                                Ext.Ajax.request({
                                    url: path,
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    jsonData: {
                                        EQID: stu.EQID,
                                        Points: 1
                                    },
                                    success: function (response) {
                                        var jsonResp = Ext.util.JSON.decode(response.responseText);
                                        Ext.Msg.alert('PBS - Merit system', jsonResp.Message);
                                    }
                                });
                            }
                        }, this);
                    }
                },
                listConfig: {
                    loadingText: 'Searching...',
                    emptyText: 'No matching students found.',

                    itemSelector: '.search-item',

                    // Custom rendering template for each item
                    itemTpl: [
                        '<div class=\"search-item\"><span><img height=\"71\" width=\"60\" src=\"{PhotoPath}\" alt=\"Student Photo\"/></span><h3><span>Home Group: {Roll_Class} (Yr{Year_Level})</br>Gender: {Gender}</span>{Preferred_Last_Name}, {Preferred_First_Name}</h3>Legal Name: {Last_Name}, {First_Name}</div>'
                    ]
                }
            }],
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
                            iconCls: 'add-icon',
                            tooltip: 'Add Merit',
                            handler: function (grid, rowIndex, colIndex) {
                                var load = new Ext.LoadMask(grid, { msg: 'Adding Merit...' });
                                load.show();
                                var rec = grid.getStore().getAt(rowIndex);
                                var path = 'https://eqnoq2146006.noq.eq.edu.au/InSchool/api/Student/AddMerit';
                                Ext.Ajax.request({
                                    url: path,
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    jsonData: {
                                        EQID: rec.get('EQID'),
                                        Points: 1
                                    },
                                    success: function (response) {
                                        var jsonResp = Ext.util.JSON.decode(response.responseText);
                                        Ext.Msg.alert('PBS - Merit system', jsonResp.Message);
                                    }
                                });
                                load.destroy();
                            }
                        }]
                    }
            ]
        }]
});
