import React from 'react';
import {Rnd} from 'react-rnd';
import {Window} from 'react-windows-xp';

// A draggable + resizable + minimizable XP window.
// - Drag by the title bar (dragHandleClassName="title-bar").
// - Native XP minimize button (showMinimize) calls onMinimize.
// - When minimized, we hide (display:none) but stay mounted so window state
//   (game progress, iframes, scroll) is preserved on restore.
// - Clicking anywhere on the window raises it via onFocus (z-index bump).
function XPWindow({title, id, rect, z, minimized, onClose, onMinimize, onFocus, children}) {
    return (
        <Rnd
            className={'rnd_window'}
            default={rect}
            dragHandleClassName={'title-bar'}
            bounds={'window'}
            minWidth={240}
            minHeight={160}
            style={{zIndex: z, display: minimized ? 'none' : 'block'}}
            onMouseDown={onFocus}
            onResizeStart={onFocus}
        >
            <Window title={title}
                    id={id}
                    showClose={true}
                    onClose={onClose}
                    showMinimize={true}
                    onMinimize={onMinimize}
                    children={children}/>
        </Rnd>
    );
}

export default XPWindow;
