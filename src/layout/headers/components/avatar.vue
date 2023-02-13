<template>
  <el-dropdown>
    <el-avatar shape="square" :size="40" :fit='fill' :src="avatarUrl" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click='logout'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const avatarUrl = ref(
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
)

const logout = () => {
  store.dispatch('app/logout')
}

</script>

<style lang='scss' scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
