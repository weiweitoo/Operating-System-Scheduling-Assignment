<template>
  <div>
    <el-row>
      <div class="title">
        <h1>Presented by: </h1>
      </div>
    </el-row>
    <el-row>
  	  <el-col :span="18" :offset="3">
        <div class="content">
    	  	<el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="Student ID">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
          </el-table>
        </div>
  	  </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="gitlink">
          <a href="https://github.com/weiweitoo/Operating-System-Scheduling-Assignment">OS Scheduling GitHub</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
   data() {
      return {
        tableData: [{
          id: '1161303917',
          name: 'Oo Jin Heng'
        }, {
          id: '1161100643',
          name: 'Too Seng Wei'
        }, {
          id: '1161102454',
          name: 'Ching June Hao'
        }, {
          id: '1161100641',
          name: 'Alex Woon Jun Rong'
        }]
      }
    }
}
</script>

<style type="text/css">
  .el-col {
    border-radius: 4px;
  }
  .title
  {
    color: #606266;
    text-align: center;
    margin-top: 120px;
  }
  .content
  {
    margin-top: 40px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .gitlink
  {
    text-align: center;
    margin-top: 40px;
    padding: 40px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
    border-radius: 10px;
  }
  .gitlink:hover
  {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.15);
  }
</style>