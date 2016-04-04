var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Channels = require('./channels')

var Project = React.createClass({
    componentDidMount: function () {
        if (this.props.params && this.props.params.index) {
            let recent = window.globalState.channels[this.props.params.index]
            if (recent)
                window.globalState.recent = recent       
        } 
    },
    render: function () {
        let s0 = {
            margin: "0px 60px"
        }
        let s1 = {
            color: "#cccccc",
            float: "right"
        }
        let renderImages = []
        
        if (!window.globalState.channels[this.props.params.index].contents)
            return (<div></div>)
        
        window.globalState.channels[this.props.params.index].contents.forEach(function(content) {
            if (content.image)
                renderImages.push(
                    <img className="img-item" src={content.image.original.url}/>
                )  
        })
        
        let index = parseInt(this.props.params.index)
        
        let next = function () {
            let channel = window.globalState.channels[index + 1]
            if (channel) {
                let slug = channel.slug
                window.location.hash = `#/channel/${slug}/${index + 1}`
            }
        }
        
        let previous = function () {
            let channel = window.globalState.channels[index - 1]
            if (channel) {
                let slug = channel.slug
                window.location.hash = `#/channel/${slug}/${index - 1}`
            }
        }
        
        return (
            <div className="body">
                <div className="project-navigator">
                    <span className="hover-pointer" onClick={previous.bind(this)}>&lt;</span>
                    <span style={s0}>{window.globalState.channels[this.props.params.index].title}</span>
                    <span className="hover-pointer" onClick={next.bind(this)}>&gt;</span>
                    <a className="hover-pointer hover-red gt-sectra-fine-15" style={s1} href="#/">X</a>
                </div>
                <div>
                    {renderImages}
                </div>
            </div>
        )
    }
})

module.exports = Project