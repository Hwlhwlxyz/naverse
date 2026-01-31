/**
 * @param {string} rawUrl
 */
export function buildFullUrl(rawUrl) {
  // 情况 1：绝对 URL（http/https 开头）
  if (/^https?:\/\//i.test(rawUrl)) {
    return rawUrl;
  }

  // 情况 2：相对路径（/开头）
  if (rawUrl.startsWith("/")) {
    return `${window.location.origin}${rawUrl}`;
  }

  // 情况 3：可选端口写法（例如 ":8080/api"）
  if (rawUrl.startsWith(":")) {
    const [port, ...rest] = rawUrl.split("/");
    const path = rest.length ? `/${rest.join("/")}` : "";
    return `${window.location.protocol}//${window.location.hostname}${port}${path}`;
  }

  // 兜底：原样返回
  return rawUrl;
}