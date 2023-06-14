<template>
  <el-form :model="Form" ref="pwdForm" :rules="rules">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input v-model="Form.oldPassword" placeholder="请输入旧密码" type="password" ></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="Form.newPassword" placeholder="请输入新密码" type="password"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPassword">
      <el-input v-model="Form.confirmPassword" placeholder="请确认密码" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="mini" @click="submitForm">保存</el-button>
      <el-button type="danger" size="mini" @click="close">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import {ediePas} from "@/network/staff";

export default {
  name: 'EditPas',
  //存放 数据
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.Form.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      },
      Form:{
        name: '',
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }

    }
  },
  mounted() {
    let name1 = sessionStorage.getItem("name")
    this.Form.name = name1
  },
  //存放 方法
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let name = this.Form.name;
          let oldPassword = this.Form.oldPassword;
          let newPassword = this.Form.newPassword;
          ediePas(name,oldPassword,newPassword).then(
              _res => {
                if(_res.message === 'Success'){
                  this.$message.success('修改成功,请重新登录');
                  this.logout();
                }
                else{
                  this.$message.error("原密码错误")
                  this.resetForm()
                }
              }
          );
        }
      });
    },
    close() {
      this.resetForm();
    },
    resetForm(){
      this.Form = {
        name: sessionStorage.getItem("name"),
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
      }
    },
    logout() {
      sessionStorage.removeItem("name"); // name
      sessionStorage.removeItem("role"); // role
      sessionStorage.removeItem("token"); // token
      // this.$router.push('/');
      location.href = "/";
    },
  }
}
</script>

<style scoped>
</style>