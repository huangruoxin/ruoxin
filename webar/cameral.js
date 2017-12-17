// navigator.getUserMedia   = navigator.getUserMedia ||
// navigator.webkitGetUserMedia ||
// navigator.mozGetUserMedia;

//  var promisifiedOldGUM = function(constraints) {

//     // 第一个拿到getUserMedia，如果存在
//     var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

//     // 有些浏览器只是不实现它-返回一个不被拒绝的承诺与一个错误保持一致的接口
//     if (!getUserMedia) {
//         return false;
//     }

//     // 否则，调用包在一个旧navigator.getusermedia承诺
//     return new Promise(function(resolve, reject) {
//         getUserMedia.call(navigator, constraints, resolve, reject);
//     });

// }

// if (navigator.mediaDevices === undefined) {
// 	alert(233)
//     navigator.mediaDevices = {};
// }

// if (navigator.mediaDevices.getUserMedia === undefined) {
// 	alert(4334)
//     navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
// }

// 		var constraints = {
//             audio: false,
//             video: {
//                 width: 1280,
//                 height: 720
//             }
//         };


//          navigator.mediaDevices.getUserMedia(constraints)
        
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL; 



if(!navigator.getUserMedia){
	alert('mmp ios不支持摄像头调用')
	
}else{

		var exArray = []; //存储设备源ID 
		if (navigator.getUserMedia) { 
			MediaStreamTrack.getSources(function (sourceInfos) { 
				console.log('sourceInfos',sourceInfos)
				 for (var i = 0; i != sourceInfos.length; ++i) { 
					 var sourceInfo = sourceInfos[i]; 
					 //这里会遍历audio,video，所以要加以区分 
					 if (sourceInfo.kind == 'video') { 
					 	exArray.push(sourceInfo.id); 
					 	
					 } 
				 }

				    navigator.getUserMedia({
					// video:{  width:{min: 300, ideal: 1080, max: 300},
					//  		height: {min: 300, ideal: 1080, max: 300}
					// 	}
					video:{  'optional': [{
						'sourceId': exArray[1]
					}]
						}

					}, function (stream) {
						document.getElementById('video').src = window.URL.createObjectURL(stream) || stream;
						video.play();
					}, function(){
						alert('调用失败了哦！')
					});



			})	
		} 
		
			
}


// function getMedia() { 
//  if (navigator.getUserMedia) { 
//  	navigator.getUserMedia({ 
// 		'video': { 
// 		'optional': [{ 
// 		}] 
// 	 }
//  	}, successFunc, errorFunc); 
//  }else { 
//  	alert('你的浏览器不支持摄像头调用哦'); 
//  }
// } 
// var localStream;
// function successFunc(stream) { 
//  document.getElementById('video').src = window.URL && window.URL.createObjectURL(stream) || stream;
//  localStream = stream; 
// } 
// function errorFunc(e) { 
//  alert('Error:'+e); 
// } 
// function closeMedia() { 
//  localStream.stop();
//  document.getElementById('video').src = '';
// }

//getMedia();