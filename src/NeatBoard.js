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
    const pWidth = p.width
    const margin = pWidth / 50
    const padding = pWidth / 100
    const oneUnit = (pWidth - 13 * margin) / 12 || 30

    const attributes = {
      className: 'layout',
      layout: p.layout.map(setMinSize),
      cols: 12,
      margin: [margin, margin],
      width: pWidth || 1200,
      rowHeight: oneUnit,
      onLayoutChange: layout => {
        p.onLayoutChange({ layout: layout.map(cleanLayout) })
      },
      onResize: layout => {
        p.onLayoutChange({ layout: layout.map(cleanLayout) })
      },
    }

    return (
      <ReactGridLayout {...attributes}>
        {p.layout.map(g => (
          <div key={g.i}>
            <div
              style={{
                height: '100%',
                width: '100%',
                padding: padding / 2,
              }}
              className="react-grid-content">
              <SuperSpark
                width={oneUnit * g.w + margin * (g.w - 1) - padding}
                height={oneUnit * g.h + margin * (g.h - 1) - padding}
                data={p.data[p.graphs[g.i].data]}
              />
            </div>
          </div>
        ))}
      </ReactGridLayout>
    )
  }
)

export default NeatBoard
