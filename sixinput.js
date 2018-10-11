function Sixinput (ele, option, callback) {
  this.ele = $(ele).css("display", "inline-block");
  this.ele.prop("value", "")
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
    backgroundColor: "#fff", // input背景色
    type: "password" //类型
  }
  Object.assign(this.options, option)
  this.init();
}

Sixinput.prototype = {
  init: function () {
    var This = this;
    for (var i = 1;i <= this.options.count; i++){
      $("<input class='inputItem"+ i +"' type='text'>").val("").css({"textAlign": this.options.align, "color": this.options.color, "width": this.options.width + "px", "height": this.options.height + "px","lineHeight": this.options.height + "px", "margin": this.options.margin + "px", "fontSize": this.options.fontSize + "px", "backgroundColor": this.options.backgroundColor}).appendTo(this.ele)
    }
    $(This.ele).children("input").each(function (index, item) {
      item.onkeydown = function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
          if ($(this).val() == "") {
            $(this).prev().val("");
            $(this).prev().trigger("focus", true);
          } else {
            $(this).val("")
          }
          This.finalVal()
        }
      }
      item.oninput = function (e) {
        if ($(this).val() != "") {
          if (!this.value.match(/\d/)) {
            this.value = "";
            return;
          }
          if (this.value.length > 1) {
            this.value = this.value.replace(e.data, "");
          } else {
            $(this).data("value", e.data)
          }
          if (This.options.type == "password") {
            this.value = "●";
          } else if (This.options.type == "text") {}
  
          if ($(this).next().length >= 1) {
            $(this).next().get(0).focus()
          }
        }
        This.finalVal()
      }
      item.onfocus = function (e, isEnd) {
        if (isEnd) return;
        var emptyindex = null;
        for (var i = 0; i < $(This.ele).children("input").length; i++) {
          if ($(This.ele).children("input").eq(i).val() == "") {
            emptyindex = i;
            break;
          }
        }
        if (emptyindex == null) {
          $(This.ele).children("input").last().trigger("focus", true);
        } else {
          $(This.ele).children("input").eq(emptyindex).trigger("focus", true);
        }
      }
    })
  },
  finalVal: function () {
    var This = this
    var ok = true
    $(this.ele).children("input").each(function (index, item) {
      if (item.value == "") {
        $(This.ele).prop("value", "")
        ok = false;
      }
    })
    if (ok) {
      var value = "";
      $(this.ele).children("input").each(function (index, item) {
        value += $(item).data("value");
      })
      $(this.ele).prop("value", value)
      if (this.callback) {
        this.callback(value)
      }
    }
  },
  clear: function () {
      $(this.ele).children("input").each(function (index, item) {
        $(item).val("")
      })
      $(this.ele).prop("value", "")
  },
  onlyread: function (color) {
      $(this.ele).children("input").each(function (index, item) {
          $(item).attr("disabled", true);
          $(item).css("backgroundColor", color ? color :"#eee");
      })
  },
  writeable: function () {
    var This = this;
      $(this.ele).children("input").each(function (index, item) {
          $(item).removeAttr("disabled");
          $(item).css("backgroundColor", This.options.backgroundColor);
      })
  },
  autofocus: function() {
      $(this.ele).children("input").eq(0).focus();
  }
}