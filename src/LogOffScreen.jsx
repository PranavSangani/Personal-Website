import React, {useEffect, useState} from 'react';
import profile_photo from './assets/profile_photo.jpg';
import xp_logo from './assets/xp_logo.png';
import {PROFILE} from './content';

// How long the "Logging off..." and "Welcome" messages show, like XP.
const LOGGING_OFF_MS = 900;
const WELCOME_MS = 700;

// The Windows XP Welcome screen shown after Start > Log Off. Click the user
// tile to log back on to a fresh desktop.
function LogOffScreen({onLogOn}) {
    const [phase, setPhase] = useState('loggingOff'); // loggingOff -> select -> welcome

    useEffect(() => {
        if (phase === 'loggingOff') {
            const t = setTimeout(() => setPhase('select'), LOGGING_OFF_MS);
            return () => clearTimeout(t);
        }
        if (phase === 'welcome') {
            const t = setTimeout(onLogOn, WELCOME_MS);
            return () => clearTimeout(t);
        }
    }, [phase, onLogOn]);

    return (
        <div className={'xp_welcome'}>
            <div className={'xp_welcome_bar xp_welcome_top'}/>
            <div className={'xp_welcome_main'}>
                {phase === 'select' ? (
                    <>
                        <div className={'xp_welcome_left'}>
                            <img src={xp_logo} alt={''} className={'xp_welcome_logo'}/>
                            <p>To begin, click your user name</p>
                        </div>
                        <div className={'xp_welcome_divider'}/>
                        <div className={'xp_welcome_right'}>
                            <button className={'xp_user_tile'} onClick={() => setPhase('welcome')}>
                                <img src={profile_photo} alt={''}/>
                                <span>{PROFILE.name}</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <p className={'xp_welcome_message'}>
                        {phase === 'loggingOff' ? 'logging off...' : 'welcome'}
                    </p>
                )}
            </div>
            <div className={'xp_welcome_bar xp_welcome_bottom'}>
                {phase === 'select' ? (
                    <span>After you log on, you can explore my projects, resume, and coursework.</span>
                ) : null}
            </div>
        </div>
    );
}

export default LogOffScreen;
