import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '@abhishekbarve/components/styles'
import { Button, Header, Main, Navbar, Sidebar, ThemeProvider } from '@abhishekbarve/components'
import { HiRefresh } from 'react-icons/hi'
import { FaGlobe, FaPlus } from 'react-icons/fa6'
import { FaCog } from 'react-icons/fa'
import { ScrollArea } from '@abhishekbarve/components'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <div className="flex h-screen">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} side="right">
            <Sidebar.Header>Feeds</Sidebar.Header>
            <ScrollArea>
              <Sidebar.Body>
                <div className="text-muted-foreground py-8 text-center">
                  <FaGlobe className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  <p className="text-sm">No feeds added yet</p>
                  <p className="text-xs">Click "Add Feed" to get started</p>
                </div>
              </Sidebar.Body>
            </ScrollArea>
          </Sidebar>
          <div className="flex-1">
            <Header>
              <Navbar>
                <Link to="/">
                  <Navbar.Brand>RSS Feed Reader</Navbar.Brand>
                </Link>

                <Navbar.Group align="right">
                  <Navbar.Item>
                    <Button variant="ghost" size="sm">
                      <HiRefresh />
                      Refresh
                    </Button>
                  </Navbar.Item>
                  <Navbar.Item>
                    <Button variant="ghost" size="sm">
                      <FaPlus />
                      Add Feed
                    </Button>
                  </Navbar.Item>
                  <Navbar.Item>
                    <Button variant="ghost" size="sm">
                      <FaCog />
                      Settings
                    </Button>
                  </Navbar.Item>
                </Navbar.Group>
                <Navbar.Group>
                  <Navbar.Item>
                    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                      <IoMenu />
                    </Button>
                  </Navbar.Item>
                </Navbar.Group>
              </Navbar>
            </Header>
            <Main>
              <Outlet />
            </Main>
          </div>
        </div>
        <TanStackRouterDevtools />
      </ThemeProvider>
    </React.Fragment>
  )
}
