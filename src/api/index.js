// 动态判断请求类名
const domain = /localhost/ig.test(window.location.host) ? 'https://baojia.chelun.com' : 'http://baojia-test.chelun.com';

// 填充请求参数
function sendRequest(url) {
    let ua = navigator.userAgent,
        os = '';
    // 添加系统参数
    if ((/iPhone|iPad/ig).test(ua)) {
        os = 'ios';
    } else {
        os = 'android';
    }
    let char = '?';
    if (/\?/g.test(url)) {
        char = '&';
    } else {
        char = '?';
    }
    url += `${char}os=${os}&_=${+new Date()}`;
    return fetch(domain + url);
}

// 获取车型数据
export const carList = () => {
    return sendRequest('/v2-car-getMasterBrandList.html')
}

// 获取车系数据
export const getBrandList = (id) => {
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}

// 获取详情页数据
export const getDetailData = (id) => {
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}

// 获取图片数据
export const getImageList = (id) => {
    return sendRequest(`/v2-car-getImageList.html?SerialID=${id}`);
}

// 获取显示图片 组件的数据 VueAwesomeSwiper
export const getShowImg = ({ SerialID, ImageID, page, size }) => {
    return sendRequest(`/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&Page=${page}&PageSize=${size}`);
}

// 获取显示图片列表 组件的数据 list
export const getShowImageList = ({ SerialID, ImageID, page, size }) => {
    return sendRequest(`/v2-car-getCategoryImageList.html?SerialID=${SerialID}&ImageID=${ImageID}&Page=${page}&PageSize=${size}`);
}




export let getCityList = (provinceId) => {
    let search = ``;
    if (provinceId) {
        search += `provinceid=${provinceId}`;
    }
    return sendRequest(`${host}/v1-city-alllist.html?${search}`)
}

/**
 * 获取经销商列表
 * @param carId     车型id
 * @param cityId    城市id
 * @return promise 返回一个promise
 */
export let getDealerList = (carId, cityId) => {
    return sendRequest(`${host}/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`)
}

/**
 * 询问报价
 * @param carId         车型id
 * @param mobile        用户手机号
 * @param dealerIds     经销商id列表
 * @param location      用户所在城市
 * @param carname       选择车型的名字
 * @param locationid    用户所在城市id
 * @param name          用户的姓名
 * @param openUDID      设备号
 * @param flag          默认值1
 * @param orderTypeId   默认值1
 * @param channelId     默认值0
 * @return promise      返回一个pomise
 */
export let submit = (info) => {
    let search = ``;
    for (let item in info) {
        search += `&${item}=${info[item]}`;
    }
    search[0] = '?'
    return sendRequest(`${host}/h2-submit-lowprice.html${search}`);
}