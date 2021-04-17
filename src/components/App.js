import { Grid, GridItem } from "@chakra-ui/layout";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Nav from "./Nav";
import SignIn from "./SignIn";
import "../App.css";
import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import Home from "./Home";
import UserCard from "./UserCard";
import NewCard from "./NewCard";
import LeaderBoard from "./LeaderBoard";
import NoMatch from "./NoMatch";

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
              render={(props) =>
                authedUser ? (
                  <Home />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: props.location },
                    }}
                  />
                )
              }
            />

            <Route
              path="/questions/:id"
              component={authedUser ? UserCard : NoMatch}
            />
            <Route path="/login" component={SignIn} />
            <Route
              path="/new"
              render={(props) =>
                authedUser ? (
                  <NewCard />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/badUrl",
                      state: { from: props.location },
                    }}
                  />
                )
              }
            />
            <Route
              path="/leaderboard"
              render={(props) =>
                authedUser ? (
                  <LeaderBoard />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/badUrl",
                      state: { from: props.location },
                    }}
                  />
                )
              }
            />
            <Route path="/badUrl" component={NoMatch} />
            <Route
              path="*"
              render={(props) =>
                authedUser ? (
                  <Home />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/badUrl",
                      state: { from: props.location },
                    }}
                  />
                )
              }
            />
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
