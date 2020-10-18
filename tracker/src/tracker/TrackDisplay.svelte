<script lang="ts">
  import { rowCount, trackColumns } from "./constants";
  import { derived } from "svelte/store";
  import { cursorTrack, displayPattern } from "./trackerStore";
  import { patterns } from "../songStore";
  import { noteName } from "../music/notes";

  export let track = 0;
  const rows = [...new Array(rowCount)].map((_, i) => i);

  const active = derived(cursorTrack, ($cursor) => {
    return $cursor === track;
  });

  // grab a reference to the reactive track
  const data = patterns[$displayPattern].tracks[track];

  function formatDataValue(column, value) {
    switch (column) {
      case "note":
        if (value === null) {
          return "···"
        }
        return noteName(value);
      case "volume":
        if (value === null) {
          return "··"
        }
        return value.toString(16);
      case "parameter":
        if (value === null) {
          return "000"
        }
        return `000${value.toString(16)}`.substr(-3);
      case "instrument":
        if (value === null) {
          return " "
        }
        return value;

      default:
        return value;
    }
  }

  function getData(events, row, column) {
    const cindex = trackColumns.indexOf(column);
    if (cindex > -1 && events && events.length > row && events[row].length > cindex) {
      return formatDataValue(column, events[row][cindex]);
    }
    return "?"
  }

</script>

<style>
    .row {
        display: flex;
        height: 16px;
    }

    .note {
        flex: 0 0 30px;
        margin-left: 8px;
    }

    .instrument {
        flex: 0 0 22px;
        text-align: right;
        padding-right: 8px;
    }

    .volume {
        flex: 0 0 22px;
    }

    .parameter {
        flex: 0 0 30px;
    }

    .active {
        background: blue;
    }

</style>

{#each rows as row}
	<div class="row w-full { $active ? 'active' : ''}">
		{#each trackColumns as column,index}
			<div class="{column}">
				{ getData($data, row, column) }
			</div>
		{/each}
	</div>
{/each}