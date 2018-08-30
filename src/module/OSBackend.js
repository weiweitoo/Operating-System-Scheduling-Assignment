var Example = {
	Processes: [
	{Name: "P0", BurstTime: 10, LeftTime: 10, ArrivalTime: 8 , Piority: 1},
	{Name: "P1", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 4 , Piority: 2},
	{Name: "P2", BurstTime: 8 , LeftTime: 8 , ArrivalTime: 10, Piority: 3},
	{Name: "P3", BurstTime: 2 , LeftTime: 2 , ArrivalTime: 4 , Piority: 4},
	{Name: "P4", BurstTime: 12, LeftTime: 12, ArrivalTime: 0 , Piority: 5}
	]
};

var AssignmentExample = {
	Processes: [
	{Name: "P0", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 0 , Piority: 3},
	{Name: "P1", BurstTime: 4 , LeftTime: 4 , ArrivalTime: 1 , Piority: 3},
	{Name: "P2", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 5 , Piority: 1},
	{Name: "P3", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 6 , Piority: 1},
	{Name: "P4", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 7 , Piority: 5},
	{Name: "P5", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 8 , Piority: 6}
	]
};

//Input for Round Robin
var ExampleRR = {
	Processes: [
	{Name: "P0", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 0 , StopTime: 0 , Piority: 3},
	{Name: "P1", BurstTime: 4 , LeftTime: 4 , ArrivalTime: 1 , StopTime: 1 , Piority: 3},
	{Name: "P2", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 5 , StopTime: 5 , Piority: 1},
	{Name: "P3", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 6 , StopTime: 6 , Piority: 1},
	{Name: "P4", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 7 , StopTime: 7 , Piority: 5},
	{Name: "P5", BurstTime: 6 , LeftTime: 6 , ArrivalTime: 8 , StopTime: 8 , Piority: 6}
	], Quantum: 2
};

