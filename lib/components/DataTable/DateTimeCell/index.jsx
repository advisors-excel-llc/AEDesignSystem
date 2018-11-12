import React from 'react';
import moment from 'moment';
import DataTableCell from '@salesforce/design-system-react/lib/components/data-table/cell';

const DateTimeCell = ({children, format = 'MMMM Do YYYY, h:mm a', ...props}) => (
  <DataTableCell title={children} {...props}>
    {!!children && moment(children).format(format)}
  </DataTableCell>
);

DateTimeCell.displayName = DataTableCell.displayName;

export default DateTimeCell;