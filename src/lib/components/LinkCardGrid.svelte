<script>
  import Favicon from "./Favicon.svelte";
  import { buildFullUrl } from "$lib/utility/url.js";

  /**
   * 要展示的链接列表（仅需 title、url，fullUrl 在此组件内用 buildFullUrl 计算）
   * @type {Array<{ title: string; url: string; description?: string; tag?: string }>}
   */
  export let links = [];
  export let searchTerm = "";

  $: linksWithFullUrl = links.map((link) => ({
    ...link,
    fullUrl: buildFullUrl(link.url),
  }));

  $: filteredLinks = linksWithFullUrl.filter((link) =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
</script>

<div class="outer-container">
  <div class="card-grid">
    {#each filteredLinks as link}
      <div class="compact-card">
        <a
          href={link.fullUrl}
          class="card-link-button"
          rel="noopener noreferrer"
        >
          <div class="card-content is-flex is-align-items-center py-2 px-2">
            <figure class="image is-24x24 mr-2">
              <Favicon url={link.fullUrl} />
            </figure>
            <p class="is-size-5 has-text-weight-semibold mb-0 truncate-text">
              {link.title}
            </p>
          </div>
        </a>
        {#if link.description}
          <p class="is-flex is-align-items-center py-2 px-2">{link.description}</p>
        {/if}
      </div>
    {/each}
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
    min-width: 230px;
    max-width: 300px;
    display: block;
    text-decoration: none;
    color: inherit;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }


  .compact-card {
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    padding: 0.25rem 0.5rem;
    transition: all 0.2s ease-in-out;
  }

  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
