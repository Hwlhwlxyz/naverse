<script>
  import { onMount } from "svelte";

  export let url; // 传入站点 fullUrl
  let src = "/Favicon.ico.png"; // 初始默认图标

  /**
     * @param {string} hostname
     */
  function isPrivateHost(hostname) {
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      /^192\.168\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    );
  }

  /**
     * @param {string | URL} fullUrl
     */
  function getFaviconUrl(fullUrl) {
    try {
      const urlObj = new URL(fullUrl);
      const hostname = urlObj.hostname;
      const port = urlObj.port;

      if (isPrivateHost(hostname)) {
        return `${urlObj.protocol}//${hostname}${port ? ":" + port : ""}/favicon.ico`;
      } else {
        return `https://www.google.com/s2/favicons?sz=32&domain=${hostname}`;
      }
    } catch (e) {
      console.error("URL 解析失败:", fullUrl, e);
      return "/Favicon.ico.png";
    }
  }

  onMount(() => {
    const faviconUrl = getFaviconUrl(url);

    // 异步加载
    const testImg = new Image();
    testImg.src = faviconUrl;
    testImg.onload = () => {
      src = faviconUrl; // 加载成功 → 替换显示
    };
    testImg.onerror = () => {
      console.warn("favicon 加载失败，继续显示默认:", faviconUrl);
    };
  });
</script>

<img {src} alt="Favicon" class="favicon" />
