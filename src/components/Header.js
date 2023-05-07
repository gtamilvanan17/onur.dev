'use client'

import { memo, useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useScrollData } from 'scroll-data-hook'

const DynamicViews = dynamic(() => import('@/components/Views'))
import { SCROLL_THRESHOLD, PROFILES } from '@/lib/constants'

const Header = memo(({ allPosts }) => {
  const [headerTitle, setHeaderTitle] = useState(null)
  const pathname = usePathname()
  const { slug } = useParams()
  const isWritingSlug = slug && pathname.startsWith('/writing/')

  useEffect(() => {
    if (isWritingSlug) {
      const post = allPosts.find((post) => post.slug === slug)
      if (post?.title) setHeaderTitle(post.title)
    }
  }, [slug])

  const {
    position: { y: scrollY }
  } = useScrollData()
  const translateY = Math.max(130 - scrollY, 0)
  const opacity = Math.min(
    Math.max(((scrollY - SCROLL_THRESHOLD * (SCROLL_THRESHOLD / (scrollY ** 2 / 100))) / 100).toFixed(4), 0),
    1
  )

  return (
    <header className="fixed top-0 inset-x-0 z-10 w-full h-12 bg-white mx-auto md:border-b md:border-gray-200 shadow-sm font-medium">
      <div className="flex items-center h-full content shadow text-sm md:shadow-none">
        {isWritingSlug ? (
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-3">
              <NextLink href="/" title="Go back">
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </NextLink>
              {headerTitle && (
                <span className="font-bold line-clamp-1" style={{ transform: `translateY(${translateY}%)`, opacity }}>
                  {headerTitle}
                </span>
              )}
            </div>
            <DynamicViews slug={slug} />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-1 text-gray-400">
            <NextLink
              href="/"
              className={`inline-flex items-center gap-2 hover:text-black ${pathname === '/' ? 'text-black' : ''}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                <path
                  d="M12 22.9272C12.7383 22.9272 13.3433 22.3838 13.4458 21.6147C14.4609 14.7651 15.394 13.8115 21.9771 13.063C22.7358 12.9707 23.3203 12.335 23.3203 11.5967C23.3203 10.8481 22.7461 10.2329 21.9873 10.1201C15.4453 9.20752 14.6353 8.40771 13.4458 1.56836C13.3125 0.80957 12.728 0.266113 12 0.266113C11.2515 0.266113 10.6567 0.80957 10.5337 1.57861C9.53906 8.41797 8.60596 9.37158 2.0332 10.1201C1.25391 10.2227 0.679688 10.8379 0.679688 11.5967C0.679688 12.335 1.2334 12.9502 2.0127 13.063C8.56494 13.9961 9.36475 14.7856 10.5337 21.625C10.6875 22.394 11.2822 22.9272 12 22.9272Z"
                  fill="currentColor"
                ></path>
              </svg>{' '}
              <span>Onur Şuyalçınkaya</span>
            </NextLink>
            <div className="flex items-center gap-3 md:gap-4">
              <NextLink href="/about" className={`hover:text-black ${pathname === '/about' ? 'text-black' : ''}`}>
                About
              </NextLink>
              <NextLink href="/journey" className={`hover:text-black ${pathname === '/journey' ? 'text-black' : ''}`}>
                Journey
              </NextLink>
              <a
                href={PROFILES.twitter.url}
                target="_blank"
                rel="noopener"
                title={PROFILES.twitter.title}
                className="hidden sm:block hover:text-[#1d9bf0]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path>
                </svg>
              </a>
              <a
                href={PROFILES.github.url}
                target="_blank"
                rel="noopener"
                title={PROFILES.github.title}
                className="hidden sm:block hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
})

export default Header
