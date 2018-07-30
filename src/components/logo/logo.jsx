import React, { Component } from 'react';
import logo from '@/assets/images/logo.svg';
import './logo.less';

class Logo extends Component {
  render() {
    return(
        <a href="" className="logo">
            <img alt="GrapeCity" src={logo} />
            <span>财务报表系统</span>
        </a>
    );
  }
}

export default Logo;