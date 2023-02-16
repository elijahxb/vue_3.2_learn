<template>
  <div class='navbar' >
    <Fold id='siderTypeId' @click='toggleClick'></Fold>
    <Breadcrumb />
    <div class='navbar-right'>
      <Lang class='navbar-item' />
      <Avatar class='navbar-item' />
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from './components/breadcrumb'
import Avatar from './components/avatar'
import Lang from './components/lang'
import { Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
  console.log(icon.value)
}
const icon = computed(() => {
  return store.getters.siderType ? 'Fold' : 'Expand'
})
</script>

<style lang="scss" scoped>
#siderTypeId {
  height: 25px;
  cursor: pointer;
}
.user-avatar {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ::v-deep .navbar-item {
    display: inline-block;
    margin-left: 18px;
    font-size: 22px;
    color: #5a5e66;
    box-sizing: border-box;
    cursor: pointer;
  }
}
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
