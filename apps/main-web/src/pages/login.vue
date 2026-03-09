<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const loginForm = ref({
  user: '',
  pwd: '',
});

const handleLogin = async () => {
  const data = await login(loginForm.value);
  userStore.updateUserInfo(data);
  userStore.startUserHealthCheck();
};
</script>

<template>
  <div class="login-container flex flex-col items-center justify-center">
    <ElForm :model="loginForm" label-width="auto" class="login-form">
      <ElFormItem label="用户名" prop="user">
        <ElInput v-model="loginForm.user" placeholder="请输入用户名"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="pwd">
        <ElInput
          v-model="loginForm.pwd"
          placeholder="请输入密码"
          type="password"
        ></ElInput>
      </ElFormItem>
      <ElFormItem class="flex justify-center">
        <ElButton type="primary" @click="handleLogin">登录</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped></style>
