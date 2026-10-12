import React, {useEffect, useRef, useState} from 'react';
import mail_icon from './assets/mail_icon.png';
import {EMAIL, LINKS} from './content';

// Email window: shows the address so people without a desktop mail app can
// still copy it, plus a button that opens their mail app.
function EmailDialog() {
    const [copied, setCopied] = useState(false);
    const addressRef = useRef(null);
    const resetTimer = useRef(null);

    useEffect(() => () => clearTimeout(resetTimer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
        } catch {
            // Clipboard API unavailable (older browser or insecure context):
            // select the address so Ctrl/Cmd+C works.
            const range = document.createRange();
            range.selectNodeContents(addressRef.current);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
        }
        setCopied(true);
        clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={'email_dialog'}>
            <div className={'email_dialog_row'}>
                <img src={mail_icon} alt={''} className={'email_dialog_icon'}/>
                <div>
                    <p className={'email_dialog_label'}>You can reach me at:</p>
                    <p className={'email_dialog_address'} ref={addressRef}>{EMAIL}</p>
                </div>
            </div>
            <div className={'email_dialog_actions'}>
                <button className={'notice_btn'} onClick={copy}>{copied ? 'Copied!' : 'Copy address'}</button>
                <a className={'notice_btn'} href={LINKS.email}>Open in mail app</a>
            </div>
        </div>
    );
}

export default EmailDialog;
