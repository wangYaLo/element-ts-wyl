const isOfType = (() => {
  const type = Object.create(null);//创建没有原型的对象
  //  检查null类型
  type.null = (x: null) => x === null;
  //  检查undefined类型
  type.undefined = (x: undefined) => x === undefined;
  //  检查是否为undefined和null类型
  type.nil = (x: any) => type.null(x) || type.undefined(x);
  //检查字符串和字符串的文字类型。例如：'s', "s", `str`, new String()
  type.string = (x: any) => !type.nil(x) && (typeof x === 'string' || x instanceof String);
  // 检查数字或者数字文字类型。例如：12, 30.5, new Number()不包括NaN 和 Infinity
  type.number = (x: number) => !type.nil(x) &&
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

  return type;
})();

export default isOfType
