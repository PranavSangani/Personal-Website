import React from 'react';
import ie_icon from "./assets/ie.png";
import sorting_icon from "./assets/sorting_icon.png";

// Add/edit your projects here. `live` and `source` are optional (omit to hide the link).
const PROJECTS = [
    {
        name: 'FDA & EU Drug Data Search (Axcellion)',
        icon: ie_icon,
        description: 'End-to-end RAG pipeline and federated search API over 80K+ pages of FDA and EU drug documents, with a Neo4j knowledge graph and hybrid retrieval.',
        tech: 'Python, AWS (S3, EC2), Neo4j, RAG',
    },
    {
        name: 'SHERPA (Aavalar Consulting)',
        icon: ie_icon,
        description: 'AI assistant that answers employee questions from company documents with citations, with permission-aware search and Microsoft Teams and SharePoint integration.',
        tech: 'Python, Claude Agent SDK, MCP, PostgreSQL',
    },
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
        icon: sorting_icon,
        description: 'Interactive React app that animates merge, quick, insertion, and bubble sort in real time.',
        tech: 'React, JavaScript, HTML, CSS',
        live: 'https://pranavsangani.github.io/SortingAlgorithmVisualizer/',
        source: 'https://github.com/PranavSangani/SortingAlgorithmVisualizer',
    },
    {
        name: 'All-Pro NFL Predictor',
        icon: ie_icon,
        description: 'Predicts NFL All-Pro selections in R using lasso regression, random forest, and neural network models, trained on player statistics scraped from Pro Football Reference with Python.',
        tech: 'R (RStudio), Python, machine learning',
    },
    {
        name: 'DEEPSEAS',
        icon: ie_icon,
        description: 'Patent-pending underwater buoy that detects illegal fishing in Marine Protected Areas, running AI audio and vision models on a Jetson Nano.',
        tech: 'Python, Jetson Nano, deep learning',
    },
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
