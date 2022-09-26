<template>
  <span class="icon_wrapper">
    <svg class="iconfile" aria-hidden="true">
      <use :xlink:href="icon"></use>
    </svg>
    <span v-if="isUp6Folder" class="up6-label">up6</span>
  </span>
</template>

<script>

export default {
  name: 'FileIcon',
  componentName: 'FileIcon',
  props: {
    type: {
      type: String,
      default() {
        return '';
      },
    },
    isFolder: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isUp6Folder: {
      type: Boolean,
      default: false,
    },
    folderHasFile: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      iconDefs: [
        {
          extension: 'png',
          icon: '#fileicon-PNGtubiao',
        },
        {
          extension: 'jpg,jpeg',
          icon: '#fileicon-JPGtubiao',
        },
        {
          extension: 'bmp',
          icon: '#fileicon-BMPtubiao',
        },
        {
          extension: 'gif',
          icon: '#fileicon-GIFtubiao',
        },
        {
          extension: 'svg',
          icon: '#fileicon-SVGtubiao',
        },
        {
          extension: 'tif',
          icon: '#fileicon-TIFtubiao',
        },
        {
          extension: 'ai',
          icon: '#fileicon-AItubiao',
        },
        {
          extension: 'ps,psd',
          icon: '#fileicon-PSDtubiao',
        },
        {
          extension: 'dwt,dwg,dws,dxf',
          icon: '#fileicon-DWG',
        },
        {
          extension: 'mp4',
          icon: '#fileicon-MPtubiao',
        },
        {
          extension: 'flv',
          icon: '#fileicon-FLVtubiao',
        },
        {
          extension: 'mov',
          icon: '#fileicon-MOVtubiao',
        },
        {
          extension: 'mp4,avi,flv,mov',
          icon: '#fileicon-video',
        },
        {
          extension: 'mp3',
          icon: '#fileicon-MPtubiao1',
        },
        {
          extension: 'mp3,oaa,flac,acc',
          icon: '#fileicon-audio',
        },
        {
          extension: 'txt',
          icon: '#fileicon-TXTtubiao',
        },
        {
          extension: 'doc,docx',
          icon: '#fileicon-DOCtubiao',
        },
        {
          extension: 'xls,xlsx',
          icon: '#fileicon-XSLtubiao',
        },
        {
          extension: 'ppt,pptx',
          icon: '#fileicon-PPTtubiao',
        },
        {
          extension: 'pdf',
          icon: '#fileicon-PDFtubiao',
        },
        {
          extension: 'tar',
          icon: '#fileicon-TARtubiao',
        },
        {
          extension: 'zip',
          icon: '#fileicon-ZIPtubiao',
        },
        {
          extension: 'rar',
          icon: '#fileicon-RARtubiao',
        },
        {
          extension: '7z',
          icon: '#fileicon-Ztubiao',
        },
        {
          extension: 'exe',
          icon: '#fileicon-EXEtubiao',
        },
        {
          extension: 'html,htm',
          icon: '#fileicon-HTMLtubiao',
        },
        {
          extension: 'swf',
          icon: '#fileicon-SWFtubiao',
        },
        {
          extension: 'rp',
          icon: '#fileicon-RPtubiao',
        },
        {
          extension: 'eps',
          icon: '#fileicon-EPStubiao',
        },
      ],
    };
  },
  computed: {
    icon() {
      let icon = '#fileicon-file';
      if (this.isFolder) {
        icon = this.folderHasFile ? '#fileicon-folder' : '#fileicon-folder1';
      } else {
        this.iconDefs.some((item) => {
          if (new RegExp(this.type.replace(/^\./, ''), 'g').test(item.extension)) {
            icon = item.icon;
            return true;
          }
          return false;
        });
      }
      return icon;
    },
  },
}
</script>

<style scoped>
  .icon_wrapper {
    display: inline-block;
    position: relative;
    font-size: 14px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .up6-label {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #df1c3c;
    font-size: 12px;
    transform: translate(-50%, -50%);
  }
  .iconfile {
    font-size: inherit;
    width: 1.5em;
    height: 1.5em;
    float: left;
  }
  .isnew {
    width: 2em;
    height: 2em;
  }
</style>
