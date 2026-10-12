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
import Coursework from "./Coursework";
import Taskbar from "./Taskbar";
import XPWindow from "./XPWindow";
import PlainView from "./PlainView";
import LogOffScreen from "./LogOffScreen";
import {PLAIN_VIEW_HASH} from "./content";
import loading from './assets/loading_screen.gif';
import start from './assets/start.png';

// Per-window metadata: taskbar label, title-bar text, DOM id, and the default
// position/size used the first time the window opens.
const WINDOW_META = {
    notice:      {label: 'Welcome',          title: 'Welcome',           id: 'start_message',      rect: {center: true, width: 0.66, height: 0.74}},
    resume:      {label: 'Resume',           title: 'Resume',           id: 'resume_window',      rect: {x: 210, y: 40,  width: 520, height: 640}},
    projects:    {label: 'My Projects',      title: 'My Projects',      id: 'projects_window',    rect: {x: 350, y: 120, width: 780, height: 470}},
    coursework:  {label: 'Coursework',       title: 'Coursework',       id: 'coursework_window',  rect: {x: 300, y: 90,  width: 780, height: 520}},
    puzzle:      {label: 'Puzzle',           title: 'Puzzle',           id: 'puzzle',             rect: {x: 260, y: 70,  width: 720, height: 560}},
    paint:       {label: 'Paint',            title: 'Paint',            id: 'paint_window',       rect: {x: 200, y: 60,  width: 900, height: 600}},
    solitaire:   {label: 'Spider Solitaire', title: 'Spider Solitaire', id: 'solitaire_window',   rect: {x: 220, y: 60,  width: 900, height: 600}},
    minesweeper: {label: 'Minesweeper',      title: 'Minesweeper',      id: 'minesweeper_window', rect: {x: 320, y: 70,  width: 380, height: 520}},
};

// Taskbar order / z-order iteration order.
const WINDOW_KEYS = ['notice', 'resume', 'projects', 'coursework', 'puzzle', 'paint', 'solitaire', 'minesweeper'];

// How long the XP boot screen shows before the desktop.
const LOADING_SCREEN_MS = 1500;

// Window state for a fresh desktop: only the welcome window open.
const INITIAL_WINDOWS = {
    notice:      {open: true,  min: false, z: 1},
    resume:      {open: false, min: false, z: 0},
    projects:    {open: false, min: false, z: 0},
    coursework:  {open: false, min: false, z: 0},
    puzzle:      {open: false, min: false, z: 0},
    paint:       {open: false, min: false, z: 0},
    solitaire:   {open: false, min: false, z: 0},
    minesweeper: {open: false, min: false, z: 0},
};

class App extends React.Component {
    state = {
        windows: INITIAL_WINDOWS,
        topZ: 1,
        minesweeperKey: 0,
        startMenu: false,
        loading_screen: true,
        loggedOff: false,
        plain: window.location.hash === PLAIN_VIEW_HASH,
    };

    componentDidMount() {
        this.startBootScreen();
        document.addEventListener('mousedown', this.handleDocumentClick);
        window.addEventListener('hashchange', this.onHashChange);
    }

    componentWillUnmount() {
        clearTimeout(this.bootTimer);
        document.removeEventListener('mousedown', this.handleDocumentClick);
        window.removeEventListener('hashchange', this.onHashChange);
    }

    // Show the XP boot screen, then the desktop.
    startBootScreen = () => {
        clearTimeout(this.bootTimer);
        this.setState({loading_screen: true});
        this.bootTimer = setTimeout(() => this.setState({loading_screen: false}), LOADING_SCREEN_MS);
    };

    // Switch between the XP desktop and the plain view when the URL hash changes.
    onHashChange = () => {
        this.setState({plain: window.location.hash === PLAIN_VIEW_HASH});
        window.scrollTo(0, 0);
    };

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

    // Start > Log Off shows the XP Welcome screen; logging back on replays the
    // boot screen, then a fresh desktop (windows closed, icons back on the
    // grid, new Minesweeper).
    logOff = () => this.setState({startMenu: false, loggedOff: true});
    logOn = () => {
        this.setState((s) => ({
            loggedOff: false,
            windows: INITIAL_WINDOWS,
            topZ: 1,
            minesweeperKey: s.minesweeperKey + 1,
        }));
        this.startBootScreen();
    };

    // Body content for each window (some need component-local handlers/state).
    renderContent(key) {
        switch (key) {
            case 'notice':
                return <StartMessageContent onOpenResume={() => this.openWindow('resume')}
                                            onOpenProjects={() => this.openWindow('projects')}/>;
            case 'resume': return <Resume/>;
            case 'projects': return <Projects/>;
            case 'coursework': return <Coursework/>;
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
        if (this.state.plain) return <PlainView/>;
        if (this.state.loggedOff) return <LogOffScreen onLogOn={this.logOn}/>;

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
                {this.state.loading_screen ? (
                    <>
                        <img id={'loading_screen'} src={loading} alt={'loading...'}/>
                        <a id={'loading_plain_link'} href={PLAIN_VIEW_HASH}>Skip to the plain view</a>
                    </>
                ) :
                    <div>
                        <Icons onClickMinesweeper={() => this.openWindow('minesweeper')}
                               onClickSolitaire={() => this.openWindow('solitaire')}
                               onClickPuzzle={() => this.openWindow('puzzle')}
                               onClickResume={() => this.openWindow('resume')}
                               onClickProjects={() => this.openWindow('projects')}
                               onClickCoursework={() => this.openWindow('coursework')}
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
                                                           onCoursework={() => this.openWindow('coursework')}
                                                           onLogOff={this.logOff}
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
