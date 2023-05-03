<template>
  <div class="card">
    <el-card v-for="(item, index) in list"  :key="item.index" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
<!--            <span><strong>id: </strong>{{item.id}}</span>-->
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
              type="primary" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 2"
              type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="fin === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="fin === 4" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>编号: </strong>{{item.id}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>操作人员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>优惠方式: </strong>{{item.type}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Approval} from '../../network/promotion'
export default {
  name: "PromotionList",
  props: {
    list: Array,
    fin: Number,
  },
  data() {
    return {
      showAll: [],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
  },
  methods: {
    authorization() {
      if (this.fin === 2 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }
    },
    approval(id) {
      let config = {
        params: {
          id: id,
          state: this.fin === 2 ? "PENDING" : "SUCCESS"
        }
      }
      if (this.fin === 2) {
        Approval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    },
    deny(id) {
      let config = {
        params: {
          id: id,
          state: "FAILURE"
        }
      }
      if (this.fin === 2) {
        Approval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>