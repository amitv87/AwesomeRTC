// var arr = []

var rtcStats = {};

function sendJunk(){
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
  sendOverDC({hi:123123123});sendOverDC({hi:123123123});
}

var collectStats = function(){
  // sendJunk();
  pc.getStats(function(e){
    var ts = new Date();
    var statsResp = e;
    var results = statsResp.result();

    results.forEach(function(r){
      if(!rtcStats[r.type])
        rtcStats[r.type] = {}
      if(!rtcStats[r.type][r.id])
        rtcStats[r.type][r.id] = {}
      var namedItem = statsResp.namedItem(r.id);
      var names = namedItem.names();
      names.forEach(function(name){
        var value = namedItem.stat(name);
        if(value && !isNaN(value)){
          if(!rtcStats[r.type][r.id][name])
            rtcStats[r.type][r.id][name] = []
          rtcStats[r.type][r.id][name].push({
            y: Number(namedItem.stat(name)),
            x: ts
          });
          if(rtcStats[r.type][r.id][name].length > 300)
            rtcStats[r.type][r.id][name].shift();
        }
      });
    })
  });
}
setTimeout(function(){
  setInterval(collectStats,100);
  setTimeout(function(){
    // window.dp = rtcStats['googCandidatePair']['Conn-audio-1-0']['googRtt']
    // window.br = new Chart('googRtt', 'Conn-audio-1-0', 'googRtt', dp);
  },500)
}, 5000);


function Chart(name, id, unit, keyValueArray){
  var h = document.getElementById('holder');
  var target = document.createElement('div');
  h.appendChild(target);
  target.id = id + '_' + name;
  var dps = []; 
  var chart = new CanvasJS.Chart(target.id,{
    title:{
        text: name
    },
    axisX:{
        title: "timeline"
    },
    axisY: {
        title: unit
    },      
    data: [{
      type: "line",
      dataPoints: keyValueArray 
    }]
  });
  var job = setInterval(chart.render, 100);
  return {
    stop: function(){
      clearInterval(job);
    },
    clear: function(){
      this.stop();
      target.remove();
    },
    start: function(){
      this.stop();
      job = setInterval(chart.render, 100);
    },
    chart: chart
  }
}
// var dp = rtcStats['googCandidatePair']['Conn-video-1-0']['bytesReceived']
// var br = new Chart('bytesReceived', 'Conn-video-1-0', 'bytes', dp);
// var dp = rtcStats['googCandidatePair']['Conn-video-1-0']['bytesSent']
// var bs = new Chart('bytesSent', 'Conn-video-1-0', 'bytes', dp);

// dataPoints
// var chart = new CanvasJS.Chart("demo",{
//   title :{
//     text: "Live Random Data"
//   },      
//   data: [{
//     type: "line",
//     dataPoints: dps 
//   }]
// });

var xVal = 0;
var yVal = 100; 
var updateInterval = 100;
var dataLength = 10000; // number of dataPoints visible at any point



// updateChart(); 
//   setInterval(function(){updateChart()}, updateInterval);

// frame stats: length=115207 size=115200 width=320 height=240