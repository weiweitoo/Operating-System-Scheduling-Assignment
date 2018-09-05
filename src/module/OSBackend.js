function Process_Repacker(Input, InQ = 0)
{
	var ProQueue;
	if (InQ <= 0)
	{
		ProQueue = {Processes: []};
		for(var i = 0;i < Input.length;i++)
		{
			Input[i].LeftTime = Input[i].BurstTime;
			ProQueue.Processes.push(Input[i]);
		}
	}
	else
	{
		ProQueue = {Processes: [], Quantum: InQ};
		for(var i = 0;i < Input.length;i++)
		{
			Input[i].LeftTime = Input[i].BurstTime;
			Input[i].StopTime = Input[i].ArrivalTime;
			ProQueue.Processes.push(Input[i]);
		}
	}
	return ProQueue
}

export function Process_FCFS(Input)
{
	var ProQueue = Process_Repacker(Input);
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	var ProDummy = {Name: "%{Dummy}%", ProcessedTime: 0};
	
	var FirstTime = 0;
	var NeverFirst = true;
	
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
				var IPio = ProQueue.Processes[i].Priority;
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
			if (CurrentPro >= 0)
			{
				if (NeverFirst)
				{
					FirstTime = TimeFlow;
					NeverFirst = false;
				}
			}
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
				var CPio = ProQueue.Processes[i].Priority;
				var OPio = ProQueue.Processes[CurrentPro].Priority;
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
		if (CurrentPro >= 0)
		{
			ProQueue.Processes[CurrentPro].LeftTime -= 1;
			RunTime += 1;
			//Push dummy into Chart if available
			if (ProDummy.ProcessedTime > 0)
			{
				ProGanC.Processes.push({Name: ProDummy.Name, EndTime: TimeFlow, ProcessedTime: ProDummy.ProcessedTime});
				ProDummy.ProcessedTime = 0;
			}
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
		}
		else
		{
			if (!NeverFirst)
			{
				ProDummy.ProcessedTime += 1;
			}
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
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT},
		StartTime: FirstTime
	};
	return Result;
}

