/*
 New BSD License <http://creativecommons.org/licenses/BSD/>
 Public Domain
 @author Benjamin Arthur Lupton <contact@balupton.com>
 @author James Padolsey <https://gist.github.com/527683>
 Public Domain
 @author Benjamin Arthur Lupton <contact@balupton.com>
 New BSD License <http://creativecommons.org/licenses/BSD/>
 Public Domain
 @author Benjamin Arthur Lupton <contact@balupton.com>
 @author James Padolsey <https://gist.github.com/527683>
 Public Domain
 @author Benjamin Arthur Lupton <contact@balupton.com>
*/
(function(h){h.History=h.History||{};h._History=h._History||{};var l=h.document,g=h._History,e=h.History;if(typeof e.initHtml4!=="undefined")throw Error("History.js HTML4 Support has already been loaded...");e.initHtml4=function(){if(typeof e.initHtml4==="undefined"&&typeof e.Adapter==="undefined")return false;g.getInternetExplorerMajorVersion=function(){return g.getInternetExplorerMajorVersion.cached=typeof g.getInternetExplorerMajorVersion.cached!=="undefined"?g.getInternetExplorerMajorVersion.cached:
function(){for(var c=3,b=l.createElement("div"),j=b.getElementsByTagName("i");b.innerHTML="<\!--[if gt IE "+ ++c+"]><i></i><![endif]--\>",j[0];);return c>4?c:void 0}()};g.isInternetExplorer=function(){return g.isInternetExplorer.cached=typeof g.isInternetExplorer.cached!=="undefined"?g.isInternetExplorer.cached:g.getInternetExplorerMajorVersion()!==0};e.emulated.hashChange=Boolean(!("onhashchange"in h||"onhashchange"in l)||g.isInternetExplorer()&&g.getInternetExplorerMajorVersion()<8);g.savedHashes=
[];g.isLastHash=function(c){var b=g.getHashByIndex();return c===b};g.saveHash=function(c){if(g.isLastHash(c))return false;g.savedHashes.push(c);return true};g.getHashByIndex=function(c){var b=null;return b=typeof c==="undefined"?g.savedHashes[g.savedHashes.length-1]:c<0?g.savedHashes[g.savedHashes.length+c]:g.savedHashes[c]};g.stateHashExists=function(c){return typeof g.statesByHash[c]!=="undefined"};g.discardedHashes={};g.discardedStates={};g.discardState=function(c,b,j){e.debug("History.discardState",
this,arguments);var a=e.contractState(c);g.discardedStates[a]={discardedState:c,backState:j,forwardState:b};return true};g.discardHash=function(c,b,j){e.debug("History.discardState",this,arguments);g.discardedHashes[c]={discardedHash:c,backState:j,forwardState:b};return true};g.discardedState=function(c){c=e.contractState(c);return g.discardedStates[c]||false};g.discardedHash=function(c){return g.discardedHashes[c]||false};g.recycleState=function(c){e.debug("History.recycleState",this,arguments);
var b=e.contractState(c);g.discardedState(c)&&delete g.discardedStates[b];return true};if(e.emulated.hashChange)e.Adapter.onDomLoad(function(){g.checkerFunction=null;if(g.isInternetExplorer()){var c=l.createElement("iframe");c.setAttribute("id","historyjs-iframe");c.style.display="none";l.body.appendChild(c);c.contentWindow.document.open();c.contentWindow.document.close();var b=null,j=null,a=false;g.checkerFunction=function(){if(a){e.debug("hashchange.checker: checker is running");return false}a=
true;var d=e.getHash(),f=g.unescapeHash(c.contentWindow.document.location.hash);if(d!==b){b=d;if(f!==d){e.debug("hashchange.checker: iframe hash change","documentHash (new):",d,"iframeHash (old):",f);j=d;c.contentWindow.document.open();c.contentWindow.document.close();c.contentWindow.document.location.hash=g.escapeHash(d)}e.Adapter.trigger(h,"hashchange")}else if(f!==j){e.debug("hashchange.checker: iframe hash out of sync","iframeHash (new):",f,"documentHash (old):",d);j=f;e.setHash(f,false)}a=false;
return true}}else{b=null;g.checkerFunction=function(){var d=e.getHash();if(d!==b){b=d;e.Adapter.trigger(h,"hashchange")}return true}}setInterval(g.checkerFunction,e.options.hashChangeCheckerDelay);return true});if(e.emulated.pushState){g.onHashChange=function(c){e.debug("_History.onHashChange",this,arguments);currentHash=unescape(e.extractHashFromUrl(c&&c.newURL||l.location.href));currentStateHashExits=currentStateHash=currentState=null;if(g.isLastHash(currentHash)){e.debug("_History.onHashChange: no change");
e.busy(false);return false}g.saveHash(currentHash);currentState=e.expandHash(currentHash);if(!currentState){e.debug("_History.onHashChange: traditional anchor");e.Adapter.trigger(h,"anchorchange");e.busy(false);return false}if(g.isLastState(currentState)){e.debug("_History.onHashChange: no change");e.busy(false);return false}currentStateHash=e.contractState(currentState);e.debug("_History.onHashChange: ","currentStateHash",currentStateHash,"Hash -1",g.getHashByIndex(-1),"Hash -2",g.getHashByIndex(-2),
"Hash -3",g.getHashByIndex(-3),"Hash -4",g.getHashByIndex(-4),"Hash -5",g.getHashByIndex(-5),"Hash -6",g.getHashByIndex(-6),"Hash -7",g.getHashByIndex(-7));var b=g.discardedState(currentState);if(b){e.debug("forwardState:",e.contractState(b.forwardState),"backState:",e.contractState(b.backState));if(g.getHashByIndex(-2)===e.contractState(b.forwardState)){e.debug("_History.onHashChange: go backwards");e.back(false)}else{e.debug("_History.onHashChange: go forwards");e.forward(false)}e.busy(false);return false}e.debug("_History.onHashChange: success hashchange");
e.pushState(currentState.data,currentState.title,currentState.url,false);return true};e.Adapter.bind(h,"hashchange",g.onHashChange);e.pushState=function(c,b,j,a){e.debug("History.pushState",this,arguments);if(e.extractHashFromUrl(j))throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(a!==false&&e.busy()){e.debug("History.pushState: we must wait",arguments);e.pushQueue({scope:e,callback:e.pushState,args:arguments,queue:a});return false}e.busy(true);var d=
e.createStateObject(c,b,j),f=e.contractState(d);e.getState();var i=e.getStateHash(),k=unescape(e.getHash());g.storeState(d);g.recycleState(d);if(l.title!==d.title){l.title=d.title;try{l.getElementsByTagName("title")[0].innerHTML=d.title}catch(m){}}e.debug("History.pushState: details","newStateHash:",f,"oldStateHash:",i,"html4Hash:",k);if(f===i){e.debug("History.pushState: no change",f);return false}if(f!==k){e.debug("History.pushState: update hash",f);e.setHash(f,false);return false}g.saveState(d);
e.debug("History.pushState: trigger popstate");e.Adapter.trigger(h,"statechange");e.busy(false);return true};e.replaceState=function(c,b,j,a){e.debug("History.replaceState",this,arguments);if(e.extractHashFromUrl(j))throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(a!==false&&e.busy()){e.debug("History.replaceState: we must wait",arguments);e.pushQueue({scope:e,callback:e.replaceState,args:arguments,queue:a});return false}e.busy(true);var d=e.createStateObject(c,
b,j),f=e.getState(),i=g.getStateByIndex(-2);g.discardState(f,d,i);e.pushState(d.data,d.title,d.url,false);return true};if(!l.location.hash||l.location.hash==="#")e.Adapter.onDomLoad(function(){e.debug("Internet Explorer Initial State Change Fix");var c=e.createStateObject({},"",l.location.href);e.pushState(c.data,c.title,c.url)});else if(!e.emulated.hashChange){e.debug("Firefox Initial State Change Fix");e.Adapter.onDomLoad(function(){g.onHashChange()})}}};e.initHtml4()})(window);
(function(h,l){h.History=h.History||{};h._History=h._History||{};var g=h.console||l,e=h.document,c=h._History,b=h.History,j=h.history;if(typeof b.initHtml5!=="undefined")throw Error("History.js HTML5 Support has already been loaded...");b.initHtml5=function(){if(typeof b.Adapter==="undefined")return false;b.options={hashChangeCheckerDelay:100,busyDelay:250};b.debug=function(){b.debug.enable&&b.log.apply(b,arguments)};b.debug.enable=false;b.log=function(){var a=typeof g!=="undefined",d=e.getElementById("log"),
f="\n"+arguments[0]+"\n",i;if(a){i=Array.prototype.slice.call(arguments);f=i.shift();typeof g.debug!=="undefined"?g.debug.apply(g,[f,i]):g.log.apply(g,[f,i])}i=1;for(n=arguments.length;i<n;++i){var k=arguments[i];if(typeof k==="object"&&typeof JSON!=="undefined")try{k=JSON.stringify(k)}catch(m){}f+="\n"+k+"\n"}if(d){d.value+=f+"\n-----\n";d.scrollTop=d.scrollHeight-d.clientHeight}else a||alert(f);return true};c.getInternetExplorerMajorVersion=function(){return c.getInternetExplorerMajorVersion.cached=
typeof c.getInternetExplorerMajorVersion.cached!=="undefined"?c.getInternetExplorerMajorVersion.cached:function(){for(var a=3,d=e.createElement("div"),f=d.getElementsByTagName("i");d.innerHTML="<\!--[if gt IE "+ ++a+"]><i></i><![endif]--\>",f[0];);return a>4?a:void 0}()};c.isInternetExplorer=function(){return c.isInternetExplorer.cached=typeof c.isInternetExplorer.cached!=="undefined"?c.isInternetExplorer.cached:c.getInternetExplorerMajorVersion()!==0};b.emulated={pushState:!Boolean(h.history&&h.history.pushState&&
h.history.replaceState)};c.isEmptyObject=function(a){for(var d in a)if(this.hasOwnProperty(d))return false;return true};c.cloneObject=function(a){if(a){a=JSON.stringify(a);a=JSON.parse(a)}else a={};return a};b.contractUrl=function(a){a=b.expandUrl(a);var d=e.location.protocol+"//"+(e.location.hostname||e.location.host);if(e.location.port)d+=":"+e.location.port;d+="/";return a=a.replace(d,"/")};b.expandUrl=function(a){a=a||"";if(!/[a-z]+\:\/\//.test(a))if(a.length===0||a.substring(0,1)==="?")a=e.location.href.replace(/[#\?].*/,
"")+a;else{var d=e.getElementsByTagName("base"),f=null;f="";if(d.length===1){f=d[0];f=f.href;if(f[f.length-1]!=="/")f+="/";a=f+a.replace(/^\//,"")}else if(a.substring(0,1)==="."){d=e.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,"");if(d[d.length-1]!=="/")d+="/";a=d+a}else{d=e.location.protocol+"//"+(e.location.hostname||e.location.host);if(e.location.port)d+=":"+e.location.port;d+="/";a=d+a.replace(/^\//,"")}}return a};b.expandState=function(a){a=a||{};a={data:a.data||{},url:b.expandUrl(a.url||
""),title:a.title||""};a.data.title=a.data.title||a.title;a.data.url=a.data.url||a.url;return a};b.createStateObject=function(a,d,f){a={data:a,title:d,url:f};return a=b.expandState(a)};b.expandHash=function(a){var d=null;try{d=JSON.parse(a)}catch(f){var i=/(.*)\/uid=([0-9]+)$/.exec(a);if(i=i?String(i[2]||""):"")d=c.getStateByUid(i)||null;if(!d&&/\//.test(a)){a=b.expandUrl(a);d=b.createStateObject(null,null,a)}}return d=d?b.expandState(d):null};b.contractState=function(a){if(!a)return null;var d=null;
if(a=c.cloneObject(a)){a.data=a.data||{};delete a.data.title;delete a.data.url;if(c.isEmptyObject(a)&&!a.title)d=b.contractUrl(a.url);else{d=JSON.stringify(a);var f;if(typeof c.hashesToUids[d]!=="undefined")f=c.hashesToUids[d];else for(;;){f=String(Math.floor(Math.random()*1E3));if(typeof c.uidsToStates[f]==="undefined")break}c.hashesToUids[d]=f;c.uidsToStates[f]=a;d=b.contractUrl(a.url)+"/uid="+f}}return d};c.uidsToStates={};c.hashesToUids={};c.getStateByUid=function(a){return c.uidsToStates[String(a)]||
l};c.statesByUrl={};c.duplicateStateUrls={};c.statesByHash={};c.savedStates=[];b.getState=function(){return c.getStateByIndex()};b.getStateHash=function(){return b.contractState(b.getState())};c.getStateByUrl=function(a){return c.statesByUrl[a]||l};c.getStateByHash=function(a){return c.statesByHash[a]||l};c.storeState=function(a){var d=b.contractState(a),f=c.getStateByUrl(a.url);if(typeof f!=="undefined")if(b.contractState(f)!==d)c.duplicateStateUrls[a.url]=true;c.statesByUrl[a.url]=c.statesByHash[d]=
a;return true};c.isLastState=function(a){a=b.contractState(a);var d=b.getStateHash();return c.savedStates.length&&a===d};c.saveState=function(a){if(c.isLastState(a))return false;c.savedStates.push(a);return true};c.getStateByIndex=function(a){var d=null;return d=typeof a==="undefined"?c.savedStates[c.savedStates.length-1]:a<0?c.savedStates[c.savedStates.length+a]:c.savedStates[a]};c.stateUrlExists=function(a){return typeof c.statesByUrl[a]!=="undefined"};c.urlDuplicateExists=function(a){return typeof c.duplicateStateUrls[a]!==
"undefined"};b.getHash=function(){return c.unescapeHash(e.location.hash)};c.unescapeHash=function(a){a=c.normalizeHash(a);if(/[\%]/.test(a))a=unescape(a);return a};c.normalizeHash=function(a){return a.replace(/[^#]*#/,"").replace(/#.*/,"")};b.setHash=function(a,d){if(d!==false&&b.busy()){b.debug("History.setHash: we must wait",arguments);b.pushQueue({scope:b,callback:b.setHash,args:arguments,queue:d});return false}var f=c.escapeHash(a);b.debug("History.setHash",this,arguments,"hash:",a,"adjustedHash:",
f,"oldHash:",e.location.hash);b.busy(true);e.location.hash=f;return a};c.escapeHash=function(a){a=c.normalizeHash(a);if(/[^a-zA-Z0-9\/\-\_\%\.]/.test(a))a=escape(a);return a};b.extractHashFromUrl=function(a){a=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return a=c.unescapeHash(a)};b.isTraditionalAnchor=function(a){a=b.extractHashFromUrl(a);return typeof e.getElementById(a)!=="undefined"};b.queues=[];b.busy=function(a){b.debug("History.busy: called: changing ["+(b.busy.flag||false)+"] to ["+(a||
false)+"]",b.queues);if(typeof a!=="undefined")b.busy.flag=a;else if(typeof b.busy.flag==="undefined")b.busy.flag=false;if(!b.busy.flag){clearTimeout(b.busy.timeout);var d=function(){if(!b.busy.flag)for(var f=b.queues.length-1;f>=0;--f){var i=b.queues[f];if(i.length!==0){i=i.shift();b.debug("History.busy: firing",i);b.fireQueueItem(i);b.busy.timeout=setTimeout(d,b.options.busyDelay)}}};b.busy.timeout=setTimeout(d,b.options.busyDelay)}return b.busy.flag};b.fireQueueItem=function(a){return a.callback.apply(a.scope||
b,a.args||[])};b.pushQueue=function(a){b.debug("History.pushQueue: called",arguments);b.queues[a.queue||0]=b.queues[a.queue||0]||[];b.queues[a.queue||0].push(a);return true};b.queue=function(a,d){if(typeof a==="function")a={callback:a};if(typeof d!=="undefined")a.queue=d;b.busy()?b.pushQueue(a):b.fireQueueItem(a);return true};b.back=function(a){b.debug("History.back: called",arguments);if(a!==false&&b.busy()){b.debug("History.back: we must wait",arguments);b.pushQueue({scope:b,callback:b.back,args:arguments,
queue:a});return false}b.busy(true);if(b.emulated.hashChange&&c.isInternetExplorer()){var d=b.getHash();setTimeout(function(){if(b.getHash()===d){b.debug("History.back: trying again");return b.back(false)}return true},b.options.hashChangeCheckerDelay*5)}j.go(-1);return true};b.forward=function(a){b.debug("History.forward: called",arguments);if(a!==false&&b.busy()){b.debug("History.forward: we must wait",arguments);b.pushQueue({scope:b,callback:b.forward,args:arguments,queue:a});return false}b.busy(true);
if(b.emulated.hashChange&&c.isInternetExplorer()){var d=b.getHash();setTimeout(function(){if(b.getHash()===d){b.debug("History.forward: trying again");return b.forward(false)}return true},b.options.hashChangeCheckerDelay*5)}j.go(1);return true};b.go=function(a,d){b.debug("History.go: called",arguments);if(a>0)for(var f=1;f<=a;++f)b.forward(d);else if(a<0)for(f=-1;f>=a;--f)b.back(d);else throw Error("History.go: History.go requires a positive or negative integer passed.");return true};if(!b.emulated.pushState){c.onPopState=
function(a){b.debug("_History.onPopState",this,arguments);var d=unescape(b.getHash());if(d){var f=b.expandHash(d);if(f){b.debug("_History.onPopState: state anchor",d,f);b.replaceState(f.data,f.tite,f.url,false)}else{b.debug("_History.onPopState: traditional anchor",d);b.Adapter.trigger(h,"anchorchange");b.busy(false)}return false}d={};var i=f=null;d=null;a=a||{};if(typeof a.state==="undefined")if(typeof a.originalEvent!=="undefined"&&typeof a.originalEvent.state!=="undefined")a.state=a.originalEvent.state;
else if(typeof a.event!=="undefined"&&typeof a.event.state!=="undefined")a.state=a.event.state;if(a.state===null)d=a.state;else if(typeof a.state!=="undefined"){f=b.expandUrl(e.location.href);d=c.getStateByUrl(f);f=c.urlDuplicateExists(f);d=typeof d!=="undefined"&&!f?d.data:a.state}else{f=b.expandUrl(e.location.href);if((d=c.getStateByUrl(f))&&f==d.url)d=d.data;else throw Error("Unknown state");}d=typeof d!=="object"||d===null?{}:d;f=d.title||"";i=d.url||e.location.href;d=b.createStateObject(d,f,
i);if(c.isLastState(d)){b.debug("_History.onPopState: no change",d,c.savedStates);b.busy(false);return false}b.debug("_History.onPopState","newState:",d,"oldState:",c.getStateByUrl(b.expandUrl(e.location.href)),"duplicateExists:",c.urlDuplicateExists(b.expandUrl(e.location.href)));c.storeState(d);c.saveState(d);if(d.title)e.title=d.title;b.Adapter.trigger(h,"statechange");b.busy(false);return true};b.Adapter.bind(h,"popstate",c.onPopState);b.pushState=function(a,d,f,i){if(b.extractHashFromUrl(f))throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
if(i!==false&&b.busy()){b.debug("History.pushState: we must wait",arguments);b.pushQueue({scope:b,callback:b.pushState,args:arguments,queue:i});return false}b.busy(true);var k=b.createStateObject(a,d,f);c.storeState(k);j.pushState(k.data,k.title,k.url);b.Adapter.trigger(h,"popstate");return true};b.replaceState=function(a,d,f,i){if(b.extractHashFromUrl(f))throw Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==false&&b.busy()){b.debug("History.replaceState: we must wait",
arguments);b.pushQueue({scope:b,callback:b.replaceState,args:arguments,queue:i});return false}b.busy(true);var k=b.createStateObject(a,d,f);c.storeState(k);j.replaceState(k.data,k.title,k.url);b.Adapter.trigger(h,"popstate");return true};if(navigator.vendor==="Apple Computer, Inc."){b.Adapter.onDomLoad(function(){b.debug("Safari Initial State Change Fix");var a=b.createStateObject({},"",e.location.href);b.pushState(a.data,a.title,a.url)});b.Adapter.bind(h,"hashchange",function(){b.Adapter.trigger(h,
"popstate")})}}};b.initHtml5()})(window);