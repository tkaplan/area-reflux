var Helpers = require('./helpers')
var React = require('react')
var ReactDOM = require('react-dom')
var key = null
var hashState = false
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
    render: () => {
        let c0 = 'footer gt-pressura-13'
        let s0 = {
            color: "#bbbbbb"
        }
        let s1 = {
            position: 'absolute',
            bottom: '0px',
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
            
            window.triggerGlobalUpdate()
        }
        
        let sortUpdate = function () {
            window.globalState.channels = Helpers.qsort(
                window.globalState.channels,
                function (channel) {
                    return new Date(channel.updated_at)
                }
            ).reverse()
            
            window.triggerGlobalUpdate()
        }
        
        let changeLocation = function (href) {
            window.location.href = href;
        }
        
        if (location.href.indexOf("channel") === -1)
            elem = (
                <div style={s1}>
                    <div className={c0} style={s0}>
                        <div className="grid-cell">
                            <span>SORT:
                                <span className="footer-link" onClick={sortAZ.bind(this)}>A-Z</span>, 
                                <span className="footer-link" onClick={sortUpdate.bind(this)}>Last Updated</span>
                            </span>
                        </div>
                        <div className="grid-cell"></div>
                        <div className="grid-cell">
                            <span>
                                Built with:
                                <span className="footer-link" onClick={changeLocation.bind(this,"https://are.na")}>Are.na</span>
                            </span>
                        </div>
                    </div>
                </div>
            )
            
        return elem 
    }
})

module.exports = Footer