import { useMemo } from "react";
import * as Tone from "tone";


/** Prepares an example audio effects chain connected to the main audio out.
 * consisting of  gain node -> delay node -> main output
 * 
 * You should connect things (e.g. synths) into the returned node, or pass the node to useSynths to have them all connect through this effects chain to the output.
 *
 * @returns a ToneAudioNode representing the entry point into the fx chain
 */
export function useEffectsChain() {
    return useMemo(() => createEffectsChain(true), []);
}

export function useEffectsChainNoDelay() {
    return useMemo(() => createEffectsChain(false), []);
}


function createEffectsChain(includeDelay: boolean): Tone.ToneAudioNode {
    Tone.Transport.bpm.value = 120;//relevant to feedback delay speed

    const preEffectGainNode = new Tone.Gain(0)
    preEffectGainNode.gain.rampTo(0.5, 0.1)

    if (includeDelay) {
        // synths -> gain -> delay effect -> final output

        const delay = new Tone.FeedbackDelay("4n", 0.6);
        preEffectGainNode.connect(delay)

        //hook the final node into the main output
        delay.toDestination()
    } else {

        // synths -> gain -> final output
        preEffectGainNode.toDestination()
    }

    //return the first node of the effects chain
    return preEffectGainNode
}
