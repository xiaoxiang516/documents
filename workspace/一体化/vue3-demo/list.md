## toRefs与reactive 
```
template
```
<template>
  <div class="common-app">
    <common-search-page
      ref="searchRef"
      :schema="schema"
      :tableSchema="tableSchema"
      :table-ui-schema="tableUiSchema"
      :label-mode="labelMode"  
    >  
    </common-search-page>
  </div>
</template>

<script lang="ts" setup>
  const searchRef: any = ref < null | HTMLElement >(null)
  const labelMode = ref(true)
  
  const pageObj = reactive({
    schema: {} as any,
    tableSchema: [],
    tableUiSchema: {},
    tableRules: {} as any,  
  })
  const getTableSchema = async () => {
      const schema = await getSchemaByEntityId(SERVICE_ID, 'Results')
      pageObj.schema = schema
  }

  const { schema,
    tableSchema,
    tableUiSchema
   } = toRefs(pageObj)

</script>

<style scoped></style>