function Process_FCFS(Input)
{
	var ProQueue = Input;
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	
	var TimeFlow = 0;
	var RunTime = 0;
	var CurrentPro = -1;
	while(ProQueue.Processes.length > 0)
	{
		//Choose a process to run if empty
		if (CurrentPro == -1)
		{
			var TempPio = -1;
			var TempIndex = -1;
			for (var i = 0;i < ProQueue.Processes.length;i++)
			{
				var IPio = ProQueue.Processes[i].Piority;
				if (ProQueue.Processes[i].ArrivalTime > TimeFlow)
				{
					continue;
				}
				if (TempPio == -1)
				{
					TempPio = IPio;
					TempIndex = i;
					continue;
				}
				if (TempPio > IPio)
				{
					TempPio = IPio;
					TempIndex = i;
					continue;
				}
				if (TempPio == IPio)
				{
					var CArrive = ProQueue.Processes[i].ArrivalTime;
					var OArrive = ProQueue.Processes[TempIndex].ArrivalTime;
					if (CArrive <= OArrive)
					{
						TempPio = IPio
						TempIndex = i;
					}
					continue;
				}
			}
			CurrentPro = TempIndex;
		}
		//Pre-empt action
		var Preempted = false;
		var OPro = CurrentPro;
		for(var i = 0;i < ProQueue.Processes.length;i++)
		{
			if (i == CurrentPro)
			{
				continue;
			}
			if (ProQueue.Processes[i].ArrivalTime == TimeFlow)
			{
				var CPio = ProQueue.Processes[i].Piority;
				var OPio = ProQueue.Processes[CurrentPro].Piority;
				if (CPio < OPio)
				{
					CurrentPro = i;
					Preempted = true;
				}
			}
		}
		if (Preempted)
		{
			var OName = ProQueue.Processes[OPro].Name;
			ProGanC.Processes.push({Name: OName, EndTime: TimeFlow, ProcessedTime: RunTime});
			RunTime = 0;
		}
		//Run process
		ProQueue.Processes[CurrentPro].LeftTime -= 1;
		RunTime += 1;
		//console.log(ProQueue.Processes[CurrentPro].Name,ProQueue.Processes[CurrentPro].LeftTime,TimeFlow);
		//Process complete
		if (ProQueue.Processes[CurrentPro].LeftTime <= 0)
		{
			var OPro = ProQueue.Processes.splice(CurrentPro,1)[0];
			var OName = OPro.Name;
			var OInter = TimeFlow - OPro.ArrivalTime + 1;
			var OWait = OInter  - OPro.BurstTime;
			ProGanC.Processes.push({Name: OName, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
			ProTime.TimeDetail.push({Name: OName, InterTime: OInter, WaitTime: OWait});
			RunTime = 0;
			CurrentPro = -1;
		}
		//Time flows
		TimeFlow += 1;
	}
	var AvgIT = 0;
	var AvgWT = 0;
	var AvgSize = ProTime.TimeDetail.length;
	for(var i = 0;i < AvgSize;i++)
	{
		AvgIT += ProTime.TimeDetail[i].InterTime;
		AvgWT += ProTime.TimeDetail[i].WaitTime;
	}
	AvgIT = AvgIT/AvgSize;
	AvgWT = AvgWT/AvgSize;
	
	var Result = {
		Processes: ProGanC.Processes,
		ProcessTime: ProTime.TimeDetail,
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT}
	};
	return Result;
}

function Process_RR(Input)
{
	var ProQueue = Input;
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	
	var TimeFlow = 0;
	var CurrentPro = -1;
	var QuantumCount = ProQueue.Quantum;
	while(ProQueue.Processes.length > 0)
	{
		//Choose a process to run if empty
		if (CurrentPro == -1)
		{
			var TempPio = -1;
			var TempIndex = -1;
			for (var i = 0;i < ProQueue.Processes.length;i++)
			{
				var IPio = ProQueue.Processes[i].Piority;
				if (ProQueue.Processes[i].ArrivalTime > TimeFlow)
				{
					continue;
				}
				if (TempPio == -1)
				{
					TempPio = IPio;
					TempIndex = i;
					continue;
				}
				if (TempPio > IPio)
				{
					TempPio = IPio;
					TempIndex = i;
					continue;
				}
				if (TempPio == IPio)
				{
					var CStopTime = ProQueue.Processes[i].StopTime;
					var OStopTime = ProQueue.Processes[TempIndex].StopTime;
					if (CStopTime <= OStopTime)
					{
						TempPio = IPio
						TempIndex = i;
					}
					continue;
				}
			}
			CurrentPro = TempIndex;
		}
		//Run process
		ProQueue.Processes[CurrentPro].LeftTime -= 1;
		QuantumCount -= 1;
		//console.log(ProQueue.Processes[CurrentPro].Name,ProQueue.Processes[CurrentPro].LeftTime,TimeFlow);
		//Process complete
		if (ProQueue.Processes[CurrentPro].LeftTime <= 0)
		{
			var OPro = ProQueue.Processes.splice(CurrentPro,1)[0];
			var OName = OPro.Name;
			var OInter = TimeFlow - OPro.ArrivalTime + 1;
			var OWait = OInter  - OPro.BurstTime;
			ProGanC.Processes.push({Name: OName, EndTime: TimeFlow + 1});
			ProTime.TimeDetail.push({Name: OName, InterTime: OInter, WaitTime: OWait});
			QuantumCount = ProQueue.Quantum;
			CurrentPro = -1;
		}
		//Quantum count reach zero
		if (QuantumCount <= 0)
		{
			ProQueue.Processes[CurrentPro].StopTime = TimeFlow + 1;
			ProGanC.Processes.push({Name: ProQueue.Processes[CurrentPro].Name, EndTime: TimeFlow + 1});
			QuantumCount = ProQueue.Quantum;
			CurrentPro = -1;
		}
		//Time flows
		TimeFlow += 1;
	}
	var AvgIT = 0;
	var AvgWT = 0;
	var AvgSize = ProTime.TimeDetail.length;
	for(var i = 0;i < AvgSize;i++)
	{
		AvgIT += ProTime.TimeDetail[i].InterTime;
		AvgWT += ProTime.TimeDetail[i].WaitTime;
	}
	AvgIT = AvgIT/AvgSize;
	AvgWT = AvgWT/AvgSize;
	
	var Result = {
		Processes: ProGanC.Processes,
		ProcessTime: ProTime.TimeDetail,
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT}
	};
	return Result;
}

