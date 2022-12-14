import { useMemo } from 'react';
import * as Tone from 'tone';
import { ToneAudioNode } from 'tone';
import { Synth, PluckSynth, AMSynth, DuoSynth, FMSynth, MonoSynth } from "tone";


/**
 * Prepares some tone.js synths for use, and returns a function to access them.
 * 
 * @param outputNode - the audio output to which any synths should be connected
 * 
 * @returns a function which can be used to request a synth of a given type.  Retrieved synth's output will already be connected to the given ToneAudioNode.
 * 
*/
export function useSynths(outputNode: ToneAudioNode): (synthName: SynthName) => AnySynth {

    //you can ignore this. it will make cachedSynths available.
    const cachedSynths = useMemo<SynthDict>(() => createAllSynths(outputNode), []);

    /** get pre-created synth of given type */
    function getSynthOfType(st: SynthName): AnySynth {
        return cachedSynths[st]
    }

    return getSynthOfType;
}

function createAllSynths(outputNode: Tone.OutputNode): SynthDict {
    const newSynths: SynthDict = {};
    for (const st of allSynthNames()) {
        const synth = createSynthOfType(st)
        synth.connect(outputNode)
        newSynths[st] = synth;

    }
    return newSynths
}

function createSynthOfType(synthType: SynthName): AnySynth {
    switch (synthType) {
        case "Main":
            return new Tone.Synth()
        case "Pluck":
            return new Tone.PluckSynth()
        case "AM":
            return new Tone.AMSynth()
        case "FM":
            return new Tone.FMSynth()
        case "Duo":
            return new Tone.DuoSynth()
        case "Membrane":
            return new Tone.MembraneSynth()
        case "Mono":
            return new Tone.MonoSynth()
        default:
            throw new Error("unknown synth type: " + synthType)
    }
}


//I expect there's a suitable type exported by tone.js which serves as an interface to all synths
export type AnySynth = Synth | PluckSynth | AMSynth | DuoSynth | FMSynth | MonoSynth //there are others

export type SynthName = "Pluck" | "Main" | "AM" | "Duo" | "FM" | "Membrane" | "Mono";
/** @returns list of all synth names supported by this simplified useSynths system. */

export type SynthDict = { [key: string]: AnySynth };

export function allSynthNames(): SynthName[] {
    return ["Pluck", "Main", "AM", "FM", "Membrane", "Mono"]
}


