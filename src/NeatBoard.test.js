import React from 'react'
import ReactDOM from 'react-dom'
import NeatBoard from './NeatBoard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NeatBoard />, div)
})
