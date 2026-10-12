import React from 'react';

function Paint() {
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
                src="https://jspaint.app"
                frameBorder="0"
                title="paint"
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

export default Paint;