'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var formik = require('formik');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function withFormikAutoSave(config) {
  return function wrapperAutoSave(WrapperComponent) {
    var ComponentWithAutoSave =
    /*#__PURE__*/
    function (_Component) {
      _inherits(ComponentWithAutoSave, _Component);

      function ComponentWithAutoSave() {
        _classCallCheck(this, ComponentWithAutoSave);

        return _possibleConstructorReturn(this, _getPrototypeOf(ComponentWithAutoSave).apply(this, arguments));
      }

      _createClass(ComponentWithAutoSave, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          var _this = this;

          var values = this.props.values;

          if (nextProps.values !== values) {
            this.setState({
              isAutoSaving: true,
              autoSaveError: undefined
            });
            config.onSave(values, this.props).then(function () {
              return _this.setState(function () {
                return {
                  isAutoSaving: false,
                  lastAutoSaved: new Date()
                };
              });
            }).catch(function (err) {
              return _this.setState(function () {
                return {
                  autoSaveError: err
                };
              });
            });
            return true;
          }

          return false;
        }
      }, {
        key: "render",
        value: function render() {
          return React__default.createElement(WrapperComponent, _extends({}, this.props, this.state));
        }
      }]);

      return ComponentWithAutoSave;
    }(React.Component);

    ComponentWithAutoSave.propTypes = {
      values: PropTypes.object,
      onSave: PropTypes.func
    };
    return formik.connect(ComponentWithAutoSave);
  };
}

module.exports = withFormikAutoSave;
//# sourceMappingURL=withformikautosave.js.map
