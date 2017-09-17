import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import ReactGridLayout from 'react-grid-layout'
import SuperSpark from 'superspark'
import './react-grid-layout.css'

function setMinSize(item) {
  item.minW = 2
  item.minH = 2
  return item
}

function cleanLayout(item) {
  return {
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    i: item.i,
  }
}

const NeatBoard = connect(
  {
    width: state`useragent.window.width`,
    layout: state`dashboard.layout`,
    graphs: state`dashboard.graphs`,
    data: state`dashboard.data`,
    onLayoutChange: signal`dashboard.layoutChanged`,
  },
  function NeatBoard(props) {
    const p = props
    const margin = p.width * 0.02
    const oneUnit = (p.width && (p.width - 13 * margin) / 12) || 30

    const attributes = {
      className: 'layout',
      layout: p.layout.map(setMinSize),
      cols: 12,
      margin: [margin, margin],
      width: p.width || 1200,
      rowHeight: oneUnit,
      onLayoutChange: layout => {
        p.onLayoutChange({ layout: layout.map(cleanLayout) })
      },
    }

    return (
      <ReactGridLayout {...attributes}>
        {p.layout.map(g => (
          <div key={g.i}>
            <SuperSpark
              width={oneUnit * g.w + margin * (g.w - 1) - 6}
              height={oneUnit * g.h + margin * (g.h - 1) - 6}
              data={p.data[p.graphs[g.i].data]}
            />
          </div>
        ))}
      </ReactGridLayout>
    )
  }
)

export default NeatBoard
