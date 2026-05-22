## CSS选择器
1. 基础选择器：类型（元素）选择器、类选择器、ID选择器、通配符选择器（*）
2. 层次选择器：后代选择器`div p{}`、子选择器`ul > li{}`、相邻兄弟选择器`h1 + p{}`、通用兄弟选择器`h1 ~ p{}`
3. 属性选择器：`[attr=value]`
4. 伪类选择器：`:hover、：nth-child()`
5. 伪元素选择器：`::before、::after`

## CSS优先级、计算

* 从高到低

    *  `important`声明的样式的优先级最高
    * 内联样式（直接在HTML元素上的style属性）<font color='red'>+1000</font>
    * ID选择器 <font color='red'>+100</font>
    * 类、属性选择器和伪类选择器 <font color='red'>+10</font>
    * 元素选择器、伪元素选择器   <font color='red'>+1</font>
    * 通配符选择器 、后代选择器、子选择器等 **组合选择器** <font color='red'>+0</font>

## CSS继承与不可继承

1. 可继承元素
    * color
    * font-family
    * font-size
    * font-style
    * line-height
    * letter-spacing 字符间距
    * word-spacing 对空格分隔的单词有效，中文环境下无效
    * white-space 是否保留空白字符，是否换行且如何换行

2. 不可继承元素
    
    * background
    * border
    * display
    * height
    * padding
    * margin
    * width
    * position
    * top,left,bottom,right
    * z-index
    * clear

## disply布局
1. flex布局
    * `disply:flex;` 容器弹性布局
    * `flex-direction: row;` 设置主轴方向，行或列
    * `justify-content:center;` 设置主轴方向上的对齐方式
    * `align-items: center;` 设置交叉轴方向上的对齐方式
    * `.box:`子项的样式，设置宽高和背景颜色等 `align-self:flex-start;`

2. grid布局
    * `display:grid;`网格布局
    * `grid-template-columns:repeat(3,1fr);` 定义3列，宽度相等
    * `grid-gap:10px;` 设置网格项之间的间隙
    * `.box:` 子项样式

## 隐藏元素
1. `display:none;` 不占空间
2. `visibility: hidden;` 占空间
3. `opacity: 0;` 占空间且能交互
4. `position: absolute; left: -9999px;`
5. `height:0; overflow: hidden;` 
6. `clip: rect(0,0,0,0);`裁剪为不可见区域 （top,right,bottom,left）
7. `transform: scale(0);`缩小到不可见

* `display: none; 与 visibility: hidden;`对初始渲染性能友好，动态操作会有影响。其他操作由于元素参与渲染与布局，对性能有一定影响
* **回流**：重新排版与布局
    
    **重绘** ：显示属性改变不影响元素位置和尺寸

## link与@import引用css

1. link
        
    * 在HTML文档`<head>`部分使用（高性能）
    * 页面加载立即加载样式
    * 加载并行进行，速度较快
    * 可以通过JS操作和控制

2. @import

    * 在CSS文件、`<style>`标签内使用（模块化）
    * 加载完包含他的CSS文件后加载
    * 加载顺序依赖，速度较慢
    * 不易通过JS操作

## transition与animation
1. transition
    * 定义元素属性变化时的过渡效果，只能在两个状态之间转换，且需要一个触发条件

2. animation
    * 允许定义关键帧（keyframes），多个状态之间变化，不需要特定的触发事件

## translate改变位置
* 操作元素的渲染层而非布局层，不会触发浏览器重排，性能更好

* translate能借助GPU加速，传统定位方式主要依赖CPU。在渲染大量图像和动画时，GPU的效率显著优于CPU，能带来更流畅的视觉效果。

## li与li元素之间有看不见的空白间隔
* HTML标签之间的空白字符被渲染为一个空格字符。HTML中的空白符会被浏览器解释为一个正常的空白符。

    * 用flexbox布局替代传统的块级布局

## CSS3新特性

