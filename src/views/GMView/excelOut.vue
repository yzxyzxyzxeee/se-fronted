<template>
  <Layout>
    <Title title="打卡信息"></Title>
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <div class="table-body">
      <el-table
          :data="cur_list"
          style="width: 100%;"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
      >

        <el-table-column property="name" label="用户名" min-width="13%">
        </el-table-column>
        <el-table-column prop="year" label="月" min-width="12%">
        </el-table-column>
        <el-table-column prop="month" label="团队合作意识" min-width="12%">
        </el-table-column>
        <el-table-column prop="day" label="自主学习能力" min-width="12%">
        </el-table-column>
        <el-table-column prop="hour" label="创造性和灵活性" min-width="12%">
        </el-table-column>
        <el-table-column prop="minute" label="工作能力" min-width="12%">
        </el-table-column>
        <el-table-column prop="second" label="出勤率" min-width="12%">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx'
import { getClockIn } from "@/network/gm";

export default {
  components: {
    Layout,
    Title
  },
  data(){
    return {
      cur_list: [],
      cur_row:{},
      dialogVisible: false,
    }
  },
  computed: {
  },
  mounted() {
    getClockIn().then(_res => {
      console.log("打卡信息", _res.result);
      this.cur_list = _res.result;
      this.cur_row = this.cur_list[0];
    })

  },
  methods: {
    exportAsExcel() {
      const data = XLSX.utils.json_to_sheet(this.cur_list);
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data');
      XLSX.writeFile(wb,'ExportExcel.xlsx');
      alert("导出成功");
    },

    handleClose(done) {
      done();
    }
  }
};
</script>

<style scoped>

.table-body {
  width: 80%;
  margin: 20px auto;
}
</style>
