<template>
    <div class="p">
        <header>
            <p>可向多个商家咨询最低价，商家及时回复</p>
            <img src="../images/icon-help.png" alt="">
        </header>
        <section class="content">
            <div class="q-info">
                <img :src="infoData.details?infoData.details.serial.Picture:''">
                <div>
                    <p>{{infoData.details?infoData.details.serial.AliasName:''}}</p>
                    <p>
                        <span>{{infoData.details?infoData.details.market_attribute.year:''}}款</span>
                        <span>{{infoData.details?infoData.details.car_name:''}}</span>
                    </p>
                </div>
            </div>
            <div class="self-info">
                <p class="tip">个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li>
                    <li>
                        <span>手机</span>
                        <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li>
                    <li><span>城市</span> <span  @click="showCity(true)">{{currentCity?currentCity:city.name+city.id}}</span></li>
                    <CitySelect :class="isShowCity?'active': ''"></CitySelect>
                </ul>
                <div class="quotation">
                    <div>询最低价</div>
                </div>
            </div>
            <div class="dealer-info">
                <p class="tip">选择报价经销商</p>
                <ul>
                    <li v-for="(item, index) in infoData.list" :key="index">
                        <p>
                            <span>{{item.dealerShortName}}</span>
                            <span>{{(item.promotePrice).slice(0,5)}}万</span>
                        </p>
                        <p>
                            <span>{{item.address}}</span>
                            <span>售{{item.saleRange}}</span>
                        </p>
                    </li>
                </ul>
            </div>
             
        </section>
       
        <footer>
            <button>询最低价</button>
        </footer>
    </div>
</template>
<script>
import CitySelect from './common/citySelect.vue';
import {mapState, mapMutations} from 'vuex';
export default {
    data () {
        return {
            cityId: 0,
            car_id: 0,
            infoData: {}
        }
    }, computed: {
            ...mapState({
                isShowCity: state=>state.quotation.isShowCity,
                currentCity: state=>state.quotation.currentCity,
                city: state=>state.quotation.city
            })
        },
        components: {
            CitySelect
        },
    methods: {
        ...mapMutations({
                showCity: 'quotation/showCity'
            }),
        getCityId(){
            fetch('https://baojia.chelun.com/location-client.html')
                .then(res=>res.json())
                .then(res=>{
                    this.cityId = res.data.CityID;
                    this.car_id = this.$route.query.id;
                    fetch(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${this.car_id}&cityId=${this.cityId}`)
                        .then(res=>res.json())
                        .then(res=>{
                        if(res.code){
                            this.infoData = res.data;
                        }else{
                            alert(res.msg)
                        }
                    })
                })
        }
    },
    mounted () {
        this.getCityId();
    
    }
};
</script>
<style lang="scss" scoped>
@import '../scss/_quotation.scss';
</style>