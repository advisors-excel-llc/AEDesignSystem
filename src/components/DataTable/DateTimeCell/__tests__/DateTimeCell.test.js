import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import moment from 'moment'
import DataTable from '@salesforce/design-system-react/lib/components/data-table'
import DataTableColumn from '@salesforce/design-system-react/lib/components/data-table/column'
import DateTimeCell from '../'

configure({adapter: new Adapter()})

describe('DateTimeCell Renders', function () {
  it('Should render', function () {
    const format = 'MMMM Do YYYY'
    const testDate = moment('June 1, 2019')
    const data = [{
      date: testDate.toDate()
    }]
    const table = mount(<DataTable items={data}>
      <DataTableColumn id="date" property="date" label="Date">
        <DateTimeCell format={format}/>
      </DataTableColumn>
    </DataTable>)

    const cell = table.find('tbody tr td')
    expect(cell.text()).toBe(testDate.format(format))
  })
})