### API文档

安装

```vue
npm install element-ts-wyl -S
```

引入（man.ts)

```vue
import wylElement from 'element-ts-wyl'
Vue.use(wylElement);
```

#### xdm-caster

| 名称       | 说明             | 类型                                                 |
| ---------- | ---------------- | ---------------------------------------------------- |
| options    | 绑定选择内容     | { value: string; label: string; children:{父级}[]}[] |
| props      | 配置选项         | 见element官网                                        |
| filterable | 是否可以搜索选项 | boolean                                              |

使用

```vue
<xdm-caster  :options="options" :props="{ multiple: true }" filterable></xdm-caster>
```

| 名称           | 说明               | 类型            |
| -------------- | ------------------ | --------------- |
| beforDeleteTag | 在删除标签之前执行 | Promise类型函数 |

示例

```typescript
handleChange(): Promise<any> {
    return new Promise((reslove, reject) => {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          reslove(1);
        })
        .catch(() => {
          reject();
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    });
  }
```

####  wyl-upload(文件上传)

| 名称                 | 说明                                              | 类型     | 默认值/可选值                                      |
| -------------------- | ------------------------------------------------- | -------- | -------------------------------------------------- |
| actionurl            | 上传地址                                          | string   | '/'                                                |
| uploadWord           | 上传按钮文字                                      | string   | '上传'                                             |
| wyltip               | 提示语                                            | string   | ‘只能..'                                           |
| size                 | 按钮大小                                          | string   | medium / small / mini                              |
| type                 | 按钮类型                                          | string   | primary / success / warning / danger / info / text |
| wylbuttonclass       | 按钮的类名称                                      | string   | ‘’                                                 |
| wyluploadclass       | 上传类名称                                        | string   | ‘’                                                 |
| wyluploadshow        | 上传组件是否显示                                  | boolean  | false/true                                         |
| wylwidth             | 弹框宽                                            | string   | ‘300px’                                            |
| title                | 弹框标题                                          | string   | ‘’                                                 |
| fullscreen           | 是否为全屏 Dialog                                 | boolean  | false                                              |
| top                  | Dialog CSS 中的 margin-top 值                     | string   | 15vh                                               |
| modal                | 是否需要遮罩层                                    | boolean  | true                                               |
| 官网所有的Attributes | https://element.eleme.cn/#/zh-CN/component/dialog |          |                                                    |
| open                 | Dialog 打开的回调                                 | function |                                                    |
| opened               | Dialog 打开动画结束时的回调                       | function |                                                    |
| close                | Dialog 关闭的回调                                 | function |                                                    |
| closed               | Dialog 关闭动画结束时的回调                       | function |                                                    |
| wylAccept            | 上传文件限制，根据上传文件头文字判断              |          |                                                    |

使用

```vue
<wyl-upload ref="child" ></wyl-upload>
```

隐藏上传组件获取上传组件点击上传选择文件事件

```typescript
this.$refs.child.wylClick()
```

