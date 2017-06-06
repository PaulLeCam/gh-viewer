import React from 'react'

import EnvironmentProvider from './EnvironmentProvider'
import StoreProvider from './StoreProvider'
import WelcomeScene from './WelcomeScene'

const App = () =>
  <StoreProvider>
    <EnvironmentProvider>
      <WelcomeScene />
    </EnvironmentProvider>
  </StoreProvider>

export default App
