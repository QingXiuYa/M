<template>
    <div class="color">
       <p @click="back">全部颜色</p>
       <div>
           <p class="c-type">
               <span v-for="(item, index) in yearList" :class="ind==index?'active':''" :key="index" @click="clickYear(index, item)">{{item}}</span>
           </p>
           <ul>
               <li v-for="(item, index) in colorTypelist" :data-id="item.ColorId" :index="item.OrderId" :key="index">
                   <span :style='{"background":`${item.Value}`}'></span>
                   <span>{{item.Name}}</span>
               </li>
           </ul>
       </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                id: 0,
                ind: 0,
                colorData:{},
                yearList: [],
                colorTypelist: []
            }
        },
        methods: {
            back(){
                window.history.go(-1)
            },
            getColorData(id){
                fetch(`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${id}`)
                    .then(res=>res.json())
                    .then(res=>{
                       if(res.code){
                           this.colorData = res.data;
                           let yearList = [];
                           for(let i in res.data){
                               yearList.unshift(i)
                           }
                           this.yearList = yearList;
                           this.clickYear(0, this.yearList[0])
                       }else{
                           alert(res.msg)
                       }
                    })
            },
            clickYear(ind, type){
                this.ind = ind;
                this.colorTypelist = this.colorData[type];
            }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.getColorData(this.id);
        },
    }
</script>

<style lang="scss" scoped>
@import '../../scss/img/_imgColor.scss';
</style>

