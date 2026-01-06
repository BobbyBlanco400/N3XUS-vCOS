#!/usr/bin/env python3
"""
Create a professional investor presentation slide for N3XUS v-COS
"""

from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

def create_investor_slide():
    """Create a professional investor presentation slide"""
    
    # Dimensions for standard presentation (16:9 aspect ratio)
    width = 1920
    height = 1080
    
    # Create image with dark gradient background
    img = Image.new('RGB', (width, height), color='#0a0e27')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background effect
    for y in range(height):
        # Create gradient from dark navy to deep blue
        r1, g1, b1 = 10, 14, 39   # #0a0e27
        r2, g2, b2 = 26, 31, 58   # #1a1f3a
        
        ratio = y / height
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        
        draw.rectangle([(0, y), (width, y+1)], fill=(r, g, b))
    
    # Load the logo PNG
    logo_path = Path(__file__).parent.parent / "logos" / "png" / "n3xus-vcos-primary-2048px.png"
    try:
        logo = Image.open(logo_path)
        
        # Calculate logo position (centered horizontally, top third)
        logo_width = int(width * 0.7)  # 70% of slide width
        logo_height = int(logo.height * (logo_width / logo.width))
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
        
        logo_x = (width - logo_width) // 2
        logo_y = 150
        
        # Paste logo with alpha channel
        img.paste(logo, (logo_x, logo_y), logo)
        
    except Exception as e:
        print(f"Warning: Could not load logo - {e}")
    
    # Add tagline and key points
    try:
        # Try to use a nice font with cross-platform fallbacks
        font_paths = [
            # Linux
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            # macOS
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial.ttf",
            # Windows
            "C:\\Windows\\Fonts\\arial.ttf",
            "C:\\Windows\\Fonts\\arialbd.ttf",
        ]
        
        title_font = None
        subtitle_font = None
        body_font = None
        
        for font_path in font_paths:
            try:
                if "Bold" in font_path or "bd" in font_path:
                    title_font = ImageFont.truetype(font_path, 48)
                else:
                    if subtitle_font is None:
                        subtitle_font = ImageFont.truetype(font_path, 36)
                    if body_font is None:
                        body_font = ImageFont.truetype(font_path, 28)
                if title_font and subtitle_font and body_font:
                    break
            except:
                continue
        
        # Fallback to default if no fonts found
        if not title_font:
            title_font = ImageFont.load_default()
        if not subtitle_font:
            subtitle_font = ImageFont.load_default()
        if not body_font:
            body_font = ImageFont.load_default()
        
        # Tagline
        tagline = "The World's First Virtual Creative Operating System"
        tagline_bbox = draw.textbbox((0, 0), tagline, font=subtitle_font)
        tagline_width = tagline_bbox[2] - tagline_bbox[0]
        tagline_x = (width - tagline_width) // 2
        tagline_y = 450
        draw.text((tagline_x, tagline_y), tagline, fill='#00d9ff', font=subtitle_font)
        
        # Key features
        features = [
            "⬡  Next-Generation Creative Computing Platform",
            "⬡  Innovative Hexagonal Architecture",
            "⬡  Seamless Virtual Workspace Integration",
            "⬡  Empowering Creators Worldwide"
        ]
        
        feature_y = 600
        for feature in features:
            feature_bbox = draw.textbbox((0, 0), feature, font=body_font)
            feature_width = feature_bbox[2] - feature_bbox[0]
            feature_x = (width - feature_width) // 2
            draw.text((feature_x, feature_y), feature, fill='#7b2ff7', font=body_font)
            feature_y += 60
        
        # Footer with dynamic year
        from datetime import datetime
        current_year = datetime.now().year
        footer_text = f"Confidential Investor Presentation • {current_year}"
        footer_bbox = draw.textbbox((0, 0), footer_text, font=body_font)
        footer_width = footer_bbox[2] - footer_bbox[0]
        footer_x = (width - footer_width) // 2
        footer_y = 980
        draw.text((footer_x, footer_y), footer_text, fill='#00d9ff', font=body_font)
        
    except Exception as e:
        print(f"Warning: Could not add text - {e}")
    
    # Add decorative elements (corner accents)
    accent_color = '#00d9ff'
    accent_size = 3
    accent_length = 40
    
    # Top-left corner
    draw.rectangle([(20, 20), (20 + accent_length, 20 + accent_size)], fill=accent_color)
    draw.rectangle([(20, 20), (20 + accent_size, 20 + accent_length)], fill=accent_color)
    
    # Top-right corner
    draw.rectangle([(width - 20 - accent_length, 20), (width - 20, 20 + accent_size)], fill=accent_color)
    draw.rectangle([(width - 20 - accent_size, 20), (width - 20, 20 + accent_length)], fill=accent_color)
    
    # Bottom-left corner
    draw.rectangle([(20, height - 20 - accent_size), (20 + accent_length, height - 20)], fill=accent_color)
    draw.rectangle([(20, height - 20 - accent_length), (20 + accent_size, height - 20)], fill=accent_color)
    
    # Bottom-right corner
    draw.rectangle([(width - 20 - accent_length, height - 20 - accent_size), (width - 20, height - 20)], fill=accent_color)
    draw.rectangle([(width - 20 - accent_size, height - 20 - accent_length), (width - 20, height - 20)], fill=accent_color)
    
    # Save the investor slide
    output_path = Path(__file__).parent.parent / "logos" / "png" / "N3XUS-vCOS-Investor-Presentation.png"
    img.save(output_path, 'PNG', optimize=True)
    
    print(f"✅ Created investor presentation slide: {output_path}")
    print(f"📐 Dimensions: {width}x{height}px (1920x1080 - Full HD)")
    print(f"📊 Perfect for PowerPoint, Keynote, or PDF presentations")
    
    return output_path

if __name__ == "__main__":
    print("🎨 Creating professional investor presentation slide...")
    print("=" * 60)
    create_investor_slide()
    print("=" * 60)
    print("🚀 Ready to present to investors!")
