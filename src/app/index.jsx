/**
 * Created by zc1415926 on 2017/5/15.
 */
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component{
    render() {
        return(<h1>Hello, world!!</h1>);
    }
}

render(<App/>, document.getElementById('content'));
