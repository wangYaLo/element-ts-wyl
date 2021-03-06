
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
    const type = Object.create(null);//???????????????????????????
    //  ??????null??????
    type.null = (x: null) => x === null;
    //  ??????undefined??????
    type.undefined = (x: any) => x === undefined;
    //  ???????????????undefined???null??????
    type.nil = (x: any) => type.null(x) || type.undefined(x);
    //??????????????????????????????????????????????????????'s', "s", `str`, new String()
    type.string = (x: any) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
    // ????????????????????????????????????????????????12, 30.5, new Number()?????????NaN ??? Infinity
    type.number = (x: any) => !type.nil(x) &&
    (
      (!isNaN(x) && isFinite(x) &&
      typeof x === 'number'
      ) || x instanceof Number);
    // ?????????????????? ?????????true, false, new Boolean()
    type.boolean = (x: any) => !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean);
    // ??????????????????
    type.array = (x: any) => !type.nil(x) && Array.isArray(x);
    // ?????????????????? ????????? {}, new Object(), Object.create(null)
    type.object = (x: any) => ({}).toString.call(x) === '[object Object]';
    // ???????????????????????????????????????????????????????????????????????????
    type.type = (x: any, X: any) => !type.nil(x) && x instanceof X;
    // ?????????????????????Set????????????
    type.set = (x: any) => type.type(x, Set);
    // ?????????????????????Map????????????
    type.map = (x: any) => type.type(x, Map);
    // ?????????????????????Date????????????
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
