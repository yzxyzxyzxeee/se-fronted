<template>
  <Layout>
    <Title title="促销策略"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定策略</el-button>

    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="已制定" name="SUCCESS">
          <div v-if="promotionForm.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <pidpromotion-list :list="promotionList"  @refresh="getPromotion()"/>
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
          <el-form-item label="策略编号: " prop="strategyId">
            <el-input v-model="promotionForm.strategyId"></el-input>
          </el-form-item>
          <el-form-item label="策略方式 : " prop="type">
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
import {createPromotion, getAllPromotion} from "@/network/promotion";
export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      activeName: 'PENDING',
      dialogVisible: false,
      promotionList: [],
      promotionForm: {
        strategyId:'',
        type:'',
      },
      completedReceipt: []
    }
  },
  async mounted() {
    this.getPromotion()
    await getAllPromotion({params: {state: 'SUCCESS'}}).then(_res => {
      this.completedReceipt = _res.result
    })
  },

  methods: {
    getPromotion() {
      getAllPromotion({}).then(_res => {
        console.log(_res);
        this.promotionList = _res.result
      })

    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.receiptForm = {}
            done();
          })
          .catch(_ => {
          });
    },
    resetForm() {
      this.promotionForm = {
        type: '',
        strategyId: '',
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createPromotion(this.promotionForm).then(_res => {
            console.log(this.promotionForm)
            if (_res.msg == 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.receiptForm = {}
              this.resetForm()
              this.getPromotion()
            }
          }).catch(_err=>{
            console.log(_err)
          })

        }
      })
    }

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