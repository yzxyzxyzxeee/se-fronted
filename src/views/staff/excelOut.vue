<template>
  <layout>
    <Title title="打卡信息导出"></Title>
    <el-button type="primary" size="medium" @click="exportAsExcel">信息导出</el-button>
  </layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx'
import { getClockIn } from "@/network/staff";

export default {
  components: {
    Layout,
    Title
  },
  data(){
    return {
      cur_list: [],
      dialogVisible: false,
    }
  },
  computed: {
  },
  mounted() {
    getClockIn().then(_res => {
      console.log("打卡信息", _res.result);
      this.cur_list = _res.result;
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
