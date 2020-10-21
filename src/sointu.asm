; source file for compiling sointu as a library
%define SU_DISABLE_PLAYER

%include "sointu_header.inc"

; TODO: make sure compile everything in

USE_ENVELOPE
USE_OSCILLAT
USE_MULP
USE_PAN
USE_OUT

%define INCLUDE_TRISAW
%define INCLUDE_SINE
%define INCLUDE_PULSE
%define INCLUDE_GATE
%define INCLUDE_STEREO_OSCILLAT
%define INCLUDE_STEREO_ENVELOPE
%define INCLUDE_STEREO_OUT

%include "sointu_footer.inc"

section .text

struc su_synth_state
    .synth      resb    su_synth.size
    .delaywrks  resb    su_delayline_wrk.size * 64
    .commands   resb    32 * 64
    .values     resb    32 * 64 * 8
    .polyphony  resd    1
    .numvoices  resd    1
    .randseed   resd    1
    .globaltime resd    1   
    .rowtick    resd    1
    .rowlen     resd    1
endstruc

SECT_TEXT(sursampl)

EXPORT MANGLE_FUNC(su_render_samples,12)
%if BITS == 32  ; stdcall
    mov     ecx, [esp + 4]
    pushad
%else
    %ifidn __OUTPUT_FORMAT__,win64 ; win64, following registers are volatile, RCX already our pointer
        push_registers rbx, rbp, rdi, rsi, rsp
    %else
        push_registers rbx, rbp
        mov     rcx, rdi
    %endif
%endif
    push    _CX
    mov     eax, [_CX + su_synth_state.randseed]
    push    _AX                             ; randseed
    mov     eax, [_CX + su_synth_state.globaltime]
    push    _AX                        ; global tick time
    xor     eax, eax
    push    _AX                        ; dummy row    
    push    _AX                        ;rowtick = 0
    mov     eax, [_CX + su_synth_state.polyphony]
    push    _AX                        ;polyphony
    mov     eax, [_CX + su_synth_state.numvoices]
    push    _AX                        ;numvoices
    lea     _DX, [_CX+ su_synth_state.synth] 
    lea     COM, [_CX+ su_synth_state.commands] 
    lea     VAL, [_CX+ su_synth_state.values] 
    lea     WRK, [_DX + su_synth.voices]  
    lea     _CX, [_CX+ su_synth_state.delaywrks - su_delayline_wrk.filtstate] 
su_render_samples_loop:
    call    MANGLE_FUNC(su_run_vm,0)
    pop     _AX
    pop     _AX
    output_sound                ; *ptr++ = left, *ptr++ = right
    pop     _AX
    inc     dword [_SP + PTRSIZE] ; increment global time, used by delays
    inc     eax
    cmp     eax, 4242424242424214; TODO, should be cmp SAMPLES_PER_ROW
    jl      su_render_samples_loop
    mov     eax, [_SP + PTRSIZE*2]
    mov     edx, [_SP + PTRSIZE*5]
    add     _SP,PTRSIZE * 6
    pop     _CX
    mov     [_CX + su_synth_state.rowtick], eax
    mov     [_CX + su_synth_state.randseed], edx
%if BITS == 32  ; stdcall
    popad
    ret 12
%else
    %ifidn __OUTPUT_FORMAT__,win64 ; win64, following registers are volatile, RCX already our pointer
        pop_registers rbx, rbp, rdi, rsi, rsp
    %else
        pop_registers rbx, rbp
    %endif
    ret
%endif