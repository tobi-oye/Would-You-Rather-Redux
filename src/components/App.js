import { Grid, GridItem } from "@chakra-ui/layout";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import SignIn from "./SignIn";
import "../App.css";
import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import UserCard from "./UserCard";

function App({ dispatch, authedUser }) {
  useEffect(() => dispatch(handleInitialData()), [dispatch]);

  return (
    <Router>
      <Grid templateColumns="repeat(1, 1fr)">
        <GridItem colSpan={1}>
          <Nav />
        </GridItem>

        <GridItem colSpan={1}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (authedUser ? <Home /> : <SignIn />)}
            />

            <Route path="/questions/:id" component={UserCard} />
          </Switch>
        </GridItem>
      </Grid>
    </Router>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};
export default connect(mapStateToProps)(App);
