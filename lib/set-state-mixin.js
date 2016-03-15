'use strict';

module.exports = {
    getInitialState: function getInitialState() {
        return this.props.location.state || {};
    },
    componentWillReceiveProps: function (props) {
        this.setState(props.location.state || {} );
    }
};
