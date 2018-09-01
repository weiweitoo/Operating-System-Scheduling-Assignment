<template>
	<el-col :span="21">
		<pie-bar v-bind:pieBarData="Data"></pie-bar>
		<table-input @clicked="getInput" :Quantum="true"></table-input>
	</el-col>
</template>

<script>
import {Process_RR} from "./../module/OSBackend.js";
export default {
  name: 'RoundRobin',
  data: function(){
  	return {
  		Data:[],
  	}
  },
  methods:{
  	getInput(value,quantum) {
			// this.data = Process_RR(value,quantum);
			this.Data = [
				{
					'Name' : 'P0',
					'EndTime' : 4,
					'BurstTime' : 4
				},
				{
					'Name' : 'P2',
					'EndTime' : 7,
					'BurstTime' : 3
				},
				{
					'Name' : 'P3',
					'EndTime' : 12,
					'BurstTime' : 5
				}
			];
			// console.log(this.Data);
    }
  }
}
</script>

<style type="text/css">
</style>