1. 盒模型：`box-sizing`更好控制元素的尺寸和边框。
2. 背景与边框：多重背景图片，边框图片`border-image`
3. 文本效果：文本阴影`text-shadow`和换行`word-wrap`
4. 变形`transform`和过渡`transition`
5. 动画`animation`: `@keyframes`创建复杂动画
6. felx和grid布局
7. 媒体查询：响应不同设备的尺寸
8. 自定义属性：可以在样式表中定义变量
9. 伪类和伪元素：更精准操作元素

## ‘替换元素’，概念及计算规则
* 指元素内容不由CSS控制，由外部资源决定，如`<img> <video> <iframe>`

## CSS Sprites(雪碧图)
* 将多个小图合成大图，通过CSS来控制需要显示的部分`background-position`
* 减少HTTP请求次数,节省带宽，提高页面加载速度
* 适用于较多小图标被频繁使用，复杂的雪碧图可能导致维护和更新成本增加

## 物理像素、逻辑像素、像素密度？移动端开发@3x，@2x？
1. 物理像素
    * 设备屏幕上实际存在的<font color='red'>**最小显示单元**</font>

2. 逻辑像素
    * 编程和设计中使用的抽象单位，与设备独立像素（DIP）对应

3. 像素密度
    * 每英寸拥有的物理像素，PPI表示

4. @3x，@2x
    * 适应不同设备的屏幕分辨率和像素密度，确保在高像素密度的设备上，图片显示依然清晰不模糊。分别是对像素密度为3倍和2倍的设备提供高分辨率的图片资源

## CSS 优化和提高性能
1. 合并和最小化CSS文件
    *  `Webpack、Gulp`打包工具，多个文件合并，最小化CSS代码，减少文件大小和请求次数。
2. 使用CSS预处理器
    * 利用`Sass、Less`预处理器，编写简介高效的代码
3. 减少使用高级选择器
    * 避免使用复杂选择器（后代、通配符），减少解析时间
4. 避免冗余样式
    * 删除未使用的CSS规则
5. 合理使用CSS Sprite
    * 雪碧图，小图标整合，减少HTTP请求
6. 使用CSS动画的调优
    * 避免复杂动画，尽量使用`transform 、 opacity`（对性能影响小）
7. CSS放置位置
    * CSS放在`<head>`标签内，页面加载尽快应用样式，确保用户体验
8. 内联样式进行关键渲染路径优化
    * 首屏重要样式，可以使用内联CSS，减少首次渲染时间

## CSS预处理器？后处理器？为什么使用？
* 预处理器Sass、Less提供变量、嵌套、混合等高级功能来编写更具<font color='red'>结构性和模块化</font>的CSS代码
* 后处理器PostCSS侧重通过插件机制<font color='red'>优化和增强CSS</font>，插件`cssnano用于压缩 `
* 用于提升编写和管理效率的工具，使CSS代码<font color='red'>更简洁、易维护</font>

## display:inline-block 显示间隙
* 本质上还是“行内”元素，任何在HTML中的空白字符都会被处理为一个空格

## 单行、多行文本溢出隐藏
* 单行
```css
    .single-line-ellipsis{
        white-space: nowrap;     /* 白空间不换行 */
        overflow: hidden;        /* 溢出部分隐藏*/
        text-overflow: ellipsis; /* 溢出部分用三个点表示 clip剪切文本*/
    }
```
* 多行
```css
    .multi-line-ellipsis{
        display: -webkit-box;         /* 弹性盒模型*/
        -webkit-box-orient: vertical; /* 垂直排列子元素*/
        -webkit-line-clamp: 2;        /* 限制最多显示两行*/
        overflow: hidden;             /* 溢出部分隐藏*/
    }
```

## CSS工程化

* 将CSS开发过程中的相关问题，从工程的角度去解决，使得CSS开发更符合工程化的标准、更高效。核心目的就是<font color='red'>提高开发效率、维护性和可拓展性</font>。
1. 模块化
    * BEM写法（__子组件、--组件不同状态），或使用Sass、LESS等预处理器来实现模块化开发。
2. 自动化工具
    * Webpack、Gulp进行资源打包、自动化构建，减少人为错误，提升工作效率。
3. 规范化
    * 指定和遵守CSS编码规范，代码风格一致。
