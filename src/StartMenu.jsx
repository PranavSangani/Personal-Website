import React from 'react';
import notepad_icon from "./assets/notepad_icon.png";
import github_icon from "./assets/github_icon.png";
import linkedin_icon from "./assets/linkedin_icon.png";
import resume_icon from "./assets/resume_icon.png";
import folder_icon from "./assets/folder_icon.png";
import ie_icon from "./assets/ie.png";
import profile_photo from "./assets/profile_photo.jpg";
import {LINKS, PLAIN_VIEW_HASH} from "./content";

// The classic green XP Start Menu. Each program item calls a handler passed in
// from App and then closes the menu. External links are plain anchors.
function StartMenu({onAbout, onResume, onProjects, onCoursework, onLogOff, onClose}) {
    const run = (handler) => () => {
        handler();
        onClose();
    };

    return (
        <div className={'start_menu'}>
            <div className={'start_menu_header'}>
                <img src={profile_photo} alt={''} className={'start_menu_avatar'}/>
                <span>Pranav Sangani</span>
            </div>

            <div className={'start_menu_body'}>
                <button className={'start_menu_item'} onClick={run(onAbout)}>
                    <img src={notepad_icon} alt={''}/> About Me
                </button>
                <button className={'start_menu_item'} onClick={run(onResume)}>
                    <img src={resume_icon} alt={''}/> Resume
                </button>
                <button className={'start_menu_item'} onClick={run(onProjects)}>
                    <img src={folder_icon} alt={''}/> My Projects
                </button>
                <button className={'start_menu_item'} onClick={run(onCoursework)}>
                    <img src={notepad_icon} alt={''}/> Coursework
                </button>

                <hr className={'start_menu_divider'}/>

                <a className={'start_menu_item'} href={LINKS.github}
                   target={'_blank'} rel="noreferrer" onClick={onClose}>
                    <img src={github_icon} alt={''}/> GitHub
                </a>
                <a className={'start_menu_item'} href={LINKS.linkedin}
                   target={'_blank'} rel="noreferrer" onClick={onClose}>
                    <img src={linkedin_icon} alt={''}/> LinkedIn
                </a>

                <hr className={'start_menu_divider'}/>

                <a className={'start_menu_item'} href={PLAIN_VIEW_HASH} onClick={onClose}>
                    <img src={ie_icon} alt={''}/> Plain View
                </a>
            </div>

            <div className={'start_menu_footer'}>
                <button className={'start_menu_footer_btn'} onClick={onLogOff}>
                    Log Off
                </button>
            </div>
        </div>
    );
}

export default StartMenu;
