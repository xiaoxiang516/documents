```ts
[
  {
    path: "event-mgmt",
    name: "EventMgmt",
    meta: { title: "事件管理", icon: "dashboard", isEventMgt: true },
    component: () =>
      import("@/views/co/contractPerformance/claimEvent/index.vue"),
  },
  {
    path: "counterclaim",
    name: "counterclaim",
    meta: { title: "反索赔列表", icon: "dashboard", isEventMgt: false },
    component: () =>
      import("@/views/co/contractPerformance/claimEvent/index.vue"),
  },
];

onMounted(async () => {
  console.log("event-mgt-route", route.meta);
  // 根据责任方的不同展示，事件列表展示不同的数据
  isEventMgmt.value = route.meta?.isEventMgt;
  pageObj.formData.Zrf = route.meta?.isEventMgt ? "01" : "02";
  await getSchema();
});

// watch(
//   () => route.path,
//   (newVal: any) => {
//     activeName.value = PANE_TAB.ALL
//     isEventMgmt.value = route.path === '/contPetf/claimEvent/event-mgmt'
//     pageObj.formData.Zrf = isEventMgmt.value ? '01' : '02'
//     nextTick(() => {
//       // 要内部调用，直接调用customRequest不行
//       searchRef.value?.searchData()
//     })
//   },
//   {
//     deep: true
//   }
// )
```
