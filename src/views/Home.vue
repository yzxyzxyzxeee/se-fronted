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
      // if(role === ROLE.ADMIN) {
      //   this.$router.push(PATH.ADMIN_ACCOUNT_MANAGEMENT.path);
      // } else
      if(role === ROLE.INVENTORY_MANAGER) {
        this.$router.push(PATH.InventoryManager.path);
      } else if (role === ROLE.SALE_STAFF ) {
        this.$router.push(PATH.SaleStaff.path);
      } else if (role === ROLE.SALE_MANAGER){
        this.$router.push(PATH.SaleManager.path)
      } else if (role === ROLE.HR) {
        this.$router.push(PATH.STAFF_REGISTRATION_VIEW.path);
      }else if (role === ROLE.FINANCIAL_STAFF) {
        this.$router.push(PATH.FinancialStaff.path);
      } else if (role === ROLE.GM){
        this.$router.push(PATH.GM.path)
      }
      else {
        this.$router.push("/error");
      }
    }
  }
</script>

<style scoped>
</style>
