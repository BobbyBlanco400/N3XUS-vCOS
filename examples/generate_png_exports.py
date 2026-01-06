#!/usr/bin/env python3
"""
Generate PNG exports from SVG logo files for investor presentations
"""

import cairosvg
import os
from pathlib import Path

def convert_svg_to_png(svg_path, png_path, width=None, height=None):
    """Convert SVG file to PNG with optional dimensions"""
    try:
        cairosvg.svg2png(
            url=svg_path,
            write_to=png_path,
            output_width=width,
            output_height=height
        )
        print(f"✓ Created: {png_path}")
        return True
    except Exception as e:
        print(f"✗ Error converting {svg_path}: {e}")
        return False

def main():
    # Base directory
    base_dir = Path(__file__).parent.parent
    svg_dir = base_dir / "logos" / "svg"
    png_dir = base_dir / "logos" / "png"
    
    # Create PNG directory if it doesn't exist
    png_dir.mkdir(parents=True, exist_ok=True)
    
    # Define conversions: (svg_file, output_name, width, height)
    conversions = [
        # Primary logo - high res for presentations
        ("n3xus-vcos-primary.svg", "n3xus-vcos-primary-2048px.png", 2048, 512),
        ("n3xus-vcos-primary.svg", "n3xus-vcos-primary-1024px.png", 1024, 256),
        ("n3xus-vcos-primary.svg", "n3xus-vcos-primary-4096px.png", 4096, 1024),
        
        # Icon logo - multiple sizes
        ("n3xus-vcos-icon.svg", "n3xus-vcos-icon-512px.png", 512, 512),
        ("n3xus-vcos-icon.svg", "n3xus-vcos-icon-256px.png", 256, 256),
        ("n3xus-vcos-icon.svg", "n3xus-vcos-icon-1024px.png", 1024, 1024),
        
        # Horizontal logo
        ("n3xus-vcos-horizontal.svg", "n3xus-vcos-horizontal-1200px.png", 1200, 200),
        ("n3xus-vcos-horizontal.svg", "n3xus-vcos-horizontal-2400px.png", 2400, 400),
        
        # Vertical logo
        ("n3xus-vcos-vertical.svg", "n3xus-vcos-vertical-600px.png", 600, 800),
        ("n3xus-vcos-vertical.svg", "n3xus-vcos-vertical-1200px.png", 1200, 1600),
    ]
    
    print("🎨 Generating PNG exports for investor presentations...")
    print("=" * 60)
    
    success_count = 0
    for svg_file, png_file, width, height in conversions:
        svg_path = str(svg_dir / svg_file)
        png_path = str(png_dir / png_file)
        
        if convert_svg_to_png(svg_path, png_path, width, height):
            success_count += 1
    
    print("=" * 60)
    print(f"✅ Generated {success_count}/{len(conversions)} PNG files")
    print(f"📁 Location: {png_dir}")
    print("\n🚀 Ready for investor presentations!")

if __name__ == "__main__":
    main()
