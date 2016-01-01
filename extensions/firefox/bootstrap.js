/* This Source Code Form is subject to the terms of the Mozilla Public 
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';
var require = Components.utils.import("resource://gre/modules/commonjs/toolkit/require.js", {}).require;
var tabs = require("sdk/tabs");

var domains = ["amitv87.github.io"];
var addon_domains = []; // list of domains the addon added
var PREF = "media.getusermedia.screensharing.allowed_domains";

for (let tab of tabs)
  setPermission(tab, true);

tabs.on("ready", runScript);

var tab1;
function runScript(tab) {
  tab1 = tab;
  setPermission(tab, true);
}

function setPermission(tab, flag){
  var state = false;
  domains.forEach(function(domain){
    if (tab.url.indexOf(domain) != -1) {
      state = true;
    }
  });
  if(!state)
    return;
  var script = 'document.body.setAttribute("ei", ' + flag + ')';
  tab.attach({contentScript: script});
}

function startup(data, reason) {
  if (reason === APP_STARTUP) {
    return;
  }

  var prefs = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefBranch);
  var values = prefs.getCharPref(PREF).split(',');
  domains.forEach(function(domain) {
    if (values.indexOf(domain) === -1) {
      values.push(domain);
      addon_domains.push(domain);
    }
  });
  prefs.setCharPref(PREF, values.join(','));
}

function shutdown(data, reason) {
  if (reason === APP_SHUTDOWN) {
    return;
  }

  tabs.removeListener('ready', runScript)
  for (let tab of tabs)
    setPermission(tab, false)

  var prefs = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefBranch);
  var values = prefs.getCharPref(PREF).split(',');
  values = values.filter(function(value) {
    return addon_domains.indexOf(value) === -1;
  });
  prefs.setCharPref(PREF, values.join(','));
}

function install(data, reason) {}

function uninstall(data, reason) {
  tabs.removeListener('ready', runScript)
  for (let tab of tabs)
    setPermission(tab, false)
}
