import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Outlet} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Mode from './mode';
import React from 'react';

function Layout() {
    return (
        <div className="d-flex flex-column h-100">
            {/* <Mode/>  */}
            {
                !opener || opener.closed
                    ? <Header/>
                    : null
            }
            <main className="flex-shrink-0">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;