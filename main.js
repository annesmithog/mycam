/**
 * サイズ変更
 */
let currentWidth = 1000; 
let currentHeight = 500;

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const maxWidth = 1000;

    setSize(window.innerWidth);

    window.addEventListener('resize', () => {
        setSize(window.innerWidth);
    });

    function setSize(windowWidth) {
        currentWidth = windowWidth > maxWidth ? maxWidth : windowWidth;
        currentHeight = currentWidth / 2;
        video.style.width = `${currentWidth}px`;
        video.style.height = `${currentHeight}px`;
    }
});

/**
 * カメラ
 */
let stream;

async function playVideo() {
    stream = await getDeviceStream({
        video: { width: currentWidth, height: currentHeight },
        audio: false
    });
    video.srcObject = stream;
}

function stopVideo() {
    if (!stream) return;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
    video.srcObject = null;
}

async function getDeviceStream(option) {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        return await navigator.mediaDevices.getUserMedia(option);
    } else {
        return new Promise(function(resolve, reject) {
            navigator.getUserMedia(option, resolve, reject);
        });
    }
}