export function Process_RR(Input, InQ)
{
	var ProQueue = Process_Repacker(Input, InQ);
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	var ProDummy = {Name: "%{Dummy}%", ProcessedTime: 0};
	
	var FirstTime = 0;
	var NeverFirst = true;
	
	var TimeFlow = 0;
	var RunTime = 0;
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
				var IPio = ProQueue.Processes[i].Priority;
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
			if (CurrentPro >= 0)
			{
				if (NeverFirst)
				{
					FirstTime = TimeFlow;
					NeverFirst = false;
				}
			}
		}
		//Run process
		if (CurrentPro >= 0)
		{
			ProQueue.Processes[CurrentPro].LeftTime -= 1;
			QuantumCount -= 1;
			RunTime += 1;
			//Push dummy into Chart if available
			if (ProDummy.ProcessedTime > 0)
			{
				ProGanC.Processes.push({Name: ProDummy.Name, EndTime: TimeFlow, ProcessedTime: ProDummy.ProcessedTime});
				ProDummy.ProcessedTime = 0;
			}
			//Process complete
			if (ProQueue.Processes[CurrentPro].LeftTime <= 0)
			{
				var OPro = ProQueue.Processes.splice(CurrentPro,1)[0];
				var OName = OPro.Name;
				var OInter = TimeFlow - OPro.ArrivalTime + 1;
				var OWait = OInter  - OPro.BurstTime;
				//Check last process and merge them they are the same
				if (ProGanC.Processes.length > 0)
				{
					var LastName = ProGanC.Processes[ProGanC.Processes.length - 1].Name;
					if (LastName === OName)
					{
						ProGanC.Processes[ProGanC.Processes.length - 1].EndTime = TimeFlow + 1;
						ProGanC.Processes[ProGanC.Processes.length - 1].ProcessedTime += RunTime;
					}
					else
					{
						ProGanC.Processes.push({Name: OName, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
					}
				}
				else
				{
					ProGanC.Processes.push({Name: OName, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
				}
				ProTime.TimeDetail.push({Name: OName, InterTime: OInter, WaitTime: OWait});
				QuantumCount = ProQueue.Quantum;
				CurrentPro = -1;
				RunTime = 0;
			}
			//Quantum count reach zero
			if (QuantumCount <= 0)
			{
				ProQueue.Processes[CurrentPro].StopTime = TimeFlow + 1;
				
				//Check last process and merge them they are the same
				if (ProGanC.Processes.length > 0)
				{
					var LastName = ProGanC.Processes[ProGanC.Processes.length - 1].Name;
					if (LastName === ProQueue.Processes[CurrentPro].Name)
					{
						ProGanC.Processes[ProGanC.Processes.length - 1].EndTime = TimeFlow + 1;
						ProGanC.Processes[ProGanC.Processes.length - 1].ProcessedTime += RunTime;
					}
					else
					{
						ProGanC.Processes.push({Name: ProQueue.Processes[CurrentPro].Name, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
					}
				}
				else
				{
					ProGanC.Processes.push({Name: ProQueue.Processes[CurrentPro].Name, EndTime: TimeFlow + 1, ProcessedTime: RunTime});
				}
				QuantumCount = ProQueue.Quantum;
				CurrentPro = -1;
				RunTime = 0;
			}
		}
		else
		{
			if (!NeverFirst)
			{
				ProDummy.ProcessedTime += 1;
			}
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
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT},
		StartTime: FirstTime
	};
	return Result;
}

export function Process_SRTN(Input)
{
	var ProQueue = Process_Repacker(Input);
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	var ProDummy = {Name: "%{Dummy}%", ProcessedTime: 0};
	
	var FirstTime = 0;
	var NeverFirst = true;
	
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
					var CPio = ProQueue.Processes[i].Priority;
					var OPio = ProQueue.Processes[TempIndex].Priority;
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
			if (CurrentPro >= 0)
			{
				if (NeverFirst)
				{
					FirstTime = TimeFlow;
					NeverFirst = false;
				}
			}
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
					var CPio = ProQueue.Processes[i].Priority;
					var OPio = ProQueue.Processes[CurrentPro].Priority;
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
		if (CurrentPro >= 0)
		{
			ProQueue.Processes[CurrentPro].LeftTime -= 1;
			RunTime += 1;
			//Push dummy into Chart if available
			if (ProDummy.ProcessedTime > 0)
			{
				ProGanC.Processes.push({Name: ProDummy.Name, EndTime: TimeFlow, ProcessedTime: ProDummy.ProcessedTime});
				ProDummy.ProcessedTime = 0;
			}
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
		}
		else
		{
			if (!NeverFirst)
			{
				ProDummy.ProcessedTime += 1;
			}
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
		AverageTime: {InterTime: AvgIT, WaitTime: AvgWT},
		StartTime: FirstTime
	};
	return Result;
}

export function Three_level_queue(Input){

	var threeLevelQueue = Process_Repacker(Input);
	
	var threeLevelQueue1 = jQuery.extend(true, {}, threeLevelQueue);
	var threeLevelQueue2 = jQuery.extend(true, {}, threeLevelQueue);
	var threeLevelQueue3 = jQuery.extend(true, {}, threeLevelQueue);
	var queue1 = {Processes: [], Quantum: 2};
	var queue2 = {Processes: []};
	var queue3 = {Processes: []};
	for(var i=0;i<threeLevelQueue.Processes.length;i++){
		if(threeLevelQueue.Processes[i].Priority <= 2){
			queue1.Processes.push(threeLevelQueue1.Processes[i]);
		}if(threeLevelQueue.Processes[i].Priority <= 4){
			queue2.Processes.push(threeLevelQueue2.Processes[i]);
		}if(threeLevelQueue.Processes[i].Priority <= 6){
			queue3.Processes.push(threeLevelQueue3.Processes[i]);
		}
	}
	
	var totalLength = 0;
	for(var n=0; n<threeLevelQueue.Processes.length;n++){
		totalLength += threeLevelQueue.Processes[n].BurstTime;
	}

	for (var j=0;j<totalLength;j++){
		var dummyQ1 =  {Name: "%{Dummy}%", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Priority: 2};
		queue1.Processes.push(dummyQ1);
		
		var dummyQ2 =  {Name: "%{Dummy}%", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Priority: 4};
		queue2.Processes.push(dummyQ2);

		var dummyQ3 =  {Name: "%{Dummy}%", BurstTime: 0 , LeftTime: 0, ArrivalTime: j, Priority: 6};
		queue3.Processes.push(dummyQ3);
	}

	for(var q2=0;q2<queue2.Processes.length;q2++){
		if(queue2.Processes[q2].Priority < 3){
			queue2.Processes[q2].Name = "X";
		}
	}

	for(var q3=0;q3<queue3.Processes.length;q3++){
		if(queue3.Processes[q3].Priority < 5){
			queue3.Processes[q3].Name = "X";
		}
	}

	// var returnQ1 = Process_RR(squeue1);
	return [Process_RR(queue1), Process_FCFS(queue2), Process_FCFS(queue3)];
}

export default {Process_FCFS, Process_RR, Process_SRTN, Three_level_queue}