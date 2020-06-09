<!DOCTYPE html>
<html lang="jp">
<head>
<meta charset="UTF-8">
<title>moai tester</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">	

<script defer src="./build/bundle.js"></script>

<style>

.dolphin {
	text-align: center;
}

img {
	max-width: 100%;
	vertical-align: middle;
}

.result {
	background: #eee;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0 auto;
	padding: 15px;
	text-align: left;
	width: 300px;
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	text-align: right;
	width: 100%;
}

.footer p {
	font-size: 14px;
	padding: 5px 0;
	margin: 5px;
}

</style>

<script>

document.addEventListener('DOMContentLoaded', function() {

	var dolphin = new Dolphin('d01',{},1);
	
	window.onload = function() {
		dolphin.set360('./data/Default/');
	}

});

</script>

<noscript>
	<p>JavaScriptが有効になっていません。</p>
</noscript>

</head>

<body>

	<div class="wrap">

		<div class="dolphin">
			<div id="d01" class="d01 l-d01">
				<img src="./mv.jpg" alt="">
			</div>
		</div>

		<div class="footer">
			<p>moai-tester ver.1.10</p>
		</div>

	</div>
				

</body>

</html>