function Process_SRTN(Input)
{
	var ProQueue = Input;
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	
	var TimeFlow = 0;
	var RunTime = 0;
	var CurrentPro = -1;
	while(ProQueue.Processes.length > 0)
	{
		//Choose a process to run if empty
		if (CurrentPro == -1)
		{
			var TempTL = -1;
			var TempIndex = -1;
			for (var i = 0;i < ProQueue.Processes.length;i++)
			{
				var ITLeft = ProQueue.Processes[i].LeftTime;
				if (ProQueue.Processes[i].ArrivalTime > TimeFlow)
				{
					continue;
				}
				if (TempTL == -1)
				{
					TempTL = ITLeft;
					TempIndex = i;
					continue;
				}
				if (TempTL > ITLeft)
				{
					TempTL = ITLeft;
					TempIndex = i;
					continue;
				}
				if (TempTL == ITLeft)
				{
					var CPio = ProQueue.Processes[i].Piority;
					var OPio = ProQueue.Processes[TempIndex].Piority;
					if (CPio < OPio)
					{
						TempTL = ITLeft
						TempIndex = i;
						continue;
					}
					if (CPio == OPio)
					{
						var CArr = ProQueue.Processes[i].ArrivalTime;
						var OArr = ProQueue.Processes[TempIndex].ArrivalTime;
						if (CArr <= OArr)
						{
							TempTL = ITLeft
							TempIndex = i;
						}
					}
				}
			}
			CurrentPro = TempIndex;
		}
		//Pre-empt action
		var Preempted = false;
		var OPro = CurrentPro;
		for(var i = 0;i < ProQueue.Processes.length;i++)
		{
			if (i == CurrentPro)
			{
				continue;
			}
			if (ProQueue.Processes[i].ArrivalTime == TimeFlow)
			{
				var CBTime = ProQueue.Processes[i].LeftTime;
				var OBTime = ProQueue.Processes[CurrentPro].LeftTime;
				if (CBTime < OBTime)
				{
					Preempted = true;
					CurrentPro = i;
					continue;
				}
				if (CBTime == OBTime)
				{
					var CPio = ProQueue.Processes[i].Piority;
					var OPio = ProQueue.Processes[CurrentPro].Piority;
					if (CPio <= OPio)
					{
						Preempted = true;
						CurrentPro = i;
					}
				}
			}
		}
		if (Preempted)
		{
			var OName = ProQueue.Processes[OPro].Name;
			ProGanC.Processes.push({Name: OName, EndTime: TimeFlow, ProcessedTime: RunTime});
			RunTime = 0;
		}
		//Run process
		ProQueue.Processes[CurrentPro].LeftTime -= 1;
		RunTime += 1;
		//console.log(ProQueue.Processes[CurrentPro].Name,ProQueue.Processes[CurrentPro].LeftTime,TimeFlow);
		//Process complete
		if (ProQueue.Processes[CurrentPro].LeftTime <= 0)
		{
			var OPro = ProQueue.Processes.splice(CurrentPro,1)[0];
			var OName = OPro.Name;
			var OInter = TimeFlow - OPro.ArrivalTime + 1;
			var OWait = OInter  - OPro.BurstTime;
			ProGanC.Processes.push({Name: OName, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
			ProTime.TimeDetail.push({Name: OName, InterTime: OInter, WaitTime: OWait});
			RunTime = 0;
			CurrentPro = -1;
		}
		//Time flows
		TimeFlow += 1;
	}
	var AvgIT = 0;
	var AvgWT = 0;
	var AvgSize = ProTime.TimeDetail.length;
	for(var i = 0;i < AvgSize;i++)
	{
		AvgIT += ProTime.TimeDetail[i].InterTime;
		AvgWT += ProTime.TimeDetail[i].WaitTime;
	}
	AvgIT = AvgIT/AvgSize;
	AvgWT = AvgWT/AvgSize;
	
	var Result = {
		Processes: ProGanC.Processes,
		ProcessTime: ProTime.TimeDetail,
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT}
	};
	return Result;
}

function Three_level_queue(Input){

	var threeLevelQueue = Input;
	
	var threeLevelQueue1 = jQuery.extend(true, {}, threeLevelQueue);
	var threeLevelQueue2 = jQuery.extend(true, {}, threeLevelQueue);
	var threeLevelQueue3 = jQuery.extend(true, {}, threeLevelQueue);
	var queue1 = {Processes: [], Quantum: 2};
	var queue2 = {Processes: []};
	var queue3 = {Processes: []};

	for(var i=0;i<threeLevelQueue.Processes.length;i++){
		if(threeLevelQueue.Processes[i].Piority <= 2){
			queue1.Processes.push(threeLevelQueue1.Processes[i]);
		}if(threeLevelQueue.Processes[i].Piority <= 4){
			queue2.Processes.push(threeLevelQueue2.Processes[i]);
		}if(threeLevelQueue.Processes[i].Piority <= 6){
			queue3.Processes.push(threeLevelQueue3.Processes[i]);
		}
	}
	var totalLength = 0;
	for(var n=0; n<threeLevelQueue.Processes.length;n++){
		totalLength += threeLevelQueue.Processes[n].BurstTime;
	}




	for (var j=0;j<totalLength;j++){
		var dummyQ1 =  {Name: "X", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Piority: 2};
		queue1.Processes.push(dummyQ1);
		
		var dummyQ2 =  {Name: "X", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Piority: 4};
		queue2.Processes.push(dummyQ2);

		var dummyQ3 =  {Name: "X", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Piority: 6};
		queue3.Processes.push(dummyQ3);
	}

	for(var q2=0;q2<queue2.Processes.length;q2++){
		if(queue2.Processes[q2].Piority < 3){
			queue2.Processes[q2].Name = "X";
		}
	}

	for(var q3=0;q3<queue3.Processes.length;q3++){
		if(queue3.Processes[q3].Piority < 5){
			queue3.Processes[q3].Name = "X";
		}
	}


	// var returnQ1 = Process_RR(squeue1);
	return [Process_RR(queue1), Process_FCFS(queue2), Process_FCFS(queue3)];

}

console.log(Process_FCFS(Example));
console.log(Process_RR(ExampleRR));
console.log(Process_SRTN(AssignmentExample));