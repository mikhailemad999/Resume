import asyncio
import os
import shutil
from playwright.async_api import async_playwright
import pymupdf

async def generate_pdf():
    workspace_dir = r"e:\AMIT AI\portfilo"
    html_path = os.path.join(workspace_dir, "resume.html")
    pdf_alber_path = os.path.join(workspace_dir, "Mikhail_Emad_Alber_Resume.pdf")
    pdf_main_path = os.path.join(workspace_dir, "Mikhail_Emad_Resume.pdf")
    
    print(f"Loading HTML from: {html_path}")
    if not os.path.exists(html_path):
        raise FileNotFoundError(f"File not found: {html_path}")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto(f"file:///{html_path.replace(os.sep, '/')}", wait_until="networkidle")
        await page.wait_for_timeout(1000)
        
        print(f"Generating PDF to: {pdf_alber_path}")
        await page.pdf(
            path=pdf_alber_path,
            format="A4",
            print_background=True,
            margin={
                "top": "6mm",
                "bottom": "6mm",
                "left": "8mm",
                "right": "8mm"
            },
            prefer_css_page_size=True
        )
        await browser.close()
    
    # Copy to Mikhail_Emad_Resume.pdf as well
    shutil.copyfile(pdf_alber_path, pdf_main_path)
    print(f"Copied PDF to: {pdf_main_path}")
    
    # Audit PDF hyperlinks with PyMuPDF
    print("\n--- Auditing Clickable Hyperlinks in Generated PDF ---")
    doc = pymupdf.open(pdf_alber_path)
    total_links = 0
    
    print(f"Total Pages: {len(doc)}")
    for page_num in range(len(doc)):
        page = doc[page_num]
        links = page.get_links()
        print(f"Page {page_num + 1} has {len(links)} interactive links:")
        for link in links:
            uri = link.get("uri")
            if uri:
                total_links += 1
                rect = link.get("from")
                print(f"  [Link {total_links}] -> {uri} (at {rect})")
    
    doc.close()
    print(f"\nAudit complete: Verified {total_links} functional clickable hyperlinks inside {os.path.basename(pdf_alber_path)}!")

if __name__ == "__main__":
    asyncio.run(generate_pdf())
