import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

class DecimalNumberEditor extends React.Component {

  constructor(props) {
    super(props);
    console.log('props value', props.value);
    this.state = { value: props.value };
  }

  getValue() {
    return this.getTextValue();
  }

  getInputNode() {
    return this.getTextInputNode();
  }


  getTextInputNode() {
    return ReactDOM.findDOMNode(this);
  }

  getTextValue() {
    let updated = {};
    updated[this.props.column.key] = parseFloat(this.state.value);
    return updated;
  }

  onValueChange = (values) => {
    console.log('mudado', values);
  };

  render() {
    return (
      <NumberFormat value={this.state.value} decimalScale={6}
                    thousandSeparator={'.'} decimalSeparator={','}
                    displayType={'input'} allowNegative={false}
                    onValueChange={this.onValueChange}
      />
    );
  }
}

DecimalNumberEditor.propTypes = {
  value: PropTypes.any,
  onFocusListener: PropTypes.func
};

export default DecimalNumberEditor;
