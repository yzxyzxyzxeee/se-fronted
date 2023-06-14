<template>
  <div class="logout-name">{{ getUsername() }}</div>
  <Layout>
    <div style="margin-top: 10px">
      <el-table
          :data="staffForm"
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
export default {
  name: 'StaffInfoView',
  //存放 数据
  data() {
    return {
      staffForm: {
        name: sessionStorage.getItem("name"),
        gender: '',
        birth: '',
        phoneNumber: '',
        job: '',
      }
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
      })
    }

  },
  async mounted() {
    // await getStaffByName(name).then(_res => {
    //   this.staffForm = this.staffForm.concat(_res.result)
    // })
    await this.getStaff()
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