<template>
  <div @click='handleFullScreen'>
    <el-icon>
      <FullScreen />
    </el-icon>
  </div>
</template>

<script setup>
import { FullScreen } from '@element-plus/icons-vue'
import screenfull from 'screenfull'
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}
</script>

<style lang='scss' scoped>

</style>
