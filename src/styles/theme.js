import { theme as chakraTheme } from '@chakra-ui/core'

// 480px, 640px, 1024px, 1280px
const breakpoints = ['20rem', '23rem', '48rem', '64rem', '80rem']
breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]
breakpoints.xl = breakpoints[4]

const fonts = {
  sans: `GT America, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  heading: `GT America Extended, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
}

const theme = {
  ...chakraTheme,
  breakpoints,
  colors: {
    ...chakraTheme.colors,
    link: '#0070F3'
  },
  fonts: {
    ...fonts,
    body: fonts.sans,
    heading: fonts.heading,
    code: fonts.mono
  },
  fontSizes: {
    ...chakraTheme.fontSizes,
    xxs: '.675rem'
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 600,
    bolder: 700
  },
  radii: {
    ...chakraTheme.radii,
    normal: 8,
    full: 9999
  }
}

export default theme
