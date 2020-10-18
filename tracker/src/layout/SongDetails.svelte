<script>
  import Row from "../components/Row.svelte";
  import Frame from "../components/Frame.svelte";
  import { currentPattern, currentRow } from "../playerStore";
  import PlayerControls from "./PlayerControls.svelte";

</script>
<div>
	<Row>
		<Frame>
			PATTERN { $currentPattern } ROW { $currentRow }
		</Frame>
		<PlayerControls/>
	</Row>
</div>