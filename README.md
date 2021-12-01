### API 文档

#### xdm-caster

引入

```typescript
import xdmCaster from 'element-ts-wyl';
components: {
  xdmCaster;
}
```

| 名称       | 说明             | 类型                                                 |
| ---------- | ---------------- | ---------------------------------------------------- |
| options    | 绑定选择内容     | { value: string; label: string; children:{父级}[]}[] |
| props      | 配置选项         | 见 element 官网                                      |
| filterable | 是否可以搜索选项 | boolean                                              |

使用

```vue
<xdm-caster :options="options" :props="{ multiple: true }" filterable></xdm-caster>
```

| 名称           | 说明               | 类型             |
| -------------- | ------------------ | ---------------- |
| beforDeleteTag | 在删除标签之前执行 | Promise 类型函数 |

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
