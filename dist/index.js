module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "public";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _simplemde = __webpack_require__(2);

var _simplemde2 = _interopRequireDefault(_simplemde);

var _Upload = __webpack_require__(3);

var _Upload2 = _interopRequireDefault(_Upload);

__webpack_require__(5);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleMDEEditor = function (_React$Component) {
    _inherits(SimpleMDEEditor, _React$Component);

    function SimpleMDEEditor(props) {
        _classCallCheck(this, SimpleMDEEditor);

        var _this = _possibleConstructorReturn(this, (SimpleMDEEditor.__proto__ || Object.getPrototypeOf(SimpleMDEEditor)).call(this, props));

        _this.state = {
            contentChanged: false
        };
        _this.id = '';
        _this.wrapperId = '';
        _this.handleChange = function (instance, changeObj) {
            if (_this.simplemde) {
                var onChange = _this.props.onChange;

                if (onChange) {
                    _this.setState({ contentChanged: true });
                    onChange(_this.simplemde.value());
                }
            }
        };
        _this.getCursor = function () {
            // https://codemirror.net/doc/manual.html#api_selection
            var getLineAndCursor = _this.props.getLineAndCursor;

            if (getLineAndCursor && _this.simplemde) {
                var codemirror = _this.simplemde.codemirror;

                getLineAndCursor(codemirror.getCursor());
            }
        };
        _this.getMdeInstance = function () {
            var getMdeInstance = _this.props.getMdeInstance;

            if (getMdeInstance && _this.simplemde) {
                getMdeInstance(_this.simplemde);
            }
        };
        _this.addExtraKeys = function () {
            // https://codemirror.net/doc/manual.html#option_extraKeys
            var extraKeys = _this.props.extraKeys;

            if (extraKeys && _this.simplemde) {
                _this.simplemde.codemirror.setOption('extraKeys', extraKeys);
            }
        };
        _this.removeEvents = function () {
            if (_this.simplemde) {
                var codemirror = _this.simplemde.codemirror;

                codemirror.off('change', _this.handleChange);
                codemirror.off('cursorActivity', _this.getCursor);
                _this.upload && _this.upload.removeEvents();
            }
        };
        _this.addEvents = function () {
            if (_this.simplemde) {
                var codemirror = _this.simplemde.codemirror;

                codemirror.on('change', _this.handleChange);
                codemirror.on('cursorActivity', _this.getCursor);
            }
        };
        _this.createEditor = function () {
            var _this$props = _this.props,
                value = _this$props.value,
                _this$props$options = _this$props.options,
                options = _this$props$options === undefined ? {} : _this$props$options,
                theme = _this$props.theme,
                onChange = _this$props.onChange;

            var simpleMdeOptions = Object.assign({}, options, { element: document.getElementById(_this.id), initialValue: value });
            var simplemde = new _simplemde2.default(simpleMdeOptions);
            if (theme) {
                simplemde.codemirror.setOption('theme', theme);
            }
            // 同步自动保存的value
            if (onChange) {
                var autosave = options.autosave;

                if (autosave && autosave.enabled === true && autosave.uniqueId) {
                    var autoSaveValue = simplemde.value();
                    if (autoSaveValue && autoSaveValue !== value) {
                        _this.setState({ contentChanged: true });
                        onChange(autoSaveValue);
                    }
                }
            }
            return simplemde;
        };
        _this.id = _this.props.id || 'simplemde-editor-' + Date.now();
        _this.wrapperId = _this.id + '-wrapper';
        return _this;
    }

    _createClass(SimpleMDEEditor, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (typeof window !== 'undefined') {
                this.simplemde = this.createEditor();
                var uploadOptions = this.props.uploadOptions;

                this.addEvents();
                if (uploadOptions) {
                    this.upload = new _Upload2.default(this.simplemde.codemirror, uploadOptions);
                }
                this.addExtraKeys();
                this.getCursor();
                this.getMdeInstance();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.simplemde) {
                var contentChanged = this.state.contentChanged;
                var _nextProps$value = nextProps.value,
                    value = _nextProps$value === undefined ? '' : _nextProps$value;

                if (!contentChanged && value !== this.simplemde.value()) {
                    this.simplemde.value(value);
                }
                this.setState({ contentChanged: false });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeEvents();
            if (this.simplemde) {
                /**
                 * 如果不关闭全屏状态会导致页面无法滚动
                 */
                if (this.simplemde.isFullscreenActive()) {
                    this.simplemde.toggleFullScreen();
                }
                /**
                 * 清除自动保存的定时器
                 */
                if (this.simplemde.autosaveTimeoutId) {
                    clearTimeout(this.simplemde.autosaveTimeoutId);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                label = _props.label;

            return _react2.default.createElement(
                'div',
                { id: this.wrapperId, className: className },
                label && _react2.default.createElement(
                    'label',
                    { htmlFor: this.id },
                    label
                ),
                _react2.default.createElement('textarea', { id: this.id })
            );
        }
    }]);

    return SimpleMDEEditor;
}(_react2.default.Component);

SimpleMDEEditor.defaultProps = {
    onChange: function onChange() {}
};
exports.default = SimpleMDEEditor;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("simplemde");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getError(options, xhr) {
    var msg = 'cannot post ' + options.action + ' ' + xhr.status;
    var err = new Error(msg);
    err.status = xhr.status;
    return err;
}
function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}
function isPattern(pattern, value) {
    if (!pattern) {
        return false;
    }
    if (Array.isArray(pattern)) {
        return pattern.some(function (item) {
            return isPattern(item, value);
        });
    }
    if (pattern === value) {
        return true;
    }
    var regExp = new RegExp('^' + pattern.replace('*', '.*'));
    return regExp.test(value);
}

