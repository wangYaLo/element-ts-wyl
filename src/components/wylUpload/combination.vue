<template>
  <div>
    <new-upload ref="wylbutton"
    :accept="wylAccept | acceptFilter"
    :before-upload="beforeUpload"
    v-show="wyluploadshow"
    :class="wyluploadclass"
    :action="actionurl"
    :on-progress="onProgress"
    :on-success="onSuccess"
    >
      <el-button  :class="wylbuttonclass" :size="size" :type="type">{{ uploadWord }}</el-button>
      <div slot="tip" class="el-upload__tip">{{ wyltip }}</div>
    </new-upload>
    <el-dialog ref="dialog"
    :title="title"
    :fullscreen="fullscreen"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :top='top'
    :modal="modal"
    :width="wylwidth"
    :visible.sync="dialogTableVisible"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    @open='open | nonefunc'
    @opened='opened | nonefunc'
    @close='close | nonefunc'
    @closed='closed | nonefunc'
    >
      <div class="uploadprogress">
        <div class="uploadheader">
          <p class="filename">{{ !uploadfilename ? 'XXXXXXXXXXXXXXXXXXXXXXXX' : uploadfilename }}</p>
          <p class="filesize">{{ !uploadfilesize ? '(0.00MB)' : uploadfilesize }}</p>
        </div>
        <div class="uploadbody">
          <div class="loadwidth1">
            <div class="loadwidth2" :style="'width:' + percentage + '%;'"></div>
          </div>
        </div>
        <div class="uploadfooter">
          <p>{{ percentage }}%</p>
          <p>{{ uploadSpeed }}kb/s</p>
        </div>
        <!-- @click="canelupload" -->
        <button :class="uploaded ? 'cancelupload' : 'cancelupload1'" >
          {{ uploaded == true ? '取消上传' : '图片加载中' }}
        </button>
      </div>
    </el-dialog>
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { File_All, raw_type, response_All } from './types';
import newUpload from './wylUpload.vue';
import FileType from 'file-type/browser';
import { fileSuffix } from './supported'
@Component({
  components: {
    newUpload
  },
  filters: {
    acceptFilter(item: string[]): string {
      let newStr = ''
      item.forEach((item, index) => {
        if (index === 0) {
          newStr = newStr + '.' + item
        } else {
          newStr = newStr + ',.' + item
        }
      })
      return newStr
    }
  }
})
export default class wylUpload extends Vue {
  @Prop({ default: '/' }) private actionurl!: string;
  @Prop({ default: '上传' }) private uploadWord!: string;
  @Prop({ default: '只能上传jpg/png文件，且不超过500kb' }) private wyltip!: string;
  @Prop({ default: 'small' }) private size!: string;
  @Prop({ default: 'primary' }) private type!: string;
  @Prop({ default: '' }) private wylbuttonclass!: string;
  @Prop({ default: 'upload-demo' }) private wyluploadclass!: string;
  @Prop({ default: true }) private wyluploadshow!: string;
  @Prop({ default: '390px' }) private wylwidth!: string;
  @Prop({ default: '' }) private title!: string;
  @Prop({ default: false }) private fullscreen!: boolean;
  @Prop({ default: '15vh' }) private top!: string;
  @Prop({ default: true }) private modal!: boolean;
  @Prop({ default: true }) private modalAppendToBody!: boolean;
  @Prop({ default: false }) private appendToBody!: boolean;
  @Prop({ default: true }) private lockScroll!: boolean;
  @Prop({ default: '' }) private customClass!: string;
  @Prop({ default: true }) private closeOnClickModal!: boolean;
  @Prop({ default: true }) private closeOnPressEscape!: boolean;
  @Prop({ default: true }) private showClose!: boolean;
  @Prop() private beforeClose!: (done: any) => void;
  @Prop({ default: false }) private center!: boolean;
  @Prop({ default: false }) private destroyOnClose!: boolean;
  @Prop() private open!: () => void;
  @Prop() private opened!: () => void;
  @Prop() private close!: () => void;
  @Prop() private closed!: () => void;
  // @Prop({ default: true }) private closeOnPressEscape!: boolean;
  // @Prop({ default: true }) private closeOnPressEscape!: boolean;
  @Prop({ default: () => {
    return ['png', 'jpg', 'webp', 'gif', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'doc', 'docx']
  } }) private wylAccept!: string[]
  dialogTableVisible: boolean = false;
  public timeStamp: number = 0; //当前上传时间戳
  public timeStamp1: number = 0; //存储本次上传时间戳
  public timeStamp2: number = 0; //当前上传时间差
  public loaded: number = 0; //当前上传大小
  public loaded1: number = 0; //存储当前上传时间
  public loaded2: number = 0; //当前上传时间差
  public uploadSpeed: number = 0; //上传速度
  public percentage: number = 0; //富文本编辑器上传文本进度
  public isActive: number = 1; //默认选择锚点索引
  public uploadfilename: string = ''; //上传文件名
  public uploadfilesize: string = ''; //上传文件大小uploaded
  public uploaded: boolean = true; //
  $refs: any;
  wylClick(): void {
    const func = this.$refs.wylbutton
    func.$children[0].$refs.input.click()
  }
  beforeUpload(file: raw_type): Promise<any> {
    const p = new Promise((reslove, reject) => {
      const res = (FileType as any).fromBlob(file)
      res.then((response: any) => {
        const fileTypeArr: string[] = []
        const fileTypeObj = this.getFileType()
        this.wylAccept.forEach((item: string) => {
          fileTypeArr[fileTypeArr.length] = fileTypeObj[item]
        })
        const haveFileType = fileTypeArr.filter((value: string) => {
          return value === response.mime
        })
        if (haveFileType.length !== 0) {
          reslove(1)
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
    return p
  }
  onSuccess(response: response_All, file: File_All): void {
    this.dialogTableVisible = false
    const fileboolean = this.wylAccept
  }
  onProgress(event: ProgressEvent & { percent: number}, file: File_All): void {
    this.uploadfilename = file.name;
    this.uploadfilesize = '(' + (file.size / 1000000).toFixed(2) + 'MB)';
    this.dialogTableVisible = true; //控制下载进度条的显示
    this.timeStamp = event.timeStamp; //当前上传时间戳
    this.loaded = event.loaded; //当前上传大小
    if (this.timeStamp1 == 0) {
      this.timeStamp2 = 0;
      this.loaded2 = 0;
      this.uploadSpeed = 0;
    } else {
      this.timeStamp2 = this.timeStamp - this.timeStamp1; //上传时间差
      this.loaded2 = this.loaded - this.loaded1; //上传大小差
      this.uploadSpeed = parseInt(String(((this.loaded2 * (1000 / this.timeStamp2)) / 1000))); //上传速度kb每秒
    }
    this.timeStamp1 = this.timeStamp; //存储本次上传时间戳
    this.loaded1 = this.loaded; //存储本次上传大小
    this.percentage = parseInt(String(event.percent));
  }
  getFileType(): {[x: string]: string} {
    const fileType: {[x: string]: string} = {}
    fileSuffix.forEach((item: string) => {
      fileType[item.split(' ')[0]] = item.split(' ')[1]
    })
    return fileType
  }
  nonefunc(): boolean {
    return true
  }
}
</script>
<style lang='scss' scoped>
::v-deep .uploadprogress {
  width: 100%;
  height: 100%;
}
.el-dialog__body{
  padding-top: 0px;
  padding-bottom: 0px;
}
.uploadprogress {
  opacity: 1;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .uploadheader {
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    .filename {
      width: 70%;
      height: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .filesize {
      text-align: right;
      width: 30%;
      height: 100%;
    }
  }
  .uploadbody {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 4px;
    .loadwidth1 {
      width: 100%;
      height: 2px;
      background: rgba(0, 0, 0, 0.06);
    }
    .loadwidth2 {
      height: 2px;
      background: #00aaff;
      border-radius: 32px;
      transition: 0.5s All;
    }
  }
  .uploadfooter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #333333;
    line-height: 24px;
  }
  .cancelupload {
    width: 126px;
    height: 36px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 3px;
    cursor: pointer;
    line-height: 36px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #666666;
    margin-top: 30px;
    &:hover {
      border: 1px solid #000;
    }
  }
  .cancelupload1 {
    width: 126px;
    height: 36px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 3px;
    cursor: pointer;
    line-height: 36px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #cccccc;
    margin-top: 30px;
  }
}
</style>
