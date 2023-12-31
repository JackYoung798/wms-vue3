<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const status = ref(true)
const formModel = ref({
  username: '',
  password: ''
})
const form = ref()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    {
      min: 5,
      max: 11,
      message: '用户名必须是 5-11位 的字符',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'change'
    }
  ]
}

//注册
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  status.value = true
}

//登录
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data)
  ElMessage.success('登录成功')
  router.push('/')
}

// 切换表单 重置内容
watch(status, () => {
  formModel.value = {
    username: '',
    password: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="16" class="bg">
      <el-carousel
        height="100vh"
        direction="vertical"
        type="card"
        :autoplay="true"
      >
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel></el-col
    >
    <el-col :span="6" :offset="1" class="form">
      <!-- 登录表单 -->
      <el-form
        v-if="status"
        ref="form"
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
        label-width="120px"
      >
        <el-form-item>
          <h2 class="title">登录</h2>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="formModel.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="btn" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link
            type="info"
            class="flex"
            :underline="false"
            @click="status = false"
            >注册 →</el-link
          >
        </el-form-item>
      </el-form>
      <!-- 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        size="large"
        label-width="120px"
        autocomplete="off"
        ref="form"
        v-else
      >
        <el-form-item>
          <h2 class="title">注册</h2>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="formModel.password"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="btn"
            type="primary"
            auto-insert-space
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link
            type="info"
            class="flex"
            :underline="false"
            @click="status = true"
            >← 登录</el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style>
.login-page {
  height: 100vh;
  background-color: #fff;
}
.bg {
  /* background-color: rgb(88, 86, 140); */
  background-color: #fff;
  border-radius: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 50vh;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  margin: 0 auto;
}
.btn {
  width: 100%;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
