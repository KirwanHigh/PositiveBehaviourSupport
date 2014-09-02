Ext.define('KirwanHighPBS.store.Students', {
    extend: 'Ext.data.Store',
    model: 'KirwanHighPBS.model.StudentSearchItem',
    alias: 'StudentStore',
    proxy: {
        type: 'ajax',
        limitParam: null,
        url: 'https://eqnoq2146006.noq.eq.edu.au/InSchoolUAT/api/Timetable/SimpleClass',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});