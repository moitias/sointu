package bridge_test

import (
	"bytes"
	"encoding/binary"
	"io/ioutil"
	"path"
	"runtime"
	"testing"

	"github.com/vsariola/sointu/go4k"
	"github.com/vsariola/sointu/go4k/bridge"
)

const BPM = 100
const SAMPLE_RATE = 44100
const TOTAL_ROWS = 16
const SAMPLES_PER_ROW = SAMPLE_RATE * 4 * 60 / (BPM * 16)

const su_max_samples = SAMPLES_PER_ROW * TOTAL_ROWS

// const bufsize = su_max_samples * 2

func TestBridge(t *testing.T) {
	patch := []go4k.Instrument{
		go4k.Instrument{1, []go4k.Unit{
			go4k.Unit{"envelope", false, map[string]int{"attack": 64, "decay": 64, "sustain": 64, "release": 80, "gain": 128}},
			go4k.Unit{"envelope", false, map[string]int{"attack": 95, "decay": 64, "sustain": 64, "release": 80, "gain": 128}},
			go4k.Unit{"out", true, map[string]int{"gain": 128}},
		}}}
	synth, err := bridge.Synth(patch)
	if err != nil {
		t.Fatalf("bridge compile error: %v", err)
	}
	synth.Trigger(0, 64)
	buffer := make([]float32, 2*su_max_samples)
	err = go4k.Render(synth, buffer[:len(buffer)/2])
	if err != nil {
		t.Fatalf("first render gave an error")
	}
	synth.Release(0)
	err = go4k.Render(synth, buffer[len(buffer)/2:])
	if err != nil {
		t.Fatalf("first render gave an error")
	}
	_, filename, _, _ := runtime.Caller(0)
	expectedb, err := ioutil.ReadFile(path.Join(path.Dir(filename), "..", "..", "tests", "expected_output", "test_render_samples.raw"))
	if err != nil {
		t.Fatalf("cannot read expected: %v", err)
	}
	var createdbuf bytes.Buffer
	err = binary.Write(&createdbuf, binary.LittleEndian, buffer)
	if err != nil {
		t.Fatalf("error converting buffer: %v", err)
	}
	createdb := createdbuf.Bytes()
	if len(createdb) != len(expectedb) {
		t.Fatalf("buffer length mismatch, got %v, expected %v", len(createdb), len(expectedb))
	}
	for i, v := range createdb {
		if expectedb[i] != v {
			t.Errorf("byte mismatch @ %v, got %v, expected %v", i, v, expectedb[i])
		}
	}
}