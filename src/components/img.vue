<template>
    <div class="car-img">
        <div class="tit">
            <p><span @click="toColor(id)">{{color}}</span></p>
            <p><span @click="toType(id)">{{type}}</span></p>
        </div>
        <ul class="img-list">
            <li v-for="(item, index) in img_list" :key="index">
                <aside v-for="(value, key) in item.List" :key="key" >
                    <img :style='{"background-image": `url(${value.Url.replace("{0}", value.LowSize)})`}' @click="clickimg(item.Id, key)">
                    <div v-if="key==0" @click="clickImgList(item.Id)">
                        <p>{{item.Name}}</p>
                        <p>{{item.Count}}张></p>
                    </div>
                </aside>
            </li>
        </ul>
        <div v-if="isShowImg" class="show-img">
            <ShowImg />
        </div>
        <div v-if="isShowImgList" class="show_img_list">
            <ShowImgList />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ShowImg from './img/showImg';
import ShowImgList from './img/imgList';

export default {
    computed: {
        ...mapState({
            img_list: state => state.img.img_list,
            imgList: state => state.img.imgList,  
            color: state => state.img.color,
            type: state => state.img.type,
            isShowImg: state => state.img.isShowImg,
            isShowImgList: state => state.img.isShowImgList,
        })
    },
    methods: {
        ...mapActions({
            getImageList: 'getImageList'
        }),
        clickimg(id, index){
            this.$store.commit('isShowImg', true);
            this.$store.commit('showIndex', index);
            this.$store.commit('imgTemplateId', id);
        },
        clickImgList(id){
            this.$store.commit('imgTemplateId', id);
            this.$store.commit('isShowImgList', true);
        },
        toColor(id){
            this.$router.push({
                path: '/color',
                query:{
                    id
                }
            })
        },
        toType(id){
            this.$router.push({
                path: '/type',
                query:{
                    id
                }
            })
        }
    },
    mounted () {
        this.getImageList(this.$route.query.id);
        this.$store.commit('imgTemplateSerialID', this.$route.query.id);
        
    },
    components: {
        ShowImg,
        ShowImgList
    }
}
</script>
<style lang="scss" scoped>
@import '../scss/_img.scss';
</style>


