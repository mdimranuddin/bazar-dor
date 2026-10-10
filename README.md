# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে দেখার একটি ওয়েব অ্যাপ।
A Bangladeshi daily grocery price tracker: see today's prices, which items rose or fell, and market-wise price details.

🔗 **Live:** https://bazar-dor-alpha-ten.vercel.app
📦 **Repository:** https://github.com/mdimranuddin/bazar-dor

## 🛠️ Technologies Used

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **DaisyUI**
- **BetterAuth** (email/password, Google, GitHub)
- **MongoDB Atlas** (user storage)
- **react-hot-toast** (notifications)
- **Vercel** (deployment)

## ✨ Key Features

1. **Live price ticker and product cards:** a scrolling price strip, plus responsive cards showing emoji, unit, Bengali-digit price and a green/red/gray change badge.
2. **Top risers and fallers:** the home page highlights the 6 products whose prices rose the most and the 6 that fell the most today.
3. **Category pages with sorting:** filter by category and sort by price (low to high, high to low) using real numeric values, not Bengali text.
4. **Authentication:** sign up, sign in and sign out with BetterAuth, with toast messages for success and errors.
5. **Protected product details:** logged-in users see minimum, maximum and average prices plus a market-by-market price table.
6. **Profile management:** view your profile and update your name.
7. **Fully responsive:** works on mobile, tablet and desktop, with skeleton loaders and a friendly 404 page.

## 🚀 Run Locally

```bash
git clone https://github.com/mdimranuddin/bazar-dor.git
cd bazar-dor
npm install
```

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Then start the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## 📡 Data Source

Product and category data come from the Programming Hero BazarDor API.
