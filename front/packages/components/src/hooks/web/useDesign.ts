export const useDesign = () => {
  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `v-${scope}`;
  };

  return {
    variables: { namespace: 'v', elNamespace: 'el' },
    getPrefixCls,
  };
};
