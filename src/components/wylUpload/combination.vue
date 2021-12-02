<template>
  <div>
    <new-upload v-show="wyluploadshow" :class="wyluploadclass" :action="actionurl">
      <el-button ref="wylbutton" :class="wylbuttonclass" :size="wylsize" :type="wyltype">{{ uploadWord }}</el-button>
      <div slot="tip" class="el-upload__tip">{{ wyltip }}</div>
    </new-upload>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import newUpload from './wylUpload.vue'
@Component({
  components: {
    newUpload
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
  mounted(): void {
    this.$on('handleClick', () => {
      (this.$refs.wylbutton as any).handleClick
    })
  }
  wylClick(): void {
    (this.$refs.wylbutton as any).handleClick()
  }

}
</script>

<style>

</style>