<template>
    <div class="img" @click="hideImg">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-img">
            <!-- slides -->
            <swiper-slide v-for="(item, index) in showImgData" :key="index">
                <img :data-src="item.Url.replace('{0}', item.LowSize)" class="swiper-lazy">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            SerialID: state => state.img.imgTemplateSerialID,
            ImageID: state => state.img.imgTemplateId,
            showIndex: state => state.img.showIndex,
            showImgData: state => state.img.showImgData,
        }),
        swiperOption(){
            return {
                lazy: true,
            }
        },
        swipe() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        hideImg(){
            this.$store.commit('isShowImg', false);
        },
    },
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        console.log(this.showIndex);
        if((this.showIndex+1) < 30){
            this.$store.dispatch('getShowImg',{
                SerialID: this.SerialID,
                ImageID: this.ImageID,
                page: 1,
                size: 30
            });
        }else{
            console.log(this.showIndex);
            console.log(Math.ceil(this.showIndex/30));
            console.log(30 * Math.ceil(this.showIndex/30));

            this.$store.dispatch('getShowImg',{
                SerialID: this.SerialID,
                ImageID: this.ImageID,
                page: 1,
                size:  30 * Math.ceil((this.showIndex+1)/30)
            });
            this.page = this.showIndex;
        }
        
        this.swipe.slideTo(this.showIndex, 0, false);
    },
}
</script>

<style lang="scss" scoped>
@import '../../scss/img/_showImg.scss';
</style>


