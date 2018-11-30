/**
 * @component  SpinLoadingContainer
 * @param  {Boolean} spin spin,显示还是关闭SpinLoading组件
 * */
import {Spin} from 'antd';
import React from 'react';
import './spin.less';
import {connect} from 'react-redux';

const SpinLoading = (spinning) => {
    return (
        <div className='spin-container'>
            <Spin size="large" spinning={spinning.spinning}/>
        </div>
    )
};

class SpinLoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: this.props.spin
        }
    }

    componentWillMount() {
        // console.log(this.props, 'nextPropsSpin');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            spinning: nextProps.spin
        });
    }

    render() {
        return (
            <div>
                {this.state.spinning ? <SpinLoading spinning={this.state.spinning}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {spin} = state;
    return {spin}
};
export default connect(mapStateToProps)(SpinLoadingContainer)