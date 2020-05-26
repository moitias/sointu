%define BPM 100

%include "../src/sointu.inc"

SU_BEGIN_PATTERNS
    PATTERN 64, 0, 68, 0, 32, 0, 0, 0,  75, 0, 78, 0,   0, 0, 0, 0
SU_END_PATTERNS

SU_BEGIN_TRACKS
    TRACK   VOICES(1),0
SU_END_TRACKS

SU_BEGIN_PATCH
    SU_BEGIN_INSTRUMENT VOICES(1) ; Instrument0
        SU_LOADNOTE STEREO
        SU_OUT      STEREO,GAIN(128)
    SU_END_INSTRUMENT
SU_END_PATCH

%include "../src/sointu.asm"