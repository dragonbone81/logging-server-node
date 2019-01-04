import React, { Component } from 'react';
import './Full.css';

class Nav extends Component {
    state = {
    }
    componentDidMount() {
        window.location.pathname.substring(1) === "" ? this.navigate({ key: 'new_log' }) : this.navigate({ key: window.location.pathname.substring(1) });
    }
    navigate = (route) => {
        this.props.navigate(route.key);
        window.history.replaceState({}, route.value, route.key);
    }
    render() {
        return (
            <div className="Nav">
                <div className="pure-menu pure-menu-horizontal nav-bar">
                    <ul className="pure-menu-list">
                        {this.props.nav.routes.map((route) => {
                            return <li key={route.key} onClick={() => this.navigate(route)} className={this.props.nav.current === route.key ? "pure-menu-item  pure-menu-selected" : "pure-menu-item"}>
                                <a className="pure-menu-link hover-cursor">{route.value}</a>{/*eslint-disable-line*/}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Nav;
