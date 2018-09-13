<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  color: #333;
}

html,
body,
#app{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
