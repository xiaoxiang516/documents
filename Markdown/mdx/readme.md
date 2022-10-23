
### 拓展 [MDX](https://mdxjs.com/) MarkDown + JSX

YMAL Front Matter
组件库文档工具选型
AndD组件库文档是怎么制做的，使用了什么工具。

<!-- ————————————————
版权声明：本文为CSDN博主「一颗小行星!」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/w20101310/article/details/124192282 -->


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