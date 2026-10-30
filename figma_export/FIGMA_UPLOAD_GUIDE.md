# How to Upload GadgetZone to Figma
> Step-by-step instructions for importing the GadgetZone project (1440px Desktop, 390px Mobile, Reusable Components, and Tokens) directly into Figma.

---

## 📁 Exported Figma Files in this Directory

All ready-to-import files are located at:  
`/Users/mendparalaksh/.gemini/antigravity/scratch/gadgetzone/figma_export/`

| File | Purpose | Import Target in Figma |
| :--- | :--- | :--- |
| **`gadgetzone-desktop-1440.svg`** | Full Desktop Landing Page (1440px × 3800px) | Drag & drop directly into your Figma canvas. |
| **`gadgetzone-mobile-390.svg`** | Full Mobile Landing Page (390px × 4600px) | Drag & drop directly into your Figma canvas. |
| **`gadgetzone-components-library.svg`** | Master Component Library & Design Tokens Sheet | Drag & drop to create your component page. |
| **`tokens.json`** | W3C Design Tokens (Colors, Typography, Spacing, Radii) | Import via Figma "Tokens Studio" or Local Variables. |

---

## ⚡ Method 1: Direct Drag & Drop (Fastest & 100% Vector – No Plugins Needed)

This is the cleanest and quickest method. Figma natively parses SVG files into editable vector shapes, text layers, and groups.

1. **Open Figma**: Go to [figma.com](https://figma.com) or launch the Figma Desktop App.
2. **Create a New File**: Click **"+ Design file"**.
3. **Open Finder on your Mac**:
   - Press `Cmd + Space`, paste:  
     `/Users/mendparalaksh/.gemini/antigravity/scratch/gadgetzone/figma_export`  
     and press Enter.
4. **Drag & Drop into Figma**:
   - Drag **`gadgetzone-desktop-1440.svg`** onto the canvas. It will appear as an organized, high-resolution 1440px desktop frame.
   - Drag **`gadgetzone-mobile-390.svg`** right next to it. It will appear as the 390px iPhone mobile frame.
   - Drag **`gadgetzone-components-library.svg`** to a separate page or side-by-side to serve as your design system component sheet.
5. **Convert to Figma Native Frames & Components**:
   - Select the imported frame on the left Layers panel.
   - Right-click and choose **Frame Selection** (`Option + Cmd + G`).
   - For components (Buttons, Cards), select any item and press `Option + Cmd + K` (Mac) or `Ctrl + Alt + K` (Windows) to create a **Figma Master Component**.
   - Press `Shift + A` to activate **Auto Layout** on any container.

---

## 🚀 Method 2: 1-Click HTML-to-Figma with Auto Layout (`html.to.design`)

If you want Figma to automatically compute Auto Layout frames directly from the live DOM:

1. **Launch a Local Server**:
   In your terminal, run:
   ```bash
   npx serve /Users/mendparalaksh/.gemini/antigravity/scratch/gadgetzone -p 3000
   ```
2. **Open Figma and Launch the Plugin**:
   - Press `Shift + I` in Figma, switch to **Plugins**, and search for **"html.to.design"**.
   - Click **Run**.
3. **Import**:
   - In the plugin URL box, enter: `http://localhost:3000`
   - Under Viewports, check **Desktop (1440px)** and **Mobile (390px)**.
   - Click **Import**.
4. The plugin will create fully editable Figma frames with native Auto Layout, text styles, and component layers automatically.

---

## 🎨 Method 3: Import Shared Color & Typography Tokens

To import the shared design tokens into Figma's native **Variables** or **Tokens Studio**:

1. In Figma, press `Shift + I` and run **"Tokens Studio for Figma"** (formerly Figma Tokens).
2. Go to **Settings** → **Import** (or **Tools** → **Load from file**).
3. Select [`tokens.json`](file:///Users/mendparalaksh/.gemini/antigravity/scratch/gadgetzone/figma_export/tokens.json).
4. All color styles (`Dark Navy`, `Electric Blue`, `Tech Cyan`, `Card Dark`), typography styles, and 8pt spacing tokens will be linked automatically.

---

## 📐 Figma Structure Checklist for Your Deliverable

When submitting or presenting in Figma, ensure your page has:
1. **Desktop Frame**: Frame width set to `1440px`.
2. **Mobile Frame**: Frame width set to `390px`.
3. **Components Page / Section**:
   - `Button` (Primary, Secondary, Outline, Cyan, Ghost).
   - `Product Card` (with badge, rating, price, and CTA).
   - `Category Card` (with circular icon and explore link).
   - `Feature Card` (with 56px icon box).
4. **Color Styles**: Dark Navy `#101828`, Electric Blue `#2563EB`, White `#FFFFFF`, Light Gray `#F8FAFC`.
5. **Auto Layout**: Enabled on Header, Hero CTA group, Cards, and Footer.
