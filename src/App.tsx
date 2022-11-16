import { useMemo, useState } from 'react'
import './App.css'
import * as Tone from 'tone'
import { AMSynth, Analyser, DuoSynth, FMSynth, MetalSynth, MonoSynth, NoiseSynth, PluckSynth, Synth } from 'tone';

function App() {

  type SynthDict = { [key: string]: AnySynth };
  type SynthName = "Pluck" | "Main" | "AM" | "Duo" | "FM" | "Membrane" | "Mono";
  type AnySynth = Synth | PluckSynth | AMSynth | DuoSynth | FMSynth | MonoSynth //there are others

  function allSynthTypes(): SynthName[] {
    return ["Pluck", "Main", "AM", "FM", "Membrane", "Mono"]
  }

  //you can ignore this. it will make cachedSynths available.
  const cachedSynths = useMemo<SynthDict>(() => createAllSynths(), []);

  const [synthType, setSynthType] = useState<SynthName>("Main");
  const [octave, setOctave] = useState(3);
  const gainNode = useMemo(createEffectsChain, [])

  function createEffectsChain() {
    Tone.Transport.bpm.value = 120;

    // synths -> gain -> delay effect -> final output
    const preEffectGainNode = new Tone.Gain(0)
    preEffectGainNode.gain.rampTo(0.5, 0.1)
    const delay = new Tone.FeedbackDelay("4n", 0.6);

    preEffectGainNode.connect(delay)

    //hook the final node into the main output
    delay.toDestination()

    //return the first node of the effects chain
    return preEffectGainNode
  }

  function createAllSynths(): SynthDict {
    const newSynths: SynthDict = {};
    for (const st of allSynthTypes()) {
      newSynths[st] = createSynthOfType(st)
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
      case "Duo":
        return new Tone.DuoSynth()
      case "FM":
        return new Tone.FMSynth()
      case "Membrane":
        return new Tone.MembraneSynth()
      case "Mono":
        return new Tone.MonoSynth()
      default:
        throw new Error("unknown synth type: " + synthType)
    }
  }
  /** get pre-created synth of given type */
  function getSynthOfType(st: SynthName): AnySynth {
    return cachedSynths[st]
  }
  function startNote(midiNote: number) {
    const synth = getSynthOfType(synthType)

    //connect to output
    // synth.toDestination();

    synth.connect(gainNode);

    const freqInHz = Tone.Frequency(octave * 12 + midiNote, "midi").toFrequency();


    synth.triggerAttackRelease(freqInHz, "16n")

  }


  return (
    <div className="App">
      <h3>🙉 Danger - may be loud ⚠️</h3>
      <br />

      <button onClick={() => startNote(0)}>0</button>
      <button onClick={() => startNote(2)}>2</button>
      <button onClick={() => startNote(4)}>4</button>
      <button onClick={() => startNote(7)}>7</button>
      <button onClick={() => startNote(9)}>9</button>
      <button onClick={() => startNote(12)}>12</button>
      <button onClick={() => startNote(14)}>14</button>
      <button onClick={() => startNote(16)}>16</button>
      <button onClick={() => startNote(19)}>19</button>
      <button onClick={() => startNote(21)}>21</button>
      <button onClick={() => startNote(24)}>24</button>

      <br />
      Synth Type:
      {allSynthTypes().map(st =>
        <button key={st} onClick={() => setSynthType(st)}>{st}</button>
      )}

      <br />
      Octave:
      <button onClick={() => setOctave(prev => prev - 1)}>-</button>
      {octave}
      <button onClick={() => setOctave(prev => prev + 1)}>+</button>
      <br />


    </div>
  )
}

export default App
