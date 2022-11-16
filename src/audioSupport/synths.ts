import { Synth, PluckSynth, AMSynth, DuoSynth, FMSynth, MonoSynth } from "tone";

export type SynthDict = { [key: string]: AnySynth };
export type SynthName = "Pluck" | "Main" | "AM" | "Duo" | "FM" | "Membrane" | "Mono";
export type AnySynth = Synth | PluckSynth | AMSynth | DuoSynth | FMSynth | MonoSynth //there are others

export function allSynthTypes(): SynthName[] {
    return ["Pluck", "Main", "AM", "FM", "Membrane", "Mono"]
}

