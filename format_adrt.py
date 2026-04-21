import re

input_path = r"c:\GITHUB\ikksusorongraya.github.io\adrt_extracted.txt"
output_path = r"c:\GITHUB\ikksusorongraya.github.io\adrt_cleaned.html"

def clean_and_format():
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_html = []
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Remove page numbers (e.g., "1", "2", "3")
        if re.match(r'^\d+$', line): continue
        
        # Headers
        if re.match(r'^BAB \w+', line) or re.match(r'^ANGGARAN \w+', line) or line == "PENGANTAR" or line == "DAFTAR ISI":
            cleaned_html.append(f"<h2>{line}</h2>")
        elif re.match(r'^Pasal \d+', line):
            cleaned_html.append(f"<h3>{line}</h3>")
        elif re.match(r'^\d+\.', line):
            cleaned_html.append(f"<li class='article-item'>{line}</li>")
        else:
            cleaned_html.append(f"<p>{line}</p>")

    with open(output_path, 'w', encoding='utf-8') as out:
        out.write("\n".join(cleaned_html))

if __name__ == "__main__":
    clean_and_format()
