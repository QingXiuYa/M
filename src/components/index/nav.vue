<template>
    <div class="nav-list" @touchstart="touchStart" @touchend="touchEnd" ref="nav_list">
        <span v-for="(item, index) in navList" :key="index">{{item}}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            navList: state => state.index.navList
        })
    },
    methods: {
        touchStart(e){
            let touch = e.touches[0];
            let height = (window.innerHeight - window.innerWidth / 750 * 100 * 0.4 * this.navList.length) / 2;
            let index = Math.floor((touch.pageY - height) / 20);
            if(index < 0 ){
                index = 0;
            } else if(index > this.navList.length - 1){
                index = this.navList.length - 1;
            }
            this.index = index;
        },
        touchEnd(){
            let text = this.$refs.nav_list.children[this.index].innerText;
            this.navMove(text)
        }
    },
    props:{
        navMove: {
            type: Function
        }
    }
}
</script>
<style scoped lang='scss'>
@import '../../scss/index/_nav.scss';
</style>
