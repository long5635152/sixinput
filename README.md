# sixinput
一款类似手机端验证码输入的六格输入框,可以自定义输入框个数,背景色,大小,对齐方式字体大小

### 使用方式:
1.新建一个div,取任意id

2.在需要的地方var myinput = new Sixinput("#id",option,callback),"#id"为新建div的id

callback为所有小格都输入完成触发的回调函数,如果你想再输入完后自动发送一个请求验证输入内容,可以在这个回调函数里写!

回调函数有一个参数,是你输入的内容字符串

3.用jquery的attr方法获取div的"value"属性就可以得到输入的值,如果没有输入完毕,值为undefined!就像这样: $("#id").attr("value")

## 实例化参数option详解

### option.count

类型: nunber

描述:小输入框的个数

默认值:6


### option.width

类型: nunber

描述:每个小输入框的宽度

默认值:20

### option.height

类型: nunber

描述:每个小输入框的高度

默认值:20

### option.margin

描述:每个小输入框的外边距(margin)

类型: nunber

默认值:3

### option.fontSize

描述:每个小输入框的字体大小

类型: nunber

默认值:14

### option.align

描述:每个小输入框的字体对齐方式

类型: string

默认值:"center"

### option.color

描述:每个小输入框的字体颜色

类型: string

默认值:"#000"

### option.backgroundColor

描述:每个小输入框的背景色

类型: string

默认值:"#fff"

## 方法详解
### myinput.clear()

描述:清空所以输入框

### myinput.onlyread(color)

描述:所以输入框禁止输入

参数:禁用后的文本框颜色

### myinput.writeable()

描述:所以输入框恢复输入,背景颜色恢复之前配置的颜色
