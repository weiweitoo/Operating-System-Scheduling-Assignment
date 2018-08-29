<template>
  <div>
    <el-row type="flex" justify="center" class="padding-20">
      <el-col :offset="4" :span="18">
        <el-form ref="form" :model="newProcess" :inline="true" label-position="left" label-width="100px">
          <el-form-item label="Name:">
            <el-input v-model="newProcess.name"></el-input>
          </el-form-item>
          <el-form-item label="Burst Time:">
            <el-input v-model="newProcess.burstTime"></el-input>
          </el-form-item>
          <el-form-item label="Priority:">
            <el-input v-model="newProcess.priority"></el-input>
          </el-form-item>
          <el-form-item label="Arrival Time:">
            <el-input v-model="newProcess.arrivalTime"></el-input>
          </el-form-item>
          <el-form-item label="Quantum:" v-if="quantum">
            <el-input v-model="quantumNum"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="createPerson">Add Process</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="padding-20">
      <el-col :offset="4" :span="20">
        <el-table
          :header-cell-style="{background : '#89bdd3',color : 'white'}"
          :data="process"
          border
          stripe
          empty-text="Empty"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="Process Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="burstTime"
            label="Burst Time"
            width="180">
          </el-table-column>
          <el-table-column
            prop="arrivalTime"
            label="Arrival Time"
            width="180">
          </el-table-column>
          <el-table-column
            prop="priority"
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
                 @click="deletePerson(scope.$index)">Delete
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
      newProcess: {
        name: '',
        burstTime: 0,
        arrivalTime: 0,
        priority : 0,
      },
      process: [],
      quantumNum : 0
    }
  },
  props:['quantum'],
  mounted(){
    console.log(GetAnswer());
  },
  methods: {
    createPerson: function () {
      this.process.push(this.newProcess)
      // 添加完newProcess对象后，重置newProcess对象
      this.newProcess = {name: '', burstTime: 0, arrivelTime: 0, priority: 0}
    },
    deletePerson: function (index) {
      // 删一个数组元素
      this.process.splice(index, 1)
    },
    onClickButton (event) {
      this.$emit('clicked', 'someValue')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
