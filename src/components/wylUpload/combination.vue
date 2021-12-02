<template>
  <div>
    <new-upload :accept="wylAccept | acceptFilter"  :before-upload="beforeUpload" v-show="wyluploadshow" :class="wyluploadclass" :action="actionurl">
      <el-button ref="wylbutton" :class="wylbuttonclass" :size="wylsize" :type="wyltype">{{ uploadWord }}</el-button>
      <div slot="tip" class="el-upload__tip">{{ wyltip }}</div>
    </new-upload>
    <el-dialog :visible.sync="dialogTableVisible">
    </el-dialog>
    <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { raw_type } from './types';
import newUpload from './wylUpload.vue';
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
  @Prop({ default: 'small' }) private wylsize!: string;
  @Prop({ default: 'primary' }) private wyltype!: string;
  @Prop({ default: '' }) private wylbuttonclass!: string;
  @Prop({ default: 'upload-demo' }) private wyluploadclass!: string;
  @Prop({ default: true }) private wyluploadshow!: string;
  @Prop({ default: () => {
    return ['png', 'jpg', 'webp', 'gif', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'doc', 'docx']
  } }) private wylAccept!: string
  dialogTableVisible: boolean = false;
  wylClick(): void {
    (this.$refs.wylbutton as any).handleClick()
  }
  mounted(): void {
    const fs = require('fs')
    console.log(fs);
  }
  beforeUpload(file: raw_type): void {
    console.log(file);
    
  }
}
</script>
<style lang='scss' scoped>
.uploadprogress {
  width: 354px;
  height: 206px;
  opacity: 1;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 9px 28px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .uploadheader {
    width: 290px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-top: 46px;
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
    width: 290px;
    margin-top: 16px;
    margin-bottom: 4px;
    .loadwidth1 {
      width: 290px;
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
    width: 290px;
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
