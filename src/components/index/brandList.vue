<template>
    <div  :class='showBrandList' ref='brandList' class="brand-list" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend="touchEnd">
        <aside v-for="(item, index) in brandList" :key="index">
            <p>{{item.GroupName}}</p>
            <ul>
                <li v-for="(value, key) in item.GroupList" :key="key" @click="toDetail(value.SerialID)">
                    <img v-lazy="value.Picture" alt="">
                    <div>
                        <p>{{value.AliasName}}</p>
                        <p>{{value.DealerPrice}}</p>
                    </div>
                </li>
            </ul>
        </aside>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    methods: {
        touchStart(e){
            let touch = e.touches[0];
            this.startPageX = touch.pageX;
        },
        touchMove(e){
            let touch = e.touches[0];
            this.movePageX = touch.pageX;
            this.posX = this.movePageX - this.startPageX;
            if( this.posX > 0 ){
                 this.$refs.brandList.style.transform = `translate3d(${this.posX}px, 0, 0)`;
            }
        },
        touchEnd(e){
            this.$refs.brandList.style = '';
            if( this.posX > 130){
                this.hideBrandList();
            }
        },
        toDetail(id){
            this.$router.push({
                path:'/detail',
                query:{
                    id
                }
            });
            this.$store.dispatch('showBrandList', '')
        }
    },
    computed: {
        ...mapState({
            brandList: state => state.index.brandList,
            showBrandList: state => state.index.showBrandList,
        })
    },
    props: {
        hideBrandList: {
            type: Function
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../scss/index/_brandList.scss';
</style>


