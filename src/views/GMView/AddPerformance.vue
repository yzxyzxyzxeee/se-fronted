<template>
  <div style="width:80%">
    <el-form label-position="right" ref="form" :model="form" label-width="150px">

      <el-form-item label="员工">
        <el-input v-model="form.id"></el-input>
      </el-form-item>

      <el-form-item label="选择绩效月份" style="width:100%" >
        <el-input v-model="form.month" placeholder="请输入月"></el-input>
      </el-form-item>

      <el-form-item label="团队合作意识">
        <el-slider
            v-model="form.p1"
            :step="1"
            :max="20"
            show-stops>
        </el-slider>
      </el-form-item>

      <el-form-item label="自主学习能力">
        <el-slider
            v-model="form.p2"
            :step="1"
            :max="20"
            show-stops>
        </el-slider>
      </el-form-item>

      <el-form-item label="创造和灵活性">
        <el-slider
            v-model="form.p3"
            :step="1"
            :max="20"
            show-stops>
        </el-slider>
      </el-form-item>

      <el-form-item label="按时完成工作">
        <el-slider
            v-model="form.p4"
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

import {AddPerformance} from "@/network/gm";

export default {
  data() {
    return {
      form: {
        name: '',
        month:'',
        p1: '',
        p2: '',
        p3: '',
        p4:''
      }
    }
  },
  mounted(){
    let name1 = sessionStorage.getItem("name")
    this.form.name = name1
  },
  methods: {
    onSubmit(){
      AddPerformance(this.form).then(_res =>{
        if(_res.message === 'Success'){
          this.$message.success("添加成功")
        }else{
          this.$message.error("添加失败")
        }
      })
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