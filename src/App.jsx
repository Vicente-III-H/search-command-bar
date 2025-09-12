import CommandBar from './command-bar/command-bar'
import Output from './command-bar/output'
import { useState, useRef } from 'react'
import { HELP_MESSAGE } from './command-bar/commands/help';
import './App.css'

function App() {
  const [output, setOutput] = useState(HELP_MESSAGE);

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
