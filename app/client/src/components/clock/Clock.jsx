import { useState, useEffect } from 'react';

function ClockWithReact() {
    const [date, setDate] = useState(new Date());
    const msSinceMidnight = date.getTime() % (24 * 60 * 60 * 1000); // Milliseconds since midnight

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const calculateAngle = (value, max) => (360 * value) / max;

    const hoursAngle = calculateAngle(
        (date.getHours() % 12) + date.getMinutes() / 60,
        12,
    );
    const minuteAngle = calculateAngle(
        date.getMinutes() + date.getSeconds() / 60,
        60,
    );
    const secondAngle = calculateAngle((msSinceMidnight / 1000) % 60, 60);

    const hourStrokes = Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 360) / 12;
        return (
            <g key={i}>
                <line
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="15"
                    style={{
                        stroke: '#ffffff',
                        strokeWidth: '1px',
                        transformOrigin: '50px 50px',
                        transform: `rotate(${angle}deg)`,
                    }}
                />
                <text
                    x={50 + Math.sin((angle * Math.PI) / 180) * 30}
                    y={50 - Math.cos((angle * Math.PI) / 180) * 30}
                    fill="#ffffff"
                    fontSize="6"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {i === 0 ? 12 : i}
                </text>
            </g>
        );
    });

    return (
        <div className="clock">
            <svg width="150" height="150" viewBox="0 0 100 100">
                <defs>
                    <filter
                        id="innerShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                    >
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="1.5"
                            result="blur"
                        />
                        <feOffset in="blur" dx="1.25" dy="1.25" />
                    </filter>
                </defs>

                <g>
                    <circle
                        id="shadow"
                        style={{ fill: 'rgba(0, 0, 0, 0.47)' }}
                        cx="50"
                        cy="50"
                        r="43"
                        filter="url(#innerShadow)"
                    ></circle>
                    <circle
                        id="circle"
                        style={{
                            stroke: '#FFF',
                            strokeWidth: '6px',
                            fill: '#000',
                        }}
                        cx="50"
                        cy="50"
                        r="40"
                    ></circle>
                </g>

                <g>{hourStrokes}</g>

                <g>
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="27.5"
                        style={{
                            strokeWidth: '1.5px',
                            stroke: '#fffbf9',
                            transformOrigin: '50px 50px',
                            transform: `rotate(${hoursAngle}deg)`,
                        }}
                        id="hourhand"
                    />
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="20"
                        style={{
                            strokeWidth: '2px',
                            stroke: '#fdfdfd',
                            transformOrigin: '50px 50px',
                            transform: `rotate(${minuteAngle}deg)`,
                        }}
                        id="minutehand"
                    />
                    <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="15"
                        style={{
                            strokeWidth: '1px',
                            stroke: '#C1EFED',
                            transformOrigin: '50px 50px',
                            transform: `rotate(${secondAngle}deg)`,
                        }}
                        id="secondhand"
                    />
                </g>

                <circle
                    id="center"
                    style={{
                        fill: '#000',
                        stroke: '#FFF',
                        strokeWidth: '1px',
                    }}
                    cx="50"
                    cy="50"
                    r="1.5"
                ></circle>
            </svg>
        </div>
    );
}

export default ClockWithReact;
