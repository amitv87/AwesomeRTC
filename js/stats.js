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

function Chart(name, id, unit, keyValueArray, renderInterval, holder, onClear){
  if(isNaN(renderInterval)) renderInterval = 500;
  var target = document.createElement('div');
  target.style.width = '350px';
  target.style.height = '200px';
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
      onClear();
    },
    start: function(){
      this.stop();
      job = setInterval(chart.render, renderInterval);
    },
    chart: chart
  }
  addCloseButton(target, actions.clear);
  return actions;
}

function addCloseButton(target, closeCB, flag){
  var close_target = document.createElement('button');
  close_target.textContent = 'X';
  close_target.style.padding = '4px';
  close_target.style.position = 'relative';
  if(!flag){
    close_target.style.float = 'left';
    close_target.style.margin = '5px';
  }
  else{
    close_target.style.margin = '0 auto';
    close_target.style.float = 'right';
  }
  close_target.style.cursor = 'pointer';
  target.appendChild(close_target);
  close_target.onclick = function(e){
    if(closeCB)
      closeCB();
  }
}

function bindStatKeys(statsCon, key, rtcStats, level, showStats){
  level += 1;
  var liEl = document.createElement('li');
  var labelEl = document.createElement('div');
  labelEl.style.cursor = 'pointer'
  labelEl.textContent = key;
  liEl.appendChild(labelEl);
  statsCon.appendChild(liEl);
  if(level < 3){
    var ulEl = document.createElement('ul');
    ulEl.style.display = 'none'
    ulEl.style['padding-left'] = '10px';
    liEl.appendChild(ulEl);
  }
  liEl.onclick = function(e){
    if(level < 3){
      ulEl.style.display = ulEl.style.display == 'none' ? 'block' : 'none';
    }
    else{
      console.log('');
      var name = this.firstElementChild.textContent;
      var id = this.parentElement.previousElementSibling.textContent;
      var type = this.parentElement.parentElement.parentElement.previousElementSibling.textContent;
      showStats(type, id, name, 'ms');
    }
    e.cancelBubble = true
    return false;
  };
  if(level < 3){
    for(var key1 in rtcStats[key])
      bindStatKeys(ulEl, key1, rtcStats[key], level, showStats);
  }
}

var RENDER_INTERVAL = 500;
function initStats(pc, cb){
  var charts = {};
  var pcmenu, chartHolder;

  if(!pc.rtcStats) {
    pc.rtcStats = {};
    collectStats(pc, pc.rtcStats, function(){
      pc.statsJob = setInterval(function(){
        collectStats(pc, pc.rtcStats);
      }, RENDER_INTERVAL);
      if(cb)
        cb();
      pcmenu = document.createElement('div');
      pcmenu.style['z-index'] = 9999;
      pcmenu.style['pointer-events'] = 'none';
      pcmenu.style.position = 'fixed';
      pcmenu.style.float = 'left';
      pcmenu.style.top = '0px';
      pcmenu.style.left = '0px';

      var header = document.createElement('div');
      header.style.height = '30px';
      header.style['text-align'] = 'center';
      header.textContent = 'RTC Stats';
      addCloseButton(header, stop, true);

      var liEl = document.createElement('li');
      liEl.appendChild(header);

      var menuList = document.createElement('ul');
      menuList.id = 'stats';
      menuList.style.position = 'fixed';
      menuList.style.padding = '15px';
      menuList.style['list-style-type'] = 'none';
      menuList.style['pointer-events'] = 'all';
      menuList.style.float = 'left';
      menuList.style['max-height'] = '100%';
      menuList.style.overflow = 'scroll';
      menuList.style['background-color'] = 'rgba(255, 255, 255, 0.83)';
      menuList.style['box-sizing'] = 'border-box';

      menuList.appendChild(liEl);
      pcmenu.appendChild(menuList);
      document.body.appendChild(pcmenu);

      chartHolder = document.createElement('div');
      chartHolder.style.position = 'fixed';
      chartHolder.style.right = '0px';
      chartHolder.style['max-height'] = '100%';
      chartHolder.style.overflow = 'scroll';
      chartHolder.style['pointer-events'] = 'all';
      pcmenu.appendChild(chartHolder);


      for(var key in pc.rtcStats)
        bindStatKeys(menuList, key, pc.rtcStats, 0, showStats)
    });
  }

  function showStats(type, id, name, unit){
    var chartid = type + id + name;
    var arr = pc.rtcStats[type][id][name];
    if(!charts[chartid] && arr && typeof(arr) == 'object'){
      charts[chartid] = new Chart(name, id, unit, arr, RENDER_INTERVAL, chartHolder, function(){
        delete charts[chartid];
      });
    }
  }

  function stop(){
    for(var id in charts){
      charts[id].clear();
    }
    if(pc.statsJob)clearInterval(pc.statsJob);
    delete pc.statsJob;
    delete pc.rtcStats;
    if(pcmenu)
      pcmenu.remove();
  }
}
initStats(BsWebrtcApi.screenPeer);
// var a = initStats(peers.default.pc);