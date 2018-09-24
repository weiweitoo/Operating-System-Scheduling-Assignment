<template>
	<el-col :span="21">
		<pie-bar v-bind:PieBarData="Data" v-bind:StartTime="StartTime"></pie-bar>
		<table-input @clicked="getInput"></table-input>
	</el-col>
</template>

<script>
import {Process_Repacker,Process_FCFS} from "./../module/computation.js";
export default {
  name: 'FCFS',
	data: function(){
  	return {
  		Data:[],
  		StartTime:0,
  	}
  },
  methods:{
  	getInput(value) {
  		var Result = Process_FCFS(Process_Repacker(value));
			this.Data = Result.Processes;
			this.StartTime = Result.StartTime;
    }
  }
}
</script>

<style type="text/css">
</style>