# N3XUS v-COS Logo Assets

## Quick Start
Choose the appropriate logo variant for your use case:

| Variant | Best For | Dimensions | File |
|---------|----------|------------|------|
| **Primary** | Headers, hero sections, main branding | 800x200 | `logos/svg/n3xus-vcos-primary.svg` |
| **Icon** | App icons, favicons, avatars | 200x200 | `logos/svg/n3xus-vcos-icon.svg` |
| **Horizontal** | Navigation bars, email signatures | 600x100 | `logos/svg/n3xus-vcos-horizontal.svg` |
| **Vertical** | Mobile apps, vertical layouts | 300x400 | `logos/svg/n3xus-vcos-vertical.svg` |

## Directory Structure

```
logos/
├── svg/                          # Vector graphics (recommended)
│   ├── n3xus-vcos-primary.svg    # Full logo with tagline
│   ├── n3xus-vcos-icon.svg       # Square icon variant
│   ├── n3xus-vcos-horizontal.svg # Compact horizontal layout
│   └── n3xus-vcos-vertical.svg   # Stacked vertical layout
│
├── png/                          # Raster graphics (coming soon)
│   └── (PNG exports in various sizes)
│
└── ascii/                        # ASCII art variants
    ├── logo-large.txt            # Full ASCII banner
    ├── logo-medium.txt           # Medium ASCII logo
    ├── logo-small.txt            # Compact ASCII version
    └── logo-banner.txt           # Decorated ASCII banner
```

## Usage Examples

### Web / HTML
```html
<!-- Primary logo in header -->
<img src="logos/svg/n3xus-vcos-primary.svg" alt="N3XUS v-COS" width="400">

<!-- Icon for favicon -->
<link rel="icon" type="image/svg+xml" href="logos/svg/n3xus-vcos-icon.svg">

<!-- Horizontal logo in navigation -->
<img src="logos/svg/n3xus-vcos-horizontal.svg" alt="N3XUS v-COS" height="50">
```

### Markdown / README
```markdown
![N3XUS v-COS Logo](logos/svg/n3xus-vcos-primary.svg)
```

### Terminal / CLI
```bash
# Display ASCII logo
cat logos/ascii/logo-large.txt

# Use in script
echo "$(cat logos/ascii/logo-small.txt)"
```

### React / JSX
```jsx
import logo from './logos/svg/n3xus-vcos-primary.svg';

function Header() {
  return <img src={logo} alt="N3XUS v-COS" className="logo" />;
}
```

### CSS Background
```css
.hero {
  background-image: url('logos/svg/n3xus-vcos-primary.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

## Logo Features

### Design Elements
- **Hexagonal Icon**: Represents connectivity and structure
- **Gradient Effects**: Cyan → Purple → Magenta color flow
- **Glow Effects**: Digital energy and virtual presence
- **Modern Typography**: Courier New (monospace) for tech aesthetic

### Color Palette
- **Primary Cyan**: `#00d9ff`
- **Secondary Purple**: `#7b2ff7`
- **Accent Magenta**: `#ff006e`
- **Dark Navy Background**: `#0a0e27`
- **Deep Blue Secondary**: `#1a1f3a`

## ASCII Art Variants

### Large (88 chars wide)
Perfect for terminal application splash screens:
```
███╗   ██╗██████╗ ██╗  ██╗██╗   ██╗███████╗    ██╗   ██╗      ██████╗ ██████╗ ███████╗
████╗  ██║╚════██╗╚██╗██╔╝██║   ██║██╔════╝    ██║   ██║     ██╔════╝██╔═══██╗██╔════╝
```

### Medium (62 chars wide)
Great for README headers:
```
 _   _ _____  ____  _ _   _ ____     __     __    ____ ___  ____  
| \ | |___ / \/ /\ \| | | | / ___|    \ \   / /   / ___/ _ \/ ___| 
```

### Small (21 chars wide)
Compact inline version:
```
    ⬡  N3XUS v-COS  ⬡
```

## Best Practices

### DO ✓
- Use SVG format whenever possible
- Maintain aspect ratios
- Provide sufficient contrast with background
- Use appropriate variant for context
- Respect minimum sizes

### DON'T ✗
- Stretch or distort logos
- Change colors
- Add unauthorized effects
- Place on busy backgrounds without backdrop
- Use low-resolution versions when high-res is available

## Integration Examples

### GitHub README Header
```markdown
<div align="center">
  <img src="logos/svg/n3xus-vcos-primary.svg" alt="N3XUS v-COS" width="600">
  
  # N3XUS v-COS
  ### Virtual Creative Operating System
  
  The world's first Virtual Creative Operating System
</div>
```

### Package.json
```json
{
  "name": "n3xus-vcos",
  "icon": "logos/svg/n3xus-vcos-icon.svg",
  "logo": "logos/svg/n3xus-vcos-primary.svg"
}
```

### Documentation Site
```html
<nav class="navbar">
  <a href="/" class="navbar-brand">
    <img src="/logos/svg/n3xus-vcos-horizontal.svg" 
         alt="N3XUS v-COS" 
         height="40">
  </a>
</nav>
```

## Export Guidelines

### For Web
- **Format**: SVG (preferred) or PNG
- **Optimization**: Compress SVG, optimize PNG
- **Sizing**: Let CSS handle scaling

### For Print
- **Resolution**: 300 DPI minimum
- **Format**: PDF or high-res PNG
- **Color Mode**: CMYK for print, RGB for digital

### For Social Media
- **Profile Picture**: 400x400px PNG from icon variant
- **Cover Image**: Export primary logo at platform-specific dimensions
- **Posts**: Use brand colors and hexagonal motifs

## Need Help?

For detailed brand guidelines, see: [`docs/BRAND_GUIDELINES.md`](../docs/BRAND_GUIDELINES.md)

For custom logo requests or questions, please open an issue in the repository.

---

**Version**: 1.0  
**Last Updated**: 2026-01-06
