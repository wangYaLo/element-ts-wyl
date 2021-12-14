<template>
    <div class="fontForechBox" :style="
    'font-size:'+ fontSize + ';'
    + 'font-family:'+ fontFamily + ';'
    + 'font-weight:'+ fontWeight + ';'
    + 'color:'+ color + ';'
    ">
      <p class="pStyle" v-for="(item, index) in newstring" :key="index" :style="item === ' ' ? 'margin-left: 10px; transition: all ' + transitionTime +';' : 'transition: all ' + transitionTime +';' " >{{item}}</p>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'imgHover'
})
export default class imgHover extends Vue {
  @Prop() private fontString!: string
  @Prop({ default: '14px' }) private fontSize!: string;
  @Prop({ default: '宋体' }) private fontFamily!: string;
  @Prop({ default: '600' }) private fontWeight!: string;
  @Prop({ default: '#FCFEF2' }) private color!: string;
  @Prop({ default: '.5s' }) private transitionTime!: string;
  @Prop({ default: 200 }) private setInterval!: number;
  public newstring: string[] = [];
  public timer: any
  public inum: number = 0;
  created(): void {
    for (let num = 0; num < this.fontString.length; num++) {
      this.newstring[this.newstring.length] = this.fontString[num]
    }
  }
  mounted(): void {
    this.timer = setInterval(this.func, this.setInterval)
  }
  destroyed(): void {
    clearInterval(this.timer)
  }
  func(): void {
    const pStyleArr = document.body.querySelectorAll('.pStyle') as any
    pStyleArr.forEach((item: any, index: number) => {
      if (this.newstring[this.inum] === ' ') this.inum++
      item.style.marginTop = this.inum === index ? '0px' : '10px';
    })
    this.inum++
    if (this.inum >= this.newstring.length) {
      this.inum = 0
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .fontForechBox{
    // padding: 0px 30px;
    display: flex;
    .pStyle{
      margin: 10px 0;
      
    }
  }
</style>
