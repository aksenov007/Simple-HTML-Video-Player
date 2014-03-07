window.onload = function() {
	var video = document.getElementById("video");
	if (typeof(video.canPlayType) != "undefined" &&
			video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') != "") {
		play_pause = function() {
			if (video.paused == true) {
				video.play();
			} else {
				video.pause();
			}
		}
		video.addEventListener("click", play_pause)
		
		playButton = document.getElementById("play-pause");
		playButton.addEventListener("click", play_pause);
		video.addEventListener("play", function() {
			playButton.value = "\u2759 \u2759";
		})
		video.addEventListener("pause", function() {
			playButton.value = "\u25B6";
		})
		
		seekBar = document.getElementById("seek-bar");
		video.addEventListener("loadedmetadata", function() {
			seekBar.max = video.duration;
		})
		seekBar.value = "0";
		seekBar.addEventListener("change", function() {
			video.currentTime = seekBar.value;
		});
		video.addEventListener("timeupdate", function() {
			seekBar.value = video.currentTime;
		});
		video.addEventListener("seeking", function() {
			video.pause();
		});
		video.addEventListener("seeked", function() {
			video.play();
		});
		
		muteButton = document.getElementById("mute");
		muteButton.addEventListener("click", function() {
			if (video.muted == false) {
				video.muted = true;
			} else {
				video.muted = false;
			}
		});
		
		volumeBar = document.getElementById("volume-bar");
		volumeBar.value = video.volume;
		volumeBar.addEventListener("change", function() {
			video.volume = volumeBar.value;
		});
		video.addEventListener("volumechange", function() {
			volumeBar.value = video.volume;
			if (video.muted == false) {
				muteButton.value = "Mute";
			}
			else {
				muteButton.value = "Unmute";
				volumeBar.value = "0";
			}
		});
	}
	else {
		document.getElementById("video-controls").style.visibility = "hidden";
	}
}