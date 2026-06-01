 ## 数据类型
* 原始数据类型
    1. Undefined：无定义
    2. Null：空值
    3. Boolean：用于逻辑判断
    4. Number：表示双精度64位二进制格式浮点数，可以表示整数和浮点数。
    5. String：表示字符序列
    6. Symbol：唯一且不可变的值，用于对象属性的唯一标识，避免属性名冲突
    7. BigInt：允许操作超过Number能表示的范围的整数
* 引用数据类型
    * Object（普通对象、数组、函数等）


## 0.1 + 0.2
* JS中数字是以二进制浮点数表示，会导致某些十进制小数在二进制下无法精确表示（在二进制中无限循环）
* 如何对比
    1. 设置误差范围，表示可接受的最小误差范围，“机器精度”`Number.EPSILON`
        ```js
        function numbersAreEqual(num1, num2) {
            return Math.abs(num1 - num2) < Number.EPSILON;
        }
        console.log(numbersAreEqual(0.1 + 0.2, 0.3)); // 输出: true
        ```
    2. toFixed()四舍五入到指定的小数位转为字符串，再Number转数字存储
        ```js
        let sum = 0.1 + 0.2;
        let roundedSum = Number(sum.toFixed(1)); // 注意: toFixed 返回字符串，所以需要转换为数字
        console.log(roundedSum === 0.3); // 输出: true
        ```
    3. Number.toPrecision(n) ,n在1~21之间，可保留小数点前+小数点后，n未超过number本身位数会科学计数法表示
        ```js
        let sum = 0.1 + 0.2;
        let preciseSum = Number(sum.toPrecision(12)); // 12 是常用的精度位数
        console.log(preciseSum === 0.3); // 输出: true
        ```


## typeof 与 instanceof
1. `typeof`
    * 用于检测基本数据类型
    * 检测变量的类型，对于复杂的数据类型只返回“Object”

2. `instanceof`
    * 只能用于引用类型
    * 检测某个对象是否是另一个对象（构造函数）的实例
    
        【检测某个对象是否继承自某个构造函数的原型链】

## 安全获取undefined值
* viod对其后的表达式求值，void总是返回undefined，`void 0`

## NaN
1. `typeof NaN`返回`number`
2. `isNaN()`会做类型转换，`Number.isNaN()`直接检测传入值是否为`NaN`不做类型转换

## ==转换

1. `null`和`undefined`：仅相等于自身和对方
2. `Boolean`类型：转布尔值为数字进行比较
3. 字符串和数字：转字符串为数字
4. 对象和原始类型：调用对象的toPrimitive方法（valueOf或toString）将对象转为原始类型
5. 符号和其他类型：Symobl类型只能与Symbol类型进行比较，与其他类型比较都是false

## 包装类型
* JS中，原始值没有对象或属性，但为了能使用方法和属性，JS提供了包装类型，<font color='red'>使得原始值可以像对象一样被操作</font>
* 访问一个原始值的属性或方法时，JS会在后台自动创建一个对应的包装对象，在该对象上调用方法或访问属性，操作完成后临时对象销毁
    ```js
    let str = "hello";
    console.log(str.toUpperCase()); // "HELLO"

    let num = 42;
    console.log(num.toFixed(2)); // "42.00"

    let bool = true;
    console.log(bool.toString()); // "true"
    ```


## BigInt
1. 专门用于整数运算，确保精度一致性，不会丢失精度
2. 新的原始数据类型，与现有的Number类型区别明确
3. 使用，整数后加上n，或者使用BigInt构造函数
    ```js
    const bigInt1 = 1234567890123456789012345678901234567890n;
    const bigInt2 = BigInt("1234567890123456789012345678901234567890");

    console.log(bigInt1); // 1234567890123456789012345678901234567890n
    console.log(bigInt1 + 1n); // 1234567890123456789012345678901234567891n
    ```
4. BigInt与Number类型不能混用
    ```js
    const num = 42;
    const bigInt = 12345678901234567890n;

    console.log(num + bigInt); // TypeError: Cannot mix BigInt and other types
    ```

## Map与Object
1. 意外的键
* Map默认不包含任何键
* Object原型链上存在键名
2. 键的类型
* Map键可以为任意值，包括函数、对象或任意基本类型
* Object键只能是字符串或Symbols，对象类型的属性名会被自动转换为字符串类型
3. 键的顺序
* Map的key是有序的。当迭代时，Map对象以插入的顺序返回键值
* Object的属性没有固定顺序
4. Size
* Map键值对个数可以轻易通过size属性获取。大小和性能比对象更加可预测，<font color="red">Map是专为存储键值对而设计的数据结构</font>
* Object的属性数量没有明确限制
5. 迭代
* Map可以直接被迭代
* Object需通过keys、values、entries等方法来遍历对象
6. 性能
* Map在频繁增删键值对的场景下表现更好
* Object对频繁增删键值对未优化


## 函数的arguments参数
* arguments是类数组而不是数组
    1. 历史原因：早期引入，JS还没有真正的数组对象，被设计成类数组对象
    2. 性能考虑：实现为真正的数组可能会带来一些性能开销，类数组对象可以更高效实现某些操作
