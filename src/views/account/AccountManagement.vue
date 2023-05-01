<template>
  <Layout>
    <Title title="账户管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible=true">新增账户</el-button>

    <div class="hello">
      <el-row class="table-grid-content">
        <el-col :span="18" class="grid">
          <el-input v-model="input" placeholder="请输入账户名称"></el-input>
        </el-col>
      </el-row>
    </div>

    <div style="margin-top: 10px">
      <el-table
          :data="myaccountList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="名称"
            width="400">
        </el-table-column>
        <el-table-column
            prop="money"
            label="金额"
            width="400">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="editAccount(scope.row.id)"
                type="text"
                size="small">
              编辑
            </el-button>
            <el-button
                @click="deleteAccount(scope.row.id)"
                type="text"
                size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增账号"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="accountForm" label-width="100px" ref="accountForm" :rules="rules">

          <el-form-item label="名称: " prop="name">
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('accountForm')">立即创建</el-button>
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


import {createAccount, deleteById, getAllAccount, updateAccount} from "@/network/account";
import valid from "mockjs/src/mock/valid";

export default {
  name: 'AccountManagement',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      accountList: [],
      dialogVisible:false,
      accountForm: {
        name: '',
        money: '',
      },
      editDialogVisible: false,
      editInfo: {},
      input:'',
    }
  },

  computed: {
    myaccountList() {
        return this.accountList.filter((item) => String(item.name).indexOf(this.input) > -1)
      }
    },

  async mounted() {
    console.log(this.accountList.length)
    await getAllAccount({}).then(_res => {
      this.accountList = this.accountList.concat(_res.result)
    })
  },
  methods: {
    getAccount() {
      getAllAccount({}).then(_res => {
        this.accountList = _res.result
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
          this.getAccount()
        })
      }
    },
    deleteAccount(id){
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
      this.purchaseForm = {
        purchaseSheetContent: [
          {
            name: '',
            money: '',
            operator:'',
          }
        ]
      }
    },

    submitForm(formName) {
      this.$refs.accountForm.validate((valid)=> {
        if (valid) {
          console.log(this.accountForm);
          createAccount(this.accountForm).then(_res => {
            if (_res.msg === 'Success') {
              this.accountList.push(this.accountForm)
              this.$message.success('创建成功!')

              this.dialogVisible = false
              this.resetForm()
              this.getAccount()
            }
          })
        }
      })
    },
    filterTag(value, row) {
      return row.type === value
    },

    editAccount(id) {
      this.editInfo = this.accountList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    }
  }
}
</script>

<style>

</style>