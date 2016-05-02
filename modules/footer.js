var Helpers = require('./helpers')
var React = require('react')
var ReactDOM = require('react-dom')
var key = null
var hashState = false
var sort0 = {
    color: '#bbbbbb'
}
var sort1 = {
    color: '#bbbbbb'
}
var Footer = React.createClass({
    componentDidMount: function () {
        let self = this
        key = setInterval(function () {
            let newHashState = location.href.indexOf("channel") === -1
            if (newHashState !== hashState) {
                self.forceUpdate()
                hashState = newHashState
            }
        }, 250)
    },
    componentWillUnmount: function () {
        key()  
    },
    render: function () {
        let self = this;
        let c0 = 'footer gt-pressura-13'
        let s0 = {
            color: "#bbbbbb"
        }
        let s1 = {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100%'
        }
        let elem = (
            <div></div>
        )
        
        let sortAZ = function () {
            window.globalState.channels = Helpers.qsort(
                window.globalState.channels,
                function (channel) {
                    return channel.title.toLowerCase()
                }
            )

            sort0 = {
                color: '#666666'
            }
            sort1 = {
                color: '#bbbbbb'
            }

            self.forceUpdate();
            
            window.triggerGlobalUpdate()
        }
        
        let sortUpdate = function () {
            window.globalState.channels = Helpers.qsort(
                window.globalState.channels,
                function (channel) {
                    return new Date(channel.updated_at)
                }
            ).reverse()

            sort1 = {
                color: '#666666'
            }
            sort0 = {
                color: '#bbbbbb'
            }
            
            self.forceUpdate();

            window.triggerGlobalUpdate()
        }
        
        let changeLocation = function (href) {
            window.location.href = href;
        }
        
        if (location.href.indexOf("channel") === -1) {
            if (screen.width > 500) {
                elem = (
                    <div style={s1}>
                        <div className={c0} style={s0}>
                            <div className="grid-cell">
                                <span>SORT:
                                    <span className="footer-link" style={sort0} onClick={sortAZ.bind(this)}>A-Z</span>, 
                                    <span className="footer-link" style={sort1} onClick={sortUpdate.bind(this)}>Last Updated</span>
                                </span>
                            </div>
                            <div className="grid-cell"></div>
                            <div className="grid-cell"></div>
                            <div className="grid-cell">
                                <span>
                                    Built with
                                    <span className="footer-link" onClick={changeLocation.bind(this,"https://are.na")}>Are.na</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            } else {
                elem = (
                    <div className={c0} style={s0}>
                        <span>SORT:
                            <span className="footer-link" style={sort0} onClick={sortAZ.bind(this)}>A-Z</span>, 
                            <span className="footer-link" style={sort1} onClick={sortUpdate.bind(this)}>Last Updated</span>
                        </span>
                    </div>
                )
            }
        }
            
        return elem 
    }
})

module.exports = Footer