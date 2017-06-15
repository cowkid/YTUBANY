(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function() {
	var player;
	var turndownAt = 20
	var numTurntAnimations = 10
	var turntDown = false;
	var maxNodes = 1000;
	var animationCSS = {
		'tdfw_intro': 'tdfwIntro 1s infinite ease-in-out',
		'turntDown': function() {
			var key = ~~ ( Math.random() * numTurntAnimations)
			return 'turntDown' + key + ' 5s infinite ease-in-out'
		}
	}
	var firstAddition = true
	function embedVideo() {
		var parent = document.createElement('div')
		parent.style.position = 'fixed'
		parent.style.zIndex = 5000;
		parent.style.right = 0;
		parent.style.top = 0
		parent.style.opacity = 0.2
		var div = document.createElement('div')
		div.id = "tdfw"
		parent.appendChild(div)
		document.body.appendChild(parent)
		parent.onmouseover = function() {
			console.log('mouse')
			parent.style.opacity = 1
		}
		parent.onmouseout = function() {
			parent.style.opacity = 0.2
		}
		parent.style.webkitTransition = 'opacity 0.3s ease-in-out'
		parent.style.transition = 'opacity 0.3s ease-in-out'

		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.body.appendChild(tag)
		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		function onYouTubeIframeAPIReady() {
			player = new YT.Player('tdfw', {
				height: '200',
				width: '305',
				videoId: 'U9t-slLl30E',
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
		}
		window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
	}
	function onPlayerReady(event) {
		console.log('ready')
		event.target.playVideo();
		requestAnimationFrame(checkTime)
	}
	
	function checkTime() {
		if(turntDown) {
			return false;
		}
		requestAnimationFrame(checkTime);
		if(player.getCurrentTime() > turndownAt) {
			turntDown = true;
			removeCurStyles();
			addCurStyles()	
		}

	}
	function onPlayerStateChange(event) {
		console.log(event)
		if(event.data === 1) {
			//started
			addCurStyles()

		} else if(event.data === 2) {
			//paused
			removeCurStyles()
		}
	}
	//<iframe width="560" height="315" src="//60" height="315" src="<iframe width="560" height="315" src="https://www.youtube.com/embed/U9t-slLl30E?autoplay=1" frameborder="0" allowfullscreen></iframe>
	
	
