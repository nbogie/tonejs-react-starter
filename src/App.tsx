import { useState } from 'react';
import * as Tone from 'tone';
import { allSynthTypes, SynthName } from './audioSupport/synths';
import { useEffectsChain } from './audioSupport/useEffectsChain';
import { useSynths } from './audioSupport/useSynths';

import './App.css';

function App() {


  const effectsNode = useEffectsChain()
  const getSynthOfType = useSynths(effectsNode);

  //selected synth type
  const [synthType, setSynthType] = useState<SynthName>("Main");
  const [octave, setOctave] = useState(3);


  function triggerANote(midiNote: number) {
    const synth = getSynthOfType(synthType)

    const finalMidiNode = midiNote + octave * 12; //taking into account octave offset.
    const freqInHz = Tone.Frequency(finalMidiNode, "midi").toFrequency();
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

      {/* Selecting Synth Type */}
      <br />
      Synth Type:
      {allSynthTypes().map(st =>
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

