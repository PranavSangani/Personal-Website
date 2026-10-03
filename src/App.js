import './App.css';
import Paint from './Paint'
import Solitaire from "./Solitaire";
import React from "react";
import "react-minesweeper/lib/minesweeper.css";
import Minesweeper from 'react-minesweeper';
import Icons from "./Icons";
import StartMessageContent from "./StartMessage";
import Puzzle from "./Puzzle";
import Resume from "./Resume";
import StartMenu from "./StartMenu";
import Projects from "./Projects";
import Taskbar from "./Taskbar";
import XPWindow from "./XPWindow";
import loading from './assets/loading_screen.gif';
import start from './assets/start.png';

// Per-window metadata: taskbar label, title-bar text, DOM id, and the default
// position/size used the first time the window opens.
const WINDOW_META = {
    notice:      {label: 'Notice',           title: 'Notice',           id: 'start_message',      rect: {center: true, width: 0.66, height: 0.74}},
    resume:      {label: 'Resume',           title: 'Resume',           id: 'resume_window',      rect: {x: 210, y: 40,  width: 520, height: 640}},
    projects:    {label: 'My Projects',      title: 'My Projects',      id: 'projects_window',    rect: {x: 350, y: 120, width: 780, height: 470}},
    puzzle:      {label: 'Puzzle',           title: 'Puzzle',           id: 'puzzle',             rect: {x: 260, y: 70,  width: 720, height: 560}},
    paint:       {label: 'Paint',            title: 'Paint',            id: 'paint_window',       rect: {x: 200, y: 60,  width: 900, height: 600}},
    solitaire:   {label: 'Spider Solitaire', title: 'Spider Solitaire', id: 'solitaire_window',   rect: {x: 220, y: 60,  width: 900, height: 600}},
    minesweeper: {label: 'Minesweeper',      title: 'Minesweeper',      id: 'minesweeper_window', rect: {x: 320, y: 70,  width: 380, height: 520}},
};

// Taskbar order / z-order iteration order.
const WINDOW_KEYS = ['notice', 'resume', 'projects', 'puzzle', 'paint', 'solitaire', 'minesweeper'];

class App extends React.Component {
    state = {
        windows: {
            notice:      {open: true,  min: false, z: 1},
            resume:      {open: false, min: false, z: 0},
            projects:    {open: false, min: false, z: 0},
            puzzle:      {open: false, min: false, z: 0},
            paint:       {open: false, min: false, z: 0},
            solitaire:   {open: false, min: false, z: 0},
            minesweeper: {open: false, min: false, z: 0},
        },
        topZ: 1,
        minesweeperKey: 0,
        startMenu: false,
        loading_screen: true,
    };

    componentDidMount() {
        setTimeout(() => this.setState({loading_screen: false}), 3500);
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    // Close the Start Menu on any click outside it (start bar clicks are handled
    // by the Start button's own toggle, so ignore those here).
    handleDocumentClick = (e) => {
        if (!this.state.startMenu) return;
        if (e.target.closest('.start_menu') || e.target.closest('#start_bar')) return;
        this.setState({startMenu: false});
    };

    // ----- window state helpers -----
    updateWindow(key, patch) {
        this.setState((s) => ({
            windows: {...s.windows, [key]: {...s.windows[key], ...patch}},
        }));
    }

    // Raise a window to the top of the stack.
    focusWindow = (key) => {
        this.setState((s) => {
            const topZ = s.topZ + 1;
            return {topZ, windows: {...s.windows, [key]: {...s.windows[key], z: topZ}}};
        });
    };

    // Open (or restore + focus) a window.
    openWindow = (key) => {
        this.setState((s) => {
            const topZ = s.topZ + 1;
            return {topZ, windows: {...s.windows, [key]: {...s.windows[key], open: true, min: false, z: topZ}}};
        });
    };

    closeWindow = (key) => this.updateWindow(key, {open: false, min: false});

    minimizeWindow = (key) => this.updateWindow(key, {min: true});

    // Taskbar click: restore+focus if minimized, otherwise minimize.
    onTaskbarClick = (key) => {
        if (this.state.windows[key].min) {
            this.openWindow(key);
        } else {
            this.minimizeWindow(key);
        }
    };

    restartMinesweeper = () => this.setState((s) => ({minesweeperKey: s.minesweeperKey + 1}));

    // ----- start menu / start bar -----
    onClickStartMenu = () => this.setState((s) => ({startMenu: !s.startMenu}));
    onCloseStartMenu = () => this.setState({startMenu: false});

    // Body content for each window (some need component-local handlers/state).
    renderContent(key) {
        switch (key) {
            case 'notice': return <StartMessageContent/>;
            case 'resume': return <Resume/>;
            case 'projects': return <Projects/>;
            case 'puzzle': return <Puzzle/>;
            case 'paint': return <Paint/>;
            case 'solitaire': return <Solitaire/>;
            case 'minesweeper':
                return (
                    <div>
                        <button className={'button'} onClick={this.restartMinesweeper}>Restart</button>
                        <Minesweeper key={this.state.minesweeperKey} bombChance={0.15}/>
                    </div>
                );
            default: return null;
        }
    }

    render() {
        const {windows} = this.state;
        const openKeys = WINDOW_KEYS.filter((k) => windows[k].open);
        const taskbarItems = openKeys.map((k) => ({
            key: k,
            label: WINDOW_META[k].label,
            active: !windows[k].min,
            onClick: () => this.onTaskbarClick(k),
        }));

        return (
            <div className="App">
                {this.state.loading_screen ? <img id={'loading_screen'} src={loading} alt={'loading...'}/> :
                    <div>
                        <Icons onClickMinesweeper={() => this.openWindow('minesweeper')}
                               onClickSolitaire={() => this.openWindow('solitaire')}
                               onClickPuzzle={() => this.openWindow('puzzle')}
                               onClickResume={() => this.openWindow('resume')}
                               onClickProjects={() => this.openWindow('projects')}
                               onClickPaint={() => this.openWindow('paint')}/>

                        {openKeys.map((key) => (
                            <XPWindow key={key}
                                      title={WINDOW_META[key].title}
                                      id={WINDOW_META[key].id}
                                      rect={WINDOW_META[key].rect}
                                      z={windows[key].z}
                                      minimized={windows[key].min}
                                      onClose={() => this.closeWindow(key)}
                                      onMinimize={() => this.minimizeWindow(key)}
                                      onFocus={() => this.focusWindow(key)}
                                      children={this.renderContent(key)}/>
                        ))}

                        {this.state.startMenu ? <StartMenu onAbout={() => this.openWindow('notice')}
                                                           onResume={() => this.openWindow('resume')}
                                                           onProjects={() => this.openWindow('projects')}
                                                           onClose={this.onCloseStartMenu}/> : null}

                        <div id={'start_bar'}>
                            <img id={'start_button'} src={start} onClick={this.onClickStartMenu} alt={'start_logo'}/>
                            <Taskbar items={taskbarItems}/>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default App;
