Ext.define('KirwanHighPBS.store.StudentSearch', {
    extend: 'Ext.data.Store',
    model: 'KirwanHighPBS.model.StudentSearchItem',
    alias: 'StudentSearchStore',
    proxy: {
        type: 'ajax',
        limitParam: null,
        url: 'https://eqnoq2146006.noq.eq.edu.au/InSchoolUAT/api/Student/Search',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});