import React from 'react';
import resume from "./assets/Pranav_Sangani_Resume.png";
import resume_pdf from './assets/Pranav_Sangani_Resume.pdf';
import {Button} from 'react-windows-xp';

function StartMessage() {
    return (
        <div>
            <a href={resume_pdf} target={'_blank'} rel="noreferrer"><Button
                className={'button'}>Download</Button></a><br/>
            <img id={'resume'} src={resume} alt={'resume'}/>
        </div>
    );
}

export default StartMessage;
