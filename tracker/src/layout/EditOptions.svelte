<script>
  import SpinnerFrame from "../components/SpinnerFrame.svelte";
  import { octave, displayPattern } from "../tracker/trackerStore";
  import { patternCount } from "../songStore";
</script>
<style>
    .row {
        display: flex;
    }

    .row > :global(*) {
        flex: 1 1 auto;
    }
</style>
<div>
	<div class="row w-full">
		<SpinnerFrame bind:value={$octave} min={0} max={8}>Octave</SpinnerFrame>
		<SpinnerFrame bind:value={$displayPattern} min={0} max={$patternCount-1}>Pattern</SpinnerFrame>
	</div>
</div>