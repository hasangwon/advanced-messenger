const Linkify = ({ text }) => {
  const RE_URL =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let match;
  const results = [];
  let lastIndex = 0;
  while ((match = RE_URL.exec(text))) {
    const link = match[0];
    if (lastIndex !== match.index) {
      const str = text.substring(lastIndex, match.index);
      results.push(<span key={results.length}>{str}</span>);
    }
    results.push(
      <a
        key={results.length}
        href={link.includes('http') ? link : `//${link}`}
        target='_blank'
        className='text-primary-500'
        rel='noreferrer'
      >
        {link}
      </a>,
    );
    lastIndex = match.index + link.length;
  }
  if (results.length === 0) {
    return text;
  }
  if (lastIndex !== text.length) {
    results.push(<span key={results.length}>{text.substring(lastIndex)}</span>);
  }
  return results;
};

export default Linkify;
