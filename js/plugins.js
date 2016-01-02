
/* Copyright (c) 2010-2013 Marcus Westin */
"use strict";(function(e,t){typeof define=="function"&&define.amd?define([],t):typeof exports=="object"?module.exports=t():e.store=t()})(this,function(){function o(){try{return r in t&&t[r]}catch(e){return!1}}var e={},t=window,n=t.document,r="localStorage",i="script",s;e.disabled=!1,e.version="1.3.19",e.set=function(e,t){},e.get=function(e,t){},e.has=function(t){return e.get(t)!==undefined},e.remove=function(e){},e.clear=function(){},e.transact=function(t,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=e.get(t,n);r(i),e.set(t,i)},e.getAll=function(){},e.forEach=function(){},e.serialize=function(e){return JSON.stringify(e)},e.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=t[r],e.set=function(t,n){return n===undefined?e.remove(t):(s.setItem(t,e.serialize(n)),n)},e.get=function(t,n){var r=e.deserialize(s.getItem(t));return r===undefined?n:r},e.remove=function(e){s.removeItem(e)},e.clear=function(){s.clear()},e.getAll=function(){var t={};return e.forEach(function(e,n){t[e]=n}),t},e.forEach=function(t){for(var n=0;n<s.length;n++){var r=s.key(n);t(r,e.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(t){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=t.apply(e,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),h=function(e){return e.replace(/^d/,"___$&").replace(c,"___")};e.set=l(function(t,n,i){return n=h(n),i===undefined?e.remove(n):(t.setAttribute(n,e.serialize(i)),t.save(r),i)}),e.get=l(function(t,n,r){n=h(n);var i=e.deserialize(t.getAttribute(n));return i===undefined?r:i}),e.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),e.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);while(t.length)e.removeAttribute(t[0].name);e.save(r)}),e.getAll=function(t){var n={};return e.forEach(function(e,t){n[e]=t}),n},e.forEach=l(function(t,n){var r=t.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,e.deserialize(t.getAttribute(s.name)))})}try{var p="__storejs__";e.set(p,p),e.get(p)!=p&&(e.disabled=!0),e.remove(p)}catch(f){e.disabled=!0}return e.enabled=!e.disabled,e});

/*!
 * clipboard.js v1.5.5
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("matches-selector");e.exports=function(t,e,n){for(var o=n?t:t.parentNode;o&&o!==document;){if(r(o,e))return o;o=o.parentNode}}},{"matches-selector":2}],2:[function(t,e,n){function r(t,e){if(i)return i.call(t,e);for(var n=t.parentNode.querySelectorAll(e),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var o=Element.prototype,i=o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;e.exports=r},{}],3:[function(t,e,n){function r(t,e,n,r){var i=o.apply(this,arguments);return t.addEventListener(n,i),{destroy:function(){t.removeEventListener(n,i)}}}function o(t,e,n,r){return function(n){n.delegateTarget=i(n.target,e,!0),n.delegateTarget&&r.call(t,n)}}var i=t("closest");e.exports=r},{closest:1}],4:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.function=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],5:[function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.function(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return o(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=r},{"./is":4,delegate:3}],6:[function(t,e,n){function r(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),r=document.createRange();r.selectNodeContents(t),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}e.exports=r},{}],7:[function(t,e,n){function r(){}r.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;a>i;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},e.exports=r},{}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.__esModule=!0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("select"),c=r(a),s=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){if(this.text&&this.target)throw new Error('Multiple attributes declared, use either "target" or "text"');if(this.text)this.selectFake();else{if(!this.target)throw new Error('Missing required attributes, use either "target" or "text"');this.selectTarget()}},t.prototype.selectFake=function t(){var e=this;this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return e.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.position="absolute",this.fakeElem.style.left="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=c.default(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=c.default(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},i(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!=typeof e||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');this._target=e}},get:function t(){return this._target}}]),t}();n.default=s,e.exports=n.default},{select:6}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}n.__esModule=!0;var c=t("./clipboard-action"),s=r(c),u=t("tiny-emitter"),l=r(u),f=t("good-listener"),d=r(f),h=function(t){function e(n,r){o(this,e),t.call(this),this.resolveOptions(r),this.listenClick(n)}return i(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=d.default(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return a("action",e)},e.prototype.defaultTarget=function t(e){var n=a("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return a("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(l.default);n.default=h,e.exports=n.default},{"./clipboard-action":8,"good-listener":5,"tiny-emitter":7}]},{},[9])(9)});

/*!
 * jQuery Popup Overlay
 *
 * @version 1.7.10
 * @requires jQuery v1.7.1+
 * @link http://vast-engineering.github.com/jquery-popup-overlay/
 */
