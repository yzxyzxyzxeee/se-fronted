<template>
    <div style="width:80%">
      <el-form label-position="right" ref="form" :model="form" label-width="150px">
        
        <el-form-item label="员工">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        
        <el-form-item label="选择绩效月份" style="width:100%">
          <el-date-picker
            v-model="form.month"
            type="month"
            style="width:70%,margin-left=5px"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="团队合作意识">
          <el-slider
            v-model="form.cooperation"
            :step="1"
            :max="20"
            show-stops>
          </el-slider>
        </el-form-item>

        <el-form-item label="自主学习能力">
          <el-slider
            v-model="form.self_learning"
            :step="1"
            :max="20"
            show-stops>
          </el-slider>
        </el-form-item>

        <el-form-item label="创造和灵活性">
          <el-slider
            v-model="form.creativity"
            :step="1"
            :max="20"
            show-stops>
          </el-slider>
        </el-form-item>

        <el-form-item label="按时完成工作">
          <el-slider
            v-model="form.work_on_scedule"
            :step="1"
            :max="20"
            show-stops>
          </el-slider>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">录入员工绩效</el-button>
          <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
   
<script>
  export default {
    data() {
      return {
        form: {
          id: '',
          month:'',
          cooperation: '',
          self_learning: '',
          creativity: '',
          work_on_scedule:''
        }
      }
    },
    methods: {
      onSubmit(){
            console.log("添加成功")
            console.log(this.form,"添加绩效成功")
        },

      submit(){
        FaddUser(this.form).then(()=>{
            //重新获取列表的接口
            console.log("添加成功")
            console.log(this.form,"添加绩效成功")
            }
          )
        },
    }
  }
</script>
   
<style scoped>
 div{
	white-space: nowrap; 
 }	
</style>