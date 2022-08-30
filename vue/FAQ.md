# vue 中的watch串行并行
watch监听


vue中注意watch的执行顺序
1.在组件由v-if和watch同时监听一个值来做一些操作时，需要对watch进行进一步修改，比如增加immedita

2、在组件使用v-if时且判断类型为boolean值 ，需要在组件内部的watch里添加immediate否则watch不会执行


# vue 生命周期+watch、computed、methods执行顺序