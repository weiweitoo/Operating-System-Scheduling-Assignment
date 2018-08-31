<template>
	  <el-col :span="21">
	  	<div class="grid-content center">
        <h1>There is nothing here.<br/> Why did you came here?</h1>
        <p>Go other page now</p>
      </div>
	  </el-col>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style type="text/css">
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .center{
  	text-align: center;
  	position: absolute;
  	top: 50%;
  	left: 50%;
  	transform: translateX(-50%) translateY(-50%);
  }
</style>