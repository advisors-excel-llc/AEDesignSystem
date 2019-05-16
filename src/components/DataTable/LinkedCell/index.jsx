import React from 'react';
import PropTypes from 'prop-types';
import DataTableCell from '@salesforce/design-system-react/lib/components/data-table/cell';

const LinkedCell = ({children, onClick, ...props}) => {
  return (<DataTableCell {...props}>
    <a href="javascript:void(0)" onClick={event => {
      event.preventDefault();
      onClick(props.item);
    }}>
      {children}
    </a>
  </DataTableCell>);
};

LinkedCell.defaultProps = {
  onClick: () => {}
}

LinkedCell.propTypes = {
  onClick: PropTypes.func
}

LinkedCell.displayName = DataTableCell.displayName;

export default LinkedCell;