import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
import { computed, nextTick, unref } from 'vue';
import { useTagsViewStoreWithOut } from '@/store/modules/tagsView';
import { usePermissionStore } from '@/store/modules/permission';

export const useTagsView = () => {
  const tagsViewStore = useTagsViewStoreWithOut();
  const permissionStore = usePermissionStore();
  const setSelectTag = tagsViewStore.setSelectedTag;
  const { replace, currentRoute, push } = useRouter();

  const selectedTag = computed(() => tagsViewStore.getSelectedTag);

  const closeAll = (callback?: Fn) => {
    tagsViewStore.delAllViews();
    callback?.();
  };

  const closeLeft = (callback?: Fn) => {
    tagsViewStore.delLeftViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
    callback?.();
  };

  const closeRight = (callback?: Fn) => {
    tagsViewStore.delRightViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
    callback?.();
  };

  const closeOther = (callback?: Fn) => {
    tagsViewStore.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded);
    callback?.();
  };

  const closeCurrent = (view?: RouteLocationNormalizedLoaded, callback?: Fn) => {
    if (view?.meta?.affix) return;
    tagsViewStore.delView(view || unref(currentRoute));

    callback?.();
  };

  const refreshPage = async (view?: RouteLocationNormalizedLoaded, callback?: Fn) => {
    tagsViewStore.delCachedView();
    const { path, query } = view || unref(currentRoute);
    await nextTick();
    replace({
      path: '/redirect' + path,
      query: query,
    });
    callback?.();
  };

  const setTitle = (title: string, path?: string) => {
    tagsViewStore.setTitle(title, path);
  };

  // 新增tag
  const addTags = () => {
    const { name } = unref(currentRoute);
    if (name) {
      setSelectTag(unref(currentRoute));
      tagsViewStore.addView(unref(currentRoute));
    }
    return false;
  };

  // 去最后一个
  const toLastView = () => {
    const visitedViews = tagsViewStore.getVisitedViews;
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      push(latestView);
    } else {
      if (
        unref(currentRoute).path === permissionStore.getAddRouters[0].path ||
        unref(currentRoute).path === permissionStore.getAddRouters[0].redirect
      ) {
        addTags();
        return;
      }
      // You can set another route
      push(permissionStore.getAddRouters[0].path);
    }
  };

  const closeCurrentToLatestView = (view: RouteLocationNormalizedLoaded) => {
    if (view?.meta?.affix) return;
    tagsViewStore.delView(view || unref(currentRoute));
    toLastView();
  };

  return {
    closeAll,
    closeLeft,
    closeRight,
    closeOther,
    closeCurrent,
    refreshPage,
    setTitle,
    closeCurrentToLatestView,
  };
};
