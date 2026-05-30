// api/story.js
import { API_URL, STORAGE } from '../src/utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  
  const isBot = /facebookexternalhit|TelegramBot|Twitterbot|Slackbot|LinkedInBot/i.test(userAgent);

  try {
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

    const reactAppHtml = `
      <!DOCTYPE html>
      <html lang="km">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vensoeng</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.jsx"></script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(reactAppHtml);

  } catch (err) {
    console.error("Error inside serverless function:", err);
    return res.status(500).send('Internal Server Error');
  }
}