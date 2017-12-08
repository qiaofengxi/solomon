> Solomon 现已支持 AMP.
> 你可以访问[本篇文章的 AMP 版本](https://blog.poi.cat/amp/solomon-now-supports-amp.html)体验 :)

AMP 是什么?
---

**AMP (Accelerated Mobile Pages)**
是 Google 推出的一门能加快移动端页面呈现速度的技术.

经测试, 能提高 **15% ~ 85%** 的页面加载性能:
[Accelerated Mobile Pages – A new approach to web performance](https://www.ampproject.org/how-it-works/)

此外, 大家还看一下 AMP 官方的介绍视频:

[Intro to AMP (Accelerated Mobile Pages)](https://www.youtube.com/watch?v=lBTCB7yLs8Y&t=131s)

> 里面小哥的演技好逼真 :)

AMP 结构简述
---

AMP 主要由 **AMP HTML**,
**AMP Runtime** 和 **AMP Component** 组成:

**AMP HTML** 是 HTML 的一个 **子集**.

一个规范的 AMP HTML 有以下的几个 **必要条件**:

1. 以 `<!doctype html>` 开头

2. 顶层标签为 `<html ⚡>` 或 `<html amp>`

3. 必须包括 `<head>` 和 `<body>` 标签, 他们在 HTML 中是可选的

4. `<meta charset="utf-8">` 放在 `<head>` 的开头

5. `<script async src="https://cdn.ampproject.org/v0.js"></script>` 做为第二个元素

6. `<link rel="canonical" href="$SOME_URL" />` 这个 metadata 指向和这个页面相同内容的非 AMP 版本的页面

7. `<head>` 中必须包含 `<meta name="viewport" content="width=device-width,minimum-scale=1">`

8. `<head>` 中必须包含 `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

除了以上的要求之外, AMP HTML 还有其他的限制:

多数的 HTML 标签在 AMP HTML 中都可以使用,
除了少数的标签,
例如 `<img>`, `<video>`, `<audio>` 等则必须以
`<amp-img>`,`<amp-anim>`,`<amp-video>`,`<amp-audio>` 替代,
而且他们都是需要闭合的.

> 关于为什么不能使用上述标签, 可以参阅 AMP 官方文档:
>
> [Include Images & Video – Accelerated Mobile Pages Project](https://www.ampproject.org/docs/guides/author-develop/amp_replacements)

AMP HTML 不能引用 **除 AMP Runtime 和 AMP Components 之外的 JS 库**.

AMP HTML 不能引用 CSS 文件, 只能使用内联样式,
内联样式必须写成 `<style amp-custom>` 而不是 `<style>`,
而且在一个页面中 **只能出现一次** 内联样式.

> AMP HTML 的规范很多, 记不住没关系,
> 可以通过在 URL 最后加 `#development=1`,
> 进入开发模式,
> 控制台里输出不符合 AMP HTML 的地方;
> 或者使用
> [The AMP Validator](https://validator.ampproject.org)

上面提到的 AMP HTML 的必要条件的第 5 条中,
引用的 https://cdn.ampproject.org/v0.js 就是 **AMP Runtime**,
负责协调资源的加载.

**AMP Component** 其实是 **自定义元素(Custom Elements)**;

除了上述的 `<amp-img>`, `<amp-audio>` 之外,
AMP Project 还提供了其他的 Components, 例如:
`<amp-analytics>`, `<amp-app-banner>`, `<amp-experiment>`

你可以在 https://ampbyexample.com/#components 找到他们.

简单来说, AMP 其实并不算是什么 "黑科技".
它能提高移动端页面的加载速度的主要原因,
是给页面增加了许多的限制:
不能使用其他的 JS 库,
必须使用内联样式,
所有的资源使用 AMP Runtime 加载等等.
当然, 结果也是非常可观的:
能过提高 **15% ~ 85%** 的性能.

> AMP HTML 通过限制 HTML 的能力, 获得了提高页面加载速度的能力;
>
> 和 PyPy 里的 rPython 通过限制 Python 动态语言的能力,
> 使得 rPython 可以进行静态的推导的能力, 颇有异曲同工之妙.

Why Pelican?
---

上面提到了, AMP 不允许使用除了
AMP Runtime 和 AMP Components 的 JS 库,
所以 Angular, React 等前端框架就 **用不上了**.
所以要实现 Solomon AMP,
就必须用 **静态博客生成器**.

静态博客生成器有很多的选择,
例如: [Hugo](https://gohugo.io/),
[Hexo](https://hexo.io), [Pelican](https://blog.getpelican.com/),
[Jekyll](https://jekyllrb.com/) 等.

我选择的是 **Pelican**.
理由很简单, AMP HTML 相比普通的 HTML 有大的区别,
这意味着我必须修改生成器的代码或者写一个插件,
使其可以渲染出合法的 AMP HTML.

而 Hugo 是用 **Golang** 写的,
Jekyll 是用 **Ruby** 写的,
我都没有学习过, 因而放弃了他们.

至于用 JavaScript 写的 Hexo,
确实曾是我的最爱,
但我也仅限于写过它的主题而已,
没有写过 Hexo 的插件;
而我经常听见有人抱怨 Hexo 的 API 经常改,
写的插件很容易不兼容, 所以我也就放弃了.

自定义 Reader 插件
---

决定了使用 **Pelican** 之后,
第一步当然是添加一个新的 **Reader 插件**:
1. 新建一个名为 `AMPMarkdownReader` 的类,

2. 然后添加 Markdown 的后缀名:
`['md', 'markdown', 'mkd', 'mdown']`,

3. 最后注册该 Reader 即可.

Pelican 里的 Reader 是 **一个黑箱**,
输入的是 **文件路径**,
要求输出的是 Metadata(元数据) 和渲染好的 HTML.
所以我们需要的是读取文件之后,
采用我们自己的 Markdown 和 Metadata 渲染器.

> Pelican 默认的 Metadata 的格式是
> [Markdown Extension](https://pythonhosted.org/Markdown/extensions/).
>
> 但是为了兼容我以前写的文章的 Metadata 格式(JSON 代码块),
> 所以我读取 Metadata 的方式是直接解析了 JSON 代码块.

Pelican 默认的 Markdown 渲染器不支持自定义函数,
所以我换成了 [Mistune](https://github.com/lepture/mistune),
并且重写了 `image`,
把所有的 `<img>` 标签换成了 `<amp-img></amp-img>`.

写好了自己的 Reader 之后,
记得还要去 `pelicanconf.py` 里,
设置插件的路径和需要引入的插件: `amp_markdown_reader`,
这样插件才能生效.

自定义的 Markdown Reader 写好了之后,
下一步就是一个主题了.
AMP 的页面是专注于移动端加速的,
不需要也不适合太复杂页面逻辑,
所以我就自己写了一个主题: `solomon-amp`.

写 AMP 主题的时候和写普通主题差不多,
只不过写完之后记得用
[The AMP Validator](https://validator.ampproject.org)
或者在 URL 后面加 `#development=1`
(前提是你引入了 AMP Runtime) 的方法
来确认你的 AMP HTML 是否合法.

不过我这里要特别提到的就是页面中的
`<script type="application/ld+json">`
即 **Structured Data** 的设置:
Structured Data 虽然不是 AMP HTML 中的规范,
但是对于 AMP 的页面来说,
Structured Data 是相当重要的,
因为它可以提供给搜索引擎更多的信息,
使我们的页面在搜索引擎上可以显示 **更多的信息**.

Structured Data
---

Structured Data 有两个形式:
基于 JSON 的 **JSON-LD**
和基于 HTML Meta 标签的 **Microdata**.
我推荐的是 **JSON-LD**,
因为它的可读性相比后者更好, 而且占的字节也小.

使用 Structured Data 当然也有 Structured Data 的标准,首先先从
[Introduction to Structured Data Types | Search | Google Developers](https://developers.google.com/search/docs/data-types/data-type-selector)
里选择你的网页的类型相应的 Structured Data:
目前有 **Articles**(文章), **Music**(音乐),
**Recipes**(食谱), Reviews(评论),
**TV & Movies**(电视剧 & 电影), and **Videos**(视频) 几种.

以 Articles 的 Structured Data 为例: 在
[Articles | Search | Google Developers](https://developers.google.com/search/docs/data-types/articles#type_definitions)
里点击 **See Mark Up** 之后,
就可以在新页面里面看到 Google 给的一个 json-ld 例子:

我们把它复制到我们的主题里面就行了,
当然这只是一个例子, 我们还需要根据具体的需求修改我们的 **json-ld**.
当然修改的时候根据
[Articles | Search | Google Developers](https://developers.google.com/search/docs/data-types/articles#type_definitions)
里的规定修改,
否则也是会视为无效的.
改完了之后我们可以通过
[Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
来查看我们的 json-ld 是否合法.

后语
---

最后, Solomon AMP 实现以 MIT 协议开源在
[PoiScript/Solomon-AMP](https://github.com/PoiScript/Solomon-AMP)
上. 有什么意见或建议的话,
欢迎提 Issue 或者推 Pull Request. :)