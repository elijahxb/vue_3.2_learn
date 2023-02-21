<template>
  <el-card>
<!--    单独写一行 el-row,目的是控制搜索框的尺寸样式-->
    <el-row :gutter='20' class='header'>
      <el-col :span='7'>
        <el-input :placeholder="$t('table.placeholder')" clearable v-model='queryForm.query'>
        </el-input>
      </el-col>
      <el-button type='primary' :icon='Search' @click='initGetUsersList'>{{$t('table.search')}}</el-button>
      <el-button type='primary' @click='handleDialogValue({})'>{{ $t('table.adduser') }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type='index' />
      <el-table-column
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for='(item, index) in options'
        :width='item.width'
        :key='index'>
        <template v-slot='{ row }' v-if="item.prop === 'mg_state'">
          <el-switch v-model='row.mg_state' @change='changeState(row)' />
        </template>
        <template v-slot='{ row }' v-else-if="item.prop === 'created_at'">
          {{$filters.filterTimes(row.created_at)}}
        </template>
        <template #default='{ row }' v-else-if="item.prop === 'action'">
          <el-button type='primary' size='small' :icon='Edit' @click='handleDialogValue(row)'></el-button>
          <el-button type='warning' size='small' :icon='Setting'></el-button>
          <el-button type='danger' size='small' :icon='Delete'></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="queryForm.pagenum"
        v-model:page-size="queryForm.pagesize"
        :page-sizes="[5, 10, 20, 50]"
        :small="true"
        :disabled="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <Dialog
    v-model='dialogVisible'
    :dialogTitle='dialogTitle'
    v-if='dialogVisible'
    @initUserList='initGetUsersList'
    :dialogTableValue='dialogTableValue'
  />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUsers, changeUserState } from '@/api/users'
import { options } from './options'
import { ElMessage } from 'element-plus'
import Dialog from './components/dialog'
import { isNull } from '@/utils/filters'

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 10
})
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})
const tableData = ref([])
const total = ref(0)
const initGetUsersList = async () => {
  const res = await getUsers(queryForm.value)
  total.value = res.totalrow
  tableData.value = res.users
}
initGetUsersList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsersList()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsersList()
}

const changeState = async (row) => {
  const res = await changeUserState(row.id, row.mg_state)
  ElMessage.success('修改状态成功: ' + res)
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep .el-input__suffix {
  align-items: center;
}
.pagination-block {
  padding-top: 16px;
  box-sizing: border-box;
}
</style>
