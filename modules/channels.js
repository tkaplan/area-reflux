var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')

var Channels = React.createClass({
    componentDidMount: function () {
        let self = this
        window.registerGlobalUpdate('Channels', function () {
            window.globalState.table = window.drawTable(
                window.globalState.channels
            )
            self.forceUpdate()
        })
        self.forceUpdate()
    },
    componentWillUnmount: function () {
       window.deregisterGlobalUpdate('Channels')
    },
    render: function () {
        let index = 0
        for (let i = 0; i < window.globalState.recent.contents.length; i ++) {
            if (window.globalState.recent.contents[i].image) {
                index = i
                break;
            }
        }
        return (
            <div className="body" style={window.globalState.s0}>
                <div className="backgroundImg" style={window.globalState.s0}>
                    <img className="backgroundImg" src={window.globalState.recent.contents[index].image.original.url}/>
                </div>
                {window.globalState.table}
            </div>
        )
    }
})

module.exports = Channels