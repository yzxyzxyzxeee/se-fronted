<template>
  <Layout>
    <Title title="促销策略"></Title>

    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售策略</el-button>

    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 1">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <promotion-list :list="pendingLevel1List" :fin="2" @refresh="getPromotion()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <promotion-list :list="successList" :fin="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <promotion-list :list="failureList" :fin="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建促销策略"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="promotionForm" label-width="100px" ref="promotionForm" :rules="rules">
          <el-form-item label="策略编号: " prop="id">
            <el-input v-model="promotionForm.id"></el-input>
          </el-form-item>
          <el-form-item label="策略方法 : " prop="type">
            <el-input v-model="promotionForm.type"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('promotionForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import PromotionList from "./PromotionList"
import {createPromotion, getAllPromotion} from "@/network/promotion";

export default {
  name: 'PromotionView',
  components: {
    Layout,
    Title,
    PromotionList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      promotionList: [],
      pendingLevel1List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      promotionForm: {
        promotionSheetContent: [
          {
            id:'',
            type:'',
            operator:'',
            state:''
          }
        ]
      },
      rules: {
        supplier: [
          { required: true, message: '111', trigger: 'change' }
        ],
      },
    }
  },
 async mounted() {
    console.log(this.promotionList.length)
    await getAllPromotion({}).then(_res => {
      this.promotionList = _res.result
      // this.pendingLevel1List = this.promotionList.filter(item => item.state === '待审批')
      // this.successList = this.promotionList.filter(item => item.state === 'SUCCESS')
      // this.failureList = this.promotionList.filter(item => item.state === 'FAILURE')
      this.pendingLevel1List = _res.result
      this.successList = _res.result
      this.failureList = _res.result
    })
  },
  methods: {
    getPromotion() {
      getAllPromotion({}).then(_res => {
        this.promotionList = _res.result
        // this.$message.success(this.promotionList.length)
        // this.pendingLevel1List = this.promotionList.filter(item => item.state === '待审批')
        // this.successList = this.promotionList.filter(item => item.state === 'SUCCESS')
        // this.failureList = this.promotionList.filter(item => item.state === 'FAILURE')
        this.pendingLevel1List = _res.result
        this.successList = _res.result
        this.failureList = _res.result
      })
      getAllPromotion({params:{state:'SUCCESS'}}).then(_res => {
        console.log(this.successList.length)
        this.successList= _res;
      })
      getAllPromotion({params:{state:'FAILURE'}}).then(_res => {
        console.log(this.failureList.length)
        this.failureList= _res;
      })
      getAllPromotion({pragma:{state:"PENDING"}}).then(_res => {
        console.log(this.pendingLevel1List.length)
        this.pendingLevel1List = _res;
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.promotionForm.id = null
          this.promotionForm.operator = sessionStorage.getItem("name")
          // this.promotionForm.type = null
          // this.promotionForm.state = null
          this.promotionForm.promotionSheetContent.forEach((item) => {
            item.id = parseInt(item.id)
          })
          createPromotion(this.promotionForm).then(_res => {
            console.log(_res)
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.resetForm()
              this.dialogVisible = false
              this.getPromotion()
            }
          })
        } else {
          this.$message.error('Error!');
        }
      });
    },
    resetForm() {
      this.promotionForm = {
        promotionSheetContent: [
          {
            id: '',
            type: '',
            operator: '',
            state:''
          }
        ]
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 10px auto 0;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>