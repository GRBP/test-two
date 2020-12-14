import ledgerReq from '@/network/ajax';

export const getBillInfo = params => ledgerReq.$get("/bill/findByPage", params);

export const addBillInfo = params => ledgerReq.$post('/bill/addBill', params);

export const editBill = params => ledgerReq.$post('/bill/editBill', params);

export const deleteBillInfo = params => ledgerReq.$delete('/bill/deleteBill/' + params);

export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);

export const deleteBillList = params => ledgerReq.$post('/bill/deleteBillList', params);