;(function ($) {

    var $window = $(window);
    var options = {};
    var zindexvalues = [];
    var lastclicked = [];
    var scrollbarwidth;
    var bodymarginright = null;
    var opensuffix = '_open';
    var closesuffix = '_close';
    var visiblePopupsArray = [];
    var transitionsupport = null;
    var opentimer;
    var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

    var methods = {

        _init: function (el) {
            var $el = $(el);
            var options = $el.data('popupoptions');
            lastclicked[el.id] = false;
            zindexvalues[el.id] = 0;

            if (!$el.data('popup-initialized')) {
                $el.attr('data-popup-initialized', 'true');
                methods._initonce(el);
            }

            if (options.autoopen) {
                setTimeout(function() {
                    methods.show(el, 0);
                }, 0);
            }
        },

        _initonce: function (el) {
            var $el = $(el);
            var $body = $('body');
            var $wrapper;
            var options = $el.data('popupoptions');
            var css;

            bodymarginright = parseInt($body.css('margin-right'), 10);
            transitionsupport = document.body.style.webkitTransition !== undefined ||
                                document.body.style.MozTransition !== undefined ||
                                document.body.style.msTransition !== undefined ||
                                document.body.style.OTransition !== undefined ||
                                document.body.style.transition !== undefined;

            if (options.type == 'tooltip') {
                options.background = false;
                options.scrolllock = false;
            }

            if (options.backgroundactive) {
                options.background = false;
                options.blur = false;
                options.scrolllock = false;
            }

            if (options.scrolllock) {
                // Calculate the browser's scrollbar width dynamically
                var parent;
                var child;
                if (typeof scrollbarwidth === 'undefined') {
                    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
                    child = parent.children();
                    scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
                    parent.remove();
                }
            }

            if (!$el.attr('id')) {
                $el.attr('id', 'j-popup-' + parseInt((Math.random() * 100000000), 10));
            }

            $el.addClass('popup_content');

            $body.prepend(el);

            $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');

            $wrapper = $('#' + el.id + '_wrapper');

            $wrapper.css({
                opacity: 0,
                visibility: 'hidden',
                position: 'absolute'
            });

            // Make div clickable in iOS
            if (iOS) {
                $wrapper.css('cursor', 'pointer');
            }

            if (options.type == 'overlay') {
                $wrapper.css('overflow','auto');
            }

            $el.css({
                opacity: 0,
                visibility: 'hidden',
                display: 'inline-block'
            });

            if (options.setzindex && !options.autozindex) {
                $wrapper.css('z-index', '100001');
            }

            if (!options.outline) {
                $el.css('outline', 'none');
            }

            if (options.transition) {
                $el.css('transition', options.transition);
                $wrapper.css('transition', options.transition);
            }

            // Hide popup content from screen readers initially
            $el.attr('aria-hidden', true);

            if ((options.background) && (!$('#' + el.id + '_background').length)) {

                $body.prepend('<div id="' + el.id + '_background" class="popup_background"></div>');

                var $background = $('#' + el.id + '_background');

                $background.css({
                    opacity: 0,
                    visibility: 'hidden',
                    backgroundColor: options.color,
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                });

                if (options.setzindex && !options.autozindex) {
                    $background.css('z-index', '100000');
                }

                if (options.transition) {
                    $background.css('transition', options.transition);
                }
            }

            if (options.type == 'overlay') {
                $el.css({
                    textAlign: 'left',
                    position: 'relative',
                    verticalAlign: 'middle'
                });

                css = {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    textAlign: 'center'
                };

                if(options.backgroundactive){
                    css.position = 'relative';
                    css.height = '0';
                    css.overflow = 'visible';
                }

                $wrapper.css(css);

                // CSS vertical align helper
                $wrapper.append('<div class="popup_align" />');

                $('.popup_align').css({
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    height: '100%'
                });
            }

            // Add WAI ARIA role to announce dialog to screen readers
            $el.attr('role', 'dialog');

            var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);

            $(openelement).each(function (i, item) {
                $(item).attr('data-popup-ordinal', i);

                if (!item.id) {
                    $(item).attr('id', 'open_' + parseInt((Math.random() * 100000000), 10));
                }
            });

            // Set aria-labelledby (if aria-label or aria-labelledby is not set in html)
            if (!($el.attr('aria-labelledby') || $el.attr('aria-label'))) {
                $el.attr('aria-labelledby', $(openelement).attr('id'));
            }

            // Show and hide tooltips on hover
            if(options.action == 'hover'){
                options.keepfocus = false;

                // Handler: mouseenter, focusin
                $(openelement).on('mouseenter', function (event) {
                    methods.show(el, $(this).data('popup-ordinal'));
                });

                // Handler: mouseleave, focusout
                $(openelement).on('mouseleave', function (event) {
                    methods.hide(el);
                });

            } else {

                // Handler: Show popup when clicked on `open` element
                $(document).on('click', openelement, function (event) {
                    event.preventDefault();

                    var ord = $(this).data('popup-ordinal');
                    setTimeout(function() { // setTimeout is to allow `close` method to finish (for issues with multiple tooltips)
                        methods.show(el, ord);
                    }, 0);
                });
            }

            if (options.closebutton) {
                methods.addclosebutton(el);
            }

            if (options.detach) {
                $el.hide().detach();
            } else {
                $wrapper.hide();
            }
        },

        /**
         * Show method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        show: function (el, ordinal) {
            var $el = $(el);

            if ($el.data('popup-visible')) return;

            // Initialize if not initialized. Required for: $('#popup').popup('show')
            if (!$el.data('popup-initialized')) {
                methods._init(el);
            }
            $el.attr('data-popup-initialized', 'true');

            var $body = $('body');
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');
            var $background = $('#' + el.id + '_background');

            // `beforeopen` callback event
            callback(el, ordinal, options.beforeopen);

            // Remember last clicked place
            lastclicked[el.id] = ordinal;

            // Add popup id to visiblePopupsArray
            setTimeout(function() {
                visiblePopupsArray.push(el.id);
            }, 0);

            // Calculating maximum z-index
            if (options.autozindex) {

                var elements = document.getElementsByTagName('*');
                var len = elements.length;
                var maxzindex = 0;

                for(var i=0; i<len; i++){

                    var elementzindex = $(elements[i]).css('z-index');

                    if(elementzindex !== 'auto'){

                      elementzindex = parseInt(elementzindex, 10);

                      if(maxzindex < elementzindex){
                        maxzindex = elementzindex;
                      }
                    }
                }

                zindexvalues[el.id] = maxzindex;

                // Add z-index to the background
                if (options.background) {
                    if (zindexvalues[el.id] > 0) {
                        $('#' + el.id + '_background').css({
                            zIndex: (zindexvalues[el.id] + 1)
                        });
                    }
                }

                // Add z-index to the wrapper
                if (zindexvalues[el.id] > 0) {
                    $wrapper.css({
                        zIndex: (zindexvalues[el.id] + 2)
                    });
                }
            }

            if (options.detach) {
                $wrapper.prepend(el);
                $el.show();
            } else {
                $wrapper.show();
            }

            opentimer = setTimeout(function() {
                $wrapper.css({
                    visibility: 'visible',
                    opacity: 1
                });

                $('html').addClass('popup_visible').addClass('popup_visible_' + el.id);
                $wrapper.addClass('popup_wrapper_visible');
            }, 20); // 20ms required for opening animation to occur in FF

            // Disable background layer scrolling when popup is opened
            if (options.scrolllock) {
                $body.css('overflow', 'hidden');
                if ($body.height() > $window.height()) {
                    $body.css('margin-right', bodymarginright + scrollbarwidth);
                }
            }

            if(options.backgroundactive){
                //calculates the vertical align
                $el.css({
                    top:(
                        $window.height() - (
                            $el.get(0).offsetHeight +
                            parseInt($el.css('margin-top'), 10) +
                            parseInt($el.css('margin-bottom'), 10)
                        )
                    )/2 +'px'
                });
            }

            $el.css({
                'visibility': 'visible',
                'opacity': 1
            });

            // Show background
            if (options.background) {
                $background.css({
                    'visibility': 'visible',
                    'opacity': options.opacity
                });

                // Fix IE8 issue with background not appearing
                setTimeout(function() {
                    $background.css({
                        'opacity': options.opacity
                    });
                }, 0);
            }

            $el.data('popup-visible', true);

            // Position popup
            methods.reposition(el, ordinal);

            // Remember which element had focus before opening a popup
            $el.data('focusedelementbeforepopup', document.activeElement);

            // Handler: Keep focus inside dialog box
            if (options.keepfocus) {
                // Make holder div focusable
                $el.attr('tabindex', -1);

                // Focus popup or user specified element.
                // Initial timeout of 50ms is set to give some time to popup to show after clicking on
                // `open` element, and after animation is complete to prevent background scrolling.
                setTimeout(function() {
                    if (options.focuselement === 'closebutton') {
                        $('#' + el.id + ' .' + el.id + closesuffix + ':first').focus();
                    } else if (options.focuselement) {
                        $(options.focuselement).focus();
                    } else {
                        $el.focus();
                    }
                }, options.focusdelay);

            }

            // Hide main content from screen readers
            $(options.pagecontainer).attr('aria-hidden', true);

            // Reveal popup content to screen readers
            $el.attr('aria-hidden', false);

            callback(el, ordinal, options.onopen);

            if (transitionsupport) {
                $wrapper.one('transitionend', function() {
                    callback(el, ordinal, options.opentransitionend);
                });
            } else {
                callback(el, ordinal, options.opentransitionend);
            }
        },

        /**
         * Hide method
         *
         * @param object el - popup instance DOM node
         * @param boolean outerClick - click on the outer content below popup
         */
        hide: function (el, outerClick) {
            // Get index of popup ID inside of visiblePopupsArray
            var popupIdIndex = $.inArray(el.id, visiblePopupsArray);

            // If popup is not opened, ignore the rest of the function
            if (popupIdIndex === -1) {
                return;
            }

            if(opentimer) clearTimeout(opentimer);

            var $body = $('body');
            var $el = $(el);
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');
            var $background = $('#' + el.id + '_background');

            $el.data('popup-visible', false);

            if (visiblePopupsArray.length === 1) {
                $('html').removeClass('popup_visible').removeClass('popup_visible_' + el.id);
            } else {
                if($('html').hasClass('popup_visible_' + el.id)) {
                    $('html').removeClass('popup_visible_' + el.id);
                }
            }

            // Remove popup from the visiblePopupsArray
            visiblePopupsArray.splice(popupIdIndex, 1);

            if($wrapper.hasClass('popup_wrapper_visible')) {
                $wrapper.removeClass('popup_wrapper_visible');
            }

            // Focus back on saved element
            if (options.keepfocus && !outerClick) {
                setTimeout(function() {
                    if ($($el.data('focusedelementbeforepopup')).is(':visible')) {
                        $el.data('focusedelementbeforepopup').focus();
                    }
                }, 0);
            }

            // Hide popup
            $wrapper.css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $el.css({
                'visibility': 'hidden',
                'opacity': 0
            });

            // Hide background
            if (options.background) {
                $background.css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            }

            // Reveal main content to screen readers
            $(options.pagecontainer).attr('aria-hidden', false);

            // Hide popup content from screen readers
            $el.attr('aria-hidden', true);

            // `onclose` callback event
            callback(el, lastclicked[el.id], options.onclose);

            if (transitionsupport && $el.css('transition-duration') !== '0s') {
                $el.one('transitionend', function(e) {

                    if (!($el.data('popup-visible'))) {
                        if (options.detach) {
                            $el.hide().detach();
                        } else {
                            $wrapper.hide();
                        }
                    }

                    // Re-enable scrolling of background layer
                    if (options.scrolllock) {
                        setTimeout(function() {
                            $body.css({
                                overflow: 'visible',
                                'margin-right': bodymarginright
                            });
                        }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
                    }

                    callback(el, lastclicked[el.id], options.closetransitionend);
                });
            } else {
                if (options.detach) {
                    $el.hide().detach();
                } else {
                    $wrapper.hide();
                }

                // Re-enable scrolling of background layer
                if (options.scrolllock) {
                    setTimeout(function() {
                        $body.css({
                            overflow: 'visible',
                            'margin-right': bodymarginright
                        });
                    }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
                }

                callback(el, lastclicked[el.id], options.closetransitionend);
            }

        },

        /**
         * Toggle method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        toggle: function (el, ordinal) {
            if ($(el).data('popup-visible')) {
                methods.hide(el);
            } else {
                setTimeout(function() {
                    methods.show(el, ordinal);
                }, 0);
            }
        },

        /**
         * Reposition method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        reposition: function (el, ordinal) {
            var $el = $(el);
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');
            var $background = $('#' + el.id + '_background');

            ordinal = ordinal || 0;

            // Tooltip type
            if (options.type == 'tooltip') {
                $wrapper.css({
                    'position': 'absolute'
                });

                var $tooltipanchor;
                if (options.tooltipanchor) {
                    $tooltipanchor = $(options.tooltipanchor);
                } else if (options.openelement) {
                    $tooltipanchor = $(options.openelement).filter('[data-popup-ordinal="' + ordinal + '"]');
                } else {
                    $tooltipanchor = $('.' + el.id + opensuffix + '[data-popup-ordinal="' + ordinal + '"]');
                }

                var linkOffset = $tooltipanchor.offset();

                // Horizontal position for tooltip
                if (options.horizontal == 'right') {
                    $wrapper.css('left', linkOffset.left + $tooltipanchor.outerWidth() + options.offsetleft);
                } else if (options.horizontal == 'leftedge') {
                    $wrapper.css('left', linkOffset.left + $tooltipanchor.outerWidth() - $tooltipanchor.outerWidth() +  options.offsetleft);
                } else if (options.horizontal == 'left') {
                    $wrapper.css('right', $window.width() - linkOffset.left  - options.offsetleft);
                } else if (options.horizontal == 'rightedge') {
                    $wrapper.css('right', $window.width()  - linkOffset.left - $tooltipanchor.outerWidth() - options.offsetleft);
                } else {
                    $wrapper.css('left', linkOffset.left + ($tooltipanchor.outerWidth() / 2) - ($el.outerWidth() / 2) - parseFloat($el.css('marginLeft')) + options.offsetleft);
                }

                // Vertical position for tooltip
                if (options.vertical == 'bottom') {
                    $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() + options.offsettop);
                } else if (options.vertical == 'bottomedge') {
                    $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() - $el.outerHeight() + options.offsettop);
                } else if (options.vertical == 'top') {
                    $wrapper.css('bottom', $window.height() - linkOffset.top - options.offsettop);
                } else if (options.vertical == 'topedge') {
                    $wrapper.css('bottom', $window.height() - linkOffset.top - $el.outerHeight() - options.offsettop);
                } else {
                    $wrapper.css('top', linkOffset.top + ($tooltipanchor.outerHeight() / 2) - ($el.outerHeight() / 2) - parseFloat($el.css('marginTop')) + options.offsettop);
                }

            // Overlay type
            } else if (options.type == 'overlay') {

                // Horizontal position for overlay
                if (options.horizontal) {
                    $wrapper.css('text-align', options.horizontal);
                } else {
                    $wrapper.css('text-align', 'center');
                }

                // Vertical position for overlay
                if (options.vertical) {
                    $el.css('vertical-align', options.vertical);
                } else {
                    $el.css('vertical-align', 'middle');
                }
            }
        },

        /**
         * Add-close-button method
         *
         * @param {object} el - popup instance DOM node
         */
        addclosebutton: function (el) {
            var genericCloseButton;

            if ($(el).data('popupoptions').closebuttonmarkup) {
                genericCloseButton = $(options.closebuttonmarkup).addClass(el.id + '_close');
            } else {
                genericCloseButton = '<button class="popup_close ' + el.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">×</span></button>';
            }

            if ($el.data('popup-initialized')){
                $el.append(genericCloseButton);
            }

        }

    };

    /**
     * Callback event calls
     *
     * @param {object} el - popup instance DOM node
     * @param {number} ordinal - order number of an `open` element
     * @param {function} func - callback function
     */
    var callback = function (el, ordinal, func) {
        var options = $(el).data('popupoptions');
        var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);
        var elementclicked = $(openelement + '[data-popup-ordinal="' + ordinal + '"]');
        if (typeof func == 'function') {
            func.call($(el), el, elementclicked);
        }
    };

    // Hide popup if ESC key is pressed
    $(document).on('keydown', function (event) {
        if(visiblePopupsArray.length) {
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);

            if ($(el).data('popupoptions').escape && event.keyCode == 27) {
                methods.hide(el);
            }
        }
    });

    // Hide popup on click
    $(document).on('click', function (event) {
        if(visiblePopupsArray.length) {
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);
            var closeButton = ($(el).data('popupoptions').closeelement) ? $(el).data('popupoptions').closeelement : ('.' + el.id + closesuffix);

            // If Close button clicked
            if ($(event.target).closest(closeButton).length) {
                event.preventDefault();
                methods.hide(el);
            }

            // If clicked outside of popup
            if ($(el).data('popupoptions').blur && !$(event.target).closest('#' + elementId).length && event.which !== 2 && $(event.target).is(':visible')) {

                if ($(el).data('popupoptions').background) {
                    // If clicked on popup cover
                    methods.hide(el);

                    // Older iOS/Safari will trigger a click on the elements below the cover,
                    // when tapping on the cover, so the default action needs to be prevented.
                    event.preventDefault();

                } else {
                    // If clicked on outer content
                    methods.hide(el, true);
                }
            }
        }
    });

    // Keep keyboard focus inside of popup
    $(document).on('keydown', function(event) {
        if(visiblePopupsArray.length && event.which == 9) {

            // If tab or shift-tab pressed
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);

            // Get list of all children elements in given object
            var popupItems = $(el).find('*');

            // Get list of focusable items
            var focusableItems = popupItems.filter(focusableElementsString).filter(':visible');

            // Get currently focused item
            var focusedItem = $(':focus');

            // Get the number of focusable items
            var numberOfFocusableItems = focusableItems.length;

            // Get the index of the currently focused item
            var focusedItemIndex = focusableItems.index(focusedItem);

            // If popup doesn't contain focusable elements, focus popup itself
            if (numberOfFocusableItems === 0) {
                $(el).focus();
                event.preventDefault();
            } else {
                if (event.shiftKey) {
                    // Back tab
                    // If focused on first item and user preses back-tab, go to the last focusable item
                    if (focusedItemIndex === 0) {
                        focusableItems.get(numberOfFocusableItems - 1).focus();
                        event.preventDefault();
                    }

                } else {
                    // Forward tab
                    // If focused on the last item and user preses tab, go to the first focusable item
                    if (focusedItemIndex == numberOfFocusableItems - 1) {
                        focusableItems.get(0).focus();
                        event.preventDefault();
                    }
                }
            }
        }
    });

    /**
     * Plugin API
     */
    $.fn.popup = function (customoptions) {
        return this.each(function () {

            var $el = $(this);

            if (typeof customoptions === 'object') {  // e.g. $('#popup').popup({'color':'blue'})
                var opt = $.extend({}, $.fn.popup.defaults, customoptions, $el.data('popupoptions'));
                $el.data('popupoptions', opt);
                options = $el.data('popupoptions');

                methods._init(this);

            } else if (typeof customoptions === 'string') { // e.g. $('#popup').popup('hide')
                if (!($el.data('popupoptions'))) {
                    $el.data('popupoptions', $.fn.popup.defaults);
                    options = $el.data('popupoptions');
                }

                methods[customoptions].call(this, this);

            } else { // e.g. $('#popup').popup()
                if (!($el.data('popupoptions'))) {
                    $el.data('popupoptions', $.fn.popup.defaults);
                    options = $el.data('popupoptions');
                }

                methods._init(this);

            }

        });
    };

    $.fn.popup.defaults = {
        type: 'overlay',
        autoopen: false,
        background: true,
        backgroundactive: false,
        color: 'black',
        opacity: '0.5',
        horizontal: 'center',
        vertical: 'middle',
        offsettop: 0,
        offsetleft: 0,
        escape: true,
        blur: true,
        setzindex: true,
        autozindex: false,
        scrolllock: false,
        closebutton: false,
        closebuttonmarkup: null,
        keepfocus: true,
        focuselement: null,
        focusdelay: 50,
        outline: false,
        pagecontainer: null,
        detach: false,
        openelement: null,
        closeelement: null,
        transition: null,
        tooltipanchor: null,
        beforeopen: null,
        onclose: null,
        onopen: null,
        opentransitionend: null,
        closetransitionend: null
    };

})(jQuery);

