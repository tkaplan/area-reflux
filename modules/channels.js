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
        // let index = 0
        // for (let i = 0; i < window.globalState.recent.contents.length; i ++) {
        //     if (window.globalState.recent.contents[i].image) {
        //         index = i
        //         break;
        //     }
        // }

        let backgroundUrl = "https://d2w9rnfcy7mm78.cloudfront.net/592510/original_96c95fcd7888591a6e965ff4316eca66.jpg"
        
        return (
            <div className="body" style={window.globalState.s0}>
                <div className="backgroundImg" style={window.globalState.s0}>
                    <img className="backgroundImg" src={backgroundUrl}/>
                </div>
                {window.globalState.table}
            </div>
        )
    }
})

module.exports = Channels