import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@salesforce/design-system-react/lib/components/button-group';
import Button from '@salesforce/design-system-react/lib/components/button';

function calculateRange(current, total, limit) {
  const median = Math.floor(limit / 2);
  const start = Math.max(0, Math.min(total - limit, current - median));
  const max = Math.min(start + limit, total);

  return Array.from({length: Math.max(0, max - start)}, (v, k) => k + start);
}

const Pager = (props) => {
  let buttons = [];

  if (props.total < 1 || props.limit < 1 || Math.ceil(props.total / props.limit) < 1) {
    return null;
  }

  if (props.visibleItems > 0) {
    buttons = calculateRange(props.page, Math.ceil(props.total / props.limit), props.visibleItems)
      .map(item => <Button type="button" key={`button-${item}`}
                           label={item + 1}
                           onClick={() => props.onChange(item, props.limit)}
                           variant={item === props.page ? "brand" : "neutral"}
      />)
  }

  if (props.showSkip && props.skip > 0) {
    if (props.page >= props.skip) {
      buttons.unshift(<Button type="button" key="button-prev-skip"
                              assistiveText={{icon: `Skip Previous ${props.skip} Pages`}}
                              iconName="threedots"
                              iconCategory="utility"
                              iconSize="medium"
                              iconVariant="border-filled"
                              onClick={() => props.onChange(Math.max(0, props.page - props.skip), props.limit)}
      />);
    }

    if (props.page < Math.ceil(props.total / props.limit) - props.skip + 1) {
      buttons.push(<Button type="button" key="button-next-skip"
                           assistiveText={{icon: `Skip Next ${props.skip} Pages`}}
                           iconName="threedots"
                           iconCategory="utility"
                           iconSize="medium"
                           iconVariant="border-filled"
                           onClick={() => props.onChange(
                             Math.min(
                               Math.floor(props.total / props.limit),
                               props.page + props.skip
                             ),
                             props.limit
                           )}
      />);
    }
  }

  if (props.showNextPrev) {
    buttons.unshift(<Button type="button" key="button-prev"
                            label={props.prevButtonLabel}
                            iconCategory={props.prevButtonIconCategory}
                            iconName={props.prevButtonIconName}
                            iconPosition="left"
                            iconSize="small"
                            disabled={props.page === 0}
                            onClick={() => props.onChange(props.page - 1, props.limit)}
    />);

    buttons.push(<Button type="button" key="button-next"
                         label={props.nextButtonLabel}
                         iconCategory={props.nextButtonIconCategory}
                         iconName={props.nextButtonIconName}
                         iconPosition="right"
                         iconSize="small"
                         disabled={props.page * props.limit >= Math.max(0, props.total - props.limit)}
                         onClick={() => props.onChange(props.page + 1, props.limit)}
    />);
  }

  return <ButtonGroup>{buttons}</ButtonGroup>;
};

Pager.defaultProps = {
  visibleItems: 5,
  showNextPrev: true,
  showSkip: true,
  skip: 5,
  limit: 25,
  nextButtonLabel: 'Next',
  nextButtonIconCategory: 'utility',
  nextButtonIconName: 'forward',
  prevButtonLabel: 'Previous',
  prevButtonIconCategory: 'utility',
  prevButtonIconName: 'back',
  onChange: () => {}
};

Pager.propTypes = {
  visibleItems: PropTypes.number,
  showNextPrev: PropTypes.bool,
  showSkip: PropTypes.bool,
  skip: PropTypes.number,
  nextButtonLabel: PropTypes.string,
  nextButtonIconName: PropTypes.string,
  nextButtonIconCategory: PropTypes.string,
  prevButtonLabel: PropTypes.string,
  prevButtonIconName: PropTypes.string,
  prevButtonIconCategory: PropTypes.string,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

export default Pager;