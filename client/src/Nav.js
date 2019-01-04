import React, { Component } from 'react';
import './Full.css';

class Nav extends Component {
    state = {
    }
    componentDidMount() {
        this.navigate({ key: window.location.pathname.substring(1) });
    }
    navigate = (route) => {
        this.props.navigate(route.key);
        window.history.replaceState({}, route.value, route.key);
    }
    render() {
        return (
            <div className="Nav">
                <div className="pure-menu pure-menu-horizontal">
                    <ul className="pure-menu-list">
                        {this.props.nav.routes.map((route) => {
                            return <li key={route.key} onClick={() => this.navigate(route)} className={this.props.nav.current === route.key ? "pure-menu-item  pure-menu-selected" : "pure-menu-item"}>
                                <a className="pure-menu-link hover-cursor">{route.value}</a>{/*eslint-disable-line*/}
                            </li>
                        })}
                        {/* <li className="pure-menu-item pure-menu"><a href="#" className="pure-menu-link">Selected</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Normal</a></li> */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Nav;
