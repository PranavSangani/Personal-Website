import React, {useEffect, useRef, useState} from 'react';
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
import notepad_icon from "./assets/notepad_icon.png";
import {LINKS} from "./content";

const TASKBAR_HEIGHT = 34;
// Default layout: icons fill columns top-to-bottom on this grid, like XP.
const CELL_W = 90;
const CELL_H = 92;
const ORIGIN = {x: 4, y: 8};
// A press that moves less than this is a click, not a drag.
const DRAG_THRESHOLD = 4;

function gridPosition(index) {
    const rows = Math.max(1, Math.floor((window.innerHeight - TASKBAR_HEIGHT - ORIGIN.y) / CELL_H));
    return {x: ORIGIN.x + Math.floor(index / rows) * CELL_W, y: ORIGIN.y + (index % rows) * CELL_H};
}

function intersects(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

// One desktop shortcut. Links open in a new tab; apps open a window. The
// wrapper span carries the icon as a CSS mask so a selected icon gets XP's
// blue tint over just its visible pixels.
function DesktopIcon({icon, label, onClick, href, newTab = true, selected, pos, onPointerDown, onClickCapture, iconRef}) {
    const props = {
        ref: iconRef,
        className: 'icon' + (selected ? ' icon_selected' : ''),
        title: label,
        style: {left: pos.x, top: pos.y},
        onPointerDown,
        onClickCapture,
        draggable: false,
        onDragStart: (e) => e.preventDefault(),
    };
    const content = (
        <>
            <span className={'icon_img'} style={{'--icon-url': `url(${icon})`}}>
                <img src={icon} alt={''} width={44} height={44} draggable={false}/>
            </span>
            <p>{label}</p>
        </>
    );
    if (href) {
        return (
            <a {...props} href={href} {...(newTab ? {target: '_blank', rel: 'noreferrer'} : {})}>
                {content}
            </a>
        );
    }
    return <button {...props} onClick={onClick}>{content}</button>;
}

// The desktop: icons can be clicked to open, dragged to move (a selected group
// moves together), and selected with a rubber-band box by dragging on empty
// space. Dragging and the selection box are mouse-only so touch taps behave
// exactly like clicks.
function Icons({onClickPaint, onClickSolitaire, onClickMinesweeper, onClickPuzzle, onClickResume, onClickProjects, onClickCoursework}) {
    const ICONS = [
        {id: 'resume', icon: resume_icon, label: 'Resume', onClick: onClickResume},
        {id: 'projects', icon: folder_icon, label: 'My Projects', onClick: onClickProjects},
        {id: 'coursework', icon: notepad_icon, label: 'Coursework', onClick: onClickCoursework},
        {id: 'github', icon: github_icon, label: 'GitHub', href: LINKS.github},
        {id: 'linkedin', icon: linkedin_icon, label: 'LinkedIn', href: LINKS.linkedin},
        {id: 'email', icon: mail_icon, label: 'Email', href: LINKS.email, newTab: false},
        {id: 'sorting', icon: sorting_icon, label: 'Sorting Visualizer', href: LINKS.sortingVisualizer},
        {id: 'puzzle', icon: calculator_icon, label: 'Puzzles', onClick: onClickPuzzle},
        {id: 'paint', icon: paint_icon, label: 'Paint', onClick: onClickPaint},
        {id: 'solitaire', icon: solitaire_icon, label: 'Spider Solitaire', onClick: onClickSolitaire},
        {id: 'minesweeper', icon: minesweeper_icon, label: 'Minesweeper', onClick: onClickMinesweeper},
    ];

    // Positions of icons the user has moved; the rest sit on the default grid.
    const [moved, setMoved] = useState({});
    const [selected, setSelected] = useState(() => new Set());
    const [marquee, setMarquee] = useState(null); // {x0, y0, x1, y1} in page px
    const [, setViewport] = useState(0); // re-layout the default grid on resize

    const desktopRef = useRef(null);
    const iconRefs = useRef({});
    const drag = useRef(null);
    const suppressClick = useRef(false);

    const positionOf = (id) => moved[id] || gridPosition(ICONS.findIndex((i) => i.id === id));

    useEffect(() => {
        const onResize = () => setViewport((n) => n + 1);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Mouse move/up are tracked on the window so a drag keeps working when the
    // pointer leaves the icon or the desktop.
    useEffect(() => {
        const onMove = (e) => {
            const d = drag.current;
            if (!d) return;
            const dx = e.clientX - d.startX;
            const dy = e.clientY - d.startY;
            if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
            d.moved = true;

            if (d.type === 'icons') {
                const maxX = window.innerWidth - CELL_W;
                const maxY = window.innerHeight - TASKBAR_HEIGHT - CELL_H;
                const next = {};
                for (const [id, o] of Object.entries(d.origins)) {
                    next[id] = {
                        x: Math.min(Math.max(0, o.x + dx), maxX),
                        y: Math.min(Math.max(0, o.y + dy), maxY),
                    };
                }
                setMoved((m) => ({...m, ...next}));
            } else {
                const box = {x0: d.startX, y0: d.startY, x1: e.clientX, y1: e.clientY};
                const rect = {
                    left: Math.min(box.x0, box.x1), right: Math.max(box.x0, box.x1),
                    top: Math.min(box.y0, box.y1), bottom: Math.max(box.y0, box.y1),
                };
                const hit = new Set(d.additive ? d.initial : []);
                for (const [id, el] of Object.entries(iconRefs.current)) {
                    if (el && intersects(rect, el.getBoundingClientRect())) hit.add(id);
                }
                setMarquee(box);
                setSelected(hit);
            }
        };
        const onUp = () => {
            const d = drag.current;
            if (!d) return;
            // A real drag shouldn't also open the icon on release.
            suppressClick.current = d.type === 'icons' && d.moved;
            drag.current = null;
            setMarquee(null);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, []);

    const onIconPointerDown = (id) => (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        let group = selected;
        if (e.metaKey || e.ctrlKey) {
            group = new Set(selected);
            group.has(id) ? group.delete(id) : group.add(id);
        } else if (!selected.has(id)) {
            group = new Set([id]);
        }
        setSelected(group);
        const origins = {};
        for (const gid of group) origins[gid] = positionOf(gid);
        drag.current = {type: 'icons', startX: e.clientX, startY: e.clientY, origins, moved: false};
    };

    // Don't open after a drag, or on Ctrl/Cmd-click (which only toggles selection).
    const onIconClickCapture = (e) => {
        if (suppressClick.current || e.metaKey || e.ctrlKey) {
            suppressClick.current = false;
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const onDesktopPointerDown = (e) => {
        if (e.target !== desktopRef.current || e.pointerType !== 'mouse' || e.button !== 0) return;
        const additive = e.metaKey || e.ctrlKey;
        if (!additive) setSelected(new Set());
        drag.current = {
            type: 'marquee', startX: e.clientX, startY: e.clientY, moved: false,
            additive, initial: new Set(selected),
        };
    };

    return (
        <div className={'icon_containers'} ref={desktopRef} onPointerDown={onDesktopPointerDown}>
            {ICONS.map(({id, ...icon}) => (
                <DesktopIcon key={id} {...icon}
                             pos={positionOf(id)}
                             selected={selected.has(id)}
                             iconRef={(el) => { iconRefs.current[id] = el; }}
                             onPointerDown={onIconPointerDown(id)}
                             onClickCapture={onIconClickCapture}/>
            ))}
            {marquee ? (
                <div className={'selection_box'} style={{
                    left: Math.min(marquee.x0, marquee.x1),
                    top: Math.min(marquee.y0, marquee.y1),
                    width: Math.abs(marquee.x1 - marquee.x0),
                    height: Math.abs(marquee.y1 - marquee.y0),
                }}/>
            ) : null}
        </div>
    );
}

export default Icons;
