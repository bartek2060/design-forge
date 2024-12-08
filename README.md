# Design Forge

Type-safe design system generator that bridges the gap between SCSS and TypeScript.

## Features

- 🎨 **Type-safe design tokens** - Generate tokens that are accessible in both SCSS and TypeScript
- 🛠️ **Maintainable SCSS utilities** - Create utility classes with responsive variants
- ⚛️ **React integration** - Seamless integration with React components
- 📱 **Responsive design** - Built-in support for breakpoints
- 🌗 **Theme switching** - First-class support for light/dark modes and custom themes

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Usage Examples](#usage-examples)
4. [Configuration](#configuration)
5. [CLI Commands](#cli-commands)
6. [API Reference](#api-reference)

## Installation

```bash
npm install @mogielski/design-forge
```

## Quick Start

1. Initialize Design Forge in your project:

```bash
npx design-forge init
```

2. This will create a basic configuration in your project. The default structure:

```
src/@design/
├── config.ts         # Main configuration file
├── tokens/
│   ├── index.ts     # Token definitions
│   ├── colors.ts    # Color tokens
│   └── base.ts      # Base tokens (spacing, typography, etc.)
└── utilities/
    └── index.ts     # Custom utility definitions
```

3. Add the generated styles to your application:

```scss
// styles/globals.scss
@import "@/@design/build/styles/globals.scss";
```

4. Use the generated tokens in your components:

```typescript
// Example React component using Design Forge
import { DesignTokens, DesignUtilities } from '@/@design/build/types';
import utilClass from '@/@design/build/classes.json';
import tokens from '@/@design/build/tokens.json';

interface ButtonProps {
  variant: DesignTokens['baseColors'];
  size: DesignUtilities['spacing']['padding'];
}

const Button: React.FC<ButtonProps> = ({ variant, size }) => {
  return (
    <button
      className={utilClass.p[size]}
      style={{ backgroundColor: tokens['base-color'][variant] }}
    >
      Click me
    </button>
  );
};
```

## Usage Examples

### Theme Configuration

```typescript
// src/@design/tokens/colors.ts
export const baseColors = {
  primary: "#3b82f6",
  secondary: "#6b7280",
  success: "#22c55e",
} as const;

export const lightTheme = {
  bg: {
    base: "#ffffff",
    muted: "#f3f4f6",
  },
  text: {
    base: "#000000",
    muted: "#6b7280",
  },
} as const;

export const darkTheme = {
  bg: {
    base: "#18181b",
    muted: "#27272a",
  },
  text: {
    base: "#ffffff",
    muted: "#a1a1aa",
  },
} as const;
```

### Custom Utility Creation

```typescript
// src/@design/utilities/opacity.ts
import { UtilityConfig } from "@mogielski/design-forge";

const opacityUtility = new UtilityConfig({
  className: "opacity",
  properties: {
    opacity: "value",
  },
  values: {
    0: "0",
    25: "0.25",
    50: "0.5",
    75: "0.75",
    100: "1",
  },
  options: {
    responsive: true,
    important: true,
  },
});

export default opacityUtility;
```

## Configuration

The main configuration file (`config.ts`) uses a simple and intuitive API:

```typescript
import { DesignConfig } from "@mogielski/design-forge";

const config = new DesignConfig({
  tokens: {
    // Built-in token types
    spacing: {
      /* spacing values */
    },
    breakpoint: {
      /* breakpoint values */
    },
    typography: {
      /* typography values */
    },
    baseColors: {
      /* color values */
    },

    // Theme configuration
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },

    // Custom tokens, these can be nested as deep as you want
    custom: {
      borders: {
        radius: new TokenConfig({
          name: "border-radius",
          values: {
            sm: "0.4rem",
            base: "0.85rem",
            lg: "1.2rem",
          },
        }),
      },
    },
  },

  // Utility configuration
  utilities: {
    // Enable/disable built-in utilities
    spacing: {
      margin: true,
      padding: true,
      gap: true,
    },
    typography: true,

    // Custom utilities
    custom: {
      opacity: opacityUtility,
    },
  },
});

export default config;
```

## CLI Commands

### `design-forge init`

Initializes Design Forge in your project:

```bash
npx design-forge init [options]

Options:
  -d, --debug           Enable additional logging
  --dir <path>         Directory where design system files will be created
  --skip-package-json  Skip updating package.json with design-forge scripts
  -y, --yes           Skip prompts and use default values
```

### `design-forge build`

Builds your design system:

```bash
npx design-forge build [options]

Options:
  -c, --config <path>   Path to config file
  -o, --output <path>   Path to output directory
  -p, --prettier <path> Path to prettier config file
  -d, --debug          Enable additional logging
```

## API Reference

### `DesignConfig`

Main configuration class for your design system.

```typescript
new DesignConfig({
  tokens: TokenGeneratorInput;
  utilities?: UtilityGeneratorInput;
})
```

### `TokenConfig`

Defines a set of design tokens.

```typescript
new TokenConfig({
  name: string;
  values: Record<string, string>;
}, {
  cssVariable?: boolean;
  scssVariable?: boolean;
  scssMap?: boolean;
  scssMapKeys?: boolean;
})
```

### `UtilityConfig`

Defines a utility class generator.

```typescript
new UtilityConfig({
  className: string;
  properties: Record<string, string>;
  values: Record<string, string>;
  options?: {
    important?: boolean;
    responsive?: boolean;
  };
})
```