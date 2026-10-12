import React from 'react';
import './PlainView.css';
import resume_img from './assets/Pranav_Sangani_Resume.png';
import {ABOUT, COURSEWORK, EMAIL, ENTREPRENEURSHIP, LINKS, PROFILE} from './content';
import {PROJECTS} from './Projects';

// A plain one-page version of the site for anyone who wants the essentials fast
// (recruiters, phones). Served at #plain; any other hash shows the XP desktop.
function PlainView() {
    return (
        <div className={'plain'}>
            <header className={'plain_header'}>
                <a className={'plain_back'} href={'#desktop'}>← Back to the Windows XP desktop</a>
                <h1>{PROFILE.name}</h1>
                <p className={'plain_tagline'}>{PROFILE.tagline}</p>
                <p className={'plain_seeking'}>{PROFILE.seeking}</p>
                <nav className={'plain_links'}>
                    <a href={LINKS.resume} target={'_blank'} rel="noreferrer">Resume (PDF)</a>
                    <a href={LINKS.github} target={'_blank'} rel="noreferrer">GitHub</a>
                    <a href={LINKS.linkedin} target={'_blank'} rel="noreferrer">LinkedIn</a>
                    <a href={LINKS.email}>{EMAIL}</a>
                </nav>
            </header>

            <main>
                <section>
                    <h2>About</h2>
                    {ABOUT.map((line, i) => <p key={i}>{line}</p>)}
                </section>

                <section>
                    <h2>Projects</h2>
                    {PROJECTS.map((p) => (
                        <article className={'plain_project'} key={p.name}>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                            {p.results ? <p className={'plain_results'}>{p.results}</p> : null}
                            <p className={'plain_tech'}>{p.tech}</p>
                            {p.live || p.source ? (
                                <p className={'plain_project_links'}>
                                    {p.live ? <a href={p.live} target={'_blank'} rel="noreferrer">Live</a> : null}
                                    {p.source ? <a href={p.source} target={'_blank'} rel="noreferrer">Source</a> : null}
                                </p>
                            ) : null}
                        </article>
                    ))}
                </section>

                <section>
                    <h2>Coursework</h2>
                    {COURSEWORK.map((c) => (
                        <article className={'plain_course'} key={c.name}>
                            <h3>
                                {c.name} <span className={'plain_code'}>{c.code}</span>
                                {c.inProgress ? <span className={'plain_status'}>In progress</span> : null}
                            </h3>
                            <p>{c.summary}</p>
                            {c.built ? <p>Built: {c.built}</p> : null}
                            <p className={'plain_tech'}>{c.topics}</p>
                        </article>
                    ))}
                    <article className={'plain_course'}>
                        <h3>
                            {ENTREPRENEURSHIP.name} <span className={'plain_code'}>{ENTREPRENEURSHIP.code}</span>
                            {ENTREPRENEURSHIP.inProgress ? <span className={'plain_status'}>In progress</span> : null}
                        </h3>
                        <p>{ENTREPRENEURSHIP.summary}</p>
                        <p className={'plain_tech'}>{ENTREPRENEURSHIP.courses}</p>
                    </article>
                </section>

                <section>
                    <h2>Resume</h2>
                    <a href={LINKS.resume} target={'_blank'} rel="noreferrer">
                        <img className={'plain_resume'} src={resume_img} alt={'Pranav Sangani resume'}/>
                    </a>
                </section>
            </main>
        </div>
    );
}

export default PlainView;
