<template>
  <layout>
    <Title title="员工打卡"></Title>
    <el-button type="primary" size="medium" @click="submitCheckIn">打卡</el-button>
  </layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";

import {checkIn} from "@/network/staff";

export default {
  name: "staffClockIn",
  components: { Layout, Title },
  data() {
    return {
      Form: {
        name
      }
    }
  },
  methods: {
    submitCheckIn() {
      this.Form.name = sessionStorage.getItem("name")
      let param = {
        name: this.Form.name,
      }
      let job = sessionStorage.getItem("role")
      if (job !== "GM") {
        this.$message.success('打卡成功')
        checkIn(param).then(_res => {
          if(_res.msg === 'Success') {

          } else this.$message.success('打卡失败')
        })
      } else {
        this.$message.success('您无需打卡')
      }

    }
  }
};
</script>

<style>

</style>