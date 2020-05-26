%define BPM 100

%include "../src/sointu.inc"

SU_BEGIN_PATTERNS
    PATTERN 64, HLD, HLD, HLD, HLD, HLD, HLD, HLD,  0, 0, 0, 0, 0, 0, 0, 0
SU_END_PATTERNS

SU_BEGIN_TRACKS
    TRACK VOICES(1),0
SU_END_TRACKS

SU_BEGIN_PATCH
    SU_BEGIN_INSTRUMENT VOICES(1) ; Instrument0
        SU_ENVELOPE MONO,ATTAC(64),DECAY(64),SUSTAIN(64),RELEASE(80),GAIN(128)
        SU_HOLD     MONO,HOLDFREQ(3)
        SU_ENVELOPE MONO,ATTAC(64),DECAY(64),SUSTAIN(64),RELEASE(80),GAIN(128)
        SU_HOLD     MONO,HOLDFREQ(3)
        SU_OSCILLAT MONO,TRANSPOSE(70),DETUNE(64),PHASE(64),COLOR(128),SHAPE(64),GAIN(128),FLAGS(SINE+LFO)
        SU_SEND     MONO,AMOUNT(68),PORT(1,hold,freq)
        SU_SEND     MONO,AMOUNT(68),PORT(3,hold,freq) + SEND_POP
        SU_OUT      STEREO,GAIN(128)
    SU_END_INSTRUMENT
SU_END_PATCH

%include "../src/sointu.asm"