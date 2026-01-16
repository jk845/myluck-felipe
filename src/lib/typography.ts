import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typography = {
  heading: {
    primary: "font-libre-baskerville",
    secondary: "font-hind-vadodara",
  },
  body: {
    primary: "font-hind-vadodara",
    secondary: "font-libre-baskerville",
  },
} as const

export const textStyles = {
  h1: cn(typography.heading.primary, "text-4xl font-bold"),
  h2: cn(typography.heading.primary, "text-3xl font-semibold"),
  h3: cn(typography.heading.primary, "text-2xl font-semibold"),
  h4: cn(typography.heading.secondary, "text-xl font-medium"),
  body: cn(typography.body.primary, "text-base"),
  bodyLarge: cn(typography.body.primary, "text-lg"),
  bodySmall: cn(typography.body.primary, "text-sm"),
  caption: cn(typography.body.secondary, "text-xs"),
} as const