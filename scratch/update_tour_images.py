import os
import random
import re

TOURS_DIR = r"c:\Users\MS\Desktop\travelmorocco\content\tours"
IMAGES_DIR = r"c:\Users\MS\Desktop\travelmorocco\public\images\tours"

# Get all images
all_images = [f for f in os.listdir(IMAGES_DIR) if f.endswith(".jpg")]
used_hero_images = set()

def get_tour_files():
    tour_files = []
    for root, dirs, files in os.walk(TOURS_DIR):
        for file in files:
            if file.endswith(".md"):
                tour_files.append(os.path.join(root, file))
    return tour_files

def get_best_images(keywords, count, exclude=[]):
    matches = []
    for img in all_images:
        if img in exclude:
            continue
        score = 0
        for kw in keywords:
            if kw.lower() in img.lower():
                score += 1
        if score > 0:
            matches.append((img, score))
    
    matches.sort(key=lambda x: x[1], reverse=True)
    results = [m[0] for m in matches[:count*4]] # Get a larger pool
    random.shuffle(results)
    return results[:count]

def process_tour(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine keywords
    rel_path = os.path.relpath(filepath, TOURS_DIR)
    category = rel_path.split(os.sep)[0]
    title_match = re.search(r'title: "(.*?)"', content)
    title = title_match.group(1) if title_match else ""
    
    keywords = category.lower().split() + title.lower().split()
    keywords = [kw for kw in keywords if len(kw) > 3 and kw not in ["tour", "tours", "from", "with", "day", "days"]]

    # 1. Select Unique Hero Image
    hero_pool = get_best_images(keywords, 1, exclude=list(used_hero_images))
    if not hero_pool:
        hero_pool = [img for img in all_images if img not in used_hero_images]
    
    hero_image = hero_pool[0]
    used_hero_images.add(hero_image)

    # 2. Select 4 Unique Gallery Images
    gallery_pool = get_best_images(keywords, 4, exclude=[hero_image])
    if len(gallery_pool) < 4:
        remaining = [img for img in all_images if img != hero_image and img not in gallery_pool]
        gallery_pool += random.sample(remaining, 4 - len(gallery_pool))
    
    # 3. Select unique images for itinerary days
    days_count = len(re.findall(r'- day: \d+', content))
    itinerary_pool = get_best_images(keywords, days_count, exclude=[hero_image] + gallery_pool)
    if len(itinerary_pool) < days_count:
        remaining = [img for img in all_images if img not in ([hero_image] + gallery_pool + itinerary_pool)]
        itinerary_pool += random.sample(remaining, days_count - len(itinerary_pool))

    # Update Hero
    content = re.sub(r'image: "/images/.*?"', f'image: "/images/tours/{hero_image}"', content)
    
    # Update Gallery
    gallery_str = ", ".join([f'"/images/tours/{img}"' for img in gallery_pool])
    content = re.sub(r'gallery: \[.*?\]', f'gallery: [{gallery_str}]', content)

    # Update Itinerary Images
    day_indices = [m.start() for m in re.finditer(r'- day: \d+', content)]
    day_indices.append(len(content))
    
    new_content = content[:day_indices[0]]
    for i in range(len(day_indices)-1):
        day_block = content[day_indices[i]:day_indices[i+1]]
        # Replace the first image in this block
        day_block = re.sub(r'image: "/images/.*?"', f'image: "/images/tours/{itinerary_pool[i]}"', day_block, count=1)
        new_content += day_block

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {filepath}: Hero -> {hero_image}")

tour_files = get_tour_files()
for tour in tour_files:
    process_tour(tour)

print(f"Successfully updated {len(tour_files)} tours with zero duplication.")
