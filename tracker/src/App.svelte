<style>
    #root {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    #top {
        display: flex;
        height: 180px;
    }

    #bottom {
        height: calc(100vh - 160px);
    }

    .instruments {
        flex: 0 1 20vw;
    }

    .unit {
        flex-basis: 40vw;
    }

</style>

<script lang="ts">
  import TitleBar from "./layout/TitleBar.svelte";
  import SongDetails from "./layout/SongDetails.svelte";
  import InstrumentDetails from "./layout/InstrumentDetails.svelte";
  import EditOptions from "./layout/EditOptions.svelte";
  import Tracker from "./tracker/Tracker.svelte";
  import UnitDetails from "./layout/UnitDetails.svelte";
</script>
<div id="root">
	<div id="main">
		<div id="top" class="frame">
			<div class="flex-fill">
				<TitleBar/>
				<EditOptions/>
				<SongDetails/>
			</div>
			<div class="instruments">
				<InstrumentDetails/>
			</div>
			<div class="unit">
				<UnitDetails/>
			</div>
		</div>
		<div id="bottom">
			<Tracker/>
		</div>
	</div>
</div>