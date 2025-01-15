import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return (
        <header
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 border-bottom">
            < div className="col-md-3 mb-2 mb-md-0">
                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none"></a>
            </div>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li>
                    <a href="#" className="nav-link px-2 link-secondary">Home</a >
                </li>
                <li>
                    <a href="#" className="nav-link px-2">Features</a>
                </li>
                <li>
                    <a href="#" className="nav-link px-2">Pricing</a>
                </li>
                <li>
                    <a href="#" className="nav-link px-2">FAQs</a>
                </li>
                <li>
                    <a href="#" className="nav-link px-2">About</a>
                </li>
            </ul>
            {
                false
                    ? {/*
                    <div className="dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle">
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><hr className="dropdown-divider"></li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>*/
                    }
                    : <div className="col-md-3 text-end">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                            <button type="button" className="btn btn-primary">Sign-up</button>
                        </div>

            }
        </header>
    )
}

export default Header;