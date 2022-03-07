import React from 'react';
import img404 from './404.jpg'; 

export default function Notfound() {
    return (
        <div>
            <img src = {img404} alt = "404" style = {{width: '100%'}}/>
        </div>
    )
}
