<script>
  import { trackWidth } from "./constants";
  import { cursorTrack, cursorTrackColumn, displayPattern } from "./trackerStore";
  import { trackCount } from "../songStore";

  const colPositions = [
    8,
    40,
    48,
    64,
    72,
    88,
    96,
    104
  ]
  const colWidths = [
    24,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
  ]
  const tracks = [...new Array($trackCount)].map((_, i) => i)
</script>
<style>
    .track {
        flex: 0 0 0;
    }

    .info {
        flex: 1 1 100%;
    }
</style>
<div class="absolute v-center w-full frame raised-v-narrow flex">
	{#each tracks as index}
		<div class="track relative" style="flex-basis: {`${trackWidth}px`}">
			{#if $cursorTrack === index}
				<div class="absolute" style="
						background: red;
						left: {colPositions[$cursorTrackColumn]}px;
						height: 16px;
						width: {colWidths[$cursorTrackColumn]}px;
					">
					&nbsp;
				</div>
			{/if}
		</div>
	{/each}
	<div class="info">{ $cursorTrack } { $cursorTrackColumn } { $displayPattern }</div>
</div>
