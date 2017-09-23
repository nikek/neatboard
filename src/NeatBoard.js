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

/* abstract this to a pure component
 * props:
 * int width (px)
 * obj dashboard (layout and graphs)
 * obj data - keyed on graphs in dashboard
 * fn layoutChanged (to update layout in state)
 */

const NeatBoard = connect(
  {
    width: state`useragent.window.width`,
    layout: state`dashboard.layout`,
    graphs: state`dashboard.graphs`,
    data: state`dashboard.data`,
    title: state`dashboard.title`,
    onLayoutChange: signal`dashboard.layoutChanged`,
  },
  function NeatBoard(props) {
    const p = props
    const layout = p.layout || []
    const margin = p.width / 50
    const padding = p.width / 100
    const oneUnit = (p.width - 13 * margin) / 12 || 30

    const gridProps = {
      layout: layout.map(setMinSize),
      cols: 12,
      margin: [margin, margin],
      width: p.width || 1200,
      rowHeight: oneUnit,
      onLayoutChange: layout => {
        p.onLayoutChange({ layout: layout.map(cleanLayout) })
      },
      onResize: layout => {
        p.onLayoutChange({ layout: layout.map(cleanLayout) })
      },
    }

    return (
      <div>
        <h1>{p.title}</h1>
        <ReactGridLayout {...gridProps}>
          {layout.map(g => (
            <div key={g.i}>
              <div
                style={{ padding: padding / 2 }}
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
      </div>
    )
  }
)

export default NeatBoard
