import React from 'react'
import ReactDOM from 'react-dom'

'use strict'

class Hello extends React.Component {
    render() {
        return <div className='message-box'>
            Hello {this.props.name}
        </div>
    }
}

const app = document.getElementById('app')
console.log(app)
ReactDOM.render(<Hello name='User' />, app)
