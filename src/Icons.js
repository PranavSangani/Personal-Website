import React from 'react';
import paint_icon from "./assets/paint_icon.png";
import solitaire_icon from "./assets/solitaire_icon.png";
import minesweeper_icon from "./assets/minesweeper_icon.png";
import calculator_icon from "./assets/calculator_icon.png";
import github_icon from "./assets/github_icon.png";
import linkedin_icon from "./assets/linkedin_icon.png";
import folder_icon from "./assets/folder_icon.png";
import mail_icon from "./assets/mail_icon.png";
import resume_icon from "./assets/resume_icon.png";
import sorting_icon from "./assets/sorting_icon.png";

// One desktop shortcut: a fixed-width tile with the icon centered above its label,
// so every icon lines up in the same column. Links open in a new tab; apps open a window.
function DesktopIcon({icon, label, display, onClick, href, newTab = true}) {
    const content = (
        <>
            <img src={icon} alt={''} width={32} height={32}/>
            <p>{display || label}</p>
        </>
    );
    if (href) {
        return (
            <a className={'icon'} href={href} title={label}
               {...(newTab ? {target: '_blank', rel: 'noreferrer'} : {})}>
                {content}
            </a>
        );
    }
    return <button className={'icon'} onClick={onClick} title={label}>{content}</button>;
}

function Icons({onClickPaint, onClickSolitaire, onClickMinesweeper, onClickPuzzle, onClickResume, onClickProjects}) {
    return (
        <div className={'icon_containers'}>
            <DesktopIcon icon={resume_icon} label={'Resume'} onClick={onClickResume}/>
            <DesktopIcon icon={folder_icon} label={'My Projects'} onClick={onClickProjects}/>
            <DesktopIcon icon={github_icon} label={'GitHub'} href={'https://github.com/PranavSangani'}/>
            <DesktopIcon icon={linkedin_icon} label={'LinkedIn'} href={'https://www.linkedin.com/in/pranavsangani/'}/>
            <DesktopIcon icon={mail_icon} label={'Email'} href={'mailto:pranavsai.sangani@gmail.com'} newTab={false}/>
            <DesktopIcon icon={sorting_icon} label={'Sorting Visualizer'} href={'https://pranavsangani.github.io/SortingAlgorithmVisualizer/'}/>
            <DesktopIcon icon={calculator_icon} label={'Puzzles'} onClick={onClickPuzzle}/>
            <DesktopIcon icon={paint_icon} label={'Paint'} onClick={onClickPaint}/>
            <DesktopIcon icon={solitaire_icon} label={'Spider Solitaire'} onClick={onClickSolitaire}/>
            <DesktopIcon icon={minesweeper_icon} label={'Minesweeper'} display={<>Mine<br/>sweeper</>} onClick={onClickMinesweeper}/>
        </div>
    );
}

export default Icons;
