<template>  
    <div class="type">
        <p @click="back">全部车款</p>
        <div class="type-list">
            <div class="item-list">
                <div class="type-nav">
                    <span v-for="(item, index) in yearList" :key="index" :class='active==index?"active":""'  @click="getInfoList({year:item, index})">{{item}}</span>
                </div>
                <div v-for="(item, index) in infoList" :key="index" v-if="item.list.length">
                    <p>
                        <span>{{item.info}}</span>
                    </p>
                    <ul>
                        <li v-for="(value, key) in item.list" :key="key">
                            <p>
                                <span>{{value.market_attribute.year}}版</span>
                                <span>{{value.car_name}}</span>
                            </p>
                            <p>
                                <span>{{value.horse_power}}马力</span>
                                <span>{{value.gear_num}}档</span>
                            </p>
                            <p>
                                <span>指导价 {{value.market_attribute.dealer_price_max}}</span>
                                <span>{{value.market_attribute.dealer_price_min}}起</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
    export default{
        computed: {
            ...mapState({
                infoList: state => state.details.typeList,
                yearList: state => state.details.years,
                active: state => state.details.active,
            })
        },
        methods: {
            ...mapActions({
                getInfoList: 'getInfoList'
            }),
            back(){
                window.history.go(-1)
            },
            init(){
                console.log(this.yearList);
            },
            getinfoList(obj){
                this.$store.dispatch('getInfoList', obj)
            },
        },
        beforeMount(){
           
            // this.$store.dispatch('getInfoList', {year: '2018', index: 0});
        },
        mounted() {
             this.$store.dispatch('getDetailData', {
                id:this.$route.query.id,
                cb: ()=>{
                    this.getinfoList({year: '2018', index:0});
                }
            });
            
        },
    }
</script>
<style lang="scss" scoped>
@import '../../scss/img/_type.scss';
</style>
