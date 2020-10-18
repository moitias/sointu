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

  const data = patterns[$displayPattern]?.tracks[track] || [];

  function formatDataValue(column, data) {
    switch (column) {
      case "note":
        if (data === null) {
          return "···"
        }
        return noteName(data);
      case "volume":
        if (data === null) {
          return "··"
        }
        return data.toString(16);
      case "parameter":
        if (data === null) {
          return "000"
        }
        return `000${data.toString(16)}`.substr(-3);
      case "instrument":
        if (data === null) {
          return " "
        }
        return data;

      default:
        return data;
    }
  }

  function getData(row, column) {
    const cindex = trackColumns.indexOf(column);
    if (cindex > -1 && data.length > row && data[row].length > cindex) {
      return formatDataValue(column, data[row][cindex]);
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
				{ getData(row, column) }
			</div>
		{/each}
	</div>
{/each}