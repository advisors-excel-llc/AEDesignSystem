import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import DataTableCell from '@salesforce/design-system-react/lib/components/data-table/cell';

const DateTimeCell = ({children, format = 'MMMM Do YYYY, h:mm a', ...props}) => {
  const output = !!children && moment(children).format(format) || ''
  return <DataTableCell title={output} {...props}>
    {output}
  </DataTableCell>
}

DateTimeCell.displayName = DataTableCell.displayName;

DateTimeCell.propTypes = {
  format: PropTypes.string,
}

export default DateTimeCell;