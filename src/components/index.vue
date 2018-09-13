<template>
    <div class="content">
        <div class="cont" ref="cont">
            <Cars :carsList="carsList" :brandClick="brandClick"/>
        </div>
        <Nav :navList="navList" :navMove="navMove"/>
        <BrandList :hideBrandList="hideBrandList"/>
    </div>
</template>

<script>
import Cars from './index/index';
import Nav from './index/nav';
import BrandList from './index/brandList';
import { debounce, throttle, lazyLoad } from './utiles/util';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState({
            carsList: state => state.index.carsList,
            navList: state => state.index.navList,
            data: state => state.index.data,
            showBrandList: state => state.index.showBrandList,
            brandList: state => state.index.brandList
        })
    },
    methods: {
        ...mapActions({
            carList: 'carList',
            getBrandList: 'getBrandList'
        }),
        brandClick(id){
            this.$store.dispatch('getBrandList', { id })
            this.$store.dispatch('showBrandList', 'active')
        },
        hideBrandList(){
            this.$store.dispatch('showBrandList', '')
        },
       navMove(text){
            let el = document.querySelector(`#${text}`);
            this.$refs.cont.scrollTop = el.offsetTop;
       }
    },
    mounted () {
        this.carList();
    },
    components:{
        Cars,
        Nav,
        BrandList
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    width: 100%;
    height: 100%;
    position: relative;
}
.cont{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
</style>
