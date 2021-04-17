import { HomePage, JoinPage, NotFoundPage, EditorPage } from 'pages'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Base from 'containers/common/Base'
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'

const App = () => {
    return (
        <BrowserRouter>
        <Header/>
            <Container>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/join' component={JoinPage} />
                    <Route exact path='/post/editor/:post_id?' component={EditorPage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Base />
            </Container>
        <Footer/>
        </BrowserRouter>

    )
}

export default App