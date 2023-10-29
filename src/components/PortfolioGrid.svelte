<script>
  import PortfolioItem from "./PortfolioItem.svelte";
  export let items;

  let selectedItemIndex = null;
</script>

<div class="portfolio-grid grid gap-8 justify-items-center">
  {#each items as item, i (i)}
    <PortfolioItem
      {item}
      selected={selectedItemIndex === i}
      selectItem={() => {
        selectedItemIndex = i;
      }}
      closeItem={() => {
        selectedItemIndex = null;
      }}
      }
    />
  {/each}
</div>

<style>
  .portfolio-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-flow: row dense;
  }
</style>
