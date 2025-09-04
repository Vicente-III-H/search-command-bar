import CommandBar from './command-bar/command-bar'
import Output from './command-bar/output'
import { useState } from 'react'
import './App.css'

function App() {
  const [output, setOutput] = useState("");

  return (
    <>
      <Output output={output} />
      <CommandBar setOutput={setOutput} />
    </>
  )
}

export default App
