<script lang="ts">
  import Hotkey from "../components/Hotkey.svelte";

  const rowCount = 64;
  const trackCount = 4;
  const trackColumnCount = 3;

  let cursorRow = 0;
  let cursorTrack = 0;
  let cursorTrackColumn = 0;

  function changeRow(delta: Number) {
    cursorRow = ((cursorRow + delta) + rowCount) % rowCount;
  }

  function changeTrack(delta: Number) {
    cursorTrack = ((cursorTrack + delta) + trackCount) % trackCount;
    cursorTrackColumn = 0;
  }

  function changeTrackColumn(delta: Number) {
    let newTrackColumn = (cursorTrackColumn + delta);
    while (newTrackColumn < 0) {
      if (cursorTrack === 0) {
        cursorTrack = trackCount - 1;
      } else {
        cursorTrack--;
      }
      newTrackColumn += trackColumnCount;
    }
    while (newTrackColumn >= trackColumnCount) {
      if (cursorTrack >= trackCount - 1) {
        cursorTrack = 0;
      } else {
        cursorTrack++;
      }
      newTrackColumn -= trackColumnCount;
    }
    cursorTrackColumn = newTrackColumn;
  }

</script>

<Hotkey key="ArrowUp" on:click={() => changeRow(-1)}/>
<Hotkey key="ArrowDown" on:click={() => changeRow(1)}/>
<Hotkey key="ArrowLeft" on:click={() => changeTrackColumn(-1)}/>
<Hotkey key="ArrowRight" on:click={() => changeTrackColumn(1)}/>
<Hotkey key="Tab" modifier="shift" on:click={() => changeTrack(-1)}/>
<Hotkey key="Tab" on:click={() => changeTrack(1)}/>
<div>
	TRACKER { cursorRow } { cursorTrack }/{cursorTrackColumn}
</div>