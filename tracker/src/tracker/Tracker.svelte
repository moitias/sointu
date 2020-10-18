<script lang="ts">
  import Hotkey from "../components/Hotkey.svelte";
  import TrackDisplay from "./TrackDisplay.svelte";
  import { trackWidth } from "./constants";
  import {
    cursorRow,
    changeRow,
    changeTrackColumn,
    changeTrack,
    cursorTrack,
    cursorTrackColumn,
    octave, displayPattern
  } from "./trackerStore";
  import { derived, writable } from "svelte/store";
  import {
    getPatternValues,
    trackCount,
    updatePattern
  } from "../songStore";
  import TrackerCursor from "./TrackerCursor.svelte";
  import TrackerKeys from "./TrackerKeys.svelte";
  import { noteValue } from "../music/notes";

  let trackerHeight = writable(0);

  let scrollTop = derived([cursorRow, trackerHeight], ([$row, $height]) => {
    return ($height / 2 - 8) - $row * 16 - 2;
  });

  let scrollLeft = 0;

  const tracks = [...new Array($trackCount)].map((_, i) => i);

  function addTrackerValue(value) {
    const colVals = getPatternValues($displayPattern, $cursorTrack, $cursorRow);
    switch ($cursorTrackColumn) {
      // instrument
      case 1:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "instrument", value * 10 + colVals[1] % 10);
        break;
      case 2:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "instrument", value + Math.floor(colVals[1] / 10) * 10)
        break;
      // volume
      case 3:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "volume", (value << 2) | colVals[2] & 0x0F)
        break;
      case 4:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "volume", value | (colVals[2] & 0xF0))
        break;
      // parameter
      case 5:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "parameter", (value << 4) | (colVals[3] & 0x0FF))
        break;
      case 6:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "parameter", (value << 2) | (colVals[3] & 0xF0F))
        break;
      case 7:
        updatePattern($displayPattern, $cursorTrack, $cursorRow, "parameter", value | (colVals[3] & 0xFF0))
        break;
    }
    if ($cursorTrackColumn !== 0) {
      console.log("ADD TRACKER VALUE", value, "TO", $cursorTrack, $cursorRow, $cursorTrackColumn);
    }
  }

  function addTrackerNote(note) {
    if ($cursorTrackColumn === 0) {
      updatePattern($displayPattern, $cursorTrack, $cursorRow, "note", noteValue($octave, note))
    }
  }

</script>

<TrackerKeys
				on:note={(event) => addTrackerNote(event.detail)}
				on:value={(event) => addTrackerValue(event.detail)}/>
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
		<TrackerCursor/>
	</div>
</div>