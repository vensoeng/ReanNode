import fetch from 'node-fetch';

import { API_URL, STORAGE } from '../utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  const isBot = /facebookexternalhit|TelegramBot|Twitterbot|Slackbot|LinkedInBot/i.test(userAgent);

  if (isBot) {
    try {
      const apiRes = await fetch(`${API_URL}/blogs/${id}`);
      const blog = await apiRes.json();

      if (!blog || apiRes.status !== 200) {
        return res.status(404).send('Story not found');
      }

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
    } catch (err) {
      console.error(err);
    }
  }

  return res.redirect(`/storys/detail/${id}`);
}