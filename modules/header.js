var React = require('react')
var ReactDOM = require('react-dom')

var Header = React.createClass({
    render: () => {
        let c0 = ['gt-sectra-display-15 home-link']
        let c1 = ['gt-sectra-display-15 link']
        let c2 = ['gt-sectra-fine-13']
        
        let s0 = {
            color: '#333333'
        }
        let s1_0 = {
            textDecoration: 'underline',
            marginLeft: '5px'
        }
        let s2 = {
            color: '#c9c9c9'
        }
        let s3 = {
            'max-width': '900px',
            'display': 'block',
            'margin': 'auto',
            'margin-top': '36px'
        }
        let condition = null
        let goHome = () => {
            window.location.hash = "/"
        }
        let goRecent = () => {
            window.location.hash = "/channel/cartoon-paintings/0"
        }

        if (screen.width > 500) {
            condition = (
                <div style={s3}>
                    <div className="grid-cell">
                        <span style={s0} className={c0} onClick={goHome.bind(this)}>CHRIS COY</span>
                    </div>
                    <div className="grid-cell">
                        <span className={c1}>recent: 
                            <span style={s1_0} className="link" onClick={goRecent.bind(this)}>Cartoon Paintings</span>
                        </span>
                    </div>
                    <div className="grid-cell">
                    </div>
                    <div className="grid-cell">
                        <span style={s2} className={c2}>email@seecoy.com</span>
                    </div>
                </div>
            )
        } else {
            let s = {}
            let s1_1 = {}
            let s1_2 = {}
            s['padding-left'] = '25px'
            s0['float'] = 'left'
            s1_1['display'] = 'block'
            s1_2['margin-top'] = '20px'
            s1_0['marginLeft'] = '0px'
            s2['float'] = 'right'
            condition = (
                <div style={s}>
                    <div>
                        <span style={s0} className={c0} onClick={goHome.bind(this)}>CHRIS COY</span>
                        &nbsp;
                        <span style={s2} className={c2}>email@chriscoychriscoy.com</span>
                    </div>
                    <div style={s1_1}>
                        <div style={s1_2} className={c1}>recent:</div>
                        <div>
                            <span style={s1_0} className={c1} className="link" onClick={goRecent.bind(this)}>Cartoon Paintings</span>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="header">
                {condition}
            </div>
        )
    }
})

module.exports = Header