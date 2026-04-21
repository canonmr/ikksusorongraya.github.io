import os
import json

base_dir = r"c:\GITHUB\ikksusorongraya.github.io\dokumentasi kegiatan"
output_file = r"c:\GITHUB\ikksusorongraya.github.io\albums.json"

def generate_albums_json():
    albums = []
    if not os.path.exists(base_dir):
        print(f"Directory {base_dir} not found.")
        return

    # Sort directories to have a consistent order
    subdirs = sorted([d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))], reverse=True)

    for subdir in subdirs:
        album_path = os.path.join(base_dir, subdir)
        
        # Check for images
        images = sorted([f for f in os.listdir(album_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        
        # We only want highlights (4-8)
        highlights = images[:8]
        
        if images:
            album_data = {
                "id": subdir,
                "path": f"dokumentasi kegiatan/{subdir}/",
                "highlights": highlights
            }
            albums.append(album_data)
            print(f"Added album: {subdir} with {len(highlights)} highlights")

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(albums, f, indent=2)
    print(f"Successfully generated {output_file}")

if __name__ == "__main__":
    generate_albums_json()
