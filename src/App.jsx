import CommandBar from './command-bar/command-bar'
import Output from './command-bar/output'
import { useState, useRef } from 'react'
import { INITIAL_OUTPUT } from './command-bar/execute'
import './App.css'

function App() {
  const [output, setOutput] = useState(INITIAL_OUTPUT);

  const commandBarRef = useRef(null);
  const focusCommandBar = () => { commandBarRef.current.focus() };

  return (
    <div id='container' onClickCapture={focusCommandBar}>
      <Output output={output} />
      <CommandBar setOutput={setOutput} commandBarRef={commandBarRef}/>
    </div>
  )
}

export default App
