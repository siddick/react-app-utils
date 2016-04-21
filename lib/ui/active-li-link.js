'use strict';

var React = require('react'),
    RR = require('react-router'),
    Link = React.createFactory(RR.Link);

var ActiveLiLink = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    isActive: function () {
        return this.context.router.isActive(this.props.to, true);
    },
    render: function() {
        var className =  this.isActive() ? "active" : "";
        return React.DOM.li({ className: className }, Link(this.props));
    }
});

module.exports = ActiveLiLink;