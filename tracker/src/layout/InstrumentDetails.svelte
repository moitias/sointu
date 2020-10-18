<script>
  import { selectedInstrument } from "../tracker/trackerStore";
  import { instruments, instrumentCount, currentUnit } from "../instrumentStore";
  import SpinnerFrame from "../components/SpinnerFrame.svelte";
</script>

<style>
    .unit {
        cursor: pointer;
        background: black;
    }

    .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<div>
	<div class="frame flex center-items">
		<SpinnerFrame bind:value={$selectedInstrument} min={0} max={$instrumentCount-1}>Instrument</SpinnerFrame>
		<div class="p-1 name">
			{instruments[$selectedInstrument].name()}
		</div>
	</div>
	<div id="stack">
		{#each instruments[$selectedInstrument].program() as unit,index}
			<div class="unit flex w-full {$currentUnit === index ? 'text-highlight' : ''}"
					 on:click={() => currentUnit.set(index)}>
				<div>
					{unit.command} {unit.type ? `(${unit.type})` : ''}
				</div>
			</div>
		{/each}
	</div>
</div>