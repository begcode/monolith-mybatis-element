declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AvatarGroup: (typeof import('@begcode/components'))['AvatarGroup'];
    Backtop: (typeof import('@begcode/components'))['Backtop'];
  }
}
