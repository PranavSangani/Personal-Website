import React from 'react';

function Solitaire() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                top: "1%",
                left: "1%",
                overflow: "hidden",
            }}
        >
            <iframe
                src="https://www.squidbyte.com/games/spidersolitairewindowsxp/"
                frameBorder="0"
                title="Spider Solitaire"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgb(192,192,192)',
                }}
            />
        </div>
    );
}

export default Solitaire;