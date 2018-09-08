<template>
	<el-col :span="21">
		<pie-bar v-bind:PieBarData="PieBar1Data" v-bind:StartTime="PieBar1StartTime"></pie-bar>
    <pie-bar v-bind:PieBarData="PieBar2Data" v-bind:StartTime="PieBar2StartTime"></pie-bar>
    <pie-bar v-bind:PieBarData="PieBar3Data" v-bind:StartTime="PieBar3StartTime"></pie-bar>
		<table-input @clicked="getInput"></table-input>
	</el-col>
</template>

<script>
import {Three_level_queue} from "./../module/computation.js";
export default {
  name: 'ThreeLevelQueue',
	data: function(){
  	return {
  		PieBar1Data:[],
  		PieBar1StartTime:0,
      PieBar2Data:[],
      PieBar2StartTime:0,
      PieBar3Data:[],
      PieBar3StartTime:0,
  	}
  },
  methods:{
  	getInput(value) {
      console.log(value);
  		var Result = Three_level_queue(value);
      console.log(Result);
			this.PieBar1Data = Result[0].Processes;
			this.PieBar1StartTime = Result[0].StartTime;
      this.PieBar2Data = Result[1].Processes;
      this.PieBar2StartTime = Result[1].StartTime;
      this.PieBar3Data = Result[2].Processes;
      this.PieBar3StartTime = Result[2].StartTime;
    }
  }
}
</script>

<style type="text/css">
</style>