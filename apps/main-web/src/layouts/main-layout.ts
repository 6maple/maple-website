import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const menuConfigs = [
  { key: 'home', path: '/', labelKey: 'app.text.home' },
  { key: 'articles', path: '/articles', labelKey: 'app.text.articles' },
];

const useMenu = () => {
  const menuIndex = ref('');
  const router = useRouter();
  watch(
    router.currentRoute,
    () => {
      const menu = menuConfigs.find((item) =>
        [item.path, `${item.path}/`].includes(router.currentRoute.value.path),
      );
      menuIndex.value = menu?.key ?? '';
    },
    { immediate: true },
  );
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
