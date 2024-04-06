<script setup lang="ts">
import { reactive, getCurrentInstance, onBeforeMount, onUnmounted } from 'vue';
import { deviceDetection } from '@/utils';
import AMapLoader from '@amap/amap-jsapi-loader';
import car from '@/assets/imgs/car.png';
import type { Fn } from '#/global.d';

type mapType = {
  plateNumber: string;
  driver: string;
  'orientation|1-360': number;
  'lng|113-114.1-10': number;
  'lat|34-35.1-10': number;
};

// http://mockjs.com/examples.html#Object
const mapList = (): Array<mapType> => {
  const result: Array<mapType> = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      plateNumber: "豫A@natural(11111, 99999)@character('upper')",
      driver: '@cname()',
      'orientation|1-360': 100,
      'lng|113-114.1-10': 1,
      'lat|34-35.1-10': 1,
    });
  }
  return result;
};

export interface MapConfigureInter {
  on: Fn;
  destroy?: Fn;
  clearEvents?: Fn;
  addControl?: Fn;
  setCenter?: Fn;
  setZoom?: Fn;
  plugin?: Fn;
}

defineOptions({
  name: 'Amap',
});

let MarkerCluster;
let map: MapConfigureInter;

const instance = getCurrentInstance();

const mapSet = reactive({
  loading: deviceDetection() ? false : true,
});

// 地图创建完成(动画关闭)
const complete = (): void => {
  if (map) {
    map.on('complete', () => {
      mapSet.loading = false;
    });
  }
};

onBeforeMount(() => {
  if (!instance) return;
  const { MapConfigure } = instance.appContext.config.globalProperties.$config;
  const { options } = MapConfigure;

  AMapLoader.load({
    key: MapConfigure.amapKey,
    version: '2.0',
    plugins: ['AMap.MarkerCluster'],
  })
    .then(AMap => {
      // 创建地图实例
      map = new AMap.Map(instance.refs.mapview, options);

      //地图中添加地图操作ToolBar插件
      map.plugin(['AMap.ToolBar', 'AMap.MapType'], () => {
        map.addControl(new AMap.ToolBar());
        //地图类型切换
        map.addControl(
          new AMap.MapType({
            defaultType: 0,
          }),
        );
      });

      MarkerCluster = new AMap.MarkerCluster(map, [], {
        // 聚合网格像素大小
        gridSize: 80,
        maxZoom: 14,
        renderMarker(ctx) {
          const { marker, data } = ctx;
          if (Array.isArray(data) && data[0]) {
            const { driver, plateNumber, orientation } = data[0];
            const content = `<img style="transform: scale(1) rotate(${360 - Number(orientation)}deg);" src='${car}' />`;
            marker.setContent(content);
            marker.setLabel({
              direction: 'bottom',
              //设置文本标注偏移量
              offset: new AMap.Pixel(-4, 0),
              //设置文本标注内容
              content: `<div> ${plateNumber}(${driver})</div>`,
            });
            marker.setOffset(new AMap.Pixel(-18, -10));
            marker.on('click', ({ lnglat }) => {
              map.setZoom(13); //设置地图层级
              map.setCenter(lnglat);
            });
          }
        },
      });

      // 获取模拟车辆信息
      const points: object = mapList().map(v => {
        return {
          lnglat: [v.lng, v.lat],
          ...v,
        };
      });
      if (MarkerCluster) MarkerCluster.setData(points);
      complete();
    })
    .catch(() => {
      mapSet.loading = false;
      throw '地图加载失败，请重新加载';
    });
});

onUnmounted(() => {
  if (map) {
    // 销毁地图实例
    map.destroy() && map.clearEvents('click');
  }
});
</script>

<template>
  <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(100vh - 86px);
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>
