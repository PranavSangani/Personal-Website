import './App.css';
import Paint from './Paint'
import Solitaire from "./Solitaire";
import React from "react";
import {Window} from 'react-windows-xp';
import "react-minesweeper/lib/minesweeper.css";
import Minesweeper from 'react-minesweeper';
import Icons from "./Icons";
import StartMessageContent from "./StartMessage";
import Puzzle from "./Puzzle";
import Resume from "./Resume";
import StartMenu from "./StartMenu";
import Projects from "./Projects";
import Taskbar from "./Taskbar";
import loading from './assets/loading_screen.gif';
import start from './assets/start.png';

class App extends React.Component {
    onClickRestartMinesweeper = () => {
        this.setState({
            isFocusMinesweeper: !this.state.isFocusMinesweeper
        }, () => {
            this.setState({
                isFocusMinesweeper: !this.state.isFocusMinesweeper
            })
        })
    }
    onClickMinesweeper = () => {
        this.setState({
            isFocusMinesweeper: !this.state.isFocusMinesweeper
        })
    }
    onClickSolitaire = () => {
        this.setState({
            isFocusSolitaire: !this.state.isFocusSolitaire
        })
    }
    onClickPuzzle = () => {
        this.setState({
            isFocusPuzzle: !this.state.isFocusPuzzle
        })
    }
    onClickResume = () => {
        this.setState({
            isFocusResume: !this.state.isFocusResume
        })
    }
    onClickPaint = () => {
        this.setState({
            isFocusPaint: !this.state.isFocusPaint
        })
    }
    onClickStartMessage = () => {
        this.setState({
            startMessage: !this.state.startMessage
        })
    }
    onClickStartMenu = () => {
        this.setState({
            startMenu: !this.state.startMenu
        })
    }
    onCloseStartMenu = () => {
        this.setState({
            startMenu: false
        })
    }
    onClickProjects = () => {
        this.setState({
            isFocusProjects: !this.state.isFocusProjects
        })
    }
    // Openers used by the Start Menu (always open, never toggle-closed).
    onOpenAbout = () => this.setState({startMessage: true})
    onOpenResume = () => this.setState({isFocusResume: true})
    onOpenProjects = () => this.setState({isFocusProjects: true})

    state = {
        isFocusMinesweeper: false,
        isFocusSolitaire: false,
        isFocusPuzzle: false,
        isFocusResume: false,
        isFocusPaint: false,
        isFocusProjects: false,
        startMessage: true,
        startMenu: false,
        loading_screen: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading_screen: false
            })
        }, 3500);
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    // Close the Start Menu when clicking anywhere outside it. Clicks on the
    // start bar are ignored here so the Start button's own handler can toggle.
    handleDocumentClick = (e) => {
        if (!this.state.startMenu) return;
        if (e.target.closest('.start_menu') || e.target.closest('#start_bar')) return;
        this.setState({startMenu: false});
    }

    // The set of windows currently open, in taskbar order.
    openWindows() {
        const all = [
            {key: 'notice', label: 'Notice', open: this.state.startMessage, onClick: this.onClickStartMessage},
            {key: 'resume', label: 'Resume', open: this.state.isFocusResume, onClick: this.onClickResume},
            {key: 'projects', label: 'My Projects', open: this.state.isFocusProjects, onClick: this.onClickProjects},
            {key: 'puzzle', label: 'Puzzle', open: this.state.isFocusPuzzle, onClick: this.onClickPuzzle},
            {key: 'paint', label: 'Paint', open: this.state.isFocusPaint, onClick: this.onClickPaint},
            {key: 'solitaire', label: 'Spider Solitaire', open: this.state.isFocusSolitaire, onClick: this.onClickSolitaire},
            {key: 'minesweeper', label: 'Minesweeper', open: this.state.isFocusMinesweeper, onClick: this.onClickMinesweeper},
        ];
        return all.filter((w) => w.open);
    }

    render() {
        return (
            <div className="App">
                {this.state.loading_screen ? <img id={'loading_screen'} src={loading} alt={'loading...'}/> :
                    <div>
                        <Icons onClickMinesweeper={this.onClickMinesweeper}
                               onClickSolitaire={this.onClickSolitaire}
                               onClickPuzzle={this.onClickPuzzle}
                               onClickResume={this.onClickResume}
                               onClickPaint={this.onClickPaint}/>

                        {this.state.startMessage ? <Window title={'Notice'}
                                                           id={'start_message'}
                                                           children={<StartMessageContent/>}
                                                           showClose={true}
                                                           onClose={this.onClickStartMessage}/> : null}

                        {this.state.isFocusResume ? <Window title={'Resume'}
                                                            id={'resume_window'}
                                                            children={<Resume/>}
                                                            showClose={true}
                                                            onClose={this.onClickResume}/> : null}

                        {this.state.isFocusPuzzle ? <Window title={'Puzzle'}
                                                            id={'puzzle'}
                                                            children={<Puzzle/>}
                                                            showClose={true}
                                                            onClose={this.onClickPuzzle}/> : null}

                        {this.state.isFocusPaint ? <Window title={'Paint'}
                                                           children={<Paint/>}
                                                           showClose={true}
                                                           onClose={this.onClickPaint}/> : null}

                        {this.state.isFocusSolitaire ? <Window title={'Spider Solitaire'}
                                                               children={<Solitaire/>}
                                                               showClose={true}
                                                               onClose={this.onClickSolitaire}/> : null}

                        {this.state.isFocusMinesweeper ? <Window title={'Minesweeper'}
                                                                 id={'minesweeper_window'}
                                                                 children={<div>
                                                                     <button className={'button'}
                                                                         onClick={this.onClickRestartMinesweeper}>Restart
                                                                     </button>
                                                                     <Minesweeper bombChance={0.15} />
                                                                 </div>}
                                                                 showClose={true}
                                                                 onClose={this.onClickMinesweeper}/> : null}

                        {this.state.isFocusProjects ? <Window title={'My Projects'}
                                                              id={'projects_window'}
                                                              children={<Projects/>}
                                                              showClose={true}
                                                              onClose={this.onClickProjects}/> : null}

                        {this.state.startMenu ? <StartMenu onAbout={this.onOpenAbout}
                                                           onResume={this.onOpenResume}
                                                           onProjects={this.onOpenProjects}
                                                           onClose={this.onCloseStartMenu}/> : null}

                        <div id={'start_bar'}>
                            <img id={'start_button'} src={start} onClick={this.onClickStartMenu} alt={'start_logo'}/>
                            <Taskbar items={this.openWindows()}/>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default App;
