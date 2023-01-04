# 后端接口

### ajax

```
$.ajax({
  url:`${_this.OBSFileUploadUrl}/file-service/api/file/v1/upload/getHashStatus?
	bucket=PUBLIC_READ&fileHash=${hash}&accesstoken=${_this.token}`,
  type:  'GET',
  success: function(res){
    console.log('000', res.data)
    let { fileUrl } = res.data
    if(fileUrl) {
      item.uploadSuccessBackData = {
        fileSize: item.fileSize,
        ...res.data
      }
    }
    resolve(res.data)
  },
  error: (err) => {
    if(err.status === 403) {
      this.$message.error('授权失败')
    }
    item.status = 'requestErr'
    reject()
    console.log('err', err)
  }
})


```
