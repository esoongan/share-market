import { HomePage, NotFoundPage } from 'pages'
import React from 'react'
import { Switch, Route} from 'react-router-dom'

const App = () => {
    return(
        <div>
            <Switch>
                <Route exact path='/' component= {HomePage}/>
                <Route component= {NotFoundPage}/>
            </Switch>
        </div>
    )
}

export default App