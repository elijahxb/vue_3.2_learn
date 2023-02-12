<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="$menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse = "!store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id.toString()"
      v-for="(item, index) in menusList"
      :key='item.id'
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + subitem.path"
        v-for='subitem in item.children'
        :key='subitem.id'
        @click="savePath(subitem.path)"
        >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ subitem.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import store from '@/store'

const iconList = ref(['user', 'setting', 'shop', 'ticket', 'pie-chart'])
const icon = ref('menu')
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenuList = async() => {
  menusList.value = await menuList()
  console.log(menusList)
}
initMenuList()

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}

</script>

<style lang='scss' scoped>

</style>
