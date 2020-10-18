<script lang="ts">
  import { rowCount } from "./constants";
  import { derived, readable } from "svelte/store";
  import { cursorRow, cursorTrack } from "./trackerStore";
  import TrackRow from "./TrackRow.svelte";

  export let track = 0;
  export let events = readable([]);
  const rows = [...new Array(rowCount)].map((_, i) => i);

  const active = derived(cursorTrack, ($cursor) => {
    return $cursor === track;
  });

</script>

{#each rows as row}
	<TrackRow active={row === $cursorRow} events={$events[row]}/>
{/each}