import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DataTable from '@salesforce/design-system-react/lib/components/data-table'
import DataTableColumn from '@salesforce/design-system-react/lib/components/data-table/column'
import sinon from 'sinon'
import LinkedCell from '../index'

configure({adapter: new Adapter()})

describe('LinkedCell should render', function () {
  it('Renders and clicks', function () {
    const data = [
      {
        id: 1,
        link: 'Test Data'
      }
    ]
    const onClick = sinon.spy()
    const table = mount(<DataTable items={data}>
      <DataTableColumn id="link" property="link" label="Label">
        <LinkedCell onClick={onClick}/>
      </DataTableColumn>
    </DataTable>)

    const a = table.find('a')
    expect(a.text()).toBe('Test Data')

    a.simulate('click')

    expect(onClick.called).toBe(true)
    expect(onClick.lastCall.args[0]).toStrictEqual({
      id: 1,
      link: 'Test Data'
    })
  })
})