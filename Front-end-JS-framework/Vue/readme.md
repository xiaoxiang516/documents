好高骛远，连怎么创建vue项目都给忘记了
[尤雨溪官网](https://evanyou.me/)

“程序员最讲究的就是作品，光说没用，代码要拿出来溜溜！所以现在程序员都得有自己的GitHub。”

[vue官网](https://cn.vuejs.org/)
[快速上手](https://cn.vuejs.org/guide/introduction.html)

[小传](尤雨溪Vue登顶GitHub之路看似不难)

[](https://vuejs.bootcss.com/guide/)



vue init webpack project
vue create project

怎么切换vue版本

历史

inject的数据什么时候能拿到
```html
<!--当 waitConfirmVisible为真时调用waitConfirm组件内部的方法，可是此时组件还没渲染完成 -->
<template>
	<waitConfirm
	  v-if="waitConfirmVisible"
	  ref="sealFile"
	  :schema="formObj.schemas[0]"
	  v-model:formData="formObj.formData"
	  :modeType="modeType"
	  :isK2Cmpt="props.isK2Cmpt"
	>
	</waitConfirm>
</template>

<script>
	ZlType: {
	  'event:change': () => {
		nextTick(() => {
		  sealFile.value?.changeTemplate()
		})
	  }
	},
</script>
```