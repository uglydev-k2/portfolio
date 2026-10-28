# Portfolio

Personal site for a frontend developer. One page, built with Next.js, TypeScript, and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit your details

| What | Where |
| --- | --- |
| Name, bio, skills, email, social links, Formspree id | `data/profile.ts` |
| Projects | `data/projects.ts` and `public/projects/` |
| Experience and education | `data/experience.ts` |
| Portrait | `public/portrait.png` |
| CV | `public/cv.pdf` (the button links to `/cv.pdf`) |
| Production URL and Formspree override | `.env.local` (see `.env.example`) |

Restart the dev server after changing `.env.local`. `NEXT_PUBLIC_` values are baked in at build time, so set them in Vercel before you deploy.

## Contact form

1. Create a form at [formspree.io](https://formspree.io).
2. Copy the id from `https://formspree.io/f/your_id`.
3. Put it in `formspreeId` inside `data/profile.ts`, or in `NEXT_PUBLIC_FORMSPREE_ID`.

Until that id is set, the form explains how to connect it. Email and WhatsApp links work as soon as you edit them in `data/profile.ts`.

## Deploy

### Vercel

1. Push this project to GitHub.
2. In [Vercel](https://vercel.com/new), import the repository. Framework preset: Next.js.
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = your production URL, including `https://`
   - `NEXT_PUBLIC_FORMSPREE_ID` = your Formspree id (optional if you set it in `data/profile.ts`)
4. Deploy. Vercel runs `npm run build`.

### Custom domain

1. In the Vercel project, open Settings → Domains and add the domain.
2. At your DNS host, add the records Vercel shows (usually an `A` record for the apex and a `CNAME` for `www`).
3. Wait until Vercel reports the domain as valid. HTTPS is issued automatically.
4. Choose one host as primary (`www` or the apex) and redirect the other.
5. Set `NEXT_PUBLIC_SITE_URL` to that primary URL and redeploy so the sitemap, canonical URL, and social cards match.
6. Check `https://yourdomain.com`, `/sitemap.xml`, `/robots.txt`, and a shared link preview.
