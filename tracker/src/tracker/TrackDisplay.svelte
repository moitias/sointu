<script lang="ts">
  import { rowCount, trackColumns } from "./constants";
  import { derived } from "svelte/store";
  import { cursorTrack } from "./store";

  export let track = 0;
  const rows = [...new Array(rowCount)].map((_, i) => i);

  const active = derived(cursorTrack, ($cursor) => {
    return $cursor === track;
  });

</script>

<style>
    .row {
        display: flex;
        height: 16px;
    }

    .note {
        flex: 0 0 52px;
        padding-left: 8px;
    }

    .volume {
        flex: 0 0 26px;
    }

    .parameter {
        flex: 0 0 26px;
    }

    .active {
        background: blue;
    }

</style>

{#each rows as row}
	<div class="row w-full { $active ? 'active' : ''}">
		{#each trackColumns as column,index}
			<div class="{column}">
				{column.substr(0, 3)}
			</div>
		{/each}
	</div>
{/each}