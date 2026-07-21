import React, {useEffect, useState} from 'react';
import {Rnd} from 'react-rnd';
import {Window} from 'react-windows-xp';

const TASKBAR_HEIGHT = 34;

// A draggable + resizable + minimizable + maximizable XP window.
// - Drag by the title bar (dragHandleClassName="title-bar").
// - Native XP minimize button (showMinimize) calls onMinimize; when minimized
//   we hide (display:none) but stay mounted so window state is preserved.
// - Native XP maximize button toggles full-screen (above the taskbar) and back
//   to the previous floating position/size.
// - Geometry is controlled here so maximize can snap out and restore.
// - Clicking anywhere on the window raises it via onFocus (z-index bump).
function XPWindow({title, id, rect, z, minimized, onClose, onMinimize, onFocus, children}) {
    const [pos, setPos] = useState({x: rect.x, y: rect.y});
    const [size, setSize] = useState({width: rect.width, height: rect.height});
    const [maximized, setMaximized] = useState(false);
    const [prev, setPrev] = useState(null); // saved floating geometry while maximized

    const maxSize = () => ({width: window.innerWidth, height: window.innerHeight - TASKBAR_HEIGHT});

    // Keep a maximized window filling the screen if the browser is resized.
    useEffect(() => {
        if (!maximized) return;
        const onResize = () => setSize(maxSize());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [maximized]);

    const toggleMaximize = () => {
        onFocus();
        if (maximized) {
            if (prev) {
                setPos(prev.pos);
                setSize(prev.size);
            }
            setMaximized(false);
        } else {
            setPrev({pos, size});
            setPos({x: 0, y: 0});
            setSize(maxSize());
            setMaximized(true);
        }
    };

    return (
        <Rnd
            className={'rnd_window'}
            size={size}
            position={pos}
            dragHandleClassName={'title-bar'}
            bounds={'window'}
            minWidth={240}
            minHeight={160}
            disableDragging={maximized}
            enableResizing={!maximized}
            style={{zIndex: z, display: minimized ? 'none' : 'block'}}
            onMouseDown={onFocus}
            onDragStop={(e, d) => setPos({x: d.x, y: d.y})}
            onResizeStop={(e, dir, ref, delta, position) => {
                setSize({width: ref.offsetWidth, height: ref.offsetHeight});
                setPos(position);
            }}
        >
            <Window title={title}
                    id={id}
                    showClose={true}
                    onClose={onClose}
                    showMinimize={true}
                    onMinimize={onMinimize}
                    showMaximize={true}
                    onMaximize={toggleMaximize}
                    children={children}/>
        </Rnd>
    );
}

export default XPWindow;
