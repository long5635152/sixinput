function Sixinput (ele, option, callback) {
  this.ele = $(ele).css("display", "inline-block");
  if (callback) {
    this.callback = callback;
  }
  this.options = {
    count: 6, // input框的个数
    width: 20, // input框宽度
    height: 20, // input框高度
    margin: 3, // input框外边距
    fontSize: 14, // input内字体大小
    align: "center", // input内对齐方式
    color: "#000", // input内字体颜色
    backgroundColor: "#fff" // input背景色
  }
  Object.assign(this.options, option)
  this.init();
}

Sixinput.prototype.init = function () {
  var This = this;
  for (var i = 1;i <= this.options.count; i++){
    $("<input class='inputItem"+ i +"' type='text'>").val("").css({"textAlign": this.options.align, "color": this.options.color, "width": this.options.width + "px", "height": this.options.height + "px","lineHeight": this.options.height + "px", "margin": this.options.margin + "px", "fontSize": this.options.fontSize + "px", "backgroundColor": this.options.backgroundColor}).appendTo(this.ele).get(0).addEventListener("input", function () {
      if (!this.value.match(/\d/)) {
        this.value = "";
      }
      if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
      }
    })
  }
  $(This.ele).children("input").each(function (index, item) {
    item.oninput = function () {
      if ($(this).val() != "") {
        if ($(this).next().get(0)) {
          $(this).next().get(0).focus()
        }
      } else {
        if ($(this).prev().get(0)) {
          $(this).prev().get(0).focus()
        }
      }
      This.finalVal()
    }
  })
}
Sixinput.prototype.finalVal = function () {
  var This = this
  var ok = true
  $(this.ele).children("input").each(function (index, item) {
    if (item.value == "") {
      $(This.ele).removeAttr("value")
      ok = false;
    }
  })
  if (ok) {
    var value = "";
    $(this.ele).children("input").each(function (index, item) {
      value += $(item).val()
    })
    $(this.ele).attr("value", value)
    if (this.callback) {
      this.callback(value)
    }
  }
}
Sixinput.prototype.clear = function () {
    $(this.ele).children("input").each(function (index, item) {
      $(item).val("")
    })
    $(this.ele).removeAttr("value")
}
Sixinput.prototype.onlyread = function (color) {
    $(this.ele).children("input").each(function (index, item) {
        $(item).attr("disabled", "disabled");
        $(item).css("backgroundColor", color);
    })
}
Sixinput.prototype.writeable = function () {
  var This = this;
    $(this.ele).children("input").each(function (index, item) {
        $(item).removeAttr("disabled");
        $(item).css("backgroundColor", This.options.backgroundColor);
    })
}