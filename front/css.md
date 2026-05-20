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