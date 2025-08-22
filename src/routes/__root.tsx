import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '@abhishekbarve/components/styles'
import {
  Button,
  Header,
  Main,
  Navbar,
  ThemeProvider,
  ModalProvider,
} from '@abhishekbarve/components'
import { FaPlus } from 'react-icons/fa6'
import { IoMenu } from 'react-icons/io5'
import { Toaster } from '@/lib/toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FeedsBar from '@/components/FeedsBar'
import { useStore } from '@/stores/store'
import RefreshFeedButton from '@/components/RefreshFeedButton'
import SettingsButton from '@/components/SettingsButton'
import AllModals from '@/components/AllModals'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { setSidebarOpen } = useStore()
  const queryClient = new QueryClient()
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <div className="flex h-screen">
              <FeedsBar />
              <div className="flex-1">
                <Header>
                  <Navbar>
                    <Link to="/">
                      <Navbar.Brand>RSS Feed Reader</Navbar.Brand>
                    </Link>

                    <Navbar.Group align="right">
                      <Navbar.Item>
                        <RefreshFeedButton />
                      </Navbar.Item>
                      <Navbar.Item>
                        <Button variant="ghost" size="sm" id="add-feed-button" asChild>
                          <FaPlus />
                          Add Feed
                        </Button>
                      </Navbar.Item>
                      <Navbar.Item>
                        <SettingsButton />
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

            <AllModals />

            <Toaster position="bottom-right" richColors />
            <TanStackRouterDevtools />
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}
