<script>
  import Frame from "../components/Frame.svelte";
  import { togglePlay, isPlaying } from "../playerStore";
  import { resetSong, saveSong } from "../songStore";
  import Button from "../components/Button.svelte";

</script>
<Frame>
	<div class="flex">
		<Button on:click={togglePlay}>{ $isPlaying ? '||' : '►'}</Button>
		<Button>●</Button>
		<Button on:click={resetSong}>Reset</Button>
		<Button on:click={saveSong}>Save</Button>
	</div>
</Frame>
