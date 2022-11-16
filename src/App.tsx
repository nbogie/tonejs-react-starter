import { useState } from 'react';
import * as Tone from 'tone';
import { useEffectsChain, useEffectsChainNoDelay } from './audioSupport/useEffectsChain';
import { allSynthNames, SynthName, useSynths } from './audioSupport/useSynths';

import './App.css';

function App() {

  const effectsNode = useEffectsChain()

  //alternatively, with no delay effect
  // const effectsNode = useEffectsChainNoDelay()

  const getSynthOfType = useSynths(effectsNode);

  //for tracking the selected synth type
  const [synthType, setSynthType] = useState<SynthName>("Main");
  const [octave, setOctave] = useState(3);


  /** Triggers a note with pitch based on the given midiNote, plus an offset for current octave.
   * Will play it on the synth matching the current synthType.
   */
  function triggerANote(midiNote: number) {
    const synth = getSynthOfType(synthType)

    const finalMidiNode = midiNote + octave * 12; //taking into account octave offset.
    const freqInHz = Tone.Frequency(finalMidiNode, "midi").toFrequency();

    //see https://tonejs.github.io/docs/r13/Instrument#triggerattackrelease
    synth.triggerAttackRelease(freqInHz, "16n")
  }

  return (
    <div className="App">
      <h3>🙉 Danger - may be loud ⚠️</h3>
      <br />

      <button onClick={() => triggerANote(0)}>0</button>
      <button onClick={() => triggerANote(2)}>2</button>
      <button onClick={() => triggerANote(4)}>4</button>
      <button onClick={() => triggerANote(7)}>7</button>
      <button onClick={() => triggerANote(9)}>9</button>
      <button onClick={() => triggerANote(12)}>12</button>
      <button onClick={() => triggerANote(14)}>14</button>
      <button onClick={() => triggerANote(16)}>16</button>
      <button onClick={() => triggerANote(19)}>19</button>
      <button onClick={() => triggerANote(21)}>21</button>
      <button onClick={() => triggerANote(24)}>24</button>

      {/* Buttons to allow selecting Synth Type */}
      <br />
      Synth Type:
      {allSynthNames().map(st =>
        <button key={st} onClick={() => setSynthType(st)}>{st}</button>
      )}
      <br />

      {/* Selecting octave */}
      Octave:
      <button onClick={() => setOctave(prev => prev - 1)}>-</button>
      {octave}
      <button onClick={() => setOctave(prev => prev + 1)}>+</button>
      <br />


    </div>
  )
}

export default App

