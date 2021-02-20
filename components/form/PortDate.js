// import { Form } from 'formik';
import moment from "moment";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormGroup, Label } from "reactstrap";

export default class PortDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dateValue: new Date(),
      dateValue: moment(),
      isHidden: false,
    };
  }

  setFieldValueAndtouched(date, touched) {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true); // 2nd true calls validate
  }
  handleChange = (date) => {
    this.setState({
      dateValue: date,
    });
    this.setFieldValueAndtouched(date, true);
  };

  toggleDate(date) {
    this.setState({ isHidden: !this.state.isHidden });
    this.setFieldValueAndtouched(date, true);
  }

  render() {
    const {
      label,
      field,
      form: { touched, errors },
      canBeDisabled,
    } = this.props;
    const { isHidden, dateValue } = this.state;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          {!isHidden && (
            <DatePicker
              selected={dateValue}
              onChange={this.handleChange}
              peekNextMounth
              showMonthDropdown
              showYearDropdown
              maxDate={moment()}
              dropdownMode="select"
            />
          )}
        </div>
        {canBeDisabled && !isHidden && (
          <Button onClick={() => this.toggleDate()}>
            Still working Here...
          </Button>
        )}

        {canBeDisabled && isHidden && (
          <>
            <span>Still working here...</span>
            <Button onclick={() => this.toggleDate(dateValue)}>
              Set End Date
            </Button>
          </>
        )}
        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </FormGroup>
    );
  }
}
