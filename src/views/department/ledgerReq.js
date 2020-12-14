import ledgerReq from '@/network/ajax';

export const getDictInfo = params => ledgerReq.$get("/department/findTree", params);//获取部门信息

export const addDict = params => ledgerReq.$post('/department/addDept', params);//添加部门信息

export const editDict = params => ledgerReq.$post('/department/editDept', params);//修改部门

export const deleteDict = params => ledgerReq.$delete('/department/deleteDept/' + params);//删除部门








export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);

export const deleteBillList = params => ledgerReq.$post('/bill/deleteBillList', params);



