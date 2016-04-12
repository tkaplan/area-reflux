var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Channels = require('./channels')
var Project = require('./project')

var Fetch = require('whatwg-fetch')

const api = {}

api.base = 'http://api.are.na/v2'
api.channels = `${api.base}/channels`
api.user = id => `${api.base}/users/${id}`
api.channel = id => `${api.base}/channels/${id}`
api.block = id => `${api.base}/blocks/${id}`

// User regex to replace this line
api.authProxy = 'http://52.38.12.97:3333/auth'

// Make our authorized requests through proxy
api.auth = {
  usersChannel: id => `${api.authProxy}/v2/users/${id}/channels`
}

window.drawTable = function (channels) {
    let table = Array.from(new Array(4), () => [])
    let rows = Math.ceil(channels.length / 4)
    let index = 0

    if (screen.width > 500) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < rows; j++) {
                if (j * 4 + i > channels.length - 1 || index > channels.length - 1) continue
                    table[j][i] = (
                        <div className="grid-cell">
                            <a className="channel" href={`#/channel/${channels[index].slug}/${index}`}>
                                {channels[index].title}
                            </a>
                        </div>
                    )
                index ++
            }    
        }
    } else {
        table = []
        for (let i = 0; i < channels.length; i ++) {
            table[i] = (
                <div className="grid-cell">
                    <a className="channel" href={`#/channel/${channels[i].slug}/${i}`}>
                        {channels[i].title}
                    </a>
                </div>
            )
        }
    }
    return table
}

var Body = React.createClass({
    getInitialState: function () {
        this.loader = {
            display: 'block'
        }
        window.globalState = {
            s0: {},
            recent: {
                title: "",
                contents: [
                    {
                        image: {
                            original: {
                                url: ""
                            }
                        }
                    }
                ]
            },
            table: (
                <div>
                </div>
            ),
            channels: [{
                title: "",
                contents: [
                    {
                        image: {
                            original: {
                                url: ""
                            }
                        }
                    }
                ]
            }]
        }
        
        return window.globalState
    },
    componentDidMount: function () {
        fetch(api.auth.usersChannel('414')).then(
            (response) => {
                return response.json()
            }
        ).then (
            (response) => {
                this.loader = {
                    display: 'none'
                }
                let channels = response.channels
                channels = channels.map((_) => {
                    return {
                        id: _.id,
                        updated_at: _.updated_at,
                        title: _.title,
                        contents: _.contents,
                        slug: _.slug
                    }
                })
                
                // 2 dimensional array
                let table = window.drawTable(channels)
                
                let img = new Image()
                img.onload = () => {
                    window.globalState = {
                        s0: {
                            minHeight: img.height
                        },
                        table: table,
                        recent: channels[0],
                        channels: channels
                    }
                    window.triggerGlobalUpdate()
                }
                img.src = channels[0].contents[0].image.original.url
                this.forceUpdate()
            }
        )
    },
    render: function () {
        return (
            <div>
                <div className="loader" style={this.loader}>
                </div>
                <ReactRouter.Router history={ReactRouter.hashHistory}>
                    <ReactRouter.Route path="/" history={ReactRouter.hashHistory} component={Channels}/>
                    <ReactRouter.Route path="/channel/:slug/:index" component={Project}/>
                </ReactRouter.Router>
            </div>
        )
    }
})

module.exports = Body