var Upload = function () {
    function Upload(instance, options) {
        var _this = this;

        _classCallCheck(this, Upload);

        this.onPaste = function (e) {
            var clipboardData = e.clipboardData;

            if (clipboardData && (typeof clipboardData === 'undefined' ? 'undefined' : _typeof(clipboardData)) === 'object') {
                var items = clipboardData.items || clipboardData.files || [];
                var files = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item instanceof DataTransferItem) {
                        var file = item.getAsFile();
                        if (item.kind !== 'string' && file) {
                            files.push(file);
                        }
                    } else {
                        files.push(item);
                    }
                }
                if (files.length > 0) {
                    e.preventDefault();
                }
                _this.uploadFiles(files);
            }
        };
        this.onDrop = function (instance, e) {
            e.preventDefault();
            var files = e.dataTransfer.files;

            _this.uploadFiles(files);
        };
        this.codemirror = instance;
        this.options = Object.assign({}, Upload.defaultOptions, options);
        this.addEvents();
    }

    _createClass(Upload, [{
        key: 'uploadFiles',
        value: function uploadFiles(files) {
            var _this2 = this;

            var _loop = function _loop(i) {
                var file = files[i];
                if (_this2.isFileAllowed(file)) {
                    var beforeUpload = _this2.options.beforeUpload;

                    if (!beforeUpload) {
                        _this2.insertProgressText();
                        _this2.upload(file);
                        return 'continue';
                    }
                    var before = beforeUpload(file);
                    if (before instanceof Promise) {
                        before.then(function () {
                            _this2.insertProgressText();
                            _this2.upload(file);
                        });
                    } else if (before !== false) {
                        _this2.insertProgressText();
                        _this2.upload(file);
                    }
                }
            };

            for (var i = 0; i < files.length; i++) {
                var _ret = _loop(i);

                if (_ret === 'continue') continue;
            }
        }
    }, {
        key: 'upload',
        value: function upload(file) {
            var _this3 = this;

            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            var _options = this.options,
                action = _options.action,
                name = _options.name,
                headers = _options.headers,
                withCredentials = _options.withCredentials,
                onError = _options.onError;
            var data = this.options.data;

            if (typeof data === 'function') {
                data = data(file);
            }
            if (data) {
                Object.keys(data).map(function (key) {
                    formData.append(key, data[key]);
                });
            }
            formData.append(name, file);
            xhr.onerror = function (e) {
                if (onError) {
                    onError(e, null, file);
                }
            };
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 201) {
                    return _this3.onUploadSuccess(xhr, file);
                }
                _this3.onUploadError(xhr, file);
            };
            xhr.open('post', action, true);
            if (withCredentials && 'withCredentials' in xhr) {
                xhr.withCredentials = true;
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            for (var h in headers) {
                if (headers.hasOwnProperty(h)) {
                    xhr.setRequestHeader(h, headers[h]);
                }
            }
            xhr.send(formData);
        }
    }, {
        key: 'insertProgressText',
        value: function insertProgressText() {
            var progressText = this.options.progressText;

            this.lastValue = progressText;
            this.codemirror.replaceSelection(this.lastValue);
        }
    }, {
        key: 'isFileAllowed',
        value: function isFileAllowed(file) {
            var _options$allowedTypes = this.options.allowedTypes,
                allowedTypes = _options$allowedTypes === undefined ? '*' : _options$allowedTypes;

            return isPattern(allowedTypes, file.type);
        }
    }, {
        key: 'onUploadSuccess',
        value: function onUploadSuccess(xhr, file) {
            var codemirror = this.codemirror,
                _options2 = this.options,
                jsonName = _options2.jsonName,
                progressText = _options2.progressText,
                onSuccess = _options2.onSuccess,
                lastValue = this.lastValue;

            var response = getBody(xhr);
            var fileUrl = (0, _lodash.get)(response, jsonName);
            var newValue = '![file](' + fileUrl + ')';
            var cursor = codemirror.getCursor();
            var text = codemirror.getValue().replace(lastValue, newValue);
            codemirror.setValue(text);
            cursor.ch += newValue.length - progressText.length;
            codemirror.setCursor(cursor);
            codemirror.focus();
            if (onSuccess) {
                onSuccess(response, file);
            }
        }
    }, {
        key: 'onUploadError',
        value: function onUploadError(xhr, file) {
            var codemirror = this.codemirror,
                onError = this.options.onError,
                lastValue = this.lastValue;

            var cursor = codemirror.getCursor();
            var text = codemirror.getValue().replace(lastValue, '');
            codemirror.setValue(text);
            codemirror.setCursor(cursor);
            codemirror.focus();
            if (onError) {
                onError(getError(this.options, xhr), getBody(xhr), file);
            }
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents() {
            var el = this.codemirror.getWrapperElement();
            el.removeEventListener('paste', this.onPaste, false);
            this.codemirror.off('drop', this.onDrop);
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            var el = this.codemirror.getWrapperElement();
            el.addEventListener('paste', this.onPaste, false);
            this.codemirror.on('drop', this.onDrop);
        }
    }]);

    return Upload;
}();

exports.default = Upload;

Upload.defaultOptions = {
    action: '',
    name: 'file',
    jsonName: 'fileUrl',
    allowedTypes: 'image/*',
    progressText: '![Uploading file...]()',
    data: {},
    headers: {},
    withCredentials: false
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("simplemde/dist/simplemde.min.css");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);