import { getDetailData } from '../../api/index';

const state = {
    detailInfo: [],
    infoList: [],
    yearList: [],
    years: [],
    typeList: [],
    active: 0,
    id: 0
}

const mutations = {

    getDetailData(state, payload) {
        state.detailInfo = payload;
    },
    getInfoList(state, payload) {
        let year = payload ? payload.year : '全部';
        let index = payload ? payload.index : 0;
        state.active = index;
        let carObj = {};
        let yearList = ['全部'];
        let years = [];
        state.detailInfo.list && state.detailInfo.list.forEach(item => {
            let year = item.market_attribute.year;
            if (yearList.indexOf(year) != -1) {
                carObj[year].push(item)
            } else {
                yearList.push(year);
                years.push(year);
                carObj[year] = [item];
            }
        });
        // 年
        state.years = years;
        state.yearList = yearList;
        // 排序
        let sortCar = (arr) => {
            return arr.sort((a, b) => {
                if (a.exhaust < b.exhaust) {
                    return -1;
                } else if (a.exhaust > b.exhaust) {
                    return 1;
                } else {
                    if (a.max_power < b.max_power) {
                        return 1;
                    } else if (a.max_power > b.max_power) {
                        return -1;
                    } else {
                        return b.inhale_type - a.inhale_type;
                    }
                }
            })
        };

        // 处理
        let arr = [];

        for (let key in carObj) {
            arr = arr.concat(carObj[key])
        }

        // 排序
        arr = sortCar(arr);

        state.infoList = arr;
        let typeArr = [];
        arr.forEach(item => {
            if (typeArr.indexOf(item.exhaust_str + '/' + item.max_power_str + item.inhale_type) === -1) {
                typeArr.push(item.exhaust_str + '/' + item.max_power_str + item.inhale_type)
            }
        });

        // 按照排量 功率 分类
        // 全部数据
        let infoArr = [];
        typeArr.forEach(value => {
            let obj = {
                info: value,
                list: []
            }
            arr.forEach(item => {
                if (value == item.exhaust_str + '/' + item.max_power_str + item.inhale_type) {
                    obj.list.push(item)
                }
            })
            infoArr.push(obj)
        });
        // 根据年份分类 把年份对应的数据筛选出来
        let yearInfo = [];
        infoArr.forEach(item => {
            let obj = {
                info: item.info,
                list: []
            }
            if (obj.info === item.info) {
                obj.list = item.list.filter(value => {
                    if (year === value.market_attribute.year) {
                        return value;
                    }
                });
            }
            yearInfo.push(obj)
        });
        // 根据年份 渲染对应的数据
        state.infoList = yearInfo;
        state.typeList = yearInfo;

        // 如果点击的是全部 渲染全部数据
        if (year == '全部') {
            state.infoList = infoArr;
        }
    }
}

const actions = {
    getDetailData(context, payload) {
        getDetailData(payload.id).then(res => res.json())
            .then(res => {
                context.commit('getDetailData', res.data);
                context.commit('getInfoList')
                payload.cb && payload.cb();
            })
    },
    getInfoList(context, payload) {
        context.commit('getInfoList', payload)
    }
}

export default {
    state,
    mutations,
    actions
}