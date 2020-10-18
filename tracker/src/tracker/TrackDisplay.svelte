<script lang="ts">
  import { rowCount } from "./constants";
  import { derived } from "svelte/store";
  import { cursorRow, cursorTrack, displayPattern } from "./trackerStore";
  import { patterns } from "../songStore";
  import TrackRow from "./TrackRow.svelte";

  export let track = 0;
  const rows = [...new Array(rowCount)].map((_, i) => i);

  const active = derived(cursorTrack, ($cursor) => {
    return $cursor === track;
  });

  // grab a reference to the reactive track
  const events = patterns[$displayPattern].tracks[track];

</script>

{#each rows as row}
	<TrackRow active={row === $cursorRow} events={$events[row]}/>
{/each}