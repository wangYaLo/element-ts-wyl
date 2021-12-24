var Untie = (function () {
  function Untie(obj, index) {
    var _this = this;
    // public obj: { [x: string]: any } | any[];
    this.status = 'pending';
    this.Value = '';
    this.index = 1;
    if (index) {
      this.index = index;
    }
    if (this.isOfType(obj) === 'object') {
      this.Value += '{\n';
      var _loop_1 = function (key) {
        if (this_1.isOfType(obj[key]) === 'object') {
          new Untie(obj[key], this_1.index + 1).getString(function (res) {
            for (var i = 0; i < _this.index; i++) {
              _this.Value += '  ';
            }
            _this.Value = _this.Value + key + ':' + res;
          });
        }
        else if (this_1.isOfType(obj[key]) === 'array') {
          new Untie(obj[key], this_1.index + 1).getString(function (res) {
            for (var i = 0; i < _this.index; i++) {
              _this.Value += '  ';
            }
            _this.Value = _this.Value + key + ':' + res;
          });
        }
        else if (this_1.isOfType(obj[key]) === 'string') {
          for (var i = 0; i < this_1.index; i++) {
            this_1.Value += '  ';
          }
          this_1.Value = this_1.Value + (key + ': ' + obj[key] + '\n');
        }
        else if (this_1.isOfType(obj[key]) === 'number') {
          for (var i = 0; i < this_1.index; i++) {
            this_1.Value += '  ';
          }
          this_1.Value = this_1.Value + (key + ': ' + obj[key] + '\n');
        }
        else if (this_1.isOfType(obj[key]) === 'boolean') {
          for (var i = 0; i < this_1.index; i++) {
            this_1.Value += '  ';
          }
          this_1.Value = this_1.Value + (key + ': ' + obj[key] + '\n');
        }
      };
      var this_1 = this;
      for (var key in obj) {
        _loop_1(key);
      }
      for (var i = 0; i < this.index - 1; i++) {
        this.Value += '  ';
      }
      this.Value += '}\n';
      this.status = 'success';
    }
  }
  Untie.prototype.getString = function (func) {
    if (this.status !== 'pending') {
      func(this.Value);
    }
  };
  Untie.prototype.isOfType = function (obj) {
    var type = Object.create(null); //创建没有原型的对象
    //  检查null类型
    type['null'] = function (x) { return x === null; };
    //  检查undefined类型
    type.undefined = function (x) { return x === undefined; };
    //  检查是否为undefined和null类型
    type.nil = function (x) { return type['null'](x) || type.undefined(x); };
    //检查字符串和字符串的文字类型。例如：'s', "s", `str`, new String()
    type.string = function (x) { return !type.nil(x) && (typeof x === 'string' || x instanceof String); };
    // 检查数字或者数字文字类型。例如：12, 30.5, new Number()不包括NaN 和 Infinity
    type.number = function (x) {
      return !type.nil(x) &&
        ((!isNaN(x) && isFinite(x) &&
          typeof x === 'number') || x instanceof Number);
    };
    // 布尔类型检查 例如：true, false, new Boolean()
    type.boolean = function (x) { return !type.nil(x) && (typeof x === 'boolean' || x instanceof Boolean); };
    // 检查数组类型
    type.array = function (x) { return !type.nil(x) && Array.isArray(x); };
    // 对象类型检查 例如： {}, new Object(), Object.create(null)
    type.object = function (x) { return ({}).toString.call(x) === '[object Object]'; };
    // 检查提供的类型实例，参数一为实例对象，参数二为类型
    type.type = function (x, X) { return !type.nil(x) && x instanceof X; };
    // 检查变量是否为Set类的实例
    type.set = function (x) { return type.type(x, Set); };
    // 检查变量是否为Map类的实例
    type.map = function (x) { return type.type(x, Map); };
    // 检查变量是否为Date类的实例
    type.date = function (x) { return type.type(x, Date); };
    var str = '';
    for (var key in type) {
      if (key !== 'type') {
        if (type[key](obj)) {
          str = key;
        }
      }
    }
    return str;
  };
  return Untie;
}());
