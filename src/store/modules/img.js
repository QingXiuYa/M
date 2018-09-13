import { getImageList, getShowImg, getShowImageList } from '../../api';

const state = {
    img_list: [],
    imgTemplateSerialID: 0,
    imgTemplateId: 0,
    color: '颜色',
    type: '车款',
    isShowImg: false,
    // 组件 showimg
    showImgData: [],
    isShowImgList: false,
    showImgListData: [],
    page: 1,
    showIndex: 0,
    isLoad: false
}

const mutations = {
    getImageList(state, id){
        state.id = id;
        getImageList(id).then(res=>res.json())
            .then(res=>{ 
                state.img_list = res.data;
                console.log(res.data);
            })
    },
    imgTemplateSerialID(state, payload){
        state.imgTemplateSerialID = payload;
    },
    imgTemplateId(state, payload){
        state.imgTemplateId = payload
    },
    isShowImg(state, payload){
        state.isShowImg = payload
    },
    // 组件 getShowImg
    getShowImg(state, payload){
        payload.size ? payload.size : 30
        state.page = payload.page;
        getShowImg(payload).then(res=>res.json())
            .then(res=>{
                if(res.code == 1){
                    state.showImgData = res.data.List;
                    console.log(res.data.List);
                }else{
                    alert(res.msg);
                }
            })
    },
    // 组件 imgList
    isShowImgList(state, payload){
        state.isShowImgList = payload;
    },
    getShowImageList(state, payload){
        state.page = payload.page;
        getShowImageList(payload).then(res=>res.json())
            .then(res=>{
                if(res.code == 1){
                    state.showImgListData = state.showImgListData.concat(res.data.List);
                    console.log(state.showImgListData);
                    
                }else{
                    alert(res.msg)
                }
            })
    },
    addPage(state){
        state.page++
    },
    showIndex(state, payload){
        state.showIndex = payload;
    },
    emptyImgList(state){
        state.showImgListData = [];
    },
    changeLoad(state, payload){
        state.isLoad = payload;
    }
}

const actions = {
    getImageList(context, payload){
        context.commit('getImageList', payload)
    },
    // 组件 showImg
    getShowImg(context, payload){
        context.commit('getShowImg', payload)
    },
    getShowImageList(context, payload){
        context.commit('getShowImageList', payload)
    }
}

export default {
    state,
    mutations,
    actions
};