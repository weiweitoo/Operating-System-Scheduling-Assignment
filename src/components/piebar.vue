<template>
	<div id="gantt-chart" class="custom-scrollbar">
		<div v-for="cell in tableData" class="gantt-chart-item">
			{{ cell.Name }}
			<div class="time">
				{{ cell.EndTime }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'piebar',
  data: function() {
    return {
	    TotalTime : 0,
    }
  },
  props:['pieBarData'],
  computed:{
  	tableData: function(){
  		return this.pieBarData;
  	}
  },
  mounted(){
  	this.UpdatePieBar(this.pieBarData);
  },
  methods:{
  	randomLightColor : function(){
  		return "rgb(" + ((Math.random() * 140) + 70) + "," + ((Math.random() * 140) + 70) + "," + ((Math.random() * 140) + 70) + ")";
  	},
  	UpdatePieBar : function(newData){
	  	if(newData.length>0){
	  		// Get total endtime
		  	this.TotalTime += newData[newData.length-1].EndTime;
		  	// Update Piebar dynamically
		  	var block = document.getElementsByClassName("gantt-chart-item");
		  	setTimeout(function(){
  		  	for (var i = 0; i < block.length; i++) {
  		  		block[i].style.width = 70 + (newData[i].BurstTime/this.TotalTime * 60) + "px";
  					if(newData[i].Name === "X"){
  						block[i].style.backgroundColor = "#333333";	
  					}
  					else{
  						block[i].style.backgroundColor = this.randomLightColor();
  					}
  		  	}
  		  	this.successNotification();
		  	}.bind(this),0)
	  	}
  	},
    successNotification() {
      this.$message({
        message: 'Success',
        type: 'success'
      });
    },
  },
  watch:{
  	pieBarData: {
  		handler : function(newVal, oldVal){
	  		console.log(newVal);
	  		this.UpdatePieBar(newVal);
	  	},
	  	immediate: false
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
	-webkit-transition: all 0.2s ease-out;
	-moz-transition: all 0.2s ease-out;
	-ms-transition: all 0.2s ease-out;
	-o-transition: all 0.2s ease-out;
	transition: all 0.2s ease-out;
}

.gantt-chart-item:hover{
	opacity: 0.8;
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
