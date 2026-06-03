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

## escape、encodeURI、encodeURIComponent
1. escape已废弃，用于字符串编码
2. encodeURI编码整个URL，除了一些在URL中有特定含义的字符`/?=&+#`
3. encodeURIComponent编码URL整个参数


## 判断一个对象是否属于某个类
1. instanceof 运算符
    * 用于检测构造函数的`prototype`属性，是否出现在某个实例对象的原型链上
2. constructor 属性
    * 每个对象都有一个`construsctor`属性，指向创建该对象的构造函数
3. Object.prototype.isPrototypeOf() 方法
    * 测试一个对象是否出存在于另一个对象的原型链上
4. Object.getPrototypeOf() 方法
    * 返回指定对象的原型

## AJAX
* 异步通信，局部更新数据，不用刷新整个网页
* 创建AJAX请求
    * 创建XMLHttpRequest对象
    * 对象上使用open方法创建一个HTTP请求
    * 为对象添加一些信息和监听函数（setRequestHeader方法添加头信息，onreadystatechange事件监听对象的5个状态值变化，4代表服务器返回的数据接收完成）
    * 调用sent方法来向服务器发起请求
    ```js
    function makeAjaxRequest(url, method, data, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(new Error('请求失败: ' + xhr.status));
        }
        }
    };
    
    xhr.open(method, url, true);
    
    if (method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    }

    // 使用示例
    makeAjaxRequest('https://api.example.com/data', 'GET', null, function(error, response) {
    if (error) {
        console.error('出错了:', error);
    } else {
        console.log('收到响应:', response);
    }
    });
    ```
## Fetch
* 基于Promise，支持async/await
* 语法简洁直观
* 原生支持，不需要额外的库
* 不会自动拒绝HTTP错误状态
    ```js
    fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    ```

## Axios
* 基于Promise的HTTP客户端，API更简洁
    ```js
    axios.get('https://api.example.com/data')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    ```
    * 支持浏览器和Node.js
    * 自动转换JSON数据
    * 可以拦截请求和响应`request.interceptors.response.use()`
    * 可以取消请求`CancelToken`、`AbortController`
        * `CancelToken`：创建一个取消令牌（cancel token）附加到请求中，调用 cancel() 方法取消
            ```js
            // 创建取消令牌源
            const CancelToken = axios.CancelToken
            const source = CancelToken.source()

            // 将 CancelToken 附加到请求
            axios.get('https://api.example.com/data ', { cancelToken: source.token })
              .then(response => {
                  console.log(response.data);
              })
              .catch(error => {
                  if (axios.isCancel(error)) {
                      console.log('请求被取消:', error.message);
                  } else {
                      console.error('其他错误:', error);
                  }
              });

            // 取消请求
            cancelToken.cancel('操作已取消');
            ```
        * `AbortController`：基于 Fetch API 的 AbortController 实现，通过传递 AbortController 实例的 signal 属性来取消请求。
            ```js
            // 创建 AbortController 实例
            const controller = new AbortController();
            const signal = controller.signal;

            // 将信号传递给 Axios 请求
            axios.get('https://api.example.com/data ', { signal })
              .then(response => {
                  console.log(response.data);
              })
              .catch(error => {
                  if (error.name  === 'AbortError') {
                      console.log('请求被取消:', error.message);
                  } else {
                      console.error('其他错误:', error);
                  }
              });

            // 取消请求
            controller.abort('操作已取消');
            ```
    * 客户端支持防御XSRF

## mouseover/mouseenter
* mouseover 鼠标指针进入元素或子元素时会触发（冒泡）
* mouserenter 只在鼠标指针进入元素时触发

## substring/substr
1. `substring(startIndex,endIndex)`方法：
* startIndex：开始提取字符的位置
* endIndex：结束提取字符的位置（不包含该位置）
2. `substr(startIndex, length)`方法：
* startIndex：开始提取字符的位置
* length：要提取的字符数
    ```js
    let str = "Hello, World!";

    console.log(str.substring(0, 5)); // 输出: "Hello"
    console.log(str.substr(0, 5));    // 输出: "Hello"

    console.log(str.substring(7, 12)); // 输出: "World"
    console.log(str.substr(7, 5));     // 输出: "World"
    ```
