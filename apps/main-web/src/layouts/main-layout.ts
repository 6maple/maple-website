import { onMounted, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const menuConfigs = [{ key: 'home', path: '/', labelKey: 'app.text.home' }];

const useMenu = () => {
  const menuIndex = ref(menuConfigs[0]!.key);
  const router = useRouter();
  onMounted(() => {
    const menu = menuConfigs.find((item) => item.path === router.currentRoute.value.path);
    if (menu) {
      menuIndex.value = menu.key;
    }
  });
  const handleSelect = (key: string, _keyPath: string[]) => {
    const menu = menuConfigs.find((item) => item.key === key);
    if (menu == null) {
      return;
    }
    router.push(menu.path);
  };
  return {
    menuConfigs,
    menuIndex,
    handleSelect,
  };
};

export const useMainLayout = () => {
  return {
    ...useMenu(),
  };
};
