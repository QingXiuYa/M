<template>
    <div class="img_list"  @scroll="scroll">
       <ul>
           <li v-for="(item, index) in imgList" :key="index" :data-id="ImageID+'_'+index">
               <img :style='{"background-image": `url(${item.Url.replace("{0}",item.HighSize)})`}' @click="clickimg(index)">
           </li>
       </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            isShowImgList: state => state.img.isShowImgList,
            SerialID: state => state.img.imgTemplateSerialID,
            ImageID: state => state.img.imgTemplateId,
            imgList: state => state.img.showImgListData,
            page: state => state.img.page,
            isLoad: state => state.img.isLoad
        })
    },
    methods: {
        clickimg(index){
            // this.$store.commit('isShowImgList', false);
            // this.$store.commit('emptyImgList');
            this.$store.commit('isShowImg', true);
            console.log(this.ImageID, index);
            this.$store.commit('showIndex', index)
        },
        scroll(e){
            let sTop = e.target.scrollTop;
            let gHeight = e.target.children[0].getBoundingClientRect().height;
            let height = window.innerHeight + sTop;
            if(height > gHeight - 30){
                console.log('可以加载了！'); 
                this.$store.commit('changeLoad', true);
            }
            if(!this.isLoad){
                return;
            }
            if(this.isLoad){
                this.$store.commit('addPage');
                this.$store.dispatch('getShowImageList',{
                    SerialID: this.SerialID,
                    ImageID: this.ImageID,
                    page: this.page,
                    size: 30
                });
                this.$store.commit('changeLoad', false);
            }
        }   
    },
    mounted() {
        this.$store.dispatch('getShowImageList',{
            SerialID: this.SerialID,
            ImageID: this.ImageID,
            page: 1,
            size: 30
        })
    },
}
</script>

<style lang="scss" scoped>
@import '../../scss/img/_imgList.scss';
</style>


