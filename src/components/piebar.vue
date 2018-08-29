<template>
	<div id="gantt-chart" class="custom-scrollbar">
		<div v-for="answer in answers" class="gantt-chart-item">
			{{ answer.name }}
			<div class="time">
				{{ answer.endTime }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'piebar',
  data: function() {
    return {
    	answers:[
	       {
	         'name' : 'P1',
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
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 14,
	         'burstTime' : 2
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 15,
	         'burstTime' : 1
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 19,
	         'burstTime' : 4
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 23,
	         'burstTime' : 4
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 25,
	         'burstTime' : 2
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 26,
	         'burstTime' : 1
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 27,
	         'burstTime' : 1
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 30,
	         'burstTime' : 3
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 40,
	         'burstTime' : 10
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 43,
	         'burstTime' : 3
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       },
	       {
	         'name' : 'P3',
	         'endTime' : 143,
	         'burstTime' : 100
	       }
	     ],
	     totalTime : 0,
    }
  },
  mounted(){
  	// Get total endtime
  	this.totalTime += this.answers[this.answers.length-1].endTime;

  	console.log(this.totalTime);
  	var block = document.getElementsByClassName("gantt-chart-item");
  	for (var i = 0; i < block.length; i++) {
  		block[i].style.backgroundColor = this.randomLightColor();
  		block[i].style.width = 70 + (this.answers[i].burstTime/this.totalTime * 60) + "px";
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
