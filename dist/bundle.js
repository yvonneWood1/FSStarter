(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
var Observable_1 = require("./internal/Observable");
Object.defineProperty(exports, "Observable", { enumerable: true, get: function () { return Observable_1.Observable; } });
var ConnectableObservable_1 = require("./internal/observable/ConnectableObservable");
Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } });
var observable_1 = require("./internal/symbol/observable");
Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return observable_1.observable; } });
var animationFrames_1 = require("./internal/observable/dom/animationFrames");
Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function () { return animationFrames_1.animationFrames; } });
var Subject_1 = require("./internal/Subject");
Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
var BehaviorSubject_1 = require("./internal/BehaviorSubject");
Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } });
var ReplaySubject_1 = require("./internal/ReplaySubject");
Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } });
var AsyncSubject_1 = require("./internal/AsyncSubject");
Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } });
var asap_1 = require("./internal/scheduler/asap");
Object.defineProperty(exports, "asap", { enumerable: true, get: function () { return asap_1.asap; } });
Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function () { return asap_1.asapScheduler; } });
var async_1 = require("./internal/scheduler/async");
Object.defineProperty(exports, "async", { enumerable: true, get: function () { return async_1.async; } });
Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function () { return async_1.asyncScheduler; } });
var queue_1 = require("./internal/scheduler/queue");
Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function () { return queue_1.queueScheduler; } });
var animationFrame_1 = require("./internal/scheduler/animationFrame");
Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function () { return animationFrame_1.animationFrame; } });
Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } });
var VirtualTimeScheduler_1 = require("./internal/scheduler/VirtualTimeScheduler");
Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } });
Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } });
var Scheduler_1 = require("./internal/Scheduler");
Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Scheduler_1.Scheduler; } });
var Subscription_1 = require("./internal/Subscription");
Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });
var Subscriber_1 = require("./internal/Subscriber");
Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function () { return Subscriber_1.Subscriber; } });
var Notification_1 = require("./internal/Notification");
Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return Notification_1.Notification; } });
Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function () { return Notification_1.NotificationKind; } });
var pipe_1 = require("./internal/util/pipe");
Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_1.pipe; } });
var noop_1 = require("./internal/util/noop");
Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return noop_1.noop; } });
var identity_1 = require("./internal/util/identity");
Object.defineProperty(exports, "identity", { enumerable: true, get: function () { return identity_1.identity; } });
var isObservable_1 = require("./internal/util/isObservable");
Object.defineProperty(exports, "isObservable", { enumerable: true, get: function () { return isObservable_1.isObservable; } });
var lastValueFrom_1 = require("./internal/lastValueFrom");
Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } });
var firstValueFrom_1 = require("./internal/firstValueFrom");
Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } });
var ArgumentOutOfRangeError_1 = require("./internal/util/ArgumentOutOfRangeError");
Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } });
var EmptyError_1 = require("./internal/util/EmptyError");
Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function () { return EmptyError_1.EmptyError; } });
var NotFoundError_1 = require("./internal/util/NotFoundError");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
var ObjectUnsubscribedError_1 = require("./internal/util/ObjectUnsubscribedError");
Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } });
var SequenceError_1 = require("./internal/util/SequenceError");
Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function () { return SequenceError_1.SequenceError; } });
var timeout_1 = require("./internal/operators/timeout");
Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return timeout_1.TimeoutError; } });
var UnsubscriptionError_1 = require("./internal/util/UnsubscriptionError");
Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } });
var bindCallback_1 = require("./internal/observable/bindCallback");
Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function () { return bindCallback_1.bindCallback; } });
var bindNodeCallback_1 = require("./internal/observable/bindNodeCallback");
Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } });
var combineLatest_1 = require("./internal/observable/combineLatest");
Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
var concat_1 = require("./internal/observable/concat");
Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
var connectable_1 = require("./internal/observable/connectable");
Object.defineProperty(exports, "connectable", { enumerable: true, get: function () { return connectable_1.connectable; } });
var defer_1 = require("./internal/observable/defer");
Object.defineProperty(exports, "defer", { enumerable: true, get: function () { return defer_1.defer; } });
var empty_1 = require("./internal/observable/empty");
Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return empty_1.empty; } });
var forkJoin_1 = require("./internal/observable/forkJoin");
Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function () { return forkJoin_1.forkJoin; } });
var from_1 = require("./internal/observable/from");
Object.defineProperty(exports, "from", { enumerable: true, get: function () { return from_1.from; } });
var fromEvent_1 = require("./internal/observable/fromEvent");
Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function () { return fromEvent_1.fromEvent; } });
var fromEventPattern_1 = require("./internal/observable/fromEventPattern");
Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } });
var generate_1 = require("./internal/observable/generate");
Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generate_1.generate; } });
var iif_1 = require("./internal/observable/iif");
Object.defineProperty(exports, "iif", { enumerable: true, get: function () { return iif_1.iif; } });
var interval_1 = require("./internal/observable/interval");
Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
var merge_1 = require("./internal/observable/merge");
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
var never_1 = require("./internal/observable/never");
Object.defineProperty(exports, "never", { enumerable: true, get: function () { return never_1.never; } });
var of_1 = require("./internal/observable/of");
Object.defineProperty(exports, "of", { enumerable: true, get: function () { return of_1.of; } });
var onErrorResumeNext_1 = require("./internal/observable/onErrorResumeNext");
Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } });
var pairs_1 = require("./internal/observable/pairs");
Object.defineProperty(exports, "pairs", { enumerable: true, get: function () { return pairs_1.pairs; } });
var partition_1 = require("./internal/observable/partition");
Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
var race_1 = require("./internal/observable/race");
Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
var range_1 = require("./internal/observable/range");
Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
var throwError_1 = require("./internal/observable/throwError");
Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return throwError_1.throwError; } });
var timer_1 = require("./internal/observable/timer");
Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return timer_1.timer; } });
var using_1 = require("./internal/observable/using");
Object.defineProperty(exports, "using", { enumerable: true, get: function () { return using_1.using; } });
var zip_1 = require("./internal/observable/zip");
Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
var scheduled_1 = require("./internal/scheduled/scheduled");
Object.defineProperty(exports, "scheduled", { enumerable: true, get: function () { return scheduled_1.scheduled; } });
var empty_2 = require("./internal/observable/empty");
Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function () { return empty_2.EMPTY; } });
var never_2 = require("./internal/observable/never");
Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return never_2.NEVER; } });
__exportStar(require("./internal/types"), exports);
var config_1 = require("./internal/config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });

},{"./internal/AsyncSubject":3,"./internal/BehaviorSubject":4,"./internal/Notification":5,"./internal/Observable":7,"./internal/ReplaySubject":8,"./internal/Scheduler":9,"./internal/Subject":10,"./internal/Subscriber":11,"./internal/Subscription":12,"./internal/config":13,"./internal/firstValueFrom":14,"./internal/lastValueFrom":15,"./internal/observable/ConnectableObservable":16,"./internal/observable/bindCallback":17,"./internal/observable/bindNodeCallback":19,"./internal/observable/combineLatest":20,"./internal/observable/concat":21,"./internal/observable/connectable":22,"./internal/observable/defer":23,"./internal/observable/dom/animationFrames":24,"./internal/observable/empty":25,"./internal/observable/forkJoin":26,"./internal/observable/from":27,"./internal/observable/fromEvent":29,"./internal/observable/fromEventPattern":30,"./internal/observable/generate":31,"./internal/observable/iif":32,"./internal/observable/interval":33,"./internal/observable/merge":34,"./internal/observable/never":35,"./internal/observable/of":36,"./internal/observable/onErrorResumeNext":37,"./internal/observable/pairs":38,"./internal/observable/partition":39,"./internal/observable/race":40,"./internal/observable/range":41,"./internal/observable/throwError":42,"./internal/observable/timer":43,"./internal/observable/using":44,"./internal/observable/zip":45,"./internal/operators/timeout":57,"./internal/scheduled/scheduled":64,"./internal/scheduler/VirtualTimeScheduler":74,"./internal/scheduler/animationFrame":75,"./internal/scheduler/asap":77,"./internal/scheduler/async":78,"./internal/scheduler/queue":83,"./internal/symbol/observable":86,"./internal/types":87,"./internal/util/ArgumentOutOfRangeError":88,"./internal/util/EmptyError":89,"./internal/util/NotFoundError":91,"./internal/util/ObjectUnsubscribedError":92,"./internal/util/SequenceError":93,"./internal/util/UnsubscriptionError":94,"./internal/util/identity":102,"./internal/util/isObservable":109,"./internal/util/noop":115,"./internal/util/pipe":117}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncSubject = void 0;
var Subject_1 = require("./Subject");
var AsyncSubject = (function (_super) {
    __extends(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
    }
    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            _hasValue && subscriber.next(_value);
            subscriber.complete();
        }
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.isStopped) {
            this._value = value;
            this._hasValue = true;
        }
    };
    AsyncSubject.prototype.complete = function () {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
            this._isComplete = true;
            _hasValue && _super.prototype.next.call(this, _value);
            _super.prototype.complete.call(this);
        }
    };
    return AsyncSubject;
}(Subject_1.Subject));
exports.AsyncSubject = AsyncSubject;

},{"./Subject":10}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorSubject = void 0;
var Subject_1 = require("./Subject");
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: false,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
            throw thrownError;
        }
        this._throwIfClosed();
        return _value;
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, (this._value = value));
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;

},{"./Subject":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
var empty_1 = require("./observable/empty");
var of_1 = require("./observable/of");
var throwError_1 = require("./observable/throwError");
var isFunction_1 = require("./util/isFunction");
var NotificationKind;
(function (NotificationKind) {
    NotificationKind["NEXT"] = "N";
    NotificationKind["ERROR"] = "E";
    NotificationKind["COMPLETE"] = "C";
})(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        return observeNotification(this, observer);
    };
    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
            ? this.observe(nextOrObserver)
            : this.do(nextOrObserver, error, complete);
    };
    Notification.prototype.toObservable = function () {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === 'N'
            ?
                of_1.of(value)
            :
                kind === 'E'
                    ?
                        throwError_1.throwError(function () { return error; })
                    :
                        kind === 'C'
                            ?
                                empty_1.EMPTY
                            :
                                0;
        if (!result) {
            throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
    };
    Notification.createNext = function (value) {
        return new Notification('N', value);
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    return Notification;
}());
exports.Notification = Notification;
function observeNotification(notification, observer) {
    var _a, _b, _c;
    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
    if (typeof kind !== 'string') {
        throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
exports.observeNotification = observeNotification;

},{"./observable/empty":25,"./observable/of":36,"./observable/throwError":42,"./util/isFunction":106}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = exports.nextNotification = exports.errorNotification = exports.COMPLETE_NOTIFICATION = void 0;
exports.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
exports.errorNotification = errorNotification;
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
exports.nextNotification = nextNotification;
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
exports.createNotification = createNotification;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observable = void 0;
var Subscriber_1 = require("./Subscriber");
var Subscription_1 = require("./Subscription");
var observable_1 = require("./symbol/observable");
var pipe_1 = require("./util/pipe");
var config_1 = require("./config");
var isFunction_1 = require("./util/isFunction");
var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            this._deprecatedSyncErrorSubscribe(subscriber);
        }
        else {
            var _a = this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        this._subscribe(subscriber)
                    :
                        this._trySubscribe(subscriber));
        }
        return subscriber;
    };
    Observable.prototype._deprecatedSyncErrorSubscribe = function (subscriber) {
        var localSubscriber = subscriber;
        localSubscriber._syncErrorHack_isSubscribing = true;
        var operator = this.operator;
        if (operator) {
            subscriber.add(operator.call(subscriber, this.source));
        }
        else {
            try {
                subscriber.add(this._subscribe(subscriber));
            }
            catch (err) {
                localSubscriber.__syncError = err;
            }
        }
        var dest = localSubscriber;
        while (dest) {
            if ('__syncError' in dest) {
                try {
                    throw dest.__syncError;
                }
                finally {
                    subscriber.unsubscribe();
                }
            }
            dest = dest.destination;
        }
        localSubscriber._syncErrorHack_isSubscribing = false;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return operations.length ? pipe_1.pipeFromArray(operations)(this) : this;
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && Subscription_1.isSubscription(value));
}

},{"./Subscriber":11,"./Subscription":12,"./config":13,"./symbol/observable":86,"./util/isFunction":106,"./util/pipe":117}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaySubject = void 0;
var Subject_1 = require("./Subject");
var dateTimestampProvider_1 = require("./scheduler/dateTimestampProvider");
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;

},{"./Subject":10,"./scheduler/dateTimestampProvider":79}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var dateTimestampProvider_1 = require("./scheduler/dateTimestampProvider");
var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
    return Scheduler;
}());
exports.Scheduler = Scheduler;

},{"./scheduler/dateTimestampProvider":79}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousSubject = exports.Subject = void 0;
var Observable_1 = require("./Observable");
var Subscription_1 = require("./Subscription");
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
var arrRemove_1 = require("./util/arrRemove");
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var e_1, _a;
        this._throwIfClosed();
        if (!this.isStopped) {
            var copy = this.observers.slice();
            try {
                for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                    var observer = copy_1_1.value;
                    observer.next(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    Subject.prototype.error = function (err) {
        this._throwIfClosed();
        if (!this.isStopped) {
            this.hasError = this.isStopped = true;
            this.thrownError = err;
            var observers = this.observers;
            while (observers.length) {
                observers.shift().error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        this._throwIfClosed();
        if (!this.isStopped) {
            this.isStopped = true;
            var observers = this.observers;
            while (observers.length) {
                observers.shift().complete();
            }
        }
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? Subscription_1.EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription_1.Subscription(function () { return arrRemove_1.arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;

},{"./Observable":7,"./Subscription":12,"./util/ObjectUnsubscribedError":92,"./util/arrRemove":98}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
var isFunction_1 = require("./util/isFunction");
var Subscription_1 = require("./Subscription");
var config_1 = require("./config");
var reportUnhandledError_1 = require("./util/reportUnhandledError");
var noop_1 = require("./util/noop");
var NotificationFactories_1 = require("./NotificationFactories");
var timeoutProvider_1 = require("./scheduler/timeoutProvider");
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (Subscription_1.isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = exports.EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var next;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            (next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete);
            var context_1;
            if (_this && config_1.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
            }
            else {
                context_1 = observerOrNext;
            }
            next = next === null || next === void 0 ? void 0 : next.bind(context_1);
            error = error === null || error === void 0 ? void 0 : error.bind(context_1);
            complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
        }
        _this.destination = {
            next: next ? wrapForErrorHandling(next, _this) : noop_1.noop,
            error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
            complete: complete ? wrapForErrorHandling(complete, _this) : noop_1.noop,
        };
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;
function wrapForErrorHandling(handler, instance) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            handler.apply(void 0, __spreadArray([], __read(args)));
        }
        catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
                if (instance._syncErrorHack_isSubscribing) {
                    instance.__syncError = err;
                }
                else {
                    throw err;
                }
            }
            else {
                reportUnhandledError_1.reportUnhandledError(err);
            }
        }
    };
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = config_1.config.onStoppedNotification;
    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
exports.EMPTY_OBSERVER = {
    closed: true,
    next: noop_1.noop,
    error: defaultErrorHandler,
    complete: noop_1.noop,
};

},{"./NotificationFactories":6,"./Subscription":12,"./config":13,"./scheduler/timeoutProvider":84,"./util/isFunction":106,"./util/noop":115,"./util/reportUnhandledError":118}],12:[function(require,module,exports){
"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubscription = exports.EMPTY_SUBSCRIPTION = exports.Subscription = void 0;
var isFunction_1 = require("./util/isFunction");
var UnsubscriptionError_1 = require("./util/UnsubscriptionError");
var arrRemove_1 = require("./util/arrRemove");
var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction_1.isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove_1.arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove_1.arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
exports.Subscription = Subscription;
exports.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe)));
}
exports.isSubscription = isSubscription;
function execTeardown(teardown) {
    if (isFunction_1.isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}

},{"./util/UnsubscriptionError":94,"./util/arrRemove":98,"./util/isFunction":106}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstValueFrom = void 0;
var EmptyError_1 = require("./util/EmptyError");
var Subscriber_1 = require("./Subscriber");
function firstValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
            next: function (value) {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: function () {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}
exports.firstValueFrom = firstValueFrom;

},{"./Subscriber":11,"./util/EmptyError":89}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastValueFrom = void 0;
var EmptyError_1 = require("./util/EmptyError");
function lastValueFrom(source, config) {
    var hasConfig = typeof config === 'object';
    return new Promise(function (resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
            next: function (value) {
                _value = value;
                _hasValue = true;
            },
            error: reject,
            complete: function () {
                if (_hasValue) {
                    resolve(_value);
                }
                else if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new EmptyError_1.EmptyError());
                }
            },
        });
    });
}
exports.lastValueFrom = lastValueFrom;

},{"./util/EmptyError":89}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectableObservable = void 0;
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
var refCount_1 = require("../operators/refCount");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var lift_1 = require("../util/lift");
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1.hasLift(source)) {
            _this.lift = source.lift;
        }
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype._teardown = function () {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable.prototype.connect = function () {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription_1.Subscription();
            var subject_1 = this.getSubject();
            connection.add(this.source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subject_1, undefined, function () {
                _this._teardown();
                subject_1.complete();
            }, function (err) {
                _this._teardown();
                subject_1.error(err);
            }, function () { return _this._teardown(); })));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return refCount_1.refCount()(this);
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;

},{"../Observable":7,"../Subscription":12,"../operators/OperatorSubscriber":46,"../operators/refCount":55,"../util/lift":113}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindCallback = void 0;
var bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
exports.bindCallback = bindCallback;

},{"./bindCallbackInternals":18}],18:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindCallbackInternals = void 0;
var isScheduler_1 = require("../util/isScheduler");
var Observable_1 = require("../Observable");
var subscribeOn_1 = require("../operators/subscribeOn");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var observeOn_1 = require("../operators/observeOn");
var AsyncSubject_1 = require("../AsyncSubject");
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler)
                    .apply(this, args)
                    .pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
            };
        }
    }
    if (scheduler) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc)
                .apply(this, args)
                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
    }
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1.Observable(function (subscriber) {
            var subs = subject.subscribe(subscriber);
            if (uninitialized) {
                uninitialized = false;
                var isAsync_1 = false;
                var isComplete_1 = false;
                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
                    function () {
                        var results = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            results[_i] = arguments[_i];
                        }
                        if (isNodeStyle) {
                            var err = results.shift();
                            if (err != null) {
                                subject.error(err);
                                return;
                            }
                        }
                        subject.next(1 < results.length ? results : results[0]);
                        isComplete_1 = true;
                        if (isAsync_1) {
                            subject.complete();
                        }
                    },
                ]));
                if (isComplete_1) {
                    subject.complete();
                }
                isAsync_1 = true;
            }
            return subs;
        });
    };
}
exports.bindCallbackInternals = bindCallbackInternals;

},{"../AsyncSubject":3,"../Observable":7,"../operators/observeOn":53,"../operators/subscribeOn":56,"../util/isScheduler":112,"../util/mapOneOrManyArgs":114}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindNodeCallback = void 0;
var bindCallbackInternals_1 = require("./bindCallbackInternals");
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
exports.bindNodeCallback = bindNodeCallback;

},{"./bindCallbackInternals":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineLatestInit = exports.combineLatest = void 0;
var Observable_1 = require("../Observable");
var argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
var from_1 = require("./from");
var identity_1 = require("../util/identity");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var args_1 = require("../util/args");
var createObject_1 = require("../util/createObject");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
function combineLatest() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
        return from_1.from([], scheduler);
    }
    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
        ?
            function (values) { return createObject_1.createObject(keys, values); }
        :
            identity_1.identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.combineLatest = combineLatest;
function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) { valueTransform = identity_1.identity; }
    return function (subscriber) {
        maybeSchedule(scheduler, function () {
            var length = observables.length;
            var values = new Array(length);
            var active = length;
            var remainingFirstValues = length;
            var _loop_1 = function (i) {
                maybeSchedule(scheduler, function () {
                    var source = from_1.from(observables[i], scheduler);
                    var hasFirstValue = false;
                    source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                        values[i] = value;
                        if (!hasFirstValue) {
                            hasFirstValue = true;
                            remainingFirstValues--;
                        }
                        if (!remainingFirstValues) {
                            subscriber.next(valueTransform(values.slice()));
                        }
                    }, function () {
                        if (!--active) {
                            subscriber.complete();
                        }
                    }));
                }, subscriber);
            };
            for (var i = 0; i < length; i++) {
                _loop_1(i);
            }
        }, subscriber);
    };
}
exports.combineLatestInit = combineLatestInit;
function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
        subscription.add(scheduler.schedule(execute));
    }
    else {
        execute();
    }
}

},{"../Observable":7,"../operators/OperatorSubscriber":46,"../util/args":95,"../util/argsArgArrayOrObject":96,"../util/createObject":101,"../util/identity":102,"../util/mapOneOrManyArgs":114,"./from":27}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
var concatAll_1 = require("../operators/concatAll");
var fromArray_1 = require("./fromArray");
var args_1 = require("../util/args");
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return concatAll_1.concatAll()(fromArray_1.internalFromArray(args, args_1.popScheduler(args)));
}
exports.concat = concat;

},{"../operators/concatAll":47,"../util/args":95,"./fromArray":28}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectable = void 0;
var Subject_1 = require("../Subject");
var Observable_1 = require("../Observable");
var defer_1 = require("./defer");
var DEFAULT_CONFIG = {
    connector: function () { return new Subject_1.Subject(); },
    resetOnDisconnect: true,
};
function connectable(source, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var connection = null;
    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable_1.Observable(function (subscriber) {
        return subject.subscribe(subscriber);
    });
    result.connect = function () {
        if (!connection || connection.closed) {
            connection = defer_1.defer(function () { return source; }).subscribe(subject);
            if (resetOnDisconnect) {
                connection.add(function () { return (subject = connector()); });
            }
        }
        return connection;
    };
    return result;
}
exports.connectable = connectable;

},{"../Observable":7,"../Subject":10,"./defer":23}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = void 0;
var Observable_1 = require("../Observable");
var from_1 = require("./from");
function defer(observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        from_1.innerFrom(observableFactory()).subscribe(subscriber);
    });
}
exports.defer = defer;

},{"../Observable":7,"./from":27}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrames = void 0;
var Observable_1 = require("../../Observable");
var Subscription_1 = require("../../Subscription");
var performanceTimestampProvider_1 = require("../../scheduler/performanceTimestampProvider");
var animationFrameProvider_1 = require("../../scheduler/animationFrameProvider");
function animationFrames(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
exports.animationFrames = animationFrames;
function animationFramesFactory(timestampProvider) {
    var schedule = animationFrameProvider_1.animationFrameProvider.schedule;
    return new Observable_1.Observable(function (subscriber) {
        var subscription = new Subscription_1.Subscription();
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var run = function (timestamp) {
            var now = provider.now();
            subscriber.next({
                timestamp: timestampProvider ? now : timestamp,
                elapsed: now - start
            });
            if (!subscriber.closed) {
                subscription.add(schedule(run));
            }
        };
        subscription.add(schedule(run));
        return subscription;
    });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

},{"../../Observable":7,"../../Subscription":12,"../../scheduler/animationFrameProvider":76,"../../scheduler/performanceTimestampProvider":82}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.EMPTY = void 0;
var Observable_1 = require("../Observable");
exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
}
exports.empty = empty;
function emptyScheduled(scheduler) {
    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}

},{"../Observable":7}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forkJoin = void 0;
var Observable_1 = require("../Observable");
var argsArgArrayOrObject_1 = require("../util/argsArgArrayOrObject");
var from_1 = require("./from");
var args_1 = require("../util/args");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var createObject_1 = require("../util/createObject");
function forkJoin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
    var result = new Observable_1.Observable(function (subscriber) {
        var length = sources.length;
        if (!length) {
            subscriber.complete();
            return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function (sourceIndex) {
            var hasValue = false;
            from_1.innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                if (!hasValue) {
                    hasValue = true;
                    remainingEmissions--;
                }
                values[sourceIndex] = value;
            }, function () {
                if (!--remainingCompletions || !hasValue) {
                    if (!remainingEmissions) {
                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
                    }
                    subscriber.complete();
                }
            }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
            _loop_1(sourceIndex);
        }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
}
exports.forkJoin = forkJoin;

},{"../Observable":7,"../operators/OperatorSubscriber":46,"../util/args":95,"../util/argsArgArrayOrObject":96,"../util/createObject":101,"../util/mapOneOrManyArgs":114,"./from":27}],27:[function(require,module,exports){
(function (process){(function (){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArrayLike = exports.innerFrom = exports.from = void 0;
var isArrayLike_1 = require("../util/isArrayLike");
var isPromise_1 = require("../util/isPromise");
var observable_1 = require("../symbol/observable");
var Observable_1 = require("../Observable");
var scheduled_1 = require("../scheduled/scheduled");
var isFunction_1 = require("../util/isFunction");
var reportUnhandledError_1 = require("../util/reportUnhandledError");
var isInteropObservable_1 = require("../util/isInteropObservable");
var isAsyncIterable_1 = require("../util/isAsyncIterable");
var throwUnobservableError_1 = require("../util/throwUnobservableError");
var isIterable_1 = require("../util/isIterable");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
function from(input, scheduler) {
    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom(input);
}
exports.from = from;
function innerFrom(input) {
    if (input instanceof Observable_1.Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise_1.isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable_1.isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.innerFrom = innerFrom;
function fromInteropObservable(obj) {
    return new Observable_1.Observable(function (subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1.isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable_1.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
exports.fromArrayLike = fromArrayLike;
function fromPromise(promise) {
    return new Observable_1.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError_1.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable_1.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable_1.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

}).call(this)}).call(this,require('_process'))

},{"../Observable":7,"../scheduled/scheduled":64,"../symbol/observable":86,"../util/isArrayLike":103,"../util/isAsyncIterable":104,"../util/isFunction":106,"../util/isInteropObservable":107,"../util/isIterable":108,"../util/isPromise":110,"../util/isReadableStreamLike":111,"../util/reportUnhandledError":118,"../util/throwUnobservableError":119,"_process":1}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalFromArray = void 0;
var scheduleArray_1 = require("../scheduled/scheduleArray");
var from_1 = require("./from");
function internalFromArray(input, scheduler) {
    return scheduler ? scheduleArray_1.scheduleArray(input, scheduler) : from_1.fromArrayLike(input);
}
exports.internalFromArray = internalFromArray;

},{"../scheduled/scheduleArray":58,"./from":27}],29:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEvent = void 0;
var Observable_1 = require("../Observable");
var mergeMap_1 = require("../operators/mergeMap");
var isArrayLike_1 = require("../util/isArrayLike");
var isFunction_1 = require("../util/isFunction");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
var fromArray_1 = require("./fromArray");
var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target)
        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
        :
            isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
                : isJQueryStyleEventEmitter(target)
                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                    : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
            return mergeMap_1.mergeMap(function (subTarget) { return fromEvent(subTarget, eventName, options); })(fromArray_1.internalFromArray(target));
        }
    }
    if (!add) {
        throw new TypeError('Invalid event target');
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function () { return remove(handler); };
    });
}
exports.fromEvent = fromEvent;
function toCommonHandlerRegistry(target, eventName) {
    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
}
function isNodeStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
}
function isEventTarget(target) {
    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
}

},{"../Observable":7,"../operators/mergeMap":52,"../util/isArrayLike":103,"../util/isFunction":106,"../util/mapOneOrManyArgs":114,"./fromArray":28}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEventPattern = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("../util/isFunction");
var mapOneOrManyArgs_1 = require("../util/mapOneOrManyArgs");
function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    return new Observable_1.Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}
exports.fromEventPattern = fromEventPattern;

},{"../Observable":7,"../util/isFunction":106,"../util/mapOneOrManyArgs":114}],31:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var identity_1 = require("../util/identity");
var isScheduler_1 = require("../util/isScheduler");
var defer_1 = require("./defer");
var scheduleIterable_1 = require("../scheduled/scheduleIterable");
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler);
    }
    else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity_1.identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    function gen() {
        var state;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = initialState;
                    _a.label = 1;
                case 1:
                    if (!(!condition || condition(state))) return [3, 4];
                    return [4, resultSelector(state)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    state = iterate(state);
                    return [3, 1];
                case 4: return [2];
            }
        });
    }
    return defer_1.defer((scheduler
        ?
            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
        :
            gen));
}
exports.generate = generate;

},{"../scheduled/scheduleIterable":60,"../util/identity":102,"../util/isScheduler":112,"./defer":23}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = void 0;
var defer_1 = require("./defer");
function iif(condition, trueResult, falseResult) {
    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
}
exports.iif = iif;

},{"./defer":23}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = void 0;
var async_1 = require("../scheduler/async");
var timer_1 = require("./timer");
function interval(period, scheduler) {
    if (period === void 0) { period = 0; }
    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
    if (period < 0) {
        period = 0;
    }
    return timer_1.timer(period, period, scheduler);
}
exports.interval = interval;

},{"../scheduler/async":78,"./timer":43}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var mergeAll_1 = require("../operators/mergeAll");
var fromArray_1 = require("./fromArray");
var from_1 = require("./from");
var empty_1 = require("./empty");
var args_1 = require("../util/args");
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    var concurrent = args_1.popNumber(args, Infinity);
    var sources = args;
    return !sources.length
        ?
            empty_1.EMPTY
        : sources.length === 1
            ?
                from_1.innerFrom(sources[0])
            :
                mergeAll_1.mergeAll(concurrent)(fromArray_1.internalFromArray(sources, scheduler));
}
exports.merge = merge;

},{"../operators/mergeAll":50,"../util/args":95,"./empty":25,"./from":27,"./fromArray":28}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.never = exports.NEVER = void 0;
var Observable_1 = require("../Observable");
var noop_1 = require("../util/noop");
exports.NEVER = new Observable_1.Observable(noop_1.noop);
function never() {
    return exports.NEVER;
}
exports.never = never;

},{"../Observable":7,"../util/noop":115}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.of = void 0;
var fromArray_1 = require("./fromArray");
var scheduleArray_1 = require("../scheduled/scheduleArray");
var args_1 = require("../util/args");
function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args);
    return scheduler ? scheduleArray_1.scheduleArray(args, scheduler) : fromArray_1.internalFromArray(args);
}
exports.of = of;

},{"../scheduled/scheduleArray":58,"../util/args":95,"./fromArray":28}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = void 0;
var empty_1 = require("./empty");
var onErrorResumeNext_1 = require("../operators/onErrorResumeNext");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return onErrorResumeNext_1.onErrorResumeNext(argsOrArgArray_1.argsOrArgArray(sources))(empty_1.EMPTY);
}
exports.onErrorResumeNext = onErrorResumeNext;

},{"../operators/onErrorResumeNext":54,"../util/argsOrArgArray":97,"./empty":25}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairs = void 0;
var from_1 = require("./from");
function pairs(obj, scheduler) {
    return from_1.from(Object.entries(obj), scheduler);
}
exports.pairs = pairs;

},{"./from":27}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partition = void 0;
var not_1 = require("../util/not");
var filter_1 = require("../operators/filter");
var from_1 = require("./from");
function partition(source, predicate, thisArg) {
    return [filter_1.filter(predicate, thisArg)(from_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(from_1.innerFrom(source))];
}
exports.partition = partition;

},{"../operators/filter":48,"../util/not":116,"./from":27}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceInit = exports.race = void 0;
var Observable_1 = require("../Observable");
var from_1 = require("./from");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
function race() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray_1.argsOrArgArray(sources);
    return sources.length === 1 ? from_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
}
exports.race = race;
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(from_1.innerFrom(sources[i]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}
exports.raceInit = raceInit;

},{"../Observable":7,"../operators/OperatorSubscriber":46,"../util/argsOrArgArray":97,"./from":27}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
var Observable_1 = require("../Observable");
var empty_1 = require("./empty");
function range(start, count, scheduler) {
    if (count == null) {
        count = start;
        start = 0;
    }
    if (count <= 0) {
        return empty_1.EMPTY;
    }
    var end = count + start;
    return new Observable_1.Observable(scheduler
        ?
            function (subscriber) {
                var n = start;
                return scheduler.schedule(function () {
                    if (n < end) {
                        subscriber.next(n++);
                        this.schedule();
                    }
                    else {
                        subscriber.complete();
                    }
                });
            }
        :
            function (subscriber) {
                var n = start;
                while (n < end && !subscriber.closed) {
                    subscriber.next(n++);
                }
                subscriber.complete();
            });
}
exports.range = range;

},{"../Observable":7,"./empty":25}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("../util/isFunction");
function throwError(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
    var init = function (subscriber) { return subscriber.error(errorFactory()); };
    return new Observable_1.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
}
exports.throwError = throwError;

},{"../Observable":7,"../util/isFunction":106}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = void 0;
var Observable_1 = require("../Observable");
var async_1 = require("../scheduler/async");
var isScheduler_1 = require("../util/isScheduler");
var isDate_1 = require("../util/isDate");
function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async_1.async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable_1.Observable(function (subscriber) {
        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}
exports.timer = timer;

},{"../Observable":7,"../scheduler/async":78,"../util/isDate":105,"../util/isScheduler":112}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.using = void 0;
var Observable_1 = require("../Observable");
var from_1 = require("./from");
var empty_1 = require("./empty");
function using(resourceFactory, observableFactory) {
    return new Observable_1.Observable(function (subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? from_1.innerFrom(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return function () {
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
exports.using = using;

},{"../Observable":7,"./empty":25,"./from":27}],45:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
var Observable_1 = require("../Observable");
var from_1 = require("./from");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var empty_1 = require("./empty");
var OperatorSubscriber_1 = require("../operators/OperatorSubscriber");
var args_1 = require("../util/args");
function zip() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args);
    var sources = argsOrArgArray_1.argsOrArgArray(args);
    return sources.length
        ? new Observable_1.Observable(function (subscriber) {
            var buffers = sources.map(function () { return []; });
            var completed = sources.map(function () { return false; });
            subscriber.add(function () {
                buffers = completed = null;
            });
            var _loop_1 = function (sourceIndex) {
                from_1.innerFrom(sources[sourceIndex]).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
                    buffers[sourceIndex].push(value);
                    if (buffers.every(function (buffer) { return buffer.length; })) {
                        var result = buffers.map(function (buffer) { return buffer.shift(); });
                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                            subscriber.complete();
                        }
                    }
                }, function () {
                    completed[sourceIndex] = true;
                    !buffers[sourceIndex].length && subscriber.complete();
                }));
            };
            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                _loop_1(sourceIndex);
            }
            return function () {
                buffers = completed = null;
            };
        })
        : empty_1.EMPTY;
}
exports.zip = zip;

},{"../Observable":7,"../operators/OperatorSubscriber":46,"../util/args":95,"../util/argsOrArgArray":97,"./empty":25,"./from":27}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorSubscriber = void 0;
var Subscriber_1 = require("../Subscriber");
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        var closed = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    };
    return OperatorSubscriber;
}(Subscriber_1.Subscriber));
exports.OperatorSubscriber = OperatorSubscriber;

},{"../Subscriber":11}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatAll = void 0;
var mergeAll_1 = require("./mergeAll");
function concatAll() {
    return mergeAll_1.mergeAll(1);
}
exports.concatAll = concatAll;

},{"./mergeAll":50}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function filter(predicate, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
exports.filter = filter;

},{"../util/lift":113,"./OperatorSubscriber":46}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function map(project, thisArg) {
    return lift_1.operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
exports.map = map;

},{"../util/lift":113,"./OperatorSubscriber":46}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeAll = void 0;
var mergeMap_1 = require("./mergeMap");
var identity_1 = require("../util/identity");
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
}
exports.mergeAll = mergeAll;

},{"../util/identity":102,"./mergeMap":52}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeInternals = void 0;
var from_1 = require("../observable/from");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function () {
        if (isComplete && !buffer.length && !active) {
            subscriber.complete();
        }
    };
    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
    var doInnerSub = function (value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        from_1.innerFrom(project(value, index++)).subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (innerValue) {
            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
            if (expand) {
                outerNext(innerValue);
            }
            else {
                subscriber.next(innerValue);
            }
        }, function () {
            innerComplete = true;
        }, undefined, function () {
            if (innerComplete) {
                try {
                    active--;
                    var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        innerSubScheduler ? subscriber.add(innerSubScheduler.schedule(function () { return doInnerSub(bufferedValue); })) : doInnerSub(bufferedValue);
                    };
                    while (buffer.length && active < concurrent) {
                        _loop_1();
                    }
                    checkComplete();
                }
                catch (err) {
                    subscriber.error(err);
                }
            }
        }));
    };
    source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, outerNext, function () {
        isComplete = true;
        checkComplete();
    }));
    return function () {
        additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
    };
}
exports.mergeInternals = mergeInternals;

},{"../observable/from":27,"./OperatorSubscriber":46}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMap = void 0;
var map_1 = require("./map");
var from_1 = require("../observable/from");
var lift_1 = require("../util/lift");
var mergeInternals_1 = require("./mergeInternals");
var isFunction_1 = require("../util/isFunction");
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Infinity; }
    if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap(function (a, i) { return map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })(from_1.innerFrom(project(a, i))); }, concurrent);
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return lift_1.operate(function (source, subscriber) { return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent); });
}
exports.mergeMap = mergeMap;

},{"../observable/from":27,"../util/isFunction":106,"../util/lift":113,"./map":49,"./mergeInternals":51}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeOn = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) { return subscriber.add(scheduler.schedule(function () { return subscriber.next(value); }, delay)); }, function () { return subscriber.add(scheduler.schedule(function () { return subscriber.complete(); }, delay)); }, function (err) { return subscriber.add(scheduler.schedule(function () { return subscriber.error(err); }, delay)); }));
    });
}
exports.observeOn = observeOn;

},{"../util/lift":113,"./OperatorSubscriber":46}],54:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onErrorResumeNext = void 0;
var lift_1 = require("../util/lift");
var from_1 = require("../observable/from");
var argsOrArgArray_1 = require("../util/argsOrArgArray");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
var noop_1 = require("../util/noop");
function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return lift_1.operate(function (source, subscriber) {
        var remaining = __spreadArray([source], __read(nextSources));
        var subscribeNext = function () {
            if (!subscriber.closed) {
                if (remaining.length > 0) {
                    var nextSource = void 0;
                    try {
                        nextSource = from_1.innerFrom(remaining.shift());
                    }
                    catch (err) {
                        subscribeNext();
                        return;
                    }
                    var innerSub = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
                    subscriber.add(nextSource.subscribe(innerSub));
                    innerSub.add(subscribeNext);
                }
                else {
                    subscriber.complete();
                }
            }
        };
        subscribeNext();
    });
}
exports.onErrorResumeNext = onErrorResumeNext;

},{"../observable/from":27,"../util/argsOrArgArray":97,"../util/lift":113,"../util/noop":115,"./OperatorSubscriber":46}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refCount = void 0;
var lift_1 = require("../util/lift");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
function refCount() {
    return lift_1.operate(function (source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                connection = null;
                return;
            }
            var sharedConnection = source._connection;
            var conn = connection;
            connection = null;
            if (sharedConnection && (!conn || sharedConnection === conn)) {
                sharedConnection.unsubscribe();
            }
            subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
            connection = source.connect();
        }
    });
}
exports.refCount = refCount;

},{"../util/lift":113,"./OperatorSubscriber":46}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeOn = void 0;
var lift_1 = require("../util/lift");
function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return lift_1.operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
exports.subscribeOn = subscribeOn;

},{"../util/lift":113}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.TimeoutError = void 0;
var async_1 = require("../scheduler/async");
var isDate_1 = require("../util/isDate");
var lift_1 = require("../util/lift");
var from_1 = require("../observable/from");
var createErrorClass_1 = require("../util/createErrorClass");
var caughtSchedule_1 = require("../util/caughtSchedule");
var OperatorSubscriber_1 = require("./OperatorSubscriber");
exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
    return function TimeoutErrorImpl(info) {
        if (info === void 0) { info = null; }
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
    };
});
function timeout(config, schedulerArg) {
    var _a = (isDate_1.isValidDate(config)
        ? { first: config }
        : typeof config === 'number'
            ? { each: config }
            : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
    if (first == null && each == null) {
        throw new TypeError('No timeout provided.');
    }
    return lift_1.operate(function (source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function (delay) {
            timerSubscription = caughtSchedule_1.caughtSchedule(subscriber, scheduler, function () {
                originalSourceSubscription.unsubscribe();
                from_1.innerFrom(_with({
                    meta: meta,
                    lastValue: lastValue,
                    seen: seen,
                })).subscribe(subscriber);
            }, delay);
        };
        originalSourceSubscription = source.subscribe(new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
        }, undefined, undefined, function () {
            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
            }
            lastValue = null;
        }));
        startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
    });
}
exports.timeout = timeout;
function timeoutErrorFactory(info) {
    throw new exports.TimeoutError(info);
}

},{"../observable/from":27,"../scheduler/async":78,"../util/caughtSchedule":99,"../util/createErrorClass":100,"../util/isDate":105,"../util/lift":113,"./OperatorSubscriber":46}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleArray = void 0;
var Observable_1 = require("../Observable");
function scheduleArray(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
exports.scheduleArray = scheduleArray;

},{"../Observable":7}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleAsyncIterable = void 0;
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable_1.Observable(function (subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function () {
            var iterator = input[Symbol.asyncIterator]();
            sub.add(scheduler.schedule(function () {
                var _this = this;
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                        _this.schedule();
                    }
                });
            }));
        }));
        return sub;
    });
}
exports.scheduleAsyncIterable = scheduleAsyncIterable;

},{"../Observable":7,"../Subscription":12}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleIterable = void 0;
var Observable_1 = require("../Observable");
var iterator_1 = require("../symbol/iterator");
var isFunction_1 = require("../util/isFunction");
var caughtSchedule_1 = require("../util/caughtSchedule");
function scheduleIterable(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var iterator;
        subscriber.add(scheduler.schedule(function () {
            iterator = input[iterator_1.iterator]();
            caughtSchedule_1.caughtSchedule(subscriber, scheduler, function () {
                var _a = iterator.next(), value = _a.value, done = _a.done;
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            });
        }));
        return function () { return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
exports.scheduleIterable = scheduleIterable;

},{"../Observable":7,"../symbol/iterator":85,"../util/caughtSchedule":99,"../util/isFunction":106}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleObservable = void 0;
var Observable_1 = require("../Observable");
var Subscription_1 = require("../Subscription");
var observable_1 = require("../symbol/observable");
function scheduleObservable(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        var sub = new Subscription_1.Subscription();
        sub.add(scheduler.schedule(function () {
            var observable = input[observable_1.observable]();
            sub.add(observable.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}
exports.scheduleObservable = scheduleObservable;

},{"../Observable":7,"../Subscription":12,"../symbol/observable":86}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulePromise = void 0;
var Observable_1 = require("../Observable");
function schedulePromise(input, scheduler) {
    return new Observable_1.Observable(function (subscriber) {
        return scheduler.schedule(function () {
            return input.then(function (value) {
                subscriber.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    subscriber.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                subscriber.add(scheduler.schedule(function () { return subscriber.error(err); }));
            });
        });
    });
}
exports.schedulePromise = schedulePromise;

},{"../Observable":7}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleReadableStreamLike = void 0;
var scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
}
exports.scheduleReadableStreamLike = scheduleReadableStreamLike;

},{"../util/isReadableStreamLike":111,"./scheduleAsyncIterable":59}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduled = void 0;
var scheduleObservable_1 = require("./scheduleObservable");
var schedulePromise_1 = require("./schedulePromise");
var scheduleArray_1 = require("./scheduleArray");
var scheduleIterable_1 = require("./scheduleIterable");
var scheduleAsyncIterable_1 = require("./scheduleAsyncIterable");
var isInteropObservable_1 = require("../util/isInteropObservable");
var isPromise_1 = require("../util/isPromise");
var isArrayLike_1 = require("../util/isArrayLike");
var isIterable_1 = require("../util/isIterable");
var isAsyncIterable_1 = require("../util/isAsyncIterable");
var throwUnobservableError_1 = require("../util/throwUnobservableError");
var isReadableStreamLike_1 = require("../util/isReadableStreamLike");
var scheduleReadableStreamLike_1 = require("./scheduleReadableStreamLike");
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
            return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
}
exports.scheduled = scheduled;

},{"../util/isArrayLike":103,"../util/isAsyncIterable":104,"../util/isInteropObservable":107,"../util/isIterable":108,"../util/isPromise":110,"../util/isReadableStreamLike":111,"../util/throwUnobservableError":119,"./scheduleArray":58,"./scheduleAsyncIterable":59,"./scheduleIterable":60,"./scheduleObservable":61,"./schedulePromise":62,"./scheduleReadableStreamLike":63}],65:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
var Subscription_1 = require("../Subscription");
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;

},{"../Subscription":12}],66:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationFrameAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var animationFrameProvider_1 = require("./animationFrameProvider");
var AnimationFrameAction = (function (_super) {
    __extends(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(AsyncAction_1.AsyncAction));
exports.AnimationFrameAction = AnimationFrameAction;

},{"./AsyncAction":70,"./animationFrameProvider":76}],67:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationFrameScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var AnimationFrameScheduler = (function (_super) {
    __extends(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this._active = true;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        action = action || actions.shift();
        var count = actions.length;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this._active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AnimationFrameScheduler = AnimationFrameScheduler;

},{"./AsyncScheduler":71}],68:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsapAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var immediateProvider_1 = require("./immediateProvider");
var AsapAction = (function (_super) {
    __extends(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            immediateProvider_1.immediateProvider.clearImmediate(id);
            scheduler._scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(AsyncAction_1.AsyncAction));
exports.AsapAction = AsapAction;

},{"./AsyncAction":70,"./immediateProvider":80}],69:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsapScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var AsapScheduler = (function (_super) {
    __extends(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this._active = true;
        this._scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        action = action || actions.shift();
        var count = actions.length;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this._active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.AsapScheduler = AsapScheduler;

},{"./AsyncScheduler":71}],70:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncAction = void 0;
var Action_1 = require("./Action");
var intervalProvider_1 = require("./intervalProvider");
var arrRemove_1 = require("../util/arrRemove");
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider_1.intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove_1.arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;

},{"../util/arrRemove":98,"./Action":65,"./intervalProvider":81}],71:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncScheduler = void 0;
var Scheduler_1 = require("../Scheduler");
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;

},{"../Scheduler":9}],72:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueAction = void 0;
var AsyncAction_1 = require("./AsyncAction");
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;

},{"./AsyncAction":70}],73:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueScheduler = void 0;
var AsyncScheduler_1 = require("./AsyncScheduler");
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;

},{"./AsyncScheduler":71}],74:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualAction = exports.VirtualTimeScheduler = void 0;
var AsyncAction_1 = require("./AsyncAction");
var Subscription_1 = require("../Subscription");
var AsyncScheduler_1 = require("./AsyncScheduler");
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Infinity; }
        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        }
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.VirtualTimeScheduler = VirtualTimeScheduler;
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = (scheduler.index += 1); }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (Number.isFinite(delay)) {
            if (!this.id) {
                return _super.prototype.schedule.call(this, state, delay);
            }
            this.active = false;
            var action = new VirtualAction(this.scheduler, this.work);
            this.add(action);
            return action.schedule(state, delay);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction_1.AsyncAction));
exports.VirtualAction = VirtualAction;

},{"../Subscription":12,"./AsyncAction":70,"./AsyncScheduler":71}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrame = exports.animationFrameScheduler = void 0;
var AnimationFrameAction_1 = require("./AnimationFrameAction");
var AnimationFrameScheduler_1 = require("./AnimationFrameScheduler");
exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
exports.animationFrame = exports.animationFrameScheduler;

},{"./AnimationFrameAction":66,"./AnimationFrameScheduler":67}],76:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationFrameProvider = void 0;
var Subscription_1 = require("../Subscription");
exports.animationFrameProvider = {
    schedule: function (callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports.animationFrameProvider.delegate;
        if (delegate) {
            request = delegate.requestAnimationFrame;
            cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function (timestamp) {
            cancel = undefined;
            callback(timestamp);
        });
        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
    },
    requestAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    cancelAnimationFrame: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
    },
    delegate: undefined,
};

},{"../Subscription":12}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asap = exports.asapScheduler = void 0;
var AsapAction_1 = require("./AsapAction");
var AsapScheduler_1 = require("./AsapScheduler");
exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
exports.asap = exports.asapScheduler;

},{"./AsapAction":68,"./AsapScheduler":69}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async = exports.asyncScheduler = void 0;
var AsyncAction_1 = require("./AsyncAction");
var AsyncScheduler_1 = require("./AsyncScheduler");
exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
exports.async = exports.asyncScheduler;

},{"./AsyncAction":70,"./AsyncScheduler":71}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTimestampProvider = void 0;
exports.dateTimestampProvider = {
    now: function () {
        return (exports.dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

},{}],80:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.immediateProvider = void 0;
var Immediate_1 = require("../util/Immediate");
var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
exports.immediateProvider = {
    setImmediate: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
    },
    clearImmediate: function (handle) {
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
    },
    delegate: undefined,
};

},{"../util/Immediate":90}],81:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalProvider = void 0;
exports.intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
    },
    clearInterval: function (handle) {
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
    },
    delegate: undefined,
};

},{}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceTimestampProvider = void 0;
exports.performanceTimestampProvider = {
    now: function () {
        return (exports.performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};

},{}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = exports.queueScheduler = void 0;
var QueueAction_1 = require("./QueueAction");
var QueueScheduler_1 = require("./QueueScheduler");
exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
exports.queue = exports.queueScheduler;

},{"./QueueAction":72,"./QueueScheduler":73}],84:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeoutProvider = void 0;
exports.timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};

},{}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterator = exports.getSymbolIterator = void 0;
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
exports.getSymbolIterator = getSymbolIterator;
exports.iterator = getSymbolIterator();

},{}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = void 0;
exports.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

},{}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentOutOfRangeError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function (_super) {
    return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
    };
});

},{"./createErrorClass":100}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.EmptyError = createErrorClass_1.createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });

},{"./createErrorClass":100}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTools = exports.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
exports.Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
        return handle;
    },
    clearImmediate: function (handle) {
        findAndClearHandle(handle);
    },
};
exports.TestTools = {
    pending: function () {
        return Object.keys(activeHandles).length;
    }
};

},{}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.NotFoundError = createErrorClass_1.createErrorClass(function (_super) {
    return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
    };
});

},{"./createErrorClass":100}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUnsubscribedError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

},{"./createErrorClass":100}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
    return function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
    };
});

},{"./createErrorClass":100}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsubscriptionError = void 0;
var createErrorClass_1 = require("./createErrorClass");
exports.UnsubscriptionError = createErrorClass_1.createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

},{"./createErrorClass":100}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popNumber = exports.popScheduler = exports.popResultSelector = void 0;
var isFunction_1 = require("./isFunction");
var isScheduler_1 = require("./isScheduler");
function last(arr) {
    return arr[arr.length - 1];
}
function popResultSelector(args) {
    return isFunction_1.isFunction(last(args)) ? args.pop() : undefined;
}
exports.popResultSelector = popResultSelector;
function popScheduler(args) {
    return isScheduler_1.isScheduler(last(args)) ? args.pop() : undefined;
}
exports.popScheduler = popScheduler;
function popNumber(args, defaultValue) {
    return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
exports.popNumber = popNumber;

},{"./isFunction":106,"./isScheduler":112}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsArgArrayOrObject = void 0;
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
function argsArgArrayOrObject(args) {
    if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
            return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
            var keys = getKeys(first_1);
            return {
                args: keys.map(function (key) { return first_1[key]; }),
                keys: keys,
            };
        }
    }
    return { args: args, keys: null };
}
exports.argsArgArrayOrObject = argsArgArrayOrObject;
function isPOJO(obj) {
    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}

},{}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsOrArgArray = void 0;
var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
exports.argsOrArgArray = argsOrArgArray;

},{}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrRemove = void 0;
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
exports.arrRemove = arrRemove;

},{}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caughtSchedule = void 0;
function caughtSchedule(subscriber, scheduler, execute, delay) {
    if (delay === void 0) { delay = 0; }
    var subscription = scheduler.schedule(function () {
        try {
            execute.call(this);
        }
        catch (err) {
            subscriber.error(err);
        }
    }, delay);
    subscriber.add(subscription);
    return subscription;
}
exports.caughtSchedule = caughtSchedule;

},{}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorClass = void 0;
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
exports.createErrorClass = createErrorClass;

},{}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObject = void 0;
function createObject(keys, values) {
    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
}
exports.createObject = createObject;

},{}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = void 0;
function identity(x) {
    return x;
}
exports.identity = identity;

},{}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = void 0;
exports.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

},{}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAsyncIterable = void 0;
var isFunction_1 = require("./isFunction");
function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
exports.isAsyncIterable = isAsyncIterable;

},{"./isFunction":106}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = void 0;
function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}
exports.isValidDate = isValidDate;

},{}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;

},{}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteropObservable = void 0;
var observable_1 = require("../symbol/observable");
var isFunction_1 = require("./isFunction");
function isInteropObservable(input) {
    return isFunction_1.isFunction(input[observable_1.observable]);
}
exports.isInteropObservable = isInteropObservable;

},{"../symbol/observable":86,"./isFunction":106}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIterable = void 0;
var iterator_1 = require("../symbol/iterator");
var isFunction_1 = require("./isFunction");
function isIterable(input) {
    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
}
exports.isIterable = isIterable;

},{"../symbol/iterator":85,"./isFunction":106}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObservable = void 0;
var Observable_1 = require("../Observable");
var isFunction_1 = require("./isFunction");
function isObservable(obj) {
    return !!obj && (obj instanceof Observable_1.Observable || (isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe)));
}
exports.isObservable = isObservable;

},{"../Observable":7,"./isFunction":106}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
var isFunction_1 = require("./isFunction");
function isPromise(value) {
    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
}
exports.isPromise = isPromise;

},{"./isFunction":106}],111:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReadableStreamLike = exports.readableStreamLikeToAsyncGenerator = void 0;
var isFunction_1 = require("./isFunction");
function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (!true) return [3, 8];
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
exports.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
function isReadableStreamLike(obj) {
    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
exports.isReadableStreamLike = isReadableStreamLike;

},{"./isFunction":106}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScheduler = void 0;
var isFunction_1 = require("./isFunction");
function isScheduler(value) {
    return value && isFunction_1.isFunction(value.schedule);
}
exports.isScheduler = isScheduler;

},{"./isFunction":106}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operate = exports.hasLift = void 0;
var isFunction_1 = require("./isFunction");
function hasLift(source) {
    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
exports.hasLift = hasLift;
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
exports.operate = operate;

},{"./isFunction":106}],114:[function(require,module,exports){
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOneOrManyArgs = void 0;
var map_1 = require("../operators/map");
var isArray = Array.isArray;
function callOrApply(fn, args) {
    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map_1.map(function (args) { return callOrApply(fn, args); });
}
exports.mapOneOrManyArgs = mapOneOrManyArgs;

},{"../operators/map":49}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = void 0;
function noop() { }
exports.noop = noop;

},{}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.not = void 0;
function not(pred, thisArg) {
    return function (value, index) { return !pred.call(thisArg, value, index); };
}
exports.not = not;

},{}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeFromArray = exports.pipe = void 0;
var identity_1 = require("./identity");
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity_1.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;

},{"./identity":102}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportUnhandledError = void 0;
var config_1 = require("../config");
var timeoutProvider_1 = require("../scheduler/timeoutProvider");
function reportUnhandledError(err) {
    timeoutProvider_1.timeoutProvider.setTimeout(function () {
        var onUnhandledError = config_1.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
exports.reportUnhandledError = reportUnhandledError;

},{"../config":13,"../scheduler/timeoutProvider":84}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvalidObservableTypeError = void 0;
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
exports.createInvalidObservableTypeError = createInvalidObservableTypeError;

},{}],120:[function(require,module,exports){
module.exports={
    "repo": "TypeScript",
    "type": "json",
    "dry": false,
    "debug": true,
    "code": 200,
    "meta": {
      "pagination": {
        "total": 1438,
        "pages": 72,
        "page": 1,
        "limit": 20
      }
    },
    "data": [{
        "id": 2,
        "post_id": 6,
        "user_id": 8,
        "body": "Ipsum molestias temporibus. Saepe debitis nihil. In culpa quod.",
        "created_at": "2020-10-21T03:50:04.706+05:30",
        "updated_at": "2020-10-21T03:50:04.706+05:30"
      },
      {
        "id": 4,
        "post_id": 8,
        "user_id": 9,
        "body": "Quia inventore quis.",
        "created_at": "2020-10-21T03:50:04.760+05:30",
        "updated_at": "2020-10-21T03:50:04.760+05:30"
      },
      {
        "id": 5,
        "post_id": 8,
        "user_id": 6,
        "body": "Magni provident ut. Consequatur et impedit.",
        "created_at": "2020-10-21T03:50:04.762+05:30",
        "updated_at": "2020-10-21T03:50:04.762+05:30"
      },
      {
        "id": 7,
        "post_id": 10,
        "user_id": 25,
        "body": "Amet est et.",
        "created_at": "2020-10-21T03:50:04.790+05:30",
        "updated_at": "2020-10-21T03:50:04.790+05:30"
      },
      {
        "id": 9,
        "post_id": 12,
        "user_id": 32,
        "body": "Commodi itaque excepturi. Assumenda et consequatur.",
        "created_at": "2020-10-21T03:50:04.830+05:30",
        "updated_at": "2020-10-21T03:50:04.830+05:30"
      },
      {
        "id": 11,
        "post_id": 15,
        "user_id": 45,
        "body": "Eveniet culpa dolor.",
        "created_at": "2020-10-21T03:50:04.884+05:30",
        "updated_at": "2020-10-21T03:50:04.884+05:30"
      },
      {
        "id": 12,
        "post_id": 15,
        "user_id": 38,
        "body": "Vel eum modi.",
        "created_at": "2020-10-21T03:50:04.887+05:30",
        "updated_at": "2020-10-21T03:50:04.887+05:30"
      },
      {
        "id": 13,
        "post_id": 16,
        "user_id": 34,
        "body": "Magnam facere ut. Sit reprehenderit id. Voluptas dolorem rem. Hic quo eveniet.",
        "created_at": "2020-10-21T03:50:04.897+05:30",
        "updated_at": "2020-10-21T03:50:04.897+05:30"
      },
      {
        "id": 14,
        "post_id": 18,
        "user_id": 25,
        "body": "Corrupti consectetur maxime. Qui sapiente ad. Et qui et. Ipsam qui placeat.",
        "created_at": "2020-10-21T03:50:04.935+05:30",
        "updated_at": "2020-10-21T03:50:04.935+05:30"
      },
      {
        "id": 15,
        "post_id": 18,
        "user_id": 34,
        "body": "Eos dolor aut.",
        "created_at": "2020-10-21T03:50:04.938+05:30",
        "updated_at": "2020-10-21T03:50:04.938+05:30"
      },
      {
        "id": 16,
        "post_id": 19,
        "user_id": 46,
        "body": "Praesentium suscipit qui. Deleniti velit aut. Vel sed quod.",
        "created_at": "2020-10-21T03:50:04.962+05:30",
        "updated_at": "2020-10-21T03:50:04.962+05:30"
      },
      {
        "id": 17,
        "post_id": 20,
        "user_id": 23,
        "body": "Modi nisi culpa. Aut quisquam odit. Reiciendis totam ut.",
        "created_at": "2020-10-21T03:50:04.979+05:30",
        "updated_at": "2020-10-21T03:50:04.979+05:30"
      },
      {
        "id": 18,
        "post_id": 21,
        "user_id": 27,
        "body": "Accusamus facilis ullam. Suscipit consectetur qui. Aut exercitationem tenetur. Velit quia et.",
        "created_at": "2020-10-21T03:50:04.989+05:30",
        "updated_at": "2020-10-21T03:50:04.989+05:30"
      },
      {
        "id": 19,
        "post_id": 21,
        "user_id": 31,
        "body": "Natus sint voluptate. Nemo exercitationem dolore.",
        "created_at": "2020-10-21T03:50:04.991+05:30",
        "updated_at": "2020-10-21T03:50:04.991+05:30"
      },
      {
        "id": 20,
        "post_id": 22,
        "user_id": 14,
        "body": "Aliquam quibusdam incidunt. Assumenda culpa illum.",
        "created_at": "2020-10-21T03:50:05.009+05:30",
        "updated_at": "2020-10-21T03:50:05.009+05:30"
      },
      {
        "id": 21,
        "post_id": 25,
        "user_id": 13,
        "body": "Qui repudiandae temporibus. Aut aut dolores. Quaerat non unde.",
        "created_at": "2020-10-21T03:50:05.065+05:30",
        "updated_at": "2020-10-21T03:50:05.065+05:30"
      },
      {
        "id": 22,
        "post_id": 25,
        "user_id": 12,
        "body": "Explicabo voluptas accusantium.",
        "created_at": "2020-10-21T03:50:05.068+05:30",
        "updated_at": "2020-10-21T03:50:05.068+05:30"
      },
      {
        "id": 23,
        "post_id": 26,
        "user_id": 10,
        "body": "Fuga eum commodi. Quae sunt sequi. Et blanditiis animi. Asperiores dignissimos provident.",
        "created_at": "2020-10-21T03:50:05.084+05:30",
        "updated_at": "2020-10-21T03:50:05.084+05:30"
      },
      {
        "id": 24,
        "post_id": 26,
        "user_id": 36,
        "body": "Qui itaque ut. Repudiandae quaerat cupiditate.",
        "created_at": "2020-10-21T03:50:05.087+05:30",
        "updated_at": "2020-10-21T03:50:05.087+05:30"
      },
      {
        "id": 25,
        "post_id": 28,
        "user_id": 39,
        "body": "Nobis qui blanditiis. Magni quo et. Atque repudiandae illo.",
        "created_at": "2020-10-21T03:50:05.104+05:30",
        "updated_at": "2020-10-21T03:50:05.104+05:30"
      },
      {
        "id": 26,
        "post_id": 29,
        "user_id": 42,
        "body": "Voluptatem consequuntur nobis.",
        "created_at": "2020-10-21T03:50:05.112+05:30",
        "updated_at": "2020-10-21T03:50:05.112+05:30"
      },
      {
        "id": 27,
        "post_id": 31,
        "user_id": 43,
        "body": "Sequi quia rerum.",
        "created_at": "2020-10-21T03:50:05.128+05:30",
        "updated_at": "2020-10-21T03:50:05.128+05:30"
      },
      {
        "id": 28,
        "post_id": 32,
        "user_id": 46,
        "body": "Dolorem illo qui.",
        "created_at": "2020-10-21T03:50:05.149+05:30",
        "updated_at": "2020-10-21T03:50:05.149+05:30"
      },
      {
        "id": 29,
        "post_id": 33,
        "user_id": 48,
        "body": "Debitis sunt expedita. Culpa aut et.",
        "created_at": "2020-10-21T03:50:05.164+05:30",
        "updated_at": "2020-10-21T03:50:05.164+05:30"
      },
      {
        "id": 30,
        "post_id": 34,
        "user_id": 47,
        "body": "Modi officia nemo.",
        "created_at": "2020-10-21T03:50:05.196+05:30",
        "updated_at": "2020-10-21T03:50:05.196+05:30"
      },
      {
        "id": 31,
        "post_id": 35,
        "user_id": 36,
        "body": "Cupiditate sit id.",
        "created_at": "2020-10-21T03:50:05.226+05:30",
        "updated_at": "2020-10-21T03:50:05.226+05:30"
      },
      {
        "id": 32,
        "post_id": 35,
        "user_id": 16,
        "body": "Ut magni numquam. Aut doloremque earum. Consequuntur reprehenderit distinctio.",
        "created_at": "2020-10-21T03:50:05.229+05:30",
        "updated_at": "2020-10-21T03:50:05.229+05:30"
      },
      {
        "id": 33,
        "post_id": 36,
        "user_id": 44,
        "body": "Nobis facere qui. Facere esse architecto.",
        "created_at": "2020-10-21T03:50:05.236+05:30",
        "updated_at": "2020-10-21T03:50:05.236+05:30"
      },
      {
        "id": 34,
        "post_id": 36,
        "user_id": 46,
        "body": "Fuga quia fugit.",
        "created_at": "2020-10-21T03:50:05.239+05:30",
        "updated_at": "2020-10-21T03:50:05.239+05:30"
      },
      {
        "id": 35,
        "post_id": 37,
        "user_id": 16,
        "body": "Ab at perspiciatis.",
        "created_at": "2020-10-21T03:50:05.265+05:30",
        "updated_at": "2020-10-21T03:50:05.265+05:30"
      },
      {
        "id": 36,
        "post_id": 37,
        "user_id": 16,
        "body": "Aperiam fuga consequuntur. Est atque qui. Odio est labore.",
        "created_at": "2020-10-21T03:50:05.268+05:30",
        "updated_at": "2020-10-21T03:50:05.268+05:30"
      },
      {
        "id": 37,
        "post_id": 38,
        "user_id": 25,
        "body": "Aut cumque incidunt.",
        "created_at": "2020-10-21T03:50:05.276+05:30",
        "updated_at": "2020-10-21T03:50:05.276+05:30"
      },
      {
        "id": 38,
        "post_id": 39,
        "user_id": 20,
        "body": "Laborum omnis neque. Sed molestiae veritatis.",
        "created_at": "2020-10-21T03:50:05.294+05:30",
        "updated_at": "2020-10-21T03:50:05.294+05:30"
      },
      {
        "id": 39,
        "post_id": 40,
        "user_id": 18,
        "body": "Qui deleniti consequuntur.",
        "created_at": "2020-10-21T03:50:05.319+05:30",
        "updated_at": "2020-10-21T03:50:05.319+05:30"
      },
      {
        "id": 40,
        "post_id": 42,
        "user_id": 30,
        "body": "Ipsa aut quam.",
        "created_at": "2020-10-21T03:50:05.343+05:30",
        "updated_at": "2020-10-21T03:50:05.343+05:30"
      },
      {
        "id": 41,
        "post_id": 43,
        "user_id": 35,
        "body": "Id totam beatae. Ullam cupiditate impedit. Provident id est. Laborum ab neque.",
        "created_at": "2020-10-21T03:50:05.354+05:30",
        "updated_at": "2020-10-21T03:50:05.354+05:30"
      },
      {
        "id": 42,
        "post_id": 44,
        "user_id": 12,
        "body": "Possimus expedita voluptatem. A molestias vitae. Dolorem quaerat omnis.",
        "created_at": "2020-10-21T03:50:05.376+05:30",
        "updated_at": "2020-10-21T03:50:05.376+05:30"
      },
      {
        "id": 43,
        "post_id": 44,
        "user_id": 9,
        "body": "Nobis corrupti et.",
        "created_at": "2020-10-21T03:50:05.379+05:30",
        "updated_at": "2020-10-21T03:50:05.379+05:30"
      },
      {
        "id": 45,
        "post_id": 45,
        "user_id": 11,
        "body": "Delectus nostrum officia.",
        "created_at": "2020-10-21T03:50:05.409+05:30",
        "updated_at": "2020-10-21T03:50:05.409+05:30"
      },
      {
        "id": 46,
        "post_id": 47,
        "user_id": 16,
        "body": "Dolor accusantium harum. Nulla est id. Aut omnis eos. Dolorum aut et.",
        "created_at": "2020-10-21T03:50:05.431+05:30",
        "updated_at": "2020-10-21T03:50:05.431+05:30"
      }
    ]
  }
},{}],121:[function(require,module,exports){
module.exports={
  "repo": "TypeScript",
  "type": "json",
  "debug": true,
  "code": 200,
  "meta": {
    "pagination": { "total": 1428, "pages": 72, "page": 1, "limit": 20 }
  },
  "data": [
    {
      "id": 3,
      "user_id": 6,
      "title": "Spero sit aequus quibusdam capio vester aptus cognomen suscipio.",
      "body": "Ea uter vetus. Cras vero auris. Caelestis cunabula praesentium. Curis quia cohors. Tepesco tubineus admitto. Villa turpis basium. Sed cultellus decipio. Defungo pauper subvenio. Veritatis neque artificiose. Cui veritatis cohibeo. Dedico dolore consequatur. Arcesso despirmatio solium. Calcar maxime tricesimus. Sufficio conservo sulum. Tutis cavus sit. Adipisci defetiscor varius. Coadunatio thema ventus. Audentia ustulo terga.",
      "created_at": "2020-10-21T03:50:04.655+05:30",
      "updated_at": "2020-10-21T03:50:04.655+05:30"
    },
    {
      "id": 4,
      "user_id": 6,
      "title": "Asperiores stultus desolo vacuus adflicto deleniti sequi carmen tardus ceno tabula unde nisi.",
      "body": "Angelus arguo audeo. Venustas abstergo aestas. Calamitas candidus desino. Tabella adeo ut. Trucido cubitum aetas. Aperio vitiosus vomito. Deprimo odit alter. Libero cognomen cuppedia. Colligo video triumphus. Amitto annus substantia. Avarus apud venustas. Bene addo quaerat. Collum dolor laudantium. Modi adulescens sunt. Natus voluntarius contra. Aegrus delicate audacia. Timidus casso degero. Arto turbo stella. Despirmatio cubicularis debeo. Urbanus pariatur vestrum. Umerus tergum ut. Sursum consequatur catena. In adstringo vergo. Tenuis cresco delibero. Harum abstergo adflicto. Repellendus civitas bene. Commodi stips deporto. Itaque corroboro callide. Magni argumentum conqueror.",
      "created_at": "2020-10-21T03:50:04.662+05:30",
      "updated_at": "2020-10-21T03:50:04.662+05:30"
    },
    {
      "id": 5,
      "user_id": 9,
      "title": "Quo molestias tam defleo et eius subito sursum degusto decimus virtus magni terra.",
      "body": "Adficio caritas cunabula. Quidem cubo vox. Alii thymum tondeo. Succedo commodo vitiosus. Vivo vilicus despirmatio. Terror desolo sursum. Adipiscor caecus est. Sumptus clamo quod. Verbum capto considero. Nisi ambitus decor. Arguo comes adinventitias. Aperio tristis delinquo. Aut textus nam. Velum ad acidus. Tutamen similique ipsam. Ipsa aegrus arguo. Spoliatio substantia volup. Velum pecus terra.",
      "created_at": "2020-10-21T03:50:04.695+05:30",
      "updated_at": "2020-10-21T03:50:04.695+05:30"
    },
    {
      "id": 6,
      "user_id": 9,
      "title": "Quos cunctatio annus votum sufficio cognomen voluptatibus ascisco celer.",
      "body": "Adultus tenetur armarium. Spoliatio decipio bellum. Ter tenetur tyrannus. Depromo acidus tum. Arguo delibero trucido. Curtus abscido accusamus. Vilis creo volubilis. Terminatio exercitationem armo. Tolero colo confido. Voluntarius excepturi delicate. Supplanto depromo aperte. Repudiandae pecunia tersus. Laudantium consequatur cultellus. Volaticus ultio adeo. Vetus adnuo amoveo. Ipsa aliquam textilis. Turba paulatim confugo. Cubitum vilitas labore. Vix canonicus aggredior. Bardus aegrus verto. Cicuta apto depereo. Tonsor sed qui.",
      "created_at": "2020-10-21T03:50:04.702+05:30",
      "updated_at": "2020-10-21T03:50:04.702+05:30"
    },
    {
      "id": 7,
      "user_id": 10,
      "title": "Consuasor tolero consequatur torqueo alias surculus eveniet ut sed thymbra dens utique aedificium necessitatibus cito capitulus audeo condico.",
      "body": "Vulpes voluptatem sint. Vix cui sit. Curo attonbitus pel. Sortitus volo cattus. Expedita vorax stultus. Cribro cernuus quas. Consectetur carmen unde. Praesentium doloribus adduco. Cras qui videlicet. Bis tredecim cum. Dolores termes caelum. Terror crebro thymbra. Sursum facilis claudeo. Solium aggero viridis. Amplitudo surgo cogito. Bardus denuncio talis. Est colligo canis. Comedo cauda corpus. Aut aperiam theca. Corporis et dolore. Ager velum debeo. Barba thesaurus sed.",
      "created_at": "2020-10-21T03:50:04.719+05:30",
      "updated_at": "2020-10-21T03:50:04.719+05:30"
    },
    {
      "id": 8,
      "user_id": 15,
      "title": "Tempora demulceo debitis dedico audentia harum vis fuga ulciscor aut adnuo totus vomito.",
      "body": "Commodo tres debeo. Qui non repudiandae. Amplitudo consequatur speculum. Conicio thalassinus totidem. Cubo comminor adaugeo. Ipsam cena acquiro. Approbo mollitia vomica. Amet claro tempus. Aut aggredior tamen. Possimus cetera atqui. Dolores culpa tibi. Celo vulticulus valens. Contego patria ventosus. Tredecim quis coma. Nesciunt xiphias velit. Minus cubo accendo. Vilis stillicidium tollo. Cado cur valeo. Quia callide adsum. Civitas subseco trepide. Clarus annus vehemens. Barba valetudo utor. Defendo id quo. Volutabrum calcar velut. Summopere pax eos. Utpote baiulus ambulo. Verto aut quo. Tum quis voluptatibus. Voluptates adulescens patruus.",
      "created_at": "2020-10-21T03:50:04.756+05:30",
      "updated_at": "2020-10-21T03:50:04.756+05:30"
    },
    {
      "id": 9,
      "user_id": 16,
      "title": "Clam aeger adhuc curvo victus degenero.",
      "body": "Aut ait atqui. Delego despecto colo. Accusator deinde spargo. Utique cenaculum arcesso. Sub amplitudo bellicus. Despirmatio vindico admoneo. Altus quas tempus. Vespillo vulnus crinis. Titulus unde undique. Ars absum aequus. Desidero artificiose vulgaris. Ipsam vulgaris baiulus. Sufficio spes cometes. Derideo defaeco beatus. Abduco adopto cuppedia. Subiungo volutabrum crur. Canonicus studio sequi. Non cunae succurro. Rerum voco quas. Atqui aestivus distinctio. Crur voluntarius non. Sulum adversus vulticulus. Casso tepesco et. Delinquo reiciendis cribro. Patruus comitatus bestia. Cur desino aestivus. Suscipio theatrum similique. Quo canonicus valeo.",
      "created_at": "2020-10-21T03:50:04.778+05:30",
      "updated_at": "2020-10-21T03:50:04.778+05:30"
    },
    {
      "id": 10,
      "user_id": 16,
      "title": "Clementia et amicitia temeritas acquiro turpe voluptatem terreo soluta vapulus aut defigo adopto utroque tam annus.",
      "body": "Acidus bestia delicate. Abutor utpote accipio. Doloribus eius vulticulus. Uredo sint catena. Tertius aetas universe. Cupiditas decimus atrox. Subseco laboriosam clementia. Admoveo denuo contra. Voluptatem solutio apparatus. Temporibus coruscus dolor. Summopere arcesso solvo. Temperantia bene corrigo. Tero tabernus aveho. Appono cado attero. Bestia adstringo angelus. Angustus arca adultus. Vester admiratio cinis. Desidero careo callide. Crinis astrum catena. Tolero et acer. Cubo argentum umerus. Vaco abscido volubilis. Tui doloremque ter.",
      "created_at": "2020-10-21T03:50:04.787+05:30",
      "updated_at": "2020-10-21T03:50:04.787+05:30"
    },
    {
      "id": 11,
      "user_id": 17,
      "title": "Omnis vitae accendo volva conicio adopto auctor talus aestas victoria textor suasoria verbera.",
      "body": "Allatus vilicus tubineus. Adduco consequatur tantillus. Totidem concedo vel. Tabgo decor comptus. Bardus eum aeternus. Terebro ullus provident. Coerceo creta aeneus. Circumvenio decet virgo. Volaticus reprehenderit suffragium. Conservo caelestis alius. Cattus annus timidus. Trado constans vomica. Animi aetas volva. Tertius correptius derideo. Autem pauper tyrannus. Casso veniam cognomen.",
      "created_at": "2020-10-21T03:50:04.805+05:30",
      "updated_at": "2020-10-21T03:50:04.805+05:30"
    },
    {
      "id": 12,
      "user_id": 19,
      "title": "Adfero volup causa conscendo decor tum degero torrens conculco sit vociferor dedecor strues vox adhuc coepi absens acervus sustineo.",
      "body": "Cresco id acies. Quas vivo commodi. Caelestis voluptatibus trucido. Totus vox tabesco. Pel fugit vinculum. Urbs depopulo adhaero. Neque sed thesaurus. Sol adultus tracto. Tardus cras totus. Decet infit bibo. Vulgus collum talio. Cohors cupressus velociter. Non statim curo. Ubi venia comitatus. Ipsum tenuis alias. Aliquid adopto vitae.",
      "created_at": "2020-10-21T03:50:04.827+05:30",
      "updated_at": "2020-10-21T03:50:04.827+05:30"
    },
    {
      "id": 13,
      "user_id": 20,
      "title": "Una benigne aut clementia arcesso suggero teneo decimus nostrum sopor ulterius absum cunabula voluptatem peccatus bestia.",
      "body": "Iste incidunt adnuo. Traho corrumpo delicate. Tepesco videlicet uterque. Auxilium amitto patria. Adhaero audeo auditor. Deleniti acies deputo. Subnecto atque vita. Rem voluptatem solvo. Omnis acidus turpis. Ventosus adopto suppono. Tondeo amor aestivus. Textilis audax utor. Stultus quibusdam vis. Deserunt crebro curia. Contego molestiae surculus. Vultuosus debeo aut. Pectus maxime adaugeo. Vix advoco viduata. Appositus tutamen aequus. Decerno veniam aetas. Creta pecus soleo. Surculus abscido tantum. Cogo nulla quos. Absum quibusdam modi. Tamisium verto vero. Communis ut utroque. Arbor strues cohibeo.",
      "created_at": "2020-10-21T03:50:04.845+05:30",
      "updated_at": "2020-10-21T03:50:04.845+05:30"
    },
    {
      "id": 15,
      "user_id": 23,
      "title": "Avaritia ea adipisci stillicidium tametsi comminor illum curvus.",
      "body": "Templum abscido abstergo. Pel cui tubineus. Cervus caelestis astrum. Ara advenio defero. Adaugeo paulatim trado. Conventus repudiandae defigo. Timor trepide illo. Quam theca ex. Dolor vinitor comburo. Sint demo deleo. Distinctio occaecati aperte. Architecto ultra subiungo. Curis ustulo ea. Rem cohibeo tabernus. Ubi aut sto. Est combibo tepidus. Voluptatem rerum victus. Aperiam amplus consequatur.",
      "created_at": "2020-10-21T03:50:04.881+05:30",
      "updated_at": "2020-10-21T03:50:04.881+05:30"
    },
    {
      "id": 16,
      "user_id": 23,
      "title": "Deduco nihil eius distinctio voluptatem acer praesentium ultio somnus.",
      "body": "Voluptate cunae repellendus. Nam decor vultuosus. Mollitia vulgaris pauci. Bellicus strenuus laboriosam. Autem vereor consectetur. Et acies totam. Trado impedit distinctio. Suadeo sit copiose. Atavus audacia tempus. Id testimonium defigo. Autem aurum sto. Adduco taceo usitas. Vapulus suppellex calculus. Terreo defendo cariosus. Taedium labore approbo. Cauda vel est. Rerum deinde desparatus. Aestivus utrum ocer. Demitto antea ultio. Doloremque desolo volo. Thesaurus teres minima. Vilitas theologus tamdiu. Ambitus tabesco suadeo. Ea cilicium error. Combibo commodo avarus. Supplanto vulnero voluptatibus. Quo suscipit admitto. Corroboro tubineus vel. Eos vulgus dolorem.",
      "created_at": "2020-10-21T03:50:04.894+05:30",
      "updated_at": "2020-10-21T03:50:04.894+05:30"
    },
    {
      "id": 17,
      "user_id": 26,
      "title": "Quia surculus tergo omnis debeo tepidus supra ulterius itaque carpo concedo concido conor.",
      "body": "Aperte aequitas demoror. Defaeco subiungo cauda. Angustus coma vulgivagus. Avaritia umquam vultuosus. Vacuus ambitus abbas. Deprimo speculum saepe. Curtus cupressus suscipit. Debilito dolorem arma. Fuga terga universe. Absum harum tenuis. Capitulus delibero adeptio. Unde vis venia. Cattus cur derelinquo. Reprehenderit esse degero. Tondeo appono conscendo. Corrupti nihil absorbeo. Sonitus vicissitudo vigilo.",
      "created_at": "2020-10-21T03:50:04.927+05:30",
      "updated_at": "2020-10-21T03:50:04.927+05:30"
    },
    {
      "id": 18,
      "user_id": 26,
      "title": "Abutor tunc nam ustulo utique ubi convoco tibi est cultellus amet.",
      "body": "Spectaculum quibusdam caelum. Ut cavus cedo. Attollo tempore nihil. Arbor calcar charisma. Maxime corrumpo conduco. Modi inflammatio canto. Et studio qui. Vir blandior commodi. Assentator cibus ait. Undique universe dedico. Adsuesco cibo dapifer. Casus cumque pax. Compello cupiditas eius. Decor odit pauci. Est crur rem. Defluo supellex ultra. Tutis tribuo caput. Virgo apto comburo. Claro patior in. Ullus alii id. Cotidie bis voveo. Terebro terga spectaculum.",
      "created_at": "2020-10-21T03:50:04.932+05:30",
      "updated_at": "2020-10-21T03:50:04.932+05:30"
    },
    {
      "id": 19,
      "user_id": 28,
      "title": "Vetus celebrer talio defendo turba stabilis decumbo odit cuius defero amoveo ut bos accedo cinis.",
      "body": "Tollo peccatus nihil. Sequi thorax adflicto. Impedit autus nostrum. Alii audeo autem. Quia textor convoco. Cicuta sordeo teneo. Impedit angustus in. Careo combibo videlicet. Dolor cui amoveo. Alius vitae audentia. Autem subnecto vix. At capitulus voluptatem. Pecus desino quidem. Vel tandem officia. Celer solitudo aestus. Iusto recusandae aurum. Deripio nemo acer. Degenero cimentarius stillicidium. Admiratio cicuta volaticus. Veritatis cubitum vero. Sto varietas explicabo. Urbs nam et. Cernuus rerum tandem. Cui est deludo. Uter tabesco vilitas.",
      "created_at": "2020-10-21T03:50:04.959+05:30",
      "updated_at": "2020-10-21T03:50:04.959+05:30"
    },
    {
      "id": 20,
      "user_id": 29,
      "title": "Tamdiu ago bellicus abscido volutabrum territo velum eos molestiae adhaero tunc veniam tricesimus temporibus.",
      "body": "Aut adicio tandem. Trepide ulterius carus. Demens audentia vilis. Voluptatem omnis velum. Censura toties demo. Verus utilis soleo. Defendo stipes abbas. Substantia spargo minus. Ustilo vigor varius. Dapifer iste aveho. Tredecim sequi cometes. Aut qui correptius. Omnis decet vos. Basium perspiciatis adaugeo. Totam asporto cultellus.",
      "created_at": "2020-10-21T03:50:04.976+05:30",
      "updated_at": "2020-10-21T03:50:04.976+05:30"
    },
    {
      "id": 21,
      "user_id": 29,
      "title": "Defleo compono bardus velit agnosco desipio custodia.",
      "body": "Quia alias canonicus. Crudelis attollo aetas. Una adimpleo triginta. Virga caute apto. Custodia bis dens. Adulatio sulum audio. Ducimus aedificium incidunt. Hic magnam terminatio. Denique abstergo candidus. Assentator ademptio arbor. Ver tredecim vaco. Pectus vulnus tener. Saepe utor possimus. Bellicus urbs sumptus. Curiositas dicta recusandae. Currus assumenda sui. Dolores cetera sum. Cornu succurro natus. Velut thesis auctus. Aeneus ipsam ullam. Adversus absconditus aut. Certo ait est. Earum congregatio adiuvo. Creptio speculum angulus. Ipsum amet facilis. Adamo somnus casso.",
      "created_at": "2020-10-21T03:50:04.986+05:30",
      "updated_at": "2020-10-21T03:50:04.986+05:30"
    },
    {
      "id": 22,
      "user_id": 30,
      "title": "Sopor terebro est velut ducimus iure non despirmatio vos congregatio.",
      "body": "Vorax surculus est. Impedit deporto universe. Demum aer illum. Natus est omnis. Video placeat minus. Denique omnis pel. Civitas terra tam. Dignissimos decretum vulpes. Colloco alter cuppedia. Aeternus aut trado. Totam totus conforto. Aperte suffoco auditor. Cursus demulceo adnuo. Armo eaque ultio. Considero vinculum soluta. Amaritudo rerum enim. Viscus uredo harum. Labore illo molestias. Substantia agnosco rem. Videlicet sortitus tolero. Clarus vero cedo. Facere facilis cresco. Cavus color tabesco. Sumo accipio tyrannus. Tricesimus voluptates ustilo. Accipio ipsam magni. Solum depereo veritas. Venustas ager ocer.",
      "created_at": "2020-10-21T03:50:05.006+05:30",
      "updated_at": "2020-10-21T03:50:05.006+05:30"
    },
    {
      "id": 23,
      "user_id": 30,
      "title": "Corroboro truculenter delicate culpo alioqui spiritus aeger sursum bonus.",
      "body": "Decor aliquid unde. Porro virgo tertius. Vilicus vulgus basium. Depraedor reiciendis sollers. Deputo eos magnam. Sponte adversus despirmatio. Caveo cumque sophismata. Carus depereo decens. Amet tunc traho. Cerno eos expedita. Vulgo tero quia. Cum veritas conicio. Curia validus surculus. Curriculum sol sono. Porro aptus dolores. Sunt appello allatus. Versus et cupiditas. Territo abscido patior. Cura spiritus aut. Confero expedita defleo. Tonsor aiunt talis. Aut minus claudeo. Careo vitiosus curso. Canonicus voluptatem agnitio. Caterva acies admitto.",
      "created_at": "2020-10-21T03:50:05.016+05:30",
      "updated_at": "2020-10-21T03:50:05.016+05:30"
    },
    {
      "id": 24,
      "user_id": 31,
      "title": "Communis incidunt totam ducimus accendo debilito.",
      "body": "Adsum uredo suffoco. Advenio aduro vorax. Certus arx aliquam. Pecunia aiunt voluptas. Venustas timidus videlicet. Currus armo architecto. Sufficio ea balbus. Ceno aequitas vaco. Dignissimos tremo tertius. Avoco coruscus dolores. Chirographum dolor vester. Et compello stillicidium. Vitiosus verbum angustus. Cras summisse tergum. Candidus vivo molestiae. Umquam amo audio. Ut numquam coaegresco. Vicissitudo vester volup. Caterva omnis vulpes. Comis claudeo arcesso. Cariosus quisquam attero. Surgo adipiscor clibanus. Claro vilitas ambulo. Appono cimentarius est. Depraedor architecto tremo. Vae baiulus sed. Cognatus eos recusandae. Umerus tutis viduata. Ademptio defero coniuratio.",
      "created_at": "2020-10-21T03:50:05.035+05:30",
      "updated_at": "2020-10-21T03:50:05.035+05:30"
    },
    {
      "id": 25,
      "user_id": 34,
      "title": "Complectus vallum aestas contego esse depraedor.",
      "body": "Deorsum nemo rerum. Aperte arca clarus. Uxor eos vehemens. Talus ambulo ocer. Ambulo teneo rerum. Patior tutamen comedo. Asperiores amplexus tero. Colligo adipiscor argentum. Peccatus inflammatio totus. Acquiro ventito debilito. Auxilium admitto articulus. Ventosus voluptatem decretum. Tantillus vox trucido. Truculenter dicta unde. Agnosco tergeo viscus. Baiulus eum ancilla.",
      "created_at": "2020-10-21T03:50:05.061+05:30",
      "updated_at": "2020-10-21T03:50:05.061+05:30"
    },
    {
      "id": 26,
      "user_id": 35,
      "title": "Aureus certo amiculum ocer ventus consequuntur aro correptius usitas crebro curatio dolorem torrens campana ascit.",
      "body": "Dolores adaugeo enim. Quisquam sui ea. Vehemens adicio tutamen. Decimus sunt hic. Animus ea teres. Sint antepono summisse. Cibus sum vilitas. Omnis cilicium desidero. Sollicito arto debilito. Candidus turba clam. Curriculum conventus fuga. Omnis umquam qui. Canis certus succurro. Aestas error assentator. Bardus adaugeo voluptatum. Currus deduco vitae. Peior voluptatum succurro. Tabella capillus cras. Cariosus causa apud.",
      "created_at": "2020-10-21T03:50:05.081+05:30",
      "updated_at": "2020-10-21T03:50:05.081+05:30"
    },
    {
      "id": 28,
      "user_id": 36,
      "title": "Custodia sit alioqui vae tepidus conturbo nesciunt neque vestigium sumo careo.",
      "body": "Supplanto xiphias vitae. Solum carcer advenio. Ascisco trans sodalitas. Absorbeo apparatus commemoro. Sto commodo crapula. Decretum vesco claudeo. Corroboro adsuesco amplitudo. Consequuntur volubilis rerum. Alo sumo suppellex. Voluptates thermae nesciunt. Adhuc labore textus. Temptatio vester acer. Consectetur crux ventito. Accendo crudelis tutamen. Trepide tabesco vomer. Speculum vero theatrum. Usque pecco quam. Depono decimus brevis.",
      "created_at": "2020-10-21T03:50:05.101+05:30",
      "updated_at": "2020-10-21T03:50:05.101+05:30"
    },
    {
      "id": 29,
      "user_id": 36,
      "title": "Canto antepono creber sortitus aut vilicus atrocitas voluptas constans.",
      "body": "Amaritudo et rerum. Cogo acsi suscipit. Tepidus adsidue votum. Admoveo conqueror asper. Crastinus vaco aspicio. Arbor perspiciatis taceo. Clam arbitro conventus. Asporto vallum tyrannus. Patrocinor ambitus absum. Autem amplus vultuosus. Pectus carus vilitas. Conitor neque theatrum. Nam carbo quo. Urbs vel texo. Adaugeo tyrannus alias. Degero vis aut. Pauper fuga cohors. Abundans atavus peior. Conservo eum tot.",
      "created_at": "2020-10-21T03:50:05.109+05:30",
      "updated_at": "2020-10-21T03:50:05.109+05:30"
    },
    {
      "id": 31,
      "user_id": 37,
      "title": "Et ea vindico vulnero uter summopere appello tres utrum cernuus ubi demoror aveho callide thalassinus cotidie.",
      "body": "Aeneus talus eum. Ante charisma cohaero. Adiuvo demitto commodi. Solitudo decipio curia. Coma caste quidem. Beneficium reprehenderit iusto. Verbum caritas surculus. Socius sed solus. Tabernus addo textilis. Speciosus communis benevolentia. Ut delego delinquo. Arguo cognomen animus. Tenax terreo capitulus. Adfero subito repudiandae. Titulus inflammatio copiose. Cavus aequitas denuo. Vestrum libero dolor. Est creptio ventus. Consuasor vultuosus alii. Ademptio asperiores ambulo. Templum velut capio.",
      "created_at": "2020-10-21T03:50:05.125+05:30",
      "updated_at": "2020-10-21T03:50:05.125+05:30"
    },
    {
      "id": 32,
      "user_id": 39,
      "title": "Complectus veniam corona ancilla coadunatio appono uberrime vilicus aro caelestis comes peccatus apto uxor virtus animus thesaurus soluta coniuratio.",
      "body": "Clam volubilis demens. Curo dolorem vobis. Turpis cognatus viduata. Caveo testimonium angulus. Verumtamen stultus verus. Crinis temporibus utroque. Triumphus vitiosus amissio. Et complectus eos. Aperte terreo caries. Quas adamo truculenter. Veritas consequatur dedecor. Apto conitor aestas. Quas angelus ancilla. Stips crux animi. Suffoco tenetur textus. Ut corona curvo. Territo assentator tot. Confero utrum amaritudo. Cornu subseco combibo. Agnosco dolores tepidus. Vicissitudo bis tubineus. Denique demum argumentum. Sed vel supellex. Viscus adflicto assentator. Acerbitas urbs supplanto. Vereor convoco caute. Valens omnis cimentarius.",
      "created_at": "2020-10-21T03:50:05.146+05:30",
      "updated_at": "2020-10-21T03:50:05.146+05:30"
    },
    {
      "id": 33,
      "user_id": 40,
      "title": "Vindico comburo caecus libero reiciendis auctor tabula theologus civis tracto concido animus sublime omnis adsidue caelum.",
      "body": "Texo repellendus vae. Temeritas ventus angelus. Combibo angustus angelus. Cunctatio succurro uberrime. Non solitudo summopere. Comptus venustas voluptatibus. Cohors deporto rerum. Decet viduo voluptatem. Et triginta blandior. Tego audentia comburo. Omnis baiulus ullam. Usus abstergo praesentium. Aggredior defleo conqueror. Exercitationem aer sodalitas. Debeo victus aliquid. Callide clarus quas. Agnosco acer tantum. Civis canto defungo.",
      "created_at": "2020-10-21T03:50:05.161+05:30",
      "updated_at": "2020-10-21T03:50:05.161+05:30"
    },
    {
      "id": 34,
      "user_id": 44,
      "title": "Via rerum coruscus venia teneo vaco dolor vulgaris temeritas suscipio compono.",
      "body": "Verumtamen tego praesentium. Brevis accusantium umerus. Blandior videlicet cedo. Caecus vehemens colligo. Venia cauda alveus. Succedo capillus arbitro. Validus deripio victoria. Absconditus vester peior. Alioqui cupiditate angustus. Denuncio deputo averto. Cuius voluptatibus denuo. Abeo curtus eaque. Audentia ea usque. Aestivus curriculum validus. Ago comburo tepidus. Canis testimonium volo. Una dolore amplitudo. Cilicium amiculum amaritudo. Occaecati molestiae vergo. Desino denego testimonium. Abduco subseco thermae.",
      "created_at": "2020-10-21T03:50:05.193+05:30",
      "updated_at": "2020-10-21T03:50:05.193+05:30"
    },
    {
      "id": 35,
      "user_id": 47,
      "title": "Altus amoveo clibanus asper saepe tubineus magni civitas vallum tyrannus sopor terga rem vetus conspergo caput quis autem causa.",
      "body": "Vito terminatio bene. Capitulus sum cognomen. Culpa expedita curtus. Patrocinor bene admiratio. Vociferor agnosco amplitudo. Textilis facere ara. Volutabrum curriculum contego. Amiculum turpis doloribus. Stabilis pecus cervus. Solitudo via canto. Delego altus magnam. Asperiores sonitus capio. Trans caute copia. Denique odio aut. Distinctio unde claro. Suscipit recusandae sulum. Doloribus umbra alias. Super tutamen curvus. Colligo cursus arcesso.",
      "created_at": "2020-10-21T03:50:05.223+05:30",
      "updated_at": "2020-10-21T03:50:05.223+05:30"
    },
    {
      "id": 36,
      "user_id": 47,
      "title": "Tunc decens audentia amicitia aduro consequatur animi sollicito vir traho termes arma aut conitor teneo celer.",
      "body": "Dolores corrigo bos. Soleo compello talis. Traho sperno valens. Caute consuasor xiphias. Beatae volva suscipio. Versus alo facere. Minima defleo non. Vae agnitio spoliatio. Bonus tremo enim. Excepturi spargo amiculum. Minima aut vulnus. Ars soluta quia. Consequuntur administratio clibanus. Delibero utor complectus. Valde volutabrum apostolus. Vero aegre subnecto. Cotidie capitulus tracto. Vel allatus paens. Absque totidem quod.",
      "created_at": "2020-10-21T03:50:05.233+05:30",
      "updated_at": "2020-10-21T03:50:05.233+05:30"
    }
  ]
}

},{}],122:[function(require,module,exports){
module.exports={
  "repo": "TypeScript",
  "type": "json",
  "code": 200,
  "meta": {
    "pagination": { "total": 1868, "pages": 94, "page": 1, "limit": 20 }
  },
  "data": [
    {
      "id": 6,
      "name": "Hari Chattopadhyay",
      "email": "chattopadhyay_hari@towne.name",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.649+05:30",
      "updated_at": "2020-10-21T19:54:05.032+05:30"
    },
    {
      "id": 7,
      "name": "Anunay Reddy",
      "email": "anunay_reddy@goldner.com",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.681+05:30",
      "updated_at": "2020-10-21T03:50:04.681+05:30"
    },
    {
      "id": 8,
      "name": "Kalinda Dwivedi PhD",
      "email": "phd_dwivedi_kalinda@waters.info",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.686+05:30",
      "updated_at": "2020-10-21T03:50:04.686+05:30"
    },
    {
      "id": 9,
      "name": "Preity Singh DO",
      "email": "singh_preity_do@doyle.net",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.690+05:30",
      "updated_at": "2020-10-21T03:50:04.690+05:30"
    },
    {
      "id": 10,
      "name": "Trilochana Sinha",
      "email": "sinha_trilochana@langworth-mohr.info",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.714+05:30",
      "updated_at": "2020-10-21T03:50:04.714+05:30"
    },
    {
      "id": 11,
      "name": "Saroja Malik",
      "email": "saroja_malik@maggio-connelly.com",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.728+05:30",
      "updated_at": "2020-10-21T03:50:04.728+05:30"
    },
    {
      "id": 12,
      "name": "Shrishti Malik",
      "email": "malik_shrishti@medhurst.com",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.737+05:30",
      "updated_at": "2020-10-21T03:50:04.737+05:30"
    },
    {
      "id": 13,
      "name": "Rev. Bankimchandra Tandon",
      "email": "tandon_bankimchandra_rev@blanda-cormier.net",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.742+05:30",
      "updated_at": "2020-10-21T03:50:04.742+05:30"
    },
    {
      "id": 14,
      "name": "Menaka Mishra",
      "email": "menaka_mishra@turner-hodkiewicz.biz",
      "gender": "Female",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.746+05:30",
      "updated_at": "2020-10-21T03:50:04.746+05:30"
    },
    {
      "id": 15,
      "name": "Narendra Panicker VM",
      "email": "panicker_vm_narendra@dietrich.io",
      "gender": "Female",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.749+05:30",
      "updated_at": "2020-10-21T03:50:04.749+05:30"
    },
    {
      "id": 16,
      "name": "Goswami Sharma",
      "email": "sharma_goswami@robel.net",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.770+05:30",
      "updated_at": "2020-10-21T03:50:04.770+05:30"
    },
    {
      "id": 17,
      "name": "Chakrika Gowda",
      "email": "gowda_chakrika@anderson-yost.io",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.800+05:30",
      "updated_at": "2020-10-21T03:50:04.800+05:30"
    },
    {
      "id": 18,
      "name": "Rupinder Pandey",
      "email": "pandey_rupinder@schowalter.name",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.813+05:30",
      "updated_at": "2020-10-21T03:50:04.813+05:30"
    },
    {
      "id": 19,
      "name": "Mr. Ernest",
      "email": "mr_sarvin_guha@spinka.org",
      "gender": "Female",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.822+05:30",
      "updated_at": "2020-10-21T13:21:18.154+05:30"
    },
    {
      "id": 20,
      "name": "Jyoti Mehra",
      "email": "jyoti_mehra@champlin-mccullough.net",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.838+05:30",
      "updated_at": "2020-10-21T03:50:04.838+05:30"
    },
    {
      "id": 23,
      "name": "Saraswati Guneta",
      "email": "saraswati_guneta@kreiger.info",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.876+05:30",
      "updated_at": "2020-10-21T03:50:04.876+05:30"
    },
    {
      "id": 24,
      "name": "Malti Devar",
      "email": "devar_malti@rempel.net",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.904+05:30",
      "updated_at": "2020-10-21T03:50:04.904+05:30"
    },
    {
      "id": 25,
      "name": "Amb. Devasree Khatri",
      "email": "khatri_amb_devasree@corwin.org",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.912+05:30",
      "updated_at": "2020-10-21T03:50:04.912+05:30"
    },
    {
      "id": 26,
      "name": "Washington Luis Cabral da Silva",
      "email": "wluissilva@live.com",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.921+05:30",
      "updated_at": "2020-10-21T08:36:39.505+05:30"
    },
    {
      "id": 27,
      "name": "Prof. Shreya Ganaka",
      "email": "ganaka_shreya_prof@labadie.net",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.949+05:30",
      "updated_at": "2020-10-21T03:50:04.949+05:30"
    },
    {
      "id": 28,
      "name": "Varalakshmi Khatri",
      "email": "varalakshmi_khatri@abshire-lang.io",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.952+05:30",
      "updated_at": "2020-10-21T03:50:04.952+05:30"
    },
    {
      "id": 29,
      "name": "Devi Ahluwalia",
      "email": "ahluwalia_devi@west.biz",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:04.971+05:30",
      "updated_at": "2020-10-21T03:50:04.971+05:30"
    },
    {
      "id": 30,
      "name": "Purushottam Nambeesan",
      "email": "purushottam_nambeesan@bashirian-zulauf.info",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:04.999+05:30",
      "updated_at": "2020-10-21T03:50:04.999+05:30"
    },
    {
      "id": 31,
      "name": "Apsara Somayaji",
      "email": "apsara_somayaji@ratke.com",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.024+05:30",
      "updated_at": "2020-10-21T03:50:05.024+05:30"
    },
    {
      "id": 32,
      "name": "Eekalabya Menon",
      "email": "eekalabya_menon@sipes-anderson.net",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.041+05:30",
      "updated_at": "2020-10-21T03:50:05.041+05:30"
    },
    {
      "id": 34,
      "name": "Uttam Dhawan Ret.",
      "email": "uttam_ret_dhawan@mayer.name",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.057+05:30",
      "updated_at": "2020-10-21T03:50:05.057+05:30"
    },
    {
      "id": 35,
      "name": "Miss Sujata Somayaji",
      "email": "sujata_miss_somayaji@graham-funk.org",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.075+05:30",
      "updated_at": "2020-10-21T03:50:05.075+05:30"
    },
    {
      "id": 36,
      "name": "Sarla Patil VM",
      "email": "sarla_vm_patil@hills-donnelly.biz",
      "gender": "Female",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.096+05:30",
      "updated_at": "2020-10-21T03:50:05.096+05:30"
    },
    {
      "id": 37,
      "name": "Aanandinii Ahuja",
      "email": "ahuja_aanandinii@gusikowski.name",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.115+05:30",
      "updated_at": "2020-10-21T03:50:05.115+05:30"
    },
    {
      "id": 38,
      "name": "Anuja Gandhi",
      "email": "anuja_gandhi@bahringer-auer.com",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.133+05:30",
      "updated_at": "2020-10-21T03:50:05.133+05:30"
    },
    {
      "id": 39,
      "name": "Himadri Nehru",
      "email": "himadri_nehru@bashirian.io",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.140+05:30",
      "updated_at": "2020-10-21T03:50:05.140+05:30"
    },
    {
      "id": 40,
      "name": "Ms. Murphy Quitzon",
      "email": "Samir.Lowe@gmail.com",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.156+05:30",
      "updated_at": "2020-10-21T08:36:25.610+05:30"
    },
    {
      "id": 41,
      "name": "Miss Abani Malik",
      "email": "malik_miss_abani@goyette.io",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.167+05:30",
      "updated_at": "2020-10-21T03:50:05.167+05:30"
    },
    {
      "id": 42,
      "name": "Shakti Adiga",
      "email": "shakti_adiga@wuckert.co",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.171+05:30",
      "updated_at": "2020-10-21T03:50:05.171+05:30"
    },
    {
      "id": 43,
      "name": "Gurdev Bandopadhyay",
      "email": "bandopadhyay_gurdev@collins.co",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.180+05:30",
      "updated_at": "2020-10-21T03:50:05.180+05:30"
    },
    {
      "id": 44,
      "name": "Sunita Ganaka",
      "email": "ganaka_sunita@volkman.name",
      "gender": "Male",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.187+05:30",
      "updated_at": "2020-10-21T03:50:05.187+05:30"
    },
    {
      "id": 45,
      "name": "Somnath Ahuja",
      "email": "ahuja_somnath@gutkowski-kautzer.org",
      "gender": "Female",
      "status": "Active",
      "created_at": "2020-10-21T03:50:05.204+05:30",
      "updated_at": "2020-10-21T03:50:05.204+05:30"
    },
    {
      "id": 46,
      "name": "Amb. Drona Arora",
      "email": "amb_arora_drona@rath.co",
      "gender": "Female",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.210+05:30",
      "updated_at": "2020-10-21T03:50:05.210+05:30"
    },
    {
      "id": 47,
      "name": "Fr. Tara Deshpande",
      "email": "tara_fr_deshpande@howe.com",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.218+05:30",
      "updated_at": "2020-10-21T03:50:05.218+05:30"
    },
    {
      "id": 48,
      "name": "Menaka Kaul Esq.",
      "email": "kaul_menaka_esq@smith.info",
      "gender": "Male",
      "status": "Inactive",
      "created_at": "2020-10-21T03:50:05.246+05:30",
      "updated_at": "2020-10-21T03:50:05.246+05:30"
    }
  ]
}

},{}],123:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getPosts = exports.getComments = void 0;
var comments_json_1 = __importDefault(require("./data/comments.json"));
var posts_json_1 = __importDefault(require("./data/posts.json"));
var users_json_1 = __importDefault(require("./data/users.json"));
comments_json_1.default.repo;
posts_json_1.default.repo;
users_json_1.default.repo;
var generateDelayTime = function () { return Math.random() * 1500 + 100; };
var getComments = function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(comments_json_1.default); }, generateDelayTime()); }); };
exports.getComments = getComments;
var getPosts = function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(posts_json_1.default); }, generateDelayTime()); }); };
exports.getPosts = getPosts;
var getUsers = function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(users_json_1.default); }, generateDelayTime()); }); };
exports.getUsers = getUsers;

},{"./data/comments.json":120,"./data/posts.json":121,"./data/users.json":122}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var index_1 = require("./index");
var div = document.querySelector('div');
var ul = document.createElement('ul');
var li = document.createElement('li');
var l2 = document.createElement('l2');
var h3 = document.createElement('h3');
var h4 = document.createElement('l3');
var getPostSubject = new rxjs_1.ReplaySubject();
index_1.getPosts().then(function (response) {
    var data = response.data;
    data.every(function (post) {
        var postId = post.id;
        index_1.getComments().then(function (response) {
            var comments = response.data;
            comments.every(function (comment) {
                var postCommentId = comment.postId;
                var postCommentUserId = comment.userId;
                //comments.pipe(filter(ev => postCommentId === postId));
                index_1.getUsers().then(function (response) {
                    var users = response.data;
                    users.every(function (user) {
                        var userId = user.id;
                        // users.pipe(filter(ev => userId === postCommentUserId));
                        // users.subscribe(userId => console.log("userId:", userId));
                    });
                });
            });
        });
    });
    paint(response);
});
function paint(feed) {
    console.log('paint');
    var posts = new Array(feed.data[0]);
    //console.log(posts);
    posts.every(function (post) {
        // post.every(item => {
        // console.log("Single: " + post);
        div.textContent = "Big Title: :" + post.title;
        // posts.every(comment => {
        li.textContent = ('Id: :' + post.id + 'Title :' + post.title + 'Body:' + post.body);
        // posts.every(user => {
        //   li.textContent.concat('userId: ' + user.id);
        div.appendChild(ul).appendChild(li);
        // });
        // });
    });
    // });
}
;

},{"./index":123,"rxjs":2}]},{},[124])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Bc3luY1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9PYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvUmVwbGF5U3ViamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1NjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL1N1YmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvY29uZmlnLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvZmlyc3RWYWx1ZUZyb20uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9sYXN0VmFsdWVGcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvYmluZENhbGxiYWNrSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb25jYXQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Nvbm5lY3RhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9kZWZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZG9tL2FuaW1hdGlvbkZyYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2ZvcmtKb2luLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50UGF0dGVybi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvZ2VuZXJhdGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2lpZi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvaW50ZXJ2YWwuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvb2YuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYWlycy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvcGFydGl0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYWNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29ic2VydmFibGUvdGltZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb2JzZXJ2YWJsZS96aXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdEFsbC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlQWxsLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlSW50ZXJuYWxzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL21lcmdlTWFwLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvb3BlcmF0b3JzL29ic2VydmVPbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9vbkVycm9yUmVzdW1lTmV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9yZWZDb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy9zdWJzY3JpYmVPbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVBc3luY0l0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlSXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVPYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZWQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FuaW1hdGlvbkZyYW1lQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL0FzYXBBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvQXNhcFNjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9Bc3luY0FjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9Bc3luY1NjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9RdWV1ZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9RdWV1ZVNjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9WaXJ0dWFsVGltZVNjaGVkdWxlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9hbmltYXRpb25GcmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9hbmltYXRpb25GcmFtZVByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2FzYXAuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYXN5bmMuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvZGF0ZVRpbWVzdGFtcFByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2ltbWVkaWF0ZVByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvc2NoZWR1bGVyL2ludGVydmFsUHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zY2hlZHVsZXIvcGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci9xdWV1ZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3NjaGVkdWxlci90aW1lb3V0UHJvdmlkZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3R5cGVzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvRW1wdHlFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvSW1tZWRpYXRlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9Ob3RGb3VuZEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvU2VxdWVuY2VFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvYXJncy5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvYXJnc0FyZ0FycmF5T3JPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2FyZ3NPckFyZ0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9hcnJSZW1vdmUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2NhdWdodFNjaGVkdWxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVFcnJvckNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9jcmVhdGVPYmplY3QuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0FycmF5TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNBc3luY0l0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc0RhdGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzSXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2lzT2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNQcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL3J4anMvZGlzdC9janMvaW50ZXJuYWwvdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvaXNTY2hlZHVsZXIuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL2xpZnQuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL21hcE9uZU9yTWFueUFyZ3MuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL25vb3AuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL25vdC5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvcGlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yeGpzL2Rpc3QvY2pzL2ludGVybmFsL3V0aWwvcmVwb3J0VW5oYW5kbGVkRXJyb3IuanMiLCJub2RlX21vZHVsZXMvcnhqcy9kaXN0L2Nqcy9pbnRlcm5hbC91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3IuanMiLCJzcmMvZGF0YS9jb21tZW50cy5qc29uIiwic3JjL2RhdGEvcG9zdHMuanNvbiIsInNyYy9kYXRhL3VzZXJzLmpzb24iLCJzcmMvaW5kZXgudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbFhBLHVFQUE0QztBQUM1QyxpRUFBc0M7QUFDdEMsaUVBQXNDO0FBRXRDLHVCQUFRLENBQUMsSUFBSSxDQUFDO0FBQ2Qsb0JBQUssQ0FBQyxJQUFJLENBQUM7QUFDWCxvQkFBSyxDQUFDLElBQUksQ0FBQztBQUVYLElBQU0saUJBQWlCLEdBQUcsY0FBTSxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUExQixDQUEwQixDQUFDO0FBRXBELElBQU0sV0FBVyxHQUFHLGNBQU0sT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUFRLENBQUMsRUFBakIsQ0FBaUIsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQXhELENBQXdELENBQUMsRUFBbEYsQ0FBa0YsQ0FBQztBQUF2RyxRQUFBLFdBQVcsZUFBNEY7QUFDN0csSUFBTSxRQUFRLEdBQUcsY0FBTSxPQUFBLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsb0JBQUssQ0FBQyxFQUFkLENBQWMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQXJELENBQXFELENBQUMsRUFBL0UsQ0FBK0UsQ0FBQztBQUFqRyxRQUFBLFFBQVEsWUFBeUY7QUFDdkcsSUFBTSxRQUFRLEdBQUcsY0FBTSxPQUFBLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsb0JBQUssQ0FBQyxFQUFkLENBQWMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQXJELENBQXFELENBQUMsRUFBL0UsQ0FBK0UsQ0FBQztBQUFqRyxRQUFBLFFBQVEsWUFBeUY7Ozs7O0FDWDlHLDZCQUFpRDtBQUNqRCxpQ0FBeUQ7QUFFekQsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUxQyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxvQkFBYSxFQUFFLENBQUM7QUFHM0MsZ0JBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWE7SUFDNUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUMsSUFBUztRQUNuQixJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRTFCLG1CQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFhO1lBQy9CLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDN0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFDLE9BQVk7Z0JBQzFCLElBQUksYUFBYSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFFdkMsd0RBQXdEO2dCQUV4RCxnQkFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBYTtvQkFDNUIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUk7d0JBQ2YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDckIsMERBQTBEO3dCQUMxRCw2REFBNkQ7b0JBQy9ELENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsU0FBUyxLQUFLLENBQUMsSUFBUztJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwQyxxQkFBcUI7SUFFckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLElBQUk7UUFDZCx1QkFBdUI7UUFDckIsa0NBQWtDO1FBQ2xDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFOUMsMkJBQTJCO1FBQzNCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BGLHdCQUF3QjtRQUN4QixpREFBaUQ7UUFDakQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsTUFBTTtRQUNOLE1BQU07SUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLE1BQU07QUFDUixDQUFDO0FBQUEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbnRlcnZhbCA9IGV4cG9ydHMuaWlmID0gZXhwb3J0cy5nZW5lcmF0ZSA9IGV4cG9ydHMuZnJvbUV2ZW50UGF0dGVybiA9IGV4cG9ydHMuZnJvbUV2ZW50ID0gZXhwb3J0cy5mcm9tID0gZXhwb3J0cy5mb3JrSm9pbiA9IGV4cG9ydHMuZW1wdHkgPSBleHBvcnRzLmRlZmVyID0gZXhwb3J0cy5jb25uZWN0YWJsZSA9IGV4cG9ydHMuY29uY2F0ID0gZXhwb3J0cy5jb21iaW5lTGF0ZXN0ID0gZXhwb3J0cy5iaW5kTm9kZUNhbGxiYWNrID0gZXhwb3J0cy5iaW5kQ2FsbGJhY2sgPSBleHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBleHBvcnRzLlRpbWVvdXRFcnJvciA9IGV4cG9ydHMuU2VxdWVuY2VFcnJvciA9IGV4cG9ydHMuT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgPSBleHBvcnRzLk5vdEZvdW5kRXJyb3IgPSBleHBvcnRzLkVtcHR5RXJyb3IgPSBleHBvcnRzLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yID0gZXhwb3J0cy5maXJzdFZhbHVlRnJvbSA9IGV4cG9ydHMubGFzdFZhbHVlRnJvbSA9IGV4cG9ydHMuaXNPYnNlcnZhYmxlID0gZXhwb3J0cy5pZGVudGl0eSA9IGV4cG9ydHMubm9vcCA9IGV4cG9ydHMucGlwZSA9IGV4cG9ydHMuTm90aWZpY2F0aW9uS2luZCA9IGV4cG9ydHMuTm90aWZpY2F0aW9uID0gZXhwb3J0cy5TdWJzY3JpYmVyID0gZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBleHBvcnRzLlNjaGVkdWxlciA9IGV4cG9ydHMuVmlydHVhbEFjdGlvbiA9IGV4cG9ydHMuVmlydHVhbFRpbWVTY2hlZHVsZXIgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZSA9IGV4cG9ydHMucXVldWVTY2hlZHVsZXIgPSBleHBvcnRzLnF1ZXVlID0gZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IGV4cG9ydHMuYXN5bmMgPSBleHBvcnRzLmFzYXBTY2hlZHVsZXIgPSBleHBvcnRzLmFzYXAgPSBleHBvcnRzLkFzeW5jU3ViamVjdCA9IGV4cG9ydHMuUmVwbGF5U3ViamVjdCA9IGV4cG9ydHMuQmVoYXZpb3JTdWJqZWN0ID0gZXhwb3J0cy5TdWJqZWN0ID0gZXhwb3J0cy5hbmltYXRpb25GcmFtZXMgPSBleHBvcnRzLm9ic2VydmFibGUgPSBleHBvcnRzLkNvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IGV4cG9ydHMuT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbmV4cG9ydHMuY29uZmlnID0gZXhwb3J0cy5ORVZFUiA9IGV4cG9ydHMuRU1QVFkgPSBleHBvcnRzLnNjaGVkdWxlZCA9IGV4cG9ydHMuemlwID0gZXhwb3J0cy51c2luZyA9IGV4cG9ydHMudGltZXIgPSBleHBvcnRzLnRocm93RXJyb3IgPSBleHBvcnRzLnJhbmdlID0gZXhwb3J0cy5yYWNlID0gZXhwb3J0cy5wYXJ0aXRpb24gPSBleHBvcnRzLnBhaXJzID0gZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IGV4cG9ydHMub2YgPSBleHBvcnRzLm5ldmVyID0gZXhwb3J0cy5tZXJnZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9PYnNlcnZhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiT2JzZXJ2YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gT2JzZXJ2YWJsZV8xLk9ic2VydmFibGU7IH0gfSk7XG52YXIgQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbm5lY3RhYmxlT2JzZXJ2YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQ29ubmVjdGFibGVPYnNlcnZhYmxlXzEuQ29ubmVjdGFibGVPYnNlcnZhYmxlOyB9IH0pO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3N5bWJvbC9vYnNlcnZhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib2JzZXJ2YWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2YWJsZV8xLm9ic2VydmFibGU7IH0gfSk7XG52YXIgYW5pbWF0aW9uRnJhbWVzXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2RvbS9hbmltYXRpb25GcmFtZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhbmltYXRpb25GcmFtZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFuaW1hdGlvbkZyYW1lc18xLmFuaW1hdGlvbkZyYW1lczsgfSB9KTtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9TdWJqZWN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3ViamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU3ViamVjdF8xLlN1YmplY3Q7IH0gfSk7XG52YXIgQmVoYXZpb3JTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJCZWhhdmlvclN1YmplY3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEJlaGF2aW9yU3ViamVjdF8xLkJlaGF2aW9yU3ViamVjdDsgfSB9KTtcbnZhciBSZXBsYXlTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9SZXBsYXlTdWJqZWN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUmVwbGF5U3ViamVjdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gUmVwbGF5U3ViamVjdF8xLlJlcGxheVN1YmplY3Q7IH0gfSk7XG52YXIgQXN5bmNTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9Bc3luY1N1YmplY3RcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBc3luY1N1YmplY3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFzeW5jU3ViamVjdF8xLkFzeW5jU3ViamVjdDsgfSB9KTtcbnZhciBhc2FwXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZXIvYXNhcFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFzYXBcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFzYXBfMS5hc2FwOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXNhcFNjaGVkdWxlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXNhcF8xLmFzYXBTY2hlZHVsZXI7IH0gfSk7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlci9hc3luY1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFzeW5jXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhc3luY18xLmFzeW5jOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXN5bmNTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFzeW5jXzEuYXN5bmNTY2hlZHVsZXI7IH0gfSk7XG52YXIgcXVldWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlci9xdWV1ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInF1ZXVlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBxdWV1ZV8xLnF1ZXVlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicXVldWVTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHF1ZXVlXzEucXVldWVTY2hlZHVsZXI7IH0gfSk7XG52YXIgYW5pbWF0aW9uRnJhbWVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlci9hbmltYXRpb25GcmFtZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFuaW1hdGlvbkZyYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhbmltYXRpb25GcmFtZV8xLmFuaW1hdGlvbkZyYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFuaW1hdGlvbkZyYW1lXzEuYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXI7IH0gfSk7XG52YXIgVmlydHVhbFRpbWVTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3NjaGVkdWxlci9WaXJ0dWFsVGltZVNjaGVkdWxlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZpcnR1YWxUaW1lU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBWaXJ0dWFsVGltZVNjaGVkdWxlcl8xLlZpcnR1YWxUaW1lU2NoZWR1bGVyOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmlydHVhbEFjdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gVmlydHVhbFRpbWVTY2hlZHVsZXJfMS5WaXJ0dWFsQWN0aW9uOyB9IH0pO1xudmFyIFNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvU2NoZWR1bGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2NoZWR1bGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTY2hlZHVsZXJfMS5TY2hlZHVsZXI7IH0gfSk7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9TdWJzY3JpcHRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdWJzY3JpcHRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbjsgfSB9KTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9TdWJzY3JpYmVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3Vic2NyaWJlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU3Vic2NyaWJlcl8xLlN1YnNjcmliZXI7IH0gfSk7XG52YXIgTm90aWZpY2F0aW9uXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9Ob3RpZmljYXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb3RpZmljYXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE5vdGlmaWNhdGlvbl8xLk5vdGlmaWNhdGlvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vdGlmaWNhdGlvbktpbmRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE5vdGlmaWNhdGlvbl8xLk5vdGlmaWNhdGlvbktpbmQ7IH0gfSk7XG52YXIgcGlwZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9waXBlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGlwZV8xLnBpcGU7IH0gfSk7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9ub29wXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibm9vcFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbm9vcF8xLm5vb3A7IH0gfSk7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvaWRlbnRpdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpZGVudGl0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaWRlbnRpdHlfMS5pZGVudGl0eTsgfSB9KTtcbnZhciBpc09ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvaXNPYnNlcnZhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaXNPYnNlcnZhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc09ic2VydmFibGVfMS5pc09ic2VydmFibGU7IH0gfSk7XG52YXIgbGFzdFZhbHVlRnJvbV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvbGFzdFZhbHVlRnJvbVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImxhc3RWYWx1ZUZyb21cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxhc3RWYWx1ZUZyb21fMS5sYXN0VmFsdWVGcm9tOyB9IH0pO1xudmFyIGZpcnN0VmFsdWVGcm9tXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9maXJzdFZhbHVlRnJvbVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZpcnN0VmFsdWVGcm9tXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmaXJzdFZhbHVlRnJvbV8xLmZpcnN0VmFsdWVGcm9tOyB9IH0pO1xudmFyIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXzEuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I7IH0gfSk7XG52YXIgRW1wdHlFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9FbXB0eUVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRW1wdHlFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gRW1wdHlFcnJvcl8xLkVtcHR5RXJyb3I7IH0gfSk7XG52YXIgTm90Rm91bmRFcnJvcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvdXRpbC9Ob3RGb3VuZEVycm9yXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm90Rm91bmRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTm90Rm91bmRFcnJvcl8xLk5vdEZvdW5kRXJyb3I7IH0gfSk7XG52YXIgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJPYmplY3RVbnN1YnNjcmliZWRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcjsgfSB9KTtcbnZhciBTZXF1ZW5jZUVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL1NlcXVlbmNlRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTZXF1ZW5jZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTZXF1ZW5jZUVycm9yXzEuU2VxdWVuY2VFcnJvcjsgfSB9KTtcbnZhciB0aW1lb3V0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vcGVyYXRvcnMvdGltZW91dFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRpbWVvdXRFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGltZW91dF8xLlRpbWVvdXRFcnJvcjsgfSB9KTtcbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3JcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJVbnN1YnNjcmlwdGlvbkVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcjsgfSB9KTtcbnZhciBiaW5kQ2FsbGJhY2tfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvYmluZENhbGxiYWNrXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYmluZENhbGxiYWNrXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBiaW5kQ2FsbGJhY2tfMS5iaW5kQ2FsbGJhY2s7IH0gfSk7XG52YXIgYmluZE5vZGVDYWxsYmFja18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kTm9kZUNhbGxiYWNrXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYmluZE5vZGVDYWxsYmFja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYmluZE5vZGVDYWxsYmFja18xLmJpbmROb2RlQ2FsbGJhY2s7IH0gfSk7XG52YXIgY29tYmluZUxhdGVzdF8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0XCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tYmluZUxhdGVzdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tYmluZUxhdGVzdF8xLmNvbWJpbmVMYXRlc3Q7IH0gfSk7XG52YXIgY29uY2F0XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbmNhdFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmNhdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uY2F0XzEuY29uY2F0OyB9IH0pO1xudmFyIGNvbm5lY3RhYmxlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Nvbm5lY3RhYmxlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29ubmVjdGFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbm5lY3RhYmxlXzEuY29ubmVjdGFibGU7IH0gfSk7XG52YXIgZGVmZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZGVmZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJkZWZlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVmZXJfMS5kZWZlcjsgfSB9KTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVtcHR5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbXB0eV8xLmVtcHR5OyB9IH0pO1xudmFyIGZvcmtKb2luXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2ZvcmtKb2luXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZm9ya0pvaW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZvcmtKb2luXzEuZm9ya0pvaW47IH0gfSk7XG52YXIgZnJvbV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZnJvbVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnJvbV8xLmZyb207IH0gfSk7XG52YXIgZnJvbUV2ZW50XzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZyb21FdmVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnJvbUV2ZW50XzEuZnJvbUV2ZW50OyB9IH0pO1xudmFyIGZyb21FdmVudFBhdHRlcm5fMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50UGF0dGVyblwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZyb21FdmVudFBhdHRlcm5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZyb21FdmVudFBhdHRlcm5fMS5mcm9tRXZlbnRQYXR0ZXJuOyB9IH0pO1xudmFyIGdlbmVyYXRlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2dlbmVyYXRlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhdGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdlbmVyYXRlXzEuZ2VuZXJhdGU7IH0gfSk7XG52YXIgaWlmXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2lpZlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlpZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaWlmXzEuaWlmOyB9IH0pO1xudmFyIGludGVydmFsXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2ludGVydmFsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaW50ZXJ2YWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGludGVydmFsXzEuaW50ZXJ2YWw7IH0gfSk7XG52YXIgbWVyZ2VfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvbWVyZ2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtZXJnZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWVyZ2VfMS5tZXJnZTsgfSB9KTtcbnZhciBuZXZlcl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5ldmVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXZlcl8xLm5ldmVyOyB9IH0pO1xudmFyIG9mXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL29mXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwib2ZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9mXzEub2Y7IH0gfSk7XG52YXIgb25FcnJvclJlc3VtZU5leHRfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvb25FcnJvclJlc3VtZU5leHRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJvbkVycm9yUmVzdW1lTmV4dFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gb25FcnJvclJlc3VtZU5leHRfMS5vbkVycm9yUmVzdW1lTmV4dDsgfSB9KTtcbnZhciBwYWlyc18xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYWlyc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInBhaXJzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBwYWlyc18xLnBhaXJzOyB9IH0pO1xudmFyIHBhcnRpdGlvbl8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYXJ0aXRpb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJ0aXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBhcnRpdGlvbl8xLnBhcnRpdGlvbjsgfSB9KTtcbnZhciByYWNlXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3JhY2VcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyYWNlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByYWNlXzEucmFjZTsgfSB9KTtcbnZhciByYW5nZV8xID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9yYW5nZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInJhbmdlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByYW5nZV8xLnJhbmdlOyB9IH0pO1xudmFyIHRocm93RXJyb3JfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRocm93RXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRocm93RXJyb3JfMS50aHJvd0Vycm9yOyB9IH0pO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3RpbWVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGltZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRpbWVyXzEudGltZXI7IH0gfSk7XG52YXIgdXNpbmdfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvdXNpbmdcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ1c2luZ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXNpbmdfMS51c2luZzsgfSB9KTtcbnZhciB6aXBfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvemlwXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiemlwXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB6aXBfMS56aXA7IH0gfSk7XG52YXIgc2NoZWR1bGVkXzEgPSByZXF1aXJlKFwiLi9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVkXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic2NoZWR1bGVkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlZHVsZWRfMS5zY2hlZHVsZWQ7IH0gfSk7XG52YXIgZW1wdHlfMiA9IHJlcXVpcmUoXCIuL2ludGVybmFsL29ic2VydmFibGUvZW1wdHlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFTVBUWVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1wdHlfMi5FTVBUWTsgfSB9KTtcbnZhciBuZXZlcl8yID0gcmVxdWlyZShcIi4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5FVkVSXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXZlcl8yLk5FVkVSOyB9IH0pO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2ludGVybmFsL3R5cGVzXCIpLCBleHBvcnRzKTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2ludGVybmFsL2NvbmZpZ1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbmZpZ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uZmlnXzEuY29uZmlnOyB9IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc3luY1N1YmplY3QgPSB2b2lkIDA7XG52YXIgU3ViamVjdF8xID0gcmVxdWlyZShcIi4vU3ViamVjdFwiKTtcbnZhciBBc3luY1N1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY1N1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXN5bmNTdWJqZWN0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3ZhbHVlID0gbnVsbDtcbiAgICAgICAgX3RoaXMuX2hhc1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNTdWJqZWN0LnByb3RvdHlwZS5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIF9oYXNWYWx1ZSA9IF9hLl9oYXNWYWx1ZSwgX3ZhbHVlID0gX2EuX3ZhbHVlLCB0aHJvd25FcnJvciA9IF9hLnRocm93bkVycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQ7XG4gICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aHJvd25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBfaGFzVmFsdWUgJiYgc3Vic2NyaWJlci5uZXh0KF92YWx1ZSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faGFzVmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfaGFzVmFsdWUgPSBfYS5faGFzVmFsdWUsIF92YWx1ZSA9IF9hLl92YWx1ZSwgX2lzQ29tcGxldGUgPSBfYS5faXNDb21wbGV0ZTtcbiAgICAgICAgaWYgKCFfaXNDb21wbGV0ZSkge1xuICAgICAgICAgICAgdGhpcy5faXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICBfaGFzVmFsdWUgJiYgX3N1cGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcywgX3ZhbHVlKTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29tcGxldGUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jU3ViamVjdDtcbn0oU3ViamVjdF8xLlN1YmplY3QpKTtcbmV4cG9ydHMuQXN5bmNTdWJqZWN0ID0gQXN5bmNTdWJqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNTdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmVoYXZpb3JTdWJqZWN0ID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuL1N1YmplY3RcIik7XG52YXIgQmVoYXZpb3JTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQmVoYXZpb3JTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJlaGF2aW9yU3ViamVjdChfdmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3ZhbHVlID0gX3ZhbHVlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IF9zdXBlci5wcm90b3R5cGUuX3N1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICAhc3Vic2NyaXB0aW9uLmNsb3NlZCAmJiBzdWJzY3JpYmVyLm5leHQodGhpcy5fdmFsdWUpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaGFzRXJyb3IgPSBfYS5oYXNFcnJvciwgdGhyb3duRXJyb3IgPSBfYS50aHJvd25FcnJvciwgX3ZhbHVlID0gX2EuX3ZhbHVlO1xuICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IHRocm93bkVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICB9O1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzLCAodGhpcy5fdmFsdWUgPSB2YWx1ZSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEJlaGF2aW9yU3ViamVjdDtcbn0oU3ViamVjdF8xLlN1YmplY3QpKTtcbmV4cG9ydHMuQmVoYXZpb3JTdWJqZWN0ID0gQmVoYXZpb3JTdWJqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmVoYXZpb3JTdWJqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYnNlcnZlTm90aWZpY2F0aW9uID0gZXhwb3J0cy5Ob3RpZmljYXRpb24gPSBleHBvcnRzLk5vdGlmaWNhdGlvbktpbmQgPSB2b2lkIDA7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUvZW1wdHlcIik7XG52YXIgb2ZfMSA9IHJlcXVpcmUoXCIuL29ic2VydmFibGUvb2ZcIik7XG52YXIgdGhyb3dFcnJvcl8xID0gcmVxdWlyZShcIi4vb2JzZXJ2YWJsZS90aHJvd0Vycm9yXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBOb3RpZmljYXRpb25LaW5kO1xuKGZ1bmN0aW9uIChOb3RpZmljYXRpb25LaW5kKSB7XG4gICAgTm90aWZpY2F0aW9uS2luZFtcIk5FWFRcIl0gPSBcIk5cIjtcbiAgICBOb3RpZmljYXRpb25LaW5kW1wiRVJST1JcIl0gPSBcIkVcIjtcbiAgICBOb3RpZmljYXRpb25LaW5kW1wiQ09NUExFVEVcIl0gPSBcIkNcIjtcbn0pKE5vdGlmaWNhdGlvbktpbmQgPSBleHBvcnRzLk5vdGlmaWNhdGlvbktpbmQgfHwgKGV4cG9ydHMuTm90aWZpY2F0aW9uS2luZCA9IHt9KSk7XG52YXIgTm90aWZpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOb3RpZmljYXRpb24oa2luZCwgdmFsdWUsIGVycm9yKSB7XG4gICAgICAgIHRoaXMua2luZCA9IGtpbmQ7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICB0aGlzLmhhc1ZhbHVlID0ga2luZCA9PT0gJ04nO1xuICAgIH1cbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVOb3RpZmljYXRpb24odGhpcywgb2JzZXJ2ZXIpO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLnByb3RvdHlwZS5kbyA9IGZ1bmN0aW9uIChuZXh0SGFuZGxlciwgZXJyb3JIYW5kbGVyLCBjb21wbGV0ZUhhbmRsZXIpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywga2luZCA9IF9hLmtpbmQsIHZhbHVlID0gX2EudmFsdWUsIGVycm9yID0gX2EuZXJyb3I7XG4gICAgICAgIHJldHVybiBraW5kID09PSAnTicgPyBuZXh0SGFuZGxlciA9PT0gbnVsbCB8fCBuZXh0SGFuZGxlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbmV4dEhhbmRsZXIodmFsdWUpIDoga2luZCA9PT0gJ0UnID8gZXJyb3JIYW5kbGVyID09PSBudWxsIHx8IGVycm9ySGFuZGxlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JIYW5kbGVyKGVycm9yKSA6IGNvbXBsZXRlSGFuZGxlciA9PT0gbnVsbCB8fCBjb21wbGV0ZUhhbmRsZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbXBsZXRlSGFuZGxlcigpO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbigoX2EgPSBuZXh0T3JPYnNlcnZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5leHQpXG4gICAgICAgICAgICA/IHRoaXMub2JzZXJ2ZShuZXh0T3JPYnNlcnZlcilcbiAgICAgICAgICAgIDogdGhpcy5kbyhuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBraW5kID0gX2Eua2luZCwgdmFsdWUgPSBfYS52YWx1ZSwgZXJyb3IgPSBfYS5lcnJvcjtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGtpbmQgPT09ICdOJ1xuICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgIG9mXzEub2YodmFsdWUpXG4gICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAga2luZCA9PT0gJ0UnXG4gICAgICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93RXJyb3JfMS50aHJvd0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yOyB9KVxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICBraW5kID09PSAnQydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5XzEuRU1QVFlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBub3RpZmljYXRpb24ga2luZCBcIiArIGtpbmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24uY3JlYXRlTmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvbignTicsIHZhbHVlKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RpZmljYXRpb24oJ0UnLCB1bmRlZmluZWQsIGVycik7XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24uY3JlYXRlQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBOb3RpZmljYXRpb24uY29tcGxldGVOb3RpZmljYXRpb247XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24uY29tcGxldGVOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCdDJyk7XG4gICAgcmV0dXJuIE5vdGlmaWNhdGlvbjtcbn0oKSk7XG5leHBvcnRzLk5vdGlmaWNhdGlvbiA9IE5vdGlmaWNhdGlvbjtcbmZ1bmN0aW9uIG9ic2VydmVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBvYnNlcnZlcikge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHZhciBfZCA9IG5vdGlmaWNhdGlvbiwga2luZCA9IF9kLmtpbmQsIHZhbHVlID0gX2QudmFsdWUsIGVycm9yID0gX2QuZXJyb3I7XG4gICAgaWYgKHR5cGVvZiBraW5kICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG5vdGlmaWNhdGlvbiwgbWlzc2luZyBcImtpbmRcIicpO1xuICAgIH1cbiAgICBraW5kID09PSAnTicgPyAoX2EgPSBvYnNlcnZlci5uZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChvYnNlcnZlciwgdmFsdWUpIDoga2luZCA9PT0gJ0UnID8gKF9iID0gb2JzZXJ2ZXIuZXJyb3IpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKG9ic2VydmVyLCBlcnJvcikgOiAoX2MgPSBvYnNlcnZlci5jb21wbGV0ZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNhbGwob2JzZXJ2ZXIpO1xufVxuZXhwb3J0cy5vYnNlcnZlTm90aWZpY2F0aW9uID0gb2JzZXJ2ZU5vdGlmaWNhdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vdGlmaWNhdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlTm90aWZpY2F0aW9uID0gZXhwb3J0cy5uZXh0Tm90aWZpY2F0aW9uID0gZXhwb3J0cy5lcnJvck5vdGlmaWNhdGlvbiA9IGV4cG9ydHMuQ09NUExFVEVfTk9USUZJQ0FUSU9OID0gdm9pZCAwO1xuZXhwb3J0cy5DT01QTEVURV9OT1RJRklDQVRJT04gPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdDJywgdW5kZWZpbmVkLCB1bmRlZmluZWQpOyB9KSgpO1xuZnVuY3Rpb24gZXJyb3JOb3RpZmljYXRpb24oZXJyb3IpIHtcbiAgICByZXR1cm4gY3JlYXRlTm90aWZpY2F0aW9uKCdFJywgdW5kZWZpbmVkLCBlcnJvcik7XG59XG5leHBvcnRzLmVycm9yTm90aWZpY2F0aW9uID0gZXJyb3JOb3RpZmljYXRpb247XG5mdW5jdGlvbiBuZXh0Tm90aWZpY2F0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vdGlmaWNhdGlvbignTicsIHZhbHVlLCB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5uZXh0Tm90aWZpY2F0aW9uID0gbmV4dE5vdGlmaWNhdGlvbjtcbmZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVycm9yOiBlcnJvcixcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVOb3RpZmljYXRpb24gPSBjcmVhdGVOb3RpZmljYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RpZmljYXRpb25GYWN0b3JpZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk9ic2VydmFibGUgPSB2b2lkIDA7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vU3Vic2NyaWJlclwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmlwdGlvblwiKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9zeW1ib2wvb2JzZXJ2YWJsZVwiKTtcbnZhciBwaXBlXzEgPSByZXF1aXJlKFwiLi91dGlsL3BpcGVcIik7XG52YXIgY29uZmlnXzEgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBpc1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQpID8gb2JzZXJ2ZXJPck5leHQgOiBuZXcgU3Vic2NyaWJlcl8xLlNhZmVTdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlcHJlY2F0ZWRTeW5jRXJyb3JTdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLCBvcGVyYXRvciA9IF9hLm9wZXJhdG9yLCBzb3VyY2UgPSBfYS5zb3VyY2U7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChvcGVyYXRvclxuICAgICAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3IuY2FsbChzdWJzY3JpYmVyLCBzb3VyY2UpXG4gICAgICAgICAgICAgICAgOiBzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKHN1YnNjcmliZXIpXG4gICAgICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyeVN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fZGVwcmVjYXRlZFN5bmNFcnJvclN1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBsb2NhbFN1YnNjcmliZXIgPSBzdWJzY3JpYmVyO1xuICAgICAgICBsb2NhbFN1YnNjcmliZXIuX3N5bmNFcnJvckhhY2tfaXNTdWJzY3JpYmluZyA9IHRydWU7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQob3BlcmF0b3IuY2FsbChzdWJzY3JpYmVyLCB0aGlzLnNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZCh0aGlzLl9zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGxvY2FsU3Vic2NyaWJlci5fX3N5bmNFcnJvciA9IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVzdCA9IGxvY2FsU3Vic2NyaWJlcjtcbiAgICAgICAgd2hpbGUgKGRlc3QpIHtcbiAgICAgICAgICAgIGlmICgnX19zeW5jRXJyb3InIGluIGRlc3QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBkZXN0Ll9fc3luY0Vycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc3QgPSBkZXN0LmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3Vic2NyaWJlci5fc3luY0Vycm9ySGFja19pc1N1YnNjcmliaW5nID0gZmFsc2U7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKG5leHQsIHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCBzdWJzY3JpcHRpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlamVjdCwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbb2JzZXJ2YWJsZV8xLm9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvcGVyYXRpb25zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBvcGVyYXRpb25zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbnMubGVuZ3RoID8gcGlwZV8xLnBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcykgOiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoeCkgeyByZXR1cm4gKHZhbHVlID0geCk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmUpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuZXhwb3J0cy5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcbmZ1bmN0aW9uIGdldFByb21pc2VDdG9yKHByb21pc2VDdG9yKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBwcm9taXNlQ3RvciAhPT0gbnVsbCAmJiBwcm9taXNlQ3RvciAhPT0gdm9pZCAwID8gcHJvbWlzZUN0b3IgOiBjb25maWdfMS5jb25maWcuUHJvbWlzZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogUHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2ZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUubmV4dCkgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUuZXJyb3IpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLmNvbXBsZXRlKTtcbn1cbmZ1bmN0aW9uIGlzU3Vic2NyaWJlcih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUgJiYgdmFsdWUgaW5zdGFuY2VvZiBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikgfHwgKGlzT2JzZXJ2ZXIodmFsdWUpICYmIFN1YnNjcmlwdGlvbl8xLmlzU3Vic2NyaXB0aW9uKHZhbHVlKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVwbGF5U3ViamVjdCA9IHZvaWQgMDtcbnZhciBTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi9TdWJqZWN0XCIpO1xudmFyIGRhdGVUaW1lc3RhbXBQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlclwiKTtcbnZhciBSZXBsYXlTdWJqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVwbGF5U3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXBsYXlTdWJqZWN0KF9idWZmZXJTaXplLCBfd2luZG93VGltZSwgX3RpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgICAgIGlmIChfYnVmZmVyU2l6ZSA9PT0gdm9pZCAwKSB7IF9idWZmZXJTaXplID0gSW5maW5pdHk7IH1cbiAgICAgICAgaWYgKF93aW5kb3dUaW1lID09PSB2b2lkIDApIHsgX3dpbmRvd1RpbWUgPSBJbmZpbml0eTsgfVxuICAgICAgICBpZiAoX3RpbWVzdGFtcFByb3ZpZGVyID09PSB2b2lkIDApIHsgX3RpbWVzdGFtcFByb3ZpZGVyID0gZGF0ZVRpbWVzdGFtcFByb3ZpZGVyXzEuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9idWZmZXJTaXplID0gX2J1ZmZlclNpemU7XG4gICAgICAgIF90aGlzLl93aW5kb3dUaW1lID0gX3dpbmRvd1RpbWU7XG4gICAgICAgIF90aGlzLl90aW1lc3RhbXBQcm92aWRlciA9IF90aW1lc3RhbXBQcm92aWRlcjtcbiAgICAgICAgX3RoaXMuX2J1ZmZlciA9IFtdO1xuICAgICAgICBfdGhpcy5faW5maW5pdGVUaW1lV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IF93aW5kb3dUaW1lID09PSBJbmZpbml0eTtcbiAgICAgICAgX3RoaXMuX2J1ZmZlclNpemUgPSBNYXRoLm1heCgxLCBfYnVmZmVyU2l6ZSk7XG4gICAgICAgIF90aGlzLl93aW5kb3dUaW1lID0gTWF0aC5tYXgoMSwgX3dpbmRvd1RpbWUpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgaXNTdG9wcGVkID0gX2EuaXNTdG9wcGVkLCBfYnVmZmVyID0gX2EuX2J1ZmZlciwgX2luZmluaXRlVGltZVdpbmRvdyA9IF9hLl9pbmZpbml0ZVRpbWVXaW5kb3csIF90aW1lc3RhbXBQcm92aWRlciA9IF9hLl90aW1lc3RhbXBQcm92aWRlciwgX3dpbmRvd1RpbWUgPSBfYS5fd2luZG93VGltZTtcbiAgICAgICAgaWYgKCFpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIF9idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAhX2luZmluaXRlVGltZVdpbmRvdyAmJiBfYnVmZmVyLnB1c2goX3RpbWVzdGFtcFByb3ZpZGVyLm5vdygpICsgX3dpbmRvd1RpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RyaW1CdWZmZXIoKTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgIH07XG4gICAgUmVwbGF5U3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHRoaXMuX3Rocm93SWZDbG9zZWQoKTtcbiAgICAgICAgdGhpcy5fdHJpbUJ1ZmZlcigpO1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5faW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9pbmZpbml0ZVRpbWVXaW5kb3cgPSBfYS5faW5maW5pdGVUaW1lV2luZG93LCBfYnVmZmVyID0gX2EuX2J1ZmZlcjtcbiAgICAgICAgdmFyIGNvcHkgPSBfYnVmZmVyLnNsaWNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29weS5sZW5ndGggJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpICs9IF9pbmZpbml0ZVRpbWVXaW5kb3cgPyAxIDogMikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGNvcHlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrRmluYWxpemVkU3RhdHVzZXMoc3Vic2NyaWJlcik7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5fdHJpbUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgX2J1ZmZlclNpemUgPSBfYS5fYnVmZmVyU2l6ZSwgX3RpbWVzdGFtcFByb3ZpZGVyID0gX2EuX3RpbWVzdGFtcFByb3ZpZGVyLCBfYnVmZmVyID0gX2EuX2J1ZmZlciwgX2luZmluaXRlVGltZVdpbmRvdyA9IF9hLl9pbmZpbml0ZVRpbWVXaW5kb3c7XG4gICAgICAgIHZhciBhZGp1c3RlZEJ1ZmZlclNpemUgPSAoX2luZmluaXRlVGltZVdpbmRvdyA/IDEgOiAyKSAqIF9idWZmZXJTaXplO1xuICAgICAgICBfYnVmZmVyU2l6ZSA8IEluZmluaXR5ICYmIGFkanVzdGVkQnVmZmVyU2l6ZSA8IF9idWZmZXIubGVuZ3RoICYmIF9idWZmZXIuc3BsaWNlKDAsIF9idWZmZXIubGVuZ3RoIC0gYWRqdXN0ZWRCdWZmZXJTaXplKTtcbiAgICAgICAgaWYgKCFfaW5maW5pdGVUaW1lV2luZG93KSB7XG4gICAgICAgICAgICB2YXIgbm93ID0gX3RpbWVzdGFtcFByb3ZpZGVyLm5vdygpO1xuICAgICAgICAgICAgdmFyIGxhc3QgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBfYnVmZmVyLmxlbmd0aCAmJiBfYnVmZmVyW2ldIDw9IG5vdzsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgbGFzdCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0ICYmIF9idWZmZXIuc3BsaWNlKDAsIGxhc3QgKyAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFJlcGxheVN1YmplY3Q7XG59KFN1YmplY3RfMS5TdWJqZWN0KSk7XG5leHBvcnRzLlJlcGxheVN1YmplY3QgPSBSZXBsYXlTdWJqZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVwbGF5U3ViamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIGRhdGVUaW1lc3RhbXBQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVyL2RhdGVUaW1lc3RhbXBQcm92aWRlclwiKTtcbnZhciBTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlcihzY2hlZHVsZXJBY3Rpb25DdG9yLCBub3cpIHtcbiAgICAgICAgaWYgKG5vdyA9PT0gdm9pZCAwKSB7IG5vdyA9IFNjaGVkdWxlci5ub3c7IH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZXJBY3Rpb25DdG9yID0gc2NoZWR1bGVyQWN0aW9uQ3RvcjtcbiAgICAgICAgdGhpcy5ub3cgPSBub3c7XG4gICAgfVxuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAod29yaywgZGVsYXksIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICByZXR1cm4gbmV3IHRoaXMuc2NoZWR1bGVyQWN0aW9uQ3Rvcih0aGlzLCB3b3JrKS5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgIH07XG4gICAgU2NoZWR1bGVyLm5vdyA9IGRhdGVUaW1lc3RhbXBQcm92aWRlcl8xLmRhdGVUaW1lc3RhbXBQcm92aWRlci5ub3c7XG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbn0oKSk7XG5leHBvcnRzLlNjaGVkdWxlciA9IFNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFub255bW91c1N1YmplY3QgPSBleHBvcnRzLlN1YmplY3QgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmlwdGlvblwiKTtcbnZhciBPYmplY3RVbnN1YnNjcmliZWRFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvclwiKTtcbnZhciBhcnJSZW1vdmVfMSA9IHJlcXVpcmUoXCIuL3V0aWwvYXJyUmVtb3ZlXCIpO1xudmFyIFN1YmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFub255bW91c1N1YmplY3QodGhpcywgdGhpcyk7XG4gICAgICAgIHN1YmplY3Qub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdGhyb3dJZkNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JfMS5PYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gdGhpcy5vYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgY29weV8xID0gX192YWx1ZXMoY29weSksIGNvcHlfMV8xID0gY29weV8xLm5leHQoKTsgIWNvcHlfMV8xLmRvbmU7IGNvcHlfMV8xID0gY29weV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBjb3B5XzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5XzFfMSAmJiAhY29weV8xXzEuZG9uZSAmJiAoX2EgPSBjb3B5XzEucmV0dXJuKSkgX2EuY2FsbChjb3B5XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0aGlzLl90aHJvd0lmQ2xvc2VkKCk7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRXJyb3IgPSB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRocm93bkVycm9yID0gZXJyO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICAgICAgd2hpbGUgKG9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgICAgICB3aGlsZSAob2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVycy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBudWxsO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFN1YmplY3QucHJvdG90eXBlLCBcIm9ic2VydmVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMub2JzZXJ2ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSA+IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dJZkNsb3NlZCgpO1xuICAgICAgICB0aGlzLl9jaGVja0ZpbmFsaXplZFN0YXR1c2VzKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXJTdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5faW5uZXJTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBoYXNFcnJvciA9IF9hLmhhc0Vycm9yLCBpc1N0b3BwZWQgPSBfYS5pc1N0b3BwZWQsIG9ic2VydmVycyA9IF9hLm9ic2VydmVycztcbiAgICAgICAgcmV0dXJuIGhhc0Vycm9yIHx8IGlzU3RvcHBlZFxuICAgICAgICAgICAgPyBTdWJzY3JpcHRpb25fMS5FTVBUWV9TVUJTQ1JJUFRJT05cbiAgICAgICAgICAgIDogKG9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpLCBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyclJlbW92ZV8xLmFyclJlbW92ZShvYnNlcnZlcnMsIHN1YnNjcmliZXIpOyB9KSk7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fY2hlY2tGaW5hbGl6ZWRTdGF0dXNlcyA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGhhc0Vycm9yID0gX2EuaGFzRXJyb3IsIHRocm93bkVycm9yID0gX2EudGhyb3duRXJyb3IsIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZDtcbiAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRocm93bkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUuYXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuU3ViamVjdCA9IFN1YmplY3Q7XG52YXIgQW5vbnltb3VzU3ViamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFub255bW91c1N1YmplY3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5vbnltb3VzU3ViamVjdChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgICAgIF90aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uZXh0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdmFsdWUpO1xuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIChfYiA9IChfYSA9IHRoaXMuZGVzdGluYXRpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGVycik7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgKF9iID0gKF9hID0gdGhpcy5kZXN0aW5hdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbXBsZXRlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSk7XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IHRoaXMuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3Vic2NyaWJlKHN1YnNjcmliZXIpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBTdWJzY3JpcHRpb25fMS5FTVBUWV9TVUJTQ1JJUFRJT047XG4gICAgfTtcbiAgICByZXR1cm4gQW5vbnltb3VzU3ViamVjdDtcbn0oU3ViamVjdCkpO1xuZXhwb3J0cy5Bbm9ueW1vdXNTdWJqZWN0ID0gQW5vbnltb3VzU3ViamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRU1QVFlfT0JTRVJWRVIgPSBleHBvcnRzLlNhZmVTdWJzY3JpYmVyID0gZXhwb3J0cy5TdWJzY3JpYmVyID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmlwdGlvblwiKTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbnZhciByZXBvcnRVbmhhbmRsZWRFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi91dGlsL25vb3BcIik7XG52YXIgTm90aWZpY2F0aW9uRmFjdG9yaWVzXzEgPSByZXF1aXJlKFwiLi9Ob3RpZmljYXRpb25GYWN0b3JpZXNcIik7XG52YXIgdGltZW91dFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyXCIpO1xudmFyIFN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIGlmIChTdWJzY3JpcHRpb25fMS5pc1N1YnNjcmlwdGlvbihkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5hZGQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBleHBvcnRzLkVNUFRZX09CU0VSVkVSO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xLm5leHROb3RpZmljYXRpb24odmFsdWUpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKE5vdGlmaWNhdGlvbkZhY3Rvcmllc18xLmVycm9yTm90aWZpY2F0aW9uKGVyciksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgaGFuZGxlU3RvcHBlZE5vdGlmaWNhdGlvbihOb3RpZmljYXRpb25GYWN0b3JpZXNfMS5DT01QTEVURV9OT1RJRklDQVRJT04sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdWJzY3JpYmVyO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuU3Vic2NyaWJlciA9IFN1YnNjcmliZXI7XG52YXIgU2FmZVN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTYWZlU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTYWZlU3Vic2NyaWJlcihvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpKSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIChuZXh0ID0gb2JzZXJ2ZXJPck5leHQubmV4dCwgZXJyb3IgPSBvYnNlcnZlck9yTmV4dC5lcnJvciwgY29tcGxldGUgPSBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZSk7XG4gICAgICAgICAgICB2YXIgY29udGV4dF8xO1xuICAgICAgICAgICAgaWYgKF90aGlzICYmIGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkTmV4dENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBjb250ZXh0XzEudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy51bnN1YnNjcmliZSgpOyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF8xID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA9PT0gbnVsbCB8fCBuZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0LmJpbmQoY29udGV4dF8xKTtcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLmJpbmQoY29udGV4dF8xKTtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gY29tcGxldGUgPT09IG51bGwgfHwgY29tcGxldGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbXBsZXRlLmJpbmQoY29udGV4dF8xKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IHtcbiAgICAgICAgICAgIG5leHQ6IG5leHQgPyB3cmFwRm9yRXJyb3JIYW5kbGluZyhuZXh0LCBfdGhpcykgOiBub29wXzEubm9vcCxcbiAgICAgICAgICAgIGVycm9yOiB3cmFwRm9yRXJyb3JIYW5kbGluZyhlcnJvciAhPT0gbnVsbCAmJiBlcnJvciAhPT0gdm9pZCAwID8gZXJyb3IgOiBkZWZhdWx0RXJyb3JIYW5kbGVyLCBfdGhpcyksXG4gICAgICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgPyB3cmFwRm9yRXJyb3JIYW5kbGluZyhjb21wbGV0ZSwgX3RoaXMpIDogbm9vcF8xLm5vb3AsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNhZmVTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnRzLlNhZmVTdWJzY3JpYmVyID0gU2FmZVN1YnNjcmliZXI7XG5mdW5jdGlvbiB3cmFwRm9yRXJyb3JIYW5kbGluZyhoYW5kbGVyLCBpbnN0YW5jZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuX3N5bmNFcnJvckhhY2tfaXNTdWJzY3JpYmluZykge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5fX3N5bmNFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXBvcnRVbmhhbmRsZWRFcnJvcl8xLnJlcG9ydFVuaGFuZGxlZEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG59XG5mdW5jdGlvbiBoYW5kbGVTdG9wcGVkTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgc3Vic2NyaWJlcikge1xuICAgIHZhciBvblN0b3BwZWROb3RpZmljYXRpb24gPSBjb25maWdfMS5jb25maWcub25TdG9wcGVkTm90aWZpY2F0aW9uO1xuICAgIG9uU3RvcHBlZE5vdGlmaWNhdGlvbiAmJiB0aW1lb3V0UHJvdmlkZXJfMS50aW1lb3V0UHJvdmlkZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBvblN0b3BwZWROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBzdWJzY3JpYmVyKTsgfSk7XG59XG5leHBvcnRzLkVNUFRZX09CU0VSVkVSID0ge1xuICAgIGNsb3NlZDogdHJ1ZSxcbiAgICBuZXh0OiBub29wXzEubm9vcCxcbiAgICBlcnJvcjogZGVmYXVsdEVycm9ySGFuZGxlcixcbiAgICBjb21wbGV0ZTogbm9vcF8xLm5vb3AsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzU3Vic2NyaXB0aW9uID0gZXhwb3J0cy5FTVBUWV9TVUJTQ1JJUFRJT04gPSBleHBvcnRzLlN1YnNjcmlwdGlvbiA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgVW5zdWJzY3JpcHRpb25FcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yXCIpO1xudmFyIGFyclJlbW92ZV8xID0gcmVxdWlyZShcIi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oaW5pdGlhbFRlYXJkb3duKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFRlYXJkb3duID0gaW5pdGlhbFRlYXJkb3duO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl90ZWFyZG93bnMgPSBudWxsO1xuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8xLCBfYSwgZV8yLCBfYjtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKCF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRhZ2UgPSB0aGlzLl9wYXJlbnRhZ2U7XG4gICAgICAgICAgICBpZiAoX3BhcmVudGFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9wYXJlbnRhZ2VfMSA9IF9fdmFsdWVzKF9wYXJlbnRhZ2UpLCBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCk7ICFfcGFyZW50YWdlXzFfMS5kb25lOyBfcGFyZW50YWdlXzFfMSA9IF9wYXJlbnRhZ2VfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBfcGFyZW50YWdlXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRfMS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcGFyZW50YWdlXzFfMSAmJiAhX3BhcmVudGFnZV8xXzEuZG9uZSAmJiAoX2EgPSBfcGFyZW50YWdlXzEucmV0dXJuKSkgX2EuY2FsbChfcGFyZW50YWdlXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50YWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5pdGlhbFRlYXJkb3duID0gdGhpcy5pbml0aWFsVGVhcmRvd247XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oaW5pdGlhbFRlYXJkb3duKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxUZWFyZG93bigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IgPyBlLmVycm9ycyA6IFtlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX3RlYXJkb3ducyA9IHRoaXMuX3RlYXJkb3ducztcbiAgICAgICAgICAgIGlmIChfdGVhcmRvd25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGVhcmRvd25zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfdGVhcmRvd25zXzEgPSBfX3ZhbHVlcyhfdGVhcmRvd25zKSwgX3RlYXJkb3duc18xXzEgPSBfdGVhcmRvd25zXzEubmV4dCgpOyAhX3RlYXJkb3duc18xXzEuZG9uZTsgX3RlYXJkb3duc18xXzEgPSBfdGVhcmRvd25zXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVhcmRvd25fMSA9IF90ZWFyZG93bnNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjVGVhcmRvd24odGVhcmRvd25fMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzICE9PSBudWxsICYmIGVycm9ycyAhPT0gdm9pZCAwID8gZXJyb3JzIDogW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGVycm9ycykpLCBfX3JlYWQoZXJyLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGVhcmRvd25zXzFfMSAmJiAhX3RlYXJkb3duc18xXzEuZG9uZSAmJiAoX2IgPSBfdGVhcmRvd25zXzEucmV0dXJuKSkgX2IuY2FsbChfdGVhcmRvd25zXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRlYXJkb3duICYmIHRlYXJkb3duICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBleGVjVGVhcmRvd24odGVhcmRvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRlYXJkb3duIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZWFyZG93bi5jbG9zZWQgfHwgdGVhcmRvd24uX2hhc1BhcmVudCh0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlYXJkb3duLl9hZGRQYXJlbnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICh0aGlzLl90ZWFyZG93bnMgPSAoX2EgPSB0aGlzLl90ZWFyZG93bnMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdKS5wdXNoKHRlYXJkb3duKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5faGFzUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgcmV0dXJuIF9wYXJlbnRhZ2UgPT09IHBhcmVudCB8fCAoQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSAmJiBfcGFyZW50YWdlLmluY2x1ZGVzKHBhcmVudCkpO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX3BhcmVudGFnZSA9IHRoaXMuX3BhcmVudGFnZTtcbiAgICAgICAgdGhpcy5fcGFyZW50YWdlID0gQXJyYXkuaXNBcnJheShfcGFyZW50YWdlKSA/IChfcGFyZW50YWdlLnB1c2gocGFyZW50KSwgX3BhcmVudGFnZSkgOiBfcGFyZW50YWdlID8gW19wYXJlbnRhZ2UsIHBhcmVudF0gOiBwYXJlbnQ7XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLl9yZW1vdmVQYXJlbnQgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHZhciBfcGFyZW50YWdlID0gdGhpcy5fcGFyZW50YWdlO1xuICAgICAgICBpZiAoX3BhcmVudGFnZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRhZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoX3BhcmVudGFnZSkpIHtcbiAgICAgICAgICAgIGFyclJlbW92ZV8xLmFyclJlbW92ZShfcGFyZW50YWdlLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0ZWFyZG93bikge1xuICAgICAgICB2YXIgX3RlYXJkb3ducyA9IHRoaXMuX3RlYXJkb3ducztcbiAgICAgICAgX3RlYXJkb3ducyAmJiBhcnJSZW1vdmVfMS5hcnJSZW1vdmUoX3RlYXJkb3ducywgdGVhcmRvd24pO1xuICAgICAgICBpZiAodGVhcmRvd24gaW5zdGFuY2VvZiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRlYXJkb3duLl9yZW1vdmVQYXJlbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5FTVBUWSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgZW1wdHkuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGVtcHR5O1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKSk7XG5leHBvcnRzLlN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbjtcbmV4cG9ydHMuRU1QVFlfU1VCU0NSSVBUSU9OID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuZnVuY3Rpb24gaXNTdWJzY3JpcHRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uIHx8XG4gICAgICAgICh2YWx1ZSAmJiAnY2xvc2VkJyBpbiB2YWx1ZSAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih2YWx1ZS5yZW1vdmUpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHZhbHVlLmFkZCkgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUudW5zdWJzY3JpYmUpKSk7XG59XG5leHBvcnRzLmlzU3Vic2NyaXB0aW9uID0gaXNTdWJzY3JpcHRpb247XG5mdW5jdGlvbiBleGVjVGVhcmRvd24odGVhcmRvd24pIHtcbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGVhcmRvd24pKSB7XG4gICAgICAgIHRlYXJkb3duKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZWFyZG93bi51bnN1YnNjcmliZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29uZmlnID0gdm9pZCAwO1xuZXhwb3J0cy5jb25maWcgPSB7XG4gICAgb25VbmhhbmRsZWRFcnJvcjogbnVsbCxcbiAgICBvblN0b3BwZWROb3RpZmljYXRpb246IG51bGwsXG4gICAgUHJvbWlzZTogdW5kZWZpbmVkLFxuICAgIHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmc6IGZhbHNlLFxuICAgIHVzZURlcHJlY2F0ZWROZXh0Q29udGV4dDogZmFsc2UsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5maXJzdFZhbHVlRnJvbSA9IHZvaWQgMDtcbnZhciBFbXB0eUVycm9yXzEgPSByZXF1aXJlKFwiLi91dGlsL0VtcHR5RXJyb3JcIik7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4vU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGZpcnN0VmFsdWVGcm9tKHNvdXJjZSwgY29uZmlnKSB7XG4gICAgdmFyIGhhc0NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXJfMS5TYWZlU3Vic2NyaWJlcih7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhc0NvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvbmZpZy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZmlyc3RWYWx1ZUZyb20gPSBmaXJzdFZhbHVlRnJvbTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpcnN0VmFsdWVGcm9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5sYXN0VmFsdWVGcm9tID0gdm9pZCAwO1xudmFyIEVtcHR5RXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvRW1wdHlFcnJvclwiKTtcbmZ1bmN0aW9uIGxhc3RWYWx1ZUZyb20oc291cmNlLCBjb25maWcpIHtcbiAgICB2YXIgaGFzQ29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCc7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIF9oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgX3ZhbHVlO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIF92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIF9oYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IHJlamVjdCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9oYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF92YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0NvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvbmZpZy5kZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFbXB0eUVycm9yXzEuRW1wdHlFcnJvcigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMubGFzdFZhbHVlRnJvbSA9IGxhc3RWYWx1ZUZyb207XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXN0VmFsdWVGcm9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29ubmVjdGFibGVPYnNlcnZhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbnZhciByZWZDb3VudF8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9yZWZDb3VudFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgQ29ubmVjdGFibGVPYnNlcnZhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29ubmVjdGFibGVPYnNlcnZhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbm5lY3RhYmxlT2JzZXJ2YWJsZShzb3VyY2UsIHN1YmplY3RGYWN0b3J5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgX3RoaXMuc3ViamVjdEZhY3RvcnkgPSBzdWJqZWN0RmFjdG9yeTtcbiAgICAgICAgX3RoaXMuX3N1YmplY3QgPSBudWxsO1xuICAgICAgICBfdGhpcy5fcmVmQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5fY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGlmIChsaWZ0XzEuaGFzTGlmdChzb3VyY2UpKSB7XG4gICAgICAgICAgICBfdGhpcy5saWZ0ID0gc291cmNlLmxpZnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWJqZWN0KCkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5nZXRTdWJqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3ViamVjdCA9IHRoaXMuX3N1YmplY3Q7XG4gICAgICAgIGlmICghc3ViamVjdCB8fCBzdWJqZWN0LmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuc3ViamVjdEZhY3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdDtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9yZWZDb3VudCA9IDA7XG4gICAgICAgIHZhciBfY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgX2Nvbm5lY3Rpb24gPT09IG51bGwgfHwgX2Nvbm5lY3Rpb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy5fY29ubmVjdGlvbjtcbiAgICAgICAgaWYgKCFjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uID0gdGhpcy5fY29ubmVjdGlvbiA9IG5ldyBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIHZhciBzdWJqZWN0XzEgPSB0aGlzLmdldFN1YmplY3QoKTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uYWRkKHRoaXMuc291cmNlLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YmplY3RfMSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgc3ViamVjdF8xLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3RlYXJkb3duKCk7XG4gICAgICAgICAgICAgICAgc3ViamVjdF8xLmVycm9yKGVycik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fdGVhcmRvd24oKTsgfSkpKTtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLnJlZkNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVmQ291bnRfMS5yZWZDb3VudCgpKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTtcbn0oT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpKTtcbmV4cG9ydHMuQ29ubmVjdGFibGVPYnNlcnZhYmxlID0gQ29ubmVjdGFibGVPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29ubmVjdGFibGVPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5iaW5kQ2FsbGJhY2sgPSB2b2lkIDA7XG52YXIgYmluZENhbGxiYWNrSW50ZXJuYWxzXzEgPSByZXF1aXJlKFwiLi9iaW5kQ2FsbGJhY2tJbnRlcm5hbHNcIik7XG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIGJpbmRDYWxsYmFja0ludGVybmFsc18xLmJpbmRDYWxsYmFja0ludGVybmFscyhmYWxzZSwgY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKTtcbn1cbmV4cG9ydHMuYmluZENhbGxiYWNrID0gYmluZENhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZENhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmluZENhbGxiYWNrSW50ZXJuYWxzID0gdm9pZCAwO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1NjaGVkdWxlclwiKTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBzdWJzY3JpYmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9zdWJzY3JpYmVPblwiKTtcbnZhciBtYXBPbmVPck1hbnlBcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9tYXBPbmVPck1hbnlBcmdzXCIpO1xudmFyIG9ic2VydmVPbl8xID0gcmVxdWlyZShcIi4uL29wZXJhdG9ycy9vYnNlcnZlT25cIik7XG52YXIgQXN5bmNTdWJqZWN0XzEgPSByZXF1aXJlKFwiLi4vQXN5bmNTdWJqZWN0XCIpO1xuZnVuY3Rpb24gYmluZENhbGxiYWNrSW50ZXJuYWxzKGlzTm9kZVN0eWxlLCBjYWxsYmFja0Z1bmMsIHJlc3VsdFNlbGVjdG9yLCBzY2hlZHVsZXIpIHtcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSByZXN1bHRTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kQ2FsbGJhY2tJbnRlcm5hbHMoaXNOb2RlU3R5bGUsIGNhbGxiYWNrRnVuYywgc2NoZWR1bGVyKVxuICAgICAgICAgICAgICAgICAgICAuYXBwbHkodGhpcywgYXJncylcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJpbmRDYWxsYmFja0ludGVybmFscyhpc05vZGVTdHlsZSwgY2FsbGJhY2tGdW5jKVxuICAgICAgICAgICAgICAgIC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgICAgICAgICAgIC5waXBlKHN1YnNjcmliZU9uXzEuc3Vic2NyaWJlT24oc2NoZWR1bGVyKSwgb2JzZXJ2ZU9uXzEub2JzZXJ2ZU9uKHNjaGVkdWxlcikpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdF8xLkFzeW5jU3ViamVjdCgpO1xuICAgICAgICB2YXIgdW5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBzdWJzID0gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAodW5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHVuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgaXNBc3luY18xID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ29tcGxldGVfMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYy5hcHBseShfdGhpcywgX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpLCBbXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05vZGVTdHlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSByZXN1bHRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCgxIDwgcmVzdWx0cy5sZW5ndGggPyByZXN1bHRzIDogcmVzdWx0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBsZXRlXzEgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXN5bmNfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGVfMSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlzQXN5bmNfMSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3VicztcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuYmluZENhbGxiYWNrSW50ZXJuYWxzID0gYmluZENhbGxiYWNrSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZENhbGxiYWNrSW50ZXJuYWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5iaW5kTm9kZUNhbGxiYWNrID0gdm9pZCAwO1xudmFyIGJpbmRDYWxsYmFja0ludGVybmFsc18xID0gcmVxdWlyZShcIi4vYmluZENhbGxiYWNrSW50ZXJuYWxzXCIpO1xuZnVuY3Rpb24gYmluZE5vZGVDYWxsYmFjayhjYWxsYmFja0Z1bmMsIHJlc3VsdFNlbGVjdG9yLCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gYmluZENhbGxiYWNrSW50ZXJuYWxzXzEuYmluZENhbGxiYWNrSW50ZXJuYWxzKHRydWUsIGNhbGxiYWNrRnVuYywgcmVzdWx0U2VsZWN0b3IsIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLmJpbmROb2RlQ2FsbGJhY2sgPSBiaW5kTm9kZUNhbGxiYWNrO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZE5vZGVDYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29tYmluZUxhdGVzdEluaXQgPSBleHBvcnRzLmNvbWJpbmVMYXRlc3QgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXJnc0FyZ0FycmF5T3JPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0XCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lkZW50aXR5XCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBjcmVhdGVPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2NyZWF0ZU9iamVjdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gY29tYmluZUxhdGVzdCgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgIHZhciBfYSA9IGFyZ3NBcmdBcnJheU9yT2JqZWN0XzEuYXJnc0FyZ0FycmF5T3JPYmplY3QoYXJncyksIG9ic2VydmFibGVzID0gX2EuYXJncywga2V5cyA9IF9hLmtleXM7XG4gICAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnJvbV8xLmZyb20oW10sIHNjaGVkdWxlcik7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoY29tYmluZUxhdGVzdEluaXQob2JzZXJ2YWJsZXMsIHNjaGVkdWxlciwga2V5c1xuICAgICAgICA/XG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWVzKSB7IHJldHVybiBjcmVhdGVPYmplY3RfMS5jcmVhdGVPYmplY3Qoa2V5cywgdmFsdWVzKTsgfVxuICAgICAgICA6XG4gICAgICAgICAgICBpZGVudGl0eV8xLmlkZW50aXR5KSk7XG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0LnBpcGUobWFwT25lT3JNYW55QXJnc18xLm1hcE9uZU9yTWFueUFyZ3MocmVzdWx0U2VsZWN0b3IpKSA6IHJlc3VsdDtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdCA9IGNvbWJpbmVMYXRlc3Q7XG5mdW5jdGlvbiBjb21iaW5lTGF0ZXN0SW5pdChvYnNlcnZhYmxlcywgc2NoZWR1bGVyLCB2YWx1ZVRyYW5zZm9ybSkge1xuICAgIGlmICh2YWx1ZVRyYW5zZm9ybSA9PT0gdm9pZCAwKSB7IHZhbHVlVHJhbnNmb3JtID0gaWRlbnRpdHlfMS5pZGVudGl0eTsgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBtYXliZVNjaGVkdWxlKHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IG9ic2VydmFibGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBsZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmVtYWluaW5nRmlyc3RWYWx1ZXMgPSBsZW5ndGg7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgbWF5YmVTY2hlZHVsZShzY2hlZHVsZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGZyb21fMS5mcm9tKG9ic2VydmFibGVzW2ldLCBzY2hlZHVsZXIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzRmlyc3RWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzRmlyc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0ZpcnN0VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ0ZpcnN0VmFsdWVzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbmluZ0ZpcnN0VmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlVHJhbnNmb3JtKHZhbHVlcy5zbGljZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LCBzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc3Vic2NyaWJlcik7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tYmluZUxhdGVzdEluaXQgPSBjb21iaW5lTGF0ZXN0SW5pdDtcbmZ1bmN0aW9uIG1heWJlU2NoZWR1bGUoc2NoZWR1bGVyLCBleGVjdXRlLCBzdWJzY3JpcHRpb24pIHtcbiAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGV4ZWN1dGUpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV4ZWN1dGUoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21iaW5lTGF0ZXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb25jYXQgPSB2b2lkIDA7XG52YXIgY29uY2F0QWxsXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL2NvbmNhdEFsbFwiKTtcbnZhciBmcm9tQXJyYXlfMSA9IHJlcXVpcmUoXCIuL2Zyb21BcnJheVwiKTtcbnZhciBhcmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzXCIpO1xuZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gY29uY2F0QWxsXzEuY29uY2F0QWxsKCkoZnJvbUFycmF5XzEuaW50ZXJuYWxGcm9tQXJyYXkoYXJncywgYXJnc18xLnBvcFNjaGVkdWxlcihhcmdzKSkpO1xufVxuZXhwb3J0cy5jb25jYXQgPSBjb25jYXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbm5lY3RhYmxlID0gdm9pZCAwO1xudmFyIFN1YmplY3RfMSA9IHJlcXVpcmUoXCIuLi9TdWJqZWN0XCIpO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGRlZmVyXzEgPSByZXF1aXJlKFwiLi9kZWZlclwiKTtcbnZhciBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBjb25uZWN0b3I6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdWJqZWN0XzEuU3ViamVjdCgpOyB9LFxuICAgIHJlc2V0T25EaXNjb25uZWN0OiB0cnVlLFxufTtcbmZ1bmN0aW9uIGNvbm5lY3RhYmxlKHNvdXJjZSwgY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IERFRkFVTFRfQ09ORklHOyB9XG4gICAgdmFyIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgIHZhciBjb25uZWN0b3IgPSBjb25maWcuY29ubmVjdG9yLCBfYSA9IGNvbmZpZy5yZXNldE9uRGlzY29ubmVjdCwgcmVzZXRPbkRpc2Nvbm5lY3QgPSBfYSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9hO1xuICAgIHZhciBzdWJqZWN0ID0gY29ubmVjdG9yKCk7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG4gICAgcmVzdWx0LmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY29ubmVjdGlvbiB8fCBjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IGRlZmVyXzEuZGVmZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gc291cmNlOyB9KS5zdWJzY3JpYmUoc3ViamVjdCk7XG4gICAgICAgICAgICBpZiAocmVzZXRPbkRpc2Nvbm5lY3QpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmFkZChmdW5jdGlvbiAoKSB7IHJldHVybiAoc3ViamVjdCA9IGNvbm5lY3RvcigpKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jb25uZWN0YWJsZSA9IGNvbm5lY3RhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29ubmVjdGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmVyID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBkZWZlcihvYnNlcnZhYmxlRmFjdG9yeSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgZnJvbV8xLmlubmVyRnJvbShvYnNlcnZhYmxlRmFjdG9yeSgpKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmVyID0gZGVmZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVzID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9PYnNlcnZhYmxlXCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uLy4uL1N1YnNjcmlwdGlvblwiKTtcbnZhciBwZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vc2NoZWR1bGVyL3BlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXJcIik7XG52YXIgYW5pbWF0aW9uRnJhbWVQcm92aWRlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NjaGVkdWxlci9hbmltYXRpb25GcmFtZVByb3ZpZGVyXCIpO1xuZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKHRpbWVzdGFtcFByb3ZpZGVyKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFByb3ZpZGVyID8gYW5pbWF0aW9uRnJhbWVzRmFjdG9yeSh0aW1lc3RhbXBQcm92aWRlcikgOiBERUZBVUxUX0FOSU1BVElPTl9GUkFNRVM7XG59XG5leHBvcnRzLmFuaW1hdGlvbkZyYW1lcyA9IGFuaW1hdGlvbkZyYW1lcztcbmZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lc0ZhY3RvcnkodGltZXN0YW1wUHJvdmlkZXIpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBhbmltYXRpb25GcmFtZVByb3ZpZGVyXzEuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5zY2hlZHVsZTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHZhciBwcm92aWRlciA9IHRpbWVzdGFtcFByb3ZpZGVyIHx8IHBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXJfMS5wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyO1xuICAgICAgICB2YXIgc3RhcnQgPSBwcm92aWRlci5ub3coKTtcbiAgICAgICAgdmFyIHJ1biA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIHZhciBub3cgPSBwcm92aWRlci5ub3coKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXBQcm92aWRlciA/IG5vdyA6IHRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiBub3cgLSBzdGFydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChzY2hlZHVsZShydW4pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChzY2hlZHVsZShydW4pKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9KTtcbn1cbnZhciBERUZBVUxUX0FOSU1BVElPTl9GUkFNRVMgPSBhbmltYXRpb25GcmFtZXNGYWN0b3J5KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmltYXRpb25GcmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVtcHR5ID0gZXhwb3J0cy5FTVBUWSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbmV4cG9ydHMuRU1QVFkgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7XG5mdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IGV4cG9ydHMuRU1QVFk7XG59XG5leHBvcnRzLmVtcHR5ID0gZW1wdHk7XG5mdW5jdGlvbiBlbXB0eVNjaGVkdWxlZChzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZm9ya0pvaW4gPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXJnc0FyZ0FycmF5T3JPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NBcmdBcnJheU9yT2JqZWN0XCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgYXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc1wiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgY3JlYXRlT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9jcmVhdGVPYmplY3RcIik7XG5mdW5jdGlvbiBmb3JrSm9pbigpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yID0gYXJnc18xLnBvcFJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgIHZhciBfYSA9IGFyZ3NBcmdBcnJheU9yT2JqZWN0XzEuYXJnc0FyZ0FycmF5T3JPYmplY3QoYXJncyksIHNvdXJjZXMgPSBfYS5hcmdzLCBrZXlzID0gX2Eua2V5cztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aDtcbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgICAgIHZhciByZW1haW5pbmdDb21wbGV0aW9ucyA9IGxlbmd0aDtcbiAgICAgICAgdmFyIHJlbWFpbmluZ0VtaXNzaW9ucyA9IGxlbmd0aDtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoc291cmNlSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBoYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZnJvbV8xLmlubmVyRnJvbShzb3VyY2VzW3NvdXJjZUluZGV4XSkuc3Vic2NyaWJlKG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ0VtaXNzaW9ucy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZXNbc291cmNlSW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEtLXJlbWFpbmluZ0NvbXBsZXRpb25zIHx8ICFoYXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbWFpbmluZ0VtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGtleXMgPyBjcmVhdGVPYmplY3RfMS5jcmVhdGVPYmplY3Qoa2V5cywgdmFsdWVzKSA6IHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgc291cmNlSW5kZXggPSAwOyBzb3VyY2VJbmRleCA8IGxlbmd0aDsgc291cmNlSW5kZXgrKykge1xuICAgICAgICAgICAgX2xvb3BfMShzb3VyY2VJbmRleCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgPyByZXN1bHQucGlwZShtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpIDogcmVzdWx0O1xufVxuZXhwb3J0cy5mb3JrSm9pbiA9IGZvcmtKb2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm9ya0pvaW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fYXN5bmNWYWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNWYWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZnJvbUFycmF5TGlrZSA9IGV4cG9ydHMuaW5uZXJGcm9tID0gZXhwb3J0cy5mcm9tID0gdm9pZCAwO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FycmF5TGlrZVwiKTtcbnZhciBpc1Byb21pc2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzUHJvbWlzZVwiKTtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL29ic2VydmFibGVcIik7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgc2NoZWR1bGVkXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVkL3NjaGVkdWxlZFwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIHJlcG9ydFVuaGFuZGxlZEVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9yZXBvcnRVbmhhbmRsZWRFcnJvclwiKTtcbnZhciBpc0ludGVyb3BPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlXCIpO1xudmFyIGlzQXN5bmNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlXCIpO1xudmFyIHRocm93VW5vYnNlcnZhYmxlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3JcIik7XG52YXIgaXNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNJdGVyYWJsZVwiKTtcbnZhciBpc1JlYWRhYmxlU3RyZWFtTGlrZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNSZWFkYWJsZVN0cmVhbUxpa2VcIik7XG5mdW5jdGlvbiBmcm9tKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gc2NoZWR1bGVkXzEuc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIDogaW5uZXJGcm9tKGlucHV0KTtcbn1cbmV4cG9ydHMuZnJvbSA9IGZyb207XG5mdW5jdGlvbiBpbm5lckZyb20oaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc0ludGVyb3BPYnNlcnZhYmxlXzEuaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5TGlrZV8xLmlzQXJyYXlMaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1Byb21pc2VfMS5pc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVByb21pc2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FzeW5jSXRlcmFibGVfMS5pc0FzeW5jSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0l0ZXJhYmxlXzEuaXNJdGVyYWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSXRlcmFibGUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1JlYWRhYmxlU3RyZWFtTGlrZV8xLmlzUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IHRocm93VW5vYnNlcnZhYmxlRXJyb3JfMS5jcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCk7XG59XG5leHBvcnRzLmlubmVyRnJvbSA9IGlubmVyRnJvbTtcbmZ1bmN0aW9uIGZyb21JbnRlcm9wT2JzZXJ2YWJsZShvYmopIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbb2JzZXJ2YWJsZV8xLm9ic2VydmFibGVdKCk7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYnMuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgb2JqZWN0IGRvZXMgbm90IGNvcnJlY3RseSBpbXBsZW1lbnQgU3ltYm9sLm9ic2VydmFibGUnKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UoYXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZnJvbUFycmF5TGlrZSA9IGZyb21BcnJheUxpa2U7XG5mdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgcmVwb3J0VW5oYW5kbGVkRXJyb3JfMS5yZXBvcnRVbmhhbmRsZWRFcnJvcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmcm9tSXRlcmFibGUoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgaXRlcmFibGVfMSA9IF9fdmFsdWVzKGl0ZXJhYmxlKSwgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCk7ICFpdGVyYWJsZV8xXzEuZG9uZTsgaXRlcmFibGVfMV8xID0gaXRlcmFibGVfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlXzFfMSAmJiAhaXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gaXRlcmFibGVfMS5yZXR1cm4pKSBfYS5jYWxsKGl0ZXJhYmxlXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZyb21Bc3luY0l0ZXJhYmxlKGFzeW5jSXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb2Nlc3MoYXN5bmNJdGVyYWJsZSwgc3Vic2NyaWJlcikuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZyb21SZWFkYWJsZVN0cmVhbUxpa2UocmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gZnJvbUFzeW5jSXRlcmFibGUoaXNSZWFkYWJsZVN0cmVhbUxpa2VfMS5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzKGFzeW5jSXRlcmFibGUsIHN1YnNjcmliZXIpIHtcbiAgICB2YXIgYXN5bmNJdGVyYWJsZV8xLCBhc3luY0l0ZXJhYmxlXzFfMTtcbiAgICB2YXIgZV8yLCBfYTtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSwgZV8yXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgNSwgNiwgMTFdKTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNJdGVyYWJsZV8xID0gX19hc3luY1ZhbHVlcyhhc3luY0l0ZXJhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFs0LCBhc3luY0l0ZXJhYmxlXzEubmV4dCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFzeW5jSXRlcmFibGVfMV8xID0gX2Iuc2VudCgpLCAhYXN5bmNJdGVyYWJsZV8xXzEuZG9uZSkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYXN5bmNJdGVyYWJsZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzMsIDFdO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZV8yID0geyBlcnJvcjogZV8yXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxMV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzYsICwgOSwgMTBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXN5bmNJdGVyYWJsZV8xXzEgJiYgIWFzeW5jSXRlcmFibGVfMV8xLmRvbmUgJiYgKF9hID0gYXN5bmNJdGVyYWJsZV8xLnJldHVybikpKSByZXR1cm4gWzMsIDhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIF9hLmNhbGwoYXN5bmNJdGVyYWJsZV8xKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMywgMTBdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbN107XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludGVybmFsRnJvbUFycmF5ID0gdm9pZCAwO1xudmFyIHNjaGVkdWxlQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZWQvc2NoZWR1bGVBcnJheVwiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi9mcm9tXCIpO1xuZnVuY3Rpb24gaW50ZXJuYWxGcm9tQXJyYXkoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBzY2hlZHVsZXIgPyBzY2hlZHVsZUFycmF5XzEuc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKSA6IGZyb21fMS5mcm9tQXJyYXlMaWtlKGlucHV0KTtcbn1cbmV4cG9ydHMuaW50ZXJuYWxGcm9tQXJyYXkgPSBpbnRlcm5hbEZyb21BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21BcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZnJvbUV2ZW50ID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIG1lcmdlTWFwXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL21lcmdlTWFwXCIpO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FycmF5TGlrZVwiKTtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIG1hcE9uZU9yTWFueUFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL21hcE9uZU9yTWFueUFyZ3NcIik7XG52YXIgZnJvbUFycmF5XzEgPSByZXF1aXJlKFwiLi9mcm9tQXJyYXlcIik7XG52YXIgbm9kZUV2ZW50RW1pdHRlck1ldGhvZHMgPSBbJ2FkZExpc3RlbmVyJywgJ3JlbW92ZUxpc3RlbmVyJ107XG52YXIgZXZlbnRUYXJnZXRNZXRob2RzID0gWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInXTtcbnZhciBqcXVlcnlNZXRob2RzID0gWydvbicsICdvZmYnXTtcbmZ1bmN0aW9uIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucywgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudCh0YXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucykucGlwZShtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpO1xuICAgIH1cbiAgICB2YXIgX2EgPSBfX3JlYWQoaXNFdmVudFRhcmdldCh0YXJnZXQpXG4gICAgICAgID8gZXZlbnRUYXJnZXRNZXRob2RzLm1hcChmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpOyB9OyB9KVxuICAgICAgICA6XG4gICAgICAgICAgICBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgPyBub2RlRXZlbnRFbWl0dGVyTWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIDogaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcih0YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgID8ganF1ZXJ5TWV0aG9kcy5tYXAodG9Db21tb25IYW5kbGVyUmVnaXN0cnkodGFyZ2V0LCBldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICA6IFtdLCAyKSwgYWRkID0gX2FbMF0sIHJlbW92ZSA9IF9hWzFdO1xuICAgIGlmICghYWRkKSB7XG4gICAgICAgIGlmIChpc0FycmF5TGlrZV8xLmlzQXJyYXlMaWtlKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGZ1bmN0aW9uIChzdWJUYXJnZXQpIHsgcmV0dXJuIGZyb21FdmVudChzdWJUYXJnZXQsIGV2ZW50TmFtZSwgb3B0aW9ucyk7IH0pKGZyb21BcnJheV8xLmludGVybmFsRnJvbUFycmF5KHRhcmdldCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghYWRkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdGFyZ2V0Jyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlci5uZXh0KDEgPCBhcmdzLmxlbmd0aCA/IGFyZ3MgOiBhcmdzWzBdKTtcbiAgICAgICAgfTtcbiAgICAgICAgYWRkKGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlKGhhbmRsZXIpOyB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5mcm9tRXZlbnQgPSBmcm9tRXZlbnQ7XG5mdW5jdGlvbiB0b0NvbW1vbkhhbmRsZXJSZWdpc3RyeSh0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobWV0aG9kTmFtZSkgeyByZXR1cm4gZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIHRhcmdldFttZXRob2ROYW1lXShldmVudE5hbWUsIGhhbmRsZXIpOyB9OyB9O1xufVxuZnVuY3Rpb24gaXNOb2RlU3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5hZGRMaXN0ZW5lcikgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0LnJlbW92ZUxpc3RlbmVyKTtcbn1cbmZ1bmN0aW9uIGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHRhcmdldC5vbikgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0Lm9mZik7XG59XG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbih0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcikgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mcm9tRXZlbnRQYXR0ZXJuID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgbWFwT25lT3JNYW55QXJnc18xID0gcmVxdWlyZShcIi4uL3V0aWwvbWFwT25lT3JNYW55QXJnc1wiKTtcbmZ1bmN0aW9uIGZyb21FdmVudFBhdHRlcm4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlcikucGlwZShtYXBPbmVPck1hbnlBcmdzXzEubWFwT25lT3JNYW55QXJncyhyZXN1bHRTZWxlY3RvcikpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgZVtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dChlLmxlbmd0aCA9PT0gMSA/IGVbMF0gOiBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldFZhbHVlID0gYWRkSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHJlbW92ZUhhbmRsZXIpID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlSGFuZGxlcihoYW5kbGVyLCByZXRWYWx1ZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmZyb21FdmVudFBhdHRlcm4gPSBmcm9tRXZlbnRQYXR0ZXJuO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUV2ZW50UGF0dGVybi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZSA9IHZvaWQgMDtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaWRlbnRpdHlcIik7XG52YXIgaXNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzU2NoZWR1bGVyXCIpO1xudmFyIGRlZmVyXzEgPSByZXF1aXJlKFwiLi9kZWZlclwiKTtcbnZhciBzY2hlZHVsZUl0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVkL3NjaGVkdWxlSXRlcmFibGVcIik7XG5mdW5jdGlvbiBnZW5lcmF0ZShpbml0aWFsU3RhdGVPck9wdGlvbnMsIGNvbmRpdGlvbiwgaXRlcmF0ZSwgcmVzdWx0U2VsZWN0b3JPclNjaGVkdWxlciwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICB2YXIgcmVzdWx0U2VsZWN0b3I7XG4gICAgdmFyIGluaXRpYWxTdGF0ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAoX2EgPSBpbml0aWFsU3RhdGVPck9wdGlvbnMsIGluaXRpYWxTdGF0ZSA9IF9hLmluaXRpYWxTdGF0ZSwgY29uZGl0aW9uID0gX2EuY29uZGl0aW9uLCBpdGVyYXRlID0gX2EuaXRlcmF0ZSwgX2IgPSBfYS5yZXN1bHRTZWxlY3RvciwgcmVzdWx0U2VsZWN0b3IgPSBfYiA9PT0gdm9pZCAwID8gaWRlbnRpdHlfMS5pZGVudGl0eSA6IF9iLCBzY2hlZHVsZXIgPSBfYS5zY2hlZHVsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlT3JPcHRpb25zO1xuICAgICAgICBpZiAoIXJlc3VsdFNlbGVjdG9yT3JTY2hlZHVsZXIgfHwgaXNTY2hlZHVsZXJfMS5pc1NjaGVkdWxlcihyZXN1bHRTZWxlY3Rvck9yU2NoZWR1bGVyKSkge1xuICAgICAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSBpZGVudGl0eV8xLmlkZW50aXR5O1xuICAgICAgICAgICAgc2NoZWR1bGVyID0gcmVzdWx0U2VsZWN0b3JPclNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yID0gcmVzdWx0U2VsZWN0b3JPclNjaGVkdWxlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZW4oKSB7XG4gICAgICAgIHZhciBzdGF0ZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCFjb25kaXRpb24gfHwgY29uZGl0aW9uKHN0YXRlKSkpIHJldHVybiBbMywgNF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgcmVzdWx0U2VsZWN0b3Ioc3RhdGUpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBpdGVyYXRlKHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszLCAxXTtcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJfMS5kZWZlcigoc2NoZWR1bGVyXG4gICAgICAgID9cbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVkdWxlSXRlcmFibGVfMS5zY2hlZHVsZUl0ZXJhYmxlKGdlbigpLCBzY2hlZHVsZXIpOyB9XG4gICAgICAgIDpcbiAgICAgICAgICAgIGdlbikpO1xufVxuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJhdGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlpZiA9IHZvaWQgMDtcbnZhciBkZWZlcl8xID0gcmVxdWlyZShcIi4vZGVmZXJcIik7XG5mdW5jdGlvbiBpaWYoY29uZGl0aW9uLCB0cnVlUmVzdWx0LCBmYWxzZVJlc3VsdCkge1xuICAgIHJldHVybiBkZWZlcl8xLmRlZmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIChjb25kaXRpb24oKSA/IHRydWVSZXN1bHQgOiBmYWxzZVJlc3VsdCk7IH0pO1xufVxuZXhwb3J0cy5paWYgPSBpaWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1paWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludGVydmFsID0gdm9pZCAwO1xudmFyIGFzeW5jXzEgPSByZXF1aXJlKFwiLi4vc2NoZWR1bGVyL2FzeW5jXCIpO1xudmFyIHRpbWVyXzEgPSByZXF1aXJlKFwiLi90aW1lclwiKTtcbmZ1bmN0aW9uIGludGVydmFsKHBlcmlvZCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHBlcmlvZCA9PT0gdm9pZCAwKSB7IHBlcmlvZCA9IDA7IH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHsgc2NoZWR1bGVyID0gYXN5bmNfMS5hc3luY1NjaGVkdWxlcjsgfVxuICAgIGlmIChwZXJpb2QgPCAwKSB7XG4gICAgICAgIHBlcmlvZCA9IDA7XG4gICAgfVxuICAgIHJldHVybiB0aW1lcl8xLnRpbWVyKHBlcmlvZCwgcGVyaW9kLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5pbnRlcnZhbCA9IGludGVydmFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJ2YWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlID0gdm9pZCAwO1xudmFyIG1lcmdlQWxsXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL21lcmdlQWxsXCIpO1xudmFyIGZyb21BcnJheV8xID0gcmVxdWlyZShcIi4vZnJvbUFycmF5XCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL2VtcHR5XCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgdmFyIGNvbmN1cnJlbnQgPSBhcmdzXzEucG9wTnVtYmVyKGFyZ3MsIEluZmluaXR5KTtcbiAgICB2YXIgc291cmNlcyA9IGFyZ3M7XG4gICAgcmV0dXJuICFzb3VyY2VzLmxlbmd0aFxuICAgICAgICA/XG4gICAgICAgICAgICBlbXB0eV8xLkVNUFRZXG4gICAgICAgIDogc291cmNlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgID9cbiAgICAgICAgICAgICAgICBmcm9tXzEuaW5uZXJGcm9tKHNvdXJjZXNbMF0pXG4gICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgbWVyZ2VBbGxfMS5tZXJnZUFsbChjb25jdXJyZW50KShmcm9tQXJyYXlfMS5pbnRlcm5hbEZyb21BcnJheShzb3VyY2VzLCBzY2hlZHVsZXIpKTtcbn1cbmV4cG9ydHMubWVyZ2UgPSBtZXJnZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5uZXZlciA9IGV4cG9ydHMuTkVWRVIgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgbm9vcF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbm9vcFwiKTtcbmV4cG9ydHMuTkVWRVIgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUobm9vcF8xLm5vb3ApO1xuZnVuY3Rpb24gbmV2ZXIoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuTkVWRVI7XG59XG5leHBvcnRzLm5ldmVyID0gbmV2ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uZXZlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub2YgPSB2b2lkIDA7XG52YXIgZnJvbUFycmF5XzEgPSByZXF1aXJlKFwiLi9mcm9tQXJyYXlcIik7XG52YXIgc2NoZWR1bGVBcnJheV8xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5XCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG5mdW5jdGlvbiBvZigpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIHNjaGVkdWxlciA9IGFyZ3NfMS5wb3BTY2hlZHVsZXIoYXJncyk7XG4gICAgcmV0dXJuIHNjaGVkdWxlciA/IHNjaGVkdWxlQXJyYXlfMS5zY2hlZHVsZUFycmF5KGFyZ3MsIHNjaGVkdWxlcikgOiBmcm9tQXJyYXlfMS5pbnRlcm5hbEZyb21BcnJheShhcmdzKTtcbn1cbmV4cG9ydHMub2YgPSBvZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IHZvaWQgMDtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG52YXIgb25FcnJvclJlc3VtZU5leHRfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvb25FcnJvclJlc3VtZU5leHRcIik7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xuZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBvbkVycm9yUmVzdW1lTmV4dF8xLm9uRXJyb3JSZXN1bWVOZXh0KGFyZ3NPckFyZ0FycmF5XzEuYXJnc09yQXJnQXJyYXkoc291cmNlcykpKGVtcHR5XzEuRU1QVFkpO1xufVxuZXhwb3J0cy5vbkVycm9yUmVzdW1lTmV4dCA9IG9uRXJyb3JSZXN1bWVOZXh0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b25FcnJvclJlc3VtZU5leHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhaXJzID0gdm9pZCAwO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBwYWlycyhvYmosIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBmcm9tXzEuZnJvbShPYmplY3QuZW50cmllcyhvYmopLCBzY2hlZHVsZXIpO1xufVxuZXhwb3J0cy5wYWlycyA9IHBhaXJzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFpcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBhcnRpdGlvbiA9IHZvaWQgMDtcbnZhciBub3RfMSA9IHJlcXVpcmUoXCIuLi91dGlsL25vdFwiKTtcbnZhciBmaWx0ZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvZmlsdGVyXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG5mdW5jdGlvbiBwYXJ0aXRpb24oc291cmNlLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gW2ZpbHRlcl8xLmZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpKGZyb21fMS5pbm5lckZyb20oc291cmNlKSksIGZpbHRlcl8xLmZpbHRlcihub3RfMS5ub3QocHJlZGljYXRlLCB0aGlzQXJnKSkoZnJvbV8xLmlubmVyRnJvbShzb3VyY2UpKV07XG59XG5leHBvcnRzLnBhcnRpdGlvbiA9IHBhcnRpdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnRpdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFjZUluaXQgPSBleHBvcnRzLnJhY2UgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgZnJvbV8xID0gcmVxdWlyZShcIi4vZnJvbVwiKTtcbnZhciBhcmdzT3JBcmdBcnJheV8xID0gcmVxdWlyZShcIi4uL3V0aWwvYXJnc09yQXJnQXJyYXlcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vb3BlcmF0b3JzL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHJhY2UoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHNvdXJjZXMgPSBhcmdzT3JBcmdBcnJheV8xLmFyZ3NPckFyZ0FycmF5KHNvdXJjZXMpO1xuICAgIHJldHVybiBzb3VyY2VzLmxlbmd0aCA9PT0gMSA/IGZyb21fMS5pbm5lckZyb20oc291cmNlc1swXSkgOiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUocmFjZUluaXQoc291cmNlcykpO1xufVxuZXhwb3J0cy5yYWNlID0gcmFjZTtcbmZ1bmN0aW9uIHJhY2VJbml0KHNvdXJjZXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKGZyb21fMS5pbm5lckZyb20oc291cmNlc1tpXSkuc3Vic2NyaWJlKG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBzdWJzY3JpcHRpb25zLmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICE9PSBpICYmIHN1YnNjcmlwdGlvbnNbc10udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBzdWJzY3JpcHRpb25zICYmICFzdWJzY3JpYmVyLmNsb3NlZCAmJiBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnJhY2VJbml0ID0gcmFjZUluaXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYWNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5nZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbnZhciBlbXB0eV8xID0gcmVxdWlyZShcIi4vZW1wdHlcIik7XG5mdW5jdGlvbiByYW5nZShzdGFydCwgY291bnQsIHNjaGVkdWxlcikge1xuICAgIGlmIChjb3VudCA9PSBudWxsKSB7XG4gICAgICAgIGNvdW50ID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGVtcHR5XzEuRU1QVFk7XG4gICAgfVxuICAgIHZhciBlbmQgPSBjb3VudCArIHN0YXJ0O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoc2NoZWR1bGVyXG4gICAgICAgID9cbiAgICAgICAgICAgIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBzdGFydDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPCBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChuKyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIDpcbiAgICAgICAgICAgIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBzdGFydDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobiA8IGVuZCAmJiAhc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG4rKyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFuZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRocm93RXJyb3IgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3JPckVycm9yRmFjdG9yeSwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIGVycm9yRmFjdG9yeSA9IGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGVycm9yT3JFcnJvckZhY3RvcnkpID8gZXJyb3JPckVycm9yRmFjdG9yeSA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVycm9yT3JFcnJvckZhY3Rvcnk7IH07XG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnJvckZhY3RvcnkoKSk7IH07XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShzY2hlZHVsZXIgPyBmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGluaXQsIDAsIHN1YnNjcmliZXIpOyB9IDogaW5pdCk7XG59XG5leHBvcnRzLnRocm93RXJyb3IgPSB0aHJvd0Vycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGltZXIgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvYXN5bmNcIik7XG52YXIgaXNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzU2NoZWR1bGVyXCIpO1xudmFyIGlzRGF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNEYXRlXCIpO1xuZnVuY3Rpb24gdGltZXIoZHVlVGltZSwgaW50ZXJ2YWxPclNjaGVkdWxlciwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGR1ZVRpbWUgPT09IHZvaWQgMCkgeyBkdWVUaW1lID0gMDsgfVxuICAgIGlmIChzY2hlZHVsZXIgPT09IHZvaWQgMCkgeyBzY2hlZHVsZXIgPSBhc3luY18xLmFzeW5jOyB9XG4gICAgdmFyIGludGVydmFsRHVyYXRpb24gPSAtMTtcbiAgICBpZiAoaW50ZXJ2YWxPclNjaGVkdWxlciAhPSBudWxsKSB7XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcl8xLmlzU2NoZWR1bGVyKGludGVydmFsT3JTY2hlZHVsZXIpKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSBpbnRlcnZhbE9yU2NoZWR1bGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW50ZXJ2YWxEdXJhdGlvbiA9IGludGVydmFsT3JTY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgZHVlID0gaXNEYXRlXzEuaXNWYWxpZERhdGUoZHVlVGltZSkgPyArZHVlVGltZSAtIHNjaGVkdWxlci5ub3coKSA6IGR1ZVRpbWU7XG4gICAgICAgIGlmIChkdWUgPCAwKSB7XG4gICAgICAgICAgICBkdWUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG4rKyk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPD0gaW50ZXJ2YWxEdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHVuZGVmaW5lZCwgaW50ZXJ2YWxEdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkdWUpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lciA9IHRpbWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzaW5nID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgZW1wdHlfMSA9IHJlcXVpcmUoXCIuL2VtcHR5XCIpO1xuZnVuY3Rpb24gdXNpbmcocmVzb3VyY2VGYWN0b3J5LCBvYnNlcnZhYmxlRmFjdG9yeSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHJlc291cmNlID0gcmVzb3VyY2VGYWN0b3J5KCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBvYnNlcnZhYmxlRmFjdG9yeShyZXNvdXJjZSk7XG4gICAgICAgIHZhciBzb3VyY2UgPSByZXN1bHQgPyBmcm9tXzEuaW5uZXJGcm9tKHJlc3VsdCkgOiBlbXB0eV8xLkVNUFRZO1xuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMudXNpbmcgPSB1c2luZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzaW5nLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuemlwID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuL2Zyb21cIik7XG52YXIgYXJnc09yQXJnQXJyYXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NPckFyZ0FycmF5XCIpO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi9lbXB0eVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvT3BlcmF0b3JTdWJzY3JpYmVyXCIpO1xudmFyIGFyZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2FyZ3NcIik7XG5mdW5jdGlvbiB6aXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZXN1bHRTZWxlY3RvciA9IGFyZ3NfMS5wb3BSZXN1bHRTZWxlY3RvcihhcmdzKTtcbiAgICB2YXIgc291cmNlcyA9IGFyZ3NPckFyZ0FycmF5XzEuYXJnc09yQXJnQXJyYXkoYXJncyk7XG4gICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoXG4gICAgICAgID8gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVycyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9KTtcbiAgICAgICAgICAgIHZhciBjb21wbGV0ZWQgPSBzb3VyY2VzLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSk7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVycyA9IGNvbXBsZXRlZCA9IG51bGw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHNvdXJjZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgZnJvbV8xLmlubmVyRnJvbShzb3VyY2VzW3NvdXJjZUluZGV4XSkuc3Vic2NyaWJlKG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcnNbc291cmNlSW5kZXhdLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVycy5ldmVyeShmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIubGVuZ3RoOyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGJ1ZmZlcnMubWFwKGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5zaGlmdCgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHRTZWxlY3RvciA/IHJlc3VsdFNlbGVjdG9yLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCkpKSA6IHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVycy5zb21lKGZ1bmN0aW9uIChidWZmZXIsIGkpIHsgcmV0dXJuICFidWZmZXIubGVuZ3RoICYmIGNvbXBsZXRlZFtpXTsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZFtzb3VyY2VJbmRleF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAhYnVmZmVyc1tzb3VyY2VJbmRleF0ubGVuZ3RoICYmIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yICh2YXIgc291cmNlSW5kZXggPSAwOyAhc3Vic2NyaWJlci5jbG9zZWQgJiYgc291cmNlSW5kZXggPCBzb3VyY2VzLmxlbmd0aDsgc291cmNlSW5kZXgrKykge1xuICAgICAgICAgICAgICAgIF9sb29wXzEoc291cmNlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXJzID0gY29tcGxldGVkID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIDogZW1wdHlfMS5FTVBUWTtcbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emlwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3BlcmF0b3JTdWJzY3JpYmVyID0gdm9pZCAwO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpYmVyXCIpO1xudmFyIE9wZXJhdG9yU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9wZXJhdG9yU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPcGVyYXRvclN1YnNjcmliZXIoZGVzdGluYXRpb24sIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciwgb25GaW5hbGl6ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMub25GaW5hbGl6ZSA9IG9uRmluYWxpemU7XG4gICAgICAgIF90aGlzLl9uZXh0ID0gb25OZXh0XG4gICAgICAgICAgICA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IF9zdXBlci5wcm90b3R5cGUuX25leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IG9uRXJyb3JcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fZXJyb3I7XG4gICAgICAgIF90aGlzLl9jb21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogX3N1cGVyLnByb3RvdHlwZS5fY29tcGxldGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT3BlcmF0b3JTdWJzY3JpYmVyLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgIWNsb3NlZCAmJiAoKF9hID0gdGhpcy5vbkZpbmFsaXplKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzKSk7XG4gICAgfTtcbiAgICByZXR1cm4gT3BlcmF0b3JTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5PcGVyYXRvclN1YnNjcmliZXIgPSBPcGVyYXRvclN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PcGVyYXRvclN1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdEFsbCA9IHZvaWQgMDtcbnZhciBtZXJnZUFsbF8xID0gcmVxdWlyZShcIi4vbWVyZ2VBbGxcIik7XG5mdW5jdGlvbiBjb25jYXRBbGwoKSB7XG4gICAgcmV0dXJuIG1lcmdlQWxsXzEubWVyZ2VBbGwoMSk7XG59XG5leHBvcnRzLmNvbmNhdEFsbCA9IGNvbmNhdEFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmNhdEFsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmlsdGVyID0gdm9pZCAwO1xudmFyIGxpZnRfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2xpZnRcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gcHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4KyspICYmIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tYXAgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIG1hcChwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHByb2plY3QuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgrKykpO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLm1hcCA9IG1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWVyZ2VBbGwgPSB2b2lkIDA7XG52YXIgbWVyZ2VNYXBfMSA9IHJlcXVpcmUoXCIuL21lcmdlTWFwXCIpO1xudmFyIGlkZW50aXR5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pZGVudGl0eVwiKTtcbmZ1bmN0aW9uIG1lcmdlQWxsKGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7IGNvbmN1cnJlbnQgPSBJbmZpbml0eTsgfVxuICAgIHJldHVybiBtZXJnZU1hcF8xLm1lcmdlTWFwKGlkZW50aXR5XzEuaWRlbnRpdHksIGNvbmN1cnJlbnQpO1xufVxuZXhwb3J0cy5tZXJnZUFsbCA9IG1lcmdlQWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VBbGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlSW50ZXJuYWxzID0gdm9pZCAwO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21cIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBtZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQsIG9uQmVmb3JlTmV4dCwgZXhwYW5kLCBpbm5lclN1YlNjaGVkdWxlciwgYWRkaXRpb25hbFRlYXJkb3duKSB7XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhY3RpdmUgPSAwO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgIWJ1ZmZlci5sZW5ndGggJiYgIWFjdGl2ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgb3V0ZXJOZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAoYWN0aXZlIDwgY29uY3VycmVudCA/IGRvSW5uZXJTdWIodmFsdWUpIDogYnVmZmVyLnB1c2godmFsdWUpKTsgfTtcbiAgICB2YXIgZG9Jbm5lclN1YiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBleHBhbmQgJiYgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgYWN0aXZlKys7XG4gICAgICAgIHZhciBpbm5lckNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgIGZyb21fMS5pbm5lckZyb20ocHJvamVjdCh2YWx1ZSwgaW5kZXgrKykpLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7XG4gICAgICAgICAgICBvbkJlZm9yZU5leHQgPT09IG51bGwgfHwgb25CZWZvcmVOZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbkJlZm9yZU5leHQoaW5uZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoZXhwYW5kKSB7XG4gICAgICAgICAgICAgICAgb3V0ZXJOZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlubmVyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbm5lckNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgfSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaW5uZXJDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS0tO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWZmZXJlZFZhbHVlID0gYnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lclN1YlNjaGVkdWxlciA/IHN1YnNjcmliZXIuYWRkKGlubmVyU3ViU2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvSW5uZXJTdWIoYnVmZmVyZWRWYWx1ZSk7IH0pKSA6IGRvSW5uZXJTdWIoYnVmZmVyZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoICYmIGFjdGl2ZSA8IGNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgc291cmNlLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIG91dGVyTmV4dCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBhZGRpdGlvbmFsVGVhcmRvd24gPT09IG51bGwgfHwgYWRkaXRpb25hbFRlYXJkb3duID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhZGRpdGlvbmFsVGVhcmRvd24oKTtcbiAgICB9O1xufVxuZXhwb3J0cy5tZXJnZUludGVybmFscyA9IG1lcmdlSW50ZXJuYWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVyZ2VJbnRlcm5hbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1lcmdlTWFwID0gdm9pZCAwO1xudmFyIG1hcF8xID0gcmVxdWlyZShcIi4vbWFwXCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21cIik7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBtZXJnZUludGVybmFsc18xID0gcmVxdWlyZShcIi4vbWVyZ2VJbnRlcm5hbHNcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIG1lcmdlTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yLCBjb25jdXJyZW50KSB7XG4gICAgaWYgKGNvbmN1cnJlbnQgPT09IHZvaWQgMCkgeyBjb25jdXJyZW50ID0gSW5maW5pdHk7IH1cbiAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiBtZXJnZU1hcChmdW5jdGlvbiAoYSwgaSkgeyByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uIChiLCBpaSkgeyByZXR1cm4gcmVzdWx0U2VsZWN0b3IoYSwgYiwgaSwgaWkpOyB9KShmcm9tXzEuaW5uZXJGcm9tKHByb2plY3QoYSwgaSkpKTsgfSwgY29uY3VycmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICByZXR1cm4gbGlmdF8xLm9wZXJhdGUoZnVuY3Rpb24gKHNvdXJjZSwgc3Vic2NyaWJlcikgeyByZXR1cm4gbWVyZ2VJbnRlcm5hbHNfMS5tZXJnZUludGVybmFscyhzb3VyY2UsIHN1YnNjcmliZXIsIHByb2plY3QsIGNvbmN1cnJlbnQpOyB9KTtcbn1cbmV4cG9ydHMubWVyZ2VNYXAgPSBtZXJnZU1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlTWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYnNlcnZlT24gPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShuZXcgT3BlcmF0b3JTdWJzY3JpYmVyXzEuT3BlcmF0b3JTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0sIGRlbGF5KSk7IH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0sIGRlbGF5KSk7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0sIGRlbGF5KSk7IH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMub2JzZXJ2ZU9uID0gb2JzZXJ2ZU9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZU9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMub25FcnJvclJlc3VtZU5leHQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBmcm9tXzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9mcm9tXCIpO1xudmFyIGFyZ3NPckFyZ0FycmF5XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcmdzT3JBcmdBcnJheVwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbnZhciBub29wXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9ub29wXCIpO1xuZnVuY3Rpb24gb25FcnJvclJlc3VtZU5leHQoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBuZXh0U291cmNlcyA9IGFyZ3NPckFyZ0FycmF5XzEuYXJnc09yQXJnQXJyYXkoc291cmNlcyk7XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IF9fc3ByZWFkQXJyYXkoW3NvdXJjZV0sIF9fcmVhZChuZXh0U291cmNlcykpO1xuICAgICAgICB2YXIgc3Vic2NyaWJlTmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0U291cmNlID0gZnJvbV8xLmlubmVyRnJvbShyZW1haW5pbmcuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbm5lclN1YiA9IG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCBub29wXzEubm9vcCwgbm9vcF8xLm5vb3ApO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChuZXh0U291cmNlLnN1YnNjcmliZShpbm5lclN1YikpO1xuICAgICAgICAgICAgICAgICAgICBpbm5lclN1Yi5hZGQoc3Vic2NyaWJlTmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzdWJzY3JpYmVOZXh0KCk7XG4gICAgfSk7XG59XG5leHBvcnRzLm9uRXJyb3JSZXN1bWVOZXh0ID0gb25FcnJvclJlc3VtZU5leHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vbkVycm9yUmVzdW1lTmV4dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVmQ291bnQgPSB2b2lkIDA7XG52YXIgbGlmdF8xID0gcmVxdWlyZShcIi4uL3V0aWwvbGlmdFwiKTtcbnZhciBPcGVyYXRvclN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL09wZXJhdG9yU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIHJlZkNvdW50KCkge1xuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgc291cmNlLl9yZWZDb3VudCsrO1xuICAgICAgICB2YXIgcmVmQ291bnRlciA9IG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzb3VyY2UgfHwgc291cmNlLl9yZWZDb3VudCA8PSAwIHx8IDAgPCAtLXNvdXJjZS5fcmVmQ291bnQpIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2hhcmVkQ29ubmVjdGlvbiA9IHNvdXJjZS5fY29ubmVjdGlvbjtcbiAgICAgICAgICAgIHZhciBjb25uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgaWYgKHNoYXJlZENvbm5lY3Rpb24gJiYgKCFjb25uIHx8IHNoYXJlZENvbm5lY3Rpb24gPT09IGNvbm4pKSB7XG4gICAgICAgICAgICAgICAgc2hhcmVkQ29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc291cmNlLnN1YnNjcmliZShyZWZDb3VudGVyKTtcbiAgICAgICAgaWYgKCFyZWZDb3VudGVyLmNsb3NlZCkge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHNvdXJjZS5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMucmVmQ291bnQgPSByZWZDb3VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZkNvdW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zdWJzY3JpYmVPbiA9IHZvaWQgMDtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xuZnVuY3Rpb24gc3Vic2NyaWJlT24oc2NoZWR1bGVyLCBkZWxheSkge1xuICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgIHJldHVybiBsaWZ0XzEub3BlcmF0ZShmdW5jdGlvbiAoc291cmNlLCBzdWJzY3JpYmVyKSB7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpOyB9LCBkZWxheSkpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zdWJzY3JpYmVPbiA9IHN1YnNjcmliZU9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlT24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRpbWVvdXQgPSBleHBvcnRzLlRpbWVvdXRFcnJvciA9IHZvaWQgMDtcbnZhciBhc3luY18xID0gcmVxdWlyZShcIi4uL3NjaGVkdWxlci9hc3luY1wiKTtcbnZhciBpc0RhdGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRGF0ZVwiKTtcbnZhciBsaWZ0XzEgPSByZXF1aXJlKFwiLi4vdXRpbC9saWZ0XCIpO1xudmFyIGZyb21fMSA9IHJlcXVpcmUoXCIuLi9vYnNlcnZhYmxlL2Zyb21cIik7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4uL3V0aWwvY3JlYXRlRXJyb3JDbGFzc1wiKTtcbnZhciBjYXVnaHRTY2hlZHVsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvY2F1Z2h0U2NoZWR1bGVcIik7XG52YXIgT3BlcmF0b3JTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi9PcGVyYXRvclN1YnNjcmliZXJcIik7XG5leHBvcnRzLlRpbWVvdXRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVGltZW91dEVycm9ySW1wbChpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvID09PSB2b2lkIDApIHsgaW5mbyA9IG51bGw7IH1cbiAgICAgICAgX3N1cGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnVGltZW91dCBoYXMgb2NjdXJyZWQnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVGltZW91dEVycm9yJztcbiAgICAgICAgdGhpcy5pbmZvID0gaW5mbztcbiAgICB9O1xufSk7XG5mdW5jdGlvbiB0aW1lb3V0KGNvbmZpZywgc2NoZWR1bGVyQXJnKSB7XG4gICAgdmFyIF9hID0gKGlzRGF0ZV8xLmlzVmFsaWREYXRlKGNvbmZpZylcbiAgICAgICAgPyB7IGZpcnN0OiBjb25maWcgfVxuICAgICAgICA6IHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IHsgZWFjaDogY29uZmlnIH1cbiAgICAgICAgICAgIDogY29uZmlnKSwgZmlyc3QgPSBfYS5maXJzdCwgZWFjaCA9IF9hLmVhY2gsIF9iID0gX2Eud2l0aCwgX3dpdGggPSBfYiA9PT0gdm9pZCAwID8gdGltZW91dEVycm9yRmFjdG9yeSA6IF9iLCBfYyA9IF9hLnNjaGVkdWxlciwgc2NoZWR1bGVyID0gX2MgPT09IHZvaWQgMCA/IHNjaGVkdWxlckFyZyAhPT0gbnVsbCAmJiBzY2hlZHVsZXJBcmcgIT09IHZvaWQgMCA/IHNjaGVkdWxlckFyZyA6IGFzeW5jXzEuYXN5bmNTY2hlZHVsZXIgOiBfYywgX2QgPSBfYS5tZXRhLCBtZXRhID0gX2QgPT09IHZvaWQgMCA/IG51bGwgOiBfZDtcbiAgICBpZiAoZmlyc3QgPT0gbnVsbCAmJiBlYWNoID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm8gdGltZW91dCBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpZnRfMS5vcGVyYXRlKGZ1bmN0aW9uIChzb3VyY2UsIHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsU291cmNlU3Vic2NyaXB0aW9uO1xuICAgICAgICB2YXIgdGltZXJTdWJzY3JpcHRpb247XG4gICAgICAgIHZhciBsYXN0VmFsdWUgPSBudWxsO1xuICAgICAgICB2YXIgc2VlbiA9IDA7XG4gICAgICAgIHZhciBzdGFydFRpbWVyID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gICAgICAgICAgICB0aW1lclN1YnNjcmlwdGlvbiA9IGNhdWdodFNjaGVkdWxlXzEuY2F1Z2h0U2NoZWR1bGUoc3Vic2NyaWJlciwgc2NoZWR1bGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxTb3VyY2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBmcm9tXzEuaW5uZXJGcm9tKF93aXRoKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0YTogbWV0YSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdFZhbHVlOiBsYXN0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHNlZW46IHNlZW4sXG4gICAgICAgICAgICAgICAgfSkpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgfTtcbiAgICAgICAgb3JpZ2luYWxTb3VyY2VTdWJzY3JpcHRpb24gPSBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBPcGVyYXRvclN1YnNjcmliZXJfMS5PcGVyYXRvclN1YnNjcmliZXIoc3Vic2NyaWJlciwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aW1lclN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCB0aW1lclN1YnNjcmlwdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGltZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHNlZW4rKztcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCgobGFzdFZhbHVlID0gdmFsdWUpKTtcbiAgICAgICAgICAgIGVhY2ggPiAwICYmIHN0YXJ0VGltZXIoZWFjaCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoISh0aW1lclN1YnNjcmlwdGlvbiA9PT0gbnVsbCB8fCB0aW1lclN1YnNjcmlwdGlvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGltZXJTdWJzY3JpcHRpb24uY2xvc2VkKSkge1xuICAgICAgICAgICAgICAgIHRpbWVyU3Vic2NyaXB0aW9uID09PSBudWxsIHx8IHRpbWVyU3Vic2NyaXB0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0aW1lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgfSkpO1xuICAgICAgICBzdGFydFRpbWVyKGZpcnN0ICE9IG51bGwgPyAodHlwZW9mIGZpcnN0ID09PSAnbnVtYmVyJyA/IGZpcnN0IDogK2ZpcnN0IC0gc2NoZWR1bGVyLm5vdygpKSA6IGVhY2gpO1xuICAgIH0pO1xufVxuZXhwb3J0cy50aW1lb3V0ID0gdGltZW91dDtcbmZ1bmN0aW9uIHRpbWVvdXRFcnJvckZhY3RvcnkoaW5mbykge1xuICAgIHRocm93IG5ldyBleHBvcnRzLlRpbWVvdXRFcnJvcihpbmZvKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVvdXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlQXJyYXkgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG5mdW5jdGlvbiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlucHV0W2krK10pO1xuICAgICAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNjaGVkdWxlQXJyYXkgPSBzY2hlZHVsZUFycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVBcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NoZWR1bGVBc3luY0l0ZXJhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0ZXJhYmxlIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YiA9IG5ldyBTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24oKTtcbiAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5uZXh0KCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVBc3luY0l0ZXJhYmxlID0gc2NoZWR1bGVBc3luY0l0ZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVBc3luY0l0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZUl0ZXJhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL2l0ZXJhdG9yXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzRnVuY3Rpb25cIik7XG52YXIgY2F1Z2h0U2NoZWR1bGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2NhdWdodFNjaGVkdWxlXCIpO1xuZnVuY3Rpb24gc2NoZWR1bGVJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3I7XG4gICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRvciA9IGlucHV0W2l0ZXJhdG9yXzEuaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICBjYXVnaHRTY2hlZHVsZV8xLmNhdWdodFNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSA9IGl0ZXJhdG9yLm5leHQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihpdGVyYXRvciA9PT0gbnVsbCB8fCBpdGVyYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaXRlcmF0b3IucmV0dXJuKSAmJiBpdGVyYXRvci5yZXR1cm4oKTsgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2NoZWR1bGVJdGVyYWJsZSA9IHNjaGVkdWxlSXRlcmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZUl0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zY2hlZHVsZU9ic2VydmFibGUgPSB2b2lkIDA7XG52YXIgT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVcIik7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9zeW1ib2wvb2JzZXJ2YWJsZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3ViID0gbmV3IFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbigpO1xuICAgICAgICBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IGlucHV0W29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSgpO1xuICAgICAgICAgICAgc3ViLmFkZChvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7IH0pKTsgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycikgeyBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmVycm9yKGVycik7IH0pKTsgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkgeyBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pKTsgfSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY2hlZHVsZU9ic2VydmFibGUgPSBzY2hlZHVsZU9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZU9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlUHJvbWlzZSA9IHZvaWQgMDtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY2hlZHVsZVByb21pc2UgPSBzY2hlZHVsZVByb21pc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVByb21pc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlID0gdm9pZCAwO1xudmFyIHNjaGVkdWxlQXN5bmNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVBc3luY0l0ZXJhYmxlXCIpO1xudmFyIGlzUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc1JlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVBc3luY0l0ZXJhYmxlXzEuc2NoZWR1bGVBc3luY0l0ZXJhYmxlKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEucmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcihpbnB1dCksIHNjaGVkdWxlcik7XG59XG5leHBvcnRzLnNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlID0gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2NoZWR1bGVkID0gdm9pZCAwO1xudmFyIHNjaGVkdWxlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVPYnNlcnZhYmxlXCIpO1xudmFyIHNjaGVkdWxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVQcm9taXNlXCIpO1xudmFyIHNjaGVkdWxlQXJyYXlfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlQXJyYXlcIik7XG52YXIgc2NoZWR1bGVJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4vc2NoZWR1bGVJdGVyYWJsZVwiKTtcbnZhciBzY2hlZHVsZUFzeW5jSXRlcmFibGVfMSA9IHJlcXVpcmUoXCIuL3NjaGVkdWxlQXN5bmNJdGVyYWJsZVwiKTtcbnZhciBpc0ludGVyb3BPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlXCIpO1xudmFyIGlzUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNQcm9taXNlXCIpO1xudmFyIGlzQXJyYXlMaWtlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0FycmF5TGlrZVwiKTtcbnZhciBpc0l0ZXJhYmxlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9pc0l0ZXJhYmxlXCIpO1xudmFyIGlzQXN5bmNJdGVyYWJsZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvaXNBc3luY0l0ZXJhYmxlXCIpO1xudmFyIHRocm93VW5vYnNlcnZhYmxlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3Rocm93VW5vYnNlcnZhYmxlRXJyb3JcIik7XG52YXIgaXNSZWFkYWJsZVN0cmVhbUxpa2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2lzUmVhZGFibGVTdHJlYW1MaWtlXCIpO1xudmFyIHNjaGVkdWxlUmVhZGFibGVTdHJlYW1MaWtlXzEgPSByZXF1aXJlKFwiLi9zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZVwiKTtcbmZ1bmN0aW9uIHNjaGVkdWxlZChpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGlzSW50ZXJvcE9ic2VydmFibGVfMS5pc0ludGVyb3BPYnNlcnZhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlT2JzZXJ2YWJsZV8xLnNjaGVkdWxlT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheUxpa2VfMS5pc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFycmF5XzEuc2NoZWR1bGVBcnJheShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQcm9taXNlXzEuaXNQcm9taXNlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUHJvbWlzZV8xLnNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBc3luY0l0ZXJhYmxlXzEuaXNBc3luY0l0ZXJhYmxlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlQXN5bmNJdGVyYWJsZV8xLnNjaGVkdWxlQXN5bmNJdGVyYWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJdGVyYWJsZV8xLmlzSXRlcmFibGUoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVJdGVyYWJsZV8xLnNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUmVhZGFibGVTdHJlYW1MaWtlXzEuaXNSZWFkYWJsZVN0cmVhbUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVSZWFkYWJsZVN0cmVhbUxpa2VfMS5zY2hlZHVsZVJlYWRhYmxlU3RyZWFtTGlrZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyB0aHJvd1Vub2JzZXJ2YWJsZUVycm9yXzEuY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IoaW5wdXQpO1xufVxuZXhwb3J0cy5zY2hlZHVsZWQgPSBzY2hlZHVsZWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb24gPSB2b2lkIDA7XG52YXIgU3Vic2NyaXB0aW9uXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaXB0aW9uXCIpO1xudmFyIEFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBY3Rpb24oc2NoZWR1bGVyLCB3b3JrKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQWN0aW9uO1xufShTdWJzY3JpcHRpb25fMS5TdWJzY3JpcHRpb24pKTtcbmV4cG9ydHMuQWN0aW9uID0gQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSB2b2lkIDA7XG52YXIgQXN5bmNBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FzeW5jQWN0aW9uXCIpO1xudmFyIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2FuaW1hdGlvbkZyYW1lUHJvdmlkZXJcIik7XG52YXIgQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBbmltYXRpb25GcmFtZUFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbmltYXRpb25GcmFtZUFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFuaW1hdGlvbkZyYW1lQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVyLmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5fc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuX3NjaGVkdWxlZCA9IGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMS5hbmltYXRpb25GcmFtZVByb3ZpZGVyLnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlZHVsZXIuZmx1c2godW5kZWZpbmVkKTsgfSkpO1xuICAgIH07XG4gICAgQW5pbWF0aW9uRnJhbWVBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoKGRlbGF5ICE9IG51bGwgJiYgZGVsYXkgPiAwKSB8fCAoZGVsYXkgPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlZHVsZXIuYWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lUHJvdmlkZXJfMS5hbmltYXRpb25GcmFtZVByb3ZpZGVyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0aW9uRnJhbWVBY3Rpb247XG59KEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pKTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVBY3Rpb24gPSBBbmltYXRpb25GcmFtZUFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFuaW1hdGlvbkZyYW1lQWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgYWN0aW9ucy5zaGlmdCgpO1xuICAgICAgICB2YXIgY291bnQgPSBhY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKytpbmRleCA8IGNvdW50ICYmIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBjb3VudCAmJiAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBbmltYXRpb25GcmFtZVNjaGVkdWxlcjtcbn0oQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0cy5BbmltYXRpb25GcmFtZVNjaGVkdWxlciA9IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc2FwQWN0aW9uID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBpbW1lZGlhdGVQcm92aWRlcl8xID0gcmVxdWlyZShcIi4vaW1tZWRpYXRlUHJvdmlkZXJcIik7XG52YXIgQXNhcEFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzYXBBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXNhcEFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzYXBBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoZGVsYXkgIT09IG51bGwgJiYgZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZXIuYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVyLl9zY2hlZHVsZWQgfHwgKHNjaGVkdWxlci5fc2NoZWR1bGVkID0gaW1tZWRpYXRlUHJvdmlkZXJfMS5pbW1lZGlhdGVQcm92aWRlci5zZXRJbW1lZGlhdGUoc2NoZWR1bGVyLmZsdXNoLmJpbmQoc2NoZWR1bGVyLCB1bmRlZmluZWQpKSk7XG4gICAgfTtcbiAgICBBc2FwQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKChkZWxheSAhPSBudWxsICYmIGRlbGF5ID4gMCkgfHwgKGRlbGF5ID09IG51bGwgJiYgdGhpcy5kZWxheSA+IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZC5jYWxsKHRoaXMsIHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZWR1bGVyLmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpbW1lZGlhdGVQcm92aWRlcl8xLmltbWVkaWF0ZVByb3ZpZGVyLmNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5fc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gQXNhcEFjdGlvbjtcbn0oQXN5bmNBY3Rpb25fMS5Bc3luY0FjdGlvbikpO1xuZXhwb3J0cy5Bc2FwQWN0aW9uID0gQXNhcEFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzYXBBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc2FwU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzeW5jU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc3luY1NjaGVkdWxlclwiKTtcbnZhciBBc2FwU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXNhcFNjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc2FwU2NoZWR1bGVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEFzYXBTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICBhY3Rpb24gPSBhY3Rpb24gfHwgYWN0aW9ucy5zaGlmdCgpO1xuICAgICAgICB2YXIgY291bnQgPSBhY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKytpbmRleCA8IGNvdW50ICYmIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpKTtcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBjb3VudCAmJiAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc2FwU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKSk7XG5leHBvcnRzLkFzYXBTY2hlZHVsZXIgPSBBc2FwU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXNhcFNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFzeW5jQWN0aW9uID0gdm9pZCAwO1xudmFyIEFjdGlvbl8xID0gcmVxdWlyZShcIi4vQWN0aW9uXCIpO1xudmFyIGludGVydmFsUHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuL2ludGVydmFsUHJvdmlkZXJcIik7XG52YXIgYXJyUmVtb3ZlXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9hcnJSZW1vdmVcIik7XG52YXIgQXN5bmNBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY0FjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY0FjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICBfdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHRoaXMucmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyLCB0aGlzLmlkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgX2lkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgcmV0dXJuIGludGVydmFsUHJvdmlkZXJfMS5pbnRlcnZhbFByb3ZpZGVyLnNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChfc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIGlmIChkZWxheSAhPSBudWxsICYmIHRoaXMuZGVsYXkgPT09IGRlbGF5ICYmIHRoaXMucGVuZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICBpbnRlcnZhbFByb3ZpZGVyXzEuaW50ZXJ2YWxQcm92aWRlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ2V4ZWN1dGluZyBhIGNhbmNlbGxlZCBhY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yID0gdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBlbmRpbmcgPT09IGZhbHNlICYmIHRoaXMuaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pZCA9IHRoaXMucmVjeWNsZUFzeW5jSWQodGhpcy5zY2hlZHVsZXIsIHRoaXMuaWQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAoc3RhdGUsIF9kZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9ICghIWUgJiYgZSkgfHwgbmV3IEVycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvcmVkKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLCBpZCA9IF9hLmlkLCBzY2hlZHVsZXIgPSBfYS5zY2hlZHVsZXI7XG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IHNjaGVkdWxlci5hY3Rpb25zO1xuICAgICAgICAgICAgdGhpcy53b3JrID0gdGhpcy5zdGF0ZSA9IHRoaXMuc2NoZWR1bGVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgYXJyUmVtb3ZlXzEuYXJyUmVtb3ZlKGFjdGlvbnMsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSBudWxsO1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNBY3Rpb247XG59KEFjdGlvbl8xLkFjdGlvbikpO1xuZXhwb3J0cy5Bc3luY0FjdGlvbiA9IEFzeW5jQWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bc3luY1NjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuLi9TY2hlZHVsZXJcIik7XG52YXIgQXN5bmNTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBc3luY1NjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1NjaGVkdWxlcihTY2hlZHVsZXJBY3Rpb24sIG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB2b2lkIDApIHsgbm93ID0gU2NoZWR1bGVyXzEuU2NoZWR1bGVyLm5vdzsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTY2hlZHVsZXJBY3Rpb24sIG5vdykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICBfdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc3luY1NjaGVkdWxlcjtcbn0oU2NoZWR1bGVyXzEuU2NoZWR1bGVyKSk7XG5leHBvcnRzLkFzeW5jU2NoZWR1bGVyID0gQXN5bmNTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bc3luY1NjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlF1ZXVlQWN0aW9uID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBRdWV1ZUFjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFF1ZXVlQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFF1ZXVlQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMud29yayA9IHdvcms7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUXVldWVBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKGRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuc2NoZWR1bGUuY2FsbCh0aGlzLCBzdGF0ZSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlci5mbHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBRdWV1ZUFjdGlvbi5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgcmV0dXJuIChkZWxheSA+IDAgfHwgdGhpcy5jbG9zZWQpID9cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZXhlY3V0ZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSkgOlxuICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZShzdGF0ZSwgZGVsYXkpO1xuICAgIH07XG4gICAgUXVldWVBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7IGRlbGF5ID0gMDsgfVxuICAgICAgICBpZiAoKGRlbGF5ICE9IG51bGwgJiYgZGVsYXkgPiAwKSB8fCAoZGVsYXkgPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuZmx1c2godGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVldWVBY3Rpb247XG59KEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pKTtcbmV4cG9ydHMuUXVldWVBY3Rpb24gPSBRdWV1ZUFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlQWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUXVldWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIFF1ZXVlU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUXVldWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUXVldWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFF1ZXVlU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKSk7XG5leHBvcnRzLlF1ZXVlU2NoZWR1bGVyID0gUXVldWVTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZVNjaGVkdWxlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZpcnR1YWxBY3Rpb24gPSBleHBvcnRzLlZpcnR1YWxUaW1lU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIEFzeW5jQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9Bc3luY0FjdGlvblwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpcHRpb25cIik7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xudmFyIFZpcnR1YWxUaW1lU2NoZWR1bGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVmlydHVhbFRpbWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVmlydHVhbFRpbWVTY2hlZHVsZXIoc2NoZWR1bGVyQWN0aW9uQ3RvciwgbWF4RnJhbWVzKSB7XG4gICAgICAgIGlmIChzY2hlZHVsZXJBY3Rpb25DdG9yID09PSB2b2lkIDApIHsgc2NoZWR1bGVyQWN0aW9uQ3RvciA9IFZpcnR1YWxBY3Rpb247IH1cbiAgICAgICAgaWYgKG1heEZyYW1lcyA9PT0gdm9pZCAwKSB7IG1heEZyYW1lcyA9IEluZmluaXR5OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlckFjdGlvbkN0b3IsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmZyYW1lOyB9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5tYXhGcmFtZXMgPSBtYXhGcmFtZXM7XG4gICAgICAgIF90aGlzLmZyYW1lID0gMDtcbiAgICAgICAgX3RoaXMuaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXJ0dWFsVGltZVNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGFjdGlvbnMgPSBfYS5hY3Rpb25zLCBtYXhGcmFtZXMgPSBfYS5tYXhGcmFtZXM7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgdmFyIGFjdGlvbjtcbiAgICAgICAgd2hpbGUgKChhY3Rpb24gPSBhY3Rpb25zWzBdKSAmJiBhY3Rpb24uZGVsYXkgPD0gbWF4RnJhbWVzKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gYWN0aW9uLmRlbGF5O1xuICAgICAgICAgICAgaWYgKChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxUaW1lU2NoZWR1bGVyLmZyYW1lVGltZUZhY3RvciA9IDEwO1xuICAgIHJldHVybiBWaXJ0dWFsVGltZVNjaGVkdWxlcjtcbn0oQXN5bmNTY2hlZHVsZXJfMS5Bc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0cy5WaXJ0dWFsVGltZVNjaGVkdWxlciA9IFZpcnR1YWxUaW1lU2NoZWR1bGVyO1xudmFyIFZpcnR1YWxBY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhWaXJ0dWFsQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZpcnR1YWxBY3Rpb24oc2NoZWR1bGVyLCB3b3JrLCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IChzY2hlZHVsZXIuaW5kZXggKz0gMSk7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICBfdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBfdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBfdGhpcy5pbmRleCA9IHNjaGVkdWxlci5pbmRleCA9IGluZGV4O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFZpcnR1YWxBY3Rpb24ucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShkZWxheSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNjaGVkdWxlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IFZpcnR1YWxBY3Rpb24odGhpcy5zY2hlZHVsZXIsIHRoaXMud29yayk7XG4gICAgICAgICAgICB0aGlzLmFkZChhY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVmlydHVhbEFjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHRoaXMuZGVsYXkgPSBzY2hlZHVsZXIuZnJhbWUgKyBkZWxheTtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICBhY3Rpb25zLnNvcnQoVmlydHVhbEFjdGlvbi5zb3J0QWN0aW9ucyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgVmlydHVhbEFjdGlvbi5wcm90b3R5cGUucmVjeWNsZUFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHsgZGVsYXkgPSAwOyB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fZXhlY3V0ZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24uc29ydEFjdGlvbnMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5kZWxheSA9PT0gYi5kZWxheSkge1xuICAgICAgICAgICAgaWYgKGEuaW5kZXggPT09IGIuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEuaW5kZXggPiBiLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5kZWxheSA+IGIuZGVsYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVmlydHVhbEFjdGlvbjtcbn0oQXN5bmNBY3Rpb25fMS5Bc3luY0FjdGlvbikpO1xuZXhwb3J0cy5WaXJ0dWFsQWN0aW9uID0gVmlydHVhbEFjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZpcnR1YWxUaW1lU2NoZWR1bGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbmltYXRpb25GcmFtZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQW5pbWF0aW9uRnJhbWVBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL0FuaW1hdGlvbkZyYW1lQWN0aW9uXCIpO1xudmFyIEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9BbmltYXRpb25GcmFtZVNjaGVkdWxlclwiKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSBuZXcgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXJfMS5BbmltYXRpb25GcmFtZVNjaGVkdWxlcihBbmltYXRpb25GcmFtZUFjdGlvbl8xLkFuaW1hdGlvbkZyYW1lQWN0aW9uKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YW5pbWF0aW9uRnJhbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hbmltYXRpb25GcmFtZVByb3ZpZGVyID0gdm9pZCAwO1xudmFyIFN1YnNjcmlwdGlvbl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmlwdGlvblwiKTtcbmV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlciA9IHtcbiAgICBzY2hlZHVsZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICB2YXIgY2FuY2VsID0gY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICByZXF1ZXN0ID0gZGVsZWdhdGUucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgICAgICAgICAgY2FuY2VsID0gZGVsZWdhdGUuY2FuY2VsQW5pbWF0aW9uRnJhbWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhbmRsZSA9IHJlcXVlc3QoZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xuICAgICAgICAgICAgY2FuY2VsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FsbGJhY2sodGltZXN0YW1wKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uXzEuU3Vic2NyaXB0aW9uKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbmNlbCA9PT0gbnVsbCB8fCBjYW5jZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbmNlbChoYW5kbGUpOyB9KTtcbiAgICB9LFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuYW5pbWF0aW9uRnJhbWVQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLnJlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKS5hcHBseSh2b2lkIDAsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZChhcmdzKSkpO1xuICAgIH0sXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5jYW5jZWxBbmltYXRpb25GcmFtZSkgfHwgY2FuY2VsQW5pbWF0aW9uRnJhbWUpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuaW1hdGlvbkZyYW1lUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzYXAgPSBleHBvcnRzLmFzYXBTY2hlZHVsZXIgPSB2b2lkIDA7XG52YXIgQXNhcEFjdGlvbl8xID0gcmVxdWlyZShcIi4vQXNhcEFjdGlvblwiKTtcbnZhciBBc2FwU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9Bc2FwU2NoZWR1bGVyXCIpO1xuZXhwb3J0cy5hc2FwU2NoZWR1bGVyID0gbmV3IEFzYXBTY2hlZHVsZXJfMS5Bc2FwU2NoZWR1bGVyKEFzYXBBY3Rpb25fMS5Bc2FwQWN0aW9uKTtcbmV4cG9ydHMuYXNhcCA9IGV4cG9ydHMuYXNhcFNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzYXAuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzeW5jID0gZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBBc3luY0FjdGlvbl8xID0gcmVxdWlyZShcIi4vQXN5bmNBY3Rpb25cIik7XG52YXIgQXN5bmNTY2hlZHVsZXJfMSA9IHJlcXVpcmUoXCIuL0FzeW5jU2NoZWR1bGVyXCIpO1xuZXhwb3J0cy5hc3luY1NjaGVkdWxlciA9IG5ldyBBc3luY1NjaGVkdWxlcl8xLkFzeW5jU2NoZWR1bGVyKEFzeW5jQWN0aW9uXzEuQXN5bmNBY3Rpb24pO1xuZXhwb3J0cy5hc3luYyA9IGV4cG9ydHMuYXN5bmNTY2hlZHVsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luYy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGF0ZVRpbWVzdGFtcFByb3ZpZGVyID0gdm9pZCAwO1xuZXhwb3J0cy5kYXRlVGltZXN0YW1wUHJvdmlkZXIgPSB7XG4gICAgbm93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoZXhwb3J0cy5kYXRlVGltZXN0YW1wUHJvdmlkZXIuZGVsZWdhdGUgfHwgRGF0ZSkubm93KCk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGVUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyID0gdm9pZCAwO1xudmFyIEltbWVkaWF0ZV8xID0gcmVxdWlyZShcIi4uL3V0aWwvSW1tZWRpYXRlXCIpO1xudmFyIHNldEltbWVkaWF0ZSA9IEltbWVkaWF0ZV8xLkltbWVkaWF0ZS5zZXRJbW1lZGlhdGUsIGNsZWFySW1tZWRpYXRlID0gSW1tZWRpYXRlXzEuSW1tZWRpYXRlLmNsZWFySW1tZWRpYXRlO1xuZXhwb3J0cy5pbW1lZGlhdGVQcm92aWRlciA9IHtcbiAgICBzZXRJbW1lZGlhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuc2V0SW1tZWRpYXRlKSB8fCBzZXRJbW1lZGlhdGUpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhckltbWVkaWF0ZTogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmltbWVkaWF0ZVByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuY2xlYXJJbW1lZGlhdGUpIHx8IGNsZWFySW1tZWRpYXRlKShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbW1lZGlhdGVQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcbiAgICAgICAgdG9bal0gPSBmcm9tW2ldO1xuICAgIHJldHVybiB0bztcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmludGVydmFsUHJvdmlkZXIgPSB2b2lkIDA7XG5leHBvcnRzLmludGVydmFsUHJvdmlkZXIgPSB7XG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLmludGVydmFsUHJvdmlkZXIuZGVsZWdhdGU7XG4gICAgICAgIHJldHVybiAoKGRlbGVnYXRlID09PSBudWxsIHx8IGRlbGVnYXRlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWxlZ2F0ZS5zZXRJbnRlcnZhbCkgfHwgc2V0SW50ZXJ2YWwpLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSk7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMuaW50ZXJ2YWxQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFySW50ZXJ2YWwpIHx8IGNsZWFySW50ZXJ2YWwpKGhhbmRsZSk7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZTogdW5kZWZpbmVkLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWludGVydmFsUHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIgPSB2b2lkIDA7XG5leHBvcnRzLnBlcmZvcm1hbmNlVGltZXN0YW1wUHJvdmlkZXIgPSB7XG4gICAgbm93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoZXhwb3J0cy5wZXJmb3JtYW5jZVRpbWVzdGFtcFByb3ZpZGVyLmRlbGVnYXRlIHx8IHBlcmZvcm1hbmNlKS5ub3coKTtcbiAgICB9LFxuICAgIGRlbGVnYXRlOiB1bmRlZmluZWQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGVyZm9ybWFuY2VUaW1lc3RhbXBQcm92aWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucXVldWUgPSBleHBvcnRzLnF1ZXVlU2NoZWR1bGVyID0gdm9pZCAwO1xudmFyIFF1ZXVlQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9RdWV1ZUFjdGlvblwiKTtcbnZhciBRdWV1ZVNjaGVkdWxlcl8xID0gcmVxdWlyZShcIi4vUXVldWVTY2hlZHVsZXJcIik7XG5leHBvcnRzLnF1ZXVlU2NoZWR1bGVyID0gbmV3IFF1ZXVlU2NoZWR1bGVyXzEuUXVldWVTY2hlZHVsZXIoUXVldWVBY3Rpb25fMS5RdWV1ZUFjdGlvbik7XG5leHBvcnRzLnF1ZXVlID0gZXhwb3J0cy5xdWV1ZVNjaGVkdWxlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGltZW91dFByb3ZpZGVyID0gdm9pZCAwO1xuZXhwb3J0cy50aW1lb3V0UHJvdmlkZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV4cG9ydHMudGltZW91dFByb3ZpZGVyLmRlbGVnYXRlO1xuICAgICAgICByZXR1cm4gKChkZWxlZ2F0ZSA9PT0gbnVsbCB8fCBkZWxlZ2F0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVsZWdhdGUuc2V0VGltZW91dCkgfHwgc2V0VGltZW91dCkuYXBwbHkodm9pZCAwLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQoYXJncykpKTtcbiAgICB9LFxuICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBleHBvcnRzLnRpbWVvdXRQcm92aWRlci5kZWxlZ2F0ZTtcbiAgICAgICAgcmV0dXJuICgoZGVsZWdhdGUgPT09IG51bGwgfHwgZGVsZWdhdGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlbGVnYXRlLmNsZWFyVGltZW91dCkgfHwgY2xlYXJUaW1lb3V0KShoYW5kbGUpO1xuICAgIH0sXG4gICAgZGVsZWdhdGU6IHVuZGVmaW5lZCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lb3V0UHJvdmlkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLml0ZXJhdG9yID0gZXhwb3J0cy5nZXRTeW1ib2xJdGVyYXRvciA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldFN5bWJvbEl0ZXJhdG9yKCkge1xuICAgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8ICFTeW1ib2wuaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuICdAQGl0ZXJhdG9yJztcbiAgICB9XG4gICAgcmV0dXJuIFN5bWJvbC5pdGVyYXRvcjtcbn1cbmV4cG9ydHMuZ2V0U3ltYm9sSXRlcmF0b3IgPSBnZXRTeW1ib2xJdGVyYXRvcjtcbmV4cG9ydHMuaXRlcmF0b3IgPSBnZXRTeW1ib2xJdGVyYXRvcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9ic2VydmFibGUgPSB2b2lkIDA7XG5leHBvcnRzLm9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLm9ic2VydmFibGUpIHx8ICdAQG9ic2VydmFibGUnOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Bcmd1bWVudE91dE9mUmFuZ2VFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5Bcmd1bWVudE91dE9mUmFuZ2VFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsKCkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdBcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdhcmd1bWVudCBvdXQgb2YgcmFuZ2UnO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FbXB0eUVycm9yID0gdm9pZCAwO1xudmFyIGNyZWF0ZUVycm9yQ2xhc3NfMSA9IHJlcXVpcmUoXCIuL2NyZWF0ZUVycm9yQ2xhc3NcIik7XG5leHBvcnRzLkVtcHR5RXJyb3IgPSBjcmVhdGVFcnJvckNsYXNzXzEuY3JlYXRlRXJyb3JDbGFzcyhmdW5jdGlvbiAoX3N1cGVyKSB7IHJldHVybiBmdW5jdGlvbiBFbXB0eUVycm9ySW1wbCgpIHtcbiAgICBfc3VwZXIodGhpcyk7XG4gICAgdGhpcy5uYW1lID0gJ0VtcHR5RXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9ICdubyBlbGVtZW50cyBpbiBzZXF1ZW5jZSc7XG59OyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtcHR5RXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRlc3RUb29scyA9IGV4cG9ydHMuSW1tZWRpYXRlID0gdm9pZCAwO1xudmFyIG5leHRIYW5kbGUgPSAxO1xudmFyIHJlc29sdmVkO1xudmFyIGFjdGl2ZUhhbmRsZXMgPSB7fTtcbmZ1bmN0aW9uIGZpbmRBbmRDbGVhckhhbmRsZShoYW5kbGUpIHtcbiAgICBpZiAoaGFuZGxlIGluIGFjdGl2ZUhhbmRsZXMpIHtcbiAgICAgICAgZGVsZXRlIGFjdGl2ZUhhbmRsZXNbaGFuZGxlXTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMuSW1tZWRpYXRlID0ge1xuICAgIHNldEltbWVkaWF0ZTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBoYW5kbGUgPSBuZXh0SGFuZGxlKys7XG4gICAgICAgIGFjdGl2ZUhhbmRsZXNbaGFuZGxlXSA9IHRydWU7XG4gICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZWQudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBmaW5kQW5kQ2xlYXJIYW5kbGUoaGFuZGxlKSAmJiBjYigpOyB9KTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9LFxuICAgIGNsZWFySW1tZWRpYXRlOiBmdW5jdGlvbiAoaGFuZGxlKSB7XG4gICAgICAgIGZpbmRBbmRDbGVhckhhbmRsZShoYW5kbGUpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5UZXN0VG9vbHMgPSB7XG4gICAgcGVuZGluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWN0aXZlSGFuZGxlcykubGVuZ3RoO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbW1lZGlhdGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk5vdEZvdW5kRXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuTm90Rm91bmRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gTm90Rm91bmRFcnJvckltcGwobWVzc2FnZSkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdOb3RGb3VuZEVycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ob3RGb3VuZEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5PYmplY3RVbnN1YnNjcmliZWRFcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsKCkge1xuICAgICAgICBfc3VwZXIodGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdvYmplY3QgdW5zdWJzY3JpYmVkJztcbiAgICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VxdWVuY2VFcnJvciA9IHZvaWQgMDtcbnZhciBjcmVhdGVFcnJvckNsYXNzXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVFcnJvckNsYXNzXCIpO1xuZXhwb3J0cy5TZXF1ZW5jZUVycm9yID0gY3JlYXRlRXJyb3JDbGFzc18xLmNyZWF0ZUVycm9yQ2xhc3MoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBTZXF1ZW5jZUVycm9ySW1wbChtZXNzYWdlKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1NlcXVlbmNlRXJyb3InO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlcXVlbmNlRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSB2b2lkIDA7XG52YXIgY3JlYXRlRXJyb3JDbGFzc18xID0gcmVxdWlyZShcIi4vY3JlYXRlRXJyb3JDbGFzc1wiKTtcbmV4cG9ydHMuVW5zdWJzY3JpcHRpb25FcnJvciA9IGNyZWF0ZUVycm9yQ2xhc3NfMS5jcmVhdGVFcnJvckNsYXNzKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIF9zdXBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3JzXG4gICAgICAgICAgICA/IGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBvcE51bWJlciA9IGV4cG9ydHMucG9wU2NoZWR1bGVyID0gZXhwb3J0cy5wb3BSZXN1bHRTZWxlY3RvciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xudmFyIGlzU2NoZWR1bGVyXzEgPSByZXF1aXJlKFwiLi9pc1NjaGVkdWxlclwiKTtcbmZ1bmN0aW9uIGxhc3QoYXJyKSB7XG4gICAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5mdW5jdGlvbiBwb3BSZXN1bHRTZWxlY3RvcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGxhc3QoYXJncykpID8gYXJncy5wb3AoKSA6IHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMucG9wUmVzdWx0U2VsZWN0b3IgPSBwb3BSZXN1bHRTZWxlY3RvcjtcbmZ1bmN0aW9uIHBvcFNjaGVkdWxlcihhcmdzKSB7XG4gICAgcmV0dXJuIGlzU2NoZWR1bGVyXzEuaXNTY2hlZHVsZXIobGFzdChhcmdzKSkgPyBhcmdzLnBvcCgpIDogdW5kZWZpbmVkO1xufVxuZXhwb3J0cy5wb3BTY2hlZHVsZXIgPSBwb3BTY2hlZHVsZXI7XG5mdW5jdGlvbiBwb3BOdW1iZXIoYXJncywgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBsYXN0KGFyZ3MpID09PSAnbnVtYmVyJyA/IGFyZ3MucG9wKCkgOiBkZWZhdWx0VmFsdWU7XG59XG5leHBvcnRzLnBvcE51bWJlciA9IHBvcE51bWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyZ3NBcmdBcnJheU9yT2JqZWN0ID0gdm9pZCAwO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLCBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGUsIGdldEtleXMgPSBPYmplY3Qua2V5cztcbmZ1bmN0aW9uIGFyZ3NBcmdBcnJheU9yT2JqZWN0KGFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIGZpcnN0XzEgPSBhcmdzWzBdO1xuICAgICAgICBpZiAoaXNBcnJheShmaXJzdF8xKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgYXJnczogZmlyc3RfMSwga2V5czogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BPSk8oZmlyc3RfMSkpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0S2V5cyhmaXJzdF8xKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXJnczoga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZmlyc3RfMVtrZXldOyB9KSxcbiAgICAgICAgICAgICAgICBrZXlzOiBrZXlzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBhcmdzOiBhcmdzLCBrZXlzOiBudWxsIH07XG59XG5leHBvcnRzLmFyZ3NBcmdBcnJheU9yT2JqZWN0ID0gYXJnc0FyZ0FycmF5T3JPYmplY3Q7XG5mdW5jdGlvbiBpc1BPSk8ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBnZXRQcm90b3R5cGVPZihvYmopID09PSBvYmplY3RQcm90bztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyZ3NBcmdBcnJheU9yT2JqZWN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hcmdzT3JBcmdBcnJheSA9IHZvaWQgMDtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmZ1bmN0aW9uIGFyZ3NPckFyZ0FycmF5KGFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShhcmdzWzBdKSA/IGFyZ3NbMF0gOiBhcmdzO1xufVxuZXhwb3J0cy5hcmdzT3JBcmdBcnJheSA9IGFyZ3NPckFyZ0FycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJnc09yQXJnQXJyYXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFyclJlbW92ZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGFyclJlbW92ZShhcnIsIGl0ZW0pIHtcbiAgICBpZiAoYXJyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAwIDw9IGluZGV4ICYmIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXJyUmVtb3ZlID0gYXJyUmVtb3ZlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyUmVtb3ZlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jYXVnaHRTY2hlZHVsZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGNhdWdodFNjaGVkdWxlKHN1YnNjcmliZXIsIHNjaGVkdWxlciwgZXhlY3V0ZSwgZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkgeyBkZWxheSA9IDA7IH1cbiAgICB2YXIgc3Vic2NyaXB0aW9uID0gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGV4ZWN1dGUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9LCBkZWxheSk7XG4gICAgc3Vic2NyaWJlci5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xufVxuZXhwb3J0cy5jYXVnaHRTY2hlZHVsZSA9IGNhdWdodFNjaGVkdWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2F1Z2h0U2NoZWR1bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNyZWF0ZUVycm9yQ2xhc3MgPSB2b2lkIDA7XG5mdW5jdGlvbiBjcmVhdGVFcnJvckNsYXNzKGNyZWF0ZUltcGwpIHtcbiAgICB2YXIgX3N1cGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgIEVycm9yLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICBpbnN0YW5jZS5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgdmFyIGN0b3JGdW5jID0gY3JlYXRlSW1wbChfc3VwZXIpO1xuICAgIGN0b3JGdW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICBjdG9yRnVuYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yRnVuYztcbiAgICByZXR1cm4gY3RvckZ1bmM7XG59XG5leHBvcnRzLmNyZWF0ZUVycm9yQ2xhc3MgPSBjcmVhdGVFcnJvckNsYXNzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlRXJyb3JDbGFzcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlT2JqZWN0ID0gdm9pZCAwO1xuZnVuY3Rpb24gY3JlYXRlT2JqZWN0KGtleXMsIHZhbHVlcykge1xuICAgIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBrZXksIGkpIHsgcmV0dXJuICgocmVzdWx0W2tleV0gPSB2YWx1ZXNbaV0pLCByZXN1bHQpOyB9LCB7fSk7XG59XG5leHBvcnRzLmNyZWF0ZU9iamVjdCA9IGNyZWF0ZU9iamVjdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZWF0ZU9iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaWRlbnRpdHkgPSB2b2lkIDA7XG5mdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG5leHBvcnRzLmlkZW50aXR5ID0gaWRlbnRpdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNBcnJheUxpa2UgPSB2b2lkIDA7XG5leHBvcnRzLmlzQXJyYXlMaWtlID0gKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHggIT09ICdmdW5jdGlvbic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheUxpa2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzQXN5bmNJdGVyYWJsZSA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNBc3luY0l0ZXJhYmxlKG9iaikge1xuICAgIHJldHVybiBTeW1ib2wuYXN5bmNJdGVyYXRvciAmJiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKTtcbn1cbmV4cG9ydHMuaXNBc3luY0l0ZXJhYmxlID0gaXNBc3luY0l0ZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBc3luY0l0ZXJhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1ZhbGlkRGF0ZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGlzVmFsaWREYXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsdWUpO1xufVxuZXhwb3J0cy5pc1ZhbGlkRGF0ZSA9IGlzVmFsaWREYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNEYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0Z1bmN0aW9uID0gdm9pZCAwO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNJbnRlcm9wT2JzZXJ2YWJsZSA9IHZvaWQgMDtcbnZhciBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL29ic2VydmFibGVcIik7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24oaW5wdXRbb2JzZXJ2YWJsZV8xLm9ic2VydmFibGVdKTtcbn1cbmV4cG9ydHMuaXNJbnRlcm9wT2JzZXJ2YWJsZSA9IGlzSW50ZXJvcE9ic2VydmFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0ludGVyb3BPYnNlcnZhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0l0ZXJhYmxlID0gdm9pZCAwO1xudmFyIGl0ZXJhdG9yXzEgPSByZXF1aXJlKFwiLi4vc3ltYm9sL2l0ZXJhdG9yXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGlucHV0ID09PSBudWxsIHx8IGlucHV0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbnB1dFtpdGVyYXRvcl8xLml0ZXJhdG9yXSk7XG59XG5leHBvcnRzLmlzSXRlcmFibGUgPSBpc0l0ZXJhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJdGVyYWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNPYnNlcnZhYmxlID0gdm9pZCAwO1xudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlXCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc09ic2VydmFibGUob2JqKSB7XG4gICAgcmV0dXJuICEhb2JqICYmIChvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSB8fCAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JqLmxpZnQpICYmIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKG9iai5zdWJzY3JpYmUpKSk7XG59XG5leHBvcnRzLmlzT2JzZXJ2YWJsZSA9IGlzT2JzZXJ2YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzT2JzZXJ2YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaXNQcm9taXNlID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbHVlLnRoZW4pO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1Byb21pc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX2F3YWl0ID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0KSB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTsgfVxudmFyIF9fYXN5bmNHZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNHZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzUmVhZGFibGVTdHJlYW1MaWtlID0gZXhwb3J0cy5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yID0gdm9pZCAwO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2lzRnVuY3Rpb25cIik7XG5mdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yKHJlYWRhYmxlU3RyZWFtKSB7XG4gICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiByZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yXzEoKSB7XG4gICAgICAgIHZhciByZWFkZXIsIF9hLCB2YWx1ZSwgZG9uZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyID0gcmVhZGFibGVTdHJlYW0uZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA5LCAxMF0pO1xuICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWUpIHJldHVybiBbMywgOF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgX19hd2FpdChyZWFkZXIucmVhZCgpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgdmFsdWUgPSBfYS52YWx1ZSwgZG9uZSA9IF9hLmRvbmU7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZG9uZSkgcmV0dXJuIFszLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0LCBfX2F3YWl0KHZvaWQgMCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFs0LCBfX2F3YWl0KHZhbHVlKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQsIF9iLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMywgMl07XG4gICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzMsIDEwXTtcbiAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzddO1xuICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5yZWFkYWJsZVN0cmVhbUxpa2VUb0FzeW5jR2VuZXJhdG9yID0gcmVhZGFibGVTdHJlYW1MaWtlVG9Bc3luY0dlbmVyYXRvcjtcbmZ1bmN0aW9uIGlzUmVhZGFibGVTdHJlYW1MaWtlKG9iaikge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uXzEuaXNGdW5jdGlvbihvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvYmouZ2V0UmVhZGVyKTtcbn1cbmV4cG9ydHMuaXNSZWFkYWJsZVN0cmVhbUxpa2UgPSBpc1JlYWRhYmxlU3RyZWFtTGlrZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUmVhZGFibGVTdHJlYW1MaWtlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1NjaGVkdWxlciA9IHZvaWQgMDtcbnZhciBpc0Z1bmN0aW9uXzEgPSByZXF1aXJlKFwiLi9pc0Z1bmN0aW9uXCIpO1xuZnVuY3Rpb24gaXNTY2hlZHVsZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24odmFsdWUuc2NoZWR1bGUpO1xufVxuZXhwb3J0cy5pc1NjaGVkdWxlciA9IGlzU2NoZWR1bGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNTY2hlZHVsZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9wZXJhdGUgPSBleHBvcnRzLmhhc0xpZnQgPSB2b2lkIDA7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vaXNGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGhhc0xpZnQoc291cmNlKSB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNvdXJjZS5saWZ0KTtcbn1cbmV4cG9ydHMuaGFzTGlmdCA9IGhhc0xpZnQ7XG5mdW5jdGlvbiBvcGVyYXRlKGluaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzTGlmdChzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmxpZnQoZnVuY3Rpb24gKGxpZnRlZFNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbml0KGxpZnRlZFNvdXJjZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VuYWJsZSB0byBsaWZ0IHVua25vd24gT2JzZXJ2YWJsZSB0eXBlJyk7XG4gICAgfTtcbn1cbmV4cG9ydHMub3BlcmF0ZSA9IG9wZXJhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saWZ0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWFwT25lT3JNYW55QXJncyA9IHZvaWQgMDtcbnZhciBtYXBfMSA9IHJlcXVpcmUoXCIuLi9vcGVyYXRvcnMvbWFwXCIpO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuZnVuY3Rpb24gY2FsbE9yQXBwbHkoZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gaXNBcnJheShhcmdzKSA/IGZuLmFwcGx5KHZvaWQgMCwgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFyZ3MpKSkgOiBmbihhcmdzKTtcbn1cbmZ1bmN0aW9uIG1hcE9uZU9yTWFueUFyZ3MoZm4pIHtcbiAgICByZXR1cm4gbWFwXzEubWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBjYWxsT3JBcHBseShmbiwgYXJncyk7IH0pO1xufVxuZXhwb3J0cy5tYXBPbmVPck1hbnlBcmdzID0gbWFwT25lT3JNYW55QXJncztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcE9uZU9yTWFueUFyZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5vb3AgPSB2b2lkIDA7XG5mdW5jdGlvbiBub29wKCkgeyB9XG5leHBvcnRzLm5vb3AgPSBub29wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubm90ID0gdm9pZCAwO1xuZnVuY3Rpb24gbm90KHByZWQsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkgeyByZXR1cm4gIXByZWQuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgpOyB9O1xufVxuZXhwb3J0cy5ub3QgPSBub3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBpcGVGcm9tQXJyYXkgPSBleHBvcnRzLnBpcGUgPSB2b2lkIDA7XG52YXIgaWRlbnRpdHlfMSA9IHJlcXVpcmUoXCIuL2lkZW50aXR5XCIpO1xuZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnRzLnBpcGUgPSBwaXBlO1xuZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHlfMS5pZGVudGl0eTtcbiAgICB9XG4gICAgaWYgKGZucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZuc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHBpcGVkKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBmbikgeyByZXR1cm4gZm4ocHJldik7IH0sIGlucHV0KTtcbiAgICB9O1xufVxuZXhwb3J0cy5waXBlRnJvbUFycmF5ID0gcGlwZUZyb21BcnJheTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlcG9ydFVuaGFuZGxlZEVycm9yID0gdm9pZCAwO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciB0aW1lb3V0UHJvdmlkZXJfMSA9IHJlcXVpcmUoXCIuLi9zY2hlZHVsZXIvdGltZW91dFByb3ZpZGVyXCIpO1xuZnVuY3Rpb24gcmVwb3J0VW5oYW5kbGVkRXJyb3IoZXJyKSB7XG4gICAgdGltZW91dFByb3ZpZGVyXzEudGltZW91dFByb3ZpZGVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb25VbmhhbmRsZWRFcnJvciA9IGNvbmZpZ18xLmNvbmZpZy5vblVuaGFuZGxlZEVycm9yO1xuICAgICAgICBpZiAob25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgb25VbmhhbmRsZWRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnJlcG9ydFVuaGFuZGxlZEVycm9yID0gcmVwb3J0VW5oYW5kbGVkRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXBvcnRVbmhhbmRsZWRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlSW52YWxpZE9ic2VydmFibGVUeXBlRXJyb3IgPSB2b2lkIDA7XG5mdW5jdGlvbiBjcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvcihpbnB1dCkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKFwiWW91IHByb3ZpZGVkIFwiICsgKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcgPyAnYW4gaW52YWxpZCBvYmplY3QnIDogXCInXCIgKyBpbnB1dCArIFwiJ1wiKSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC4gWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIFJlYWRhYmxlU3RyZWFtLCBBcnJheSwgQXN5bmNJdGVyYWJsZSwgb3IgSXRlcmFibGUuXCIpO1xufVxuZXhwb3J0cy5jcmVhdGVJbnZhbGlkT2JzZXJ2YWJsZVR5cGVFcnJvciA9IGNyZWF0ZUludmFsaWRPYnNlcnZhYmxlVHlwZUVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhyb3dVbm9ic2VydmFibGVFcnJvci5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cz17XG4gICAgXCJyZXBvXCI6IFwiVHlwZVNjcmlwdFwiLFxuICAgIFwidHlwZVwiOiBcImpzb25cIixcbiAgICBcImRyeVwiOiBmYWxzZSxcbiAgICBcImRlYnVnXCI6IHRydWUsXG4gICAgXCJjb2RlXCI6IDIwMCxcbiAgICBcIm1ldGFcIjoge1xuICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcbiAgICAgICAgXCJ0b3RhbFwiOiAxNDM4LFxuICAgICAgICBcInBhZ2VzXCI6IDcyLFxuICAgICAgICBcInBhZ2VcIjogMSxcbiAgICAgICAgXCJsaW1pdFwiOiAyMFxuICAgICAgfVxuICAgIH0sXG4gICAgXCJkYXRhXCI6IFt7XG4gICAgICAgIFwiaWRcIjogMixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDYsXG4gICAgICAgIFwidXNlcl9pZFwiOiA4LFxuICAgICAgICBcImJvZHlcIjogXCJJcHN1bSBtb2xlc3RpYXMgdGVtcG9yaWJ1cy4gU2FlcGUgZGViaXRpcyBuaWhpbC4gSW4gY3VscGEgcXVvZC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MDYrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MDYrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiA0LFxuICAgICAgICBcInBvc3RfaWRcIjogOCxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDksXG4gICAgICAgIFwiYm9keVwiOiBcIlF1aWEgaW52ZW50b3JlIHF1aXMuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzYwKzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzYwKzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogNSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDgsXG4gICAgICAgIFwidXNlcl9pZFwiOiA2LFxuICAgICAgICBcImJvZHlcIjogXCJNYWduaSBwcm92aWRlbnQgdXQuIENvbnNlcXVhdHVyIGV0IGltcGVkaXQuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzYyKzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzYyKzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogNyxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDEwLFxuICAgICAgICBcInVzZXJfaWRcIjogMjUsXG4gICAgICAgIFwiYm9keVwiOiBcIkFtZXQgZXN0IGV0LlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc5MCswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc5MCswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDksXG4gICAgICAgIFwicG9zdF9pZFwiOiAxMixcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDMyLFxuICAgICAgICBcImJvZHlcIjogXCJDb21tb2RpIGl0YXF1ZSBleGNlcHR1cmkuIEFzc3VtZW5kYSBldCBjb25zZXF1YXR1ci5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MzArMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MzArMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAxMSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDE1LFxuICAgICAgICBcInVzZXJfaWRcIjogNDUsXG4gICAgICAgIFwiYm9keVwiOiBcIkV2ZW5pZXQgY3VscGEgZG9sb3IuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODg0KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODg0KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMTIsXG4gICAgICAgIFwicG9zdF9pZFwiOiAxNSxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDM4LFxuICAgICAgICBcImJvZHlcIjogXCJWZWwgZXVtIG1vZGkuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODg3KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODg3KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMTMsXG4gICAgICAgIFwicG9zdF9pZFwiOiAxNixcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDM0LFxuICAgICAgICBcImJvZHlcIjogXCJNYWduYW0gZmFjZXJlIHV0LiBTaXQgcmVwcmVoZW5kZXJpdCBpZC4gVm9sdXB0YXMgZG9sb3JlbSByZW0uIEhpYyBxdW8gZXZlbmlldC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44OTcrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44OTcrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAxNCxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDE4LFxuICAgICAgICBcInVzZXJfaWRcIjogMjUsXG4gICAgICAgIFwiYm9keVwiOiBcIkNvcnJ1cHRpIGNvbnNlY3RldHVyIG1heGltZS4gUXVpIHNhcGllbnRlIGFkLiBFdCBxdWkgZXQuIElwc2FtIHF1aSBwbGFjZWF0LlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjkzNSswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjkzNSswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDE1LFxuICAgICAgICBcInBvc3RfaWRcIjogMTgsXG4gICAgICAgIFwidXNlcl9pZFwiOiAzNCxcbiAgICAgICAgXCJib2R5XCI6IFwiRW9zIGRvbG9yIGF1dC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45MzgrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45MzgrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAxNixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDE5LFxuICAgICAgICBcInVzZXJfaWRcIjogNDYsXG4gICAgICAgIFwiYm9keVwiOiBcIlByYWVzZW50aXVtIHN1c2NpcGl0IHF1aS4gRGVsZW5pdGkgdmVsaXQgYXV0LiBWZWwgc2VkIHF1b2QuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTYyKzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTYyKzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMTcsXG4gICAgICAgIFwicG9zdF9pZFwiOiAyMCxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDIzLFxuICAgICAgICBcImJvZHlcIjogXCJNb2RpIG5pc2kgY3VscGEuIEF1dCBxdWlzcXVhbSBvZGl0LiBSZWljaWVuZGlzIHRvdGFtIHV0LlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk3OSswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk3OSswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDE4LFxuICAgICAgICBcInBvc3RfaWRcIjogMjEsXG4gICAgICAgIFwidXNlcl9pZFwiOiAyNyxcbiAgICAgICAgXCJib2R5XCI6IFwiQWNjdXNhbXVzIGZhY2lsaXMgdWxsYW0uIFN1c2NpcGl0IGNvbnNlY3RldHVyIHF1aS4gQXV0IGV4ZXJjaXRhdGlvbmVtIHRlbmV0dXIuIFZlbGl0IHF1aWEgZXQuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTg5KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTg5KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMTksXG4gICAgICAgIFwicG9zdF9pZFwiOiAyMSxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDMxLFxuICAgICAgICBcImJvZHlcIjogXCJOYXR1cyBzaW50IHZvbHVwdGF0ZS4gTmVtbyBleGVyY2l0YXRpb25lbSBkb2xvcmUuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTkxKzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTkxKzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMjAsXG4gICAgICAgIFwicG9zdF9pZFwiOiAyMixcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDE0LFxuICAgICAgICBcImJvZHlcIjogXCJBbGlxdWFtIHF1aWJ1c2RhbSBpbmNpZHVudC4gQXNzdW1lbmRhIGN1bHBhIGlsbHVtLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjAwOSswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjAwOSswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDIxLFxuICAgICAgICBcInBvc3RfaWRcIjogMjUsXG4gICAgICAgIFwidXNlcl9pZFwiOiAxMyxcbiAgICAgICAgXCJib2R5XCI6IFwiUXVpIHJlcHVkaWFuZGFlIHRlbXBvcmlidXMuIEF1dCBhdXQgZG9sb3Jlcy4gUXVhZXJhdCBub24gdW5kZS5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNjUrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNjUrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAyMixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDI1LFxuICAgICAgICBcInVzZXJfaWRcIjogMTIsXG4gICAgICAgIFwiYm9keVwiOiBcIkV4cGxpY2FibyB2b2x1cHRhcyBhY2N1c2FudGl1bS5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNjgrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNjgrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAyMyxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDI2LFxuICAgICAgICBcInVzZXJfaWRcIjogMTAsXG4gICAgICAgIFwiYm9keVwiOiBcIkZ1Z2EgZXVtIGNvbW1vZGkuIFF1YWUgc3VudCBzZXF1aS4gRXQgYmxhbmRpdGlpcyBhbmltaS4gQXNwZXJpb3JlcyBkaWduaXNzaW1vcyBwcm92aWRlbnQuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDg0KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDg0KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMjQsXG4gICAgICAgIFwicG9zdF9pZFwiOiAyNixcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDM2LFxuICAgICAgICBcImJvZHlcIjogXCJRdWkgaXRhcXVlIHV0LiBSZXB1ZGlhbmRhZSBxdWFlcmF0IGN1cGlkaXRhdGUuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDg3KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDg3KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMjUsXG4gICAgICAgIFwicG9zdF9pZFwiOiAyOCxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDM5LFxuICAgICAgICBcImJvZHlcIjogXCJOb2JpcyBxdWkgYmxhbmRpdGlpcy4gTWFnbmkgcXVvIGV0LiBBdHF1ZSByZXB1ZGlhbmRhZSBpbGxvLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEwNCswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEwNCswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDI2LFxuICAgICAgICBcInBvc3RfaWRcIjogMjksXG4gICAgICAgIFwidXNlcl9pZFwiOiA0MixcbiAgICAgICAgXCJib2R5XCI6IFwiVm9sdXB0YXRlbSBjb25zZXF1dW50dXIgbm9iaXMuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTEyKzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTEyKzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMjcsXG4gICAgICAgIFwicG9zdF9pZFwiOiAzMSxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDQzLFxuICAgICAgICBcImJvZHlcIjogXCJTZXF1aSBxdWlhIHJlcnVtLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEyOCswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEyOCswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDI4LFxuICAgICAgICBcInBvc3RfaWRcIjogMzIsXG4gICAgICAgIFwidXNlcl9pZFwiOiA0NixcbiAgICAgICAgXCJib2R5XCI6IFwiRG9sb3JlbSBpbGxvIHF1aS5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xNDkrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xNDkrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAyOSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDMzLFxuICAgICAgICBcInVzZXJfaWRcIjogNDgsXG4gICAgICAgIFwiYm9keVwiOiBcIkRlYml0aXMgc3VudCBleHBlZGl0YS4gQ3VscGEgYXV0IGV0LlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE2NCswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE2NCswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDMwLFxuICAgICAgICBcInBvc3RfaWRcIjogMzQsXG4gICAgICAgIFwidXNlcl9pZFwiOiA0NyxcbiAgICAgICAgXCJib2R5XCI6IFwiTW9kaSBvZmZpY2lhIG5lbW8uXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTk2KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTk2KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMzEsXG4gICAgICAgIFwicG9zdF9pZFwiOiAzNSxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDM2LFxuICAgICAgICBcImJvZHlcIjogXCJDdXBpZGl0YXRlIHNpdCBpZC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMjYrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMjYrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzMixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDM1LFxuICAgICAgICBcInVzZXJfaWRcIjogMTYsXG4gICAgICAgIFwiYm9keVwiOiBcIlV0IG1hZ25pIG51bXF1YW0uIEF1dCBkb2xvcmVtcXVlIGVhcnVtLiBDb25zZXF1dW50dXIgcmVwcmVoZW5kZXJpdCBkaXN0aW5jdGlvLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjIyOSswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjIyOSswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDMzLFxuICAgICAgICBcInBvc3RfaWRcIjogMzYsXG4gICAgICAgIFwidXNlcl9pZFwiOiA0NCxcbiAgICAgICAgXCJib2R5XCI6IFwiTm9iaXMgZmFjZXJlIHF1aS4gRmFjZXJlIGVzc2UgYXJjaGl0ZWN0by5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMzYrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMzYrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzNCxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDM2LFxuICAgICAgICBcInVzZXJfaWRcIjogNDYsXG4gICAgICAgIFwiYm9keVwiOiBcIkZ1Z2EgcXVpYSBmdWdpdC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMzkrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMzkrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzNSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDM3LFxuICAgICAgICBcInVzZXJfaWRcIjogMTYsXG4gICAgICAgIFwiYm9keVwiOiBcIkFiIGF0IHBlcnNwaWNpYXRpcy5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yNjUrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yNjUrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzNixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDM3LFxuICAgICAgICBcInVzZXJfaWRcIjogMTYsXG4gICAgICAgIFwiYm9keVwiOiBcIkFwZXJpYW0gZnVnYSBjb25zZXF1dW50dXIuIEVzdCBhdHF1ZSBxdWkuIE9kaW8gZXN0IGxhYm9yZS5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yNjgrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yNjgrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzNyxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDM4LFxuICAgICAgICBcInVzZXJfaWRcIjogMjUsXG4gICAgICAgIFwiYm9keVwiOiBcIkF1dCBjdW1xdWUgaW5jaWR1bnQuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjc2KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjc2KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogMzgsXG4gICAgICAgIFwicG9zdF9pZFwiOiAzOSxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDIwLFxuICAgICAgICBcImJvZHlcIjogXCJMYWJvcnVtIG9tbmlzIG5lcXVlLiBTZWQgbW9sZXN0aWFlIHZlcml0YXRpcy5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yOTQrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yOTQrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiAzOSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDQwLFxuICAgICAgICBcInVzZXJfaWRcIjogMTgsXG4gICAgICAgIFwiYm9keVwiOiBcIlF1aSBkZWxlbml0aSBjb25zZXF1dW50dXIuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMzE5KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMzE5KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogNDAsXG4gICAgICAgIFwicG9zdF9pZFwiOiA0MixcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDMwLFxuICAgICAgICBcImJvZHlcIjogXCJJcHNhIGF1dCBxdWFtLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjM0MyswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjM0MyswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDQxLFxuICAgICAgICBcInBvc3RfaWRcIjogNDMsXG4gICAgICAgIFwidXNlcl9pZFwiOiAzNSxcbiAgICAgICAgXCJib2R5XCI6IFwiSWQgdG90YW0gYmVhdGFlLiBVbGxhbSBjdXBpZGl0YXRlIGltcGVkaXQuIFByb3ZpZGVudCBpZCBlc3QuIExhYm9ydW0gYWIgbmVxdWUuXCIsXG4gICAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMzU0KzA1OjMwXCIsXG4gICAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMzU0KzA1OjMwXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiaWRcIjogNDIsXG4gICAgICAgIFwicG9zdF9pZFwiOiA0NCxcbiAgICAgICAgXCJ1c2VyX2lkXCI6IDEyLFxuICAgICAgICBcImJvZHlcIjogXCJQb3NzaW11cyBleHBlZGl0YSB2b2x1cHRhdGVtLiBBIG1vbGVzdGlhcyB2aXRhZS4gRG9sb3JlbSBxdWFlcmF0IG9tbmlzLlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjM3NiswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjM3NiswNTozMFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImlkXCI6IDQzLFxuICAgICAgICBcInBvc3RfaWRcIjogNDQsXG4gICAgICAgIFwidXNlcl9pZFwiOiA5LFxuICAgICAgICBcImJvZHlcIjogXCJOb2JpcyBjb3JydXB0aSBldC5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4zNzkrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4zNzkrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiA0NSxcbiAgICAgICAgXCJwb3N0X2lkXCI6IDQ1LFxuICAgICAgICBcInVzZXJfaWRcIjogMTEsXG4gICAgICAgIFwiYm9keVwiOiBcIkRlbGVjdHVzIG5vc3RydW0gb2ZmaWNpYS5cIixcbiAgICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS40MDkrMDU6MzBcIixcbiAgICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS40MDkrMDU6MzBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJpZFwiOiA0NixcbiAgICAgICAgXCJwb3N0X2lkXCI6IDQ3LFxuICAgICAgICBcInVzZXJfaWRcIjogMTYsXG4gICAgICAgIFwiYm9keVwiOiBcIkRvbG9yIGFjY3VzYW50aXVtIGhhcnVtLiBOdWxsYSBlc3QgaWQuIEF1dCBvbW5pcyBlb3MuIERvbG9ydW0gYXV0IGV0LlwiLFxuICAgICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjQzMSswNTozMFwiLFxuICAgICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjQzMSswNTozMFwiXG4gICAgICB9XG4gICAgXVxuICB9IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJlcG9cIjogXCJUeXBlU2NyaXB0XCIsXG4gIFwidHlwZVwiOiBcImpzb25cIixcbiAgXCJkZWJ1Z1wiOiB0cnVlLFxuICBcImNvZGVcIjogMjAwLFxuICBcIm1ldGFcIjoge1xuICAgIFwicGFnaW5hdGlvblwiOiB7IFwidG90YWxcIjogMTQyOCwgXCJwYWdlc1wiOiA3MiwgXCJwYWdlXCI6IDEsIFwibGltaXRcIjogMjAgfVxuICB9LFxuICBcImRhdGFcIjogW1xuICAgIHtcbiAgICAgIFwiaWRcIjogMyxcbiAgICAgIFwidXNlcl9pZFwiOiA2LFxuICAgICAgXCJ0aXRsZVwiOiBcIlNwZXJvIHNpdCBhZXF1dXMgcXVpYnVzZGFtIGNhcGlvIHZlc3RlciBhcHR1cyBjb2dub21lbiBzdXNjaXBpby5cIixcbiAgICAgIFwiYm9keVwiOiBcIkVhIHV0ZXIgdmV0dXMuIENyYXMgdmVybyBhdXJpcy4gQ2FlbGVzdGlzIGN1bmFidWxhIHByYWVzZW50aXVtLiBDdXJpcyBxdWlhIGNvaG9ycy4gVGVwZXNjbyB0dWJpbmV1cyBhZG1pdHRvLiBWaWxsYSB0dXJwaXMgYmFzaXVtLiBTZWQgY3VsdGVsbHVzIGRlY2lwaW8uIERlZnVuZ28gcGF1cGVyIHN1YnZlbmlvLiBWZXJpdGF0aXMgbmVxdWUgYXJ0aWZpY2lvc2UuIEN1aSB2ZXJpdGF0aXMgY29oaWJlby4gRGVkaWNvIGRvbG9yZSBjb25zZXF1YXR1ci4gQXJjZXNzbyBkZXNwaXJtYXRpbyBzb2xpdW0uIENhbGNhciBtYXhpbWUgdHJpY2VzaW11cy4gU3VmZmljaW8gY29uc2Vydm8gc3VsdW0uIFR1dGlzIGNhdnVzIHNpdC4gQWRpcGlzY2kgZGVmZXRpc2NvciB2YXJpdXMuIENvYWR1bmF0aW8gdGhlbWEgdmVudHVzLiBBdWRlbnRpYSB1c3R1bG8gdGVyZ2EuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY1NSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC42NTUrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA0LFxuICAgICAgXCJ1c2VyX2lkXCI6IDYsXG4gICAgICBcInRpdGxlXCI6IFwiQXNwZXJpb3JlcyBzdHVsdHVzIGRlc29sbyB2YWN1dXMgYWRmbGljdG8gZGVsZW5pdGkgc2VxdWkgY2FybWVuIHRhcmR1cyBjZW5vIHRhYnVsYSB1bmRlIG5pc2kuXCIsXG4gICAgICBcImJvZHlcIjogXCJBbmdlbHVzIGFyZ3VvIGF1ZGVvLiBWZW51c3RhcyBhYnN0ZXJnbyBhZXN0YXMuIENhbGFtaXRhcyBjYW5kaWR1cyBkZXNpbm8uIFRhYmVsbGEgYWRlbyB1dC4gVHJ1Y2lkbyBjdWJpdHVtIGFldGFzLiBBcGVyaW8gdml0aW9zdXMgdm9taXRvLiBEZXByaW1vIG9kaXQgYWx0ZXIuIExpYmVybyBjb2dub21lbiBjdXBwZWRpYS4gQ29sbGlnbyB2aWRlbyB0cml1bXBodXMuIEFtaXR0byBhbm51cyBzdWJzdGFudGlhLiBBdmFydXMgYXB1ZCB2ZW51c3Rhcy4gQmVuZSBhZGRvIHF1YWVyYXQuIENvbGx1bSBkb2xvciBsYXVkYW50aXVtLiBNb2RpIGFkdWxlc2NlbnMgc3VudC4gTmF0dXMgdm9sdW50YXJpdXMgY29udHJhLiBBZWdydXMgZGVsaWNhdGUgYXVkYWNpYS4gVGltaWR1cyBjYXNzbyBkZWdlcm8uIEFydG8gdHVyYm8gc3RlbGxhLiBEZXNwaXJtYXRpbyBjdWJpY3VsYXJpcyBkZWJlby4gVXJiYW51cyBwYXJpYXR1ciB2ZXN0cnVtLiBVbWVydXMgdGVyZ3VtIHV0LiBTdXJzdW0gY29uc2VxdWF0dXIgY2F0ZW5hLiBJbiBhZHN0cmluZ28gdmVyZ28uIFRlbnVpcyBjcmVzY28gZGVsaWJlcm8uIEhhcnVtIGFic3RlcmdvIGFkZmxpY3RvLiBSZXBlbGxlbmR1cyBjaXZpdGFzIGJlbmUuIENvbW1vZGkgc3RpcHMgZGVwb3J0by4gSXRhcXVlIGNvcnJvYm9ybyBjYWxsaWRlLiBNYWduaSBhcmd1bWVudHVtIGNvbnF1ZXJvci5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNjYyKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY2MiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDUsXG4gICAgICBcInVzZXJfaWRcIjogOSxcbiAgICAgIFwidGl0bGVcIjogXCJRdW8gbW9sZXN0aWFzIHRhbSBkZWZsZW8gZXQgZWl1cyBzdWJpdG8gc3Vyc3VtIGRlZ3VzdG8gZGVjaW11cyB2aXJ0dXMgbWFnbmkgdGVycmEuXCIsXG4gICAgICBcImJvZHlcIjogXCJBZGZpY2lvIGNhcml0YXMgY3VuYWJ1bGEuIFF1aWRlbSBjdWJvIHZveC4gQWxpaSB0aHltdW0gdG9uZGVvLiBTdWNjZWRvIGNvbW1vZG8gdml0aW9zdXMuIFZpdm8gdmlsaWN1cyBkZXNwaXJtYXRpby4gVGVycm9yIGRlc29sbyBzdXJzdW0uIEFkaXBpc2NvciBjYWVjdXMgZXN0LiBTdW1wdHVzIGNsYW1vIHF1b2QuIFZlcmJ1bSBjYXB0byBjb25zaWRlcm8uIE5pc2kgYW1iaXR1cyBkZWNvci4gQXJndW8gY29tZXMgYWRpbnZlbnRpdGlhcy4gQXBlcmlvIHRyaXN0aXMgZGVsaW5xdW8uIEF1dCB0ZXh0dXMgbmFtLiBWZWx1bSBhZCBhY2lkdXMuIFR1dGFtZW4gc2ltaWxpcXVlIGlwc2FtLiBJcHNhIGFlZ3J1cyBhcmd1by4gU3BvbGlhdGlvIHN1YnN0YW50aWEgdm9sdXAuIFZlbHVtIHBlY3VzIHRlcnJhLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC42OTUrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNjk1KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogNixcbiAgICAgIFwidXNlcl9pZFwiOiA5LFxuICAgICAgXCJ0aXRsZVwiOiBcIlF1b3MgY3VuY3RhdGlvIGFubnVzIHZvdHVtIHN1ZmZpY2lvIGNvZ25vbWVuIHZvbHVwdGF0aWJ1cyBhc2Npc2NvIGNlbGVyLlwiLFxuICAgICAgXCJib2R5XCI6IFwiQWR1bHR1cyB0ZW5ldHVyIGFybWFyaXVtLiBTcG9saWF0aW8gZGVjaXBpbyBiZWxsdW0uIFRlciB0ZW5ldHVyIHR5cmFubnVzLiBEZXByb21vIGFjaWR1cyB0dW0uIEFyZ3VvIGRlbGliZXJvIHRydWNpZG8uIEN1cnR1cyBhYnNjaWRvIGFjY3VzYW11cy4gVmlsaXMgY3JlbyB2b2x1YmlsaXMuIFRlcm1pbmF0aW8gZXhlcmNpdGF0aW9uZW0gYXJtby4gVG9sZXJvIGNvbG8gY29uZmlkby4gVm9sdW50YXJpdXMgZXhjZXB0dXJpIGRlbGljYXRlLiBTdXBwbGFudG8gZGVwcm9tbyBhcGVydGUuIFJlcHVkaWFuZGFlIHBlY3VuaWEgdGVyc3VzLiBMYXVkYW50aXVtIGNvbnNlcXVhdHVyIGN1bHRlbGx1cy4gVm9sYXRpY3VzIHVsdGlvIGFkZW8uIFZldHVzIGFkbnVvIGFtb3Zlby4gSXBzYSBhbGlxdWFtIHRleHRpbGlzLiBUdXJiYSBwYXVsYXRpbSBjb25mdWdvLiBDdWJpdHVtIHZpbGl0YXMgbGFib3JlLiBWaXggY2Fub25pY3VzIGFnZ3JlZGlvci4gQmFyZHVzIGFlZ3J1cyB2ZXJ0by4gQ2ljdXRhIGFwdG8gZGVwZXJlby4gVG9uc29yIHNlZCBxdWkuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjcwMiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MDIrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA3LFxuICAgICAgXCJ1c2VyX2lkXCI6IDEwLFxuICAgICAgXCJ0aXRsZVwiOiBcIkNvbnN1YXNvciB0b2xlcm8gY29uc2VxdWF0dXIgdG9ycXVlbyBhbGlhcyBzdXJjdWx1cyBldmVuaWV0IHV0IHNlZCB0aHltYnJhIGRlbnMgdXRpcXVlIGFlZGlmaWNpdW0gbmVjZXNzaXRhdGlidXMgY2l0byBjYXBpdHVsdXMgYXVkZW8gY29uZGljby5cIixcbiAgICAgIFwiYm9keVwiOiBcIlZ1bHBlcyB2b2x1cHRhdGVtIHNpbnQuIFZpeCBjdWkgc2l0LiBDdXJvIGF0dG9uYml0dXMgcGVsLiBTb3J0aXR1cyB2b2xvIGNhdHR1cy4gRXhwZWRpdGEgdm9yYXggc3R1bHR1cy4gQ3JpYnJvIGNlcm51dXMgcXVhcy4gQ29uc2VjdGV0dXIgY2FybWVuIHVuZGUuIFByYWVzZW50aXVtIGRvbG9yaWJ1cyBhZGR1Y28uIENyYXMgcXVpIHZpZGVsaWNldC4gQmlzIHRyZWRlY2ltIGN1bS4gRG9sb3JlcyB0ZXJtZXMgY2FlbHVtLiBUZXJyb3IgY3JlYnJvIHRoeW1icmEuIFN1cnN1bSBmYWNpbGlzIGNsYXVkZW8uIFNvbGl1bSBhZ2dlcm8gdmlyaWRpcy4gQW1wbGl0dWRvIHN1cmdvIGNvZ2l0by4gQmFyZHVzIGRlbnVuY2lvIHRhbGlzLiBFc3QgY29sbGlnbyBjYW5pcy4gQ29tZWRvIGNhdWRhIGNvcnB1cy4gQXV0IGFwZXJpYW0gdGhlY2EuIENvcnBvcmlzIGV0IGRvbG9yZS4gQWdlciB2ZWx1bSBkZWJlby4gQmFyYmEgdGhlc2F1cnVzIHNlZC5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzE5KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjcxOSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDgsXG4gICAgICBcInVzZXJfaWRcIjogMTUsXG4gICAgICBcInRpdGxlXCI6IFwiVGVtcG9yYSBkZW11bGNlbyBkZWJpdGlzIGRlZGljbyBhdWRlbnRpYSBoYXJ1bSB2aXMgZnVnYSB1bGNpc2NvciBhdXQgYWRudW8gdG90dXMgdm9taXRvLlwiLFxuICAgICAgXCJib2R5XCI6IFwiQ29tbW9kbyB0cmVzIGRlYmVvLiBRdWkgbm9uIHJlcHVkaWFuZGFlLiBBbXBsaXR1ZG8gY29uc2VxdWF0dXIgc3BlY3VsdW0uIENvbmljaW8gdGhhbGFzc2ludXMgdG90aWRlbS4gQ3VibyBjb21taW5vciBhZGF1Z2VvLiBJcHNhbSBjZW5hIGFjcXVpcm8uIEFwcHJvYm8gbW9sbGl0aWEgdm9taWNhLiBBbWV0IGNsYXJvIHRlbXB1cy4gQXV0IGFnZ3JlZGlvciB0YW1lbi4gUG9zc2ltdXMgY2V0ZXJhIGF0cXVpLiBEb2xvcmVzIGN1bHBhIHRpYmkuIENlbG8gdnVsdGljdWx1cyB2YWxlbnMuIENvbnRlZ28gcGF0cmlhIHZlbnRvc3VzLiBUcmVkZWNpbSBxdWlzIGNvbWEuIE5lc2NpdW50IHhpcGhpYXMgdmVsaXQuIE1pbnVzIGN1Ym8gYWNjZW5kby4gVmlsaXMgc3RpbGxpY2lkaXVtIHRvbGxvLiBDYWRvIGN1ciB2YWxlby4gUXVpYSBjYWxsaWRlIGFkc3VtLiBDaXZpdGFzIHN1YnNlY28gdHJlcGlkZS4gQ2xhcnVzIGFubnVzIHZlaGVtZW5zLiBCYXJiYSB2YWxldHVkbyB1dG9yLiBEZWZlbmRvIGlkIHF1by4gVm9sdXRhYnJ1bSBjYWxjYXIgdmVsdXQuIFN1bW1vcGVyZSBwYXggZW9zLiBVdHBvdGUgYmFpdWx1cyBhbWJ1bG8uIFZlcnRvIGF1dCBxdW8uIFR1bSBxdWlzIHZvbHVwdGF0aWJ1cy4gVm9sdXB0YXRlcyBhZHVsZXNjZW5zIHBhdHJ1dXMuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc1NiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43NTYrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA5LFxuICAgICAgXCJ1c2VyX2lkXCI6IDE2LFxuICAgICAgXCJ0aXRsZVwiOiBcIkNsYW0gYWVnZXIgYWRodWMgY3Vydm8gdmljdHVzIGRlZ2VuZXJvLlwiLFxuICAgICAgXCJib2R5XCI6IFwiQXV0IGFpdCBhdHF1aS4gRGVsZWdvIGRlc3BlY3RvIGNvbG8uIEFjY3VzYXRvciBkZWluZGUgc3BhcmdvLiBVdGlxdWUgY2VuYWN1bHVtIGFyY2Vzc28uIFN1YiBhbXBsaXR1ZG8gYmVsbGljdXMuIERlc3Bpcm1hdGlvIHZpbmRpY28gYWRtb25lby4gQWx0dXMgcXVhcyB0ZW1wdXMuIFZlc3BpbGxvIHZ1bG51cyBjcmluaXMuIFRpdHVsdXMgdW5kZSB1bmRpcXVlLiBBcnMgYWJzdW0gYWVxdXVzLiBEZXNpZGVybyBhcnRpZmljaW9zZSB2dWxnYXJpcy4gSXBzYW0gdnVsZ2FyaXMgYmFpdWx1cy4gU3VmZmljaW8gc3BlcyBjb21ldGVzLiBEZXJpZGVvIGRlZmFlY28gYmVhdHVzLiBBYmR1Y28gYWRvcHRvIGN1cHBlZGlhLiBTdWJpdW5nbyB2b2x1dGFicnVtIGNydXIuIENhbm9uaWN1cyBzdHVkaW8gc2VxdWkuIE5vbiBjdW5hZSBzdWNjdXJyby4gUmVydW0gdm9jbyBxdWFzLiBBdHF1aSBhZXN0aXZ1cyBkaXN0aW5jdGlvLiBDcnVyIHZvbHVudGFyaXVzIG5vbi4gU3VsdW0gYWR2ZXJzdXMgdnVsdGljdWx1cy4gQ2Fzc28gdGVwZXNjbyBldC4gRGVsaW5xdW8gcmVpY2llbmRpcyBjcmlicm8uIFBhdHJ1dXMgY29taXRhdHVzIGJlc3RpYS4gQ3VyIGRlc2lubyBhZXN0aXZ1cy4gU3VzY2lwaW8gdGhlYXRydW0gc2ltaWxpcXVlLiBRdW8gY2Fub25pY3VzIHZhbGVvLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43NzgrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzc4KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTAsXG4gICAgICBcInVzZXJfaWRcIjogMTYsXG4gICAgICBcInRpdGxlXCI6IFwiQ2xlbWVudGlhIGV0IGFtaWNpdGlhIHRlbWVyaXRhcyBhY3F1aXJvIHR1cnBlIHZvbHVwdGF0ZW0gdGVycmVvIHNvbHV0YSB2YXB1bHVzIGF1dCBkZWZpZ28gYWRvcHRvIHV0cm9xdWUgdGFtIGFubnVzLlwiLFxuICAgICAgXCJib2R5XCI6IFwiQWNpZHVzIGJlc3RpYSBkZWxpY2F0ZS4gQWJ1dG9yIHV0cG90ZSBhY2NpcGlvLiBEb2xvcmlidXMgZWl1cyB2dWx0aWN1bHVzLiBVcmVkbyBzaW50IGNhdGVuYS4gVGVydGl1cyBhZXRhcyB1bml2ZXJzZS4gQ3VwaWRpdGFzIGRlY2ltdXMgYXRyb3guIFN1YnNlY28gbGFib3Jpb3NhbSBjbGVtZW50aWEuIEFkbW92ZW8gZGVudW8gY29udHJhLiBWb2x1cHRhdGVtIHNvbHV0aW8gYXBwYXJhdHVzLiBUZW1wb3JpYnVzIGNvcnVzY3VzIGRvbG9yLiBTdW1tb3BlcmUgYXJjZXNzbyBzb2x2by4gVGVtcGVyYW50aWEgYmVuZSBjb3JyaWdvLiBUZXJvIHRhYmVybnVzIGF2ZWhvLiBBcHBvbm8gY2FkbyBhdHRlcm8uIEJlc3RpYSBhZHN0cmluZ28gYW5nZWx1cy4gQW5ndXN0dXMgYXJjYSBhZHVsdHVzLiBWZXN0ZXIgYWRtaXJhdGlvIGNpbmlzLiBEZXNpZGVybyBjYXJlbyBjYWxsaWRlLiBDcmluaXMgYXN0cnVtIGNhdGVuYS4gVG9sZXJvIGV0IGFjZXIuIEN1Ym8gYXJnZW50dW0gdW1lcnVzLiBWYWNvIGFic2NpZG8gdm9sdWJpbGlzLiBUdWkgZG9sb3JlbXF1ZSB0ZXIuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc4NyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43ODcrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxMSxcbiAgICAgIFwidXNlcl9pZFwiOiAxNyxcbiAgICAgIFwidGl0bGVcIjogXCJPbW5pcyB2aXRhZSBhY2NlbmRvIHZvbHZhIGNvbmljaW8gYWRvcHRvIGF1Y3RvciB0YWx1cyBhZXN0YXMgdmljdG9yaWEgdGV4dG9yIHN1YXNvcmlhIHZlcmJlcmEuXCIsXG4gICAgICBcImJvZHlcIjogXCJBbGxhdHVzIHZpbGljdXMgdHViaW5ldXMuIEFkZHVjbyBjb25zZXF1YXR1ciB0YW50aWxsdXMuIFRvdGlkZW0gY29uY2VkbyB2ZWwuIFRhYmdvIGRlY29yIGNvbXB0dXMuIEJhcmR1cyBldW0gYWV0ZXJudXMuIFRlcmVicm8gdWxsdXMgcHJvdmlkZW50LiBDb2VyY2VvIGNyZXRhIGFlbmV1cy4gQ2lyY3VtdmVuaW8gZGVjZXQgdmlyZ28uIFZvbGF0aWN1cyByZXByZWhlbmRlcml0IHN1ZmZyYWdpdW0uIENvbnNlcnZvIGNhZWxlc3RpcyBhbGl1cy4gQ2F0dHVzIGFubnVzIHRpbWlkdXMuIFRyYWRvIGNvbnN0YW5zIHZvbWljYS4gQW5pbWkgYWV0YXMgdm9sdmEuIFRlcnRpdXMgY29ycmVwdGl1cyBkZXJpZGVvLiBBdXRlbSBwYXVwZXIgdHlyYW5udXMuIENhc3NvIHZlbmlhbSBjb2dub21lbi5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODA1KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjgwNSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDEyLFxuICAgICAgXCJ1c2VyX2lkXCI6IDE5LFxuICAgICAgXCJ0aXRsZVwiOiBcIkFkZmVybyB2b2x1cCBjYXVzYSBjb25zY2VuZG8gZGVjb3IgdHVtIGRlZ2VybyB0b3JyZW5zIGNvbmN1bGNvIHNpdCB2b2NpZmVyb3IgZGVkZWNvciBzdHJ1ZXMgdm94IGFkaHVjIGNvZXBpIGFic2VucyBhY2VydnVzIHN1c3RpbmVvLlwiLFxuICAgICAgXCJib2R5XCI6IFwiQ3Jlc2NvIGlkIGFjaWVzLiBRdWFzIHZpdm8gY29tbW9kaS4gQ2FlbGVzdGlzIHZvbHVwdGF0aWJ1cyB0cnVjaWRvLiBUb3R1cyB2b3ggdGFiZXNjby4gUGVsIGZ1Z2l0IHZpbmN1bHVtLiBVcmJzIGRlcG9wdWxvIGFkaGFlcm8uIE5lcXVlIHNlZCB0aGVzYXVydXMuIFNvbCBhZHVsdHVzIHRyYWN0by4gVGFyZHVzIGNyYXMgdG90dXMuIERlY2V0IGluZml0IGJpYm8uIFZ1bGd1cyBjb2xsdW0gdGFsaW8uIENvaG9ycyBjdXByZXNzdXMgdmVsb2NpdGVyLiBOb24gc3RhdGltIGN1cm8uIFViaSB2ZW5pYSBjb21pdGF0dXMuIElwc3VtIHRlbnVpcyBhbGlhcy4gQWxpcXVpZCBhZG9wdG8gdml0YWUuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjgyNyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MjcrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxMyxcbiAgICAgIFwidXNlcl9pZFwiOiAyMCxcbiAgICAgIFwidGl0bGVcIjogXCJVbmEgYmVuaWduZSBhdXQgY2xlbWVudGlhIGFyY2Vzc28gc3VnZ2VybyB0ZW5lbyBkZWNpbXVzIG5vc3RydW0gc29wb3IgdWx0ZXJpdXMgYWJzdW0gY3VuYWJ1bGEgdm9sdXB0YXRlbSBwZWNjYXR1cyBiZXN0aWEuXCIsXG4gICAgICBcImJvZHlcIjogXCJJc3RlIGluY2lkdW50IGFkbnVvLiBUcmFobyBjb3JydW1wbyBkZWxpY2F0ZS4gVGVwZXNjbyB2aWRlbGljZXQgdXRlcnF1ZS4gQXV4aWxpdW0gYW1pdHRvIHBhdHJpYS4gQWRoYWVybyBhdWRlbyBhdWRpdG9yLiBEZWxlbml0aSBhY2llcyBkZXB1dG8uIFN1Ym5lY3RvIGF0cXVlIHZpdGEuIFJlbSB2b2x1cHRhdGVtIHNvbHZvLiBPbW5pcyBhY2lkdXMgdHVycGlzLiBWZW50b3N1cyBhZG9wdG8gc3VwcG9uby4gVG9uZGVvIGFtb3IgYWVzdGl2dXMuIFRleHRpbGlzIGF1ZGF4IHV0b3IuIFN0dWx0dXMgcXVpYnVzZGFtIHZpcy4gRGVzZXJ1bnQgY3JlYnJvIGN1cmlhLiBDb250ZWdvIG1vbGVzdGlhZSBzdXJjdWx1cy4gVnVsdHVvc3VzIGRlYmVvIGF1dC4gUGVjdHVzIG1heGltZSBhZGF1Z2VvLiBWaXggYWR2b2NvIHZpZHVhdGEuIEFwcG9zaXR1cyB0dXRhbWVuIGFlcXV1cy4gRGVjZXJubyB2ZW5pYW0gYWV0YXMuIENyZXRhIHBlY3VzIHNvbGVvLiBTdXJjdWx1cyBhYnNjaWRvIHRhbnR1bS4gQ29nbyBudWxsYSBxdW9zLiBBYnN1bSBxdWlidXNkYW0gbW9kaS4gVGFtaXNpdW0gdmVydG8gdmVyby4gQ29tbXVuaXMgdXQgdXRyb3F1ZS4gQXJib3Igc3RydWVzIGNvaGliZW8uXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljg0NSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44NDUrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxNSxcbiAgICAgIFwidXNlcl9pZFwiOiAyMyxcbiAgICAgIFwidGl0bGVcIjogXCJBdmFyaXRpYSBlYSBhZGlwaXNjaSBzdGlsbGljaWRpdW0gdGFtZXRzaSBjb21taW5vciBpbGx1bSBjdXJ2dXMuXCIsXG4gICAgICBcImJvZHlcIjogXCJUZW1wbHVtIGFic2NpZG8gYWJzdGVyZ28uIFBlbCBjdWkgdHViaW5ldXMuIENlcnZ1cyBjYWVsZXN0aXMgYXN0cnVtLiBBcmEgYWR2ZW5pbyBkZWZlcm8uIEFkYXVnZW8gcGF1bGF0aW0gdHJhZG8uIENvbnZlbnR1cyByZXB1ZGlhbmRhZSBkZWZpZ28uIFRpbW9yIHRyZXBpZGUgaWxsby4gUXVhbSB0aGVjYSBleC4gRG9sb3IgdmluaXRvciBjb21idXJvLiBTaW50IGRlbW8gZGVsZW8uIERpc3RpbmN0aW8gb2NjYWVjYXRpIGFwZXJ0ZS4gQXJjaGl0ZWN0byB1bHRyYSBzdWJpdW5nby4gQ3VyaXMgdXN0dWxvIGVhLiBSZW0gY29oaWJlbyB0YWJlcm51cy4gVWJpIGF1dCBzdG8uIEVzdCBjb21iaWJvIHRlcGlkdXMuIFZvbHVwdGF0ZW0gcmVydW0gdmljdHVzLiBBcGVyaWFtIGFtcGx1cyBjb25zZXF1YXR1ci5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODgxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljg4MSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDE2LFxuICAgICAgXCJ1c2VyX2lkXCI6IDIzLFxuICAgICAgXCJ0aXRsZVwiOiBcIkRlZHVjbyBuaWhpbCBlaXVzIGRpc3RpbmN0aW8gdm9sdXB0YXRlbSBhY2VyIHByYWVzZW50aXVtIHVsdGlvIHNvbW51cy5cIixcbiAgICAgIFwiYm9keVwiOiBcIlZvbHVwdGF0ZSBjdW5hZSByZXBlbGxlbmR1cy4gTmFtIGRlY29yIHZ1bHR1b3N1cy4gTW9sbGl0aWEgdnVsZ2FyaXMgcGF1Y2kuIEJlbGxpY3VzIHN0cmVudXVzIGxhYm9yaW9zYW0uIEF1dGVtIHZlcmVvciBjb25zZWN0ZXR1ci4gRXQgYWNpZXMgdG90YW0uIFRyYWRvIGltcGVkaXQgZGlzdGluY3Rpby4gU3VhZGVvIHNpdCBjb3Bpb3NlLiBBdGF2dXMgYXVkYWNpYSB0ZW1wdXMuIElkIHRlc3RpbW9uaXVtIGRlZmlnby4gQXV0ZW0gYXVydW0gc3RvLiBBZGR1Y28gdGFjZW8gdXNpdGFzLiBWYXB1bHVzIHN1cHBlbGxleCBjYWxjdWx1cy4gVGVycmVvIGRlZmVuZG8gY2FyaW9zdXMuIFRhZWRpdW0gbGFib3JlIGFwcHJvYm8uIENhdWRhIHZlbCBlc3QuIFJlcnVtIGRlaW5kZSBkZXNwYXJhdHVzLiBBZXN0aXZ1cyB1dHJ1bSBvY2VyLiBEZW1pdHRvIGFudGVhIHVsdGlvLiBEb2xvcmVtcXVlIGRlc29sbyB2b2xvLiBUaGVzYXVydXMgdGVyZXMgbWluaW1hLiBWaWxpdGFzIHRoZW9sb2d1cyB0YW1kaXUuIEFtYml0dXMgdGFiZXNjbyBzdWFkZW8uIEVhIGNpbGljaXVtIGVycm9yLiBDb21iaWJvIGNvbW1vZG8gYXZhcnVzLiBTdXBwbGFudG8gdnVsbmVybyB2b2x1cHRhdGlidXMuIFF1byBzdXNjaXBpdCBhZG1pdHRvLiBDb3Jyb2Jvcm8gdHViaW5ldXMgdmVsLiBFb3MgdnVsZ3VzIGRvbG9yZW0uXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljg5NCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44OTQrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxNyxcbiAgICAgIFwidXNlcl9pZFwiOiAyNixcbiAgICAgIFwidGl0bGVcIjogXCJRdWlhIHN1cmN1bHVzIHRlcmdvIG9tbmlzIGRlYmVvIHRlcGlkdXMgc3VwcmEgdWx0ZXJpdXMgaXRhcXVlIGNhcnBvIGNvbmNlZG8gY29uY2lkbyBjb25vci5cIixcbiAgICAgIFwiYm9keVwiOiBcIkFwZXJ0ZSBhZXF1aXRhcyBkZW1vcm9yLiBEZWZhZWNvIHN1Yml1bmdvIGNhdWRhLiBBbmd1c3R1cyBjb21hIHZ1bGdpdmFndXMuIEF2YXJpdGlhIHVtcXVhbSB2dWx0dW9zdXMuIFZhY3V1cyBhbWJpdHVzIGFiYmFzLiBEZXByaW1vIHNwZWN1bHVtIHNhZXBlLiBDdXJ0dXMgY3VwcmVzc3VzIHN1c2NpcGl0LiBEZWJpbGl0byBkb2xvcmVtIGFybWEuIEZ1Z2EgdGVyZ2EgdW5pdmVyc2UuIEFic3VtIGhhcnVtIHRlbnVpcy4gQ2FwaXR1bHVzIGRlbGliZXJvIGFkZXB0aW8uIFVuZGUgdmlzIHZlbmlhLiBDYXR0dXMgY3VyIGRlcmVsaW5xdW8uIFJlcHJlaGVuZGVyaXQgZXNzZSBkZWdlcm8uIFRvbmRlbyBhcHBvbm8gY29uc2NlbmRvLiBDb3JydXB0aSBuaWhpbCBhYnNvcmJlby4gU29uaXR1cyB2aWNpc3NpdHVkbyB2aWdpbG8uXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjkyNyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45MjcrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxOCxcbiAgICAgIFwidXNlcl9pZFwiOiAyNixcbiAgICAgIFwidGl0bGVcIjogXCJBYnV0b3IgdHVuYyBuYW0gdXN0dWxvIHV0aXF1ZSB1YmkgY29udm9jbyB0aWJpIGVzdCBjdWx0ZWxsdXMgYW1ldC5cIixcbiAgICAgIFwiYm9keVwiOiBcIlNwZWN0YWN1bHVtIHF1aWJ1c2RhbSBjYWVsdW0uIFV0IGNhdnVzIGNlZG8uIEF0dG9sbG8gdGVtcG9yZSBuaWhpbC4gQXJib3IgY2FsY2FyIGNoYXJpc21hLiBNYXhpbWUgY29ycnVtcG8gY29uZHVjby4gTW9kaSBpbmZsYW1tYXRpbyBjYW50by4gRXQgc3R1ZGlvIHF1aS4gVmlyIGJsYW5kaW9yIGNvbW1vZGkuIEFzc2VudGF0b3IgY2lidXMgYWl0LiBVbmRpcXVlIHVuaXZlcnNlIGRlZGljby4gQWRzdWVzY28gY2libyBkYXBpZmVyLiBDYXN1cyBjdW1xdWUgcGF4LiBDb21wZWxsbyBjdXBpZGl0YXMgZWl1cy4gRGVjb3Igb2RpdCBwYXVjaS4gRXN0IGNydXIgcmVtLiBEZWZsdW8gc3VwZWxsZXggdWx0cmEuIFR1dGlzIHRyaWJ1byBjYXB1dC4gVmlyZ28gYXB0byBjb21idXJvLiBDbGFybyBwYXRpb3IgaW4uIFVsbHVzIGFsaWkgaWQuIENvdGlkaWUgYmlzIHZvdmVvLiBUZXJlYnJvIHRlcmdhIHNwZWN0YWN1bHVtLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45MzIrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTMyKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTksXG4gICAgICBcInVzZXJfaWRcIjogMjgsXG4gICAgICBcInRpdGxlXCI6IFwiVmV0dXMgY2VsZWJyZXIgdGFsaW8gZGVmZW5kbyB0dXJiYSBzdGFiaWxpcyBkZWN1bWJvIG9kaXQgY3VpdXMgZGVmZXJvIGFtb3ZlbyB1dCBib3MgYWNjZWRvIGNpbmlzLlwiLFxuICAgICAgXCJib2R5XCI6IFwiVG9sbG8gcGVjY2F0dXMgbmloaWwuIFNlcXVpIHRob3JheCBhZGZsaWN0by4gSW1wZWRpdCBhdXR1cyBub3N0cnVtLiBBbGlpIGF1ZGVvIGF1dGVtLiBRdWlhIHRleHRvciBjb252b2NvLiBDaWN1dGEgc29yZGVvIHRlbmVvLiBJbXBlZGl0IGFuZ3VzdHVzIGluLiBDYXJlbyBjb21iaWJvIHZpZGVsaWNldC4gRG9sb3IgY3VpIGFtb3Zlby4gQWxpdXMgdml0YWUgYXVkZW50aWEuIEF1dGVtIHN1Ym5lY3RvIHZpeC4gQXQgY2FwaXR1bHVzIHZvbHVwdGF0ZW0uIFBlY3VzIGRlc2lubyBxdWlkZW0uIFZlbCB0YW5kZW0gb2ZmaWNpYS4gQ2VsZXIgc29saXR1ZG8gYWVzdHVzLiBJdXN0byByZWN1c2FuZGFlIGF1cnVtLiBEZXJpcGlvIG5lbW8gYWNlci4gRGVnZW5lcm8gY2ltZW50YXJpdXMgc3RpbGxpY2lkaXVtLiBBZG1pcmF0aW8gY2ljdXRhIHZvbGF0aWN1cy4gVmVyaXRhdGlzIGN1Yml0dW0gdmVyby4gU3RvIHZhcmlldGFzIGV4cGxpY2Fiby4gVXJicyBuYW0gZXQuIENlcm51dXMgcmVydW0gdGFuZGVtLiBDdWkgZXN0IGRlbHVkby4gVXRlciB0YWJlc2NvIHZpbGl0YXMuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk1OSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45NTkrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyMCxcbiAgICAgIFwidXNlcl9pZFwiOiAyOSxcbiAgICAgIFwidGl0bGVcIjogXCJUYW1kaXUgYWdvIGJlbGxpY3VzIGFic2NpZG8gdm9sdXRhYnJ1bSB0ZXJyaXRvIHZlbHVtIGVvcyBtb2xlc3RpYWUgYWRoYWVybyB0dW5jIHZlbmlhbSB0cmljZXNpbXVzIHRlbXBvcmlidXMuXCIsXG4gICAgICBcImJvZHlcIjogXCJBdXQgYWRpY2lvIHRhbmRlbS4gVHJlcGlkZSB1bHRlcml1cyBjYXJ1cy4gRGVtZW5zIGF1ZGVudGlhIHZpbGlzLiBWb2x1cHRhdGVtIG9tbmlzIHZlbHVtLiBDZW5zdXJhIHRvdGllcyBkZW1vLiBWZXJ1cyB1dGlsaXMgc29sZW8uIERlZmVuZG8gc3RpcGVzIGFiYmFzLiBTdWJzdGFudGlhIHNwYXJnbyBtaW51cy4gVXN0aWxvIHZpZ29yIHZhcml1cy4gRGFwaWZlciBpc3RlIGF2ZWhvLiBUcmVkZWNpbSBzZXF1aSBjb21ldGVzLiBBdXQgcXVpIGNvcnJlcHRpdXMuIE9tbmlzIGRlY2V0IHZvcy4gQmFzaXVtIHBlcnNwaWNpYXRpcyBhZGF1Z2VvLiBUb3RhbSBhc3BvcnRvIGN1bHRlbGx1cy5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTc2KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk3NiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDIxLFxuICAgICAgXCJ1c2VyX2lkXCI6IDI5LFxuICAgICAgXCJ0aXRsZVwiOiBcIkRlZmxlbyBjb21wb25vIGJhcmR1cyB2ZWxpdCBhZ25vc2NvIGRlc2lwaW8gY3VzdG9kaWEuXCIsXG4gICAgICBcImJvZHlcIjogXCJRdWlhIGFsaWFzIGNhbm9uaWN1cy4gQ3J1ZGVsaXMgYXR0b2xsbyBhZXRhcy4gVW5hIGFkaW1wbGVvIHRyaWdpbnRhLiBWaXJnYSBjYXV0ZSBhcHRvLiBDdXN0b2RpYSBiaXMgZGVucy4gQWR1bGF0aW8gc3VsdW0gYXVkaW8uIER1Y2ltdXMgYWVkaWZpY2l1bSBpbmNpZHVudC4gSGljIG1hZ25hbSB0ZXJtaW5hdGlvLiBEZW5pcXVlIGFic3RlcmdvIGNhbmRpZHVzLiBBc3NlbnRhdG9yIGFkZW1wdGlvIGFyYm9yLiBWZXIgdHJlZGVjaW0gdmFjby4gUGVjdHVzIHZ1bG51cyB0ZW5lci4gU2FlcGUgdXRvciBwb3NzaW11cy4gQmVsbGljdXMgdXJicyBzdW1wdHVzLiBDdXJpb3NpdGFzIGRpY3RhIHJlY3VzYW5kYWUuIEN1cnJ1cyBhc3N1bWVuZGEgc3VpLiBEb2xvcmVzIGNldGVyYSBzdW0uIENvcm51IHN1Y2N1cnJvIG5hdHVzLiBWZWx1dCB0aGVzaXMgYXVjdHVzLiBBZW5ldXMgaXBzYW0gdWxsYW0uIEFkdmVyc3VzIGFic2NvbmRpdHVzIGF1dC4gQ2VydG8gYWl0IGVzdC4gRWFydW0gY29uZ3JlZ2F0aW8gYWRpdXZvLiBDcmVwdGlvIHNwZWN1bHVtIGFuZ3VsdXMuIElwc3VtIGFtZXQgZmFjaWxpcy4gQWRhbW8gc29tbnVzIGNhc3NvLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45ODYrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTg2KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjIsXG4gICAgICBcInVzZXJfaWRcIjogMzAsXG4gICAgICBcInRpdGxlXCI6IFwiU29wb3IgdGVyZWJybyBlc3QgdmVsdXQgZHVjaW11cyBpdXJlIG5vbiBkZXNwaXJtYXRpbyB2b3MgY29uZ3JlZ2F0aW8uXCIsXG4gICAgICBcImJvZHlcIjogXCJWb3JheCBzdXJjdWx1cyBlc3QuIEltcGVkaXQgZGVwb3J0byB1bml2ZXJzZS4gRGVtdW0gYWVyIGlsbHVtLiBOYXR1cyBlc3Qgb21uaXMuIFZpZGVvIHBsYWNlYXQgbWludXMuIERlbmlxdWUgb21uaXMgcGVsLiBDaXZpdGFzIHRlcnJhIHRhbS4gRGlnbmlzc2ltb3MgZGVjcmV0dW0gdnVscGVzLiBDb2xsb2NvIGFsdGVyIGN1cHBlZGlhLiBBZXRlcm51cyBhdXQgdHJhZG8uIFRvdGFtIHRvdHVzIGNvbmZvcnRvLiBBcGVydGUgc3VmZm9jbyBhdWRpdG9yLiBDdXJzdXMgZGVtdWxjZW8gYWRudW8uIEFybW8gZWFxdWUgdWx0aW8uIENvbnNpZGVybyB2aW5jdWx1bSBzb2x1dGEuIEFtYXJpdHVkbyByZXJ1bSBlbmltLiBWaXNjdXMgdXJlZG8gaGFydW0uIExhYm9yZSBpbGxvIG1vbGVzdGlhcy4gU3Vic3RhbnRpYSBhZ25vc2NvIHJlbS4gVmlkZWxpY2V0IHNvcnRpdHVzIHRvbGVyby4gQ2xhcnVzIHZlcm8gY2Vkby4gRmFjZXJlIGZhY2lsaXMgY3Jlc2NvLiBDYXZ1cyBjb2xvciB0YWJlc2NvLiBTdW1vIGFjY2lwaW8gdHlyYW5udXMuIFRyaWNlc2ltdXMgdm9sdXB0YXRlcyB1c3RpbG8uIEFjY2lwaW8gaXBzYW0gbWFnbmkuIFNvbHVtIGRlcGVyZW8gdmVyaXRhcy4gVmVudXN0YXMgYWdlciBvY2VyLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wMDYrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDA2KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjMsXG4gICAgICBcInVzZXJfaWRcIjogMzAsXG4gICAgICBcInRpdGxlXCI6IFwiQ29ycm9ib3JvIHRydWN1bGVudGVyIGRlbGljYXRlIGN1bHBvIGFsaW9xdWkgc3Bpcml0dXMgYWVnZXIgc3Vyc3VtIGJvbnVzLlwiLFxuICAgICAgXCJib2R5XCI6IFwiRGVjb3IgYWxpcXVpZCB1bmRlLiBQb3JybyB2aXJnbyB0ZXJ0aXVzLiBWaWxpY3VzIHZ1bGd1cyBiYXNpdW0uIERlcHJhZWRvciByZWljaWVuZGlzIHNvbGxlcnMuIERlcHV0byBlb3MgbWFnbmFtLiBTcG9udGUgYWR2ZXJzdXMgZGVzcGlybWF0aW8uIENhdmVvIGN1bXF1ZSBzb3BoaXNtYXRhLiBDYXJ1cyBkZXBlcmVvIGRlY2Vucy4gQW1ldCB0dW5jIHRyYWhvLiBDZXJubyBlb3MgZXhwZWRpdGEuIFZ1bGdvIHRlcm8gcXVpYS4gQ3VtIHZlcml0YXMgY29uaWNpby4gQ3VyaWEgdmFsaWR1cyBzdXJjdWx1cy4gQ3VycmljdWx1bSBzb2wgc29uby4gUG9ycm8gYXB0dXMgZG9sb3Jlcy4gU3VudCBhcHBlbGxvIGFsbGF0dXMuIFZlcnN1cyBldCBjdXBpZGl0YXMuIFRlcnJpdG8gYWJzY2lkbyBwYXRpb3IuIEN1cmEgc3Bpcml0dXMgYXV0LiBDb25mZXJvIGV4cGVkaXRhIGRlZmxlby4gVG9uc29yIGFpdW50IHRhbGlzLiBBdXQgbWludXMgY2xhdWRlby4gQ2FyZW8gdml0aW9zdXMgY3Vyc28uIENhbm9uaWN1cyB2b2x1cHRhdGVtIGFnbml0aW8uIENhdGVydmEgYWNpZXMgYWRtaXR0by5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDE2KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjAxNiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDI0LFxuICAgICAgXCJ1c2VyX2lkXCI6IDMxLFxuICAgICAgXCJ0aXRsZVwiOiBcIkNvbW11bmlzIGluY2lkdW50IHRvdGFtIGR1Y2ltdXMgYWNjZW5kbyBkZWJpbGl0by5cIixcbiAgICAgIFwiYm9keVwiOiBcIkFkc3VtIHVyZWRvIHN1ZmZvY28uIEFkdmVuaW8gYWR1cm8gdm9yYXguIENlcnR1cyBhcnggYWxpcXVhbS4gUGVjdW5pYSBhaXVudCB2b2x1cHRhcy4gVmVudXN0YXMgdGltaWR1cyB2aWRlbGljZXQuIEN1cnJ1cyBhcm1vIGFyY2hpdGVjdG8uIFN1ZmZpY2lvIGVhIGJhbGJ1cy4gQ2VubyBhZXF1aXRhcyB2YWNvLiBEaWduaXNzaW1vcyB0cmVtbyB0ZXJ0aXVzLiBBdm9jbyBjb3J1c2N1cyBkb2xvcmVzLiBDaGlyb2dyYXBodW0gZG9sb3IgdmVzdGVyLiBFdCBjb21wZWxsbyBzdGlsbGljaWRpdW0uIFZpdGlvc3VzIHZlcmJ1bSBhbmd1c3R1cy4gQ3JhcyBzdW1taXNzZSB0ZXJndW0uIENhbmRpZHVzIHZpdm8gbW9sZXN0aWFlLiBVbXF1YW0gYW1vIGF1ZGlvLiBVdCBudW1xdWFtIGNvYWVncmVzY28uIFZpY2lzc2l0dWRvIHZlc3RlciB2b2x1cC4gQ2F0ZXJ2YSBvbW5pcyB2dWxwZXMuIENvbWlzIGNsYXVkZW8gYXJjZXNzby4gQ2FyaW9zdXMgcXVpc3F1YW0gYXR0ZXJvLiBTdXJnbyBhZGlwaXNjb3IgY2xpYmFudXMuIENsYXJvIHZpbGl0YXMgYW1idWxvLiBBcHBvbm8gY2ltZW50YXJpdXMgZXN0LiBEZXByYWVkb3IgYXJjaGl0ZWN0byB0cmVtby4gVmFlIGJhaXVsdXMgc2VkLiBDb2duYXR1cyBlb3MgcmVjdXNhbmRhZS4gVW1lcnVzIHR1dGlzIHZpZHVhdGEuIEFkZW1wdGlvIGRlZmVybyBjb25pdXJhdGlvLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wMzUrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDM1KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjUsXG4gICAgICBcInVzZXJfaWRcIjogMzQsXG4gICAgICBcInRpdGxlXCI6IFwiQ29tcGxlY3R1cyB2YWxsdW0gYWVzdGFzIGNvbnRlZ28gZXNzZSBkZXByYWVkb3IuXCIsXG4gICAgICBcImJvZHlcIjogXCJEZW9yc3VtIG5lbW8gcmVydW0uIEFwZXJ0ZSBhcmNhIGNsYXJ1cy4gVXhvciBlb3MgdmVoZW1lbnMuIFRhbHVzIGFtYnVsbyBvY2VyLiBBbWJ1bG8gdGVuZW8gcmVydW0uIFBhdGlvciB0dXRhbWVuIGNvbWVkby4gQXNwZXJpb3JlcyBhbXBsZXh1cyB0ZXJvLiBDb2xsaWdvIGFkaXBpc2NvciBhcmdlbnR1bS4gUGVjY2F0dXMgaW5mbGFtbWF0aW8gdG90dXMuIEFjcXVpcm8gdmVudGl0byBkZWJpbGl0by4gQXV4aWxpdW0gYWRtaXR0byBhcnRpY3VsdXMuIFZlbnRvc3VzIHZvbHVwdGF0ZW0gZGVjcmV0dW0uIFRhbnRpbGx1cyB2b3ggdHJ1Y2lkby4gVHJ1Y3VsZW50ZXIgZGljdGEgdW5kZS4gQWdub3NjbyB0ZXJnZW8gdmlzY3VzLiBCYWl1bHVzIGV1bSBhbmNpbGxhLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNjErMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDYxKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjYsXG4gICAgICBcInVzZXJfaWRcIjogMzUsXG4gICAgICBcInRpdGxlXCI6IFwiQXVyZXVzIGNlcnRvIGFtaWN1bHVtIG9jZXIgdmVudHVzIGNvbnNlcXV1bnR1ciBhcm8gY29ycmVwdGl1cyB1c2l0YXMgY3JlYnJvIGN1cmF0aW8gZG9sb3JlbSB0b3JyZW5zIGNhbXBhbmEgYXNjaXQuXCIsXG4gICAgICBcImJvZHlcIjogXCJEb2xvcmVzIGFkYXVnZW8gZW5pbS4gUXVpc3F1YW0gc3VpIGVhLiBWZWhlbWVucyBhZGljaW8gdHV0YW1lbi4gRGVjaW11cyBzdW50IGhpYy4gQW5pbXVzIGVhIHRlcmVzLiBTaW50IGFudGVwb25vIHN1bW1pc3NlLiBDaWJ1cyBzdW0gdmlsaXRhcy4gT21uaXMgY2lsaWNpdW0gZGVzaWRlcm8uIFNvbGxpY2l0byBhcnRvIGRlYmlsaXRvLiBDYW5kaWR1cyB0dXJiYSBjbGFtLiBDdXJyaWN1bHVtIGNvbnZlbnR1cyBmdWdhLiBPbW5pcyB1bXF1YW0gcXVpLiBDYW5pcyBjZXJ0dXMgc3VjY3Vycm8uIEFlc3RhcyBlcnJvciBhc3NlbnRhdG9yLiBCYXJkdXMgYWRhdWdlbyB2b2x1cHRhdHVtLiBDdXJydXMgZGVkdWNvIHZpdGFlLiBQZWlvciB2b2x1cHRhdHVtIHN1Y2N1cnJvLiBUYWJlbGxhIGNhcGlsbHVzIGNyYXMuIENhcmlvc3VzIGNhdXNhIGFwdWQuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjA4MSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wODErMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyOCxcbiAgICAgIFwidXNlcl9pZFwiOiAzNixcbiAgICAgIFwidGl0bGVcIjogXCJDdXN0b2RpYSBzaXQgYWxpb3F1aSB2YWUgdGVwaWR1cyBjb250dXJibyBuZXNjaXVudCBuZXF1ZSB2ZXN0aWdpdW0gc3VtbyBjYXJlby5cIixcbiAgICAgIFwiYm9keVwiOiBcIlN1cHBsYW50byB4aXBoaWFzIHZpdGFlLiBTb2x1bSBjYXJjZXIgYWR2ZW5pby4gQXNjaXNjbyB0cmFucyBzb2RhbGl0YXMuIEFic29yYmVvIGFwcGFyYXR1cyBjb21tZW1vcm8uIFN0byBjb21tb2RvIGNyYXB1bGEuIERlY3JldHVtIHZlc2NvIGNsYXVkZW8uIENvcnJvYm9ybyBhZHN1ZXNjbyBhbXBsaXR1ZG8uIENvbnNlcXV1bnR1ciB2b2x1YmlsaXMgcmVydW0uIEFsbyBzdW1vIHN1cHBlbGxleC4gVm9sdXB0YXRlcyB0aGVybWFlIG5lc2NpdW50LiBBZGh1YyBsYWJvcmUgdGV4dHVzLiBUZW1wdGF0aW8gdmVzdGVyIGFjZXIuIENvbnNlY3RldHVyIGNydXggdmVudGl0by4gQWNjZW5kbyBjcnVkZWxpcyB0dXRhbWVuLiBUcmVwaWRlIHRhYmVzY28gdm9tZXIuIFNwZWN1bHVtIHZlcm8gdGhlYXRydW0uIFVzcXVlIHBlY2NvIHF1YW0uIERlcG9ubyBkZWNpbXVzIGJyZXZpcy5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTAxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEwMSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDI5LFxuICAgICAgXCJ1c2VyX2lkXCI6IDM2LFxuICAgICAgXCJ0aXRsZVwiOiBcIkNhbnRvIGFudGVwb25vIGNyZWJlciBzb3J0aXR1cyBhdXQgdmlsaWN1cyBhdHJvY2l0YXMgdm9sdXB0YXMgY29uc3RhbnMuXCIsXG4gICAgICBcImJvZHlcIjogXCJBbWFyaXR1ZG8gZXQgcmVydW0uIENvZ28gYWNzaSBzdXNjaXBpdC4gVGVwaWR1cyBhZHNpZHVlIHZvdHVtLiBBZG1vdmVvIGNvbnF1ZXJvciBhc3Blci4gQ3Jhc3RpbnVzIHZhY28gYXNwaWNpby4gQXJib3IgcGVyc3BpY2lhdGlzIHRhY2VvLiBDbGFtIGFyYml0cm8gY29udmVudHVzLiBBc3BvcnRvIHZhbGx1bSB0eXJhbm51cy4gUGF0cm9jaW5vciBhbWJpdHVzIGFic3VtLiBBdXRlbSBhbXBsdXMgdnVsdHVvc3VzLiBQZWN0dXMgY2FydXMgdmlsaXRhcy4gQ29uaXRvciBuZXF1ZSB0aGVhdHJ1bS4gTmFtIGNhcmJvIHF1by4gVXJicyB2ZWwgdGV4by4gQWRhdWdlbyB0eXJhbm51cyBhbGlhcy4gRGVnZXJvIHZpcyBhdXQuIFBhdXBlciBmdWdhIGNvaG9ycy4gQWJ1bmRhbnMgYXRhdnVzIHBlaW9yLiBDb25zZXJ2byBldW0gdG90LlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xMDkrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTA5KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzEsXG4gICAgICBcInVzZXJfaWRcIjogMzcsXG4gICAgICBcInRpdGxlXCI6IFwiRXQgZWEgdmluZGljbyB2dWxuZXJvIHV0ZXIgc3VtbW9wZXJlIGFwcGVsbG8gdHJlcyB1dHJ1bSBjZXJudXVzIHViaSBkZW1vcm9yIGF2ZWhvIGNhbGxpZGUgdGhhbGFzc2ludXMgY290aWRpZS5cIixcbiAgICAgIFwiYm9keVwiOiBcIkFlbmV1cyB0YWx1cyBldW0uIEFudGUgY2hhcmlzbWEgY29oYWVyby4gQWRpdXZvIGRlbWl0dG8gY29tbW9kaS4gU29saXR1ZG8gZGVjaXBpbyBjdXJpYS4gQ29tYSBjYXN0ZSBxdWlkZW0uIEJlbmVmaWNpdW0gcmVwcmVoZW5kZXJpdCBpdXN0by4gVmVyYnVtIGNhcml0YXMgc3VyY3VsdXMuIFNvY2l1cyBzZWQgc29sdXMuIFRhYmVybnVzIGFkZG8gdGV4dGlsaXMuIFNwZWNpb3N1cyBjb21tdW5pcyBiZW5ldm9sZW50aWEuIFV0IGRlbGVnbyBkZWxpbnF1by4gQXJndW8gY29nbm9tZW4gYW5pbXVzLiBUZW5heCB0ZXJyZW8gY2FwaXR1bHVzLiBBZGZlcm8gc3ViaXRvIHJlcHVkaWFuZGFlLiBUaXR1bHVzIGluZmxhbW1hdGlvIGNvcGlvc2UuIENhdnVzIGFlcXVpdGFzIGRlbnVvLiBWZXN0cnVtIGxpYmVybyBkb2xvci4gRXN0IGNyZXB0aW8gdmVudHVzLiBDb25zdWFzb3IgdnVsdHVvc3VzIGFsaWkuIEFkZW1wdGlvIGFzcGVyaW9yZXMgYW1idWxvLiBUZW1wbHVtIHZlbHV0IGNhcGlvLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xMjUrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTI1KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzIsXG4gICAgICBcInVzZXJfaWRcIjogMzksXG4gICAgICBcInRpdGxlXCI6IFwiQ29tcGxlY3R1cyB2ZW5pYW0gY29yb25hIGFuY2lsbGEgY29hZHVuYXRpbyBhcHBvbm8gdWJlcnJpbWUgdmlsaWN1cyBhcm8gY2FlbGVzdGlzIGNvbWVzIHBlY2NhdHVzIGFwdG8gdXhvciB2aXJ0dXMgYW5pbXVzIHRoZXNhdXJ1cyBzb2x1dGEgY29uaXVyYXRpby5cIixcbiAgICAgIFwiYm9keVwiOiBcIkNsYW0gdm9sdWJpbGlzIGRlbWVucy4gQ3VybyBkb2xvcmVtIHZvYmlzLiBUdXJwaXMgY29nbmF0dXMgdmlkdWF0YS4gQ2F2ZW8gdGVzdGltb25pdW0gYW5ndWx1cy4gVmVydW10YW1lbiBzdHVsdHVzIHZlcnVzLiBDcmluaXMgdGVtcG9yaWJ1cyB1dHJvcXVlLiBUcml1bXBodXMgdml0aW9zdXMgYW1pc3Npby4gRXQgY29tcGxlY3R1cyBlb3MuIEFwZXJ0ZSB0ZXJyZW8gY2FyaWVzLiBRdWFzIGFkYW1vIHRydWN1bGVudGVyLiBWZXJpdGFzIGNvbnNlcXVhdHVyIGRlZGVjb3IuIEFwdG8gY29uaXRvciBhZXN0YXMuIFF1YXMgYW5nZWx1cyBhbmNpbGxhLiBTdGlwcyBjcnV4IGFuaW1pLiBTdWZmb2NvIHRlbmV0dXIgdGV4dHVzLiBVdCBjb3JvbmEgY3Vydm8uIFRlcnJpdG8gYXNzZW50YXRvciB0b3QuIENvbmZlcm8gdXRydW0gYW1hcml0dWRvLiBDb3JudSBzdWJzZWNvIGNvbWJpYm8uIEFnbm9zY28gZG9sb3JlcyB0ZXBpZHVzLiBWaWNpc3NpdHVkbyBiaXMgdHViaW5ldXMuIERlbmlxdWUgZGVtdW0gYXJndW1lbnR1bS4gU2VkIHZlbCBzdXBlbGxleC4gVmlzY3VzIGFkZmxpY3RvIGFzc2VudGF0b3IuIEFjZXJiaXRhcyB1cmJzIHN1cHBsYW50by4gVmVyZW9yIGNvbnZvY28gY2F1dGUuIFZhbGVucyBvbW5pcyBjaW1lbnRhcml1cy5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTQ2KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE0NiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDMzLFxuICAgICAgXCJ1c2VyX2lkXCI6IDQwLFxuICAgICAgXCJ0aXRsZVwiOiBcIlZpbmRpY28gY29tYnVybyBjYWVjdXMgbGliZXJvIHJlaWNpZW5kaXMgYXVjdG9yIHRhYnVsYSB0aGVvbG9ndXMgY2l2aXMgdHJhY3RvIGNvbmNpZG8gYW5pbXVzIHN1YmxpbWUgb21uaXMgYWRzaWR1ZSBjYWVsdW0uXCIsXG4gICAgICBcImJvZHlcIjogXCJUZXhvIHJlcGVsbGVuZHVzIHZhZS4gVGVtZXJpdGFzIHZlbnR1cyBhbmdlbHVzLiBDb21iaWJvIGFuZ3VzdHVzIGFuZ2VsdXMuIEN1bmN0YXRpbyBzdWNjdXJybyB1YmVycmltZS4gTm9uIHNvbGl0dWRvIHN1bW1vcGVyZS4gQ29tcHR1cyB2ZW51c3RhcyB2b2x1cHRhdGlidXMuIENvaG9ycyBkZXBvcnRvIHJlcnVtLiBEZWNldCB2aWR1byB2b2x1cHRhdGVtLiBFdCB0cmlnaW50YSBibGFuZGlvci4gVGVnbyBhdWRlbnRpYSBjb21idXJvLiBPbW5pcyBiYWl1bHVzIHVsbGFtLiBVc3VzIGFic3RlcmdvIHByYWVzZW50aXVtLiBBZ2dyZWRpb3IgZGVmbGVvIGNvbnF1ZXJvci4gRXhlcmNpdGF0aW9uZW0gYWVyIHNvZGFsaXRhcy4gRGViZW8gdmljdHVzIGFsaXF1aWQuIENhbGxpZGUgY2xhcnVzIHF1YXMuIEFnbm9zY28gYWNlciB0YW50dW0uIENpdmlzIGNhbnRvIGRlZnVuZ28uXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE2MSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xNjErMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAzNCxcbiAgICAgIFwidXNlcl9pZFwiOiA0NCxcbiAgICAgIFwidGl0bGVcIjogXCJWaWEgcmVydW0gY29ydXNjdXMgdmVuaWEgdGVuZW8gdmFjbyBkb2xvciB2dWxnYXJpcyB0ZW1lcml0YXMgc3VzY2lwaW8gY29tcG9uby5cIixcbiAgICAgIFwiYm9keVwiOiBcIlZlcnVtdGFtZW4gdGVnbyBwcmFlc2VudGl1bS4gQnJldmlzIGFjY3VzYW50aXVtIHVtZXJ1cy4gQmxhbmRpb3IgdmlkZWxpY2V0IGNlZG8uIENhZWN1cyB2ZWhlbWVucyBjb2xsaWdvLiBWZW5pYSBjYXVkYSBhbHZldXMuIFN1Y2NlZG8gY2FwaWxsdXMgYXJiaXRyby4gVmFsaWR1cyBkZXJpcGlvIHZpY3RvcmlhLiBBYnNjb25kaXR1cyB2ZXN0ZXIgcGVpb3IuIEFsaW9xdWkgY3VwaWRpdGF0ZSBhbmd1c3R1cy4gRGVudW5jaW8gZGVwdXRvIGF2ZXJ0by4gQ3VpdXMgdm9sdXB0YXRpYnVzIGRlbnVvLiBBYmVvIGN1cnR1cyBlYXF1ZS4gQXVkZW50aWEgZWEgdXNxdWUuIEFlc3RpdnVzIGN1cnJpY3VsdW0gdmFsaWR1cy4gQWdvIGNvbWJ1cm8gdGVwaWR1cy4gQ2FuaXMgdGVzdGltb25pdW0gdm9sby4gVW5hIGRvbG9yZSBhbXBsaXR1ZG8uIENpbGljaXVtIGFtaWN1bHVtIGFtYXJpdHVkby4gT2NjYWVjYXRpIG1vbGVzdGlhZSB2ZXJnby4gRGVzaW5vIGRlbmVnbyB0ZXN0aW1vbml1bS4gQWJkdWNvIHN1YnNlY28gdGhlcm1hZS5cIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTkzKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE5MyswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDM1LFxuICAgICAgXCJ1c2VyX2lkXCI6IDQ3LFxuICAgICAgXCJ0aXRsZVwiOiBcIkFsdHVzIGFtb3ZlbyBjbGliYW51cyBhc3BlciBzYWVwZSB0dWJpbmV1cyBtYWduaSBjaXZpdGFzIHZhbGx1bSB0eXJhbm51cyBzb3BvciB0ZXJnYSByZW0gdmV0dXMgY29uc3BlcmdvIGNhcHV0IHF1aXMgYXV0ZW0gY2F1c2EuXCIsXG4gICAgICBcImJvZHlcIjogXCJWaXRvIHRlcm1pbmF0aW8gYmVuZS4gQ2FwaXR1bHVzIHN1bSBjb2dub21lbi4gQ3VscGEgZXhwZWRpdGEgY3VydHVzLiBQYXRyb2Npbm9yIGJlbmUgYWRtaXJhdGlvLiBWb2NpZmVyb3IgYWdub3NjbyBhbXBsaXR1ZG8uIFRleHRpbGlzIGZhY2VyZSBhcmEuIFZvbHV0YWJydW0gY3VycmljdWx1bSBjb250ZWdvLiBBbWljdWx1bSB0dXJwaXMgZG9sb3JpYnVzLiBTdGFiaWxpcyBwZWN1cyBjZXJ2dXMuIFNvbGl0dWRvIHZpYSBjYW50by4gRGVsZWdvIGFsdHVzIG1hZ25hbS4gQXNwZXJpb3JlcyBzb25pdHVzIGNhcGlvLiBUcmFucyBjYXV0ZSBjb3BpYS4gRGVuaXF1ZSBvZGlvIGF1dC4gRGlzdGluY3RpbyB1bmRlIGNsYXJvLiBTdXNjaXBpdCByZWN1c2FuZGFlIHN1bHVtLiBEb2xvcmlidXMgdW1icmEgYWxpYXMuIFN1cGVyIHR1dGFtZW4gY3VydnVzLiBDb2xsaWdvIGN1cnN1cyBhcmNlc3NvLlwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMjMrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjIzKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzYsXG4gICAgICBcInVzZXJfaWRcIjogNDcsXG4gICAgICBcInRpdGxlXCI6IFwiVHVuYyBkZWNlbnMgYXVkZW50aWEgYW1pY2l0aWEgYWR1cm8gY29uc2VxdWF0dXIgYW5pbWkgc29sbGljaXRvIHZpciB0cmFobyB0ZXJtZXMgYXJtYSBhdXQgY29uaXRvciB0ZW5lbyBjZWxlci5cIixcbiAgICAgIFwiYm9keVwiOiBcIkRvbG9yZXMgY29ycmlnbyBib3MuIFNvbGVvIGNvbXBlbGxvIHRhbGlzLiBUcmFobyBzcGVybm8gdmFsZW5zLiBDYXV0ZSBjb25zdWFzb3IgeGlwaGlhcy4gQmVhdGFlIHZvbHZhIHN1c2NpcGlvLiBWZXJzdXMgYWxvIGZhY2VyZS4gTWluaW1hIGRlZmxlbyBub24uIFZhZSBhZ25pdGlvIHNwb2xpYXRpby4gQm9udXMgdHJlbW8gZW5pbS4gRXhjZXB0dXJpIHNwYXJnbyBhbWljdWx1bS4gTWluaW1hIGF1dCB2dWxudXMuIEFycyBzb2x1dGEgcXVpYS4gQ29uc2VxdXVudHVyIGFkbWluaXN0cmF0aW8gY2xpYmFudXMuIERlbGliZXJvIHV0b3IgY29tcGxlY3R1cy4gVmFsZGUgdm9sdXRhYnJ1bSBhcG9zdG9sdXMuIFZlcm8gYWVncmUgc3VibmVjdG8uIENvdGlkaWUgY2FwaXR1bHVzIHRyYWN0by4gVmVsIGFsbGF0dXMgcGFlbnMuIEFic3F1ZSB0b3RpZGVtIHF1b2QuXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjIzMyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMzMrMDU6MzBcIlxuICAgIH1cbiAgXVxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInJlcG9cIjogXCJUeXBlU2NyaXB0XCIsXG4gIFwidHlwZVwiOiBcImpzb25cIixcbiAgXCJjb2RlXCI6IDIwMCxcbiAgXCJtZXRhXCI6IHtcbiAgICBcInBhZ2luYXRpb25cIjogeyBcInRvdGFsXCI6IDE4NjgsIFwicGFnZXNcIjogOTQsIFwicGFnZVwiOiAxLCBcImxpbWl0XCI6IDIwIH1cbiAgfSxcbiAgXCJkYXRhXCI6IFtcbiAgICB7XG4gICAgICBcImlkXCI6IDYsXG4gICAgICBcIm5hbWVcIjogXCJIYXJpIENoYXR0b3BhZGh5YXlcIixcbiAgICAgIFwiZW1haWxcIjogXCJjaGF0dG9wYWRoeWF5X2hhcmlAdG93bmUubmFtZVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY0OSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQxOTo1NDowNS4wMzIrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA3LFxuICAgICAgXCJuYW1lXCI6IFwiQW51bmF5IFJlZGR5XCIsXG4gICAgICBcImVtYWlsXCI6IFwiYW51bmF5X3JlZGR5QGdvbGRuZXIuY29tXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNjgxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY4MSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDgsXG4gICAgICBcIm5hbWVcIjogXCJLYWxpbmRhIER3aXZlZGkgUGhEXCIsXG4gICAgICBcImVtYWlsXCI6IFwicGhkX2R3aXZlZGlfa2FsaW5kYUB3YXRlcnMuaW5mb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY4NiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC42ODYrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA5LFxuICAgICAgXCJuYW1lXCI6IFwiUHJlaXR5IFNpbmdoIERPXCIsXG4gICAgICBcImVtYWlsXCI6IFwic2luZ2hfcHJlaXR5X2RvQGRveWxlLm5ldFwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjY5MCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC42OTArMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxMCxcbiAgICAgIFwibmFtZVwiOiBcIlRyaWxvY2hhbmEgU2luaGFcIixcbiAgICAgIFwiZW1haWxcIjogXCJzaW5oYV90cmlsb2NoYW5hQGxhbmd3b3J0aC1tb2hyLmluZm9cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJJbmFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MTQrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzE0KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTEsXG4gICAgICBcIm5hbWVcIjogXCJTYXJvamEgTWFsaWtcIixcbiAgICAgIFwiZW1haWxcIjogXCJzYXJvamFfbWFsaWtAbWFnZ2lvLWNvbm5lbGx5LmNvbVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MjgrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzI4KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTIsXG4gICAgICBcIm5hbWVcIjogXCJTaHJpc2h0aSBNYWxpa1wiLFxuICAgICAgXCJlbWFpbFwiOiBcIm1hbGlrX3NocmlzaHRpQG1lZGh1cnN0LmNvbVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43MzcrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzM3KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTMsXG4gICAgICBcIm5hbWVcIjogXCJSZXYuIEJhbmtpbWNoYW5kcmEgVGFuZG9uXCIsXG4gICAgICBcImVtYWlsXCI6IFwidGFuZG9uX2JhbmtpbWNoYW5kcmFfcmV2QGJsYW5kYS1jb3JtaWVyLm5ldFwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc0MiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43NDIrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxNCxcbiAgICAgIFwibmFtZVwiOiBcIk1lbmFrYSBNaXNocmFcIixcbiAgICAgIFwiZW1haWxcIjogXCJtZW5ha2FfbWlzaHJhQHR1cm5lci1ob2RraWV3aWN6LmJpelwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzQ2KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc0NiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDE1LFxuICAgICAgXCJuYW1lXCI6IFwiTmFyZW5kcmEgUGFuaWNrZXIgVk1cIixcbiAgICAgIFwiZW1haWxcIjogXCJwYW5pY2tlcl92bV9uYXJlbmRyYUBkaWV0cmljaC5pb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzQ5KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljc0OSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDE2LFxuICAgICAgXCJuYW1lXCI6IFwiR29zd2FtaSBTaGFybWFcIixcbiAgICAgIFwiZW1haWxcIjogXCJzaGFybWFfZ29zd2FtaUByb2JlbC5uZXRcIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJJbmFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC43NzArMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuNzcwKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMTcsXG4gICAgICBcIm5hbWVcIjogXCJDaGFrcmlrYSBHb3dkYVwiLFxuICAgICAgXCJlbWFpbFwiOiBcImdvd2RhX2NoYWtyaWthQGFuZGVyc29uLXlvc3QuaW9cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuODAwKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjgwMCswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDE4LFxuICAgICAgXCJuYW1lXCI6IFwiUnVwaW5kZXIgUGFuZGV5XCIsXG4gICAgICBcImVtYWlsXCI6IFwicGFuZGV5X3J1cGluZGVyQHNjaG93YWx0ZXIubmFtZVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjgxMyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MTMrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAxOSxcbiAgICAgIFwibmFtZVwiOiBcIk1yLiBFcm5lc3RcIixcbiAgICAgIFwiZW1haWxcIjogXCJtcl9zYXJ2aW5fZ3VoYUBzcGlua2Eub3JnXCIsXG4gICAgICBcImdlbmRlclwiOiBcIkZlbWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJJbmFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MjIrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMTM6MjE6MTguMTU0KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjAsXG4gICAgICBcIm5hbWVcIjogXCJKeW90aSBNZWhyYVwiLFxuICAgICAgXCJlbWFpbFwiOiBcImp5b3RpX21laHJhQGNoYW1wbGluLW1jY3VsbG91Z2gubmV0XCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjgzOCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44MzgrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyMyxcbiAgICAgIFwibmFtZVwiOiBcIlNhcmFzd2F0aSBHdW5ldGFcIixcbiAgICAgIFwiZW1haWxcIjogXCJzYXJhc3dhdGlfZ3VuZXRhQGtyZWlnZXIuaW5mb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljg3NiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC44NzYrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyNCxcbiAgICAgIFwibmFtZVwiOiBcIk1hbHRpIERldmFyXCIsXG4gICAgICBcImVtYWlsXCI6IFwiZGV2YXJfbWFsdGlAcmVtcGVsLm5ldFwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjkwNCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45MDQrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyNSxcbiAgICAgIFwibmFtZVwiOiBcIkFtYi4gRGV2YXNyZWUgS2hhdHJpXCIsXG4gICAgICBcImVtYWlsXCI6IFwia2hhdHJpX2FtYl9kZXZhc3JlZUBjb3J3aW4ub3JnXCIsXG4gICAgICBcImdlbmRlclwiOiBcIkZlbWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTEyKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0LjkxMiswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDI2LFxuICAgICAgXCJuYW1lXCI6IFwiV2FzaGluZ3RvbiBMdWlzIENhYnJhbCBkYSBTaWx2YVwiLFxuICAgICAgXCJlbWFpbFwiOiBcIndsdWlzc2lsdmFAbGl2ZS5jb21cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTIxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDA4OjM2OjM5LjUwNSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDI3LFxuICAgICAgXCJuYW1lXCI6IFwiUHJvZi4gU2hyZXlhIEdhbmFrYVwiLFxuICAgICAgXCJlbWFpbFwiOiBcImdhbmFrYV9zaHJleWFfcHJvZkBsYWJhZGllLm5ldFwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk0OSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45NDkrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAyOCxcbiAgICAgIFwibmFtZVwiOiBcIlZhcmFsYWtzaG1pIEtoYXRyaVwiLFxuICAgICAgXCJlbWFpbFwiOiBcInZhcmFsYWtzaG1pX2toYXRyaUBhYnNoaXJlLWxhbmcuaW9cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJJbmFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45NTIrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTUyKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMjksXG4gICAgICBcIm5hbWVcIjogXCJEZXZpIEFobHV3YWxpYVwiLFxuICAgICAgXCJlbWFpbFwiOiBcImFobHV3YWxpYV9kZXZpQHdlc3QuYml6XCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTcxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA0Ljk3MSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDMwLFxuICAgICAgXCJuYW1lXCI6IFwiUHVydXNob3R0YW0gTmFtYmVlc2FuXCIsXG4gICAgICBcImVtYWlsXCI6IFwicHVydXNob3R0YW1fbmFtYmVlc2FuQGJhc2hpcmlhbi16dWxhdWYuaW5mb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNC45OTkrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDQuOTk5KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzEsXG4gICAgICBcIm5hbWVcIjogXCJBcHNhcmEgU29tYXlhamlcIixcbiAgICAgIFwiZW1haWxcIjogXCJhcHNhcmFfc29tYXlhamlAcmF0a2UuY29tXCIsXG4gICAgICBcImdlbmRlclwiOiBcIkZlbWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDI0KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjAyNCswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDMyLFxuICAgICAgXCJuYW1lXCI6IFwiRWVrYWxhYnlhIE1lbm9uXCIsXG4gICAgICBcImVtYWlsXCI6IFwiZWVrYWxhYnlhX21lbm9uQHNpcGVzLWFuZGVyc29uLm5ldFwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNDErMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDQxKzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzQsXG4gICAgICBcIm5hbWVcIjogXCJVdHRhbSBEaGF3YW4gUmV0LlwiLFxuICAgICAgXCJlbWFpbFwiOiBcInV0dGFtX3JldF9kaGF3YW5AbWF5ZXIubmFtZVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJGZW1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjA1NyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNTcrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAzNSxcbiAgICAgIFwibmFtZVwiOiBcIk1pc3MgU3VqYXRhIFNvbWF5YWppXCIsXG4gICAgICBcImVtYWlsXCI6IFwic3VqYXRhX21pc3Nfc29tYXlhamlAZ3JhaGFtLWZ1bmsub3JnXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjA3NSswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wNzUrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAzNixcbiAgICAgIFwibmFtZVwiOiBcIlNhcmxhIFBhdGlsIFZNXCIsXG4gICAgICBcImVtYWlsXCI6IFwic2FybGFfdm1fcGF0aWxAaGlsbHMtZG9ubmVsbHkuYml6XCIsXG4gICAgICBcImdlbmRlclwiOiBcIkZlbWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJJbmFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4wOTYrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMDk2KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzcsXG4gICAgICBcIm5hbWVcIjogXCJBYW5hbmRpbmlpIEFodWphXCIsXG4gICAgICBcImVtYWlsXCI6IFwiYWh1amFfYWFuYW5kaW5paUBndXNpa293c2tpLm5hbWVcIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiRmVtYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xMTUrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTE1KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogMzgsXG4gICAgICBcIm5hbWVcIjogXCJBbnVqYSBHYW5kaGlcIixcbiAgICAgIFwiZW1haWxcIjogXCJhbnVqYV9nYW5kaGlAYmFocmluZ2VyLWF1ZXIuY29tXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjEzMyswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xMzMrMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiAzOSxcbiAgICAgIFwibmFtZVwiOiBcIkhpbWFkcmkgTmVocnVcIixcbiAgICAgIFwiZW1haWxcIjogXCJoaW1hZHJpX25laHJ1QGJhc2hpcmlhbi5pb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE0MCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xNDArMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA0MCxcbiAgICAgIFwibmFtZVwiOiBcIk1zLiBNdXJwaHkgUXVpdHpvblwiLFxuICAgICAgXCJlbWFpbFwiOiBcIlNhbWlyLkxvd2VAZ21haWwuY29tXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiQWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE1NiswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwODozNjoyNS42MTArMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA0MSxcbiAgICAgIFwibmFtZVwiOiBcIk1pc3MgQWJhbmkgTWFsaWtcIixcbiAgICAgIFwiZW1haWxcIjogXCJtYWxpa19taXNzX2FiYW5pQGdveWV0dGUuaW9cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTY3KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE2NyswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDQyLFxuICAgICAgXCJuYW1lXCI6IFwiU2hha3RpIEFkaWdhXCIsXG4gICAgICBcImVtYWlsXCI6IFwic2hha3RpX2FkaWdhQHd1Y2tlcnQuY29cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiTWFsZVwiLFxuICAgICAgXCJzdGF0dXNcIjogXCJBY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTcxKzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE3MSswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDQzLFxuICAgICAgXCJuYW1lXCI6IFwiR3VyZGV2IEJhbmRvcGFkaHlheVwiLFxuICAgICAgXCJlbWFpbFwiOiBcImJhbmRvcGFkaHlheV9ndXJkZXZAY29sbGlucy5jb1wiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjE4MCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xODArMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA0NCxcbiAgICAgIFwibmFtZVwiOiBcIlN1bml0YSBHYW5ha2FcIixcbiAgICAgIFwiZW1haWxcIjogXCJnYW5ha2Ffc3VuaXRhQHZvbGttYW4ubmFtZVwiLFxuICAgICAgXCJnZW5kZXJcIjogXCJNYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4xODcrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMTg3KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogNDUsXG4gICAgICBcIm5hbWVcIjogXCJTb21uYXRoIEFodWphXCIsXG4gICAgICBcImVtYWlsXCI6IFwiYWh1amFfc29tbmF0aEBndXRrb3dza2kta2F1dHplci5vcmdcIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiRmVtYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkFjdGl2ZVwiLFxuICAgICAgXCJjcmVhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMDQrMDU6MzBcIixcbiAgICAgIFwidXBkYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjA0KzA1OjMwXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaWRcIjogNDYsXG4gICAgICBcIm5hbWVcIjogXCJBbWIuIERyb25hIEFyb3JhXCIsXG4gICAgICBcImVtYWlsXCI6IFwiYW1iX2Fyb3JhX2Ryb25hQHJhdGguY29cIixcbiAgICAgIFwiZ2VuZGVyXCI6IFwiRmVtYWxlXCIsXG4gICAgICBcInN0YXR1c1wiOiBcIkluYWN0aXZlXCIsXG4gICAgICBcImNyZWF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjIxMCswNTozMFwiLFxuICAgICAgXCJ1cGRhdGVkX2F0XCI6IFwiMjAyMC0xMC0yMVQwMzo1MDowNS4yMTArMDU6MzBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJpZFwiOiA0NyxcbiAgICAgIFwibmFtZVwiOiBcIkZyLiBUYXJhIERlc2hwYW5kZVwiLFxuICAgICAgXCJlbWFpbFwiOiBcInRhcmFfZnJfZGVzaHBhbmRlQGhvd2UuY29tXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjE4KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjIxOCswNTozMFwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImlkXCI6IDQ4LFxuICAgICAgXCJuYW1lXCI6IFwiTWVuYWthIEthdWwgRXNxLlwiLFxuICAgICAgXCJlbWFpbFwiOiBcImthdWxfbWVuYWthX2VzcUBzbWl0aC5pbmZvXCIsXG4gICAgICBcImdlbmRlclwiOiBcIk1hbGVcIixcbiAgICAgIFwic3RhdHVzXCI6IFwiSW5hY3RpdmVcIixcbiAgICAgIFwiY3JlYXRlZF9hdFwiOiBcIjIwMjAtMTAtMjFUMDM6NTA6MDUuMjQ2KzA1OjMwXCIsXG4gICAgICBcInVwZGF0ZWRfYXRcIjogXCIyMDIwLTEwLTIxVDAzOjUwOjA1LjI0NiswNTozMFwiXG4gICAgfVxuICBdXG59XG4iLCJpbXBvcnQgY29tbWVudHMgZnJvbSBcIi4vZGF0YS9jb21tZW50cy5qc29uXCI7XG5pbXBvcnQgcG9zdHMgZnJvbSAnLi9kYXRhL3Bvc3RzLmpzb24nO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vZGF0YS91c2Vycy5qc29uJztcblxuY29tbWVudHMucmVwbztcbnBvc3RzLnJlcG87XG51c2Vycy5yZXBvO1xuXG5jb25zdCBnZW5lcmF0ZURlbGF5VGltZSA9ICgpID0+IE1hdGgucmFuZG9tKCkgKiAxNTAwICsgMTAwO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tbWVudHMgPSAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGNvbW1lbnRzKSwgZ2VuZXJhdGVEZWxheVRpbWUoKSkpO1xuZXhwb3J0IGNvbnN0IGdldFBvc3RzID0gKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShwb3N0cyksIGdlbmVyYXRlRGVsYXlUaW1lKCkpKTtcbmV4cG9ydCBjb25zdCBnZXRVc2VycyA9ICgpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUodXNlcnMpLCBnZW5lcmF0ZURlbGF5VGltZSgpKSk7XG4iLCJpbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBtYXAsIHJlZHVjZSwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0Q29tbWVudHMsIGdldFBvc3RzLCBnZXRVc2VycyB9IGZyb20gJy4vaW5kZXgnXG5cbmNvbnN0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpO1xuXG5sZXQgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xubGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbmxldCBsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2wyJyk7XG5sZXQgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xubGV0IGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbDMnKTtcblxuY29uc3QgZ2V0UG9zdFN1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuXG5cbmdldFBvc3RzKCkudGhlbigocmVzcG9uc2U6IGFueSkgPT4ge1xuICBsZXQgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gIGRhdGEuZXZlcnkoKHBvc3Q6IGFueSkgPT4ge1xuICAgIGxldCBwb3N0SWQ6IGFueSA9IHBvc3QuaWQ7XG5cbiAgICBnZXRDb21tZW50cygpLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIGxldCBjb21tZW50cyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICBjb21tZW50cy5ldmVyeSgoY29tbWVudDogYW55KSA9PiB7XG4gICAgICAgIGxldCBwb3N0Q29tbWVudElkOiBhbnkgPSBjb21tZW50LnBvc3RJZDtcbiAgICAgICAgbGV0IHBvc3RDb21tZW50VXNlcklkID0gY29tbWVudC51c2VySWQ7XG5cbiAgICAgICAgLy9jb21tZW50cy5waXBlKGZpbHRlcihldiA9PiBwb3N0Q29tbWVudElkID09PSBwb3N0SWQpKTtcblxuICAgICAgICBnZXRVc2VycygpLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdXNlcnMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgIHVzZXJzLmV2ZXJ5KCh1c2VyKTogYW55ID0+IHtcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgLy8gdXNlcnMucGlwZShmaWx0ZXIoZXYgPT4gdXNlcklkID09PSBwb3N0Q29tbWVudFVzZXJJZCkpO1xuICAgICAgICAgICAgLy8gdXNlcnMuc3Vic2NyaWJlKHVzZXJJZCA9PiBjb25zb2xlLmxvZyhcInVzZXJJZDpcIiwgdXNlcklkKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBwYWludChyZXNwb25zZSk7XG59KTtcblxuZnVuY3Rpb24gcGFpbnQoZmVlZDogYW55KSB7XG4gIGNvbnNvbGUubG9nKCdwYWludCcpO1xuXG4gIGxldCBwb3N0cyA9IG5ldyBBcnJheShmZWVkLmRhdGFbMF0pO1xuXG4gIC8vY29uc29sZS5sb2cocG9zdHMpO1xuXG4gIHBvc3RzLmV2ZXJ5KHBvc3QgPT4ge1xuICAgIC8vIHBvc3QuZXZlcnkoaXRlbSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlNpbmdsZTogXCIgKyBwb3N0KTtcbiAgICAgIGRpdi50ZXh0Q29udGVudCA9IFwiQmlnIFRpdGxlOiA6XCIgKyBwb3N0LnRpdGxlO1xuICAgICAgXG4gICAgICAvLyBwb3N0cy5ldmVyeShjb21tZW50ID0+IHtcbiAgICAgIGxpLnRleHRDb250ZW50ID0gKCdJZDogOicgKyBwb3N0LmlkICsgJ1RpdGxlIDonICsgcG9zdC50aXRsZSArICdCb2R5OicgKyBwb3N0LmJvZHkpO1xuICAgICAgLy8gcG9zdHMuZXZlcnkodXNlciA9PiB7XG4gICAgICAvLyAgIGxpLnRleHRDb250ZW50LmNvbmNhdCgndXNlcklkOiAnICsgdXNlci5pZCk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodWwpLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gfSk7XG4gICAgfSk7XG4gIC8vIH0pO1xufTtcbiJdfQ==
