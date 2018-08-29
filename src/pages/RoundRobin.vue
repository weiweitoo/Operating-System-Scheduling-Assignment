<template>
	<el-col :span="21">
		<pie-bar></pie-bar>
		<table-input @clicked="onClickChild" :quantum="true"></table-input>
	</el-col>
</template>

<script>
export default {
  name: 'RoundRobin',
  methods:{
  	onClickChild (value) {
		console.log(value) // someValue
    }
  }
}
</script>

<style type="text/css">
	
</style>