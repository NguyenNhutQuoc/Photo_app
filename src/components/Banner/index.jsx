import React from "react";
import './banner.scss'
export default function Banner(props) {
    const backgroundImageUrl = props.backgroundImageUrl;
	return (
		<div className='banner' style={backgroundImageUrl ? {backgroundImage: `url(${backgroundImageUrl})`}: {}}>
			<div className='banner__title'>
				<h1>{props.title}</h1>
			</div>
		</div>
	);
}
