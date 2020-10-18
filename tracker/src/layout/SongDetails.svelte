<script>
  import Row from "../components/Row.svelte";
  import Frame from "../components/Frame.svelte";
  import TextInputFrame from "../components/TextInputFrame.svelte";
  import { isPlaying } from "../playerStore";
  import { currentPattern, currentRow } from "../playerStore";
  import PlayerControls from "./PlayerControls.svelte";

</script>
<div>
	SONG DETAILS
	<Row>
		<TextInputFrame title="SONGNAME"/>
		<Frame>
			{ $isPlaying ? "PLAYING" : "STOPPED" }
		</Frame>
		<Frame>
			PATTERN { $currentPattern } ROW { $currentRow }
		</Frame>
		<PlayerControls/>
	</Row>
</div>