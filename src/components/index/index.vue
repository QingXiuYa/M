<template>
    <div class="car-list">
        <aside v-for="(item, index) in carsList" :key="index" :id="item.spelling">
            <p>{{item.spelling}}</p>
            <ul>
                <li v-for="(value, key) in item.list" :key="key" @click="brandClick(value.MasterID)">
                    <img v-lazy="value.CoverPhoto" src="../../images/load.gif" alt="">
                    {{value.Name}}
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
export default {
    props:{
        carsList: '',
        brandClick:{
            type: Function
        }
    },
}
</script>
<style scoped lang='scss'>
@import '../../scss/index/_index.scss';
</style>
