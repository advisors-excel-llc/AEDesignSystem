import React from 'react'
import PropTypes from 'prop-types'
import SFDatePicker from '@salesforce/design-system-react/lib/components/date-picker'
import { getIn, FastField } from 'formik'
import moment from 'moment'

const DatePicker = props => <FastField {...props}>
  {({form, field}) => {
    const {name, value} = field
    const touched = getIn(form.touched, name)
    const error = (touched || form.submitCount > 0) && getIn(form.errors, name)
    const {dateFormat = 'YYYY-MM-DD\THH:mm:ssZ', onChange = () => {}, ...compProps} = props

    return <SFDatePicker {...compProps}
                         {...field}
                         errorText={error || ''}
                         onChange={(e, {date}) => {
                           onChange(e, {form, field, value: moment(date).format(dateFormat), error})
                           const newval = !!e.detail && e.detail.hasOwnProperty('value') ? e.detail.value : date
                           const value = newval instanceof Date ? moment(newval).format(dateFormat) : newval
                           form.setFieldValue(name, value)
                           form.setFieldTouched(name)
                         }}
                         value={moment(value).toDate()}
    />
  }}
</FastField>

DatePicker.propTypes = {
  ...SFDatePicker.propTypes,
  name: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
}

export default DatePicker