export function usePagination() {
  const router = useRouter();
  const route = useRoute();
  const currentPage = ref(1);

  onBeforeMount(() => {
    currentPage.value = parseInt(route.query.page as string) || 1;
  });

  watch(
    currentPage,
    (newPage) => {
      router.replace({ query: { ...route.query, page: newPage } }).catch((err) => {
        console.log(err);
      });
    },
    { immediate: true }
  );

  return {
    currentPage,
  };
}