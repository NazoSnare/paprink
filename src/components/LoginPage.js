import React, { Component } from 'react'
import FacebookAuth from 'react-facebook-auth'
import GoogleLogin from 'react-google-login'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Router, { withRouter } from 'next/router'

import { meta } from '../api/meta'
import User, { CURRENT_USER_QUERY, getMe } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $socialId: String!
    $fname: String!
    $lname: String!
    $name: String!
    $phone: String
    $email: String!
    $gender: String
    $birthday: String
    $bio: String
    $profilePicture: String!
    $signUpMethod: String!
    $accessToken: String!
  ) {
    signIn(
        signUpMethod: $signUpMethod
        profilePicture: $profilePicture
        socialId: $socialId
        fname: $fname
        lname: $lname
        name: $name
        phone: $phone
        email: $email
        gender: $gender
        birthday: $birthday
        bio: $bio
        accessToken: $accessToken
    ){
      id
      name
      fname
      lname
      email
    }
  }
`

const FacebookButton = (loading, { onClick }) => (
  <a href="#" className="btn-face m-b-20" onClick={onClick}>
    <i className="fa fa-facebook-official"></i>
    {loading ? 'Signing in...' : 'Facebook'}
  </a>
)

class LoginPage extends Component {

  state = {}

  authenticateFacebook = async (response, mutation, client) => {

    // console.log(response)

    await this.setState({
      signUpMethod: "facebook",
      profilePicture: response.picture.data.url,
      socialId: response.userID,
      fname: response.first_name,
      lname: response.last_name,
      name: response.name,
      gender: response.gender,
      birthday: response.birthday,
      email: response.email,
      accessToken: response.accessToken
    })

    const signIn = await mutation()

    const me = await getMe(client)

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      phone: null,
      email: null,
      gender: null,
      birthday: null,
      bio: null,
      accessToken: null
    })

    window.location.replace(Router.query.intent || '/') // Router does not work the expected way, so... this!

  }

  authenticationFailed = async response => {
    return null
  }

  authenticateGoogle = async (response, mutation, client) => {

    // console.log(response)

    await this.setState({
      signUpMethod: "google",
      profilePicture: response.profileObj.imageUrl,
      socialId: response.profileObj.googleId,
      fname: response.profileObj.givenName,
      lname: response.profileObj.givenName,
      name: response.profileObj.name,
      email: response.profileObj.email,
      accessToken: response.accessToken
    })

    const signIn = await mutation()

    const me = await getMe(client)

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      phone: null,
      email: null,
      gender: null,
      birthday: null,
      bio: null,
      accessToken: null
    })

    window.location.replace(Router.query.intent || '/')

  }

  redirectTo = () => {
    this.props.router.replace(this.props.router.query.intent || '/')
  }

  render() {
    return (
      <User>
        {({data: {me}, loading, error}) => {
          return(
            <ApolloConsumer>
              {client => (
                  <div className="limiter">
                    {/* <div className="container-login100" style={{backgroundImage: "url('/static/auth/images/bg-01.jpg')"}}> */}
                    <div className="container-login100" style={{ backgroundImage: "url('https://i.ibb.co/1bxgbyB/home-banner.jpg')" }}>
                      <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form className="login100-form validate-form flex-sb flex-w">
                        { loading && (
                          <span className="login100-form-title p-b-53">
                            Loading...
                          </span>
                        ) }
                        { me ? (
                          <span className="login100-form-title p-b-53">
                            <h2>You are { me.name }.</h2>
                            <hr />
                            <p>You are already signed in. <span onClick={() => this.props.router.back()} style={{color: '#0047ab', fontWeight: 'bolder', cursor: 'pointer'}}>Click here to go back... 🙂</span></p>
                          </span>
                        ) : !loading ? (
                          <>
                          <span className="login100-form-title p-b-53">
                            Signin to continue 👇
                            <hr />
                            <p>{meta.name} welcomes you!</p>
                          </span>
                          <Mutation refetchQueries={[{ query: CURRENT_USER_QUERY }]} mutation={SIGNIN_MUTATION} variables={{
                            signUpMethod: this.state.signUpMethod,
                            profilePicture: this.state.profilePicture,
                            socialId: this.state.socialId,
                            fname: this.state.fname,
                            lname: this.state.lname,
                            name: this.state.name,
                            gender: this.state.gender,
                            birthday: this.state.birthday,
                            email: this.state.email,
                            accessToken: this.state.accessToken
                          }}>
                            {(signIn, { error, loading, called }) => (
                              <FacebookAuth
                                appId={process.env.FB_LOGIN_APP_ID}
                                autoLoad
                                disabled={loading}
                                fields={"name,first_name,middle_name,last_name,short_name,picture,email,birthday,location,gender,link"}
                                callback={response => this.authenticateFacebook(response, signIn, client)}
                                onFailure={this.authenticationFailed}
                                component={renderProps => FacebookButton(loading, renderProps)}
                              />
                            )}
                          </Mutation>

                          <Mutation refetchQueries={[{ query: CURRENT_USER_QUERY }]} mutation={SIGNIN_MUTATION} variables={{
                            signUpMethod: this.state.signUpMethod,
                            profilePicture: this.state.profilePicture,
                            socialId: this.state.socialId,
                            fname: this.state.fname,
                            lname: this.state.lname,
                            name: this.state.name,
                            email: this.state.email,
                            accessToken: this.state.accessToken
                          }}>
                            {(signIn, { error, loading, called }) => (
                              <GoogleLogin
                                clientId={process.env.GOOGLE_LOGIN_APP_ID}
                                render={renderProps => (
                                  <a href="#" className="btn-google m-b-20" onClick={renderProps.onClick}>
                                    <img src="/static/auth/images/icons/icon-google.png" alt="GOOGLE" />
                                    {loading ? 'Signing in...' : 'Google'}
                                  </a>
                                )}
                                disabled={loading}
                                scope={"profile email openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/admin.directory.user.readonly"}
                                isSignedIn={false}
                                fetchBasicProfile={false}
                                onSuccess={response => this.authenticateGoogle(response, signIn, client)}
                                onFailure={this.authenticationFailed}
                              />
                            )}
                          </Mutation>
                          </>
                        ) : null }
                        </form>
                      </div>
                    </div>
                  </div>
                )
              }
            </ApolloConsumer>
          )
        }}
      </User>
    )
  }

}

export default withRouter(LoginPage)