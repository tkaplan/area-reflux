var React = require('react')
var ReactDOM = require('react-dom')

var Header = React.createClass({
    render: () => {
        let c0 = ['gt-sectra-display-15']
        let c1 = ['gt-sectra-display-15']
        let c2 = ['gt-sectra-fine-13']
        
        let s0 = {
            float: 'left',
            color: '#333333'
        }
        let s1 = {
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            left: '0px'
        }
        let s1_0 = {
            textDecoration: 'underline',
            marginLeft: '5px'
        }
        let s2 = {
            float: 'right',
            color: '#c9c9c9'
        }
        return (
            <div className="header">
                <span style={s0} className={c0}>CHRIS COY</span>
                <span style={s1} className={c1}>recent: 
                    <span style={s1_0}>Moscow ben hall</span>
                </span>
                <span style={s2} className={c2}>email@chriscoychriscoy.com</span>
            </div>
        )
    }
})

module.exports = Header