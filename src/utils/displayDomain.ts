export const displayDomain = (channelKey: string) => {
  const url = new URL(window.location.href);
  const domain = url.origin;

  return `${domain}/?channel=${channelKey}`;
};
