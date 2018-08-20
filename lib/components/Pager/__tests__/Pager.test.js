import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pager from '../index';

const total = 100;
const limit = 12;

configure({ adapter: new Adapter() });

describe('Renders Buttons Correctly', function () {
  it('Renders first 5 buttons at Page 1', function () {
    const page = 0;
    const pager = mount(
      <Pager page={page} total={total} limit={limit}/>
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(8);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(0).props().disabled).toEqual(true);
    expect(buttons.at(1).text()).toEqual("1");
    expect(buttons.at(1).props().variant).toEqual("brand");
    expect(buttons.at(2).text()).toEqual("2");
    expect(buttons.at(3).text()).toEqual("3");
    expect(buttons.at(4).text()).toEqual("4");
    expect(buttons.at(5).text()).toEqual("5");
    expect(buttons.at(7).props().label).toEqual("Next");
  });

  it('Renders first 5 buttons at Page 3', function () {
    const page = 2; // 0 indexed
    const pager = mount(
      <Pager page={page} total={total} limit={limit}/>
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(8);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(0).props().disabled).toEqual(false);
    expect(buttons.at(1).text()).toEqual("1");
    expect(buttons.at(2).text()).toEqual("2");
    expect(buttons.at(3).text()).toEqual("3");
    expect(buttons.at(3).props().variant).toEqual("brand");
    expect(buttons.at(4).text()).toEqual("4");
    expect(buttons.at(5).text()).toEqual("5");
    expect(buttons.at(7).props().label).toEqual("Next");
  });

  it('Renders 5 buttons starting at Page 3', function () {
    const page = 4; // 0 indexed
    const pager = mount(
      <Pager page={page} total={total} limit={limit}/>
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(8);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(1).text()).toEqual("3");
    expect(buttons.at(2).text()).toEqual("4");
    expect(buttons.at(3).text()).toEqual("5");
    expect(buttons.at(3).props().variant).toEqual("brand");
    expect(buttons.at(4).text()).toEqual("6");
    expect(buttons.at(5).text()).toEqual("7");
    expect(buttons.at(7).props().label).toEqual("Next");
  });

  it('Renders 5 buttons starting at Page 5', function () {
    const page = 6; // 0 indexed
    const pager = mount(
      <Pager page={page} total={total} limit={limit}/>
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(8);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(2).text()).toEqual("5");
    expect(buttons.at(3).text()).toEqual("6");
    expect(buttons.at(4).text()).toEqual("7");
    expect(buttons.at(4).props().variant).toEqual("brand");
    expect(buttons.at(5).text()).toEqual("8");
    expect(buttons.at(6).text()).toEqual("9");
    expect(buttons.at(7).props().label).toEqual("Next");
  });

  it('Renders 5 buttons starting at Page 5 for page 9', function () {
    const page = 8; // 0 indexed
    const pager = mount(
      <Pager page={page} total={total} limit={limit}/>
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(8);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(2).text()).toEqual("5");
    expect(buttons.at(3).text()).toEqual("6");
    expect(buttons.at(4).text()).toEqual("7");
    expect(buttons.at(5).text()).toEqual("8");
    expect(buttons.at(6).text()).toEqual("9");
    expect(buttons.at(6).props().variant).toEqual("brand");
    expect(buttons.at(7).props().label).toEqual("Next");
    expect(buttons.at(7).props().disabled).toEqual(true);
  });

  it('Edge Case: renders 5 buttons at one less than end of uneven total', function () {
    const page = 3; // 0 indexed
    const pager = mount(
      <Pager page={page} total={114} limit={25} />
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(7);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(1).text()).toEqual("1");
    expect(buttons.at(2).text()).toEqual("2");
    expect(buttons.at(3).text()).toEqual("3");
    expect(buttons.at(4).text()).toEqual("4");
    expect(buttons.at(4).props().variant).toEqual("brand");
    expect(buttons.at(5).text()).toEqual("5");
    expect(buttons.at(6).props().label).toEqual("Next");
    expect(buttons.at(6).props().disabled).toEqual(false);
  });

  it('Edge Case: renders 5 buttons at end of uneven total', function () {
    const page = 4; // 0 indexed
    const pager = mount(
      <Pager page={page} total={114} limit={25} />
    );

    const buttons = pager.childAt(0).childAt(0).children();

    expect(buttons).toHaveLength(7);
    expect(buttons.at(0).props().label).toEqual('Previous');
    expect(buttons.at(1).text()).toEqual("1");
    expect(buttons.at(2).text()).toEqual("2");
    expect(buttons.at(3).text()).toEqual("3");
    expect(buttons.at(4).text()).toEqual("4");
    expect(buttons.at(5).text()).toEqual("5");
    expect(buttons.at(5).props().variant).toEqual("brand");
    expect(buttons.at(6).props().label).toEqual("Next");
    expect(buttons.at(6).props().disabled).toEqual(true);
  });
})
