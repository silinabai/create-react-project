import React from 'react';
import './style.scss';
import image from '../../image/ss.jpg';
import Counter from './components/Counter/index';
import Text from './components/Text';

export default class Home extends React.Component {

    componentDidMount() {
        if (AB_ENV === 'A') {
            document.body.style.backgroundColor = 'red';
        }
    }

    render() {
        return (
            <div>
                <div id="home">
                    我是主页啊
                    <img src={image} alt=""/>
                </div>
                <Counter/>
                <Text/>
            </div>
        );
    }
}