4. 预处理器和后处理器
    * 预处理器（Sass、LESS），让CSS具备编程语言的一些特性
    * 后处理器（PostCSS），可对生成的CSS进行优化和处理
5. 组件化
    * 将样式与组件逻辑更紧密地结合，便于维护和复用
    * CSS-in-JS：将CSS写在JS里，通过JS动态生成样式。(Styled-components、Emotion库)
    * CSS Modules： 模块化方式，让每个JS文件都有独立的CSS，避免全局命名冲突。

## z-index属性失效
1. 元素定位不是`absolute、relative、fixed、sticky`
2. z-indx值为`auto`
    * 元素会<font color='red'>遵循文档流的顺序</font>和<font color='red'>兄弟元素在当前堆叠上下文的位置</font>，不允许任何自定义的堆叠顺序。
3. 元素不在同一个堆叠上下文
    * 元素拥有<font color='red'>特定CSS属性</font>时，会创建新的堆叠上下文。

        * position属性为`absolute`、`relative`、`fixed`、`sticky`且`z-index`不为`auto`
        * 父元素设置了
            * `transform`
            * `opacity`
            * `filter`：滤镜效果（颜色反转、灰度化、对比度、亮度）
            * `will-change`：性能优化提示属性，提前告知浏览器某个元素的特定属性即将变化，提前进行优化准备【创建独立的GPU合成层、预分配内存等】），按需使用不得全局用需要及时移除，结合JS动态控制
            * `perspective`：设置相机与Z=0平面的距离，为3D转换元素提供透视效果，值越小，透视效果越明显
            * `clip-path`：裁剪区域，决定元素可见部分

## transform属性
1. `translate`
2. `scale`
3. `rotate`
4. `skew`：扭曲元素
5. `matrix`：结合多个功能综合变化，接收六个参数，表示2D变换矩阵

## 水平垂直居中
1. flex布局，`justify-content`和`align-items`属性
2. grid布局，`place-items`属性(同时水平和垂直居中)
3. 绝对定位+transform:translate(-50%,-50%);

## 如何根据设计稿进行移动端适配

1. 流式布局，避免使用固定宽度，采用百分比
2. 媒体查询 
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ```
3. 视口单位：vw、vh
4. 弹性单位：rem，em
5. 图片适配：srcset
    ```html
    <picture>
        <source srcset="small.jpg" media="(max-width: 600px)">
        <source srcset="large.jpg" media="(min-width: 601px)">
        <img src="default.jpg" alt="Example Image">
    </picture>
    ```
6. JS响应式设计
    ```js
    window.addEventListener('resize', function() {
            if (window.innerWidth < 600) {
                document.body.style.backgroundColor = 'lightblue';
            } else {
                document.body.style.backgroundColor = 'white';
            }
    });    
    ```

## Flex布局
* 灵活高效的响应式布局模式

## 响应式设计概念及基本
* 一种网页设计方法，使网页能够在各种设备和窗口或屏幕尺寸上良好的显示和操作。核心目的是提供良好的用户体验。
* 通过使用**灵活的网格布局（百分比定义元素宽度）、可调整的图像和媒体查询**，根据设备特征自动调整网页布局。


## 清除浮动？方式？
* 为避免由于浮动元素<font color='red'>脱离正常文档流</font>而引发的布局问题。会影响父元素和后续兄弟元素的显示效果。
* 使用空的清除浮动元素`clear:both`
    ```css
    /* 在浮动元素之后插入一个空的拥有clear样式的div*/
    .clearfix {
        clear: both;
    }
    ```
* 使用伪元素`::after`清除浮动
    ```css
    /* 在父元素的CSS规则中添加伪元素*/
    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }
    ```
* 使用`overflow`属性清除浮动
    ```css
    /* overflow属性让父元素包裹浮动的子元素*/
    .container {
        overflow: auto;/* hidden*/
    }
    ```
* 使用`display: flow-root`清除浮动
    ```css
    /* 创建一个新的块级格式化上下文（BFC）*/
    .container {
        display: flow-root;
    }
    ```

