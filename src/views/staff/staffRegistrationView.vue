<template>
  <Layout>
    <Title title="员工信息登记"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible=true">新建入职</el-button>

    <div class="hello">
      <el-row class="table-grid-content">
        <el-col :span="18" class="grid">
          <el-input v-model="input" placeholder="请输入员工姓名"></el-input>
        </el-col>
      </el-row>
    </div>

    <div style="margin-top: 10px">
      <el-table
        :data="mystaffList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="gender"-->
<!--          label="性别"-->
<!--          width="50">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="birth"-->
<!--          label="出生日期"-->
<!--          width="200">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="phoneNumber"
          label="手机"
          width="200">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="role"-->
<!--          label="工作岗位"-->
<!--          width="100">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="baseSalary"
          label="基本工资"
          width="200">
        </el-table-column>
        <el-table-column
          prop="jobSalary"
          label="岗位工资"
          width="200">
        </el-table-column>
        <el-table-column
          prop="jobLevel"
          label="岗位级别"
          width="200">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="salaryCalculateWay"-->
<!--          label="薪资计算方式"-->
<!--          width="200">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="salaryCalculateWay"-->
<!--          label="薪资发放方式"-->
<!--          width="150">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              @click.native.prevent="editStaff(scope.row.id)"-->
<!--              type="text"-->
<!--              size="small">-->
<!--              编辑-->
<!--            </el-button>-->
<!--            <el-button-->
<!--              @click="deleteStaff(scope.row.id)"-->
<!--              type="text"-->
<!--              size="small">-->
<!--              删除-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>

    <!-- 新建入职的标签页 -->
    <el-dialog
      title="新建入职"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">

        <el-form :model="staffForm" label-width="100px" ref="staffForm" >

          <el-form-item label="姓名" prop="name">
            <el-input v-model="staffForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop = "gender">
            <el-select v-model="staffForm.gender">
              <el-option
                v-for="item in genderList"
                :key="item.id"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth"><!--TODO 复选框-->
            <el-date-picker
              v-model="staffForm.birth"
              type="datetime">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="手机" prop="phone">
            <el-input v-model="staffForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="工作岗位" prop = "job">
            <el-select v-model="staffForm.job">
              <el-option
                v-for="item in jobList"
                :key="item.id"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本工资" prop="baseSalary">
            <el-input v-model="staffForm.baseSalary"></el-input>
          </el-form-item>
          <el-form-item label="岗位工资" prop="jobSalary">
            <el-input v-model="staffForm.jobSalary"></el-input>
          </el-form-item>
          <el-form-item label="岗位级别" prop="jobLevel">
            <el-input v-model="staffForm.jobLevel"></el-input>
          </el-form-item>
          <el-form-item label="薪资计算方式" prop = "salaryCalculateWay">
            <el-select v-model="staffForm.salaryCalculateWay">
              <el-option
                v-for="item in salaryWayList"
                :key="item.id"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资发放方式" prop="salaryProvideWay">
            <el-input v-model="staffForm.salaryProvideWay"></el-input>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('staffForm')">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改账户信息"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="close()">
      <el-form :model="editInfo" :label-width="'100px'" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="editInfo.name" placeholder="请输入账户的姓名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";


import {createStaff, getAllStaff} from "@/network/staff";
import {deleteById, updateAccount} from "@/network/account";


export default {
  name: 'staffRegistrationView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      genderList: [
        { id: 1, name: "male", value: 'male'},
        { id: 2, name: "female", value: 'female'},
      ],
      salaryWayList: [
        // 为1时是“库存人员和人力资源人员实行月薪制”
        // 为2时是“销售人员实行基本工资+提成的制度”
        // 为3时是“经理年薪制度”
        { id: 1, name: "库存人员和人力资源人员实行月薪制", value: 1},
        { id: 2, name: "销售人员实行基本工资+提成的制度", value: 2},
        { id: 3, name: "经理年薪制度", value: 3},
      ],
      staffForm: {
        name: '',
        realName: '',
        gender: '',
        birth: '',
        phoneNumber: '',
        baseSalary: '',
        job: '',
        jobLevel: '',
        jobSalary: '',
        salaryCalculateWay: '',
        salaryProvideWay: '',
      },
      staffList: [],
      dialogVisible:false,
      editDialogVisible: false,
      editInfo: {},
      input:'',
      jobList: [
        { id: 1, name: "库存管理人员", value: "INVENTORY_MANAGER"},
        { id: 2, name: "进货销售人员", value: "SALE_STAFF"},
        { id: 3, name: "财务人员", value: "FINANCIAL_STAFF"},
        { id: 4, name: "销售经理", value: "SALE_MANAGER"},
        { id: 5, name: "人力资源人员", value: "HR"},
        { id: 6, name: "总经理", value: "GM"}
      ]
    }
  },

  computed: {
    mystaffList() {
      return this.staffList.filter((item) => String(item.name).indexOf(this.input) > -1)
    }
  },

  async mounted() {
    console.log(this.staffList.length)
    //没有实现getall方法, 显示不出来东西
    await getAllStaff({}).then(_res => {
      this.staffList = this.staffList.concat(_res.result)
    })
  },
  methods: {
    getStaff() {
      getAllStaff({}).then(_res => {
        this.staffList = _res.result
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm()
          done();
        })
        .catch(_ => {});
    },

    handleEdit(type) {
      if (type === false) {
        console.log("false!!!!!!false!!!!!!false!!!!!!false!!!!!!")
        this.editInfo = {};
        this.editDialogVisible = false;
      } else if (type === true) {
        updateAccount(this.editInfo).then(_res => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          console.log("success!!!success!!!success!!!success!!!")
          this.editInfo = {};
          this.editDialogVisible = false;
          this.resetForm()
          this.getStaff()
        })
      }
    },

    deleteStaff(id){
      let config = {
        params: {
          id: id
        }
      };
      this.$confirm('是否要删除该账户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(config).then(_res => {
          if (_res.msg === 'Success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.reload();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        this.reload();
      })
    },

    resetForm() {
      this.staffForm = {
          name: '',
          realName: '',
          gender: '',
          birth: '',
          phoneNumber: '',
          baseSalary: '',
          job: '',
          jobLevel: '',
          jobSalary: '',
          salaryCalculateWay: '',
          salaryProvideWay: '',
      }
    },

    submitForm(formName) {
       this.$refs.staffForm.validate((valid) =>{
         if (valid) {
          let params = {
            name: this.staffForm.name,
            realName: this.staffForm.name,
            birth: this.staffForm.birth,
            phoneNumber: this.staffForm.phoneNumber,
            baseSalary: this.staffForm.baseSalary,
            job: this.staffForm.job,
            jobLevel: this.staffForm.jobLevel,
            jobSalary: this.staffForm.jobSalary,
            salaryCalculateWay: this.staffForm.salaryCalculateWay,
            password: "123456",
          }
          let tmp = {
            name: "caoxin11",
            realName: "realname",
            password: "123456",
            job: "HR",
            //gender: "male"
          }
          console.log(params);
          createStaff(params).then(_res => {
            if (_res.msg === 'Success') {
              this.staffList.push(this.staffForm)
              this.$message.success('创建成功!')

              this.dialogVisible = false
              this.resetForm()
              //this.getStaff()
            } else console.log(_res)
          })
        }
      })

    },
    filterTag(value, row) {
      return row.type === value
    },

    editStaff(id) {
      this.editInfo = this.staffList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    }
  }
}
</script>

<style>

</style>