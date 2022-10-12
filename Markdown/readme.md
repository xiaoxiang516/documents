# [前端组件库文档解决方案](https://blog.csdn.net/w20101310/article/details/124192282)
潇湘：该文章值得看
前置概念
MarkDown
[MDX](https://mdxjs.com/) MarkDown + JSX
YMAL Front Matter
组件库文档工具选型
AndD组件库文档是怎么制做的，使用了什么工具。

<!-- ————————————————
版权声明：本文为CSDN博主「一颗小行星!」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/w20101310/article/details/124192282 -->
>了解Markdown产生过程
---
## Markdown 
Markdown 是由约翰·格鲁伯（John Gruber）和亚伦·斯沃茨（Aaron Swartz）发明的。
约翰·格鲁伯（John Gruber）
[亚伦·斯沃茨](http://www.aaronsw.com/)



相关文档
## [Markdown 官方语法说明](https://daringfireball.net/projects/markdown/)
## [Markdown 中文网站说明](http://markdown.p2hp.com/)
## [Markdown入门](http://markdown.p2hp.com/getting-started/)



[如何在JS中展示Markdown文件？](https://juejin.cn/post/7024033447190953997)

苹果的忠实粉丝John Gruber在自己的博客中撰写了《可怕的烈焰》(Daring Fireball)一文，如此描述： 在2013年的今天，即使是最好的移动互联网应用程序，其质量也不及原生应用程序的毫毛。

elementui的字体文件写法较之其他文件比较特殊，直接用代码写，而没用md的语法写表格


## 参考链接
[百度](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)
[Markdown 的缘起](https://markdown.jianguoyun.com/1066.html)
 


MDX：组件时代的Markdown :rocket:
是一种可创作的格式，可让您在降价文档中无缝使用JSX。 您可以导入交互式图表或通知之类的组件，并导出元数据。 这使得编写带有组件的长格式内容成为爆炸。
例
查看实际使用的MDX：
import { Chart } from ' ../components/chart '
# Here ’ s a chart
The chart is rendered inside our MDX document .
< Chart>
介绍
MDX是组件时代的降价促销。 它使您可以编写内置在markdown中的JSX。 这是一个伟大的组合，因为它可以让你用降价往往简洁的语法（如# heading为小事和JSX更先进的组件）。
:red_heart: 强大：MDX融合了markdown和JSX语法，以完美地适合基于React / JSX的项目。
:laptop: 一切都是组件：使用MDX内部的现有组件并将其他MDX文件导入为纯组件。
:wrench: 可自定义：确定为每个markdown元素（ { h1: MyHeading }