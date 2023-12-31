'use client'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'
import { usePathname, useRouter } from 'next/navigation'
import {
  createClientComponentClient,
  Session
} from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

export default function Header({ session }: { session: Session | null }) {
  const path = usePathname()
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">HairTurn</Navbar.Brand>
        <Nav style={{ flexGrow: 1 }}>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {path !== '/login' && path !== '/signup' && (
            <>
              <Nav className="me-auto"></Nav>
              {session ? (
                <NavDropdown title="マイページ" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/account">
                    アカウント
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/hairstyle-history">
                    履歴
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    ログアウト
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="d-flex" style={{ gap: '1rem' }}>
                  <Button variant="outline-success" href="/signup">
                    新規登録
                  </Button>
                  <Button variant="outline-success" href="/login">
                    ログイン
                  </Button>
                </div>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
