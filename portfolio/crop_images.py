"""
从展板图片中裁切产品效果图 + PDF转JPG
"""
from PIL import Image
import fitz  # PyMuPDF
import os

IMG_DIR = r"C:\建模软件\cursor\firstCC\portfolio\images"

def convert_pdf_to_jpg(pdf_name):
    """Convert first page of PDF to JPG"""
    pdf_path = os.path.join(IMG_DIR, pdf_name)
    if not os.path.exists(pdf_path):
        print(f"  [SKIP] {pdf_name} not found")
        return None
    doc = fitz.open(pdf_path)
    page = doc[0]
    mat = fitz.Matrix(2, 2)  # 2x zoom for better quality
    pix = page.get_pixmap(matrix=mat)
    out_name = pdf_name.replace('.pdf', '.jpg')
    out_path = os.path.join(IMG_DIR, out_name)
    pix.save(out_path)
    doc.close()
    print(f"  [OK] {pdf_name} -> {out_name} ({Image.open(out_path).size})")
    return out_name

def crop_product_render(image_name, crop_box=None, out_suffix="_thumb", max_size=1200):
    """
    Crop a product render from a board image.
    crop_box: (left, top, right, bottom) as absolute pixels or None for auto
    If crop_box is None and image is portrait > landscape, crops top portion.
    """
    src_path = os.path.join(IMG_DIR, image_name)
    if not os.path.exists(src_path):
        print(f"  [SKIP] {image_name} not found")
        return None

    img = Image.open(src_path)

    # Convert CMYK to RGB if needed
    if img.mode == 'CMYK':
        img = img.convert('RGB')
    if img.mode == 'RGBA':
        # White background for transparency
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg

    w, h = img.size

    if crop_box:
        left, top, right, bottom = crop_box
    elif image_name in auto_crop_config:
        cfg = auto_crop_config[image_name]
        if cfg['type'] == 'board_portrait':
            # Crop top portion where product render typically is
            crop_pct = cfg.get('crop_pct', 0.45)
            left = 0
            top = 0
            right = w
            bottom = int(h * crop_pct)
        elif cfg['type'] == 'board_landscape':
            # Crop center area
            crop_pct = cfg.get('crop_pct', 0.7)
            margin_x = int(w * (1 - crop_pct) / 2)
            margin_y = int(h * (1 - crop_pct) / 2)
            left = margin_x
            top = margin_y
            right = w - margin_x
            bottom = h - margin_y
        elif cfg['type'] == 'render':
            # Use full image, just maybe add some padding crop
            left, top, right, bottom = 0, 0, w, h
        else:
            left, top, right, bottom = 0, 0, w, h
    else:
        # Default: center crop 60%
        margin_x = int(w * 0.2)
        margin_y = int(h * 0.2)
        left, top, right, bottom = margin_x, margin_y, w - margin_x, h - margin_y

    cropped = img.crop((left, top, right, bottom))

    # Resize to max_size while maintaining aspect ratio
    cw, ch = cropped.size
    if max(cw, ch) > max_size:
        ratio = max_size / max(cw, ch)
        new_size = (int(cw * ratio), int(ch * ratio))
        cropped = cropped.resize(new_size, Image.LANCZOS)

    # Save as JPG
    base, ext = os.path.splitext(image_name)
    out_name = base + out_suffix + '.jpg'
    out_path = os.path.join(IMG_DIR, out_name)
    cropped.save(out_path, 'JPEG', quality=92)
    print(f"  [OK] {image_name} -> {out_name} ({cropped.size})")
    return out_name

# Auto crop configuration per image
auto_crop_config = {
    # Board images - crop top portion for product render
    '上下肢主被动康复机器人-版面1.jpg': {
        'type': 'board_portrait',
        'crop_pct': 0.42  # Top 42% - captures hero product render
    },
    '上下肢主被动康复机器人-版面2.jpg': {
        'type': 'board_portrait',
        'crop_pct': 0.42
    },
    '睿护-未来医疗机器人.jpg': {
        'type': 'board_portrait',
        'crop_pct': 0.45
    },
    '潮汐卫士-智能潮汐预警与救援系统.jpg': {
        'type': 'board_landscape',
        'crop_pct': 0.8  # Center 80%
    },
    # Render images - use as-is
    '小布智能家庭机器人.png': {
        'type': 'render'
    },
    '初履幼儿学步手推车设计.png': {
        'type': 'render'
    },
}

def main():
    print("=" * 50)
    print("1. Converting PDF to JPG...")
    print("=" * 50)
    convert_pdf_to_jpg('景观作品集.pdf')

    print("\n" + "=" * 50)
    print("2. Cropping product renders from board images...")
    print("=" * 50)

    all_images = [
        '小布智能家庭机器人.png',
        '上下肢主被动康复机器人-版面1.jpg',
        '上下肢主被动康复机器人-版面2.jpg',
        '潮汐卫士-智能潮汐预警与救援系统.jpg',
        '睿护-未来医疗机器人.jpg',
        '初履幼儿学步手推车设计.png',
    ]

    for img_name in all_images:
        crop_product_render(img_name)

    print("\n" + "=" * 50)
    print("Done! Generated thumbnails:")
    print("=" * 50)
    for f in sorted(os.listdir(IMG_DIR)):
        if '_thumb' in f:
            size = os.path.getsize(os.path.join(IMG_DIR, f))
            print(f"  {f} ({size/1024:.0f}KB)")
        if f == '景观作品集.jpg':
            size = os.path.getsize(os.path.join(IMG_DIR, f))
            print(f"  {f} ({size/1024:.0f}KB)")

if __name__ == '__main__':
    main()
