## Proxy
**创建虚拟化对象，通过自定义基本操作（如属性查找、赋值、枚举、函数调用等）的行为来实现高级功能**

1. 拦截和定义对象的基本操作，如属性访问、赋值、删除、函数调用
2. 实现自定义的行为，如数据验证、属性保护、自动填充默认值
    ```js
    /* 数据验证*/
    const handler = {
        set(target, property, value) {
            if (property === 'age') {
                if (!Number.isInteger(value) || value < 0) {
                    throw new TypeError('The age must be a non-negative integer');
                }
            }
            target[property] = value;
            return true;
        }
    };

    const person = new Proxy({}, handler);
    person.age = 25; // 正常
    person.age = -5; // 会抛出异常
    // ==========================================================
    /* 属性保护*/
    const handler = {
        set(target, property, value) {
            if (property === 'id') {
                throw new Error('Cannot modify read-only property "id"');
            }
            target[property] = value;
            return true;
        },
        deleteProperty(target, property) {
            if (property === 'id') {
                throw new Error('Cannot delete read-only property "id"');
            }
            delete target[property];
            return true;
        }
    };

    const user = new Proxy({ id: 12345 }, handler);
    user.id = 67890; // 会抛出异常
    delete user.id; // 会抛出异常
    ```
3. 实现观察者模式，轻松实现对象的监听和变化追踪
4. 创建虚拟属性和方法，使代码更加灵活和动态
    ```js
    const handler = {
        get(target, property) {
            if (property === 'greet') {
                return function(name) {
                    return `Hello, ${name}!`;
                };
            }
            return target[property];
        }
    };

    const person = new Proxy({}, handler);
    console.log(person.greet("Alice")); // 输出：Hello, Alice!
    ```
5. 代理外部接口，将API调用封装为本地对象的属性访问操作

## rest参数
***ES6新增语法，表示不确定数量的参数。***
* 在函数定义中使用rest参数，将传入的多个参数包装成一个数组
    ```js
    /* numbers就是一个rest参数，将所有传入的参数收集到一个数组中*/
    function sum(...numbers) {
        return numbers.reduce((acc, curr) => acc + curr, 0);
    }

    console.log(sum(1, 2, 3, 4)); // 输出: 10
    ```
* **函数重载**：定义多个同名不同参数的函数来实现函数重载
    ```js
    function multiply(multiplier, ...nums) {
        return nums.map(num => num * multiplier);
    }

    console.log(multiply(2, 1, 2, 3)); // 输出: [2, 4, 6]
    ```
* **参数结构**：将对象或数组进行结构，并将剩余部分用rest参数来接收
    ```js
    const fullName = {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        country: 'USA'
    };

    const { firstName, lastName, ...rest } = fullName;
    console.log(firstName); // 输出: John
    console.log(lastName);  // 输出: Doe
    console.log(rest);      // 输出: { age: 25, country: 'USA' }
    ```
* **与箭头函数结合**：rest参数与箭头函数结合使用，可以使代码更简洁
    ```js
    const concatenateStrings = (...strings) => strings.join(' ');
    console.log(concatenateStrings('Hello', 'world!')); // 输出: Hello world!
    ```
* **组合运算**：在处理函数的组合运算时，rest参数可以帮助我们轻松处理不确定数量的输入参数
    ```js
    const add = (...nums) => nums.reduce((acc, curr) => acc + curr, 0);
    const multiply = (...nums) => nums.reduce((acc, curr) => acc * curr, 1);

    function compose(...fns) {
        return (...initialArgs) => {
            return fns.reduceRight((acc, fn) => [fn(...acc)], initialArgs)[0];
        };
    }

    const addAndMultiply = compose(multiply, add);

    console.log(addAndMultiply(1, 2, 3, 4)); // 输出: 120 ((1+2+3+4) * 1 * 2 * 3 * 4)
    ```