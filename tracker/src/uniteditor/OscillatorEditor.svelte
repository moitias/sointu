<script>
  import Button from '../components/Button.svelte';
  import Slider from "../components/Slider.svelte";

  export let unit;

  let transpose = 0;
  let detune = 0;
  let phase = 0;
  let color = 0;
  let shape = 0;
</script>
<style>
    .title {
        flex: 0 0 100px;
    }
</style>
<div>
	<div>Oscillator</div>
	<div class="flex justify-between">
		<Button big pressed={unit.type === "sine"}>SINE</Button>
		<Button big pressed={unit.type === "triangle"}>TRI</Button>
		<Button big pressed={unit.type === "sawtooth"}>SAW</Button>
		<Button big pressed={unit.type === "square"}>PULSE</Button>
		<Button disabled big pressed={unit.type === "noise"}>NOISE</Button>
		<Button disabled big pressed={unit.type === "gate"}>GATE</Button>
	</div>
	<div class="flex center-items">
		<div class="title">
			Transpose
		</div>
		<div class="flex-fill p-2">
			<Slider min={-64} max={64} bind:value={transpose} type="int"/>
		</div>
	</div>
	<div class="flex center-items">
		<div class="title">
			Detune
		</div>
		<div class="flex-fill p-2">
			<Slider min={-8} max={8} bind:value={detune}/>
		</div>
	</div>
	<div class="flex center-items">
		<div class="title">
			Phase
		</div>
		<div class="flex-fill p-2">
			<Slider min={0} max={128} bind:value={phase} type="int"/>
		</div>
	</div>
	<div class="flex center-items">
		<div class="title">
			Color
		</div>
		<div class="flex-fill p-2">
			<Slider min={-127} max={128} bind:value={color} type="int" disabled/>
		</div>
	</div>
	<div class="flex center-items">
		<div class="title">
			Shape
		</div>
		<div class="flex-fill p-2">
			<Slider min={-64} max={63} bind:value={shape} type="int"/>
		</div>
	</div>
</div>
