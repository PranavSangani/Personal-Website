import React from 'react';
import {ABOUT, LINKS, PLAIN_VIEW_HASH, PROFILE} from './content';

// The welcome window. Leads with who I am and the links a recruiter needs, then
// the longer About sections.
function StartMessage({onOpenResume, onOpenProjects, onOpenEmail}) {
    return (
        <div>
            <h2 className={'notice_name'}>{PROFILE.name}</h2>
            <h3 className={'notice_tagline'}>{PROFILE.tagline}</h3>
            <p className={'notice_seeking'}>{PROFILE.seeking}</p>
            <div className={'notice_actions'}>
                <button className={'notice_btn'} onClick={onOpenResume}>Resume</button>
                <button className={'notice_btn'} onClick={onOpenProjects}>Projects</button>
                <a className={'notice_btn'} href={LINKS.github} target={'_blank'} rel="noreferrer">GitHub</a>
                <a className={'notice_btn'} href={LINKS.linkedin} target={'_blank'} rel="noreferrer">LinkedIn</a>
                <button className={'notice_btn'} onClick={onOpenEmail}>Email</button>
            </div>
            <p className={'notice_plain'}>
                In a hurry? <a href={PLAIN_VIEW_HASH}>Switch to the plain view</a>
            </p>
            <h2><u>About Me</u></h2>
            <h3>{ABOUT.map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</h3>
            <h2><u>About This Website</u></h2>
            <h3>No - you didn't teleport to the past! <br/>
                This website is modeled after Windows XP, which, in my completely unbiased opinion, is the most nostalgic operating system ever made! <br/>
                Use the desktop icons on the left or the Start menu to get around. Play some games, solve a puzzle, draw something, and learn more about why you should hire me!
            </h3>
        </div>
    );
}

export default StartMessage;
