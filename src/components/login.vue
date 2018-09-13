<template>
    <div>
        <input type="text" placeholder="请输入你的用户名" ref="username">
        <input type="password" placeholder="请输入你的密码" ref="password">
        <button @click="login">登陆</button>
    </div>
</template>

<script>
    export default {
        methods:{
            login(){
                let username = this.$refs.username.value,
                    password = this.$refs.password.value;
                if (username == '123' && password == '123') {
                    window.localStorage.setItem('login','true')
                    window.history.back();
                }

            }
        }
    }
</script>
<style scoped>
    div{
        width: 100%;
        height: 100%;
    
    }
    input{
        display:block;
        border: 1px solid #ccc;
        margin-top: 10px;
        width: 150px;
        height: 30px;
        text-align: center;
    }
    button{
        width: 100px;
        height: 30px;
    }
</style>