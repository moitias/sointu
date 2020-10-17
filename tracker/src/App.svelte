<style>
	#root {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background: #AAAAAA;
	}

	#top {
			display: flex;
			height: 160px;
	}

  #topleft {
      flex: 1 1 auto;
			display: flex;
			flex-direction: column;
  }

  #topright {
      flex: 1 1 auto;
  }

	#bottom {
			height: calc(100vh - 160px);
	}

</style>

<script lang="ts">
  import TitleBar from "./layout/TitleBar.svelte";
  import SongDetails from "./layout/SongDetails.svelte";
  import InstrumentDetails from "./layout/InstrumentDetails.svelte";
  import EditOptions from "./layout/EditOptions.svelte";
  import Tracker from "./tracker/Tracker.svelte";

</script>
<div id="root">
	<div id="main">
		<div id="top">
			<div id="topleft">
				<TitleBar/>
				<SongDetails/>
				<InstrumentDetails/>
			</div>
			<div id="topright">
				<EditOptions/>
			</div>
		</div>
		<div id="bottom">
			<Tracker/>
		</div>
	</div>
</div>