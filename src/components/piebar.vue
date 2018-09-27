<template>
	<div id="gantt-chart" class="custom-scrollbar">
		<span class="start-time" v-if="ShowingResult">{{ StartTime }}</span>
		<div v-for="cell in tableData" :class="'gantt-chart-item'+UniqueID">
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
	    ShowingResult : false,
	    UniqueID : '',
	    testData:''
    }
  },
  props:['PieBarData','StartTime'],
  computed:{
  	tableData: function(){
  		return this.PieBarData;
  	}
  },
  mounted(){
  	this.UpdatePieBar(this.PieBarData);
  	this.UniqueID = this.generateUniqueID();
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
		  	var block = document.getElementsByClassName("gantt-chart-item"+this.UniqueID);
		  	console.log(block);
		  	setTimeout(function(){
  		  	for (var i = 0; i < block.length; i++) {
  		  		block[i].style.width = 70 + (newData[i].ProcessedTime/this.TotalTime * 60) + "px";
  					if(newData[i].Name === "%{Dummy}%"){
  						newData[i].Name = "-";
  						block[i].style.backgroundColor = "#444444";	
  					}
  					else{
  						block[i].style.backgroundColor = this.randomLightColor();
  					}
  		  	}
  		  	this.successNotification();
		  	}.bind(this),0)
		  	this.ShowingResult = true;
	  	}
  	},
    successNotification: function() {
      this.$message({
        message: 'Success',
        type: 'success'
      });
    },
    generateUniqueID: function() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  },
  watch:{
  	PieBarData: {
  		handler : function(newVal, oldVal){
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
  position: relative;
}

.start-time{
	position: absolute;
	left: 40px;
	bottom: 15px;
}

[class^='gantt-chart-item']{
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

[class^='gantt-chart-item']:hover{
	opacity: 0.8;
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

[class^='gantt-chart-item'] .time{
	position : absolute;
	bottom: -25px;
	right : 0;
	color: black;
	transform: translateX(50%);
}

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
