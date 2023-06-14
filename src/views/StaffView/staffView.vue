<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Layout/>
      </el-aside>
      <el-container>
        <el-header>
          <Title/>
        </el-header>

        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  export default {
    components: {
        Layout,
        Title
    },
  };
</script>

<style scoped>
</style>
