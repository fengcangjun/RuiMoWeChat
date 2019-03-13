//活动动态
var ctcount = 2;

function tabdianji(cti) {
	for(i = 1; i <= ctcount; i++) {
		ct = document.getElementById("tab" + i);
		cc = document.getElementById("con" + i);
		if(i == cti) {
			ct.className = "active";
			cc.className = "activecon";
		} else {
			ct.className = "";
			cc.className = "hiddencon";
		}
	}
}

//解决方案
$(function() {
	 $('.About-header-t').toggle(function () {
        $('.About-ul').slideDown();
    },function () {
        $('.About-ul').slideUp();
    });
	jQuery.fn.extend({
		
//		解决方案显示/隐藏
		clickToggle: function() {
			$(this).toggle(function() {
				$(this).find('.solution-t-text').slideDown();
				$(this).find(".show-img").attr("src", "images/hide.gif");
				$(this).find(".solution-con").css("background", "#D7ECFB");
			}, function() {
				$(this).find(".solution-t-text").slideUp();
				$(this).find(".show-img").attr("src", "images/show.gif");
				$(this).find(".solution-con").css("background", "white");
			});
		},
		cbChina: function() {
			var str = /^[\u4e00-\u9fa5]{2,20}$/;
			var msg = "请输入至少两个中文字符！";
			blurTest(str, this, msg);
			return this;
		},
		cbPhone: function() {
			var str = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			var msg = "请正确填写手机号码！";
			blurTest(str, this, msg);
			return this;
		},
		cbchar: function() {
			var str = /^.{10,}$/;
			var msg = "请输入至少10个字符！";
			blurTest(str, this, msg);
			return this;
		}
	});

	function blurTest(str, baseThis, msg) {
		baseThis.each(function() {
			$(this).blur(function() {
				var _thisValue = $(this).val();
				var _thisNum = _thisValue.length - 1;
				if(_thisValue != "" || _thisNum != '-1') {
					if(!(str.test(_thisValue))) {
						$(this).val(msg);
						$(this).attr("placeholder", msg);
						$(this).css("border", "1px solid red");
						return false;
					} else if(str) {
						return true;
					}
				}
			});
			$(this).focus(function() {
				$(this).css("border", "1px solid #B4B4B4");
				$("#showMsg").delay(500).hide(0);
			});
		});
	}
//	解决方案显示/隐藏调用
	var li = $("#solution-ul li").length;
	for(var i = 1; i <= li; i++) {
		$("#li" + i).clickToggle();
	}
//	输入框失去焦点调用
	$("#name").cbChina();
	$("#tel").cbPhone();
	$("#textarea").cbchar();
//提交按钮验证
	$("#but").click(function() {

		var txt = /^.{10,}$/;
		var name = /^[\u4e00-\u9fa5]{2,20}$/;
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		//		removeAllSpace();
		if(phone.test($("#tel").val()) && txt.test($("#textarea").val()) && name.test($("#name").val())) {
			var tel = $('#tel').val();
			var name = $('#name').val();
			var txt = $('#textarea').val();

			$.ajax({
				type: "post",
				url: "",
				traditional: true,
				dataType: "json",
				data: {
					"name": name,
					'tel': tel,
					'txt': txt,
				},
				success: function(data) {
					alert("提交成功");
				},
				error: function(request) {
					alert(name + '\n' + tel + '\n' + txt);
					alert("提交失败");
					return false;
				}

			});
			return true;
		} else {
			if($('#tel').val() == "") {
				$('#tel').css("border", "1px solid red");
				$('#tel').attr("placeholder", "请正确填写手机号码！");
			}
			if($("#name").val() == "") {
				$('#name').css("border", "1px solid red");
				$('#name').attr("placeholder", "不能为空 并且至少输入2个中文字符！");
			}
			if($("#textarea").val() == "") {
				$('#textarea').css("border", "1px solid red");
				$('#textarea').attr("placeholder", "不能为空 并且至少输入10个字符！");
			}
			//			alert("验证未通过");
			return false;
		}
	});
	$(".footer").html("山东睿谟传媒科技有限公司 " + "&ensp;" + "&copy;" + "版权所有" + "<br/>" + " 联系电话：0531-69959397");
});