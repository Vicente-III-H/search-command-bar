import CommandBar from './command-bar/command-bar'
import { useState, useRef } from 'react'
import './App.css'

const INITIAL_MESSAGE = `--- QUICK HELP ---

To search on a website, enter a valid search command into the command bar, followed by the search prompt
e.g. To search for square watermelons on google.com, enter "g square watermelons" into the command bar

To see a list of the available search commands, enter "sl" into the command bar

For more in-depth instructions, enter "help" into the command bar`;

function App() {
    const [output, setOutput] = useState(INITIAL_MESSAGE);

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
