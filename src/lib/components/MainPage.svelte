<script>
  import { onMount } from "svelte";
  import Favicon from "./Favicon.svelte";

  let searchTerm = "";
  /**
   * @type {any[]}
   *
   * @example
   * [
   *  { "title": "Google", "url": "https://www.google.com" },
   *  { "title": "本地服务 (同端口)", "url": "/api" },
   *  { "title": "另一个端口服务", "url": ":8080/api" },
   *  { "title": "远程测试", "url": "http://192.168.1.100:9090/dashboard" }
   * ]
   */
  let links = [];

  /**
   * @param {string} rawUrl
   */
  function buildFullUrl(rawUrl) {
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

  onMount(async () => {
    try {
      const res = await fetch("/links.json");
      let data = await res.json();
      console.log(data);
      // 构建 fullUrl
      links = data.map((/** @type {{ url: string; }} */ link) => ({
        ...link,
        fullUrl: buildFullUrl(link.url),
      }));
      console.log(links);
    } catch (err) {
      console.error("加载 links.json 出错:", err);
    }
  });

  $: filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
</script>

<div class="container block" style="height: 10%;"></div>

<div class="container is-widescreen block">
  <div class="title is-primary has-text-centered">NaVerse</div>
</div>

<div id="main_input" class="container block is-widescreen">
  <div class="columns is-centered is-vcentered is-mobile px-4">
    <div class="column is-8-tablet is-6-desktop is-flex">
      <input
        class="input is-primary mr-2"
        type="text"
        placeholder="search"
        style="flex: 1;"
        bind:value={searchTerm}
      />
      <button class="button is-primary"> Search </button>
    </div>
  </div>
</div>

<div class="container block is-widescreen">
  <!--  -->

  <div class="outer-container">
    <div class="card-grid">
      {#each filteredLinks as link}
        <a
          href={link.fullUrl}
          class="card-link-button"
          rel="noopener noreferrer"
        >
          <div class="card compact-card">
            <div class="card-content is-flex is-align-items-center py-2 px-2">
              <figure class="image is-24x24 mr-2">
                <Favicon url={link.fullUrl} />
              </figure>
              <p class="is-size-5 has-text-weight-semibold mb-0 truncate-text">
                {link.title}
              </p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .outer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 12px;
    box-sizing: border-box;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 12px;
    justify-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    max-width: 1200px;
    margin: 0 auto;
  }

  .card-link-button {
    display: block;
    color: inherit;
    text-decoration: none;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  .card-link-button:hover .compact-card {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  .compact-card {
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s ease-in-out;
  }

  /* 限制标题溢出 */
  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-link-button {
    min-width: 230px;
    max-width: 300px;
    display: block;
    text-decoration: none;
    color: inherit;
    text-decoration: none;
    display: block;
    color: inherit;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
</style>
