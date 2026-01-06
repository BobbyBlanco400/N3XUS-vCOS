# N3XUS v-COS Design Specifications

## Logo Technical Specifications

### SVG Primary Logo (`n3xus-vcos-primary.svg`)

**Dimensions**: 800x200 pixels  
**Aspect Ratio**: 4:1  
**Color Mode**: RGB  

#### Design Elements:
- **Hexagonal Icon**: 
  - Outer hexagon: 60px height
  - Stroke width: 3px
  - Position: 50px from left edge
  
- **N3XUS Typography**:
  - Font: Courier New, monospace
  - Size: 72px
  - Weight: Bold (700)
  - Fill: Linear gradient (cyan → purple → magenta)
  - Position: Starting at x=110px, y=115px
  
- **v-COS Typography**:
  - Font: Courier New, monospace
  - Size: 60px
  - Weight: Light (300)
  - Fill: Cyan (#00d9ff)
  - Opacity: 90%
  - Position: Starting at x=440px, y=115px

- **Tagline**:
  - Text: "VIRTUAL CREATIVE OPERATING SYSTEM"
  - Font: Arial, sans-serif
  - Size: 16px
  - Fill: Cyan (#00d9ff)
  - Opacity: 70%
  - Position: Starting at x=110px, y=145px

#### Effects:
- **Gradient**: Linear, 0° to 100°
  - Stop 1: #00d9ff at 0%
  - Stop 2: #7b2ff7 at 50%
  - Stop 3: #ff006e at 100%

- **Glow Filter**:
  - Gaussian blur: 3px standard deviation
  - Applied to icon and main text

### SVG Icon Logo (`n3xus-vcos-icon.svg`)

**Dimensions**: 200x200 pixels  
**Aspect Ratio**: 1:1  
**Color Mode**: RGB  

#### Design Elements:
- **Outer Hexagon**: 60px height, 4px stroke
- **Middle Hexagon**: 45px height, 3px stroke
- **Inner Hexagon**: 30px height, filled with gradient at 30% opacity
- **Center Core**: 12px radius circle (cyan with glow), 6px inner circle (white)
- **N3 Text**: 20px Courier New Bold, positioned at center
- **Corner Accents**: 2px radius circles at each corner

### SVG Horizontal Logo (`n3xus-vcos-horizontal.svg`)

**Dimensions**: 600x100 pixels  
**Aspect Ratio**: 6:1  
**Compact design optimized for navigation bars**

### SVG Vertical Logo (`n3xus-vcos-vertical.svg`)

**Dimensions**: 300x400 pixels  
**Aspect Ratio**: 3:4  
**Stacked design optimized for mobile applications**

## ASCII Art Specifications

### Large Format (`logo-large.txt`)
- **Width**: 88 characters
- **Height**: 9 lines
- **Character Set**: Unicode box drawing characters
- **Usage**: Terminal splash screens, application startup

### Medium Format (`logo-medium.txt`)
- **Width**: 62 characters
- **Height**: 8 lines
- **Character Set**: ASCII art
- **Usage**: README headers, documentation

### Small Format (`logo-small.txt`)
- **Width**: 21 characters
- **Height**: 3 lines
- **Character Set**: Unicode and ASCII
- **Usage**: Compact displays, inline mentions

### Banner Format (`logo-banner.txt`)
- **Width**: 79 characters
- **Height**: 17 lines
- **Character Set**: Unicode box drawing characters with decorative elements
- **Usage**: Special announcements, decorated presentations

## Color Specifications

### RGB Values
| Color Name | Hex Code | RGB Values | Usage |
|------------|----------|------------|-------|
| Cyan | #00d9ff | 0, 217, 255 | Primary accent |
| Purple | #7b2ff7 | 123, 47, 247 | Secondary accent |
| Magenta | #ff006e | 255, 0, 110 | Tertiary accent |
| Dark Navy | #0a0e27 | 10, 14, 39 | Primary background |
| Deep Blue | #1a1f3a | 26, 31, 58 | Secondary background |
| White | #ffffff | 255, 255, 255 | Text on dark |
| Light Gray | #e0e0e0 | 224, 224, 224 | Secondary text |
| Dark Gray | #333333 | 51, 51, 51 | Text on light |

### CMYK Values (for print)
| Color Name | CMYK Values |
|------------|-------------|
| Cyan | 100, 15, 0, 0 |
| Purple | 69, 80, 0, 3 |
| Magenta | 0, 100, 57, 0 |

### Pantone Approximations
| Color Name | Pantone |
|------------|---------|
| Cyan | Process Cyan C |
| Purple | 2665 C |
| Magenta | Process Magenta C |

## Typography Specifications

### Primary Font: Courier New
- **Classification**: Monospace, Serif
- **Fallbacks**: Courier, monospace
- **Weights Used**: 
  - 700 (Bold) - for "N3XUS"
  - 300 (Light) - for "v-COS"
- **Licensing**: Included in most operating systems

### Secondary Font: Arial
- **Classification**: Sans-serif
- **Fallbacks**: Helvetica, sans-serif
- **Weights Used**: 
  - 400 (Regular) - for body text
  - 300 (Light) - for taglines
- **Licensing**: Included in most operating systems

## Spacing & Alignment

### Clear Space
Minimum clear space around all logos should equal the height of one hexagon side (approximately 30px for the primary logo, scaled proportionally for other variants).

### Alignment Grid
- **Primary Logo**: Elements aligned on an 8px grid
- **Icon Logo**: Centered on 200x200 canvas with 20px padding
- **Horizontal Logo**: Vertically centered with left-aligned text
- **Vertical Logo**: Centered alignment for all elements

## Export Settings

### SVG Export
- **Optimize**: Remove unnecessary metadata
- **Decimal places**: 2
- **Include**: viewBox attribute for responsiveness
- **Namespace**: Include XML namespace declaration

### PNG Export (Coming Soon)
- **Resolutions**: 64px, 128px, 256px, 512px, 1024px, 2048px
- **Format**: PNG-24 with alpha transparency
- **Optimization**: Compressed without quality loss
- **DPI**: 72 for web, 300 for print

## File Naming Convention

Format: `n3xus-vcos-[variant]-[size].[extension]`

Examples:
- `n3xus-vcos-primary.svg`
- `n3xus-vcos-icon-512px.png`
- `n3xus-vcos-horizontal.svg`
- `logo-large.txt`

## Version Control

**Current Version**: 1.0.0  
**Last Updated**: 2026-01-06  
**Change Log**:
- v1.0.0 (2026-01-06): Initial release with full logo suite

---

For implementation guidelines, see [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)  
For usage examples, see [logos/README.md](../logos/README.md)
