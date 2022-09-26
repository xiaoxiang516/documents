<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item
			v-for="(item, index) in [{ name: '首页', route: '/' }, { name: '图档库', route: '/harvestLibrary/index.html' }]"
			:key="index" :title="item.name">
			<a href="/"><i class="el-icon-location mr-4"></i>{{ item.name }}</a>
		</el-breadcrumb-item>
		<el-breadcrumb-item :title="activeMenuName">{{ activeMenuName }}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
</script>

<style>
</style>
<el-form :model="projectInfo"
               :rules="rules"
               :disabled="isBrowse"
               ref="projectInfoForm"
               class="project-info-form">
        <sapi-row :gutter="20">
          <sapi-col :span="12">
            <el-form-item label="项目名称">
              <el-input placeholder=""
                        v-model.trim="projectInfo.ProjectName"
                        ref="ProjectName">
              </el-input>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="所属区域" prop="AreaId">
              <el-input
                        placeholder=""
                        v-model.trim="projectInfo.AreaName"
                        ref="AreaId">
              </el-input>
              <el-select v-model="projectInfo.AreaId"  >
                <el-option v-for="item in areaData"
                           :key="item.AreaId"
                           :value="item.AreaId"
                           :label="item.AreaName" ></el-option>
              </el-select>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="是否自动生成标准目录" prop="">
              <el-radio-group v-model="projectInfo"  @change="">
                <el-radio  :label="true">是</el-radio>
                <el-radio  :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="DMS项目号" >
              <el-input
                        placeholder=""
                        v-model.trim="projectInfo.DmsProjectName"
                        ref="DmsProjectId">
              </el-input>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="DMS项目名称" >
              <el-input disabled
                        placeholder=""
                        v-model.trim="projectInfo.DmsProjectName"
                        ref="DmsProjectName">
              </el-input>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="地块编号"  >
              <el-input
                        placeholder=""
                        v-model.trim="projectInfo.LandId"
                        ref="LandId">
              </el-input>
            </el-form-item>
          </sapi-col>
          <sapi-col :span="12">
            <el-form-item label="地块名称">
              <el-input disabled
                        placeholder=""
                        v-model.trim="projectInfo.LandName"
                        ref="LandName">
              </el-input>
            </el-form-item>
          </sapi-col>
<!--          <sapi-col :span="12">-->
<!--            <el-form-item label="MDG项目号" prop="">-->
<!--              <el-input-->
<!--                placeholder=""-->
<!--                v-model.trim="projectInfo.a"-->
<!--                ref="">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </sapi-col>-->
<!--          <sapi-col :span="12">-->
<!--            <el-form-item label="MDG项目名称" prop="">-->
<!--              <el-input-->
<!--                disabled-->
<!--                placeholder=""-->
<!--                v-model.trim="projectInfo.a"-->
<!--                ref="">-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </sapi-col>-->
        </sapi-row>
      </el-form>