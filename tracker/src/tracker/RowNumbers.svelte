<script lang="ts">
  import { displayPattern } from "./trackerStore";

  import { patterns } from "../songStore";

  export let top = 0;
  const rows = [...new Array(patterns[$displayPattern].length)].map((_, i) => i);
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
		{#each rows as row}
			<div class="row { row % 4 === 0 ? 'text-highlight' : 'text-white'}">{row}</div>
		{/each}
	</div>
</div>