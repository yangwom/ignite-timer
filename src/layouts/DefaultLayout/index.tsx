import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { LayoutContainer } from './style'

export function DefaultLayout() {
  return (
    <div>
      <LayoutContainer>
        <Header />
        <Outlet />
      </LayoutContainer>
    </div>
  )
}
