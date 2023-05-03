<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible=true">新增客户</el-button>
    <div style="margin-top: 10px">
      <el-table
          :data="customerList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="id"
            label="id"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="70">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="100"
            :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.type === '供应商' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="level"
            label="级别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="150">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="150">
        </el-table-column>
        <el-table-column
            prop="zipcode"
            label="邮编"
            width="100">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="200">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="lineOfCredit"-->
<!--            label="应收额度(元)"-->
<!--            width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="receivable"-->
<!--            label="应收(元)"-->
<!--            width="120">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="payable"-->
<!--            label="应付(元)"-->
<!--            width="120">-->
<!--        </el-table-column>-->
        <el-table-column
            prop="operator"
            label="操作员"
            width="120">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">

            <el-button
                @click.native.prevent="editCustomer(scope.row.id)"
                type="text"
                size="small">
              编辑
            </el-button>

            <el-button
                @click="deleteCustomer(scope.row.id)"
                type="text"
                size="small">
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增客户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="customerForm" label-width="100px" ref="customerForm" :rules="rules">
          <el-form-item label="姓名: " prop="name">
            <el-input v-model="customerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="类型: " prop="type">
            <el-select v-model="customerForm.type" placeholder="请选择类型">
              <el-option
                  v-for="item in typeList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别: " prop="level">
            <el-input v-model="customerForm.level"></el-input>
          </el-form-item>
          <el-form-item label="电话: " prop="phone">
            <el-input v-model="customerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址: " prop="address">
            <el-input v-model="customerForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮编: " prop="zipcode">
            <el-input v-model="customerForm.zipcode"></el-input>
          </el-form-item>
          <el-form-item label="邮箱: " prop="email">
            <el-input v-model="customerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="应收额度（元）: " prop="lineOfCredit">
            <el-input v-model="customerForm.lineOfCredit"></el-input>
          </el-form-item>
          <el-form-item label="应收（元）: " prop="receivable">
            <el-input v-model="customerForm.receivable"></el-input>
          </el-form-item>
          <el-form-item label="应付（元）: " prop="payable">
            <el-input v-model="customerForm.payable"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('customerForm')">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="修改客户信息"
        :visible.sync="editDialogVisible"
        width="40%"
        @close="close()">
      <el-form :model="editInfo" :label-width="'100px'" size="mini">
        <el-form-item label="分类">
          <el-select v-model="editInfo.type">
            <el-option
                v-for="item in typeList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="editInfo.level">
            <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editInfo.name" placeholder="请输入客户的姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="editInfo.phone" placeholder="请输入客户的电话号码"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editInfo.address" placeholder="请输入客户的地址"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="editInfo.zipcode" placeholder="请输入客户的邮编"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="editInfo.email" placeholder="请输入客户的电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="应收额度" v-if="isGM">
          <el-input v-model="editInfo.lineOfCredit" placeholder="请输入客户的应收额度"></el-input>
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

import {createCustomer,updateCustomer, deleteById,getAllCustomer} from "../../network/customer";

export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      customerList: [],
      dialogVisible:false,
      customerForm: {

        type:'',
        level: '',
        name: '',
        phone: '',
        address: '',
        zipcode: '',
        email: '',
        lineOfCredit:'',
        receivable:'',
        payable:'',
        operator:'',

      },
      typeList: ['供应商', '销售商'],
      editDialogVisible: false,
      editInfo: {},
    }
  },
  async mounted() {
    console.log(this.customerList.length)
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
  },
  methods: {
    getCustomer() {
      getAllCustomer({}).then(_res => {
        this.customerList = _res.result
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
        updateCustomer(this.editInfo).then(_res => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          console.log("success!!!success!!!success!!!success!!!")
          this.editInfo = {};
          this.editDialogVisible = false;
          this.resetForm()
          this.getCustomer()
        })
      }
    },
    deleteCustomer(id){
      let config = {
        params: {
          id: id
        }
      };
      this.$confirm('是否要删除该客户？', '提示', {
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
        this.customerList = [];
        this.reload();
      })
    },

    resetForm() {
      this.purchaseForm = {
        purchaseSheetContent: [
          {
            id: '',
            type:'',
            level: '',
            name: '',
            phone: '',
            address: '',
            zipcode: '',
            email: '',
            lineOfCredit:'',
            receivable:'',
            payable:'',
            operator:'',
          }
        ]
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.customerForm.operator = sessionStorage.getItem("name")
          console.log(this.customerForm)
          createCustomer(this.customerForm).then(_res => {
            if (_res.msg === 'Success') {
              this.customerList.push(this.customerForm)
              this.$message.success('创建成功!')

              this.dialogVisible = false

              this.getCustomer()
            }
          })
        }
      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    editCustomer(id) {
      this.editInfo = this.customerList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    }
  }
}
</script>

<style>

</style>