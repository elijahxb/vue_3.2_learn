<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules='rules'>
      <el-form-item label="用户名" prop='username'>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop='password' v-if="dialogTitle === '添加用户'">
        <el-input v-model="form.password" type='password'/>
      </el-form-item>
      <el-form-item label="邮箱" prop='email'>
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号" prop='mobile'>
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(null)
const emits = defineEmits(['update:modelValue', 'initUserList'])
const handleClose = () => {
  emits('update:modelValue', false)
}
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

const formRef = ref(null)
const form = ref({
  username: '',
  password: '',
  email: '',
  mobile: ''
})

const rules = ref({
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  mobile: [
    {
      required: true,
      message: 'Please input mobile',
      trigger: 'blur'
    },
    {
      pattern: '\\d+'
    }
  ]
})

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
}, { deep: true, immediate: true })

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(
          {
                id: form.value.id,
                username: form.value.username,
                email: form.value.email,
                mobile: form.value.mobile
          }
        )
      ElMessage.success(i18n.global.t('message.updeteSuccess'))
      emits('initUserList')
      handleClose()
    } else {
      console.log('error submit')
      return false
    }
  })
}

</script>

<style lang='scss' scoped>

</style>
