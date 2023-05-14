import React from 'react';
import './css/ViewHeader.css'

export default function ViewHeader({ highlight, text }) {
    return (
        <div className="view-header">
            <p><span>{highlight}</span> {text}</p>
        </div>
    );
}