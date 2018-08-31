<template>
	<el-col :span="21">
		<pie-bar :data="Data"></pie-bar>
		<table-input @clicked="getInput" :Quantum="true"></table-input>
	</el-col>
</template>

<script>
import {Process_RR} from "./../module/OSBackend.js";
export default {
  name: 'RoundRobin',
  data: function(){
  	return {
  		Data:[
				{
					'name' : 'P0',
					'endTime' : 4,
					'burstTime' : 4
				},
				{
					'name' : 'P2',
					'endTime' : 7,
					'burstTime' : 3
				},
				{
					'name' : 'P3',
					'endTime' : 12,
					'burstTime' : 5
				}
			],
  	}
  },
  methods:{
  	getInput(value,quantum) {
			this.data = Process_RR(value,quantum);
			console.log(this.data);
    }
  }
}
</script>

<style type="text/css">
</style>