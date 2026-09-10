# Luxury Digital Wedding Invitation (Danial & Ayla)

An ultra-luxurious, mobile-first, 9:16 responsive digital wedding invitation web application built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, **HTML5 Canvas**, and **Web Audio API**.

---

## 🌸 Palette & Aesthetics

- **Dusty Blush Pink**: `#E8C5C8` / `#CF8A90` / `#B86B72`
- **Soft Pastel Rose**: `#F7EBEB`
- **Warm Ivory Stationery Background**: `#FFFDF9`
- **Champagne Gold Foil & Shimmer**: `#D4AF37` / `#F5E8C7` / `#AA771C`
- **Typography**: Cormorant Garamond, Playfair Display, Pinyon Script, and Montserrat

---

## ✨ Features & Architecture

### 1. Dual Viewport Switcher (9:16 Mobile & Full Responsive)
- **9:16 Mobile Simulator**: Features a realistic flagship mobile device frame with dynamic island, status bar, and ultra-smooth scrolling — custom tailored for vertical screen recordings and mobile preview.
- **Full Screen Mode**: Seamless responsive view across all tablets, laptops, and desktop screens.

### 2. 3D Embossed Stationery Envelope & Wax Seal Cover
- Full-screen (100vh) textured envelope with 3D embossed floral filigree corner motifs.
- Centered circular gold wax seal with raised monogram **"D&A"** and warm golden glow.
- Interactive tap triggers:
  - Procedural wax cracking & chime audio via Web Audio API.
  - Golden sparkle particle explosion via `canvas-confetti`.
  - 3D flap opening transition (`rotateX(-180deg)`).
  - Smooth automated camera glide into the invitation body.

### 3. Mughal Palace Courtyard Hero & Interactive Canvas Scratch Card
- High-resolution vector artwork depicting a romantic Mughal palace courtyard framed by blush floral garlands and hanging brass lanterns.
- Features the groom kneeling in a tailored dusty-pink suit before his bride in a heavily embroidered blush lehenga.
- **Interactive HTML5 Canvas Gold Scratch Card**:
  - Gold metallic foil layer with stardust specks and embossed text: *"✦ Scratch here to reveal the date ✦"*.
  - Realistic tactile touch & mouse drag scratch physics with procedural brush sound feedback.
  - Coverage threshold detection: once scratched past 45%, triggers a celebratory gold confetti burst and smoothly reveals:
    - **OCTOBER 12, 2026**
    - *Monday at Four O'Clock in the Afternoon*
    - One-click **Google Calendar** and **Apple / iCal (.ics)** save buttons.

### 4. Royal Schedule & Google Maps Embed
- Vertical itinerary with golden stem and milestone cards:
  - **Baraat Arrival (3:30 PM)**
  - **The Holy Nikkah (4:30 PM)**
  - **Walima & Grand Dinner (7:30 PM)**
- Styled Google Maps embed card for **Taj Palace, New Delhi** with a functional blue **"Get Directions"** button linking directly to Google Maps navigation.

### 5. Parents Details Section Framed by Hanging Wisteria
- Flanked by cascading hanging wisteria vines and blush floral graphics.
- Two stacked luxury cards:
  - **PARENTS OF THE GROOM**: Side-by-side square photo frames with thin gold filigree borders and name cards.
  - **PARENTS OF THE BRIDE**: Side-by-side square photo frames with thin gold filigree borders and name cards.

### 6. Sound & Music Experience (Web Audio API)
- 100% offline procedural audio synthesizer with zero external audio hosting or CORS hurdles:
  - Wax seal fracture sound + crystalline harmonic chime.
  - Scratch-off paper friction feedback.
  - Celebratory arpeggio fanfare.
  - Floating music controller with animated sound equalizer bars for ambient palace melody.

### 7. Interactive RSVP & Blessing Drawer
- Modal for guests to confirm attendance, number of guests, and send warm prayers.

---

## 🚀 How to Run

```bash
# In project directory:
cd C:\Users\HP\.gemini\antigravity\scratch\luxury-wedding-invitation

# Run development server:
npm run dev

# Open in browser:
http://localhost:3000
```
