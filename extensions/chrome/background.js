// var data_sources = ['screen'],
var data_sources = ['screen', 'window'],
    desktopMediaRequestId = '';

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function (msg) {
    if(msg.type === 'AwesomeRTC_UI_REQUEST') {
      requestScreenSharing(port, msg);
    }

    if(msg.type === 'AwesomeRTC_UI_CANCEL') {
      cancelScreenSharing(msg);
    }
  });
});

function requestScreenSharing(port, msg) {
  // https://developer.chrome.com/extensions/desktopCapture
  // params:
  //  - 'data_sources' Set of sources that should be shown to the user.
  //  - 'targetTab' Tab for which the stream is created.
  //  - 'streamId' String that can be passed to getUserMedia() API
  desktopMediaRequestId = chrome.desktopCapture.chooseDesktopMedia(data_sources, port.sender.tab, function(streamId) {
    if (streamId) {
      msg.type = 'AwesomeRTC_DIALOG_SUCCESS';
      msg.streamId = streamId;
    } else {
      msg.type = 'AwesomeRTC_DIALOG_CANCEL';
    }
    port.postMessage(msg);
  });
}

function cancelScreenSharing(msg) {
  // cancelChooseDesktopMedia crashes on the Mac
  // See: http://stackoverflow.com/q/23361743/980524
  if (desktopMediaRequestId) {
     chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId);
  }
}

var manifest = chrome.runtime.getManifest();
var urls = manifest.content_scripts[0].matches;

chrome.tabs.query({ url: urls }, function(tabs)
{
    for(var i = 0; i < tabs.length; i++)
    {
        chrome.tabs.executeScript(tabs[i].id, { file: "content-script.js" }, function() {});
    }
});