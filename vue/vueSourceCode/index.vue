<template>
    <div class="body-box ">
      <div class="bread-box"></div>
      <el-card>
        <div>
          <el-button>上传</el-button>
          <el-button>暂停</el-button>
          <el-progress type="line" :percentage="0"></el-progress>
        </div>

        <input ref="file"  type='file' name="file" webkitdirectory   @change.stop="changesData" value="aaa"/>
        <div class="mt-20 content">
          <el-table :data="fileList">
            <el-table-column label="文件名" prop="name"></el-table-column>
            <el-table-column label="路径" prop="webkitRelativePath"></el-table-column>
            <el-table-column label="是否完成" prop="">
<!--              单个文件进度-->
              <el-progress type="line" :percentage="0"></el-progress>
            </el-table-column>
          </el-table>
        </div>

        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :before-upload="beforeUploadVideo"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="true"
        >
          <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
          >
        </el-upload>

      </el-card>
    </div>
</template>

<script>


export default {
  data() {
    return {
      fileList: [],
      ruleForm: {
        videoFile: ""
      }
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]];
    },
    beforeUploadVideo(file) {
      //上传前回调
      var fileSize = file.size / 1024 / 1024 < 500;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("不支持此视频格式");
        this.fileList = [];
      } else if (!fileSize) {
        this.$message.error("视频大小不能超过500MB");
        this.fileList = [];
      } else {
        this.ruleForm.videoFile = file;
      }

      // 不使用upload自带的上传方式，而是使用axios，所以阻止upload自带的上传
      return false;
    },
    submitForm(formName) {
      // 这里把提交表单方法绑定到指定按钮中
    // ...
      var params = new FormData();
      params.append("video_data", this.ruleForm.videoFile);
    // ...
    },
    changesData () {
      console.log(this.$refs.file.files);

      this.fileList.push(...Array.from(this.$refs.file.files))
      window.parent.postMessage(this.$refs.file.files,"*")
    },
    aa() {
      window.parent.postMessage(666,"*")    //
    },
    bb(e) {
      window.parent.postMessage(e,"*")
    },
  },
  created() {
    // document.getElementById("uploaddir").files[0].webkitRelativePath;
    console.log('qqq', $('#fileFolderMore'))
    $('#fileFolderMore').change(function(e){
      console.log(22222222222)
      var files = e.target.files;
      window.parent.postMessage(e.target.files,"*")
      console.log(files)
    })
    $('#fileFolderOne').change(function(e){
      console.log(333333333333)
      window.parent.postMessage(e.target.files,"*")
      var files = e.target.files;
      console.log(files)
    })
  }
}
</script>

<style>

</style>