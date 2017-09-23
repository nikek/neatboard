import React from 'react'
import ReactDOM from 'react-dom'
import NeatBoard from './NeatBoard'
import { mount } from 'enzyme'
import { Controller } from 'cerebral'
import { Container } from '@cerebral/react'

it('contains the correct title', () => {
  const controller = Controller({
    state: {
      dashboard: {
        title: 'Hejsan',
      },
    },
  })
  const wrapper = mount(
    <Container controller={controller}>
      <NeatBoard />
    </Container>
  )
  const titleElem = <h1>Hejsan</h1>
  expect(wrapper.contains(titleElem)).toEqual(true)
})
