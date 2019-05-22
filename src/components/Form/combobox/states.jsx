import React from 'react'
import ComboBox from './index'
import {connect, getIn} from 'formik'

export const states = [
  {
    'label': 'Alabama',
    'value': 'AL',
    'id': 'AL',
  },
  {
    'label': 'Alaska',
    'value': 'AK',
    'id': 'AK',
  },
  {
    'label': 'Arizona',
    'value': 'AZ',
    'id': 'AZ',
  },
  {
    'label': 'Arkansas',
    'value': 'AR',
    'id': 'AR',
  },
  {
    'label': 'California',
    'value': 'CA',
    'id': 'CA',
  },
  {
    'label': 'Colorado',
    'value': 'CO',
    'id': 'CO',
  },
  {
    'label': 'Connecticut',
    'value': 'CT',
    'id': 'CT',
  },
  {
    'label': 'Delaware',
    'value': 'DE',
    'id': 'DE',
  },
  {
    'label': 'District Of Columbia',
    'value': 'DC',
    'id': 'DC',
  },
  {
    'label': 'Florida',
    'value': 'FL',
    'id': 'FL',
  },
  {
    'label': 'Georgia',
    'value': 'GA',
    'id': 'GA',
  },
  {
    'label': 'Hawaii',
    'value': 'HI',
    'id': 'HI',
  },
  {
    'label': 'Idaho',
    'value': 'ID',
    'id': 'ID',
  },
  {
    'label': 'Illinois',
    'value': 'IL',
    'id': 'IL',
  },
  {
    'label': 'Indiana',
    'value': 'IN',
    'id': 'IN',
  },
  {
    'label': 'Iowa',
    'value': 'IA',
    'id': 'IA',
  },
  {
    'label': 'Kansas',
    'value': 'KS',
    'id': 'KS',
  },
  {
    'label': 'Kentucky',
    'value': 'KY',
    'id': 'KY',
  },
  {
    'label': 'Louisiana',
    'value': 'LA',
    'id': 'LA',
  },
  {
    'label': 'Maine',
    'value': 'ME',
    'id': 'ME',
  },
  {
    'label': 'Maryland',
    'value': 'MD',
    'id': 'MD',
  },
  {
    'label': 'Massachusetts',
    'value': 'MA',
    'id': 'MA',
  },
  {
    'label': 'Michigan',
    'value': 'MI',
    'id': 'MI',
  },
  {
    'label': 'Minnesota',
    'value': 'MN',
    'id': 'MN',
  },
  {
    'label': 'Mississippi',
    'value': 'MS',
    'id': 'MS',
  },
  {
    'label': 'Missouri',
    'value': 'MO',
    'id': 'MO',
  },
  {
    'label': 'Montana',
    'value': 'MT',
    'id': 'MT',
  },
  {
    'label': 'Nebraska',
    'value': 'NE',
    'id': 'NE',
  },
  {
    'label': 'Nevada',
    'value': 'NV',
    'id': 'NV',
  },
  {
    'label': 'New Hampshire',
    'value': 'NH',
    'id': 'NH',
  },
  {
    'label': 'New Jersey',
    'value': 'NJ',
    'id': 'NJ',
  },
  {
    'label': 'New Mexico',
    'value': 'NM',
    'id': 'NM',
  },
  {
    'label': 'New York',
    'value': 'NY',
    'id': 'NY',
  },
  {
    'label': 'North Carolina',
    'value': 'NC',
    'id': 'NC',
  },
  {
    'label': 'North Dakota',
    'value': 'ND',
    'id': 'ND',
  },
  {
    'label': 'Ohio',
    'value': 'OH',
    'id': 'OH',
  },
  {
    'label': 'Oklahoma',
    'value': 'OK',
    'id': 'OK',
  },
  {
    'label': 'Oregon',
    'value': 'OR',
    'id': 'OR',
  },
  {
    'label': 'Pennsylvania',
    'value': 'PA',
    'id': 'PA',
  },
  {
    'label': 'Puerto Rico',
    'value': 'PR',
    'id': 'PR',
  },
  {
    'label': 'Rhode Island',
    'value': 'RI',
    'id': 'RI',
  },
  {
    'label': 'South Carolina',
    'value': 'SC',
    'id': 'SC',
  },
  {
    'label': 'South Dakota',
    'value': 'SD',
    'id': 'SD',
  },
  {
    'label': 'Tennessee',
    'value': 'TN',
    'id': 'TN',
  },
  {
    'label': 'Texas',
    'value': 'TX',
    'id': 'TX',
  },
  {
    'label': 'Utah',
    'value': 'UT',
    'id': 'UT',
  },
  {
    'label': 'Vermont',
    'value': 'VT',
    'id': 'VT',
  },
  {
    'label': 'Virgin Islands',
    'value': 'VI',
    'id': 'VI',
  },
  {
    'label': 'Virginia',
    'value': 'VA',
    'id': 'VA',
  },
  {
    'label': 'Washington',
    'value': 'WA',
    'id': 'WA',
  },
  {
    'label': 'West Virginia',
    'value': 'WV',
    'id': 'WV',
  },
  {
    'label': 'Wisconsin',
    'value': 'WI',
    'id': 'WI',
  },
  {
    'label': 'Wyoming',
    'value': 'WY',
    'id': 'WY',
  }
]

const StateComboBox = props => <ComboBox {...props}
                                options={states}
                                selectAll={true}
                                clearAll={true}
                                selectAllLabel="Select All States"
                                clearAllLabel="Clear All States"
/>

StateComboBox.propTypes = {
  ...ComboBox.propTypes
}

export default connect(StateComboBox)