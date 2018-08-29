<template>
  <el-col :span="3" id="side-nav-bar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b">
      <el-menu-item index="1" route="fcfs">
        <i class="el-icon-menu"></i>
        <span slot="title">FCFS</span>
      </el-menu-item>
      <el-menu-item index="2" route="round-robin">
        <i class="el-icon-setting"></i>
        <span slot="title">Round Robin</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'navbar',
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}
</script>

<style type="text/css">
	#side-nav-bar{
		height: 100vh;
		background: #545c64;
	}
</style>