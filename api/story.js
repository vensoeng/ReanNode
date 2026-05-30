// api/story.js
import fs from 'fs';
import path from 'path';
import { API_URL, STORAGE } from '../utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  // ឆែកមើលថាជា Bot បណ្តាញសង្គម ឬអត់
  const isBot = /facebookexternalhit|TelegramBot|Twitterbot|Slackbot|LinkedInBot/i.test(userAgent);

  try {
    // ----------------------------------------------------
    // ករណីទី១៖ បើជា Bot របស់ Telegram ឬ Facebook ...
    // ----------------------------------------------------
    if (isBot) {
      const apiRes = await fetch(`${API_URL}/blogs/${id}`);
      if (apiRes.status !== 200) {
        return res.status(404).send('Story not found');
      }
      const blog = await apiRes.json();

      const fullImgUrl = API_URL + STORAGE + blog.img;
      const currentUrl = `https://vensoeng.vercel.app/storys/detail/${id}`;

      const html = `
        <!DOCTYPE html>
        <html lang="km">
        <head>
          <meta charset="UTF-8">
          <title>${blog.title}</title>
          <meta name="description" content="${blog.des || ""}" />
          <meta property="og:title" content="${blog.title}" />
          <meta property="og:description" content="${blog.des || ""}" />
          <meta property="og:image" content="${fullImgUrl}" />
          <meta property="og:url" content="${currentUrl}" />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body>
          <h1>${blog.title}</h1>
          <p>${blog.des}</p>
        </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    // ----------------------------------------------------
    // ករណីទី២៖ បើជា មនុស្សធម្មតា (អានកូដ React ផ្ទាល់ពីក្នុងម៉ាស៊ីន)
    // ----------------------------------------------------
    // វិធីសាស្ត្រអានតាមរយៈផ្លូវទម្រង់ពិតប្រាកដរបស់ Vercel ពេលកំពុងរត់ (Runtime)
    // វានឹងទៅអានឯកសារ index.html ពី Root នៃគម្រោងរបស់អ្នក
    const indexPath = path.join(process.cwd(), 'index.html');
    
    if (fs.existsSync(indexPath)) {
      const reactHtml = fs.readFileSync(indexPath, 'utf8');
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(reactHtml);
    }

    // បើស្វែងរកមិនឃើញសោះ (ជាករណីកម្រ) ឱ្យវាបោះកូដ HTML ទទេរទៅដើម្បីឱ្យ React ដំណើរការខ្លួនឯង
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send('<!DOCTYPE html><html><head></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>');

  } catch (err) {
    console.error("Error inside serverless function:", err);
    return res.status(500).send('Internal Server Error');
  }
}