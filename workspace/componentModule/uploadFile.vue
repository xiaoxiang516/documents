<template>
  <div class="file-upload">
    <el-card>
      <div>
        <span class="mt-20">文件上传</span>
        <span class="mr-20 ml-20">总上传文件数：{{ fileList.length }} 个</span>
        <span class="mr-20">已上传文件数：{{ fileList.filter(item => item.status === 'success').length }} 个</span>
        <span class="mr-20">上传失败文件数：{{ fileList.filter(item => item.status === 'error' || item.status === 'requestErr').length }} 个</span>
      </div>
      <div class="mt-20">
        <div class="btn-all" >
          <div :class="{ 'cannot-upload-file': !this.canUploadFile }">
            <label class="input-file-button" for="file"><i class="el-icon-upload2 el-icon--left" size="mini"></i>选择文件</label>
            <input :disabled="!this.canUploadFile" id="file" ref="file" type="file"  multiple  @change="selectFile"/>
          </div>
          <div :class="{ 'cannot-upload-file': !this.canUploadFile }">
            <label class="input-file-button" for="files"><i class="el-icon-folder el-icon--left" size="mini"></i>选择文件夹</label>
            <input :disabled="!this.canUploadFile" id="files" type="file" webkitdirectory directory @change="selectFile" multiple />
          </div>
          <el-button id="upload"  @click="startUploadAll" :disabled="btnAllStart">全部上传</el-button>
          <el-button  @click="pauseOrCancleUploadAll('allPause')" :disabled="btnAllPause">全部暂停</el-button>
          <el-button  @click="pauseOrCancleUploadAll('allCancel')">全部取消</el-button>
          <el-button  @click="clearUploaded">清空已上传</el-button>
          <!--          <el-button  @click="confirm">确认</el-button>-->
        </div>
        <!--        <div class="mt-20">-->
        <!--          <span id="output" style="font-size:12px">等待</span>-->
        <!--        </div>-->
      </div>

      <div class="mt-20">
        <el-table :data="fileList">
          <el-table-column label="文件名" prop="name">
            <template slot-scope="scope">{{scope.row.file.name}}</template>
          </el-table-column>
          <el-table-column label="路径" prop="file.webkitRelativePath">
            <template slot-scope="{row}">
              <span>{{ row.file.webkitRelativePath.length ? row.file.webkitRelativePath.substr(row.file.webkitRelativePath.indexOf('/')) : '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否完成" >
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.progress" v-if="scope.row.status !== 'error' &&  scope.row.status !== 'requestErr'"/>
              <el-progress :percentage="scope.row.progress" status="exception" v-else/>
              <div>{{ mapFileStatus(scope.row.status) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button type="text" @click="singleFileStatusChange(scope.row, 'uploading')" v-if="scope.row.status === 'wait'" >开始</el-button>
              <el-button type="text" @click="singleFileStatusChange(scope.row, 'uploading')"
                         v-if="scope.row.status === 'error' || scope.row.status === 'requestErr'" >重传</el-button>
              <el-button type="text" @click="singleFileStatusChange(scope.row, 'pause')" v-if="scope.row.status === 'uploading'" >暂停</el-button>
              <!--                uploding resume-->
              <el-button type="text" @click="singleFileStatusChange(scope.row, 'uploading')" v-if="scope.row.status === 'pause'" >继续</el-button>
              <el-button type="text" @click="uploadCancle(scope)" v-if="scope.row.status !== 'success'">取消上传</el-button>
              <!--上传成功的不想新增了，也可以删除-->
              <el-button type="text" @click="uploadedCancle(scope)" v-if="scope.row.status === 'success'">取消上传</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
// 文件状态值：wait等待,uploading上传中，pause暂停,resume恢复上传（要用断点续传）,success(secondPass),error
// 文件总分片数，文件上传成功分片数组，失败分片数组，上传,pauseProgress保存暂停时的上传进度,恢复时pauseProgress赋值给progress
import $ from 'jquery'
import '../../static/css/upload-file-list.less'
// import { Loading } from 'element-ui';
export default {
  name: 'HelloWorld',
  data() {
    return {
      fileList: [],
      // 文件的上传状态
      fileStatus: {
        hash: '解析中...', // 大于10M的文件有
        hashError: '解析失败',
        requestErr: '请求失败',
        wait: '等待上传...',
        uploading: '上传中...',
        pause: '暂停中...',
        resume: '上传中', // 恢复上传
        success: '上传成功',
        error: '上传失败',
        // partUploadError: '分片上传失败，点击重传，上传失败的分片',
        secondPass: '已秒传',
        cancel: '取消上传',
      },
      // isLoading: false,
      myWorker: null,
      // fakeUploadPercentage: 0, // 总进度
      chunkSize: 10 * 1024 * 1024, // 10M,切片大小
      allUploadSuccessFileList: {
        hasFileRouteAttachmentInfos: [],
        noHasFileRouteAttachmentInfos: []
      },
      token: null,
      allUploadCancel: false,
      canUploadFile: true,
      selfTest: null, // 为真则没有被嵌入iframe里面，是自己测试
      uploadFileLimit: {
        forbidUploadTypes: [], // 不允许上传类型压缩包的话就跳过
        forbidUploadTypesTipMessage: '', // to do 设置默认值
      },
    };
  },

  methods: {
    confirm() {
      // console.log('this.allUploadSuccessFileList', this.allUploadSuccessFileList)
      window.parent.postMessage(this.allUploadSuccessFileList,"*") //子传父
      this.fileList = []
      this.allUploadSuccessFileList = []
    },
    sendInfo() {
      // 对上传成功的文件进行格式化处理，已经格式化的就不弄了
      let AttachmentInfos  = [], uploadSuccessFileList = this.fileList.filter(item => item.status === 'success')
      // 得到上传成功的所有文件上传成功后的所有数据，放到一个数组中
      // 将改数组每个item格式转换
      console.log('uploadSuccessFileList', uploadSuccessFileList)
      uploadSuccessFileList.forEach(item => {
        item.uploadSuccessBackData.fileSize = item.fileSize
        item.uploadSuccessBackData.FileRoute = item.FileRoute
        AttachmentInfos.push(item.uploadSuccessBackData)
      })

      let hasFileRoute = [], noHasFileRoute = [], obj = {}
      AttachmentInfos.forEach(item => {
        obj = {
          // "FileId": item.fileId,
          "FileName": item.originalName.substr(0,item.originalName.lastIndexOf('.')),
          "FilePath": item.fileId,
          "FileSize": item.fileSize,
          "Extension": item.originalName.substr(item.originalName.lastIndexOf('.')),
          "UploaderId": null,
          "Uploader": null,
          "UploadDate": null,
          // "DocFileId": null,// 待定
        }
        if(item.FileRoute.length) {  // 通过文件夹选择
          hasFileRoute.push({
            "CatalogId": null,
            "FileRoute": item.FileRoute,
            "AttachmentInfo": obj
          })
        } else {
          noHasFileRoute.push(obj)
        }
      })

      this.allUploadSuccessFileList.hasFileRouteAttachmentInfos = hasFileRoute
      this.allUploadSuccessFileList.noHasFileRouteAttachmentInfos = noHasFileRoute
      // 为真则是自己测试，防止发消息给父窗口，父窗口返回消息清空页面
      if(this.selfTest)  return

      // 符合以下条件，发消息给父窗口，调用新增目录接口
      let allFileHasUploaded = this.fileList.every(item => {
        return item.status === 'success' || item.status === 'error' || item.status === 'requestErr' || item.status === 'hashError'
      })
      console.log('allFileHasUploaded', allFileHasUploaded)
      if(allFileHasUploaded) {
        window.parent.postMessage(this.allUploadSuccessFileList,"*") //子传父
      }
    },
    // 选择文件夹或多个文件,change事件，前后两次选一样的不会返回所选文件
    // 暴露给外面设置，只上传
    fileUploadLimit(file, forbidUploadFileReason) {
      // 选择的文件去重,文件名相同和同一层级就不再上传
      let hasSelected = this.fileList.find(item => item.file.name === file.name && item.file.webkitRelativePath === file.webkitRelativePath)
      if(hasSelected) return true

      if(!file.size) { // 大小为0不上传
        forbidUploadFileReason.hasEmptyFile = true
        return true
      }


      // 压缩包不能上传
      const forbidUploadTypes = this.uploadFileLimit.forbidUploadTypes;
      let fileType = file.name.substr(file.name.lastIndexOf('.'))
      if(forbidUploadTypes.includes(fileType)) {
        forbidUploadFileReason.hasForbidUploadType = true
        return true
      }
    },
    selectFile(e) {
      // this.$loading({ fullscreen: true })
      let forbidUploadFileReason = {
        hasEmptyFile: false,
        hasForbidUploadType: false,
      }
      this.allUploadCancel = false
      let fileList = Array.from(e.target.files)
      // file类文件不能直接添加属性(吗)
      let fileFormat
      fileList.forEach(file => {
        if(this.fileUploadLimit(file, forbidUploadFileReason)) return
        // 初始化文件的一些属性
        fileFormat = {
          file,
          progress: 0,
          fileSize: file.size,
          fileType: file.name.substr(file.name.lastIndexOf('.')),
          status: 'wait',
          // 选择文件夹时的文件路径，有值代表通过文件夹选择
          FileRoute:
            file.webkitRelativePath.length > 0
              ? file.webkitRelativePath.substr(file.webkitRelativePath.indexOf('/'))
              : '',
          // 后端没返回文件大小，所以前端记录。上传成功返回的文件大小
          uploadSuccessBackData: {},
          failedPartNumbers: [], // 上传失败分片，重试机制
          uploadedAmount: 0, // 待上传分片成功了几片
        }
        this.fileList.push(fileFormat)
      })
      document.getElementById('file').value = null;
      document.getElementById('files').value = null;
      if(forbidUploadFileReason.hasEmptyFile && forbidUploadFileReason.hasForbidUploadType) {
        this.$message.error('空文件不能上传,' + this.uploadFileLimit.forbidUploadTypesTipMessage)
      } else if(forbidUploadFileReason.hasEmptyFile) {
        this.$message.error('空文件不能上传')
      } else if(forbidUploadFileReason.hasForbidUploadType) {
        this.$message.error(this.uploadFileLimit.forbidUploadTypesTipMessage)
      }

      // this.$loading({ fullscreen: false })
      // 选择之后就上传全部
      this.startUploadAll()
    },

    // 计算文件的hash值
    calculateHash(item) {
      let _this = this
      return new Promise((resolve, reject) => {
        if(item.status === 'pause' || _this.allUploadCancel) return
        console.log('item.status--6', item.status)
        let { file } = item
        this.myWorker = new Worker('/static/hash.js');
        this.myWorker.postMessage(file)
        this.myWorker.onmessage = e => {
          resolve(e.data) // e.data即hash值
        }
      })
    },
    // 用hash值验证是否上传过,res.data长度不为0就说明上传过了
    verifyUpload(item) {
      let { hash } = item, _this = this

      return new Promise((resolve, reject) => {
        if(item.status === 'pause' || _this.allUploadCancel) return

        $.ajax({
          url:`/file-service/api/file/v1/upload/getHashStatus?bucket=PUBLIC_READ&fileHash=${hash}&accesstoken=${_this.token}`,
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
      })
    },
    // 并发，分片进行并发，断点续传并发
    async concurrentUpload(item, pendingUploadChunks) {
      return new Promise((async (resolve, reject) => {
        if(!item.uploadId) {
          let res = await this.startChunkUpload(item)
          item.uploadId = res.uploadId
        }
        // item.uploadedAmount = 0
        let concurrent = 2 // 并发数
        const handler = () => {
          if(item.status === 'cancel') return;
          if(item.status === 'pause') {
            // item.pausePartNumber = counter
            return;
          }
          if(pendingUploadChunks.length) { //还有未上传完的分片，pendingUploadChunks 代表上传第几片
            item.status = 'uploading'
            this.chunkUploading(item,item.uploadId,pendingUploadChunks.shift()).then(() => {
              // if(item.status === 'resume') {
              //   console.log('resume resume', pendingUploadChunks.length)
              //   // 当前上传了几片/文件总分片数
              //   item.progress = Math.floor(((item.chunks.length - pendingUploadChunks.length) / item.chunks.length) * 100)
              // } else { // uploading
              // 记录文件未上传大小, 最后一片大小，不记录的话只是不够精确而已
              // item.progress = Math.floor((1-(pendingUploadChunks.length / item.chunks.length))  * 100)
              // 不调后端接口查以上传大小
              // item.progress = Math.floor((1-(pendingUploadChunks.length * this.chunkSize / item.fileSize))  * 100)
              console.log('------0', item.successAmount,item.partCount, item.successAmount/item.partCount)
              if (item.successAmount === item.partCount) { // 上传完成
                resolve(item)
                return
              }
              console.log('------', item.successAmount,item.partCount, item.successAmount/item.partCount)
              if(item.successAmount < item.partCount) {
                // uploadedSize = item.uploadedAmount * this.chunkSize > item.fileSize ? item.fileSize : item.uploadedAmount * this.chunkSize
                // item.progress = Math.floor((uploadedSize / item.fileSize) * 100)
                item.progress = Math.floor((item.successAmount / item.partCount) * 100);
              }
              handler()
              // 成功的数量等于待上传的数量
            })
              .catch((err) => {
                throw Error(err)
                reject()
              })
          }

        }

        // 01.while控制初始并发
        while (concurrent > 0) {
          setTimeout(() => {
            handler()
          }, Math.random() * 100)
          concurrent--
        }
      }))

    },
    getFileUploaded(item) {
      let _this = this, { uploadId } = item
      return new Promise((resolve, reject) => {
        if(item.status === 'pause') return

        $.ajax({
          url: `/file-service/api/file/v1/uploadMultipart/status?uploadId=${uploadId}&accesstoken=${_this.token}`,
          type: 'GET',
          success: function(res){
            resolve(res.data)
          },
          error: (err) => {
            item.status = 'requestErr'
            console.log('err', err)
            reject()
          }
        })

      })
    },
    // 一般文件(小于10M的文件)上传，上传需要的参数，并发上传数量concurrent
    startUploadAll() { //
      // if(this.fileList.every(item => item.status === 'success')) return
      // this.fileList.forEach((item) => {
      //   if(item.status === 'success' || item.status === 'uploading') { // 上传跳过
      //     return
      //   }
      //   if(item.status !== 'success' || item.status === 'uploading') { // 失败呢error
      //     item.status = 'uploading'
      //     this.singleFileUpload(item)
      //   }
      // })
      // this.fileList.forEach(async (item) => {
      //   if(item.status === 'success' || item.status === 'uploading') { // 上传跳过
      //     return
      //   }
      //   if(item.status !== 'success' || item.status === 'uploading') { // 失败呢error
      //     item.status = 'uploading'
      //     await this.singleFileUploadCopy(item)
      //     // 上传结束的标志，上传中某一个接口出错
      //     // 开始下一次上传的标志
      //     console.log('begin---')
      //   }
      // })
      // 大于200再拆分
      let waitUploadFileList = this.fileList.filter(item => item.status !== 'success' &&  item.status !== 'cancel'), result = [];
      this.mutipleFileUpload(waitUploadFileList)
    },
    mutipleFileUpload(waitUploadFileList) {
      return new Promise((resolve, reject) => {
        const handler = () => {
          if(!waitUploadFileList.length) {
            resolve()
            return
          }
          this.singleFileUploadCopy(waitUploadFileList.shift()).then(() => {
            // 此文件上传成功开始下一个文件
            handler()
          }).catch(() => {
            // 此文件上传过程中某个接口失败也开始下一个文件
            handler()
          })
        }
        // handler()
        let delayTime = 2000
        // 待上传请求文件数 1-200,200-500，500-1000，1000-1500,1500-2000
        // if() 如果可以实时知道待上传文件数量的变化，并停止以前的并发，改用新的并发就好了
        let concurrent = waitUploadFileList.length < 500 ? 4 : 2
        while (concurrent > 0) {
          setTimeout(() => {
            handler()
          }, delayTime)
          concurrent--
        }
      })
    },
    singleFileUploadCopy(item) {
      return new Promise(async(resolve, reject) => {
        if(item.status === 'success' || item.status === 'uploading') { // 上传跳过
          return
        }
        if(item.status !== 'success' || item.status === 'uploading') { // 失败呢error
          item.status = 'uploading'
        }

        if(item.status === 'pause') return

        if(!item.hash) { // 文件没有计算过hash
          item.status = 'hash'
          await this.calculateHash(item).then((res) => {
            item.hash = res
          }).catch(() => {
            item.status = 'hashError'
            // 计算hash出错的话也开始下一个文件
            reject()
          })
        }
        if(item.status === 'pause') return
        let queryHashBackData
        await this.verifyUpload(item).then(res => {
          console.log('----11', res)
          queryHashBackData = res
          item.uploadId = queryHashBackData.uploadId
          // 秒传：已经上传过的话fileUrl有值，秒传
          if(queryHashBackData.fileUrl) {
            item.progress = 100
            item.status = 'success'
            this.sendInfo()
            resolve()
          }
        }).catch(() => {
          // 当前接口错误，也开始下一个
          reject()
        })
        if(item.status === 'pause') return
        if(queryHashBackData.fileUrl)  return

        // 可以上传，那么判断单个文件的上传方式，是普通还是分片上传（分片的话从第几片开始）
        if (item.file.size < this.chunkSize) {
          await this.getByNormalUpload(item, item.hash).then(() => {
            resolve()
          }).catch(() => {
            reject()
          })
        } else {
          if(!item.partCount) {
            item.partCount = Math.ceil(item.file.size / this.chunkSize)
          }
          // 查询上传情况：根据已上传分片数组，生成待上传分片数组,就不用判断是否是断点续传
          // 没上传的分片是哪些,解决是否断点续传的判断，和乱序上传,虽然上传的时候时常因为最后一片大小的原因，出现乱序上传
          let uploadedPartNumbers = [] // 已上传分片数组
          if(item.uploadId) {
            await this.getFileUploaded(item).then(async (res) => {
              item.successAmount = res.uploadedPartNumbers.length
              uploadedPartNumbers = res.uploadedPartNumbers
            }).catch(err => {
              reject()
            })
          } else {
            item.successAmount = 0
            uploadedPartNumbers = []
          }
          if(item.partCount === item.successAmount) { // 假如文件有10片又上传了10片，但没调end接口
            await this.endChunkUpload(item).then(() => {
              resolve()
            }).catch(() => {
              reject()
            })
            return
          }


          let pendingUploadChunks = [] // 待上传分片数组
          item.chunks = Array.from({ length: item.partCount }, (v, k) => k); // 所有要上传的分片
          item.chunks.map(j => j+1).forEach(i => {
            if(!uploadedPartNumbers.includes(i) ) {
              pendingUploadChunks.push(i)
            }
          })
          await this.concurrentUpload(item, pendingUploadChunks).then(async (res) => {
            await this.endChunkUpload(res)
            resolve()
          }).catch(() => {
            reject()
          })
          console.log('end---')
        }
      })
    },
    // 单文件上传
    async singleFileUpload(item) {
      if(item.status === 'pause') return

      if(!item.hash) { // 文件没有计算过hash
        item.status = 'hash'
        await this.calculateHash(item).then((res) => {
          item.hash = res
        }).catch(() => {
          item.status = 'hashError'
        })
      }
      if(item.status === 'pause') return
      let queryHashBackData = await this.verifyUpload(item)
      if(item.status === 'pause') return
      item.uploadId = queryHashBackData.uploadId
      // 秒传：已经上传过的话fileUrl有值，秒传
      if(queryHashBackData.fileUrl) {
        item.status = 'success'
        item.progress = 100
        this.sendInfo()
        return
      }

      // 可以上传，那么判断单个文件的上传方式，是普通还是分片上传（分片的话从第几片开始）
      if (item.file.size < this.chunkSize) {
        await this.getByNormalUpload(item, item.hash)
      } else {
        if(!item.partCount) {
          item.partCount = Math.ceil(item.file.size / this.chunkSize)
        }
        // 查询上传情况：根据已上传分片数组，生成待上传分片数组,就不用判断是否是断点续传
        // 没上传的分片是哪些,解决是否断点续传的判断，和乱序上传,虽然上传的时候时常因为最后一片大小的原因，出现乱序上传
        let uploadedPartNumbers = [] // 已上传分片数组
        if(item.uploadId) {
          await this.getFileUploaded(item).then(async (res) => {
            item.successAmount = res.uploadedPartNumbers.length
            uploadedPartNumbers = res.uploadedPartNumbers
          }).catch(err => {})
        } else {
          item.successAmount = 0
          uploadedPartNumbers = []
        }
        if(item.partCount === item.successAmount) { // 假如文件有10片又上传了10片，但没调end接口
          await this.endChunkUpload(item)
          return
        }


        let pendingUploadChunks = [] // 待上传分片数组
        item.chunks = Array.from({ length: item.partCount }, (v, k) => k); // 所有要上传的分片
        item.chunks.map(j => j+1).forEach(i => {
          if(!uploadedPartNumbers.includes(i) ) {
            pendingUploadChunks.push(i)
          }
        })
        await this.concurrentUpload(item, pendingUploadChunks).then((res) => {
          this.endChunkUpload(res)
        })
      }
    },
    getByNormalUpload(item, fileHash) {
      return new Promise(async(resolve, reject) => {
        let  _this = this
        let file = item.file
        let partData = file.slice(0, file.size-1);// 转为二进制
        let params = {
          fileName: encodeURIComponent(file.name),
          bucket: "PUBLIC_READ",
          fileHash,
          fileSize: item.fileSize,
        }
        let url = `/file-service/api/file/v1/upload/uploadByBody?accesstoken=${_this.token}&`
        for (const key in params) {
          url = url + key + `=${params[key] || ''}&`
        }
        if(item.status === 'pause') return

        $.ajax({
          url,
          type: 'POST',
          data: partData,
          async: true,
          processData: false,
          contentType: false,
          xhr: () => {
            let xhr = new XMLHttpRequest();
            //使用XMLHttpRequest.upload监听上传过程，注册progress事件，打印回调函数中的event事件
            xhr.upload.addEventListener('progress', function (e) {
              // loaded代表上传了多少,total代表总数为多少
              if(e.lengthComputable) {
                item.progress = Math.floor((e.loaded / e.total) * 100)
              }
            })
            xhr.onerror = function(e) {
              item.status = 'error'
              console.log('xhr.onerror', xhr.onerror)
            };

            return xhr;
          },
          success: function(res){
            if(res.code === 5001) {
              item.status = 'requestErr'
              reject()
              return
            }
            console.log('000', res.data)
            if(res.data.fileUrl) { // fileUrl有值才是成功
              item.status = 'success'
              item.uploadSuccessBackData = {
                fileSize: item.fileSize,
                ...res.data
              }
              _this.sendInfo()
              resolve()
            }
          },
          error:(err) => {
            item.status = 'requestErr'
            console.log('err', err)
            reject()
          }
        })
      })
    },
    // 分片上传与断点续传
    startChunkUpload(item) {
      let  _this = this
      // 有uploadId代表曾经上传过，就不要再对同一个文件开启分片上传
      // if(item.uploadId) return  { uploadId: item.uploadId }
      let { file, hash } = item
      // 还有增加总共分了几片的参数，然后后端会记录上传了第几片，然后返回给前端
      let params = {
        fileName: encodeURIComponent(file.name),
        bucket: "PUBLIC_READ",
        fileHash: hash,
        partCount: Math.ceil(file.size / this.chunkSize), // 总分片数
      }
      let startUrl = `/file-service/api/file/v1/uploadMultipart/start?accesstoken=${_this.token}&`;
      for (const key in params) {
        startUrl = startUrl + key + `=${params[key] || ''}&`
      }
      return new Promise((resolve, reject) => {
        if(item.status === 'pause') return

        $.ajax({
          url: startUrl,
          type: "GET",
          success: function(d){
            if (!d || !d.data || !d.data.uploadId){
              $("#output").text("开启分片上传失败");
              reject(false)
              return;
            }
            // d.data.uploadId;
            resolve(d.data)
          },
          error:(err) => {
            item.status = 'requestErr'
            console.log('err', err)
          }
        });
      })
    },
    chunkUploading(item, uploadId,partNumber) {
      let _this = this
      let file = item.file
      let start = (partNumber-1) * this.chunkSize;
      let end = Math.min(file.size, start + this.chunkSize);
      let partData = file.slice(start, end);
      let urlUploadPart = "/file-service/api/file/v1/uploadMultipart/uploadPart?uploadId=" + encodeURIComponent(uploadId) +
        "&partNumber=" + partNumber.toString() + `&accesstoken=${_this.token}`;
      // if(partNumber === 45) return new Promise((resolve, reject) => { reject(555) })
      return new Promise((resolve, reject) => {
        if(item.status === 'pause') return

        $.ajax({
          url: urlUploadPart,
          type: "POST",
          data: partData,
          async: true,
          processData: false,
          contentType: false,
          success: function(d){
            if (!d  || !d.data || !d.data.success){
              item.failedPartNumbers.push(partNumber);
              return
            }
            item.successAmount++
            resolve(d.data)
          },
          error:(err) => {
            item.status = 'requestErr'
            console.log('err', err)
          }
        });
      })
    },
    endChunkUpload(item,startTime) {
      return new Promise(async (resolve, reject) => {
        let { uploadId } = item, _this = this
        // let usedSeconds = parseInt(new Date() - startTime) / 1000;
        // let speed = (uploadedCount * perPartSizeMB) / usedSeconds;
        // $("#output").text("进度:" + uploadedCount + "/" + shardCount + " 上传速度:" + speed.toFixed(2) + "MB/s");
        let endUrl = "/file-service/api/file/v1/uploadMultipart/end?&uploadId=" + encodeURIComponent(uploadId) + `&accesstoken=${_this.token}`;
        if(item.status === 'pause') return

        $.ajax({
          url: endUrl,
          type: "GET",
          success: function(d){
            // _this.getFileUploaded(item).then((res) => {
            //   item.progress = (res.uploadedPartSize / item.fileSize) * 100
            //   console.log('item.progress end', item.progress)
            // })
            if (!d || !d.data || !d.data.fileUrl) {
              // $("#output").text("结束分片上传失败");
              console.log("结束分片上传失败")
              // 调接口查成功多少片乘以分片大小
              item.status = 'error' // 重传
              reject()
              return;
            }
            if(d.data.fileUrl) {
              item.status = 'success'
              item.progress = 100
              item.uploadSuccessBackData = {
                fileSize: item.fileSize,
                ...d.data
              }
              _this.sendInfo()
              console.log('文件所有分片上传成功')
              resolve()
            }


            // let totalUsedSeconds = parseInt(new Date() - startTime) / 1000;
            // $("#output").html('上传成功:<a href="' + d.data.fileUrl + '">下载</a>' +
            //   " 上传速度:" + speed.toFixed(2) + "MB/s" + " 耗时:" + totalUsedSeconds.toFixed(0));
          },
          error:(err) => {
            item.status = 'requestErr'
            console.log('err', err)
            reject()
          }
        });
      })
    },
    // 取消上传
    deleteUploadedFile(uploadId) {
      let  _this = this

      $.ajax({
        url: `/file-service/api/file/v1/uploadMultipart/abort?uploadId=${uploadId}&accesstoken=${_this.token}`,
        type: "GET",
        success: function(d){
          // console.log('ddddd', d)
        },
        error: (err) => {
          console.log('err', err)
        }
      });
    },
    // 为上传成功的文件增加取消上传
    uploadedCancle({$index, row}) {
      this.fileList.splice($index, 1)
      let hasFileRouteAttachmentInfos = this.allUploadSuccessFileList.hasFileRouteAttachmentInfos
      let noHasFileRouteAttachmentInfos = this.allUploadSuccessFileList.noHasFileRouteAttachmentInfos
      if(row.FileRoute.length) { // 文件夹选择
        hasFileRouteAttachmentInfos.splice(hasFileRouteAttachmentInfos.indexOf(row.file.name), 1)
      } else {
        noHasFileRouteAttachmentInfos.splice(noHasFileRouteAttachmentInfos.indexOf(row.file.name), 1)
      }
    },
    uploadCancle({$index, row}) {
      this.fileList.splice($index, 1)
      if(row.uploadId) { // 分片上传才有，普通文件不能删除
        this.deleteUploadedFile(row.uploadId)
      }
      row.status = 'cancel' // cancel,不把这个状态定为暂停，因为要处理删除数组元素触发组件更新，导致进度条闪动
    },
    pauseOrCancleUploadAll(type) {
      this.fileList.forEach(item => {
        if(item.status !== 'success' && item.status !== 'error') {
          item.status = 'pause'
        }
        if(item.status !== 'success' && item.status === 'cancel' && item.uploadId) { // 取消正在上传的文件，不包括已成功的
          this.deleteUploadedFile(item.uploadId)
        }
      })
      if(type === 'allCancel') {
        this.fileList = []
        this.allUploadSuccessFileList = []
        this.allUploadCancel = true
      }


      //  除了上传成功的都给他变为上传中的状态（错误的，暂停的，等待的，）恢复的呢，不管，让他再查hash,
      //  上传，全部文件暂停,此时调接口的地方都会判断是否全部暂停
      //  全部开始，重新调上传接口
      //  普通上传文件，状态置为pause，分片调用中止分片上传接口
      // 开始全部暂停，上传中全部暂停
      //  没调一次接口都要轮询片段
      //  单文件点暂停，状态置为pause,那就要在分片接口处判断是否变成了断点
      //  文件上传条件：状态为uploading或wait,否则不准调上传接口
    },
    singleFileStatusChange(item, status) {
      // 初始化文件属性status
      if(item.status !== 'success' || item.status !== 'error') {
        item.status = status
      }
      // 结束条件 计算hash值及什么时候计算：验证是否文件上传过或上传完整，还需要上传不
      if(item.status !== 'pause') {
        this.singleFileUpload(item)
      }
    },
    // 清除已上传，还有取消上传的
    clearUploaded() {
      let aa = this.fileList.filter(item => item.status !== 'success')
      this.fileList = aa
    },
    mapFileStatus(status) {
      return this.fileStatus[status]
    },
    setAccessToken(token){
      this.token = encodeURIComponent(token);
    },
    setCanUploadFile(val) {
      this.canUploadFile = val
    },
    setUploadFileLimit(uploadFileLimit) {
      this.uploadFileLimit = {
        ...this.uploadFileLimit,
        ...uploadFileLimit
      }
      // console.log('this.uploadFileLimit', this.uploadFileLimit)
      //  限制上传类型，限制原因提示
    },
    receiveFatherWindowMessage(e) {
      // 判断对象是否存在某个属性
      if(e.data) {
        // // 父窗口点击确定
        // if(e.data.callConfirm) {
        //   this.confirm()
        // }
        if(Array.isArray(e.data.forbidUploadTypes)) {
          this.uploadFileLimit.forbidUploadTypes = e.data.forbidUploadTypes
        }
        if(typeof e.data.forbidUploadTypesTipMessage !== 'undefined') {
          this.uploadFileLimit.forbidUploadTypesTipMessage = e.data.forbidUploadTypesTipMessage
        }

        if(e.data.token) {
          this.token = encodeURIComponent(e.data.token)
        }
        if(e.data.cancelAllUpload) { // 父页面点击了取消
          console.log('cancelAllUpload')
          this.pauseOrCancleUploadAll('allCancel')
          // this.myWorker.terminate()
        }
        console.log('e.data.canUploadFile',e.data.canUploadFile, new Date())
        if(typeof e.data.canUploadFile === "boolean") {
          this.canUploadFile = e.data.canUploadFile
          // 每收到canUploadFile的值就是切换目录取消上传还是暂停上传呢，取消吧，暂停的话，某一刻突然全部成功就完了
          this.pauseOrCancleUploadAll('allCancel')
        }
      }

      if(e.data.onlyRefreshToken) return

      this.fileList = []
      this.allUploadSuccessFileList = []
      // window.removeEventListener('message', this.receiveFatherWindowMessage, false)
    },
    // 暴露，方便测试
    exposeToOutside() {
      window.setAccessToken = this.setAccessToken;
      window.setCanUploadFile = this.setCanUploadFile;
      window.setUploadFileLimit = this.setUploadFileLimit;

    }
  },
  computed: {
    btnAllStart() {
      // 结束上传: 所选文件为空或所选文件都已经上传
      return !this.fileList.length || this.fileList.every(item => item.status === 'success') || !this.canUploadFile
    },
    btnAllPause() {
      // false this.fileList.some(item => item.status === 'uploading')
      return !this.fileList.length || this.fileList.every(item => item.status === 'success') || !this.canUploadFile
    },
  },
  created() {
    // 判断页面是否被嵌入iframe里面，如果返回false –> 说明页面被嵌套在iframe中了
    this.selfTest = window.self === window.top
    // 暴露，方便测试
    this.exposeToOutside()
    window.addEventListener('message', this.receiveFatherWindowMessage, false)
  },
  destroyed() {
    this.myWorker = null

  }
}
</script>

<style lang="less">



</style>