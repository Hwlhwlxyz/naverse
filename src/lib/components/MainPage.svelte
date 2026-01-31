<script>
  import { onMount } from "svelte";
  import LinkCardGrid from "./LinkCardGrid.svelte";
  import Sidebar from "./Sidebar.svelte";

  let searchTerm = "";
  /**
   * 从 links.json 解析后的链接列表（仅含 title、url、tag，fullUrl 由 LinkCardGrid 内计算）
   * @type {Array<{ title: string; url: string; description?: string; tag: string }>}
   */
  let links = [];
  /** @type {Record<string, Array<{ title: string; url: string; description?: string }>>} */
  let inputData = {};
  /** 侧边栏是否展开 */
  let sidebarOpen = true;

  onMount(async () => {
    try {
      const res = await fetch("/links.json");
      /** @type {Record<string, Array<{ title: string; url: string; description?: string }>>} */
      const data = await res.json();
      inputData = data;
      // 新格式：{ "tag名称": [ { title, url, description? }, ... ], ... }
      links = Object.entries(data).flatMap(([tag, linkList]) =>
        linkList.map((link) => ({ ...link, tag })),
      );
    } catch (err) {
      console.error("加载 links.json 出错:", err);
    }
  });

</script>

<Sidebar tags={Object.keys(inputData)} bind:open={sidebarOpen} />
<div class="page-content" class:sidebar-closed={!sidebarOpen}>
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

  <main class="main-content">
    {#each Object.entries(inputData) as [key, value]}
      <section class="tag-section" id={key}>
        <h1 class="tag-heading">{key}</h1>
        <div class="container block is-widescreen">
          <LinkCardGrid links={value} {searchTerm} />
        </div>
      </section>
    {/each}
  </main>
</div>

<style>
  .page-content {
    margin-left: 240px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    transition: margin-left 0.2s ease;
    box-sizing: border-box;
  }

  .page-content.sidebar-closed {
    margin-left: 36px;
  }

  .main-content {
    flex: 1;
    min-width: 0;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tag-section {
    margin-bottom: 2.5rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    box-sizing: border-box;
  }

  .tag-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #363636;
    margin: 0 0 1rem 0;
    padding: 0.5rem 0 0.75rem;
    border-bottom: 2px solid #dbdbdb;
    letter-spacing: 0.02em;
  }
</style>
