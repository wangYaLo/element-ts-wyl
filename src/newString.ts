
class Untie {
  constructor(obj: { [x: string]: any } | any[], index?: number) {
    if (index) {
      this.index = index
    }
    if (this.isOfType(obj) === 'object') {
      this.Value += `{\n`;
      for (const key in obj) {
        if (this.isOfType((obj as { [x: string]: any })[key]) === 'object') {
          new Untie((obj as { [x: string]: any })[key], this.index + 1).getString((res: string) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + key + ':' + res
          })
        } else if (this.isOfType((obj as { [x: string]: any })[key]) === 'array') {
          new Untie((obj as { [x: string]: any })[key], this.index + 1).getString((res: string) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + key + ':' + res
          })
        } else if (this.isOfType((obj as { [x: string]: any })[key]) === 'string') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + `${ key }: ${ (obj as { [x: string]: any })[key] }\n`
        } else if (this.isOfType((obj as { [x: string]: any })[key]) === 'number') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + `${ key }: ${ (obj as { [x: string]: any })[key] }\n`
        } else if (this.isOfType((obj as { [x: string]: any })[key]) === 'boolean') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + `${ key }: ${ (obj as { [x: string]: any })[key] }\n`
        }
      }
      for (let i = 0; i < this.index - 1; i++) {
        this.Value += '  '
      }
      this.Value += '}\n'
      this.status = 'success'
    } else if (this.isOfType(obj) === 'array') {
      this.Value += `[\n`;
      obj.forEach((item: any) => {
        if (this.isOfType(item) === 'string') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + "'" + item + "'" + ',\n'
        } else if (this.isOfType(item) === 'number') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          this.Value = this.Value + item + ',\n'
        } else if (this.isOfType(item) === 'boolean') {
          for (let i = 0; i < this.index; i++) {
            this.Value += '  '
          }
          if (item) {
            this.Value = this.Value + 'true' + ',\n'
          } else {
            this.Value = this.Value + 'false' + ',\n'
          }
        } else if (this.isOfType(item) === 'object') {
          new Untie(item, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + res
          })
        } else if (this.isOfType(item) === 'array') {
          new Untie(item, this.index + 1).getString((res) => {
            for (let i = 0; i < this.index; i++) {
              this.Value += '  '
            }
            this.Value = this.Value + res
          })
        }
      })
      for (let i = 0; i < this.index - 1; i++) {
        this.Value += '  '
      }
      this.Value += ']\n'
      this.status = 'success'
    }
  }
  // public obj: { [x: string]: any } | any[];
  public status: string = 'pending';
  public Value: string = '';
  public index: number = 1;
  public getString(func: (res: any) => void): void {
    if (this.status !== 'pending') {
      func(this.Value)
    }
  }
  private isOfType(obj: any): string {
    const type = Object.create(null);//创建没有原型的对象
    //  检查null类型
    type.null = (x: null) => x === null;
    //  检查undefined类型
    type.undefined = (x: any) => x === undefined;
    //  检查是否为undefined和null类型
    type.nil = (x: any) => type.null(x) || type.undefined(x);
    //检查字符串和字符串的文字类型。例如：'s', "s", `str`, new String()
    type.string = (x: any) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
    // 检查数字或者数字文字类型。例如：12, 30.5, new Number()不包括NaN 和 Infinity
    type.number = (x: any) => !type.nil(x) &&
    (
      (!isNaN(x) && isFinite(x) &&
      typeof x === 'number'
      ) || x instanceof Number);
    // 布尔类型检查 例如：true, false, new Boolean()
    type.boolean = (x: any) => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
    // 检查数组类型
    type.array = (x: any) => !type.nil(x) && Array.isArray(x);
    // 对象类型检查 例如： {}, new Object(), Object.create(null)
    type.object = (x: any) => ({}).toString.call(x) === '[object Object]';
    // 检查提供的类型实例，参数一为实例对象，参数二为类型
    type.type = (x: any, X: any) => !type.nil(x) && x instanceof X;
    // 检查变量是否为Set类的实例
    type.set = (x: any) => type.type(x, Set);
    // 检查变量是否为Map类的实例
    type.map = (x: any) => type.type(x, Map);
    // 检查变量是否为Date类的实例
    type.date = (x: any) => type.type(x, Date);
    let str = ''
    for (const key in type) {
      if (key !== 'type') {
        if (type[key](obj)) {
          str = key
        }
      }
    }
    return str
  }
}

export default Untie
