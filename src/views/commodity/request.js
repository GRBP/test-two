import ledgerReq from '@/network/ajax';

export const getDictInfo = params => ledgerReq.$get("/goods/findByPage", params);//分页查询

export const addDict = params => ledgerReq.$post('/goods/addGoods', params);//添加商品

export const editDict = params => ledgerReq.$post('/goods/editGoods', params);//修改商品

export const deleteDict = params => ledgerReq.$delete('/goods/deleteGoods/' + params);











export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);

export const exportBillInfo = params => ledgerReq.$get('/bill/exportBill', params);

export const deleteBillList = params => ledgerReq.$post('/bill/deleteBillList', params);



