var React = require('react')
var ReactDOM = require('react-dom')
var Header = require('./header')
var Footer = require('./footer')
var Body = require('./body')
var QSort = require('./helpers').qsort
var updates = {}

window.registerGlobalUpdate = function (key, fxn) {
    updates[key] = fxn
}

window.deregisterGlobalUpdate = function (key) {
    delete updates[key]
}

window.triggerGlobalUpdate = function () {
    let keys = Object.keys(updates)
    keys.forEach((key) => {
        updates[key]()
    })
}

var Content = React.createClass({
    getInitialState: function () {
        return {
            currentContent: null,
            lastConent: null,
            screenWidth: screen.width
        }
    },
    render: function () {
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
})

ReactDOM.render(
    <Content />,
    document.getElementById('content')
);