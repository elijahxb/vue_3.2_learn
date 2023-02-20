<template>
  <el-card>
<!--    单独写一行 el-row,目的是控制搜索框的尺寸样式-->
    <el-row :gutter='20' class='header'>
      <el-col :span='7'>
        <el-input :placeholder="$t('table.placeholder')" clearable v-model='queryForm.query'>
        </el-input>
      </el-col>
      <el-button type='primary' :icon='Search' @click='initGetUsersList'>{{$t('table.search')}}</el-button>
      <el-button type='primary'>{{$t('table.adduser')}}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for='(item, index) in options'
        :width='item.width'
        :key='index'>
        <template v-slot='{ row }' v-if="item.prop === 'mg_state'">
          <el-switch v-model='row.mg_state' />
        </template>
        <template v-slot='{ row }' v-else-if="item.prop === 'created_at'">
          {{$filters.filterTimes(row.created_at)}}
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button type='primary' size='small' :icon='Edit'></el-button>
          <el-button type='warning' size='small' :icon='Setting'></el-button>
          <el-button type='danger' size='small' :icon='Delete'></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUsers } from '@/api/users'
import { options } from './options'
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
})

const tableData = ref([])

const initGetUsersList = async () => {
  console.log(queryForm.value)
  const res = await getUsers(queryForm.value)
  console.log('init' + res)
  tableData.value = res.users
}
initGetUsersList()
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep el-input__suffix {
  align-items: center;
}
</style>
