import React from 'react';
import ie_icon from "./assets/ie.png";

// Add/edit your projects here. `live` and `source` are optional (omit to hide the link).
const PROJECTS = [
    {
        name: 'XP Portfolio',
        icon: ie_icon,
        description: 'This very website — a Windows XP desktop rebuilt in React.',
        tech: 'React, CRA, GitHub Pages',
        live: 'https://pranavsangani.info',
        source: 'https://github.com/PranavSangani/Personal-Website',
    },
    {
        name: 'Sorting Algorithm Visualizer',
        icon: ie_icon,
        description: 'Interactive visualizations of classic sorting algorithms.',
        tech: 'JavaScript',
        live: 'https://pranavsangani.github.io/SortingAlgorithmVisualizer/',
        source: 'https://github.com/PranavSangani/SortingAlgorithmVisualizer',
    },
    // TODO: add more projects here as folders
];

function Projects() {
    return (
        <div className={'projects_container'}>
            {PROJECTS.map((p) => (
                <div className={'project_card'} key={p.name}>
                    <img className={'project_icon'} src={p.icon} alt={`${p.name} icon`}/>
                    <div className={'project_info'}>
                        <h3 className={'project_name'}>{p.name}</h3>
                        <p className={'project_desc'}>{p.description}</p>
                        <p className={'project_tech'}><b>Tech:</b> {p.tech}</p>
                        <div className={'project_links'}>
                            {p.live ? (
                                <a href={p.live} target={'_blank'} rel="noreferrer">Live</a>
                            ) : null}
                            {p.source ? (
                                <a href={p.source} target={'_blank'} rel="noreferrer">Source</a>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Projects;
