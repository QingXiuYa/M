<template>
    <div class="car">
        <div class="img">
            <img v-lazy="detailInfo && detailInfo.CoverPhoto" @click="toImg(detailInfo.SerialID)">
            <span>{{detailInfo.pic_group_count}}张照片</span>
        </div>
        <div class="info">
            <p >{{detailInfo.market_attribute&&detailInfo.market_attribute.dealer_price}}</p>
            <p >指导价 {{detailInfo.market_attribute&&detailInfo.market_attribute.official_refer_price}}</p>
            <div class="action">
                <button data-hover="hover"  @click="toQuotation(detailInfo.list[0].car_id)">{{detailInfo.BottomEntranceTitle}}</button>
            </div>
        </div>
        <div class="car-list">
            <div class="type">
                <span v-for="(item, index) in yearList" :key="index" @click="getinfoList({year:item, index:index})" :class='active==index?"active":""'>{{item}}</span>
            </div>
            <div class="list">
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
                            <div class="btn">询问底价</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div data-hover="hover" class="bottom flex-column flex-centerY">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>
    
<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            detailInfo: state => state.details.detailInfo,
            infoList: state => state.details.infoList,
            yearList: state =>  state.details.yearList,
            active: state => state.details.active,
            id: state => state.details.id,
        })
    },
    methods: {
        getinfoList(obj){
            this.$store.dispatch('getInfoList', obj)
        },
        toImg(id){
            this.$router.push({
                path: '/img',
                query:{
                    id
                }
            })
        },
        toQuotation(id){
            this.$router.push({
                path: '/quotation',
                query: {
                    id
                }
            })
        }
    },
    mounted() {
        this.$store.dispatch('getDetailData', {
            id: this.$route.query.id,
            // cb: ()=>{}
        });
    },
}
</script>

<style lang="scss" scoped>
@import '../scss/_detail.scss';
</style>

