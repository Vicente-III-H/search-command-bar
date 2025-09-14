import CommandBar from './command-bar/command-bar'
import { useState, useRef } from 'react'
import { HELP_MESSAGE } from './command-bar/commands/help';
import './App.css'

function App() {
    const [output, setOutput] = useState(HELP_MESSAGE);

    const commandBarRef = useRef(null);
    const focusCommandBar = () => { commandBarRef.current.focus() };

    return (
        <div id='container' className='flex flexbox-col' onClickCapture={focusCommandBar}>
            <div id='terminal' className='background border flex flexbox-col'>
                <div id='output' className='border-bottom flex flexbox-col'>
                    <div className='flex'>{output}</div>
                </div>
                <CommandBar setOutput={setOutput} commandBarRef={commandBarRef}/>
            </div>
        </div>
    )
}

export default App
