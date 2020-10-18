<script lang="ts">
  import { patterns } from "../songStore";

  export let top = 0;
  export let pattern = 0;
</script>

<style>
    .container {
        flex: 0 0 30px;
        width: 30px;
        overflow: hidden;
    }

    .row {
        height: 16px;
    }
</style>
<div class="container lowered black h-full relative">
	<div class="absolute" style="top: {top}px;">
		{#each [...new Array(patterns[pattern].length)].map((_, i) => i) as row}
			<div class="row { row % 4 === 0 ? 'text-highlight' : 'text-white'}">{row}</div>
		{/each}
	</div>
</div>