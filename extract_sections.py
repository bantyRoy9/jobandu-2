import json
from bs4 import BeautifulSoup

def extract_sections():
    with open('jobandu_leistungen.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    
    # We want to extract main sections. Stackable blocks usually have clear container classes.
    # Just extracting all text by H2s and H3s could give an outline.
    outline = []
    for heading in soup.find_all(['h1', 'h2', 'h3']):
        text = heading.get_text(strip=True)
        if text:
            outline.append(f"{heading.name.upper()}: {text}")
            
    # Also extract image URLs
    images = []
    for img in soup.find_all('img'):
        src = img.get('src')
        if src and src.startswith('http'):
            images.append(src)
            
    with open('homepage_outline.txt', 'w', encoding='utf-8') as f:
        f.write("\n".join(outline))
        f.write("\n\nImages:\n")
        f.write("\n".join(set(images)))

if __name__ == '__main__':
    extract_sections()
