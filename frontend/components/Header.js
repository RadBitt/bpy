import React from 'react';
import Nav from './Nav';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
	NProgress.start();
}

Router.onRouteChangeChange = () => {
	NProgress.done();
}

Router.onRouteChangeComplete = () => {
	NProgress.done();
}

const Header = () => (
	<Nav />
)


export default Header