<script>
  import { currentUnit } from "../instrumentStore";
  import { instruments } from "../instrumentStore";
  import { selectedInstrument } from "../tracker/trackerStore";
  import UnitEditor from "../uniteditor/UnitEditor.svelte";

</script>
<div class="h-full">
	{#if $currentUnit === null}
		&lt;- select unit, plz
	{:else}
		<div>INSTRUMENT { $selectedInstrument } UNIT #{ $currentUnit } DETAILS</div>
		<div class="h-full">
			<UnitEditor unit={instruments[$selectedInstrument].units()[$currentUnit] }/>
		</div>
	{/if}
</div>