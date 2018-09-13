import { carList, getBrandList } from '../../api/index';

const state = {
    carsList: [],
    navList: [],
    data: [],

    brandList: [],
    showBrandList: ''
}

const mutations = {
    carList(state){
        carList().then(res=>res.json())
            .then(data=>{
                let navList = [];
                let carsList = [];

                // 去重 创建导航列表
                data.data.forEach(item => {
                    item.spelling = item.Spelling[0];  // 给所有数据添加 首字母
                    if (navList.indexOf(item.spelling) === -1) {
                        navList.push(item.spelling)
                    }
                });

                // 创建渲染列表
                navList.forEach(item => {
                    let obj = {
                        spelling: item,
                        list: []
                    }
                    data.data.forEach(value => {
                        if (value.spelling == obj.spelling) {
                            obj.list.push(value)
                        }
                    });
                    carsList.push(obj)
                });
                state.navList = navList;
                state.data = data;
                state.carsList = carsList;
            })
    },
    getBrandList(state,{ id }){
        getBrandList(id).then(res=>res.json())
            .then(res=>{
                state.brandList = res.data;
            })
    },
    showBrandList(state, payload){
        state.showBrandList = payload;
    },
}

const actions = {
    carList(context){
        context.commit('carList');
    },
    getBrandList(context, payload){
        context.commit('getBrandList', payload);
    },
    showBrandList(context, payload){
        context.commit('showBrandList', payload);
    }
}

export default {
    state,
    mutations,
    actions
};
