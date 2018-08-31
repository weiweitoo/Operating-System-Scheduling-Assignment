<template>
	<div id="gantt-chart" class="custom-scrollbar">
		<div v-for="cell in tableData" class="gantt-chart-item">
			{{ cell.name }}
			<div class="time">
				{{ cell.endTime }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'piebar',
  data: function() {
    return {
	    totalTime : 0,
    }
  },
  props:['data'],
  computed:{
  	tableData: function(){
  		return this.data;
  	}
  },
  mounted(){
  	// Get total endtime
  	this.totalTime += this.data[this.data.length-1].endTime;
  	var block = document.getElementsByClassName("gantt-chart-item");
  	for (var i = 0; i < block.length; i++) {
  		block[i].style.backgroundColor = this.randomLightColor();
  		block[i].style.width = 70 + (this.data[i].burstTime/this.totalTime * 60) + "px";
  	}
  },
  methods:{
  	randomLightColor : function(){
  		return "rgb(" + ((Math.random() * 140) + 70) + "," + ((Math.random() * 140) + 70) + "," + ((Math.random() * 140) + 70) + ")";
  	}
  }
}
</script>

<style>

#gantt-chart{
	overflow-x: scroll;
  white-space: nowrap;
  padding: 20px 40px 0 40px;
}

.gantt-chart-item{
	color : white;	
	padding: 10px 0px;
	display: inline-block;
	position: relative;
	text-align: center;
	margin-bottom: 40px;
}

.gantt-chart-item .time{
	position : absolute;
	bottom: -25px;
	right : 0;
	color: black;
	transform: translateX(50%);
}

/*.custom-scrollbar{
	margin-left: 30px;
	float: left;
	height: 300px;
	width: 65px;
	background: #F5F5F5;
	overflow-y: scroll;
	margin-bottom: 25px;
}*/

.custom-scrollbar::-webkit-scrollbar-track{
	background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar{
	width: 6px;
	background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb{
	border-radius: 0px;
	background-color: #9ad3de;
	height: 5px;
}

</style>
