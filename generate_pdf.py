import asyncio
import os
import shutil
from playwright.async_api import async_playwright
import pymupdf

async def render_pdf(page, html_path, output_pdf_path):
    print(f"\nLoading HTML from: {html_path}")
    if not os.path.exists(html_path):
        raise FileNotFoundError(f"File not found: {html_path}")
    
    await page.goto(f"file:///{html_path.replace(os.sep, '/')}", wait_until="networkidle")
    await page.wait_for_timeout(1000)
    
    print(f"Generating PDF to: {output_pdf_path}")
    await page.pdf(
        path=output_pdf_path,
        format="A4",
        print_background=True,
        prefer_css_page_size=True
    )

def audit_pdf(pdf_path):
    print(f"\n--- Auditing PDF: {os.path.basename(pdf_path)} ---")
    doc = pymupdf.open(pdf_path)
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
    print(f"Audit complete: Verified {total_links} functional clickable hyperlinks inside {os.path.basename(pdf_path)}!")

async def generate_all_pdfs():
    workspace_dir = r"e:\AMIT AI\portfilo"
    
    # 1. Classic ATS Resume
    html_classic = os.path.join(workspace_dir, "resume.html")
    pdf_alber = os.path.join(workspace_dir, "Mikhail_Emad_Alber_Resume.pdf")
    pdf_classic = os.path.join(workspace_dir, "Mikhail_Emad_Resume.pdf")
    
    # 2. Modern 2-Column Resume (with Photo)
    html_modern = os.path.join(workspace_dir, "resume-modern.html")
    pdf_modern = os.path.join(workspace_dir, "Mikhail_Emad_Modern_Resume.pdf")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Render Classic
        await render_pdf(page, html_classic, pdf_alber)
        shutil.copyfile(pdf_alber, pdf_classic)
        
        # Render Modern
        await render_pdf(page, html_modern, pdf_modern)
        
        await browser.close()
    
    audit_pdf(pdf_classic)
    audit_pdf(pdf_modern)

if __name__ == "__main__":
    asyncio.run(generate_all_pdfs())
