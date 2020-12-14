import ledgerReq from '@/network/ajax';

export const getBillInfo = params => ledgerReq.$get("/role/findByPage", params);

export const addBillInfo = params => ledgerReq.$post('/role/addRole', params);

export const editBill = params => ledgerReq.$post('/role/editRole', params);

export const deleteBillInfo = params => ledgerReq.$delete('/role/deleteRole/' + params);

export const deleteBillList = params => ledgerReq.$post('/role/deleteRoleList', params);





export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);





