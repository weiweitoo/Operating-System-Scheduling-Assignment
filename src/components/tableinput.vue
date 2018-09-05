<template>
  <div>
    <el-row type="flex" justify="center" class="padding-20">
      <el-col :offset="4" :span="18">
        <el-form :model="NewProcess" :rules="rules" :inline="true" ref="NewProcess" label-position="left" label-width="120px">
          <el-form-item label="Name:" prop="Name">
            <el-input v-model="NewProcess.Name"></el-input>
          </el-form-item>
          <el-form-item label="Burst Time:" prop="BurstTime">
            <el-input v-model="NewProcess.BurstTime"></el-input>
          </el-form-item>
          <el-form-item label="Priority:" prop="ArrivalTime">
            <el-input v-model="NewProcess.Priority"></el-input>
          </el-form-item>
          <el-form-item label="Arrival Time:" prop="Priority">
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
        Name: 'P0',
        BurstTime: 1,
        ArrivalTime: 1,
        Priority : 1,
      },
      Process: [],
      QuantumNum : 1,
      ProcessCounter : 0,
      rules: {
        Name: [
          { required: true, message: 'Required', trigger: 'blur' },
          { min: 1, max: 6, message: 'At least 1 to 6 character', trigger: 'blur' }
        ],
        BurstTime:[{ required: true, message: 'Required', trigger: 'blur' }],
        ArrivalTime:[{ required: true, message: 'Required', trigger: 'blur' }],
        Priority:[{ required: true, message: 'Required', trigger: 'blur' }],
      }
    }
  },
  props:['Quantum'],
  mounted(){
    console.log(GetAnswer());
  },
  methods: {
    createProcess: function () {
      this.$refs["NewProcess"].validate((valid) => {
        if (valid) {
          this.ProcessCounter++;
          this.Process.push(this.NewProcess)
          this.NewProcess = {Name: 'P'+this.ProcessCounter, BurstTime: 1, ArrivalTime: 1, Priority: 1}
          this.successNotification();
        }
        else{
          this.$message.error('Invalid Input');
        }
      });
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
