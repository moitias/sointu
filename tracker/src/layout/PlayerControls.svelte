<script>
  import Frame from "../components/Frame.svelte";
  import { togglePlay, isPlaying } from "../playerStore";
  import Button from "../components/Button.svelte";

</script>
<Frame>
	<div class="flex">
		<Button>&gt;</Button>
		<Button on:click={togglePlay}>{ $isPlaying ? '||' : '►'}</Button>
		<Button>●</Button>
	</div>
</Frame>
