import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Controller } from 'cerebral'
import { Container } from '@cerebral/react'
import Useragent from '@cerebral/useragent'
import NeatBoard from './NeatBoard'
import './index.css'

import DashboardModule from './modules/dashboard'

const Devtools =
  process.env.NODE_ENV === 'production'
    ? null
    : require('cerebral/devtools').default

const controller = Controller({
  modules: {
    dashboard: DashboardModule,
    useragent: Useragent({
      // Use CSS media queries to determine
      // custom sizes available in your model.
      // They will be toggle between true/false in your
      // model
      media: {
        small: '(min-width: 600px)',
        medium: '(min-width: 1024px)',
        large: '(min-width: 1440px)',
        portrait: '(orientation: portrait)',
      },

      // store all feature tests in model
      feature: true,

      parse: {
        // parse useragent.browser from ua string
        browser: true,
        // parse useragent.device from ua string
        device: true,
      },

      // check the docs at: https://github.com/HubSpot/offline#advanced
      offline: {
        checkOnLoad: false,
        interceptRequests: true,
        reconnect: {
          initialDelay: 3,
          delay: 1.5,
        },
        requests: false,
      },

      // update window size on resize
      window: true,
    }),
  },
  devtools:
    Devtools &&
    Devtools({
      host: 'localhost:8585',
    }),
})

render(
  <Container controller={controller}>
    <NeatBoard />
  </Container>,
  document.getElementById('root')
)
registerServiceWorker()
