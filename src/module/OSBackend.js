var Example = [
	{Name: "P0", BurstTime: 10, ArrivalTime: 8 , Piority: 1},
	{Name: "P1", BurstTime: 6 , ArrivalTime: 4 , Piority: 2},
	{Name: "P2", BurstTime: 8 , ArrivalTime: 10, Piority: 3},
	{Name: "P3", BurstTime: 2 , ArrivalTime: 4 , Piority: 4},
	{Name: "P4", BurstTime: 12, ArrivalTime: 0 , Piority: 5}
];//LeftTime

var AssignmentExample = [
	{Name: "P0", BurstTime: 6 , ArrivalTime: 0 , Piority: 3},
	{Name: "P1", BurstTime: 4 , ArrivalTime: 1 , Piority: 3},
	{Name: "P2", BurstTime: 6 , ArrivalTime: 5 , Piority: 1},
	{Name: "P3", BurstTime: 6 , ArrivalTime: 6 , Piority: 1},
	{Name: "P4", BurstTime: 6 , ArrivalTime: 7 , Piority: 5},
	{Name: "P5", BurstTime: 6 , ArrivalTime: 8 , Piority: 6}
];//LeftTime

//Input for Round Robin
var ExampleRR = [
	{Name: "P0", BurstTime: 6 , ArrivalTime: 0 , Piority: 3},
	{Name: "P1", BurstTime: 4 , ArrivalTime: 1 , Piority: 3},
	{Name: "P2", BurstTime: 6 , ArrivalTime: 5 , Piority: 1},
	{Name: "P3", BurstTime: 6 , ArrivalTime: 6 , Piority: 1},
	{Name: "P4", BurstTime: 6 , ArrivalTime: 7 , Piority: 5},
	{Name: "P5", BurstTime: 6 , ArrivalTime: 8 , Piority: 6}
];//LeftTime, StopTime


function Process_Repacker(Input, InQ = 0)
{
	var ProQueue;
	if (InQ <= 0)
	{
		console.log("A");
		ProQueue = {Processes: []};
		for(var i = 0;i < Input.length;i++)
		{
			Input[i].LeftTime = Input[i].BurstTime;
			ProQueue.Processes.push(Input[i]);
		}
	}
	else
	{
		console.log("B");
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
		if (CurrentPro >= 0)
		{
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

export function Process_RR(Input, InQ)
{
	var ProQueue = Process_Repacker(Input, InQ);
	var ProGanC = {Processes: []};
	var ProTime = {TimeDetail: []};
	
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
		if (CurrentPro >= 0)
		{
			ProQueue.Processes[CurrentPro].LeftTime -= 1;
			QuantumCount -= 1;
			RunTime += 1;
			//console.log(ProQueue.Processes[CurrentPro].Name,ProQueue.Processes[CurrentPro].LeftTime,TimeFlow);
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

export function Process_SRTN(Input)
{
	var ProQueue = Process_Repacker(Input);
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
		if (CurrentPro >= 0)
		{
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

export default {Process_FCFS,Process_RR,Process_SRTN}