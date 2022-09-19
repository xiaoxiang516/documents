<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="80%"
    @close="closeHandler"
  >
  </el-dialog>
</template>

<script lang="ts" setup>

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: false,
  },
});


const closeHandler = () => {
  emit("closeEmit", props.dialogVisible);
};
</script>

<style scoped>

</style>
