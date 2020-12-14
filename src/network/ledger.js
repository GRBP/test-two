import {request} from './request';

//分页查询
export function getBillInfo(params) {
    // console.log('xxxxxxxxx');
    return request({
        url: '/bill/findByPage',
        params: params
    })
}

export function addBillInfo(params) {
    // console.log('xxxxxxxxx');
    return request({
        url: '/bill/addBill',
        method: 'post',
        data: params
    })
}

export function deleteBillInfo(params) {
    // console.log('xxxxxxxxx');
    return request({
        url: '/bill/deleteBill/'+params,
        method: 'delete'
    })
}

export function importBillInfo(params) {
    // console.log('xxxxxxxxx');
    return request({
        url: '/bill/importBill',
        method: 'post',
        data: params,
    })
}

export function exportBillInfo(params) {
    // console.log('xxxxxxxxx');
    return request({
        url: '/bill/exportBill',
         responseType: 'blob',
    })
}

