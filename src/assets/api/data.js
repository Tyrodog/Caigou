import axios from "./axios.js";

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getDate = ()=>{
    return axios.request({
        url: '/getDate',
        method: 'get',
    })
}

export const getUser = (params)=>{
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

/* export const getMenu = (params)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data: params
    })
} */