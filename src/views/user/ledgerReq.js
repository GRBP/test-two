import ledgerReq from '@/network/ajax';

export const getBillInfo = params => ledgerReq.$get("/user/findByPage", params);//获取用户数据

export const addBillInfo = params => ledgerReq.$post('/user/addUser', params);//增加用户

export const editBill = params => ledgerReq.$post('/user/editUser', params);//修改用户

export const deleteBillInfo = params => ledgerReq.$delete('/user/deleteUser/' + params);//删除用户

export const deleteBillList = params => ledgerReq.$post('/user/deleteUserList', params);//批量删除

export const exportBillInfo = params => ledgerReq.$get('/user/exportUser', params);//导出用户消息


export const importBillInfo = params => ledgerReq.$post('/bill/importBill', params);










