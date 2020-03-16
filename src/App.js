import React, { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import { Container } from './components/shared/Container/Container'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './routes'

function App() {
  // Duomenims saugoti naudojamas "cart" state'as "App.js" faile
  // 1. Čia reikia pushinti produktus kurie yra carte
  // 2. Produktai cart'e turi buti sumuojami (quantity/suma)
  // 3. Carte negali buti daugiau produktu nei produkto quantity
  // 4. Nenaudoti localStorage
  // -----------------------------------------------------------
  // 5. Atvaizduoti produktus cart'e
  // 6. Virš "CART" link'o turi būti burbuliukas indikuojantis produktų skaičių
  const [cart, setCart] = useState([])

  return (
    <BrowserRouter>
      <Container>
        <Nav />
        <main>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                // <route.component /> galim pasiduoti propsus
                component={() => <route.component />}
                exact={route.isExact}
              />
            ))}
            <Redirect from="*" to="/404" />
          </Switch>
        </main>
        <footer>Cia yra footeri</footer>
      </Container>
    </BrowserRouter>
  )
}

export default App
