<script lang="ts">
  import { derived, readable, get } from "svelte/store";
  import { cursorRow, cursorTrack, displayPattern } from "./trackerStore";
  import TrackRow from "./TrackRow.svelte";
  import { patterns } from "../songStore";

  export let track = 0;
  export let events = readable([]);
  export let pattern = 0;

  const active = derived(cursorTrack, ($cursor) => {
    return $cursor === track;
  });

</script>

{#each [...new Array(patterns[pattern].length)].map((_, i) => i) as row}
	<TrackRow active={row === $cursorRow} events={$events[row]}/>
{/each}