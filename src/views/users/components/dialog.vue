<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="refForm" :model="form" label-width="70px" :rules='rules'>
      <el-form-item label="用户名" prop='user_name'>
        <el-input v-model="form.user_name" />
      </el-form-item>
      <el-form-item label="密码" prop='password'>
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
import { defineEmits, ref, defineProps } from 'vue'
import { addUser } from '@/api/users'

const emits = defineEmits(['update:modelValue'])
const handleClose = () => {
  emits('update:modelValue', false)
}

defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  }
})

const handleConfirm = async () => {
  const res = await addUser(form.value)
  console.log(res)
  handleClose()
}

const formRef = ref(null)
const form = ref({
  user_name: '',
  password: '',
  email: '',
  mobile: ''
})
console.log(formRef)

const rules = ref({
  user_name: [
    {
      required: true,
      message: 'Please input user_name',
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
</script>

<style lang='scss' scoped>

</style>
