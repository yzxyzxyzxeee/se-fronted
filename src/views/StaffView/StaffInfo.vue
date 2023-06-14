<template>
  <Layout>
    <div style="margin-top: 10px">
      <el-table
          :data="a"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="80">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期"
            width="100">
        </el-table-column>
        <el-table-column
            prop="phoneNumber"
            label="手机"
            width="200">
        </el-table-column>
        <el-table-column
            prop="job"
            label="工作岗位"
            width="100">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import { getStaffByName} from "@/network/staff";
import Layout from "@/components/content/Layout.vue";
export default {
  name: 'StaffInfoView',
  components: { Layout },
  //存放 数据
  data() {
    return {
      staffForm: {
        name: '',
        gender: '',
        birth: '',
        phoneNumber: '',
        job: '',
      },
      a:[]
    }
  },
  //存放 方法
  methods: {
    getUsername() {
      return sessionStorage.getItem("name");
    },
    getStaff(){
      let name = sessionStorage.getItem("name")
      getStaffByName(name).then(_res => {
        this.staffForm = _res.result
        console.log(this.staffForm)
      })
    }

  },
  async mounted() {
    this.staffForm.name = sessionStorage.getItem("name")
    let name = sessionStorage.getItem("name")
    console.log(name,"name")
    await getStaffByName({name:name}).then(_res => {
      console.log("11111111")
      this.staffForm = _res.result
      this.a.push(this.staffForm)
    })
  },
}
</script>
<style>
.logout-name {
  min-width: 60px;
  background-color: #7e57c2 !important;
  border-color: #7e57c2 !important;
  color: #fff;
  border-radius: 16px;
  font-size: 14px;
  height: 32px;
  text-align: center;
  padding: 0 10px;
  margin-left: -10px;
  line-height: 32px;
  margin-bottom: 30px;
  cursor: pointer;
}
</style>