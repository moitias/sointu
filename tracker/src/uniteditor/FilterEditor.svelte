<script>
  import Button from '../components/Button.svelte';

  export let unit;
</script>

<div>
	<div>Filter</div>
	<div class="flex justify-between">
		<Button big pressed={unit.type === "sine"}>SINE</Button>
		<Button big pressed={unit.type === "saw"}>TRI/SAW</Button>
		<Button big pressed={unit.type === "pulse"}>PULSE</Button>
		<Button big pressed={unit.type === "noise"}>NOISE</Button>
		<Button big pressed={unit.type === "gate"}>GATE</Button>
	</div>
	{JSON.stringify(unit)}
</div>
