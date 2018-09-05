<template>
	<el-col :span="21">
		<pie-bar v-bind:PieBarData="Data" v-bind:StartTime="StartTime"></pie-bar>
		<table-input @clicked="getInput"></table-input>
	</el-col>
</template>

<script>
import {Three_level_queue} from "./../module/OSBackend.js";
export default {
  name: 'ThreeLevelQueue',
	data: function(){
  	return {
  		Data:[],
  		StartTime:0,
  	}
  },
  methods:{
  	getInput(value) {
  		var Result = Three_level_queue(value);
			this.Data = Result.Processes;
			this.StartTime = Result.StartTime;
    }
  }
}
</script>

<style type="text/css">
</style>