3. 负值参数的处理
* substring 方法将负值参数都转换为0
* substr 方法允许第一个参数为负，会从字符串末尾开始计数
    ```js
    let str = "Hello, World!";

    console.log(str.substring(-3)); // 输出: "Hello, World!"
    console.log(str.substr(-3));    // 输出: "ld!"
    ```
4. 参数顺序
* substring 方法会自动调整参数顺序，让startIndex始终小于等于endIndex。substr不会
```js
let str = "Hello, World!";

console.log(str.substring(5, 2)); // 输出: "llo"
console.log(str.substr(5, 2));    // 输出: ", "
```

<font color='red'>substring在现代浏览器中得到了很好的支持，而substr方法虽然仍被广泛使用，但已被MDN标记为废弃。未来substring兼容会更好</font>

## map和forEach函数中能否通过break语法结束循环
* map和forEach方法中是<font color='red'>不能直接使用break或continue语句</font>来结束循环。因为map和forEach是**高阶函数**，设计初衷就是要遍历整个数组

## 合并对象
* Object.assign()或者拓展运算符... 来浅合并js对象。loadsh库

## 事件机制
* JS 的事件传播分为<font color='red'>捕获、目标和冒泡</font>三个阶段。事件默认是从外层向目标元素传播（捕获阶段），然后从目标向外传播（冒泡阶段）。我们通常监听冒泡阶段来做事件处理，也可以通过 addEventListener 的第三个参数控制监听阶段，并用 stopPropagation() 来阻止继续传播。

## splice与slice
* splice(startIndex, length)会改变原数组，可以用来添加或删除元素，返回被删除元素
* slice(startIndex, endIndex)不会改变原数组，而是返回一个新的数组，**包含原数组的一部分浅拷贝**

## 判断网页元素是否达到可视区域
1. Intersection Observer API
    
    ***性能好，不会阻塞主线程，使用相对简单***
    ```js
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            console.log('元素进入可视区域');
            // 在这里执行你的逻辑
            }
        });
    });

    const target = document.querySelector('#your-element');
    observer.observe(target);
    ```

2. getBoundingClientRect() 

    ***更精确控制，兼容旧版浏览器，滚动事件中频繁调用影响性能***
    ```js
    function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // 使用
    const element = document.querySelector('#your-element');
    if (isElementInViewport(element)) {
    console.log('元素在可视区域内');
    }
    ```

3. Element.checkVisibility()
    
    ***新API，直接检查元素是否可见***
    ```js
    const element = document.querySelector('#your-element');
    if (element.checkVisibility()) {
        console.log('元素可见');
    }
    // 接受一个选项对象，精细控制
    element.checkVisibility({
        checkOpacity: true,  // 检查 opacity 是否为 0
        checkVisibilityCSS: true  // 检查 visibility CSS 属性
    });
    ```

## for..in / for...of
1. for...in 更适合遍历对象的可枚举属性。会遍历对象的原型链(使用`Object.hasOwnProperty`检查)。
    ```js
    /* 遍历数组会读取到意外值*/
    const arr = [1, 2, 3];
    arr.foo = 'bar';

    for (const index in arr) {
        console.log(index); // 输出: "0", "1", "2", "foo"
    }
    ```
2. for...of 更适合遍历可迭代对象。性能更好，保证顺序。
    ```js
    /* 同时获取数组的索引和值，配合Array.entries
        遍历对象也能通过Object.entries()、Object.keys()、Object.values() + for...of实现 */
    const arr = ['a', 'b', 'c'];
    for (const [index, value] of arr.entries()) {
        console.log(index, value); // 输出: 0 "a", 1 "b", 2 "c"
    }
    ```

## Object.entres()

***静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的键值对***
```js
const obj = { foo: "bar", baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// 类数组对象
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// 具有随机键排序的类数组对象
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo 是一个不可枚举的属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = "bar";
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]
```