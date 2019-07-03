import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Counter extends React.Component {
    static propTypes = {
        count: PropTypes.any,
    }
    /**
     * 获取store
     * @type {{store: shim}}
     */
    static contextTypes = {
        store: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    getStore = () => {
        console.log(this.context.store);
    }
    render() {
        const { count } = this.props;
        return (
            <div>
                <span>啦啦计数{count}</span>
                <button onClick={this.getStore}>Increase</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.counter.count
    };
};

export default connect(mapStateToProps)(Counter);
