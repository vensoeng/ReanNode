
import { API_URL, STORAGE } from '../src/utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';

  const isBot = /facebook|twitterbot|telegrambot|slackbot|linkedinbot|whatsapp/i.test(userAgent);

  try {
    if (isBot) {
      const apiRes = await fetch(`${API_URL}/blogs/${id}`);

      if (!apiRes.ok) {
        return res.status(404).send('Story not found');
      }

      const blog = await apiRes.json();

      const image = blog.img
        ? `${API_URL}${STORAGE}${blog.img}`
        : 'https://vensoeng.vercel.app/default-cover.jpg';

      const shareUrl = `https://vensoeng.vercel.app/share/story/${id}`;

      return res.status(200).send(`
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <title>${blog.title}</title>

          <meta property="og:title" content="${blog.title}" />
          <meta property="og:description" content="${blog.des || ''}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${shareUrl}" />
          <meta property="og:type" content="article" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${blog.title}" />
          <meta name="twitter:description" content="${blog.des || ''}" />
          <meta name="twitter:image" content="${image}" />
          </head>
          <body>
          Story Preview
          </body>
          </html>
      `);
    }
    return res.redirect(
      302,
      `https://vensoeng.vercel.app/storys/detail/${id}?open=1`
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
}