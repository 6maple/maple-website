import { computed, ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { startHealthCheck, stopHealthCheck } from '@/utils/health-check';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<ApiUserProfileResult>();
  const isLogin = computed(() => userInfo.value !== undefined);
  const checkWorking = ref(false);
  const updateUserInfo = (value: ApiUserProfileResult) => {
    userInfo.value = value;
  };
  const startUserHealthCheck = () => {
    startHealthCheck();
    checkWorking.value = true;
  };
  const stopUserHealthCheck = () => {
    stopHealthCheck();
    checkWorking.value = false;
  };

  const isPublicPage = ref(true);
  const setIsPublicPage = (value: boolean) => {
    isPublicPage.value = value;
  };

  const router = useRouter();
  const redirectToLogin = () => {
    router.push('/login');
  };
  const handleNeedLogin = () => {
    if (!isPublicPage.value) {
      redirectToLogin();
    } else {
      stopHealthCheck();
    }
  };
  return {
    userInfo,
    isLogin,
    checkWorking,
    updateUserInfo,
    startUserHealthCheck,
    stopUserHealthCheck,
    setIsPublicPage,
    redirectToLogin,
    handleNeedLogin,
  };
});

// 确保这段代码只在开发环境下执行
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
