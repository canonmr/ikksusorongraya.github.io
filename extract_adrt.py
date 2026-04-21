import PyPDF2
import os

pdf_path = r"c:\GITHUB\ikksusorongraya.github.io\ADRT-IKKSU-Sorong-Raya-v6.pdf"
output_path = r"c:\GITHUB\ikksusorongraya.github.io\adrt_extracted.txt"

def extract_text():
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            
            with open(output_path, 'w', encoding='utf-8') as out:
                out.write(text)
            print(f"Successfully extracted text to {output_path}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    extract_text()
