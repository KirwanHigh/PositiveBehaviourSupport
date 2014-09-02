Ext.define('KirwanHighPBS.store.Classes', {
    extend: 'Ext.data.Store',
    model: 'KirwanHighPBS.model.SimpleClass',
    alias: 'ClassStore',
    proxy: {
        type: 'ajax',
        limitParam: null,
        url: 'https://eqnoq2146006.noq.eq.edu.au/InSchoolUAT/api/Timetable/GetTeacherClasses',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});