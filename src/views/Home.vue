<template>
  <div></div>
</template>

<script>
import { ROLE, PATH } from "../common/const";
  export default {
    beforeMount() {
      // 设置不同角色访问的首页
      let role = sessionStorage.getItem("role");
      console.log(role)
      if(role === ROLE.ADMIN) {
        this.$router.push(PATH.ADMIN.path);
      } else if(role === ROLE.STAFF){
        this.$router.push(PATH.S)
      } else if (role === ROLE.GM) {
        this.$router.push(PATH.GM.path);
      }
      else {
        this.$router.push("/error");
      }
    }
  }
</script>

<style scoped>
</style>
