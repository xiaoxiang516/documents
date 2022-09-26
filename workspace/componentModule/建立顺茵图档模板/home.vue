<template>
  <div class="index-page">
    <web-header :isHome="true"></web-header>
    <!-- 全局水印 -->
    <watermark class="home-water"></watermark>

  </div>
</template>

<!-- 全局组件 -->
 <sapi-breadcrumb-path :current-label="activeMenuName" :show-back="true"></sapi-breadcrumb-path>