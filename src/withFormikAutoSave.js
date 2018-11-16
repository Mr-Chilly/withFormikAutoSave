import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "formik";

export default function withFormikAutoSave(config) {
  return function wrapperAutoSave(WrapperComponent) {
    class ComponentWithAutoSave extends Component {
      shouldComponentUpdate(nextProps) {
        const { values } = this.props;
        if (nextProps.values !== values) {
          this.setState({ isAutoSaving: true, autoSaveError: undefined });

          config
            .onSave(values, this.props)
            .then(() =>
              this.setState(() => ({
                isAutoSaving: false,
                lastAutoSaved: new Date()
              }))
            )
            .catch(err => this.setState(() => ({ autoSaveError: err })));
          return true;
        }
        return false;
      }

      render() {
        return <WrapperComponent {...this.props} {...this.state} />;
      }
    }
    ComponentWithAutoSave.propTypes = {
      values: PropTypes.object,
      onSave: PropTypes.func
    };

    return connect(ComponentWithAutoSave);
  };
}
