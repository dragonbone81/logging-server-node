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
                    <div className="menu-block">
                        <ul className="pure-menu-list left-menu">
                            {this.props.nav.routes.filter(route => route.position === 'left').map((route) => {
                                return <li key={route.key} onClick={() => this.navigate(route)} className={this.props.nav.current === route.key ? "pure-menu-item  pure-menu-selected" : "pure-menu-item"}>
                                    <a className="border-rounded pure-menu-link hover-cursor">{route.value}</a>{/*eslint-disable-line*/}
                                </li>
                            })}
                        </ul>
                        <ul className="pure-menu-list right-menu">
                            {this.props.nav.routes.filter(route => route.position === 'right').map((route) => {
                                return <li key={route.key} onClick={() => this.navigate(route)} className={this.props.nav.current === route.key ? "pure-menu-item  pure-menu-selected" : "pure-menu-item"}>
                                    <a className="border-rounded pure-menu-link hover-cursor">{route.value}</a>{/*eslint-disable-line*/}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;
