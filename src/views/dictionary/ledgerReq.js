import ledgerReq from '@/network/ajax';

export const getDictInfo = params => ledgerReq.$get("/dictionary/findTree", params);

export const addDict = params => ledgerReq.$post('/dictionary/addDict', params);

export const editDict = params => ledgerReq.$post('/dictionary/editDict', params);

export const deleteDict = params => ledgerReq.$delete('/dictionary/deleteDict/' + params);



export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);

export const deleteBillList = params => ledgerReq.$post('/bill/deleteBillList', params);



