// 图档库预览
import md5Encrypt from "js-md5";
import axios from "axios";

let filePreview = {
    methods: {
        previewOnline () {
            let oDiv = document.createElement('div')
            let oBody = document.getElementsByTagName('body')[0]
            oDiv.className = 'alert-box'
            oDiv.id = 'file-view'
            oDiv.style.height = 'calc(100% - 10px)'
            oDiv.style.position = 'relative'
            oDiv.style.overflow = 'hidden'
            
            let str = '', sum = 0
            // let basicInfo = JSON.parse(sessionStorage.getItem('basicInfo'))
            let userObj = JSON.parse(sessionStorage.getItem('meJson'))
            let username = userObj.username ? userObj.username : '帷幄运营管理平台',
                aliasName = userObj.name ? userObj.name : ''
            let  webConfig = { waterMark: '保密文件'}

            let boxHeight = oBody.offsetHeight
            let boxWidth = oBody.offsetWidth
            let diagonal = Math.sqrt(boxHeight * boxHeight + boxWidth * boxWidth)
            sum = Math.ceil(diagonal / 50)
            for (var i = 0; i < sum; i++) {
                str += `<div style="margin:150px -150px;display:flex;justify-content: space-between;">
                  <div>
                      <div>${webConfig.waterMark}，账号：${username}</div>
                      <div>姓名：${aliasName}</div>
                  </div>
                  <div>
                      <div>${webConfig.waterMark}，账号：${username}</div>
                      <div>姓名：${aliasName}</div>
                  </div>
                  <div>
                      <div>${webConfig.waterMark}，账号：${username}</div>
                      <div>姓名：${aliasName}</div>
                  </div>
                  <div>
                      <div>${webConfig.waterMark}，账号：${username}</div>
                      <div>姓名：${aliasName}</div>
                  </div>
                  <div>
                      <div>${webConfig.waterMark}，账号：${username}</div>
                      <div>姓名：${aliasName}</div>
                  </div>
                </div>
              `
            }
            if (!webConfig.waterMark) str = ''
            let css = `
      color: rgba(219, 219, 219, 0.6); word-spacing: 2px; text-align: center; position: absolute; width: 100%;height:100%;
      left: 0;top: 0; font-size: 18px;font-weight: bold;pointer-events: none; transform: rotate(-20deg) translateY(-450px) translateX(0px)
      `
            oDiv.innerHTML =
        `<iframe width="100%" height="100%" frameborder=0 name="showHere" scrolling=auto src=${this.previewFileUrl}></iframe>
         <div class="cover-on-view" style="${css}">${str}</div>`

            oBody.appendChild(oDiv)
            layer.open({
                type: 1,
                title: '在线预览',
                shade: 0.9,
                area: ['95%', '95%'],
                resize: false,
                content: document.getElementById('#file-view'),
                zIndex: 10000,
                success: function () {
          // oDocument.addEventListener('keydown',onkeydown,false);
                },
                end: function () {
          // oDocument.removeEventListener('keydown',onkeydown);
                    oBody.removeChild(oDiv)
                }
            })
        },
        getFileInfo(row) {
            return new Promise(resolve => {
                let key = "E7ACD473655D469AAE0F8BE3680532B2"
                let timestamp = new Date().getTime()
                let str = key+ timestamp
                let sign = md5Encrypt(str).toUpperCase()
                // axios.post(`https://sjptuat.bgy.com.cn/ApiServer/api/pdm/catalog/outsource/tree?sign=` + sign  + '&timestamp=' + timestamp).then(res => {
                //     debugger
                // }).catch(() => {})
                let userObj = JSON.parse(sessionStorage.getItem('meJson'))
                if(!row.DocId) {
                    this.$Message.warning('当前文件DocId为空！')
                    return
                }
                axios.post(`https://sjptuat.bgy.com.cn/ApiServer/api/pdm/catalog/outsource/docs/urls?sign=` + sign  + '&timestamp=' + timestamp, {
                    DocIds: [row.DocId],
                    UserBip: userObj.username,
                    UserName: userObj.name,
                }).then( res => {
                    resolve(res.data.Data[0])
                }).catch(() => {})
            })
        },
        async harvestFilePreview (row) {
            let extension = row.FileExtension
      // 文件夹等不可预览
            if (extension == null) {
                return
            }
            extension = row.FileExtension.toLowerCase()
      // office
            let docType = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt'] // 文档类
            let picType = ['.jpg', '.jpeg', '.gif', '.png', '.bmp', '.tif']  // 图片类
      // let audioType = ['.mp3', '.m4a', '.midi', '.wma']   // 音频类
            let progressingType = ['.html', '.htm', '.xml', '.js', '.css', '.java', '.php', '.sql'] // 编程类
            let office = [...docType, ...picType, ...progressingType]
      // cad:
            let cad = ['.dwg', '.dxf', '.dwt', '.dws']
      // 压缩包文件类型文件
            const ZIPFileTypes = ['.rar', '.zip', '.cab', '.iso', '.jar', '.ace', '.7z', '.tar', '.gz', '.arj', '.lzh', '.uue', '.bz2', '.z']
            if (ZIPFileTypes.includes(extension)) {
                this.$message.warning('压缩包类型文件暂不支持在线预览')
                return
            }

            //
            let { FilePath, FileName, FileHash, DownloadUrl } = await this.getFileInfo(row)

            let url = ''
            if (cad.includes(extension)) {
                url += 'filehash=' + encodeURIComponent(FileHash)
                url += '&fileid=' + encodeURIComponent(FilePath)
                url += '&fileurl=' + encodeURIComponent(DownloadUrl)
                // this.previewFileUrl = webConfig.harvestPreviewCAD + url
                this.previewFileUrl = "https://docobs-uat.test123.info/api/mxcad/cadviewer?" + url
                this.previewOnline()
            } else if (office.includes(extension)) {
        // 图档库预览OFFICE，PDF,图片
                url += '&url=' + encodeURIComponent(DownloadUrl) + '&name=' + encodeURIComponent(row.DocName.replace(/\'/g, '').replace(/%/g, ''))
                // this.previewFileUrl = webConfig.harvestPreviewOFFICE + url
                this.previewFileUrl = "https://sjptuat.bgy.com.cn:18080/view/url?idocv_auth=sapi" + url
                this.previewOnline()
            } else {
                this.$message.warning(extension + '类型文件暂不支持在线预览')
            }
      // console.log('url', url)
        }
    }
}
export default filePreview

