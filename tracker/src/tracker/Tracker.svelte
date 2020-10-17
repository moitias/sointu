<script lang="ts">
  import Hotkey from "../components/Hotkey.svelte";
  import TrackDisplay from "./TrackDisplay.svelte";
  import { trackCount, trackWidth } from "./constants";
  import { cursorRow, cursorTrack, cursorTrackColumn, changeRow, changeTrackColumn, changeTrack } from "./store";
  import { derived, writable } from "svelte/store";

  let trackerHeight = writable(0);

  let scrollTop = derived([cursorRow, trackerHeight], ([$row,$height]) => {
    return ($height/2 - 8) - $row * 16 -2;
  });

  let scrollLeft = 0;

  const tracks = [...new Array(trackCount)].map((_, i) => i);


</script>

<Hotkey key="ArrowUp" on:click={() => changeRow(-1)}/>
<Hotkey key="ArrowDown" on:click={() => changeRow(1)}/>
<Hotkey key="ArrowLeft" on:click={() => changeTrackColumn(-1)}/>
<Hotkey key="ArrowRight" on:click={() => changeTrackColumn(1)}/>
<Hotkey key="Tab" modifier="shift" on:click={() => changeTrack(-1)}/>
<Hotkey key="Tab" on:click={() => changeTrack(1)}/>
<div class="raised h-full">
	<div class="lowered black text-highlight h-full relative clip" bind:clientHeight={$trackerHeight}>
		{#each tracks as track}
			<div class="absolute lowered h-full lowered"
					 style="
					 	 left: {`${track*trackWidth + scrollLeft}px`};
					 	 width: {`${trackWidth}px`};
					 ">

			</div>
			<div class="absolute"
					 style="
					 	 left: {`${track*trackWidth + scrollLeft}px`};
					 	 top: {`${$scrollTop}px`};
					 	 width: {`${trackWidth-2}px`};
					 ">
				<TrackDisplay track={track}/>
			</div>
			<div class="absolute text-white"
					 style="
					 	 left: {`${track*trackWidth + scrollLeft + 3}px`};
					 	 top: 0`};
					 ">
				{ track }
			</div>
		{/each}
		<div class="absolute v-center w-full frame raised-v-narrow">
			abss
		</div>
		TRACKER { $cursorRow } { $cursorTrack }/{$cursorTrackColumn}
	</div>
</div>