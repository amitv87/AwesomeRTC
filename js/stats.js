var collectStats = function(pc, rtcStats, cb){
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
        if(!isNaN(value)){
          if(!rtcStats[r.type][r.id][name])
            rtcStats[r.type][r.id][name] = []
          rtcStats[r.type][r.id][name].push({
            y: Number(namedItem.stat(name)),
            x: ts
          });
          if(rtcStats[r.type][r.id][name].length > 300)
            rtcStats[r.type][r.id][name].shift();
        }
        else
          rtcStats[r.type][r.id][name] = value;

      });
    });
    if(cb)
      cb();
  });
}

function Chart(name, id, unit, keyValueArray, renderInterval, holder){
  if(isNaN(renderInterval)) renderInterval = 500;
  var target = document.createElement('div');
  target.style.width = 400;
  target.style.height = 300;
  holder.appendChild(target);

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
  var job = setInterval(chart.render, renderInterval);
  var actions = {
    stop: function(){
      clearInterval(job);
    },
    clear: function(){
      this.stop();
      target.remove();
    },
    start: function(){
      this.stop();
      job = setInterval(chart.render, renderInterval);
    },
    chart: chart
  }
  var close_target = document.createElement('button');
  close_target.style.position = 'relative';
  close_target.style.cursor = 'pointer';
  close_target.textContent = 'X';
  target.appendChild(close_target);
  close_target.onclick = function(e){
    actions.clear();
  }
  return actions;
}
