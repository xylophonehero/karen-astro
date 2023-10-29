<script>
  export let item;
  export let selected;
  export let selectItem;
  export let closeItem;

  const { title, description, thumb, mainMedia, tagline, link, pdf } =
    item.fields;
</script>

<button
  on:click={selectItem}
  data-selected={selected}
  class="relative card card-compact items-stretch max-w-sm group"
>
  <figure class="aspect-video">
    <img src={thumb.fields.file.url} alt="" />
  </figure>
  <div
    class:rounded-b-none={selected}
    class:bg-secondary-content={selected}
    class="card-body rounded-b-[inherit] group-hover:bg-opacity-80 bg-primary-content justify-center"
  >
    <h3 class="card-title justify-center">
      {title}
    </h3>
  </div>

  {#if selected}
    <div class="absolute top-full inset-x-0 h-12 bg-secondary-content"></div>
  {/if}
</button>
{#if selected}
  <div
    class="col-span-full bg-secondary-content p-4 rounded-2xl w-full flex flex-wrap-reverse gap-4 @container/selected"
  >
    <!-- <div class="flex-1 min-w-[300px]"> -->
    <!--   <img class="image rounded-lg" src={mainMedia.fields.file.url} alt="" /> -->
    <!-- </div> -->
    <div class="flex-1 flex flex-col space-y-2 min-w-[300px]">
      <div class="flex justify-between">
        <div class="text-lg border-b border-current font-medium">
          {tagline}
        </div>
        <button on:click={closeItem}>Close</button>
      </div>
      <div class="flex-1">
        {description}
      </div>
      <div class="flex justify-start space-x-2">
        <a
          class="btn btn-secondary"
          target="_blank"
          href={link || (pdf?.fields.file.url ?? mainMedia.fields.file.url)}
        >
          {#if link?.includes("youtu")}
            Watch
          {:else}
            Read more
          {/if}
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  @container selected (min-width: 616px) {
    .image {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      mask-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 1) 50%,
        transparent 100%
      );
    }
  }
</style>
