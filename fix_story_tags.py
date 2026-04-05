from pathlib import Path
path = Path('src/pages/story.js')
text = path.read_text(encoding='utf-8')
text = text.replace('<a><p>', '<span><p>').replace('<a ><p>', '<span ><p>').replace('</a>', '</span>')
path.write_text(text, encoding='utf-8')
print('updated', path)
