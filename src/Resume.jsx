import React from 'react';
import resume from "./assets/Pranav_Sangani_Resume.png";
import {LINKS, RESUME_FILENAME} from './content';

// Resume window: Open shows the PDF in a new tab; Download saves it directly
// (the `download` attribute works because the PDF is served from this site).
function Resume() {
    return (
        <div>
            <div className={'resume_actions'}>
                <a className={'notice_btn'} href={LINKS.resume} target={'_blank'} rel="noreferrer">Open</a>
                <a className={'notice_btn'} href={LINKS.resume} download={RESUME_FILENAME}>Download</a>
            </div>
            <img id={'resume'} src={resume} alt={'resume'}/>
        </div>
    );
}

export default Resume;
