<template>
	<el-col :span="21">
		<pie-bar v-bind:PieBarData="Data" v-bind:StartTime="StartTime"></pie-bar>
		<table-input @clicked="getInput" :Quantum="true"></table-input>
	</el-col>
</template>

<script>
import {Process_RR} from "./../module/computation.js";
export default {
  name: 'RoundRobin',
  data: function(){
  	return {
  		Data:[],
  		StartTime:0,
  	}
  },
  methods:{
  	getInput(value,quantum) {
  		var Result = Process_RR(value,quantum);
			this.Data = Result.Processes;
			this.StartTime = Result.StartTime;
    }
  }
}
</script>

<style type="text/css">
</style>