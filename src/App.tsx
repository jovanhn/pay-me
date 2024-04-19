import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js'
import './App.css'
import Header from './components/Header/Header.tsx'
import '@ui5/webcomponents-icons/dist/AllIcons'


function App() {
    setTheme('sap_horizon')
  return (
    <>
        <Header />
        <div>Spare Square Homepage</div>
    </>
  )
}

export default App
