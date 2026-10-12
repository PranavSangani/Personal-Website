import React from 'react';
import {COURSEWORK, ENTREPRENEURSHIP} from './content';

// Coursework window: one card per CS course, plus a single grouped card for the
// entrepreneurship certificate. Reuses the Projects window's card styles.
function Coursework() {
    return (
        <div className={'projects_container'}>
            <h3 className={'coursework_heading'}>Computer Science · Purdue University</h3>
            {COURSEWORK.map((c) => (
                <div className={'project_card'} key={c.name}>
                    <div className={'project_info'}>
                        <h3 className={'project_name'}>
                            {c.name} <span className={'course_code'}>{c.code}</span>
                            {c.inProgress ? <span className={'course_status'}>In progress</span> : null}
                        </h3>
                        <p className={'project_desc'}>{c.summary}</p>
                        <p className={'project_tech'}><b>Topics:</b> {c.topics}</p>
                        {c.built ? <p className={'project_tech'}><b>Built:</b> {c.built}</p> : null}
                    </div>
                </div>
            ))}
            <h3 className={'coursework_heading'}>Entrepreneurship</h3>
            <div className={'project_card'}>
                <div className={'project_info'}>
                    <h3 className={'project_name'}>
                        {ENTREPRENEURSHIP.name} <span className={'course_code'}>{ENTREPRENEURSHIP.code}</span>
                        {ENTREPRENEURSHIP.inProgress ? <span className={'course_status'}>In progress</span> : null}
                    </h3>
                    <p className={'project_desc'}>{ENTREPRENEURSHIP.summary}</p>
                    <p className={'project_tech'}><b>Courses:</b> {ENTREPRENEURSHIP.courses}</p>
                    <p className={'project_tech'}><b>Topics:</b> {ENTREPRENEURSHIP.topics}</p>
                </div>
            </div>
        </div>
    );
}

export default Coursework;
