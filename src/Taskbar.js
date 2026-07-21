import React from 'react';
import notepad_icon from "./assets/notepad_icon.png";
import ie_icon from "./assets/ie.png";
import paint_icon from "./assets/paint_icon.png";
import solitaire_icon from "./assets/solitaire_icon.png";
import minesweeper_icon from "./assets/minesweeper_icon.png";
import calculator_icon from "./assets/calculator_icon.png";

const ICONS = {
    notice: notepad_icon,
    resume: notepad_icon,
    projects: ie_icon,
    puzzle: calculator_icon,
    paint: paint_icon,
    solitaire: solitaire_icon,
    minesweeper: minesweeper_icon,
};

// Renders one button per open window. Clicking a button toggles that window
// (closes it here, since windows don't yet minimize). `items` is the list of
// currently-open windows: { key, label, onClick }.
function Taskbar({items}) {
    return (
        <div className={'taskbar'}>
            {items.map((w) => (
                <button className={'taskbar_btn'} key={w.key} onClick={w.onClick} title={w.label}>
                    <img src={ICONS[w.key]} alt={''}/>
                    <span>{w.label}</span>
                </button>
            ))}
        </div>
    );
}

export default Taskbar;
