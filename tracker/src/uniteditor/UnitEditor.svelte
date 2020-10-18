<script>
  import Frame from '../components/Frame.svelte';
  import OscillatorEditor from "./OscillatorEditor.svelte";
  import FilterEditor from "./FilterEditor.svelte";

  export let unit;
</script>

<Frame fill>
	{#if !unit}
	{:else if unit.command === "output"}
		<div>Output</div>
	{:else if unit.command === "osc"}
		<OscillatorEditor unit={unit}/>
	{:else if unit.command === "filter"}
		<FilterEditor unit={unit}/>
	{/if}
</Frame>