'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavbarProps {
  brandName: string
}

export function Navbar({ brandName }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = document.getElementById('mainNav')
    const sections = document.querySelectorAll('[data-theme]')
    const navLinks = document.querySelectorAll('.nav__links a:not(.nav__cta)')
    let ticking = false

    const updateNav = () => {
      setScrolled(window.scrollY > 80)

      let hit: Element | null = null
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= 80) hit = s
      })

      if (hit) {
        const el = hit as HTMLElement
        const t = el.dataset.theme as 'dark' | 'light'
        setTheme(t)
        const id = el.getAttribute('id')
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
        })
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateNav)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateNav()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      window.scrollTo({ top: (target as HTMLElement).offsetTop, behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <div className="nav-wrapper">
      <nav
        className={`nav nav--pill ${scrolled ? 'nav--scrolled' : ''} nav--theme-${theme}`}
        id="mainNav"
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          <Link href="/" className="nav__logo nav-brand" aria-label="D'Harmony Home">
            <img src="/assets/logo/logo-icon.webp" alt="D'Harmony Icon" className="brand-icon" />
            <span className="brand-text">D'Harmony</span>
          </Link>
          <div className={`nav__links ${menuOpen ? 'open' : ''}`} id="navLinks">
            <a href="#about" className="nav-link" data-text="About" onClick={(e) => handleAnchorClick(e, '#about')}>
              <span>About</span>
            </a>
            <a href="#roasted" className="nav-link" data-text="Roasted Beans" onClick={(e) => handleAnchorClick(e, '#roasted')}>
              <span>Roasted Beans</span>
            </a>
            <a href="#green" className="nav-link" data-text="Green Beans" onClick={(e) => handleAnchorClick(e, '#green')}>
              <span>Green Beans</span>
            </a>
            <a href="#order" className="nav__cta" onClick={(e) => handleAnchorClick(e, '#order')}>
              Order Now
            </a>
          </div>
          <button
            className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
            id="navBurger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </div>
  )
}
