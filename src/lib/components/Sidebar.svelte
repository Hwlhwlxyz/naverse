<script>
  import sidebarFoldIcon from "$lib/assets/icon/sidebar-fold-line.svg";
  import sidebarUnfoldIcon from "$lib/assets/icon/sidebar-unfold-line.svg";

  /**
   * JSON 的 key 列表，如 ["tag1", "tag2", ...]
   * @type {string[]}
   */
  export let tags = [];
  /** 是否展开侧边栏 */
  export let open = true;
</script>

<div class="sidebar-wrapper" class:is-open={open}>
  <button
    type="button"
    class="sidebar-toggle"
    title={open ? "收起侧边栏" : "展开侧边栏"}
    on:click={() => (open = !open)}
  >
    <img
      src={open ? sidebarFoldIcon : sidebarUnfoldIcon}
      alt=""
      class="sidebar-toggle-icon"
    />
  </button>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul class="menu-list tag-list">
        {#each tags as tag}
          <li class="tag-item">
            <a href="#{tag}" class="tag-link">{tag}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
</div>

<style>
  .sidebar-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    transition: width 0.2s ease;
    width: 200px;
  }

  .sidebar-wrapper:not(.is-open) {
    width: 36px;
  }

  .sidebar-toggle {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 6px;
    color: #363636;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    z-index: 31;
  }

  .sidebar-toggle:hover {
    background: #eee;
  }

  .sidebar-toggle-icon {
    width: 18px;
    height: 18px;
    display: block;
  }

  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    padding: 2.5rem 0 1rem 0;
    border-right: 1px solid #dbdbdb;
    background: #fafafa;
    overflow: hidden;
    transition: opacity 0.2s ease;
  }

  .sidebar-wrapper:not(.is-open) .sidebar {
    opacity: 0;
    pointer-events: none;
  }

  .sidebar-nav {
    position: sticky;
    top: 1rem;
  }

  .tag-list {
    list-style: none;
    margin: 0;
    padding: 0 1rem;
  }

  .tag-item {
    margin-bottom: 0.25rem;
  }

  .tag-link {
    display: block;
    padding: 0.5rem 0.75rem;
    color: #363636;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: background 0.15s ease;
  }

  .tag-link:hover {
    background: #eee;
  }
</style>
