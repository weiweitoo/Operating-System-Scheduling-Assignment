<template>
  <div id="app">
    <nav-bar></nav-bar>
    <el-col :span="21" :offset="3">
    	<router-view></router-view>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import 'assets/css/cssreset.css';
@import url('https://fonts.googleapis.com/css?family=Raleway');
@import 'assets/css/globalstyle.css';
</style>
