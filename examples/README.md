# N3XUS v-COS Logo Examples

This directory contains example implementations and usage demonstrations for the N3XUS v-COS logo.

## Files

### 1. logo-showcase.html
Interactive HTML showcase demonstrating all logo variants with styling examples.

**To view:**
```bash
# Open in your browser
open logo-showcase.html
# or
firefox logo-showcase.html
# or
chromium logo-showcase.html
```

**Features:**
- Interactive logo gallery
- Color palette display
- Responsive design
- Dark theme optimized

### 2. display_logo.py
Python script for displaying ASCII logos in the terminal with color support.

**Usage:**
```bash
# Make executable
chmod +x display_logo.py

# Display different sizes
./display_logo.py small     # Compact version
./display_logo.py medium    # Medium ASCII art
./display_logo.py large     # Full ASCII banner
./display_logo.py banner    # Decorated banner

# Short forms also work
./display_logo.py s
./display_logo.py m
./display_logo.py l
./display_logo.py b
```

**In Python code:**
```python
from display_logo import print_logo_small, print_logo_large

# Display logo at application startup
print_logo_large()
print("Welcome to N3XUS v-COS!")
```

### 3. display_logo.sh
Bash script for displaying ASCII logos in the terminal.

**Usage:**
```bash
# Make executable
chmod +x display_logo.sh

# Display different sizes
./display_logo.sh small     # Compact version
./display_logo.sh medium    # Medium ASCII art
./display_logo.sh large     # Full ASCII banner
./display_logo.sh banner    # Decorated banner from file

# Short forms also work
./display_logo.sh s
./display_logo.sh m
./display_logo.sh l
./display_logo.sh b
```

**In shell scripts:**
```bash
#!/bin/bash
source ./display_logo.sh

# Display logo in your script
show_large
echo "Starting N3XUS v-COS initialization..."
```

## Integration Examples

### Web Application Header
```html
<header>
  <img src="/logos/svg/n3xus-vcos-horizontal.svg" 
       alt="N3XUS v-COS" 
       height="50">
</header>
```

### Terminal Application
```python
#!/usr/bin/env python3
from display_logo import print_logo_large

def main():
    print_logo_large()
    print("\n🚀 Initializing N3XUS v-COS...")
    # Your application code here

if __name__ == '__main__':
    main()
```

### README Header
```markdown
<div align="center">
  <img src="logos/svg/n3xus-vcos-primary.svg" width="600" alt="N3XUS v-COS">
  
  # Your Project Name
  Powered by N3XUS v-COS
</div>
```

### CLI Tool Banner
```bash
#!/bin/bash
cat logos/ascii/logo-small.txt
echo ""
echo "N3XUS v-COS CLI Tool v1.0"
echo "=========================="
```

## Tips

### Color Support
Both Python and Bash scripts use ANSI color codes. For best results:
- Use a modern terminal emulator
- Ensure ANSI colors are enabled
- For Windows, use Windows Terminal or WSL

### Performance
- ASCII art displays instantly
- SVG files are small and load quickly
- HTML showcase is optimized for web viewing

### Customization
Feel free to modify these examples for your specific use case:
- Adjust colors in HTML/CSS
- Modify ASCII art display logic
- Add additional variants

## More Resources

- [Logo Assets Guide](../logos/README.md)
- [Brand Guidelines](../docs/BRAND_GUIDELINES.md)
- [Design Specifications](../docs/DESIGN_SPECS.md)

---

**Version**: 1.0  
**Last Updated**: 2026-01-06
