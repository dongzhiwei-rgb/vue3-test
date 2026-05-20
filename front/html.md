## href、src
1. * src资源路径  

    * href超链接目标地址
2. * src解析后立即触发加载,脚本阻塞执行(defer,async)

    * href解析后标记为外部引用

## 语义化
1. 根据内容的结构和含义,用合适的html标签
2. 对机器友好,对开发者友好
3. `<header><footer><main><nav><aside>`

## DOCTYPE(文档类型)
1. 指令,告诉浏览器页面使用哪个html版本编写
2. 标准模式,按W3c标准严格执行代码

    怪异模式,浏览器不会按预期效果渲染

## defer 与 async 
1. 异步加载外部文件,不会阻塞HTML的解析
2. * defer保证脚本按出现顺序执行,解析完成后执行
    * async谁先下载完谁执行,会造成阻塞执行脚本(下载不阻塞,执行可能阻塞)
3. * async 适合独立脚本
    * defer适合需要在HTML解析完后才运行的脚本(依赖DOM的脚本)
4. 合理使用减少首屏加载时间

## mete标签
1. 描述网页文档的属性
2. charset,声明文档字符编码
3. * name描述信息类型
    * content实际数据
4. HTTP标准有固定name

    name = "viewport" 为响应式设计而设置

## H5的更新
1. 语义化更强的HTML标签
2. web存储和websocket
3. 媒体标签`<video><audio>`
4. 表单增强,新增多种类型的输入控件
    
    `type="email",type="date"`
5. 新的API

    * `拖拽 <img draggable="true" /> `
    * 地理位置访问


## img srcset属性作用
* 设置多个图像源,适配不同设备尺寸

## 行内元素, 块级元素,空(viod)元素
1. 行内元素
    
    `<span> <input> <i> <img> <a> <strong>`

2. 块级元素

    `<div> <p> <h1>=>><h6> <li> <ul>无序列表 <ol>有序列表`

3. 空元素(无结束标签)

    `<img> <br/> <hr>水平线 <input> <meta> <link>`

## H5离线存储

1. 清单文件,列出需要缓存得资源`.appcache`
2. 引用文件`<html manifest="example.appcache">`
3. 文件内容
    * CACHE:后面列出的文件首次下载会被保存
    * NETWORK:指定的资源不缓存, '*'表示默认情况其它资源都需网络连接
    * FALLBACK:备用页面路径,请求的资源无法访问,将返回这个备用页面
4. 目前趋向于`Service Workers`来实现

## title与h1标签

* `<title>定义网页标题,显示在浏览器标签页`
* `<h1>定义网页中的主要标题,显示在网页上`

## b和strong
* 都是加粗,`<strong>`有额外的语义重要性,屏幕阅读器会改变语言语调阅读

## i与em
* 都是倾斜字体,`<em>`强调文本重要性,屏幕阅读器会改变语言语调阅读

## iframe
* 优点
    1. 内容隔离,嵌入第三方页面,不影响主页面和脚本
    2. 防止嵌入内容的恶意脚本,不与主页面直接交互,减少XSS风险(对用户输入检查不足,恶意嵌入的脚本)
    3. 方便集成外部服务,无需重构页面
* 缺点
    1. 性能问题,每个页面都需要独立的http请求,增加页面加载时间,会阻塞主页面的onload事件
    2. 跨域问题,同源政策限制与不同域的`<iframe>`内容交互
    3. 布局和响应式设计,需要额外的CSS调整

## label标签

* 提升表单可阅读性和可访问性,把文本标签与相应的表单控件关联起来,用户点击标签输入焦点自动跳到相应的控件上(通过`for`关联)

```html
    <label for="username">用户名:</label>
    <input type="text" id="username" name="username">
```

## Canvas和SVG

* Canvas基于像素的即时绘制(适合实时且高性能,不具备DOM交互,无法缩放)
* SVG是基于矢量的图形绘制(适合静态和简单动态,处理复杂图像性能会下降,每个图形都是DOM节点,高分辨率)

## head标签

1. 定义文档标题`<title>`
2. 引入样式和脚本`<link rel='stylesheet'> <script>`
3. 提供文档元数据`<meta name='xxx'>字符集/描述/作者/关键词`
4. 链接网站图标`<link rel='icon'>`
* `<meta>和<title>不可少`