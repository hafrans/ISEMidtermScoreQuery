/**
 * Javascript
 * (c)2016 SOIL ALL RIGHTS RESERVED
 * hafrans@163.com
 */


/**
	GOOD GOOD STUDY 
	DAY  DAY  UP
	====================================
	ARE YOU OK?
	
	WELCOME TO JOIN OUR LAB
	
	E-MAIL:SOIL(AT)SCANF.CC
**/
console.info('\n\
	ARE YOU SATISFIED WITH YOUR GRADE?\n\
	\n\
	GOOD GOOD STUDY\n\
	\n\
	DAY  DAY  UP\n\
	====================================\n\
	ARE YOU OK?\n\
	\n\
	WELCOME TO JOIN OUR LAB\n\
	\n\
	E-MAIL:SOIL(AT)SCANF.CC\n\
	YrY7Y77777777777777iii7ii7777777777777777777777r7r\n\
	Y;rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr;rrr;r;rr;rr;\n\
	ir7777777777rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr\n\
	ir77rrrrrrrrrrrrrrrrr;;;;;;;rrrrrrrrrrrrrrrrrrrrr;\n\
	rrrrrrrrrrrrrrrr;;:,::;;;;;;::,:;;;rrrrrrrrrrrrrr;\n\
	rrrrrrrrrrrrr;;,.;LPb@@@@@@@@@mlr,,;;;;;r;rrrrrrr;\n\
	r;rrrr;rr;;;;,.r6@@@@@88bb@@#@@@@#F;.;;;;;;;;;;;;;\n\
	;:;;;;;;;;; :@@86Pat7r;,       .;r3Uk8;.:;;;;;;;;:\n\
	r;r;;;;;;;;;.:8@@@D6DE3l77sTrisama@#s..;;;;;;;;;;;\n\
	;:;;;;;;;:..@@b3rr;:,,.           ,st8@ .::::;;;;,\n\
	;,;;;;;;:, @@@Di;rr;::,..          ,iF@s ,:::::::,\n\
	;,;:::::, r@@@#vrtv;,:,.,.          ;E@@ .,,,,:::.\n\
	;.:::::,. U@@@6YLS7;..              :F@6 ..,,,,,,.\n\
	:.,,,,,,. 7@@@H55CUirrr;         .  ,X@s  ....... \n\
	, ,......  @@@@6E8m5r;;:;7 ;FYr:.;7;;@@.     .... \n\
	, ....     r@@#m@EFmmELi:@@@7F#Fr  l@@s           \n\
	.          rZ3tT6rr;;, :@@.E.;;  , :S :           \n\
	           ,6C5sFr:,   7@;  Z,,    ;;             \n\
	            UZ33C3ir;;t#k;  rlLY;::;              \n\
	             7ECCXFsYi;.       ,7;,:              \n\
	            rkCFFFr. ,3k@@i77 .r;: ,              \n\
	              #FFF;;#bFL7;;;;;;;,  ,              \n\
	              5UUFT vmmXtlT7r. ,. ;               \n\
	              YFFaml.rr;::.     ;r;               \n\
	            C@@8;LD8@6Cl;:;::;rl;                 \n\
	             r@7sEk8v;;.       ;r,                \n\
	        ;@@@@@@@@,.tb@@b#b@@XFt:;7.               \n\
	      F@@@@@@@@@@@;  rU#b6srrr  :@@@@@v           \n\
	  rZ@@@@@@@@@@@@@@@F     .r     r@@@@@@@@@s.      \n\
	@@@@@@8#b#8@@@@@@@@@i    :C5L,  3@#D#b88@@@@@@5   \n\
	@@@888####b@@@88@@@@@: r@@mrT@D .@#DD#####bb@@@@@v\n\
	8#bbbbb#b8#@@@8@@@@@@@  lU@kF    @@HDD####D####b@@\n\
	b#bbb88b#b#@@8b8b88b8@@   C@E   .@@#DD######DDDD#H\n\
	8##bbb888##@@@@@@8##b8@@ r@@3v   @@b##DD####D###DH\n\
	@8######8b#H#8@@@#####8@@X@@LsL ;U@########HH66DHP\n\
\n');

$("#submit").click(function(){
	//console.log($("#pform").serialize());

	if($("#name").val().length < 1){
		$("#pname").parent().attr("class","form-group has-warning");
		$("#name").prev().html("姓名       (此字段为空哦，请填写~)");
		$("#name").focus();
		return false;
	}else{
		$("#name").parent().attr("class","form-group");
		$("#name").prev().html("姓名");
	}

	if($("#stunum").val().length < 1){
		$("#stunum").parent().attr("class","form-group has-warning");
		$("#stunum").prev().html("学号       (此字段为空哦，请填写~)");
		$("#stunum").focus();
		return false;
	}else{
		$("#stunum").parent().attr("class","form-group");
		$("#stunum").prev().html("学号");
	}



		//ajax transfer

		$.ajax({
			type:"POST",
			url:"./search.php?r="+Math.random(),
			async:true,
			data:$("#pform").serialize(),
			success:showResult,
			beforeSend:function(xhr){
				$("#submit").attr("disabled",true);
				$("#submit").attr("value","查询中……");
				$("#cover").show();
			},
			error:function(xhr,err){
				$("#status").hide();
				$("#message").show();
				$("#message").html("网络成了智障");
				setTimeout(function(){
					$("#submit").attr("disabled",false);
					$("#submit").attr("value","查询");
					$("#message").hide();
					$("#status").show();
					$("#cover").hide();

				},2000);
			}
		});
});

function showResult(body){
	
	dd = body;
	if(body.status == -1 || body.status == -2 ){
		$("#status").hide();
		$("#message").show();
		$("#message").html(body.msg);
		setTimeout(function(){
			$("#submit").attr("disabled",false);
			$("#submit").attr("value","查询");
			$("#message").hide();
			$("#status").show();
			$("#cover").hide();
		},2000);
	}else{
		/**
		 * 删除等待层
		 */
			$("#submit").attr("disabled",false);
			$("#submit").attr("value","查询");
			$("#message").hide();
			$("#status").show();
			$("#cover").hide();

		/**
		 * 显示结果层
		 */
		$("#request").hide();
		
		//
		$.each(dd,function(key,value){
			$("td#"+key+',div#'+key).text(value);
		});		
		
		//
		$("#result").show();
		$("body").animate({
			paddingTop:"40px"
		},800);
		$("div#m").animate({
			width:dd.m
		},1000);
		$("div#e").animate({
			width:dd.e
		},1250);
		$("div#t").animate({
			width:dd.t
		},1400);


	}
}