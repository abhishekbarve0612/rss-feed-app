import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '@abhishekbarve/components/styles'
import {
  Button,
  Header,
  Main,
  Navbar,
  Sidebar,
  ThemeProvider,
  ModalProvider,
} from '@abhishekbarve/components'
import { HiRefresh } from 'react-icons/hi'
import { FaGlobe, FaPlus } from 'react-icons/fa6'
import { FaCog } from 'react-icons/fa'
import { ScrollArea } from '@abhishekbarve/components'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Toaster } from '@/lib/toast'
import AddFeedModal from '@/components/AddFeedModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
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
                        <Button variant="ghost" size="sm" asChild>
                          <HiRefresh />
                          Refresh
                        </Button>
                      </Navbar.Item>
                      <Navbar.Item>
                        <Button variant="ghost" size="sm" id="add-feed-button" asChild>
                          <FaPlus />
                          Add Feed
                        </Button>
                      </Navbar.Item>
                      <Navbar.Item>
                        <Button variant="ghost" size="sm" id="settings-button" asChild>
                          <FaCog />
                          Settings
                        </Button>
                      </Navbar.Item>
                    </Navbar.Group>
                    <Navbar.Group>
                      <Navbar.Item>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => setSidebarOpen(true)}
                          asChild
                        >
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

            <AddFeedModal />

            <Toaster position="bottom-right" richColors />
            <TanStackRouterDevtools />
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}
