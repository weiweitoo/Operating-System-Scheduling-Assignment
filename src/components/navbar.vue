<template>
  <el-col :span="3" id="side-nav-bar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item index="/fcfs">
        <i class="el-icon-menu"></i>
        <span slot="title">FCFS</span>
      </el-menu-item>
      <el-menu-item index="/round-robin">
        <i class="el-icon-menu"></i>
        <span slot="title">Round Robin</span>
      </el-menu-item>
      <el-menu-item index="/srtn">
        <i class="el-icon-menu"></i>
        <span slot="title">SRTN</span>
      </el-menu-item>
      <el-menu-item index="/three-level-queue">
        <i class="el-icon-menu"></i>
        <span slot="title">Three Level</span>
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
    position: fixed;
	}
</style>