import React, { Suspense } from 'react'
import './assets/css/sb-admin-2.css';
import './assets/css/sb-admin-2.min.css';
import './assets/css/responsive.css';
import './assets/css/style.css';
import { BrowserRouter, Route } from "react-router-dom";
import Routes from './routes';
class App extends React.Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Suspense fallback={<div></div>}>
                        <Routes />
                    </Suspense>
                </BrowserRouter>
            </>
        )
    }
}

export default App;