window.linkify=function(){var a="[a-z\\d.-]+://",t="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",n="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",e="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",g="(?:"+n+e+"|"+t+")",s="(?:[;/][^#?<>\\s]*)?",c="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",r="\\b"+a+"[^<>\\s]+",i="\\b"+g+s+c+"(?!\\w)",m="mailto:",l="(?:"+m+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+g+c+"(?!\\w)",p=new RegExp("(?:"+r+"|"+i+"|"+l+")","ig"),u=new RegExp("^"+a,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","Â»":"Â«","â€º":"â€¹"},o={callback:function(a,t){return t?'<a href="'+t+'" title="'+t+'" target="_blank">'+a+"</a>":a},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(a,t){t=t||{};var n,e,g,s,c,r,i,l,d,h,f,k,x="",w=[];for(e in o)void 0===t[e]&&(t[e]=o[e]);for(;n=p.exec(a);)if(g=n[0],r=p.lastIndex,i=r-g.length,!/[\/:]/.test(a.charAt(i-1))){do l=g,k=g.substr(-1),f=b[k],f&&(d=g.match(new RegExp("\\"+f+"(?!$)","g")),h=g.match(new RegExp("\\"+k,"g")),(d?d.length:0)<(h?h.length:0)&&(g=g.substr(0,g.length-1),r--)),t.punct_regexp&&(g=g.replace(t.punct_regexp,function(a){return r-=a.length,""}));while(g.length&&g!==l);s=g,u.test(s)||(s=(-1!==s.indexOf("@")?s.indexOf(m)?m:"":s.indexOf("irc.")?s.indexOf("ftp.")?"http://":"ftp://":"irc://")+s),c!=i&&(w.push([a.slice(c,i)]),c=r),w.push([g,s])}for(w.push([a.substr(c)]),e=0;e<w.length;e++)x+=t.callback.apply(window,w[e]);return x||a}}();

/*!
    Autosize 3.0.13
    license: MIT
    http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var n={exports:{}};t(n.exports,n),e.autosize=n.exports}}(this,function(e,t){"use strict";function n(e){function t(){var t=window.getComputedStyle(e,null);c=t.overflowY,"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),f="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(f)&&(f=0),i()}function n(t){var n=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=n,c=t,u&&(e.style.overflowY=t),o()}function o(){var t=window.pageYOffset,n=document.body.scrollTop,o=e.style.height;e.style.height="auto";var i=e.scrollHeight+f;return 0===e.scrollHeight?void(e.style.height=o):(e.style.height=i+"px",v=e.clientWidth,document.documentElement.scrollTop=t,void(document.body.scrollTop=n))}function i(){var t=e.style.height;o();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==c&&n("visible"):"hidden"!==c&&n("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var d=void 0===arguments[1]?{}:arguments[1],s=d.setOverflowX,l=void 0===s?!0:s,a=d.setOverflowY,u=void 0===a?!0:a;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!r.has(e)){var f=null,c=null,v=e.clientWidth,p=function(){e.clientWidth!==v&&i()},h=function(t){window.removeEventListener("resize",p),e.removeEventListener("input",i),e.removeEventListener("keyup",i),e.removeEventListener("autosize:destroy",h),r["delete"](e),Object.keys(t).forEach(function(n){e.style[n]=t[n]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",h),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i),window.addEventListener("resize",p),e.addEventListener("input",i),e.addEventListener("autosize:update",i),r.add(e),l&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function o(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r="function"==typeof Set?new Set:function(){var e=[];return{has:function(t){return Boolean(e.indexOf(t)>-1)},add:function(t){e.push(t)},"delete":function(t){e.splice(e.indexOf(t),1)}}}(),d=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(d=function(e){return e},d.destroy=function(e){return e},d.update=function(e){return e}):(d=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return n(e,t)}),e},d.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],o),e},d.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=d});

function SHA1(r){function o(r,o){var e=r<<o|r>>>32-o;return e}function e(r){var o,e,a="";for(o=7;o>=0;o--)e=r>>>4*o&15,a+=e.toString(16);return a}function a(r){r=r.replace(/\r\n/g,"\n");for(var o="",e=0;e<r.length;e++){var a=r.charCodeAt(e);128>a?o+=String.fromCharCode(a):a>127&&2048>a?(o+=String.fromCharCode(a>>6|192),o+=String.fromCharCode(63&a|128)):(o+=String.fromCharCode(a>>12|224),o+=String.fromCharCode(a>>6&63|128),o+=String.fromCharCode(63&a|128))}return o}var t,h,n,C,c,f,d,A,u,g=new Array(80),i=1732584193,s=4023233417,S=2562383102,v=271733878,m=3285377520;r=a(r);var p=r.length,l=new Array;for(h=0;p-3>h;h+=4)n=r.charCodeAt(h)<<24|r.charCodeAt(h+1)<<16|r.charCodeAt(h+2)<<8|r.charCodeAt(h+3),l.push(n);switch(p%4){case 0:h=2147483648;break;case 1:h=r.charCodeAt(p-1)<<24|8388608;break;case 2:h=r.charCodeAt(p-2)<<24|r.charCodeAt(p-1)<<16|32768;break;case 3:h=r.charCodeAt(p-3)<<24|r.charCodeAt(p-2)<<16|r.charCodeAt(p-1)<<8|128}for(l.push(h);l.length%16!=14;)l.push(0);for(l.push(p>>>29),l.push(p<<3&4294967295),t=0;t<l.length;t+=16){for(h=0;16>h;h++)g[h]=l[t+h];for(h=16;79>=h;h++)g[h]=o(g[h-3]^g[h-8]^g[h-14]^g[h-16],1);for(C=i,c=s,f=S,d=v,A=m,h=0;19>=h;h++)u=o(C,5)+(c&f|~c&d)+A+g[h]+1518500249&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=20;39>=h;h++)u=o(C,5)+(c^f^d)+A+g[h]+1859775393&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=40;59>=h;h++)u=o(C,5)+(c&f|c&d|f&d)+A+g[h]+2400959708&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;for(h=60;79>=h;h++)u=o(C,5)+(c^f^d)+A+g[h]+3395469782&4294967295,A=d,d=f,f=o(c,30),c=C,C=u;i=i+C&4294967295,s=s+c&4294967295,S=S+f&4294967295,v=v+d&4294967295,m=m+A&4294967295}var u=e(i)+e(s)+e(S)+e(v)+e(m);return u.toLowerCase()}

(function(n,t,i){"use strict";function s(n,t){return typeof t!="object"&&(t=t()),Object.keys(t).forEach(function(i){n[i]=t[i]}),n}function p(n){return{from:function(t){return n.prototype=Object.create(t.prototype),n.prototype.constructor=n,{extend:function(i){s(n.prototype,typeof i!="object"?i(t.prototype):i)}}}}}function w(n,t){return t(n)}function u(n,t){function cr(){b.on("versionchange",function(){b.close();b.on("error").fire(new nt("Database version changed by other database connection."))})}function gi(n){this._cfg={version:n,storesSource:null,dbschema:{},tables:{},contentUpgrade:null};this.stores({})}function lr(n,t,i,u){var e,f,s,h,l,c;if(n===0)Object.keys(st).forEach(function(n){nr(t,n,st[n].primKey,st[n].indexes)}),e=b._createTransaction(yt,fi,st),e.idbtrans=t,e.idbtrans.onerror=o(i,["populating database"]),e.on("error").subscribe(i),r.newPSD(function(){r.PSD.trans=e;try{b.on("populate").fire(e)}catch(n){u.onerror=t.onerror=function(n){n.preventDefault()};try{t.abort()}catch(f){}t.db.close();i(n)}});else{if(f=[],s=ui.filter(function(t){return t._cfg.version===n})[0],!s)throw new nt("Dexie specification of currently installed DB version is missing");st=b._dbSchema=s._cfg.dbschema;h=!1;l=ui.filter(function(t){return t._cfg.version>n});l.forEach(function(n){var e=st,r=n._cfg.dbschema,u;or(e,t);or(r,t);st=b._dbSchema=r;u=ar(e,r);u.add.forEach(function(n){f.push(function(t,i){nr(t,n[0],n[1].primKey,n[1].indexes);i()})});u.change.forEach(function(n){if(n.recreate)throw new nt("Not yet support for changing primary key");else f.push(function(t,i){var r=t.objectStore(n.name);n.add.forEach(function(n){tr(r,n)});n.change.forEach(function(n){r.deleteIndex(n.name);tr(r,n)});n.del.forEach(function(n){r.deleteIndex(n)});i()})});n._cfg.contentUpgrade&&f.push(function(t,u){var f,e;h=!0;f=b._createTransaction(yt,[].slice.call(t.db.objectStoreNames,0),r);f.idbtrans=t;e=0;f._promise=w(f._promise,function(n){return function(t,i,r){function f(n){return function(){n.apply(this,arguments);--e==0&&u()}}return++e,n.call(this,t,function(n,t){arguments[0]=f(n);arguments[1]=f(t);i.apply(this,arguments)},r)}});t.onerror=o(i,["running upgrader function for version",n._cfg.version]);f.on("error").subscribe(i);n._cfg.contentUpgrade(f);e===0&&u()});h&&dr()||f.push(function(n,t){yr(r,n);t()})});c=function(){try{f.length?f.shift()(t,c):vr(st,t)}catch(n){u.onerror=t.onerror=function(n){n.preventDefault()};try{t.abort()}catch(r){}t.db.close();i(n)}};c()}}function ar(n,t){var f={del:[],add:[],change:[]},r,e,o,i,c,s,u,l,h;for(r in n)t[r]||f.del.push(r);for(r in t)if(e=n[r],o=t[r],e)if(i={name:r,def:t[r],recreate:!1,del:[],add:[],change:[]},e.primKey.src!==o.primKey.src)i.recreate=!0,f.change.push(i);else{c=e.indexes.reduce(function(n,t){return n[t.name]=t,n},{});s=o.indexes.reduce(function(n,t){return n[t.name]=t,n},{});for(u in c)s[u]||i.del.push(u);for(u in s)l=c[u],h=s[u],l?l.src!==h.src&&i.change.push(h):i.add.push(h);(i.recreate||i.del.length>0||i.add.length>0||i.change.length>0)&&f.change.push(i)}else f.add.push([r,o]);return f}function nr(n,t,i,r){var u=n.db.createObjectStore(t,i.keyPath?{keyPath:i.keyPath,autoIncrement:i.auto}:{autoIncrement:i.auto});return r.forEach(function(n){tr(u,n)}),u}function vr(n,t){Object.keys(n).forEach(function(i){t.db.objectStoreNames.contains(i)||nr(t,i,n[i].primKey,n[i].indexes)})}function yr(n,t){for(var u,r=0;r<t.db.objectStoreNames.length;++r)u=t.db.objectStoreNames[r],(n[u]===null||n[u]===i)&&t.db.deleteObjectStore(u)}function tr(n,t){n.createIndex(t.name,t.keyPath,{unique:t.unique,multiEntry:t.multi})}function pr(n,t){throw new nt("Table "+t[0]+" not part of transaction. Original Scope Function Source: "+u.Promise.PSD.trans.scopeFunc.toString());}function oi(n,t,i,r){this.name=n;this.schema=i;this.hook=dt[n]?dt[n].hook:v(null,{creating:[at,f],reading:[lt,tt],updating:[vt,f],deleting:[wt,f]});this._tpf=t;this._collClass=r||ai}function wi(n,t,i,r){oi.call(this,n,t,i,r||rr)}function ir(n,t,i,r){function o(n,t,i,r){return s._promise(n,i,r)}var s=this,f,u,e;for(this.db=b,this.mode=n,this.storeNames=t,this.idbtrans=null,this.on=v(this,["complete","error"],"abort"),this._reculock=0,this._blockedFuncs=[],this._psd=null,this.active=!0,this._dbschema=i,r&&(this.parent=r),this._tpf=o,this.tables=Object.create(di),f=t.length-1;f!==-1;--f)u=t[f],e=b._tableFactory(n,i[u],o),this.tables[u]=e,this[u]||(this[u]=e)}function li(n,t,i){this._ctx={table:n,index:t===":id"?null:t,collClass:n._collClass,or:i}}function ai(n,t){var r=null,u=null,i;if(t)try{r=t()}catch(f){u=f}i=n._ctx;this._ctx={table:i.table,index:i.index,isPrimKey:!i.index||i.table.schema.primKey.keyPath&&i.index===i.table.schema.primKey.name,range:r,op:"openCursor",dir:"next",unique:"",algorithm:null,filter:null,isMatch:null,offset:0,limit:Infinity,error:u,or:i.or}}function rr(){ai.apply(this,arguments)}function wr(n,t){return n._cfg.version-t._cfg.version}function ur(n,t,i,u,f,e){i.forEach(function(i){var o=b._tableFactory(u,f[i],t);n.forEach(function(n){n[i]||(e?Object.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){var n=r.PSD&&r.PSD.trans;return n&&n.db===b?n.tables[i]:o}}):n[i]=o)})})}function br(n){n.forEach(function(n){for(var t in n)n[t]instanceof oi&&delete n[t]})}function bi(n,t,i,u,f,e){var s=r.PSD;e=e||tt;n.onerror||(n.onerror=o(f));n.onsuccess=t?d(function(){var r=n.result,o;r?(o=function(){r.continue()},t(r,function(n){o=n},u,f)&&i(e(r.value),r,function(n){o=n}),o()):u()},f,s):d(function(){var t=n.result,r;t?(r=function(){t.continue()},i(e(t.value),t,function(n){r=n}),r()):u()},f,s)}function kr(n){var t=[];return n.split(",").forEach(function(n){n=n.trim();var i=n.replace("&","").replace("++","").replace("*",""),r=i.indexOf("[")!==0?i:n.substring(n.indexOf("[")+1,n.indexOf("]")).split("+");t.push(new a(i,r||null,n.indexOf("&")!==-1,n.indexOf("*")!==-1,n.indexOf("++")!==-1,Array.isArray(r),r.indexOf(".")!==-1))}),t}function ii(n,t){return n<t?-1:n>t?1:0}function fr(n,t){return n<t?1:n>t?-1:0}function er(n){return function(t,i){for(var r=0,u;;){if(u=n(t[r],i[r]),u!==0)return u;if(++r,r===t.length||r===i.length)return n(t.length,i.length)}}}function ki(n,t){return n?t?function(){return n.apply(this,arguments)&&t.apply(this,arguments)}:n:t}function dr(){return navigator.userAgent.indexOf("Trident")>=0||navigator.userAgent.indexOf("MSIE")>=0}function gr(){if(b.verno=it.version/10,b._dbSchema=st={},fi=[].slice.call(it.objectStoreNames,0),fi.length!==0){var n=it.transaction(ot(fi),"readonly");fi.forEach(function(t){for(var u,s,r=n.objectStore(t),i=r.keyPath,f=i&&typeof i=="string"&&i.indexOf(".")!==-1,h=new a(i,i||"",!1,!1,!!r.autoIncrement,i&&typeof i!="string",f),o=[],e=0;e<r.indexNames.length;++e)u=r.index(r.indexNames[e]),i=u.keyPath,f=i&&typeof i=="string"&&i.indexOf(".")!==-1,s=new a(u.name,i,!!u.unique,!!u.multiEntry,!1,i&&typeof i!="string",f),o.push(s);st[t]=new et(t,h,o,{})});ur([dt],b._transPromiseFactory,Object.keys(st),yt,st)}}function or(n,t){for(var i,r,u,o,s=t.db.objectStoreNames,f=0;f<s.length;++f)for(i=s[f],r=t.objectStore(i),u=0;u<r.indexNames.length;++u){var h=r.indexNames[u],e=r.index(h).keyPath,c=typeof e=="string"?e:"["+[].slice.call(e).join("+")+"]";n[i]&&(o=n[i].idxByName[c],o&&(o.name=h))}}var hr=t&&t.addons||u.addons,si=u.dependencies,vi=si.indexedDB,kt=si.IDBKeyRange,nu=si.IDBTransaction,tu=si.DOMError,yi=si.TypeError,nt=si.Error,st=this._dbSchema={},ui=[],fi=[],dt={},di={},it=null,hi=!0,ei=null,pi=!1,ti="readonly",yt="readwrite",b=this,ri=[],ci=!0,sr=!!ct();this.version=function(n){if(it)throw new nt("Cannot add version when database is open");this.verno=Math.max(this.verno,n);var t=ui.filter(function(t){return t._cfg.version===n})[0];return t?t:(t=new gi(n),ui.push(t),ui.sort(wr),t)};s(gi.prototype,{stores:function(n){var i,t;return this._cfg.storesSource=this._cfg.storesSource?s(this._cfg.storesSource,n):n,i={},ui.forEach(function(n){s(i,n._cfg.storesSource)}),t=this._cfg.dbschema={},this._parseStoresSpec(i,t),st=b._dbSchema=t,br([dt,b,di]),ur([di],pr,Object.keys(t),yt,t),ur([dt,b,this._cfg.tables],b._transPromiseFactory,Object.keys(t),yt,t,!0),fi=Object.keys(t),this},upgrade:function(n){var t=this;return k(function(){n(b._createTransaction(yt,Object.keys(t._cfg.dbschema),t._cfg.dbschema))}),this._cfg.contentUpgrade=n,this},_parseStoresSpec:function(n,t){Object.keys(n).forEach(function(i){if(n[i]!==null){var u={},f=kr(n[i]),r=f.shift();if(r.multi)throw new nt("Primary key cannot be multi-valued");r.keyPath&&h(u,r.keyPath,r.auto?0:r.keyPath);f.forEach(function(n){if(n.auto)throw new nt("Only primary key can be marked as autoIncrement (++)");if(!n.keyPath)throw new nt("Index must have a name and cannot be an empty string");h(u,n.keyPath,n.compound?n.keyPath.map(function(){return""}):"")});t[i]=new et(i,r,f,u)}})}});this._allTables=dt;this._tableFactory=function(n,t,i){return n===ti?new oi(t.name,i,t,ai):new wi(t.name,i,t)};this._createTransaction=function(n,t,i,r){return new ir(n,t,i,r)};this._transPromiseFactory=function(n,t,i){var f,u;return!hi||r.PSD&&r.PSD.letThrough?(u=b._createTransaction(n,t,st),u._promise(n,function(n,t){u.error(function(n){b.on("error").fire(n)});i(function(t){u.complete(function(){n(t)})},t,u)})):f=new r(function(r,u){ri.push({resume:function(){var e=b._transPromiseFactory(n,t,i);f.onuncatched=e.onuncatched;e.then(r,u)}})})};this._whenReady=function(n){return!e&&hi&&(!r.PSD||!r.PSD.letThrough)?new r(function(t,i){ri.push({resume:function(){n(t,i)}})}):new r(n)};this.verno=0;this.open=function(){return new r(function(t,i){function f(n){try{u.transaction.abort()}catch(t){}pi=!1;ei=n;hi=!1;i(ei);ri.forEach(function(n){n.resume()});ri=[]}if(e&&t(b),it||pi)throw new nt("Database already opened or being opened");var u,s=!1;try{if(ei=null,pi=!0,ui.length>0&&(ci=!1),!vi)throw new nt("indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using Safari, make sure to include indexedDB polyfill.");if(u=ci?vi.open(n):vi.open(n,Math.round(b.verno*10)),!u)throw new nt("IndexedDB API not available");u.onerror=o(f,["opening database",n]);u.onblocked=function(n){b.on("blocked").fire(n)};u.onupgradeneeded=d(function(t){var i,r;ci&&!b._allowEmptyDB?(u.onerror=function(n){n.preventDefault()},u.transaction.abort(),u.result.close(),i=vi.deleteDatabase(n),i.onsuccess=i.onerror=function(){f(new nt("Database '"+n+"' doesnt exist"))}):(t.oldVersion===0&&(s=!0),u.transaction.onerror=o(f),r=t.oldVersion>Math.pow(2,62)?0:t.oldVersion,lr(r/10,u.transaction,f,u))},f);u.onsuccess=d(function(){pi=!1;it=u.result;ci?gr():it.objectStoreNames.length>0&&or(st,it.transaction(ot(it.objectStoreNames),ti));it.onversionchange=b.on("versionchange").fire;sr||ft(function(t){if(t.indexOf(n)===-1)return t.push(n)});r.newPSD(function(){function i(){hi=!1;ri.forEach(function(n){n.resume()});ri=[];t(b)}r.PSD.letThrough=!0;try{var n=b.on.ready.fire();n&&typeof n.then=="function"?n.then(i,function(n){it.close();it=null;f(n)}):y(i)}catch(u){f(u)}})},f)}catch(h){f(h)}})};this.close=function(){it&&(it.close(),it=null,hi=!0,ei=null)};this.delete=function(){var t=arguments;return new r(function(i,r){function u(){b.close();var t=vi.deleteDatabase(n);t.onsuccess=function(){sr||ft(function(t){var i=t.indexOf(n);if(i>=0)return t.splice(i,1)});i()};t.onerror=o(r,["deleting",n]);t.onblocked=function(){b.on("blocked").fire()}}if(t.length>0)throw new nt("Arguments not allowed in db.delete()");pi?ri.push({resume:u}):u()})};this.backendDB=function(){return it};this.isOpen=function(){return it!==null};this.hasFailed=function(){return ei!==null};this.dynamicallyOpened=function(){return ci};this.name=n;Object.defineProperty(this,"tables",{get:function(){return Object.keys(dt).map(function(n){return dt[n]})}});this.on=v(this,"error","populate","blocked",{ready:[bt,f],versionchange:[pt,f]});this.on.ready.subscribe=w(this.on.ready.subscribe,function(n){return function(t,i){function r(){return i||b.on.ready.unsubscribe(r),t.apply(this,arguments)}n.call(this,r);b.isOpen()&&(hi?ri.push({resume:r}):r())}});k(function(){b.on("populate").fire(b._createTransaction(yt,fi,st));b.on("error").fire(new nt)});this.transaction=function(n,t,i){function s(t,e){var s=null,c,a,h;try{if(f)throw f;s=b._createTransaction(n,o,st,u);c=o.map(function(n){return s.tables[n]});c.push(s);h=0;r.newPSD(function(){r.PSD.trans=s;s.scopeFunc=i;u&&(s.idbtrans=u.idbtrans,s._promise=w(s._promise,function(n){return function(t,i,u){function f(n){return function(t){var i;return r._rootExec(function(){i=n(t);r._tickFinalize(function(){--h==0&&s.active&&(s.active=!1,s.on.complete.fire())})}),i}}return++h,n.call(this,t,function(n,t,r){return i(f(n),f(t),r)},u)}}));s.complete(function(){t(a)});s.error(function(n){s.idbtrans&&(s.idbtrans.onerror=ht);try{s.abort()}catch(i){}u&&(u.active=!1,u.on.error.fire(n));var t=e(n);u||t||b.on.error.fire(n)});r._rootExec(function(){a=i.apply(s,c)})});(!s.idbtrans||u&&h===0)&&s._nop()}catch(l){s&&s.idbtrans&&(s.idbtrans.onerror=ht);s&&s.abort();u&&u.on.error.fire(l);y(function(){e(l)||b.on("error").fire(l)})}}var u,e;t=[].slice.call(arguments,1,arguments.length-1);i=arguments[arguments.length-1];u=r.PSD&&r.PSD.trans;u&&u.db===b&&n.indexOf("!")===-1||(u=null);e=n.indexOf("?")!==-1;n=n.replace("!","").replace("?","");var h=Array.isArray(t[0])?t.reduce(function(n,t){return n.concat(t)}):t,f=null,o=h.map(function(n){return typeof n=="string"?n:(n instanceof oi||(f=f||new yi("Invalid type. Arguments following mode must be instances of Table or String")),n.name)});return n=="r"||n==ti?n=ti:n=="rw"||n==yt?n=yt:f=new nt("Invalid transaction mode: "+n),u&&(f||(u&&u.mode===ti&&n===yt&&(e?u=null:f=f||new nt("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY")),u&&o.forEach(function(n){u.tables.hasOwnProperty(n)||(e?u=null:f=f||new nt("Table "+n+" not included in parent transaction. Parent Transaction function: "+u.scopeFunc.toString()))}))),u?u._promise(n,s,"lock"):b._whenReady(s)};this.table=function(n){if(e&&ci)return new wi(n);if(!dt.hasOwnProperty(n))throw new nt("Table does not exist");return dt[n]};s(oi.prototype,function(){function n(){throw new nt("Current Transaction is READONLY");}return{_trans:function(n,t,i){return this._tpf(n,[this.name],t,i)},_idbstore:function(n,t,i){if(e)return new r(t);var u=this;return this._tpf(n,[this.name],function(n,i,r){t(n,i,r.idbtrans.objectStore(u.name),r)},i)},get:function(n,t){var i=this;return this._idbstore(ti,function(t,r,u){e&&t(i.schema.instanceTemplate);var f=u.get(n);f.onerror=o(r,["getting",n,"from",i.name]);f.onsuccess=function(){t(i.hook.reading.fire(f.result))}}).then(t)},where:function(n){return new li(this,n)},count:function(n){return this.toCollection().count(n)},offset:function(n){return this.toCollection().offset(n)},limit:function(n){return this.toCollection().limit(n)},reverse:function(){return this.toCollection().reverse()},filter:function(n){return this.toCollection().and(n)},each:function(n){var t=this;return e&&n(t.schema.instanceTemplate),this._idbstore(ti,function(i,r,u){var f=u.openCursor();f.onerror=o(r,["calling","Table.each()","on",t.name]);bi(f,null,n,i,r,t.hook.reading.fire)})},toArray:function(n){var t=this;return this._idbstore(ti,function(n,i,r){e&&n([t.schema.instanceTemplate]);var u=[],f=r.openCursor();f.onerror=o(i,["calling","Table.toArray()","on",t.name]);bi(f,null,function(n){u.push(n)},function(){n(u)},i,t.hook.reading.fire)}).then(n)},orderBy:function(n){return new this._collClass(new li(this,n))},toCollection:function(){return new this._collClass(new li(this))},mapToClass:function(n,t){var i,r;return this.schema.mappedClass=n,i=Object.create(n.prototype),t&&ut(i,t),this.schema.instanceTemplate=i,r=function(t){var r,i;if(!t)return t;r=Object.create(n.prototype);for(i in t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r},this.schema.readHook&&this.hook.reading.unsubscribe(this.schema.readHook),this.schema.readHook=r,this.hook("reading",r),n},defineClass:function(n){return this.mapToClass(u.defineClass(n),n)},add:n,put:n,"delete":n,clear:n,update:n}});p(wi).from(oi).extend(function(){return{add:function(n,t){var u=this,r=this.hook.creating.fire;return this._idbstore(yt,function(e,s,l,a){var v={},w,y,p;r!==f&&(w=t||(l.keyPath?c(n,l.keyPath):i),y=r.call(v,w,n,a),w===i&&y!==i&&(l.keyPath?h(n,l.keyPath,y):t=y));p=t?l.add(n,t):l.add(n);p.onerror=o(function(n){if(v.onerror)v.onerror(n);return s(n)},["adding",n,"into",u.name]);p.onsuccess=function(t){var i=l.keyPath;if(i&&h(n,i,t.target.result),v.onsuccess)v.onsuccess(t.target.result);e(p.result)}})},put:function(n,t){var r=this,u=this.hook.creating.fire,e=this.hook.updating.fire;return u!==f||e!==f?this._trans(yt,function(u,f,e){var o=t||r.schema.primKey.keyPath&&c(n,r.schema.primKey.keyPath);o===i?e.tables[r.name].add(n).then(u,f):(e._lock(),n=l(n),e.tables[r.name].where(":id").equals(o).modify(function(){this.value=n}).then(function(i){return i===0?e.tables[r.name].add(n,t):o}).finally(function(){e._unlock()}).then(u,f))}):this._idbstore(yt,function(i,u,f){var e=t?f.put(n,t):f.put(n);e.onerror=o(u,["putting",n,"into",r.name]);e.onsuccess=function(t){var r=f.keyPath;r&&h(n,r,t.target.result);i(e.result)}})},"delete":function(n){return this.hook.deleting.subscribers.length?this.where(":id").equals(n).delete():this._idbstore(yt,function(t,i,r){var u=r.delete(n);u.onerror=o(i,["deleting",n,"from",r.name]);u.onsuccess=function(){t(u.result)}})},clear:function(){return this.hook.deleting.subscribers.length?this.toCollection().delete():this._idbstore(yt,function(n,t,i){var r=i.clear();r.onerror=o(t,["clearing",i.name]);r.onsuccess=function(){n(r.result)}})},update:function(n,t){if(typeof t!="object"||Array.isArray(t))throw new nt("db.update(keyOrObject, modifications). modifications must be an object.");if(typeof n!="object"||Array.isArray(n))return this.where(":id").equals(n).modify(t);Object.keys(t).forEach(function(i){h(n,i,t[i])});var u=c(n,this.schema.primKey.keyPath);return u===i&&r.reject(new nt("Object does not contain its primary key")),this.where(":id").equals(u).modify(t)}}});s(ir.prototype,{_lock:function(){return++this._reculock,this._reculock===1&&r.PSD&&(r.PSD.lockOwnerFor=this),this},_unlock:function(){if(--this._reculock==0)for(r.PSD&&(r.PSD.lockOwnerFor=null);this._blockedFuncs.length>0&&!this._locked();){var n=this._blockedFuncs.shift();try{n()}catch(t){}}return this},_locked:function(){return this._reculock&&(!r.PSD||r.PSD.lockOwnerFor!==this)},_nop:function(n){this.tables[this.storeNames[0]].get(0).then(n)},_promise:function(n,t,i){var f=this;return r.newPSD(function(){var e;return f._locked()?e=new r(function(r,u){f._blockedFuncs.push(function(){f._promise(n,t,i).then(r,u)})}):(e=f.active?new r(function(r,e){if(!f.idbtrans&&n){if(!it)throw ei?new nt("Database not open. Following error in populate, ready or upgrade function made Dexie.open() fail: "+ei):new nt("Database not open");var o=f.idbtrans=it.transaction(ot(f.storeNames),f.mode);o.onerror=function(n){f.on("error").fire(n&&n.target.error);n.preventDefault();f.abort()};o.onabort=function(n){y(function(){f.on("error").fire(new nt("Transaction aborted for unknown reason"))});f.active=!1;f.on("abort").fire(n)};o.oncomplete=function(n){f.active=!1;f.on("complete").fire(n)}}i&&f._lock();try{t(r,e,f)}catch(s){u.ignoreTransaction(function(){f.on("error").fire(s)});f.abort();e(s)}}):r.reject(ni(new nt("Transaction is inactive. Original Scope Function Source: "+f.scopeFunc.toString()))),f.active&&i&&e.finally(function(){f._unlock()})),e.onuncatched=function(n){u.ignoreTransaction(function(){f.on("error").fire(n)});f.abort()},e})},complete:function(n){return this.on("complete",n)},error:function(n){return this.on("error",n)},abort:function(){if(this.idbtrans&&this.active)try{this.active=!1;this.idbtrans.abort();this.on.error.fire(new nt("Transaction Aborted"))}catch(n){}},table:function(n){if(!this.tables.hasOwnProperty(n))throw new nt("Table "+n+" not in transaction");return this.tables[n]}});s(li.prototype,function(){function n(n,t){try{throw t;}catch(i){n._ctx.error=i}return n}function t(n){return Array.prototype.slice.call(n.length===1&&Array.isArray(n[0])?n[0]:n)}function r(n){return n==="next"?function(n){return n.toUpperCase()}:function(n){return n.toLowerCase()}}function u(n){return n==="next"?function(n){return n.toLowerCase()}:function(n){return n.toUpperCase()}}function f(n,t,i,r,u,f){for(var h,s=Math.min(n.length,r.length),o=-1,e=0;e<s;++e){if(h=t[e],h!==r[e])return u(n[e],i[e])<0?n.substr(0,e)+i[e]+i.substr(e+1):u(n[e],r[e])<0?n.substr(0,e)+r[e]+i.substr(e+1):o>=0?n.substr(0,o)+t[o]+i.substr(o+1):null;u(n[e],h)<0&&(o=e)}return s<r.length&&f==="next"?n+i.substr(n.length):s<n.length&&f==="prev"?n.substr(0,i.length):o<0?null:n.substr(0,o)+r[o]+i.substr(o+1)}function i(n,t,i){function a(n){s=r(n);e=u(n);h=n==="next"?ii:fr;c=s(i);o=e(i);l=n}var s,e,h,c,o,l;a("next");n._ondirectionchange=function(n){a(n)};n._addAlgorithm(function(n,i,r){var u=n.key,s,a;return typeof u!="string"?!1:(s=e(u),t(s,o)?(i(function(){n.continue()}),!0):(a=f(u,s,c,o,h,l),a?i(function(){n.continue(a)}):i(r),!1))})}return{between:function(n,t,i,r){return(i=i!==!1,r=r===!0,n>t||n===t&&(i||r)&&!(i&&r))?new this._ctx.collClass(this,function(){return kt.only(n)}).limit(0):new this._ctx.collClass(this,function(){return kt.bound(n,t,!i,!r)})},equals:function(n){return new this._ctx.collClass(this,function(){return kt.only(n)})},above:function(n){return new this._ctx.collClass(this,function(){return kt.lowerBound(n,!0)})},aboveOrEqual:function(n){return new this._ctx.collClass(this,function(){return kt.lowerBound(n)})},below:function(n){return new this._ctx.collClass(this,function(){return kt.upperBound(n,!0)})},belowOrEqual:function(n){return new this._ctx.collClass(this,function(){return kt.upperBound(n)})},startsWith:function(t){return typeof t!="string"?n(new this._ctx.collClass(this),new yi("String expected")):this.between(t,t+String.fromCharCode(65535),!0,!0)},startsWithIgnoreCase:function(t){if(typeof t!="string")return n(new this._ctx.collClass(this),new yi("String expected"));if(t==="")return this.startsWith(t);var r=new this._ctx.collClass(this,function(){return kt.bound(t.toUpperCase(),t.toLowerCase()+String.fromCharCode(65535))});return i(r,function(n,t){return n.indexOf(t)===0},t),r._ondirectionchange=function(){n(r,new nt("reverse() not supported with WhereClause.startsWithIgnoreCase()"))},r},equalsIgnoreCase:function(t){if(typeof t!="string")return n(new this._ctx.collClass(this),new yi("String expected"));var r=new this._ctx.collClass(this,function(){return kt.bound(t.toUpperCase(),t.toLowerCase())});return i(r,function(n,t){return n===t},t),r},anyOf:function(){var f=this._ctx,e=f.table.schema,o=f.index?e.idxByName[f.index]:e.primKey,s=o&&o.compound,n=t(arguments),i=s?er(ii):ii,u,r;return(n.sort(i),n.length===0)?new this._ctx.collClass(this,function(){return kt.only("")}).limit(0):(u=new this._ctx.collClass(this,function(){return kt.bound(n[0],n[n.length-1])}),u._ondirectionchange=function(t){i=t==="next"?ii:fr;s&&(i=er(i));n.sort(i)},r=0,u._addAlgorithm(function(t,u,f){for(var e=t.key;i(e,n[r])>0;)if(++r,r===n.length)return u(f),!1;return i(e,n[r])===0?(u(function(){t.continue()}),!0):(u(function(){t.continue(n[r])}),!1)}),u)},notEqual:function(n){return this.below(n).or(this._ctx.index).above(n)},noneOf:function(){var i=this._ctx,f=i.table.schema,e=i.index?f.idxByName[i.index]:f.primKey,h=e&&e.compound,n=t(arguments),o,r,s,u;return n.length===0?new this._ctx.collClass(this):(o=h?er(ii):ii,n.sort(o),r=n.reduce(function(n,t){return n?n.concat([[n[n.length-1][1],t]]):[[null,t]]},null),r.push([n[n.length-1],null]),s=this,u=i.index,r.reduce(function(n,t){return n?t[1]===null?n.or(u).above(t[0]):n.or(u).between(t[0],t[1],!1,!1):s.below(t[1])},null))},startsWithAnyOf:function(){function h(n){return n>f[r]}function c(n){return n<i[r]}var s=this._ctx,i=t(arguments),f,u,r,e,o;return i.every(function(n){return typeof n=="string"})?i.length===0?new s.collClass(this,function(){return kt.only("")}).limit(0):(f=i.map(function(n){return n+String.fromCharCode(65535)}),u=ii,i.sort(u),r=0,e=h,o=new s.collClass(this,function(){return kt.bound(i[0],i[i.length-1]+String.fromCharCode(65535))}),o._ondirectionchange=function(n){n==="next"?(e=h,u=ii):(e=c,u=fr);i.sort(u);f.sort(u)},o._addAlgorithm(function(n,t,o){for(var s=n.key;e(s);)if(++r,r===i.length)return t(o),!1;return s>=i[r]&&s<=f[r]?(t(function(){n.continue()}),!0):(t(function(){u===ii?n.continue(i[r]):n.continue(f[r])}),!1)}),o):n(new s.collClass(this),new yi("startsWithAnyOf() only works with strings"))}}});s(ai.prototype,function(){function n(n,t){n.filter=ki(n.filter,t)}function s(n,t){n.isMatch=ki(n.isMatch,t)}function u(n,t){if(n.isPrimKey)return t;var i=n.table.schema.idxByName[n.index];if(!i)throw new nt("KeyPath "+n.index+" on object store "+t.name+" is not indexed");return n.isPrimKey?t:t.index(i.name)}function f(n,t){return u(n,t)[n.op](n.range||null,n.dir+n.unique)}function i(n,t,i,r,u){n.or?function(){function e(){++c==2&&i()}function h(n,i,u){if(!o||o(i,u,e,r)){var f=i.primaryKey.toString();s.hasOwnProperty(f)||(s[f]=!0,t(n,i,u))}}var o=n.filter,s={},l=n.table.schema.primKey.keyPath,c=0;n.or._iterate(h,e,r,u);bi(f(n,u),n.algorithm,h,e,r,n.table.hook.reading.fire)}():bi(f(n,u),ki(n.algorithm,n.filter),t,i,r,n.table.hook.reading.fire)}function t(n){return n.table.schema.instanceTemplate}return{_read:function(n,t){var i=this._ctx;return i.error?i.table._trans(null,function(n,t){t(i.error)}):i.table._idbstore(ti,n).then(t)},_write:function(n){var t=this._ctx;return t.error?t.table._trans(null,function(n,i){i(t.error)}):t.table._idbstore(yt,n,"locked")},_addAlgorithm:function(n){var t=this._ctx;t.algorithm=ki(t.algorithm,n)},_iterate:function(n,t,r,u){return i(this._ctx,n,t,r,u)},each:function(n){var r=this._ctx;return e&&n(t(r)),this._read(function(t,u,f){i(r,n,t,u,f)})},count:function(n){var s,t,f;return e?r.resolve(0).then(n):(s=this,t=this._ctx,t.filter||t.algorithm||t.or?(f=0,this._read(function(n,r,u){i(t,function(){return++f,!1},function(){n(f)},r,u)},n)):this._read(function(n,i,r){var f=u(t,r),e=t.range?f.count(t.range):f.count();e.onerror=o(i,["calling","count()","on",s.name]);e.onsuccess=function(i){n(Math.min(i.target.result,Math.max(0,t.limit-t.offset)))}},n))},sortBy:function(n,t){function r(n,t){return t?r(n[i[t]],t-1):n[e]}function o(n,t){var i=r(n,u),e=r(t,u);return i<e?-f:i>e?f:0}var s=this._ctx,i=n.split(".").reverse(),e=i[0],u=i.length-1,f=this._ctx.dir==="next"?1:-1;return this.toArray(function(n){return n.sort(o)}).then(t)},toArray:function(n){var r=this._ctx;return this._read(function(n,u,f){e&&n([t(r)]);var o=[];i(r,function(n){o.push(n)},function(){n(o)},u,f)},n)},offset:function(t){var i=this._ctx;return t<=0?this:(i.offset+=t,i.or||i.algorithm||i.filter?n(i,function(){return--t<0}):n(i,function(n,i){return t===0?!0:t===1?(--t,!1):(i(function(){n.advance(t);t=0}),!1)}),this)},limit:function(t){return this._ctx.limit=Math.min(this._ctx.limit,t),n(this._ctx,function(n,i,r){return--t<=0&&i(r),t>=0}),this},until:function(i,r){var u=this._ctx;return e&&i(t(u)),n(this._ctx,function(n,t,u){return i(n.value)?(t(u),r):!0}),this},first:function(n){return this.limit(1).toArray(function(n){return n[0]}).then(n)},last:function(n){return this.reverse().first(n)},and:function(i){return e&&i(t(this._ctx)),n(this._ctx,function(n){return i(n.value)}),s(this._ctx,i),this},or:function(n){return new li(this._ctx.table,n,this)},reverse:function(){return this._ctx.dir=this._ctx.dir==="prev"?"next":"prev",this._ondirectionchange&&this._ondirectionchange(this._ctx.dir),this},desc:function(){return this.reverse()},eachKey:function(n){var i=this._ctx;return e&&n(c(t(this._ctx),this._ctx.index?this._ctx.table.schema.idxByName[this._ctx.index].keyPath:this._ctx.table.schema.primKey.keyPath)),i.isPrimKey||(i.op="openKeyCursor"),this.each(function(t,i){n(i.key,i)})},eachUniqueKey:function(n){return this._ctx.unique="unique",this.eachKey(n)},keys:function(n){var i=this._ctx,t;return(i.isPrimKey||(i.op="openKeyCursor"),t=[],e)?new r(this.eachKey.bind(this)).then(function(n){return[n]}).then(n):this.each(function(n,i){t.push(i.key)}).then(function(){return t}).then(n)},uniqueKeys:function(n){return this._ctx.unique="unique",this.keys(n)},firstKey:function(n){return this.limit(1).keys(function(n){return n[0]}).then(n)},lastKey:function(n){return this.reverse().firstKey(n)},distinct:function(){var t={};return n(this._ctx,function(n){var i=n.primaryKey.toString(),r=t.hasOwnProperty(i);return t[i]=!0,!r}),this}}});p(rr).from(ai).extend({modify:function(n){var a=this,t=this._ctx,r=t.table.hook,i=r.updating.fire,u=r.deleting.fire;return e&&typeof n=="function"&&n.call({value:t.table.schema.instanceTemplate},t.table.schema.instanceTemplate),this._write(function(r,e,v,y){function st(n,i){var r,u,f;if(et=i.primaryKey,r={primKey:i.primaryKey,value:n},w.call(r,n)!==!1)u=!r.hasOwnProperty("value"),f=u?i.delete():i.update(r.value),++ut,f.onerror=o(function(n){if(p.push(n),nt.push(r.primKey),r.onerror)r.onerror(n);return tt(),!0},u?["deleting",n,"from",t.table.name]:["modifying",n,"on",t.table.name]),f.onsuccess=function(){if(r.onsuccess)r.onsuccess(r.value);++b;tt()};else if(r.onsuccess)r.onsuccess(r.value)}function ot(n){return n&&(p.push(n),nt.push(et)),e(new g("Error modifying one or more objects",p,b,nt))}function tt(){ft&&b+p.length===ut&&(p.length>0?ot():r(b))}var w,k,it,d;typeof n=="function"?w=i===f&&u===f?n:function(t){var f=l(t),e,r;if(n.call(this,t)===!1)return!1;this.hasOwnProperty("value")?(e=gt(f,this.value),r=i.call(this,e,this.primKey,f,y),r&&(t=this.value,Object.keys(r).forEach(function(n){h(t,n,r[n])}))):u.call(this,this.primKey,t,y)}:i===f?(k=Object.keys(n),it=k.length,w=function(t){for(var i,u,f=!1,r=0;r<it;++r)i=k[r],u=n[i],c(t,i)!==u&&(h(t,i,u),f=!0);return f}):(d=n,n=rt(d),w=function(t){var u=!1,r=i.call(this,n,this.primKey,l(t),y);return r&&s(n,r),Object.keys(n).forEach(function(i){var r=n[i];c(t,i)!==r&&(h(t,i,r),u=!0)}),r&&(n=rt(d)),u});var ut=0,b=0,ft=!1,p=[],nt=[],et=null;a._iterate(st,function(){ft=!0;tt()},ot,v)})},"delete":function(){return this.modify(function(){delete this.value})}});s(this,{Collection:ai,Table:oi,Transaction:ir,Version:gi,WhereClause:li,WriteableCollection:rr,WriteableTable:wi});cr();hr.forEach(function(n){n(b)})}function f(){}function tt(n){return n}function lt(n,t){return n===tt?t:function(i){return t(n(i))}}function b(n,t){return function(){n.apply(this,arguments);t.apply(this,arguments)}}function at(n,t){return n===f?t:function(){var f=n.apply(this,arguments),r,u,e;return f!==i&&(arguments[0]=f),r=this.onsuccess,u=this.onerror,delete this.onsuccess,delete this.onerror,e=t.apply(this,arguments),r&&(this.onsuccess=this.onsuccess?b(r,this.onsuccess):r),u&&(this.onerror=this.onerror?b(u,this.onerror):u),e!==i?e:f}}function vt(n,t){return n===f?t:function(){var r=n.apply(this,arguments),f,e,u;return r!==i&&s(arguments[0],r),f=this.onsuccess,e=this.onerror,delete this.onsuccess,delete this.onerror,u=t.apply(this,arguments),f&&(this.onsuccess=this.onsuccess?b(f,this.onsuccess):f),e&&(this.onerror=this.onerror?b(e,this.onerror):e),r===i?u===i?i:u:u===i?r:s(r,u)}}function yt(n,t){return n===f?t:function(){return n.apply(this,arguments)===!1?!1:t.apply(this,arguments)}}function pt(n,t){return n===f?t:function(){return t.apply(this,arguments)===!1?!1:n.apply(this,arguments)}}function wt(n,t){return n===f?t:function(){n.apply(this,arguments);t.apply(this,arguments)}}function bt(n,t){return n===f?t:function(){var i=n.apply(this,arguments),r,u;return i&&typeof i.then=="function"?(r=this,u=arguments,i.then(function(){return t.apply(r,u)})):t.apply(this,arguments)}}function v(t){function i(n,t,i){if(Array.isArray(n))return c(n);if(typeof n=="object")return h(n);t||(t=yt);i||(i=f);var r={subscribers:[],fire:i,subscribe:function(n){r.subscribers.push(n);r.fire=t(r.fire,n)},unsubscribe:function(n){r.subscribers=r.subscribers.filter(function(t){return t!==n});r.fire=r.subscribers.reduce(t,i)}};return u[n]=e[n]=r,r}function h(t){Object.keys(t).forEach(function(r){var f=t[r],u;if(Array.isArray(f))i(r,t[r][0],t[r][1]);else if(f==="asap")u=i(r,null,function(){var t=arguments;u.subscribers.forEach(function(i){y(function(){i.apply(n,t)})})}),u.subscribe=function(n){u.subscribers.indexOf(n)===-1&&u.subscribers.push(n)},u.unsubscribe=function(n){var t=u.subscribers.indexOf(n);t!==-1&&u.subscribers.splice(t,1)};else throw new Error("Invalid event config");})}function c(n){function r(){if(t)return!1;t=!0}var t=!1;n.forEach(function(n){i(n).subscribe(r)})}var o=arguments,u={},e=function(n,i){if(i){var f=[].slice.call(arguments,1),r=u[n];return r.subscribe.apply(r,f),t}if(typeof n=="string")return u[n]},r,s;for(e.addEventType=i,r=1,s=o.length;r<s;++r)i(o[r]);return e}function kt(n){if(!n)throw new Error("Assertion failed");}function y(t){n.setImmediate?setImmediate(t):setTimeout(t,0)}function it(n){var t=setTimeout(n,1e3);clearTimeout(t)}function d(n,t,i){return function(){var u=r.PSD;r.PSD=i;try{n.apply(this,arguments)}catch(f){t(f)}finally{r.PSD=u}}}function c(n,t){var f,r,o,s,u,e;if(n.hasOwnProperty(t))return n[t];if(!t)return n;if(typeof t!="string"){for(f=[],r=0,o=t.length;r<o;++r)s=c(n,t[r]),f.push(s);return f}return(u=t.indexOf("."),u!==-1)?(e=n[t.substr(0,u)],e===i?i:c(e,t.substr(u+1))):i}function h(n,t,r){var u,c,e,f,s,o;if(n&&t!==i)if(typeof t!="string"&&"length"in t)for(kt(typeof r!="string"&&"length"in r),u=0,c=t.length;u<c;++u)h(n,t[u],r[u]);else e=t.indexOf("."),e!==-1?(f=t.substr(0,e),s=t.substr(e+1),s===""?r===i?delete n[f]:n[f]=r:(o=n[f],o||(o=n[f]={}),h(o,s,r))):r===i?delete n[t]:n[t]=r}function dt(n,t){typeof t=="string"?h(n,t,i):"length"in t&&[].map.call(t,function(t){h(n,t,i)})}function rt(n){var i={};for(var t in n)n.hasOwnProperty(t)&&(i[t]=n[t]);return i}function l(n){var t,i,u,r;if(!n||typeof n!="object")return n;if(Array.isArray(n))for(t=[],i=0,u=n.length;i<u;++i)t.push(l(n[i]));else if(n instanceof Date)t=new Date,t.setTime(n.getTime());else{t=n.constructor?Object.create(n.constructor.prototype):{};for(r in n)n.hasOwnProperty(r)&&(t[r]=l(n[r]))}return t}function gt(n,t){var u={};for(var r in n)n.hasOwnProperty(r)&&(t.hasOwnProperty(r)?n[r]!==t[r]&&JSON.stringify(n[r])!=JSON.stringify(t[r])&&(u[r]=t[r]):u[r]=i);for(r in t)t.hasOwnProperty(r)&&!n.hasOwnProperty(r)&&(u[r]=t[r]);return u}function st(n){if(typeof n=="function")return new n;if(Array.isArray(n))return[st(n[0])];if(n&&typeof n=="object"){var t={};return ut(t,n),t}return n}function ut(n,t){Object.keys(t).forEach(function(i){var r=st(t[i]);n[i]=r})}function o(n,t){return function(i){var r=i&&i.target.error||new Error,u;return t&&(u=" occurred when "+t.map(function(n){switch(typeof n){case"function":return n();case"string":return n;default:return JSON.stringify(n)}}).join(" "),r.name?r.toString=function(){return r.name+u+(r.message?". "+r.message:"")}:r=r+u),n(r),i&&(i.stopPropagation&&i.stopPropagation(),i.preventDefault&&i.preventDefault()),!1}}function ni(n){try{throw n;}catch(t){return t}}function ht(n){n.preventDefault()}function ft(n){var t,i=u.dependencies.localStorage;if(!i)return n([]);try{t=JSON.parse(i.getItem("Dexie.DatabaseNames")||"[]")}catch(r){t=[]}n(t)&&i.setItem("Dexie.DatabaseNames",JSON.stringify(t))}function a(n,t,i,r,u,f,e){this.name=n;this.keyPath=t;this.unique=i;this.multi=r;this.auto=u;this.compound=f;this.dotted=e;var o=typeof t=="string"?t:t&&"["+[].join.call(t,"+")+"]";this.src=(i?"&":"")+(r?"*":"")+(u?"++":"")+o}function et(n,t,i,r){this.name=n;this.primKey=t||new a;this.indexes=i||[new a];this.instanceTemplate=r;this.mappedClass=null;this.idxByName=i.reduce(function(n,t){return n[t.name]=t,n},{})}function g(n,t,i,r){this.name="ModifyError";this.failures=t;this.failedKeys=r;this.successCount=i;this.message=t.join("\n")}function ot(n){return n.length===1?n[0]:n}function ct(){var n=u.dependencies.indexedDB,t=n&&(n.getDatabaseNames||n.webkitGetDatabaseNames);return t&&t.bind(n)}var r=function(){function l(n){u.push([n,c.call(arguments,1)])}function p(){var r=u,t,f,i;for(u=[],t=0,f=r.length;t<f;++t)i=r[t],i[0].apply(n,i[1])}function t(n){if(typeof this!="object")throw new TypeError("Promises must be constructed via new");if(typeof n!="function")throw new TypeError("not a function");this._state=null;this._value=null;this._deferreds=[];this._catched=!1;var r=this,u=!0;this._PSD=t.PSD;try{k(this,n,function(n){u?i(a,r,n):a(r,n)},function(n){return u?(i(h,r,n),!1):h(r,n)})}finally{u=!1}}function s(n,f){var h,s,a,v,b,c;if(n._state===null){n._deferreds.push(f);return}if(h=n._state?f.onFulfilled:f.onRejected,h===null)return(n._state?f.resolve:f.reject)(n._value);a=r;r=!1;i=l;try{v=t.PSD;t.PSD=n._PSD;s=h(n._value);n._state||s&&typeof s.then=="function"&&s._state===!1||w(n);f.resolve(s)}catch(y){if(b=f.reject(y),!b&&n.onuncatched)try{n.onuncatched(y)}catch(y){}}finally{if(t.PSD=v,a){do{while(u.length>0)p();if(c=e.pop(),c)try{c()}catch(y){}}while(e.length>0||u.length>0);i=o;r=!0}}}function d(n){var f=r,t;r=!1;i=l;try{n()}finally{if(f){do{while(u.length>0)p();if(t=e.pop(),t)try{t()}catch(s){}}while(e.length>0||u.length>0);i=o;r=!0}}}function w(n){n._catched=!0;n._parent&&w(n._parent)}function a(n,i){var r=t.PSD;t.PSD=n._PSD;try{if(i===n)throw new TypeError("A promise cannot be resolved with itself.");if(i&&(typeof i=="object"||typeof i=="function")&&typeof i.then=="function"){k(n,function(n,t){i.then(n,t)},function(t){a(n,t)},function(t){h(n,t)});return}n._state=!0;n._value=i;b.call(n)}catch(u){h(u)}finally{t.PSD=r}}function h(n,i){var r=t.PSD;if(t.PSD=n._PSD,n._state=!1,n._value=i,b.call(n),!n._catched)try{if(n.onuncatched)n.onuncatched(n._value);t.on.error.fire(n._value)}catch(u){}return t.PSD=r,n._catched}function b(){for(var n=0,t=this._deferreds.length;n<t;n++)s(this,this._deferreds[n]);this._deferreds=[]}function y(n,t,i,r){this.onFulfilled=typeof n=="function"?n:null;this.onRejected=typeof t=="function"?t:null;this.resolve=i;this.reject=r}function k(n,t,i,r){var u=!1;try{t(function(n){u||(u=!0,i(n))},function(t){return u?n._catched:(u=!0,r(t))})}catch(f){return u?void 0:r(f)}}var c=[].slice,o=typeof setImmediate=="undefined"?function(t){var i=arguments;setTimeout(function(){t.apply(n,c.call(i,1))},0)}:setImmediate;it(function(){o=i=l=function(t){var i=arguments;setTimeout(function(){t.apply(n,c.call(i,1))},0)}});var i=o,r=!0,u=[],e=[];return t.on=v(null,"error"),t.all=function(){var n=Array.prototype.slice.call(arguments.length===1&&Array.isArray(arguments[0])?arguments[0]:arguments);return new t(function(t,i){function f(r,e){try{if(e&&(typeof e=="object"||typeof e=="function")){var o=e.then;if(typeof o=="function"){o.call(e,function(n){f(r,n)},i);return}}n[r]=e;--u==0&&t(n)}catch(s){i(s)}}var u,r;if(n.length===0)return t([]);for(u=n.length,r=0;r<n.length;r++)f(r,n[r])})},t.prototype.then=function(n,r){var f=this,u=new t(function(t,u){f._state===null?s(f,new y(n,r,t,u)):i(s,f,new y(n,r,t,u))});return u._PSD=this._PSD,u.onuncatched=this.onuncatched,u._parent=this,u},t.prototype._then=function(n,t){s(this,new y(n,t,f,f))},t.prototype["catch"]=function(n){if(arguments.length===1)return this.then(null,n);var i=arguments[0],r=arguments[1];return typeof i=="function"?this.then(null,function(n){return n instanceof i?r(n):t.reject(n)}):this.then(null,function(n){return n&&n.name===i?r(n):t.reject(n)})},t.prototype["finally"]=function(n){return this.then(function(t){return n(),t},function(i){return n(),t.reject(i)})},t.prototype.onuncatched=null,t.resolve=function(n){var i=new t(function(){});return i._state=!0,i._value=n,i},t.reject=function(n){var i=new t(function(){});return i._state=!1,i._value=n,i},t.race=function(n){return new t(function(t,i){n.map(function(n){n.then(t,i)})})},t.PSD=null,t.newPSD=function(n){var i=t.PSD;t.PSD=i?Object.create(i):{};try{return n()}finally{t.PSD=i}},t._rootExec=d,t._tickFinalize=function(n){if(r)throw new Error("Not in a virtual tick");e.push(n)},t}(),k=function(){},e=!1,nt;p(g).from(Error);u.delete=function(n){var t=new u(n),i=t.delete();return i.onblocked=function(n){t.on("blocked",n);return this},i};u.exists=function(n){return new u(n).open().then(function(n){return n.close(),!0},function(){return!1})};u.getDatabaseNames=function(n){return new r(function(n,t){var r=ct(),i;r?(i=r(),i.onsuccess=function(t){n([].slice.call(t.target.result,0))},i.onerror=o(t)):ft(function(t){return n(t),!1})}).then(n)};u.defineClass=function(n){function t(t){t?s(this,t):e&&ut(this,n)}return t};u.ignoreTransaction=function(n){return r.newPSD(function(){return r.PSD.trans=null,n()})};u.spawn=function(){return n.console&&console.warn("Dexie.spawn() is deprecated. Use Dexie.ignoreTransaction() instead."),u.ignoreTransaction.apply(this,arguments)};u.vip=function(n){return r.newPSD(function(){return r.PSD.letThrough=!0,n()})};Object.defineProperty(u,"currentTransaction",{get:function(){return r.PSD&&r.PSD.trans||null}});u.Promise=r;u.derive=p;u.extend=s;u.override=w;u.events=v;u.getByKeyPath=c;u.setByKeyPath=h;u.delByKeyPath=dt;u.shallowClone=rt;u.deepClone=l;u.addons=[];u.fakeAutoComplete=k;u.asap=y;u.ModifyError=g;u.MultiModifyError=g;u.IndexSpec=a;u.TableSchema=et;nt=n.idbModules&&n.idbModules.shimIndexedDB?n.idbModules:{};u.dependencies={indexedDB:nt.shimIndexedDB||n.indexedDB||n.mozIndexedDB||n.webkitIndexedDB||n.msIndexedDB,IDBKeyRange:nt.IDBKeyRange||n.IDBKeyRange||n.webkitIDBKeyRange,IDBTransaction:nt.IDBTransaction||n.IDBTransaction||n.webkitIDBTransaction,Error:n.Error||String,SyntaxError:n.SyntaxError||String,TypeError:n.TypeError||String,DOMError:n.DOMError||String,localStorage:(typeof chrome!="undefined"&&chrome!==null?chrome.storage:void 0)!=null?null:n.localStorage};u.version=1.2;t("Dexie",u);it(function(){u.fakeAutoComplete=k=it;u.fake=e=!0})}).apply(null,typeof define=="function"&&define.amd?[self||window,function(n,t){define(function(){return t})}]:typeof global!="undefined"&&typeof module!="undefined"&&module.exports?[global,function(n,t){module.exports=t}]:[self||window,function(n,t){(self||window)[n]=t}]);

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getMMMDDYYYY(t){
  var date = t ? new Date(t) : new Date();
  return monthNames[date.getMonth()] + " " +  zeroPad(date.getDate(), 2) + ", " + date.getFullYear();
}

function getFormattedDate(t) {
  var date = t ? (new Date(t)) : (new Date());
  var str = zeroPad(date.getHours(),2) + ":" + zeroPad(date.getMinutes(),2) + ":" + zeroPad(date.getSeconds(),2);
  return str;
}
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
function htmlEncode(value){
  return $('<div/>').text(value).html();
}