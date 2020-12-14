import ledgerReq from '@/network/ajax';

export const getDictInfo = params => ledgerReq.$get("/permit/findTree", params);//获取权限信息

export const addDict = params => ledgerReq.$post('/permit/addPermit', params);//添加

export const editDict = params => ledgerReq.$post('/permit/editPermit', params);//修改

export const deleteDict = params => ledgerReq.$delete('/permit/deletePermit/' + params);//删除








export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);

export const deleteBillList = params => ledgerReq.$post('/bill/deleteBillList', params);



