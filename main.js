let stream;
const video = document.getElementById('video');

async function playVideo() {
    stream = await getDeviceStream({
        video: { width: 640, height: 320 },
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
