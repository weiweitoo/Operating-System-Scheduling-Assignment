<template>
  <div>
    <el-row type="flex" justify="center" class="padding-20">
      <el-col :offset="4" :span="18">
        <el-form ref="form" :model="NewProcess" :inline="true" label-position="left" label-width="100px">
          <el-form-item label="Name:">
            <el-input v-model="NewProcess.Name"></el-input>
          </el-form-item>
          <el-form-item label="Burst Time:">
            <el-input v-model="NewProcess.BurstTime"></el-input>
          </el-form-item>
          <el-form-item label="Priority:">
            <el-input v-model="NewProcess.Priority"></el-input>
          </el-form-item>
          <el-form-item label="Arrival Time:">
            <el-input v-model="NewProcess.ArrivalTime"></el-input>
          </el-form-item>
          <el-form-item label="Quantum:" v-if="Quantum">
            <el-input v-model="QuantumNum"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="createProcess">Add Process</el-button>
        <el-button type="primary" @click="onClickButton">Compute Answer</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="padding-20">
      <el-col :offset="4" :span="20">
        <el-table
          :header-cell-style="{background : '#89bdd3',color : 'white'}"
          :data="Process"
          border
          stripe
          empty-text="Empty"
          style="width: 100%">
          <el-table-column
            prop="Name"
            label="Process Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="BurstTime"
            label="Burst Time"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ArrivalTime"
            label="Arrival Time"
            width="180">
          </el-table-column>
          <el-table-column
            prop="Priority"
            label="Priority"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            label="Action"
            width="100">
            <template slot-scope="scope">
               <el-button
                 size="mini"
                 type="danger"
                 @click="deletePerocess(scope.$index)">Delete
               </el-button>
           </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import GetAnswer from '../module/computation.js'
export default {
  name: 'tableinput',
  data: function(){
    return {
      NewProcess: {
        Name: 'Process 0',
        BurstTime: 0,
        ArrivalTime: 0,
        Priority : 0,
      },
      Process: [],
      QuantumNum : 0,
      ProcessCounter : 0
    }
  },
  props:['Quantum'],
  mounted(){
    console.log(GetAnswer());
  },
  methods: {
    createProcess: function () {
      this.ProcessCounter++;
      this.Process.push(this.NewProcess)
      this.NewProcess = {Name: 'Process '+this.ProcessCounter, BurstTime: 0, ArrivalTime: 0, Priority: 0}
      this.successNotification();
    },
    deletePerocess: function (index) {
      this.Process.splice(index, 1)
      this.successNotification();
    },
    onClickButton: function (event) {
      this.$emit('clicked', this.Process, this.QuantumNum)
    },
    successNotification() {
      this.$message({
        message: 'Success',
        type: 'success'
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
