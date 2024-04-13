(() => {
  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/errors.js
  var ErrorHandler = class {
    constructor() {
      this.listeners = [];
      this.unexpectedErrorHandler = function(e) {
        setTimeout(() => {
          if (e.stack) {
            throw new Error(e.message + "\n\n" + e.stack);
          }
          throw e;
        }, 0);
      };
    }
    emit(e) {
      this.listeners.forEach((listener) => {
        listener(e);
      });
    }
    onUnexpectedError(e) {
      this.unexpectedErrorHandler(e);
      this.emit(e);
    }
    onUnexpectedExternalError(e) {
      this.unexpectedErrorHandler(e);
    }
  };
  var errorHandler = new ErrorHandler();
  function onUnexpectedError(e) {
    if (!isPromiseCanceledError(e)) {
      errorHandler.onUnexpectedError(e);
    }
    return void 0;
  }
  function transformErrorForSerialization(error) {
    if (error instanceof Error) {
      let {name, message} = error;
      const stack = error.stacktrace || error.stack;
      return {
        $isError: true,
        name,
        message,
        stack
      };
    }
    return error;
  }
  var canceledName = "Canceled";
  function isPromiseCanceledError(error) {
    return error instanceof Error && error.name === canceledName && error.message === canceledName;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/functional.js
  function once(fn) {
    const _this = this;
    let didCall = false;
    let result;
    return function() {
      if (didCall) {
        return result;
      }
      didCall = true;
      result = fn.apply(_this, arguments);
      return result;
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/iterator.js
  var Iterable;
  (function(Iterable2) {
    function is(thing) {
      return thing && typeof thing === "object" && typeof thing[Symbol.iterator] === "function";
    }
    Iterable2.is = is;
    const _empty2 = Object.freeze([]);
    function empty() {
      return _empty2;
    }
    Iterable2.empty = empty;
    function* single(element) {
      yield element;
    }
    Iterable2.single = single;
    function from(iterable) {
      return iterable || _empty2;
    }
    Iterable2.from = from;
    function isEmpty(iterable) {
      return !iterable || iterable[Symbol.iterator]().next().done === true;
    }
    Iterable2.isEmpty = isEmpty;
    function first(iterable) {
      return iterable[Symbol.iterator]().next().value;
    }
    Iterable2.first = first;
    function some(iterable, predicate) {
      for (const element of iterable) {
        if (predicate(element)) {
          return true;
        }
      }
      return false;
    }
    Iterable2.some = some;
    function find(iterable, predicate) {
      for (const element of iterable) {
        if (predicate(element)) {
          return element;
        }
      }
      return void 0;
    }
    Iterable2.find = find;
    function* filter(iterable, predicate) {
      for (const element of iterable) {
        if (predicate(element)) {
          yield element;
        }
      }
    }
    Iterable2.filter = filter;
    function* map(iterable, fn) {
      let index = 0;
      for (const element of iterable) {
        yield fn(element, index++);
      }
    }
    Iterable2.map = map;
    function* concat(...iterables) {
      for (const iterable of iterables) {
        for (const element of iterable) {
          yield element;
        }
      }
    }
    Iterable2.concat = concat;
    function* concatNested(iterables) {
      for (const iterable of iterables) {
        for (const element of iterable) {
          yield element;
        }
      }
    }
    Iterable2.concatNested = concatNested;
    function reduce(iterable, reducer, initialValue) {
      let value = initialValue;
      for (const element of iterable) {
        value = reducer(value, element);
      }
      return value;
    }
    Iterable2.reduce = reduce;
    function* slice(arr, from2, to = arr.length) {
      if (from2 < 0) {
        from2 += arr.length;
      }
      if (to < 0) {
        to += arr.length;
      } else if (to > arr.length) {
        to = arr.length;
      }
      for (; from2 < to; from2++) {
        yield arr[from2];
      }
    }
    Iterable2.slice = slice;
    function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
      const consumed = [];
      if (atMost === 0) {
        return [consumed, iterable];
      }
      const iterator = iterable[Symbol.iterator]();
      for (let i = 0; i < atMost; i++) {
        const next = iterator.next();
        if (next.done) {
          return [consumed, Iterable2.empty()];
        }
        consumed.push(next.value);
      }
      return [consumed, {[Symbol.iterator]() {
        return iterator;
      }}];
    }
    Iterable2.consume = consume;
    function equals(a, b, comparator = (at, bt) => at === bt) {
      const ai = a[Symbol.iterator]();
      const bi = b[Symbol.iterator]();
      while (true) {
        const an = ai.next();
        const bn = bi.next();
        if (an.done !== bn.done) {
          return false;
        } else if (an.done) {
          return true;
        } else if (!comparator(an.value, bn.value)) {
          return false;
        }
      }
    }
    Iterable2.equals = equals;
  })(Iterable || (Iterable = {}));

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/lifecycle.js
  var TRACK_DISPOSABLES = false;
  var disposableTracker = null;
  function setDisposableTracker(tracker) {
    disposableTracker = tracker;
  }
  if (TRACK_DISPOSABLES) {
    const __is_disposable_tracked__ = "__is_disposable_tracked__";
    setDisposableTracker(new class {
      trackDisposable(x) {
        const stack = new Error("Potentially leaked disposable").stack;
        setTimeout(() => {
          if (!x[__is_disposable_tracked__]) {
            console.log(stack);
          }
        }, 3e3);
      }
      setParent(child, parent) {
        if (child && child !== Disposable.None) {
          try {
            child[__is_disposable_tracked__] = true;
          } catch (_a3) {
          }
        }
      }
      markAsDisposed(disposable) {
        if (disposable && disposable !== Disposable.None) {
          try {
            disposable[__is_disposable_tracked__] = true;
          } catch (_a3) {
          }
        }
      }
      markAsSingleton(disposable) {
      }
    }());
  }
  function trackDisposable(x) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.trackDisposable(x);
    return x;
  }
  function markAsDisposed(disposable) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.markAsDisposed(disposable);
  }
  function setParentOfDisposable(child, parent) {
    disposableTracker === null || disposableTracker === void 0 ? void 0 : disposableTracker.setParent(child, parent);
  }
  function setParentOfDisposables(children, parent) {
    if (!disposableTracker) {
      return;
    }
    for (const child of children) {
      disposableTracker.setParent(child, parent);
    }
  }
  var MultiDisposeError = class extends Error {
    constructor(errors) {
      super(`Encountered errors while disposing of store. Errors: [${errors.join(", ")}]`);
      this.errors = errors;
    }
  };
  function dispose(arg) {
    if (Iterable.is(arg)) {
      let errors = [];
      for (const d of arg) {
        if (d) {
          try {
            d.dispose();
          } catch (e) {
            errors.push(e);
          }
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else if (errors.length > 1) {
        throw new MultiDisposeError(errors);
      }
      return Array.isArray(arg) ? [] : arg;
    } else if (arg) {
      arg.dispose();
      return arg;
    }
  }
  function combinedDisposable(...disposables) {
    const parent = toDisposable(() => dispose(disposables));
    setParentOfDisposables(disposables, parent);
    return parent;
  }
  function toDisposable(fn) {
    const self2 = trackDisposable({
      dispose: once(() => {
        markAsDisposed(self2);
        fn();
      })
    });
    return self2;
  }
  var DisposableStore = class {
    constructor() {
      this._toDispose = new Set();
      this._isDisposed = false;
      trackDisposable(this);
    }
    dispose() {
      if (this._isDisposed) {
        return;
      }
      markAsDisposed(this);
      this._isDisposed = true;
      this.clear();
    }
    clear() {
      try {
        dispose(this._toDispose.values());
      } finally {
        this._toDispose.clear();
      }
    }
    add(o) {
      if (!o) {
        return o;
      }
      if (o === this) {
        throw new Error("Cannot register a disposable on itself!");
      }
      setParentOfDisposable(o, this);
      if (this._isDisposed) {
        if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
          console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack);
        }
      } else {
        this._toDispose.add(o);
      }
      return o;
    }
  };
  DisposableStore.DISABLE_DISPOSED_WARNING = false;
  var Disposable = class {
    constructor() {
      this._store = new DisposableStore();
      trackDisposable(this);
      setParentOfDisposable(this._store, this);
    }
    dispose() {
      markAsDisposed(this);
      this._store.dispose();
    }
    _register(o) {
      if (o === this) {
        throw new Error("Cannot register a disposable on itself!");
      }
      return this._store.add(o);
    }
  };
  Disposable.None = Object.freeze({dispose() {
  }});

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/platform.js
  var _a;
  var LANGUAGE_DEFAULT = "en";
  var _isWindows = false;
  var _isMacintosh = false;
  var _isLinux = false;
  var _isLinuxSnap = false;
  var _isNative = false;
  var _isWeb = false;
  var _isIOS = false;
  var _locale = void 0;
  var _language = LANGUAGE_DEFAULT;
  var _translationsConfigFile = void 0;
  var _userAgent = void 0;
  var globals = typeof self === "object" ? self : typeof global === "object" ? global : {};
  var nodeProcess = void 0;
  if (typeof globals.vscode !== "undefined" && typeof globals.vscode.process !== "undefined") {
    nodeProcess = globals.vscode.process;
  } else if (typeof process !== "undefined") {
    nodeProcess = process;
  }
  var isElectronRenderer = typeof ((_a = nodeProcess === null || nodeProcess === void 0 ? void 0 : nodeProcess.versions) === null || _a === void 0 ? void 0 : _a.electron) === "string" && nodeProcess.type === "renderer";
  if (typeof navigator === "object" && !isElectronRenderer) {
    _userAgent = navigator.userAgent;
    _isWindows = _userAgent.indexOf("Windows") >= 0;
    _isMacintosh = _userAgent.indexOf("Macintosh") >= 0;
    _isIOS = (_userAgent.indexOf("Macintosh") >= 0 || _userAgent.indexOf("iPad") >= 0 || _userAgent.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    _isLinux = _userAgent.indexOf("Linux") >= 0;
    _isWeb = true;
    _locale = navigator.language;
    _language = _locale;
  } else if (typeof nodeProcess === "object") {
    _isWindows = nodeProcess.platform === "win32";
    _isMacintosh = nodeProcess.platform === "darwin";
    _isLinux = nodeProcess.platform === "linux";
    _isLinuxSnap = _isLinux && !!nodeProcess.env["SNAP"] && !!nodeProcess.env["SNAP_REVISION"];
    _locale = LANGUAGE_DEFAULT;
    _language = LANGUAGE_DEFAULT;
    const rawNlsConfig = nodeProcess.env["VSCODE_NLS_CONFIG"];
    if (rawNlsConfig) {
      try {
        const nlsConfig = JSON.parse(rawNlsConfig);
        const resolved = nlsConfig.availableLanguages["*"];
        _locale = nlsConfig.locale;
        _language = resolved ? resolved : LANGUAGE_DEFAULT;
        _translationsConfigFile = nlsConfig._translationsConfigFile;
      } catch (e) {
      }
    }
    _isNative = true;
  } else {
    console.error("Unable to resolve platform.");
  }
  var _platform = 0;
  if (_isMacintosh) {
    _platform = 1;
  } else if (_isWindows) {
    _platform = 3;
  } else if (_isLinux) {
    _platform = 2;
  }
  var isWindows = _isWindows;
  var isMacintosh = _isMacintosh;
  var setImmediate = function defineSetImmediate() {
    if (globals.setImmediate) {
      return globals.setImmediate.bind(globals);
    }
    if (typeof globals.postMessage === "function" && !globals.importScripts) {
      let pending = [];
      globals.addEventListener("message", (e) => {
        if (e.data && e.data.vscodeSetImmediateId) {
          for (let i = 0, len = pending.length; i < len; i++) {
            const candidate = pending[i];
            if (candidate.id === e.data.vscodeSetImmediateId) {
              pending.splice(i, 1);
              candidate.callback();
              return;
            }
          }
        }
      });
      let lastId = 0;
      return (callback) => {
        const myId = ++lastId;
        pending.push({
          id: myId,
          callback
        });
        globals.postMessage({vscodeSetImmediateId: myId}, "*");
      };
    }
    if (typeof (nodeProcess === null || nodeProcess === void 0 ? void 0 : nodeProcess.nextTick) === "function") {
      return nodeProcess.nextTick.bind(nodeProcess);
    }
    const _promise = Promise.resolve();
    return (callback) => _promise.then(callback);
  }();

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/types.js
  function getAllPropertyNames(obj) {
    let res = [];
    let proto = Object.getPrototypeOf(obj);
    while (Object.prototype !== proto) {
      res = res.concat(Object.getOwnPropertyNames(proto));
      proto = Object.getPrototypeOf(proto);
    }
    return res;
  }
  function getAllMethodNames(obj) {
    const methods = [];
    for (const prop of getAllPropertyNames(obj)) {
      if (typeof obj[prop] === "function") {
        methods.push(prop);
      }
    }
    return methods;
  }
  function createProxyObject(methodNames, invoke) {
    const createProxyMethod = (method) => {
      return function() {
        const args = Array.prototype.slice.call(arguments, 0);
        return invoke(method, args);
      };
    };
    let result = {};
    for (const methodName of methodNames) {
      result[methodName] = createProxyMethod(methodName);
    }
    return result;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/worker/simpleWorker.js
  var INITIALIZE = "$initialize";
  var SimpleWorkerProtocol = class {
    constructor(handler) {
      this._workerId = -1;
      this._handler = handler;
      this._lastSentReq = 0;
      this._pendingReplies = Object.create(null);
    }
    setWorkerId(workerId) {
      this._workerId = workerId;
    }
    sendMessage(method, args) {
      let req = String(++this._lastSentReq);
      return new Promise((resolve2, reject) => {
        this._pendingReplies[req] = {
          resolve: resolve2,
          reject
        };
        this._send({
          vsWorker: this._workerId,
          req,
          method,
          args
        });
      });
    }
    handleMessage(message) {
      if (!message || !message.vsWorker) {
        return;
      }
      if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
        return;
      }
      this._handleMessage(message);
    }
    _handleMessage(msg) {
      if (msg.seq) {
        let replyMessage = msg;
        if (!this._pendingReplies[replyMessage.seq]) {
          console.warn("Got reply to unknown seq");
          return;
        }
        let reply = this._pendingReplies[replyMessage.seq];
        delete this._pendingReplies[replyMessage.seq];
        if (replyMessage.err) {
          let err = replyMessage.err;
          if (replyMessage.err.$isError) {
            err = new Error();
            err.name = replyMessage.err.name;
            err.message = replyMessage.err.message;
            err.stack = replyMessage.err.stack;
          }
          reply.reject(err);
          return;
        }
        reply.resolve(replyMessage.res);
        return;
      }
      let requestMessage = msg;
      let req = requestMessage.req;
      let result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
      result.then((r) => {
        this._send({
          vsWorker: this._workerId,
          seq: req,
          res: r,
          err: void 0
        });
      }, (e) => {
        if (e.detail instanceof Error) {
          e.detail = transformErrorForSerialization(e.detail);
        }
        this._send({
          vsWorker: this._workerId,
          seq: req,
          res: void 0,
          err: transformErrorForSerialization(e)
        });
      });
    }
    _send(msg) {
      let transfer = [];
      if (msg.req) {
        const m = msg;
        for (let i = 0; i < m.args.length; i++) {
          if (m.args[i] instanceof ArrayBuffer) {
            transfer.push(m.args[i]);
          }
        }
      } else {
        const m = msg;
        if (m.res instanceof ArrayBuffer) {
          transfer.push(m.res);
        }
      }
      this._handler.sendMessage(msg, transfer);
    }
  };
  var SimpleWorkerServer = class {
    constructor(postMessage, requestHandlerFactory) {
      this._requestHandlerFactory = requestHandlerFactory;
      this._requestHandler = null;
      this._protocol = new SimpleWorkerProtocol({
        sendMessage: (msg, transfer) => {
          postMessage(msg, transfer);
        },
        handleMessage: (method, args) => this._handleMessage(method, args)
      });
    }
    onmessage(msg) {
      this._protocol.handleMessage(msg);
    }
    _handleMessage(method, args) {
      if (method === INITIALIZE) {
        return this.initialize(args[0], args[1], args[2], args[3]);
      }
      if (!this._requestHandler || typeof this._requestHandler[method] !== "function") {
        return Promise.reject(new Error("Missing requestHandler or method: " + method));
      }
      try {
        return Promise.resolve(this._requestHandler[method].apply(this._requestHandler, args));
      } catch (e) {
        return Promise.reject(e);
      }
    }
    initialize(workerId, loaderConfig, moduleId, hostMethods) {
      this._protocol.setWorkerId(workerId);
      const proxyMethodRequest = (method, args) => {
        return this._protocol.sendMessage(method, args);
      };
      const hostProxy = createProxyObject(hostMethods, proxyMethodRequest);
      if (this._requestHandlerFactory) {
        this._requestHandler = this._requestHandlerFactory(hostProxy);
        return Promise.resolve(getAllMethodNames(this._requestHandler));
      }
      if (loaderConfig) {
        if (typeof loaderConfig.baseUrl !== "undefined") {
          delete loaderConfig["baseUrl"];
        }
        if (typeof loaderConfig.paths !== "undefined") {
          if (typeof loaderConfig.paths.vs !== "undefined") {
            delete loaderConfig.paths["vs"];
          }
        }
        if (typeof loaderConfig.trustedTypesPolicy !== void 0) {
          delete loaderConfig["trustedTypesPolicy"];
        }
        loaderConfig.catchError = true;
        self.require.config(loaderConfig);
      }
      return new Promise((resolve2, reject) => {
        self.require([moduleId], (module) => {
          this._requestHandler = module.create(hostProxy);
          if (!this._requestHandler) {
            reject(new Error(`No RequestHandler!`));
            return;
          }
          resolve2(getAllMethodNames(this._requestHandler));
        }, reject);
      });
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/diff/diffChange.js
  var DiffChange = class {
    constructor(originalStart, originalLength, modifiedStart, modifiedLength) {
      this.originalStart = originalStart;
      this.originalLength = originalLength;
      this.modifiedStart = modifiedStart;
      this.modifiedLength = modifiedLength;
    }
    getOriginalEnd() {
      return this.originalStart + this.originalLength;
    }
    getModifiedEnd() {
      return this.modifiedStart + this.modifiedLength;
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/strings.js
  function splitLines(str) {
    return str.split(/\r\n|\r|\n/);
  }
  function firstNonWhitespaceIndex(str) {
    for (let i = 0, len = str.length; i < len; i++) {
      const chCode = str.charCodeAt(i);
      if (chCode !== 32 && chCode !== 9) {
        return i;
      }
    }
    return -1;
  }
  function lastNonWhitespaceIndex(str, startIndex = str.length - 1) {
    for (let i = startIndex; i >= 0; i--) {
      const chCode = str.charCodeAt(i);
      if (chCode !== 32 && chCode !== 9) {
        return i;
      }
    }
    return -1;
  }
  function isHighSurrogate(charCode) {
    return 55296 <= charCode && charCode <= 56319;
  }
  function isLowSurrogate(charCode) {
    return 56320 <= charCode && charCode <= 57343;
  }
  function computeCodePoint(highSurrogate, lowSurrogate) {
    return (highSurrogate - 55296 << 10) + (lowSurrogate - 56320) + 65536;
  }
  var UTF8_BOM_CHARACTER = String.fromCharCode(65279);
  var GraphemeBreakTree = class {
    constructor() {
      this._data = getGraphemeBreakRawData();
    }
    static getInstance() {
      if (!GraphemeBreakTree._INSTANCE) {
        GraphemeBreakTree._INSTANCE = new GraphemeBreakTree();
      }
      return GraphemeBreakTree._INSTANCE;
    }
    getGraphemeBreakType(codePoint) {
      if (codePoint < 32) {
        if (codePoint === 10) {
          return 3;
        }
        if (codePoint === 13) {
          return 2;
        }
        return 4;
      }
      if (codePoint < 127) {
        return 0;
      }
      const data = this._data;
      const nodeCount = data.length / 3;
      let nodeIndex = 1;
      while (nodeIndex <= nodeCount) {
        if (codePoint < data[3 * nodeIndex]) {
          nodeIndex = 2 * nodeIndex;
        } else if (codePoint > data[3 * nodeIndex + 1]) {
          nodeIndex = 2 * nodeIndex + 1;
        } else {
          return data[3 * nodeIndex + 2];
        }
      }
      return 0;
    }
  };
  GraphemeBreakTree._INSTANCE = null;
  function getGraphemeBreakRawData() {
    return JSON.parse("[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]");
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/hash.js
  function numberHash(val, initialHashVal) {
    return (initialHashVal << 5) - initialHashVal + val | 0;
  }
  function stringHash(s, hashVal) {
    hashVal = numberHash(149417, hashVal);
    for (let i = 0, length = s.length; i < length; i++) {
      hashVal = numberHash(s.charCodeAt(i), hashVal);
    }
    return hashVal;
  }
  function leftRotate(value, bits, totalBits = 32) {
    const delta = totalBits - bits;
    const mask = ~((1 << delta) - 1);
    return (value << bits | (mask & value) >>> delta) >>> 0;
  }
  function fill(dest, index = 0, count = dest.byteLength, value = 0) {
    for (let i = 0; i < count; i++) {
      dest[index + i] = value;
    }
  }
  function leftPad(value, length, char = "0") {
    while (value.length < length) {
      value = char + value;
    }
    return value;
  }
  function toHexString(bufferOrValue, bitsize = 32) {
    if (bufferOrValue instanceof ArrayBuffer) {
      return Array.from(new Uint8Array(bufferOrValue)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    return leftPad((bufferOrValue >>> 0).toString(16), bitsize / 4);
  }
  var StringSHA1 = class {
    constructor() {
      this._h0 = 1732584193;
      this._h1 = 4023233417;
      this._h2 = 2562383102;
      this._h3 = 271733878;
      this._h4 = 3285377520;
      this._buff = new Uint8Array(64 + 3);
      this._buffDV = new DataView(this._buff.buffer);
      this._buffLen = 0;
      this._totalLen = 0;
      this._leftoverHighSurrogate = 0;
      this._finished = false;
    }
    update(str) {
      const strLen = str.length;
      if (strLen === 0) {
        return;
      }
      const buff = this._buff;
      let buffLen = this._buffLen;
      let leftoverHighSurrogate = this._leftoverHighSurrogate;
      let charCode;
      let offset;
      if (leftoverHighSurrogate !== 0) {
        charCode = leftoverHighSurrogate;
        offset = -1;
        leftoverHighSurrogate = 0;
      } else {
        charCode = str.charCodeAt(0);
        offset = 0;
      }
      while (true) {
        let codePoint = charCode;
        if (isHighSurrogate(charCode)) {
          if (offset + 1 < strLen) {
            const nextCharCode = str.charCodeAt(offset + 1);
            if (isLowSurrogate(nextCharCode)) {
              offset++;
              codePoint = computeCodePoint(charCode, nextCharCode);
            } else {
              codePoint = 65533;
            }
          } else {
            leftoverHighSurrogate = charCode;
            break;
          }
        } else if (isLowSurrogate(charCode)) {
          codePoint = 65533;
        }
        buffLen = this._push(buff, buffLen, codePoint);
        offset++;
        if (offset < strLen) {
          charCode = str.charCodeAt(offset);
        } else {
          break;
        }
      }
      this._buffLen = buffLen;
      this._leftoverHighSurrogate = leftoverHighSurrogate;
    }
    _push(buff, buffLen, codePoint) {
      if (codePoint < 128) {
        buff[buffLen++] = codePoint;
      } else if (codePoint < 2048) {
        buff[buffLen++] = 192 | (codePoint & 1984) >>> 6;
        buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
      } else if (codePoint < 65536) {
        buff[buffLen++] = 224 | (codePoint & 61440) >>> 12;
        buff[buffLen++] = 128 | (codePoint & 4032) >>> 6;
        buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
      } else {
        buff[buffLen++] = 240 | (codePoint & 1835008) >>> 18;
        buff[buffLen++] = 128 | (codePoint & 258048) >>> 12;
        buff[buffLen++] = 128 | (codePoint & 4032) >>> 6;
        buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
      }
      if (buffLen >= 64) {
        this._step();
        buffLen -= 64;
        this._totalLen += 64;
        buff[0] = buff[64 + 0];
        buff[1] = buff[64 + 1];
        buff[2] = buff[64 + 2];
      }
      return buffLen;
    }
    digest() {
      if (!this._finished) {
        this._finished = true;
        if (this._leftoverHighSurrogate) {
          this._leftoverHighSurrogate = 0;
          this._buffLen = this._push(this._buff, this._buffLen, 65533);
        }
        this._totalLen += this._buffLen;
        this._wrapUp();
      }
      return toHexString(this._h0) + toHexString(this._h1) + toHexString(this._h2) + toHexString(this._h3) + toHexString(this._h4);
    }
    _wrapUp() {
      this._buff[this._buffLen++] = 128;
      fill(this._buff, this._buffLen);
      if (this._buffLen > 56) {
        this._step();
        fill(this._buff);
      }
      const ml = 8 * this._totalLen;
      this._buffDV.setUint32(56, Math.floor(ml / 4294967296), false);
      this._buffDV.setUint32(60, ml % 4294967296, false);
      this._step();
    }
    _step() {
      const bigBlock32 = StringSHA1._bigBlock32;
      const data = this._buffDV;
      for (let j = 0; j < 64; j += 4) {
        bigBlock32.setUint32(j, data.getUint32(j, false), false);
      }
      for (let j = 64; j < 320; j += 4) {
        bigBlock32.setUint32(j, leftRotate(bigBlock32.getUint32(j - 12, false) ^ bigBlock32.getUint32(j - 32, false) ^ bigBlock32.getUint32(j - 56, false) ^ bigBlock32.getUint32(j - 64, false), 1), false);
      }
      let a = this._h0;
      let b = this._h1;
      let c = this._h2;
      let d = this._h3;
      let e = this._h4;
      let f, k;
      let temp;
      for (let j = 0; j < 80; j++) {
        if (j < 20) {
          f = b & c | ~b & d;
          k = 1518500249;
        } else if (j < 40) {
          f = b ^ c ^ d;
          k = 1859775393;
        } else if (j < 60) {
          f = b & c | b & d | c & d;
          k = 2400959708;
        } else {
          f = b ^ c ^ d;
          k = 3395469782;
        }
        temp = leftRotate(a, 5) + f + e + k + bigBlock32.getUint32(j * 4, false) & 4294967295;
        e = d;
        d = c;
        c = leftRotate(b, 30);
        b = a;
        a = temp;
      }
      this._h0 = this._h0 + a & 4294967295;
      this._h1 = this._h1 + b & 4294967295;
      this._h2 = this._h2 + c & 4294967295;
      this._h3 = this._h3 + d & 4294967295;
      this._h4 = this._h4 + e & 4294967295;
    }
  };
  StringSHA1._bigBlock32 = new DataView(new ArrayBuffer(320));

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/diff/diff.js
  var StringDiffSequence = class {
    constructor(source) {
      this.source = source;
    }
    getElements() {
      const source = this.source;
      const characters = new Int32Array(source.length);
      for (let i = 0, len = source.length; i < len; i++) {
        characters[i] = source.charCodeAt(i);
      }
      return characters;
    }
  };
  function stringDiff(original, modified, pretty) {
    return new LcsDiff(new StringDiffSequence(original), new StringDiffSequence(modified)).ComputeDiff(pretty).changes;
  }
  var Debug = class {
    static Assert(condition, message) {
      if (!condition) {
        throw new Error(message);
      }
    }
  };
  var MyArray = class {
    static Copy(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
      for (let i = 0; i < length; i++) {
        destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
      }
    }
    static Copy2(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
      for (let i = 0; i < length; i++) {
        destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
      }
    }
  };
  var DiffChangeHelper = class {
    constructor() {
      this.m_changes = [];
      this.m_originalStart = 1073741824;
      this.m_modifiedStart = 1073741824;
      this.m_originalCount = 0;
      this.m_modifiedCount = 0;
    }
    MarkNextChange() {
      if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
        this.m_changes.push(new DiffChange(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount));
      }
      this.m_originalCount = 0;
      this.m_modifiedCount = 0;
      this.m_originalStart = 1073741824;
      this.m_modifiedStart = 1073741824;
    }
    AddOriginalElement(originalIndex, modifiedIndex) {
      this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
      this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
      this.m_originalCount++;
    }
    AddModifiedElement(originalIndex, modifiedIndex) {
      this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
      this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
      this.m_modifiedCount++;
    }
    getChanges() {
      if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
        this.MarkNextChange();
      }
      return this.m_changes;
    }
    getReverseChanges() {
      if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
        this.MarkNextChange();
      }
      this.m_changes.reverse();
      return this.m_changes;
    }
  };
  var LcsDiff = class {
    constructor(originalSequence, modifiedSequence, continueProcessingPredicate = null) {
      this.ContinueProcessingPredicate = continueProcessingPredicate;
      this._originalSequence = originalSequence;
      this._modifiedSequence = modifiedSequence;
      const [originalStringElements, originalElementsOrHash, originalHasStrings] = LcsDiff._getElements(originalSequence);
      const [modifiedStringElements, modifiedElementsOrHash, modifiedHasStrings] = LcsDiff._getElements(modifiedSequence);
      this._hasStrings = originalHasStrings && modifiedHasStrings;
      this._originalStringElements = originalStringElements;
      this._originalElementsOrHash = originalElementsOrHash;
      this._modifiedStringElements = modifiedStringElements;
      this._modifiedElementsOrHash = modifiedElementsOrHash;
      this.m_forwardHistory = [];
      this.m_reverseHistory = [];
    }
    static _isStringArray(arr) {
      return arr.length > 0 && typeof arr[0] === "string";
    }
    static _getElements(sequence) {
      const elements = sequence.getElements();
      if (LcsDiff._isStringArray(elements)) {
        const hashes = new Int32Array(elements.length);
        for (let i = 0, len = elements.length; i < len; i++) {
          hashes[i] = stringHash(elements[i], 0);
        }
        return [elements, hashes, true];
      }
      if (elements instanceof Int32Array) {
        return [[], elements, false];
      }
      return [[], new Int32Array(elements), false];
    }
    ElementsAreEqual(originalIndex, newIndex) {
      if (this._originalElementsOrHash[originalIndex] !== this._modifiedElementsOrHash[newIndex]) {
        return false;
      }
      return this._hasStrings ? this._originalStringElements[originalIndex] === this._modifiedStringElements[newIndex] : true;
    }
    ElementsAreStrictEqual(originalIndex, newIndex) {
      if (!this.ElementsAreEqual(originalIndex, newIndex)) {
        return false;
      }
      const originalElement = LcsDiff._getStrictElement(this._originalSequence, originalIndex);
      const modifiedElement = LcsDiff._getStrictElement(this._modifiedSequence, newIndex);
      return originalElement === modifiedElement;
    }
    static _getStrictElement(sequence, index) {
      if (typeof sequence.getStrictElement === "function") {
        return sequence.getStrictElement(index);
      }
      return null;
    }
    OriginalElementsAreEqual(index1, index2) {
      if (this._originalElementsOrHash[index1] !== this._originalElementsOrHash[index2]) {
        return false;
      }
      return this._hasStrings ? this._originalStringElements[index1] === this._originalStringElements[index2] : true;
    }
    ModifiedElementsAreEqual(index1, index2) {
      if (this._modifiedElementsOrHash[index1] !== this._modifiedElementsOrHash[index2]) {
        return false;
      }
      return this._hasStrings ? this._modifiedStringElements[index1] === this._modifiedStringElements[index2] : true;
    }
    ComputeDiff(pretty) {
      return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, pretty);
    }
    _ComputeDiff(originalStart, originalEnd, modifiedStart, modifiedEnd, pretty) {
      const quitEarlyArr = [false];
      let changes = this.ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr);
      if (pretty) {
        changes = this.PrettifyChanges(changes);
      }
      return {
        quitEarly: quitEarlyArr[0],
        changes
      };
    }
    ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr) {
      quitEarlyArr[0] = false;
      while (originalStart <= originalEnd && modifiedStart <= modifiedEnd && this.ElementsAreEqual(originalStart, modifiedStart)) {
        originalStart++;
        modifiedStart++;
      }
      while (originalEnd >= originalStart && modifiedEnd >= modifiedStart && this.ElementsAreEqual(originalEnd, modifiedEnd)) {
        originalEnd--;
        modifiedEnd--;
      }
      if (originalStart > originalEnd || modifiedStart > modifiedEnd) {
        let changes;
        if (modifiedStart <= modifiedEnd) {
          Debug.Assert(originalStart === originalEnd + 1, "originalStart should only be one more than originalEnd");
          changes = [
            new DiffChange(originalStart, 0, modifiedStart, modifiedEnd - modifiedStart + 1)
          ];
        } else if (originalStart <= originalEnd) {
          Debug.Assert(modifiedStart === modifiedEnd + 1, "modifiedStart should only be one more than modifiedEnd");
          changes = [
            new DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, 0)
          ];
        } else {
          Debug.Assert(originalStart === originalEnd + 1, "originalStart should only be one more than originalEnd");
          Debug.Assert(modifiedStart === modifiedEnd + 1, "modifiedStart should only be one more than modifiedEnd");
          changes = [];
        }
        return changes;
      }
      const midOriginalArr = [0];
      const midModifiedArr = [0];
      const result = this.ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr);
      const midOriginal = midOriginalArr[0];
      const midModified = midModifiedArr[0];
      if (result !== null) {
        return result;
      } else if (!quitEarlyArr[0]) {
        const leftChanges = this.ComputeDiffRecursive(originalStart, midOriginal, modifiedStart, midModified, quitEarlyArr);
        let rightChanges = [];
        if (!quitEarlyArr[0]) {
          rightChanges = this.ComputeDiffRecursive(midOriginal + 1, originalEnd, midModified + 1, modifiedEnd, quitEarlyArr);
        } else {
          rightChanges = [
            new DiffChange(midOriginal + 1, originalEnd - (midOriginal + 1) + 1, midModified + 1, modifiedEnd - (midModified + 1) + 1)
          ];
        }
        return this.ConcatenateChanges(leftChanges, rightChanges);
      }
      return [
        new DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
      ];
    }
    WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr) {
      let forwardChanges = null;
      let reverseChanges = null;
      let changeHelper = new DiffChangeHelper();
      let diagonalMin = diagonalForwardStart;
      let diagonalMax = diagonalForwardEnd;
      let diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalForwardOffset;
      let lastOriginalIndex = -1073741824;
      let historyIndex = this.m_forwardHistory.length - 1;
      do {
        const diagonal = diagonalRelative + diagonalForwardBase;
        if (diagonal === diagonalMin || diagonal < diagonalMax && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
          originalIndex = forwardPoints[diagonal + 1];
          modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
          if (originalIndex < lastOriginalIndex) {
            changeHelper.MarkNextChange();
          }
          lastOriginalIndex = originalIndex;
          changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex);
          diagonalRelative = diagonal + 1 - diagonalForwardBase;
        } else {
          originalIndex = forwardPoints[diagonal - 1] + 1;
          modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
          if (originalIndex < lastOriginalIndex) {
            changeHelper.MarkNextChange();
          }
          lastOriginalIndex = originalIndex - 1;
          changeHelper.AddOriginalElement(originalIndex, modifiedIndex + 1);
          diagonalRelative = diagonal - 1 - diagonalForwardBase;
        }
        if (historyIndex >= 0) {
          forwardPoints = this.m_forwardHistory[historyIndex];
          diagonalForwardBase = forwardPoints[0];
          diagonalMin = 1;
          diagonalMax = forwardPoints.length - 1;
        }
      } while (--historyIndex >= -1);
      forwardChanges = changeHelper.getReverseChanges();
      if (quitEarlyArr[0]) {
        let originalStartPoint = midOriginalArr[0] + 1;
        let modifiedStartPoint = midModifiedArr[0] + 1;
        if (forwardChanges !== null && forwardChanges.length > 0) {
          const lastForwardChange = forwardChanges[forwardChanges.length - 1];
          originalStartPoint = Math.max(originalStartPoint, lastForwardChange.getOriginalEnd());
          modifiedStartPoint = Math.max(modifiedStartPoint, lastForwardChange.getModifiedEnd());
        }
        reverseChanges = [
          new DiffChange(originalStartPoint, originalEnd - originalStartPoint + 1, modifiedStartPoint, modifiedEnd - modifiedStartPoint + 1)
        ];
      } else {
        changeHelper = new DiffChangeHelper();
        diagonalMin = diagonalReverseStart;
        diagonalMax = diagonalReverseEnd;
        diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalReverseOffset;
        lastOriginalIndex = 1073741824;
        historyIndex = deltaIsEven ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
        do {
          const diagonal = diagonalRelative + diagonalReverseBase;
          if (diagonal === diagonalMin || diagonal < diagonalMax && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
            originalIndex = reversePoints[diagonal + 1] - 1;
            modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
            if (originalIndex > lastOriginalIndex) {
              changeHelper.MarkNextChange();
            }
            lastOriginalIndex = originalIndex + 1;
            changeHelper.AddOriginalElement(originalIndex + 1, modifiedIndex + 1);
            diagonalRelative = diagonal + 1 - diagonalReverseBase;
          } else {
            originalIndex = reversePoints[diagonal - 1];
            modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
            if (originalIndex > lastOriginalIndex) {
              changeHelper.MarkNextChange();
            }
            lastOriginalIndex = originalIndex;
            changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex + 1);
            diagonalRelative = diagonal - 1 - diagonalReverseBase;
          }
          if (historyIndex >= 0) {
            reversePoints = this.m_reverseHistory[historyIndex];
            diagonalReverseBase = reversePoints[0];
            diagonalMin = 1;
            diagonalMax = reversePoints.length - 1;
          }
        } while (--historyIndex >= -1);
        reverseChanges = changeHelper.getChanges();
      }
      return this.ConcatenateChanges(forwardChanges, reverseChanges);
    }
    ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr) {
      let originalIndex = 0, modifiedIndex = 0;
      let diagonalForwardStart = 0, diagonalForwardEnd = 0;
      let diagonalReverseStart = 0, diagonalReverseEnd = 0;
      originalStart--;
      modifiedStart--;
      midOriginalArr[0] = 0;
      midModifiedArr[0] = 0;
      this.m_forwardHistory = [];
      this.m_reverseHistory = [];
      const maxDifferences = originalEnd - originalStart + (modifiedEnd - modifiedStart);
      const numDiagonals = maxDifferences + 1;
      const forwardPoints = new Int32Array(numDiagonals);
      const reversePoints = new Int32Array(numDiagonals);
      const diagonalForwardBase = modifiedEnd - modifiedStart;
      const diagonalReverseBase = originalEnd - originalStart;
      const diagonalForwardOffset = originalStart - modifiedStart;
      const diagonalReverseOffset = originalEnd - modifiedEnd;
      const delta = diagonalReverseBase - diagonalForwardBase;
      const deltaIsEven = delta % 2 === 0;
      forwardPoints[diagonalForwardBase] = originalStart;
      reversePoints[diagonalReverseBase] = originalEnd;
      quitEarlyArr[0] = false;
      for (let numDifferences = 1; numDifferences <= maxDifferences / 2 + 1; numDifferences++) {
        let furthestOriginalIndex = 0;
        let furthestModifiedIndex = 0;
        diagonalForwardStart = this.ClipDiagonalBound(diagonalForwardBase - numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
        diagonalForwardEnd = this.ClipDiagonalBound(diagonalForwardBase + numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
        for (let diagonal = diagonalForwardStart; diagonal <= diagonalForwardEnd; diagonal += 2) {
          if (diagonal === diagonalForwardStart || diagonal < diagonalForwardEnd && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
            originalIndex = forwardPoints[diagonal + 1];
          } else {
            originalIndex = forwardPoints[diagonal - 1] + 1;
          }
          modifiedIndex = originalIndex - (diagonal - diagonalForwardBase) - diagonalForwardOffset;
          const tempOriginalIndex = originalIndex;
          while (originalIndex < originalEnd && modifiedIndex < modifiedEnd && this.ElementsAreEqual(originalIndex + 1, modifiedIndex + 1)) {
            originalIndex++;
            modifiedIndex++;
          }
          forwardPoints[diagonal] = originalIndex;
          if (originalIndex + modifiedIndex > furthestOriginalIndex + furthestModifiedIndex) {
            furthestOriginalIndex = originalIndex;
            furthestModifiedIndex = modifiedIndex;
          }
          if (!deltaIsEven && Math.abs(diagonal - diagonalReverseBase) <= numDifferences - 1) {
            if (originalIndex >= reversePoints[diagonal]) {
              midOriginalArr[0] = originalIndex;
              midModifiedArr[0] = modifiedIndex;
              if (tempOriginalIndex <= reversePoints[diagonal] && 1447 > 0 && numDifferences <= 1447 + 1) {
                return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
              } else {
                return null;
              }
            }
          }
        }
        const matchLengthOfLongest = (furthestOriginalIndex - originalStart + (furthestModifiedIndex - modifiedStart) - numDifferences) / 2;
        if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(furthestOriginalIndex, matchLengthOfLongest)) {
          quitEarlyArr[0] = true;
          midOriginalArr[0] = furthestOriginalIndex;
          midModifiedArr[0] = furthestModifiedIndex;
          if (matchLengthOfLongest > 0 && 1447 > 0 && numDifferences <= 1447 + 1) {
            return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
          } else {
            originalStart++;
            modifiedStart++;
            return [
              new DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
            ];
          }
        }
        diagonalReverseStart = this.ClipDiagonalBound(diagonalReverseBase - numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
        diagonalReverseEnd = this.ClipDiagonalBound(diagonalReverseBase + numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
        for (let diagonal = diagonalReverseStart; diagonal <= diagonalReverseEnd; diagonal += 2) {
          if (diagonal === diagonalReverseStart || diagonal < diagonalReverseEnd && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
            originalIndex = reversePoints[diagonal + 1] - 1;
          } else {
            originalIndex = reversePoints[diagonal - 1];
          }
          modifiedIndex = originalIndex - (diagonal - diagonalReverseBase) - diagonalReverseOffset;
          const tempOriginalIndex = originalIndex;
          while (originalIndex > originalStart && modifiedIndex > modifiedStart && this.ElementsAreEqual(originalIndex, modifiedIndex)) {
            originalIndex--;
            modifiedIndex--;
          }
          reversePoints[diagonal] = originalIndex;
          if (deltaIsEven && Math.abs(diagonal - diagonalForwardBase) <= numDifferences) {
            if (originalIndex <= forwardPoints[diagonal]) {
              midOriginalArr[0] = originalIndex;
              midModifiedArr[0] = modifiedIndex;
              if (tempOriginalIndex >= forwardPoints[diagonal] && 1447 > 0 && numDifferences <= 1447 + 1) {
                return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
              } else {
                return null;
              }
            }
          }
        }
        if (numDifferences <= 1447) {
          let temp = new Int32Array(diagonalForwardEnd - diagonalForwardStart + 2);
          temp[0] = diagonalForwardBase - diagonalForwardStart + 1;
          MyArray.Copy2(forwardPoints, diagonalForwardStart, temp, 1, diagonalForwardEnd - diagonalForwardStart + 1);
          this.m_forwardHistory.push(temp);
          temp = new Int32Array(diagonalReverseEnd - diagonalReverseStart + 2);
          temp[0] = diagonalReverseBase - diagonalReverseStart + 1;
          MyArray.Copy2(reversePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
          this.m_reverseHistory.push(temp);
        }
      }
      return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
    }
    PrettifyChanges(changes) {
      for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        const originalStop = i < changes.length - 1 ? changes[i + 1].originalStart : this._originalElementsOrHash.length;
        const modifiedStop = i < changes.length - 1 ? changes[i + 1].modifiedStart : this._modifiedElementsOrHash.length;
        const checkOriginal = change.originalLength > 0;
        const checkModified = change.modifiedLength > 0;
        while (change.originalStart + change.originalLength < originalStop && change.modifiedStart + change.modifiedLength < modifiedStop && (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength)) && (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))) {
          const startStrictEqual = this.ElementsAreStrictEqual(change.originalStart, change.modifiedStart);
          const endStrictEqual = this.ElementsAreStrictEqual(change.originalStart + change.originalLength, change.modifiedStart + change.modifiedLength);
          if (endStrictEqual && !startStrictEqual) {
            break;
          }
          change.originalStart++;
          change.modifiedStart++;
        }
        let mergedChangeArr = [null];
        if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
          changes[i] = mergedChangeArr[0];
          changes.splice(i + 1, 1);
          i--;
          continue;
        }
      }
      for (let i = changes.length - 1; i >= 0; i--) {
        const change = changes[i];
        let originalStop = 0;
        let modifiedStop = 0;
        if (i > 0) {
          const prevChange = changes[i - 1];
          originalStop = prevChange.originalStart + prevChange.originalLength;
          modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
        }
        const checkOriginal = change.originalLength > 0;
        const checkModified = change.modifiedLength > 0;
        let bestDelta = 0;
        let bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
        for (let delta = 1; ; delta++) {
          const originalStart = change.originalStart - delta;
          const modifiedStart = change.modifiedStart - delta;
          if (originalStart < originalStop || modifiedStart < modifiedStop) {
            break;
          }
          if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) {
            break;
          }
          if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) {
            break;
          }
          const touchingPreviousChange = originalStart === originalStop && modifiedStart === modifiedStop;
          const score = (touchingPreviousChange ? 5 : 0) + this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength);
          if (score > bestScore) {
            bestScore = score;
            bestDelta = delta;
          }
        }
        change.originalStart -= bestDelta;
        change.modifiedStart -= bestDelta;
        const mergedChangeArr = [null];
        if (i > 0 && this.ChangesOverlap(changes[i - 1], changes[i], mergedChangeArr)) {
          changes[i - 1] = mergedChangeArr[0];
          changes.splice(i, 1);
          i++;
          continue;
        }
      }
      if (this._hasStrings) {
        for (let i = 1, len = changes.length; i < len; i++) {
          const aChange = changes[i - 1];
          const bChange = changes[i];
          const matchedLength = bChange.originalStart - aChange.originalStart - aChange.originalLength;
          const aOriginalStart = aChange.originalStart;
          const bOriginalEnd = bChange.originalStart + bChange.originalLength;
          const abOriginalLength = bOriginalEnd - aOriginalStart;
          const aModifiedStart = aChange.modifiedStart;
          const bModifiedEnd = bChange.modifiedStart + bChange.modifiedLength;
          const abModifiedLength = bModifiedEnd - aModifiedStart;
          if (matchedLength < 5 && abOriginalLength < 20 && abModifiedLength < 20) {
            const t = this._findBetterContiguousSequence(aOriginalStart, abOriginalLength, aModifiedStart, abModifiedLength, matchedLength);
            if (t) {
              const [originalMatchStart, modifiedMatchStart] = t;
              if (originalMatchStart !== aChange.originalStart + aChange.originalLength || modifiedMatchStart !== aChange.modifiedStart + aChange.modifiedLength) {
                aChange.originalLength = originalMatchStart - aChange.originalStart;
                aChange.modifiedLength = modifiedMatchStart - aChange.modifiedStart;
                bChange.originalStart = originalMatchStart + matchedLength;
                bChange.modifiedStart = modifiedMatchStart + matchedLength;
                bChange.originalLength = bOriginalEnd - bChange.originalStart;
                bChange.modifiedLength = bModifiedEnd - bChange.modifiedStart;
              }
            }
          }
        }
      }
      return changes;
    }
    _findBetterContiguousSequence(originalStart, originalLength, modifiedStart, modifiedLength, desiredLength) {
      if (originalLength < desiredLength || modifiedLength < desiredLength) {
        return null;
      }
      const originalMax = originalStart + originalLength - desiredLength + 1;
      const modifiedMax = modifiedStart + modifiedLength - desiredLength + 1;
      let bestScore = 0;
      let bestOriginalStart = 0;
      let bestModifiedStart = 0;
      for (let i = originalStart; i < originalMax; i++) {
        for (let j = modifiedStart; j < modifiedMax; j++) {
          const score = this._contiguousSequenceScore(i, j, desiredLength);
          if (score > 0 && score > bestScore) {
            bestScore = score;
            bestOriginalStart = i;
            bestModifiedStart = j;
          }
        }
      }
      if (bestScore > 0) {
        return [bestOriginalStart, bestModifiedStart];
      }
      return null;
    }
    _contiguousSequenceScore(originalStart, modifiedStart, length) {
      let score = 0;
      for (let l = 0; l < length; l++) {
        if (!this.ElementsAreEqual(originalStart + l, modifiedStart + l)) {
          return 0;
        }
        score += this._originalStringElements[originalStart + l].length;
      }
      return score;
    }
    _OriginalIsBoundary(index) {
      if (index <= 0 || index >= this._originalElementsOrHash.length - 1) {
        return true;
      }
      return this._hasStrings && /^\s*$/.test(this._originalStringElements[index]);
    }
    _OriginalRegionIsBoundary(originalStart, originalLength) {
      if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) {
        return true;
      }
      if (originalLength > 0) {
        const originalEnd = originalStart + originalLength;
        if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) {
          return true;
        }
      }
      return false;
    }
    _ModifiedIsBoundary(index) {
      if (index <= 0 || index >= this._modifiedElementsOrHash.length - 1) {
        return true;
      }
      return this._hasStrings && /^\s*$/.test(this._modifiedStringElements[index]);
    }
    _ModifiedRegionIsBoundary(modifiedStart, modifiedLength) {
      if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) {
        return true;
      }
      if (modifiedLength > 0) {
        const modifiedEnd = modifiedStart + modifiedLength;
        if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) {
          return true;
        }
      }
      return false;
    }
    _boundaryScore(originalStart, originalLength, modifiedStart, modifiedLength) {
      const originalScore = this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0;
      const modifiedScore = this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0;
      return originalScore + modifiedScore;
    }
    ConcatenateChanges(left, right) {
      let mergedChangeArr = [];
      if (left.length === 0 || right.length === 0) {
        return right.length > 0 ? right : left;
      } else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
        const result = new Array(left.length + right.length - 1);
        MyArray.Copy(left, 0, result, 0, left.length - 1);
        result[left.length - 1] = mergedChangeArr[0];
        MyArray.Copy(right, 1, result, left.length, right.length - 1);
        return result;
      } else {
        const result = new Array(left.length + right.length);
        MyArray.Copy(left, 0, result, 0, left.length);
        MyArray.Copy(right, 0, result, left.length, right.length);
        return result;
      }
    }
    ChangesOverlap(left, right, mergedChangeArr) {
      Debug.Assert(left.originalStart <= right.originalStart, "Left change is not less than or equal to right change");
      Debug.Assert(left.modifiedStart <= right.modifiedStart, "Left change is not less than or equal to right change");
      if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
        const originalStart = left.originalStart;
        let originalLength = left.originalLength;
        const modifiedStart = left.modifiedStart;
        let modifiedLength = left.modifiedLength;
        if (left.originalStart + left.originalLength >= right.originalStart) {
          originalLength = right.originalStart + right.originalLength - left.originalStart;
        }
        if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
          modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
        }
        mergedChangeArr[0] = new DiffChange(originalStart, originalLength, modifiedStart, modifiedLength);
        return true;
      } else {
        mergedChangeArr[0] = null;
        return false;
      }
    }
    ClipDiagonalBound(diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
      if (diagonal >= 0 && diagonal < numDiagonals) {
        return diagonal;
      }
      const diagonalsBelow = diagonalBaseIndex;
      const diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
      const diffEven = numDifferences % 2 === 0;
      if (diagonal < 0) {
        const lowerBoundEven = diagonalsBelow % 2 === 0;
        return diffEven === lowerBoundEven ? 0 : 1;
      } else {
        const upperBoundEven = diagonalsAbove % 2 === 0;
        return diffEven === upperBoundEven ? numDiagonals - 1 : numDiagonals - 2;
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/process.js
  var safeProcess;
  if (typeof globals.vscode !== "undefined" && typeof globals.vscode.process !== "undefined") {
    const sandboxProcess = globals.vscode.process;
    safeProcess = {
      get platform() {
        return sandboxProcess.platform;
      },
      get arch() {
        return sandboxProcess.arch;
      },
      get env() {
        return sandboxProcess.env;
      },
      cwd() {
        return sandboxProcess.cwd();
      },
      nextTick(callback) {
        return setImmediate(callback);
      }
    };
  } else if (typeof process !== "undefined") {
    safeProcess = {
      get platform() {
        return process.platform;
      },
      get arch() {
        return process.arch;
      },
      get env() {
        return process.env;
      },
      cwd() {
        return process.env["VSCODE_CWD"] || process.cwd();
      },
      nextTick(callback) {
        return process.nextTick(callback);
      }
    };
  } else {
    safeProcess = {
      get platform() {
        return isWindows ? "win32" : isMacintosh ? "darwin" : "linux";
      },
      get arch() {
        return void 0;
      },
      nextTick(callback) {
        return setImmediate(callback);
      },
      get env() {
        return {};
      },
      cwd() {
        return "/";
      }
    };
  }
  var cwd = safeProcess.cwd;
  var env = safeProcess.env;
  var platform = safeProcess.platform;

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/path.js
  var CHAR_UPPERCASE_A = 65;
  var CHAR_LOWERCASE_A = 97;
  var CHAR_UPPERCASE_Z = 90;
  var CHAR_LOWERCASE_Z = 122;
  var CHAR_DOT = 46;
  var CHAR_FORWARD_SLASH = 47;
  var CHAR_BACKWARD_SLASH = 92;
  var CHAR_COLON = 58;
  var CHAR_QUESTION_MARK = 63;
  var ErrorInvalidArgType = class extends Error {
    constructor(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && expected.indexOf("not ") === 0) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      const type = name.indexOf(".") !== -1 ? "property" : "argument";
      let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
      msg += `. Received type ${typeof actual}`;
      super(msg);
      this.code = "ERR_INVALID_ARG_TYPE";
    }
  };
  function validateString(value, name) {
    if (typeof value !== "string") {
      throw new ErrorInvalidArgType(name, "string", value);
    }
  }
  function isPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  }
  function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH;
  }
  function isWindowsDeviceRoot(code) {
    return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z || code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
  }
  function normalizeString(path, allowAboveRoot, separator, isPathSeparator2) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    for (let i = 0; i <= path.length; ++i) {
      if (i < path.length) {
        code = path.charCodeAt(i);
      } else if (isPathSeparator2(code)) {
        break;
      } else {
        code = CHAR_FORWARD_SLASH;
      }
      if (isPathSeparator2(code)) {
        if (lastSlash === i - 1 || dots === 1) {
        } else if (dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf(separator);
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
              }
              lastSlash = i;
              dots = 0;
              continue;
            } else if (res.length !== 0) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            res += res.length > 0 ? `${separator}..` : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) {
            res += `${separator}${path.slice(lastSlash + 1, i)}`;
          } else {
            res = path.slice(lastSlash + 1, i);
          }
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === CHAR_DOT && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep2, pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new ErrorInvalidArgType("pathObject", "Object", pathObject);
    }
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || `${pathObject.name || ""}${pathObject.ext || ""}`;
    if (!dir) {
      return base;
    }
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep2}${base}`;
  }
  var win32 = {
    resolve(...pathSegments) {
      let resolvedDevice = "";
      let resolvedTail = "";
      let resolvedAbsolute = false;
      for (let i = pathSegments.length - 1; i >= -1; i--) {
        let path;
        if (i >= 0) {
          path = pathSegments[i];
          validateString(path, "path");
          if (path.length === 0) {
            continue;
          }
        } else if (resolvedDevice.length === 0) {
          path = cwd();
        } else {
          path = env[`=${resolvedDevice}`] || cwd();
          if (path === void 0 || path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() && path.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
            path = `${resolvedDevice}\\`;
          }
        }
        const len = path.length;
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        if (len === 1) {
          if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute = true;
          }
        } else if (isPathSeparator(code)) {
          isAbsolute = true;
          if (isPathSeparator(path.charCodeAt(1))) {
            let j = 2;
            let last = j;
            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              const firstPart = path.slice(last, j);
              last = j;
              while (j < len && isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j < len && j !== last) {
                last = j;
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                  j++;
                }
                if (j === len || j !== last) {
                  device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                  rootEnd = j;
                }
              }
            }
          } else {
            rootEnd = 1;
          }
        } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
          device = path.slice(0, 2);
          rootEnd = 2;
          if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
            isAbsolute = true;
            rootEnd = 3;
          }
        }
        if (device.length > 0) {
          if (resolvedDevice.length > 0) {
            if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
              continue;
            }
          } else {
            resolvedDevice = device;
          }
        }
        if (resolvedAbsolute) {
          if (resolvedDevice.length > 0) {
            break;
          }
        } else {
          resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
          resolvedAbsolute = isAbsolute;
          if (isAbsolute && resolvedDevice.length > 0) {
            break;
          }
        }
      }
      resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
      return resolvedAbsolute ? `${resolvedDevice}\\${resolvedTail}` : `${resolvedDevice}${resolvedTail}` || ".";
    },
    normalize(path) {
      validateString(path, "path");
      const len = path.length;
      if (len === 0) {
        return ".";
      }
      let rootEnd = 0;
      let device;
      let isAbsolute = false;
      const code = path.charCodeAt(0);
      if (len === 1) {
        return isPosixPathSeparator(code) ? "\\" : path;
      }
      if (isPathSeparator(code)) {
        isAbsolute = true;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            const firstPart = path.slice(last, j);
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                return `\\\\${firstPart}\\${path.slice(last)}\\`;
              }
              if (j !== last) {
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        device = path.slice(0, 2);
        rootEnd = 2;
        if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
          isAbsolute = true;
          rootEnd = 3;
        }
      }
      let tail = rootEnd < len ? normalizeString(path.slice(rootEnd), !isAbsolute, "\\", isPathSeparator) : "";
      if (tail.length === 0 && !isAbsolute) {
        tail = ".";
      }
      if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
        tail += "\\";
      }
      if (device === void 0) {
        return isAbsolute ? `\\${tail}` : tail;
      }
      return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
    },
    isAbsolute(path) {
      validateString(path, "path");
      const len = path.length;
      if (len === 0) {
        return false;
      }
      const code = path.charCodeAt(0);
      return isPathSeparator(code) || len > 2 && isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON && isPathSeparator(path.charCodeAt(2));
    },
    join(...paths2) {
      if (paths2.length === 0) {
        return ".";
      }
      let joined;
      let firstPart;
      for (let i = 0; i < paths2.length; ++i) {
        const arg = paths2[i];
        validateString(arg, "path");
        if (arg.length > 0) {
          if (joined === void 0) {
            joined = firstPart = arg;
          } else {
            joined += `\\${arg}`;
          }
        }
      }
      if (joined === void 0) {
        return ".";
      }
      let needsReplace = true;
      let slashCount = 0;
      if (typeof firstPart === "string" && isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
          ++slashCount;
          if (firstLen > 2) {
            if (isPathSeparator(firstPart.charCodeAt(2))) {
              ++slashCount;
            } else {
              needsReplace = false;
            }
          }
        }
      }
      if (needsReplace) {
        while (slashCount < joined.length && isPathSeparator(joined.charCodeAt(slashCount))) {
          slashCount++;
        }
        if (slashCount >= 2) {
          joined = `\\${joined.slice(slashCount)}`;
        }
      }
      return win32.normalize(joined);
    },
    relative(from, to) {
      validateString(from, "from");
      validateString(to, "to");
      if (from === to) {
        return "";
      }
      const fromOrig = win32.resolve(from);
      const toOrig = win32.resolve(to);
      if (fromOrig === toOrig) {
        return "";
      }
      from = fromOrig.toLowerCase();
      to = toOrig.toLowerCase();
      if (from === to) {
        return "";
      }
      let fromStart = 0;
      while (fromStart < from.length && from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
        fromStart++;
      }
      let fromEnd = from.length;
      while (fromEnd - 1 > fromStart && from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
        fromEnd--;
      }
      const fromLen = fromEnd - fromStart;
      let toStart = 0;
      while (toStart < to.length && to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
        toStart++;
      }
      let toEnd = to.length;
      while (toEnd - 1 > toStart && to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
        toEnd--;
      }
      const toLen = toEnd - toStart;
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i < length; i++) {
        const fromCode = from.charCodeAt(fromStart + i);
        if (fromCode !== to.charCodeAt(toStart + i)) {
          break;
        } else if (fromCode === CHAR_BACKWARD_SLASH) {
          lastCommonSep = i;
        }
      }
      if (i !== length) {
        if (lastCommonSep === -1) {
          return toOrig;
        }
      } else {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
            return toOrig.slice(toStart + i + 1);
          }
          if (i === 2) {
            return toOrig.slice(toStart + i);
          }
        }
        if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
            lastCommonSep = i;
          } else if (i === 2) {
            lastCommonSep = 3;
          }
        }
        if (lastCommonSep === -1) {
          lastCommonSep = 0;
        }
      }
      let out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
          out += out.length === 0 ? ".." : "\\..";
        }
      }
      toStart += lastCommonSep;
      if (out.length > 0) {
        return `${out}${toOrig.slice(toStart, toEnd)}`;
      }
      if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
        ++toStart;
      }
      return toOrig.slice(toStart, toEnd);
    },
    toNamespacedPath(path) {
      if (typeof path !== "string") {
        return path;
      }
      if (path.length === 0) {
        return "";
      }
      const resolvedPath = win32.resolve(path);
      if (resolvedPath.length <= 2) {
        return path;
      }
      if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
        if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
          const code = resolvedPath.charCodeAt(2);
          if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
            return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
          }
        }
      } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) && resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        return `\\\\?\\${resolvedPath}`;
      }
      return path;
    },
    dirname(path) {
      validateString(path, "path");
      const len = path.length;
      if (len === 0) {
        return ".";
      }
      let rootEnd = -1;
      let offset = 0;
      const code = path.charCodeAt(0);
      if (len === 1) {
        return isPathSeparator(code) ? path : ".";
      }
      if (isPathSeparator(code)) {
        rootEnd = offset = 1;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                return path;
              }
              if (j !== last) {
                rootEnd = offset = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
        offset = rootEnd;
      }
      let end = -1;
      let matchedSlash = true;
      for (let i = len - 1; i >= offset; --i) {
        if (isPathSeparator(path.charCodeAt(i))) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) {
        if (rootEnd === -1) {
          return ".";
        }
        end = rootEnd;
      }
      return path.slice(0, end);
    },
    basename(path, ext) {
      if (ext !== void 0) {
        validateString(ext, "ext");
      }
      validateString(path, "path");
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      let i;
      if (path.length >= 2 && isWindowsDeviceRoot(path.charCodeAt(0)) && path.charCodeAt(1) === CHAR_COLON) {
        start = 2;
      }
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext === path) {
          return "";
        }
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= start; --i) {
          const code = path.charCodeAt(i);
          if (isPathSeparator(code)) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) {
          end = firstNonSlashEnd;
        } else if (end === -1) {
          end = path.length;
        }
        return path.slice(start, end);
      }
      for (i = path.length - 1; i >= start; --i) {
        if (isPathSeparator(path.charCodeAt(i))) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) {
        return "";
      }
      return path.slice(start, end);
    },
    extname(path) {
      validateString(path, "path");
      let start = 0;
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let preDotState = 0;
      if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
      }
      for (let i = path.length - 1; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: _format.bind(null, "\\"),
    parse(path) {
      validateString(path, "path");
      const ret = {root: "", dir: "", base: "", ext: "", name: ""};
      if (path.length === 0) {
        return ret;
      }
      const len = path.length;
      let rootEnd = 0;
      let code = path.charCodeAt(0);
      if (len === 1) {
        if (isPathSeparator(code)) {
          ret.root = ret.dir = path;
          return ret;
        }
        ret.base = ret.name = path;
        return ret;
      }
      if (isPathSeparator(code)) {
        rootEnd = 1;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                rootEnd = j;
              } else if (j !== last) {
                rootEnd = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        if (len <= 2) {
          ret.root = ret.dir = path;
          return ret;
        }
        rootEnd = 2;
        if (isPathSeparator(path.charCodeAt(2))) {
          if (len === 3) {
            ret.root = ret.dir = path;
            return ret;
          }
          rootEnd = 3;
        }
      }
      if (rootEnd > 0) {
        ret.root = path.slice(0, rootEnd);
      }
      let startDot = -1;
      let startPart = rootEnd;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      let preDotState = 0;
      for (; i >= rootEnd; --i) {
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (end !== -1) {
        if (startDot === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          ret.base = ret.name = path.slice(startPart, end);
        } else {
          ret.name = path.slice(startPart, startDot);
          ret.base = path.slice(startPart, end);
          ret.ext = path.slice(startDot, end);
        }
      }
      if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
      } else {
        ret.dir = ret.root;
      }
      return ret;
    },
    sep: "\\",
    delimiter: ";",
    win32: null,
    posix: null
  };
  var posix = {
    resolve(...pathSegments) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        const path = i >= 0 ? pathSegments[i] : cwd();
        validateString(path, "path");
        if (path.length === 0) {
          continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
      }
      resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
      if (resolvedAbsolute) {
        return `/${resolvedPath}`;
      }
      return resolvedPath.length > 0 ? resolvedPath : ".";
    },
    normalize(path) {
      validateString(path, "path");
      if (path.length === 0) {
        return ".";
      }
      const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
      const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
      path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator);
      if (path.length === 0) {
        if (isAbsolute) {
          return "/";
        }
        return trailingSeparator ? "./" : ".";
      }
      if (trailingSeparator) {
        path += "/";
      }
      return isAbsolute ? `/${path}` : path;
    },
    isAbsolute(path) {
      validateString(path, "path");
      return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    },
    join(...paths2) {
      if (paths2.length === 0) {
        return ".";
      }
      let joined;
      for (let i = 0; i < paths2.length; ++i) {
        const arg = paths2[i];
        validateString(arg, "path");
        if (arg.length > 0) {
          if (joined === void 0) {
            joined = arg;
          } else {
            joined += `/${arg}`;
          }
        }
      }
      if (joined === void 0) {
        return ".";
      }
      return posix.normalize(joined);
    },
    relative(from, to) {
      validateString(from, "from");
      validateString(to, "to");
      if (from === to) {
        return "";
      }
      from = posix.resolve(from);
      to = posix.resolve(to);
      if (from === to) {
        return "";
      }
      const fromStart = 1;
      const fromEnd = from.length;
      const fromLen = fromEnd - fromStart;
      const toStart = 1;
      const toLen = to.length - toStart;
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i < length; i++) {
        const fromCode = from.charCodeAt(fromStart + i);
        if (fromCode !== to.charCodeAt(toStart + i)) {
          break;
        } else if (fromCode === CHAR_FORWARD_SLASH) {
          lastCommonSep = i;
        }
      }
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
            return to.slice(toStart + i + 1);
          }
          if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
      }
      let out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
          out += out.length === 0 ? ".." : "/..";
        }
      }
      return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    toNamespacedPath(path) {
      return path;
    },
    dirname(path) {
      validateString(path, "path");
      if (path.length === 0) {
        return ".";
      }
      const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
      let end = -1;
      let matchedSlash = true;
      for (let i = path.length - 1; i >= 1; --i) {
        if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) {
        return hasRoot ? "/" : ".";
      }
      if (hasRoot && end === 1) {
        return "//";
      }
      return path.slice(0, end);
    },
    basename(path, ext) {
      if (ext !== void 0) {
        validateString(ext, "ext");
      }
      validateString(path, "path");
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      let i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext === path) {
          return "";
        }
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
          const code = path.charCodeAt(i);
          if (code === CHAR_FORWARD_SLASH) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) {
          end = firstNonSlashEnd;
        } else if (end === -1) {
          end = path.length;
        }
        return path.slice(start, end);
      }
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) {
        return "";
      }
      return path.slice(start, end);
    },
    extname(path) {
      validateString(path, "path");
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let preDotState = 0;
      for (let i = path.length - 1; i >= 0; --i) {
        const code = path.charCodeAt(i);
        if (code === CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: _format.bind(null, "/"),
    parse(path) {
      validateString(path, "path");
      const ret = {root: "", dir: "", base: "", ext: "", name: ""};
      if (path.length === 0) {
        return ret;
      }
      const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
      let start;
      if (isAbsolute) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      let preDotState = 0;
      for (; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (code === CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (end !== -1) {
        const start2 = startPart === 0 && isAbsolute ? 1 : startPart;
        if (startDot === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          ret.base = ret.name = path.slice(start2, end);
        } else {
          ret.name = path.slice(start2, startDot);
          ret.base = path.slice(start2, end);
          ret.ext = path.slice(startDot, end);
        }
      }
      if (startPart > 0) {
        ret.dir = path.slice(0, startPart - 1);
      } else if (isAbsolute) {
        ret.dir = "/";
      }
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix.win32 = win32.win32 = win32;
  posix.posix = win32.posix = posix;
  var normalize = platform === "win32" ? win32.normalize : posix.normalize;
  var resolve = platform === "win32" ? win32.resolve : posix.resolve;
  var relative = platform === "win32" ? win32.relative : posix.relative;
  var dirname = platform === "win32" ? win32.dirname : posix.dirname;
  var basename = platform === "win32" ? win32.basename : posix.basename;
  var extname = platform === "win32" ? win32.extname : posix.extname;
  var sep = platform === "win32" ? win32.sep : posix.sep;

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/uri.js
  var _schemePattern = /^\w[\w\d+.-]*$/;
  var _singleSlashStart = /^\//;
  var _doubleSlashStart = /^\/\//;
  function _validateUri(ret, _strict) {
    if (!ret.scheme && _strict) {
      throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
    }
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
      throw new Error("[UriError]: Scheme contains illegal characters.");
    }
    if (ret.path) {
      if (ret.authority) {
        if (!_singleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        }
      } else {
        if (_doubleSlashStart.test(ret.path)) {
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
        }
      }
    }
  }
  function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
      return "file";
    }
    return scheme;
  }
  function _referenceResolution(scheme, path) {
    switch (scheme) {
      case "https":
      case "http":
      case "file":
        if (!path) {
          path = _slash;
        } else if (path[0] !== _slash) {
          path = _slash + path;
        }
        break;
    }
    return path;
  }
  var _empty = "";
  var _slash = "/";
  var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  var URI = class {
    constructor(schemeOrData, authority, path, query, fragment, _strict = false) {
      if (typeof schemeOrData === "object") {
        this.scheme = schemeOrData.scheme || _empty;
        this.authority = schemeOrData.authority || _empty;
        this.path = schemeOrData.path || _empty;
        this.query = schemeOrData.query || _empty;
        this.fragment = schemeOrData.fragment || _empty;
      } else {
        this.scheme = _schemeFix(schemeOrData, _strict);
        this.authority = authority || _empty;
        this.path = _referenceResolution(this.scheme, path || _empty);
        this.query = query || _empty;
        this.fragment = fragment || _empty;
        _validateUri(this, _strict);
      }
    }
    static isUri(thing) {
      if (thing instanceof URI) {
        return true;
      }
      if (!thing) {
        return false;
      }
      return typeof thing.authority === "string" && typeof thing.fragment === "string" && typeof thing.path === "string" && typeof thing.query === "string" && typeof thing.scheme === "string" && typeof thing.fsPath === "string" && typeof thing.with === "function" && typeof thing.toString === "function";
    }
    get fsPath() {
      return uriToFsPath(this, false);
    }
    with(change) {
      if (!change) {
        return this;
      }
      let {scheme, authority, path, query, fragment} = change;
      if (scheme === void 0) {
        scheme = this.scheme;
      } else if (scheme === null) {
        scheme = _empty;
      }
      if (authority === void 0) {
        authority = this.authority;
      } else if (authority === null) {
        authority = _empty;
      }
      if (path === void 0) {
        path = this.path;
      } else if (path === null) {
        path = _empty;
      }
      if (query === void 0) {
        query = this.query;
      } else if (query === null) {
        query = _empty;
      }
      if (fragment === void 0) {
        fragment = this.fragment;
      } else if (fragment === null) {
        fragment = _empty;
      }
      if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
        return this;
      }
      return new Uri(scheme, authority, path, query, fragment);
    }
    static parse(value, _strict = false) {
      const match = _regexp.exec(value);
      if (!match) {
        return new Uri(_empty, _empty, _empty, _empty, _empty);
      }
      return new Uri(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
    }
    static file(path) {
      let authority = _empty;
      if (isWindows) {
        path = path.replace(/\\/g, _slash);
      }
      if (path[0] === _slash && path[1] === _slash) {
        const idx = path.indexOf(_slash, 2);
        if (idx === -1) {
          authority = path.substring(2);
          path = _slash;
        } else {
          authority = path.substring(2, idx);
          path = path.substring(idx) || _slash;
        }
      }
      return new Uri("file", authority, path, _empty, _empty);
    }
    static from(components) {
      const result = new Uri(components.scheme, components.authority, components.path, components.query, components.fragment);
      _validateUri(result, true);
      return result;
    }
    static joinPath(uri, ...pathFragment) {
      if (!uri.path) {
        throw new Error(`[UriError]: cannot call joinPath on URI without path`);
      }
      let newPath;
      if (isWindows && uri.scheme === "file") {
        newPath = URI.file(win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
      } else {
        newPath = posix.join(uri.path, ...pathFragment);
      }
      return uri.with({path: newPath});
    }
    toString(skipEncoding = false) {
      return _asFormatted(this, skipEncoding);
    }
    toJSON() {
      return this;
    }
    static revive(data) {
      if (!data) {
        return data;
      } else if (data instanceof URI) {
        return data;
      } else {
        const result = new Uri(data);
        result._formatted = data.external;
        result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
        return result;
      }
    }
  };
  var _pathSepMarker = isWindows ? 1 : void 0;
  var Uri = class extends URI {
    constructor() {
      super(...arguments);
      this._formatted = null;
      this._fsPath = null;
    }
    get fsPath() {
      if (!this._fsPath) {
        this._fsPath = uriToFsPath(this, false);
      }
      return this._fsPath;
    }
    toString(skipEncoding = false) {
      if (!skipEncoding) {
        if (!this._formatted) {
          this._formatted = _asFormatted(this, false);
        }
        return this._formatted;
      } else {
        return _asFormatted(this, true);
      }
    }
    toJSON() {
      const res = {
        $mid: 1
      };
      if (this._fsPath) {
        res.fsPath = this._fsPath;
        res._sep = _pathSepMarker;
      }
      if (this._formatted) {
        res.external = this._formatted;
      }
      if (this.path) {
        res.path = this.path;
      }
      if (this.scheme) {
        res.scheme = this.scheme;
      }
      if (this.authority) {
        res.authority = this.authority;
      }
      if (this.query) {
        res.query = this.query;
      }
      if (this.fragment) {
        res.fragment = this.fragment;
      }
      return res;
    }
  };
  var encodeTable = {
    [58]: "%3A",
    [47]: "%2F",
    [63]: "%3F",
    [35]: "%23",
    [91]: "%5B",
    [93]: "%5D",
    [64]: "%40",
    [33]: "%21",
    [36]: "%24",
    [38]: "%26",
    [39]: "%27",
    [40]: "%28",
    [41]: "%29",
    [42]: "%2A",
    [43]: "%2B",
    [44]: "%2C",
    [59]: "%3B",
    [61]: "%3D",
    [32]: "%20"
  };
  function encodeURIComponentFast(uriComponent, allowSlash) {
    let res = void 0;
    let nativeEncodePos = -1;
    for (let pos = 0; pos < uriComponent.length; pos++) {
      const code = uriComponent.charCodeAt(pos);
      if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 45 || code === 46 || code === 95 || code === 126 || allowSlash && code === 47) {
        if (nativeEncodePos !== -1) {
          res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
          nativeEncodePos = -1;
        }
        if (res !== void 0) {
          res += uriComponent.charAt(pos);
        }
      } else {
        if (res === void 0) {
          res = uriComponent.substr(0, pos);
        }
        const escaped = encodeTable[code];
        if (escaped !== void 0) {
          if (nativeEncodePos !== -1) {
            res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
            nativeEncodePos = -1;
          }
          res += escaped;
        } else if (nativeEncodePos === -1) {
          nativeEncodePos = pos;
        }
      }
    }
    if (nativeEncodePos !== -1) {
      res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== void 0 ? res : uriComponent;
  }
  function encodeURIComponentMinimal(path) {
    let res = void 0;
    for (let pos = 0; pos < path.length; pos++) {
      const code = path.charCodeAt(pos);
      if (code === 35 || code === 63) {
        if (res === void 0) {
          res = path.substr(0, pos);
        }
        res += encodeTable[code];
      } else {
        if (res !== void 0) {
          res += path[pos];
        }
      }
    }
    return res !== void 0 ? res : path;
  }
  function uriToFsPath(uri, keepDriveLetterCasing) {
    let value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === "file") {
      value = `//${uri.authority}${uri.path}`;
    } else if (uri.path.charCodeAt(0) === 47 && (uri.path.charCodeAt(1) >= 65 && uri.path.charCodeAt(1) <= 90 || uri.path.charCodeAt(1) >= 97 && uri.path.charCodeAt(1) <= 122) && uri.path.charCodeAt(2) === 58) {
      if (!keepDriveLetterCasing) {
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
      } else {
        value = uri.path.substr(1);
      }
    } else {
      value = uri.path;
    }
    if (isWindows) {
      value = value.replace(/\//g, "\\");
    }
    return value;
  }
  function _asFormatted(uri, skipEncoding) {
    const encoder = !skipEncoding ? encodeURIComponentFast : encodeURIComponentMinimal;
    let res = "";
    let {scheme, authority, path, query, fragment} = uri;
    if (scheme) {
      res += scheme;
      res += ":";
    }
    if (authority || scheme === "file") {
      res += _slash;
      res += _slash;
    }
    if (authority) {
      let idx = authority.indexOf("@");
      if (idx !== -1) {
        const userinfo = authority.substr(0, idx);
        authority = authority.substr(idx + 1);
        idx = userinfo.indexOf(":");
        if (idx === -1) {
          res += encoder(userinfo, false);
        } else {
          res += encoder(userinfo.substr(0, idx), false);
          res += ":";
          res += encoder(userinfo.substr(idx + 1), false);
        }
        res += "@";
      }
      authority = authority.toLowerCase();
      idx = authority.indexOf(":");
      if (idx === -1) {
        res += encoder(authority, false);
      } else {
        res += encoder(authority.substr(0, idx), false);
        res += authority.substr(idx);
      }
    }
    if (path) {
      if (path.length >= 3 && path.charCodeAt(0) === 47 && path.charCodeAt(2) === 58) {
        const code = path.charCodeAt(1);
        if (code >= 65 && code <= 90) {
          path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`;
        }
      } else if (path.length >= 2 && path.charCodeAt(1) === 58) {
        const code = path.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`;
        }
      }
      res += encoder(path, true);
    }
    if (query) {
      res += "?";
      res += encoder(query, false);
    }
    if (fragment) {
      res += "#";
      res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
    }
    return res;
  }
  function decodeURIComponentGraceful(str) {
    try {
      return decodeURIComponent(str);
    } catch (_a3) {
      if (str.length > 3) {
        return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
      } else {
        return str;
      }
    }
  }
  var _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
  function percentDecode(str) {
    if (!str.match(_rEncodedAsHex)) {
      return str;
    }
    return str.replace(_rEncodedAsHex, (match) => decodeURIComponentGraceful(match));
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/core/position.js
  var Position = class {
    constructor(lineNumber, column) {
      this.lineNumber = lineNumber;
      this.column = column;
    }
    with(newLineNumber = this.lineNumber, newColumn = this.column) {
      if (newLineNumber === this.lineNumber && newColumn === this.column) {
        return this;
      } else {
        return new Position(newLineNumber, newColumn);
      }
    }
    delta(deltaLineNumber = 0, deltaColumn = 0) {
      return this.with(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
    }
    equals(other) {
      return Position.equals(this, other);
    }
    static equals(a, b) {
      if (!a && !b) {
        return true;
      }
      return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
    }
    isBefore(other) {
      return Position.isBefore(this, other);
    }
    static isBefore(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }
      if (b.lineNumber < a.lineNumber) {
        return false;
      }
      return a.column < b.column;
    }
    isBeforeOrEqual(other) {
      return Position.isBeforeOrEqual(this, other);
    }
    static isBeforeOrEqual(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }
      if (b.lineNumber < a.lineNumber) {
        return false;
      }
      return a.column <= b.column;
    }
    static compare(a, b) {
      let aLineNumber = a.lineNumber | 0;
      let bLineNumber = b.lineNumber | 0;
      if (aLineNumber === bLineNumber) {
        let aColumn = a.column | 0;
        let bColumn = b.column | 0;
        return aColumn - bColumn;
      }
      return aLineNumber - bLineNumber;
    }
    clone() {
      return new Position(this.lineNumber, this.column);
    }
    toString() {
      return "(" + this.lineNumber + "," + this.column + ")";
    }
    static lift(pos) {
      return new Position(pos.lineNumber, pos.column);
    }
    static isIPosition(obj) {
      return obj && typeof obj.lineNumber === "number" && typeof obj.column === "number";
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/core/range.js
  var Range = class {
    constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
      if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
        this.startLineNumber = endLineNumber;
        this.startColumn = endColumn;
        this.endLineNumber = startLineNumber;
        this.endColumn = startColumn;
      } else {
        this.startLineNumber = startLineNumber;
        this.startColumn = startColumn;
        this.endLineNumber = endLineNumber;
        this.endColumn = endColumn;
      }
    }
    isEmpty() {
      return Range.isEmpty(this);
    }
    static isEmpty(range) {
      return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
    }
    containsPosition(position) {
      return Range.containsPosition(this, position);
    }
    static containsPosition(range, position) {
      if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
        return false;
      }
      if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
        return false;
      }
      if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
        return false;
      }
      return true;
    }
    containsRange(range) {
      return Range.containsRange(this, range);
    }
    static containsRange(range, otherRange) {
      if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
        return false;
      }
      if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
        return false;
      }
      if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
        return false;
      }
      if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
        return false;
      }
      return true;
    }
    strictContainsRange(range) {
      return Range.strictContainsRange(this, range);
    }
    static strictContainsRange(range, otherRange) {
      if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
        return false;
      }
      if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
        return false;
      }
      if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) {
        return false;
      }
      if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) {
        return false;
      }
      return true;
    }
    plusRange(range) {
      return Range.plusRange(this, range);
    }
    static plusRange(a, b) {
      let startLineNumber;
      let startColumn;
      let endLineNumber;
      let endColumn;
      if (b.startLineNumber < a.startLineNumber) {
        startLineNumber = b.startLineNumber;
        startColumn = b.startColumn;
      } else if (b.startLineNumber === a.startLineNumber) {
        startLineNumber = b.startLineNumber;
        startColumn = Math.min(b.startColumn, a.startColumn);
      } else {
        startLineNumber = a.startLineNumber;
        startColumn = a.startColumn;
      }
      if (b.endLineNumber > a.endLineNumber) {
        endLineNumber = b.endLineNumber;
        endColumn = b.endColumn;
      } else if (b.endLineNumber === a.endLineNumber) {
        endLineNumber = b.endLineNumber;
        endColumn = Math.max(b.endColumn, a.endColumn);
      } else {
        endLineNumber = a.endLineNumber;
        endColumn = a.endColumn;
      }
      return new Range(startLineNumber, startColumn, endLineNumber, endColumn);
    }
    intersectRanges(range) {
      return Range.intersectRanges(this, range);
    }
    static intersectRanges(a, b) {
      let resultStartLineNumber = a.startLineNumber;
      let resultStartColumn = a.startColumn;
      let resultEndLineNumber = a.endLineNumber;
      let resultEndColumn = a.endColumn;
      let otherStartLineNumber = b.startLineNumber;
      let otherStartColumn = b.startColumn;
      let otherEndLineNumber = b.endLineNumber;
      let otherEndColumn = b.endColumn;
      if (resultStartLineNumber < otherStartLineNumber) {
        resultStartLineNumber = otherStartLineNumber;
        resultStartColumn = otherStartColumn;
      } else if (resultStartLineNumber === otherStartLineNumber) {
        resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
      }
      if (resultEndLineNumber > otherEndLineNumber) {
        resultEndLineNumber = otherEndLineNumber;
        resultEndColumn = otherEndColumn;
      } else if (resultEndLineNumber === otherEndLineNumber) {
        resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
      }
      if (resultStartLineNumber > resultEndLineNumber) {
        return null;
      }
      if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
        return null;
      }
      return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    }
    equalsRange(other) {
      return Range.equalsRange(this, other);
    }
    static equalsRange(a, b) {
      return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
    }
    getEndPosition() {
      return Range.getEndPosition(this);
    }
    static getEndPosition(range) {
      return new Position(range.endLineNumber, range.endColumn);
    }
    getStartPosition() {
      return Range.getStartPosition(this);
    }
    static getStartPosition(range) {
      return new Position(range.startLineNumber, range.startColumn);
    }
    toString() {
      return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
    }
    setEndPosition(endLineNumber, endColumn) {
      return new Range(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    }
    setStartPosition(startLineNumber, startColumn) {
      return new Range(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    }
    collapseToStart() {
      return Range.collapseToStart(this);
    }
    static collapseToStart(range) {
      return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    }
    static fromPositions(start, end = start) {
      return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    static lift(range) {
      if (!range) {
        return null;
      }
      return new Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    }
    static isIRange(obj) {
      return obj && typeof obj.startLineNumber === "number" && typeof obj.startColumn === "number" && typeof obj.endLineNumber === "number" && typeof obj.endColumn === "number";
    }
    static areIntersectingOrTouching(a, b) {
      if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn) {
        return false;
      }
      if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn) {
        return false;
      }
      return true;
    }
    static areIntersecting(a, b) {
      if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn) {
        return false;
      }
      if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn) {
        return false;
      }
      return true;
    }
    static compareRangesUsingStarts(a, b) {
      if (a && b) {
        const aStartLineNumber = a.startLineNumber | 0;
        const bStartLineNumber = b.startLineNumber | 0;
        if (aStartLineNumber === bStartLineNumber) {
          const aStartColumn = a.startColumn | 0;
          const bStartColumn = b.startColumn | 0;
          if (aStartColumn === bStartColumn) {
            const aEndLineNumber = a.endLineNumber | 0;
            const bEndLineNumber = b.endLineNumber | 0;
            if (aEndLineNumber === bEndLineNumber) {
              const aEndColumn = a.endColumn | 0;
              const bEndColumn = b.endColumn | 0;
              return aEndColumn - bEndColumn;
            }
            return aEndLineNumber - bEndLineNumber;
          }
          return aStartColumn - bStartColumn;
        }
        return aStartLineNumber - bStartLineNumber;
      }
      const aExists = a ? 1 : 0;
      const bExists = b ? 1 : 0;
      return aExists - bExists;
    }
    static compareRangesUsingEnds(a, b) {
      if (a.endLineNumber === b.endLineNumber) {
        if (a.endColumn === b.endColumn) {
          if (a.startLineNumber === b.startLineNumber) {
            return a.startColumn - b.startColumn;
          }
          return a.startLineNumber - b.startLineNumber;
        }
        return a.endColumn - b.endColumn;
      }
      return a.endLineNumber - b.endLineNumber;
    }
    static spansMultipleLines(range) {
      return range.endLineNumber > range.startLineNumber;
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/diff/diffComputer.js
  var MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
  function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
    const diffAlgo = new LcsDiff(originalSequence, modifiedSequence, continueProcessingPredicate);
    return diffAlgo.ComputeDiff(pretty);
  }
  var LineSequence = class {
    constructor(lines) {
      const startColumns = [];
      const endColumns = [];
      for (let i = 0, length = lines.length; i < length; i++) {
        startColumns[i] = getFirstNonBlankColumn(lines[i], 1);
        endColumns[i] = getLastNonBlankColumn(lines[i], 1);
      }
      this.lines = lines;
      this._startColumns = startColumns;
      this._endColumns = endColumns;
    }
    getElements() {
      const elements = [];
      for (let i = 0, len = this.lines.length; i < len; i++) {
        elements[i] = this.lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
      }
      return elements;
    }
    getStrictElement(index) {
      return this.lines[index];
    }
    getStartLineNumber(i) {
      return i + 1;
    }
    getEndLineNumber(i) {
      return i + 1;
    }
    createCharSequence(shouldIgnoreTrimWhitespace, startIndex, endIndex) {
      const charCodes = [];
      const lineNumbers = [];
      const columns = [];
      let len = 0;
      for (let index = startIndex; index <= endIndex; index++) {
        const lineContent = this.lines[index];
        const startColumn = shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1;
        const endColumn = shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1;
        for (let col = startColumn; col < endColumn; col++) {
          charCodes[len] = lineContent.charCodeAt(col - 1);
          lineNumbers[len] = index + 1;
          columns[len] = col;
          len++;
        }
      }
      return new CharSequence(charCodes, lineNumbers, columns);
    }
  };
  var CharSequence = class {
    constructor(charCodes, lineNumbers, columns) {
      this._charCodes = charCodes;
      this._lineNumbers = lineNumbers;
      this._columns = columns;
    }
    getElements() {
      return this._charCodes;
    }
    getStartLineNumber(i) {
      return this._lineNumbers[i];
    }
    getStartColumn(i) {
      return this._columns[i];
    }
    getEndLineNumber(i) {
      return this._lineNumbers[i];
    }
    getEndColumn(i) {
      return this._columns[i] + 1;
    }
  };
  var CharChange = class {
    constructor(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
      this.originalStartLineNumber = originalStartLineNumber;
      this.originalStartColumn = originalStartColumn;
      this.originalEndLineNumber = originalEndLineNumber;
      this.originalEndColumn = originalEndColumn;
      this.modifiedStartLineNumber = modifiedStartLineNumber;
      this.modifiedStartColumn = modifiedStartColumn;
      this.modifiedEndLineNumber = modifiedEndLineNumber;
      this.modifiedEndColumn = modifiedEndColumn;
    }
    static createFromDiffChange(diffChange, originalCharSequence, modifiedCharSequence) {
      let originalStartLineNumber;
      let originalStartColumn;
      let originalEndLineNumber;
      let originalEndColumn;
      let modifiedStartLineNumber;
      let modifiedStartColumn;
      let modifiedEndLineNumber;
      let modifiedEndColumn;
      if (diffChange.originalLength === 0) {
        originalStartLineNumber = 0;
        originalStartColumn = 0;
        originalEndLineNumber = 0;
        originalEndColumn = 0;
      } else {
        originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
        originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
        originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
      }
      if (diffChange.modifiedLength === 0) {
        modifiedStartLineNumber = 0;
        modifiedStartColumn = 0;
        modifiedEndLineNumber = 0;
        modifiedEndColumn = 0;
      } else {
        modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
        modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
        modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
      }
      return new CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
    }
  };
  function postProcessCharChanges(rawChanges) {
    if (rawChanges.length <= 1) {
      return rawChanges;
    }
    const result = [rawChanges[0]];
    let prevChange = result[0];
    for (let i = 1, len = rawChanges.length; i < len; i++) {
      const currChange = rawChanges[i];
      const originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
      const modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
      const matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
      if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
        prevChange.originalLength = currChange.originalStart + currChange.originalLength - prevChange.originalStart;
        prevChange.modifiedLength = currChange.modifiedStart + currChange.modifiedLength - prevChange.modifiedStart;
      } else {
        result.push(currChange);
        prevChange = currChange;
      }
    }
    return result;
  }
  var LineChange = class {
    constructor(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
      this.originalStartLineNumber = originalStartLineNumber;
      this.originalEndLineNumber = originalEndLineNumber;
      this.modifiedStartLineNumber = modifiedStartLineNumber;
      this.modifiedEndLineNumber = modifiedEndLineNumber;
      this.charChanges = charChanges;
    }
    static createFromDiffResult(shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueCharDiff, shouldComputeCharChanges, shouldPostProcessCharChanges) {
      let originalStartLineNumber;
      let originalEndLineNumber;
      let modifiedStartLineNumber;
      let modifiedEndLineNumber;
      let charChanges = void 0;
      if (diffChange.originalLength === 0) {
        originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
        originalEndLineNumber = 0;
      } else {
        originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
        originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
      }
      if (diffChange.modifiedLength === 0) {
        modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
        modifiedEndLineNumber = 0;
      } else {
        modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
        modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
      }
      if (shouldComputeCharChanges && diffChange.originalLength > 0 && diffChange.originalLength < 20 && diffChange.modifiedLength > 0 && diffChange.modifiedLength < 20 && continueCharDiff()) {
        const originalCharSequence = originalLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
        const modifiedCharSequence = modifiedLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
        let rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueCharDiff, true).changes;
        if (shouldPostProcessCharChanges) {
          rawChanges = postProcessCharChanges(rawChanges);
        }
        charChanges = [];
        for (let i = 0, length = rawChanges.length; i < length; i++) {
          charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
        }
      }
      return new LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
    }
  };
  var DiffComputer = class {
    constructor(originalLines, modifiedLines, opts) {
      this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
      this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
      this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
      this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
      this.originalLines = originalLines;
      this.modifiedLines = modifiedLines;
      this.original = new LineSequence(originalLines);
      this.modified = new LineSequence(modifiedLines);
      this.continueLineDiff = createContinueProcessingPredicate(opts.maxComputationTime);
      this.continueCharDiff = createContinueProcessingPredicate(opts.maxComputationTime === 0 ? 0 : Math.min(opts.maxComputationTime, 5e3));
    }
    computeDiff() {
      if (this.original.lines.length === 1 && this.original.lines[0].length === 0) {
        if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
          return {
            quitEarly: false,
            changes: []
          };
        }
        return {
          quitEarly: false,
          changes: [{
            originalStartLineNumber: 1,
            originalEndLineNumber: 1,
            modifiedStartLineNumber: 1,
            modifiedEndLineNumber: this.modified.lines.length,
            charChanges: [{
              modifiedEndColumn: 0,
              modifiedEndLineNumber: 0,
              modifiedStartColumn: 0,
              modifiedStartLineNumber: 0,
              originalEndColumn: 0,
              originalEndLineNumber: 0,
              originalStartColumn: 0,
              originalStartLineNumber: 0
            }]
          }]
        };
      }
      if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
        return {
          quitEarly: false,
          changes: [{
            originalStartLineNumber: 1,
            originalEndLineNumber: this.original.lines.length,
            modifiedStartLineNumber: 1,
            modifiedEndLineNumber: 1,
            charChanges: [{
              modifiedEndColumn: 0,
              modifiedEndLineNumber: 0,
              modifiedStartColumn: 0,
              modifiedStartLineNumber: 0,
              originalEndColumn: 0,
              originalEndLineNumber: 0,
              originalStartColumn: 0,
              originalStartLineNumber: 0
            }]
          }]
        };
      }
      const diffResult = computeDiff(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff);
      const rawChanges = diffResult.changes;
      const quitEarly = diffResult.quitEarly;
      if (this.shouldIgnoreTrimWhitespace) {
        const lineChanges = [];
        for (let i = 0, length = rawChanges.length; i < length; i++) {
          lineChanges.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
        }
        return {
          quitEarly,
          changes: lineChanges
        };
      }
      const result = [];
      let originalLineIndex = 0;
      let modifiedLineIndex = 0;
      for (let i = -1, len = rawChanges.length; i < len; i++) {
        const nextChange = i + 1 < len ? rawChanges[i + 1] : null;
        const originalStop = nextChange ? nextChange.originalStart : this.originalLines.length;
        const modifiedStop = nextChange ? nextChange.modifiedStart : this.modifiedLines.length;
        while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
          const originalLine = this.originalLines[originalLineIndex];
          const modifiedLine = this.modifiedLines[modifiedLineIndex];
          if (originalLine !== modifiedLine) {
            {
              let originalStartColumn = getFirstNonBlankColumn(originalLine, 1);
              let modifiedStartColumn = getFirstNonBlankColumn(modifiedLine, 1);
              while (originalStartColumn > 1 && modifiedStartColumn > 1) {
                const originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                const modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                if (originalChar !== modifiedChar) {
                  break;
                }
                originalStartColumn--;
                modifiedStartColumn--;
              }
              if (originalStartColumn > 1 || modifiedStartColumn > 1) {
                this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
              }
            }
            {
              let originalEndColumn = getLastNonBlankColumn(originalLine, 1);
              let modifiedEndColumn = getLastNonBlankColumn(modifiedLine, 1);
              const originalMaxColumn = originalLine.length + 1;
              const modifiedMaxColumn = modifiedLine.length + 1;
              while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
                const originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                const modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                if (originalChar !== modifiedChar) {
                  break;
                }
                originalEndColumn++;
                modifiedEndColumn++;
              }
              if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
                this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
              }
            }
          }
          originalLineIndex++;
          modifiedLineIndex++;
        }
        if (nextChange) {
          result.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
          originalLineIndex += nextChange.originalLength;
          modifiedLineIndex += nextChange.modifiedLength;
        }
      }
      return {
        quitEarly,
        changes: result
      };
    }
    _pushTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
      if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
        return;
      }
      let charChanges = void 0;
      if (this.shouldComputeCharChanges) {
        charChanges = [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)];
      }
      result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
    }
    _mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
      const len = result.length;
      if (len === 0) {
        return false;
      }
      const prevChange = result[len - 1];
      if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
        return false;
      }
      if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
        prevChange.originalEndLineNumber = originalLineNumber;
        prevChange.modifiedEndLineNumber = modifiedLineNumber;
        if (this.shouldComputeCharChanges && prevChange.charChanges) {
          prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
        }
        return true;
      }
      return false;
    }
  };
  function getFirstNonBlankColumn(txt, defaultValue) {
    const r = firstNonWhitespaceIndex(txt);
    if (r === -1) {
      return defaultValue;
    }
    return r + 1;
  }
  function getLastNonBlankColumn(txt, defaultValue) {
    const r = lastNonWhitespaceIndex(txt);
    if (r === -1) {
      return defaultValue;
    }
    return r + 2;
  }
  function createContinueProcessingPredicate(maximumRuntime) {
    if (maximumRuntime === 0) {
      return () => true;
    }
    const startTime = Date.now();
    return () => {
      return Date.now() - startTime < maximumRuntime;
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/uint.js
  function toUint8(v) {
    if (v < 0) {
      return 0;
    }
    if (v > 255) {
      return 255;
    }
    return v | 0;
  }
  function toUint32(v) {
    if (v < 0) {
      return 0;
    }
    if (v > 4294967295) {
      return 4294967295;
    }
    return v | 0;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/viewModel/prefixSumComputer.js
  var PrefixSumIndexOfResult = class {
    constructor(index, remainder) {
      this._prefixSumIndexOfResultBrand = void 0;
      this.index = index;
      this.remainder = remainder;
    }
  };
  var PrefixSumComputer = class {
    constructor(values) {
      this.values = values;
      this.prefixSum = new Uint32Array(values.length);
      this.prefixSumValidIndex = new Int32Array(1);
      this.prefixSumValidIndex[0] = -1;
    }
    insertValues(insertIndex, insertValues) {
      insertIndex = toUint32(insertIndex);
      const oldValues = this.values;
      const oldPrefixSum = this.prefixSum;
      const insertValuesLen = insertValues.length;
      if (insertValuesLen === 0) {
        return false;
      }
      this.values = new Uint32Array(oldValues.length + insertValuesLen);
      this.values.set(oldValues.subarray(0, insertIndex), 0);
      this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
      this.values.set(insertValues, insertIndex);
      if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
        this.prefixSumValidIndex[0] = insertIndex - 1;
      }
      this.prefixSum = new Uint32Array(this.values.length);
      if (this.prefixSumValidIndex[0] >= 0) {
        this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
      }
      return true;
    }
    changeValue(index, value) {
      index = toUint32(index);
      value = toUint32(value);
      if (this.values[index] === value) {
        return false;
      }
      this.values[index] = value;
      if (index - 1 < this.prefixSumValidIndex[0]) {
        this.prefixSumValidIndex[0] = index - 1;
      }
      return true;
    }
    removeValues(startIndex, count) {
      startIndex = toUint32(startIndex);
      count = toUint32(count);
      const oldValues = this.values;
      const oldPrefixSum = this.prefixSum;
      if (startIndex >= oldValues.length) {
        return false;
      }
      let maxCount = oldValues.length - startIndex;
      if (count >= maxCount) {
        count = maxCount;
      }
      if (count === 0) {
        return false;
      }
      this.values = new Uint32Array(oldValues.length - count);
      this.values.set(oldValues.subarray(0, startIndex), 0);
      this.values.set(oldValues.subarray(startIndex + count), startIndex);
      this.prefixSum = new Uint32Array(this.values.length);
      if (startIndex - 1 < this.prefixSumValidIndex[0]) {
        this.prefixSumValidIndex[0] = startIndex - 1;
      }
      if (this.prefixSumValidIndex[0] >= 0) {
        this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
      }
      return true;
    }
    getTotalSum() {
      if (this.values.length === 0) {
        return 0;
      }
      return this._getPrefixSum(this.values.length - 1);
    }
    getPrefixSum(index) {
      if (index < 0) {
        return 0;
      }
      index = toUint32(index);
      return this._getPrefixSum(index);
    }
    _getPrefixSum(index) {
      if (index <= this.prefixSumValidIndex[0]) {
        return this.prefixSum[index];
      }
      let startIndex = this.prefixSumValidIndex[0] + 1;
      if (startIndex === 0) {
        this.prefixSum[0] = this.values[0];
        startIndex++;
      }
      if (index >= this.values.length) {
        index = this.values.length - 1;
      }
      for (let i = startIndex; i <= index; i++) {
        this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
      }
      this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
      return this.prefixSum[index];
    }
    getIndexOf(sum) {
      sum = Math.floor(sum);
      this.getTotalSum();
      let low = 0;
      let high = this.values.length - 1;
      let mid = 0;
      let midStop = 0;
      let midStart = 0;
      while (low <= high) {
        mid = low + (high - low) / 2 | 0;
        midStop = this.prefixSum[mid];
        midStart = midStop - this.values[mid];
        if (sum < midStart) {
          high = mid - 1;
        } else if (sum >= midStop) {
          low = mid + 1;
        } else {
          break;
        }
      }
      return new PrefixSumIndexOfResult(mid, sum - midStart);
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js
  var MirrorTextModel = class {
    constructor(uri, lines, eol, versionId) {
      this._uri = uri;
      this._lines = lines;
      this._eol = eol;
      this._versionId = versionId;
      this._lineStarts = null;
      this._cachedTextValue = null;
    }
    dispose() {
      this._lines.length = 0;
    }
    get version() {
      return this._versionId;
    }
    getText() {
      if (this._cachedTextValue === null) {
        this._cachedTextValue = this._lines.join(this._eol);
      }
      return this._cachedTextValue;
    }
    onEvents(e) {
      if (e.eol && e.eol !== this._eol) {
        this._eol = e.eol;
        this._lineStarts = null;
      }
      const changes = e.changes;
      for (const change of changes) {
        this._acceptDeleteRange(change.range);
        this._acceptInsertText(new Position(change.range.startLineNumber, change.range.startColumn), change.text);
      }
      this._versionId = e.versionId;
      this._cachedTextValue = null;
    }
    _ensureLineStarts() {
      if (!this._lineStarts) {
        const eolLength = this._eol.length;
        const linesLength = this._lines.length;
        const lineStartValues = new Uint32Array(linesLength);
        for (let i = 0; i < linesLength; i++) {
          lineStartValues[i] = this._lines[i].length + eolLength;
        }
        this._lineStarts = new PrefixSumComputer(lineStartValues);
      }
    }
    _setLineText(lineIndex, newValue) {
      this._lines[lineIndex] = newValue;
      if (this._lineStarts) {
        this._lineStarts.changeValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
      }
    }
    _acceptDeleteRange(range) {
      if (range.startLineNumber === range.endLineNumber) {
        if (range.startColumn === range.endColumn) {
          return;
        }
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
        return;
      }
      this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
      this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
      if (this._lineStarts) {
        this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
      }
    }
    _acceptInsertText(position, insertText) {
      if (insertText.length === 0) {
        return;
      }
      let insertLines = splitLines(insertText);
      if (insertLines.length === 1) {
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0] + this._lines[position.lineNumber - 1].substring(position.column - 1));
        return;
      }
      insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
      this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0]);
      let newLengths = new Uint32Array(insertLines.length - 1);
      for (let i = 1; i < insertLines.length; i++) {
        this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
        newLengths[i - 1] = insertLines[i].length + this._eol.length;
      }
      if (this._lineStarts) {
        this._lineStarts.insertValues(position.lineNumber, newLengths);
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/model/wordHelper.js
  var USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
  function createWordRegExp(allowInWords = "") {
    let source = "(-?\\d*\\.\\d\\w*)|([^";
    for (const sep2 of USUAL_WORD_SEPARATORS) {
      if (allowInWords.indexOf(sep2) >= 0) {
        continue;
      }
      source += "\\" + sep2;
    }
    source += "\\s]+)";
    return new RegExp(source, "g");
  }
  var DEFAULT_WORD_REGEXP = createWordRegExp();
  function ensureValidWordDefinition(wordDefinition) {
    let result = DEFAULT_WORD_REGEXP;
    if (wordDefinition && wordDefinition instanceof RegExp) {
      if (!wordDefinition.global) {
        let flags = "g";
        if (wordDefinition.ignoreCase) {
          flags += "i";
        }
        if (wordDefinition.multiline) {
          flags += "m";
        }
        if (wordDefinition.unicode) {
          flags += "u";
        }
        result = new RegExp(wordDefinition.source, flags);
      } else {
        result = wordDefinition;
      }
    }
    result.lastIndex = 0;
    return result;
  }
  var _defaultConfig = {
    maxLen: 1e3,
    windowSize: 15,
    timeBudget: 150
  };
  function getWordAtText(column, wordDefinition, text, textOffset, config = _defaultConfig) {
    if (text.length > config.maxLen) {
      let start = column - config.maxLen / 2;
      if (start < 0) {
        start = 0;
      } else {
        textOffset += start;
      }
      text = text.substring(start, column + config.maxLen / 2);
      return getWordAtText(column, wordDefinition, text, textOffset, config);
    }
    const t1 = Date.now();
    const pos = column - 1 - textOffset;
    let prevRegexIndex = -1;
    let match = null;
    for (let i = 1; ; i++) {
      if (Date.now() - t1 >= config.timeBudget) {
        break;
      }
      const regexIndex = pos - config.windowSize * i;
      wordDefinition.lastIndex = Math.max(0, regexIndex);
      const thisMatch = _findRegexMatchEnclosingPosition(wordDefinition, text, pos, prevRegexIndex);
      if (!thisMatch && match) {
        break;
      }
      match = thisMatch;
      if (regexIndex <= 0) {
        break;
      }
      prevRegexIndex = regexIndex;
    }
    if (match) {
      let result = {
        word: match[0],
        startColumn: textOffset + 1 + match.index,
        endColumn: textOffset + 1 + match.index + match[0].length
      };
      wordDefinition.lastIndex = 0;
      return result;
    }
    return null;
  }
  function _findRegexMatchEnclosingPosition(wordDefinition, text, pos, stopPos) {
    let match;
    while (match = wordDefinition.exec(text)) {
      const matchIndex = match.index || 0;
      if (matchIndex <= pos && wordDefinition.lastIndex >= pos) {
        return match;
      } else if (stopPos > 0 && matchIndex > stopPos) {
        return null;
      }
    }
    return null;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/core/characterClassifier.js
  var CharacterClassifier = class {
    constructor(_defaultValue) {
      let defaultValue = toUint8(_defaultValue);
      this._defaultValue = defaultValue;
      this._asciiMap = CharacterClassifier._createAsciiMap(defaultValue);
      this._map = new Map();
    }
    static _createAsciiMap(defaultValue) {
      let asciiMap = new Uint8Array(256);
      for (let i = 0; i < 256; i++) {
        asciiMap[i] = defaultValue;
      }
      return asciiMap;
    }
    set(charCode, _value) {
      let value = toUint8(_value);
      if (charCode >= 0 && charCode < 256) {
        this._asciiMap[charCode] = value;
      } else {
        this._map.set(charCode, value);
      }
    }
    get(charCode) {
      if (charCode >= 0 && charCode < 256) {
        return this._asciiMap[charCode];
      } else {
        return this._map.get(charCode) || this._defaultValue;
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/modes/linkComputer.js
  var Uint8Matrix = class {
    constructor(rows, cols, defaultValue) {
      const data = new Uint8Array(rows * cols);
      for (let i = 0, len = rows * cols; i < len; i++) {
        data[i] = defaultValue;
      }
      this._data = data;
      this.rows = rows;
      this.cols = cols;
    }
    get(row, col) {
      return this._data[row * this.cols + col];
    }
    set(row, col, value) {
      this._data[row * this.cols + col] = value;
    }
  };
  var StateMachine = class {
    constructor(edges) {
      let maxCharCode = 0;
      let maxState = 0;
      for (let i = 0, len = edges.length; i < len; i++) {
        let [from, chCode, to] = edges[i];
        if (chCode > maxCharCode) {
          maxCharCode = chCode;
        }
        if (from > maxState) {
          maxState = from;
        }
        if (to > maxState) {
          maxState = to;
        }
      }
      maxCharCode++;
      maxState++;
      let states = new Uint8Matrix(maxState, maxCharCode, 0);
      for (let i = 0, len = edges.length; i < len; i++) {
        let [from, chCode, to] = edges[i];
        states.set(from, chCode, to);
      }
      this._states = states;
      this._maxCharCode = maxCharCode;
    }
    nextState(currentState, chCode) {
      if (chCode < 0 || chCode >= this._maxCharCode) {
        return 0;
      }
      return this._states.get(currentState, chCode);
    }
  };
  var _stateMachine = null;
  function getStateMachine() {
    if (_stateMachine === null) {
      _stateMachine = new StateMachine([
        [1, 104, 2],
        [1, 72, 2],
        [1, 102, 6],
        [1, 70, 6],
        [2, 116, 3],
        [2, 84, 3],
        [3, 116, 4],
        [3, 84, 4],
        [4, 112, 5],
        [4, 80, 5],
        [5, 115, 9],
        [5, 83, 9],
        [5, 58, 10],
        [6, 105, 7],
        [6, 73, 7],
        [7, 108, 8],
        [7, 76, 8],
        [8, 101, 9],
        [8, 69, 9],
        [9, 58, 10],
        [10, 47, 11],
        [11, 47, 12]
      ]);
    }
    return _stateMachine;
  }
  var _classifier = null;
  function getClassifier() {
    if (_classifier === null) {
      _classifier = new CharacterClassifier(0);
      const FORCE_TERMINATION_CHARACTERS = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
      for (let i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
        _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1);
      }
      const CANNOT_END_WITH_CHARACTERS = ".,;";
      for (let i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
        _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2);
      }
    }
    return _classifier;
  }
  var LinkComputer = class {
    static _createLink(classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
      let lastIncludedCharIndex = linkEndIndex - 1;
      do {
        const chCode = line.charCodeAt(lastIncludedCharIndex);
        const chClass = classifier.get(chCode);
        if (chClass !== 2) {
          break;
        }
        lastIncludedCharIndex--;
      } while (lastIncludedCharIndex > linkBeginIndex);
      if (linkBeginIndex > 0) {
        const charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
        const lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
        if (charCodeBeforeLink === 40 && lastCharCodeInLink === 41 || charCodeBeforeLink === 91 && lastCharCodeInLink === 93 || charCodeBeforeLink === 123 && lastCharCodeInLink === 125) {
          lastIncludedCharIndex--;
        }
      }
      return {
        range: {
          startLineNumber: lineNumber,
          startColumn: linkBeginIndex + 1,
          endLineNumber: lineNumber,
          endColumn: lastIncludedCharIndex + 2
        },
        url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
      };
    }
    static computeLinks(model, stateMachine = getStateMachine()) {
      const classifier = getClassifier();
      let result = [];
      for (let i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
        const line = model.getLineContent(i);
        const len = line.length;
        let j = 0;
        let linkBeginIndex = 0;
        let linkBeginChCode = 0;
        let state = 1;
        let hasOpenParens = false;
        let hasOpenSquareBracket = false;
        let inSquareBrackets = false;
        let hasOpenCurlyBracket = false;
        while (j < len) {
          let resetStateMachine = false;
          const chCode = line.charCodeAt(j);
          if (state === 13) {
            let chClass;
            switch (chCode) {
              case 40:
                hasOpenParens = true;
                chClass = 0;
                break;
              case 41:
                chClass = hasOpenParens ? 0 : 1;
                break;
              case 91:
                inSquareBrackets = true;
                hasOpenSquareBracket = true;
                chClass = 0;
                break;
              case 93:
                inSquareBrackets = false;
                chClass = hasOpenSquareBracket ? 0 : 1;
                break;
              case 123:
                hasOpenCurlyBracket = true;
                chClass = 0;
                break;
              case 125:
                chClass = hasOpenCurlyBracket ? 0 : 1;
                break;
              case 39:
                chClass = linkBeginChCode === 34 || linkBeginChCode === 96 ? 0 : 1;
                break;
              case 34:
                chClass = linkBeginChCode === 39 || linkBeginChCode === 96 ? 0 : 1;
                break;
              case 96:
                chClass = linkBeginChCode === 39 || linkBeginChCode === 34 ? 0 : 1;
                break;
              case 42:
                chClass = linkBeginChCode === 42 ? 1 : 0;
                break;
              case 124:
                chClass = linkBeginChCode === 124 ? 1 : 0;
                break;
              case 32:
                chClass = inSquareBrackets ? 0 : 1;
                break;
              default:
                chClass = classifier.get(chCode);
            }
            if (chClass === 1) {
              result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, j));
              resetStateMachine = true;
            }
          } else if (state === 12) {
            let chClass;
            if (chCode === 91) {
              hasOpenSquareBracket = true;
              chClass = 0;
            } else {
              chClass = classifier.get(chCode);
            }
            if (chClass === 1) {
              resetStateMachine = true;
            } else {
              state = 13;
            }
          } else {
            state = stateMachine.nextState(state, chCode);
            if (state === 0) {
              resetStateMachine = true;
            }
          }
          if (resetStateMachine) {
            state = 1;
            hasOpenParens = false;
            hasOpenSquareBracket = false;
            hasOpenCurlyBracket = false;
            linkBeginIndex = j + 1;
            linkBeginChCode = chCode;
          }
          j++;
        }
        if (state === 13) {
          result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, len));
        }
      }
      return result;
    }
  };
  function computeLinks(model) {
    if (!model || typeof model.getLineCount !== "function" || typeof model.getLineContent !== "function") {
      return [];
    }
    return LinkComputer.computeLinks(model);
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/modes/supports/inplaceReplaceSupport.js
  var BasicInplaceReplace = class {
    constructor() {
      this._defaultValueSet = [
        ["true", "false"],
        ["True", "False"],
        ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
        ["public", "protected", "private"]
      ];
    }
    navigateValueSet(range1, text1, range2, text2, up) {
      if (range1 && text1) {
        let result = this.doNavigateValueSet(text1, up);
        if (result) {
          return {
            range: range1,
            value: result
          };
        }
      }
      if (range2 && text2) {
        let result = this.doNavigateValueSet(text2, up);
        if (result) {
          return {
            range: range2,
            value: result
          };
        }
      }
      return null;
    }
    doNavigateValueSet(text, up) {
      let numberResult = this.numberReplace(text, up);
      if (numberResult !== null) {
        return numberResult;
      }
      return this.textReplace(text, up);
    }
    numberReplace(value, up) {
      let precision = Math.pow(10, value.length - (value.lastIndexOf(".") + 1));
      let n1 = Number(value);
      let n2 = parseFloat(value);
      if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
        if (n1 === 0 && !up) {
          return null;
        } else {
          n1 = Math.floor(n1 * precision);
          n1 += up ? precision : -precision;
          return String(n1 / precision);
        }
      }
      return null;
    }
    textReplace(value, up) {
      return this.valueSetsReplace(this._defaultValueSet, value, up);
    }
    valueSetsReplace(valueSets, value, up) {
      let result = null;
      for (let i = 0, len = valueSets.length; result === null && i < len; i++) {
        result = this.valueSetReplace(valueSets[i], value, up);
      }
      return result;
    }
    valueSetReplace(valueSet, value, up) {
      let idx = valueSet.indexOf(value);
      if (idx >= 0) {
        idx += up ? 1 : -1;
        if (idx < 0) {
          idx = valueSet.length - 1;
        } else {
          idx %= valueSet.length;
        }
        return valueSet[idx];
      }
      return null;
    }
  };
  BasicInplaceReplace.INSTANCE = new BasicInplaceReplace();

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/linkedList.js
  var Node = class {
    constructor(element) {
      this.element = element;
      this.next = Node.Undefined;
      this.prev = Node.Undefined;
    }
  };
  Node.Undefined = new Node(void 0);
  var LinkedList = class {
    constructor() {
      this._first = Node.Undefined;
      this._last = Node.Undefined;
      this._size = 0;
    }
    get size() {
      return this._size;
    }
    isEmpty() {
      return this._first === Node.Undefined;
    }
    clear() {
      let node = this._first;
      while (node !== Node.Undefined) {
        const next = node.next;
        node.prev = Node.Undefined;
        node.next = Node.Undefined;
        node = next;
      }
      this._first = Node.Undefined;
      this._last = Node.Undefined;
      this._size = 0;
    }
    unshift(element) {
      return this._insert(element, false);
    }
    push(element) {
      return this._insert(element, true);
    }
    _insert(element, atTheEnd) {
      const newNode = new Node(element);
      if (this._first === Node.Undefined) {
        this._first = newNode;
        this._last = newNode;
      } else if (atTheEnd) {
        const oldLast = this._last;
        this._last = newNode;
        newNode.prev = oldLast;
        oldLast.next = newNode;
      } else {
        const oldFirst = this._first;
        this._first = newNode;
        newNode.next = oldFirst;
        oldFirst.prev = newNode;
      }
      this._size += 1;
      let didRemove = false;
      return () => {
        if (!didRemove) {
          didRemove = true;
          this._remove(newNode);
        }
      };
    }
    shift() {
      if (this._first === Node.Undefined) {
        return void 0;
      } else {
        const res = this._first.element;
        this._remove(this._first);
        return res;
      }
    }
    pop() {
      if (this._last === Node.Undefined) {
        return void 0;
      } else {
        const res = this._last.element;
        this._remove(this._last);
        return res;
      }
    }
    _remove(node) {
      if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
        const anchor = node.prev;
        anchor.next = node.next;
        node.next.prev = anchor;
      } else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
        this._first = Node.Undefined;
        this._last = Node.Undefined;
      } else if (node.next === Node.Undefined) {
        this._last = this._last.prev;
        this._last.next = Node.Undefined;
      } else if (node.prev === Node.Undefined) {
        this._first = this._first.next;
        this._first.prev = Node.Undefined;
      }
      this._size -= 1;
    }
    *[Symbol.iterator]() {
      let node = this._first;
      while (node !== Node.Undefined) {
        yield node.element;
        node = node.next;
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/stopwatch.js
  var hasPerformanceNow = globals.performance && typeof globals.performance.now === "function";
  var StopWatch = class {
    constructor(highResolution) {
      this._highResolution = hasPerformanceNow && highResolution;
      this._startTime = this._now();
      this._stopTime = -1;
    }
    static create(highResolution = true) {
      return new StopWatch(highResolution);
    }
    stop() {
      this._stopTime = this._now();
    }
    elapsed() {
      if (this._stopTime !== -1) {
        return this._stopTime - this._startTime;
      }
      return this._now() - this._startTime;
    }
    _now() {
      return this._highResolution ? globals.performance.now() : Date.now();
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/event.js
  var Event;
  (function(Event2) {
    Event2.None = () => Disposable.None;
    function once2(event) {
      return (listener, thisArgs = null, disposables) => {
        let didFire = false;
        let result;
        result = event((e) => {
          if (didFire) {
            return;
          } else if (result) {
            result.dispose();
          } else {
            didFire = true;
          }
          return listener.call(thisArgs, e);
        }, null, disposables);
        if (didFire) {
          result.dispose();
        }
        return result;
      };
    }
    Event2.once = once2;
    function map(event, map2) {
      return snapshot((listener, thisArgs = null, disposables) => event((i) => listener.call(thisArgs, map2(i)), null, disposables));
    }
    Event2.map = map;
    function forEach(event, each) {
      return snapshot((listener, thisArgs = null, disposables) => event((i) => {
        each(i);
        listener.call(thisArgs, i);
      }, null, disposables));
    }
    Event2.forEach = forEach;
    function filter(event, filter2) {
      return snapshot((listener, thisArgs = null, disposables) => event((e) => filter2(e) && listener.call(thisArgs, e), null, disposables));
    }
    Event2.filter = filter;
    function signal(event) {
      return event;
    }
    Event2.signal = signal;
    function any(...events) {
      return (listener, thisArgs = null, disposables) => combinedDisposable(...events.map((event) => event((e) => listener.call(thisArgs, e), null, disposables)));
    }
    Event2.any = any;
    function reduce(event, merge, initial) {
      let output = initial;
      return map(event, (e) => {
        output = merge(output, e);
        return output;
      });
    }
    Event2.reduce = reduce;
    function snapshot(event) {
      let listener;
      const emitter = new Emitter({
        onFirstListenerAdd() {
          listener = event(emitter.fire, emitter);
        },
        onLastListenerRemove() {
          listener.dispose();
        }
      });
      return emitter.event;
    }
    function debounce(event, merge, delay = 100, leading = false, leakWarningThreshold) {
      let subscription;
      let output = void 0;
      let handle = void 0;
      let numDebouncedCalls = 0;
      const emitter = new Emitter({
        leakWarningThreshold,
        onFirstListenerAdd() {
          subscription = event((cur) => {
            numDebouncedCalls++;
            output = merge(output, cur);
            if (leading && !handle) {
              emitter.fire(output);
              output = void 0;
            }
            clearTimeout(handle);
            handle = setTimeout(() => {
              const _output = output;
              output = void 0;
              handle = void 0;
              if (!leading || numDebouncedCalls > 1) {
                emitter.fire(_output);
              }
              numDebouncedCalls = 0;
            }, delay);
          });
        },
        onLastListenerRemove() {
          subscription.dispose();
        }
      });
      return emitter.event;
    }
    Event2.debounce = debounce;
    function latch(event, equals = (a, b) => a === b) {
      let firstCall = true;
      let cache;
      return filter(event, (value) => {
        const shouldEmit = firstCall || !equals(value, cache);
        firstCall = false;
        cache = value;
        return shouldEmit;
      });
    }
    Event2.latch = latch;
    function split(event, isT) {
      return [
        Event2.filter(event, isT),
        Event2.filter(event, (e) => !isT(e))
      ];
    }
    Event2.split = split;
    function buffer(event, nextTick = false, _buffer = []) {
      let buffer2 = _buffer.slice();
      let listener = event((e) => {
        if (buffer2) {
          buffer2.push(e);
        } else {
          emitter.fire(e);
        }
      });
      const flush = () => {
        if (buffer2) {
          buffer2.forEach((e) => emitter.fire(e));
        }
        buffer2 = null;
      };
      const emitter = new Emitter({
        onFirstListenerAdd() {
          if (!listener) {
            listener = event((e) => emitter.fire(e));
          }
        },
        onFirstListenerDidAdd() {
          if (buffer2) {
            if (nextTick) {
              setTimeout(flush);
            } else {
              flush();
            }
          }
        },
        onLastListenerRemove() {
          if (listener) {
            listener.dispose();
          }
          listener = null;
        }
      });
      return emitter.event;
    }
    Event2.buffer = buffer;
    class ChainableEvent {
      constructor(event) {
        this.event = event;
      }
      map(fn) {
        return new ChainableEvent(map(this.event, fn));
      }
      forEach(fn) {
        return new ChainableEvent(forEach(this.event, fn));
      }
      filter(fn) {
        return new ChainableEvent(filter(this.event, fn));
      }
      reduce(merge, initial) {
        return new ChainableEvent(reduce(this.event, merge, initial));
      }
      latch() {
        return new ChainableEvent(latch(this.event));
      }
      debounce(merge, delay = 100, leading = false, leakWarningThreshold) {
        return new ChainableEvent(debounce(this.event, merge, delay, leading, leakWarningThreshold));
      }
      on(listener, thisArgs, disposables) {
        return this.event(listener, thisArgs, disposables);
      }
      once(listener, thisArgs, disposables) {
        return once2(this.event)(listener, thisArgs, disposables);
      }
    }
    function chain(event) {
      return new ChainableEvent(event);
    }
    Event2.chain = chain;
    function fromNodeEventEmitter(emitter, eventName, map2 = (id) => id) {
      const fn = (...args) => result.fire(map2(...args));
      const onFirstListenerAdd = () => emitter.on(eventName, fn);
      const onLastListenerRemove = () => emitter.removeListener(eventName, fn);
      const result = new Emitter({onFirstListenerAdd, onLastListenerRemove});
      return result.event;
    }
    Event2.fromNodeEventEmitter = fromNodeEventEmitter;
    function fromDOMEventEmitter(emitter, eventName, map2 = (id) => id) {
      const fn = (...args) => result.fire(map2(...args));
      const onFirstListenerAdd = () => emitter.addEventListener(eventName, fn);
      const onLastListenerRemove = () => emitter.removeEventListener(eventName, fn);
      const result = new Emitter({onFirstListenerAdd, onLastListenerRemove});
      return result.event;
    }
    Event2.fromDOMEventEmitter = fromDOMEventEmitter;
    function toPromise(event) {
      return new Promise((resolve2) => once2(event)(resolve2));
    }
    Event2.toPromise = toPromise;
  })(Event || (Event = {}));
  var EventProfiling = class {
    constructor(name) {
      this._listenerCount = 0;
      this._invocationCount = 0;
      this._elapsedOverall = 0;
      this._name = `${name}_${EventProfiling._idPool++}`;
    }
    start(listenerCount) {
      this._stopWatch = new StopWatch(true);
      this._listenerCount = listenerCount;
    }
    stop() {
      if (this._stopWatch) {
        const elapsed = this._stopWatch.elapsed();
        this._elapsedOverall += elapsed;
        this._invocationCount += 1;
        console.info(`did FIRE ${this._name}: elapsed_ms: ${elapsed.toFixed(5)}, listener: ${this._listenerCount} (elapsed_overall: ${this._elapsedOverall.toFixed(2)}, invocations: ${this._invocationCount})`);
        this._stopWatch = void 0;
      }
    }
  };
  EventProfiling._idPool = 0;
  var _globalLeakWarningThreshold = -1;
  var LeakageMonitor = class {
    constructor(customThreshold, name = Math.random().toString(18).slice(2, 5)) {
      this.customThreshold = customThreshold;
      this.name = name;
      this._warnCountdown = 0;
    }
    dispose() {
      if (this._stacks) {
        this._stacks.clear();
      }
    }
    check(listenerCount) {
      let threshold = _globalLeakWarningThreshold;
      if (typeof this.customThreshold === "number") {
        threshold = this.customThreshold;
      }
      if (threshold <= 0 || listenerCount < threshold) {
        return void 0;
      }
      if (!this._stacks) {
        this._stacks = new Map();
      }
      const stack = new Error().stack.split("\n").slice(3).join("\n");
      const count = this._stacks.get(stack) || 0;
      this._stacks.set(stack, count + 1);
      this._warnCountdown -= 1;
      if (this._warnCountdown <= 0) {
        this._warnCountdown = threshold * 0.5;
        let topStack;
        let topCount = 0;
        for (const [stack2, count2] of this._stacks) {
          if (!topStack || topCount < count2) {
            topStack = stack2;
            topCount = count2;
          }
        }
        console.warn(`[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`);
        console.warn(topStack);
      }
      return () => {
        const count2 = this._stacks.get(stack) || 0;
        this._stacks.set(stack, count2 - 1);
      };
    }
  };
  var Emitter = class {
    constructor(options) {
      var _a3;
      this._disposed = false;
      this._options = options;
      this._leakageMon = _globalLeakWarningThreshold > 0 ? new LeakageMonitor(this._options && this._options.leakWarningThreshold) : void 0;
      this._perfMon = ((_a3 = this._options) === null || _a3 === void 0 ? void 0 : _a3._profName) ? new EventProfiling(this._options._profName) : void 0;
    }
    get event() {
      if (!this._event) {
        this._event = (listener, thisArgs, disposables) => {
          var _a3;
          if (!this._listeners) {
            this._listeners = new LinkedList();
          }
          const firstListener = this._listeners.isEmpty();
          if (firstListener && this._options && this._options.onFirstListenerAdd) {
            this._options.onFirstListenerAdd(this);
          }
          const remove = this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
          if (firstListener && this._options && this._options.onFirstListenerDidAdd) {
            this._options.onFirstListenerDidAdd(this);
          }
          if (this._options && this._options.onListenerDidAdd) {
            this._options.onListenerDidAdd(this, listener, thisArgs);
          }
          const removeMonitor = (_a3 = this._leakageMon) === null || _a3 === void 0 ? void 0 : _a3.check(this._listeners.size);
          const result = toDisposable(() => {
            if (removeMonitor) {
              removeMonitor();
            }
            if (!this._disposed) {
              remove();
              if (this._options && this._options.onLastListenerRemove) {
                const hasListeners = this._listeners && !this._listeners.isEmpty();
                if (!hasListeners) {
                  this._options.onLastListenerRemove(this);
                }
              }
            }
          });
          if (disposables instanceof DisposableStore) {
            disposables.add(result);
          } else if (Array.isArray(disposables)) {
            disposables.push(result);
          }
          return result;
        };
      }
      return this._event;
    }
    fire(event) {
      var _a3, _b;
      if (this._listeners) {
        if (!this._deliveryQueue) {
          this._deliveryQueue = new LinkedList();
        }
        for (let listener of this._listeners) {
          this._deliveryQueue.push([listener, event]);
        }
        (_a3 = this._perfMon) === null || _a3 === void 0 ? void 0 : _a3.start(this._deliveryQueue.size);
        while (this._deliveryQueue.size > 0) {
          const [listener, event2] = this._deliveryQueue.shift();
          try {
            if (typeof listener === "function") {
              listener.call(void 0, event2);
            } else {
              listener[0].call(listener[1], event2);
            }
          } catch (e) {
            onUnexpectedError(e);
          }
        }
        (_b = this._perfMon) === null || _b === void 0 ? void 0 : _b.stop();
      }
    }
    dispose() {
      var _a3, _b, _c, _d, _e;
      if (!this._disposed) {
        this._disposed = true;
        (_a3 = this._listeners) === null || _a3 === void 0 ? void 0 : _a3.clear();
        (_b = this._deliveryQueue) === null || _b === void 0 ? void 0 : _b.clear();
        (_d = (_c = this._options) === null || _c === void 0 ? void 0 : _c.onLastListenerRemove) === null || _d === void 0 ? void 0 : _d.call(_c);
        (_e = this._leakageMon) === null || _e === void 0 ? void 0 : _e.dispose();
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/cancellation.js
  var shortcutEvent = Object.freeze(function(callback, context) {
    const handle = setTimeout(callback.bind(context), 0);
    return {dispose() {
      clearTimeout(handle);
    }};
  });
  var CancellationToken;
  (function(CancellationToken2) {
    function isCancellationToken(thing) {
      if (thing === CancellationToken2.None || thing === CancellationToken2.Cancelled) {
        return true;
      }
      if (thing instanceof MutableToken) {
        return true;
      }
      if (!thing || typeof thing !== "object") {
        return false;
      }
      return typeof thing.isCancellationRequested === "boolean" && typeof thing.onCancellationRequested === "function";
    }
    CancellationToken2.isCancellationToken = isCancellationToken;
    CancellationToken2.None = Object.freeze({
      isCancellationRequested: false,
      onCancellationRequested: Event.None
    });
    CancellationToken2.Cancelled = Object.freeze({
      isCancellationRequested: true,
      onCancellationRequested: shortcutEvent
    });
  })(CancellationToken || (CancellationToken = {}));
  var MutableToken = class {
    constructor() {
      this._isCancelled = false;
      this._emitter = null;
    }
    cancel() {
      if (!this._isCancelled) {
        this._isCancelled = true;
        if (this._emitter) {
          this._emitter.fire(void 0);
          this.dispose();
        }
      }
    }
    get isCancellationRequested() {
      return this._isCancelled;
    }
    get onCancellationRequested() {
      if (this._isCancelled) {
        return shortcutEvent;
      }
      if (!this._emitter) {
        this._emitter = new Emitter();
      }
      return this._emitter.event;
    }
    dispose() {
      if (this._emitter) {
        this._emitter.dispose();
        this._emitter = null;
      }
    }
  };
  var CancellationTokenSource = class {
    constructor(parent) {
      this._token = void 0;
      this._parentListener = void 0;
      this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }
    get token() {
      if (!this._token) {
        this._token = new MutableToken();
      }
      return this._token;
    }
    cancel() {
      if (!this._token) {
        this._token = CancellationToken.Cancelled;
      } else if (this._token instanceof MutableToken) {
        this._token.cancel();
      }
    }
    dispose(cancel = false) {
      if (cancel) {
        this.cancel();
      }
      if (this._parentListener) {
        this._parentListener.dispose();
      }
      if (!this._token) {
        this._token = CancellationToken.None;
      } else if (this._token instanceof MutableToken) {
        this._token.dispose();
      }
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/base/common/keyCodes.js
  var KeyCodeStrMap = class {
    constructor() {
      this._keyCodeToStr = [];
      this._strToKeyCode = Object.create(null);
    }
    define(keyCode, str) {
      this._keyCodeToStr[keyCode] = str;
      this._strToKeyCode[str.toLowerCase()] = keyCode;
    }
    keyCodeToStr(keyCode) {
      return this._keyCodeToStr[keyCode];
    }
    strToKeyCode(str) {
      return this._strToKeyCode[str.toLowerCase()] || 0;
    }
  };
  var uiMap = new KeyCodeStrMap();
  var userSettingsUSMap = new KeyCodeStrMap();
  var userSettingsGeneralMap = new KeyCodeStrMap();
  (function() {
    function define(keyCode, uiLabel, usUserSettingsLabel = uiLabel, generalUserSettingsLabel = usUserSettingsLabel) {
      uiMap.define(keyCode, uiLabel);
      userSettingsUSMap.define(keyCode, usUserSettingsLabel);
      userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
    }
    define(0, "unknown");
    define(1, "Backspace");
    define(2, "Tab");
    define(3, "Enter");
    define(4, "Shift");
    define(5, "Ctrl");
    define(6, "Alt");
    define(7, "PauseBreak");
    define(8, "CapsLock");
    define(9, "Escape");
    define(10, "Space");
    define(11, "PageUp");
    define(12, "PageDown");
    define(13, "End");
    define(14, "Home");
    define(15, "LeftArrow", "Left");
    define(16, "UpArrow", "Up");
    define(17, "RightArrow", "Right");
    define(18, "DownArrow", "Down");
    define(19, "Insert");
    define(20, "Delete");
    define(21, "0");
    define(22, "1");
    define(23, "2");
    define(24, "3");
    define(25, "4");
    define(26, "5");
    define(27, "6");
    define(28, "7");
    define(29, "8");
    define(30, "9");
    define(31, "A");
    define(32, "B");
    define(33, "C");
    define(34, "D");
    define(35, "E");
    define(36, "F");
    define(37, "G");
    define(38, "H");
    define(39, "I");
    define(40, "J");
    define(41, "K");
    define(42, "L");
    define(43, "M");
    define(44, "N");
    define(45, "O");
    define(46, "P");
    define(47, "Q");
    define(48, "R");
    define(49, "S");
    define(50, "T");
    define(51, "U");
    define(52, "V");
    define(53, "W");
    define(54, "X");
    define(55, "Y");
    define(56, "Z");
    define(57, "Meta");
    define(58, "ContextMenu");
    define(59, "F1");
    define(60, "F2");
    define(61, "F3");
    define(62, "F4");
    define(63, "F5");
    define(64, "F6");
    define(65, "F7");
    define(66, "F8");
    define(67, "F9");
    define(68, "F10");
    define(69, "F11");
    define(70, "F12");
    define(71, "F13");
    define(72, "F14");
    define(73, "F15");
    define(74, "F16");
    define(75, "F17");
    define(76, "F18");
    define(77, "F19");
    define(78, "NumLock");
    define(79, "ScrollLock");
    define(80, ";", ";", "OEM_1");
    define(81, "=", "=", "OEM_PLUS");
    define(82, ",", ",", "OEM_COMMA");
    define(83, "-", "-", "OEM_MINUS");
    define(84, ".", ".", "OEM_PERIOD");
    define(85, "/", "/", "OEM_2");
    define(86, "`", "`", "OEM_3");
    define(110, "ABNT_C1");
    define(111, "ABNT_C2");
    define(87, "[", "[", "OEM_4");
    define(88, "\\", "\\", "OEM_5");
    define(89, "]", "]", "OEM_6");
    define(90, "'", "'", "OEM_7");
    define(91, "OEM_8");
    define(92, "OEM_102");
    define(93, "NumPad0");
    define(94, "NumPad1");
    define(95, "NumPad2");
    define(96, "NumPad3");
    define(97, "NumPad4");
    define(98, "NumPad5");
    define(99, "NumPad6");
    define(100, "NumPad7");
    define(101, "NumPad8");
    define(102, "NumPad9");
    define(103, "NumPad_Multiply");
    define(104, "NumPad_Add");
    define(105, "NumPad_Separator");
    define(106, "NumPad_Subtract");
    define(107, "NumPad_Decimal");
    define(108, "NumPad_Divide");
  })();
  var KeyCodeUtils;
  (function(KeyCodeUtils2) {
    function toString(keyCode) {
      return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils2.toString = toString;
    function fromString(key) {
      return uiMap.strToKeyCode(key);
    }
    KeyCodeUtils2.fromString = fromString;
    function toUserSettingsUS(keyCode) {
      return userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils2.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
      return userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils2.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
      return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils2.fromUserSettings = fromUserSettings;
  })(KeyCodeUtils || (KeyCodeUtils = {}));
  function KeyChord(firstPart, secondPart) {
    const chordPart = (secondPart & 65535) << 16 >>> 0;
    return (firstPart | chordPart) >>> 0;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/core/selection.js
  var Selection = class extends Range {
    constructor(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
      super(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn);
      this.selectionStartLineNumber = selectionStartLineNumber;
      this.selectionStartColumn = selectionStartColumn;
      this.positionLineNumber = positionLineNumber;
      this.positionColumn = positionColumn;
    }
    toString() {
      return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
    }
    equalsSelection(other) {
      return Selection.selectionsEqual(this, other);
    }
    static selectionsEqual(a, b) {
      return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
    }
    getDirection() {
      if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
        return 0;
      }
      return 1;
    }
    setEndPosition(endLineNumber, endColumn) {
      if (this.getDirection() === 0) {
        return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
      }
      return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    }
    getPosition() {
      return new Position(this.positionLineNumber, this.positionColumn);
    }
    setStartPosition(startLineNumber, startColumn) {
      if (this.getDirection() === 0) {
        return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
      }
      return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    }
    static fromPositions(start, end = start) {
      return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    static liftSelection(sel) {
      return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    }
    static selectionsArrEqual(a, b) {
      if (a && !b || !a && b) {
        return false;
      }
      if (!a && !b) {
        return true;
      }
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0, len = a.length; i < len; i++) {
        if (!this.selectionsEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    static isISelection(obj) {
      return obj && typeof obj.selectionStartLineNumber === "number" && typeof obj.selectionStartColumn === "number" && typeof obj.positionLineNumber === "number" && typeof obj.positionColumn === "number";
    }
    static createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
      if (direction === 0) {
        return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
      }
      return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/core/token.js
  var Token = class {
    constructor(offset, type, language) {
      this._tokenBrand = void 0;
      this.offset = offset | 0;
      this.type = type;
      this.language = language;
    }
    toString() {
      return "(" + this.offset + ", " + this.type + ")";
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js
  var AccessibilitySupport;
  (function(AccessibilitySupport2) {
    AccessibilitySupport2[AccessibilitySupport2["Unknown"] = 0] = "Unknown";
    AccessibilitySupport2[AccessibilitySupport2["Disabled"] = 1] = "Disabled";
    AccessibilitySupport2[AccessibilitySupport2["Enabled"] = 2] = "Enabled";
  })(AccessibilitySupport || (AccessibilitySupport = {}));
  var CompletionItemInsertTextRule;
  (function(CompletionItemInsertTextRule2) {
    CompletionItemInsertTextRule2[CompletionItemInsertTextRule2["KeepWhitespace"] = 1] = "KeepWhitespace";
    CompletionItemInsertTextRule2[CompletionItemInsertTextRule2["InsertAsSnippet"] = 4] = "InsertAsSnippet";
  })(CompletionItemInsertTextRule || (CompletionItemInsertTextRule = {}));
  var CompletionItemKind;
  (function(CompletionItemKind3) {
    CompletionItemKind3[CompletionItemKind3["Method"] = 0] = "Method";
    CompletionItemKind3[CompletionItemKind3["Function"] = 1] = "Function";
    CompletionItemKind3[CompletionItemKind3["Constructor"] = 2] = "Constructor";
    CompletionItemKind3[CompletionItemKind3["Field"] = 3] = "Field";
    CompletionItemKind3[CompletionItemKind3["Variable"] = 4] = "Variable";
    CompletionItemKind3[CompletionItemKind3["Class"] = 5] = "Class";
    CompletionItemKind3[CompletionItemKind3["Struct"] = 6] = "Struct";
    CompletionItemKind3[CompletionItemKind3["Interface"] = 7] = "Interface";
    CompletionItemKind3[CompletionItemKind3["Module"] = 8] = "Module";
    CompletionItemKind3[CompletionItemKind3["Property"] = 9] = "Property";
    CompletionItemKind3[CompletionItemKind3["Event"] = 10] = "Event";
    CompletionItemKind3[CompletionItemKind3["Operator"] = 11] = "Operator";
    CompletionItemKind3[CompletionItemKind3["Unit"] = 12] = "Unit";
    CompletionItemKind3[CompletionItemKind3["Value"] = 13] = "Value";
    CompletionItemKind3[CompletionItemKind3["Constant"] = 14] = "Constant";
    CompletionItemKind3[CompletionItemKind3["Enum"] = 15] = "Enum";
    CompletionItemKind3[CompletionItemKind3["EnumMember"] = 16] = "EnumMember";
    CompletionItemKind3[CompletionItemKind3["Keyword"] = 17] = "Keyword";
    CompletionItemKind3[CompletionItemKind3["Text"] = 18] = "Text";
    CompletionItemKind3[CompletionItemKind3["Color"] = 19] = "Color";
    CompletionItemKind3[CompletionItemKind3["File"] = 20] = "File";
    CompletionItemKind3[CompletionItemKind3["Reference"] = 21] = "Reference";
    CompletionItemKind3[CompletionItemKind3["Customcolor"] = 22] = "Customcolor";
    CompletionItemKind3[CompletionItemKind3["Folder"] = 23] = "Folder";
    CompletionItemKind3[CompletionItemKind3["TypeParameter"] = 24] = "TypeParameter";
    CompletionItemKind3[CompletionItemKind3["User"] = 25] = "User";
    CompletionItemKind3[CompletionItemKind3["Issue"] = 26] = "Issue";
    CompletionItemKind3[CompletionItemKind3["Snippet"] = 27] = "Snippet";
  })(CompletionItemKind || (CompletionItemKind = {}));
  var CompletionItemTag;
  (function(CompletionItemTag3) {
    CompletionItemTag3[CompletionItemTag3["Deprecated"] = 1] = "Deprecated";
  })(CompletionItemTag || (CompletionItemTag = {}));
  var CompletionTriggerKind;
  (function(CompletionTriggerKind2) {
    CompletionTriggerKind2[CompletionTriggerKind2["Invoke"] = 0] = "Invoke";
    CompletionTriggerKind2[CompletionTriggerKind2["TriggerCharacter"] = 1] = "TriggerCharacter";
    CompletionTriggerKind2[CompletionTriggerKind2["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
  })(CompletionTriggerKind || (CompletionTriggerKind = {}));
  var ContentWidgetPositionPreference;
  (function(ContentWidgetPositionPreference2) {
    ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["EXACT"] = 0] = "EXACT";
    ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["ABOVE"] = 1] = "ABOVE";
    ContentWidgetPositionPreference2[ContentWidgetPositionPreference2["BELOW"] = 2] = "BELOW";
  })(ContentWidgetPositionPreference || (ContentWidgetPositionPreference = {}));
  var CursorChangeReason;
  (function(CursorChangeReason2) {
    CursorChangeReason2[CursorChangeReason2["NotSet"] = 0] = "NotSet";
    CursorChangeReason2[CursorChangeReason2["ContentFlush"] = 1] = "ContentFlush";
    CursorChangeReason2[CursorChangeReason2["RecoverFromMarkers"] = 2] = "RecoverFromMarkers";
    CursorChangeReason2[CursorChangeReason2["Explicit"] = 3] = "Explicit";
    CursorChangeReason2[CursorChangeReason2["Paste"] = 4] = "Paste";
    CursorChangeReason2[CursorChangeReason2["Undo"] = 5] = "Undo";
    CursorChangeReason2[CursorChangeReason2["Redo"] = 6] = "Redo";
  })(CursorChangeReason || (CursorChangeReason = {}));
  var DefaultEndOfLine;
  (function(DefaultEndOfLine2) {
    DefaultEndOfLine2[DefaultEndOfLine2["LF"] = 1] = "LF";
    DefaultEndOfLine2[DefaultEndOfLine2["CRLF"] = 2] = "CRLF";
  })(DefaultEndOfLine || (DefaultEndOfLine = {}));
  var DocumentHighlightKind;
  (function(DocumentHighlightKind3) {
    DocumentHighlightKind3[DocumentHighlightKind3["Text"] = 0] = "Text";
    DocumentHighlightKind3[DocumentHighlightKind3["Read"] = 1] = "Read";
    DocumentHighlightKind3[DocumentHighlightKind3["Write"] = 2] = "Write";
  })(DocumentHighlightKind || (DocumentHighlightKind = {}));
  var EditorAutoIndentStrategy;
  (function(EditorAutoIndentStrategy2) {
    EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["None"] = 0] = "None";
    EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Keep"] = 1] = "Keep";
    EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Brackets"] = 2] = "Brackets";
    EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Advanced"] = 3] = "Advanced";
    EditorAutoIndentStrategy2[EditorAutoIndentStrategy2["Full"] = 4] = "Full";
  })(EditorAutoIndentStrategy || (EditorAutoIndentStrategy = {}));
  var EditorOption;
  (function(EditorOption2) {
    EditorOption2[EditorOption2["acceptSuggestionOnCommitCharacter"] = 0] = "acceptSuggestionOnCommitCharacter";
    EditorOption2[EditorOption2["acceptSuggestionOnEnter"] = 1] = "acceptSuggestionOnEnter";
    EditorOption2[EditorOption2["accessibilitySupport"] = 2] = "accessibilitySupport";
    EditorOption2[EditorOption2["accessibilityPageSize"] = 3] = "accessibilityPageSize";
    EditorOption2[EditorOption2["ariaLabel"] = 4] = "ariaLabel";
    EditorOption2[EditorOption2["autoClosingBrackets"] = 5] = "autoClosingBrackets";
    EditorOption2[EditorOption2["autoClosingDelete"] = 6] = "autoClosingDelete";
    EditorOption2[EditorOption2["autoClosingOvertype"] = 7] = "autoClosingOvertype";
    EditorOption2[EditorOption2["autoClosingQuotes"] = 8] = "autoClosingQuotes";
    EditorOption2[EditorOption2["autoIndent"] = 9] = "autoIndent";
    EditorOption2[EditorOption2["automaticLayout"] = 10] = "automaticLayout";
    EditorOption2[EditorOption2["autoSurround"] = 11] = "autoSurround";
    EditorOption2[EditorOption2["bracketPairColorization"] = 12] = "bracketPairColorization";
    EditorOption2[EditorOption2["guides"] = 13] = "guides";
    EditorOption2[EditorOption2["codeLens"] = 14] = "codeLens";
    EditorOption2[EditorOption2["codeLensFontFamily"] = 15] = "codeLensFontFamily";
    EditorOption2[EditorOption2["codeLensFontSize"] = 16] = "codeLensFontSize";
    EditorOption2[EditorOption2["colorDecorators"] = 17] = "colorDecorators";
    EditorOption2[EditorOption2["columnSelection"] = 18] = "columnSelection";
    EditorOption2[EditorOption2["comments"] = 19] = "comments";
    EditorOption2[EditorOption2["contextmenu"] = 20] = "contextmenu";
    EditorOption2[EditorOption2["copyWithSyntaxHighlighting"] = 21] = "copyWithSyntaxHighlighting";
    EditorOption2[EditorOption2["cursorBlinking"] = 22] = "cursorBlinking";
    EditorOption2[EditorOption2["cursorSmoothCaretAnimation"] = 23] = "cursorSmoothCaretAnimation";
    EditorOption2[EditorOption2["cursorStyle"] = 24] = "cursorStyle";
    EditorOption2[EditorOption2["cursorSurroundingLines"] = 25] = "cursorSurroundingLines";
    EditorOption2[EditorOption2["cursorSurroundingLinesStyle"] = 26] = "cursorSurroundingLinesStyle";
    EditorOption2[EditorOption2["cursorWidth"] = 27] = "cursorWidth";
    EditorOption2[EditorOption2["disableLayerHinting"] = 28] = "disableLayerHinting";
    EditorOption2[EditorOption2["disableMonospaceOptimizations"] = 29] = "disableMonospaceOptimizations";
    EditorOption2[EditorOption2["domReadOnly"] = 30] = "domReadOnly";
    EditorOption2[EditorOption2["dragAndDrop"] = 31] = "dragAndDrop";
    EditorOption2[EditorOption2["emptySelectionClipboard"] = 32] = "emptySelectionClipboard";
    EditorOption2[EditorOption2["extraEditorClassName"] = 33] = "extraEditorClassName";
    EditorOption2[EditorOption2["fastScrollSensitivity"] = 34] = "fastScrollSensitivity";
    EditorOption2[EditorOption2["find"] = 35] = "find";
    EditorOption2[EditorOption2["fixedOverflowWidgets"] = 36] = "fixedOverflowWidgets";
    EditorOption2[EditorOption2["folding"] = 37] = "folding";
    EditorOption2[EditorOption2["foldingStrategy"] = 38] = "foldingStrategy";
    EditorOption2[EditorOption2["foldingHighlight"] = 39] = "foldingHighlight";
    EditorOption2[EditorOption2["foldingImportsByDefault"] = 40] = "foldingImportsByDefault";
    EditorOption2[EditorOption2["unfoldOnClickAfterEndOfLine"] = 41] = "unfoldOnClickAfterEndOfLine";
    EditorOption2[EditorOption2["fontFamily"] = 42] = "fontFamily";
    EditorOption2[EditorOption2["fontInfo"] = 43] = "fontInfo";
    EditorOption2[EditorOption2["fontLigatures"] = 44] = "fontLigatures";
    EditorOption2[EditorOption2["fontSize"] = 45] = "fontSize";
    EditorOption2[EditorOption2["fontWeight"] = 46] = "fontWeight";
    EditorOption2[EditorOption2["formatOnPaste"] = 47] = "formatOnPaste";
    EditorOption2[EditorOption2["formatOnType"] = 48] = "formatOnType";
    EditorOption2[EditorOption2["glyphMargin"] = 49] = "glyphMargin";
    EditorOption2[EditorOption2["gotoLocation"] = 50] = "gotoLocation";
    EditorOption2[EditorOption2["hideCursorInOverviewRuler"] = 51] = "hideCursorInOverviewRuler";
    EditorOption2[EditorOption2["hover"] = 52] = "hover";
    EditorOption2[EditorOption2["inDiffEditor"] = 53] = "inDiffEditor";
    EditorOption2[EditorOption2["inlineSuggest"] = 54] = "inlineSuggest";
    EditorOption2[EditorOption2["letterSpacing"] = 55] = "letterSpacing";
    EditorOption2[EditorOption2["lightbulb"] = 56] = "lightbulb";
    EditorOption2[EditorOption2["lineDecorationsWidth"] = 57] = "lineDecorationsWidth";
    EditorOption2[EditorOption2["lineHeight"] = 58] = "lineHeight";
    EditorOption2[EditorOption2["lineNumbers"] = 59] = "lineNumbers";
    EditorOption2[EditorOption2["lineNumbersMinChars"] = 60] = "lineNumbersMinChars";
    EditorOption2[EditorOption2["linkedEditing"] = 61] = "linkedEditing";
    EditorOption2[EditorOption2["links"] = 62] = "links";
    EditorOption2[EditorOption2["matchBrackets"] = 63] = "matchBrackets";
    EditorOption2[EditorOption2["minimap"] = 64] = "minimap";
    EditorOption2[EditorOption2["mouseStyle"] = 65] = "mouseStyle";
    EditorOption2[EditorOption2["mouseWheelScrollSensitivity"] = 66] = "mouseWheelScrollSensitivity";
    EditorOption2[EditorOption2["mouseWheelZoom"] = 67] = "mouseWheelZoom";
    EditorOption2[EditorOption2["multiCursorMergeOverlapping"] = 68] = "multiCursorMergeOverlapping";
    EditorOption2[EditorOption2["multiCursorModifier"] = 69] = "multiCursorModifier";
    EditorOption2[EditorOption2["multiCursorPaste"] = 70] = "multiCursorPaste";
    EditorOption2[EditorOption2["occurrencesHighlight"] = 71] = "occurrencesHighlight";
    EditorOption2[EditorOption2["overviewRulerBorder"] = 72] = "overviewRulerBorder";
    EditorOption2[EditorOption2["overviewRulerLanes"] = 73] = "overviewRulerLanes";
    EditorOption2[EditorOption2["padding"] = 74] = "padding";
    EditorOption2[EditorOption2["parameterHints"] = 75] = "parameterHints";
    EditorOption2[EditorOption2["peekWidgetDefaultFocus"] = 76] = "peekWidgetDefaultFocus";
    EditorOption2[EditorOption2["definitionLinkOpensInPeek"] = 77] = "definitionLinkOpensInPeek";
    EditorOption2[EditorOption2["quickSuggestions"] = 78] = "quickSuggestions";
    EditorOption2[EditorOption2["quickSuggestionsDelay"] = 79] = "quickSuggestionsDelay";
    EditorOption2[EditorOption2["readOnly"] = 80] = "readOnly";
    EditorOption2[EditorOption2["renameOnType"] = 81] = "renameOnType";
    EditorOption2[EditorOption2["renderControlCharacters"] = 82] = "renderControlCharacters";
    EditorOption2[EditorOption2["renderFinalNewline"] = 83] = "renderFinalNewline";
    EditorOption2[EditorOption2["renderLineHighlight"] = 84] = "renderLineHighlight";
    EditorOption2[EditorOption2["renderLineHighlightOnlyWhenFocus"] = 85] = "renderLineHighlightOnlyWhenFocus";
    EditorOption2[EditorOption2["renderValidationDecorations"] = 86] = "renderValidationDecorations";
    EditorOption2[EditorOption2["renderWhitespace"] = 87] = "renderWhitespace";
    EditorOption2[EditorOption2["revealHorizontalRightPadding"] = 88] = "revealHorizontalRightPadding";
    EditorOption2[EditorOption2["roundedSelection"] = 89] = "roundedSelection";
    EditorOption2[EditorOption2["rulers"] = 90] = "rulers";
    EditorOption2[EditorOption2["scrollbar"] = 91] = "scrollbar";
    EditorOption2[EditorOption2["scrollBeyondLastColumn"] = 92] = "scrollBeyondLastColumn";
    EditorOption2[EditorOption2["scrollBeyondLastLine"] = 93] = "scrollBeyondLastLine";
    EditorOption2[EditorOption2["scrollPredominantAxis"] = 94] = "scrollPredominantAxis";
    EditorOption2[EditorOption2["selectionClipboard"] = 95] = "selectionClipboard";
    EditorOption2[EditorOption2["selectionHighlight"] = 96] = "selectionHighlight";
    EditorOption2[EditorOption2["selectOnLineNumbers"] = 97] = "selectOnLineNumbers";
    EditorOption2[EditorOption2["showFoldingControls"] = 98] = "showFoldingControls";
    EditorOption2[EditorOption2["showUnused"] = 99] = "showUnused";
    EditorOption2[EditorOption2["snippetSuggestions"] = 100] = "snippetSuggestions";
    EditorOption2[EditorOption2["smartSelect"] = 101] = "smartSelect";
    EditorOption2[EditorOption2["smoothScrolling"] = 102] = "smoothScrolling";
    EditorOption2[EditorOption2["stickyTabStops"] = 103] = "stickyTabStops";
    EditorOption2[EditorOption2["stopRenderingLineAfter"] = 104] = "stopRenderingLineAfter";
    EditorOption2[EditorOption2["suggest"] = 105] = "suggest";
    EditorOption2[EditorOption2["suggestFontSize"] = 106] = "suggestFontSize";
    EditorOption2[EditorOption2["suggestLineHeight"] = 107] = "suggestLineHeight";
    EditorOption2[EditorOption2["suggestOnTriggerCharacters"] = 108] = "suggestOnTriggerCharacters";
    EditorOption2[EditorOption2["suggestSelection"] = 109] = "suggestSelection";
    EditorOption2[EditorOption2["tabCompletion"] = 110] = "tabCompletion";
    EditorOption2[EditorOption2["tabIndex"] = 111] = "tabIndex";
    EditorOption2[EditorOption2["unusualLineTerminators"] = 112] = "unusualLineTerminators";
    EditorOption2[EditorOption2["useShadowDOM"] = 113] = "useShadowDOM";
    EditorOption2[EditorOption2["useTabStops"] = 114] = "useTabStops";
    EditorOption2[EditorOption2["wordSeparators"] = 115] = "wordSeparators";
    EditorOption2[EditorOption2["wordWrap"] = 116] = "wordWrap";
    EditorOption2[EditorOption2["wordWrapBreakAfterCharacters"] = 117] = "wordWrapBreakAfterCharacters";
    EditorOption2[EditorOption2["wordWrapBreakBeforeCharacters"] = 118] = "wordWrapBreakBeforeCharacters";
    EditorOption2[EditorOption2["wordWrapColumn"] = 119] = "wordWrapColumn";
    EditorOption2[EditorOption2["wordWrapOverride1"] = 120] = "wordWrapOverride1";
    EditorOption2[EditorOption2["wordWrapOverride2"] = 121] = "wordWrapOverride2";
    EditorOption2[EditorOption2["wrappingIndent"] = 122] = "wrappingIndent";
    EditorOption2[EditorOption2["wrappingStrategy"] = 123] = "wrappingStrategy";
    EditorOption2[EditorOption2["showDeprecated"] = 124] = "showDeprecated";
    EditorOption2[EditorOption2["inlayHints"] = 125] = "inlayHints";
    EditorOption2[EditorOption2["editorClassName"] = 126] = "editorClassName";
    EditorOption2[EditorOption2["pixelRatio"] = 127] = "pixelRatio";
    EditorOption2[EditorOption2["tabFocusMode"] = 128] = "tabFocusMode";
    EditorOption2[EditorOption2["layoutInfo"] = 129] = "layoutInfo";
    EditorOption2[EditorOption2["wrappingInfo"] = 130] = "wrappingInfo";
  })(EditorOption || (EditorOption = {}));
  var EndOfLinePreference;
  (function(EndOfLinePreference2) {
    EndOfLinePreference2[EndOfLinePreference2["TextDefined"] = 0] = "TextDefined";
    EndOfLinePreference2[EndOfLinePreference2["LF"] = 1] = "LF";
    EndOfLinePreference2[EndOfLinePreference2["CRLF"] = 2] = "CRLF";
  })(EndOfLinePreference || (EndOfLinePreference = {}));
  var EndOfLineSequence;
  (function(EndOfLineSequence2) {
    EndOfLineSequence2[EndOfLineSequence2["LF"] = 0] = "LF";
    EndOfLineSequence2[EndOfLineSequence2["CRLF"] = 1] = "CRLF";
  })(EndOfLineSequence || (EndOfLineSequence = {}));
  var IndentAction;
  (function(IndentAction2) {
    IndentAction2[IndentAction2["None"] = 0] = "None";
    IndentAction2[IndentAction2["Indent"] = 1] = "Indent";
    IndentAction2[IndentAction2["IndentOutdent"] = 2] = "IndentOutdent";
    IndentAction2[IndentAction2["Outdent"] = 3] = "Outdent";
  })(IndentAction || (IndentAction = {}));
  var InlayHintKind;
  (function(InlayHintKind2) {
    InlayHintKind2[InlayHintKind2["Other"] = 0] = "Other";
    InlayHintKind2[InlayHintKind2["Type"] = 1] = "Type";
    InlayHintKind2[InlayHintKind2["Parameter"] = 2] = "Parameter";
  })(InlayHintKind || (InlayHintKind = {}));
  var InlineCompletionTriggerKind;
  (function(InlineCompletionTriggerKind2) {
    InlineCompletionTriggerKind2[InlineCompletionTriggerKind2["Automatic"] = 0] = "Automatic";
    InlineCompletionTriggerKind2[InlineCompletionTriggerKind2["Explicit"] = 1] = "Explicit";
  })(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
  var KeyCode;
  (function(KeyCode2) {
    KeyCode2[KeyCode2["DependsOnKbLayout"] = -1] = "DependsOnKbLayout";
    KeyCode2[KeyCode2["Unknown"] = 0] = "Unknown";
    KeyCode2[KeyCode2["Backspace"] = 1] = "Backspace";
    KeyCode2[KeyCode2["Tab"] = 2] = "Tab";
    KeyCode2[KeyCode2["Enter"] = 3] = "Enter";
    KeyCode2[KeyCode2["Shift"] = 4] = "Shift";
    KeyCode2[KeyCode2["Ctrl"] = 5] = "Ctrl";
    KeyCode2[KeyCode2["Alt"] = 6] = "Alt";
    KeyCode2[KeyCode2["PauseBreak"] = 7] = "PauseBreak";
    KeyCode2[KeyCode2["CapsLock"] = 8] = "CapsLock";
    KeyCode2[KeyCode2["Escape"] = 9] = "Escape";
    KeyCode2[KeyCode2["Space"] = 10] = "Space";
    KeyCode2[KeyCode2["PageUp"] = 11] = "PageUp";
    KeyCode2[KeyCode2["PageDown"] = 12] = "PageDown";
    KeyCode2[KeyCode2["End"] = 13] = "End";
    KeyCode2[KeyCode2["Home"] = 14] = "Home";
    KeyCode2[KeyCode2["LeftArrow"] = 15] = "LeftArrow";
    KeyCode2[KeyCode2["UpArrow"] = 16] = "UpArrow";
    KeyCode2[KeyCode2["RightArrow"] = 17] = "RightArrow";
    KeyCode2[KeyCode2["DownArrow"] = 18] = "DownArrow";
    KeyCode2[KeyCode2["Insert"] = 19] = "Insert";
    KeyCode2[KeyCode2["Delete"] = 20] = "Delete";
    KeyCode2[KeyCode2["KEY_0"] = 21] = "KEY_0";
    KeyCode2[KeyCode2["KEY_1"] = 22] = "KEY_1";
    KeyCode2[KeyCode2["KEY_2"] = 23] = "KEY_2";
    KeyCode2[KeyCode2["KEY_3"] = 24] = "KEY_3";
    KeyCode2[KeyCode2["KEY_4"] = 25] = "KEY_4";
    KeyCode2[KeyCode2["KEY_5"] = 26] = "KEY_5";
    KeyCode2[KeyCode2["KEY_6"] = 27] = "KEY_6";
    KeyCode2[KeyCode2["KEY_7"] = 28] = "KEY_7";
    KeyCode2[KeyCode2["KEY_8"] = 29] = "KEY_8";
    KeyCode2[KeyCode2["KEY_9"] = 30] = "KEY_9";
    KeyCode2[KeyCode2["KEY_A"] = 31] = "KEY_A";
    KeyCode2[KeyCode2["KEY_B"] = 32] = "KEY_B";
    KeyCode2[KeyCode2["KEY_C"] = 33] = "KEY_C";
    KeyCode2[KeyCode2["KEY_D"] = 34] = "KEY_D";
    KeyCode2[KeyCode2["KEY_E"] = 35] = "KEY_E";
    KeyCode2[KeyCode2["KEY_F"] = 36] = "KEY_F";
    KeyCode2[KeyCode2["KEY_G"] = 37] = "KEY_G";
    KeyCode2[KeyCode2["KEY_H"] = 38] = "KEY_H";
    KeyCode2[KeyCode2["KEY_I"] = 39] = "KEY_I";
    KeyCode2[KeyCode2["KEY_J"] = 40] = "KEY_J";
    KeyCode2[KeyCode2["KEY_K"] = 41] = "KEY_K";
    KeyCode2[KeyCode2["KEY_L"] = 42] = "KEY_L";
    KeyCode2[KeyCode2["KEY_M"] = 43] = "KEY_M";
    KeyCode2[KeyCode2["KEY_N"] = 44] = "KEY_N";
    KeyCode2[KeyCode2["KEY_O"] = 45] = "KEY_O";
    KeyCode2[KeyCode2["KEY_P"] = 46] = "KEY_P";
    KeyCode2[KeyCode2["KEY_Q"] = 47] = "KEY_Q";
    KeyCode2[KeyCode2["KEY_R"] = 48] = "KEY_R";
    KeyCode2[KeyCode2["KEY_S"] = 49] = "KEY_S";
    KeyCode2[KeyCode2["KEY_T"] = 50] = "KEY_T";
    KeyCode2[KeyCode2["KEY_U"] = 51] = "KEY_U";
    KeyCode2[KeyCode2["KEY_V"] = 52] = "KEY_V";
    KeyCode2[KeyCode2["KEY_W"] = 53] = "KEY_W";
    KeyCode2[KeyCode2["KEY_X"] = 54] = "KEY_X";
    KeyCode2[KeyCode2["KEY_Y"] = 55] = "KEY_Y";
    KeyCode2[KeyCode2["KEY_Z"] = 56] = "KEY_Z";
    KeyCode2[KeyCode2["Meta"] = 57] = "Meta";
    KeyCode2[KeyCode2["ContextMenu"] = 58] = "ContextMenu";
    KeyCode2[KeyCode2["F1"] = 59] = "F1";
    KeyCode2[KeyCode2["F2"] = 60] = "F2";
    KeyCode2[KeyCode2["F3"] = 61] = "F3";
    KeyCode2[KeyCode2["F4"] = 62] = "F4";
    KeyCode2[KeyCode2["F5"] = 63] = "F5";
    KeyCode2[KeyCode2["F6"] = 64] = "F6";
    KeyCode2[KeyCode2["F7"] = 65] = "F7";
    KeyCode2[KeyCode2["F8"] = 66] = "F8";
    KeyCode2[KeyCode2["F9"] = 67] = "F9";
    KeyCode2[KeyCode2["F10"] = 68] = "F10";
    KeyCode2[KeyCode2["F11"] = 69] = "F11";
    KeyCode2[KeyCode2["F12"] = 70] = "F12";
    KeyCode2[KeyCode2["F13"] = 71] = "F13";
    KeyCode2[KeyCode2["F14"] = 72] = "F14";
    KeyCode2[KeyCode2["F15"] = 73] = "F15";
    KeyCode2[KeyCode2["F16"] = 74] = "F16";
    KeyCode2[KeyCode2["F17"] = 75] = "F17";
    KeyCode2[KeyCode2["F18"] = 76] = "F18";
    KeyCode2[KeyCode2["F19"] = 77] = "F19";
    KeyCode2[KeyCode2["NumLock"] = 78] = "NumLock";
    KeyCode2[KeyCode2["ScrollLock"] = 79] = "ScrollLock";
    KeyCode2[KeyCode2["US_SEMICOLON"] = 80] = "US_SEMICOLON";
    KeyCode2[KeyCode2["US_EQUAL"] = 81] = "US_EQUAL";
    KeyCode2[KeyCode2["US_COMMA"] = 82] = "US_COMMA";
    KeyCode2[KeyCode2["US_MINUS"] = 83] = "US_MINUS";
    KeyCode2[KeyCode2["US_DOT"] = 84] = "US_DOT";
    KeyCode2[KeyCode2["US_SLASH"] = 85] = "US_SLASH";
    KeyCode2[KeyCode2["US_BACKTICK"] = 86] = "US_BACKTICK";
    KeyCode2[KeyCode2["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
    KeyCode2[KeyCode2["US_BACKSLASH"] = 88] = "US_BACKSLASH";
    KeyCode2[KeyCode2["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
    KeyCode2[KeyCode2["US_QUOTE"] = 90] = "US_QUOTE";
    KeyCode2[KeyCode2["OEM_8"] = 91] = "OEM_8";
    KeyCode2[KeyCode2["OEM_102"] = 92] = "OEM_102";
    KeyCode2[KeyCode2["NUMPAD_0"] = 93] = "NUMPAD_0";
    KeyCode2[KeyCode2["NUMPAD_1"] = 94] = "NUMPAD_1";
    KeyCode2[KeyCode2["NUMPAD_2"] = 95] = "NUMPAD_2";
    KeyCode2[KeyCode2["NUMPAD_3"] = 96] = "NUMPAD_3";
    KeyCode2[KeyCode2["NUMPAD_4"] = 97] = "NUMPAD_4";
    KeyCode2[KeyCode2["NUMPAD_5"] = 98] = "NUMPAD_5";
    KeyCode2[KeyCode2["NUMPAD_6"] = 99] = "NUMPAD_6";
    KeyCode2[KeyCode2["NUMPAD_7"] = 100] = "NUMPAD_7";
    KeyCode2[KeyCode2["NUMPAD_8"] = 101] = "NUMPAD_8";
    KeyCode2[KeyCode2["NUMPAD_9"] = 102] = "NUMPAD_9";
    KeyCode2[KeyCode2["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
    KeyCode2[KeyCode2["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
    KeyCode2[KeyCode2["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
    KeyCode2[KeyCode2["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
    KeyCode2[KeyCode2["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
    KeyCode2[KeyCode2["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
    KeyCode2[KeyCode2["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
    KeyCode2[KeyCode2["ABNT_C1"] = 110] = "ABNT_C1";
    KeyCode2[KeyCode2["ABNT_C2"] = 111] = "ABNT_C2";
    KeyCode2[KeyCode2["MAX_VALUE"] = 112] = "MAX_VALUE";
  })(KeyCode || (KeyCode = {}));
  var MarkerSeverity;
  (function(MarkerSeverity2) {
    MarkerSeverity2[MarkerSeverity2["Hint"] = 1] = "Hint";
    MarkerSeverity2[MarkerSeverity2["Info"] = 2] = "Info";
    MarkerSeverity2[MarkerSeverity2["Warning"] = 4] = "Warning";
    MarkerSeverity2[MarkerSeverity2["Error"] = 8] = "Error";
  })(MarkerSeverity || (MarkerSeverity = {}));
  var MarkerTag;
  (function(MarkerTag2) {
    MarkerTag2[MarkerTag2["Unnecessary"] = 1] = "Unnecessary";
    MarkerTag2[MarkerTag2["Deprecated"] = 2] = "Deprecated";
  })(MarkerTag || (MarkerTag = {}));
  var MinimapPosition;
  (function(MinimapPosition2) {
    MinimapPosition2[MinimapPosition2["Inline"] = 1] = "Inline";
    MinimapPosition2[MinimapPosition2["Gutter"] = 2] = "Gutter";
  })(MinimapPosition || (MinimapPosition = {}));
  var MouseTargetType;
  (function(MouseTargetType2) {
    MouseTargetType2[MouseTargetType2["UNKNOWN"] = 0] = "UNKNOWN";
    MouseTargetType2[MouseTargetType2["TEXTAREA"] = 1] = "TEXTAREA";
    MouseTargetType2[MouseTargetType2["GUTTER_GLYPH_MARGIN"] = 2] = "GUTTER_GLYPH_MARGIN";
    MouseTargetType2[MouseTargetType2["GUTTER_LINE_NUMBERS"] = 3] = "GUTTER_LINE_NUMBERS";
    MouseTargetType2[MouseTargetType2["GUTTER_LINE_DECORATIONS"] = 4] = "GUTTER_LINE_DECORATIONS";
    MouseTargetType2[MouseTargetType2["GUTTER_VIEW_ZONE"] = 5] = "GUTTER_VIEW_ZONE";
    MouseTargetType2[MouseTargetType2["CONTENT_TEXT"] = 6] = "CONTENT_TEXT";
    MouseTargetType2[MouseTargetType2["CONTENT_EMPTY"] = 7] = "CONTENT_EMPTY";
    MouseTargetType2[MouseTargetType2["CONTENT_VIEW_ZONE"] = 8] = "CONTENT_VIEW_ZONE";
    MouseTargetType2[MouseTargetType2["CONTENT_WIDGET"] = 9] = "CONTENT_WIDGET";
    MouseTargetType2[MouseTargetType2["OVERVIEW_RULER"] = 10] = "OVERVIEW_RULER";
    MouseTargetType2[MouseTargetType2["SCROLLBAR"] = 11] = "SCROLLBAR";
    MouseTargetType2[MouseTargetType2["OVERLAY_WIDGET"] = 12] = "OVERLAY_WIDGET";
    MouseTargetType2[MouseTargetType2["OUTSIDE_EDITOR"] = 13] = "OUTSIDE_EDITOR";
  })(MouseTargetType || (MouseTargetType = {}));
  var OverlayWidgetPositionPreference;
  (function(OverlayWidgetPositionPreference2) {
    OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["TOP_RIGHT_CORNER"] = 0] = "TOP_RIGHT_CORNER";
    OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["BOTTOM_RIGHT_CORNER"] = 1] = "BOTTOM_RIGHT_CORNER";
    OverlayWidgetPositionPreference2[OverlayWidgetPositionPreference2["TOP_CENTER"] = 2] = "TOP_CENTER";
  })(OverlayWidgetPositionPreference || (OverlayWidgetPositionPreference = {}));
  var OverviewRulerLane;
  (function(OverviewRulerLane2) {
    OverviewRulerLane2[OverviewRulerLane2["Left"] = 1] = "Left";
    OverviewRulerLane2[OverviewRulerLane2["Center"] = 2] = "Center";
    OverviewRulerLane2[OverviewRulerLane2["Right"] = 4] = "Right";
    OverviewRulerLane2[OverviewRulerLane2["Full"] = 7] = "Full";
  })(OverviewRulerLane || (OverviewRulerLane = {}));
  var RenderLineNumbersType;
  (function(RenderLineNumbersType2) {
    RenderLineNumbersType2[RenderLineNumbersType2["Off"] = 0] = "Off";
    RenderLineNumbersType2[RenderLineNumbersType2["On"] = 1] = "On";
    RenderLineNumbersType2[RenderLineNumbersType2["Relative"] = 2] = "Relative";
    RenderLineNumbersType2[RenderLineNumbersType2["Interval"] = 3] = "Interval";
    RenderLineNumbersType2[RenderLineNumbersType2["Custom"] = 4] = "Custom";
  })(RenderLineNumbersType || (RenderLineNumbersType = {}));
  var RenderMinimap;
  (function(RenderMinimap2) {
    RenderMinimap2[RenderMinimap2["None"] = 0] = "None";
    RenderMinimap2[RenderMinimap2["Text"] = 1] = "Text";
    RenderMinimap2[RenderMinimap2["Blocks"] = 2] = "Blocks";
  })(RenderMinimap || (RenderMinimap = {}));
  var ScrollType;
  (function(ScrollType2) {
    ScrollType2[ScrollType2["Smooth"] = 0] = "Smooth";
    ScrollType2[ScrollType2["Immediate"] = 1] = "Immediate";
  })(ScrollType || (ScrollType = {}));
  var ScrollbarVisibility;
  (function(ScrollbarVisibility2) {
    ScrollbarVisibility2[ScrollbarVisibility2["Auto"] = 1] = "Auto";
    ScrollbarVisibility2[ScrollbarVisibility2["Hidden"] = 2] = "Hidden";
    ScrollbarVisibility2[ScrollbarVisibility2["Visible"] = 3] = "Visible";
  })(ScrollbarVisibility || (ScrollbarVisibility = {}));
  var SelectionDirection;
  (function(SelectionDirection2) {
    SelectionDirection2[SelectionDirection2["LTR"] = 0] = "LTR";
    SelectionDirection2[SelectionDirection2["RTL"] = 1] = "RTL";
  })(SelectionDirection || (SelectionDirection = {}));
  var SignatureHelpTriggerKind;
  (function(SignatureHelpTriggerKind2) {
    SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind2[SignatureHelpTriggerKind2["ContentChange"] = 3] = "ContentChange";
  })(SignatureHelpTriggerKind || (SignatureHelpTriggerKind = {}));
  var SymbolKind;
  (function(SymbolKind3) {
    SymbolKind3[SymbolKind3["File"] = 0] = "File";
    SymbolKind3[SymbolKind3["Module"] = 1] = "Module";
    SymbolKind3[SymbolKind3["Namespace"] = 2] = "Namespace";
    SymbolKind3[SymbolKind3["Package"] = 3] = "Package";
    SymbolKind3[SymbolKind3["Class"] = 4] = "Class";
    SymbolKind3[SymbolKind3["Method"] = 5] = "Method";
    SymbolKind3[SymbolKind3["Property"] = 6] = "Property";
    SymbolKind3[SymbolKind3["Field"] = 7] = "Field";
    SymbolKind3[SymbolKind3["Constructor"] = 8] = "Constructor";
    SymbolKind3[SymbolKind3["Enum"] = 9] = "Enum";
    SymbolKind3[SymbolKind3["Interface"] = 10] = "Interface";
    SymbolKind3[SymbolKind3["Function"] = 11] = "Function";
    SymbolKind3[SymbolKind3["Variable"] = 12] = "Variable";
    SymbolKind3[SymbolKind3["Constant"] = 13] = "Constant";
    SymbolKind3[SymbolKind3["String"] = 14] = "String";
    SymbolKind3[SymbolKind3["Number"] = 15] = "Number";
    SymbolKind3[SymbolKind3["Boolean"] = 16] = "Boolean";
    SymbolKind3[SymbolKind3["Array"] = 17] = "Array";
    SymbolKind3[SymbolKind3["Object"] = 18] = "Object";
    SymbolKind3[SymbolKind3["Key"] = 19] = "Key";
    SymbolKind3[SymbolKind3["Null"] = 20] = "Null";
    SymbolKind3[SymbolKind3["EnumMember"] = 21] = "EnumMember";
    SymbolKind3[SymbolKind3["Struct"] = 22] = "Struct";
    SymbolKind3[SymbolKind3["Event"] = 23] = "Event";
    SymbolKind3[SymbolKind3["Operator"] = 24] = "Operator";
    SymbolKind3[SymbolKind3["TypeParameter"] = 25] = "TypeParameter";
  })(SymbolKind || (SymbolKind = {}));
  var SymbolTag;
  (function(SymbolTag3) {
    SymbolTag3[SymbolTag3["Deprecated"] = 1] = "Deprecated";
  })(SymbolTag || (SymbolTag = {}));
  var TextEditorCursorBlinkingStyle;
  (function(TextEditorCursorBlinkingStyle2) {
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Hidden"] = 0] = "Hidden";
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Blink"] = 1] = "Blink";
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Smooth"] = 2] = "Smooth";
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Phase"] = 3] = "Phase";
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Expand"] = 4] = "Expand";
    TextEditorCursorBlinkingStyle2[TextEditorCursorBlinkingStyle2["Solid"] = 5] = "Solid";
  })(TextEditorCursorBlinkingStyle || (TextEditorCursorBlinkingStyle = {}));
  var TextEditorCursorStyle;
  (function(TextEditorCursorStyle2) {
    TextEditorCursorStyle2[TextEditorCursorStyle2["Line"] = 1] = "Line";
    TextEditorCursorStyle2[TextEditorCursorStyle2["Block"] = 2] = "Block";
    TextEditorCursorStyle2[TextEditorCursorStyle2["Underline"] = 3] = "Underline";
    TextEditorCursorStyle2[TextEditorCursorStyle2["LineThin"] = 4] = "LineThin";
    TextEditorCursorStyle2[TextEditorCursorStyle2["BlockOutline"] = 5] = "BlockOutline";
    TextEditorCursorStyle2[TextEditorCursorStyle2["UnderlineThin"] = 6] = "UnderlineThin";
  })(TextEditorCursorStyle || (TextEditorCursorStyle = {}));
  var TrackedRangeStickiness;
  (function(TrackedRangeStickiness2) {
    TrackedRangeStickiness2[TrackedRangeStickiness2["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
    TrackedRangeStickiness2[TrackedRangeStickiness2["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
    TrackedRangeStickiness2[TrackedRangeStickiness2["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
    TrackedRangeStickiness2[TrackedRangeStickiness2["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
  })(TrackedRangeStickiness || (TrackedRangeStickiness = {}));
  var WrappingIndent;
  (function(WrappingIndent2) {
    WrappingIndent2[WrappingIndent2["None"] = 0] = "None";
    WrappingIndent2[WrappingIndent2["Same"] = 1] = "Same";
    WrappingIndent2[WrappingIndent2["Indent"] = 2] = "Indent";
    WrappingIndent2[WrappingIndent2["DeepIndent"] = 3] = "DeepIndent";
  })(WrappingIndent || (WrappingIndent = {}));

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneBase.js
  var KeyMod = class {
    static chord(firstPart, secondPart) {
      return KeyChord(firstPart, secondPart);
    }
  };
  KeyMod.CtrlCmd = 2048;
  KeyMod.Shift = 1024;
  KeyMod.Alt = 512;
  KeyMod.WinCtrl = 256;
  function createMonacoBaseAPI() {
    return {
      editor: void 0,
      languages: void 0,
      CancellationTokenSource,
      Emitter,
      KeyCode,
      KeyMod,
      Position,
      Range,
      Selection,
      SelectionDirection,
      MarkerSeverity,
      MarkerTag,
      Uri: URI,
      Token
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var MirrorModel = class extends MirrorTextModel {
    get uri() {
      return this._uri;
    }
    get eol() {
      return this._eol;
    }
    getValue() {
      return this.getText();
    }
    getLinesContent() {
      return this._lines.slice(0);
    }
    getLineCount() {
      return this._lines.length;
    }
    getLineContent(lineNumber) {
      return this._lines[lineNumber - 1];
    }
    getWordAtPosition(position, wordDefinition) {
      let wordAtText = getWordAtText(position.column, ensureValidWordDefinition(wordDefinition), this._lines[position.lineNumber - 1], 0);
      if (wordAtText) {
        return new Range(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
      }
      return null;
    }
    words(wordDefinition) {
      const lines = this._lines;
      const wordenize = this._wordenize.bind(this);
      let lineNumber = 0;
      let lineText = "";
      let wordRangesIdx = 0;
      let wordRanges = [];
      return {
        *[Symbol.iterator]() {
          while (true) {
            if (wordRangesIdx < wordRanges.length) {
              const value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
              wordRangesIdx += 1;
              yield value;
            } else {
              if (lineNumber < lines.length) {
                lineText = lines[lineNumber];
                wordRanges = wordenize(lineText, wordDefinition);
                wordRangesIdx = 0;
                lineNumber += 1;
              } else {
                break;
              }
            }
          }
        }
      };
    }
    getLineWords(lineNumber, wordDefinition) {
      let content = this._lines[lineNumber - 1];
      let ranges = this._wordenize(content, wordDefinition);
      let words = [];
      for (const range of ranges) {
        words.push({
          word: content.substring(range.start, range.end),
          startColumn: range.start + 1,
          endColumn: range.end + 1
        });
      }
      return words;
    }
    _wordenize(content, wordDefinition) {
      const result = [];
      let match;
      wordDefinition.lastIndex = 0;
      while (match = wordDefinition.exec(content)) {
        if (match[0].length === 0) {
          break;
        }
        result.push({start: match.index, end: match.index + match[0].length});
      }
      return result;
    }
    getValueInRange(range) {
      range = this._validateRange(range);
      if (range.startLineNumber === range.endLineNumber) {
        return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
      }
      let lineEnding = this._eol;
      let startLineIndex = range.startLineNumber - 1;
      let endLineIndex = range.endLineNumber - 1;
      let resultLines = [];
      resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
      for (let i = startLineIndex + 1; i < endLineIndex; i++) {
        resultLines.push(this._lines[i]);
      }
      resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
      return resultLines.join(lineEnding);
    }
    offsetAt(position) {
      position = this._validatePosition(position);
      this._ensureLineStarts();
      return this._lineStarts.getPrefixSum(position.lineNumber - 2) + (position.column - 1);
    }
    positionAt(offset) {
      offset = Math.floor(offset);
      offset = Math.max(0, offset);
      this._ensureLineStarts();
      let out = this._lineStarts.getIndexOf(offset);
      let lineLength = this._lines[out.index].length;
      return {
        lineNumber: 1 + out.index,
        column: 1 + Math.min(out.remainder, lineLength)
      };
    }
    _validateRange(range) {
      const start = this._validatePosition({lineNumber: range.startLineNumber, column: range.startColumn});
      const end = this._validatePosition({lineNumber: range.endLineNumber, column: range.endColumn});
      if (start.lineNumber !== range.startLineNumber || start.column !== range.startColumn || end.lineNumber !== range.endLineNumber || end.column !== range.endColumn) {
        return {
          startLineNumber: start.lineNumber,
          startColumn: start.column,
          endLineNumber: end.lineNumber,
          endColumn: end.column
        };
      }
      return range;
    }
    _validatePosition(position) {
      if (!Position.isIPosition(position)) {
        throw new Error("bad position");
      }
      let {lineNumber, column} = position;
      let hasChanged = false;
      if (lineNumber < 1) {
        lineNumber = 1;
        column = 1;
        hasChanged = true;
      } else if (lineNumber > this._lines.length) {
        lineNumber = this._lines.length;
        column = this._lines[lineNumber - 1].length + 1;
        hasChanged = true;
      } else {
        let maxCharacter = this._lines[lineNumber - 1].length + 1;
        if (column < 1) {
          column = 1;
          hasChanged = true;
        } else if (column > maxCharacter) {
          column = maxCharacter;
          hasChanged = true;
        }
      }
      if (!hasChanged) {
        return position;
      } else {
        return {lineNumber, column};
      }
    }
  };
  var EditorSimpleWorker = class {
    constructor(host, foreignModuleFactory) {
      this._host = host;
      this._models = Object.create(null);
      this._foreignModuleFactory = foreignModuleFactory;
      this._foreignModule = null;
    }
    dispose() {
      this._models = Object.create(null);
    }
    _getModel(uri) {
      return this._models[uri];
    }
    _getModels() {
      let all = [];
      Object.keys(this._models).forEach((key) => all.push(this._models[key]));
      return all;
    }
    acceptNewModel(data) {
      this._models[data.url] = new MirrorModel(URI.parse(data.url), data.lines, data.EOL, data.versionId);
    }
    acceptModelChanged(strURL, e) {
      if (!this._models[strURL]) {
        return;
      }
      let model = this._models[strURL];
      model.onEvents(e);
    }
    acceptRemovedModel(strURL) {
      if (!this._models[strURL]) {
        return;
      }
      delete this._models[strURL];
    }
    computeDiff(originalUrl, modifiedUrl, ignoreTrimWhitespace, maxComputationTime) {
      return __awaiter(this, void 0, void 0, function* () {
        const original = this._getModel(originalUrl);
        const modified = this._getModel(modifiedUrl);
        if (!original || !modified) {
          return null;
        }
        const originalLines = original.getLinesContent();
        const modifiedLines = modified.getLinesContent();
        const diffComputer = new DiffComputer(originalLines, modifiedLines, {
          shouldComputeCharChanges: true,
          shouldPostProcessCharChanges: true,
          shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
          shouldMakePrettyDiff: true,
          maxComputationTime
        });
        const diffResult = diffComputer.computeDiff();
        const identical = diffResult.changes.length > 0 ? false : this._modelsAreIdentical(original, modified);
        return {
          quitEarly: diffResult.quitEarly,
          identical,
          changes: diffResult.changes
        };
      });
    }
    _modelsAreIdentical(original, modified) {
      const originalLineCount = original.getLineCount();
      const modifiedLineCount = modified.getLineCount();
      if (originalLineCount !== modifiedLineCount) {
        return false;
      }
      for (let line = 1; line <= originalLineCount; line++) {
        const originalLine = original.getLineContent(line);
        const modifiedLine = modified.getLineContent(line);
        if (originalLine !== modifiedLine) {
          return false;
        }
      }
      return true;
    }
    computeMoreMinimalEdits(modelUrl, edits) {
      return __awaiter(this, void 0, void 0, function* () {
        const model = this._getModel(modelUrl);
        if (!model) {
          return edits;
        }
        const result = [];
        let lastEol = void 0;
        edits = edits.slice(0).sort((a, b) => {
          if (a.range && b.range) {
            return Range.compareRangesUsingStarts(a.range, b.range);
          }
          let aRng = a.range ? 0 : 1;
          let bRng = b.range ? 0 : 1;
          return aRng - bRng;
        });
        for (let {range, text, eol} of edits) {
          if (typeof eol === "number") {
            lastEol = eol;
          }
          if (Range.isEmpty(range) && !text) {
            continue;
          }
          const original = model.getValueInRange(range);
          text = text.replace(/\r\n|\n|\r/g, model.eol);
          if (original === text) {
            continue;
          }
          if (Math.max(text.length, original.length) > EditorSimpleWorker._diffLimit) {
            result.push({range, text});
            continue;
          }
          const changes = stringDiff(original, text, false);
          const editOffset = model.offsetAt(Range.lift(range).getStartPosition());
          for (const change of changes) {
            const start = model.positionAt(editOffset + change.originalStart);
            const end = model.positionAt(editOffset + change.originalStart + change.originalLength);
            const newEdit = {
              text: text.substr(change.modifiedStart, change.modifiedLength),
              range: {startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column}
            };
            if (model.getValueInRange(newEdit.range) !== newEdit.text) {
              result.push(newEdit);
            }
          }
        }
        if (typeof lastEol === "number") {
          result.push({eol: lastEol, text: "", range: {startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0}});
        }
        return result;
      });
    }
    computeLinks(modelUrl) {
      return __awaiter(this, void 0, void 0, function* () {
        let model = this._getModel(modelUrl);
        if (!model) {
          return null;
        }
        return computeLinks(model);
      });
    }
    textualSuggest(modelUrls, leadingWord, wordDef, wordDefFlags) {
      return __awaiter(this, void 0, void 0, function* () {
        const sw = new StopWatch(true);
        const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        const seen = new Set();
        outer:
          for (let url of modelUrls) {
            const model = this._getModel(url);
            if (!model) {
              continue;
            }
            for (let word of model.words(wordDefRegExp)) {
              if (word === leadingWord || !isNaN(Number(word))) {
                continue;
              }
              seen.add(word);
              if (seen.size > EditorSimpleWorker._suggestionsLimit) {
                break outer;
              }
            }
          }
        return {words: Array.from(seen), duration: sw.elapsed()};
      });
    }
    computeWordRanges(modelUrl, range, wordDef, wordDefFlags) {
      return __awaiter(this, void 0, void 0, function* () {
        let model = this._getModel(modelUrl);
        if (!model) {
          return Object.create(null);
        }
        const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        const result = Object.create(null);
        for (let line = range.startLineNumber; line < range.endLineNumber; line++) {
          let words = model.getLineWords(line, wordDefRegExp);
          for (const word of words) {
            if (!isNaN(Number(word.word))) {
              continue;
            }
            let array = result[word.word];
            if (!array) {
              array = [];
              result[word.word] = array;
            }
            array.push({
              startLineNumber: line,
              startColumn: word.startColumn,
              endLineNumber: line,
              endColumn: word.endColumn
            });
          }
        }
        return result;
      });
    }
    navigateValueSet(modelUrl, range, up, wordDef, wordDefFlags) {
      return __awaiter(this, void 0, void 0, function* () {
        let model = this._getModel(modelUrl);
        if (!model) {
          return null;
        }
        let wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        if (range.startColumn === range.endColumn) {
          range = {
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn + 1
          };
        }
        let selectionText = model.getValueInRange(range);
        let wordRange = model.getWordAtPosition({lineNumber: range.startLineNumber, column: range.startColumn}, wordDefRegExp);
        if (!wordRange) {
          return null;
        }
        let word = model.getValueInRange(wordRange);
        let result = BasicInplaceReplace.INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
        return result;
      });
    }
    loadForeignModule(moduleId, createData, foreignHostMethods) {
      const proxyMethodRequest = (method, args) => {
        return this._host.fhr(method, args);
      };
      const foreignHost = createProxyObject(foreignHostMethods, proxyMethodRequest);
      let ctx = {
        host: foreignHost,
        getMirrorModels: () => {
          return this._getModels();
        }
      };
      if (this._foreignModuleFactory) {
        this._foreignModule = this._foreignModuleFactory(ctx, createData);
        return Promise.resolve(getAllMethodNames(this._foreignModule));
      }
      return Promise.reject(new Error(`Unexpected usage`));
    }
    fmr(method, args) {
      if (!this._foreignModule || typeof this._foreignModule[method] !== "function") {
        return Promise.reject(new Error("Missing requestHandler or method: " + method));
      }
      try {
        return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
  EditorSimpleWorker._diffLimit = 1e5;
  EditorSimpleWorker._suggestionsLimit = 1e4;
  if (typeof importScripts === "function") {
    globals.monaco = createMonacoBaseAPI();
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/editor/editor.worker.js
  var initialized = false;
  function initialize(foreignModule) {
    if (initialized) {
      return;
    }
    initialized = true;
    const simpleWorker = new SimpleWorkerServer((msg) => {
      self.postMessage(msg);
    }, (host) => new EditorSimpleWorker(host, foreignModule));
    self.onmessage = (e) => {
      simpleWorker.onmessage(e.data);
    };
  }
  self.onmessage = (e) => {
    if (!initialized) {
      initialize(null);
    }
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/fillers/vscode-nls.js
  function format(message, args) {
    var result;
    if (args.length === 0) {
      result = message;
    } else {
      result = message.replace(/\{(\d+)\}/g, function(match, rest) {
        var index = rest[0];
        return typeof args[index] !== "undefined" ? args[index] : match;
      });
    }
    return result;
  }
  function localize(key, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return format(message, args);
  }
  function loadMessageBundle(file) {
    return localize;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-languageserver-types/main.js
  "use strict";
  var integer;
  (function(integer2) {
    integer2.MIN_VALUE = -2147483648;
    integer2.MAX_VALUE = 2147483647;
  })(integer || (integer = {}));
  var uinteger;
  (function(uinteger2) {
    uinteger2.MIN_VALUE = 0;
    uinteger2.MAX_VALUE = 2147483647;
  })(uinteger || (uinteger = {}));
  var Position2;
  (function(Position3) {
    function create(line, character) {
      if (line === Number.MAX_VALUE) {
        line = uinteger.MAX_VALUE;
      }
      if (character === Number.MAX_VALUE) {
        character = uinteger.MAX_VALUE;
      }
      return {line, character};
    }
    Position3.create = create;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position3.is = is;
  })(Position2 || (Position2 = {}));
  var Range2;
  (function(Range3) {
    function create(one, two, three, four) {
      if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
        return {start: Position2.create(one, two), end: Position2.create(three, four)};
      } else if (Position2.is(one) && Position2.is(two)) {
        return {start: one, end: two};
      } else {
        throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
      }
    }
    Range3.create = create;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Position2.is(candidate.start) && Position2.is(candidate.end);
    }
    Range3.is = is;
  })(Range2 || (Range2 = {}));
  var Location;
  (function(Location2) {
    function create(uri, range) {
      return {uri, range};
    }
    Location2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range2.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location2.is = is;
  })(Location || (Location = {}));
  var LocationLink;
  (function(LocationLink2) {
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
      return {targetUri, targetRange, targetSelectionRange, originSelectionRange};
    }
    LocationLink2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range2.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range2.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range2.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink2.is = is;
  })(LocationLink || (LocationLink = {}));
  var Color;
  (function(Color2) {
    function create(red, green, blue, alpha) {
      return {
        red,
        green,
        blue,
        alpha
      };
    }
    Color2.create = create;
    function is(value) {
      var candidate = value;
      return Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color2.is = is;
  })(Color || (Color = {}));
  var ColorInformation;
  (function(ColorInformation2) {
    function create(range, color) {
      return {
        range,
        color
      };
    }
    ColorInformation2.create = create;
    function is(value) {
      var candidate = value;
      return Range2.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation2.is = is;
  })(ColorInformation || (ColorInformation = {}));
  var ColorPresentation;
  (function(ColorPresentation2) {
    function create(label, textEdit, additionalTextEdits) {
      return {
        label,
        textEdit,
        additionalTextEdits
      };
    }
    ColorPresentation2.create = create;
    function is(value) {
      var candidate = value;
      return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation2.is = is;
  })(ColorPresentation || (ColorPresentation = {}));
  var FoldingRangeKind;
  (function(FoldingRangeKind2) {
    FoldingRangeKind2["Comment"] = "comment";
    FoldingRangeKind2["Imports"] = "imports";
    FoldingRangeKind2["Region"] = "region";
  })(FoldingRangeKind || (FoldingRangeKind = {}));
  var FoldingRange;
  (function(FoldingRange2) {
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
      var result = {
        startLine,
        endLine
      };
      if (Is.defined(startCharacter)) {
        result.startCharacter = startCharacter;
      }
      if (Is.defined(endCharacter)) {
        result.endCharacter = endCharacter;
      }
      if (Is.defined(kind)) {
        result.kind = kind;
      }
      return result;
    }
    FoldingRange2.create = create;
    function is(value) {
      var candidate = value;
      return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange2.is = is;
  })(FoldingRange || (FoldingRange = {}));
  var DiagnosticRelatedInformation;
  (function(DiagnosticRelatedInformation2) {
    function create(location, message) {
      return {
        location,
        message
      };
    }
    DiagnosticRelatedInformation2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation2.is = is;
  })(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
  var DiagnosticSeverity;
  (function(DiagnosticSeverity2) {
    DiagnosticSeverity2.Error = 1;
    DiagnosticSeverity2.Warning = 2;
    DiagnosticSeverity2.Information = 3;
    DiagnosticSeverity2.Hint = 4;
  })(DiagnosticSeverity || (DiagnosticSeverity = {}));
  var DiagnosticTag;
  (function(DiagnosticTag2) {
    DiagnosticTag2.Unnecessary = 1;
    DiagnosticTag2.Deprecated = 2;
  })(DiagnosticTag || (DiagnosticTag = {}));
  var CodeDescription;
  (function(CodeDescription2) {
    function is(value) {
      var candidate = value;
      return candidate !== void 0 && candidate !== null && Is.string(candidate.href);
    }
    CodeDescription2.is = is;
  })(CodeDescription || (CodeDescription = {}));
  var Diagnostic;
  (function(Diagnostic2) {
    function create(range, message, severity, code, source, relatedInformation) {
      var result = {range, message};
      if (Is.defined(severity)) {
        result.severity = severity;
      }
      if (Is.defined(code)) {
        result.code = code;
      }
      if (Is.defined(source)) {
        result.source = source;
      }
      if (Is.defined(relatedInformation)) {
        result.relatedInformation = relatedInformation;
      }
      return result;
    }
    Diagnostic2.create = create;
    function is(value) {
      var _a3;
      var candidate = value;
      return Is.defined(candidate) && Range2.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a3 = candidate.codeDescription) === null || _a3 === void 0 ? void 0 : _a3.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic2.is = is;
  })(Diagnostic || (Diagnostic = {}));
  var Command;
  (function(Command2) {
    function create(title, command) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      var result = {title, command};
      if (Is.defined(args) && args.length > 0) {
        result.arguments = args;
      }
      return result;
    }
    Command2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command2.is = is;
  })(Command || (Command = {}));
  var TextEdit;
  (function(TextEdit2) {
    function replace(range, newText) {
      return {range, newText};
    }
    TextEdit2.replace = replace;
    function insert(position, newText) {
      return {range: {start: position, end: position}, newText};
    }
    TextEdit2.insert = insert;
    function del(range) {
      return {range, newText: ""};
    }
    TextEdit2.del = del;
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range2.is(candidate.range);
    }
    TextEdit2.is = is;
  })(TextEdit || (TextEdit = {}));
  var ChangeAnnotation;
  (function(ChangeAnnotation2) {
    function create(label, needsConfirmation, description) {
      var result = {label};
      if (needsConfirmation !== void 0) {
        result.needsConfirmation = needsConfirmation;
      }
      if (description !== void 0) {
        result.description = description;
      }
      return result;
    }
    ChangeAnnotation2.create = create;
    function is(value) {
      var candidate = value;
      return candidate !== void 0 && Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
    }
    ChangeAnnotation2.is = is;
  })(ChangeAnnotation || (ChangeAnnotation = {}));
  var ChangeAnnotationIdentifier;
  (function(ChangeAnnotationIdentifier2) {
    function is(value) {
      var candidate = value;
      return typeof candidate === "string";
    }
    ChangeAnnotationIdentifier2.is = is;
  })(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
  var AnnotatedTextEdit;
  (function(AnnotatedTextEdit2) {
    function replace(range, newText, annotation) {
      return {range, newText, annotationId: annotation};
    }
    AnnotatedTextEdit2.replace = replace;
    function insert(position, newText, annotation) {
      return {range: {start: position, end: position}, newText, annotationId: annotation};
    }
    AnnotatedTextEdit2.insert = insert;
    function del(range, annotation) {
      return {range, newText: "", annotationId: annotation};
    }
    AnnotatedTextEdit2.del = del;
    function is(value) {
      var candidate = value;
      return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit2.is = is;
  })(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
  var TextDocumentEdit;
  (function(TextDocumentEdit2) {
    function create(textDocument, edits) {
      return {textDocument, edits};
    }
    TextDocumentEdit2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
    }
    TextDocumentEdit2.is = is;
  })(TextDocumentEdit || (TextDocumentEdit = {}));
  var CreateFile;
  (function(CreateFile2) {
    function create(uri, options, annotation) {
      var result = {
        kind: "create",
        uri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    CreateFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile2.is = is;
  })(CreateFile || (CreateFile = {}));
  var RenameFile;
  (function(RenameFile2) {
    function create(oldUri, newUri, options, annotation) {
      var result = {
        kind: "rename",
        oldUri,
        newUri
      };
      if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    RenameFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile2.is = is;
  })(RenameFile || (RenameFile = {}));
  var DeleteFile;
  (function(DeleteFile2) {
    function create(uri, options, annotation) {
      var result = {
        kind: "delete",
        uri
      };
      if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
        result.options = options;
      }
      if (annotation !== void 0) {
        result.annotationId = annotation;
      }
      return result;
    }
    DeleteFile2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile2.is = is;
  })(DeleteFile || (DeleteFile = {}));
  var WorkspaceEdit;
  (function(WorkspaceEdit2) {
    function is(value) {
      var candidate = value;
      return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every(function(change) {
        if (Is.string(change.kind)) {
          return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
        } else {
          return TextDocumentEdit.is(change);
        }
      }));
    }
    WorkspaceEdit2.is = is;
  })(WorkspaceEdit || (WorkspaceEdit = {}));
  var TextEditChangeImpl = function() {
    function TextEditChangeImpl2(edits, changeAnnotations) {
      this.edits = edits;
      this.changeAnnotations = changeAnnotations;
    }
    TextEditChangeImpl2.prototype.insert = function(position, newText, annotation) {
      var edit;
      var id;
      if (annotation === void 0) {
        edit = TextEdit.insert(position, newText);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.insert(position, newText, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.insert(position, newText, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
        return id;
      }
    };
    TextEditChangeImpl2.prototype.replace = function(range, newText, annotation) {
      var edit;
      var id;
      if (annotation === void 0) {
        edit = TextEdit.replace(range, newText);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.replace(range, newText, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.replace(range, newText, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
        return id;
      }
    };
    TextEditChangeImpl2.prototype.delete = function(range, annotation) {
      var edit;
      var id;
      if (annotation === void 0) {
        edit = TextEdit.del(range);
      } else if (ChangeAnnotationIdentifier.is(annotation)) {
        id = annotation;
        edit = AnnotatedTextEdit.del(range, annotation);
      } else {
        this.assertChangeAnnotations(this.changeAnnotations);
        id = this.changeAnnotations.manage(annotation);
        edit = AnnotatedTextEdit.del(range, id);
      }
      this.edits.push(edit);
      if (id !== void 0) {
        return id;
      }
    };
    TextEditChangeImpl2.prototype.add = function(edit) {
      this.edits.push(edit);
    };
    TextEditChangeImpl2.prototype.all = function() {
      return this.edits;
    };
    TextEditChangeImpl2.prototype.clear = function() {
      this.edits.splice(0, this.edits.length);
    };
    TextEditChangeImpl2.prototype.assertChangeAnnotations = function(value) {
      if (value === void 0) {
        throw new Error("Text edit change is not configured to manage change annotations.");
      }
    };
    return TextEditChangeImpl2;
  }();
  var ChangeAnnotations = function() {
    function ChangeAnnotations2(annotations) {
      this._annotations = annotations === void 0 ? Object.create(null) : annotations;
      this._counter = 0;
      this._size = 0;
    }
    ChangeAnnotations2.prototype.all = function() {
      return this._annotations;
    };
    Object.defineProperty(ChangeAnnotations2.prototype, "size", {
      get: function() {
        return this._size;
      },
      enumerable: false,
      configurable: true
    });
    ChangeAnnotations2.prototype.manage = function(idOrAnnotation, annotation) {
      var id;
      if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
        id = idOrAnnotation;
      } else {
        id = this.nextId();
        annotation = idOrAnnotation;
      }
      if (this._annotations[id] !== void 0) {
        throw new Error("Id " + id + " is already in use.");
      }
      if (annotation === void 0) {
        throw new Error("No annotation provided for id " + id);
      }
      this._annotations[id] = annotation;
      this._size++;
      return id;
    };
    ChangeAnnotations2.prototype.nextId = function() {
      this._counter++;
      return this._counter.toString();
    };
    return ChangeAnnotations2;
  }();
  var WorkspaceChange = function() {
    function WorkspaceChange2(workspaceEdit) {
      var _this = this;
      this._textEditChanges = Object.create(null);
      if (workspaceEdit !== void 0) {
        this._workspaceEdit = workspaceEdit;
        if (workspaceEdit.documentChanges) {
          this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
          workspaceEdit.changeAnnotations = this._changeAnnotations.all();
          workspaceEdit.documentChanges.forEach(function(change) {
            if (TextDocumentEdit.is(change)) {
              var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
              _this._textEditChanges[change.textDocument.uri] = textEditChange;
            }
          });
        } else if (workspaceEdit.changes) {
          Object.keys(workspaceEdit.changes).forEach(function(key) {
            var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
            _this._textEditChanges[key] = textEditChange;
          });
        }
      } else {
        this._workspaceEdit = {};
      }
    }
    Object.defineProperty(WorkspaceChange2.prototype, "edit", {
      get: function() {
        this.initDocumentChanges();
        if (this._changeAnnotations !== void 0) {
          if (this._changeAnnotations.size === 0) {
            this._workspaceEdit.changeAnnotations = void 0;
          } else {
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
          }
        }
        return this._workspaceEdit;
      },
      enumerable: false,
      configurable: true
    });
    WorkspaceChange2.prototype.getTextEditChange = function(key) {
      if (OptionalVersionedTextDocumentIdentifier.is(key)) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        var textDocument = {uri: key.uri, version: key.version};
        var result = this._textEditChanges[textDocument.uri];
        if (!result) {
          var edits = [];
          var textDocumentEdit = {
            textDocument,
            edits
          };
          this._workspaceEdit.documentChanges.push(textDocumentEdit);
          result = new TextEditChangeImpl(edits, this._changeAnnotations);
          this._textEditChanges[textDocument.uri] = result;
        }
        return result;
      } else {
        this.initChanges();
        if (this._workspaceEdit.changes === void 0) {
          throw new Error("Workspace edit is not configured for normal text edit changes.");
        }
        var result = this._textEditChanges[key];
        if (!result) {
          var edits = [];
          this._workspaceEdit.changes[key] = edits;
          result = new TextEditChangeImpl(edits);
          this._textEditChanges[key] = result;
        }
        return result;
      }
    };
    WorkspaceChange2.prototype.initDocumentChanges = function() {
      if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
        this._changeAnnotations = new ChangeAnnotations();
        this._workspaceEdit.documentChanges = [];
        this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
      }
    };
    WorkspaceChange2.prototype.initChanges = function() {
      if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
        this._workspaceEdit.changes = Object.create(null);
      }
    };
    WorkspaceChange2.prototype.createFile = function(uri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      var annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      var operation;
      var id;
      if (annotation === void 0) {
        operation = CreateFile.create(uri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = CreateFile.create(uri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    };
    WorkspaceChange2.prototype.renameFile = function(oldUri, newUri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      var annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      var operation;
      var id;
      if (annotation === void 0) {
        operation = RenameFile.create(oldUri, newUri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = RenameFile.create(oldUri, newUri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    };
    WorkspaceChange2.prototype.deleteFile = function(uri, optionsOrAnnotation, options) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === void 0) {
        throw new Error("Workspace edit is not configured for document changes.");
      }
      var annotation;
      if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
        annotation = optionsOrAnnotation;
      } else {
        options = optionsOrAnnotation;
      }
      var operation;
      var id;
      if (annotation === void 0) {
        operation = DeleteFile.create(uri, options);
      } else {
        id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
        operation = DeleteFile.create(uri, options, id);
      }
      this._workspaceEdit.documentChanges.push(operation);
      if (id !== void 0) {
        return id;
      }
    };
    return WorkspaceChange2;
  }();
  var TextDocumentIdentifier;
  (function(TextDocumentIdentifier2) {
    function create(uri) {
      return {uri};
    }
    TextDocumentIdentifier2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier2.is = is;
  })(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
  var VersionedTextDocumentIdentifier;
  (function(VersionedTextDocumentIdentifier2) {
    function create(uri, version) {
      return {uri, version};
    }
    VersionedTextDocumentIdentifier2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier2.is = is;
  })(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
  var OptionalVersionedTextDocumentIdentifier;
  (function(OptionalVersionedTextDocumentIdentifier2) {
    function create(uri, version) {
      return {uri, version};
    }
    OptionalVersionedTextDocumentIdentifier2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier2.is = is;
  })(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
  var TextDocumentItem;
  (function(TextDocumentItem2) {
    function create(uri, languageId, version, text) {
      return {uri, languageId, version, text};
    }
    TextDocumentItem2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem2.is = is;
  })(TextDocumentItem || (TextDocumentItem = {}));
  var MarkupKind;
  (function(MarkupKind2) {
    MarkupKind2.PlainText = "plaintext";
    MarkupKind2.Markdown = "markdown";
  })(MarkupKind || (MarkupKind = {}));
  (function(MarkupKind2) {
    function is(value) {
      var candidate = value;
      return candidate === MarkupKind2.PlainText || candidate === MarkupKind2.Markdown;
    }
    MarkupKind2.is = is;
  })(MarkupKind || (MarkupKind = {}));
  var MarkupContent;
  (function(MarkupContent2) {
    function is(value) {
      var candidate = value;
      return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent2.is = is;
  })(MarkupContent || (MarkupContent = {}));
  var CompletionItemKind2;
  (function(CompletionItemKind3) {
    CompletionItemKind3.Text = 1;
    CompletionItemKind3.Method = 2;
    CompletionItemKind3.Function = 3;
    CompletionItemKind3.Constructor = 4;
    CompletionItemKind3.Field = 5;
    CompletionItemKind3.Variable = 6;
    CompletionItemKind3.Class = 7;
    CompletionItemKind3.Interface = 8;
    CompletionItemKind3.Module = 9;
    CompletionItemKind3.Property = 10;
    CompletionItemKind3.Unit = 11;
    CompletionItemKind3.Value = 12;
    CompletionItemKind3.Enum = 13;
    CompletionItemKind3.Keyword = 14;
    CompletionItemKind3.Snippet = 15;
    CompletionItemKind3.Color = 16;
    CompletionItemKind3.File = 17;
    CompletionItemKind3.Reference = 18;
    CompletionItemKind3.Folder = 19;
    CompletionItemKind3.EnumMember = 20;
    CompletionItemKind3.Constant = 21;
    CompletionItemKind3.Struct = 22;
    CompletionItemKind3.Event = 23;
    CompletionItemKind3.Operator = 24;
    CompletionItemKind3.TypeParameter = 25;
  })(CompletionItemKind2 || (CompletionItemKind2 = {}));
  var InsertTextFormat;
  (function(InsertTextFormat2) {
    InsertTextFormat2.PlainText = 1;
    InsertTextFormat2.Snippet = 2;
  })(InsertTextFormat || (InsertTextFormat = {}));
  var CompletionItemTag2;
  (function(CompletionItemTag3) {
    CompletionItemTag3.Deprecated = 1;
  })(CompletionItemTag2 || (CompletionItemTag2 = {}));
  var InsertReplaceEdit;
  (function(InsertReplaceEdit2) {
    function create(newText, insert, replace) {
      return {newText, insert, replace};
    }
    InsertReplaceEdit2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.newText) && Range2.is(candidate.insert) && Range2.is(candidate.replace);
    }
    InsertReplaceEdit2.is = is;
  })(InsertReplaceEdit || (InsertReplaceEdit = {}));
  var InsertTextMode;
  (function(InsertTextMode2) {
    InsertTextMode2.asIs = 1;
    InsertTextMode2.adjustIndentation = 2;
  })(InsertTextMode || (InsertTextMode = {}));
  var CompletionItem;
  (function(CompletionItem2) {
    function create(label) {
      return {label};
    }
    CompletionItem2.create = create;
  })(CompletionItem || (CompletionItem = {}));
  var CompletionList;
  (function(CompletionList2) {
    function create(items, isIncomplete) {
      return {items: items ? items : [], isIncomplete: !!isIncomplete};
    }
    CompletionList2.create = create;
  })(CompletionList || (CompletionList = {}));
  var MarkedString;
  (function(MarkedString2) {
    function fromPlainText(plainText) {
      return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
    }
    MarkedString2.fromPlainText = fromPlainText;
    function is(value) {
      var candidate = value;
      return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
    }
    MarkedString2.is = is;
  })(MarkedString || (MarkedString = {}));
  var Hover;
  (function(Hover2) {
    function is(value) {
      var candidate = value;
      return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range2.is(value.range));
    }
    Hover2.is = is;
  })(Hover || (Hover = {}));
  var ParameterInformation;
  (function(ParameterInformation2) {
    function create(label, documentation) {
      return documentation ? {label, documentation} : {label};
    }
    ParameterInformation2.create = create;
  })(ParameterInformation || (ParameterInformation = {}));
  var SignatureInformation;
  (function(SignatureInformation2) {
    function create(label, documentation) {
      var parameters = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        parameters[_i - 2] = arguments[_i];
      }
      var result = {label};
      if (Is.defined(documentation)) {
        result.documentation = documentation;
      }
      if (Is.defined(parameters)) {
        result.parameters = parameters;
      } else {
        result.parameters = [];
      }
      return result;
    }
    SignatureInformation2.create = create;
  })(SignatureInformation || (SignatureInformation = {}));
  var DocumentHighlightKind2;
  (function(DocumentHighlightKind3) {
    DocumentHighlightKind3.Text = 1;
    DocumentHighlightKind3.Read = 2;
    DocumentHighlightKind3.Write = 3;
  })(DocumentHighlightKind2 || (DocumentHighlightKind2 = {}));
  var DocumentHighlight;
  (function(DocumentHighlight2) {
    function create(range, kind) {
      var result = {range};
      if (Is.number(kind)) {
        result.kind = kind;
      }
      return result;
    }
    DocumentHighlight2.create = create;
  })(DocumentHighlight || (DocumentHighlight = {}));
  var SymbolKind2;
  (function(SymbolKind3) {
    SymbolKind3.File = 1;
    SymbolKind3.Module = 2;
    SymbolKind3.Namespace = 3;
    SymbolKind3.Package = 4;
    SymbolKind3.Class = 5;
    SymbolKind3.Method = 6;
    SymbolKind3.Property = 7;
    SymbolKind3.Field = 8;
    SymbolKind3.Constructor = 9;
    SymbolKind3.Enum = 10;
    SymbolKind3.Interface = 11;
    SymbolKind3.Function = 12;
    SymbolKind3.Variable = 13;
    SymbolKind3.Constant = 14;
    SymbolKind3.String = 15;
    SymbolKind3.Number = 16;
    SymbolKind3.Boolean = 17;
    SymbolKind3.Array = 18;
    SymbolKind3.Object = 19;
    SymbolKind3.Key = 20;
    SymbolKind3.Null = 21;
    SymbolKind3.EnumMember = 22;
    SymbolKind3.Struct = 23;
    SymbolKind3.Event = 24;
    SymbolKind3.Operator = 25;
    SymbolKind3.TypeParameter = 26;
  })(SymbolKind2 || (SymbolKind2 = {}));
  var SymbolTag2;
  (function(SymbolTag3) {
    SymbolTag3.Deprecated = 1;
  })(SymbolTag2 || (SymbolTag2 = {}));
  var SymbolInformation;
  (function(SymbolInformation2) {
    function create(name, kind, range, uri, containerName) {
      var result = {
        name,
        kind,
        location: {uri, range}
      };
      if (containerName) {
        result.containerName = containerName;
      }
      return result;
    }
    SymbolInformation2.create = create;
  })(SymbolInformation || (SymbolInformation = {}));
  var DocumentSymbol;
  (function(DocumentSymbol2) {
    function create(name, detail, kind, range, selectionRange, children) {
      var result = {
        name,
        detail,
        kind,
        range,
        selectionRange
      };
      if (children !== void 0) {
        result.children = children;
      }
      return result;
    }
    DocumentSymbol2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range2.is(candidate.range) && Range2.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
    }
    DocumentSymbol2.is = is;
  })(DocumentSymbol || (DocumentSymbol = {}));
  var CodeActionKind;
  (function(CodeActionKind2) {
    CodeActionKind2.Empty = "";
    CodeActionKind2.QuickFix = "quickfix";
    CodeActionKind2.Refactor = "refactor";
    CodeActionKind2.RefactorExtract = "refactor.extract";
    CodeActionKind2.RefactorInline = "refactor.inline";
    CodeActionKind2.RefactorRewrite = "refactor.rewrite";
    CodeActionKind2.Source = "source";
    CodeActionKind2.SourceOrganizeImports = "source.organizeImports";
    CodeActionKind2.SourceFixAll = "source.fixAll";
  })(CodeActionKind || (CodeActionKind = {}));
  var CodeActionContext;
  (function(CodeActionContext2) {
    function create(diagnostics, only) {
      var result = {diagnostics};
      if (only !== void 0 && only !== null) {
        result.only = only;
      }
      return result;
    }
    CodeActionContext2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext2.is = is;
  })(CodeActionContext || (CodeActionContext = {}));
  var CodeAction;
  (function(CodeAction2) {
    function create(title, kindOrCommandOrEdit, kind) {
      var result = {title};
      var checkKind = true;
      if (typeof kindOrCommandOrEdit === "string") {
        checkKind = false;
        result.kind = kindOrCommandOrEdit;
      } else if (Command.is(kindOrCommandOrEdit)) {
        result.command = kindOrCommandOrEdit;
      } else {
        result.edit = kindOrCommandOrEdit;
      }
      if (checkKind && kind !== void 0) {
        result.kind = kind;
      }
      return result;
    }
    CodeAction2.create = create;
    function is(value) {
      var candidate = value;
      return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction2.is = is;
  })(CodeAction || (CodeAction = {}));
  var CodeLens;
  (function(CodeLens2) {
    function create(range, data) {
      var result = {range};
      if (Is.defined(data)) {
        result.data = data;
      }
      return result;
    }
    CodeLens2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range2.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens2.is = is;
  })(CodeLens || (CodeLens = {}));
  var FormattingOptions;
  (function(FormattingOptions2) {
    function create(tabSize, insertSpaces) {
      return {tabSize, insertSpaces};
    }
    FormattingOptions2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions2.is = is;
  })(FormattingOptions || (FormattingOptions = {}));
  var DocumentLink;
  (function(DocumentLink2) {
    function create(range, target, data) {
      return {range, target, data};
    }
    DocumentLink2.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Range2.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink2.is = is;
  })(DocumentLink || (DocumentLink = {}));
  var SelectionRange;
  (function(SelectionRange2) {
    function create(range, parent) {
      return {range, parent};
    }
    SelectionRange2.create = create;
    function is(value) {
      var candidate = value;
      return candidate !== void 0 && Range2.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
    }
    SelectionRange2.is = is;
  })(SelectionRange || (SelectionRange = {}));
  var TextDocument;
  (function(TextDocument3) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument3.create = create;
    function is(value) {
      var candidate = value;
      return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument3.is = is;
    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort2(edits, function(a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = text.length;
      for (var i = sortedEdits.length - 1; i >= 0; i--) {
        var e = sortedEdits[i];
        var startOffset = document.offsetAt(e.range.start);
        var endOffset = document.offsetAt(e.range.end);
        if (endOffset <= lastModifiedOffset) {
          text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
        } else {
          throw new Error("Overlapping edit");
        }
        lastModifiedOffset = startOffset;
      }
      return text;
    }
    TextDocument3.applyEdits = applyEdits;
    function mergeSort2(data, compare) {
      if (data.length <= 1) {
        return data;
      }
      var p = data.length / 2 | 0;
      var left = data.slice(0, p);
      var right = data.slice(p);
      mergeSort2(left, compare);
      mergeSort2(right, compare);
      var leftIdx = 0;
      var rightIdx = 0;
      var i = 0;
      while (leftIdx < left.length && rightIdx < right.length) {
        var ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
          data[i++] = left[leftIdx++];
        } else {
          data[i++] = right[rightIdx++];
        }
      }
      while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
      }
      while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
      }
      return data;
    }
  })(TextDocument || (TextDocument = {}));
  var FullTextDocument = function() {
    function FullTextDocument3(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = void 0;
    }
    Object.defineProperty(FullTextDocument3.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FullTextDocument3.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FullTextDocument3.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: false,
      configurable: true
    });
    FullTextDocument3.prototype.getText = function(range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };
    FullTextDocument3.prototype.update = function(event, version) {
      this._content = event.text;
      this._version = version;
      this._lineOffsets = void 0;
    };
    FullTextDocument3.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        var lineOffsets = [];
        var text = this._content;
        var isLineStart = true;
        for (var i = 0; i < text.length; i++) {
          if (isLineStart) {
            lineOffsets.push(i);
            isLineStart = false;
          }
          var ch = text.charAt(i);
          isLineStart = ch === "\r" || ch === "\n";
          if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
            i++;
          }
        }
        if (isLineStart && text.length > 0) {
          lineOffsets.push(text.length);
        }
        this._lineOffsets = lineOffsets;
      }
      return this._lineOffsets;
    };
    FullTextDocument3.prototype.positionAt = function(offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return Position2.create(0, offset);
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      var line = low - 1;
      return Position2.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument3.prototype.offsetAt = function(position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument3.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: false,
      configurable: true
    });
    return FullTextDocument3;
  }();
  var Is;
  (function(Is2) {
    var toString = Object.prototype.toString;
    function defined(value) {
      return typeof value !== "undefined";
    }
    Is2.defined = defined;
    function undefined2(value) {
      return typeof value === "undefined";
    }
    Is2.undefined = undefined2;
    function boolean(value) {
      return value === true || value === false;
    }
    Is2.boolean = boolean;
    function string(value) {
      return toString.call(value) === "[object String]";
    }
    Is2.string = string;
    function number(value) {
      return toString.call(value) === "[object Number]";
    }
    Is2.number = number;
    function numberRange(value, min, max) {
      return toString.call(value) === "[object Number]" && min <= value && value <= max;
    }
    Is2.numberRange = numberRange;
    function integer2(value) {
      return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
    }
    Is2.integer = integer2;
    function uinteger2(value) {
      return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
    }
    Is2.uinteger = uinteger2;
    function func(value) {
      return toString.call(value) === "[object Function]";
    }
    Is2.func = func;
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
    Is2.objectLiteral = objectLiteral;
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    Is2.typedArray = typedArray;
  })(Is || (Is = {}));

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-languageserver-textdocument/lib/esm/main.js
  "use strict";
  var FullTextDocument2 = function() {
    function FullTextDocument3(uri, languageId, version, content) {
      this._uri = uri;
      this._languageId = languageId;
      this._version = version;
      this._content = content;
      this._lineOffsets = void 0;
    }
    Object.defineProperty(FullTextDocument3.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument3.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(FullTextDocument3.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: true,
      configurable: true
    });
    FullTextDocument3.prototype.getText = function(range) {
      if (range) {
        var start = this.offsetAt(range.start);
        var end = this.offsetAt(range.end);
        return this._content.substring(start, end);
      }
      return this._content;
    };
    FullTextDocument3.prototype.update = function(changes, version) {
      for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var change = changes_1[_i];
        if (FullTextDocument3.isIncremental(change)) {
          var range = getWellformedRange(change.range);
          var startOffset = this.offsetAt(range.start);
          var endOffset = this.offsetAt(range.end);
          this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
          var startLine = Math.max(range.start.line, 0);
          var endLine = Math.max(range.end.line, 0);
          var lineOffsets = this._lineOffsets;
          var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
          if (endLine - startLine === addedLineOffsets.length) {
            for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
              lineOffsets[i + startLine + 1] = addedLineOffsets[i];
            }
          } else {
            if (addedLineOffsets.length < 1e4) {
              lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
            } else {
              this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
            }
          }
          var diff = change.text.length - (endOffset - startOffset);
          if (diff !== 0) {
            for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
              lineOffsets[i] = lineOffsets[i] + diff;
            }
          }
        } else if (FullTextDocument3.isFull(change)) {
          this._content = change.text;
          this._lineOffsets = void 0;
        } else {
          throw new Error("Unknown change event received");
        }
      }
      this._version = version;
    };
    FullTextDocument3.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        this._lineOffsets = computeLineOffsets(this._content, true);
      }
      return this._lineOffsets;
    };
    FullTextDocument3.prototype.positionAt = function(offset) {
      offset = Math.max(Math.min(offset, this._content.length), 0);
      var lineOffsets = this.getLineOffsets();
      var low = 0, high = lineOffsets.length;
      if (high === 0) {
        return {line: 0, character: offset};
      }
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (lineOffsets[mid] > offset) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }
      var line = low - 1;
      return {line, character: offset - lineOffsets[line]};
    };
    FullTextDocument3.prototype.offsetAt = function(position) {
      var lineOffsets = this.getLineOffsets();
      if (position.line >= lineOffsets.length) {
        return this._content.length;
      } else if (position.line < 0) {
        return 0;
      }
      var lineOffset = lineOffsets[position.line];
      var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
      return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument3.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: true,
      configurable: true
    });
    FullTextDocument3.isIncremental = function(event) {
      var candidate = event;
      return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
    };
    FullTextDocument3.isFull = function(event) {
      var candidate = event;
      return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
    };
    return FullTextDocument3;
  }();
  var TextDocument2;
  (function(TextDocument3) {
    function create(uri, languageId, version, content) {
      return new FullTextDocument2(uri, languageId, version, content);
    }
    TextDocument3.create = create;
    function update(document, changes, version) {
      if (document instanceof FullTextDocument2) {
        document.update(changes, version);
        return document;
      } else {
        throw new Error("TextDocument.update: document must be created by TextDocument.create");
      }
    }
    TextDocument3.update = update;
    function applyEdits(document, edits) {
      var text = document.getText();
      var sortedEdits = mergeSort(edits.map(getWellformedEdit), function(a, b) {
        var diff = a.range.start.line - b.range.start.line;
        if (diff === 0) {
          return a.range.start.character - b.range.start.character;
        }
        return diff;
      });
      var lastModifiedOffset = 0;
      var spans = [];
      for (var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++) {
        var e = sortedEdits_1[_i];
        var startOffset = document.offsetAt(e.range.start);
        if (startOffset < lastModifiedOffset) {
          throw new Error("Overlapping edit");
        } else if (startOffset > lastModifiedOffset) {
          spans.push(text.substring(lastModifiedOffset, startOffset));
        }
        if (e.newText.length) {
          spans.push(e.newText);
        }
        lastModifiedOffset = document.offsetAt(e.range.end);
      }
      spans.push(text.substr(lastModifiedOffset));
      return spans.join("");
    }
    TextDocument3.applyEdits = applyEdits;
  })(TextDocument2 || (TextDocument2 = {}));
  function mergeSort(data, compare) {
    if (data.length <= 1) {
      return data;
    }
    var p = data.length / 2 | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        data[i++] = left[leftIdx++];
      } else {
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
  function computeLineOffsets(text, isAtLineStart, textOffset) {
    if (textOffset === void 0) {
      textOffset = 0;
    }
    var result = isAtLineStart ? [textOffset] : [];
    for (var i = 0; i < text.length; i++) {
      var ch = text.charCodeAt(i);
      if (ch === 13 || ch === 10) {
        if (ch === 13 && i + 1 < text.length && text.charCodeAt(i + 1) === 10) {
          i++;
        }
        result.push(textOffset + i + 1);
      }
    }
    return result;
  }
  function getWellformedRange(range) {
    var start = range.start;
    var end = range.end;
    if (start.line > end.line || start.line === end.line && start.character > end.character) {
      return {start: end, end: start};
    }
    return range;
  }
  function getWellformedEdit(textEdit) {
    var range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
      return {newText: textEdit.newText, range};
    }
    return textEdit;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/htmlLanguageTypes.js
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["StartCommentTag"] = 0] = "StartCommentTag";
    TokenType2[TokenType2["Comment"] = 1] = "Comment";
    TokenType2[TokenType2["EndCommentTag"] = 2] = "EndCommentTag";
    TokenType2[TokenType2["StartTagOpen"] = 3] = "StartTagOpen";
    TokenType2[TokenType2["StartTagClose"] = 4] = "StartTagClose";
    TokenType2[TokenType2["StartTagSelfClose"] = 5] = "StartTagSelfClose";
    TokenType2[TokenType2["StartTag"] = 6] = "StartTag";
    TokenType2[TokenType2["EndTagOpen"] = 7] = "EndTagOpen";
    TokenType2[TokenType2["EndTagClose"] = 8] = "EndTagClose";
    TokenType2[TokenType2["EndTag"] = 9] = "EndTag";
    TokenType2[TokenType2["DelimiterAssign"] = 10] = "DelimiterAssign";
    TokenType2[TokenType2["AttributeName"] = 11] = "AttributeName";
    TokenType2[TokenType2["AttributeValue"] = 12] = "AttributeValue";
    TokenType2[TokenType2["StartDoctypeTag"] = 13] = "StartDoctypeTag";
    TokenType2[TokenType2["Doctype"] = 14] = "Doctype";
    TokenType2[TokenType2["EndDoctypeTag"] = 15] = "EndDoctypeTag";
    TokenType2[TokenType2["Content"] = 16] = "Content";
    TokenType2[TokenType2["Whitespace"] = 17] = "Whitespace";
    TokenType2[TokenType2["Unknown"] = 18] = "Unknown";
    TokenType2[TokenType2["Script"] = 19] = "Script";
    TokenType2[TokenType2["Styles"] = 20] = "Styles";
    TokenType2[TokenType2["EOS"] = 21] = "EOS";
  })(TokenType || (TokenType = {}));
  var ScannerState;
  (function(ScannerState2) {
    ScannerState2[ScannerState2["WithinContent"] = 0] = "WithinContent";
    ScannerState2[ScannerState2["AfterOpeningStartTag"] = 1] = "AfterOpeningStartTag";
    ScannerState2[ScannerState2["AfterOpeningEndTag"] = 2] = "AfterOpeningEndTag";
    ScannerState2[ScannerState2["WithinDoctype"] = 3] = "WithinDoctype";
    ScannerState2[ScannerState2["WithinTag"] = 4] = "WithinTag";
    ScannerState2[ScannerState2["WithinEndTag"] = 5] = "WithinEndTag";
    ScannerState2[ScannerState2["WithinComment"] = 6] = "WithinComment";
    ScannerState2[ScannerState2["WithinScriptContent"] = 7] = "WithinScriptContent";
    ScannerState2[ScannerState2["WithinStyleContent"] = 8] = "WithinStyleContent";
    ScannerState2[ScannerState2["AfterAttributeName"] = 9] = "AfterAttributeName";
    ScannerState2[ScannerState2["BeforeAttributeValue"] = 10] = "BeforeAttributeValue";
  })(ScannerState || (ScannerState = {}));
  var ClientCapabilities;
  (function(ClientCapabilities2) {
    ClientCapabilities2.LATEST = {
      textDocument: {
        completion: {
          completionItem: {
            documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
          }
        },
        hover: {
          contentFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
        }
      }
    };
  })(ClientCapabilities || (ClientCapabilities = {}));
  var FileType;
  (function(FileType2) {
    FileType2[FileType2["Unknown"] = 0] = "Unknown";
    FileType2[FileType2["File"] = 1] = "File";
    FileType2[FileType2["Directory"] = 2] = "Directory";
    FileType2[FileType2["SymbolicLink"] = 64] = "SymbolicLink";
  })(FileType || (FileType = {}));

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/parser/htmlScanner.js
  var localize2 = loadMessageBundle();
  var MultiLineStream = function() {
    function MultiLineStream2(source, position) {
      this.source = source;
      this.len = source.length;
      this.position = position;
    }
    MultiLineStream2.prototype.eos = function() {
      return this.len <= this.position;
    };
    MultiLineStream2.prototype.getSource = function() {
      return this.source;
    };
    MultiLineStream2.prototype.pos = function() {
      return this.position;
    };
    MultiLineStream2.prototype.goBackTo = function(pos) {
      this.position = pos;
    };
    MultiLineStream2.prototype.goBack = function(n) {
      this.position -= n;
    };
    MultiLineStream2.prototype.advance = function(n) {
      this.position += n;
    };
    MultiLineStream2.prototype.goToEnd = function() {
      this.position = this.source.length;
    };
    MultiLineStream2.prototype.nextChar = function() {
      return this.source.charCodeAt(this.position++) || 0;
    };
    MultiLineStream2.prototype.peekChar = function(n) {
      if (n === void 0) {
        n = 0;
      }
      return this.source.charCodeAt(this.position + n) || 0;
    };
    MultiLineStream2.prototype.advanceIfChar = function(ch) {
      if (ch === this.source.charCodeAt(this.position)) {
        this.position++;
        return true;
      }
      return false;
    };
    MultiLineStream2.prototype.advanceIfChars = function(ch) {
      var i;
      if (this.position + ch.length > this.source.length) {
        return false;
      }
      for (i = 0; i < ch.length; i++) {
        if (this.source.charCodeAt(this.position + i) !== ch[i]) {
          return false;
        }
      }
      this.advance(i);
      return true;
    };
    MultiLineStream2.prototype.advanceIfRegExp = function(regex) {
      var str = this.source.substr(this.position);
      var match = str.match(regex);
      if (match) {
        this.position = this.position + match.index + match[0].length;
        return match[0];
      }
      return "";
    };
    MultiLineStream2.prototype.advanceUntilRegExp = function(regex) {
      var str = this.source.substr(this.position);
      var match = str.match(regex);
      if (match) {
        this.position = this.position + match.index;
        return match[0];
      } else {
        this.goToEnd();
      }
      return "";
    };
    MultiLineStream2.prototype.advanceUntilChar = function(ch) {
      while (this.position < this.source.length) {
        if (this.source.charCodeAt(this.position) === ch) {
          return true;
        }
        this.advance(1);
      }
      return false;
    };
    MultiLineStream2.prototype.advanceUntilChars = function(ch) {
      while (this.position + ch.length <= this.source.length) {
        var i = 0;
        for (; i < ch.length && this.source.charCodeAt(this.position + i) === ch[i]; i++) {
        }
        if (i === ch.length) {
          return true;
        }
        this.advance(1);
      }
      this.goToEnd();
      return false;
    };
    MultiLineStream2.prototype.skipWhitespace = function() {
      var n = this.advanceWhileChar(function(ch) {
        return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
      });
      return n > 0;
    };
    MultiLineStream2.prototype.advanceWhileChar = function(condition) {
      var posNow = this.position;
      while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
        this.position++;
      }
      return this.position - posNow;
    };
    return MultiLineStream2;
  }();
  var _BNG = "!".charCodeAt(0);
  var _MIN = "-".charCodeAt(0);
  var _LAN = "<".charCodeAt(0);
  var _RAN = ">".charCodeAt(0);
  var _FSL = "/".charCodeAt(0);
  var _EQS = "=".charCodeAt(0);
  var _DQO = '"'.charCodeAt(0);
  var _SQO = "'".charCodeAt(0);
  var _NWL = "\n".charCodeAt(0);
  var _CAR = "\r".charCodeAt(0);
  var _LFD = "\f".charCodeAt(0);
  var _WSP = " ".charCodeAt(0);
  var _TAB = "	".charCodeAt(0);
  var htmlScriptContents = {
    "text/x-handlebars-template": true,
    "text/html": true
  };
  function createScanner(input, initialOffset, initialState, emitPseudoCloseTags) {
    if (initialOffset === void 0) {
      initialOffset = 0;
    }
    if (initialState === void 0) {
      initialState = ScannerState.WithinContent;
    }
    if (emitPseudoCloseTags === void 0) {
      emitPseudoCloseTags = false;
    }
    var stream = new MultiLineStream(input, initialOffset);
    var state = initialState;
    var tokenOffset = 0;
    var tokenType = TokenType.Unknown;
    var tokenError;
    var hasSpaceAfterTag;
    var lastTag;
    var lastAttributeName;
    var lastTypeValue;
    function nextElementName() {
      return stream.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
    }
    function nextAttributeName() {
      return stream.advanceIfRegExp(/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase();
    }
    function finishToken(offset, type, errorMessage) {
      tokenType = type;
      tokenOffset = offset;
      tokenError = errorMessage;
      return type;
    }
    function scan() {
      var offset = stream.pos();
      var oldState = state;
      var token = internalScan();
      if (token !== TokenType.EOS && offset === stream.pos() && !(emitPseudoCloseTags && (token === TokenType.StartTagClose || token === TokenType.EndTagClose))) {
        console.log("Scanner.scan has not advanced at offset " + offset + ", state before: " + oldState + " after: " + state);
        stream.advance(1);
        return finishToken(offset, TokenType.Unknown);
      }
      return token;
    }
    function internalScan() {
      var offset = stream.pos();
      if (stream.eos()) {
        return finishToken(offset, TokenType.EOS);
      }
      var errorMessage;
      switch (state) {
        case ScannerState.WithinComment:
          if (stream.advanceIfChars([_MIN, _MIN, _RAN])) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.EndCommentTag);
          }
          stream.advanceUntilChars([_MIN, _MIN, _RAN]);
          return finishToken(offset, TokenType.Comment);
        case ScannerState.WithinDoctype:
          if (stream.advanceIfChar(_RAN)) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.EndDoctypeTag);
          }
          stream.advanceUntilChar(_RAN);
          return finishToken(offset, TokenType.Doctype);
        case ScannerState.WithinContent:
          if (stream.advanceIfChar(_LAN)) {
            if (!stream.eos() && stream.peekChar() === _BNG) {
              if (stream.advanceIfChars([_BNG, _MIN, _MIN])) {
                state = ScannerState.WithinComment;
                return finishToken(offset, TokenType.StartCommentTag);
              }
              if (stream.advanceIfRegExp(/^!doctype/i)) {
                state = ScannerState.WithinDoctype;
                return finishToken(offset, TokenType.StartDoctypeTag);
              }
            }
            if (stream.advanceIfChar(_FSL)) {
              state = ScannerState.AfterOpeningEndTag;
              return finishToken(offset, TokenType.EndTagOpen);
            }
            state = ScannerState.AfterOpeningStartTag;
            return finishToken(offset, TokenType.StartTagOpen);
          }
          stream.advanceUntilChar(_LAN);
          return finishToken(offset, TokenType.Content);
        case ScannerState.AfterOpeningEndTag:
          var tagName = nextElementName();
          if (tagName.length > 0) {
            state = ScannerState.WithinEndTag;
            return finishToken(offset, TokenType.EndTag);
          }
          if (stream.skipWhitespace()) {
            return finishToken(offset, TokenType.Whitespace, localize2("error.unexpectedWhitespace", "Tag name must directly follow the open bracket."));
          }
          state = ScannerState.WithinEndTag;
          stream.advanceUntilChar(_RAN);
          if (offset < stream.pos()) {
            return finishToken(offset, TokenType.Unknown, localize2("error.endTagNameExpected", "End tag name expected."));
          }
          return internalScan();
        case ScannerState.WithinEndTag:
          if (stream.skipWhitespace()) {
            return finishToken(offset, TokenType.Whitespace);
          }
          if (stream.advanceIfChar(_RAN)) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.EndTagClose);
          }
          if (emitPseudoCloseTags && stream.peekChar() === _LAN) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.EndTagClose, localize2("error.closingBracketMissing", "Closing bracket missing."));
          }
          errorMessage = localize2("error.closingBracketExpected", "Closing bracket expected.");
          break;
        case ScannerState.AfterOpeningStartTag:
          lastTag = nextElementName();
          lastTypeValue = void 0;
          lastAttributeName = void 0;
          if (lastTag.length > 0) {
            hasSpaceAfterTag = false;
            state = ScannerState.WithinTag;
            return finishToken(offset, TokenType.StartTag);
          }
          if (stream.skipWhitespace()) {
            return finishToken(offset, TokenType.Whitespace, localize2("error.unexpectedWhitespace", "Tag name must directly follow the open bracket."));
          }
          state = ScannerState.WithinTag;
          stream.advanceUntilChar(_RAN);
          if (offset < stream.pos()) {
            return finishToken(offset, TokenType.Unknown, localize2("error.startTagNameExpected", "Start tag name expected."));
          }
          return internalScan();
        case ScannerState.WithinTag:
          if (stream.skipWhitespace()) {
            hasSpaceAfterTag = true;
            return finishToken(offset, TokenType.Whitespace);
          }
          if (hasSpaceAfterTag) {
            lastAttributeName = nextAttributeName();
            if (lastAttributeName.length > 0) {
              state = ScannerState.AfterAttributeName;
              hasSpaceAfterTag = false;
              return finishToken(offset, TokenType.AttributeName);
            }
          }
          if (stream.advanceIfChars([_FSL, _RAN])) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.StartTagSelfClose);
          }
          if (stream.advanceIfChar(_RAN)) {
            if (lastTag === "script") {
              if (lastTypeValue && htmlScriptContents[lastTypeValue]) {
                state = ScannerState.WithinContent;
              } else {
                state = ScannerState.WithinScriptContent;
              }
            } else if (lastTag === "style") {
              state = ScannerState.WithinStyleContent;
            } else {
              state = ScannerState.WithinContent;
            }
            return finishToken(offset, TokenType.StartTagClose);
          }
          if (emitPseudoCloseTags && stream.peekChar() === _LAN) {
            state = ScannerState.WithinContent;
            return finishToken(offset, TokenType.StartTagClose, localize2("error.closingBracketMissing", "Closing bracket missing."));
          }
          stream.advance(1);
          return finishToken(offset, TokenType.Unknown, localize2("error.unexpectedCharacterInTag", "Unexpected character in tag."));
        case ScannerState.AfterAttributeName:
          if (stream.skipWhitespace()) {
            hasSpaceAfterTag = true;
            return finishToken(offset, TokenType.Whitespace);
          }
          if (stream.advanceIfChar(_EQS)) {
            state = ScannerState.BeforeAttributeValue;
            return finishToken(offset, TokenType.DelimiterAssign);
          }
          state = ScannerState.WithinTag;
          return internalScan();
        case ScannerState.BeforeAttributeValue:
          if (stream.skipWhitespace()) {
            return finishToken(offset, TokenType.Whitespace);
          }
          var attributeValue = stream.advanceIfRegExp(/^[^\s"'`=<>]+/);
          if (attributeValue.length > 0) {
            if (stream.peekChar() === _RAN && stream.peekChar(-1) === _FSL) {
              stream.goBack(1);
              attributeValue = attributeValue.substr(0, attributeValue.length - 1);
            }
            if (lastAttributeName === "type") {
              lastTypeValue = attributeValue;
            }
            state = ScannerState.WithinTag;
            hasSpaceAfterTag = false;
            return finishToken(offset, TokenType.AttributeValue);
          }
          var ch = stream.peekChar();
          if (ch === _SQO || ch === _DQO) {
            stream.advance(1);
            if (stream.advanceUntilChar(ch)) {
              stream.advance(1);
            }
            if (lastAttributeName === "type") {
              lastTypeValue = stream.getSource().substring(offset + 1, stream.pos() - 1);
            }
            state = ScannerState.WithinTag;
            hasSpaceAfterTag = false;
            return finishToken(offset, TokenType.AttributeValue);
          }
          state = ScannerState.WithinTag;
          hasSpaceAfterTag = false;
          return internalScan();
        case ScannerState.WithinScriptContent:
          var sciptState = 1;
          while (!stream.eos()) {
            var match = stream.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
            if (match.length === 0) {
              stream.goToEnd();
              return finishToken(offset, TokenType.Script);
            } else if (match === "<!--") {
              if (sciptState === 1) {
                sciptState = 2;
              }
            } else if (match === "-->") {
              sciptState = 1;
            } else if (match[1] !== "/") {
              if (sciptState === 2) {
                sciptState = 3;
              }
            } else {
              if (sciptState === 3) {
                sciptState = 2;
              } else {
                stream.goBack(match.length);
                break;
              }
            }
          }
          state = ScannerState.WithinContent;
          if (offset < stream.pos()) {
            return finishToken(offset, TokenType.Script);
          }
          return internalScan();
        case ScannerState.WithinStyleContent:
          stream.advanceUntilRegExp(/<\/style/i);
          state = ScannerState.WithinContent;
          if (offset < stream.pos()) {
            return finishToken(offset, TokenType.Styles);
          }
          return internalScan();
      }
      stream.advance(1);
      state = ScannerState.WithinContent;
      return finishToken(offset, TokenType.Unknown, errorMessage);
    }
    return {
      scan,
      getTokenType: function() {
        return tokenType;
      },
      getTokenOffset: function() {
        return tokenOffset;
      },
      getTokenLength: function() {
        return stream.pos() - tokenOffset;
      },
      getTokenEnd: function() {
        return stream.pos();
      },
      getTokenText: function() {
        return stream.getSource().substring(tokenOffset, stream.pos());
      },
      getScannerState: function() {
        return state;
      },
      getTokenError: function() {
        return tokenError;
      }
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/utils/arrays.js
  function findFirst(array, p) {
    var low = 0, high = array.length;
    if (high === 0) {
      return 0;
    }
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (p(array[mid])) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
  function binarySearch(array, key, comparator) {
    var low = 0, high = array.length - 1;
    while (low <= high) {
      var mid = (low + high) / 2 | 0;
      var comp = comparator(array[mid], key);
      if (comp < 0) {
        low = mid + 1;
      } else if (comp > 0) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -(low + 1);
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/languageFacts/fact.js
  var VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
  function isVoidElement(e) {
    return !!e && binarySearch(VOID_ELEMENTS, e.toLowerCase(), function(s1, s2) {
      return s1.localeCompare(s2);
    }) >= 0;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/parser/htmlParser.js
  var Node2 = function() {
    function Node3(start, end, children, parent) {
      this.start = start;
      this.end = end;
      this.children = children;
      this.parent = parent;
      this.closed = false;
    }
    Object.defineProperty(Node3.prototype, "attributeNames", {
      get: function() {
        return this.attributes ? Object.keys(this.attributes) : [];
      },
      enumerable: false,
      configurable: true
    });
    Node3.prototype.isSameTag = function(tagInLowerCase) {
      if (this.tag === void 0) {
        return tagInLowerCase === void 0;
      } else {
        return tagInLowerCase !== void 0 && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
      }
    };
    Object.defineProperty(Node3.prototype, "firstChild", {
      get: function() {
        return this.children[0];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node3.prototype, "lastChild", {
      get: function() {
        return this.children.length ? this.children[this.children.length - 1] : void 0;
      },
      enumerable: false,
      configurable: true
    });
    Node3.prototype.findNodeBefore = function(offset) {
      var idx = findFirst(this.children, function(c) {
        return offset <= c.start;
      }) - 1;
      if (idx >= 0) {
        var child = this.children[idx];
        if (offset > child.start) {
          if (offset < child.end) {
            return child.findNodeBefore(offset);
          }
          var lastChild = child.lastChild;
          if (lastChild && lastChild.end === child.end) {
            return child.findNodeBefore(offset);
          }
          return child;
        }
      }
      return this;
    };
    Node3.prototype.findNodeAt = function(offset) {
      var idx = findFirst(this.children, function(c) {
        return offset <= c.start;
      }) - 1;
      if (idx >= 0) {
        var child = this.children[idx];
        if (offset > child.start && offset <= child.end) {
          return child.findNodeAt(offset);
        }
      }
      return this;
    };
    return Node3;
  }();
  function parse(text) {
    var scanner = createScanner(text, void 0, void 0, true);
    var htmlDocument = new Node2(0, text.length, [], void 0);
    var curr = htmlDocument;
    var endTagStart = -1;
    var endTagName = void 0;
    var pendingAttribute = null;
    var token = scanner.scan();
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTagOpen:
          var child = new Node2(scanner.getTokenOffset(), text.length, [], curr);
          curr.children.push(child);
          curr = child;
          break;
        case TokenType.StartTag:
          curr.tag = scanner.getTokenText();
          break;
        case TokenType.StartTagClose:
          if (curr.parent) {
            curr.end = scanner.getTokenEnd();
            if (scanner.getTokenLength()) {
              curr.startTagEnd = scanner.getTokenEnd();
              if (curr.tag && isVoidElement(curr.tag)) {
                curr.closed = true;
                curr = curr.parent;
              }
            } else {
              curr = curr.parent;
            }
          }
          break;
        case TokenType.StartTagSelfClose:
          if (curr.parent) {
            curr.closed = true;
            curr.end = scanner.getTokenEnd();
            curr.startTagEnd = scanner.getTokenEnd();
            curr = curr.parent;
          }
          break;
        case TokenType.EndTagOpen:
          endTagStart = scanner.getTokenOffset();
          endTagName = void 0;
          break;
        case TokenType.EndTag:
          endTagName = scanner.getTokenText().toLowerCase();
          break;
        case TokenType.EndTagClose:
          var node = curr;
          while (!node.isSameTag(endTagName) && node.parent) {
            node = node.parent;
          }
          if (node.parent) {
            while (curr !== node) {
              curr.end = endTagStart;
              curr.closed = false;
              curr = curr.parent;
            }
            curr.closed = true;
            curr.endTagStart = endTagStart;
            curr.end = scanner.getTokenEnd();
            curr = curr.parent;
          }
          break;
        case TokenType.AttributeName: {
          pendingAttribute = scanner.getTokenText();
          var attributes = curr.attributes;
          if (!attributes) {
            curr.attributes = attributes = {};
          }
          attributes[pendingAttribute] = null;
          break;
        }
        case TokenType.AttributeValue: {
          var value = scanner.getTokenText();
          var attributes = curr.attributes;
          if (attributes && pendingAttribute) {
            attributes[pendingAttribute] = value;
            pendingAttribute = null;
          }
          break;
        }
      }
      token = scanner.scan();
    }
    while (curr.parent) {
      curr.end = text.length;
      curr.closed = false;
      curr = curr.parent;
    }
    return {
      roots: htmlDocument.children,
      findNodeBefore: htmlDocument.findNodeBefore.bind(htmlDocument),
      findNodeAt: htmlDocument.findNodeAt.bind(htmlDocument)
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/parser/htmlEntities.js
  var entities = {
    "Aacute;": "\xC1",
    Aacute: "\xC1",
    "aacute;": "\xE1",
    aacute: "\xE1",
    "Abreve;": "\u0102",
    "abreve;": "\u0103",
    "ac;": "\u223E",
    "acd;": "\u223F",
    "acE;": "\u223E\u0333",
    "Acirc;": "\xC2",
    Acirc: "\xC2",
    "acirc;": "\xE2",
    acirc: "\xE2",
    "acute;": "\xB4",
    acute: "\xB4",
    "Acy;": "\u0410",
    "acy;": "\u0430",
    "AElig;": "\xC6",
    AElig: "\xC6",
    "aelig;": "\xE6",
    aelig: "\xE6",
    "af;": "\u2061",
    "Afr;": "\u{1D504}",
    "afr;": "\u{1D51E}",
    "Agrave;": "\xC0",
    Agrave: "\xC0",
    "agrave;": "\xE0",
    agrave: "\xE0",
    "alefsym;": "\u2135",
    "aleph;": "\u2135",
    "Alpha;": "\u0391",
    "alpha;": "\u03B1",
    "Amacr;": "\u0100",
    "amacr;": "\u0101",
    "amalg;": "\u2A3F",
    "AMP;": "&",
    AMP: "&",
    "amp;": "&",
    amp: "&",
    "And;": "\u2A53",
    "and;": "\u2227",
    "andand;": "\u2A55",
    "andd;": "\u2A5C",
    "andslope;": "\u2A58",
    "andv;": "\u2A5A",
    "ang;": "\u2220",
    "ange;": "\u29A4",
    "angle;": "\u2220",
    "angmsd;": "\u2221",
    "angmsdaa;": "\u29A8",
    "angmsdab;": "\u29A9",
    "angmsdac;": "\u29AA",
    "angmsdad;": "\u29AB",
    "angmsdae;": "\u29AC",
    "angmsdaf;": "\u29AD",
    "angmsdag;": "\u29AE",
    "angmsdah;": "\u29AF",
    "angrt;": "\u221F",
    "angrtvb;": "\u22BE",
    "angrtvbd;": "\u299D",
    "angsph;": "\u2222",
    "angst;": "\xC5",
    "angzarr;": "\u237C",
    "Aogon;": "\u0104",
    "aogon;": "\u0105",
    "Aopf;": "\u{1D538}",
    "aopf;": "\u{1D552}",
    "ap;": "\u2248",
    "apacir;": "\u2A6F",
    "apE;": "\u2A70",
    "ape;": "\u224A",
    "apid;": "\u224B",
    "apos;": "'",
    "ApplyFunction;": "\u2061",
    "approx;": "\u2248",
    "approxeq;": "\u224A",
    "Aring;": "\xC5",
    Aring: "\xC5",
    "aring;": "\xE5",
    aring: "\xE5",
    "Ascr;": "\u{1D49C}",
    "ascr;": "\u{1D4B6}",
    "Assign;": "\u2254",
    "ast;": "*",
    "asymp;": "\u2248",
    "asympeq;": "\u224D",
    "Atilde;": "\xC3",
    Atilde: "\xC3",
    "atilde;": "\xE3",
    atilde: "\xE3",
    "Auml;": "\xC4",
    Auml: "\xC4",
    "auml;": "\xE4",
    auml: "\xE4",
    "awconint;": "\u2233",
    "awint;": "\u2A11",
    "backcong;": "\u224C",
    "backepsilon;": "\u03F6",
    "backprime;": "\u2035",
    "backsim;": "\u223D",
    "backsimeq;": "\u22CD",
    "Backslash;": "\u2216",
    "Barv;": "\u2AE7",
    "barvee;": "\u22BD",
    "Barwed;": "\u2306",
    "barwed;": "\u2305",
    "barwedge;": "\u2305",
    "bbrk;": "\u23B5",
    "bbrktbrk;": "\u23B6",
    "bcong;": "\u224C",
    "Bcy;": "\u0411",
    "bcy;": "\u0431",
    "bdquo;": "\u201E",
    "becaus;": "\u2235",
    "Because;": "\u2235",
    "because;": "\u2235",
    "bemptyv;": "\u29B0",
    "bepsi;": "\u03F6",
    "bernou;": "\u212C",
    "Bernoullis;": "\u212C",
    "Beta;": "\u0392",
    "beta;": "\u03B2",
    "beth;": "\u2136",
    "between;": "\u226C",
    "Bfr;": "\u{1D505}",
    "bfr;": "\u{1D51F}",
    "bigcap;": "\u22C2",
    "bigcirc;": "\u25EF",
    "bigcup;": "\u22C3",
    "bigodot;": "\u2A00",
    "bigoplus;": "\u2A01",
    "bigotimes;": "\u2A02",
    "bigsqcup;": "\u2A06",
    "bigstar;": "\u2605",
    "bigtriangledown;": "\u25BD",
    "bigtriangleup;": "\u25B3",
    "biguplus;": "\u2A04",
    "bigvee;": "\u22C1",
    "bigwedge;": "\u22C0",
    "bkarow;": "\u290D",
    "blacklozenge;": "\u29EB",
    "blacksquare;": "\u25AA",
    "blacktriangle;": "\u25B4",
    "blacktriangledown;": "\u25BE",
    "blacktriangleleft;": "\u25C2",
    "blacktriangleright;": "\u25B8",
    "blank;": "\u2423",
    "blk12;": "\u2592",
    "blk14;": "\u2591",
    "blk34;": "\u2593",
    "block;": "\u2588",
    "bne;": "=\u20E5",
    "bnequiv;": "\u2261\u20E5",
    "bNot;": "\u2AED",
    "bnot;": "\u2310",
    "Bopf;": "\u{1D539}",
    "bopf;": "\u{1D553}",
    "bot;": "\u22A5",
    "bottom;": "\u22A5",
    "bowtie;": "\u22C8",
    "boxbox;": "\u29C9",
    "boxDL;": "\u2557",
    "boxDl;": "\u2556",
    "boxdL;": "\u2555",
    "boxdl;": "\u2510",
    "boxDR;": "\u2554",
    "boxDr;": "\u2553",
    "boxdR;": "\u2552",
    "boxdr;": "\u250C",
    "boxH;": "\u2550",
    "boxh;": "\u2500",
    "boxHD;": "\u2566",
    "boxHd;": "\u2564",
    "boxhD;": "\u2565",
    "boxhd;": "\u252C",
    "boxHU;": "\u2569",
    "boxHu;": "\u2567",
    "boxhU;": "\u2568",
    "boxhu;": "\u2534",
    "boxminus;": "\u229F",
    "boxplus;": "\u229E",
    "boxtimes;": "\u22A0",
    "boxUL;": "\u255D",
    "boxUl;": "\u255C",
    "boxuL;": "\u255B",
    "boxul;": "\u2518",
    "boxUR;": "\u255A",
    "boxUr;": "\u2559",
    "boxuR;": "\u2558",
    "boxur;": "\u2514",
    "boxV;": "\u2551",
    "boxv;": "\u2502",
    "boxVH;": "\u256C",
    "boxVh;": "\u256B",
    "boxvH;": "\u256A",
    "boxvh;": "\u253C",
    "boxVL;": "\u2563",
    "boxVl;": "\u2562",
    "boxvL;": "\u2561",
    "boxvl;": "\u2524",
    "boxVR;": "\u2560",
    "boxVr;": "\u255F",
    "boxvR;": "\u255E",
    "boxvr;": "\u251C",
    "bprime;": "\u2035",
    "Breve;": "\u02D8",
    "breve;": "\u02D8",
    "brvbar;": "\xA6",
    brvbar: "\xA6",
    "Bscr;": "\u212C",
    "bscr;": "\u{1D4B7}",
    "bsemi;": "\u204F",
    "bsim;": "\u223D",
    "bsime;": "\u22CD",
    "bsol;": "\\",
    "bsolb;": "\u29C5",
    "bsolhsub;": "\u27C8",
    "bull;": "\u2022",
    "bullet;": "\u2022",
    "bump;": "\u224E",
    "bumpE;": "\u2AAE",
    "bumpe;": "\u224F",
    "Bumpeq;": "\u224E",
    "bumpeq;": "\u224F",
    "Cacute;": "\u0106",
    "cacute;": "\u0107",
    "Cap;": "\u22D2",
    "cap;": "\u2229",
    "capand;": "\u2A44",
    "capbrcup;": "\u2A49",
    "capcap;": "\u2A4B",
    "capcup;": "\u2A47",
    "capdot;": "\u2A40",
    "CapitalDifferentialD;": "\u2145",
    "caps;": "\u2229\uFE00",
    "caret;": "\u2041",
    "caron;": "\u02C7",
    "Cayleys;": "\u212D",
    "ccaps;": "\u2A4D",
    "Ccaron;": "\u010C",
    "ccaron;": "\u010D",
    "Ccedil;": "\xC7",
    Ccedil: "\xC7",
    "ccedil;": "\xE7",
    ccedil: "\xE7",
    "Ccirc;": "\u0108",
    "ccirc;": "\u0109",
    "Cconint;": "\u2230",
    "ccups;": "\u2A4C",
    "ccupssm;": "\u2A50",
    "Cdot;": "\u010A",
    "cdot;": "\u010B",
    "cedil;": "\xB8",
    cedil: "\xB8",
    "Cedilla;": "\xB8",
    "cemptyv;": "\u29B2",
    "cent;": "\xA2",
    cent: "\xA2",
    "CenterDot;": "\xB7",
    "centerdot;": "\xB7",
    "Cfr;": "\u212D",
    "cfr;": "\u{1D520}",
    "CHcy;": "\u0427",
    "chcy;": "\u0447",
    "check;": "\u2713",
    "checkmark;": "\u2713",
    "Chi;": "\u03A7",
    "chi;": "\u03C7",
    "cir;": "\u25CB",
    "circ;": "\u02C6",
    "circeq;": "\u2257",
    "circlearrowleft;": "\u21BA",
    "circlearrowright;": "\u21BB",
    "circledast;": "\u229B",
    "circledcirc;": "\u229A",
    "circleddash;": "\u229D",
    "CircleDot;": "\u2299",
    "circledR;": "\xAE",
    "circledS;": "\u24C8",
    "CircleMinus;": "\u2296",
    "CirclePlus;": "\u2295",
    "CircleTimes;": "\u2297",
    "cirE;": "\u29C3",
    "cire;": "\u2257",
    "cirfnint;": "\u2A10",
    "cirmid;": "\u2AEF",
    "cirscir;": "\u29C2",
    "ClockwiseContourIntegral;": "\u2232",
    "CloseCurlyDoubleQuote;": "\u201D",
    "CloseCurlyQuote;": "\u2019",
    "clubs;": "\u2663",
    "clubsuit;": "\u2663",
    "Colon;": "\u2237",
    "colon;": ":",
    "Colone;": "\u2A74",
    "colone;": "\u2254",
    "coloneq;": "\u2254",
    "comma;": ",",
    "commat;": "@",
    "comp;": "\u2201",
    "compfn;": "\u2218",
    "complement;": "\u2201",
    "complexes;": "\u2102",
    "cong;": "\u2245",
    "congdot;": "\u2A6D",
    "Congruent;": "\u2261",
    "Conint;": "\u222F",
    "conint;": "\u222E",
    "ContourIntegral;": "\u222E",
    "Copf;": "\u2102",
    "copf;": "\u{1D554}",
    "coprod;": "\u2210",
    "Coproduct;": "\u2210",
    "COPY;": "\xA9",
    COPY: "\xA9",
    "copy;": "\xA9",
    copy: "\xA9",
    "copysr;": "\u2117",
    "CounterClockwiseContourIntegral;": "\u2233",
    "crarr;": "\u21B5",
    "Cross;": "\u2A2F",
    "cross;": "\u2717",
    "Cscr;": "\u{1D49E}",
    "cscr;": "\u{1D4B8}",
    "csub;": "\u2ACF",
    "csube;": "\u2AD1",
    "csup;": "\u2AD0",
    "csupe;": "\u2AD2",
    "ctdot;": "\u22EF",
    "cudarrl;": "\u2938",
    "cudarrr;": "\u2935",
    "cuepr;": "\u22DE",
    "cuesc;": "\u22DF",
    "cularr;": "\u21B6",
    "cularrp;": "\u293D",
    "Cup;": "\u22D3",
    "cup;": "\u222A",
    "cupbrcap;": "\u2A48",
    "CupCap;": "\u224D",
    "cupcap;": "\u2A46",
    "cupcup;": "\u2A4A",
    "cupdot;": "\u228D",
    "cupor;": "\u2A45",
    "cups;": "\u222A\uFE00",
    "curarr;": "\u21B7",
    "curarrm;": "\u293C",
    "curlyeqprec;": "\u22DE",
    "curlyeqsucc;": "\u22DF",
    "curlyvee;": "\u22CE",
    "curlywedge;": "\u22CF",
    "curren;": "\xA4",
    curren: "\xA4",
    "curvearrowleft;": "\u21B6",
    "curvearrowright;": "\u21B7",
    "cuvee;": "\u22CE",
    "cuwed;": "\u22CF",
    "cwconint;": "\u2232",
    "cwint;": "\u2231",
    "cylcty;": "\u232D",
    "Dagger;": "\u2021",
    "dagger;": "\u2020",
    "daleth;": "\u2138",
    "Darr;": "\u21A1",
    "dArr;": "\u21D3",
    "darr;": "\u2193",
    "dash;": "\u2010",
    "Dashv;": "\u2AE4",
    "dashv;": "\u22A3",
    "dbkarow;": "\u290F",
    "dblac;": "\u02DD",
    "Dcaron;": "\u010E",
    "dcaron;": "\u010F",
    "Dcy;": "\u0414",
    "dcy;": "\u0434",
    "DD;": "\u2145",
    "dd;": "\u2146",
    "ddagger;": "\u2021",
    "ddarr;": "\u21CA",
    "DDotrahd;": "\u2911",
    "ddotseq;": "\u2A77",
    "deg;": "\xB0",
    deg: "\xB0",
    "Del;": "\u2207",
    "Delta;": "\u0394",
    "delta;": "\u03B4",
    "demptyv;": "\u29B1",
    "dfisht;": "\u297F",
    "Dfr;": "\u{1D507}",
    "dfr;": "\u{1D521}",
    "dHar;": "\u2965",
    "dharl;": "\u21C3",
    "dharr;": "\u21C2",
    "DiacriticalAcute;": "\xB4",
    "DiacriticalDot;": "\u02D9",
    "DiacriticalDoubleAcute;": "\u02DD",
    "DiacriticalGrave;": "`",
    "DiacriticalTilde;": "\u02DC",
    "diam;": "\u22C4",
    "Diamond;": "\u22C4",
    "diamond;": "\u22C4",
    "diamondsuit;": "\u2666",
    "diams;": "\u2666",
    "die;": "\xA8",
    "DifferentialD;": "\u2146",
    "digamma;": "\u03DD",
    "disin;": "\u22F2",
    "div;": "\xF7",
    "divide;": "\xF7",
    divide: "\xF7",
    "divideontimes;": "\u22C7",
    "divonx;": "\u22C7",
    "DJcy;": "\u0402",
    "djcy;": "\u0452",
    "dlcorn;": "\u231E",
    "dlcrop;": "\u230D",
    "dollar;": "$",
    "Dopf;": "\u{1D53B}",
    "dopf;": "\u{1D555}",
    "Dot;": "\xA8",
    "dot;": "\u02D9",
    "DotDot;": "\u20DC",
    "doteq;": "\u2250",
    "doteqdot;": "\u2251",
    "DotEqual;": "\u2250",
    "dotminus;": "\u2238",
    "dotplus;": "\u2214",
    "dotsquare;": "\u22A1",
    "doublebarwedge;": "\u2306",
    "DoubleContourIntegral;": "\u222F",
    "DoubleDot;": "\xA8",
    "DoubleDownArrow;": "\u21D3",
    "DoubleLeftArrow;": "\u21D0",
    "DoubleLeftRightArrow;": "\u21D4",
    "DoubleLeftTee;": "\u2AE4",
    "DoubleLongLeftArrow;": "\u27F8",
    "DoubleLongLeftRightArrow;": "\u27FA",
    "DoubleLongRightArrow;": "\u27F9",
    "DoubleRightArrow;": "\u21D2",
    "DoubleRightTee;": "\u22A8",
    "DoubleUpArrow;": "\u21D1",
    "DoubleUpDownArrow;": "\u21D5",
    "DoubleVerticalBar;": "\u2225",
    "DownArrow;": "\u2193",
    "Downarrow;": "\u21D3",
    "downarrow;": "\u2193",
    "DownArrowBar;": "\u2913",
    "DownArrowUpArrow;": "\u21F5",
    "DownBreve;": "\u0311",
    "downdownarrows;": "\u21CA",
    "downharpoonleft;": "\u21C3",
    "downharpoonright;": "\u21C2",
    "DownLeftRightVector;": "\u2950",
    "DownLeftTeeVector;": "\u295E",
    "DownLeftVector;": "\u21BD",
    "DownLeftVectorBar;": "\u2956",
    "DownRightTeeVector;": "\u295F",
    "DownRightVector;": "\u21C1",
    "DownRightVectorBar;": "\u2957",
    "DownTee;": "\u22A4",
    "DownTeeArrow;": "\u21A7",
    "drbkarow;": "\u2910",
    "drcorn;": "\u231F",
    "drcrop;": "\u230C",
    "Dscr;": "\u{1D49F}",
    "dscr;": "\u{1D4B9}",
    "DScy;": "\u0405",
    "dscy;": "\u0455",
    "dsol;": "\u29F6",
    "Dstrok;": "\u0110",
    "dstrok;": "\u0111",
    "dtdot;": "\u22F1",
    "dtri;": "\u25BF",
    "dtrif;": "\u25BE",
    "duarr;": "\u21F5",
    "duhar;": "\u296F",
    "dwangle;": "\u29A6",
    "DZcy;": "\u040F",
    "dzcy;": "\u045F",
    "dzigrarr;": "\u27FF",
    "Eacute;": "\xC9",
    Eacute: "\xC9",
    "eacute;": "\xE9",
    eacute: "\xE9",
    "easter;": "\u2A6E",
    "Ecaron;": "\u011A",
    "ecaron;": "\u011B",
    "ecir;": "\u2256",
    "Ecirc;": "\xCA",
    Ecirc: "\xCA",
    "ecirc;": "\xEA",
    ecirc: "\xEA",
    "ecolon;": "\u2255",
    "Ecy;": "\u042D",
    "ecy;": "\u044D",
    "eDDot;": "\u2A77",
    "Edot;": "\u0116",
    "eDot;": "\u2251",
    "edot;": "\u0117",
    "ee;": "\u2147",
    "efDot;": "\u2252",
    "Efr;": "\u{1D508}",
    "efr;": "\u{1D522}",
    "eg;": "\u2A9A",
    "Egrave;": "\xC8",
    Egrave: "\xC8",
    "egrave;": "\xE8",
    egrave: "\xE8",
    "egs;": "\u2A96",
    "egsdot;": "\u2A98",
    "el;": "\u2A99",
    "Element;": "\u2208",
    "elinters;": "\u23E7",
    "ell;": "\u2113",
    "els;": "\u2A95",
    "elsdot;": "\u2A97",
    "Emacr;": "\u0112",
    "emacr;": "\u0113",
    "empty;": "\u2205",
    "emptyset;": "\u2205",
    "EmptySmallSquare;": "\u25FB",
    "emptyv;": "\u2205",
    "EmptyVerySmallSquare;": "\u25AB",
    "emsp;": "\u2003",
    "emsp13;": "\u2004",
    "emsp14;": "\u2005",
    "ENG;": "\u014A",
    "eng;": "\u014B",
    "ensp;": "\u2002",
    "Eogon;": "\u0118",
    "eogon;": "\u0119",
    "Eopf;": "\u{1D53C}",
    "eopf;": "\u{1D556}",
    "epar;": "\u22D5",
    "eparsl;": "\u29E3",
    "eplus;": "\u2A71",
    "epsi;": "\u03B5",
    "Epsilon;": "\u0395",
    "epsilon;": "\u03B5",
    "epsiv;": "\u03F5",
    "eqcirc;": "\u2256",
    "eqcolon;": "\u2255",
    "eqsim;": "\u2242",
    "eqslantgtr;": "\u2A96",
    "eqslantless;": "\u2A95",
    "Equal;": "\u2A75",
    "equals;": "=",
    "EqualTilde;": "\u2242",
    "equest;": "\u225F",
    "Equilibrium;": "\u21CC",
    "equiv;": "\u2261",
    "equivDD;": "\u2A78",
    "eqvparsl;": "\u29E5",
    "erarr;": "\u2971",
    "erDot;": "\u2253",
    "Escr;": "\u2130",
    "escr;": "\u212F",
    "esdot;": "\u2250",
    "Esim;": "\u2A73",
    "esim;": "\u2242",
    "Eta;": "\u0397",
    "eta;": "\u03B7",
    "ETH;": "\xD0",
    ETH: "\xD0",
    "eth;": "\xF0",
    eth: "\xF0",
    "Euml;": "\xCB",
    Euml: "\xCB",
    "euml;": "\xEB",
    euml: "\xEB",
    "euro;": "\u20AC",
    "excl;": "!",
    "exist;": "\u2203",
    "Exists;": "\u2203",
    "expectation;": "\u2130",
    "ExponentialE;": "\u2147",
    "exponentiale;": "\u2147",
    "fallingdotseq;": "\u2252",
    "Fcy;": "\u0424",
    "fcy;": "\u0444",
    "female;": "\u2640",
    "ffilig;": "\uFB03",
    "fflig;": "\uFB00",
    "ffllig;": "\uFB04",
    "Ffr;": "\u{1D509}",
    "ffr;": "\u{1D523}",
    "filig;": "\uFB01",
    "FilledSmallSquare;": "\u25FC",
    "FilledVerySmallSquare;": "\u25AA",
    "fjlig;": "fj",
    "flat;": "\u266D",
    "fllig;": "\uFB02",
    "fltns;": "\u25B1",
    "fnof;": "\u0192",
    "Fopf;": "\u{1D53D}",
    "fopf;": "\u{1D557}",
    "ForAll;": "\u2200",
    "forall;": "\u2200",
    "fork;": "\u22D4",
    "forkv;": "\u2AD9",
    "Fouriertrf;": "\u2131",
    "fpartint;": "\u2A0D",
    "frac12;": "\xBD",
    frac12: "\xBD",
    "frac13;": "\u2153",
    "frac14;": "\xBC",
    frac14: "\xBC",
    "frac15;": "\u2155",
    "frac16;": "\u2159",
    "frac18;": "\u215B",
    "frac23;": "\u2154",
    "frac25;": "\u2156",
    "frac34;": "\xBE",
    frac34: "\xBE",
    "frac35;": "\u2157",
    "frac38;": "\u215C",
    "frac45;": "\u2158",
    "frac56;": "\u215A",
    "frac58;": "\u215D",
    "frac78;": "\u215E",
    "frasl;": "\u2044",
    "frown;": "\u2322",
    "Fscr;": "\u2131",
    "fscr;": "\u{1D4BB}",
    "gacute;": "\u01F5",
    "Gamma;": "\u0393",
    "gamma;": "\u03B3",
    "Gammad;": "\u03DC",
    "gammad;": "\u03DD",
    "gap;": "\u2A86",
    "Gbreve;": "\u011E",
    "gbreve;": "\u011F",
    "Gcedil;": "\u0122",
    "Gcirc;": "\u011C",
    "gcirc;": "\u011D",
    "Gcy;": "\u0413",
    "gcy;": "\u0433",
    "Gdot;": "\u0120",
    "gdot;": "\u0121",
    "gE;": "\u2267",
    "ge;": "\u2265",
    "gEl;": "\u2A8C",
    "gel;": "\u22DB",
    "geq;": "\u2265",
    "geqq;": "\u2267",
    "geqslant;": "\u2A7E",
    "ges;": "\u2A7E",
    "gescc;": "\u2AA9",
    "gesdot;": "\u2A80",
    "gesdoto;": "\u2A82",
    "gesdotol;": "\u2A84",
    "gesl;": "\u22DB\uFE00",
    "gesles;": "\u2A94",
    "Gfr;": "\u{1D50A}",
    "gfr;": "\u{1D524}",
    "Gg;": "\u22D9",
    "gg;": "\u226B",
    "ggg;": "\u22D9",
    "gimel;": "\u2137",
    "GJcy;": "\u0403",
    "gjcy;": "\u0453",
    "gl;": "\u2277",
    "gla;": "\u2AA5",
    "glE;": "\u2A92",
    "glj;": "\u2AA4",
    "gnap;": "\u2A8A",
    "gnapprox;": "\u2A8A",
    "gnE;": "\u2269",
    "gne;": "\u2A88",
    "gneq;": "\u2A88",
    "gneqq;": "\u2269",
    "gnsim;": "\u22E7",
    "Gopf;": "\u{1D53E}",
    "gopf;": "\u{1D558}",
    "grave;": "`",
    "GreaterEqual;": "\u2265",
    "GreaterEqualLess;": "\u22DB",
    "GreaterFullEqual;": "\u2267",
    "GreaterGreater;": "\u2AA2",
    "GreaterLess;": "\u2277",
    "GreaterSlantEqual;": "\u2A7E",
    "GreaterTilde;": "\u2273",
    "Gscr;": "\u{1D4A2}",
    "gscr;": "\u210A",
    "gsim;": "\u2273",
    "gsime;": "\u2A8E",
    "gsiml;": "\u2A90",
    "GT;": ">",
    GT: ">",
    "Gt;": "\u226B",
    "gt;": ">",
    gt: ">",
    "gtcc;": "\u2AA7",
    "gtcir;": "\u2A7A",
    "gtdot;": "\u22D7",
    "gtlPar;": "\u2995",
    "gtquest;": "\u2A7C",
    "gtrapprox;": "\u2A86",
    "gtrarr;": "\u2978",
    "gtrdot;": "\u22D7",
    "gtreqless;": "\u22DB",
    "gtreqqless;": "\u2A8C",
    "gtrless;": "\u2277",
    "gtrsim;": "\u2273",
    "gvertneqq;": "\u2269\uFE00",
    "gvnE;": "\u2269\uFE00",
    "Hacek;": "\u02C7",
    "hairsp;": "\u200A",
    "half;": "\xBD",
    "hamilt;": "\u210B",
    "HARDcy;": "\u042A",
    "hardcy;": "\u044A",
    "hArr;": "\u21D4",
    "harr;": "\u2194",
    "harrcir;": "\u2948",
    "harrw;": "\u21AD",
    "Hat;": "^",
    "hbar;": "\u210F",
    "Hcirc;": "\u0124",
    "hcirc;": "\u0125",
    "hearts;": "\u2665",
    "heartsuit;": "\u2665",
    "hellip;": "\u2026",
    "hercon;": "\u22B9",
    "Hfr;": "\u210C",
    "hfr;": "\u{1D525}",
    "HilbertSpace;": "\u210B",
    "hksearow;": "\u2925",
    "hkswarow;": "\u2926",
    "hoarr;": "\u21FF",
    "homtht;": "\u223B",
    "hookleftarrow;": "\u21A9",
    "hookrightarrow;": "\u21AA",
    "Hopf;": "\u210D",
    "hopf;": "\u{1D559}",
    "horbar;": "\u2015",
    "HorizontalLine;": "\u2500",
    "Hscr;": "\u210B",
    "hscr;": "\u{1D4BD}",
    "hslash;": "\u210F",
    "Hstrok;": "\u0126",
    "hstrok;": "\u0127",
    "HumpDownHump;": "\u224E",
    "HumpEqual;": "\u224F",
    "hybull;": "\u2043",
    "hyphen;": "\u2010",
    "Iacute;": "\xCD",
    Iacute: "\xCD",
    "iacute;": "\xED",
    iacute: "\xED",
    "ic;": "\u2063",
    "Icirc;": "\xCE",
    Icirc: "\xCE",
    "icirc;": "\xEE",
    icirc: "\xEE",
    "Icy;": "\u0418",
    "icy;": "\u0438",
    "Idot;": "\u0130",
    "IEcy;": "\u0415",
    "iecy;": "\u0435",
    "iexcl;": "\xA1",
    iexcl: "\xA1",
    "iff;": "\u21D4",
    "Ifr;": "\u2111",
    "ifr;": "\u{1D526}",
    "Igrave;": "\xCC",
    Igrave: "\xCC",
    "igrave;": "\xEC",
    igrave: "\xEC",
    "ii;": "\u2148",
    "iiiint;": "\u2A0C",
    "iiint;": "\u222D",
    "iinfin;": "\u29DC",
    "iiota;": "\u2129",
    "IJlig;": "\u0132",
    "ijlig;": "\u0133",
    "Im;": "\u2111",
    "Imacr;": "\u012A",
    "imacr;": "\u012B",
    "image;": "\u2111",
    "ImaginaryI;": "\u2148",
    "imagline;": "\u2110",
    "imagpart;": "\u2111",
    "imath;": "\u0131",
    "imof;": "\u22B7",
    "imped;": "\u01B5",
    "Implies;": "\u21D2",
    "in;": "\u2208",
    "incare;": "\u2105",
    "infin;": "\u221E",
    "infintie;": "\u29DD",
    "inodot;": "\u0131",
    "Int;": "\u222C",
    "int;": "\u222B",
    "intcal;": "\u22BA",
    "integers;": "\u2124",
    "Integral;": "\u222B",
    "intercal;": "\u22BA",
    "Intersection;": "\u22C2",
    "intlarhk;": "\u2A17",
    "intprod;": "\u2A3C",
    "InvisibleComma;": "\u2063",
    "InvisibleTimes;": "\u2062",
    "IOcy;": "\u0401",
    "iocy;": "\u0451",
    "Iogon;": "\u012E",
    "iogon;": "\u012F",
    "Iopf;": "\u{1D540}",
    "iopf;": "\u{1D55A}",
    "Iota;": "\u0399",
    "iota;": "\u03B9",
    "iprod;": "\u2A3C",
    "iquest;": "\xBF",
    iquest: "\xBF",
    "Iscr;": "\u2110",
    "iscr;": "\u{1D4BE}",
    "isin;": "\u2208",
    "isindot;": "\u22F5",
    "isinE;": "\u22F9",
    "isins;": "\u22F4",
    "isinsv;": "\u22F3",
    "isinv;": "\u2208",
    "it;": "\u2062",
    "Itilde;": "\u0128",
    "itilde;": "\u0129",
    "Iukcy;": "\u0406",
    "iukcy;": "\u0456",
    "Iuml;": "\xCF",
    Iuml: "\xCF",
    "iuml;": "\xEF",
    iuml: "\xEF",
    "Jcirc;": "\u0134",
    "jcirc;": "\u0135",
    "Jcy;": "\u0419",
    "jcy;": "\u0439",
    "Jfr;": "\u{1D50D}",
    "jfr;": "\u{1D527}",
    "jmath;": "\u0237",
    "Jopf;": "\u{1D541}",
    "jopf;": "\u{1D55B}",
    "Jscr;": "\u{1D4A5}",
    "jscr;": "\u{1D4BF}",
    "Jsercy;": "\u0408",
    "jsercy;": "\u0458",
    "Jukcy;": "\u0404",
    "jukcy;": "\u0454",
    "Kappa;": "\u039A",
    "kappa;": "\u03BA",
    "kappav;": "\u03F0",
    "Kcedil;": "\u0136",
    "kcedil;": "\u0137",
    "Kcy;": "\u041A",
    "kcy;": "\u043A",
    "Kfr;": "\u{1D50E}",
    "kfr;": "\u{1D528}",
    "kgreen;": "\u0138",
    "KHcy;": "\u0425",
    "khcy;": "\u0445",
    "KJcy;": "\u040C",
    "kjcy;": "\u045C",
    "Kopf;": "\u{1D542}",
    "kopf;": "\u{1D55C}",
    "Kscr;": "\u{1D4A6}",
    "kscr;": "\u{1D4C0}",
    "lAarr;": "\u21DA",
    "Lacute;": "\u0139",
    "lacute;": "\u013A",
    "laemptyv;": "\u29B4",
    "lagran;": "\u2112",
    "Lambda;": "\u039B",
    "lambda;": "\u03BB",
    "Lang;": "\u27EA",
    "lang;": "\u27E8",
    "langd;": "\u2991",
    "langle;": "\u27E8",
    "lap;": "\u2A85",
    "Laplacetrf;": "\u2112",
    "laquo;": "\xAB",
    laquo: "\xAB",
    "Larr;": "\u219E",
    "lArr;": "\u21D0",
    "larr;": "\u2190",
    "larrb;": "\u21E4",
    "larrbfs;": "\u291F",
    "larrfs;": "\u291D",
    "larrhk;": "\u21A9",
    "larrlp;": "\u21AB",
    "larrpl;": "\u2939",
    "larrsim;": "\u2973",
    "larrtl;": "\u21A2",
    "lat;": "\u2AAB",
    "lAtail;": "\u291B",
    "latail;": "\u2919",
    "late;": "\u2AAD",
    "lates;": "\u2AAD\uFE00",
    "lBarr;": "\u290E",
    "lbarr;": "\u290C",
    "lbbrk;": "\u2772",
    "lbrace;": "{",
    "lbrack;": "[",
    "lbrke;": "\u298B",
    "lbrksld;": "\u298F",
    "lbrkslu;": "\u298D",
    "Lcaron;": "\u013D",
    "lcaron;": "\u013E",
    "Lcedil;": "\u013B",
    "lcedil;": "\u013C",
    "lceil;": "\u2308",
    "lcub;": "{",
    "Lcy;": "\u041B",
    "lcy;": "\u043B",
    "ldca;": "\u2936",
    "ldquo;": "\u201C",
    "ldquor;": "\u201E",
    "ldrdhar;": "\u2967",
    "ldrushar;": "\u294B",
    "ldsh;": "\u21B2",
    "lE;": "\u2266",
    "le;": "\u2264",
    "LeftAngleBracket;": "\u27E8",
    "LeftArrow;": "\u2190",
    "Leftarrow;": "\u21D0",
    "leftarrow;": "\u2190",
    "LeftArrowBar;": "\u21E4",
    "LeftArrowRightArrow;": "\u21C6",
    "leftarrowtail;": "\u21A2",
    "LeftCeiling;": "\u2308",
    "LeftDoubleBracket;": "\u27E6",
    "LeftDownTeeVector;": "\u2961",
    "LeftDownVector;": "\u21C3",
    "LeftDownVectorBar;": "\u2959",
    "LeftFloor;": "\u230A",
    "leftharpoondown;": "\u21BD",
    "leftharpoonup;": "\u21BC",
    "leftleftarrows;": "\u21C7",
    "LeftRightArrow;": "\u2194",
    "Leftrightarrow;": "\u21D4",
    "leftrightarrow;": "\u2194",
    "leftrightarrows;": "\u21C6",
    "leftrightharpoons;": "\u21CB",
    "leftrightsquigarrow;": "\u21AD",
    "LeftRightVector;": "\u294E",
    "LeftTee;": "\u22A3",
    "LeftTeeArrow;": "\u21A4",
    "LeftTeeVector;": "\u295A",
    "leftthreetimes;": "\u22CB",
    "LeftTriangle;": "\u22B2",
    "LeftTriangleBar;": "\u29CF",
    "LeftTriangleEqual;": "\u22B4",
    "LeftUpDownVector;": "\u2951",
    "LeftUpTeeVector;": "\u2960",
    "LeftUpVector;": "\u21BF",
    "LeftUpVectorBar;": "\u2958",
    "LeftVector;": "\u21BC",
    "LeftVectorBar;": "\u2952",
    "lEg;": "\u2A8B",
    "leg;": "\u22DA",
    "leq;": "\u2264",
    "leqq;": "\u2266",
    "leqslant;": "\u2A7D",
    "les;": "\u2A7D",
    "lescc;": "\u2AA8",
    "lesdot;": "\u2A7F",
    "lesdoto;": "\u2A81",
    "lesdotor;": "\u2A83",
    "lesg;": "\u22DA\uFE00",
    "lesges;": "\u2A93",
    "lessapprox;": "\u2A85",
    "lessdot;": "\u22D6",
    "lesseqgtr;": "\u22DA",
    "lesseqqgtr;": "\u2A8B",
    "LessEqualGreater;": "\u22DA",
    "LessFullEqual;": "\u2266",
    "LessGreater;": "\u2276",
    "lessgtr;": "\u2276",
    "LessLess;": "\u2AA1",
    "lesssim;": "\u2272",
    "LessSlantEqual;": "\u2A7D",
    "LessTilde;": "\u2272",
    "lfisht;": "\u297C",
    "lfloor;": "\u230A",
    "Lfr;": "\u{1D50F}",
    "lfr;": "\u{1D529}",
    "lg;": "\u2276",
    "lgE;": "\u2A91",
    "lHar;": "\u2962",
    "lhard;": "\u21BD",
    "lharu;": "\u21BC",
    "lharul;": "\u296A",
    "lhblk;": "\u2584",
    "LJcy;": "\u0409",
    "ljcy;": "\u0459",
    "Ll;": "\u22D8",
    "ll;": "\u226A",
    "llarr;": "\u21C7",
    "llcorner;": "\u231E",
    "Lleftarrow;": "\u21DA",
    "llhard;": "\u296B",
    "lltri;": "\u25FA",
    "Lmidot;": "\u013F",
    "lmidot;": "\u0140",
    "lmoust;": "\u23B0",
    "lmoustache;": "\u23B0",
    "lnap;": "\u2A89",
    "lnapprox;": "\u2A89",
    "lnE;": "\u2268",
    "lne;": "\u2A87",
    "lneq;": "\u2A87",
    "lneqq;": "\u2268",
    "lnsim;": "\u22E6",
    "loang;": "\u27EC",
    "loarr;": "\u21FD",
    "lobrk;": "\u27E6",
    "LongLeftArrow;": "\u27F5",
    "Longleftarrow;": "\u27F8",
    "longleftarrow;": "\u27F5",
    "LongLeftRightArrow;": "\u27F7",
    "Longleftrightarrow;": "\u27FA",
    "longleftrightarrow;": "\u27F7",
    "longmapsto;": "\u27FC",
    "LongRightArrow;": "\u27F6",
    "Longrightarrow;": "\u27F9",
    "longrightarrow;": "\u27F6",
    "looparrowleft;": "\u21AB",
    "looparrowright;": "\u21AC",
    "lopar;": "\u2985",
    "Lopf;": "\u{1D543}",
    "lopf;": "\u{1D55D}",
    "loplus;": "\u2A2D",
    "lotimes;": "\u2A34",
    "lowast;": "\u2217",
    "lowbar;": "_",
    "LowerLeftArrow;": "\u2199",
    "LowerRightArrow;": "\u2198",
    "loz;": "\u25CA",
    "lozenge;": "\u25CA",
    "lozf;": "\u29EB",
    "lpar;": "(",
    "lparlt;": "\u2993",
    "lrarr;": "\u21C6",
    "lrcorner;": "\u231F",
    "lrhar;": "\u21CB",
    "lrhard;": "\u296D",
    "lrm;": "\u200E",
    "lrtri;": "\u22BF",
    "lsaquo;": "\u2039",
    "Lscr;": "\u2112",
    "lscr;": "\u{1D4C1}",
    "Lsh;": "\u21B0",
    "lsh;": "\u21B0",
    "lsim;": "\u2272",
    "lsime;": "\u2A8D",
    "lsimg;": "\u2A8F",
    "lsqb;": "[",
    "lsquo;": "\u2018",
    "lsquor;": "\u201A",
    "Lstrok;": "\u0141",
    "lstrok;": "\u0142",
    "LT;": "<",
    LT: "<",
    "Lt;": "\u226A",
    "lt;": "<",
    lt: "<",
    "ltcc;": "\u2AA6",
    "ltcir;": "\u2A79",
    "ltdot;": "\u22D6",
    "lthree;": "\u22CB",
    "ltimes;": "\u22C9",
    "ltlarr;": "\u2976",
    "ltquest;": "\u2A7B",
    "ltri;": "\u25C3",
    "ltrie;": "\u22B4",
    "ltrif;": "\u25C2",
    "ltrPar;": "\u2996",
    "lurdshar;": "\u294A",
    "luruhar;": "\u2966",
    "lvertneqq;": "\u2268\uFE00",
    "lvnE;": "\u2268\uFE00",
    "macr;": "\xAF",
    macr: "\xAF",
    "male;": "\u2642",
    "malt;": "\u2720",
    "maltese;": "\u2720",
    "Map;": "\u2905",
    "map;": "\u21A6",
    "mapsto;": "\u21A6",
    "mapstodown;": "\u21A7",
    "mapstoleft;": "\u21A4",
    "mapstoup;": "\u21A5",
    "marker;": "\u25AE",
    "mcomma;": "\u2A29",
    "Mcy;": "\u041C",
    "mcy;": "\u043C",
    "mdash;": "\u2014",
    "mDDot;": "\u223A",
    "measuredangle;": "\u2221",
    "MediumSpace;": "\u205F",
    "Mellintrf;": "\u2133",
    "Mfr;": "\u{1D510}",
    "mfr;": "\u{1D52A}",
    "mho;": "\u2127",
    "micro;": "\xB5",
    micro: "\xB5",
    "mid;": "\u2223",
    "midast;": "*",
    "midcir;": "\u2AF0",
    "middot;": "\xB7",
    middot: "\xB7",
    "minus;": "\u2212",
    "minusb;": "\u229F",
    "minusd;": "\u2238",
    "minusdu;": "\u2A2A",
    "MinusPlus;": "\u2213",
    "mlcp;": "\u2ADB",
    "mldr;": "\u2026",
    "mnplus;": "\u2213",
    "models;": "\u22A7",
    "Mopf;": "\u{1D544}",
    "mopf;": "\u{1D55E}",
    "mp;": "\u2213",
    "Mscr;": "\u2133",
    "mscr;": "\u{1D4C2}",
    "mstpos;": "\u223E",
    "Mu;": "\u039C",
    "mu;": "\u03BC",
    "multimap;": "\u22B8",
    "mumap;": "\u22B8",
    "nabla;": "\u2207",
    "Nacute;": "\u0143",
    "nacute;": "\u0144",
    "nang;": "\u2220\u20D2",
    "nap;": "\u2249",
    "napE;": "\u2A70\u0338",
    "napid;": "\u224B\u0338",
    "napos;": "\u0149",
    "napprox;": "\u2249",
    "natur;": "\u266E",
    "natural;": "\u266E",
    "naturals;": "\u2115",
    "nbsp;": "\xA0",
    nbsp: "\xA0",
    "nbump;": "\u224E\u0338",
    "nbumpe;": "\u224F\u0338",
    "ncap;": "\u2A43",
    "Ncaron;": "\u0147",
    "ncaron;": "\u0148",
    "Ncedil;": "\u0145",
    "ncedil;": "\u0146",
    "ncong;": "\u2247",
    "ncongdot;": "\u2A6D\u0338",
    "ncup;": "\u2A42",
    "Ncy;": "\u041D",
    "ncy;": "\u043D",
    "ndash;": "\u2013",
    "ne;": "\u2260",
    "nearhk;": "\u2924",
    "neArr;": "\u21D7",
    "nearr;": "\u2197",
    "nearrow;": "\u2197",
    "nedot;": "\u2250\u0338",
    "NegativeMediumSpace;": "\u200B",
    "NegativeThickSpace;": "\u200B",
    "NegativeThinSpace;": "\u200B",
    "NegativeVeryThinSpace;": "\u200B",
    "nequiv;": "\u2262",
    "nesear;": "\u2928",
    "nesim;": "\u2242\u0338",
    "NestedGreaterGreater;": "\u226B",
    "NestedLessLess;": "\u226A",
    "NewLine;": "\n",
    "nexist;": "\u2204",
    "nexists;": "\u2204",
    "Nfr;": "\u{1D511}",
    "nfr;": "\u{1D52B}",
    "ngE;": "\u2267\u0338",
    "nge;": "\u2271",
    "ngeq;": "\u2271",
    "ngeqq;": "\u2267\u0338",
    "ngeqslant;": "\u2A7E\u0338",
    "nges;": "\u2A7E\u0338",
    "nGg;": "\u22D9\u0338",
    "ngsim;": "\u2275",
    "nGt;": "\u226B\u20D2",
    "ngt;": "\u226F",
    "ngtr;": "\u226F",
    "nGtv;": "\u226B\u0338",
    "nhArr;": "\u21CE",
    "nharr;": "\u21AE",
    "nhpar;": "\u2AF2",
    "ni;": "\u220B",
    "nis;": "\u22FC",
    "nisd;": "\u22FA",
    "niv;": "\u220B",
    "NJcy;": "\u040A",
    "njcy;": "\u045A",
    "nlArr;": "\u21CD",
    "nlarr;": "\u219A",
    "nldr;": "\u2025",
    "nlE;": "\u2266\u0338",
    "nle;": "\u2270",
    "nLeftarrow;": "\u21CD",
    "nleftarrow;": "\u219A",
    "nLeftrightarrow;": "\u21CE",
    "nleftrightarrow;": "\u21AE",
    "nleq;": "\u2270",
    "nleqq;": "\u2266\u0338",
    "nleqslant;": "\u2A7D\u0338",
    "nles;": "\u2A7D\u0338",
    "nless;": "\u226E",
    "nLl;": "\u22D8\u0338",
    "nlsim;": "\u2274",
    "nLt;": "\u226A\u20D2",
    "nlt;": "\u226E",
    "nltri;": "\u22EA",
    "nltrie;": "\u22EC",
    "nLtv;": "\u226A\u0338",
    "nmid;": "\u2224",
    "NoBreak;": "\u2060",
    "NonBreakingSpace;": "\xA0",
    "Nopf;": "\u2115",
    "nopf;": "\u{1D55F}",
    "Not;": "\u2AEC",
    "not;": "\xAC",
    not: "\xAC",
    "NotCongruent;": "\u2262",
    "NotCupCap;": "\u226D",
    "NotDoubleVerticalBar;": "\u2226",
    "NotElement;": "\u2209",
    "NotEqual;": "\u2260",
    "NotEqualTilde;": "\u2242\u0338",
    "NotExists;": "\u2204",
    "NotGreater;": "\u226F",
    "NotGreaterEqual;": "\u2271",
    "NotGreaterFullEqual;": "\u2267\u0338",
    "NotGreaterGreater;": "\u226B\u0338",
    "NotGreaterLess;": "\u2279",
    "NotGreaterSlantEqual;": "\u2A7E\u0338",
    "NotGreaterTilde;": "\u2275",
    "NotHumpDownHump;": "\u224E\u0338",
    "NotHumpEqual;": "\u224F\u0338",
    "notin;": "\u2209",
    "notindot;": "\u22F5\u0338",
    "notinE;": "\u22F9\u0338",
    "notinva;": "\u2209",
    "notinvb;": "\u22F7",
    "notinvc;": "\u22F6",
    "NotLeftTriangle;": "\u22EA",
    "NotLeftTriangleBar;": "\u29CF\u0338",
    "NotLeftTriangleEqual;": "\u22EC",
    "NotLess;": "\u226E",
    "NotLessEqual;": "\u2270",
    "NotLessGreater;": "\u2278",
    "NotLessLess;": "\u226A\u0338",
    "NotLessSlantEqual;": "\u2A7D\u0338",
    "NotLessTilde;": "\u2274",
    "NotNestedGreaterGreater;": "\u2AA2\u0338",
    "NotNestedLessLess;": "\u2AA1\u0338",
    "notni;": "\u220C",
    "notniva;": "\u220C",
    "notnivb;": "\u22FE",
    "notnivc;": "\u22FD",
    "NotPrecedes;": "\u2280",
    "NotPrecedesEqual;": "\u2AAF\u0338",
    "NotPrecedesSlantEqual;": "\u22E0",
    "NotReverseElement;": "\u220C",
    "NotRightTriangle;": "\u22EB",
    "NotRightTriangleBar;": "\u29D0\u0338",
    "NotRightTriangleEqual;": "\u22ED",
    "NotSquareSubset;": "\u228F\u0338",
    "NotSquareSubsetEqual;": "\u22E2",
    "NotSquareSuperset;": "\u2290\u0338",
    "NotSquareSupersetEqual;": "\u22E3",
    "NotSubset;": "\u2282\u20D2",
    "NotSubsetEqual;": "\u2288",
    "NotSucceeds;": "\u2281",
    "NotSucceedsEqual;": "\u2AB0\u0338",
    "NotSucceedsSlantEqual;": "\u22E1",
    "NotSucceedsTilde;": "\u227F\u0338",
    "NotSuperset;": "\u2283\u20D2",
    "NotSupersetEqual;": "\u2289",
    "NotTilde;": "\u2241",
    "NotTildeEqual;": "\u2244",
    "NotTildeFullEqual;": "\u2247",
    "NotTildeTilde;": "\u2249",
    "NotVerticalBar;": "\u2224",
    "npar;": "\u2226",
    "nparallel;": "\u2226",
    "nparsl;": "\u2AFD\u20E5",
    "npart;": "\u2202\u0338",
    "npolint;": "\u2A14",
    "npr;": "\u2280",
    "nprcue;": "\u22E0",
    "npre;": "\u2AAF\u0338",
    "nprec;": "\u2280",
    "npreceq;": "\u2AAF\u0338",
    "nrArr;": "\u21CF",
    "nrarr;": "\u219B",
    "nrarrc;": "\u2933\u0338",
    "nrarrw;": "\u219D\u0338",
    "nRightarrow;": "\u21CF",
    "nrightarrow;": "\u219B",
    "nrtri;": "\u22EB",
    "nrtrie;": "\u22ED",
    "nsc;": "\u2281",
    "nsccue;": "\u22E1",
    "nsce;": "\u2AB0\u0338",
    "Nscr;": "\u{1D4A9}",
    "nscr;": "\u{1D4C3}",
    "nshortmid;": "\u2224",
    "nshortparallel;": "\u2226",
    "nsim;": "\u2241",
    "nsime;": "\u2244",
    "nsimeq;": "\u2244",
    "nsmid;": "\u2224",
    "nspar;": "\u2226",
    "nsqsube;": "\u22E2",
    "nsqsupe;": "\u22E3",
    "nsub;": "\u2284",
    "nsubE;": "\u2AC5\u0338",
    "nsube;": "\u2288",
    "nsubset;": "\u2282\u20D2",
    "nsubseteq;": "\u2288",
    "nsubseteqq;": "\u2AC5\u0338",
    "nsucc;": "\u2281",
    "nsucceq;": "\u2AB0\u0338",
    "nsup;": "\u2285",
    "nsupE;": "\u2AC6\u0338",
    "nsupe;": "\u2289",
    "nsupset;": "\u2283\u20D2",
    "nsupseteq;": "\u2289",
    "nsupseteqq;": "\u2AC6\u0338",
    "ntgl;": "\u2279",
    "Ntilde;": "\xD1",
    Ntilde: "\xD1",
    "ntilde;": "\xF1",
    ntilde: "\xF1",
    "ntlg;": "\u2278",
    "ntriangleleft;": "\u22EA",
    "ntrianglelefteq;": "\u22EC",
    "ntriangleright;": "\u22EB",
    "ntrianglerighteq;": "\u22ED",
    "Nu;": "\u039D",
    "nu;": "\u03BD",
    "num;": "#",
    "numero;": "\u2116",
    "numsp;": "\u2007",
    "nvap;": "\u224D\u20D2",
    "nVDash;": "\u22AF",
    "nVdash;": "\u22AE",
    "nvDash;": "\u22AD",
    "nvdash;": "\u22AC",
    "nvge;": "\u2265\u20D2",
    "nvgt;": ">\u20D2",
    "nvHarr;": "\u2904",
    "nvinfin;": "\u29DE",
    "nvlArr;": "\u2902",
    "nvle;": "\u2264\u20D2",
    "nvlt;": "<\u20D2",
    "nvltrie;": "\u22B4\u20D2",
    "nvrArr;": "\u2903",
    "nvrtrie;": "\u22B5\u20D2",
    "nvsim;": "\u223C\u20D2",
    "nwarhk;": "\u2923",
    "nwArr;": "\u21D6",
    "nwarr;": "\u2196",
    "nwarrow;": "\u2196",
    "nwnear;": "\u2927",
    "Oacute;": "\xD3",
    Oacute: "\xD3",
    "oacute;": "\xF3",
    oacute: "\xF3",
    "oast;": "\u229B",
    "ocir;": "\u229A",
    "Ocirc;": "\xD4",
    Ocirc: "\xD4",
    "ocirc;": "\xF4",
    ocirc: "\xF4",
    "Ocy;": "\u041E",
    "ocy;": "\u043E",
    "odash;": "\u229D",
    "Odblac;": "\u0150",
    "odblac;": "\u0151",
    "odiv;": "\u2A38",
    "odot;": "\u2299",
    "odsold;": "\u29BC",
    "OElig;": "\u0152",
    "oelig;": "\u0153",
    "ofcir;": "\u29BF",
    "Ofr;": "\u{1D512}",
    "ofr;": "\u{1D52C}",
    "ogon;": "\u02DB",
    "Ograve;": "\xD2",
    Ograve: "\xD2",
    "ograve;": "\xF2",
    ograve: "\xF2",
    "ogt;": "\u29C1",
    "ohbar;": "\u29B5",
    "ohm;": "\u03A9",
    "oint;": "\u222E",
    "olarr;": "\u21BA",
    "olcir;": "\u29BE",
    "olcross;": "\u29BB",
    "oline;": "\u203E",
    "olt;": "\u29C0",
    "Omacr;": "\u014C",
    "omacr;": "\u014D",
    "Omega;": "\u03A9",
    "omega;": "\u03C9",
    "Omicron;": "\u039F",
    "omicron;": "\u03BF",
    "omid;": "\u29B6",
    "ominus;": "\u2296",
    "Oopf;": "\u{1D546}",
    "oopf;": "\u{1D560}",
    "opar;": "\u29B7",
    "OpenCurlyDoubleQuote;": "\u201C",
    "OpenCurlyQuote;": "\u2018",
    "operp;": "\u29B9",
    "oplus;": "\u2295",
    "Or;": "\u2A54",
    "or;": "\u2228",
    "orarr;": "\u21BB",
    "ord;": "\u2A5D",
    "order;": "\u2134",
    "orderof;": "\u2134",
    "ordf;": "\xAA",
    ordf: "\xAA",
    "ordm;": "\xBA",
    ordm: "\xBA",
    "origof;": "\u22B6",
    "oror;": "\u2A56",
    "orslope;": "\u2A57",
    "orv;": "\u2A5B",
    "oS;": "\u24C8",
    "Oscr;": "\u{1D4AA}",
    "oscr;": "\u2134",
    "Oslash;": "\xD8",
    Oslash: "\xD8",
    "oslash;": "\xF8",
    oslash: "\xF8",
    "osol;": "\u2298",
    "Otilde;": "\xD5",
    Otilde: "\xD5",
    "otilde;": "\xF5",
    otilde: "\xF5",
    "Otimes;": "\u2A37",
    "otimes;": "\u2297",
    "otimesas;": "\u2A36",
    "Ouml;": "\xD6",
    Ouml: "\xD6",
    "ouml;": "\xF6",
    ouml: "\xF6",
    "ovbar;": "\u233D",
    "OverBar;": "\u203E",
    "OverBrace;": "\u23DE",
    "OverBracket;": "\u23B4",
    "OverParenthesis;": "\u23DC",
    "par;": "\u2225",
    "para;": "\xB6",
    para: "\xB6",
    "parallel;": "\u2225",
    "parsim;": "\u2AF3",
    "parsl;": "\u2AFD",
    "part;": "\u2202",
    "PartialD;": "\u2202",
    "Pcy;": "\u041F",
    "pcy;": "\u043F",
    "percnt;": "%",
    "period;": ".",
    "permil;": "\u2030",
    "perp;": "\u22A5",
    "pertenk;": "\u2031",
    "Pfr;": "\u{1D513}",
    "pfr;": "\u{1D52D}",
    "Phi;": "\u03A6",
    "phi;": "\u03C6",
    "phiv;": "\u03D5",
    "phmmat;": "\u2133",
    "phone;": "\u260E",
    "Pi;": "\u03A0",
    "pi;": "\u03C0",
    "pitchfork;": "\u22D4",
    "piv;": "\u03D6",
    "planck;": "\u210F",
    "planckh;": "\u210E",
    "plankv;": "\u210F",
    "plus;": "+",
    "plusacir;": "\u2A23",
    "plusb;": "\u229E",
    "pluscir;": "\u2A22",
    "plusdo;": "\u2214",
    "plusdu;": "\u2A25",
    "pluse;": "\u2A72",
    "PlusMinus;": "\xB1",
    "plusmn;": "\xB1",
    plusmn: "\xB1",
    "plussim;": "\u2A26",
    "plustwo;": "\u2A27",
    "pm;": "\xB1",
    "Poincareplane;": "\u210C",
    "pointint;": "\u2A15",
    "Popf;": "\u2119",
    "popf;": "\u{1D561}",
    "pound;": "\xA3",
    pound: "\xA3",
    "Pr;": "\u2ABB",
    "pr;": "\u227A",
    "prap;": "\u2AB7",
    "prcue;": "\u227C",
    "prE;": "\u2AB3",
    "pre;": "\u2AAF",
    "prec;": "\u227A",
    "precapprox;": "\u2AB7",
    "preccurlyeq;": "\u227C",
    "Precedes;": "\u227A",
    "PrecedesEqual;": "\u2AAF",
    "PrecedesSlantEqual;": "\u227C",
    "PrecedesTilde;": "\u227E",
    "preceq;": "\u2AAF",
    "precnapprox;": "\u2AB9",
    "precneqq;": "\u2AB5",
    "precnsim;": "\u22E8",
    "precsim;": "\u227E",
    "Prime;": "\u2033",
    "prime;": "\u2032",
    "primes;": "\u2119",
    "prnap;": "\u2AB9",
    "prnE;": "\u2AB5",
    "prnsim;": "\u22E8",
    "prod;": "\u220F",
    "Product;": "\u220F",
    "profalar;": "\u232E",
    "profline;": "\u2312",
    "profsurf;": "\u2313",
    "prop;": "\u221D",
    "Proportion;": "\u2237",
    "Proportional;": "\u221D",
    "propto;": "\u221D",
    "prsim;": "\u227E",
    "prurel;": "\u22B0",
    "Pscr;": "\u{1D4AB}",
    "pscr;": "\u{1D4C5}",
    "Psi;": "\u03A8",
    "psi;": "\u03C8",
    "puncsp;": "\u2008",
    "Qfr;": "\u{1D514}",
    "qfr;": "\u{1D52E}",
    "qint;": "\u2A0C",
    "Qopf;": "\u211A",
    "qopf;": "\u{1D562}",
    "qprime;": "\u2057",
    "Qscr;": "\u{1D4AC}",
    "qscr;": "\u{1D4C6}",
    "quaternions;": "\u210D",
    "quatint;": "\u2A16",
    "quest;": "?",
    "questeq;": "\u225F",
    "QUOT;": '"',
    QUOT: '"',
    "quot;": '"',
    quot: '"',
    "rAarr;": "\u21DB",
    "race;": "\u223D\u0331",
    "Racute;": "\u0154",
    "racute;": "\u0155",
    "radic;": "\u221A",
    "raemptyv;": "\u29B3",
    "Rang;": "\u27EB",
    "rang;": "\u27E9",
    "rangd;": "\u2992",
    "range;": "\u29A5",
    "rangle;": "\u27E9",
    "raquo;": "\xBB",
    raquo: "\xBB",
    "Rarr;": "\u21A0",
    "rArr;": "\u21D2",
    "rarr;": "\u2192",
    "rarrap;": "\u2975",
    "rarrb;": "\u21E5",
    "rarrbfs;": "\u2920",
    "rarrc;": "\u2933",
    "rarrfs;": "\u291E",
    "rarrhk;": "\u21AA",
    "rarrlp;": "\u21AC",
    "rarrpl;": "\u2945",
    "rarrsim;": "\u2974",
    "Rarrtl;": "\u2916",
    "rarrtl;": "\u21A3",
    "rarrw;": "\u219D",
    "rAtail;": "\u291C",
    "ratail;": "\u291A",
    "ratio;": "\u2236",
    "rationals;": "\u211A",
    "RBarr;": "\u2910",
    "rBarr;": "\u290F",
    "rbarr;": "\u290D",
    "rbbrk;": "\u2773",
    "rbrace;": "}",
    "rbrack;": "]",
    "rbrke;": "\u298C",
    "rbrksld;": "\u298E",
    "rbrkslu;": "\u2990",
    "Rcaron;": "\u0158",
    "rcaron;": "\u0159",
    "Rcedil;": "\u0156",
    "rcedil;": "\u0157",
    "rceil;": "\u2309",
    "rcub;": "}",
    "Rcy;": "\u0420",
    "rcy;": "\u0440",
    "rdca;": "\u2937",
    "rdldhar;": "\u2969",
    "rdquo;": "\u201D",
    "rdquor;": "\u201D",
    "rdsh;": "\u21B3",
    "Re;": "\u211C",
    "real;": "\u211C",
    "realine;": "\u211B",
    "realpart;": "\u211C",
    "reals;": "\u211D",
    "rect;": "\u25AD",
    "REG;": "\xAE",
    REG: "\xAE",
    "reg;": "\xAE",
    reg: "\xAE",
    "ReverseElement;": "\u220B",
    "ReverseEquilibrium;": "\u21CB",
    "ReverseUpEquilibrium;": "\u296F",
    "rfisht;": "\u297D",
    "rfloor;": "\u230B",
    "Rfr;": "\u211C",
    "rfr;": "\u{1D52F}",
    "rHar;": "\u2964",
    "rhard;": "\u21C1",
    "rharu;": "\u21C0",
    "rharul;": "\u296C",
    "Rho;": "\u03A1",
    "rho;": "\u03C1",
    "rhov;": "\u03F1",
    "RightAngleBracket;": "\u27E9",
    "RightArrow;": "\u2192",
    "Rightarrow;": "\u21D2",
    "rightarrow;": "\u2192",
    "RightArrowBar;": "\u21E5",
    "RightArrowLeftArrow;": "\u21C4",
    "rightarrowtail;": "\u21A3",
    "RightCeiling;": "\u2309",
    "RightDoubleBracket;": "\u27E7",
    "RightDownTeeVector;": "\u295D",
    "RightDownVector;": "\u21C2",
    "RightDownVectorBar;": "\u2955",
    "RightFloor;": "\u230B",
    "rightharpoondown;": "\u21C1",
    "rightharpoonup;": "\u21C0",
    "rightleftarrows;": "\u21C4",
    "rightleftharpoons;": "\u21CC",
    "rightrightarrows;": "\u21C9",
    "rightsquigarrow;": "\u219D",
    "RightTee;": "\u22A2",
    "RightTeeArrow;": "\u21A6",
    "RightTeeVector;": "\u295B",
    "rightthreetimes;": "\u22CC",
    "RightTriangle;": "\u22B3",
    "RightTriangleBar;": "\u29D0",
    "RightTriangleEqual;": "\u22B5",
    "RightUpDownVector;": "\u294F",
    "RightUpTeeVector;": "\u295C",
    "RightUpVector;": "\u21BE",
    "RightUpVectorBar;": "\u2954",
    "RightVector;": "\u21C0",
    "RightVectorBar;": "\u2953",
    "ring;": "\u02DA",
    "risingdotseq;": "\u2253",
    "rlarr;": "\u21C4",
    "rlhar;": "\u21CC",
    "rlm;": "\u200F",
    "rmoust;": "\u23B1",
    "rmoustache;": "\u23B1",
    "rnmid;": "\u2AEE",
    "roang;": "\u27ED",
    "roarr;": "\u21FE",
    "robrk;": "\u27E7",
    "ropar;": "\u2986",
    "Ropf;": "\u211D",
    "ropf;": "\u{1D563}",
    "roplus;": "\u2A2E",
    "rotimes;": "\u2A35",
    "RoundImplies;": "\u2970",
    "rpar;": ")",
    "rpargt;": "\u2994",
    "rppolint;": "\u2A12",
    "rrarr;": "\u21C9",
    "Rrightarrow;": "\u21DB",
    "rsaquo;": "\u203A",
    "Rscr;": "\u211B",
    "rscr;": "\u{1D4C7}",
    "Rsh;": "\u21B1",
    "rsh;": "\u21B1",
    "rsqb;": "]",
    "rsquo;": "\u2019",
    "rsquor;": "\u2019",
    "rthree;": "\u22CC",
    "rtimes;": "\u22CA",
    "rtri;": "\u25B9",
    "rtrie;": "\u22B5",
    "rtrif;": "\u25B8",
    "rtriltri;": "\u29CE",
    "RuleDelayed;": "\u29F4",
    "ruluhar;": "\u2968",
    "rx;": "\u211E",
    "Sacute;": "\u015A",
    "sacute;": "\u015B",
    "sbquo;": "\u201A",
    "Sc;": "\u2ABC",
    "sc;": "\u227B",
    "scap;": "\u2AB8",
    "Scaron;": "\u0160",
    "scaron;": "\u0161",
    "sccue;": "\u227D",
    "scE;": "\u2AB4",
    "sce;": "\u2AB0",
    "Scedil;": "\u015E",
    "scedil;": "\u015F",
    "Scirc;": "\u015C",
    "scirc;": "\u015D",
    "scnap;": "\u2ABA",
    "scnE;": "\u2AB6",
    "scnsim;": "\u22E9",
    "scpolint;": "\u2A13",
    "scsim;": "\u227F",
    "Scy;": "\u0421",
    "scy;": "\u0441",
    "sdot;": "\u22C5",
    "sdotb;": "\u22A1",
    "sdote;": "\u2A66",
    "searhk;": "\u2925",
    "seArr;": "\u21D8",
    "searr;": "\u2198",
    "searrow;": "\u2198",
    "sect;": "\xA7",
    sect: "\xA7",
    "semi;": ";",
    "seswar;": "\u2929",
    "setminus;": "\u2216",
    "setmn;": "\u2216",
    "sext;": "\u2736",
    "Sfr;": "\u{1D516}",
    "sfr;": "\u{1D530}",
    "sfrown;": "\u2322",
    "sharp;": "\u266F",
    "SHCHcy;": "\u0429",
    "shchcy;": "\u0449",
    "SHcy;": "\u0428",
    "shcy;": "\u0448",
    "ShortDownArrow;": "\u2193",
    "ShortLeftArrow;": "\u2190",
    "shortmid;": "\u2223",
    "shortparallel;": "\u2225",
    "ShortRightArrow;": "\u2192",
    "ShortUpArrow;": "\u2191",
    "shy;": "\xAD",
    shy: "\xAD",
    "Sigma;": "\u03A3",
    "sigma;": "\u03C3",
    "sigmaf;": "\u03C2",
    "sigmav;": "\u03C2",
    "sim;": "\u223C",
    "simdot;": "\u2A6A",
    "sime;": "\u2243",
    "simeq;": "\u2243",
    "simg;": "\u2A9E",
    "simgE;": "\u2AA0",
    "siml;": "\u2A9D",
    "simlE;": "\u2A9F",
    "simne;": "\u2246",
    "simplus;": "\u2A24",
    "simrarr;": "\u2972",
    "slarr;": "\u2190",
    "SmallCircle;": "\u2218",
    "smallsetminus;": "\u2216",
    "smashp;": "\u2A33",
    "smeparsl;": "\u29E4",
    "smid;": "\u2223",
    "smile;": "\u2323",
    "smt;": "\u2AAA",
    "smte;": "\u2AAC",
    "smtes;": "\u2AAC\uFE00",
    "SOFTcy;": "\u042C",
    "softcy;": "\u044C",
    "sol;": "/",
    "solb;": "\u29C4",
    "solbar;": "\u233F",
    "Sopf;": "\u{1D54A}",
    "sopf;": "\u{1D564}",
    "spades;": "\u2660",
    "spadesuit;": "\u2660",
    "spar;": "\u2225",
    "sqcap;": "\u2293",
    "sqcaps;": "\u2293\uFE00",
    "sqcup;": "\u2294",
    "sqcups;": "\u2294\uFE00",
    "Sqrt;": "\u221A",
    "sqsub;": "\u228F",
    "sqsube;": "\u2291",
    "sqsubset;": "\u228F",
    "sqsubseteq;": "\u2291",
    "sqsup;": "\u2290",
    "sqsupe;": "\u2292",
    "sqsupset;": "\u2290",
    "sqsupseteq;": "\u2292",
    "squ;": "\u25A1",
    "Square;": "\u25A1",
    "square;": "\u25A1",
    "SquareIntersection;": "\u2293",
    "SquareSubset;": "\u228F",
    "SquareSubsetEqual;": "\u2291",
    "SquareSuperset;": "\u2290",
    "SquareSupersetEqual;": "\u2292",
    "SquareUnion;": "\u2294",
    "squarf;": "\u25AA",
    "squf;": "\u25AA",
    "srarr;": "\u2192",
    "Sscr;": "\u{1D4AE}",
    "sscr;": "\u{1D4C8}",
    "ssetmn;": "\u2216",
    "ssmile;": "\u2323",
    "sstarf;": "\u22C6",
    "Star;": "\u22C6",
    "star;": "\u2606",
    "starf;": "\u2605",
    "straightepsilon;": "\u03F5",
    "straightphi;": "\u03D5",
    "strns;": "\xAF",
    "Sub;": "\u22D0",
    "sub;": "\u2282",
    "subdot;": "\u2ABD",
    "subE;": "\u2AC5",
    "sube;": "\u2286",
    "subedot;": "\u2AC3",
    "submult;": "\u2AC1",
    "subnE;": "\u2ACB",
    "subne;": "\u228A",
    "subplus;": "\u2ABF",
    "subrarr;": "\u2979",
    "Subset;": "\u22D0",
    "subset;": "\u2282",
    "subseteq;": "\u2286",
    "subseteqq;": "\u2AC5",
    "SubsetEqual;": "\u2286",
    "subsetneq;": "\u228A",
    "subsetneqq;": "\u2ACB",
    "subsim;": "\u2AC7",
    "subsub;": "\u2AD5",
    "subsup;": "\u2AD3",
    "succ;": "\u227B",
    "succapprox;": "\u2AB8",
    "succcurlyeq;": "\u227D",
    "Succeeds;": "\u227B",
    "SucceedsEqual;": "\u2AB0",
    "SucceedsSlantEqual;": "\u227D",
    "SucceedsTilde;": "\u227F",
    "succeq;": "\u2AB0",
    "succnapprox;": "\u2ABA",
    "succneqq;": "\u2AB6",
    "succnsim;": "\u22E9",
    "succsim;": "\u227F",
    "SuchThat;": "\u220B",
    "Sum;": "\u2211",
    "sum;": "\u2211",
    "sung;": "\u266A",
    "Sup;": "\u22D1",
    "sup;": "\u2283",
    "sup1;": "\xB9",
    sup1: "\xB9",
    "sup2;": "\xB2",
    sup2: "\xB2",
    "sup3;": "\xB3",
    sup3: "\xB3",
    "supdot;": "\u2ABE",
    "supdsub;": "\u2AD8",
    "supE;": "\u2AC6",
    "supe;": "\u2287",
    "supedot;": "\u2AC4",
    "Superset;": "\u2283",
    "SupersetEqual;": "\u2287",
    "suphsol;": "\u27C9",
    "suphsub;": "\u2AD7",
    "suplarr;": "\u297B",
    "supmult;": "\u2AC2",
    "supnE;": "\u2ACC",
    "supne;": "\u228B",
    "supplus;": "\u2AC0",
    "Supset;": "\u22D1",
    "supset;": "\u2283",
    "supseteq;": "\u2287",
    "supseteqq;": "\u2AC6",
    "supsetneq;": "\u228B",
    "supsetneqq;": "\u2ACC",
    "supsim;": "\u2AC8",
    "supsub;": "\u2AD4",
    "supsup;": "\u2AD6",
    "swarhk;": "\u2926",
    "swArr;": "\u21D9",
    "swarr;": "\u2199",
    "swarrow;": "\u2199",
    "swnwar;": "\u292A",
    "szlig;": "\xDF",
    szlig: "\xDF",
    "Tab;": "	",
    "target;": "\u2316",
    "Tau;": "\u03A4",
    "tau;": "\u03C4",
    "tbrk;": "\u23B4",
    "Tcaron;": "\u0164",
    "tcaron;": "\u0165",
    "Tcedil;": "\u0162",
    "tcedil;": "\u0163",
    "Tcy;": "\u0422",
    "tcy;": "\u0442",
    "tdot;": "\u20DB",
    "telrec;": "\u2315",
    "Tfr;": "\u{1D517}",
    "tfr;": "\u{1D531}",
    "there4;": "\u2234",
    "Therefore;": "\u2234",
    "therefore;": "\u2234",
    "Theta;": "\u0398",
    "theta;": "\u03B8",
    "thetasym;": "\u03D1",
    "thetav;": "\u03D1",
    "thickapprox;": "\u2248",
    "thicksim;": "\u223C",
    "ThickSpace;": "\u205F\u200A",
    "thinsp;": "\u2009",
    "ThinSpace;": "\u2009",
    "thkap;": "\u2248",
    "thksim;": "\u223C",
    "THORN;": "\xDE",
    THORN: "\xDE",
    "thorn;": "\xFE",
    thorn: "\xFE",
    "Tilde;": "\u223C",
    "tilde;": "\u02DC",
    "TildeEqual;": "\u2243",
    "TildeFullEqual;": "\u2245",
    "TildeTilde;": "\u2248",
    "times;": "\xD7",
    times: "\xD7",
    "timesb;": "\u22A0",
    "timesbar;": "\u2A31",
    "timesd;": "\u2A30",
    "tint;": "\u222D",
    "toea;": "\u2928",
    "top;": "\u22A4",
    "topbot;": "\u2336",
    "topcir;": "\u2AF1",
    "Topf;": "\u{1D54B}",
    "topf;": "\u{1D565}",
    "topfork;": "\u2ADA",
    "tosa;": "\u2929",
    "tprime;": "\u2034",
    "TRADE;": "\u2122",
    "trade;": "\u2122",
    "triangle;": "\u25B5",
    "triangledown;": "\u25BF",
    "triangleleft;": "\u25C3",
    "trianglelefteq;": "\u22B4",
    "triangleq;": "\u225C",
    "triangleright;": "\u25B9",
    "trianglerighteq;": "\u22B5",
    "tridot;": "\u25EC",
    "trie;": "\u225C",
    "triminus;": "\u2A3A",
    "TripleDot;": "\u20DB",
    "triplus;": "\u2A39",
    "trisb;": "\u29CD",
    "tritime;": "\u2A3B",
    "trpezium;": "\u23E2",
    "Tscr;": "\u{1D4AF}",
    "tscr;": "\u{1D4C9}",
    "TScy;": "\u0426",
    "tscy;": "\u0446",
    "TSHcy;": "\u040B",
    "tshcy;": "\u045B",
    "Tstrok;": "\u0166",
    "tstrok;": "\u0167",
    "twixt;": "\u226C",
    "twoheadleftarrow;": "\u219E",
    "twoheadrightarrow;": "\u21A0",
    "Uacute;": "\xDA",
    Uacute: "\xDA",
    "uacute;": "\xFA",
    uacute: "\xFA",
    "Uarr;": "\u219F",
    "uArr;": "\u21D1",
    "uarr;": "\u2191",
    "Uarrocir;": "\u2949",
    "Ubrcy;": "\u040E",
    "ubrcy;": "\u045E",
    "Ubreve;": "\u016C",
    "ubreve;": "\u016D",
    "Ucirc;": "\xDB",
    Ucirc: "\xDB",
    "ucirc;": "\xFB",
    ucirc: "\xFB",
    "Ucy;": "\u0423",
    "ucy;": "\u0443",
    "udarr;": "\u21C5",
    "Udblac;": "\u0170",
    "udblac;": "\u0171",
    "udhar;": "\u296E",
    "ufisht;": "\u297E",
    "Ufr;": "\u{1D518}",
    "ufr;": "\u{1D532}",
    "Ugrave;": "\xD9",
    Ugrave: "\xD9",
    "ugrave;": "\xF9",
    ugrave: "\xF9",
    "uHar;": "\u2963",
    "uharl;": "\u21BF",
    "uharr;": "\u21BE",
    "uhblk;": "\u2580",
    "ulcorn;": "\u231C",
    "ulcorner;": "\u231C",
    "ulcrop;": "\u230F",
    "ultri;": "\u25F8",
    "Umacr;": "\u016A",
    "umacr;": "\u016B",
    "uml;": "\xA8",
    uml: "\xA8",
    "UnderBar;": "_",
    "UnderBrace;": "\u23DF",
    "UnderBracket;": "\u23B5",
    "UnderParenthesis;": "\u23DD",
    "Union;": "\u22C3",
    "UnionPlus;": "\u228E",
    "Uogon;": "\u0172",
    "uogon;": "\u0173",
    "Uopf;": "\u{1D54C}",
    "uopf;": "\u{1D566}",
    "UpArrow;": "\u2191",
    "Uparrow;": "\u21D1",
    "uparrow;": "\u2191",
    "UpArrowBar;": "\u2912",
    "UpArrowDownArrow;": "\u21C5",
    "UpDownArrow;": "\u2195",
    "Updownarrow;": "\u21D5",
    "updownarrow;": "\u2195",
    "UpEquilibrium;": "\u296E",
    "upharpoonleft;": "\u21BF",
    "upharpoonright;": "\u21BE",
    "uplus;": "\u228E",
    "UpperLeftArrow;": "\u2196",
    "UpperRightArrow;": "\u2197",
    "Upsi;": "\u03D2",
    "upsi;": "\u03C5",
    "upsih;": "\u03D2",
    "Upsilon;": "\u03A5",
    "upsilon;": "\u03C5",
    "UpTee;": "\u22A5",
    "UpTeeArrow;": "\u21A5",
    "upuparrows;": "\u21C8",
    "urcorn;": "\u231D",
    "urcorner;": "\u231D",
    "urcrop;": "\u230E",
    "Uring;": "\u016E",
    "uring;": "\u016F",
    "urtri;": "\u25F9",
    "Uscr;": "\u{1D4B0}",
    "uscr;": "\u{1D4CA}",
    "utdot;": "\u22F0",
    "Utilde;": "\u0168",
    "utilde;": "\u0169",
    "utri;": "\u25B5",
    "utrif;": "\u25B4",
    "uuarr;": "\u21C8",
    "Uuml;": "\xDC",
    Uuml: "\xDC",
    "uuml;": "\xFC",
    uuml: "\xFC",
    "uwangle;": "\u29A7",
    "vangrt;": "\u299C",
    "varepsilon;": "\u03F5",
    "varkappa;": "\u03F0",
    "varnothing;": "\u2205",
    "varphi;": "\u03D5",
    "varpi;": "\u03D6",
    "varpropto;": "\u221D",
    "vArr;": "\u21D5",
    "varr;": "\u2195",
    "varrho;": "\u03F1",
    "varsigma;": "\u03C2",
    "varsubsetneq;": "\u228A\uFE00",
    "varsubsetneqq;": "\u2ACB\uFE00",
    "varsupsetneq;": "\u228B\uFE00",
    "varsupsetneqq;": "\u2ACC\uFE00",
    "vartheta;": "\u03D1",
    "vartriangleleft;": "\u22B2",
    "vartriangleright;": "\u22B3",
    "Vbar;": "\u2AEB",
    "vBar;": "\u2AE8",
    "vBarv;": "\u2AE9",
    "Vcy;": "\u0412",
    "vcy;": "\u0432",
    "VDash;": "\u22AB",
    "Vdash;": "\u22A9",
    "vDash;": "\u22A8",
    "vdash;": "\u22A2",
    "Vdashl;": "\u2AE6",
    "Vee;": "\u22C1",
    "vee;": "\u2228",
    "veebar;": "\u22BB",
    "veeeq;": "\u225A",
    "vellip;": "\u22EE",
    "Verbar;": "\u2016",
    "verbar;": "|",
    "Vert;": "\u2016",
    "vert;": "|",
    "VerticalBar;": "\u2223",
    "VerticalLine;": "|",
    "VerticalSeparator;": "\u2758",
    "VerticalTilde;": "\u2240",
    "VeryThinSpace;": "\u200A",
    "Vfr;": "\u{1D519}",
    "vfr;": "\u{1D533}",
    "vltri;": "\u22B2",
    "vnsub;": "\u2282\u20D2",
    "vnsup;": "\u2283\u20D2",
    "Vopf;": "\u{1D54D}",
    "vopf;": "\u{1D567}",
    "vprop;": "\u221D",
    "vrtri;": "\u22B3",
    "Vscr;": "\u{1D4B1}",
    "vscr;": "\u{1D4CB}",
    "vsubnE;": "\u2ACB\uFE00",
    "vsubne;": "\u228A\uFE00",
    "vsupnE;": "\u2ACC\uFE00",
    "vsupne;": "\u228B\uFE00",
    "Vvdash;": "\u22AA",
    "vzigzag;": "\u299A",
    "Wcirc;": "\u0174",
    "wcirc;": "\u0175",
    "wedbar;": "\u2A5F",
    "Wedge;": "\u22C0",
    "wedge;": "\u2227",
    "wedgeq;": "\u2259",
    "weierp;": "\u2118",
    "Wfr;": "\u{1D51A}",
    "wfr;": "\u{1D534}",
    "Wopf;": "\u{1D54E}",
    "wopf;": "\u{1D568}",
    "wp;": "\u2118",
    "wr;": "\u2240",
    "wreath;": "\u2240",
    "Wscr;": "\u{1D4B2}",
    "wscr;": "\u{1D4CC}",
    "xcap;": "\u22C2",
    "xcirc;": "\u25EF",
    "xcup;": "\u22C3",
    "xdtri;": "\u25BD",
    "Xfr;": "\u{1D51B}",
    "xfr;": "\u{1D535}",
    "xhArr;": "\u27FA",
    "xharr;": "\u27F7",
    "Xi;": "\u039E",
    "xi;": "\u03BE",
    "xlArr;": "\u27F8",
    "xlarr;": "\u27F5",
    "xmap;": "\u27FC",
    "xnis;": "\u22FB",
    "xodot;": "\u2A00",
    "Xopf;": "\u{1D54F}",
    "xopf;": "\u{1D569}",
    "xoplus;": "\u2A01",
    "xotime;": "\u2A02",
    "xrArr;": "\u27F9",
    "xrarr;": "\u27F6",
    "Xscr;": "\u{1D4B3}",
    "xscr;": "\u{1D4CD}",
    "xsqcup;": "\u2A06",
    "xuplus;": "\u2A04",
    "xutri;": "\u25B3",
    "xvee;": "\u22C1",
    "xwedge;": "\u22C0",
    "Yacute;": "\xDD",
    Yacute: "\xDD",
    "yacute;": "\xFD",
    yacute: "\xFD",
    "YAcy;": "\u042F",
    "yacy;": "\u044F",
    "Ycirc;": "\u0176",
    "ycirc;": "\u0177",
    "Ycy;": "\u042B",
    "ycy;": "\u044B",
    "yen;": "\xA5",
    yen: "\xA5",
    "Yfr;": "\u{1D51C}",
    "yfr;": "\u{1D536}",
    "YIcy;": "\u0407",
    "yicy;": "\u0457",
    "Yopf;": "\u{1D550}",
    "yopf;": "\u{1D56A}",
    "Yscr;": "\u{1D4B4}",
    "yscr;": "\u{1D4CE}",
    "YUcy;": "\u042E",
    "yucy;": "\u044E",
    "Yuml;": "\u0178",
    "yuml;": "\xFF",
    yuml: "\xFF",
    "Zacute;": "\u0179",
    "zacute;": "\u017A",
    "Zcaron;": "\u017D",
    "zcaron;": "\u017E",
    "Zcy;": "\u0417",
    "zcy;": "\u0437",
    "Zdot;": "\u017B",
    "zdot;": "\u017C",
    "zeetrf;": "\u2128",
    "ZeroWidthSpace;": "\u200B",
    "Zeta;": "\u0396",
    "zeta;": "\u03B6",
    "Zfr;": "\u2128",
    "zfr;": "\u{1D537}",
    "ZHcy;": "\u0416",
    "zhcy;": "\u0436",
    "zigrarr;": "\u21DD",
    "Zopf;": "\u2124",
    "zopf;": "\u{1D56B}",
    "Zscr;": "\u{1D4B5}",
    "zscr;": "\u{1D4CF}",
    "zwj;": "\u200D",
    "zwnj;": "\u200C"
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/utils/strings.js
  function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
      return false;
    }
    for (var i = 0; i < needle.length; i++) {
      if (haystack[i] !== needle[i]) {
        return false;
      }
    }
    return true;
  }
  function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
      return haystack.lastIndexOf(needle) === diff;
    } else if (diff === 0) {
      return haystack === needle;
    } else {
      return false;
    }
  }
  function repeat(value, count) {
    var s = "";
    while (count > 0) {
      if ((count & 1) === 1) {
        s += value;
      }
      value += value;
      count = count >>> 1;
    }
    return s;
  }
  var _a2 = "a".charCodeAt(0);
  var _z = "z".charCodeAt(0);
  var _A = "A".charCodeAt(0);
  var _Z = "Z".charCodeAt(0);
  var _0 = "0".charCodeAt(0);
  var _9 = "9".charCodeAt(0);
  function isLetterOrDigit(text, index) {
    var c = text.charCodeAt(index);
    return _a2 <= c && c <= _z || _A <= c && c <= _Z || _0 <= c && c <= _9;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/utils/object.js
  function isDefined(obj) {
    return typeof obj !== "undefined";
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/utils/markup.js
  function normalizeMarkupContent(input) {
    if (!input) {
      return void 0;
    }
    if (typeof input === "string") {
      return {
        kind: "markdown",
        value: input
      };
    }
    return {
      kind: "markdown",
      value: input.value
    };
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/languageFacts/dataProvider.js
  var HTMLDataProvider = function() {
    function HTMLDataProvider2(id, customData) {
      var _this = this;
      this.id = id;
      this._tags = [];
      this._tagMap = {};
      this._valueSetMap = {};
      this._tags = customData.tags || [];
      this._globalAttributes = customData.globalAttributes || [];
      this._tags.forEach(function(t) {
        _this._tagMap[t.name.toLowerCase()] = t;
      });
      if (customData.valueSets) {
        customData.valueSets.forEach(function(vs) {
          _this._valueSetMap[vs.name] = vs.values;
        });
      }
    }
    HTMLDataProvider2.prototype.isApplicable = function() {
      return true;
    };
    HTMLDataProvider2.prototype.getId = function() {
      return this.id;
    };
    HTMLDataProvider2.prototype.provideTags = function() {
      return this._tags;
    };
    HTMLDataProvider2.prototype.provideAttributes = function(tag) {
      var attributes = [];
      var processAttribute = function(a) {
        attributes.push(a);
      };
      var tagEntry = this._tagMap[tag.toLowerCase()];
      if (tagEntry) {
        tagEntry.attributes.forEach(processAttribute);
      }
      this._globalAttributes.forEach(processAttribute);
      return attributes;
    };
    HTMLDataProvider2.prototype.provideValues = function(tag, attribute) {
      var _this = this;
      var values = [];
      attribute = attribute.toLowerCase();
      var processAttributes = function(attributes) {
        attributes.forEach(function(a) {
          if (a.name.toLowerCase() === attribute) {
            if (a.values) {
              a.values.forEach(function(v) {
                values.push(v);
              });
            }
            if (a.valueSet) {
              if (_this._valueSetMap[a.valueSet]) {
                _this._valueSetMap[a.valueSet].forEach(function(v) {
                  values.push(v);
                });
              }
            }
          }
        });
      };
      var tagEntry = this._tagMap[tag.toLowerCase()];
      if (tagEntry) {
        processAttributes(tagEntry.attributes);
      }
      processAttributes(this._globalAttributes);
      return values;
    };
    return HTMLDataProvider2;
  }();
  function generateDocumentation(item, settings, doesSupportMarkdown) {
    if (settings === void 0) {
      settings = {};
    }
    var result = {
      kind: doesSupportMarkdown ? "markdown" : "plaintext",
      value: ""
    };
    if (item.description && settings.documentation !== false) {
      var normalizedDescription = normalizeMarkupContent(item.description);
      if (normalizedDescription) {
        result.value += normalizedDescription.value;
      }
    }
    if (item.references && item.references.length > 0 && settings.references !== false) {
      if (result.value.length) {
        result.value += "\n\n";
      }
      if (doesSupportMarkdown) {
        result.value += item.references.map(function(r) {
          return "[" + r.name + "](" + r.url + ")";
        }).join(" | ");
      } else {
        result.value += item.references.map(function(r) {
          return r.name + ": " + r.url;
        }).join("\n");
      }
    }
    if (result.value === "") {
      return void 0;
    }
    return result;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/pathCompletion.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = {label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: []}, f, y, t, g;
    return g = {next: verb(0), throw: verb(1), return: verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {value: op[1], done: false};
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
  var PathCompletionParticipant = function() {
    function PathCompletionParticipant2(readDirectory) {
      this.readDirectory = readDirectory;
      this.atributeCompletions = [];
    }
    PathCompletionParticipant2.prototype.onHtmlAttributeValue = function(context) {
      if (isPathAttribute(context.tag, context.attribute)) {
        this.atributeCompletions.push(context);
      }
    };
    PathCompletionParticipant2.prototype.computeCompletions = function(document, documentContext) {
      return __awaiter2(this, void 0, void 0, function() {
        var result, _i, _a3, attributeCompletion, fullValue, replaceRange, suggestions, _b, suggestions_1, item;
        return __generator(this, function(_c) {
          switch (_c.label) {
            case 0:
              result = {items: [], isIncomplete: false};
              _i = 0, _a3 = this.atributeCompletions;
              _c.label = 1;
            case 1:
              if (!(_i < _a3.length))
                return [3, 5];
              attributeCompletion = _a3[_i];
              fullValue = stripQuotes(document.getText(attributeCompletion.range));
              if (!isCompletablePath(fullValue))
                return [3, 4];
              if (!(fullValue === "." || fullValue === ".."))
                return [3, 2];
              result.isIncomplete = true;
              return [3, 4];
            case 2:
              replaceRange = pathToReplaceRange(attributeCompletion.value, fullValue, attributeCompletion.range);
              return [4, this.providePathSuggestions(attributeCompletion.value, replaceRange, document, documentContext)];
            case 3:
              suggestions = _c.sent();
              for (_b = 0, suggestions_1 = suggestions; _b < suggestions_1.length; _b++) {
                item = suggestions_1[_b];
                result.items.push(item);
              }
              _c.label = 4;
            case 4:
              _i++;
              return [3, 1];
            case 5:
              return [2, result];
          }
        });
      });
    };
    PathCompletionParticipant2.prototype.providePathSuggestions = function(valueBeforeCursor, replaceRange, document, documentContext) {
      return __awaiter2(this, void 0, void 0, function() {
        var valueBeforeLastSlash, parentDir, result, infos, _i, infos_1, _a3, name, type, e_1;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf("/") + 1);
              parentDir = documentContext.resolveReference(valueBeforeLastSlash || ".", document.uri);
              if (!parentDir)
                return [3, 4];
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, , 4]);
              result = [];
              return [4, this.readDirectory(parentDir)];
            case 2:
              infos = _b.sent();
              for (_i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                _a3 = infos_1[_i], name = _a3[0], type = _a3[1];
                if (name.charCodeAt(0) !== CharCode_dot) {
                  result.push(createCompletionItem(name, type === FileType.Directory, replaceRange));
                }
              }
              return [2, result];
            case 3:
              e_1 = _b.sent();
              return [3, 4];
            case 4:
              return [2, []];
          }
        });
      });
    };
    return PathCompletionParticipant2;
  }();
  var CharCode_dot = ".".charCodeAt(0);
  function stripQuotes(fullValue) {
    if (startsWith(fullValue, "'") || startsWith(fullValue, '"')) {
      return fullValue.slice(1, -1);
    } else {
      return fullValue;
    }
  }
  function isCompletablePath(value) {
    if (startsWith(value, "http") || startsWith(value, "https") || startsWith(value, "//")) {
      return false;
    }
    return true;
  }
  function isPathAttribute(tag, attr) {
    var a = PATH_TAG_AND_ATTR[tag];
    if (a) {
      if (typeof a === "string") {
        return a === attr;
      } else {
        return a.indexOf(attr) !== -1;
      }
    }
    return false;
  }
  function pathToReplaceRange(valueBeforeCursor, fullValue, range) {
    var replaceRange;
    var lastIndexOfSlash = valueBeforeCursor.lastIndexOf("/");
    if (lastIndexOfSlash === -1) {
      replaceRange = shiftRange(range, 1, -1);
    } else {
      var valueAfterLastSlash = fullValue.slice(lastIndexOfSlash + 1);
      var startPos = shiftPosition(range.end, -1 - valueAfterLastSlash.length);
      var whitespaceIndex = valueAfterLastSlash.indexOf(" ");
      var endPos = void 0;
      if (whitespaceIndex !== -1) {
        endPos = shiftPosition(startPos, whitespaceIndex);
      } else {
        endPos = shiftPosition(range.end, -1);
      }
      replaceRange = Range2.create(startPos, endPos);
    }
    return replaceRange;
  }
  function createCompletionItem(p, isDir, replaceRange) {
    if (isDir) {
      p = p + "/";
      return {
        label: p,
        kind: CompletionItemKind2.Folder,
        textEdit: TextEdit.replace(replaceRange, p),
        command: {
          title: "Suggest",
          command: "editor.action.triggerSuggest"
        }
      };
    } else {
      return {
        label: p,
        kind: CompletionItemKind2.File,
        textEdit: TextEdit.replace(replaceRange, p)
      };
    }
  }
  function shiftPosition(pos, offset) {
    return Position2.create(pos.line, pos.character + offset);
  }
  function shiftRange(range, startOffset, endOffset) {
    var start = shiftPosition(range.start, startOffset);
    var end = shiftPosition(range.end, endOffset);
    return Range2.create(start, end);
  }
  var PATH_TAG_AND_ATTR = {
    a: "href",
    area: "href",
    body: "background",
    del: "cite",
    form: "action",
    frame: ["src", "longdesc"],
    img: ["src", "longdesc"],
    ins: "cite",
    link: "href",
    object: "data",
    q: "cite",
    script: "src",
    audio: "src",
    button: "formaction",
    command: "icon",
    embed: "src",
    html: "manifest",
    input: ["src", "formaction"],
    source: "src",
    track: "src",
    video: ["src", "poster"]
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlCompletion.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator2 = function(thisArg, body) {
    var _ = {label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: []}, f, y, t, g;
    return g = {next: verb(0), throw: verb(1), return: verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {value: op[1], done: false};
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
  var localize3 = loadMessageBundle();
  var HTMLCompletion = function() {
    function HTMLCompletion2(lsOptions, dataManager) {
      this.lsOptions = lsOptions;
      this.dataManager = dataManager;
      this.completionParticipants = [];
    }
    HTMLCompletion2.prototype.setCompletionParticipants = function(registeredCompletionParticipants) {
      this.completionParticipants = registeredCompletionParticipants || [];
    };
    HTMLCompletion2.prototype.doComplete2 = function(document, position, htmlDocument, documentContext, settings) {
      return __awaiter3(this, void 0, void 0, function() {
        var participant, contributedParticipants, result, pathCompletionResult;
        return __generator2(this, function(_a3) {
          switch (_a3.label) {
            case 0:
              if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) {
                return [2, this.doComplete(document, position, htmlDocument, settings)];
              }
              participant = new PathCompletionParticipant(this.lsOptions.fileSystemProvider.readDirectory);
              contributedParticipants = this.completionParticipants;
              this.completionParticipants = [participant].concat(contributedParticipants);
              result = this.doComplete(document, position, htmlDocument, settings);
              _a3.label = 1;
            case 1:
              _a3.trys.push([1, , 3, 4]);
              return [4, participant.computeCompletions(document, documentContext)];
            case 2:
              pathCompletionResult = _a3.sent();
              return [2, {
                isIncomplete: result.isIncomplete || pathCompletionResult.isIncomplete,
                items: pathCompletionResult.items.concat(result.items)
              }];
            case 3:
              this.completionParticipants = contributedParticipants;
              return [7];
            case 4:
              return [2];
          }
        });
      });
    };
    HTMLCompletion2.prototype.doComplete = function(document, position, htmlDocument, settings) {
      var result = this._doComplete(document, position, htmlDocument, settings);
      return this.convertCompletionList(result);
    };
    HTMLCompletion2.prototype._doComplete = function(document, position, htmlDocument, settings) {
      var result = {
        isIncomplete: false,
        items: []
      };
      var completionParticipants = this.completionParticipants;
      var dataProviders = this.dataManager.getDataProviders().filter(function(p) {
        return p.isApplicable(document.languageId) && (!settings || settings[p.getId()] !== false);
      });
      var doesSupportMarkdown = this.doesSupportMarkdown();
      var text = document.getText();
      var offset = document.offsetAt(position);
      var node = htmlDocument.findNodeBefore(offset);
      if (!node) {
        return result;
      }
      var scanner = createScanner(text, node.start);
      var currentTag = "";
      var currentAttributeName;
      function getReplaceRange(replaceStart, replaceEnd) {
        if (replaceEnd === void 0) {
          replaceEnd = offset;
        }
        if (replaceStart > offset) {
          replaceStart = offset;
        }
        return {start: document.positionAt(replaceStart), end: document.positionAt(replaceEnd)};
      }
      function collectOpenTagSuggestions(afterOpenBracket2, tagNameEnd) {
        var range = getReplaceRange(afterOpenBracket2, tagNameEnd);
        dataProviders.forEach(function(provider) {
          provider.provideTags().forEach(function(tag) {
            result.items.push({
              label: tag.name,
              kind: CompletionItemKind2.Property,
              documentation: generateDocumentation(tag, void 0, doesSupportMarkdown),
              textEdit: TextEdit.replace(range, tag.name),
              insertTextFormat: InsertTextFormat.PlainText
            });
          });
        });
        return result;
      }
      function getLineIndent(offset2) {
        var start2 = offset2;
        while (start2 > 0) {
          var ch2 = text.charAt(start2 - 1);
          if ("\n\r".indexOf(ch2) >= 0) {
            return text.substring(start2, offset2);
          }
          if (!isWhiteSpace(ch2)) {
            return null;
          }
          start2--;
        }
        return text.substring(0, offset2);
      }
      function collectCloseTagSuggestions(afterOpenBracket2, inOpenTag, tagNameEnd) {
        if (tagNameEnd === void 0) {
          tagNameEnd = offset;
        }
        var range = getReplaceRange(afterOpenBracket2, tagNameEnd);
        var closeTag = isFollowedBy(text, tagNameEnd, ScannerState.WithinEndTag, TokenType.EndTagClose) ? "" : ">";
        var curr = node;
        if (inOpenTag) {
          curr = curr.parent;
        }
        while (curr) {
          var tag = curr.tag;
          if (tag && (!curr.closed || curr.endTagStart && curr.endTagStart > offset)) {
            var item = {
              label: "/" + tag,
              kind: CompletionItemKind2.Property,
              filterText: "/" + tag,
              textEdit: TextEdit.replace(range, "/" + tag + closeTag),
              insertTextFormat: InsertTextFormat.PlainText
            };
            var startIndent = getLineIndent(curr.start);
            var endIndent = getLineIndent(afterOpenBracket2 - 1);
            if (startIndent !== null && endIndent !== null && startIndent !== endIndent) {
              var insertText = startIndent + "</" + tag + closeTag;
              item.textEdit = TextEdit.replace(getReplaceRange(afterOpenBracket2 - 1 - endIndent.length), insertText);
              item.filterText = endIndent + "</" + tag;
            }
            result.items.push(item);
            return result;
          }
          curr = curr.parent;
        }
        if (inOpenTag) {
          return result;
        }
        dataProviders.forEach(function(provider) {
          provider.provideTags().forEach(function(tag2) {
            result.items.push({
              label: "/" + tag2.name,
              kind: CompletionItemKind2.Property,
              documentation: generateDocumentation(tag2, void 0, doesSupportMarkdown),
              filterText: "/" + tag2.name + closeTag,
              textEdit: TextEdit.replace(range, "/" + tag2.name + closeTag),
              insertTextFormat: InsertTextFormat.PlainText
            });
          });
        });
        return result;
      }
      function collectAutoCloseTagSuggestion(tagCloseEnd, tag) {
        if (settings && settings.hideAutoCompleteProposals) {
          return result;
        }
        if (!isVoidElement(tag)) {
          var pos = document.positionAt(tagCloseEnd);
          result.items.push({
            label: "</" + tag + ">",
            kind: CompletionItemKind2.Property,
            filterText: "</" + tag + ">",
            textEdit: TextEdit.insert(pos, "$0</" + tag + ">"),
            insertTextFormat: InsertTextFormat.Snippet
          });
        }
        return result;
      }
      function collectTagSuggestions(tagStart, tagEnd) {
        collectOpenTagSuggestions(tagStart, tagEnd);
        collectCloseTagSuggestions(tagStart, true, tagEnd);
        return result;
      }
      function getExistingAttributes() {
        var existingAttributes = Object.create(null);
        node.attributeNames.forEach(function(attribute) {
          existingAttributes[attribute] = true;
        });
        return existingAttributes;
      }
      function collectAttributeNameSuggestions(nameStart, nameEnd) {
        if (nameEnd === void 0) {
          nameEnd = offset;
        }
        var replaceEnd = offset;
        while (replaceEnd < nameEnd && text[replaceEnd] !== "<") {
          replaceEnd++;
        }
        var currentAttribute = text.substring(nameStart, nameEnd);
        var range = getReplaceRange(nameStart, replaceEnd);
        var value = isFollowedBy(text, nameEnd, ScannerState.AfterAttributeName, TokenType.DelimiterAssign) ? "" : '="$1"';
        var seenAttributes = getExistingAttributes();
        seenAttributes[currentAttribute] = false;
        dataProviders.forEach(function(provider) {
          provider.provideAttributes(currentTag).forEach(function(attr) {
            if (seenAttributes[attr.name]) {
              return;
            }
            seenAttributes[attr.name] = true;
            var codeSnippet = attr.name;
            var command;
            if (attr.valueSet !== "v" && value.length) {
              codeSnippet = codeSnippet + value;
              if (attr.valueSet || attr.name === "style") {
                command = {
                  title: "Suggest",
                  command: "editor.action.triggerSuggest"
                };
              }
            }
            result.items.push({
              label: attr.name,
              kind: attr.valueSet === "handler" ? CompletionItemKind2.Function : CompletionItemKind2.Value,
              documentation: generateDocumentation(attr, void 0, doesSupportMarkdown),
              textEdit: TextEdit.replace(range, codeSnippet),
              insertTextFormat: InsertTextFormat.Snippet,
              command
            });
          });
        });
        collectDataAttributesSuggestions(range, seenAttributes);
        return result;
      }
      function collectDataAttributesSuggestions(range, seenAttributes) {
        var dataAttr = "data-";
        var dataAttributes = {};
        dataAttributes[dataAttr] = dataAttr + '$1="$2"';
        function addNodeDataAttributes(node2) {
          node2.attributeNames.forEach(function(attr) {
            if (startsWith(attr, dataAttr) && !dataAttributes[attr] && !seenAttributes[attr]) {
              dataAttributes[attr] = attr + '="$1"';
            }
          });
          node2.children.forEach(function(child) {
            return addNodeDataAttributes(child);
          });
        }
        if (htmlDocument) {
          htmlDocument.roots.forEach(function(root) {
            return addNodeDataAttributes(root);
          });
        }
        Object.keys(dataAttributes).forEach(function(attr) {
          return result.items.push({
            label: attr,
            kind: CompletionItemKind2.Value,
            textEdit: TextEdit.replace(range, dataAttributes[attr]),
            insertTextFormat: InsertTextFormat.Snippet
          });
        });
      }
      function collectAttributeValueSuggestions(valueStart, valueEnd) {
        if (valueEnd === void 0) {
          valueEnd = offset;
        }
        var range;
        var addQuotes;
        var valuePrefix;
        if (offset > valueStart && offset <= valueEnd && isQuote(text[valueStart])) {
          var valueContentStart = valueStart + 1;
          var valueContentEnd = valueEnd;
          if (valueEnd > valueStart && text[valueEnd - 1] === text[valueStart]) {
            valueContentEnd--;
          }
          var wsBefore = getWordStart(text, offset, valueContentStart);
          var wsAfter = getWordEnd(text, offset, valueContentEnd);
          range = getReplaceRange(wsBefore, wsAfter);
          valuePrefix = offset >= valueContentStart && offset <= valueContentEnd ? text.substring(valueContentStart, offset) : "";
          addQuotes = false;
        } else {
          range = getReplaceRange(valueStart, valueEnd);
          valuePrefix = text.substring(valueStart, offset);
          addQuotes = true;
        }
        if (completionParticipants.length > 0) {
          var tag = currentTag.toLowerCase();
          var attribute = currentAttributeName.toLowerCase();
          var fullRange = getReplaceRange(valueStart, valueEnd);
          for (var _i = 0, completionParticipants_1 = completionParticipants; _i < completionParticipants_1.length; _i++) {
            var participant = completionParticipants_1[_i];
            if (participant.onHtmlAttributeValue) {
              participant.onHtmlAttributeValue({document, position, tag, attribute, value: valuePrefix, range: fullRange});
            }
          }
        }
        dataProviders.forEach(function(provider) {
          provider.provideValues(currentTag, currentAttributeName).forEach(function(value) {
            var insertText = addQuotes ? '"' + value.name + '"' : value.name;
            result.items.push({
              label: value.name,
              filterText: insertText,
              kind: CompletionItemKind2.Unit,
              documentation: generateDocumentation(value, void 0, doesSupportMarkdown),
              textEdit: TextEdit.replace(range, insertText),
              insertTextFormat: InsertTextFormat.PlainText
            });
          });
        });
        collectCharacterEntityProposals();
        return result;
      }
      function scanNextForEndPos(nextToken) {
        if (offset === scanner.getTokenEnd()) {
          token = scanner.scan();
          if (token === nextToken && scanner.getTokenOffset() === offset) {
            return scanner.getTokenEnd();
          }
        }
        return offset;
      }
      function collectInsideContent() {
        for (var _i = 0, completionParticipants_2 = completionParticipants; _i < completionParticipants_2.length; _i++) {
          var participant = completionParticipants_2[_i];
          if (participant.onHtmlContent) {
            participant.onHtmlContent({document, position});
          }
        }
        return collectCharacterEntityProposals();
      }
      function collectCharacterEntityProposals() {
        var k = offset - 1;
        var characterStart = position.character;
        while (k >= 0 && isLetterOrDigit(text, k)) {
          k--;
          characterStart--;
        }
        if (k >= 0 && text[k] === "&") {
          var range = Range2.create(Position2.create(position.line, characterStart - 1), position);
          for (var entity in entities) {
            if (endsWith(entity, ";")) {
              var label = "&" + entity;
              result.items.push({
                label,
                kind: CompletionItemKind2.Keyword,
                documentation: localize3("entity.propose", "Character entity representing '" + entities[entity] + "'"),
                textEdit: TextEdit.replace(range, label),
                insertTextFormat: InsertTextFormat.PlainText
              });
            }
          }
        }
        return result;
      }
      function suggestDoctype(replaceStart, replaceEnd) {
        var range = getReplaceRange(replaceStart, replaceEnd);
        result.items.push({
          label: "!DOCTYPE",
          kind: CompletionItemKind2.Property,
          documentation: "A preamble for an HTML document.",
          textEdit: TextEdit.replace(range, "!DOCTYPE html>"),
          insertTextFormat: InsertTextFormat.PlainText
        });
      }
      var token = scanner.scan();
      while (token !== TokenType.EOS && scanner.getTokenOffset() <= offset) {
        switch (token) {
          case TokenType.StartTagOpen:
            if (scanner.getTokenEnd() === offset) {
              var endPos = scanNextForEndPos(TokenType.StartTag);
              if (position.line === 0) {
                suggestDoctype(offset, endPos);
              }
              return collectTagSuggestions(offset, endPos);
            }
            break;
          case TokenType.StartTag:
            if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
              return collectOpenTagSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
            }
            currentTag = scanner.getTokenText();
            break;
          case TokenType.AttributeName:
            if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
              return collectAttributeNameSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
            }
            currentAttributeName = scanner.getTokenText();
            break;
          case TokenType.DelimiterAssign:
            if (scanner.getTokenEnd() === offset) {
              var endPos = scanNextForEndPos(TokenType.AttributeValue);
              return collectAttributeValueSuggestions(offset, endPos);
            }
            break;
          case TokenType.AttributeValue:
            if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
              return collectAttributeValueSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
            }
            break;
          case TokenType.Whitespace:
            if (offset <= scanner.getTokenEnd()) {
              switch (scanner.getScannerState()) {
                case ScannerState.AfterOpeningStartTag:
                  var startPos = scanner.getTokenOffset();
                  var endTagPos = scanNextForEndPos(TokenType.StartTag);
                  return collectTagSuggestions(startPos, endTagPos);
                case ScannerState.WithinTag:
                case ScannerState.AfterAttributeName:
                  return collectAttributeNameSuggestions(scanner.getTokenEnd());
                case ScannerState.BeforeAttributeValue:
                  return collectAttributeValueSuggestions(scanner.getTokenEnd());
                case ScannerState.AfterOpeningEndTag:
                  return collectCloseTagSuggestions(scanner.getTokenOffset() - 1, false);
                case ScannerState.WithinContent:
                  return collectInsideContent();
              }
            }
            break;
          case TokenType.EndTagOpen:
            if (offset <= scanner.getTokenEnd()) {
              var afterOpenBracket = scanner.getTokenOffset() + 1;
              var endOffset = scanNextForEndPos(TokenType.EndTag);
              return collectCloseTagSuggestions(afterOpenBracket, false, endOffset);
            }
            break;
          case TokenType.EndTag:
            if (offset <= scanner.getTokenEnd()) {
              var start = scanner.getTokenOffset() - 1;
              while (start >= 0) {
                var ch = text.charAt(start);
                if (ch === "/") {
                  return collectCloseTagSuggestions(start, false, scanner.getTokenEnd());
                } else if (!isWhiteSpace(ch)) {
                  break;
                }
                start--;
              }
            }
            break;
          case TokenType.StartTagClose:
            if (offset <= scanner.getTokenEnd()) {
              if (currentTag) {
                return collectAutoCloseTagSuggestion(scanner.getTokenEnd(), currentTag);
              }
            }
            break;
          case TokenType.Content:
            if (offset <= scanner.getTokenEnd()) {
              return collectInsideContent();
            }
            break;
          default:
            if (offset <= scanner.getTokenEnd()) {
              return result;
            }
            break;
        }
        token = scanner.scan();
      }
      return result;
    };
    HTMLCompletion2.prototype.doTagComplete = function(document, position, htmlDocument) {
      var offset = document.offsetAt(position);
      if (offset <= 0) {
        return null;
      }
      var char = document.getText().charAt(offset - 1);
      if (char === ">") {
        var node = htmlDocument.findNodeBefore(offset);
        if (node && node.tag && !isVoidElement(node.tag) && node.start < offset && (!node.endTagStart || node.endTagStart > offset)) {
          var scanner = createScanner(document.getText(), node.start);
          var token = scanner.scan();
          while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
            if (token === TokenType.StartTagClose && scanner.getTokenEnd() === offset) {
              return "$0</" + node.tag + ">";
            }
            token = scanner.scan();
          }
        }
      } else if (char === "/") {
        var node = htmlDocument.findNodeBefore(offset);
        while (node && node.closed && !(node.endTagStart && node.endTagStart > offset)) {
          node = node.parent;
        }
        if (node && node.tag) {
          var scanner = createScanner(document.getText(), node.start);
          var token = scanner.scan();
          while (token !== TokenType.EOS && scanner.getTokenEnd() <= offset) {
            if (token === TokenType.EndTagOpen && scanner.getTokenEnd() === offset) {
              return node.tag + ">";
            }
            token = scanner.scan();
          }
        }
      }
      return null;
    };
    HTMLCompletion2.prototype.convertCompletionList = function(list) {
      if (!this.doesSupportMarkdown()) {
        list.items.forEach(function(item) {
          if (item.documentation && typeof item.documentation !== "string") {
            item.documentation = {
              kind: "plaintext",
              value: item.documentation.value
            };
          }
        });
      }
      return list;
    };
    HTMLCompletion2.prototype.doesSupportMarkdown = function() {
      var _a3, _b, _c;
      if (!isDefined(this.supportsMarkdown)) {
        if (!isDefined(this.lsOptions.clientCapabilities)) {
          this.supportsMarkdown = true;
          return this.supportsMarkdown;
        }
        var documentationFormat = (_c = (_b = (_a3 = this.lsOptions.clientCapabilities.textDocument) === null || _a3 === void 0 ? void 0 : _a3.completion) === null || _b === void 0 ? void 0 : _b.completionItem) === null || _c === void 0 ? void 0 : _c.documentationFormat;
        this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    };
    return HTMLCompletion2;
  }();
  function isQuote(s) {
    return /^["']*$/.test(s);
  }
  function isWhiteSpace(s) {
    return /^\s*$/.test(s);
  }
  function isFollowedBy(s, offset, intialState, expectedToken) {
    var scanner = createScanner(s, offset, intialState);
    var token = scanner.scan();
    while (token === TokenType.Whitespace) {
      token = scanner.scan();
    }
    return token === expectedToken;
  }
  function getWordStart(s, offset, limit) {
    while (offset > limit && !isWhiteSpace(s[offset - 1])) {
      offset--;
    }
    return offset;
  }
  function getWordEnd(s, offset, limit) {
    while (offset < limit && !isWhiteSpace(s[offset])) {
      offset++;
    }
    return offset;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlHover.js
  var localize4 = loadMessageBundle();
  var HTMLHover = function() {
    function HTMLHover2(lsOptions, dataManager) {
      this.lsOptions = lsOptions;
      this.dataManager = dataManager;
    }
    HTMLHover2.prototype.doHover = function(document, position, htmlDocument, options) {
      var convertContents = this.convertContents.bind(this);
      var doesSupportMarkdown = this.doesSupportMarkdown();
      var offset = document.offsetAt(position);
      var node = htmlDocument.findNodeAt(offset);
      var text = document.getText();
      if (!node || !node.tag) {
        return null;
      }
      var dataProviders = this.dataManager.getDataProviders().filter(function(p) {
        return p.isApplicable(document.languageId);
      });
      function getTagHover(currTag, range, open) {
        var _loop_1 = function(provider2) {
          var hover = null;
          provider2.provideTags().forEach(function(tag2) {
            if (tag2.name.toLowerCase() === currTag.toLowerCase()) {
              var markupContent = generateDocumentation(tag2, options, doesSupportMarkdown);
              if (!markupContent) {
                markupContent = {
                  kind: doesSupportMarkdown ? "markdown" : "plaintext",
                  value: ""
                };
              }
              hover = {contents: markupContent, range};
            }
          });
          if (hover) {
            hover.contents = convertContents(hover.contents);
            return {value: hover};
          }
        };
        for (var _i = 0, dataProviders_1 = dataProviders; _i < dataProviders_1.length; _i++) {
          var provider = dataProviders_1[_i];
          var state_1 = _loop_1(provider);
          if (typeof state_1 === "object")
            return state_1.value;
        }
        return null;
      }
      function getAttrHover(currTag, currAttr, range) {
        var _loop_2 = function(provider2) {
          var hover = null;
          provider2.provideAttributes(currTag).forEach(function(attr2) {
            if (currAttr === attr2.name && attr2.description) {
              var contentsDoc = generateDocumentation(attr2, options, doesSupportMarkdown);
              if (contentsDoc) {
                hover = {contents: contentsDoc, range};
              } else {
                hover = null;
              }
            }
          });
          if (hover) {
            hover.contents = convertContents(hover.contents);
            return {value: hover};
          }
        };
        for (var _i = 0, dataProviders_2 = dataProviders; _i < dataProviders_2.length; _i++) {
          var provider = dataProviders_2[_i];
          var state_2 = _loop_2(provider);
          if (typeof state_2 === "object")
            return state_2.value;
        }
        return null;
      }
      function getAttrValueHover(currTag, currAttr, currAttrValue, range) {
        var _loop_3 = function(provider2) {
          var hover = null;
          provider2.provideValues(currTag, currAttr).forEach(function(attrValue2) {
            if (currAttrValue === attrValue2.name && attrValue2.description) {
              var contentsDoc = generateDocumentation(attrValue2, options, doesSupportMarkdown);
              if (contentsDoc) {
                hover = {contents: contentsDoc, range};
              } else {
                hover = null;
              }
            }
          });
          if (hover) {
            hover.contents = convertContents(hover.contents);
            return {value: hover};
          }
        };
        for (var _i = 0, dataProviders_3 = dataProviders; _i < dataProviders_3.length; _i++) {
          var provider = dataProviders_3[_i];
          var state_3 = _loop_3(provider);
          if (typeof state_3 === "object")
            return state_3.value;
        }
        return null;
      }
      function getEntityHover(text2, range) {
        var currEntity = filterEntity(text2);
        for (var entity in entities) {
          var hover = null;
          var label = "&" + entity;
          if (currEntity === label) {
            var code = entities[entity].charCodeAt(0).toString(16).toUpperCase();
            var hex = "U+";
            if (code.length < 4) {
              var zeroes = 4 - code.length;
              var k = 0;
              while (k < zeroes) {
                hex += "0";
                k += 1;
              }
            }
            hex += code;
            var contentsDoc = localize4("entity.propose", "Character entity representing '" + entities[entity] + "', unicode equivalent '" + hex + "'");
            if (contentsDoc) {
              hover = {contents: contentsDoc, range};
            } else {
              hover = null;
            }
          }
          if (hover) {
            hover.contents = convertContents(hover.contents);
            return hover;
          }
        }
        return null;
      }
      function getTagNameRange2(tokenType, startOffset) {
        var scanner = createScanner(document.getText(), startOffset);
        var token = scanner.scan();
        while (token !== TokenType.EOS && (scanner.getTokenEnd() < offset || scanner.getTokenEnd() === offset && token !== tokenType)) {
          token = scanner.scan();
        }
        if (token === tokenType && offset <= scanner.getTokenEnd()) {
          return {start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd())};
        }
        return null;
      }
      function getEntityRange() {
        var k = offset - 1;
        var characterStart = position.character;
        while (k >= 0 && isLetterOrDigit(text, k)) {
          k--;
          characterStart--;
        }
        var n = k + 1;
        var characterEnd = characterStart;
        while (isLetterOrDigit(text, n)) {
          n++;
          characterEnd++;
        }
        if (k >= 0 && text[k] === "&") {
          var range = null;
          if (text[n] === ";") {
            range = Range2.create(Position2.create(position.line, characterStart), Position2.create(position.line, characterEnd + 1));
          } else {
            range = Range2.create(Position2.create(position.line, characterStart), Position2.create(position.line, characterEnd));
          }
          return range;
        }
        return null;
      }
      function filterEntity(text2) {
        var k = offset - 1;
        var newText = "&";
        while (k >= 0 && isLetterOrDigit(text2, k)) {
          k--;
        }
        k = k + 1;
        while (isLetterOrDigit(text2, k)) {
          newText += text2[k];
          k += 1;
        }
        newText += ";";
        return newText;
      }
      if (node.endTagStart && offset >= node.endTagStart) {
        var tagRange_1 = getTagNameRange2(TokenType.EndTag, node.endTagStart);
        if (tagRange_1) {
          return getTagHover(node.tag, tagRange_1, false);
        }
        return null;
      }
      var tagRange = getTagNameRange2(TokenType.StartTag, node.start);
      if (tagRange) {
        return getTagHover(node.tag, tagRange, true);
      }
      var attrRange = getTagNameRange2(TokenType.AttributeName, node.start);
      if (attrRange) {
        var tag = node.tag;
        var attr = document.getText(attrRange);
        return getAttrHover(tag, attr, attrRange);
      }
      var entityRange = getEntityRange();
      if (entityRange) {
        return getEntityHover(text, entityRange);
      }
      function scanAttrAndAttrValue(nodeStart, attrValueStart) {
        var scanner = createScanner(document.getText(), nodeStart);
        var token = scanner.scan();
        var prevAttr = void 0;
        while (token !== TokenType.EOS && scanner.getTokenEnd() <= attrValueStart) {
          token = scanner.scan();
          if (token === TokenType.AttributeName) {
            prevAttr = scanner.getTokenText();
          }
        }
        return prevAttr;
      }
      var attrValueRange = getTagNameRange2(TokenType.AttributeValue, node.start);
      if (attrValueRange) {
        var tag = node.tag;
        var attrValue = trimQuotes(document.getText(attrValueRange));
        var matchAttr = scanAttrAndAttrValue(node.start, document.offsetAt(attrValueRange.start));
        if (matchAttr) {
          return getAttrValueHover(tag, matchAttr, attrValue, attrValueRange);
        }
      }
      return null;
    };
    HTMLHover2.prototype.convertContents = function(contents) {
      if (!this.doesSupportMarkdown()) {
        if (typeof contents === "string") {
          return contents;
        } else if ("kind" in contents) {
          return {
            kind: "plaintext",
            value: contents.value
          };
        } else if (Array.isArray(contents)) {
          contents.map(function(c) {
            return typeof c === "string" ? c : c.value;
          });
        } else {
          return contents.value;
        }
      }
      return contents;
    };
    HTMLHover2.prototype.doesSupportMarkdown = function() {
      var _a3, _b, _c;
      if (!isDefined(this.supportsMarkdown)) {
        if (!isDefined(this.lsOptions.clientCapabilities)) {
          this.supportsMarkdown = true;
          return this.supportsMarkdown;
        }
        var contentFormat = (_c = (_b = (_a3 = this.lsOptions.clientCapabilities) === null || _a3 === void 0 ? void 0 : _a3.textDocument) === null || _b === void 0 ? void 0 : _b.hover) === null || _c === void 0 ? void 0 : _c.contentFormat;
        this.supportsMarkdown = Array.isArray(contentFormat) && contentFormat.indexOf(MarkupKind.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    };
    return HTMLHover2;
  }();
  function trimQuotes(s) {
    if (s.length <= 1) {
      return s.replace(/['"]/, "");
    }
    if (s[0] === "'" || s[0] === '"') {
      s = s.slice(1);
    }
    if (s[s.length - 1] === "'" || s[s.length - 1] === '"') {
      s = s.slice(0, -1);
    }
    return s;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/beautify/beautify.js
  function js_beautify(js_source_text, options) {
    return js_source_text;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/beautify/beautify-css.js
  var legacy_beautify_css;
  (function() {
    "use strict";
    var __webpack_modules__ = [
      ,
      ,
      function(module) {
        function OutputLine(parent) {
          this.__parent = parent;
          this.__character_count = 0;
          this.__indent_count = -1;
          this.__alignment_count = 0;
          this.__wrap_point_index = 0;
          this.__wrap_point_character_count = 0;
          this.__wrap_point_indent_count = -1;
          this.__wrap_point_alignment_count = 0;
          this.__items = [];
        }
        OutputLine.prototype.clone_empty = function() {
          var line = new OutputLine(this.__parent);
          line.set_indent(this.__indent_count, this.__alignment_count);
          return line;
        };
        OutputLine.prototype.item = function(index) {
          if (index < 0) {
            return this.__items[this.__items.length + index];
          } else {
            return this.__items[index];
          }
        };
        OutputLine.prototype.has_match = function(pattern) {
          for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
            if (this.__items[lastCheckedOutput].match(pattern)) {
              return true;
            }
          }
          return false;
        };
        OutputLine.prototype.set_indent = function(indent, alignment) {
          if (this.is_empty()) {
            this.__indent_count = indent || 0;
            this.__alignment_count = alignment || 0;
            this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
          }
        };
        OutputLine.prototype._set_wrap_point = function() {
          if (this.__parent.wrap_line_length) {
            this.__wrap_point_index = this.__items.length;
            this.__wrap_point_character_count = this.__character_count;
            this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
            this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
          }
        };
        OutputLine.prototype._should_wrap = function() {
          return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
        };
        OutputLine.prototype._allow_wrap = function() {
          if (this._should_wrap()) {
            this.__parent.add_new_line();
            var next = this.__parent.current_line;
            next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
            next.__items = this.__items.slice(this.__wrap_point_index);
            this.__items = this.__items.slice(0, this.__wrap_point_index);
            next.__character_count += this.__character_count - this.__wrap_point_character_count;
            this.__character_count = this.__wrap_point_character_count;
            if (next.__items[0] === " ") {
              next.__items.splice(0, 1);
              next.__character_count -= 1;
            }
            return true;
          }
          return false;
        };
        OutputLine.prototype.is_empty = function() {
          return this.__items.length === 0;
        };
        OutputLine.prototype.last = function() {
          if (!this.is_empty()) {
            return this.__items[this.__items.length - 1];
          } else {
            return null;
          }
        };
        OutputLine.prototype.push = function(item) {
          this.__items.push(item);
          var last_newline_index = item.lastIndexOf("\n");
          if (last_newline_index !== -1) {
            this.__character_count = item.length - last_newline_index;
          } else {
            this.__character_count += item.length;
          }
        };
        OutputLine.prototype.pop = function() {
          var item = null;
          if (!this.is_empty()) {
            item = this.__items.pop();
            this.__character_count -= item.length;
          }
          return item;
        };
        OutputLine.prototype._remove_indent = function() {
          if (this.__indent_count > 0) {
            this.__indent_count -= 1;
            this.__character_count -= this.__parent.indent_size;
          }
        };
        OutputLine.prototype._remove_wrap_indent = function() {
          if (this.__wrap_point_indent_count > 0) {
            this.__wrap_point_indent_count -= 1;
          }
        };
        OutputLine.prototype.trim = function() {
          while (this.last() === " ") {
            this.__items.pop();
            this.__character_count -= 1;
          }
        };
        OutputLine.prototype.toString = function() {
          var result = "";
          if (this.is_empty()) {
            if (this.__parent.indent_empty_lines) {
              result = this.__parent.get_indent_string(this.__indent_count);
            }
          } else {
            result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
            result += this.__items.join("");
          }
          return result;
        };
        function IndentStringCache(options, baseIndentString) {
          this.__cache = [""];
          this.__indent_size = options.indent_size;
          this.__indent_string = options.indent_char;
          if (!options.indent_with_tabs) {
            this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
          }
          baseIndentString = baseIndentString || "";
          if (options.indent_level > 0) {
            baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
          }
          this.__base_string = baseIndentString;
          this.__base_string_length = baseIndentString.length;
        }
        IndentStringCache.prototype.get_indent_size = function(indent, column) {
          var result = this.__base_string_length;
          column = column || 0;
          if (indent < 0) {
            result = 0;
          }
          result += indent * this.__indent_size;
          result += column;
          return result;
        };
        IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
          var result = this.__base_string;
          column = column || 0;
          if (indent_level < 0) {
            indent_level = 0;
            result = "";
          }
          column += indent_level * this.__indent_size;
          this.__ensure_cache(column);
          result += this.__cache[column];
          return result;
        };
        IndentStringCache.prototype.__ensure_cache = function(column) {
          while (column >= this.__cache.length) {
            this.__add_column();
          }
        };
        IndentStringCache.prototype.__add_column = function() {
          var column = this.__cache.length;
          var indent = 0;
          var result = "";
          if (this.__indent_size && column >= this.__indent_size) {
            indent = Math.floor(column / this.__indent_size);
            column -= indent * this.__indent_size;
            result = new Array(indent + 1).join(this.__indent_string);
          }
          if (column) {
            result += new Array(column + 1).join(" ");
          }
          this.__cache.push(result);
        };
        function Output(options, baseIndentString) {
          this.__indent_cache = new IndentStringCache(options, baseIndentString);
          this.raw = false;
          this._end_with_newline = options.end_with_newline;
          this.indent_size = options.indent_size;
          this.wrap_line_length = options.wrap_line_length;
          this.indent_empty_lines = options.indent_empty_lines;
          this.__lines = [];
          this.previous_line = null;
          this.current_line = null;
          this.next_line = new OutputLine(this);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = false;
          this.__add_outputline();
        }
        Output.prototype.__add_outputline = function() {
          this.previous_line = this.current_line;
          this.current_line = this.next_line.clone_empty();
          this.__lines.push(this.current_line);
        };
        Output.prototype.get_line_number = function() {
          return this.__lines.length;
        };
        Output.prototype.get_indent_string = function(indent, column) {
          return this.__indent_cache.get_indent_string(indent, column);
        };
        Output.prototype.get_indent_size = function(indent, column) {
          return this.__indent_cache.get_indent_size(indent, column);
        };
        Output.prototype.is_empty = function() {
          return !this.previous_line && this.current_line.is_empty();
        };
        Output.prototype.add_new_line = function(force_newline) {
          if (this.is_empty() || !force_newline && this.just_added_newline()) {
            return false;
          }
          if (!this.raw) {
            this.__add_outputline();
          }
          return true;
        };
        Output.prototype.get_code = function(eol) {
          this.trim(true);
          var last_item = this.current_line.pop();
          if (last_item) {
            if (last_item[last_item.length - 1] === "\n") {
              last_item = last_item.replace(/\n+$/g, "");
            }
            this.current_line.push(last_item);
          }
          if (this._end_with_newline) {
            this.__add_outputline();
          }
          var sweet_code = this.__lines.join("\n");
          if (eol !== "\n") {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
          }
          return sweet_code;
        };
        Output.prototype.set_wrap_point = function() {
          this.current_line._set_wrap_point();
        };
        Output.prototype.set_indent = function(indent, alignment) {
          indent = indent || 0;
          alignment = alignment || 0;
          this.next_line.set_indent(indent, alignment);
          if (this.__lines.length > 1) {
            this.current_line.set_indent(indent, alignment);
            return true;
          }
          this.current_line.set_indent();
          return false;
        };
        Output.prototype.add_raw_token = function(token) {
          for (var x = 0; x < token.newlines; x++) {
            this.__add_outputline();
          }
          this.current_line.set_indent(-1);
          this.current_line.push(token.whitespace_before);
          this.current_line.push(token.text);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = false;
        };
        Output.prototype.add_token = function(printable_token) {
          this.__add_space_before_token();
          this.current_line.push(printable_token);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = this.current_line._allow_wrap();
        };
        Output.prototype.__add_space_before_token = function() {
          if (this.space_before_token && !this.just_added_newline()) {
            if (!this.non_breaking_space) {
              this.set_wrap_point();
            }
            this.current_line.push(" ");
          }
        };
        Output.prototype.remove_indent = function(index) {
          var output_length = this.__lines.length;
          while (index < output_length) {
            this.__lines[index]._remove_indent();
            index++;
          }
          this.current_line._remove_wrap_indent();
        };
        Output.prototype.trim = function(eat_newlines) {
          eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
          this.current_line.trim();
          while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
            this.__lines.pop();
            this.current_line = this.__lines[this.__lines.length - 1];
            this.current_line.trim();
          }
          this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
        };
        Output.prototype.just_added_newline = function() {
          return this.current_line.is_empty();
        };
        Output.prototype.just_added_blankline = function() {
          return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
        };
        Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
          var index = this.__lines.length - 2;
          while (index >= 0) {
            var potentialEmptyLine = this.__lines[index];
            if (potentialEmptyLine.is_empty()) {
              break;
            } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
              this.__lines.splice(index + 1, 0, new OutputLine(this));
              this.previous_line = this.__lines[this.__lines.length - 2];
              break;
            }
            index--;
          }
        };
        module.exports.Output = Output;
      },
      ,
      ,
      ,
      function(module) {
        function Options(options, merge_child_field) {
          this.raw_options = _mergeOpts(options, merge_child_field);
          this.disabled = this._get_boolean("disabled");
          this.eol = this._get_characters("eol", "auto");
          this.end_with_newline = this._get_boolean("end_with_newline");
          this.indent_size = this._get_number("indent_size", 4);
          this.indent_char = this._get_characters("indent_char", " ");
          this.indent_level = this._get_number("indent_level");
          this.preserve_newlines = this._get_boolean("preserve_newlines", true);
          this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
          if (!this.preserve_newlines) {
            this.max_preserve_newlines = 0;
          }
          this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
          if (this.indent_with_tabs) {
            this.indent_char = "	";
            if (this.indent_size === 1) {
              this.indent_size = 4;
            }
          }
          this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
          this.indent_empty_lines = this._get_boolean("indent_empty_lines");
          this.templating = this._get_selection_list("templating", ["auto", "none", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
        }
        Options.prototype._get_array = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = default_value || [];
          if (typeof option_value === "object") {
            if (option_value !== null && typeof option_value.concat === "function") {
              result = option_value.concat();
            }
          } else if (typeof option_value === "string") {
            result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
          }
          return result;
        };
        Options.prototype._get_boolean = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = option_value === void 0 ? !!default_value : !!option_value;
          return result;
        };
        Options.prototype._get_characters = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = default_value || "";
          if (typeof option_value === "string") {
            result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
          }
          return result;
        };
        Options.prototype._get_number = function(name, default_value) {
          var option_value = this.raw_options[name];
          default_value = parseInt(default_value, 10);
          if (isNaN(default_value)) {
            default_value = 0;
          }
          var result = parseInt(option_value, 10);
          if (isNaN(result)) {
            result = default_value;
          }
          return result;
        };
        Options.prototype._get_selection = function(name, selection_list, default_value) {
          var result = this._get_selection_list(name, selection_list, default_value);
          if (result.length !== 1) {
            throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
          }
          return result[0];
        };
        Options.prototype._get_selection_list = function(name, selection_list, default_value) {
          if (!selection_list || selection_list.length === 0) {
            throw new Error("Selection list cannot be empty.");
          }
          default_value = default_value || [selection_list[0]];
          if (!this._is_valid_selection(default_value, selection_list)) {
            throw new Error("Invalid Default Value!");
          }
          var result = this._get_array(name, default_value);
          if (!this._is_valid_selection(result, selection_list)) {
            throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
          }
          return result;
        };
        Options.prototype._is_valid_selection = function(result, selection_list) {
          return result.length && selection_list.length && !result.some(function(item) {
            return selection_list.indexOf(item) === -1;
          });
        };
        function _mergeOpts(allOptions, childFieldName) {
          var finalOpts = {};
          allOptions = _normalizeOpts(allOptions);
          var name;
          for (name in allOptions) {
            if (name !== childFieldName) {
              finalOpts[name] = allOptions[name];
            }
          }
          if (childFieldName && allOptions[childFieldName]) {
            for (name in allOptions[childFieldName]) {
              finalOpts[name] = allOptions[childFieldName][name];
            }
          }
          return finalOpts;
        }
        function _normalizeOpts(options) {
          var convertedOpts = {};
          var key;
          for (key in options) {
            var newKey = key.replace(/-/g, "_");
            convertedOpts[newKey] = options[key];
          }
          return convertedOpts;
        }
        module.exports.Options = Options;
        module.exports.normalizeOpts = _normalizeOpts;
        module.exports.mergeOpts = _mergeOpts;
      },
      ,
      function(module) {
        var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
        function InputScanner(input_string) {
          this.__input = input_string || "";
          this.__input_length = this.__input.length;
          this.__position = 0;
        }
        InputScanner.prototype.restart = function() {
          this.__position = 0;
        };
        InputScanner.prototype.back = function() {
          if (this.__position > 0) {
            this.__position -= 1;
          }
        };
        InputScanner.prototype.hasNext = function() {
          return this.__position < this.__input_length;
        };
        InputScanner.prototype.next = function() {
          var val = null;
          if (this.hasNext()) {
            val = this.__input.charAt(this.__position);
            this.__position += 1;
          }
          return val;
        };
        InputScanner.prototype.peek = function(index) {
          var val = null;
          index = index || 0;
          index += this.__position;
          if (index >= 0 && index < this.__input_length) {
            val = this.__input.charAt(index);
          }
          return val;
        };
        InputScanner.prototype.__match = function(pattern, index) {
          pattern.lastIndex = index;
          var pattern_match = pattern.exec(this.__input);
          if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
            if (pattern_match.index !== index) {
              pattern_match = null;
            }
          }
          return pattern_match;
        };
        InputScanner.prototype.test = function(pattern, index) {
          index = index || 0;
          index += this.__position;
          if (index >= 0 && index < this.__input_length) {
            return !!this.__match(pattern, index);
          } else {
            return false;
          }
        };
        InputScanner.prototype.testChar = function(pattern, index) {
          var val = this.peek(index);
          pattern.lastIndex = 0;
          return val !== null && pattern.test(val);
        };
        InputScanner.prototype.match = function(pattern) {
          var pattern_match = this.__match(pattern, this.__position);
          if (pattern_match) {
            this.__position += pattern_match[0].length;
          } else {
            pattern_match = null;
          }
          return pattern_match;
        };
        InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
          var val = "";
          var match;
          if (starting_pattern) {
            match = this.match(starting_pattern);
            if (match) {
              val += match[0];
            }
          }
          if (until_pattern && (match || !starting_pattern)) {
            val += this.readUntil(until_pattern, until_after);
          }
          return val;
        };
        InputScanner.prototype.readUntil = function(pattern, until_after) {
          var val = "";
          var match_index = this.__position;
          pattern.lastIndex = this.__position;
          var pattern_match = pattern.exec(this.__input);
          if (pattern_match) {
            match_index = pattern_match.index;
            if (until_after) {
              match_index += pattern_match[0].length;
            }
          } else {
            match_index = this.__input_length;
          }
          val = this.__input.substring(this.__position, match_index);
          this.__position = match_index;
          return val;
        };
        InputScanner.prototype.readUntilAfter = function(pattern) {
          return this.readUntil(pattern, true);
        };
        InputScanner.prototype.get_regexp = function(pattern, match_from) {
          var result = null;
          var flags = "g";
          if (match_from && regexp_has_sticky) {
            flags = "y";
          }
          if (typeof pattern === "string" && pattern !== "") {
            result = new RegExp(pattern, flags);
          } else if (pattern) {
            result = new RegExp(pattern.source, flags);
          }
          return result;
        };
        InputScanner.prototype.get_literal_regexp = function(literal_string) {
          return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
        };
        InputScanner.prototype.peekUntilAfter = function(pattern) {
          var start = this.__position;
          var val = this.readUntilAfter(pattern);
          this.__position = start;
          return val;
        };
        InputScanner.prototype.lookBack = function(testVal) {
          var start = this.__position - 1;
          return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
        };
        module.exports.InputScanner = InputScanner;
      },
      ,
      ,
      ,
      ,
      function(module) {
        function Directives(start_block_pattern, end_block_pattern) {
          start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
          end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
          this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
          this.__directive_pattern = / (\w+)[:](\w+)/g;
          this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
        }
        Directives.prototype.get_directives = function(text) {
          if (!text.match(this.__directives_block_pattern)) {
            return null;
          }
          var directives = {};
          this.__directive_pattern.lastIndex = 0;
          var directive_match = this.__directive_pattern.exec(text);
          while (directive_match) {
            directives[directive_match[1]] = directive_match[2];
            directive_match = this.__directive_pattern.exec(text);
          }
          return directives;
        };
        Directives.prototype.readIgnored = function(input) {
          return input.readUntilAfter(this.__directives_end_ignore_pattern);
        };
        module.exports.Directives = Directives;
      },
      ,
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Beautifier = __webpack_require__2(16).Beautifier, Options = __webpack_require__2(17).Options;
        function css_beautify2(source_text, options) {
          var beautifier = new Beautifier(source_text, options);
          return beautifier.beautify();
        }
        module.exports = css_beautify2;
        module.exports.defaultOptions = function() {
          return new Options();
        };
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Options = __webpack_require__2(17).Options;
        var Output = __webpack_require__2(2).Output;
        var InputScanner = __webpack_require__2(8).InputScanner;
        var Directives = __webpack_require__2(13).Directives;
        var directives_core = new Directives(/\/\*/, /\*\//);
        var lineBreak = /\r\n|[\r\n]/;
        var allLineBreaks = /\r\n|[\r\n]/g;
        var whitespaceChar = /\s/;
        var whitespacePattern = /(?:\s|\n)+/g;
        var block_comment_pattern = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g;
        var comment_pattern = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
        function Beautifier(source_text, options) {
          this._source_text = source_text || "";
          this._options = new Options(options);
          this._ch = null;
          this._input = null;
          this.NESTED_AT_RULE = {
            "@page": true,
            "@font-face": true,
            "@keyframes": true,
            "@media": true,
            "@supports": true,
            "@document": true
          };
          this.CONDITIONAL_GROUP_RULE = {
            "@media": true,
            "@supports": true,
            "@document": true
          };
        }
        Beautifier.prototype.eatString = function(endChars) {
          var result = "";
          this._ch = this._input.next();
          while (this._ch) {
            result += this._ch;
            if (this._ch === "\\") {
              result += this._input.next();
            } else if (endChars.indexOf(this._ch) !== -1 || this._ch === "\n") {
              break;
            }
            this._ch = this._input.next();
          }
          return result;
        };
        Beautifier.prototype.eatWhitespace = function(allowAtLeastOneNewLine) {
          var result = whitespaceChar.test(this._input.peek());
          var newline_count = 0;
          while (whitespaceChar.test(this._input.peek())) {
            this._ch = this._input.next();
            if (allowAtLeastOneNewLine && this._ch === "\n") {
              if (newline_count === 0 || newline_count < this._options.max_preserve_newlines) {
                newline_count++;
                this._output.add_new_line(true);
              }
            }
          }
          return result;
        };
        Beautifier.prototype.foundNestedPseudoClass = function() {
          var openParen = 0;
          var i = 1;
          var ch = this._input.peek(i);
          while (ch) {
            if (ch === "{") {
              return true;
            } else if (ch === "(") {
              openParen += 1;
            } else if (ch === ")") {
              if (openParen === 0) {
                return false;
              }
              openParen -= 1;
            } else if (ch === ";" || ch === "}") {
              return false;
            }
            i++;
            ch = this._input.peek(i);
          }
          return false;
        };
        Beautifier.prototype.print_string = function(output_string) {
          this._output.set_indent(this._indentLevel);
          this._output.non_breaking_space = true;
          this._output.add_token(output_string);
        };
        Beautifier.prototype.preserveSingleSpace = function(isAfterSpace) {
          if (isAfterSpace) {
            this._output.space_before_token = true;
          }
        };
        Beautifier.prototype.indent = function() {
          this._indentLevel++;
        };
        Beautifier.prototype.outdent = function() {
          if (this._indentLevel > 0) {
            this._indentLevel--;
          }
        };
        Beautifier.prototype.beautify = function() {
          if (this._options.disabled) {
            return this._source_text;
          }
          var source_text = this._source_text;
          var eol = this._options.eol;
          if (eol === "auto") {
            eol = "\n";
            if (source_text && lineBreak.test(source_text || "")) {
              eol = source_text.match(lineBreak)[0];
            }
          }
          source_text = source_text.replace(allLineBreaks, "\n");
          var baseIndentString = source_text.match(/^[\t ]*/)[0];
          this._output = new Output(this._options, baseIndentString);
          this._input = new InputScanner(source_text);
          this._indentLevel = 0;
          this._nestedLevel = 0;
          this._ch = null;
          var parenLevel = 0;
          var insideRule = false;
          var insidePropertyValue = false;
          var enteringConditionalGroup = false;
          var insideAtExtend = false;
          var insideAtImport = false;
          var topCharacter = this._ch;
          var whitespace;
          var isAfterSpace;
          var previous_ch;
          while (true) {
            whitespace = this._input.read(whitespacePattern);
            isAfterSpace = whitespace !== "";
            previous_ch = topCharacter;
            this._ch = this._input.next();
            if (this._ch === "\\" && this._input.hasNext()) {
              this._ch += this._input.next();
            }
            topCharacter = this._ch;
            if (!this._ch) {
              break;
            } else if (this._ch === "/" && this._input.peek() === "*") {
              this._output.add_new_line();
              this._input.back();
              var comment = this._input.read(block_comment_pattern);
              var directives = directives_core.get_directives(comment);
              if (directives && directives.ignore === "start") {
                comment += directives_core.readIgnored(this._input);
              }
              this.print_string(comment);
              this.eatWhitespace(true);
              this._output.add_new_line();
            } else if (this._ch === "/" && this._input.peek() === "/") {
              this._output.space_before_token = true;
              this._input.back();
              this.print_string(this._input.read(comment_pattern));
              this.eatWhitespace(true);
            } else if (this._ch === "@") {
              this.preserveSingleSpace(isAfterSpace);
              if (this._input.peek() === "{") {
                this.print_string(this._ch + this.eatString("}"));
              } else {
                this.print_string(this._ch);
                var variableOrRule = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                if (variableOrRule.match(/[ :]$/)) {
                  variableOrRule = this.eatString(": ").replace(/\s$/, "");
                  this.print_string(variableOrRule);
                  this._output.space_before_token = true;
                }
                variableOrRule = variableOrRule.replace(/\s$/, "");
                if (variableOrRule === "extend") {
                  insideAtExtend = true;
                } else if (variableOrRule === "import") {
                  insideAtImport = true;
                }
                if (variableOrRule in this.NESTED_AT_RULE) {
                  this._nestedLevel += 1;
                  if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                    enteringConditionalGroup = true;
                  }
                } else if (!insideRule && parenLevel === 0 && variableOrRule.indexOf(":") !== -1) {
                  insidePropertyValue = true;
                  this.indent();
                }
              }
            } else if (this._ch === "#" && this._input.peek() === "{") {
              this.preserveSingleSpace(isAfterSpace);
              this.print_string(this._ch + this.eatString("}"));
            } else if (this._ch === "{") {
              if (insidePropertyValue) {
                insidePropertyValue = false;
                this.outdent();
              }
              if (enteringConditionalGroup) {
                enteringConditionalGroup = false;
                insideRule = this._indentLevel >= this._nestedLevel;
              } else {
                insideRule = this._indentLevel >= this._nestedLevel - 1;
              }
              if (this._options.newline_between_rules && insideRule) {
                if (this._output.previous_line && this._output.previous_line.item(-1) !== "{") {
                  this._output.ensure_empty_line_above("/", ",");
                }
              }
              this._output.space_before_token = true;
              if (this._options.brace_style === "expand") {
                this._output.add_new_line();
                this.print_string(this._ch);
                this.indent();
                this._output.set_indent(this._indentLevel);
              } else {
                this.indent();
                this.print_string(this._ch);
              }
              this.eatWhitespace(true);
              this._output.add_new_line();
            } else if (this._ch === "}") {
              this.outdent();
              this._output.add_new_line();
              if (previous_ch === "{") {
                this._output.trim(true);
              }
              insideAtImport = false;
              insideAtExtend = false;
              if (insidePropertyValue) {
                this.outdent();
                insidePropertyValue = false;
              }
              this.print_string(this._ch);
              insideRule = false;
              if (this._nestedLevel) {
                this._nestedLevel--;
              }
              this.eatWhitespace(true);
              this._output.add_new_line();
              if (this._options.newline_between_rules && !this._output.just_added_blankline()) {
                if (this._input.peek() !== "}") {
                  this._output.add_new_line(true);
                }
              }
            } else if (this._ch === ":") {
              if ((insideRule || enteringConditionalGroup) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !insideAtExtend && parenLevel === 0) {
                this.print_string(":");
                if (!insidePropertyValue) {
                  insidePropertyValue = true;
                  this._output.space_before_token = true;
                  this.eatWhitespace(true);
                  this.indent();
                }
              } else {
                if (this._input.lookBack(" ")) {
                  this._output.space_before_token = true;
                }
                if (this._input.peek() === ":") {
                  this._ch = this._input.next();
                  this.print_string("::");
                } else {
                  this.print_string(":");
                }
              }
            } else if (this._ch === '"' || this._ch === "'") {
              this.preserveSingleSpace(isAfterSpace);
              this.print_string(this._ch + this.eatString(this._ch));
              this.eatWhitespace(true);
            } else if (this._ch === ";") {
              if (parenLevel === 0) {
                if (insidePropertyValue) {
                  this.outdent();
                  insidePropertyValue = false;
                }
                insideAtExtend = false;
                insideAtImport = false;
                this.print_string(this._ch);
                this.eatWhitespace(true);
                if (this._input.peek() !== "/") {
                  this._output.add_new_line();
                }
              } else {
                this.print_string(this._ch);
                this.eatWhitespace(true);
                this._output.space_before_token = true;
              }
            } else if (this._ch === "(") {
              if (this._input.lookBack("url")) {
                this.print_string(this._ch);
                this.eatWhitespace();
                parenLevel++;
                this.indent();
                this._ch = this._input.next();
                if (this._ch === ")" || this._ch === '"' || this._ch === "'") {
                  this._input.back();
                } else if (this._ch) {
                  this.print_string(this._ch + this.eatString(")"));
                  if (parenLevel) {
                    parenLevel--;
                    this.outdent();
                  }
                }
              } else {
                this.preserveSingleSpace(isAfterSpace);
                this.print_string(this._ch);
                this.eatWhitespace();
                parenLevel++;
                this.indent();
              }
            } else if (this._ch === ")") {
              if (parenLevel) {
                parenLevel--;
                this.outdent();
              }
              this.print_string(this._ch);
            } else if (this._ch === ",") {
              this.print_string(this._ch);
              this.eatWhitespace(true);
              if (this._options.selector_separator_newline && !insidePropertyValue && parenLevel === 0 && !insideAtImport && !insideAtExtend) {
                this._output.add_new_line();
              } else {
                this._output.space_before_token = true;
              }
            } else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !insidePropertyValue && parenLevel === 0) {
              if (this._options.space_around_combinator) {
                this._output.space_before_token = true;
                this.print_string(this._ch);
                this._output.space_before_token = true;
              } else {
                this.print_string(this._ch);
                this.eatWhitespace();
                if (this._ch && whitespaceChar.test(this._ch)) {
                  this._ch = "";
                }
              }
            } else if (this._ch === "]") {
              this.print_string(this._ch);
            } else if (this._ch === "[") {
              this.preserveSingleSpace(isAfterSpace);
              this.print_string(this._ch);
            } else if (this._ch === "=") {
              this.eatWhitespace();
              this.print_string("=");
              if (whitespaceChar.test(this._ch)) {
                this._ch = "";
              }
            } else if (this._ch === "!" && !this._input.lookBack("\\")) {
              this.print_string(" ");
              this.print_string(this._ch);
            } else {
              this.preserveSingleSpace(isAfterSpace);
              this.print_string(this._ch);
            }
          }
          var sweetCode = this._output.get_code(eol);
          return sweetCode;
        };
        module.exports.Beautifier = Beautifier;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var BaseOptions = __webpack_require__2(6).Options;
        function Options(options) {
          BaseOptions.call(this, options, "css");
          this.selector_separator_newline = this._get_boolean("selector_separator_newline", true);
          this.newline_between_rules = this._get_boolean("newline_between_rules", true);
          var space_around_selector_separator = this._get_boolean("space_around_selector_separator");
          this.space_around_combinator = this._get_boolean("space_around_combinator") || space_around_selector_separator;
          var brace_style_split = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
          this.brace_style = "collapse";
          for (var bs = 0; bs < brace_style_split.length; bs++) {
            if (brace_style_split[bs] !== "expand") {
              this.brace_style = "collapse";
            } else {
              this.brace_style = brace_style_split[bs];
            }
          }
        }
        Options.prototype = new BaseOptions();
        module.exports.Options = Options;
      }
    ];
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== void 0) {
        return cachedModule.exports;
      }
      var module = __webpack_module_cache__[moduleId] = {
        exports: {}
      };
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    var __webpack_exports__ = __webpack_require__(15);
    legacy_beautify_css = __webpack_exports__;
  })();
  var css_beautify = legacy_beautify_css;

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/beautify/beautify-html.js
  var legacy_beautify_html;
  (function() {
    "use strict";
    var __webpack_modules__ = [
      ,
      ,
      function(module) {
        function OutputLine(parent) {
          this.__parent = parent;
          this.__character_count = 0;
          this.__indent_count = -1;
          this.__alignment_count = 0;
          this.__wrap_point_index = 0;
          this.__wrap_point_character_count = 0;
          this.__wrap_point_indent_count = -1;
          this.__wrap_point_alignment_count = 0;
          this.__items = [];
        }
        OutputLine.prototype.clone_empty = function() {
          var line = new OutputLine(this.__parent);
          line.set_indent(this.__indent_count, this.__alignment_count);
          return line;
        };
        OutputLine.prototype.item = function(index) {
          if (index < 0) {
            return this.__items[this.__items.length + index];
          } else {
            return this.__items[index];
          }
        };
        OutputLine.prototype.has_match = function(pattern) {
          for (var lastCheckedOutput = this.__items.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
            if (this.__items[lastCheckedOutput].match(pattern)) {
              return true;
            }
          }
          return false;
        };
        OutputLine.prototype.set_indent = function(indent, alignment) {
          if (this.is_empty()) {
            this.__indent_count = indent || 0;
            this.__alignment_count = alignment || 0;
            this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count);
          }
        };
        OutputLine.prototype._set_wrap_point = function() {
          if (this.__parent.wrap_line_length) {
            this.__wrap_point_index = this.__items.length;
            this.__wrap_point_character_count = this.__character_count;
            this.__wrap_point_indent_count = this.__parent.next_line.__indent_count;
            this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count;
          }
        };
        OutputLine.prototype._should_wrap = function() {
          return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
        };
        OutputLine.prototype._allow_wrap = function() {
          if (this._should_wrap()) {
            this.__parent.add_new_line();
            var next = this.__parent.current_line;
            next.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count);
            next.__items = this.__items.slice(this.__wrap_point_index);
            this.__items = this.__items.slice(0, this.__wrap_point_index);
            next.__character_count += this.__character_count - this.__wrap_point_character_count;
            this.__character_count = this.__wrap_point_character_count;
            if (next.__items[0] === " ") {
              next.__items.splice(0, 1);
              next.__character_count -= 1;
            }
            return true;
          }
          return false;
        };
        OutputLine.prototype.is_empty = function() {
          return this.__items.length === 0;
        };
        OutputLine.prototype.last = function() {
          if (!this.is_empty()) {
            return this.__items[this.__items.length - 1];
          } else {
            return null;
          }
        };
        OutputLine.prototype.push = function(item) {
          this.__items.push(item);
          var last_newline_index = item.lastIndexOf("\n");
          if (last_newline_index !== -1) {
            this.__character_count = item.length - last_newline_index;
          } else {
            this.__character_count += item.length;
          }
        };
        OutputLine.prototype.pop = function() {
          var item = null;
          if (!this.is_empty()) {
            item = this.__items.pop();
            this.__character_count -= item.length;
          }
          return item;
        };
        OutputLine.prototype._remove_indent = function() {
          if (this.__indent_count > 0) {
            this.__indent_count -= 1;
            this.__character_count -= this.__parent.indent_size;
          }
        };
        OutputLine.prototype._remove_wrap_indent = function() {
          if (this.__wrap_point_indent_count > 0) {
            this.__wrap_point_indent_count -= 1;
          }
        };
        OutputLine.prototype.trim = function() {
          while (this.last() === " ") {
            this.__items.pop();
            this.__character_count -= 1;
          }
        };
        OutputLine.prototype.toString = function() {
          var result = "";
          if (this.is_empty()) {
            if (this.__parent.indent_empty_lines) {
              result = this.__parent.get_indent_string(this.__indent_count);
            }
          } else {
            result = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count);
            result += this.__items.join("");
          }
          return result;
        };
        function IndentStringCache(options, baseIndentString) {
          this.__cache = [""];
          this.__indent_size = options.indent_size;
          this.__indent_string = options.indent_char;
          if (!options.indent_with_tabs) {
            this.__indent_string = new Array(options.indent_size + 1).join(options.indent_char);
          }
          baseIndentString = baseIndentString || "";
          if (options.indent_level > 0) {
            baseIndentString = new Array(options.indent_level + 1).join(this.__indent_string);
          }
          this.__base_string = baseIndentString;
          this.__base_string_length = baseIndentString.length;
        }
        IndentStringCache.prototype.get_indent_size = function(indent, column) {
          var result = this.__base_string_length;
          column = column || 0;
          if (indent < 0) {
            result = 0;
          }
          result += indent * this.__indent_size;
          result += column;
          return result;
        };
        IndentStringCache.prototype.get_indent_string = function(indent_level, column) {
          var result = this.__base_string;
          column = column || 0;
          if (indent_level < 0) {
            indent_level = 0;
            result = "";
          }
          column += indent_level * this.__indent_size;
          this.__ensure_cache(column);
          result += this.__cache[column];
          return result;
        };
        IndentStringCache.prototype.__ensure_cache = function(column) {
          while (column >= this.__cache.length) {
            this.__add_column();
          }
        };
        IndentStringCache.prototype.__add_column = function() {
          var column = this.__cache.length;
          var indent = 0;
          var result = "";
          if (this.__indent_size && column >= this.__indent_size) {
            indent = Math.floor(column / this.__indent_size);
            column -= indent * this.__indent_size;
            result = new Array(indent + 1).join(this.__indent_string);
          }
          if (column) {
            result += new Array(column + 1).join(" ");
          }
          this.__cache.push(result);
        };
        function Output(options, baseIndentString) {
          this.__indent_cache = new IndentStringCache(options, baseIndentString);
          this.raw = false;
          this._end_with_newline = options.end_with_newline;
          this.indent_size = options.indent_size;
          this.wrap_line_length = options.wrap_line_length;
          this.indent_empty_lines = options.indent_empty_lines;
          this.__lines = [];
          this.previous_line = null;
          this.current_line = null;
          this.next_line = new OutputLine(this);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = false;
          this.__add_outputline();
        }
        Output.prototype.__add_outputline = function() {
          this.previous_line = this.current_line;
          this.current_line = this.next_line.clone_empty();
          this.__lines.push(this.current_line);
        };
        Output.prototype.get_line_number = function() {
          return this.__lines.length;
        };
        Output.prototype.get_indent_string = function(indent, column) {
          return this.__indent_cache.get_indent_string(indent, column);
        };
        Output.prototype.get_indent_size = function(indent, column) {
          return this.__indent_cache.get_indent_size(indent, column);
        };
        Output.prototype.is_empty = function() {
          return !this.previous_line && this.current_line.is_empty();
        };
        Output.prototype.add_new_line = function(force_newline) {
          if (this.is_empty() || !force_newline && this.just_added_newline()) {
            return false;
          }
          if (!this.raw) {
            this.__add_outputline();
          }
          return true;
        };
        Output.prototype.get_code = function(eol) {
          this.trim(true);
          var last_item = this.current_line.pop();
          if (last_item) {
            if (last_item[last_item.length - 1] === "\n") {
              last_item = last_item.replace(/\n+$/g, "");
            }
            this.current_line.push(last_item);
          }
          if (this._end_with_newline) {
            this.__add_outputline();
          }
          var sweet_code = this.__lines.join("\n");
          if (eol !== "\n") {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
          }
          return sweet_code;
        };
        Output.prototype.set_wrap_point = function() {
          this.current_line._set_wrap_point();
        };
        Output.prototype.set_indent = function(indent, alignment) {
          indent = indent || 0;
          alignment = alignment || 0;
          this.next_line.set_indent(indent, alignment);
          if (this.__lines.length > 1) {
            this.current_line.set_indent(indent, alignment);
            return true;
          }
          this.current_line.set_indent();
          return false;
        };
        Output.prototype.add_raw_token = function(token) {
          for (var x = 0; x < token.newlines; x++) {
            this.__add_outputline();
          }
          this.current_line.set_indent(-1);
          this.current_line.push(token.whitespace_before);
          this.current_line.push(token.text);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = false;
        };
        Output.prototype.add_token = function(printable_token) {
          this.__add_space_before_token();
          this.current_line.push(printable_token);
          this.space_before_token = false;
          this.non_breaking_space = false;
          this.previous_token_wrapped = this.current_line._allow_wrap();
        };
        Output.prototype.__add_space_before_token = function() {
          if (this.space_before_token && !this.just_added_newline()) {
            if (!this.non_breaking_space) {
              this.set_wrap_point();
            }
            this.current_line.push(" ");
          }
        };
        Output.prototype.remove_indent = function(index) {
          var output_length = this.__lines.length;
          while (index < output_length) {
            this.__lines[index]._remove_indent();
            index++;
          }
          this.current_line._remove_wrap_indent();
        };
        Output.prototype.trim = function(eat_newlines) {
          eat_newlines = eat_newlines === void 0 ? false : eat_newlines;
          this.current_line.trim();
          while (eat_newlines && this.__lines.length > 1 && this.current_line.is_empty()) {
            this.__lines.pop();
            this.current_line = this.__lines[this.__lines.length - 1];
            this.current_line.trim();
          }
          this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
        };
        Output.prototype.just_added_newline = function() {
          return this.current_line.is_empty();
        };
        Output.prototype.just_added_blankline = function() {
          return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
        };
        Output.prototype.ensure_empty_line_above = function(starts_with, ends_with) {
          var index = this.__lines.length - 2;
          while (index >= 0) {
            var potentialEmptyLine = this.__lines[index];
            if (potentialEmptyLine.is_empty()) {
              break;
            } else if (potentialEmptyLine.item(0).indexOf(starts_with) !== 0 && potentialEmptyLine.item(-1) !== ends_with) {
              this.__lines.splice(index + 1, 0, new OutputLine(this));
              this.previous_line = this.__lines[this.__lines.length - 2];
              break;
            }
            index--;
          }
        };
        module.exports.Output = Output;
      },
      function(module) {
        function Token2(type, text, newlines, whitespace_before) {
          this.type = type;
          this.text = text;
          this.comments_before = null;
          this.newlines = newlines || 0;
          this.whitespace_before = whitespace_before || "";
          this.parent = null;
          this.next = null;
          this.previous = null;
          this.opened = null;
          this.closed = null;
          this.directives = null;
        }
        module.exports.Token = Token2;
      },
      ,
      ,
      function(module) {
        function Options(options, merge_child_field) {
          this.raw_options = _mergeOpts(options, merge_child_field);
          this.disabled = this._get_boolean("disabled");
          this.eol = this._get_characters("eol", "auto");
          this.end_with_newline = this._get_boolean("end_with_newline");
          this.indent_size = this._get_number("indent_size", 4);
          this.indent_char = this._get_characters("indent_char", " ");
          this.indent_level = this._get_number("indent_level");
          this.preserve_newlines = this._get_boolean("preserve_newlines", true);
          this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786);
          if (!this.preserve_newlines) {
            this.max_preserve_newlines = 0;
          }
          this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	");
          if (this.indent_with_tabs) {
            this.indent_char = "	";
            if (this.indent_size === 1) {
              this.indent_size = 4;
            }
          }
          this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char"));
          this.indent_empty_lines = this._get_boolean("indent_empty_lines");
          this.templating = this._get_selection_list("templating", ["auto", "none", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
        }
        Options.prototype._get_array = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = default_value || [];
          if (typeof option_value === "object") {
            if (option_value !== null && typeof option_value.concat === "function") {
              result = option_value.concat();
            }
          } else if (typeof option_value === "string") {
            result = option_value.split(/[^a-zA-Z0-9_\/\-]+/);
          }
          return result;
        };
        Options.prototype._get_boolean = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = option_value === void 0 ? !!default_value : !!option_value;
          return result;
        };
        Options.prototype._get_characters = function(name, default_value) {
          var option_value = this.raw_options[name];
          var result = default_value || "";
          if (typeof option_value === "string") {
            result = option_value.replace(/\\r/, "\r").replace(/\\n/, "\n").replace(/\\t/, "	");
          }
          return result;
        };
        Options.prototype._get_number = function(name, default_value) {
          var option_value = this.raw_options[name];
          default_value = parseInt(default_value, 10);
          if (isNaN(default_value)) {
            default_value = 0;
          }
          var result = parseInt(option_value, 10);
          if (isNaN(result)) {
            result = default_value;
          }
          return result;
        };
        Options.prototype._get_selection = function(name, selection_list, default_value) {
          var result = this._get_selection_list(name, selection_list, default_value);
          if (result.length !== 1) {
            throw new Error("Invalid Option Value: The option '" + name + "' can only be one of the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
          }
          return result[0];
        };
        Options.prototype._get_selection_list = function(name, selection_list, default_value) {
          if (!selection_list || selection_list.length === 0) {
            throw new Error("Selection list cannot be empty.");
          }
          default_value = default_value || [selection_list[0]];
          if (!this._is_valid_selection(default_value, selection_list)) {
            throw new Error("Invalid Default Value!");
          }
          var result = this._get_array(name, default_value);
          if (!this._is_valid_selection(result, selection_list)) {
            throw new Error("Invalid Option Value: The option '" + name + "' can contain only the following values:\n" + selection_list + "\nYou passed in: '" + this.raw_options[name] + "'");
          }
          return result;
        };
        Options.prototype._is_valid_selection = function(result, selection_list) {
          return result.length && selection_list.length && !result.some(function(item) {
            return selection_list.indexOf(item) === -1;
          });
        };
        function _mergeOpts(allOptions, childFieldName) {
          var finalOpts = {};
          allOptions = _normalizeOpts(allOptions);
          var name;
          for (name in allOptions) {
            if (name !== childFieldName) {
              finalOpts[name] = allOptions[name];
            }
          }
          if (childFieldName && allOptions[childFieldName]) {
            for (name in allOptions[childFieldName]) {
              finalOpts[name] = allOptions[childFieldName][name];
            }
          }
          return finalOpts;
        }
        function _normalizeOpts(options) {
          var convertedOpts = {};
          var key;
          for (key in options) {
            var newKey = key.replace(/-/g, "_");
            convertedOpts[newKey] = options[key];
          }
          return convertedOpts;
        }
        module.exports.Options = Options;
        module.exports.normalizeOpts = _normalizeOpts;
        module.exports.mergeOpts = _mergeOpts;
      },
      ,
      function(module) {
        var regexp_has_sticky = RegExp.prototype.hasOwnProperty("sticky");
        function InputScanner(input_string) {
          this.__input = input_string || "";
          this.__input_length = this.__input.length;
          this.__position = 0;
        }
        InputScanner.prototype.restart = function() {
          this.__position = 0;
        };
        InputScanner.prototype.back = function() {
          if (this.__position > 0) {
            this.__position -= 1;
          }
        };
        InputScanner.prototype.hasNext = function() {
          return this.__position < this.__input_length;
        };
        InputScanner.prototype.next = function() {
          var val = null;
          if (this.hasNext()) {
            val = this.__input.charAt(this.__position);
            this.__position += 1;
          }
          return val;
        };
        InputScanner.prototype.peek = function(index) {
          var val = null;
          index = index || 0;
          index += this.__position;
          if (index >= 0 && index < this.__input_length) {
            val = this.__input.charAt(index);
          }
          return val;
        };
        InputScanner.prototype.__match = function(pattern, index) {
          pattern.lastIndex = index;
          var pattern_match = pattern.exec(this.__input);
          if (pattern_match && !(regexp_has_sticky && pattern.sticky)) {
            if (pattern_match.index !== index) {
              pattern_match = null;
            }
          }
          return pattern_match;
        };
        InputScanner.prototype.test = function(pattern, index) {
          index = index || 0;
          index += this.__position;
          if (index >= 0 && index < this.__input_length) {
            return !!this.__match(pattern, index);
          } else {
            return false;
          }
        };
        InputScanner.prototype.testChar = function(pattern, index) {
          var val = this.peek(index);
          pattern.lastIndex = 0;
          return val !== null && pattern.test(val);
        };
        InputScanner.prototype.match = function(pattern) {
          var pattern_match = this.__match(pattern, this.__position);
          if (pattern_match) {
            this.__position += pattern_match[0].length;
          } else {
            pattern_match = null;
          }
          return pattern_match;
        };
        InputScanner.prototype.read = function(starting_pattern, until_pattern, until_after) {
          var val = "";
          var match;
          if (starting_pattern) {
            match = this.match(starting_pattern);
            if (match) {
              val += match[0];
            }
          }
          if (until_pattern && (match || !starting_pattern)) {
            val += this.readUntil(until_pattern, until_after);
          }
          return val;
        };
        InputScanner.prototype.readUntil = function(pattern, until_after) {
          var val = "";
          var match_index = this.__position;
          pattern.lastIndex = this.__position;
          var pattern_match = pattern.exec(this.__input);
          if (pattern_match) {
            match_index = pattern_match.index;
            if (until_after) {
              match_index += pattern_match[0].length;
            }
          } else {
            match_index = this.__input_length;
          }
          val = this.__input.substring(this.__position, match_index);
          this.__position = match_index;
          return val;
        };
        InputScanner.prototype.readUntilAfter = function(pattern) {
          return this.readUntil(pattern, true);
        };
        InputScanner.prototype.get_regexp = function(pattern, match_from) {
          var result = null;
          var flags = "g";
          if (match_from && regexp_has_sticky) {
            flags = "y";
          }
          if (typeof pattern === "string" && pattern !== "") {
            result = new RegExp(pattern, flags);
          } else if (pattern) {
            result = new RegExp(pattern.source, flags);
          }
          return result;
        };
        InputScanner.prototype.get_literal_regexp = function(literal_string) {
          return RegExp(literal_string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
        };
        InputScanner.prototype.peekUntilAfter = function(pattern) {
          var start = this.__position;
          var val = this.readUntilAfter(pattern);
          this.__position = start;
          return val;
        };
        InputScanner.prototype.lookBack = function(testVal) {
          var start = this.__position - 1;
          return start >= testVal.length && this.__input.substring(start - testVal.length, start).toLowerCase() === testVal;
        };
        module.exports.InputScanner = InputScanner;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var InputScanner = __webpack_require__2(8).InputScanner;
        var Token2 = __webpack_require__2(3).Token;
        var TokenStream = __webpack_require__2(10).TokenStream;
        var WhitespacePattern = __webpack_require__2(11).WhitespacePattern;
        var TOKEN = {
          START: "TK_START",
          RAW: "TK_RAW",
          EOF: "TK_EOF"
        };
        var Tokenizer = function(input_string, options) {
          this._input = new InputScanner(input_string);
          this._options = options || {};
          this.__tokens = null;
          this._patterns = {};
          this._patterns.whitespace = new WhitespacePattern(this._input);
        };
        Tokenizer.prototype.tokenize = function() {
          this._input.restart();
          this.__tokens = new TokenStream();
          this._reset();
          var current;
          var previous = new Token2(TOKEN.START, "");
          var open_token = null;
          var open_stack = [];
          var comments = new TokenStream();
          while (previous.type !== TOKEN.EOF) {
            current = this._get_next_token(previous, open_token);
            while (this._is_comment(current)) {
              comments.add(current);
              current = this._get_next_token(previous, open_token);
            }
            if (!comments.isEmpty()) {
              current.comments_before = comments;
              comments = new TokenStream();
            }
            current.parent = open_token;
            if (this._is_opening(current)) {
              open_stack.push(open_token);
              open_token = current;
            } else if (open_token && this._is_closing(current, open_token)) {
              current.opened = open_token;
              open_token.closed = current;
              open_token = open_stack.pop();
              current.parent = open_token;
            }
            current.previous = previous;
            previous.next = current;
            this.__tokens.add(current);
            previous = current;
          }
          return this.__tokens;
        };
        Tokenizer.prototype._is_first_token = function() {
          return this.__tokens.isEmpty();
        };
        Tokenizer.prototype._reset = function() {
        };
        Tokenizer.prototype._get_next_token = function(previous_token, open_token) {
          this._readWhitespace();
          var resulting_string = this._input.read(/.+/g);
          if (resulting_string) {
            return this._create_token(TOKEN.RAW, resulting_string);
          } else {
            return this._create_token(TOKEN.EOF, "");
          }
        };
        Tokenizer.prototype._is_comment = function(current_token) {
          return false;
        };
        Tokenizer.prototype._is_opening = function(current_token) {
          return false;
        };
        Tokenizer.prototype._is_closing = function(current_token, open_token) {
          return false;
        };
        Tokenizer.prototype._create_token = function(type, text) {
          var token = new Token2(type, text, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
          return token;
        };
        Tokenizer.prototype._readWhitespace = function() {
          return this._patterns.whitespace.read();
        };
        module.exports.Tokenizer = Tokenizer;
        module.exports.TOKEN = TOKEN;
      },
      function(module) {
        function TokenStream(parent_token) {
          this.__tokens = [];
          this.__tokens_length = this.__tokens.length;
          this.__position = 0;
          this.__parent_token = parent_token;
        }
        TokenStream.prototype.restart = function() {
          this.__position = 0;
        };
        TokenStream.prototype.isEmpty = function() {
          return this.__tokens_length === 0;
        };
        TokenStream.prototype.hasNext = function() {
          return this.__position < this.__tokens_length;
        };
        TokenStream.prototype.next = function() {
          var val = null;
          if (this.hasNext()) {
            val = this.__tokens[this.__position];
            this.__position += 1;
          }
          return val;
        };
        TokenStream.prototype.peek = function(index) {
          var val = null;
          index = index || 0;
          index += this.__position;
          if (index >= 0 && index < this.__tokens_length) {
            val = this.__tokens[index];
          }
          return val;
        };
        TokenStream.prototype.add = function(token) {
          if (this.__parent_token) {
            token.parent = this.__parent_token;
          }
          this.__tokens.push(token);
          this.__tokens_length += 1;
        };
        module.exports.TokenStream = TokenStream;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Pattern = __webpack_require__2(12).Pattern;
        function WhitespacePattern(input_scanner, parent) {
          Pattern.call(this, input_scanner, parent);
          if (parent) {
            this._line_regexp = this._input.get_regexp(parent._line_regexp);
          } else {
            this.__set_whitespace_patterns("", "");
          }
          this.newline_count = 0;
          this.whitespace_before_token = "";
        }
        WhitespacePattern.prototype = new Pattern();
        WhitespacePattern.prototype.__set_whitespace_patterns = function(whitespace_chars, newline_chars) {
          whitespace_chars += "\\t ";
          newline_chars += "\\n\\r";
          this._match_pattern = this._input.get_regexp("[" + whitespace_chars + newline_chars + "]+", true);
          this._newline_regexp = this._input.get_regexp("\\r\\n|[" + newline_chars + "]");
        };
        WhitespacePattern.prototype.read = function() {
          this.newline_count = 0;
          this.whitespace_before_token = "";
          var resulting_string = this._input.read(this._match_pattern);
          if (resulting_string === " ") {
            this.whitespace_before_token = " ";
          } else if (resulting_string) {
            var matches = this.__split(this._newline_regexp, resulting_string);
            this.newline_count = matches.length - 1;
            this.whitespace_before_token = matches[this.newline_count];
          }
          return resulting_string;
        };
        WhitespacePattern.prototype.matching = function(whitespace_chars, newline_chars) {
          var result = this._create();
          result.__set_whitespace_patterns(whitespace_chars, newline_chars);
          result._update();
          return result;
        };
        WhitespacePattern.prototype._create = function() {
          return new WhitespacePattern(this._input, this);
        };
        WhitespacePattern.prototype.__split = function(regexp, input_string) {
          regexp.lastIndex = 0;
          var start_index = 0;
          var result = [];
          var next_match = regexp.exec(input_string);
          while (next_match) {
            result.push(input_string.substring(start_index, next_match.index));
            start_index = next_match.index + next_match[0].length;
            next_match = regexp.exec(input_string);
          }
          if (start_index < input_string.length) {
            result.push(input_string.substring(start_index, input_string.length));
          } else {
            result.push("");
          }
          return result;
        };
        module.exports.WhitespacePattern = WhitespacePattern;
      },
      function(module) {
        function Pattern(input_scanner, parent) {
          this._input = input_scanner;
          this._starting_pattern = null;
          this._match_pattern = null;
          this._until_pattern = null;
          this._until_after = false;
          if (parent) {
            this._starting_pattern = this._input.get_regexp(parent._starting_pattern, true);
            this._match_pattern = this._input.get_regexp(parent._match_pattern, true);
            this._until_pattern = this._input.get_regexp(parent._until_pattern);
            this._until_after = parent._until_after;
          }
        }
        Pattern.prototype.read = function() {
          var result = this._input.read(this._starting_pattern);
          if (!this._starting_pattern || result) {
            result += this._input.read(this._match_pattern, this._until_pattern, this._until_after);
          }
          return result;
        };
        Pattern.prototype.read_match = function() {
          return this._input.match(this._match_pattern);
        };
        Pattern.prototype.until_after = function(pattern) {
          var result = this._create();
          result._until_after = true;
          result._until_pattern = this._input.get_regexp(pattern);
          result._update();
          return result;
        };
        Pattern.prototype.until = function(pattern) {
          var result = this._create();
          result._until_after = false;
          result._until_pattern = this._input.get_regexp(pattern);
          result._update();
          return result;
        };
        Pattern.prototype.starting_with = function(pattern) {
          var result = this._create();
          result._starting_pattern = this._input.get_regexp(pattern, true);
          result._update();
          return result;
        };
        Pattern.prototype.matching = function(pattern) {
          var result = this._create();
          result._match_pattern = this._input.get_regexp(pattern, true);
          result._update();
          return result;
        };
        Pattern.prototype._create = function() {
          return new Pattern(this._input, this);
        };
        Pattern.prototype._update = function() {
        };
        module.exports.Pattern = Pattern;
      },
      function(module) {
        function Directives(start_block_pattern, end_block_pattern) {
          start_block_pattern = typeof start_block_pattern === "string" ? start_block_pattern : start_block_pattern.source;
          end_block_pattern = typeof end_block_pattern === "string" ? end_block_pattern : end_block_pattern.source;
          this.__directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, "g");
          this.__directive_pattern = / (\w+)[:](\w+)/g;
          this.__directives_end_ignore_pattern = new RegExp(start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern, "g");
        }
        Directives.prototype.get_directives = function(text) {
          if (!text.match(this.__directives_block_pattern)) {
            return null;
          }
          var directives = {};
          this.__directive_pattern.lastIndex = 0;
          var directive_match = this.__directive_pattern.exec(text);
          while (directive_match) {
            directives[directive_match[1]] = directive_match[2];
            directive_match = this.__directive_pattern.exec(text);
          }
          return directives;
        };
        Directives.prototype.readIgnored = function(input) {
          return input.readUntilAfter(this.__directives_end_ignore_pattern);
        };
        module.exports.Directives = Directives;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Pattern = __webpack_require__2(12).Pattern;
        var template_names = {
          django: false,
          erb: false,
          handlebars: false,
          php: false,
          smarty: false
        };
        function TemplatablePattern(input_scanner, parent) {
          Pattern.call(this, input_scanner, parent);
          this.__template_pattern = null;
          this._disabled = Object.assign({}, template_names);
          this._excluded = Object.assign({}, template_names);
          if (parent) {
            this.__template_pattern = this._input.get_regexp(parent.__template_pattern);
            this._excluded = Object.assign(this._excluded, parent._excluded);
            this._disabled = Object.assign(this._disabled, parent._disabled);
          }
          var pattern = new Pattern(input_scanner);
          this.__patterns = {
            handlebars_comment: pattern.starting_with(/{{!--/).until_after(/--}}/),
            handlebars_unescaped: pattern.starting_with(/{{{/).until_after(/}}}/),
            handlebars: pattern.starting_with(/{{/).until_after(/}}/),
            php: pattern.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
            erb: pattern.starting_with(/<%[^%]/).until_after(/[^%]%>/),
            django: pattern.starting_with(/{%/).until_after(/%}/),
            django_value: pattern.starting_with(/{{/).until_after(/}}/),
            django_comment: pattern.starting_with(/{#/).until_after(/#}/),
            smarty: pattern.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
            smarty_comment: pattern.starting_with(/{\*/).until_after(/\*}/),
            smarty_literal: pattern.starting_with(/{literal}/).until_after(/{\/literal}/)
          };
        }
        TemplatablePattern.prototype = new Pattern();
        TemplatablePattern.prototype._create = function() {
          return new TemplatablePattern(this._input, this);
        };
        TemplatablePattern.prototype._update = function() {
          this.__set_templated_pattern();
        };
        TemplatablePattern.prototype.disable = function(language) {
          var result = this._create();
          result._disabled[language] = true;
          result._update();
          return result;
        };
        TemplatablePattern.prototype.read_options = function(options) {
          var result = this._create();
          for (var language in template_names) {
            result._disabled[language] = options.templating.indexOf(language) === -1;
          }
          result._update();
          return result;
        };
        TemplatablePattern.prototype.exclude = function(language) {
          var result = this._create();
          result._excluded[language] = true;
          result._update();
          return result;
        };
        TemplatablePattern.prototype.read = function() {
          var result = "";
          if (this._match_pattern) {
            result = this._input.read(this._starting_pattern);
          } else {
            result = this._input.read(this._starting_pattern, this.__template_pattern);
          }
          var next = this._read_template();
          while (next) {
            if (this._match_pattern) {
              next += this._input.read(this._match_pattern);
            } else {
              next += this._input.readUntil(this.__template_pattern);
            }
            result += next;
            next = this._read_template();
          }
          if (this._until_after) {
            result += this._input.readUntilAfter(this._until_pattern);
          }
          return result;
        };
        TemplatablePattern.prototype.__set_templated_pattern = function() {
          var items = [];
          if (!this._disabled.php) {
            items.push(this.__patterns.php._starting_pattern.source);
          }
          if (!this._disabled.handlebars) {
            items.push(this.__patterns.handlebars._starting_pattern.source);
          }
          if (!this._disabled.erb) {
            items.push(this.__patterns.erb._starting_pattern.source);
          }
          if (!this._disabled.django) {
            items.push(this.__patterns.django._starting_pattern.source);
            items.push(this.__patterns.django_value._starting_pattern.source);
            items.push(this.__patterns.django_comment._starting_pattern.source);
          }
          if (!this._disabled.smarty) {
            items.push(this.__patterns.smarty._starting_pattern.source);
          }
          if (this._until_pattern) {
            items.push(this._until_pattern.source);
          }
          this.__template_pattern = this._input.get_regexp("(?:" + items.join("|") + ")");
        };
        TemplatablePattern.prototype._read_template = function() {
          var resulting_string = "";
          var c = this._input.peek();
          if (c === "<") {
            var peek1 = this._input.peek(1);
            if (!this._disabled.php && !this._excluded.php && peek1 === "?") {
              resulting_string = resulting_string || this.__patterns.php.read();
            }
            if (!this._disabled.erb && !this._excluded.erb && peek1 === "%") {
              resulting_string = resulting_string || this.__patterns.erb.read();
            }
          } else if (c === "{") {
            if (!this._disabled.handlebars && !this._excluded.handlebars) {
              resulting_string = resulting_string || this.__patterns.handlebars_comment.read();
              resulting_string = resulting_string || this.__patterns.handlebars_unescaped.read();
              resulting_string = resulting_string || this.__patterns.handlebars.read();
            }
            if (!this._disabled.django) {
              if (!this._excluded.django && !this._excluded.handlebars) {
                resulting_string = resulting_string || this.__patterns.django_value.read();
              }
              if (!this._excluded.django) {
                resulting_string = resulting_string || this.__patterns.django_comment.read();
                resulting_string = resulting_string || this.__patterns.django.read();
              }
            }
            if (!this._disabled.smarty) {
              if (this._disabled.django && this._disabled.handlebars) {
                resulting_string = resulting_string || this.__patterns.smarty_comment.read();
                resulting_string = resulting_string || this.__patterns.smarty_literal.read();
                resulting_string = resulting_string || this.__patterns.smarty.read();
              }
            }
          }
          return resulting_string;
        };
        module.exports.TemplatablePattern = TemplatablePattern;
      },
      ,
      ,
      ,
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Beautifier = __webpack_require__2(19).Beautifier, Options = __webpack_require__2(20).Options;
        function style_html(html_source, options, js_beautify2, css_beautify2) {
          var beautifier = new Beautifier(html_source, options, js_beautify2, css_beautify2);
          return beautifier.beautify();
        }
        module.exports = style_html;
        module.exports.defaultOptions = function() {
          return new Options();
        };
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var Options = __webpack_require__2(20).Options;
        var Output = __webpack_require__2(2).Output;
        var Tokenizer = __webpack_require__2(21).Tokenizer;
        var TOKEN = __webpack_require__2(21).TOKEN;
        var lineBreak = /\r\n|[\r\n]/;
        var allLineBreaks = /\r\n|[\r\n]/g;
        var Printer = function(options, base_indent_string) {
          this.indent_level = 0;
          this.alignment_size = 0;
          this.max_preserve_newlines = options.max_preserve_newlines;
          this.preserve_newlines = options.preserve_newlines;
          this._output = new Output(options, base_indent_string);
        };
        Printer.prototype.current_line_has_match = function(pattern) {
          return this._output.current_line.has_match(pattern);
        };
        Printer.prototype.set_space_before_token = function(value, non_breaking) {
          this._output.space_before_token = value;
          this._output.non_breaking_space = non_breaking;
        };
        Printer.prototype.set_wrap_point = function() {
          this._output.set_indent(this.indent_level, this.alignment_size);
          this._output.set_wrap_point();
        };
        Printer.prototype.add_raw_token = function(token) {
          this._output.add_raw_token(token);
        };
        Printer.prototype.print_preserved_newlines = function(raw_token) {
          var newlines = 0;
          if (raw_token.type !== TOKEN.TEXT && raw_token.previous.type !== TOKEN.TEXT) {
            newlines = raw_token.newlines ? 1 : 0;
          }
          if (this.preserve_newlines) {
            newlines = raw_token.newlines < this.max_preserve_newlines + 1 ? raw_token.newlines : this.max_preserve_newlines + 1;
          }
          for (var n = 0; n < newlines; n++) {
            this.print_newline(n > 0);
          }
          return newlines !== 0;
        };
        Printer.prototype.traverse_whitespace = function(raw_token) {
          if (raw_token.whitespace_before || raw_token.newlines) {
            if (!this.print_preserved_newlines(raw_token)) {
              this._output.space_before_token = true;
            }
            return true;
          }
          return false;
        };
        Printer.prototype.previous_token_wrapped = function() {
          return this._output.previous_token_wrapped;
        };
        Printer.prototype.print_newline = function(force) {
          this._output.add_new_line(force);
        };
        Printer.prototype.print_token = function(token) {
          if (token.text) {
            this._output.set_indent(this.indent_level, this.alignment_size);
            this._output.add_token(token.text);
          }
        };
        Printer.prototype.indent = function() {
          this.indent_level++;
        };
        Printer.prototype.get_full_indent = function(level) {
          level = this.indent_level + (level || 0);
          if (level < 1) {
            return "";
          }
          return this._output.get_indent_string(level);
        };
        var get_type_attribute = function(start_token) {
          var result = null;
          var raw_token = start_token.next;
          while (raw_token.type !== TOKEN.EOF && start_token.closed !== raw_token) {
            if (raw_token.type === TOKEN.ATTRIBUTE && raw_token.text === "type") {
              if (raw_token.next && raw_token.next.type === TOKEN.EQUALS && raw_token.next.next && raw_token.next.next.type === TOKEN.VALUE) {
                result = raw_token.next.next.text;
              }
              break;
            }
            raw_token = raw_token.next;
          }
          return result;
        };
        var get_custom_beautifier_name = function(tag_check, raw_token) {
          var typeAttribute = null;
          var result = null;
          if (!raw_token.closed) {
            return null;
          }
          if (tag_check === "script") {
            typeAttribute = "text/javascript";
          } else if (tag_check === "style") {
            typeAttribute = "text/css";
          }
          typeAttribute = get_type_attribute(raw_token) || typeAttribute;
          if (typeAttribute.search("text/css") > -1) {
            result = "css";
          } else if (typeAttribute.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1) {
            result = "javascript";
          } else if (typeAttribute.search(/(text|application|dojo)\/(x-)?(html)/) > -1) {
            result = "html";
          } else if (typeAttribute.search(/test\/null/) > -1) {
            result = "null";
          }
          return result;
        };
        function in_array(what, arr) {
          return arr.indexOf(what) !== -1;
        }
        function TagFrame(parent, parser_token, indent_level) {
          this.parent = parent || null;
          this.tag = parser_token ? parser_token.tag_name : "";
          this.indent_level = indent_level || 0;
          this.parser_token = parser_token || null;
        }
        function TagStack(printer) {
          this._printer = printer;
          this._current_frame = null;
        }
        TagStack.prototype.get_parser_token = function() {
          return this._current_frame ? this._current_frame.parser_token : null;
        };
        TagStack.prototype.record_tag = function(parser_token) {
          var new_frame = new TagFrame(this._current_frame, parser_token, this._printer.indent_level);
          this._current_frame = new_frame;
        };
        TagStack.prototype._try_pop_frame = function(frame) {
          var parser_token = null;
          if (frame) {
            parser_token = frame.parser_token;
            this._printer.indent_level = frame.indent_level;
            this._current_frame = frame.parent;
          }
          return parser_token;
        };
        TagStack.prototype._get_frame = function(tag_list, stop_list) {
          var frame = this._current_frame;
          while (frame) {
            if (tag_list.indexOf(frame.tag) !== -1) {
              break;
            } else if (stop_list && stop_list.indexOf(frame.tag) !== -1) {
              frame = null;
              break;
            }
            frame = frame.parent;
          }
          return frame;
        };
        TagStack.prototype.try_pop = function(tag, stop_list) {
          var frame = this._get_frame([tag], stop_list);
          return this._try_pop_frame(frame);
        };
        TagStack.prototype.indent_to_tag = function(tag_list) {
          var frame = this._get_frame(tag_list);
          if (frame) {
            this._printer.indent_level = frame.indent_level;
          }
        };
        function Beautifier(source_text, options, js_beautify2, css_beautify2) {
          this._source_text = source_text || "";
          options = options || {};
          this._js_beautify = js_beautify2;
          this._css_beautify = css_beautify2;
          this._tag_stack = null;
          var optionHtml = new Options(options, "html");
          this._options = optionHtml;
          this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, "force".length) === "force";
          this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline";
          this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned";
          this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple";
          this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, "preserve".length) === "preserve";
          this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
        }
        Beautifier.prototype.beautify = function() {
          if (this._options.disabled) {
            return this._source_text;
          }
          var source_text = this._source_text;
          var eol = this._options.eol;
          if (this._options.eol === "auto") {
            eol = "\n";
            if (source_text && lineBreak.test(source_text)) {
              eol = source_text.match(lineBreak)[0];
            }
          }
          source_text = source_text.replace(allLineBreaks, "\n");
          var baseIndentString = source_text.match(/^[\t ]*/)[0];
          var last_token = {
            text: "",
            type: ""
          };
          var last_tag_token = new TagOpenParserToken();
          var printer = new Printer(this._options, baseIndentString);
          var tokens = new Tokenizer(source_text, this._options).tokenize();
          this._tag_stack = new TagStack(printer);
          var parser_token = null;
          var raw_token = tokens.next();
          while (raw_token.type !== TOKEN.EOF) {
            if (raw_token.type === TOKEN.TAG_OPEN || raw_token.type === TOKEN.COMMENT) {
              parser_token = this._handle_tag_open(printer, raw_token, last_tag_token, last_token);
              last_tag_token = parser_token;
            } else if (raw_token.type === TOKEN.ATTRIBUTE || raw_token.type === TOKEN.EQUALS || raw_token.type === TOKEN.VALUE || raw_token.type === TOKEN.TEXT && !last_tag_token.tag_complete) {
              parser_token = this._handle_inside_tag(printer, raw_token, last_tag_token, tokens);
            } else if (raw_token.type === TOKEN.TAG_CLOSE) {
              parser_token = this._handle_tag_close(printer, raw_token, last_tag_token);
            } else if (raw_token.type === TOKEN.TEXT) {
              parser_token = this._handle_text(printer, raw_token, last_tag_token);
            } else {
              printer.add_raw_token(raw_token);
            }
            last_token = parser_token;
            raw_token = tokens.next();
          }
          var sweet_code = printer._output.get_code(eol);
          return sweet_code;
        };
        Beautifier.prototype._handle_tag_close = function(printer, raw_token, last_tag_token) {
          var parser_token = {
            text: raw_token.text,
            type: raw_token.type
          };
          printer.alignment_size = 0;
          last_tag_token.tag_complete = true;
          printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
          if (last_tag_token.is_unformatted) {
            printer.add_raw_token(raw_token);
          } else {
            if (last_tag_token.tag_start_char === "<") {
              printer.set_space_before_token(raw_token.text[0] === "/", true);
              if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.has_wrapped_attrs) {
                printer.print_newline(false);
              }
            }
            printer.print_token(raw_token);
          }
          if (last_tag_token.indent_content && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
            printer.indent();
            last_tag_token.indent_content = false;
          }
          if (!last_tag_token.is_inline_element && !(last_tag_token.is_unformatted || last_tag_token.is_content_unformatted)) {
            printer.set_wrap_point();
          }
          return parser_token;
        };
        Beautifier.prototype._handle_inside_tag = function(printer, raw_token, last_tag_token, tokens) {
          var wrapped = last_tag_token.has_wrapped_attrs;
          var parser_token = {
            text: raw_token.text,
            type: raw_token.type
          };
          printer.set_space_before_token(raw_token.newlines || raw_token.whitespace_before !== "", true);
          if (last_tag_token.is_unformatted) {
            printer.add_raw_token(raw_token);
          } else if (last_tag_token.tag_start_char === "{" && raw_token.type === TOKEN.TEXT) {
            if (printer.print_preserved_newlines(raw_token)) {
              raw_token.newlines = 0;
              printer.add_raw_token(raw_token);
            } else {
              printer.print_token(raw_token);
            }
          } else {
            if (raw_token.type === TOKEN.ATTRIBUTE) {
              printer.set_space_before_token(true);
              last_tag_token.attr_count += 1;
            } else if (raw_token.type === TOKEN.EQUALS) {
              printer.set_space_before_token(false);
            } else if (raw_token.type === TOKEN.VALUE && raw_token.previous.type === TOKEN.EQUALS) {
              printer.set_space_before_token(false);
            }
            if (raw_token.type === TOKEN.ATTRIBUTE && last_tag_token.tag_start_char === "<") {
              if (this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) {
                printer.traverse_whitespace(raw_token);
                wrapped = wrapped || raw_token.newlines !== 0;
              }
              if (this._is_wrap_attributes_force) {
                var force_attr_wrap = last_tag_token.attr_count > 1;
                if (this._is_wrap_attributes_force_expand_multiline && last_tag_token.attr_count === 1) {
                  var is_only_attribute = true;
                  var peek_index = 0;
                  var peek_token;
                  do {
                    peek_token = tokens.peek(peek_index);
                    if (peek_token.type === TOKEN.ATTRIBUTE) {
                      is_only_attribute = false;
                      break;
                    }
                    peek_index += 1;
                  } while (peek_index < 4 && peek_token.type !== TOKEN.EOF && peek_token.type !== TOKEN.TAG_CLOSE);
                  force_attr_wrap = !is_only_attribute;
                }
                if (force_attr_wrap) {
                  printer.print_newline(false);
                  wrapped = true;
                }
              }
            }
            printer.print_token(raw_token);
            wrapped = wrapped || printer.previous_token_wrapped();
            last_tag_token.has_wrapped_attrs = wrapped;
          }
          return parser_token;
        };
        Beautifier.prototype._handle_text = function(printer, raw_token, last_tag_token) {
          var parser_token = {
            text: raw_token.text,
            type: "TK_CONTENT"
          };
          if (last_tag_token.custom_beautifier_name) {
            this._print_custom_beatifier_text(printer, raw_token, last_tag_token);
          } else if (last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) {
            printer.add_raw_token(raw_token);
          } else {
            printer.traverse_whitespace(raw_token);
            printer.print_token(raw_token);
          }
          return parser_token;
        };
        Beautifier.prototype._print_custom_beatifier_text = function(printer, raw_token, last_tag_token) {
          var local = this;
          if (raw_token.text !== "") {
            var text = raw_token.text, _beautifier, script_indent_level = 1, pre = "", post = "";
            if (last_tag_token.custom_beautifier_name === "javascript" && typeof this._js_beautify === "function") {
              _beautifier = this._js_beautify;
            } else if (last_tag_token.custom_beautifier_name === "css" && typeof this._css_beautify === "function") {
              _beautifier = this._css_beautify;
            } else if (last_tag_token.custom_beautifier_name === "html") {
              _beautifier = function(html_source, options) {
                var beautifier = new Beautifier(html_source, options, local._js_beautify, local._css_beautify);
                return beautifier.beautify();
              };
            }
            if (this._options.indent_scripts === "keep") {
              script_indent_level = 0;
            } else if (this._options.indent_scripts === "separate") {
              script_indent_level = -printer.indent_level;
            }
            var indentation = printer.get_full_indent(script_indent_level);
            text = text.replace(/\n[ \t]*$/, "");
            if (last_tag_token.custom_beautifier_name !== "html" && text[0] === "<" && text.match(/^(<!--|<!\[CDATA\[)/)) {
              var matched = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(text);
              if (!matched) {
                printer.add_raw_token(raw_token);
                return;
              }
              pre = indentation + matched[1] + "\n";
              text = matched[4];
              if (matched[5]) {
                post = indentation + matched[5];
              }
              text = text.replace(/\n[ \t]*$/, "");
              if (matched[2] || matched[3].indexOf("\n") !== -1) {
                matched = matched[3].match(/[ \t]+$/);
                if (matched) {
                  raw_token.whitespace_before = matched[0];
                }
              }
            }
            if (text) {
              if (_beautifier) {
                var Child_options = function() {
                  this.eol = "\n";
                };
                Child_options.prototype = this._options.raw_options;
                var child_options = new Child_options();
                text = _beautifier(indentation + text, child_options);
              } else {
                var white = raw_token.whitespace_before;
                if (white) {
                  text = text.replace(new RegExp("\n(" + white + ")?", "g"), "\n");
                }
                text = indentation + text.replace(/\n/g, "\n" + indentation);
              }
            }
            if (pre) {
              if (!text) {
                text = pre + post;
              } else {
                text = pre + text + "\n" + post;
              }
            }
            printer.print_newline(false);
            if (text) {
              raw_token.text = text;
              raw_token.whitespace_before = "";
              raw_token.newlines = 0;
              printer.add_raw_token(raw_token);
              printer.print_newline(true);
            }
          }
        };
        Beautifier.prototype._handle_tag_open = function(printer, raw_token, last_tag_token, last_token) {
          var parser_token = this._get_tag_open_token(raw_token);
          if ((last_tag_token.is_unformatted || last_tag_token.is_content_unformatted) && !last_tag_token.is_empty_element && raw_token.type === TOKEN.TAG_OPEN && raw_token.text.indexOf("</") === 0) {
            printer.add_raw_token(raw_token);
            parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
          } else {
            printer.traverse_whitespace(raw_token);
            this._set_tag_position(printer, raw_token, parser_token, last_tag_token, last_token);
            if (!parser_token.is_inline_element) {
              printer.set_wrap_point();
            }
            printer.print_token(raw_token);
          }
          if (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) {
            parser_token.alignment_size = raw_token.text.length + 1;
          }
          if (!parser_token.tag_complete && !parser_token.is_unformatted) {
            printer.alignment_size = parser_token.alignment_size;
          }
          return parser_token;
        };
        var TagOpenParserToken = function(parent, raw_token) {
          this.parent = parent || null;
          this.text = "";
          this.type = "TK_TAG_OPEN";
          this.tag_name = "";
          this.is_inline_element = false;
          this.is_unformatted = false;
          this.is_content_unformatted = false;
          this.is_empty_element = false;
          this.is_start_tag = false;
          this.is_end_tag = false;
          this.indent_content = false;
          this.multiline_content = false;
          this.custom_beautifier_name = null;
          this.start_tag_token = null;
          this.attr_count = 0;
          this.has_wrapped_attrs = false;
          this.alignment_size = 0;
          this.tag_complete = false;
          this.tag_start_char = "";
          this.tag_check = "";
          if (!raw_token) {
            this.tag_complete = true;
          } else {
            var tag_check_match;
            this.tag_start_char = raw_token.text[0];
            this.text = raw_token.text;
            if (this.tag_start_char === "<") {
              tag_check_match = raw_token.text.match(/^<([^\s>]*)/);
              this.tag_check = tag_check_match ? tag_check_match[1] : "";
            } else {
              tag_check_match = raw_token.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/);
              this.tag_check = tag_check_match ? tag_check_match[1] : "";
              if (raw_token.text === "{{#>" && this.tag_check === ">" && raw_token.next !== null) {
                this.tag_check = raw_token.next.text;
              }
            }
            this.tag_check = this.tag_check.toLowerCase();
            if (raw_token.type === TOKEN.COMMENT) {
              this.tag_complete = true;
            }
            this.is_start_tag = this.tag_check.charAt(0) !== "/";
            this.tag_name = !this.is_start_tag ? this.tag_check.substr(1) : this.tag_check;
            this.is_end_tag = !this.is_start_tag || raw_token.closed && raw_token.closed.text === "/>";
            this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)));
          }
        };
        Beautifier.prototype._get_tag_open_token = function(raw_token) {
          var parser_token = new TagOpenParserToken(this._tag_stack.get_parser_token(), raw_token);
          parser_token.alignment_size = this._options.wrap_attributes_indent_size;
          parser_token.is_end_tag = parser_token.is_end_tag || in_array(parser_token.tag_check, this._options.void_elements);
          parser_token.is_empty_element = parser_token.tag_complete || parser_token.is_start_tag && parser_token.is_end_tag;
          parser_token.is_unformatted = !parser_token.tag_complete && in_array(parser_token.tag_check, this._options.unformatted);
          parser_token.is_content_unformatted = !parser_token.is_empty_element && in_array(parser_token.tag_check, this._options.content_unformatted);
          parser_token.is_inline_element = in_array(parser_token.tag_name, this._options.inline) || parser_token.tag_start_char === "{";
          return parser_token;
        };
        Beautifier.prototype._set_tag_position = function(printer, raw_token, parser_token, last_tag_token, last_token) {
          if (!parser_token.is_empty_element) {
            if (parser_token.is_end_tag) {
              parser_token.start_tag_token = this._tag_stack.try_pop(parser_token.tag_name);
            } else {
              if (this._do_optional_end_element(parser_token)) {
                if (!parser_token.is_inline_element) {
                  printer.print_newline(false);
                }
              }
              this._tag_stack.record_tag(parser_token);
              if ((parser_token.tag_name === "script" || parser_token.tag_name === "style") && !(parser_token.is_unformatted || parser_token.is_content_unformatted)) {
                parser_token.custom_beautifier_name = get_custom_beautifier_name(parser_token.tag_check, raw_token);
              }
            }
          }
          if (in_array(parser_token.tag_check, this._options.extra_liners)) {
            printer.print_newline(false);
            if (!printer._output.just_added_blankline()) {
              printer.print_newline(true);
            }
          }
          if (parser_token.is_empty_element) {
            if (parser_token.tag_start_char === "{" && parser_token.tag_check === "else") {
              this._tag_stack.indent_to_tag(["if", "unless", "each"]);
              parser_token.indent_content = true;
              var foundIfOnCurrentLine = printer.current_line_has_match(/{{#if/);
              if (!foundIfOnCurrentLine) {
                printer.print_newline(false);
              }
            }
            if (parser_token.tag_name === "!--" && last_token.type === TOKEN.TAG_CLOSE && last_tag_token.is_end_tag && parser_token.text.indexOf("\n") === -1) {
            } else {
              if (!(parser_token.is_inline_element || parser_token.is_unformatted)) {
                printer.print_newline(false);
              }
              this._calcluate_parent_multiline(printer, parser_token);
            }
          } else if (parser_token.is_end_tag) {
            var do_end_expand = false;
            do_end_expand = parser_token.start_tag_token && parser_token.start_tag_token.multiline_content;
            do_end_expand = do_end_expand || !parser_token.is_inline_element && !(last_tag_token.is_inline_element || last_tag_token.is_unformatted) && !(last_token.type === TOKEN.TAG_CLOSE && parser_token.start_tag_token === last_tag_token) && last_token.type !== "TK_CONTENT";
            if (parser_token.is_content_unformatted || parser_token.is_unformatted) {
              do_end_expand = false;
            }
            if (do_end_expand) {
              printer.print_newline(false);
            }
          } else {
            parser_token.indent_content = !parser_token.custom_beautifier_name;
            if (parser_token.tag_start_char === "<") {
              if (parser_token.tag_name === "html") {
                parser_token.indent_content = this._options.indent_inner_html;
              } else if (parser_token.tag_name === "head") {
                parser_token.indent_content = this._options.indent_head_inner_html;
              } else if (parser_token.tag_name === "body") {
                parser_token.indent_content = this._options.indent_body_inner_html;
              }
            }
            if (!(parser_token.is_inline_element || parser_token.is_unformatted) && (last_token.type !== "TK_CONTENT" || parser_token.is_content_unformatted)) {
              printer.print_newline(false);
            }
            this._calcluate_parent_multiline(printer, parser_token);
          }
        };
        Beautifier.prototype._calcluate_parent_multiline = function(printer, parser_token) {
          if (parser_token.parent && printer._output.just_added_newline() && !((parser_token.is_inline_element || parser_token.is_unformatted) && parser_token.parent.is_inline_element)) {
            parser_token.parent.multiline_content = true;
          }
        };
        var p_closers = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"];
        var p_parent_excludes = ["a", "audio", "del", "ins", "map", "noscript", "video"];
        Beautifier.prototype._do_optional_end_element = function(parser_token) {
          var result = null;
          if (parser_token.is_empty_element || !parser_token.is_start_tag || !parser_token.parent) {
            return;
          }
          if (parser_token.tag_name === "body") {
            result = result || this._tag_stack.try_pop("head");
          } else if (parser_token.tag_name === "li") {
            result = result || this._tag_stack.try_pop("li", ["ol", "ul"]);
          } else if (parser_token.tag_name === "dd" || parser_token.tag_name === "dt") {
            result = result || this._tag_stack.try_pop("dt", ["dl"]);
            result = result || this._tag_stack.try_pop("dd", ["dl"]);
          } else if (parser_token.parent.tag_name === "p" && p_closers.indexOf(parser_token.tag_name) !== -1) {
            var p_parent = parser_token.parent.parent;
            if (!p_parent || p_parent_excludes.indexOf(p_parent.tag_name) === -1) {
              result = result || this._tag_stack.try_pop("p");
            }
          } else if (parser_token.tag_name === "rp" || parser_token.tag_name === "rt") {
            result = result || this._tag_stack.try_pop("rt", ["ruby", "rtc"]);
            result = result || this._tag_stack.try_pop("rp", ["ruby", "rtc"]);
          } else if (parser_token.tag_name === "optgroup") {
            result = result || this._tag_stack.try_pop("optgroup", ["select"]);
          } else if (parser_token.tag_name === "option") {
            result = result || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]);
          } else if (parser_token.tag_name === "colgroup") {
            result = result || this._tag_stack.try_pop("caption", ["table"]);
          } else if (parser_token.tag_name === "thead") {
            result = result || this._tag_stack.try_pop("caption", ["table"]);
            result = result || this._tag_stack.try_pop("colgroup", ["table"]);
          } else if (parser_token.tag_name === "tbody" || parser_token.tag_name === "tfoot") {
            result = result || this._tag_stack.try_pop("caption", ["table"]);
            result = result || this._tag_stack.try_pop("colgroup", ["table"]);
            result = result || this._tag_stack.try_pop("thead", ["table"]);
            result = result || this._tag_stack.try_pop("tbody", ["table"]);
          } else if (parser_token.tag_name === "tr") {
            result = result || this._tag_stack.try_pop("caption", ["table"]);
            result = result || this._tag_stack.try_pop("colgroup", ["table"]);
            result = result || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"]);
          } else if (parser_token.tag_name === "th" || parser_token.tag_name === "td") {
            result = result || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]);
            result = result || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]);
          }
          parser_token.parent = this._tag_stack.get_parser_token();
          return result;
        };
        module.exports.Beautifier = Beautifier;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var BaseOptions = __webpack_require__2(6).Options;
        function Options(options) {
          BaseOptions.call(this, options, "html");
          if (this.templating.length === 1 && this.templating[0] === "auto") {
            this.templating = ["django", "erb", "handlebars", "php"];
          }
          this.indent_inner_html = this._get_boolean("indent_inner_html");
          this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", true);
          this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", true);
          this.indent_handlebars = this._get_boolean("indent_handlebars", true);
          this.wrap_attributes = this._get_selection("wrap_attributes", ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]);
          this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size);
          this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]);
          this.inline = this._get_array("inline", [
            "a",
            "abbr",
            "area",
            "audio",
            "b",
            "bdi",
            "bdo",
            "br",
            "button",
            "canvas",
            "cite",
            "code",
            "data",
            "datalist",
            "del",
            "dfn",
            "em",
            "embed",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "kbd",
            "keygen",
            "label",
            "map",
            "mark",
            "math",
            "meter",
            "noscript",
            "object",
            "output",
            "progress",
            "q",
            "ruby",
            "s",
            "samp",
            "select",
            "small",
            "span",
            "strong",
            "sub",
            "sup",
            "svg",
            "template",
            "textarea",
            "time",
            "u",
            "var",
            "video",
            "wbr",
            "text",
            "acronym",
            "big",
            "strike",
            "tt"
          ]);
          this.void_elements = this._get_array("void_elements", [
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "keygen",
            "link",
            "menuitem",
            "meta",
            "param",
            "source",
            "track",
            "wbr",
            "!doctype",
            "?xml",
            "basefont",
            "isindex"
          ]);
          this.unformatted = this._get_array("unformatted", []);
          this.content_unformatted = this._get_array("content_unformatted", [
            "pre",
            "textarea"
          ]);
          this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter");
          this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
        }
        Options.prototype = new BaseOptions();
        module.exports.Options = Options;
      },
      function(module, __unused_webpack_exports, __webpack_require__2) {
        var BaseTokenizer = __webpack_require__2(9).Tokenizer;
        var BASETOKEN = __webpack_require__2(9).TOKEN;
        var Directives = __webpack_require__2(13).Directives;
        var TemplatablePattern = __webpack_require__2(14).TemplatablePattern;
        var Pattern = __webpack_require__2(12).Pattern;
        var TOKEN = {
          TAG_OPEN: "TK_TAG_OPEN",
          TAG_CLOSE: "TK_TAG_CLOSE",
          ATTRIBUTE: "TK_ATTRIBUTE",
          EQUALS: "TK_EQUALS",
          VALUE: "TK_VALUE",
          COMMENT: "TK_COMMENT",
          TEXT: "TK_TEXT",
          UNKNOWN: "TK_UNKNOWN",
          START: BASETOKEN.START,
          RAW: BASETOKEN.RAW,
          EOF: BASETOKEN.EOF
        };
        var directives_core = new Directives(/<\!--/, /-->/);
        var Tokenizer = function(input_string, options) {
          BaseTokenizer.call(this, input_string, options);
          this._current_tag_name = "";
          var templatable_reader = new TemplatablePattern(this._input).read_options(this._options);
          var pattern_reader = new Pattern(this._input);
          this.__patterns = {
            word: templatable_reader.until(/[\n\r\t <]/),
            single_quote: templatable_reader.until_after(/'/),
            double_quote: templatable_reader.until_after(/"/),
            attribute: templatable_reader.until(/[\n\r\t =>]|\/>/),
            element_name: templatable_reader.until(/[\n\r\t >\/]/),
            handlebars_comment: pattern_reader.starting_with(/{{!--/).until_after(/--}}/),
            handlebars: pattern_reader.starting_with(/{{/).until_after(/}}/),
            handlebars_open: pattern_reader.until(/[\n\r\t }]/),
            handlebars_raw_close: pattern_reader.until(/}}/),
            comment: pattern_reader.starting_with(/<!--/).until_after(/-->/),
            cdata: pattern_reader.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
            conditional_comment: pattern_reader.starting_with(/<!\[/).until_after(/]>/),
            processing: pattern_reader.starting_with(/<\?/).until_after(/\?>/)
          };
          if (this._options.indent_handlebars) {
            this.__patterns.word = this.__patterns.word.exclude("handlebars");
          }
          this._unformatted_content_delimiter = null;
          if (this._options.unformatted_content_delimiter) {
            var literal_regexp = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
            this.__patterns.unformatted_content_delimiter = pattern_reader.matching(literal_regexp).until_after(literal_regexp);
          }
        };
        Tokenizer.prototype = new BaseTokenizer();
        Tokenizer.prototype._is_comment = function(current_token) {
          return false;
        };
        Tokenizer.prototype._is_opening = function(current_token) {
          return current_token.type === TOKEN.TAG_OPEN;
        };
        Tokenizer.prototype._is_closing = function(current_token, open_token) {
          return current_token.type === TOKEN.TAG_CLOSE && (open_token && ((current_token.text === ">" || current_token.text === "/>") && open_token.text[0] === "<" || current_token.text === "}}" && open_token.text[0] === "{" && open_token.text[1] === "{"));
        };
        Tokenizer.prototype._reset = function() {
          this._current_tag_name = "";
        };
        Tokenizer.prototype._get_next_token = function(previous_token, open_token) {
          var token = null;
          this._readWhitespace();
          var c = this._input.peek();
          if (c === null) {
            return this._create_token(TOKEN.EOF, "");
          }
          token = token || this._read_open_handlebars(c, open_token);
          token = token || this._read_attribute(c, previous_token, open_token);
          token = token || this._read_close(c, open_token);
          token = token || this._read_raw_content(c, previous_token, open_token);
          token = token || this._read_content_word(c);
          token = token || this._read_comment_or_cdata(c);
          token = token || this._read_processing(c);
          token = token || this._read_open(c, open_token);
          token = token || this._create_token(TOKEN.UNKNOWN, this._input.next());
          return token;
        };
        Tokenizer.prototype._read_comment_or_cdata = function(c) {
          var token = null;
          var resulting_string = null;
          var directives = null;
          if (c === "<") {
            var peek1 = this._input.peek(1);
            if (peek1 === "!") {
              resulting_string = this.__patterns.comment.read();
              if (resulting_string) {
                directives = directives_core.get_directives(resulting_string);
                if (directives && directives.ignore === "start") {
                  resulting_string += directives_core.readIgnored(this._input);
                }
              } else {
                resulting_string = this.__patterns.cdata.read();
              }
            }
            if (resulting_string) {
              token = this._create_token(TOKEN.COMMENT, resulting_string);
              token.directives = directives;
            }
          }
          return token;
        };
        Tokenizer.prototype._read_processing = function(c) {
          var token = null;
          var resulting_string = null;
          var directives = null;
          if (c === "<") {
            var peek1 = this._input.peek(1);
            if (peek1 === "!" || peek1 === "?") {
              resulting_string = this.__patterns.conditional_comment.read();
              resulting_string = resulting_string || this.__patterns.processing.read();
            }
            if (resulting_string) {
              token = this._create_token(TOKEN.COMMENT, resulting_string);
              token.directives = directives;
            }
          }
          return token;
        };
        Tokenizer.prototype._read_open = function(c, open_token) {
          var resulting_string = null;
          var token = null;
          if (!open_token) {
            if (c === "<") {
              resulting_string = this._input.next();
              if (this._input.peek() === "/") {
                resulting_string += this._input.next();
              }
              resulting_string += this.__patterns.element_name.read();
              token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
            }
          }
          return token;
        };
        Tokenizer.prototype._read_open_handlebars = function(c, open_token) {
          var resulting_string = null;
          var token = null;
          if (!open_token) {
            if (this._options.indent_handlebars && c === "{" && this._input.peek(1) === "{") {
              if (this._input.peek(2) === "!") {
                resulting_string = this.__patterns.handlebars_comment.read();
                resulting_string = resulting_string || this.__patterns.handlebars.read();
                token = this._create_token(TOKEN.COMMENT, resulting_string);
              } else {
                resulting_string = this.__patterns.handlebars_open.read();
                token = this._create_token(TOKEN.TAG_OPEN, resulting_string);
              }
            }
          }
          return token;
        };
        Tokenizer.prototype._read_close = function(c, open_token) {
          var resulting_string = null;
          var token = null;
          if (open_token) {
            if (open_token.text[0] === "<" && (c === ">" || c === "/" && this._input.peek(1) === ">")) {
              resulting_string = this._input.next();
              if (c === "/") {
                resulting_string += this._input.next();
              }
              token = this._create_token(TOKEN.TAG_CLOSE, resulting_string);
            } else if (open_token.text[0] === "{" && c === "}" && this._input.peek(1) === "}") {
              this._input.next();
              this._input.next();
              token = this._create_token(TOKEN.TAG_CLOSE, "}}");
            }
          }
          return token;
        };
        Tokenizer.prototype._read_attribute = function(c, previous_token, open_token) {
          var token = null;
          var resulting_string = "";
          if (open_token && open_token.text[0] === "<") {
            if (c === "=") {
              token = this._create_token(TOKEN.EQUALS, this._input.next());
            } else if (c === '"' || c === "'") {
              var content = this._input.next();
              if (c === '"') {
                content += this.__patterns.double_quote.read();
              } else {
                content += this.__patterns.single_quote.read();
              }
              token = this._create_token(TOKEN.VALUE, content);
            } else {
              resulting_string = this.__patterns.attribute.read();
              if (resulting_string) {
                if (previous_token.type === TOKEN.EQUALS) {
                  token = this._create_token(TOKEN.VALUE, resulting_string);
                } else {
                  token = this._create_token(TOKEN.ATTRIBUTE, resulting_string);
                }
              }
            }
          }
          return token;
        };
        Tokenizer.prototype._is_content_unformatted = function(tag_name) {
          return this._options.void_elements.indexOf(tag_name) === -1 && (this._options.content_unformatted.indexOf(tag_name) !== -1 || this._options.unformatted.indexOf(tag_name) !== -1);
        };
        Tokenizer.prototype._read_raw_content = function(c, previous_token, open_token) {
          var resulting_string = "";
          if (open_token && open_token.text[0] === "{") {
            resulting_string = this.__patterns.handlebars_raw_close.read();
          } else if (previous_token.type === TOKEN.TAG_CLOSE && previous_token.opened.text[0] === "<" && previous_token.text[0] !== "/") {
            var tag_name = previous_token.opened.text.substr(1).toLowerCase();
            if (tag_name === "script" || tag_name === "style") {
              var token = this._read_comment_or_cdata(c);
              if (token) {
                token.type = TOKEN.TEXT;
                return token;
              }
              resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
            } else if (this._is_content_unformatted(tag_name)) {
              resulting_string = this._input.readUntil(new RegExp("</" + tag_name + "[\\n\\r\\t ]*?>", "ig"));
            }
          }
          if (resulting_string) {
            return this._create_token(TOKEN.TEXT, resulting_string);
          }
          return null;
        };
        Tokenizer.prototype._read_content_word = function(c) {
          var resulting_string = "";
          if (this._options.unformatted_content_delimiter) {
            if (c === this._options.unformatted_content_delimiter[0]) {
              resulting_string = this.__patterns.unformatted_content_delimiter.read();
            }
          }
          if (!resulting_string) {
            resulting_string = this.__patterns.word.read();
          }
          if (resulting_string) {
            return this._create_token(TOKEN.TEXT, resulting_string);
          }
        };
        module.exports.Tokenizer = Tokenizer;
        module.exports.TOKEN = TOKEN;
      }
    ];
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== void 0) {
        return cachedModule.exports;
      }
      var module = __webpack_module_cache__[moduleId] = {
        exports: {}
      };
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
      return module.exports;
    }
    var __webpack_exports__ = __webpack_require__(18);
    legacy_beautify_html = __webpack_exports__;
  })();
  function html_beautify(html_source, options) {
    return legacy_beautify_html(html_source, options, js_beautify, css_beautify);
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlFormatter.js
  function format2(document, range, options) {
    var value = document.getText();
    var includesEnd = true;
    var initialIndentLevel = 0;
    var tabSize = options.tabSize || 4;
    if (range) {
      var startOffset = document.offsetAt(range.start);
      var extendedStart = startOffset;
      while (extendedStart > 0 && isWhitespace(value, extendedStart - 1)) {
        extendedStart--;
      }
      if (extendedStart === 0 || isEOL(value, extendedStart - 1)) {
        startOffset = extendedStart;
      } else {
        if (extendedStart < startOffset) {
          startOffset = extendedStart + 1;
        }
      }
      var endOffset = document.offsetAt(range.end);
      var extendedEnd = endOffset;
      while (extendedEnd < value.length && isWhitespace(value, extendedEnd)) {
        extendedEnd++;
      }
      if (extendedEnd === value.length || isEOL(value, extendedEnd)) {
        endOffset = extendedEnd;
      }
      range = Range2.create(document.positionAt(startOffset), document.positionAt(endOffset));
      var firstHalf = value.substring(0, startOffset);
      if (new RegExp(/.*[<][^>]*$/).test(firstHalf)) {
        value = value.substring(startOffset, endOffset);
        return [{
          range,
          newText: value
        }];
      }
      includesEnd = endOffset === value.length;
      value = value.substring(startOffset, endOffset);
      if (startOffset !== 0) {
        var startOfLineOffset = document.offsetAt(Position2.create(range.start.line, 0));
        initialIndentLevel = computeIndentLevel(document.getText(), startOfLineOffset, options);
      }
    } else {
      range = Range2.create(Position2.create(0, 0), document.positionAt(value.length));
    }
    var htmlOptions = {
      indent_size: tabSize,
      indent_char: options.insertSpaces ? " " : "	",
      indent_empty_lines: getFormatOption(options, "indentEmptyLines", false),
      wrap_line_length: getFormatOption(options, "wrapLineLength", 120),
      unformatted: getTagsFormatOption(options, "unformatted", void 0),
      content_unformatted: getTagsFormatOption(options, "contentUnformatted", void 0),
      indent_inner_html: getFormatOption(options, "indentInnerHtml", false),
      preserve_newlines: getFormatOption(options, "preserveNewLines", true),
      max_preserve_newlines: getFormatOption(options, "maxPreserveNewLines", 32786),
      indent_handlebars: getFormatOption(options, "indentHandlebars", false),
      end_with_newline: includesEnd && getFormatOption(options, "endWithNewline", false),
      extra_liners: getTagsFormatOption(options, "extraLiners", void 0),
      wrap_attributes: getFormatOption(options, "wrapAttributes", "auto"),
      wrap_attributes_indent_size: getFormatOption(options, "wrapAttributesIndentSize", void 0),
      eol: "\n",
      indent_scripts: getFormatOption(options, "indentScripts", "normal"),
      templating: getTemplatingFormatOption(options, "all"),
      unformatted_content_delimiter: getFormatOption(options, "unformattedContentDelimiter", "")
    };
    var result = html_beautify(trimLeft(value), htmlOptions);
    if (initialIndentLevel > 0) {
      var indent = options.insertSpaces ? repeat(" ", tabSize * initialIndentLevel) : repeat("	", initialIndentLevel);
      result = result.split("\n").join("\n" + indent);
      if (range.start.character === 0) {
        result = indent + result;
      }
    }
    return [{
      range,
      newText: result
    }];
  }
  function trimLeft(str) {
    return str.replace(/^\s+/, "");
  }
  function getFormatOption(options, key, dflt) {
    if (options && options.hasOwnProperty(key)) {
      var value = options[key];
      if (value !== null) {
        return value;
      }
    }
    return dflt;
  }
  function getTagsFormatOption(options, key, dflt) {
    var list = getFormatOption(options, key, null);
    if (typeof list === "string") {
      if (list.length > 0) {
        return list.split(",").map(function(t) {
          return t.trim().toLowerCase();
        });
      }
      return [];
    }
    return dflt;
  }
  function getTemplatingFormatOption(options, dflt) {
    var value = getFormatOption(options, "templating", dflt);
    if (value === true) {
      return ["auto"];
    }
    return ["none"];
  }
  function computeIndentLevel(content, offset, options) {
    var i = offset;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
      var ch = content.charAt(i);
      if (ch === " ") {
        nChars++;
      } else if (ch === "	") {
        nChars += tabSize;
      } else {
        break;
      }
      i++;
    }
    return Math.floor(nChars / tabSize);
  }
  function isEOL(text, offset) {
    return "\r\n".indexOf(text.charAt(offset)) !== -1;
  }
  function isWhitespace(text, offset) {
    return " 	".indexOf(text.charAt(offset)) !== -1;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-uri/index.js
  var LIB;
  LIB = (() => {
    "use strict";
    var t = {470: (t2) => {
      function e2(t3) {
        if (typeof t3 != "string")
          throw new TypeError("Path must be a string. Received " + JSON.stringify(t3));
      }
      function r2(t3, e3) {
        for (var r3, n2 = "", o = 0, i = -1, a = 0, h = 0; h <= t3.length; ++h) {
          if (h < t3.length)
            r3 = t3.charCodeAt(h);
          else {
            if (r3 === 47)
              break;
            r3 = 47;
          }
          if (r3 === 47) {
            if (i === h - 1 || a === 1)
              ;
            else if (i !== h - 1 && a === 2) {
              if (n2.length < 2 || o !== 2 || n2.charCodeAt(n2.length - 1) !== 46 || n2.charCodeAt(n2.length - 2) !== 46) {
                if (n2.length > 2) {
                  var s = n2.lastIndexOf("/");
                  if (s !== n2.length - 1) {
                    s === -1 ? (n2 = "", o = 0) : o = (n2 = n2.slice(0, s)).length - 1 - n2.lastIndexOf("/"), i = h, a = 0;
                    continue;
                  }
                } else if (n2.length === 2 || n2.length === 1) {
                  n2 = "", o = 0, i = h, a = 0;
                  continue;
                }
              }
              e3 && (n2.length > 0 ? n2 += "/.." : n2 = "..", o = 2);
            } else
              n2.length > 0 ? n2 += "/" + t3.slice(i + 1, h) : n2 = t3.slice(i + 1, h), o = h - i - 1;
            i = h, a = 0;
          } else
            r3 === 46 && a !== -1 ? ++a : a = -1;
        }
        return n2;
      }
      var n = {resolve: function() {
        for (var t3, n2 = "", o = false, i = arguments.length - 1; i >= -1 && !o; i--) {
          var a;
          i >= 0 ? a = arguments[i] : (t3 === void 0 && (t3 = process.cwd()), a = t3), e2(a), a.length !== 0 && (n2 = a + "/" + n2, o = a.charCodeAt(0) === 47);
        }
        return n2 = r2(n2, !o), o ? n2.length > 0 ? "/" + n2 : "/" : n2.length > 0 ? n2 : ".";
      }, normalize: function(t3) {
        if (e2(t3), t3.length === 0)
          return ".";
        var n2 = t3.charCodeAt(0) === 47, o = t3.charCodeAt(t3.length - 1) === 47;
        return (t3 = r2(t3, !n2)).length !== 0 || n2 || (t3 = "."), t3.length > 0 && o && (t3 += "/"), n2 ? "/" + t3 : t3;
      }, isAbsolute: function(t3) {
        return e2(t3), t3.length > 0 && t3.charCodeAt(0) === 47;
      }, join: function() {
        if (arguments.length === 0)
          return ".";
        for (var t3, r3 = 0; r3 < arguments.length; ++r3) {
          var o = arguments[r3];
          e2(o), o.length > 0 && (t3 === void 0 ? t3 = o : t3 += "/" + o);
        }
        return t3 === void 0 ? "." : n.normalize(t3);
      }, relative: function(t3, r3) {
        if (e2(t3), e2(r3), t3 === r3)
          return "";
        if ((t3 = n.resolve(t3)) === (r3 = n.resolve(r3)))
          return "";
        for (var o = 1; o < t3.length && t3.charCodeAt(o) === 47; ++o)
          ;
        for (var i = t3.length, a = i - o, h = 1; h < r3.length && r3.charCodeAt(h) === 47; ++h)
          ;
        for (var s = r3.length - h, f = a < s ? a : s, u = -1, c = 0; c <= f; ++c) {
          if (c === f) {
            if (s > f) {
              if (r3.charCodeAt(h + c) === 47)
                return r3.slice(h + c + 1);
              if (c === 0)
                return r3.slice(h + c);
            } else
              a > f && (t3.charCodeAt(o + c) === 47 ? u = c : c === 0 && (u = 0));
            break;
          }
          var l = t3.charCodeAt(o + c);
          if (l !== r3.charCodeAt(h + c))
            break;
          l === 47 && (u = c);
        }
        var p = "";
        for (c = o + u + 1; c <= i; ++c)
          c !== i && t3.charCodeAt(c) !== 47 || (p.length === 0 ? p += ".." : p += "/..");
        return p.length > 0 ? p + r3.slice(h + u) : (h += u, r3.charCodeAt(h) === 47 && ++h, r3.slice(h));
      }, _makeLong: function(t3) {
        return t3;
      }, dirname: function(t3) {
        if (e2(t3), t3.length === 0)
          return ".";
        for (var r3 = t3.charCodeAt(0), n2 = r3 === 47, o = -1, i = true, a = t3.length - 1; a >= 1; --a)
          if ((r3 = t3.charCodeAt(a)) === 47) {
            if (!i) {
              o = a;
              break;
            }
          } else
            i = false;
        return o === -1 ? n2 ? "/" : "." : n2 && o === 1 ? "//" : t3.slice(0, o);
      }, basename: function(t3, r3) {
        if (r3 !== void 0 && typeof r3 != "string")
          throw new TypeError('"ext" argument must be a string');
        e2(t3);
        var n2, o = 0, i = -1, a = true;
        if (r3 !== void 0 && r3.length > 0 && r3.length <= t3.length) {
          if (r3.length === t3.length && r3 === t3)
            return "";
          var h = r3.length - 1, s = -1;
          for (n2 = t3.length - 1; n2 >= 0; --n2) {
            var f = t3.charCodeAt(n2);
            if (f === 47) {
              if (!a) {
                o = n2 + 1;
                break;
              }
            } else
              s === -1 && (a = false, s = n2 + 1), h >= 0 && (f === r3.charCodeAt(h) ? --h == -1 && (i = n2) : (h = -1, i = s));
          }
          return o === i ? i = s : i === -1 && (i = t3.length), t3.slice(o, i);
        }
        for (n2 = t3.length - 1; n2 >= 0; --n2)
          if (t3.charCodeAt(n2) === 47) {
            if (!a) {
              o = n2 + 1;
              break;
            }
          } else
            i === -1 && (a = false, i = n2 + 1);
        return i === -1 ? "" : t3.slice(o, i);
      }, extname: function(t3) {
        e2(t3);
        for (var r3 = -1, n2 = 0, o = -1, i = true, a = 0, h = t3.length - 1; h >= 0; --h) {
          var s = t3.charCodeAt(h);
          if (s !== 47)
            o === -1 && (i = false, o = h + 1), s === 46 ? r3 === -1 ? r3 = h : a !== 1 && (a = 1) : r3 !== -1 && (a = -1);
          else if (!i) {
            n2 = h + 1;
            break;
          }
        }
        return r3 === -1 || o === -1 || a === 0 || a === 1 && r3 === o - 1 && r3 === n2 + 1 ? "" : t3.slice(r3, o);
      }, format: function(t3) {
        if (t3 === null || typeof t3 != "object")
          throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t3);
        return function(t4, e3) {
          var r3 = e3.dir || e3.root, n2 = e3.base || (e3.name || "") + (e3.ext || "");
          return r3 ? r3 === e3.root ? r3 + n2 : r3 + "/" + n2 : n2;
        }(0, t3);
      }, parse: function(t3) {
        e2(t3);
        var r3 = {root: "", dir: "", base: "", ext: "", name: ""};
        if (t3.length === 0)
          return r3;
        var n2, o = t3.charCodeAt(0), i = o === 47;
        i ? (r3.root = "/", n2 = 1) : n2 = 0;
        for (var a = -1, h = 0, s = -1, f = true, u = t3.length - 1, c = 0; u >= n2; --u)
          if ((o = t3.charCodeAt(u)) !== 47)
            s === -1 && (f = false, s = u + 1), o === 46 ? a === -1 ? a = u : c !== 1 && (c = 1) : a !== -1 && (c = -1);
          else if (!f) {
            h = u + 1;
            break;
          }
        return a === -1 || s === -1 || c === 0 || c === 1 && a === s - 1 && a === h + 1 ? s !== -1 && (r3.base = r3.name = h === 0 && i ? t3.slice(1, s) : t3.slice(h, s)) : (h === 0 && i ? (r3.name = t3.slice(1, a), r3.base = t3.slice(1, s)) : (r3.name = t3.slice(h, a), r3.base = t3.slice(h, s)), r3.ext = t3.slice(a, s)), h > 0 ? r3.dir = t3.slice(0, h - 1) : i && (r3.dir = "/"), r3;
      }, sep: "/", delimiter: ":", win32: null, posix: null};
      n.posix = n, t2.exports = n;
    }, 447: (t2, e2, r2) => {
      var n;
      if (r2.r(e2), r2.d(e2, {URI: () => g, Utils: () => O}), typeof process == "object")
        n = process.platform === "win32";
      else if (typeof navigator == "object") {
        var o = navigator.userAgent;
        n = o.indexOf("Windows") >= 0;
      }
      var i, a, h = (i = function(t3, e3) {
        return (i = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(t4, e4) {
          t4.__proto__ = e4;
        } || function(t4, e4) {
          for (var r3 in e4)
            Object.prototype.hasOwnProperty.call(e4, r3) && (t4[r3] = e4[r3]);
        })(t3, e3);
      }, function(t3, e3) {
        function r3() {
          this.constructor = t3;
        }
        i(t3, e3), t3.prototype = e3 === null ? Object.create(e3) : (r3.prototype = e3.prototype, new r3());
      }), s = /^\w[\w\d+.-]*$/, f = /^\//, u = /^\/\//, c = "", l = "/", p = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, g = function() {
        function t3(t4, e3, r3, n2, o2, i2) {
          i2 === void 0 && (i2 = false), typeof t4 == "object" ? (this.scheme = t4.scheme || c, this.authority = t4.authority || c, this.path = t4.path || c, this.query = t4.query || c, this.fragment = t4.fragment || c) : (this.scheme = function(t5, e4) {
            return t5 || e4 ? t5 : "file";
          }(t4, i2), this.authority = e3 || c, this.path = function(t5, e4) {
            switch (t5) {
              case "https":
              case "http":
              case "file":
                e4 ? e4[0] !== l && (e4 = l + e4) : e4 = l;
            }
            return e4;
          }(this.scheme, r3 || c), this.query = n2 || c, this.fragment = o2 || c, function(t5, e4) {
            if (!t5.scheme && e4)
              throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + t5.authority + '", path: "' + t5.path + '", query: "' + t5.query + '", fragment: "' + t5.fragment + '"}');
            if (t5.scheme && !s.test(t5.scheme))
              throw new Error("[UriError]: Scheme contains illegal characters.");
            if (t5.path) {
              if (t5.authority) {
                if (!f.test(t5.path))
                  throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
              } else if (u.test(t5.path))
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
          }(this, i2));
        }
        return t3.isUri = function(e3) {
          return e3 instanceof t3 || !!e3 && typeof e3.authority == "string" && typeof e3.fragment == "string" && typeof e3.path == "string" && typeof e3.query == "string" && typeof e3.scheme == "string" && typeof e3.fsPath == "function" && typeof e3.with == "function" && typeof e3.toString == "function";
        }, Object.defineProperty(t3.prototype, "fsPath", {get: function() {
          return C(this, false);
        }, enumerable: false, configurable: true}), t3.prototype.with = function(t4) {
          if (!t4)
            return this;
          var e3 = t4.scheme, r3 = t4.authority, n2 = t4.path, o2 = t4.query, i2 = t4.fragment;
          return e3 === void 0 ? e3 = this.scheme : e3 === null && (e3 = c), r3 === void 0 ? r3 = this.authority : r3 === null && (r3 = c), n2 === void 0 ? n2 = this.path : n2 === null && (n2 = c), o2 === void 0 ? o2 = this.query : o2 === null && (o2 = c), i2 === void 0 ? i2 = this.fragment : i2 === null && (i2 = c), e3 === this.scheme && r3 === this.authority && n2 === this.path && o2 === this.query && i2 === this.fragment ? this : new v(e3, r3, n2, o2, i2);
        }, t3.parse = function(t4, e3) {
          e3 === void 0 && (e3 = false);
          var r3 = p.exec(t4);
          return r3 ? new v(r3[2] || c, x(r3[4] || c), x(r3[5] || c), x(r3[7] || c), x(r3[9] || c), e3) : new v(c, c, c, c, c);
        }, t3.file = function(t4) {
          var e3 = c;
          if (n && (t4 = t4.replace(/\\/g, l)), t4[0] === l && t4[1] === l) {
            var r3 = t4.indexOf(l, 2);
            r3 === -1 ? (e3 = t4.substring(2), t4 = l) : (e3 = t4.substring(2, r3), t4 = t4.substring(r3) || l);
          }
          return new v("file", e3, t4, c, c);
        }, t3.from = function(t4) {
          return new v(t4.scheme, t4.authority, t4.path, t4.query, t4.fragment);
        }, t3.prototype.toString = function(t4) {
          return t4 === void 0 && (t4 = false), A(this, t4);
        }, t3.prototype.toJSON = function() {
          return this;
        }, t3.revive = function(e3) {
          if (e3) {
            if (e3 instanceof t3)
              return e3;
            var r3 = new v(e3);
            return r3._formatted = e3.external, r3._fsPath = e3._sep === d ? e3.fsPath : null, r3;
          }
          return e3;
        }, t3;
      }(), d = n ? 1 : void 0, v = function(t3) {
        function e3() {
          var e4 = t3 !== null && t3.apply(this, arguments) || this;
          return e4._formatted = null, e4._fsPath = null, e4;
        }
        return h(e3, t3), Object.defineProperty(e3.prototype, "fsPath", {get: function() {
          return this._fsPath || (this._fsPath = C(this, false)), this._fsPath;
        }, enumerable: false, configurable: true}), e3.prototype.toString = function(t4) {
          return t4 === void 0 && (t4 = false), t4 ? A(this, true) : (this._formatted || (this._formatted = A(this, false)), this._formatted);
        }, e3.prototype.toJSON = function() {
          var t4 = {$mid: 1};
          return this._fsPath && (t4.fsPath = this._fsPath, t4._sep = d), this._formatted && (t4.external = this._formatted), this.path && (t4.path = this.path), this.scheme && (t4.scheme = this.scheme), this.authority && (t4.authority = this.authority), this.query && (t4.query = this.query), this.fragment && (t4.fragment = this.fragment), t4;
        }, e3;
      }(g), m = ((a = {})[58] = "%3A", a[47] = "%2F", a[63] = "%3F", a[35] = "%23", a[91] = "%5B", a[93] = "%5D", a[64] = "%40", a[33] = "%21", a[36] = "%24", a[38] = "%26", a[39] = "%27", a[40] = "%28", a[41] = "%29", a[42] = "%2A", a[43] = "%2B", a[44] = "%2C", a[59] = "%3B", a[61] = "%3D", a[32] = "%20", a);
      function y(t3, e3) {
        for (var r3 = void 0, n2 = -1, o2 = 0; o2 < t3.length; o2++) {
          var i2 = t3.charCodeAt(o2);
          if (i2 >= 97 && i2 <= 122 || i2 >= 65 && i2 <= 90 || i2 >= 48 && i2 <= 57 || i2 === 45 || i2 === 46 || i2 === 95 || i2 === 126 || e3 && i2 === 47)
            n2 !== -1 && (r3 += encodeURIComponent(t3.substring(n2, o2)), n2 = -1), r3 !== void 0 && (r3 += t3.charAt(o2));
          else {
            r3 === void 0 && (r3 = t3.substr(0, o2));
            var a2 = m[i2];
            a2 !== void 0 ? (n2 !== -1 && (r3 += encodeURIComponent(t3.substring(n2, o2)), n2 = -1), r3 += a2) : n2 === -1 && (n2 = o2);
          }
        }
        return n2 !== -1 && (r3 += encodeURIComponent(t3.substring(n2))), r3 !== void 0 ? r3 : t3;
      }
      function b(t3) {
        for (var e3 = void 0, r3 = 0; r3 < t3.length; r3++) {
          var n2 = t3.charCodeAt(r3);
          n2 === 35 || n2 === 63 ? (e3 === void 0 && (e3 = t3.substr(0, r3)), e3 += m[n2]) : e3 !== void 0 && (e3 += t3[r3]);
        }
        return e3 !== void 0 ? e3 : t3;
      }
      function C(t3, e3) {
        var r3;
        return r3 = t3.authority && t3.path.length > 1 && t3.scheme === "file" ? "//" + t3.authority + t3.path : t3.path.charCodeAt(0) === 47 && (t3.path.charCodeAt(1) >= 65 && t3.path.charCodeAt(1) <= 90 || t3.path.charCodeAt(1) >= 97 && t3.path.charCodeAt(1) <= 122) && t3.path.charCodeAt(2) === 58 ? e3 ? t3.path.substr(1) : t3.path[1].toLowerCase() + t3.path.substr(2) : t3.path, n && (r3 = r3.replace(/\//g, "\\")), r3;
      }
      function A(t3, e3) {
        var r3 = e3 ? b : y, n2 = "", o2 = t3.scheme, i2 = t3.authority, a2 = t3.path, h2 = t3.query, s2 = t3.fragment;
        if (o2 && (n2 += o2, n2 += ":"), (i2 || o2 === "file") && (n2 += l, n2 += l), i2) {
          var f2 = i2.indexOf("@");
          if (f2 !== -1) {
            var u2 = i2.substr(0, f2);
            i2 = i2.substr(f2 + 1), (f2 = u2.indexOf(":")) === -1 ? n2 += r3(u2, false) : (n2 += r3(u2.substr(0, f2), false), n2 += ":", n2 += r3(u2.substr(f2 + 1), false)), n2 += "@";
          }
          (f2 = (i2 = i2.toLowerCase()).indexOf(":")) === -1 ? n2 += r3(i2, false) : (n2 += r3(i2.substr(0, f2), false), n2 += i2.substr(f2));
        }
        if (a2) {
          if (a2.length >= 3 && a2.charCodeAt(0) === 47 && a2.charCodeAt(2) === 58)
            (c2 = a2.charCodeAt(1)) >= 65 && c2 <= 90 && (a2 = "/" + String.fromCharCode(c2 + 32) + ":" + a2.substr(3));
          else if (a2.length >= 2 && a2.charCodeAt(1) === 58) {
            var c2;
            (c2 = a2.charCodeAt(0)) >= 65 && c2 <= 90 && (a2 = String.fromCharCode(c2 + 32) + ":" + a2.substr(2));
          }
          n2 += r3(a2, true);
        }
        return h2 && (n2 += "?", n2 += r3(h2, false)), s2 && (n2 += "#", n2 += e3 ? s2 : y(s2, false)), n2;
      }
      function w(t3) {
        try {
          return decodeURIComponent(t3);
        } catch (e3) {
          return t3.length > 3 ? t3.substr(0, 3) + w(t3.substr(3)) : t3;
        }
      }
      var _ = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function x(t3) {
        return t3.match(_) ? t3.replace(_, function(t4) {
          return w(t4);
        }) : t3;
      }
      var O, P = r2(470), j = function() {
        for (var t3 = 0, e3 = 0, r3 = arguments.length; e3 < r3; e3++)
          t3 += arguments[e3].length;
        var n2 = Array(t3), o2 = 0;
        for (e3 = 0; e3 < r3; e3++)
          for (var i2 = arguments[e3], a2 = 0, h2 = i2.length; a2 < h2; a2++, o2++)
            n2[o2] = i2[a2];
        return n2;
      }, U = P.posix || P;
      !function(t3) {
        t3.joinPath = function(t4) {
          for (var e3 = [], r3 = 1; r3 < arguments.length; r3++)
            e3[r3 - 1] = arguments[r3];
          return t4.with({path: U.join.apply(U, j([t4.path], e3))});
        }, t3.resolvePath = function(t4) {
          for (var e3 = [], r3 = 1; r3 < arguments.length; r3++)
            e3[r3 - 1] = arguments[r3];
          var n2 = t4.path || "/";
          return t4.with({path: U.resolve.apply(U, j([n2], e3))});
        }, t3.dirname = function(t4) {
          var e3 = U.dirname(t4.path);
          return e3.length === 1 && e3.charCodeAt(0) === 46 ? t4 : t4.with({path: e3});
        }, t3.basename = function(t4) {
          return U.basename(t4.path);
        }, t3.extname = function(t4) {
          return U.extname(t4.path);
        };
      }(O || (O = {}));
    }}, e = {};
    function r(n) {
      if (e[n])
        return e[n].exports;
      var o = e[n] = {exports: {}};
      return t[n](o, o.exports, r), o.exports;
    }
    return r.d = (t2, e2) => {
      for (var n in e2)
        r.o(e2, n) && !r.o(t2, n) && Object.defineProperty(t2, n, {enumerable: true, get: e2[n]});
    }, r.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r.r = (t2) => {
      typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t2, "__esModule", {value: true});
    }, r(447);
  })();
  var {URI: URI2, Utils} = LIB;

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlLinks.js
  function normalizeRef(url) {
    var first = url[0];
    var last = url[url.length - 1];
    if (first === last && (first === "'" || first === '"')) {
      url = url.substr(1, url.length - 2);
    }
    return url;
  }
  function validateRef(url, languageId) {
    if (!url.length) {
      return false;
    }
    if (languageId === "handlebars" && /{{.*}}/.test(url)) {
      return false;
    }
    return /\b(w[\w\d+.-]*:\/\/)?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/.test(url);
  }
  function getWorkspaceUrl(documentUri, tokenContent, documentContext, base) {
    if (/^\s*javascript\:/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
      return void 0;
    }
    tokenContent = tokenContent.replace(/^\s*/g, "");
    if (/^https?:\/\//i.test(tokenContent) || /^file:\/\//i.test(tokenContent)) {
      return tokenContent;
    }
    if (/^\#/i.test(tokenContent)) {
      return documentUri + tokenContent;
    }
    if (/^\/\//i.test(tokenContent)) {
      var pickedScheme = startsWith(documentUri, "https://") ? "https" : "http";
      return pickedScheme + ":" + tokenContent.replace(/^\s*/g, "");
    }
    if (documentContext) {
      return documentContext.resolveReference(tokenContent, base || documentUri);
    }
    return tokenContent;
  }
  function createLink(document, documentContext, attributeValue, startOffset, endOffset, base) {
    var tokenContent = normalizeRef(attributeValue);
    if (!validateRef(tokenContent, document.languageId)) {
      return void 0;
    }
    if (tokenContent.length < attributeValue.length) {
      startOffset++;
      endOffset--;
    }
    var workspaceUrl = getWorkspaceUrl(document.uri, tokenContent, documentContext, base);
    if (!workspaceUrl || !isValidURI(workspaceUrl)) {
      return void 0;
    }
    return {
      range: Range2.create(document.positionAt(startOffset), document.positionAt(endOffset)),
      target: workspaceUrl
    };
  }
  function isValidURI(uri) {
    try {
      URI2.parse(uri);
      return true;
    } catch (e) {
      return false;
    }
  }
  function findDocumentLinks(document, documentContext) {
    var newLinks = [];
    var scanner = createScanner(document.getText(), 0);
    var token = scanner.scan();
    var lastAttributeName = void 0;
    var afterBase = false;
    var base = void 0;
    var idLocations = {};
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTag:
          if (!base) {
            var tagName = scanner.getTokenText().toLowerCase();
            afterBase = tagName === "base";
          }
          break;
        case TokenType.AttributeName:
          lastAttributeName = scanner.getTokenText().toLowerCase();
          break;
        case TokenType.AttributeValue:
          if (lastAttributeName === "src" || lastAttributeName === "href") {
            var attributeValue = scanner.getTokenText();
            if (!afterBase) {
              var link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
              if (link) {
                newLinks.push(link);
              }
            }
            if (afterBase && typeof base === "undefined") {
              base = normalizeRef(attributeValue);
              if (base && documentContext) {
                base = documentContext.resolveReference(base, document.uri);
              }
            }
            afterBase = false;
            lastAttributeName = void 0;
          } else if (lastAttributeName === "id") {
            var id = normalizeRef(scanner.getTokenText());
            idLocations[id] = scanner.getTokenOffset();
          }
          break;
      }
      token = scanner.scan();
    }
    for (var _i = 0, newLinks_1 = newLinks; _i < newLinks_1.length; _i++) {
      var link = newLinks_1[_i];
      var localWithHash = document.uri + "#";
      if (link.target && startsWith(link.target, localWithHash)) {
        var target = link.target.substr(localWithHash.length);
        var offset = idLocations[target];
        if (offset !== void 0) {
          var pos = document.positionAt(offset);
          link.target = "" + localWithHash + (pos.line + 1) + "," + (pos.character + 1);
        }
      }
    }
    return newLinks;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlHighlighting.js
  function findDocumentHighlights(document, position, htmlDocument) {
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    if (!node.tag) {
      return [];
    }
    var result = [];
    var startTagRange = getTagNameRange(TokenType.StartTag, document, node.start);
    var endTagRange = typeof node.endTagStart === "number" && getTagNameRange(TokenType.EndTag, document, node.endTagStart);
    if (startTagRange && covers(startTagRange, position) || endTagRange && covers(endTagRange, position)) {
      if (startTagRange) {
        result.push({kind: DocumentHighlightKind2.Read, range: startTagRange});
      }
      if (endTagRange) {
        result.push({kind: DocumentHighlightKind2.Read, range: endTagRange});
      }
    }
    return result;
  }
  function isBeforeOrEqual(pos1, pos2) {
    return pos1.line < pos2.line || pos1.line === pos2.line && pos1.character <= pos2.character;
  }
  function covers(range, position) {
    return isBeforeOrEqual(range.start, position) && isBeforeOrEqual(position, range.end);
  }
  function getTagNameRange(tokenType, document, startOffset) {
    var scanner = createScanner(document.getText(), startOffset);
    var token = scanner.scan();
    while (token !== TokenType.EOS && token !== tokenType) {
      token = scanner.scan();
    }
    if (token !== TokenType.EOS) {
      return {start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd())};
    }
    return null;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlSymbolsProvider.js
  function findDocumentSymbols(document, htmlDocument) {
    var symbols = [];
    htmlDocument.roots.forEach(function(node) {
      provideFileSymbolsInternal(document, node, "", symbols);
    });
    return symbols;
  }
  function provideFileSymbolsInternal(document, node, container, symbols) {
    var name = nodeToName(node);
    var location = Location.create(document.uri, Range2.create(document.positionAt(node.start), document.positionAt(node.end)));
    var symbol = {
      name,
      location,
      containerName: container,
      kind: SymbolKind2.Field
    };
    symbols.push(symbol);
    node.children.forEach(function(child) {
      provideFileSymbolsInternal(document, child, name, symbols);
    });
  }
  function nodeToName(node) {
    var name = node.tag;
    if (node.attributes) {
      var id = node.attributes["id"];
      var classes = node.attributes["class"];
      if (id) {
        name += "#" + id.replace(/[\"\']/g, "");
      }
      if (classes) {
        name += classes.replace(/[\"\']/g, "").split(/\s+/).map(function(className) {
          return "." + className;
        }).join("");
      }
    }
    return name || "?";
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlRename.js
  function doRename(document, position, newName, htmlDocument) {
    var _a3;
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    if (!node.tag) {
      return null;
    }
    if (!isWithinTagRange(node, offset, node.tag)) {
      return null;
    }
    var edits = [];
    var startTagRange = {
      start: document.positionAt(node.start + "<".length),
      end: document.positionAt(node.start + "<".length + node.tag.length)
    };
    edits.push({
      range: startTagRange,
      newText: newName
    });
    if (node.endTagStart) {
      var endTagRange = {
        start: document.positionAt(node.endTagStart + "</".length),
        end: document.positionAt(node.endTagStart + "</".length + node.tag.length)
      };
      edits.push({
        range: endTagRange,
        newText: newName
      });
    }
    var changes = (_a3 = {}, _a3[document.uri.toString()] = edits, _a3);
    return {
      changes
    };
  }
  function isWithinTagRange(node, offset, nodeTag) {
    if (node.endTagStart) {
      if (node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + nodeTag.length) {
        return true;
      }
    }
    return node.start + "<".length <= offset && offset <= node.start + "<".length + nodeTag.length;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlMatchingTagPosition.js
  function findMatchingTagPosition(document, position, htmlDocument) {
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    if (!node.tag) {
      return null;
    }
    if (!node.endTagStart) {
      return null;
    }
    if (node.start + "<".length <= offset && offset <= node.start + "<".length + node.tag.length) {
      var mirrorOffset = offset - "<".length - node.start + node.endTagStart + "</".length;
      return document.positionAt(mirrorOffset);
    }
    if (node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + node.tag.length) {
      var mirrorOffset = offset - "</".length - node.endTagStart + node.start + "<".length;
      return document.positionAt(mirrorOffset);
    }
    return null;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlLinkedEditing.js
  function findLinkedEditingRanges(document, position, htmlDocument) {
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    var tagLength = node.tag ? node.tag.length : 0;
    if (!node.endTagStart) {
      return null;
    }
    if (node.start + "<".length <= offset && offset <= node.start + "<".length + tagLength || node.endTagStart + "</".length <= offset && offset <= node.endTagStart + "</".length + tagLength) {
      return [
        Range2.create(document.positionAt(node.start + "<".length), document.positionAt(node.start + "<".length + tagLength)),
        Range2.create(document.positionAt(node.endTagStart + "</".length), document.positionAt(node.endTagStart + "</".length + tagLength))
      ];
    }
    return null;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlFolding.js
  function limitRanges(ranges, rangeLimit) {
    ranges = ranges.sort(function(r1, r2) {
      var diff = r1.startLine - r2.startLine;
      if (diff === 0) {
        diff = r1.endLine - r2.endLine;
      }
      return diff;
    });
    var top = void 0;
    var previous = [];
    var nestingLevels = [];
    var nestingLevelCounts = [];
    var setNestingLevel = function(index, level2) {
      nestingLevels[index] = level2;
      if (level2 < 30) {
        nestingLevelCounts[level2] = (nestingLevelCounts[level2] || 0) + 1;
      }
    };
    for (var i = 0; i < ranges.length; i++) {
      var entry = ranges[i];
      if (!top) {
        top = entry;
        setNestingLevel(i, 0);
      } else {
        if (entry.startLine > top.startLine) {
          if (entry.endLine <= top.endLine) {
            previous.push(top);
            top = entry;
            setNestingLevel(i, previous.length);
          } else if (entry.startLine > top.endLine) {
            do {
              top = previous.pop();
            } while (top && entry.startLine > top.endLine);
            if (top) {
              previous.push(top);
            }
            top = entry;
            setNestingLevel(i, previous.length);
          }
        }
      }
    }
    var entries = 0;
    var maxLevel = 0;
    for (var i = 0; i < nestingLevelCounts.length; i++) {
      var n = nestingLevelCounts[i];
      if (n) {
        if (n + entries > rangeLimit) {
          maxLevel = i;
          break;
        }
        entries += n;
      }
    }
    var result = [];
    for (var i = 0; i < ranges.length; i++) {
      var level = nestingLevels[i];
      if (typeof level === "number") {
        if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) {
          result.push(ranges[i]);
        }
      }
    }
    return result;
  }
  function getFoldingRanges(document, context) {
    var scanner = createScanner(document.getText());
    var token = scanner.scan();
    var ranges = [];
    var stack = [];
    var lastTagName = null;
    var prevStart = -1;
    function addRange(range) {
      ranges.push(range);
      prevStart = range.startLine;
    }
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.StartTag: {
          var tagName = scanner.getTokenText();
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          stack.push({startLine, tagName});
          lastTagName = tagName;
          break;
        }
        case TokenType.EndTag: {
          lastTagName = scanner.getTokenText();
          break;
        }
        case TokenType.StartTagClose:
          if (!lastTagName || !isVoidElement(lastTagName)) {
            break;
          }
        case TokenType.EndTagClose:
        case TokenType.StartTagSelfClose: {
          var i = stack.length - 1;
          while (i >= 0 && stack[i].tagName !== lastTagName) {
            i--;
          }
          if (i >= 0) {
            var stackElement = stack[i];
            stack.length = i;
            var line = document.positionAt(scanner.getTokenOffset()).line;
            var startLine = stackElement.startLine;
            var endLine = line - 1;
            if (endLine > startLine && prevStart !== startLine) {
              addRange({startLine, endLine});
            }
          }
          break;
        }
        case TokenType.Comment: {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var text = scanner.getTokenText();
          var m = text.match(/^\s*#(region\b)|(endregion\b)/);
          if (m) {
            if (m[1]) {
              stack.push({startLine, tagName: ""});
            } else {
              var i = stack.length - 1;
              while (i >= 0 && stack[i].tagName.length) {
                i--;
              }
              if (i >= 0) {
                var stackElement = stack[i];
                stack.length = i;
                var endLine = startLine;
                startLine = stackElement.startLine;
                if (endLine > startLine && prevStart !== startLine) {
                  addRange({startLine, endLine, kind: FoldingRangeKind.Region});
                }
              }
            }
          } else {
            var endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
            if (startLine < endLine) {
              addRange({startLine, endLine, kind: FoldingRangeKind.Comment});
            }
          }
          break;
        }
      }
      token = scanner.scan();
    }
    var rangeLimit = context && context.rangeLimit || Number.MAX_VALUE;
    if (ranges.length > rangeLimit) {
      return limitRanges(ranges, rangeLimit);
    }
    return ranges;
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/services/htmlSelectionRange.js
  function getSelectionRanges(document, positions) {
    function getSelectionRange(position) {
      var applicableRanges = getApplicableRanges(document, position);
      var prev = void 0;
      var current = void 0;
      for (var index = applicableRanges.length - 1; index >= 0; index--) {
        var range = applicableRanges[index];
        if (!prev || range[0] !== prev[0] || range[1] !== prev[1]) {
          current = SelectionRange.create(Range2.create(document.positionAt(applicableRanges[index][0]), document.positionAt(applicableRanges[index][1])), current);
        }
        prev = range;
      }
      if (!current) {
        current = SelectionRange.create(Range2.create(position, position));
      }
      return current;
    }
    return positions.map(getSelectionRange);
  }
  function getApplicableRanges(document, position) {
    var htmlDoc = parse(document.getText());
    var currOffset = document.offsetAt(position);
    var currNode = htmlDoc.findNodeAt(currOffset);
    var result = getAllParentTagRanges(currNode);
    if (currNode.startTagEnd && !currNode.endTagStart) {
      if (currNode.startTagEnd !== currNode.end) {
        return [[currNode.start, currNode.end]];
      }
      var closeRange = Range2.create(document.positionAt(currNode.startTagEnd - 2), document.positionAt(currNode.startTagEnd));
      var closeText = document.getText(closeRange);
      if (closeText === "/>") {
        result.unshift([currNode.start + 1, currNode.startTagEnd - 2]);
      } else {
        result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
      }
      var attributeLevelRanges = getAttributeLevelRanges(document, currNode, currOffset);
      result = attributeLevelRanges.concat(result);
      return result;
    }
    if (!currNode.startTagEnd || !currNode.endTagStart) {
      return result;
    }
    result.unshift([currNode.start, currNode.end]);
    if (currNode.start < currOffset && currOffset < currNode.startTagEnd) {
      result.unshift([currNode.start + 1, currNode.startTagEnd - 1]);
      var attributeLevelRanges = getAttributeLevelRanges(document, currNode, currOffset);
      result = attributeLevelRanges.concat(result);
      return result;
    } else if (currNode.startTagEnd <= currOffset && currOffset <= currNode.endTagStart) {
      result.unshift([currNode.startTagEnd, currNode.endTagStart]);
      return result;
    } else {
      if (currOffset >= currNode.endTagStart + 2) {
        result.unshift([currNode.endTagStart + 2, currNode.end - 1]);
      }
      return result;
    }
  }
  function getAllParentTagRanges(initialNode) {
    var currNode = initialNode;
    var getNodeRanges = function(n) {
      if (n.startTagEnd && n.endTagStart && n.startTagEnd < n.endTagStart) {
        return [
          [n.startTagEnd, n.endTagStart],
          [n.start, n.end]
        ];
      }
      return [
        [n.start, n.end]
      ];
    };
    var result = [];
    while (currNode.parent) {
      currNode = currNode.parent;
      getNodeRanges(currNode).forEach(function(r) {
        return result.push(r);
      });
    }
    return result;
  }
  function getAttributeLevelRanges(document, currNode, currOffset) {
    var currNodeRange = Range2.create(document.positionAt(currNode.start), document.positionAt(currNode.end));
    var currNodeText = document.getText(currNodeRange);
    var relativeOffset = currOffset - currNode.start;
    var scanner = createScanner(currNodeText);
    var token = scanner.scan();
    var positionOffset = currNode.start;
    var result = [];
    var isInsideAttribute = false;
    var attrStart = -1;
    while (token !== TokenType.EOS) {
      switch (token) {
        case TokenType.AttributeName: {
          if (relativeOffset < scanner.getTokenOffset()) {
            isInsideAttribute = false;
            break;
          }
          if (relativeOffset <= scanner.getTokenEnd()) {
            result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);
          }
          isInsideAttribute = true;
          attrStart = scanner.getTokenOffset();
          break;
        }
        case TokenType.AttributeValue: {
          if (!isInsideAttribute) {
            break;
          }
          var valueText = scanner.getTokenText();
          if (relativeOffset < scanner.getTokenOffset()) {
            result.push([attrStart, scanner.getTokenEnd()]);
            break;
          }
          if (relativeOffset >= scanner.getTokenOffset() && relativeOffset <= scanner.getTokenEnd()) {
            result.unshift([scanner.getTokenOffset(), scanner.getTokenEnd()]);
            if (valueText[0] === '"' && valueText[valueText.length - 1] === '"' || valueText[0] === "'" && valueText[valueText.length - 1] === "'") {
              if (relativeOffset >= scanner.getTokenOffset() + 1 && relativeOffset <= scanner.getTokenEnd() - 1) {
                result.unshift([scanner.getTokenOffset() + 1, scanner.getTokenEnd() - 1]);
              }
            }
            result.push([attrStart, scanner.getTokenEnd()]);
          }
          break;
        }
      }
      token = scanner.scan();
    }
    return result.map(function(pair) {
      return [pair[0] + positionOffset, pair[1] + positionOffset];
    });
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/languageFacts/data/webCustomData.js
  var htmlData = {
    version: 1.1,
    tags: [
      {
        name: "html",
        description: {
          kind: "markdown",
          value: "The html element represents the root of an HTML document."
        },
        attributes: [
          {
            name: "manifest",
            description: {
              kind: "markdown",
              value: "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details."
            }
          },
          {
            name: "version",
            description: 'Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called \u201Cquirks mode\u201D when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.'
          },
          {
            name: "xmlns",
            description: 'Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/html"
          }
        ]
      },
      {
        name: "head",
        description: {
          kind: "markdown",
          value: "The head element represents a collection of metadata for the Document."
        },
        attributes: [
          {
            name: "profile",
            description: "The URIs of one or more metadata profiles, separated by white space."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/head"
          }
        ]
      },
      {
        name: "title",
        description: {
          kind: "markdown",
          value: "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/title"
          }
        ]
      },
      {
        name: "base",
        description: {
          kind: "markdown",
          value: "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information."
        },
        attributes: [
          {
            name: "href",
            description: {
              kind: "markdown",
              value: "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
            }
          },
          {
            name: "target",
            description: {
              kind: "markdown",
              value: "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/base"
          }
        ]
      },
      {
        name: "link",
        description: {
          kind: "markdown",
          value: "The link element allows authors to link their document to other resources."
        },
        attributes: [
          {
            name: "href",
            description: {
              kind: "markdown",
              value: 'This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.'
            }
          },
          {
            name: "crossorigin",
            valueSet: "xo",
            description: {
              kind: "markdown",
              value: 'This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request\'s credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.'
            }
          },
          {
            name: "rel",
            description: {
              kind: "markdown",
              value: "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
            }
          },
          {
            name: "media",
            description: {
              kind: "markdown",
              value: "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets \u2014 it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
            }
          },
          {
            name: "hreflang",
            description: {
              kind: "markdown",
              value: "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present."
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: 'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.'
            }
          },
          {
            name: "sizes",
            description: {
              kind: "markdown",
              value: "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
            }
          },
          {
            name: "as",
            description: 'This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on\xA0the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image,\xA0video or a script.") request header.'
          },
          {
            name: "importance",
            description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
          },
          {
            name: "importance",
            description: '**`auto`**: Indicates\xA0**no\xA0preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the\xA0browser\xA0that the resource is of\xA0**high** priority.\n\n**`low`**:\xA0Indicates to the\xA0browser\xA0that the resource is of\xA0**low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.'
          },
          {
            name: "integrity",
            description: "Contains inline metadata \u2014 a base64-encoded cryptographic hash of the resource (file) you\u2019re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
          },
          {
            name: "referrerpolicy",
            description: 'A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent\u2019s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer\'s path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.'
          },
          {
            name: "title",
            description: 'The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](https://developer.mozilla.org/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets).'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/link"
          }
        ]
      },
      {
        name: "meta",
        description: {
          kind: "markdown",
          value: "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements."
        },
        attributes: [
          {
            name: "name",
            description: {
              kind: "markdown",
              value: 'This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [`itemprop`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.\n\nThis metadata name is associated with the value contained by the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn\'t define an application-name.\n    \n*   `author` which defines the name of the document\'s author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page\'s content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name="referrer">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https\u2192https), but does not send a referrer to less secure URLs (https\u2192http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don\'t send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document\'s publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name="robots">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether\xA0crawlers are permitted or forbidden access to the web site.")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot\'s behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you\'re viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.\n    \n    Values for the content of `<meta name="viewport">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of \'<meta name="viewport">\' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It\'s primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").'
            }
          },
          {
            name: "http-equiv",
            description: {
              kind: "markdown",
              value: 'Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `"content-language"`  \n    Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.\n    \n*   `"content-security-policy"`  \n    Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `"content-type"`  \n    Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string \'`text/html`\' followed by a character set with the following syntax: \'`; charset=_IANAcharset_`\', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.\n    \n    **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can\'t change documents\' types in XHTML or HTML5\'s XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `"refresh"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string \'`;url=`\', and a valid URL.\n*   `"set-cookie"`  \n    Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.'
            }
          },
          {
            name: "content",
            description: {
              kind: "markdown",
              value: "This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used."
            }
          },
          {
            name: "charset",
            description: {
              kind: "markdown",
              value: 'This attribute declares the page\'s character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn\'t request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don\'t map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its\xA0scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page\'s character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.\n*   It is strongly recommended to define the character encoding. If a page\'s encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended.'
            }
          },
          {
            name: "scheme",
            description: "This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/meta"
          }
        ]
      },
      {
        name: "style",
        description: {
          kind: "markdown",
          value: "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user."
        },
        attributes: [
          {
            name: "media",
            description: {
              kind: "markdown",
              value: "This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing."
            }
          },
          {
            name: "nonce",
            description: {
              kind: "markdown",
              value: "A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource\u2019s policy is otherwise trivial."
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified \u2014 there is very little reason to include this in modern web documents."
            }
          },
          {
            name: "scoped",
            valueSet: "v"
          },
          {
            name: "title",
            description: "This attribute specifies [alternative style sheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) sets."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/style"
          }
        ]
      },
      {
        name: "body",
        description: {
          kind: "markdown",
          value: "The body element represents the content of the document."
        },
        attributes: [
          {
            name: "onafterprint",
            description: {
              kind: "markdown",
              value: "Function to call after the user has printed the document."
            }
          },
          {
            name: "onbeforeprint",
            description: {
              kind: "markdown",
              value: "Function to call when the user requests printing of the document."
            }
          },
          {
            name: "onbeforeunload",
            description: {
              kind: "markdown",
              value: "Function to call when the document is about to be unloaded."
            }
          },
          {
            name: "onhashchange",
            description: {
              kind: "markdown",
              value: "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
            }
          },
          {
            name: "onlanguagechange",
            description: {
              kind: "markdown",
              value: "Function to call when the preferred languages changed."
            }
          },
          {
            name: "onmessage",
            description: {
              kind: "markdown",
              value: "Function to call when the document has received a message."
            }
          },
          {
            name: "onoffline",
            description: {
              kind: "markdown",
              value: "Function to call when network communication has failed."
            }
          },
          {
            name: "ononline",
            description: {
              kind: "markdown",
              value: "Function to call when network communication has been restored."
            }
          },
          {
            name: "onpagehide"
          },
          {
            name: "onpageshow"
          },
          {
            name: "onpopstate",
            description: {
              kind: "markdown",
              value: "Function to call when the user has navigated session history."
            }
          },
          {
            name: "onstorage",
            description: {
              kind: "markdown",
              value: "Function to call when the storage area has changed."
            }
          },
          {
            name: "onunload",
            description: {
              kind: "markdown",
              value: "Function to call when the document is going away."
            }
          },
          {
            name: "alink",
            description: 'Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._'
          },
          {
            name: "background",
            description: 'URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._'
          },
          {
            name: "bgcolor",
            description: 'Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._'
          },
          {
            name: "bottommargin",
            description: 'The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
          },
          {
            name: "leftmargin",
            description: 'The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
          },
          {
            name: "link",
            description: 'Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._'
          },
          {
            name: "onblur",
            description: "Function to call when the document loses focus."
          },
          {
            name: "onerror",
            description: "Function to call when the document fails to load properly."
          },
          {
            name: "onfocus",
            description: "Function to call when the document receives focus."
          },
          {
            name: "onload",
            description: "Function to call when the document has finished loading."
          },
          {
            name: "onredo",
            description: "Function to call when the user has moved forward in undo transaction history."
          },
          {
            name: "onresize",
            description: "Function to call when the document has been resized."
          },
          {
            name: "onundo",
            description: "Function to call when the user has moved backward in undo transaction history."
          },
          {
            name: "rightmargin",
            description: 'The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
          },
          {
            name: "text",
            description: 'Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property on the element instead._'
          },
          {
            name: "topmargin",
            description: 'The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
          },
          {
            name: "vlink",
            description: 'Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/body"
          }
        ]
      },
      {
        name: "article",
        description: {
          kind: "markdown",
          value: "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1\u2013h6 element) as a child of the article element."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/article"
          }
        ]
      },
      {
        name: "section",
        description: {
          kind: "markdown",
          value: "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/section"
          }
        ]
      },
      {
        name: "nav",
        description: {
          kind: "markdown",
          value: "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/nav"
          }
        ]
      },
      {
        name: "aside",
        description: {
          kind: "markdown",
          value: "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/aside"
          }
        ]
      },
      {
        name: "h1",
        description: {
          kind: "markdown",
          value: "The h1 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "h2",
        description: {
          kind: "markdown",
          value: "The h2 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "h3",
        description: {
          kind: "markdown",
          value: "The h3 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "h4",
        description: {
          kind: "markdown",
          value: "The h4 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "h5",
        description: {
          kind: "markdown",
          value: "The h5 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "h6",
        description: {
          kind: "markdown",
          value: "The h6 element represents a section heading."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
          }
        ]
      },
      {
        name: "header",
        description: {
          kind: "markdown",
          value: "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/header"
          }
        ]
      },
      {
        name: "footer",
        description: {
          kind: "markdown",
          value: "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/footer"
          }
        ]
      },
      {
        name: "address",
        description: {
          kind: "markdown",
          value: "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/address"
          }
        ]
      },
      {
        name: "p",
        description: {
          kind: "markdown",
          value: "The p element represents a paragraph."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/p"
          }
        ]
      },
      {
        name: "hr",
        description: {
          kind: "markdown",
          value: "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book."
        },
        attributes: [
          {
            name: "align",
            description: "Sets the alignment of the rule on the page. If no value is specified, the default value is `left`."
          },
          {
            name: "color",
            description: "Sets the color of the rule through color name or hexadecimal value."
          },
          {
            name: "noshade",
            description: "Sets the rule to have no shading."
          },
          {
            name: "size",
            description: "Sets the height, in pixels, of the rule."
          },
          {
            name: "width",
            description: "Sets the length of the rule on the page through a pixel or percentage value."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/hr"
          }
        ]
      },
      {
        name: "pre",
        description: {
          kind: "markdown",
          value: "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements."
        },
        attributes: [
          {
            name: "cols",
            description: 'Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
          },
          {
            name: "width",
            description: 'Contains the _preferred_ count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
          },
          {
            name: "wrap",
            description: 'Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space "The white-space CSS property sets how white space inside an element is handled.") instead.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/pre"
          }
        ]
      },
      {
        name: "blockquote",
        description: {
          kind: "markdown",
          value: "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations."
        },
        attributes: [
          {
            name: "cite",
            description: {
              kind: "markdown",
              value: "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/blockquote"
          }
        ]
      },
      {
        name: "ol",
        description: {
          kind: "markdown",
          value: "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document."
        },
        attributes: [
          {
            name: "reversed",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute specifies that the items of the list are specified in reversed order."
            }
          },
          {
            name: "start",
            description: {
              kind: "markdown",
              value: 'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.'
            }
          },
          {
            name: "type",
            valueSet: "lt",
            description: {
              kind: "markdown",
              value: "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
            }
          },
          {
            name: "compact",
            description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/ol"
          }
        ]
      },
      {
        name: "ul",
        description: {
          kind: "markdown",
          value: "The ul element represents a list of items, where the order of the items is not important \u2014 that is, where changing the order would not materially change the meaning of the document."
        },
        attributes: [
          {
            name: "compact",
            description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Usage note:\xA0**Do not use this attribute, as it has been deprecated: the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [line-height](https://developer.mozilla.org/en-US/docs/CSS/line-height) can be used with a value of `80%`.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/ul"
          }
        ]
      },
      {
        name: "li",
        description: {
          kind: "markdown",
          value: "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element."
        },
        attributes: [
          {
            name: "value",
            description: {
              kind: "markdown",
              value: 'This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko\xA09.0, negative values were incorrectly converted to 0. Starting in Gecko\xA09.0 all integer values are correctly parsed.'
            }
          },
          {
            name: "type",
            description: 'This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/li"
          }
        ]
      },
      {
        name: "dl",
        description: {
          kind: "markdown",
          value: "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/dl"
          }
        ]
      },
      {
        name: "dt",
        description: {
          kind: "markdown",
          value: "The dt element represents the term, or name, part of a term-description group in a description list (dl element)."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/dt"
          }
        ]
      },
      {
        name: "dd",
        description: {
          kind: "markdown",
          value: "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element)."
        },
        attributes: [
          {
            name: "nowrap",
            description: "If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/dd"
          }
        ]
      },
      {
        name: "figure",
        description: {
          kind: "markdown",
          value: "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/figure"
          }
        ]
      },
      {
        name: "figcaption",
        description: {
          kind: "markdown",
          value: "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/figcaption"
          }
        ]
      },
      {
        name: "main",
        description: {
          kind: "markdown",
          value: "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/main"
          }
        ]
      },
      {
        name: "div",
        description: {
          kind: "markdown",
          value: "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/div"
          }
        ]
      },
      {
        name: "a",
        description: {
          kind: "markdown",
          value: "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents."
        },
        attributes: [
          {
            name: "href",
            description: {
              kind: "markdown",
              value: "Contains a URL or a URL fragment that the hyperlink points to."
            }
          },
          {
            name: "target",
            description: {
              kind: "markdown",
              value: 'Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use `rel="noopener"`.'
            }
          },
          {
            name: "download",
            description: {
              kind: "markdown",
              value: "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\n**Notes:**\n\n*   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).\n*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n*   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute."
            }
          },
          {
            name: "ping",
            description: {
              kind: "markdown",
              value: 'Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking.'
            }
          },
          {
            name: "rel",
            description: {
              kind: "markdown",
              value: "Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
            }
          },
          {
            name: "hreflang",
            description: {
              kind: "markdown",
              value: 'This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt "Tags for Identifying Languages").'
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: 'Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type "MIME type: A\xA0MIME type\xA0(now properly called "media type", but\xA0also sometimes "content type") is a string sent along\xA0with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled\xA0audio/ogg, or an image file\xA0image/png).") for the linked URL. It is purely advisory, with no built-in functionality.'
            }
          },
          {
            name: "referrerpolicy",
            description: "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to send when fetching the URL:\n\n*   `'no-referrer'` means the `Referer:` header will not be sent.\n*   `'no-referrer-when-downgrade'` means no `Referer:` header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n*   `'origin'` means the referrer will be the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the page, not including information after the domain.\n*   `'origin-when-cross-origin'` meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n*   `'strict-origin-when-cross-origin'`\n*   `'unsafe-url'` means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/a"
          }
        ]
      },
      {
        name: "em",
        description: {
          kind: "markdown",
          value: "The em element represents stress emphasis of its contents."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/em"
          }
        ]
      },
      {
        name: "strong",
        description: {
          kind: "markdown",
          value: "The strong element represents strong importance, seriousness, or urgency for its contents."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/strong"
          }
        ]
      },
      {
        name: "small",
        description: {
          kind: "markdown",
          value: "The small element represents side comments such as small print."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/small"
          }
        ]
      },
      {
        name: "s",
        description: {
          kind: "markdown",
          value: "The s element represents contents that are no longer accurate or no longer relevant."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/s"
          }
        ]
      },
      {
        name: "cite",
        description: {
          kind: "markdown",
          value: "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/cite"
          }
        ]
      },
      {
        name: "q",
        description: {
          kind: "markdown",
          value: "The q element represents some phrasing content quoted from another source."
        },
        attributes: [
          {
            name: "cite",
            description: {
              kind: "markdown",
              value: "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/q"
          }
        ]
      },
      {
        name: "dfn",
        description: {
          kind: "markdown",
          value: "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/dfn"
          }
        ]
      },
      {
        name: "abbr",
        description: {
          kind: "markdown",
          value: "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/abbr"
          }
        ]
      },
      {
        name: "ruby",
        description: {
          kind: "markdown",
          value: "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]"
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/ruby"
          }
        ]
      },
      {
        name: "rb",
        description: {
          kind: "markdown",
          value: "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/rb"
          }
        ]
      },
      {
        name: "rt",
        description: {
          kind: "markdown",
          value: "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/rt"
          }
        ]
      },
      {
        name: "rp",
        description: {
          kind: "markdown",
          value: "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/rp"
          }
        ]
      },
      {
        name: "time",
        description: {
          kind: "markdown",
          value: "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below."
        },
        attributes: [
          {
            name: "datetime",
            description: {
              kind: "markdown",
              value: "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/time"
          }
        ]
      },
      {
        name: "code",
        description: {
          kind: "markdown",
          value: "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/code"
          }
        ]
      },
      {
        name: "var",
        description: {
          kind: "markdown",
          value: "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/var"
          }
        ]
      },
      {
        name: "samp",
        description: {
          kind: "markdown",
          value: "The samp element represents sample or quoted output from another program or computing system."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/samp"
          }
        ]
      },
      {
        name: "kbd",
        description: {
          kind: "markdown",
          value: "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands)."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/kbd"
          }
        ]
      },
      {
        name: "sub",
        description: {
          kind: "markdown",
          value: "The sub element represents a subscript."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/sub"
          }
        ]
      },
      {
        name: "sup",
        description: {
          kind: "markdown",
          value: "The sup element represents a superscript."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/sup"
          }
        ]
      },
      {
        name: "i",
        description: {
          kind: "markdown",
          value: "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/i"
          }
        ]
      },
      {
        name: "b",
        description: {
          kind: "markdown",
          value: "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/b"
          }
        ]
      },
      {
        name: "u",
        description: {
          kind: "markdown",
          value: "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/u"
          }
        ]
      },
      {
        name: "mark",
        description: {
          kind: "markdown",
          value: "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/mark"
          }
        ]
      },
      {
        name: "bdi",
        description: {
          kind: "markdown",
          value: "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]"
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdi"
          }
        ]
      },
      {
        name: "bdo",
        description: {
          kind: "markdown",
          value: "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]"
        },
        attributes: [
          {
            name: "dir",
            description: "The direction in which text should be rendered in this element's contents. Possible values are:\n\n*   `ltr`: Indicates that the text should go in a left-to-right direction.\n*   `rtl`: Indicates that the text should go in a right-to-left direction."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdo"
          }
        ]
      },
      {
        name: "span",
        description: {
          kind: "markdown",
          value: "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/span"
          }
        ]
      },
      {
        name: "br",
        description: {
          kind: "markdown",
          value: "The br element represents a line break."
        },
        attributes: [
          {
            name: "clear",
            description: "Indicates where to begin the next line after the break."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/br"
          }
        ]
      },
      {
        name: "wbr",
        description: {
          kind: "markdown",
          value: "The wbr element represents a line break opportunity."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/wbr"
          }
        ]
      },
      {
        name: "ins",
        description: {
          kind: "markdown",
          value: "The ins element represents an addition to the document."
        },
        attributes: [
          {
            name: "cite",
            description: "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system."
          },
          {
            name: "datetime",
            description: 'This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/ins"
          }
        ]
      },
      {
        name: "del",
        description: {
          kind: "markdown",
          value: "The del element represents a removal from the document."
        },
        attributes: [
          {
            name: "cite",
            description: {
              kind: "markdown",
              value: "A URI for a resource that explains the change (for example, meeting minutes)."
            }
          },
          {
            name: "datetime",
            description: {
              kind: "markdown",
              value: 'This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/del"
          }
        ]
      },
      {
        name: "picture",
        description: {
          kind: "markdown",
          value: "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/picture"
          }
        ]
      },
      {
        name: "img",
        description: {
          kind: "markdown",
          value: "An img element represents an image."
        },
        attributes: [
          {
            name: "alt",
            description: {
              kind: "markdown",
              value: 'This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element\'s `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.'
            }
          },
          {
            name: "src",
            description: {
              kind: "markdown",
              value: "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
            }
          },
          {
            name: "srcset",
            description: {
              kind: "markdown",
              value: "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\n1.  a URL to an image,\n2.  optionally, whitespace followed by one of:\n    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.\n    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: `1x`.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example."
            }
          },
          {
            name: "crossorigin",
            valueSet: "xo",
            description: {
              kind: "markdown",
              value: 'This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being "[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas)." The allowed values are:'
            }
          },
          {
            name: "usemap",
            description: {
              kind: "markdown",
              value: 'The partial URL (starting with \'#\') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.\n\n**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element.'
            }
          },
          {
            name: "ismap",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\n**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute.'
            }
          },
          {
            name: "width",
            description: {
              kind: "markdown",
              value: "The intrinsic width of the image in pixels."
            }
          },
          {
            name: "height",
            description: {
              kind: "markdown",
              value: "The intrinsic height of the image in pixels."
            }
          },
          {
            name: "decoding",
            description: "Provides an image decoding hint to the browser. The allowed values are:"
          },
          {
            name: "decoding",
            description: "`sync`\n\nDecode the image synchronously for atomic presentation with other content.\n\n`async`\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\n`auto`\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user."
          },
          {
            name: "importance",
            description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
          },
          {
            name: "importance",
            description: "`auto`: Indicates\xA0**no\xA0preference**. The browser may use its own heuristics to decide the priority of the image.\n\n`high`: Indicates to the\xA0browser\xA0that the image is of\xA0**high** priority.\n\n`low`:\xA0Indicates to the\xA0browser\xA0that the image is of\xA0**low** priority."
          },
          {
            name: "intrinsicsize",
            description: "This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it\u2019s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html)"
          },
          {
            name: "referrerpolicy",
            description: "A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent\u2019s default behavior if no policy is otherwise specified.\n*   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.\n*   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n*   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: "sizes",
            description: "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\n1.  a media condition. This must be omitted for the last item.\n2.  a source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image\u2019s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/img"
          }
        ]
      },
      {
        name: "iframe",
        description: {
          kind: "markdown",
          value: "The iframe element represents a nested browsing context."
        },
        attributes: [
          {
            name: "src",
            description: {
              kind: "markdown",
              value: 'The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`\'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute "The Element method removeAttribute() removes the attribute with the specified name from the element.")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.'
            }
          },
          {
            name: "srcdoc",
            description: {
              kind: "markdown",
              value: "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: 'A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL."), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server."), or [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base "The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.") elements; the `formtarget` attribute of the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open "The\xA0Window interface\'s open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn\'t exist, then a new window is opened and the specified resource is loaded into its browsing context.") method.'
            }
          },
          {
            name: "sandbox",
            valueSet: "sb",
            description: {
              kind: "markdown",
              value: 'Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\n*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).\n*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).\n*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).\n*   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.\n*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n*   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).\n*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").\n*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).\n*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent\'s storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).\n*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).\n*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\n**Notes about sandboxing:**\n\n*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute \u2014 making it no more secure than not using the `sandbox` attribute at all.\n*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` \u2014 such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.\n*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier.'
            }
          },
          {
            name: "seamless",
            valueSet: "v"
          },
          {
            name: "allowfullscreen",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method.'
            }
          },
          {
            name: "width",
            description: {
              kind: "markdown",
              value: "The width of the frame in CSS pixels. Default is `300`."
            }
          },
          {
            name: "height",
            description: {
              kind: "markdown",
              value: "The height of the frame in CSS pixels. Default is `150`."
            }
          },
          {
            name: "allow",
            description: "Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `<iframe>`."
          },
          {
            name: "allowpaymentrequest",
            description: "Set to `true` if a cross-origin `<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)."
          },
          {
            name: "allowpaymentrequest",
            description: 'This attribute is considered a legacy attribute and redefined as `allow="payment"`.'
          },
          {
            name: "csp",
            description: 'A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp "The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.") for details.'
          },
          {
            name: "importance",
            description: "The download priority of the resource in the `<iframe>`'s `src` attribute. Allowed values:\n\n`auto` (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\n`high`\n\nThe resource should be downloaded before other lower-priority page resources.\n\n`low`\n\nThe resource should be downloaded after other higher-priority page resources."
          },
          {
            name: "referrerpolicy",
            description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame\'s resource:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS\u2192HTTPS), but don\'t send it to a less secure destination (HTTPS\u2192HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS\u2192HTTPS), and send no header to a less secure destination (HTTPS\u2192HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/iframe"
          }
        ]
      },
      {
        name: "embed",
        description: {
          kind: "markdown",
          value: "The embed element provides an integration point for an external (typically non-HTML) application or interactive content."
        },
        attributes: [
          {
            name: "src",
            description: {
              kind: "markdown",
              value: "The URL\xA0of the resource being embedded."
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: "The MIME\xA0type to use to select the plug-in to instantiate."
            }
          },
          {
            name: "width",
            description: {
              kind: "markdown",
              value: "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
            }
          },
          {
            name: "height",
            description: {
              kind: "markdown",
              value: "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/embed"
          }
        ]
      },
      {
        name: "object",
        description: {
          kind: "markdown",
          value: "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin."
        },
        attributes: [
          {
            name: "data",
            description: {
              kind: "markdown",
              value: "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: "The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined."
            }
          },
          {
            name: "typemustmatch",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used."
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
            }
          },
          {
            name: "usemap",
            description: {
              kind: "markdown",
              value: "A hash-name reference to a [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element."
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.'
            }
          },
          {
            name: "width",
            description: {
              kind: "markdown",
              value: "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
            }
          },
          {
            name: "height",
            description: {
              kind: "markdown",
              value: "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
            }
          },
          {
            name: "archive",
            description: "A space-separated list of URIs for archives of resources for the object."
          },
          {
            name: "border",
            description: "The width of a border around the control, in pixels."
          },
          {
            name: "classid",
            description: "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
          },
          {
            name: "codebase",
            description: "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document."
          },
          {
            name: "codetype",
            description: "The content type of the data specified by **classid**."
          },
          {
            name: "declare",
            description: "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused."
          },
          {
            name: "standby",
            description: "A message that the browser can show while loading the object's implementation and data."
          },
          {
            name: "tabindex",
            description: "The position of the element in the tabbing navigation order for the current document."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/object"
          }
        ]
      },
      {
        name: "param",
        description: {
          kind: "markdown",
          value: "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own."
        },
        attributes: [
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "Name of the parameter."
            }
          },
          {
            name: "value",
            description: {
              kind: "markdown",
              value: "Specifies the value of the parameter."
            }
          },
          {
            name: "type",
            description: 'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.'
          },
          {
            name: "valuetype",
            description: 'Specifies the type of the `value` attribute. Possible values are:\n\n*   data: Default value. The value is passed to the object\'s implementation as a string.\n*   ref: The value is a URI to a resource where run-time values are stored.\n*   object: An ID of another [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/param"
          }
        ]
      },
      {
        name: "video",
        description: {
          kind: "markdown",
          value: "A video element is used for playing videos or movies, and audio files with captions."
        },
        attributes: [
          {
            name: "src"
          },
          {
            name: "crossorigin",
            valueSet: "xo"
          },
          {
            name: "poster"
          },
          {
            name: "preload",
            valueSet: "pl"
          },
          {
            name: "autoplay",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data."
            }
          },
          {
            name: "mediagroup"
          },
          {
            name: "loop",
            valueSet: "v"
          },
          {
            name: "muted",
            valueSet: "v"
          },
          {
            name: "controls",
            valueSet: "v"
          },
          {
            name: "width"
          },
          {
            name: "height"
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/video"
          }
        ]
      },
      {
        name: "audio",
        description: {
          kind: "markdown",
          value: "An audio element represents a sound or audio stream."
        },
        attributes: [
          {
            name: "src",
            description: {
              kind: "markdown",
              value: 'The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element within the audio block to specify the audio to embed.'
            }
          },
          {
            name: "crossorigin",
            valueSet: "xo",
            description: {
              kind: "markdown",
              value: 'This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.'
            }
          },
          {
            name: "preload",
            valueSet: "pl",
            description: {
              kind: "markdown",
              value: "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over\xA0`preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
            }
          },
          {
            name: "autoplay",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "A Boolean attribute:\xA0if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\n**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control."
            }
          },
          {
            name: "mediagroup"
          },
          {
            name: "loop",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "A Boolean attribute:\xA0if specified, the audio player will\xA0automatically seek back to the start\xA0upon reaching the end of the audio."
            }
          },
          {
            name: "muted",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
            }
          },
          {
            name: "controls",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/audio"
          }
        ]
      },
      {
        name: "source",
        description: {
          kind: "markdown",
          value: "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own."
        },
        attributes: [
          {
            name: "src",
            description: {
              kind: "markdown",
              value: 'Required for [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element:\xA0the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document."), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: "The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs."
            }
          },
          {
            name: "sizes",
            description: 'Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.  \nThe `sizes` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
          },
          {
            name: "srcset",
            description: "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\n1.  one URL to an image,\n2.  a width descriptor, that is a positive integer directly followed by `'w'`. The default value, if missing, is the infinity.\n3.  a pixel density descriptor, that is a positive floating number directly followed by `'x'`. The default value, if missing, is `1x`.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.  \nThe browser chooses the most adequate image to display at a given point of time.  \nThe `srcset` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
          },
          {
            name: "media",
            description: '[Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries) of the resource\'s intended media; this should be used only in a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/source"
          }
        ]
      },
      {
        name: "track",
        description: {
          kind: "markdown",
          value: "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own."
        },
        attributes: [
          {
            name: "default",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
            }
          },
          {
            name: "kind",
            valueSet: "tk",
            description: {
              kind: "markdown",
              value: "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.)\xA0The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
            }
          },
          {
            name: "label",
            description: {
              kind: "markdown",
              value: "A user-readable title of the text track which is used by the browser when listing available text tracks."
            }
          },
          {
            name: "src",
            description: {
              kind: "markdown",
              value: 'Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document \u2014 unless the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element:\xA0the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute.'
            }
          },
          {
            name: "srclang",
            description: {
              kind: "markdown",
              value: "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to\xA0`subtitles,` then `srclang` must be defined."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/track"
          }
        ]
      },
      {
        name: "map",
        description: {
          kind: "markdown",
          value: "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children."
        },
        attributes: [
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/map"
          }
        ]
      },
      {
        name: "area",
        description: {
          kind: "markdown",
          value: "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map."
        },
        attributes: [
          {
            name: "alt"
          },
          {
            name: "coords"
          },
          {
            name: "shape",
            valueSet: "sh"
          },
          {
            name: "href"
          },
          {
            name: "target"
          },
          {
            name: "download"
          },
          {
            name: "ping"
          },
          {
            name: "rel"
          },
          {
            name: "hreflang"
          },
          {
            name: "type"
          },
          {
            name: "accesskey",
            description: "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/area"
          }
        ]
      },
      {
        name: "table",
        description: {
          kind: "markdown",
          value: "The table element represents data with more than one dimension, in the form of a table."
        },
        attributes: [
          {
            name: "border"
          },
          {
            name: "align",
            description: 'This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\n*   left: the table is displayed on the left side of the document;\n*   center: the table is displayed in the center of the document;\n*   right: the table is displayed on the right side of the document.\n\n**Usage Note**\n\n*   **Do not use this attribute**, as it has been deprecated. The [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table "The HTML <table> element represents tabular data \u2014 that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). Set [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") and [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") to `auto` or [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin "The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.") to `0 auto` to achieve an effect that is similar to the align attribute.\n*   Prior to Firefox 4, Firefox also supported the `middle`, `absmiddle`, and `abscenter` values as synonyms of `center`, in quirks mode only.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/table"
          }
        ]
      },
      {
        name: "caption",
        description: {
          kind: "markdown",
          value: "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element."
        },
        attributes: [
          {
            name: "align",
            description: 'This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:\n\n`left`\n\nThe caption is displayed to the left of the table.\n\n`top`\n\nThe caption is displayed above the table.\n\n`right`\n\nThe caption is displayed to the right of the table.\n\n`bottom`\n\nThe caption is displayed below the table.\n\n**Usage note:** Do not use this attribute, as it has been deprecated. The [`<caption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.") element should be styled using the [CSS](https://developer.mozilla.org/en-US/docs/CSS) properties [`caption-side`](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side "The caption-side CSS property puts the content of a table\'s <caption> on the specified side. The values are relative to the writing-mode of the table.") and [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.").'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/caption"
          }
        ]
      },
      {
        name: "colgroup",
        description: {
          kind: "markdown",
          value: "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element."
        },
        attributes: [
          {
            name: "span"
          },
          {
            name: "align",
            description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug\xA02212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") elements may override this value using their own [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-align) attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/colgroup"
          }
        ]
      },
      {
        name: "col",
        description: {
          kind: "markdown",
          value: "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup."
        },
        attributes: [
          {
            name: "span"
          },
          {
            name: "align",
            description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug\xA02212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, its value is inherited from the [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-align) of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/col"
          }
        ]
      },
      {
        name: "tbody",
        description: {
          kind: "markdown",
          value: "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table."
        },
        attributes: [
          {
            name: "align",
            description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/tbody"
          }
        ]
      },
      {
        name: "thead",
        description: {
          kind: "markdown",
          value: "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table."
        },
        attributes: [
          {
            name: "align",
            description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-charoff) attributes Unimplemented (see [bug\xA02212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/thead"
          }
        ]
      },
      {
        name: "tfoot",
        description: {
          kind: "markdown",
          value: "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table."
        },
        attributes: [
          {
            name: "align",
            description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes Unimplemented (see [bug\xA02212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/tfoot"
          }
        ]
      },
      {
        name: "tr",
        description: {
          kind: "markdown",
          value: "The tr element represents a row of cells in a table."
        },
        attributes: [
          {
            name: "align",
            description: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") which specifies how the cell\'s context should be aligned horizontally within the cells in the row; this is shorthand for using `align` on every cell in the row individually. Possible values are:\n\n`left`\n\nAlign the content of each cell at its left edge.\n\n`center`\n\nCenter the contents of each cell between their left and right edges.\n\n`right`\n\nAlign the content of each cell at its right edge.\n\n`justify`\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\n`char`\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for `align`, the parent node\'s value is inherited.\n\nInstead of using the obsolete `align` attribute, you should instead use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to establish `left`, `center`, `right`, or `justify` alignment for the row\'s cells. To apply character-based alignment, set the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the alignment character (such as `"."` or `","`).'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/tr"
          }
        ]
      },
      {
        name: "td",
        description: {
          kind: "markdown",
          value: "The td element represents a data cell in a table."
        },
        attributes: [
          {
            name: "colspan"
          },
          {
            name: "rowspan"
          },
          {
            name: "headers"
          },
          {
            name: "abbr",
            description: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute."
          },
          {
            name: "align",
            description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-charoff) attributes Unimplemented (see [bug\xA02212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char). Unimplemented in CSS3.'
          },
          {
            name: "axis",
            description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard."
          },
          {
            name: "bgcolor",
            description: 'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n\xA0\n\n`black` = "#000000"\n\n\xA0\n\n`green` = "#008000"\n\n\xA0\n\n`silver` = "#C0C0C0"\n\n\xA0\n\n`lime` = "#00FF00"\n\n\xA0\n\n`gray` = "#808080"\n\n\xA0\n\n`olive` = "#808000"\n\n\xA0\n\n`white` = "#FFFFFF"\n\n\xA0\n\n`yellow` = "#FFFF00"\n\n\xA0\n\n`maroon` = "#800000"\n\n\xA0\n\n`navy` = "#000080"\n\n\xA0\n\n`red` = "#FF0000"\n\n\xA0\n\n`blue` = "#0000FF"\n\n\xA0\n\n`purple` = "#800080"\n\n\xA0\n\n`teal` = "#008080"\n\n\xA0\n\n`fuchsia` = "#FF00FF"\n\n\xA0\n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/CSS) instead.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/td"
          }
        ]
      },
      {
        name: "th",
        description: {
          kind: "markdown",
          value: "The th element represents a header cell in a table."
        },
        attributes: [
          {
            name: "colspan"
          },
          {
            name: "rowspan"
          },
          {
            name: "headers"
          },
          {
            name: "scope",
            valueSet: "s"
          },
          {
            name: "sorted"
          },
          {
            name: "abbr",
            description: {
              kind: "markdown",
              value: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
            }
          },
          {
            name: "align",
            description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.'
          },
          {
            name: "axis",
            description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard: use the [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead."
          },
          {
            name: "bgcolor",
            description: 'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n\xA0\n\n`black` = "#000000"\n\n\xA0\n\n`green` = "#008000"\n\n\xA0\n\n`silver` = "#C0C0C0"\n\n\xA0\n\n`lime` = "#00FF00"\n\n\xA0\n\n`gray` = "#808080"\n\n\xA0\n\n`olive` = "#808000"\n\n\xA0\n\n`white` = "#FFFFFF"\n\n\xA0\n\n`yellow` = "#FFFF00"\n\n\xA0\n\n`maroon` = "#800000"\n\n\xA0\n\n`navy` = "#000080"\n\n\xA0\n\n`red` = "#FF0000"\n\n\xA0\n\n`blue` = "#0000FF"\n\n\xA0\n\n`purple` = "#800080"\n\n\xA0\n\n`teal` = "#008080"\n\n\xA0\n\n`fuchsia` = "#FF00FF"\n\n\xA0\n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<th>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th "The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). To create a similar effect use the [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) instead.'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/th"
          }
        ]
      },
      {
        name: "form",
        description: {
          kind: "markdown",
          value: "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing."
        },
        attributes: [
          {
            name: "accept-charset",
            description: {
              kind: "markdown",
              value: 'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.'
            }
          },
          {
            name: "action",
            description: {
              kind: "markdown",
              value: 'The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
            }
          },
          {
            name: "autocomplete",
            valueSet: "o",
            description: {
              kind: "markdown",
              value: "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields)."
            }
          },
          {
            name: "enctype",
            valueSet: "et",
            description: {
              kind: "markdown",
              value: 'When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
            }
          },
          {
            name: "method",
            valueSet: "m",
            description: {
              kind: "markdown",
              value: 'The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a \'?\' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a\xA0[`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.\n\nThis value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
            }
          },
          {
            name: "novalidate",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.'
            }
          },
          {
            name: "target",
            description: {
              kind: "markdown",
              value: 'A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").\n\nHTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
            }
          },
          {
            name: "accept",
            description: 'A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
          },
          {
            name: "autocapitalize",
            description: "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/form"
          }
        ]
      },
      {
        name: "label",
        description: {
          kind: "markdown",
          value: "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself."
        },
        attributes: [
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.'
            }
          },
          {
            name: "for",
            description: {
              kind: "markdown",
              value: "The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is\xA0not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/label"
          }
        ]
      },
      {
        name: "input",
        description: {
          kind: "markdown",
          value: "The input element represents a typed data field, usually with a form control to allow the user to edit the data."
        },
        attributes: [
          {
            name: "accept"
          },
          {
            name: "alt"
          },
          {
            name: "autocomplete",
            valueSet: "inputautocomplete"
          },
          {
            name: "autofocus",
            valueSet: "v"
          },
          {
            name: "checked",
            valueSet: "v"
          },
          {
            name: "dirname"
          },
          {
            name: "disabled",
            valueSet: "v"
          },
          {
            name: "form"
          },
          {
            name: "formaction"
          },
          {
            name: "formenctype",
            valueSet: "et"
          },
          {
            name: "formmethod",
            valueSet: "fm"
          },
          {
            name: "formnovalidate",
            valueSet: "v"
          },
          {
            name: "formtarget"
          },
          {
            name: "height"
          },
          {
            name: "inputmode",
            valueSet: "im"
          },
          {
            name: "list"
          },
          {
            name: "max"
          },
          {
            name: "maxlength"
          },
          {
            name: "min"
          },
          {
            name: "minlength"
          },
          {
            name: "multiple",
            valueSet: "v"
          },
          {
            name: "name"
          },
          {
            name: "pattern"
          },
          {
            name: "placeholder"
          },
          {
            name: "readonly",
            valueSet: "v"
          },
          {
            name: "required",
            valueSet: "v"
          },
          {
            name: "size"
          },
          {
            name: "src"
          },
          {
            name: "step"
          },
          {
            name: "type",
            valueSet: "t"
          },
          {
            name: "value"
          },
          {
            name: "width"
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/input"
          }
        ]
      },
      {
        name: "button",
        description: {
          kind: "markdown",
          value: "The button element represents a button labeled by its contents."
        },
        attributes: [
          {
            name: "autofocus",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
            }
          },
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element with the **disabled** attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.'
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements anywhere within a document, not just as descendants of [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements.'
            }
          },
          {
            name: "formaction",
            description: {
              kind: "markdown",
              value: "The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner."
            }
          },
          {
            name: "formenctype",
            valueSet: "et",
            description: {
              kind: "markdown",
              value: 'If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: Use this value if you are using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.\n*   `text/plain`\n\nIf this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button\'s form owner.'
            }
          },
          {
            name: "formmethod",
            valueSet: "fm",
            description: {
              kind: "markdown",
              value: "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\n*   `post`: The data from the form are included in the body of the form and sent to the server.\n*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner."
            }
          },
          {
            name: "formnovalidate",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner."
            }
          },
          {
            name: "formtarget",
            description: {
              kind: "markdown",
              value: "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed browsing context.\n*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`."
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "The name of the button, which is submitted with the form data."
            }
          },
          {
            name: "type",
            valueSet: "bt",
            description: {
              kind: "markdown",
              value: "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
            }
          },
          {
            name: "value",
            description: {
              kind: "markdown",
              value: "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
            }
          },
          {
            name: "autocomplete",
            description: 'The use of this attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") is nonstandard and Firefox-specific. By default, unlike other browsers, [Firefox persists the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Setting the value of this attribute to `off` (i.e. `autocomplete="off"`) disables this feature. See [bug\xA0654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 "if disabled state is changed with javascript, the normal state doesn\'t return after refreshing the page").'
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/button"
          }
        ]
      },
      {
        name: "select",
        description: {
          kind: "markdown",
          value: "The select element represents a control for selecting amongst a set of options."
        },
        attributes: [
          {
            name: "autocomplete",
            valueSet: "inputautocomplete",
            description: {
              kind: "markdown",
              value: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent\'s](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent\'s: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete.'
            }
          },
          {
            name: "autofocus",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
            }
          },
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'This attribute lets you specify the form element to\xA0which\xA0the select element is associated\xA0(that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.'
            }
          },
          {
            name: "multiple",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "This attribute is used to specify the name of the control."
            }
          },
          {
            name: "required",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "A Boolean attribute indicating that an option with a non-empty string value must be selected."
            }
          },
          {
            name: "size",
            description: {
              kind: "markdown",
              value: "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/select"
          }
        ]
      },
      {
        name: "datalist",
        description: {
          kind: "markdown",
          value: "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/datalist"
          }
        ]
      },
      {
        name: "optgroup",
        description: {
          kind: "markdown",
          value: "The optgroup element represents a group of option elements with a common label."
        },
        attributes: [
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
            }
          },
          {
            name: "label",
            description: {
              kind: "markdown",
              value: "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/optgroup"
          }
        ]
      },
      {
        name: "option",
        description: {
          kind: "markdown",
          value: "The option element represents an option in a select element or as part of a list of suggestions in a datalist element."
        },
        attributes: [
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won\'t receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup "The HTML <optgroup> element creates a grouping of options within a <select> element.") element.'
            }
          },
          {
            name: "label",
            description: {
              kind: "markdown",
              value: "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
            }
          },
          {
            name: "selected",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element may have the `selected` attribute.'
            }
          },
          {
            name: "value",
            description: {
              kind: "markdown",
              value: "The content of this attribute represents the value to be submitted with the form, should this option be selected.\xA0If this attribute is omitted, the value is taken from the text content of the option element."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/option"
          }
        ]
      },
      {
        name: "textarea",
        description: {
          kind: "markdown",
          value: "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value."
        },
        attributes: [
          {
            name: "autocomplete",
            valueSet: "inputautocomplete",
            description: {
              kind: "markdown",
              value: 'This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element\'s form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").'
            }
          },
          {
            name: "autofocus",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
            }
          },
          {
            name: "cols",
            description: {
              kind: "markdown",
              value: "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
            }
          },
          {
            name: "dirname"
          },
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.'
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.'
            }
          },
          {
            name: "inputmode",
            valueSet: "im"
          },
          {
            name: "maxlength",
            description: {
              kind: "markdown",
              value: "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
            }
          },
          {
            name: "minlength",
            description: {
              kind: "markdown",
              value: "The minimum number of characters (unicode code points) required that the user should enter."
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: "The name of the control."
            }
          },
          {
            name: "placeholder",
            description: {
              kind: "markdown",
              value: 'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.'
            }
          },
          {
            name: "readonly",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
            }
          },
          {
            name: "required",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This attribute specifies that the user must fill in a value before submitting a form."
            }
          },
          {
            name: "rows",
            description: {
              kind: "markdown",
              value: "The number of visible text lines for the control."
            }
          },
          {
            name: "wrap",
            valueSet: "w",
            description: {
              kind: "markdown",
              value: "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
            }
          },
          {
            name: "autocapitalize",
            description: "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
          },
          {
            name: "spellcheck",
            description: "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/textarea"
          }
        ]
      },
      {
        name: "output",
        description: {
          kind: "markdown",
          value: "The output element represents the result of a calculation performed by the application, or the result of a user action."
        },
        attributes: [
          {
            name: "for",
            description: {
              kind: "markdown",
              value: "A space-separated list of other elements\u2019 [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation."
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its "form owner"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.'
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: 'The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement "The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.") API.'
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/output"
          }
        ]
      },
      {
        name: "progress",
        description: {
          kind: "markdown",
          value: "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed."
        },
        attributes: [
          {
            name: "value",
            description: {
              kind: "markdown",
              value: "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
            }
          },
          {
            name: "max",
            description: {
              kind: "markdown",
              value: "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/progress"
          }
        ]
      },
      {
        name: "meter",
        description: {
          kind: "markdown",
          value: "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate."
        },
        attributes: [
          {
            name: "value",
            description: {
              kind: "markdown",
              value: "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
            }
          },
          {
            name: "min",
            description: {
              kind: "markdown",
              value: "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
            }
          },
          {
            name: "max",
            description: {
              kind: "markdown",
              value: "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
            }
          },
          {
            name: "low",
            description: {
              kind: "markdown",
              value: "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
            }
          },
          {
            name: "high",
            description: {
              kind: "markdown",
              value: "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
            }
          },
          {
            name: "optimum",
            description: {
              kind: "markdown",
              value: "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
            }
          },
          {
            name: "form",
            description: "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/meter"
          }
        ]
      },
      {
        name: "fieldset",
        description: {
          kind: "markdown",
          value: "The fieldset element represents a set of form controls optionally grouped under a common name."
        },
        attributes: [
          {
            name: "disabled",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
            }
          },
          {
            name: "form",
            description: {
              kind: "markdown",
              value: 'This attribute takes the value of the `id` attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.'
            }
          },
          {
            name: "name",
            description: {
              kind: "markdown",
              value: 'The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.'
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/fieldset"
          }
        ]
      },
      {
        name: "legend",
        description: {
          kind: "markdown",
          value: "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/legend"
          }
        ]
      },
      {
        name: "details",
        description: {
          kind: "markdown",
          value: "The details element represents a disclosure widget from which the user can obtain additional information or controls."
        },
        attributes: [
          {
            name: "open",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: "This Boolean attribute indicates whether or not the details \u2014 that is, the contents of the `<details>` element \u2014 are currently visible. The default, `false`, means the details are not visible."
            }
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/details"
          }
        ]
      },
      {
        name: "summary",
        description: {
          kind: "markdown",
          value: "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/summary"
          }
        ]
      },
      {
        name: "dialog",
        description: {
          kind: "markdown",
          value: "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window."
        },
        attributes: [
          {
            name: "open",
            description: "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/dialog"
          }
        ]
      },
      {
        name: "script",
        description: {
          kind: "markdown",
          value: "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user."
        },
        attributes: [
          {
            name: "src",
            description: {
              kind: "markdown",
              value: "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
            }
          },
          {
            name: "type",
            description: {
              kind: "markdown",
              value: 'This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\n*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).\n*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.\n*   **Any other value:** The embedded content is treated as a data block which won\'t be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.\n\n**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute \u2014 for example `type="text/javascript;version=1.8"`. This has been removed in Firefox 59 (see [bug\xA01428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 "FIXED: Remove support for version parameter from script loader")).'
            }
          },
          {
            name: "charset"
          },
          {
            name: "async",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. `async="false"`) during HTML parsing.\n\nDynamically inserted scripts (using [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn\'t recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set `async="false"`.\n\nSee [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts).'
            }
          },
          {
            name: "defer",
            valueSet: "v",
            description: {
              kind: "markdown",
              value: 'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").\n\nScripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.'
            }
          },
          {
            name: "crossorigin",
            valueSet: "xo",
            description: {
              kind: "markdown",
              value: 'Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments.'
            }
          },
          {
            name: "nonce",
            description: {
              kind: "markdown",
              value: "A cryptographic nonce (number used once) to whitelist inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
            }
          },
          {
            name: "integrity",
            description: "This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
          },
          {
            name: "nomodule",
            description: "This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) \u2014 in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code."
          },
          {
            name: "referrerpolicy",
            description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the script, or resources fetched by the script:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS\u2192HTTPS), but don\'t send it to a less secure destination (e.g. HTTPS\u2192HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS\u2192HTTPS), and send no header to a less secure destination (e.g. HTTPS\u2192HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\n**Note**: An empty string value (`""`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `<script>` element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available,\xA0the empty string is treated as being equivalent to `no-referrer-when-downgrade`.'
          },
          {
            name: "text",
            description: "Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/script"
          }
        ]
      },
      {
        name: "noscript",
        description: {
          kind: "markdown",
          value: "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/noscript"
          }
        ]
      },
      {
        name: "template",
        description: {
          kind: "markdown",
          value: "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script."
        },
        attributes: [],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/template"
          }
        ]
      },
      {
        name: "canvas",
        description: {
          kind: "markdown",
          value: "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly."
        },
        attributes: [
          {
            name: "width",
            description: {
              kind: "markdown",
              value: "The width of the coordinate space in CSS pixels. Defaults to 300."
            }
          },
          {
            name: "height",
            description: {
              kind: "markdown",
              value: "The height of the coordinate space in CSS pixels. Defaults to 150."
            }
          },
          {
            name: "moz-opaque",
            description: "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead."
          }
        ],
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Element/canvas"
          }
        ]
      }
    ],
    globalAttributes: [
      {
        name: "accesskey",
        description: {
          kind: "markdown",
          value: "Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey"
          }
        ]
      },
      {
        name: "autocapitalize",
        description: {
          kind: "markdown",
          value: "Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase"
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize"
          }
        ]
      },
      {
        name: "class",
        description: {
          kind: "markdown",
          value: 'A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](/en-US/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](/en-US/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").'
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class"
          }
        ]
      },
      {
        name: "contenteditable",
        description: {
          kind: "markdown",
          value: "An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable"
          }
        ]
      },
      {
        name: "contextmenu",
        description: {
          kind: "markdown",
          value: 'The `[**id**](#attr-id)` of a [`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.'
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu"
          }
        ]
      },
      {
        name: "dir",
        description: {
          kind: "markdown",
          value: "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
        },
        valueSet: "d",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir"
          }
        ]
      },
      {
        name: "draggable",
        description: {
          kind: "markdown",
          value: "An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](/en-us/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged."
        },
        valueSet: "b",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable"
          }
        ]
      },
      {
        name: "dropzone",
        description: {
          kind: "markdown",
          value: "An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](/en-US/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data."
        }
      },
      {
        name: "exportparts",
        description: {
          kind: "markdown",
          value: "Used to transitively export shadow parts from a nested shadow tree into a containing light tree."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts"
          }
        ]
      },
      {
        name: "hidden",
        description: {
          kind: "markdown",
          value: "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
        },
        valueSet: "v",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden"
          }
        ]
      },
      {
        name: "id",
        description: {
          kind: "markdown",
          value: "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS)."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id"
          }
        ]
      },
      {
        name: "inputmode",
        description: {
          kind: "markdown",
          value: 'Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](/en-US/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.'
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode"
          }
        ]
      },
      {
        name: "is",
        description: {
          kind: "markdown",
          value: "Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](/en-US/docs/Web/Web_Components/Using_custom_elements) for more details)."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is"
          }
        ]
      },
      {
        name: "itemid",
        description: {
          kind: "markdown",
          value: "The unique, global identifier of an item."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid"
          }
        ]
      },
      {
        name: "itemprop",
        description: {
          kind: "markdown",
          value: "Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop"
          }
        ]
      },
      {
        name: "itemref",
        description: {
          kind: "markdown",
          value: "Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref"
          }
        ]
      },
      {
        name: "itemscope",
        description: {
          kind: "markdown",
          value: "`itemscope` (usually) works along with `[itemtype](/en-US/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context."
        },
        valueSet: "v",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope"
          }
        ]
      },
      {
        name: "itemtype",
        description: {
          kind: "markdown",
          value: "Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](/en-US/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype"
          }
        ]
      },
      {
        name: "lang",
        description: {
          kind: "markdown",
          value: "Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one \u201Clanguage tag\u201D (made of hyphen-separated \u201Clanguage subtags\u201D) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang"
          }
        ]
      },
      {
        name: "part",
        description: {
          kind: "markdown",
          value: 'A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](/en-US/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.'
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part"
          }
        ]
      },
      {
        name: "role",
        valueSet: "roles"
      },
      {
        name: "slot",
        description: {
          kind: "markdown",
          value: "Assigns a slot in a [shadow DOM](/en-US/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](/en-US/docs/Web/HTML/Element/slot \"The HTML <slot> element\u2014part of the Web Components technology suite\u2014is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](/en-US/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot"
          }
        ]
      },
      {
        name: "spellcheck",
        description: {
          kind: "markdown",
          value: "An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors."
        },
        valueSet: "b",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck"
          }
        ]
      },
      {
        name: "style",
        description: {
          kind: "markdown",
          value: 'Contains [CSS](/en-US/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](/en-US/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.'
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style"
          }
        ]
      },
      {
        name: "tabindex",
        description: {
          kind: "markdown",
          value: "An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:\n\n*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;\n*   `0` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;\n*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex"
          }
        ]
      },
      {
        name: "title",
        description: {
          kind: "markdown",
          value: "Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip."
        },
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title"
          }
        ]
      },
      {
        name: "translate",
        description: {
          kind: "markdown",
          value: "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](/en-US/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated."
        },
        valueSet: "y",
        references: [
          {
            name: "MDN Reference",
            url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate"
          }
        ]
      },
      {
        name: "onabort",
        description: {
          kind: "markdown",
          value: "The loading of a resource has been aborted."
        }
      },
      {
        name: "onblur",
        description: {
          kind: "markdown",
          value: "An element has lost focus (does not bubble)."
        }
      },
      {
        name: "oncanplay",
        description: {
          kind: "markdown",
          value: "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
        }
      },
      {
        name: "oncanplaythrough",
        description: {
          kind: "markdown",
          value: "The user agent can play the media up to its end without having to stop for further buffering of content."
        }
      },
      {
        name: "onchange",
        description: {
          kind: "markdown",
          value: "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
        }
      },
      {
        name: "onclick",
        description: {
          kind: "markdown",
          value: "A pointing device button has been pressed and released on an element."
        }
      },
      {
        name: "oncontextmenu",
        description: {
          kind: "markdown",
          value: "The right button of the mouse is clicked (before the context menu is displayed)."
        }
      },
      {
        name: "ondblclick",
        description: {
          kind: "markdown",
          value: "A pointing device button is clicked twice on an element."
        }
      },
      {
        name: "ondrag",
        description: {
          kind: "markdown",
          value: "An element or text selection is being dragged (every 350ms)."
        }
      },
      {
        name: "ondragend",
        description: {
          kind: "markdown",
          value: "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
        }
      },
      {
        name: "ondragenter",
        description: {
          kind: "markdown",
          value: "A dragged element or text selection enters a valid drop target."
        }
      },
      {
        name: "ondragleave",
        description: {
          kind: "markdown",
          value: "A dragged element or text selection leaves a valid drop target."
        }
      },
      {
        name: "ondragover",
        description: {
          kind: "markdown",
          value: "An element or text selection is being dragged over a valid drop target (every 350ms)."
        }
      },
      {
        name: "ondragstart",
        description: {
          kind: "markdown",
          value: "The user starts dragging an element or text selection."
        }
      },
      {
        name: "ondrop",
        description: {
          kind: "markdown",
          value: "An element is dropped on a valid drop target."
        }
      },
      {
        name: "ondurationchange",
        description: {
          kind: "markdown",
          value: "The duration attribute has been updated."
        }
      },
      {
        name: "onemptied",
        description: {
          kind: "markdown",
          value: "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
        }
      },
      {
        name: "onended",
        description: {
          kind: "markdown",
          value: "Playback has stopped because the end of the media was reached."
        }
      },
      {
        name: "onerror",
        description: {
          kind: "markdown",
          value: "A resource failed to load."
        }
      },
      {
        name: "onfocus",
        description: {
          kind: "markdown",
          value: "An element has received focus (does not bubble)."
        }
      },
      {
        name: "onformchange"
      },
      {
        name: "onforminput"
      },
      {
        name: "oninput",
        description: {
          kind: "markdown",
          value: "The value of an element changes or the content of an element with the attribute contenteditable is modified."
        }
      },
      {
        name: "oninvalid",
        description: {
          kind: "markdown",
          value: "A submittable element has been checked and doesn't satisfy its constraints."
        }
      },
      {
        name: "onkeydown",
        description: {
          kind: "markdown",
          value: "A key is pressed down."
        }
      },
      {
        name: "onkeypress",
        description: {
          kind: "markdown",
          value: "A key is pressed down and that key normally produces a character value (use input instead)."
        }
      },
      {
        name: "onkeyup",
        description: {
          kind: "markdown",
          value: "A key is released."
        }
      },
      {
        name: "onload",
        description: {
          kind: "markdown",
          value: "A resource and its dependent resources have finished loading."
        }
      },
      {
        name: "onloadeddata",
        description: {
          kind: "markdown",
          value: "The first frame of the media has finished loading."
        }
      },
      {
        name: "onloadedmetadata",
        description: {
          kind: "markdown",
          value: "The metadata has been loaded."
        }
      },
      {
        name: "onloadstart",
        description: {
          kind: "markdown",
          value: "Progress has begun."
        }
      },
      {
        name: "onmousedown",
        description: {
          kind: "markdown",
          value: "A pointing device button (usually a mouse) is pressed on an element."
        }
      },
      {
        name: "onmousemove",
        description: {
          kind: "markdown",
          value: "A pointing device is moved over an element."
        }
      },
      {
        name: "onmouseout",
        description: {
          kind: "markdown",
          value: "A pointing device is moved off the element that has the listener attached or off one of its children."
        }
      },
      {
        name: "onmouseover",
        description: {
          kind: "markdown",
          value: "A pointing device is moved onto the element that has the listener attached or onto one of its children."
        }
      },
      {
        name: "onmouseenter",
        description: "A pointing device is moved onto the element that has the listener attached."
      },
      {
        name: "onmouseleave",
        description: "A pointing device is moved off the element that has the listener attached."
      },
      {
        name: "onmouseup",
        description: {
          kind: "markdown",
          value: "A pointing device button is released over an element."
        }
      },
      {
        name: "onmousewheel"
      },
      {
        name: "onpause",
        description: {
          kind: "markdown",
          value: "Playback has been paused."
        }
      },
      {
        name: "onplay",
        description: {
          kind: "markdown",
          value: "Playback has begun."
        }
      },
      {
        name: "onplaying",
        description: {
          kind: "markdown",
          value: "Playback is ready to start after having been paused or delayed due to lack of data."
        }
      },
      {
        name: "onpointercancel",
        description: "The pointer is unlikely to produce any more events."
      },
      {
        name: "onpointerdown",
        description: "The pointer enters the active buttons state."
      },
      {
        name: "onpointerenter",
        description: "Pointing device is moved inside the hit-testing boundary."
      },
      {
        name: "onpointerleave",
        description: "Pointing device is moved out of the hit-testing boundary."
      },
      {
        name: "onpointerlockchange",
        description: "The pointer was locked or released."
      },
      {
        name: "onpointerlockerror",
        description: "It was impossible to lock the pointer for technical reasons or because the permission was denied."
      },
      {
        name: "onpointermove",
        description: "The pointer changed coordinates."
      },
      {
        name: "onpointerout",
        description: "The pointing device moved out of hit-testing boundary or leaves detectable hover range."
      },
      {
        name: "onpointerover",
        description: "The pointing device is moved into the hit-testing boundary."
      },
      {
        name: "onpointerup",
        description: "The pointer leaves the active buttons state."
      },
      {
        name: "onprogress",
        description: {
          kind: "markdown",
          value: "In progress."
        }
      },
      {
        name: "onratechange",
        description: {
          kind: "markdown",
          value: "The playback rate has changed."
        }
      },
      {
        name: "onreset",
        description: {
          kind: "markdown",
          value: "A form is reset."
        }
      },
      {
        name: "onresize",
        description: {
          kind: "markdown",
          value: "The document view has been resized."
        }
      },
      {
        name: "onreadystatechange",
        description: {
          kind: "markdown",
          value: "The readyState attribute of a document has changed."
        }
      },
      {
        name: "onscroll",
        description: {
          kind: "markdown",
          value: "The document view or an element has been scrolled."
        }
      },
      {
        name: "onseeked",
        description: {
          kind: "markdown",
          value: "A seek operation completed."
        }
      },
      {
        name: "onseeking",
        description: {
          kind: "markdown",
          value: "A seek operation began."
        }
      },
      {
        name: "onselect",
        description: {
          kind: "markdown",
          value: "Some text is being selected."
        }
      },
      {
        name: "onshow",
        description: {
          kind: "markdown",
          value: "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
        }
      },
      {
        name: "onstalled",
        description: {
          kind: "markdown",
          value: "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
        }
      },
      {
        name: "onsubmit",
        description: {
          kind: "markdown",
          value: "A form is submitted."
        }
      },
      {
        name: "onsuspend",
        description: {
          kind: "markdown",
          value: "Media data loading has been suspended."
        }
      },
      {
        name: "ontimeupdate",
        description: {
          kind: "markdown",
          value: "The time indicated by the currentTime attribute has been updated."
        }
      },
      {
        name: "onvolumechange",
        description: {
          kind: "markdown",
          value: "The volume has changed."
        }
      },
      {
        name: "onwaiting",
        description: {
          kind: "markdown",
          value: "Playback has stopped because of a temporary lack of data."
        }
      },
      {
        name: "aria-activedescendant",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application)."
        }
      },
      {
        name: "aria-atomic",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-atomic"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute."
        }
      },
      {
        name: "aria-autocomplete",
        valueSet: "autocomplete",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
        }
      },
      {
        name: "aria-busy",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-busy"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
        }
      },
      {
        name: "aria-checked",
        valueSet: "tristate",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-checked"
          }
        ],
        description: {
          kind: "markdown",
          value: 'Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
        }
      },
      {
        name: "aria-colcount",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colcount"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)."
        }
      },
      {
        name: "aria-colindex",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colindex"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
        }
      },
      {
        name: "aria-colspan",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colspan"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
        }
      },
      {
        name: "aria-controls",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-controls"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)."
        }
      },
      {
        name: "aria-current",
        valueSet: "current",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-current"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements."
        }
      },
      {
        name: "aria-describedat",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-describedat"
          }
        ]
      },
      {
        name: "aria-describedby",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-describedby"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
        }
      },
      {
        name: "aria-disabled",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-disabled"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)."
        }
      },
      {
        name: "aria-dropeffect",
        valueSet: "dropeffect",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"
          }
        ],
        description: {
          kind: "markdown",
          value: "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
        }
      },
      {
        name: "aria-errormessage",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
        }
      },
      {
        name: "aria-expanded",
        valueSet: "u",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-expanded"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
        }
      },
      {
        name: "aria-flowto",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-flowto"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
        }
      },
      {
        name: "aria-grabbed",
        valueSet: "u",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed"
          }
        ],
        description: {
          kind: "markdown",
          value: `\\[Deprecated in ARIA 1.1\\] Indicates an element's "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.`
        }
      },
      {
        name: "aria-haspopup",
        valueSet: "haspopup",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
        }
      },
      {
        name: "aria-hidden",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
        }
      },
      {
        name: "aria-invalid",
        valueSet: "invalid",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-invalid"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)."
        }
      },
      {
        name: "aria-kbdshortcuts",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-kbdshortcuts"
          }
        ]
      },
      {
        name: "aria-label",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-label"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
        }
      },
      {
        name: "aria-labelledby",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
        }
      },
      {
        name: "aria-level",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-level"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure."
        }
      },
      {
        name: "aria-live",
        valueSet: "live",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-live"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)."
        }
      },
      {
        name: "aria-modal",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-modal"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed."
        }
      },
      {
        name: "aria-multiline",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiline"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether a text box accepts multiple lines of input or only a single line."
        }
      },
      {
        name: "aria-multiselectable",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates that the user may select more than one item from the current selectable descendants."
        }
      },
      {
        name: "aria-orientation",
        valueSet: "orientation",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-orientation"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
        }
      },
      {
        name: "aria-owns",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-owns"
          }
        ],
        description: {
          kind: "markdown",
          value: "Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)."
        }
      },
      {
        name: "aria-placeholder",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
        }
      },
      {
        name: "aria-posinset",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-posinset"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
        }
      },
      {
        name: "aria-pressed",
        valueSet: "tristate",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-pressed"
          }
        ],
        description: {
          kind: "markdown",
          value: 'Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
        }
      },
      {
        name: "aria-readonly",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-readonly"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
        }
      },
      {
        name: "aria-relevant",
        valueSet: "relevant",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-relevant"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)."
        }
      },
      {
        name: "aria-required",
        valueSet: "b",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-required"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted."
        }
      },
      {
        name: "aria-roledescription",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
        }
      },
      {
        name: "aria-rowcount",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)."
        }
      },
      {
        name: "aria-rowindex",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
        }
      },
      {
        name: "aria-rowspan",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
        }
      },
      {
        name: "aria-selected",
        valueSet: "u",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-selected"
          }
        ],
        description: {
          kind: "markdown",
          value: 'Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).'
        }
      },
      {
        name: "aria-setsize",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-setsize"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)."
        }
      },
      {
        name: "aria-sort",
        valueSet: "sort",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-sort"
          }
        ],
        description: {
          kind: "markdown",
          value: "Indicates if items in a table or grid are sorted in ascending or descending order."
        }
      },
      {
        name: "aria-valuemax",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
        }
      },
      {
        name: "aria-valuemin",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
        }
      },
      {
        name: "aria-valuenow",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)."
        }
      },
      {
        name: "aria-valuetext",
        references: [
          {
            name: "WAI-ARIA Reference",
            url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext"
          }
        ],
        description: {
          kind: "markdown",
          value: "Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
        }
      },
      {
        name: "aria-details",
        description: {
          kind: "markdown",
          value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
        }
      },
      {
        name: "aria-keyshortcuts",
        description: {
          kind: "markdown",
          value: "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
        }
      }
    ],
    valueSets: [
      {
        name: "b",
        values: [
          {
            name: "true"
          },
          {
            name: "false"
          }
        ]
      },
      {
        name: "u",
        values: [
          {
            name: "true"
          },
          {
            name: "false"
          },
          {
            name: "undefined"
          }
        ]
      },
      {
        name: "o",
        values: [
          {
            name: "on"
          },
          {
            name: "off"
          }
        ]
      },
      {
        name: "y",
        values: [
          {
            name: "yes"
          },
          {
            name: "no"
          }
        ]
      },
      {
        name: "w",
        values: [
          {
            name: "soft"
          },
          {
            name: "hard"
          }
        ]
      },
      {
        name: "d",
        values: [
          {
            name: "ltr"
          },
          {
            name: "rtl"
          },
          {
            name: "auto"
          }
        ]
      },
      {
        name: "m",
        values: [
          {
            name: "GET",
            description: {
              kind: "markdown",
              value: "Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters."
            }
          },
          {
            name: "POST",
            description: {
              kind: "markdown",
              value: "Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5); form data are included in the body of the form and sent to the server."
            }
          },
          {
            name: "dialog",
            description: {
              kind: "markdown",
              value: "Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to close the dialog when submitted."
            }
          }
        ]
      },
      {
        name: "fm",
        values: [
          {
            name: "GET"
          },
          {
            name: "POST"
          }
        ]
      },
      {
        name: "s",
        values: [
          {
            name: "row"
          },
          {
            name: "col"
          },
          {
            name: "rowgroup"
          },
          {
            name: "colgroup"
          }
        ]
      },
      {
        name: "t",
        values: [
          {
            name: "hidden"
          },
          {
            name: "text"
          },
          {
            name: "search"
          },
          {
            name: "tel"
          },
          {
            name: "url"
          },
          {
            name: "email"
          },
          {
            name: "password"
          },
          {
            name: "datetime"
          },
          {
            name: "date"
          },
          {
            name: "month"
          },
          {
            name: "week"
          },
          {
            name: "time"
          },
          {
            name: "datetime-local"
          },
          {
            name: "number"
          },
          {
            name: "range"
          },
          {
            name: "color"
          },
          {
            name: "checkbox"
          },
          {
            name: "radio"
          },
          {
            name: "file"
          },
          {
            name: "submit"
          },
          {
            name: "image"
          },
          {
            name: "reset"
          },
          {
            name: "button"
          }
        ]
      },
      {
        name: "im",
        values: [
          {
            name: "verbatim"
          },
          {
            name: "latin"
          },
          {
            name: "latin-name"
          },
          {
            name: "latin-prose"
          },
          {
            name: "full-width-latin"
          },
          {
            name: "kana"
          },
          {
            name: "kana-name"
          },
          {
            name: "katakana"
          },
          {
            name: "numeric"
          },
          {
            name: "tel"
          },
          {
            name: "email"
          },
          {
            name: "url"
          }
        ]
      },
      {
        name: "bt",
        values: [
          {
            name: "button"
          },
          {
            name: "submit"
          },
          {
            name: "reset"
          },
          {
            name: "menu"
          }
        ]
      },
      {
        name: "lt",
        values: [
          {
            name: "1"
          },
          {
            name: "a"
          },
          {
            name: "A"
          },
          {
            name: "i"
          },
          {
            name: "I"
          }
        ]
      },
      {
        name: "mt",
        values: [
          {
            name: "context"
          },
          {
            name: "toolbar"
          }
        ]
      },
      {
        name: "mit",
        values: [
          {
            name: "command"
          },
          {
            name: "checkbox"
          },
          {
            name: "radio"
          }
        ]
      },
      {
        name: "et",
        values: [
          {
            name: "application/x-www-form-urlencoded"
          },
          {
            name: "multipart/form-data"
          },
          {
            name: "text/plain"
          }
        ]
      },
      {
        name: "tk",
        values: [
          {
            name: "subtitles"
          },
          {
            name: "captions"
          },
          {
            name: "descriptions"
          },
          {
            name: "chapters"
          },
          {
            name: "metadata"
          }
        ]
      },
      {
        name: "pl",
        values: [
          {
            name: "none"
          },
          {
            name: "metadata"
          },
          {
            name: "auto"
          }
        ]
      },
      {
        name: "sh",
        values: [
          {
            name: "circle"
          },
          {
            name: "default"
          },
          {
            name: "poly"
          },
          {
            name: "rect"
          }
        ]
      },
      {
        name: "xo",
        values: [
          {
            name: "anonymous"
          },
          {
            name: "use-credentials"
          }
        ]
      },
      {
        name: "sb",
        values: [
          {
            name: "allow-forms"
          },
          {
            name: "allow-modals"
          },
          {
            name: "allow-pointer-lock"
          },
          {
            name: "allow-popups"
          },
          {
            name: "allow-popups-to-escape-sandbox"
          },
          {
            name: "allow-same-origin"
          },
          {
            name: "allow-scripts"
          },
          {
            name: "allow-top-navigation"
          }
        ]
      },
      {
        name: "tristate",
        values: [
          {
            name: "true"
          },
          {
            name: "false"
          },
          {
            name: "mixed"
          },
          {
            name: "undefined"
          }
        ]
      },
      {
        name: "inputautocomplete",
        values: [
          {
            name: "additional-name"
          },
          {
            name: "address-level1"
          },
          {
            name: "address-level2"
          },
          {
            name: "address-level3"
          },
          {
            name: "address-level4"
          },
          {
            name: "address-line1"
          },
          {
            name: "address-line2"
          },
          {
            name: "address-line3"
          },
          {
            name: "bday"
          },
          {
            name: "bday-year"
          },
          {
            name: "bday-day"
          },
          {
            name: "bday-month"
          },
          {
            name: "billing"
          },
          {
            name: "cc-additional-name"
          },
          {
            name: "cc-csc"
          },
          {
            name: "cc-exp"
          },
          {
            name: "cc-exp-month"
          },
          {
            name: "cc-exp-year"
          },
          {
            name: "cc-family-name"
          },
          {
            name: "cc-given-name"
          },
          {
            name: "cc-name"
          },
          {
            name: "cc-number"
          },
          {
            name: "cc-type"
          },
          {
            name: "country"
          },
          {
            name: "country-name"
          },
          {
            name: "current-password"
          },
          {
            name: "email"
          },
          {
            name: "family-name"
          },
          {
            name: "fax"
          },
          {
            name: "given-name"
          },
          {
            name: "home"
          },
          {
            name: "honorific-prefix"
          },
          {
            name: "honorific-suffix"
          },
          {
            name: "impp"
          },
          {
            name: "language"
          },
          {
            name: "mobile"
          },
          {
            name: "name"
          },
          {
            name: "new-password"
          },
          {
            name: "nickname"
          },
          {
            name: "organization"
          },
          {
            name: "organization-title"
          },
          {
            name: "pager"
          },
          {
            name: "photo"
          },
          {
            name: "postal-code"
          },
          {
            name: "sex"
          },
          {
            name: "shipping"
          },
          {
            name: "street-address"
          },
          {
            name: "tel-area-code"
          },
          {
            name: "tel"
          },
          {
            name: "tel-country-code"
          },
          {
            name: "tel-extension"
          },
          {
            name: "tel-local"
          },
          {
            name: "tel-local-prefix"
          },
          {
            name: "tel-local-suffix"
          },
          {
            name: "tel-national"
          },
          {
            name: "transaction-amount"
          },
          {
            name: "transaction-currency"
          },
          {
            name: "url"
          },
          {
            name: "username"
          },
          {
            name: "work"
          }
        ]
      },
      {
        name: "autocomplete",
        values: [
          {
            name: "inline"
          },
          {
            name: "list"
          },
          {
            name: "both"
          },
          {
            name: "none"
          }
        ]
      },
      {
        name: "current",
        values: [
          {
            name: "page"
          },
          {
            name: "step"
          },
          {
            name: "location"
          },
          {
            name: "date"
          },
          {
            name: "time"
          },
          {
            name: "true"
          },
          {
            name: "false"
          }
        ]
      },
      {
        name: "dropeffect",
        values: [
          {
            name: "copy"
          },
          {
            name: "move"
          },
          {
            name: "link"
          },
          {
            name: "execute"
          },
          {
            name: "popup"
          },
          {
            name: "none"
          }
        ]
      },
      {
        name: "invalid",
        values: [
          {
            name: "grammar"
          },
          {
            name: "false"
          },
          {
            name: "spelling"
          },
          {
            name: "true"
          }
        ]
      },
      {
        name: "live",
        values: [
          {
            name: "off"
          },
          {
            name: "polite"
          },
          {
            name: "assertive"
          }
        ]
      },
      {
        name: "orientation",
        values: [
          {
            name: "vertical"
          },
          {
            name: "horizontal"
          },
          {
            name: "undefined"
          }
        ]
      },
      {
        name: "relevant",
        values: [
          {
            name: "additions"
          },
          {
            name: "removals"
          },
          {
            name: "text"
          },
          {
            name: "all"
          },
          {
            name: "additions text"
          }
        ]
      },
      {
        name: "sort",
        values: [
          {
            name: "ascending"
          },
          {
            name: "descending"
          },
          {
            name: "none"
          },
          {
            name: "other"
          }
        ]
      },
      {
        name: "roles",
        values: [
          {
            name: "alert"
          },
          {
            name: "alertdialog"
          },
          {
            name: "button"
          },
          {
            name: "checkbox"
          },
          {
            name: "dialog"
          },
          {
            name: "gridcell"
          },
          {
            name: "link"
          },
          {
            name: "log"
          },
          {
            name: "marquee"
          },
          {
            name: "menuitem"
          },
          {
            name: "menuitemcheckbox"
          },
          {
            name: "menuitemradio"
          },
          {
            name: "option"
          },
          {
            name: "progressbar"
          },
          {
            name: "radio"
          },
          {
            name: "scrollbar"
          },
          {
            name: "searchbox"
          },
          {
            name: "slider"
          },
          {
            name: "spinbutton"
          },
          {
            name: "status"
          },
          {
            name: "switch"
          },
          {
            name: "tab"
          },
          {
            name: "tabpanel"
          },
          {
            name: "textbox"
          },
          {
            name: "timer"
          },
          {
            name: "tooltip"
          },
          {
            name: "treeitem"
          },
          {
            name: "combobox"
          },
          {
            name: "grid"
          },
          {
            name: "listbox"
          },
          {
            name: "menu"
          },
          {
            name: "menubar"
          },
          {
            name: "radiogroup"
          },
          {
            name: "tablist"
          },
          {
            name: "tree"
          },
          {
            name: "treegrid"
          },
          {
            name: "application"
          },
          {
            name: "article"
          },
          {
            name: "cell"
          },
          {
            name: "columnheader"
          },
          {
            name: "definition"
          },
          {
            name: "directory"
          },
          {
            name: "document"
          },
          {
            name: "feed"
          },
          {
            name: "figure"
          },
          {
            name: "group"
          },
          {
            name: "heading"
          },
          {
            name: "img"
          },
          {
            name: "list"
          },
          {
            name: "listitem"
          },
          {
            name: "math"
          },
          {
            name: "none"
          },
          {
            name: "note"
          },
          {
            name: "presentation"
          },
          {
            name: "region"
          },
          {
            name: "row"
          },
          {
            name: "rowgroup"
          },
          {
            name: "rowheader"
          },
          {
            name: "separator"
          },
          {
            name: "table"
          },
          {
            name: "term"
          },
          {
            name: "text"
          },
          {
            name: "toolbar"
          },
          {
            name: "banner"
          },
          {
            name: "complementary"
          },
          {
            name: "contentinfo"
          },
          {
            name: "form"
          },
          {
            name: "main"
          },
          {
            name: "navigation"
          },
          {
            name: "region"
          },
          {
            name: "search"
          },
          {
            name: "doc-abstract"
          },
          {
            name: "doc-acknowledgments"
          },
          {
            name: "doc-afterword"
          },
          {
            name: "doc-appendix"
          },
          {
            name: "doc-backlink"
          },
          {
            name: "doc-biblioentry"
          },
          {
            name: "doc-bibliography"
          },
          {
            name: "doc-biblioref"
          },
          {
            name: "doc-chapter"
          },
          {
            name: "doc-colophon"
          },
          {
            name: "doc-conclusion"
          },
          {
            name: "doc-cover"
          },
          {
            name: "doc-credit"
          },
          {
            name: "doc-credits"
          },
          {
            name: "doc-dedication"
          },
          {
            name: "doc-endnote"
          },
          {
            name: "doc-endnotes"
          },
          {
            name: "doc-epigraph"
          },
          {
            name: "doc-epilogue"
          },
          {
            name: "doc-errata"
          },
          {
            name: "doc-example"
          },
          {
            name: "doc-footnote"
          },
          {
            name: "doc-foreword"
          },
          {
            name: "doc-glossary"
          },
          {
            name: "doc-glossref"
          },
          {
            name: "doc-index"
          },
          {
            name: "doc-introduction"
          },
          {
            name: "doc-noteref"
          },
          {
            name: "doc-notice"
          },
          {
            name: "doc-pagebreak"
          },
          {
            name: "doc-pagelist"
          },
          {
            name: "doc-part"
          },
          {
            name: "doc-preface"
          },
          {
            name: "doc-prologue"
          },
          {
            name: "doc-pullquote"
          },
          {
            name: "doc-qna"
          },
          {
            name: "doc-subtitle"
          },
          {
            name: "doc-tip"
          },
          {
            name: "doc-toc"
          }
        ]
      },
      {
        name: "metanames",
        values: [
          {
            name: "application-name"
          },
          {
            name: "author"
          },
          {
            name: "description"
          },
          {
            name: "format-detection"
          },
          {
            name: "generator"
          },
          {
            name: "keywords"
          },
          {
            name: "publisher"
          },
          {
            name: "referrer"
          },
          {
            name: "robots"
          },
          {
            name: "theme-color"
          },
          {
            name: "viewport"
          }
        ]
      },
      {
        name: "haspopup",
        values: [
          {
            name: "false",
            description: {
              kind: "markdown",
              value: "(default) Indicates the element does not have a popup."
            }
          },
          {
            name: "true",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a menu."
            }
          },
          {
            name: "menu",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a menu."
            }
          },
          {
            name: "listbox",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a listbox."
            }
          },
          {
            name: "tree",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a tree."
            }
          },
          {
            name: "grid",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a grid."
            }
          },
          {
            name: "dialog",
            description: {
              kind: "markdown",
              value: "Indicates the popup is a dialog."
            }
          }
        ]
      }
    ]
  };

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/languageFacts/dataManager.js
  var HTMLDataManager = function() {
    function HTMLDataManager2(options) {
      this.dataProviders = [];
      this.setDataProviders(options.useDefaultDataProvider !== false, options.customDataProviders || []);
    }
    HTMLDataManager2.prototype.setDataProviders = function(builtIn, providers) {
      var _a3;
      this.dataProviders = [];
      if (builtIn) {
        this.dataProviders.push(new HTMLDataProvider("html5", htmlData));
      }
      (_a3 = this.dataProviders).push.apply(_a3, providers);
    };
    HTMLDataManager2.prototype.getDataProviders = function() {
      return this.dataProviders;
    };
    return HTMLDataManager2;
  }();

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/_deps/vscode-html-languageservice/htmlLanguageService.js
  var defaultLanguageServiceOptions = {};
  function getLanguageService(options) {
    if (options === void 0) {
      options = defaultLanguageServiceOptions;
    }
    var dataManager = new HTMLDataManager(options);
    var htmlHover = new HTMLHover(options, dataManager);
    var htmlCompletion = new HTMLCompletion(options, dataManager);
    return {
      setDataProviders: dataManager.setDataProviders.bind(dataManager),
      createScanner,
      parseHTMLDocument: function(document) {
        return parse(document.getText());
      },
      doComplete: htmlCompletion.doComplete.bind(htmlCompletion),
      doComplete2: htmlCompletion.doComplete2.bind(htmlCompletion),
      setCompletionParticipants: htmlCompletion.setCompletionParticipants.bind(htmlCompletion),
      doHover: htmlHover.doHover.bind(htmlHover),
      format: format2,
      findDocumentHighlights,
      findDocumentLinks,
      findDocumentSymbols,
      getFoldingRanges,
      getSelectionRanges,
      doTagComplete: htmlCompletion.doTagComplete.bind(htmlCompletion),
      doRename,
      findMatchingTagPosition,
      findOnTypeRenameRanges: findLinkedEditingRanges,
      findLinkedEditingRanges
    };
  }
  function newHTMLDataProvider(id, customData) {
    return new HTMLDataProvider(id, customData);
  }

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/htmlWorker.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator3 = function(thisArg, body) {
    var _ = {label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: []}, f, y, t, g;
    return g = {next: verb(0), throw: verb(1), return: verb(2)}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {value: op[1], done: false};
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
  var HTMLWorker = function() {
    function HTMLWorker2(ctx, createData) {
      this._ctx = ctx;
      this._languageSettings = createData.languageSettings;
      this._languageId = createData.languageId;
      var data = this._languageSettings.data;
      var useDefaultDataProvider = data === null || data === void 0 ? void 0 : data.useDefaultDataProvider;
      var customDataProviders = [];
      if (data === null || data === void 0 ? void 0 : data.dataProviders) {
        for (var id in data.dataProviders) {
          customDataProviders.push(newHTMLDataProvider(id, data.dataProviders[id]));
        }
      }
      this._languageService = getLanguageService({useDefaultDataProvider, customDataProviders});
    }
    HTMLWorker2.prototype.doComplete = function(uri, position) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, htmlDocument;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          htmlDocument = this._languageService.parseHTMLDocument(document);
          return [2, Promise.resolve(this._languageService.doComplete(document, position, htmlDocument, this._languageSettings && this._languageSettings.suggest))];
        });
      });
    };
    HTMLWorker2.prototype.format = function(uri, range, options) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, formattingOptions, textEdits;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          formattingOptions = __assign(__assign({}, this._languageSettings.format), options);
          textEdits = this._languageService.format(document, range, formattingOptions);
          return [2, Promise.resolve(textEdits)];
        });
      });
    };
    HTMLWorker2.prototype.doHover = function(uri, position) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, htmlDocument, hover;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          htmlDocument = this._languageService.parseHTMLDocument(document);
          hover = this._languageService.doHover(document, position, htmlDocument);
          return [2, Promise.resolve(hover)];
        });
      });
    };
    HTMLWorker2.prototype.findDocumentHighlights = function(uri, position) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, htmlDocument, highlights;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          htmlDocument = this._languageService.parseHTMLDocument(document);
          highlights = this._languageService.findDocumentHighlights(document, position, htmlDocument);
          return [2, Promise.resolve(highlights)];
        });
      });
    };
    HTMLWorker2.prototype.findDocumentLinks = function(uri) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, links;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          links = this._languageService.findDocumentLinks(document, null);
          return [2, Promise.resolve(links)];
        });
      });
    };
    HTMLWorker2.prototype.findDocumentSymbols = function(uri) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, htmlDocument, symbols;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          htmlDocument = this._languageService.parseHTMLDocument(document);
          symbols = this._languageService.findDocumentSymbols(document, htmlDocument);
          return [2, Promise.resolve(symbols)];
        });
      });
    };
    HTMLWorker2.prototype.getFoldingRanges = function(uri, context) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, ranges;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          ranges = this._languageService.getFoldingRanges(document, context);
          return [2, Promise.resolve(ranges)];
        });
      });
    };
    HTMLWorker2.prototype.getSelectionRanges = function(uri, positions) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, ranges;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          ranges = this._languageService.getSelectionRanges(document, positions);
          return [2, Promise.resolve(ranges)];
        });
      });
    };
    HTMLWorker2.prototype.doRename = function(uri, position, newName) {
      return __awaiter4(this, void 0, void 0, function() {
        var document, htmlDocument, renames;
        return __generator3(this, function(_a3) {
          document = this._getTextDocument(uri);
          htmlDocument = this._languageService.parseHTMLDocument(document);
          renames = this._languageService.doRename(document, position, newName, htmlDocument);
          return [2, Promise.resolve(renames)];
        });
      });
    };
    HTMLWorker2.prototype._getTextDocument = function(uri) {
      var models = this._ctx.getMirrorModels();
      for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        if (model.uri.toString() === uri) {
          return TextDocument2.create(uri, this._languageId, model.version, model.getValue());
        }
      }
      return null;
    };
    return HTMLWorker2;
  }();

  // ../../node_modules/.pnpm/monaco-editor@0.29.1/node_modules/monaco-editor/esm/vs/language/html/html.worker.js
  self.onmessage = function() {
    initialize(function(ctx, createData) {
      return new HTMLWorker(ctx, createData);
    });
  };
})();
