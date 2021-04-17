import { HomePage, JoinPage, NotFoundPage, EditorPage } from 'pages'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Base from 'containers/common/Base'
import { BrowserRouter } from 'react-router-dom'
import Header from 'components/common/Header'

const App = () => {
    return (
        <BrowserRouter>
        <Header/>
            <div>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/join' component={JoinPage} />
                    <Route exact path='/post/editor/:post_id?' component={EditorPage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Base />
            </div>
        </BrowserRouter>
    )
}

export default App