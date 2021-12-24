<template>
  <div class="hello">
    <div class="block">
      <span class="demonstration">多选可搜索</span>
      <wyl-upload ref="child"  :wylclick='handleChange'  uploadWord='上传1' actionurl='http://test-front-alb-863622653.ap-southeast-1.elb.amazonaws.com:9877/api/docu/document/uploadDocument'>
      </wyl-upload>
    </div>
    <el-button @click="handleChange">上传</el-button>


    <div>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="xianshiValue">
      </el-input>
    </div>


    <div>
      <pre>
        <code>
          {{xianshiValue}}
        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Unite from './newString'
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  $confirm: any;
  $message: any;
  cengji: any[] = [{
    name: 'string',
    obj: 'object',
    arr: 'array'
  }];
  shishi: any;
  xianshiValue: string = '';
  created(): void {
    const obj = [
      'name',
      {
        name: 'lisi'
      }
    ]

    new Unite(obj).getString((res) => {
      console.log(res);
      
      this.xianshiValue = res
    })
    // if (typeof this.cengji[0] === 'object') {
    //   if (isOfType.array(this.cengji[0])) {
    //     console.log('is arr');
    //   } else if (isOfType.object(this.cengji[0])) {
    //     this.shishi = {}
    //     const newObj = this.cengji[0]
    //     for (const key in newObj) {
    //       if (newObj[key] === 'object') {
    //         this.shishi[key] = {}
    //       } else if (newObj[key] === 'array') {
    //         this.shishi[key] = []
    //       } else if (newObj[key] === 'string') {
    //         this.shishi[key] = '噫噫噫'
    //       } else if (newObj[key] === 'number') {
    //         this.shishi[key] = 10
    //       } else if (newObj[key] === 'boolean') {
    //         this.shishi[key] = true
    //       }
    //     }
    //   }
    // }
    // this.xuanran(this.shishi)
  }
  mounted(): void {
    // this.cengji.forEach((item) => {
    //   for (const key in item) {
    //     if (item[key] === 'object') {
    //       this.cengji[1].push({ name: 'obj' })
    //     }
    //   }
    // })
    // console.log(this.shishi);
  }
  getkey(item: { [x: string]: any }): any[] {
    const arr = []
    for (const key in item) {
      const value = key + ': ' + item[key] + `;\n`
      arr.push(value)
    }
    return arr
  }
  xuanran(data): void {
    let xrValue = '{\n'
    for (const key in data) {
      const value = key + ': ' + data[key] + `;\n`
      xrValue += value
    }
    this.xianshiValue = xrValue
  }
  handleChange(): void {
    (this.$refs.child as any).wylClick()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
pre {
    background-color: #282c34;
  }

  code {
    word-wrap: normal;
    word-break: break-all;
    background-color: #282c34;
    color: #abb2bf;
    -webkit-text-size-adjust: none;
    overflow-x: auto;
    white-space: pre;
    display: block;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px
  }
</style>
